"""OAuth 2.1 authorization server for MM Table MCP (ChatGPT / Cursor remote).

Implements:
- Protected Resource Metadata (RFC 9728)
- Authorization Server Metadata (RFC 8414)
- Dynamic Client Registration (RFC 7591)
- Client ID Metadata Documents (CIMD)
- Authorization Code + PKCE (S256)
- Opaque access tokens accepted as Bearer on /mcp
"""

from __future__ import annotations

import base64
import hashlib
import html
import json
import re
import secrets
import time
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlparse, urlunparse
from urllib.request import Request, urlopen

from flask import jsonify, make_response, redirect, request, session

OAUTH_SCOPES = ("docs:read", "docs:write")
ACCESS_TOKEN_PREFIX = "oat_"
REFRESH_TOKEN_PREFIX = "ort_"
# Notion-style: short-lived access + long-lived refresh for silent renewal.
ACCESS_TOKEN_TTL_SEC = 60 * 60  # 1 hour
REFRESH_TOKEN_TTL_SEC = 60 * 60 * 24 * 90  # 90 days
AUTH_CODE_TTL_SEC = 60 * 10
CHATGPT_REDIRECT_PREFIXES = (
    "https://chatgpt.com/connector/oauth/",
    "https://chatgpt.com/connector_platform_oauth_redirect",
    "https://chat.openai.com/connector/oauth/",
    "https://chat.openai.com/connector_platform_oauth_redirect",
)


def _utc_now():
    return datetime.now(timezone.utc)


