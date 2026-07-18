#!/usr/bin/env python3
"""OAuth discovery + PKCE code flow smoke test."""

from __future__ import annotations

import base64
import hashlib
import os
import secrets
import sys
import unittest
from urllib.parse import parse_qs, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

# Use a temp DB for isolation.
os.environ.setdefault("SESSION_SECRET", "test-secret")
TEST_DB = os.path.join(ROOT, "workspace_oauth_test.db")
if os.path.exists(TEST_DB):
    os.remove(TEST_DB)

import server as server_mod

server_mod.DB_PATH = TEST_DB
server_mod.PUBLIC_BASE_URL = "https://mmtable.test"
server_mod._init_db()
from server import app  # noqa: E402


def _pkce():
    verifier = secrets.token_urlsafe(48)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).decode().rstrip("=")
    return verifier, challenge


class McpOAuthTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.email = f"oauth_{secrets.token_hex(3)}@example.com"
        self.password = "secret12"
        r = self.client.post(
            "/auth/register",
            json={"email": self.email, "password": self.password, "name": "OAuth User"},
        )
        self.assertEqual(r.status_code, 200)

    def test_discovery(self):
        r = self.client.get("/.well-known/oauth-protected-resource")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json["resource"], "https://mmtable.test/mcp")
        self.assertIn("https://mmtable.test", r.json["authorization_servers"])

        r = self.client.get("/.well-known/oauth-authorization-server")
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json.get("client_id_metadata_document_supported"))
        self.assertIn("S256", r.json["code_challenge_methods_supported"])
        self.assertTrue(r.json["authorization_endpoint"].endswith("/oauth/authorize"))

    def test_chatgpt_cimd_fallback_shows_login(self):
        """ChatGPT CIMD URLs must work even when chatgpt.com returns 403 to the server."""
        verifier, challenge = _pkce()
        qs = {
            "response_type": "code",
            "client_id": "https://chatgpt.com/oauth/LgxzLfa9TdZi/client.json",
            "redirect_uri": "https://chatgpt.com/connector/oauth/LgxzLfa9TdZi",
            "scope": "docs:read docs:write",
            "resource": "https://mmtable.test/mcp",
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "state": "chatgpt-test",
        }
        r = self.client.get("/oauth/authorize", query_string=qs)
        body = r.get_data(as_text=True)
        self.assertEqual(r.status_code, 200)
        self.assertTrue("Вход в MM Table" in body or "Разрешить доступ" in body)
        self.assertNotIn("invalid_client", body)

    def test_mcp_401_has_www_authenticate(self):
        anon = app.test_client()
        r = anon.post(
            "/mcp",
            json={"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}},
            headers={"Accept": "application/json"},
        )
        self.assertEqual(r.status_code, 401)
        self.assertIn("resource_metadata=", r.headers.get("WWW-Authenticate", ""))

    def test_pkce_code_flow(self):
        verifier, challenge = _pkce()
        redirect_uri = "https://chatgpt.com/connector/oauth/test-callback"
        reg = self.client.post(
            "/oauth/register",
            json={
                "client_name": "ChatGPT Test",
                "redirect_uris": [redirect_uri],
                "token_endpoint_auth_method": "none",
            },
        )
        self.assertEqual(reg.status_code, 201)
        client_id = reg.json["client_id"]

        # Login via authorize form
        qs = {
            "response_type": "code",
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "scope": "docs:read docs:write",
            "resource": "https://mmtable.test/mcp",
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "state": "abc",
        }
        login = self.client.post(
            "/oauth/authorize",
            query_string=qs,
            data={"action": "login", "email": self.email, "password": self.password},
        )
        self.assertEqual(login.status_code, 302)
        loc = login.headers["Location"]
        self.assertTrue(loc.startswith(redirect_uri))
        code = parse_qs(urlparse(loc).query)["code"][0]

        token = self.client.post(
            "/oauth/token",
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": redirect_uri,
                "client_id": client_id,
                "code_verifier": verifier,
                "resource": "https://mmtable.test/mcp",
            },
        )
        self.assertEqual(token.status_code, 200)
        access = token.json["access_token"]
        refresh = token.json["refresh_token"]
        self.assertTrue(access.startswith("oat_"))
        self.assertTrue(refresh.startswith("ort_"))
        self.assertEqual(token.json["expires_in"], 3600)

        mcp = self.client.post(
            "/mcp",
            json={"jsonrpc": "2.0", "id": 2, "method": "tools/list"},
            headers={"Authorization": f"Bearer {access}", "Accept": "application/json"},
        )
        self.assertEqual(mcp.status_code, 200)
        self.assertGreaterEqual(len(mcp.json["result"]["tools"]), 1)

        refreshed = self.client.post(
            "/oauth/token",
            data={
                "grant_type": "refresh_token",
                "refresh_token": refresh,
                "client_id": client_id,
                "resource": "https://mmtable.test/mcp",
            },
        )
        self.assertEqual(refreshed.status_code, 200)
        self.assertTrue(refreshed.json["access_token"].startswith("oat_"))
        self.assertTrue(refreshed.json["refresh_token"].startswith("ort_"))
        self.assertNotEqual(refreshed.json["refresh_token"], refresh)

        # Old refresh token must be invalidated after rotation.
        reuse = self.client.post(
            "/oauth/token",
            data={
                "grant_type": "refresh_token",
                "refresh_token": refresh,
                "client_id": client_id,
                "resource": "https://mmtable.test/mcp",
            },
        )
        self.assertEqual(reuse.status_code, 400)

        mcp2 = self.client.post(
            "/mcp",
            json={"jsonrpc": "2.0", "id": 3, "method": "tools/list"},
            headers={"Authorization": f"Bearer {refreshed.json['access_token']}", "Accept": "application/json"},
        )
        self.assertEqual(mcp2.status_code, 200)


if __name__ == "__main__":
    unittest.main()
