"""MMTable client for Sfera's one-time authorization-code flow."""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


def _base_url():
    return str(os.getenv("SFERA_SSO_BASE_URL") or "https://sfera.crystalsystems.ru").rstrip("/")


def _secret():
    return str(os.getenv("SFERA_BRIDGE_SECRET") or "").strip()


def authorization_url(callback_url, state):
    query = urlencode({"redirect_uri": callback_url, "state": state})
    return f"{_base_url()}/api/sso/mmtable/authorize?{query}"


def _signed_request(endpoint, payload):
    secret = _secret()
    if not secret:
        raise RuntimeError("sfera_sso_not_configured")
    raw_body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    timestamp = str(int(time.time()))
    signature = hmac.new(secret.encode(), timestamp.encode() + b"." + raw_body, hashlib.sha256).hexdigest()
    request = Request(
        f"{_base_url()}{endpoint}",
        data=raw_body,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "X-Sfera-Bridge-Timestamp": timestamp,
            "X-Sfera-Bridge-Signature": signature,
        },
    )
    try:
        with urlopen(request, timeout=12) as response:
            data = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        try:
            data = json.loads(error.read().decode("utf-8"))
        except Exception:
            data = {}
        raise PermissionError(str(data.get("error") or "sfera_sso_exchange_failed")) from error
    except (URLError, OSError, TimeoutError) as error:
        raise RuntimeError("sfera_sso_unavailable") from error
    if not isinstance(data, dict) or data.get("issuer") != "sfera" or data.get("audience") != "mmtable":
        raise PermissionError("invalid_sfera_sso_claims")
    if not str(data.get("email") or "").strip() or not isinstance(data.get("organizations"), list):
        raise PermissionError("invalid_sfera_sso_claims")
    return data


def exchange_code(code, callback_url):
    return _signed_request(
        "/api/sso/mmtable/token",
        {"code": str(code or "").strip(), "redirectUri": str(callback_url or "").strip()},
    )


def validate_session(sfera_user_id, email):
    return _signed_request(
        "/api/sso/mmtable/session",
        {"sferaUserId": str(sfera_user_id or "").strip(), "email": str(email or "").strip()},
    )