def _iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _hash_token(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def _pkce_s256(verifier: str) -> str:
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    return _b64url(digest)


def init_oauth_tables(conn):
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS oauth_clients (
          client_id TEXT PRIMARY KEY,
          client_secret_hash TEXT,
          client_name TEXT,
          redirect_uris TEXT NOT NULL,
          token_endpoint_auth_method TEXT NOT NULL DEFAULT 'none',
          client_uri TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS oauth_auth_codes (
          code TEXT PRIMARY KEY,
          client_id TEXT NOT NULL,
          email TEXT NOT NULL,
          redirect_uri TEXT NOT NULL,
          code_challenge TEXT NOT NULL,
          code_challenge_method TEXT NOT NULL,
          scope TEXT NOT NULL,
          resource TEXT,
          expires_at TEXT NOT NULL,
          used_at TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS oauth_access_tokens (
          token_hash TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          client_id TEXT NOT NULL,
          scope TEXT NOT NULL,
          resource TEXT,
          expires_at TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          revoked_at TEXT
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_oauth_tokens_email ON oauth_access_tokens(email)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS oauth_refresh_tokens (
          token_hash TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          client_id TEXT NOT NULL,
          scope TEXT NOT NULL,
          resource TEXT,
          expires_at TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          revoked_at TEXT,
          replaced_by_hash TEXT
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_oauth_refresh_email ON oauth_refresh_tokens(email)")


def register_mcp_oauth(app, deps):
    """
    deps:
      db()
      normalize_email(value)
      verify_password(password, password_hash)
      get_user(conn, email)
      upsert_user(conn, email, name=None, ...)
      set_session_user(email, name)
      app_base_url()
      parse_scopes(raw) -> set
      scopes_csv(scopes) -> str
    """

    db = deps["db"]
    normalize_email = deps["normalize_email"]
    verify_password = deps["verify_password"]
    get_user = deps["get_user"]
    upsert_user = deps["upsert_user"]
    set_session_user = deps["set_session_user"]
    app_base_url = deps["app_base_url"]
    parse_scopes = deps["parse_scopes"]
    scopes_csv = deps["scopes_csv"]

    def issuer() -> str:
        return app_base_url().rstrip("/")

    def mcp_resource() -> str:
        return f"{issuer()}/mcp"

    def metadata_url() -> str:
        return f"{issuer()}/.well-known/oauth-protected-resource"

    def www_authenticate() -> str:
        return f'Bearer realm="mmtable-mcp", resource_metadata="{metadata_url()}", scope="docs:read docs:write"'

    def _json_list(raw):
        if isinstance(raw, list):
            return [str(x) for x in raw]
        try:
            data = json.loads(raw or "[]")
            return [str(x) for x in data] if isinstance(data, list) else []
        except Exception:
            return []

    def _allowed_redirect(uri: str, registered: list[str] | None = None) -> bool:
        value = str(uri or "").strip()
        if not value:
            return False
        for prefix in CHATGPT_REDIRECT_PREFIXES:
            if value == prefix or value.startswith(prefix):
                return True
        parsed = urlparse(value)
        if parsed.scheme in {"http", "https"} and parsed.hostname in {"127.0.0.1", "localhost"}:
            return True
        if registered:
            return value in registered
        return False

    def _is_chatgpt_cimd(client_id: str) -> bool:
        parsed = urlparse(str(client_id or "").strip())
        if parsed.scheme != "https":
            return False
        host = (parsed.hostname or "").lower()
        if host not in {"chatgpt.com", "www.chatgpt.com", "chat.openai.com", "www.chat.openai.com"}:
            return False
        path = parsed.path or ""
        return path.startswith("/oauth/") and path.endswith("/client.json")

    def _chatgpt_cimd_fallback(client_id: str, redirect_uri: str | None = None) -> dict | None:
        """ChatGPT CIMD is often blocked (403) from cloud IPs; accept known ChatGPT clients."""
        if not _is_chatgpt_cimd(client_id):
            return None
        redirect_uris = []
        if redirect_uri and _allowed_redirect(redirect_uri, None):
            redirect_uris = [redirect_uri]
        return {
            "client_id": client_id,
            "client_name": "ChatGPT",
            "client_uri": "https://chatgpt.com/",
            "redirect_uris": redirect_uris,
            "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
            "token_endpoint_auth_method": "none",
            "grant_types": ["authorization_code", "refresh_token"],
            "response_types": ["code"],
        }

    def _fetch_cimd(client_id: str) -> dict | None:
        if not str(client_id).startswith("https://"):
            return None
        try:
            req = Request(
                client_id,
                headers={
                    "Accept": "application/json",
                    # Browser-like UA: datacenter fetches with custom UA often get CF 403.
                    "User-Agent": (
                        "Mozilla/5.0 (compatible; MMTable-MCP/1.0; +https://mmtable.crystalsystems.ru)"
                    ),
                },
            )
            with urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            if not isinstance(data, dict):
                return None
            return data
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError):
            return None

    def _resolve_client(conn, client_id: str, redirect_uri: str | None = None):
        client_id = str(client_id or "").strip()
        if not client_id:
            return None, None
        row = conn.execute("SELECT * FROM oauth_clients WHERE client_id = ?", (client_id,)).fetchone()
        if row:
            uris = _json_list(row["redirect_uris"])
            # Keep ChatGPT redirect from current request if missing in stored metadata.
            if redirect_uri and _allowed_redirect(redirect_uri, None) and redirect_uri not in uris:
                uris.append(redirect_uri)
                conn.execute(
                    "UPDATE oauth_clients SET redirect_uris = ? WHERE client_id = ?",
                    (json.dumps(uris, ensure_ascii=False), client_id),
                )
                conn.commit()
                row = conn.execute("SELECT * FROM oauth_clients WHERE client_id = ?", (client_id,)).fetchone()
            return row, uris

        # CIMD: client_id is an HTTPS metadata URL.
        meta = _fetch_cimd(client_id)
        if not meta:
            meta = _chatgpt_cimd_fallback(client_id, redirect_uri)
        if not meta:
            return None, None
        redirect_uris = _json_list(meta.get("redirect_uris"))
        if redirect_uri and _allowed_redirect(redirect_uri, None) and redirect_uri not in redirect_uris:
            redirect_uris.append(redirect_uri)
        auth_methods = meta.get("token_endpoint_auth_methods_supported") or meta.get("token_endpoint_auth_method")
        if isinstance(auth_methods, list) and auth_methods:
            method = "none" if "none" in auth_methods else str(auth_methods[0])
        else:
            method = str(meta.get("token_endpoint_auth_method") or "none")
        conn.execute(
            """
            INSERT OR REPLACE INTO oauth_clients(
              client_id, client_secret_hash, client_name, redirect_uris, token_endpoint_auth_method, client_uri, created_at
            ) VALUES(?, NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (
                client_id,
                str(meta.get("client_name") or "CIMD client")[:120],
                json.dumps(redirect_uris, ensure_ascii=False),
                method,
                str(meta.get("client_uri") or client_id)[:300],
            ),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM oauth_clients WHERE client_id = ?", (client_id,)).fetchone()
        return row, redirect_uris

    def _normalize_requested_scopes(raw) -> str:
        scopes = parse_scopes(raw) if raw else set(OAUTH_SCOPES)
        # Drop unknown OIDC extras ChatGPT may send; map to our scopes.
        if not scopes:
            scopes = set(OAUTH_SCOPES)
        return scopes_csv(scopes)

    def _html_page(title: str, body: str, status: int = 200):
        page = f"""<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{html.escape(title)}</title>
  <style>
    body {{ font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; background:#f8fafc; color:#0f172a; margin:0; }}
    .wrap {{ max-width:420px; margin:48px auto; padding:24px; background:#fff; border:1px solid #e2e8f0; border-radius:14px; }}
    h1 {{ font-size:20px; margin:0 0 8px; }}
    p {{ color:#475569; font-size:14px; line-height:1.45; }}
    label {{ display:block; margin:12px 0 6px; font-size:13px; }}
    input {{ width:100%; box-sizing:border-box; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; }}
    button {{ margin-top:16px; width:100%; padding:11px 14px; border:0; border-radius:8px; background:#2563eb; color:#fff; font-weight:600; cursor:pointer; }}
    .err {{ color:#b91c1c; font-size:13px; margin-top:10px; }}
    .meta {{ font-size:12px; color:#64748b; word-break:break-all; }}
  </style>
</head>
<body><div class="wrap">{body}</div></body>
</html>"""
        resp = make_response(page, status)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        return resp

    def _error_redirect(redirect_uri, error, description, state=None):
        if not redirect_uri:
            return jsonify({"error": error, "error_description": description}), 400
        params = {"error": error, "error_description": description}
        if state is not None:
            params["state"] = state
        sep = "&" if "?" in redirect_uri else "?"
        return redirect(f"{redirect_uri}{sep}{urlencode(params)}")

    # --- Discovery ---

    @app.get("/.well-known/oauth-protected-resource")
    @app.get("/.well-known/oauth-protected-resource/mcp")
    def oauth_protected_resource_metadata():
        return jsonify(
            {
                "resource": mcp_resource(),
                "authorization_servers": [issuer()],
                "scopes_supported": list(OAUTH_SCOPES),
                "bearer_methods_supported": ["header"],
                "resource_documentation": f"{issuer()}/docs/MCP.md",
            }
        )

    @app.get("/.well-known/oauth-authorization-server")
    @app.get("/.well-known/openid-configuration")
    def oauth_authorization_server_metadata():
        base = issuer()
        return jsonify(
            {
                "issuer": base,
                "authorization_endpoint": f"{base}/oauth/authorize",
                "token_endpoint": f"{base}/oauth/token",
                "registration_endpoint": f"{base}/oauth/register",
                "scopes_supported": list(OAUTH_SCOPES),
                "response_types_supported": ["code"],
                "grant_types_supported": ["authorization_code", "refresh_token"],
                "code_challenge_methods_supported": ["S256"],
                "token_endpoint_auth_methods_supported": ["none", "client_secret_post", "client_secret_basic"],
                "client_id_metadata_document_supported": True,
                "service_documentation": f"{base}/docs/MCP.md",
                "revocation_endpoint_auth_methods_supported": ["none", "client_secret_post"],
            }
        )

    # --- Dynamic Client Registration ---

    @app.post("/oauth/register")
    def oauth_register():
        payload = request.get_json(force=True, silent=True) or {}
        redirect_uris = _json_list(payload.get("redirect_uris"))
        if not redirect_uris:
            return jsonify({"error": "invalid_client_metadata", "error_description": "redirect_uris required"}), 400
        for uri in redirect_uris:
            if not _allowed_redirect(uri, None):
                return jsonify({"error": "invalid_redirect_uri", "error_description": uri}), 400

        client_id = "mmtc_" + secrets.token_urlsafe(18)
        auth_method = str(payload.get("token_endpoint_auth_method") or "none")
        client_secret = None
        client_secret_hash = None
        if auth_method != "none":
            client_secret = secrets.token_urlsafe(24)
            client_secret_hash = _hash_token(client_secret)

        conn = db()
        init_oauth_tables(conn)
        conn.execute(
            """
            INSERT INTO oauth_clients(
              client_id, client_secret_hash, client_name, redirect_uris, token_endpoint_auth_method, client_uri, created_at
            ) VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (
                client_id,
                client_secret_hash,
                str(payload.get("client_name") or "MCP client")[:120],
                json.dumps(redirect_uris, ensure_ascii=False),
                auth_method if auth_method in {"none", "client_secret_post", "client_secret_basic"} else "none",
                str(payload.get("client_uri") or "")[:300] or None,
            ),
        )
        conn.commit()
        conn.close()

        body = {
            "client_id": client_id,
            "client_id_issued_at": int(time.time()),
            "client_name": str(payload.get("client_name") or "MCP client")[:120],
            "redirect_uris": redirect_uris,
            "grant_types": ["authorization_code", "refresh_token"],
            "response_types": ["code"],
            "token_endpoint_auth_method": auth_method if auth_method != "none" else "none",
            "client_secret_expires_at": 0,
        }
        if client_secret:
            body["client_secret"] = client_secret
        return jsonify(body), 201

    # --- Authorize ---

    def _render_login(query, error=""):
        qs = urlencode(query)
        err = f'<div class="err">{html.escape(error)}</div>' if error else ""
        body = f"""
          <h1>Вход в MM Table</h1>
          <p>Разрешите ChatGPT / MCP-клиенту доступ к вашим документам.</p>
          <p class="meta">resource: {html.escape(str(query.get("resource") or mcp_resource()))}</p>
          <form method="post" action="/oauth/authorize?{html.escape(qs)}">
            <input type="hidden" name="action" value="login" />
            <label>E-mail</label>
            <input name="email" type="email" required autocomplete="username" />
            <label>Пароль</label>
            <input name="password" type="password" required autocomplete="current-password" />
            {err}
            <button type="submit">Войти и продолжить</button>
          </form>
        """
        return _html_page("MM Table OAuth", body)

    def _render_consent(query, email):
        qs = urlencode(query)
        body = f"""
          <h1>Разрешить доступ</h1>
          <p>Клиент получит доступ к документам аккаунта <strong>{html.escape(email)}</strong>.</p>
          <p class="meta">scopes: {html.escape(str(query.get("scope") or "docs:read docs:write"))}</p>
          <form method="post" action="/oauth/authorize?{html.escape(qs)}">
            <input type="hidden" name="action" value="approve" />
            <button type="submit">Разрешить</button>
          </form>
          <form method="post" action="/oauth/authorize?{html.escape(qs)}" style="margin-top:8px">
            <input type="hidden" name="action" value="deny" />
            <button type="submit" style="background:#64748b">Отклонить</button>
          </form>
        """
        return _html_page("MM Table OAuth", body)

    def _issue_code_and_redirect(conn, *, email, client_id, redirect_uri, challenge, method, scope, resource, state):
        code = secrets.token_urlsafe(32)
        expires = _utc_now() + timedelta(seconds=AUTH_CODE_TTL_SEC)
        conn.execute(
            """
            INSERT INTO oauth_auth_codes(
              code, client_id, email, redirect_uri, code_challenge, code_challenge_method, scope, resource, expires_at
            ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                code,
                client_id,
                email,
                redirect_uri,
                challenge,
                method,
                scope,
                resource,
                _iso(expires),
            ),
        )
        conn.commit()
        params = {"code": code}
        if state is not None:
            params["state"] = state
        sep = "&" if "?" in redirect_uri else "?"
        return redirect(f"{redirect_uri}{sep}{urlencode(params)}")

    @app.route("/oauth/authorize", methods=["GET", "POST"])
    def oauth_authorize():
        args = request.args.to_dict(flat=True)
        response_type = str(args.get("response_type") or "")
        client_id = str(args.get("client_id") or "")
        redirect_uri = str(args.get("redirect_uri") or "")
        state = args.get("state")
        scope = _normalize_requested_scopes(args.get("scope"))
        resource = str(args.get("resource") or mcp_resource()).rstrip("/")
        challenge = str(args.get("code_challenge") or "")
        method = str(args.get("code_challenge_method") or "")

        if response_type != "code":
            return _error_redirect(redirect_uri, "unsupported_response_type", "Only response_type=code is supported", state)
        if not client_id or not redirect_uri:
            return jsonify({"error": "invalid_request", "error_description": "client_id and redirect_uri required"}), 400
        if method != "S256" or not challenge:
            return _error_redirect(redirect_uri, "invalid_request", "PKCE S256 required", state)

        expected_resource = mcp_resource().rstrip("/")
        # Accept resource as /mcp or origin; normalize to /mcp.
        if resource in {issuer(), issuer() + "/"}:
            resource = expected_resource
        if resource.rstrip("/") != expected_resource:
            return _error_redirect(redirect_uri, "invalid_target", f"resource must be {expected_resource}", state)

        conn = db()
        init_oauth_tables(conn)
        client, redirect_uris = _resolve_client(conn, client_id, redirect_uri=redirect_uri)
        if not client:
            conn.close()
            return _error_redirect(redirect_uri, "invalid_client", "Unknown client_id", state)
        if not _allowed_redirect(redirect_uri, redirect_uris):
            conn.close()
            return jsonify({"error": "invalid_request", "error_description": "redirect_uri not allowed"}), 400

        query = {
            "response_type": "code",
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "scope": scope.replace(",", " "),
            "resource": resource,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
        }
        if state is not None:
            query["state"] = state

        if request.method == "POST":
            action = str(request.form.get("action") or "")
            if action == "login":
                email = normalize_email(request.form.get("email"))
                password = str(request.form.get("password") or "")
                user = get_user(conn, email)
                if not user or not user["password_hash"] or not verify_password(password, user["password_hash"]):
                    conn.close()
                    return _render_login(query, "Неверный e-mail или пароль.")
                set_session_user(email, user["name"] or email)
                # fall through to consent
            elif action == "deny":
                conn.close()
                return _error_redirect(redirect_uri, "access_denied", "User denied access", state)
            elif action == "approve":
                email = normalize_email(session.get("email"))
                if not email:
                    conn.close()
                    return _render_login(query, "Сначала войдите в аккаунт.")
                resp = _issue_code_and_redirect(
                    conn,
                    email=email,
                    client_id=client_id,
                    redirect_uri=redirect_uri,
                    challenge=challenge,
                    method="S256",
                    scope=scope,
                    resource=resource,
                    state=state,
                )
                conn.close()
                return resp

        email = normalize_email(session.get("email"))
        if not email:
            conn.close()
            return _render_login(query)
        # Auto-approve after login on POST login, or show consent on GET.
        if request.method == "POST" and str(request.form.get("action") or "") == "login":
            resp = _issue_code_and_redirect(
                conn,
                email=email,
                client_id=client_id,
                redirect_uri=redirect_uri,
                challenge=challenge,
                method="S256",
                scope=scope,
                resource=resource,
                state=state,
            )
            conn.close()
            return resp
        conn.close()
        return _render_consent(query, email)

    # --- Token ---

    def _client_auth(conn, form=None):
        form = form or {}
        client_id = form.get("client_id") or request.form.get("client_id")
        if not client_id and request.is_json:
            client_id = (request.get_json(silent=True) or {}).get("client_id")
        client_secret = form.get("client_secret") or request.form.get("client_secret")
        auth = request.headers.get("Authorization") or ""
        if auth.lower().startswith("basic "):
            try:
                decoded = base64.b64decode(auth.split(" ", 1)[1]).decode("utf-8")
                client_id, client_secret = decoded.split(":", 1)
            except Exception:
                return None, "invalid_client"
        client_id = str(client_id or "").strip()
        client, _uris = _resolve_client(conn, client_id)
        if not client:
            return None, "invalid_client"
        method = str(client["token_endpoint_auth_method"] or "none")
        if method == "none":
            return client, None
        if not client_secret or not client["client_secret_hash"]:
            return None, "invalid_client"
        if not secrets.compare_digest(_hash_token(client_secret), client["client_secret_hash"]):
            return None, "invalid_client"
        return client, None

    def _parse_expiry(value):
        try:
            expires_at = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        except ValueError:
            return _utc_now() - timedelta(seconds=1)
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        return expires_at

    def _issue_token_pair(conn, *, email, client_id, scope, resource):
        access = ACCESS_TOKEN_PREFIX + secrets.token_urlsafe(32)
        refresh = REFRESH_TOKEN_PREFIX + secrets.token_urlsafe(40)
        access_expires = _utc_now() + timedelta(seconds=ACCESS_TOKEN_TTL_SEC)
        refresh_expires = _utc_now() + timedelta(seconds=REFRESH_TOKEN_TTL_SEC)
        conn.execute(
            """
            INSERT INTO oauth_access_tokens(token_hash, email, client_id, scope, resource, expires_at)
            VALUES(?, ?, ?, ?, ?, ?)
            """,
            (_hash_token(access), email, client_id, scope, resource, _iso(access_expires)),
        )
        conn.execute(
            """
            INSERT INTO oauth_refresh_tokens(token_hash, email, client_id, scope, resource, expires_at)
            VALUES(?, ?, ?, ?, ?, ?)
            """,
            (_hash_token(refresh), email, client_id, scope, resource, _iso(refresh_expires)),
        )
        return {
            "access_token": access,
            "refresh_token": refresh,
            "token_type": "Bearer",
            "expires_in": ACCESS_TOKEN_TTL_SEC,
            "scope": str(scope).replace(",", " "),
            "resource": resource,
        }

    @app.post("/oauth/token")
    def oauth_token():
        # Support form-urlencoded (standard) and JSON.
        form = request.form.to_dict(flat=True) if request.form else {}
        if not form and request.is_json:
            form = request.get_json(force=True, silent=True) or {}

        grant_type = str(form.get("grant_type") or "")
        resource = str(form.get("resource") or mcp_resource()).rstrip("/")
        if resource in {issuer(), issuer() + "/"}:
            resource = mcp_resource()
        expected = mcp_resource().rstrip("/")

        conn = db()
        init_oauth_tables(conn)
        client, err = _client_auth(conn, form)
        if err:
            conn.close()
            return jsonify({"error": err}), 401

        if grant_type == "refresh_token":
            refresh_raw = str(form.get("refresh_token") or "").strip()
            if not refresh_raw.startswith(REFRESH_TOKEN_PREFIX):
                conn.close()
                return jsonify({"error": "invalid_grant"}), 400
            row = conn.execute(
                """
                SELECT * FROM oauth_refresh_tokens
                WHERE token_hash = ? AND revoked_at IS NULL
                LIMIT 1
                """,
                (_hash_token(refresh_raw),),
            ).fetchone()
            if not row or row["client_id"] != client["client_id"]:
                conn.close()
                return jsonify({"error": "invalid_grant"}), 400
            if _parse_expiry(row["expires_at"]) < _utc_now():
                conn.close()
                return jsonify({"error": "invalid_grant", "error_description": "refresh_expired"}), 400
            token_resource = str(row["resource"] or expected).rstrip("/")
            if resource.rstrip("/") != expected or token_resource != expected:
                conn.close()
                return jsonify({"error": "invalid_target"}), 400

            # Rotate refresh token (Notion-like / OAuth best practice).
            payload = _issue_token_pair(
                conn,
                email=row["email"],
                client_id=client["client_id"],
                scope=row["scope"],
                resource=expected,
            )
            conn.execute(
                """
                UPDATE oauth_refresh_tokens
                SET revoked_at = ?, replaced_by_hash = ?
                WHERE token_hash = ?
                """,
                (_iso(_utc_now()), _hash_token(payload["refresh_token"]), row["token_hash"]),
            )
            conn.commit()
            conn.close()
            return jsonify(payload)

        if grant_type != "authorization_code":
            conn.close()
            return jsonify({"error": "unsupported_grant_type"}), 400

        code = str(form.get("code") or "")
        redirect_uri = str(form.get("redirect_uri") or "")
        verifier = str(form.get("code_verifier") or "")

        row = conn.execute("SELECT * FROM oauth_auth_codes WHERE code = ?", (code,)).fetchone()
        if not row or row["used_at"]:
            conn.close()
            return jsonify({"error": "invalid_grant"}), 400
        if row["client_id"] != client["client_id"]:
            conn.close()
            return jsonify({"error": "invalid_grant"}), 400
        if row["redirect_uri"] != redirect_uri:
            conn.close()
            return jsonify({"error": "invalid_grant"}), 400
        if row["code_challenge_method"] != "S256" or _pkce_s256(verifier) != row["code_challenge"]:
            conn.close()
            return jsonify({"error": "invalid_grant", "error_description": "pkce_failed"}), 400
        if _parse_expiry(row["expires_at"]) < _utc_now():
            conn.close()
            return jsonify({"error": "invalid_grant", "error_description": "code_expired"}), 400

        token_resource = str(row["resource"] or expected).rstrip("/")
        if resource.rstrip("/") != expected or token_resource != expected:
            conn.close()
            return jsonify({"error": "invalid_target"}), 400

        conn.execute(
            "UPDATE oauth_auth_codes SET used_at = ? WHERE code = ?",
            (_iso(_utc_now()), code),
        )
        payload = _issue_token_pair(
            conn,
            email=row["email"],
            client_id=client["client_id"],
            scope=row["scope"],
            resource=expected,
        )
        conn.commit()
        conn.close()
        return jsonify(payload)

    def lookup_access_token(raw_token: str):
        raw = str(raw_token or "").strip()
        if not raw.startswith(ACCESS_TOKEN_PREFIX):
            return None
        conn = db()
        init_oauth_tables(conn)
        row = conn.execute(
            """
            SELECT * FROM oauth_access_tokens
            WHERE token_hash = ? AND revoked_at IS NULL
            LIMIT 1
            """,
            (_hash_token(raw),),
        ).fetchone()
        if not row:
            conn.close()
            return None
        try:
            expires_at = datetime.fromisoformat(str(row["expires_at"]).replace("Z", "+00:00"))
        except ValueError:
            conn.close()
            return None
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at < _utc_now():
            conn.close()
            return None
        expected = mcp_resource().rstrip("/")
        if str(row["resource"] or "").rstrip("/") not in {"", expected}:
            conn.close()
            return None
        result = {
            "email": row["email"],
            "scopes": row["scope"],
            "client_id": row["client_id"],
            "resource": row["resource"],
            "expires_at": row["expires_at"],
        }
        conn.close()
        return result

    # expose helpers on app for server.py auth
    app.mcp_oauth_www_authenticate = www_authenticate  # type: ignore[attr-defined]
    app.mcp_oauth_lookup_access_token = lookup_access_token  # type: ignore[attr-defined]
    app.mcp_oauth_resource = mcp_resource  # type: ignore[attr-defined]
    return {
        "www_authenticate": www_authenticate,
        "lookup_access_token": lookup_access_token,
        "mcp_resource": mcp_resource,
    }
