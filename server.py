import binascii
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
import uuid
from collections import defaultdict
from datetime import datetime, timedelta
from functools import wraps
from urllib.parse import urlparse
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from flask import Flask, g, jsonify, make_response, redirect, request, send_from_directory, session
from werkzeug.middleware.proxy_fix import ProxyFix

from api_v1 import register_api_v1
from mcp_http import register_mcp
from mcp_oauth import init_oauth_tables, register_mcp_oauth


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
DB_PATH = os.path.join(BASE_DIR, "workspace.db")

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")
app.secret_key = os.getenv("SESSION_SECRET", "dev-secret-change-me")
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE=os.getenv("SESSION_COOKIE_SAMESITE", "Lax"),
    SESSION_COOKIE_SECURE=os.getenv("SESSION_COOKIE_SECURE", "").lower() in ("1", "true", "yes"),
)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "").rstrip("/")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_AUTH_ENABLED = bool(GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)

PUBLIC_RATE_LIMIT = int(os.getenv("PUBLIC_RATE_LIMIT", "120"))
PUBLIC_RATE_WINDOW_SEC = int(os.getenv("PUBLIC_RATE_WINDOW_SEC", "60"))
_public_rate_buckets = {}

COMMENT_ANCHOR_TYPES = {"document", "shape", "cell", "point"}
COMMENT_STATUSES = {"open", "resolved"}

ROLE_OWNER = "owner"
ROLE_ADMIN = "admin"
ROLE_EDITOR = "editor"
ROLE_COMMENTER = "commenter"
ROLE_READER = "reader"
ROLE_ORDER = {
    ROLE_READER: 1,
    ROLE_COMMENTER: 2,
    ROLE_EDITOR: 3,
    ROLE_ADMIN: 4,
    ROLE_OWNER: 5,
}
SHAREABLE_ROLES = {ROLE_ADMIN, ROLE_EDITOR, ROLE_COMMENTER, ROLE_READER}
DOC_ID_SHORT_RE = r"[0-9a-f]{12}"
DOC_ID_UUID_RE = r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
DOC_ID_RE = re.compile(rf"^({DOC_ID_SHORT_RE}|{DOC_ID_UUID_RE})$", re.IGNORECASE)


def _is_valid_doc_id(doc_id):
    return bool(DOC_ID_RE.match(str(doc_id or "").strip()))


def _new_doc_id(conn):
    for _ in range(32):
        doc_id = secrets.token_hex(6)
        if not conn.execute("SELECT 1 FROM user_documents WHERE id = ?", (doc_id,)).fetchone():
            return doc_id
    raise RuntimeError("failed to generate unique document id")


def _new_folder_id(conn):
    for _ in range(32):
        folder_id = secrets.token_hex(6)
        if not conn.execute("SELECT 1 FROM user_folders WHERE id = ?", (folder_id,)).fetchone():
            return folder_id
    raise RuntimeError("failed to generate unique folder id")


def _resolve_doc_id(conn, doc_id):
    safe_id = str(doc_id or "").strip()
    if not _is_valid_doc_id(safe_id):
        return None
    alias = conn.execute(
        "SELECT doc_id FROM document_id_aliases WHERE alias = ? LIMIT 1",
        (safe_id,),
    ).fetchone()
    return alias["doc_id"] if alias else safe_id


def _migrate_legacy_doc_ids(conn):
    rows = conn.execute(
        """
        SELECT id FROM user_documents
        WHERE instr(id, '-') > 0 AND length(id) >= 36
        """
    ).fetchall()
    for row in rows:
        old_id = row["id"]
        new_id = _new_doc_id(conn)
        conn.execute("UPDATE user_documents SET id = ? WHERE id = ?", (new_id, old_id))
        conn.execute(
            "UPDATE document_access SET document_id = ? WHERE document_id = ?",
            (new_id, old_id),
        )
        conn.execute(
            "INSERT OR IGNORE INTO document_id_aliases(alias, doc_id) VALUES(?, ?)",
            (old_id, new_id),
        )


def _db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _normalize_email(value):
    return str(value or "").strip().lower()


EMAIL_DOMAIN_TYPOS = {
    "gmaul.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "yamdex.ru": "yandex.ru",
    "yndex.ru": "yandex.ru",
    "yanex.ru": "yandex.ru",
}


def _email_typo_suggestion(email):
    normalized = _normalize_email(email)
    if "@" not in normalized:
        return None
    local, domain = normalized.rsplit("@", 1)
    suggested_domain = EMAIL_DOMAIN_TYPOS.get(domain)
    if not suggested_domain:
        return None
    return f"{local}@{suggested_domain}"


def _hash_password(password, iterations=260000):
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return f"pbkdf2_sha256${iterations}${binascii.hexlify(salt).decode()}${binascii.hexlify(digest).decode()}"


def _verify_password(password, password_hash):
    try:
        scheme, iterations, salt_hex, digest_hex = str(password_hash or "").split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False
        salt = binascii.unhexlify(salt_hex.encode())
        expected = binascii.unhexlify(digest_hex.encode())
        actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, int(iterations))
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


def _table_columns(conn, table_name):
    return {row["name"] for row in conn.execute(f"PRAGMA table_info({table_name})").fetchall()}


def _ensure_column(conn, table_name, column_name, ddl):
    if column_name in _table_columns(conn, table_name):
        return
    conn.execute(f"ALTER TABLE {table_name} ADD COLUMN {ddl}")


def _blank_layout():
    return {
        "schemaVersion": 3,
        "activeSheetId": 1,
        "sheets": [
            {
                "id": 1,
                "name": "Лист 1",
                "layout": {
                    "schemaVersion": 2,
                    "zoom": 1,
                    "zCounter": 10,
                    "windowCounter": 1,
                    "shapeCounter": 1,
                    "groupCounter": 1,
                    "frameCounter": 1,
                    "bpProcessCounter": 1,
                    "windows": [],
                    "shapes": [],
                    "connectors": [],
                },
            }
        ],
    }


API_TOKEN_PREFIX = "mmt_"
API_TOKEN_SCOPES = {"docs:read", "docs:write"}


def _init_db():
    conn = _db()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS user_layouts (
          email TEXT PRIMARY KEY,
          layout_json TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS user_documents (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          layout_json TEXT NOT NULL,
          is_active INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_user_documents_email ON user_documents(email)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
          email TEXT PRIMARY KEY,
          password_hash TEXT,
          display_name TEXT,
          auth_provider TEXT NOT NULL DEFAULT 'password',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS document_access (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          document_id TEXT NOT NULL,
          user_email TEXT NOT NULL,
          role TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(document_id, user_email)
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_document_access_doc ON document_access(document_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_document_access_email ON document_access(user_email)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS document_id_aliases (
          alias TEXT PRIMARY KEY,
          doc_id TEXT NOT NULL
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_document_id_aliases_doc ON document_id_aliases(doc_id)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS document_comments (
          id TEXT PRIMARY KEY,
          document_id TEXT NOT NULL,
          author_email TEXT NOT NULL,
          anchor_type TEXT NOT NULL,
          anchor_json TEXT NOT NULL,
          body TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'open',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_document_comments_doc ON document_comments(document_id)")
    _ensure_column(conn, "users", "id", "id TEXT")
    _ensure_column(conn, "users", "name", "name TEXT")
    _ensure_column(conn, "users", "display_name", "display_name TEXT")
    _ensure_column(conn, "users", "auth_provider", "auth_provider TEXT NOT NULL DEFAULT 'password'")
    _ensure_column(conn, "users", "bitrix_webhook_url", "bitrix_webhook_url TEXT")
    conn.execute("UPDATE users SET name = COALESCE(name, display_name, email) WHERE name IS NULL OR trim(name) = ''")
    conn.execute("UPDATE users SET display_name = COALESCE(display_name, name, email) WHERE display_name IS NULL OR trim(display_name) = ''")
    conn.execute("UPDATE users SET id = COALESCE(id, lower(hex(randomblob(16)))) WHERE id IS NULL OR trim(id) = ''")
    conn.execute(
        """
        INSERT OR IGNORE INTO users(email, name, display_name, auth_provider, id)
        SELECT lower(trim(email)), email, email, 'password', lower(hex(randomblob(16)))
        FROM (
          SELECT email FROM user_documents
          UNION
          SELECT email FROM user_layouts
        )
        WHERE trim(email) <> ''
        """
    )
    conn.execute(
        """
        INSERT OR IGNORE INTO document_access(document_id, user_email, role)
        SELECT id, lower(trim(email)), 'owner'
        FROM user_documents
        WHERE trim(email) <> ''
        """
    )
    _ensure_column(conn, "user_documents", "public_link_enabled", "public_link_enabled INTEGER NOT NULL DEFAULT 0")
    _ensure_column(conn, "user_documents", "public_link_token", "public_link_token TEXT")
    _ensure_column(conn, "user_documents", "public_link_created_at", "public_link_created_at DATETIME")
    _ensure_column(conn, "user_documents", "public_link_rotated_at", "public_link_rotated_at DATETIME")
    _ensure_column(conn, "user_documents", "folder_id", "folder_id TEXT")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS user_folders (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_user_folders_email ON user_folders(email)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS api_tokens (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          token_hash TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          scopes TEXT NOT NULL,
          token_prefix TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_used_at DATETIME,
          revoked_at DATETIME
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_api_tokens_email ON api_tokens(email)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_api_tokens_hash ON api_tokens(token_hash)")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS share_contacts (
          owner_email TEXT NOT NULL,
          contact_email TEXT NOT NULL,
          contact_name TEXT,
          last_shared_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (owner_email, contact_email)
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_share_contacts_owner ON share_contacts(owner_email, last_shared_at DESC)")
    conn.execute(
        """
        INSERT OR IGNORE INTO share_contacts(owner_email, contact_email, contact_name, last_shared_at)
        SELECT
          lower(trim(d.email)),
          lower(trim(a.user_email)),
          COALESCE(NULLIF(trim(u.name), ''), NULLIF(trim(u.display_name), ''), lower(trim(a.user_email))),
          COALESCE(a.updated_at, a.created_at, CURRENT_TIMESTAMP)
        FROM document_access a
        JOIN user_documents d ON d.id = a.document_id
        LEFT JOIN users u ON lower(trim(u.email)) = lower(trim(a.user_email))
        WHERE lower(trim(a.role)) <> 'owner'
          AND lower(trim(a.user_email)) <> lower(trim(d.email))
          AND trim(d.email) <> ''
          AND trim(a.user_email) <> ''
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS document_presence (
          document_id TEXT NOT NULL,
          user_email TEXT NOT NULL,
          display_name TEXT,
          session_id TEXT NOT NULL,
          last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (document_id, session_id)
        )
        """
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_document_presence_doc_seen ON document_presence(document_id, last_seen)"
    )
    init_oauth_tables(conn)
    _migrate_legacy_doc_ids(conn)
    conn.commit()
    conn.close()


_init_db()

oauth = OAuth(app)

if GOOGLE_AUTH_ENABLED:
    oauth.register(
        name="google",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"},
    )


def _hash_api_token(token: str) -> str:
    return hashlib.sha256(str(token or "").encode("utf-8")).hexdigest()


def _parse_scopes(raw) -> set:
    if isinstance(raw, (list, tuple, set)):
        values = [str(x).strip() for x in raw]
    else:
        text = str(raw or "").replace(",", " ")
        values = [part.strip() for part in text.split() if part.strip()]
    scopes = {v for v in values if v in API_TOKEN_SCOPES}
    if "docs:write" in scopes:
        scopes.add("docs:read")
    # Ignore unknown scopes (e.g. openid/profile from ChatGPT) and keep defaults when empty.
    return scopes or {"docs:read", "docs:write"}


def _scopes_csv(scopes) -> str:
    parsed = _parse_scopes(scopes)
    return ",".join(sorted(parsed))


def _lookup_api_token(token: str):
    raw = str(token or "").strip()
    if not raw.startswith(API_TOKEN_PREFIX):
        return None
    token_hash = _hash_api_token(raw)
    conn = _db()
    row = conn.execute(
        """
        SELECT * FROM api_tokens
        WHERE token_hash = ? AND revoked_at IS NULL
        LIMIT 1
        """,
        (token_hash,),
    ).fetchone()
    if row:
        conn.execute(
            "UPDATE api_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?",
            (row["id"],),
        )
        conn.commit()
        refreshed = conn.execute("SELECT * FROM api_tokens WHERE id = ?", (row["id"],)).fetchone()
        conn.close()
        return refreshed
    conn.close()
    return None


def _bearer_token_from_request():
    header = str(request.headers.get("Authorization") or "")
    if header.lower().startswith("bearer "):
        return header[7:].strip()
    return ""


def _lookup_oauth_access_token(token: str):
    lookup = getattr(app, "mcp_oauth_lookup_access_token", None)
    if not callable(lookup):
        return None
    return lookup(token)


def _authenticate_request():
    """Resolve session cookie, Bearer PAT, or OAuth access token."""
    if getattr(g, "_auth_resolved", False):
        return getattr(g, "auth_email", None), set(getattr(g, "auth_scopes", set()) or set()), getattr(g, "auth_token", None)

    g._auth_resolved = True
    g.auth_email = None
    g.auth_scopes = set()
    g.auth_token = None
    g.auth_via = None

    bearer = _bearer_token_from_request()
    if bearer:
        row = _lookup_api_token(bearer)
        if row:
            g.auth_email = _normalize_email(row["email"])
            g.auth_scopes = _parse_scopes(row["scopes"])
            g.auth_token = row
            g.auth_via = "bearer"
            return g.auth_email, g.auth_scopes, g.auth_token
        oauth_row = _lookup_oauth_access_token(bearer)
        if oauth_row:
            g.auth_email = _normalize_email(oauth_row.get("email"))
            g.auth_scopes = _parse_scopes(oauth_row.get("scopes"))
            g.auth_token = oauth_row
            g.auth_via = "oauth"
            return g.auth_email, g.auth_scopes, g.auth_token
        return None, set(), None

    email = _normalize_email(session.get("email"))
    if email:
        g.auth_email = email
        g.auth_scopes = {"docs:read", "docs:write"}
        g.auth_via = "session"
        return email, g.auth_scopes, None
    return None, set(), None


def _set_auth_context(email, scopes=None, token_row=None):
    g._auth_resolved = True
    g.auth_email = _normalize_email(email)
    g.auth_scopes = _parse_scopes(scopes) if scopes is not None else {"docs:read", "docs:write"}
    g.auth_token = token_row
    g.auth_via = "bearer" if token_row is not None else "session"


def require_login(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        email, _scopes, _token = _authenticate_request()
        if not email:
            return jsonify({"error": "unauthorized"}), 401
        return fn(*args, **kwargs)

    return wrapper


def require_scope(scope):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            email, scopes, _token = _authenticate_request()
            if not email:
                return jsonify({"error": "unauthorized"}), 401
            if scope not in scopes and not ("docs:write" in scopes and scope == "docs:read"):
                return jsonify({"error": "forbidden_scope"}), 403
            return fn(*args, **kwargs)

        return wrapper

    return decorator


def _set_session_user(email, name):
    session["email"] = _normalize_email(email)
    session["name"] = (name or email or "").strip()


def _current_email():
    email, _scopes, _token = _authenticate_request()
    return _normalize_email(email)


def _has_scope(scope: str) -> bool:
    _email, scopes, _token = _authenticate_request()
    if scope in scopes:
        return True
    return scope == "docs:read" and "docs:write" in scopes


def _is_role_at_least(role, expected):
    return ROLE_ORDER.get(role or "", 0) >= ROLE_ORDER.get(expected or "", 999)


def _upsert_user(conn, email, name=None, password_hash=None, auth_provider=None):
    email = _normalize_email(email)
    if not email:
      return None
    existing = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if existing:
        next_name = (name or existing["name"] or existing["display_name"] or email).strip()
        next_provider = auth_provider or existing["auth_provider"] or "password"
        next_hash = password_hash if password_hash is not None else (existing["password_hash"] or "")
        conn.execute(
            """
            UPDATE users
            SET name = ?, display_name = ?, password_hash = ?, auth_provider = ?, updated_at = CURRENT_TIMESTAMP
            WHERE email = ?
            """,
            (next_name, next_name, next_hash or "", next_provider, email),
        )
    else:
        conn.execute(
            """
            INSERT INTO users(email, password_hash, name, display_name, auth_provider, id)
            VALUES(?, ?, ?, ?, ?, ?)
            """,
            (email, password_hash or "", (name or email).strip(), (name or email).strip(), auth_provider or "password", str(uuid.uuid4())),
        )
    return conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()


def _get_user(conn, email):
    return conn.execute("SELECT * FROM users WHERE email = ?", (_normalize_email(email),)).fetchone()


def _ensure_seed_document(conn, email):
    email = _normalize_email(email)
    existing = conn.execute(
        "SELECT id FROM user_documents WHERE lower(email) = ? ORDER BY updated_at DESC, created_at DESC LIMIT 1",
        (email,),
    ).fetchone()
    if existing:
        conn.execute(
            "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
            (existing["id"], email, ROLE_OWNER),
        )
        conn.commit()
        return existing["id"]

    seed_layout = None
    legacy_row = conn.execute("SELECT layout_json FROM user_layouts WHERE lower(email) = ?", (email,)).fetchone()
    if legacy_row and legacy_row["layout_json"]:
        try:
            seed_layout = json.loads(legacy_row["layout_json"])
        except Exception:
            seed_layout = _blank_layout()
    if not seed_layout:
        seed_layout = _blank_layout()

    doc_id = _new_doc_id(conn)
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (doc_id, email, "Рабочий стол", json.dumps(seed_layout, ensure_ascii=False)),
    )
    conn.execute(
        "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
        (doc_id, email, ROLE_OWNER),
    )
    conn.commit()
    return doc_id


def _get_docs_conn(email):
    conn = _db()
    name = session.get("name") if hasattr(session, "get") else None
    if not name:
        user = _get_user(conn, email)
        name = (user["name"] if user else None) or email
    _upsert_user(conn, email, name=name)
    _ensure_seed_document(conn, email)
    conn.commit()
    return conn


def _doc_with_role_query():
    return """
        SELECT
          d.id,
          d.name,
          d.layout_json,
          d.email AS owner_email,
          d.folder_id,
          d.created_at,
          d.updated_at,
          CASE
            WHEN lower(d.email) = ? THEN 'owner'
            ELSE a.role
          END AS role
        FROM user_documents d
        LEFT JOIN document_access a
          ON a.document_id = d.id
         AND lower(a.user_email) = ?
        WHERE (lower(d.email) = ? OR a.role IS NOT NULL)
    """


def _get_accessible_docs(conn, email):
    email = _normalize_email(email)
    rows = conn.execute(
        _doc_with_role_query() + " ORDER BY d.updated_at DESC, d.created_at DESC",
        (email, email, email),
    ).fetchall()
    return rows


def _get_doc_for_user(conn, email, doc_id):
    email = _normalize_email(email)
    canonical_id = _resolve_doc_id(conn, doc_id)
    if not canonical_id:
        return None
    return conn.execute(
        _doc_with_role_query() + " AND d.id = ? LIMIT 1",
        (email, email, email, canonical_id),
    ).fetchone()


def _list_docs(conn, email):
    active_doc_id = str(session.get("active_document_id") or "").strip()
    email_key = _normalize_email(email)
    docs = []
    for row in _get_accessible_docs(conn, email):
        is_owner = _normalize_email(row["owner_email"]) == email_key
        owner = _get_user(conn, row["owner_email"])
        access_count = conn.execute(
            """
            SELECT COUNT(*) AS c
            FROM document_access
            WHERE document_id = ?
              AND lower(role) != 'owner'
            """,
            (row["id"],),
        ).fetchone()["c"]
        layout_json = row["layout_json"] or ""
        docs.append(
            {
                "id": row["id"],
                "name": row["name"],
                "role": row["role"],
                "ownerEmail": row["owner_email"],
                "ownerName": (owner["name"] if owner and owner["name"] else None) or row["owner_email"],
                "folderId": row["folder_id"] if is_owner else None,
                "isOwned": is_owner,
                "isActive": row["id"] == active_doc_id,
                "createdAt": row["created_at"],
                "updatedAt": row["updated_at"],
                "sizeBytes": len(layout_json.encode("utf-8")) if isinstance(layout_json, str) else 0,
                "accessCount": int(access_count or 0),
            }
        )
    return docs


def _list_folders(conn, email):
    email_key = _normalize_email(email)
    rows = conn.execute(
        """
        SELECT id, name, sort_order, created_at, updated_at
        FROM user_folders
        WHERE lower(email) = ?
        ORDER BY sort_order ASC, created_at ASC, name ASC
        """,
        (email_key,),
    ).fetchall()
    return [
        {
            "id": row["id"],
            "name": row["name"],
            "sortOrder": row["sort_order"],
            "createdAt": row["created_at"],
            "updatedAt": row["updated_at"],
        }
        for row in rows
    ]


def _get_folder_for_user(conn, email, folder_id):
    email_key = _normalize_email(email)
    safe_id = str(folder_id or "").strip()
    if not safe_id:
        return None
    return conn.execute(
        "SELECT * FROM user_folders WHERE id = ? AND lower(email) = ? LIMIT 1",
        (safe_id, email_key),
    ).fetchone()


def _get_active_doc(conn, email):
    active_doc_id = str(session.get("active_document_id") or "").strip()
    if active_doc_id:
        row = _get_doc_for_user(conn, email, active_doc_id)
        if row:
            # Normalize legacy UUID aliases stored in the session to the canonical id.
            if active_doc_id != row["id"]:
                session["active_document_id"] = row["id"]
            return row
    rows = _get_accessible_docs(conn, email)
    if not rows:
        return None
    session["active_document_id"] = rows[0]["id"]
    return rows[0]


def _doc_payload(row, include_layout=True):
    if not row:
        return None
    payload = {
        "id": row["id"],
        "name": row["name"],
        "role": row["role"],
        "ownerEmail": row["owner_email"],
        "updatedAt": row["updated_at"],
        "createdAt": row["created_at"] if "created_at" in row.keys() else None,
    }
    if include_layout:
        payload["layout"] = json.loads(row["layout_json"])
    return payload


def _normalize_doc_ts(value):
    text = str(value or "").strip()
    if not text:
        return ""
    # Accept ISO and SQLite datetime forms; preserve fractional seconds when present.
    text = text.replace("T", " ").replace("Z", "")
    if "." in text:
        main, frac = text.split(".", 1)
        digits = "".join(ch for ch in frac if ch.isdigit())[:6]
        return f"{main[:19]}.{digits}" if digits else main[:19]
    return text[:19]


def _new_doc_ts(prev=None):
    """UTC document version stamp with microsecond precision; always advances vs prev."""
    stamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S.%f")
    if prev and _normalize_doc_ts(stamp) <= _normalize_doc_ts(prev):
        # Guaranteed lexical advance within the same wall-clock microsecond.
        base = _normalize_doc_ts(prev)
        stamp = f"{base}+"
    return stamp


PRESENCE_TTL_SECONDS = 45


def _atomic_update_layout(conn, doc_id, layout_json, base_updated_at, name=None):
    """Optimistic lock: update only if updated_at still matches the client's base.

    Returns (fresh_row_dict_or_none, error_code_or_none, server_updated_at).
    Uses the exact DB timestamp in WHERE to close the check-then-write race.
    """
    row = conn.execute(
        "SELECT id, updated_at, layout_json, name FROM user_documents WHERE id = ?",
        (doc_id,),
    ).fetchone()
    if not row:
        return None, "not_found", None
    server_ts = row["updated_at"]
    if not base_updated_at:
        return row, "baseUpdatedAt_required", server_ts
    if _normalize_doc_ts(base_updated_at) != _normalize_doc_ts(server_ts):
        return row, "conflict", server_ts
    next_ts = _new_doc_ts(server_ts)
    if name is not None:
        cur = conn.execute(
            """
            UPDATE user_documents
            SET name = ?, layout_json = ?, updated_at = ?
            WHERE id = ? AND updated_at = ?
            """,
            (name, layout_json, next_ts, doc_id, server_ts),
        )
    else:
        cur = conn.execute(
            """
            UPDATE user_documents
            SET layout_json = ?, updated_at = ?
            WHERE id = ? AND updated_at = ?
            """,
            (layout_json, next_ts, doc_id, server_ts),
        )
    if cur.rowcount != 1:
        fresh = conn.execute(
            "SELECT id, updated_at, layout_json, name FROM user_documents WHERE id = ?",
            (doc_id,),
        ).fetchone()
        return fresh, "conflict", fresh["updated_at"] if fresh else server_ts
    conn.commit()
    fresh = conn.execute(
        "SELECT id, updated_at, layout_json, name FROM user_documents WHERE id = ?",
        (doc_id,),
    ).fetchone()
    return fresh, None, fresh["updated_at"] if fresh else None


def _purge_stale_presence(conn, doc_id):
    conn.execute(
        """
        DELETE FROM document_presence
        WHERE document_id = ?
          AND last_seen < datetime('now', ?)
        """,
        (doc_id, f"-{PRESENCE_TTL_SECONDS} seconds"),
    )


def _list_presence(conn, doc_id, exclude_session_id=None):
    _purge_stale_presence(conn, doc_id)
    rows = conn.execute(
        """
        SELECT user_email, display_name, session_id, last_seen
        FROM document_presence
        WHERE document_id = ?
        ORDER BY last_seen DESC
        """,
        (doc_id,),
    ).fetchall()
    editors = []
    for row in rows:
        if exclude_session_id and row["session_id"] == exclude_session_id:
            continue
        editors.append(
            {
                "email": row["user_email"],
                "name": row["display_name"] or row["user_email"],
                "sessionId": row["session_id"],
                "lastSeen": row["last_seen"],
            }
        )
    return editors


def _get_doc_row(conn, doc_id):
    canonical_id = _resolve_doc_id(conn, doc_id)
    if not canonical_id:
        return None
    return conn.execute("SELECT * FROM user_documents WHERE id = ?", (canonical_id,)).fetchone()


def _new_public_link_token(conn):
    for _ in range(32):
        token = secrets.token_hex(6)
        exists = conn.execute(
            "SELECT 1 FROM user_documents WHERE public_link_token = ? LIMIT 1",
            (token,),
        ).fetchone()
        if not exists:
            return token
    raise RuntimeError("failed to generate unique public link token")


def _app_base_url():
    if PUBLIC_BASE_URL:
        return PUBLIC_BASE_URL
    return request.host_url.rstrip("/")


def _public_link_info(row):
    if not row:
        return {"enabled": False, "path": None, "url": None}
    enabled = bool(row["public_link_enabled"]) and bool(row["public_link_token"])
    path = f"/p/{row['public_link_token']}" if enabled else None
    url = _app_base_url() + path if path else None
    return {"enabled": enabled, "path": path, "url": url, "token": row["public_link_token"] if enabled else None}


def _get_doc_by_public_token_only(conn, token):
    safe_token = str(token or "").strip()
    if not safe_token:
        return None
    return conn.execute(
        """
        SELECT *
        FROM user_documents
        WHERE public_link_enabled = 1
          AND public_link_token = ?
        LIMIT 1
        """,
        (safe_token,),
    ).fetchone()


def _get_doc_by_public_token(conn, doc_id, token):
    canonical_id = _resolve_doc_id(conn, doc_id)
    if not canonical_id:
        return None
    safe_token = str(token or "").strip()
    if not safe_token:
        return None
    return conn.execute(
        """
        SELECT *
        FROM user_documents
        WHERE id = ?
          AND public_link_enabled = 1
          AND public_link_token = ?
        LIMIT 1
        """,
        (canonical_id, safe_token),
    ).fetchone()


def _public_layout_payload(row):
    try:
        layout = json.loads(row["layout_json"])
    except Exception:
        layout = _blank_layout()
    response = jsonify(
        {
            "documentId": row["id"],
            "documentName": row["name"],
            "documentRole": ROLE_READER,
            "publicView": True,
            "layout": layout,
        }
    )
    response.headers["X-Robots-Tag"] = "noindex, nofollow"
    return response


def _spa_index_response(extra_headers=None):
    response = make_response(send_from_directory(BASE_DIR, "index.html"))
    for key, value in (extra_headers or {}).items():
        response.headers[key] = value
    return response


def _share_payload(conn, doc_id):
    canonical_id = _resolve_doc_id(conn, doc_id) or str(doc_id or "").strip()
    access_rows = conn.execute(
        """
        SELECT user_email, role, created_at, updated_at
        FROM document_access
        WHERE document_id = ?
        ORDER BY CASE role
          WHEN 'owner' THEN 4
          WHEN 'admin' THEN 3
          WHEN 'editor' THEN 2
          ELSE 1
        END DESC, user_email ASC
        """,
        (canonical_id,),
    ).fetchall()
    result = []
    for row in access_rows:
        user = _get_user(conn, row["user_email"])
        result.append(
            {
                "email": row["user_email"],
                "name": user["name"] if user else row["user_email"],
                "role": row["role"],
                "createdAt": row["created_at"],
                "updatedAt": row["updated_at"],
                "hasPassword": bool(user and user["password_hash"]),
            }
        )
    return result


def _remember_share_contact(conn, owner_email, contact_email, contact_name=None):
    owner = _normalize_email(owner_email)
    contact = _normalize_email(contact_email)
    if not owner or not contact or owner == contact:
        return
    name = str(contact_name or "").strip()
    if not name:
        user = _get_user(conn, contact)
        name = (user["name"] if user else "") or contact
    conn.execute(
        """
        INSERT INTO share_contacts(owner_email, contact_email, contact_name, last_shared_at)
        VALUES(?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(owner_email, contact_email) DO UPDATE SET
          contact_name = COALESCE(NULLIF(excluded.contact_name, ''), share_contacts.contact_name),
          last_shared_at = CURRENT_TIMESTAMP
        """,
        (owner, contact, name),
    )


def _list_share_contacts(conn, owner_email, limit=100):
    owner = _normalize_email(owner_email)
    rows = conn.execute(
        """
        SELECT
          c.contact_email AS email,
          COALESCE(NULLIF(trim(u.name), ''), NULLIF(trim(u.display_name), ''), NULLIF(trim(c.contact_name), ''), c.contact_email) AS name,
          c.last_shared_at AS lastSharedAt,
          CASE WHEN u.password_hash IS NOT NULL AND trim(u.password_hash) <> '' THEN 1 ELSE 0 END AS hasPassword
        FROM share_contacts c
        LEFT JOIN users u ON lower(trim(u.email)) = c.contact_email
        WHERE c.owner_email = ?
        ORDER BY datetime(c.last_shared_at) DESC, c.contact_email ASC
        LIMIT ?
        """,
        (owner, int(limit)),
    ).fetchall()
    return [
        {
            "email": row["email"],
            "name": row["name"] or row["email"],
            "lastSharedAt": row["lastSharedAt"],
            "hasPassword": bool(row["hasPassword"]),
        }
        for row in rows
    ]


def _client_ip():
    forwarded = str(request.headers.get("X-Forwarded-For") or "").strip()
    if forwarded:
        return forwarded.split(",")[0].strip()
    return str(request.remote_addr or "127.0.0.1")


def _rate_limit_public():
    ip = _client_ip()
    now = time.time()
    bucket = [stamp for stamp in _public_rate_buckets.get(ip, []) if now - stamp < PUBLIC_RATE_WINDOW_SEC]
    if len(bucket) >= PUBLIC_RATE_LIMIT:
        return False
    bucket.append(now)
    _public_rate_buckets[ip] = bucket
    return True


def _new_comment_id(conn):
    for _ in range(32):
        comment_id = secrets.token_hex(6)
        if not conn.execute("SELECT 1 FROM document_comments WHERE id = ?", (comment_id,)).fetchone():
            return comment_id
    raise RuntimeError("failed to generate unique comment id")


def _comment_payload(conn, row):
    user = _get_user(conn, row["author_email"])
    try:
        anchor = json.loads(row["anchor_json"])
    except Exception:
        anchor = {}
    if not isinstance(anchor, dict):
        anchor = {}
    return {
        "id": row["id"],
        "documentId": row["document_id"],
        "authorEmail": row["author_email"],
        "authorName": (user["name"] if user else row["author_email"]),
        "anchorType": row["anchor_type"],
        "anchor": anchor,
        "body": row["body"],
        "status": row["status"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def _list_comments(conn, doc_id):
    rows = conn.execute(
        """
        SELECT * FROM document_comments
        WHERE document_id = ?
        ORDER BY datetime(created_at) ASC, id ASC
        """,
        (doc_id,),
    ).fetchall()
    return [_comment_payload(conn, row) for row in rows]


def _get_comment_row(conn, doc_id, comment_id):
    return conn.execute(
        "SELECT * FROM document_comments WHERE document_id = ? AND id = ? LIMIT 1",
        (doc_id, comment_id),
    ).fetchone()


@app.after_request
def _security_headers(response):
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    return response


@app.route("/")
def root():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/login")
@app.route("/register")
def spa_auth():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/d/<doc_id>")
def spa_document(doc_id):
    if not _is_valid_doc_id(doc_id):
        return "Not found", 404
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/d/<doc_id>/<sheet_id>")
def spa_document_sheet(doc_id, sheet_id):
    if not _is_valid_doc_id(doc_id):
        return "Not found", 404
    if not str(sheet_id or "").isdigit() or int(sheet_id) < 1:
        return "Not found", 404
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/p/<doc_id>/<token>")
def spa_public_legacy(doc_id, token):
    if not _is_valid_doc_id(doc_id) or not str(token or "").strip():
        return "Not found", 404
    return _spa_index_response({"X-Robots-Tag": "noindex, nofollow"})


@app.route("/p/<token>")
def spa_public(token):
    safe = str(token or "").strip()
    if not safe:
        return "Not found", 404
    return _spa_index_response({"X-Robots-Tag": "noindex, nofollow"})


@app.route("/auth/register", methods=["POST"])
def register_password():
    payload = request.get_json(force=True, silent=True) or {}
    email = _normalize_email(payload.get("email"))
    password = str(payload.get("password") or "")
    name = str(payload.get("name") or email).strip() or email
    if not email or "@" not in email:
        return jsonify({"error": "invalid_email"}), 400
    if len(password) < 6:
        return jsonify({"error": "password_too_short"}), 400

    conn = _db()
    existing = _get_user(conn, email)
    if existing and existing["password_hash"]:
        conn.close()
        return jsonify({"error": "email_taken"}), 409
    _upsert_user(conn, email, name=name, password_hash=_hash_password(password), auth_provider="password")
    _ensure_seed_document(conn, email)
    conn.commit()
    conn.close()
    _set_session_user(email, name)
    return jsonify({"ok": True})


@app.route("/auth/login", methods=["POST"])
def login_password():
    payload = request.get_json(force=True, silent=True) or {}
    email = _normalize_email(payload.get("email"))
    password = str(payload.get("password") or "")
    if not email or not password:
        return jsonify({"error": "invalid_credentials"}), 400
    conn = _db()
    user = _get_user(conn, email)
    if not user:
        conn.close()
        return jsonify({"error": "invalid_credentials"}), 401
    if not user["password_hash"]:
        conn.close()
        return jsonify({"error": "password_not_set"}), 401
    if not _verify_password(password, user["password_hash"]):
        conn.close()
        return jsonify({"error": "invalid_credentials"}), 401
    _ensure_seed_document(conn, email)
    conn.commit()
    conn.close()
    _set_session_user(email, user["name"] or email)
    return jsonify({"ok": True})


@app.route("/auth/google")
def login_google():
    return redirect("/")


@app.route("/auth/google/callback")
def auth_google_callback():
    return redirect("/")


@app.route("/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.route("/api/me")
def me():
    email = _current_email()
    if not email:
        return jsonify({"authenticated": False})

    conn = _get_docs_conn(email)
    user = _get_user(conn, email)
    active = _get_active_doc(conn, email)
    docs = _list_docs(conn, email)
    conn.close()
    return jsonify(
        {
            "authenticated": True,
            "email": email,
            "name": (user["name"] if user else session.get("name")) or email,
            "authProvider": user["auth_provider"] if user else "password",
            "hasPassword": bool(user and user["password_hash"]),
            "needsPasswordSetup": bool(user and not user["password_hash"]),
            "activeDocumentId": active["id"] if active else None,
            "activeDocumentName": active["name"] if active else None,
            "activeDocumentRole": active["role"] if active else None,
            "documents": docs,
        }
    )


@app.route("/api/me/share-contacts", methods=["GET"])
@require_login
def get_share_contacts():
    email = _current_email()
    conn = _db()
    contacts = _list_share_contacts(conn, email)
    conn.close()
    return jsonify({"contacts": contacts})


@app.route("/api/me/profile", methods=["PATCH"])
@require_login
def update_me_profile():
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "").strip()
    email = _current_email()
    if not name:
        return jsonify({"error": "invalid_name"}), 400
    conn = _db()
    _upsert_user(conn, email, name=name)
    conn.commit()
    user = _get_user(conn, email)
    conn.close()
    session["name"] = name
    return jsonify(
        {
            "ok": True,
            "email": email,
            "name": user["name"] if user else name,
            "authProvider": user["auth_provider"] if user else "password",
            "hasPassword": bool(user and user["password_hash"]),
            "needsPasswordSetup": bool(user and not user["password_hash"]),
        }
    )


@app.route("/api/me/password", methods=["POST"])
@require_login
def update_me_password():
    payload = request.get_json(force=True, silent=True) or {}
    current_password = str(payload.get("currentPassword") or "")
    new_password = str(payload.get("newPassword") or "")
    email = _current_email()
    if len(new_password) < 6:
        return jsonify({"error": "password_too_short"}), 400
    conn = _db()
    user = _get_user(conn, email)
    if not user:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if user["password_hash"]:
        if not current_password or not _verify_password(current_password, user["password_hash"]):
            conn.close()
            return jsonify({"error": "invalid_current_password"}), 400
    _upsert_user(conn, email, password_hash=_hash_password(new_password), auth_provider=user["auth_provider"] or "password")
    conn.commit()
    user = _get_user(conn, email)
    conn.close()
    return jsonify(
        {
            "ok": True,
            "hasPassword": bool(user and user["password_hash"]),
            "needsPasswordSetup": bool(user and not user["password_hash"]),
        }
    )


def _token_public_row(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "scopes": sorted(_parse_scopes(row["scopes"])),
        "tokenPrefix": row["token_prefix"],
        "createdAt": row["created_at"],
        "lastUsedAt": row["last_used_at"],
        "revokedAt": row["revoked_at"],
    }


@app.route("/api/me/tokens", methods=["GET"])
@require_login
def list_api_tokens():
    email = _current_email()
    conn = _db()
    rows = conn.execute(
        """
        SELECT * FROM api_tokens
        WHERE lower(email) = ? AND revoked_at IS NULL
        ORDER BY created_at DESC
        """,
        (email,),
    ).fetchall()
    conn.close()
    return jsonify({"tokens": [_token_public_row(row) for row in rows]})


@app.route("/api/me/tokens", methods=["POST"])
@require_login
def create_api_token():
    # Only session users may mint tokens (not another PAT).
    if getattr(g, "auth_via", None) == "bearer":
        return jsonify({"error": "forbidden"}), 403
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Cursor MCP").strip() or "Cursor MCP"
    scopes = _parse_scopes(payload.get("scopes") or ["docs:read", "docs:write"])
    email = _current_email()
    raw_token = API_TOKEN_PREFIX + secrets.token_urlsafe(32)
    token_id = secrets.token_hex(8)
    prefix = raw_token[:10] + "…"
    conn = _db()
    conn.execute(
        """
        INSERT INTO api_tokens(id, email, token_hash, name, scopes, token_prefix, created_at)
        VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        """,
        (token_id, email, _hash_api_token(raw_token), name, _scopes_csv(scopes), prefix),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM api_tokens WHERE id = ?", (token_id,)).fetchone()
    conn.close()
    return jsonify({"ok": True, "token": raw_token, "item": _token_public_row(row)}), 201


@app.route("/api/me/tokens/<token_id>", methods=["DELETE"])
@require_login
def revoke_api_token(token_id):
    if getattr(g, "auth_via", None) == "bearer":
        return jsonify({"error": "forbidden"}), 403
    email = _current_email()
    conn = _db()
    row = conn.execute(
        "SELECT * FROM api_tokens WHERE id = ? AND lower(email) = ? LIMIT 1",
        (str(token_id or "").strip(), email),
    ).fetchone()
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    conn.execute(
        "UPDATE api_tokens SET revoked_at = CURRENT_TIMESTAMP WHERE id = ?",
        (row["id"],),
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


@app.route("/api/mcp/config")
@require_login
def mcp_client_config():
    """Ready-to-copy Cursor MCP config (without a live token value)."""
    base = _app_base_url()
    return jsonify(
        {
            "mcpUrl": f"{base}/mcp",
            "apiBase": f"{base}/api/v1",
            "oauthAuthorizationServer": f"{base}/.well-known/oauth-authorization-server",
            "oauthProtectedResource": f"{base}/.well-known/oauth-protected-resource",
            "chatgpt": {
                "mcpUrl": f"{base}/mcp",
                "auth": "oauth2",
                "hint": "В ChatGPT добавьте remote MCP URL. Авторизация — через OAuth (логин MM Table), не через PAT.",
            },
            "cursorConfig": {
                "mcpServers": {
                    "mmtable": {
                        "url": f"{base}/mcp",
                        "headers": {"Authorization": "Bearer <PASTE_TOKEN_HERE>"},
                    }
                }
            },
        }
    )


@app.route("/api/docs", methods=["GET"])
@require_login
def list_docs():
    email = _current_email()
    conn = _get_docs_conn(email)
    active = _get_active_doc(conn, email)
    docs = _list_docs(conn, email)
    folders = _list_folders(conn, email)
    conn.close()
    return jsonify(
        {
            "documents": docs,
            "folders": folders,
            "activeDocumentId": active["id"] if active else None,
            "activeDocumentName": active["name"] if active else None,
            "activeDocumentRole": active["role"] if active else None,
        }
    )


@app.route("/api/folders", methods=["GET"])
@require_login
def list_folders():
    email = _current_email()
    conn = _get_docs_conn(email)
    folders = _list_folders(conn, email)
    conn.close()
    return jsonify({"folders": folders})


@app.route("/api/folders", methods=["POST"])
@require_login
def create_folder():
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Новая папка").strip() or "Новая папка"
    email = _current_email()
    conn = _get_docs_conn(email)
    folder_id = _new_folder_id(conn)
    sort_order = conn.execute(
        "SELECT COALESCE(MAX(sort_order), -1) + 1 FROM user_folders WHERE lower(email) = ?",
        (_normalize_email(email),),
    ).fetchone()[0]
    conn.execute(
        """
        INSERT INTO user_folders(id, email, name, sort_order, created_at, updated_at)
        VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (folder_id, email, name, sort_order),
    )
    conn.commit()
    folders = _list_folders(conn, email)
    conn.close()
    return jsonify({"ok": True, "folderId": folder_id, "folders": folders})


@app.route("/api/folders/<folder_id>", methods=["PATCH"])
@require_login
def update_folder(folder_id):
    payload = request.get_json(force=True, silent=True) or {}
    name = payload.get("name")
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_folder_for_user(conn, email, folder_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if isinstance(name, str) and name.strip():
        conn.execute(
            "UPDATE user_folders SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (name.strip(), folder_id),
        )
    conn.commit()
    folders = _list_folders(conn, email)
    conn.close()
    return jsonify({"ok": True, "folders": folders})


@app.route("/api/folders/<folder_id>", methods=["DELETE"])
@require_login
def delete_folder(folder_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_folder_for_user(conn, email, folder_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    conn.execute("UPDATE user_documents SET folder_id = NULL WHERE folder_id = ?", (folder_id,))
    conn.execute("DELETE FROM user_folders WHERE id = ?", (folder_id,))
    conn.commit()
    docs = _list_docs(conn, email)
    folders = _list_folders(conn, email)
    conn.close()
    return jsonify({"ok": True, "documents": docs, "folders": folders})


@app.route("/api/docs", methods=["POST"])
@require_login
def create_doc():
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Новый документ").strip() or "Новый документ"
    source_id = str(payload.get("sourceDocumentId") or payload.get("sourceDocId") or "").strip() or None
    email = _current_email()
    conn = _get_docs_conn(email)
    layout = _blank_layout()
    # Explicit layout wins (used to preserve local edits on save conflict → copy).
    raw_layout = payload.get("layout")
    if isinstance(raw_layout, dict) and isinstance(raw_layout.get("sheets"), list) and raw_layout.get("sheets"):
        layout = raw_layout
    elif source_id:
        source_row = _get_doc_for_user(conn, email, source_id)
        if source_row:
            try:
                layout = json.loads(source_row["layout_json"])
            except Exception:
                layout = _blank_layout()

    doc_id = _new_doc_id(conn)
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (doc_id, email, name, json.dumps(layout, ensure_ascii=False)),
    )
    conn.execute(
        "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
        (doc_id, email, ROLE_OWNER),
    )
    conn.commit()
    session["active_document_id"] = doc_id
    docs = _list_docs(conn, email)
    row = _get_doc_for_user(conn, email, doc_id)
    conn.close()
    return jsonify(
        {
            "ok": True,
            "document": _doc_payload(row),
            "documents": docs,
            "activeDocumentId": doc_id,
            "activeDocumentRole": ROLE_OWNER,
        }
    )


@app.route("/api/docs/<doc_id>", methods=["GET"])
@require_login
def get_doc(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    conn.close()
    if not row:
        return jsonify({"error": "not_found"}), 404
    return jsonify({"document": _doc_payload(row)})


@app.route("/api/docs/<doc_id>", methods=["PUT"])
@require_login
def update_doc(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    name = payload.get("name")
    layout = payload.get("layout")
    base_updated_at = str(payload.get("baseUpdatedAt") or "").strip() or None
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_key = row["id"]
    if isinstance(layout, dict):
        sheets = layout.get("sheets")
        if not isinstance(sheets, list) or len(sheets) == 0:
            conn.close()
            return jsonify({"error": "layout_sheets_required"}), 400
        next_name = name.strip() if isinstance(name, str) and name.strip() else None
        fresh, err, server_ts = _atomic_update_layout(
            conn,
            doc_key,
            json.dumps(layout, ensure_ascii=False),
            base_updated_at,
            name=next_name,
        )
        if err == "not_found":
            conn.close()
            return jsonify({"error": "not_found"}), 404
        if err:
            conn.close()
            return jsonify(
                {
                    "error": err,
                    "serverUpdatedAt": server_ts,
                    "message": "Документ уже изменён в другом окне или у другого пользователя.",
                }
            ), 409
        # Name already applied atomically with layout when provided.
        name = None
    elif isinstance(name, str) and name.strip():
        # Metadata-only rename: do not bump updated_at so canvas editors keep a valid base.
        conn.execute(
            "UPDATE user_documents SET name = ? WHERE id = ?",
            (name.strip(), doc_key),
        )
    if "folderId" in payload:
        if _normalize_email(row["owner_email"]) != _normalize_email(email):
            conn.close()
            return jsonify({"error": "forbidden"}), 403
        folder_id = str(payload.get("folderId") or "").strip() or None
        if folder_id and not _get_folder_for_user(conn, email, folder_id):
            conn.close()
            return jsonify({"error": "folder_not_found"}), 404
        # Folder move is metadata-only — keep layout version stable.
        conn.execute(
            "UPDATE user_documents SET folder_id = ? WHERE id = ?",
            (folder_id, doc_key),
        )
    conn.commit()
    updated = _get_doc_for_user(conn, email, doc_key)
    conn.close()
    return jsonify({"ok": True, "document": _doc_payload(updated)})


@app.route("/api/docs/<doc_id>/activate", methods=["POST"])
@require_login
def activate_doc(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    conn.close()
    if not row:
        return jsonify({"error": "not_found"}), 404
    doc_key = row["id"]
    session["active_document_id"] = doc_key
    return jsonify(
        {
            "ok": True,
            "activeDocumentId": doc_key,
            "activeDocumentName": row["name"],
            "activeDocumentRole": row["role"],
            "document": _doc_payload(row),
        }
    )


@app.route("/api/docs/<doc_id>/copy", methods=["POST"])
@require_login
def copy_doc(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Копия документа").strip() or "Копия документа"
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    new_doc_id = _new_doc_id(conn)
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (new_doc_id, email, name, row["layout_json"]),
    )
    conn.execute(
        "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
        (new_doc_id, email, ROLE_OWNER),
    )
    conn.commit()
    session["active_document_id"] = new_doc_id
    docs = _list_docs(conn, email)
    created = _get_doc_for_user(conn, email, new_doc_id)
    conn.close()
    return jsonify(
        {
            "ok": True,
            "document": _doc_payload(created),
            "documents": docs,
            "activeDocumentId": new_doc_id,
            "activeDocumentRole": ROLE_OWNER,
        }
    )


@app.route("/api/docs/<doc_id>", methods=["DELETE"])
@require_login
def delete_doc(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if row["role"] != ROLE_OWNER:
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_key = row["id"]
    conn.execute("DELETE FROM document_access WHERE document_id = ?", (doc_key,))
    conn.execute("DELETE FROM user_documents WHERE id = ?", (doc_key,))
    conn.commit()
    _ensure_seed_document(conn, email)
    docs = _list_docs(conn, email)
    active = _get_active_doc(conn, email)
    conn.close()
    return jsonify(
        {
            "ok": True,
            "documents": docs,
            "activeDocumentId": active["id"] if active else None,
            "activeDocumentName": active["name"] if active else None,
            "activeDocumentRole": active["role"] if active else None,
        }
    )


@app.route("/api/docs/<doc_id>/access", methods=["GET"])
@require_login
def get_doc_access(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    access = _share_payload(conn, row["id"])
    conn.close()
    return jsonify({"access": access, "document": _doc_payload(row, include_layout=False)})


@app.route("/api/docs/<doc_id>/access", methods=["POST"])
@require_login
def grant_doc_access(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    target_email = _normalize_email(payload.get("email"))
    role = str(payload.get("role") or "").strip().lower()
    name = str(payload.get("name") or target_email).strip() or target_email
    email = _current_email()
    if not target_email or "@" not in target_email:
        return jsonify({"error": "invalid_email"}), 400
    typo_suggestion = _email_typo_suggestion(target_email)
    if typo_suggestion and typo_suggestion != target_email:
        return jsonify({"error": "email_typo_suspected", "suggestion": typo_suggestion}), 400
    if role not in SHAREABLE_ROLES:
        return jsonify({"error": "invalid_role"}), 400
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    if target_email == _normalize_email(row["owner_email"]):
        conn.close()
        return jsonify({"error": "owner_role_fixed"}), 400
    doc_key = row["id"]
    _upsert_user(conn, target_email, name=name)
    conn.execute(
        """
        INSERT OR IGNORE INTO document_access(document_id, user_email, role, created_at, updated_at)
        VALUES(?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (doc_key, target_email, role),
    )
    conn.execute(
        """
        UPDATE document_access
        SET role = ?, updated_at = CURRENT_TIMESTAMP
        WHERE document_id = ? AND lower(user_email) = ?
        """,
        (role, doc_key, target_email),
    )
    _remember_share_contact(conn, email, target_email, name)
    conn.commit()
    access = _share_payload(conn, doc_key)
    conn.close()
    return jsonify({"ok": True, "access": access})


@app.route("/api/docs/<doc_id>/public-link", methods=["GET"])
@require_login
def get_public_link(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_row = _get_doc_row(conn, doc_id)
    conn.close()
    return jsonify({"publicLink": _public_link_info(doc_row)})


@app.route("/api/docs/<doc_id>/public-link", methods=["POST"])
@require_login
def upsert_public_link(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    rotate = bool(payload.get("rotate"))
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_row = _get_doc_row(conn, doc_id)
    doc_key = doc_row["id"] if doc_row else row["id"]
    token = doc_row["public_link_token"] if doc_row else None
    if rotate or not token:
        token = _new_public_link_token(conn)
        conn.execute(
            """
            UPDATE user_documents
            SET public_link_enabled = 1,
                public_link_token = ?,
                public_link_rotated_at = CURRENT_TIMESTAMP,
                public_link_created_at = COALESCE(public_link_created_at, CURRENT_TIMESTAMP),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (token, doc_key),
        )
    else:
        conn.execute(
            """
            UPDATE user_documents
            SET public_link_enabled = 1,
                public_link_created_at = COALESCE(public_link_created_at, CURRENT_TIMESTAMP),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (doc_key,),
        )
    conn.commit()
    doc_row = _get_doc_row(conn, doc_key)
    conn.close()
    return jsonify({"ok": True, "publicLink": _public_link_info(doc_row)})


@app.route("/api/docs/<doc_id>/public-link", methods=["DELETE"])
@require_login
def disable_public_link(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    conn.execute(
        """
        UPDATE user_documents
        SET public_link_enabled = 0,
            public_link_token = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (row["id"],),
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True, "publicLink": {"enabled": False, "path": None, "url": None}})


@app.route("/api/public/p/<doc_id>/<token>")
def public_layout_legacy(doc_id, token):
    if not _rate_limit_public():
        return jsonify({"error": "rate_limited"}), 429
    conn = _db()
    row = _get_doc_by_public_token(conn, doc_id, token)
    conn.close()
    if not row:
        return jsonify({"error": "not_found"}), 404
    return _public_layout_payload(row)


@app.route("/api/public/p/<token>")
def public_layout(token):
    if not _rate_limit_public():
        return jsonify({"error": "rate_limited"}), 429
    conn = _db()
    row = _get_doc_by_public_token_only(conn, token)
    conn.close()
    if not row:
        return jsonify({"error": "not_found"}), 404
    return _public_layout_payload(row)


@app.route("/api/docs/<doc_id>/access/<path:target_email>", methods=["DELETE"])
@require_login
def revoke_doc_access(doc_id, target_email):
    email = _current_email()
    target_email = _normalize_email(target_email)
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    if target_email == _normalize_email(row["owner_email"]):
        conn.close()
        return jsonify({"error": "owner_role_fixed"}), 400
    conn.execute("DELETE FROM document_access WHERE document_id = ? AND lower(user_email) = ?", (row["id"], target_email))
    conn.commit()
    access = _share_payload(conn, row["id"])
    conn.close()
    return jsonify({"ok": True, "access": access})


@app.route("/api/layout", methods=["GET"])
@require_login
def get_layout():
    email = _current_email()
    conn = _get_docs_conn(email)
    active = _get_active_doc(conn, email)
    conn.close()
    if not active:
        return jsonify({"layout": None})
    return jsonify(
        {
            "layout": json.loads(active["layout_json"]),
            "documentId": active["id"],
            "documentName": active["name"],
            "documentRole": active["role"],
            "updatedAt": active["updated_at"],
        }
    )


@app.route("/api/layout", methods=["POST"])
@require_login
def save_layout():
    payload = request.get_json(force=True, silent=True) or {}
    layout = payload.get("layout")
    # Require an explicit documentId so a stale session active doc cannot absorb
    # another document's canvas during tab/document switches.
    doc_id = str(payload.get("documentId") or "").strip() or None
    base_updated_at = str(payload.get("baseUpdatedAt") or "").strip() or None
    if not isinstance(layout, dict):
        return jsonify({"error": "layout must be object"}), 400
    if not doc_id:
        return jsonify({"error": "documentId required"}), 400
    sheets = layout.get("sheets")
    # Guard against wipe bugs that POST {"schemaVersion":3,"activeSheetId":1,"sheets":[]}.
    if not isinstance(sheets, list) or len(sheets) == 0:
        return jsonify({"error": "layout_sheets_required"}), 400
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    existing_raw = row["layout_json"] or ""
    layout_json = json.dumps(layout, ensure_ascii=False)
    # Refuse replacing a non-trivial document with a near-empty payload.
    if len(existing_raw) > 500 and len(layout_json) < 200:
        conn.close()
        return jsonify({"error": "refusing_empty_overwrite", "serverUpdatedAt": row["updated_at"]}), 409
    fresh, err, server_ts = _atomic_update_layout(conn, row["id"], layout_json, base_updated_at)
    if err == "not_found":
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if err == "baseUpdatedAt_required":
        conn.close()
        return jsonify(
            {
                "error": "baseUpdatedAt_required",
                "serverUpdatedAt": server_ts,
                "message": "Обновите страницу: открыта устаревшая сессия сохранения.",
            }
        ), 409
    if err:
        conn.close()
        return jsonify(
            {
                "error": "conflict",
                "serverUpdatedAt": server_ts,
                "clientBaseUpdatedAt": base_updated_at,
                "message": "Документ уже изменён в другом окне или у другого пользователя.",
            }
        ), 409
    conn.close()
    session["active_document_id"] = row["id"]
    return jsonify({"ok": True, "updatedAt": fresh["updated_at"] if fresh else None})


@app.route("/api/docs/<doc_id>/presence", methods=["GET", "POST", "DELETE"])
@require_login
def doc_presence(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_READER):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_key = row["id"]
    payload = request.get_json(force=True, silent=True) or {}
    session_id = str(payload.get("sessionId") or request.args.get("sessionId") or "").strip()

    if request.method == "DELETE":
        if session_id:
            conn.execute(
                "DELETE FROM document_presence WHERE document_id = ? AND session_id = ?",
                (doc_key, session_id),
            )
            conn.commit()
        editors = _list_presence(conn, doc_key)
        conn.close()
        return jsonify({"ok": True, "editors": editors})

    if request.method == "POST":
        if not session_id:
            conn.close()
            return jsonify({"error": "sessionId_required"}), 400
        if not _is_role_at_least(row["role"], ROLE_EDITOR):
            # Readers may poll presence but should not register as editors.
            editors = _list_presence(conn, doc_key, exclude_session_id=session_id)
            conn.close()
            return jsonify({"ok": True, "editors": editors, "selfRegistered": False})
        display_name = (
            str(session.get("name") or session.get("display_name") or "").strip()
            or email
        )
        conn.execute(
            """
            INSERT INTO document_presence(document_id, user_email, display_name, session_id, last_seen)
            VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(document_id, session_id) DO UPDATE SET
              user_email = excluded.user_email,
              display_name = excluded.display_name,
              last_seen = CURRENT_TIMESTAMP
            """,
            (doc_key, email, display_name, session_id),
        )
        conn.commit()
        editors = _list_presence(conn, doc_key, exclude_session_id=session_id)
        conn.close()
        return jsonify({"ok": True, "editors": editors, "selfRegistered": True})

    editors = _list_presence(conn, doc_key, exclude_session_id=session_id or None)
    conn.close()
    return jsonify({"ok": True, "editors": editors})


@app.route("/api/docs/<doc_id>/comments", methods=["GET"])
@require_login
def list_doc_comments(doc_id):
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_READER):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    comments = _list_comments(conn, row["id"])
    conn.close()
    return jsonify({"comments": comments})


@app.route("/api/docs/<doc_id>/comments", methods=["POST"])
@require_login
def create_doc_comment(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    body = str(payload.get("body") or "").strip()
    anchor_type = str(payload.get("anchorType") or "document").strip().lower()
    anchor = payload.get("anchor")
    email = _current_email()
    if not body:
        return jsonify({"error": "empty_body"}), 400
    if anchor_type not in COMMENT_ANCHOR_TYPES:
        return jsonify({"error": "invalid_anchor_type"}), 400
    if not isinstance(anchor, dict):
        anchor = {}
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_COMMENTER):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_key = row["id"]
    comment_id = _new_comment_id(conn)
    conn.execute(
        """
        INSERT INTO document_comments(
          id, document_id, author_email, anchor_type, anchor_json, body, status, created_at, updated_at
        ) VALUES(?, ?, ?, ?, ?, ?, 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (
            comment_id,
            doc_key,
            email,
            anchor_type,
            json.dumps(anchor, ensure_ascii=False),
            body,
        ),
    )
    conn.commit()
    created = _get_comment_row(conn, doc_key, comment_id)
    comment = _comment_payload(conn, created)
    conn.close()
    return jsonify({"ok": True, "comment": comment})


@app.route("/api/docs/<doc_id>/comments/<comment_id>", methods=["PATCH"])
@require_login
def update_doc_comment(doc_id, comment_id):
    payload = request.get_json(force=True, silent=True) or {}
    body = str(payload.get("body") or "").strip()
    email = _current_email()
    if not body:
        return jsonify({"error": "empty_body"}), 400
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    doc_key = row["id"]
    comment = _get_comment_row(conn, doc_key, comment_id)
    if not comment:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    is_author = _normalize_email(comment["author_email"]) == email
    is_admin = _is_role_at_least(row["role"], ROLE_ADMIN)
    if not is_author and not is_admin:
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    conn.execute(
        """
        UPDATE document_comments
        SET body = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND document_id = ?
        """,
        (body, comment_id, doc_key),
    )
    conn.commit()
    updated = _get_comment_row(conn, doc_key, comment_id)
    payload_comment = _comment_payload(conn, updated)
    conn.close()
    return jsonify({"ok": True, "comment": payload_comment})


@app.route("/api/docs/<doc_id>/comments/<comment_id>/resolve", methods=["POST"])
@require_login
def resolve_doc_comment(doc_id, comment_id):
    payload = request.get_json(force=True, silent=True) or {}
    status = str(payload.get("status") or "resolved").strip().lower()
    email = _current_email()
    if status not in COMMENT_STATUSES:
        return jsonify({"error": "invalid_status"}), 400
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    doc_key = row["id"]
    comment = _get_comment_row(conn, doc_key, comment_id)
    if not comment:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    conn.execute(
        """
        UPDATE document_comments
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND document_id = ?
        """,
        (status, comment_id, doc_key),
    )
    conn.commit()
    updated = _get_comment_row(conn, doc_key, comment_id)
    payload_comment = _comment_payload(conn, updated)
    conn.close()
    return jsonify({"ok": True, "comment": payload_comment})


@app.route("/api/title")
def resolve_title():
    raw_url = (request.args.get("url") or "").strip()
    if not raw_url:
        return jsonify({"title": None, "source": "empty"}), 400

    parsed = urlparse(raw_url)
    if parsed.scheme not in ("http", "https"):
        return jsonify({"title": None, "source": "invalid_scheme"}), 400

    try:
        google_title = _google_title_from_export(raw_url)
        if google_title:
            return jsonify({"title": google_title, "source": "google_export"})
    except Exception:
        pass

    try:
        req = Request(
            raw_url,
            headers={
                "User-Agent": "Mozilla/5.0",
                "Accept-Language": "ru,en;q=0.8",
            },
        )
        with urlopen(req, timeout=8) as resp:
            content_type = resp.headers.get("Content-Type", "")
            if "text/html" not in content_type:
                return jsonify({"title": parsed.netloc, "source": "non_html"})
            html_text = resp.read(200000).decode("utf-8", errors="ignore")
        title = _extract_title(html_text) or parsed.netloc
        return jsonify({"title": title, "source": "page"})
    except Exception:
        return jsonify({"title": parsed.netloc, "source": "fallback"})


def _extract_title(html_text):
    og = re.search(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']', html_text, re.IGNORECASE)
    if og:
        return og.group(1).strip()
    m = re.search(r"<title[^>]*>(.*?)</title>", html_text, re.IGNORECASE | re.DOTALL)
    if not m:
        return None
    title = re.sub(r"\s+", " ", m.group(1)).strip()
    return title or None


BITRIX_WEBHOOK_RE = re.compile(
    r"^https://[^/?#\s]+/rest/\d+/[a-zA-Z0-9_-]+/?$",
    re.IGNORECASE,
)


def _normalize_bitrix_webhook(url):
    text = str(url or "").strip()
    if not text:
        return ""
    text = text.split("#")[0].split("?")[0].strip()
    if not text.lower().startswith("https://"):
        return ""
    return text.rstrip("/") + "/"


def _is_valid_bitrix_webhook(url):
    normalized = _normalize_bitrix_webhook(url)
    return bool(normalized and BITRIX_WEBHOOK_RE.match(normalized))


def _verify_bitrix_webhook(webhook):
    normalized = _normalize_bitrix_webhook(webhook)
    if not _is_valid_bitrix_webhook(normalized):
        raise ValueError("invalid_webhook_url")
    _bitrix_call(normalized, "app.info")
    return normalized


def _mask_bitrix_webhook(url):
    raw = str(url or "").strip().rstrip("/")
    if not raw:
        return ""
    parts = raw.split("/")
    if len(parts) < 2:
        return raw
    parts[-1] = parts[-1][:4] + "…" if parts[-1] else "…"
    return "/".join(parts) + "/"


def _bitrix_domain_from_webhook(url):
    try:
        return urlparse(str(url or "").strip()).netloc or ""
    except Exception:
        return ""


def _get_user_bitrix_webhook(conn, email):
    row = _get_user(conn, email)
    if not row:
        return ""
    try:
        return str(row["bitrix_webhook_url"] or "").strip()
    except (KeyError, IndexError, TypeError):
        return ""


def _resolve_bitrix_webhook():
    email = _current_email()
    if email:
        conn = _db()
        try:
            stored = _get_user_bitrix_webhook(conn, email)
        finally:
            conn.close()
        if stored:
            return stored
    header_url = str(request.headers.get("X-Bitrix-Webhook") or "").strip()
    if header_url and _is_valid_bitrix_webhook(header_url):
        return _normalize_bitrix_webhook(header_url)
    env_url = os.getenv("BITRIX_WEBHOOK_URL", "").strip()
    if env_url and _is_valid_bitrix_webhook(env_url):
        return _normalize_bitrix_webhook(env_url)
    return ""


def _bitrix_call(webhook_url, method, params=None):
    base = str(webhook_url or "").strip().rstrip("/")
    if not base:
        raise ValueError("bitrix_not_configured")
    url = f"{base}/{method}"
    payload = json.dumps(params or {}, ensure_ascii=False).encode("utf-8")
    req = Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    try:
        with urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="ignore")
    except HTTPError as err:
        body = err.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"bitrix_http_{err.code}: {body[:240]}") from err
    except URLError as err:
        raise RuntimeError(f"bitrix_network_error: {err}") from err
    data = json.loads(body or "{}")
    if isinstance(data, dict) and data.get("error"):
        raise RuntimeError(f"bitrix_api_error: {data.get('error_description') or data.get('error')}")
    return data


def _bitrix_result_list(data):
    result = data.get("result") if isinstance(data, dict) else None
    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        for key in ("categories", "items", "stages", "statuses"):
            chunk = result.get(key)
            if isinstance(chunk, list):
                return chunk
    return []


def _bitrix_list_all(webhook_url, method, params=None):
    items = []
    start = 0
    params = dict(params or {})
    while True:
        page_params = dict(params)
        page_params["start"] = start
        data = _bitrix_call(webhook_url, method, page_params)
        chunk = _bitrix_result_list(data)
        items.extend(chunk)
        next_start = data.get("next")
        if next_start is None:
            break
        start = int(next_start)
        if start < 0:
            break
    return items


def _bitrix_pick_id(item):
    if not isinstance(item, dict):
        return None
    if item.get("id") is not None:
        return item.get("id")
    if item.get("ID") is not None:
        return item.get("ID")
    return None


def _bitrix_pick_name(item, fallback=""):
    return str(item.get("name") or item.get("NAME") or fallback).strip()


def _bitrix_pick_status_id(item):
    return str(item.get("STATUS_ID") or item.get("statusId") or item.get("status_id") or "").strip()


def _bitrix_pick_sort(item):
    try:
        return int(item.get("sort") or item.get("SORT") or 0)
    except (TypeError, ValueError):
        return 0


def _bitrix_fetch_deal_pipelines(webhook):
    pipelines = []
    try:
        categories = _bitrix_list_all(webhook, "crm.category.list", {"entityTypeId": 2})
        pipelines = [
            {
                "id": int(_bitrix_pick_id(item) if _bitrix_pick_id(item) is not None else 0),
                "name": _bitrix_pick_name(item, f"Воронка {_bitrix_pick_id(item)}"),
                "isDefault": str(item.get("isDefault") or item.get("IS_DEFAULT") or "").upper() == "Y",
            }
            for item in categories
            if _bitrix_pick_id(item) is not None
        ]
    except Exception:
        pipelines = []
    if pipelines:
        return pipelines
    legacy = _bitrix_list_all(webhook, "crm.dealcategory.list", {})
    return [
        {
            "id": int(_bitrix_pick_id(item) if _bitrix_pick_id(item) is not None else 0),
            "name": _bitrix_pick_name(item, f"Воронка {_bitrix_pick_id(item)}"),
            "isDefault": False,
        }
        for item in legacy
        if _bitrix_pick_id(item) is not None
    ]


def _parse_bitrix_datetime(value):
    raw = str(value or "").strip()
    if not raw:
        return None
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(raw[:19], fmt[: len(raw) if len(raw) < 19 else 19])
            return dt
        except ValueError:
            continue
    return None


def _bitrix_fetch_stage_history(webhook, entity, category_id, stage_id, date_from, date_to):
    entity_type_id = 1 if entity == "lead" else 2
    if not date_from:
        date_from = (datetime.utcnow() - timedelta(days=120)).strftime("%Y-%m-%d")
    if not date_to:
        date_to = datetime.utcnow().strftime("%Y-%m-%d")
    cache_key = (webhook, entity, int(category_id or 0), str(stage_id or ""), date_from, date_to)
    cached = _BITRIX_STAGE_HISTORY_CACHE.get(cache_key)
    if cached and (time.time() - cached[0]) < BITRIX_STAGE_HISTORY_CACHE_TTL_SEC:
        return cached[1]
    stage_filter = {
        "STAGE_ID": stage_id,
        ">=CREATED_TIME": date_from,
        "<=CREATED_TIME": f"{date_to} 23:59:59",
    }
    if entity == "deal":
        stage_filter["CATEGORY_ID"] = category_id
    params = {
        "entityTypeId": entity_type_id,
        "filter": stage_filter,
        "select": ["ID", "CREATED_TIME", "STAGE_ID", "OWNER_ID"],
        "order": {"CREATED_TIME": "ASC"},
    }
    if entity == "deal":
        params["categoryId"] = category_id
    history = _bitrix_list_all(webhook, "crm.stagehistory.list", params)
    _BITRIX_STAGE_HISTORY_CACHE[cache_key] = (time.time(), history)
    return history


def _bucket_stage_history(items, granularity, date_from, date_to, value_by_owner=None):
    start = _parse_bitrix_datetime(date_from) or (datetime.utcnow() - timedelta(days=90))
    end = _parse_bitrix_datetime(date_to) or datetime.utcnow()
    if end < start:
        start, end = end, start
    buckets = defaultdict(float)
    for item in items:
        created = _parse_bitrix_datetime(item.get("CREATED_TIME"))
        if not created:
            continue
        if created < start or created > end + timedelta(days=1):
            continue
        if granularity == "month":
            key = created.strftime("%Y-%m")
        elif granularity == "week":
            iso = created.isocalendar()
            key = f"{iso.year}-W{iso.week:02d}"
        else:
            key = created.strftime("%Y-%m-%d")
        if value_by_owner is None:
            buckets[key] += 1
        else:
            owner_id = str(item.get("OWNER_ID") or "")
            try:
                buckets[key] += float(value_by_owner.get(owner_id, 0) or 0)
            except (TypeError, ValueError):
                continue
    keys = sorted(buckets.keys())
    return [{"label": key, "value": buckets[key]} for key in keys]


def _bitrix_fetch_entity_field_values(webhook, entity, owner_ids, field):
    method = "crm.lead.list" if entity == "lead" else "crm.deal.list"
    values = {}
    ids = [str(owner_id) for owner_id in owner_ids if owner_id is not None and str(owner_id).strip()]
    if not ids or not field:
        return values
    chunk_size = 50
    for offset in range(0, len(ids), chunk_size):
        chunk = ids[offset : offset + chunk_size]
        data = _bitrix_call(
            webhook,
            method,
            {"filter": {"ID": chunk}, "select": ["ID", field]},
        )
        items = data.get("result") or []
        if not isinstance(items, list):
            continue
        for item in items:
            item_id = str(item.get("ID") or "")
            if not item_id:
                continue
            try:
                values[item_id] = float(item.get(field) or 0)
            except (TypeError, ValueError):
                values[item_id] = 0.0
    return values


@app.route("/api/integrations/bitrix", methods=["GET", "POST", "DELETE"])
def bitrix_integration():
    email = _current_email()
    if request.method == "GET":
        connected = False
        domain = ""
        masked = ""
        webhook_url = ""
        if email:
            conn = _db()
            try:
                webhook = _get_user_bitrix_webhook(conn, email)
            finally:
                conn.close()
            if webhook:
                connected = True
                webhook_url = webhook
                domain = _bitrix_domain_from_webhook(webhook)
                masked = _mask_bitrix_webhook(webhook)
        return jsonify({"connected": connected, "domain": domain, "webhookMasked": masked, "webhookUrl": webhook_url})
    if not email:
        return jsonify({"error": "unauthorized"}), 401
    if request.method == "DELETE":
        conn = _db()
        conn.execute("UPDATE users SET bitrix_webhook_url = NULL, updated_at = CURRENT_TIMESTAMP WHERE email = ?", (email,))
        conn.commit()
        conn.close()
        return jsonify({"ok": True, "connected": False})
    payload = request.get_json(force=True, silent=True) or {}
    try:
        webhook = _verify_bitrix_webhook(payload.get("webhookUrl") or "")
    except ValueError:
        return jsonify({"error": "invalid_webhook_url"}), 400
    except Exception as err:
        return jsonify({"error": "bitrix_connection_failed", "details": str(err)}), 400
    conn = _db()
    _upsert_user(conn, email, name=session.get("name") or email)
    conn.execute(
        "UPDATE users SET bitrix_webhook_url = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?",
        (webhook, email),
    )
    conn.commit()
    conn.close()
    return jsonify(
        {
            "ok": True,
            "connected": True,
            "domain": _bitrix_domain_from_webhook(webhook),
            "webhookMasked": _mask_bitrix_webhook(webhook),
        }
    )


@app.route("/api/integrations/bitrix/validate", methods=["POST"])
def bitrix_validate_webhook():
    payload = request.get_json(force=True, silent=True) or {}
    try:
        webhook = _verify_bitrix_webhook(payload.get("webhookUrl") or "")
    except ValueError:
        return jsonify({"error": "invalid_webhook_url"}), 400
    except Exception as err:
        return jsonify({"error": "bitrix_connection_failed", "details": str(err)}), 400
    return jsonify(
        {
            "ok": True,
            "domain": _bitrix_domain_from_webhook(webhook),
            "webhookMasked": _mask_bitrix_webhook(webhook),
        }
    )


@app.route("/api/integrations/bitrix/pipelines")
def bitrix_pipelines():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    try:
        if entity == "lead":
            return jsonify(
                {
                    "entity": "lead",
                    "pipelines": [{"id": 0, "name": "Лиды", "isDefault": True}],
                }
            )
        categories = _bitrix_fetch_deal_pipelines(webhook)
        pipelines = categories
        pipelines.sort(key=lambda row: (not row["isDefault"], row["name"].lower()))
        return jsonify({"entity": "deal", "pipelines": pipelines})
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


@app.route("/api/integrations/bitrix/stages")
def bitrix_stages():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    category_id = int(request.args.get("categoryId") or 0)
    try:
        if entity == "lead":
            statuses = _bitrix_list_all(
                webhook,
                "crm.status.list",
                {"filter": {"ENTITY_ID": "STATUS"}, "order": {"SORT": "ASC"}},
            )
            stages = [
                {
                    "id": _bitrix_pick_status_id(item),
                    "name": _bitrix_pick_name(item, _bitrix_pick_status_id(item)),
                    "sort": _bitrix_pick_sort(item),
                }
                for item in statuses
                if _bitrix_pick_status_id(item)
            ]
        else:
            stages_raw = _bitrix_list_all(webhook, "crm.dealcategory.stage.list", {"id": category_id})
            stages = [
                {
                    "id": _bitrix_pick_status_id(item),
                    "name": _bitrix_pick_name(item, _bitrix_pick_status_id(item)),
                    "sort": _bitrix_pick_sort(item),
                }
                for item in stages_raw
                if _bitrix_pick_status_id(item)
            ]
        stages.sort(key=lambda row: row["sort"])
        return jsonify({"entity": entity, "categoryId": category_id, "stages": stages})
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


@app.route("/api/integrations/bitrix/chart-data")
def bitrix_chart_data():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    category_id = int(request.args.get("categoryId") or 0)
    stage_id = str(request.args.get("stageId") or "").strip()
    date_from = str(request.args.get("dateFrom") or "").strip()
    date_to = str(request.args.get("dateTo") or "").strip()
    granularity = str(request.args.get("granularity") or "week").strip().lower()
    if granularity not in ("day", "week", "month"):
        granularity = "week"
    metric = str(request.args.get("metric") or "count").strip().lower()
    sum_field = str(request.args.get("sumField") or "OPPORTUNITY").strip() or "OPPORTUNITY"
    filter_field = str(request.args.get("filterField") or "").strip()
    filter_hidden_values = _bitrix_parse_hidden_values(request.args.get("filterHiddenValues") or "")
    if not stage_id:
        return jsonify({"error": "stage_required"}), 400
    if not date_from:
        date_from = (datetime.utcnow() - timedelta(days=120)).strftime("%Y-%m-%d")
    if not date_to:
        date_to = datetime.utcnow().strftime("%Y-%m-%d")
    try:
        history = _bitrix_fetch_stage_history(webhook, entity, category_id, stage_id, date_from, date_to)
        history = _bitrix_filter_history_by_field(webhook, entity, history, filter_field, filter_hidden_values)
        if metric == "sum":
            owner_ids = [item.get("OWNER_ID") for item in history if item.get("OWNER_ID") is not None]
            value_by_owner = _bitrix_fetch_entity_field_values(webhook, entity, owner_ids, sum_field)
            points = _bucket_stage_history(history, granularity, date_from, date_to, value_by_owner)
            metric = "sum"
        else:
            metric = "count"
            points = _bucket_stage_history(history, granularity, date_from, date_to)
        total = sum(point["value"] for point in points)
        return jsonify(
            {
                "entity": entity,
                "categoryId": category_id,
                "stageId": stage_id,
                "granularity": granularity,
                "metric": metric,
                "sumField": sum_field if metric == "sum" else "",
                "dateFrom": date_from,
                "dateTo": date_to,
                "total": total,
                "points": points,
            }
        )
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


NUMERIC_FIELD_TYPES = {"integer", "double", "money", "float", "number"}
BITRIX_FILTER_DATE_FIELD = "__DATE__"
DATE_FIELD_TYPES = {"date", "datetime"}
LIST_FIELD_TYPES = {"enumeration", "crm_status", "crm_category", "crm_currency", "char", "string"}
REFERENCE_FIELD_TYPES = {"user", "employee"}
BITRIX_FIELD_EMPTY_VALUE = "__EMPTY__"
BITRIX_DISTINCT_FIELD_VALUES_LIMIT = 120
BITRIX_DISTINCT_FIELD_MAX_PAGES = 8
BITRIX_STAGE_HISTORY_CACHE_TTL_SEC = 60
_BITRIX_STAGE_HISTORY_CACHE = {}
_BITRIX_FIELDS_META_CACHE = {}
CRM_STATUS_ENTITY_BY_FIELD = {
    "SOURCE_ID": "SOURCE",
    "STATUS_ID": "STATUS",
    "TYPE_ID": "DEAL_TYPE",
}


def _bitrix_fetch_fields_meta(webhook, entity):
    cache_key = (webhook, entity)
    cached = _BITRIX_FIELDS_META_CACHE.get(cache_key)
    if cached and (time.time() - cached[0]) < BITRIX_STAGE_HISTORY_CACHE_TTL_SEC:
        return cached[1]
    method = "crm.lead.fields" if entity == "lead" else "crm.deal.fields"
    data = _bitrix_call(webhook, method, {})
    result = data.get("result") or {}
    meta = result if isinstance(result, dict) else {}
    _BITRIX_FIELDS_META_CACHE[cache_key] = (time.time(), meta)
    return meta


def _bitrix_normalize_field_filter_value(value):
    if value is None:
        return BITRIX_FIELD_EMPTY_VALUE
    if isinstance(value, dict):
        for key in ("VALUE", "value", "name", "NAME", "ID", "id"):
            if value.get(key) not in (None, ""):
                return str(value.get(key))
        return BITRIX_FIELD_EMPTY_VALUE
    if isinstance(value, list):
        parts = [_bitrix_normalize_field_filter_value(item) for item in value]
        cleaned = [part for part in parts if part and part != BITRIX_FIELD_EMPTY_VALUE]
        return ",".join(cleaned) if cleaned else BITRIX_FIELD_EMPTY_VALUE
    text = str(value).strip()
    return text if text else BITRIX_FIELD_EMPTY_VALUE


def _bitrix_parse_hidden_values(raw):
    text = str(raw or "").strip()
    if not text:
        return []
    if text.startswith("["):
        try:
            parsed = json.loads(text)
            if isinstance(parsed, list):
                return [str(item) for item in parsed]
        except json.JSONDecodeError:
            pass
    return [part for part in text.split(",") if part != ""]


def _bitrix_fetch_filter_fields(webhook, entity):
    result = _bitrix_fetch_fields_meta(webhook, entity)
    fields = [{"id": BITRIX_FILTER_DATE_FIELD, "name": "Дата", "type": "date", "mode": "date"}]
    seen = {BITRIX_FILTER_DATE_FIELD}
    for field_id, meta in result.items():
        if field_id in seen or not isinstance(meta, dict):
            continue
        ftype = str(meta.get("type") or "").lower()
        title = str(meta.get("title") or meta.get("listLabel") or field_id)
        if ftype in DATE_FIELD_TYPES:
            fields.append({"id": field_id, "name": title, "type": ftype, "mode": "list"})
            seen.add(field_id)
            continue
        if ftype in LIST_FIELD_TYPES or ftype in REFERENCE_FIELD_TYPES or meta.get("items"):
            fields.append({"id": field_id, "name": title, "type": ftype, "mode": "list"})
            seen.add(field_id)
    fields.sort(key=lambda row: (0 if row["id"] == BITRIX_FILTER_DATE_FIELD else 1, row["name"].lower()))
    return fields


def _bitrix_field_options_from_meta(meta):
    options = []
    items = meta.get("items") if isinstance(meta, dict) else None
    if isinstance(items, dict):
        items = list(items.values())
    if isinstance(items, list):
        for item in items:
            if isinstance(item, dict):
                value = _bitrix_normalize_field_filter_value(item.get("ID", item.get("id", item.get("VALUE", item.get("value")))))
                label = str(item.get("VALUE") or item.get("value") or item.get("NAME") or item.get("name") or value)
            else:
                value = _bitrix_normalize_field_filter_value(item)
                label = str(item)
            if not value or value == BITRIX_FIELD_EMPTY_VALUE:
                value = BITRIX_FIELD_EMPTY_VALUE
                label = "(Пустые)"
            options.append({"value": value, "label": label})
    deduped = []
    seen = set()
    for option in options:
        if option["value"] in seen:
            continue
        seen.add(option["value"])
        deduped.append(option)
    return deduped


def _bitrix_resolve_crm_status_entity(field_id, meta):
    for key in ("statusType", "STATUS_ENTITY_ID", "status_entity_id"):
        val = str(meta.get(key) or "").strip()
        if val:
            return val
    return CRM_STATUS_ENTITY_BY_FIELD.get(field_id, "")


def _bitrix_fetch_crm_status_map(webhook, status_entity):
    if not status_entity:
        return {}
    statuses = _bitrix_list_all(
        webhook,
        "crm.status.list",
        {"filter": {"ENTITY_ID": status_entity}, "order": {"SORT": "ASC"}},
    )
    mapping = {}
    for item in statuses:
        value = _bitrix_pick_status_id(item)
        if not value:
            continue
        mapping[value] = _bitrix_pick_name(item, value)
    return mapping


def _bitrix_label_for_crm_status_value(value, status_map):
    if value == BITRIX_FIELD_EMPTY_VALUE:
        return "(Пустые)"
    if value in status_map:
        return status_map[value]
    if "|" in value:
        suffix = value.split("|", 1)[-1]
        if suffix in status_map:
            return f"{status_map[suffix]} ({value})"
    return value


def _bitrix_merge_field_options(primary, secondary):
    by_value = {}
    for opt in primary:
        by_value[str(opt["value"])] = dict(opt)
    for opt in secondary:
        key = str(opt["value"])
        if key not in by_value:
            by_value[key] = dict(opt)
        elif not by_value[key].get("count") and opt.get("count"):
            by_value[key]["count"] = opt["count"]
    return sorted(by_value.values(), key=lambda row: str(row.get("label") or row["value"]).lower())


def _bitrix_parse_scope_filters(raw):
    text = str(raw or "").strip()
    if not text:
        return []
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        return []
    if not isinstance(parsed, list):
        return []
    result = []
    for item in parsed:
        if not isinstance(item, dict):
            continue
        field = str(item.get("field") or "").strip()
        if not field:
            continue
        hidden = item.get("hiddenValues") or []
        if not isinstance(hidden, list):
            hidden = []
        result.append(
            {
                "field": field,
                "hiddenValues": [str(value) for value in hidden if str(value) != ""],
            }
        )
    return result


def _bitrix_enrich_field_option_labels(webhook, entity, field_id, meta, options):
    if not options:
        return options
    ftype = str(meta.get("type") or "").lower()
    if ftype == "crm_status":
        status_entity = _bitrix_resolve_crm_status_entity(field_id, meta)
        status_map = _bitrix_fetch_crm_status_map(webhook, status_entity)
        for opt in options:
            opt["label"] = _bitrix_label_for_crm_status_value(opt["value"], status_map)
        return options
    if ftype in REFERENCE_FIELD_TYPES:
        try:
            user_map = _bitrix_fetch_users_map(webhook, [opt["value"] for opt in options])
            for opt in options:
                label = user_map.get(str(opt.get("value") or ""))
                if label:
                    opt["label"] = label
        except Exception:
            pass
    return options


def _bitrix_distinct_field_values_from_history(
    webhook,
    entity,
    field_id,
    category_id,
    stage_id,
    date_from,
    date_to,
    scope_filters,
    meta,
):
    history = _bitrix_fetch_stage_history(webhook, entity, category_id, stage_id, date_from, date_to)
    for scope_filter in scope_filters or []:
        history = _bitrix_filter_history_by_field(
            webhook,
            entity,
            history,
            scope_filter.get("field"),
            scope_filter.get("hiddenValues") or [],
        )
    if not history:
        return []
    owner_ids = [item.get("OWNER_ID") for item in history if item.get("OWNER_ID") is not None]
    field_map = _bitrix_fetch_entity_field_raw_map(webhook, entity, owner_ids, field_id)
    counts = defaultdict(int)
    for item in history:
        owner_id = str(item.get("OWNER_ID") or "")
        value = field_map.get(owner_id, BITRIX_FIELD_EMPTY_VALUE)
        counts[value] += 1
    options = []
    for value, count in sorted(counts.items(), key=lambda row: row[0].lower()):
        label = "(Пустые)" if value == BITRIX_FIELD_EMPTY_VALUE else value
        options.append({"value": value, "label": label, "count": count})
    return _bitrix_enrich_field_option_labels(webhook, entity, field_id, meta, options)


def _bitrix_distinct_field_values(
    webhook,
    entity,
    field_id,
    limit=BITRIX_DISTINCT_FIELD_VALUES_LIMIT,
    max_pages=BITRIX_DISTINCT_FIELD_MAX_PAGES,
):
    method = "crm.lead.list" if entity == "lead" else "crm.deal.list"
    counts = defaultdict(int)
    start = 0
    pages = 0
    while len(counts) < limit and pages < max_pages:
        data = _bitrix_call(
            webhook,
            method,
            {"filter": {}, "select": ["ID", field_id], "start": start, "order": {"ID": "DESC"}},
        )
        items = data.get("result") or []
        if not isinstance(items, list) or not items:
            break
        for item in items:
            value = _bitrix_normalize_field_filter_value(item.get(field_id))
            counts[value] += 1
            if len(counts) >= limit:
                break
        pages += 1
        next_start = data.get("next")
        if next_start is None:
            break
        start = int(next_start)
    options = []
    for value, count in sorted(counts.items(), key=lambda row: row[0].lower()):
        label = "(Пустые)" if value == BITRIX_FIELD_EMPTY_VALUE else value
        options.append({"value": value, "label": label, "count": count})
    return options


def _bitrix_fetch_field_options(webhook, entity, field_id, meta):
    options = _bitrix_field_options_from_meta(meta)
    if options:
        return options
    ftype = str(meta.get("type") or "").lower()
    if ftype == "crm_status":
        status_entity = _bitrix_resolve_crm_status_entity(field_id, meta)
        status_map = _bitrix_fetch_crm_status_map(webhook, status_entity)
        distinct = _bitrix_distinct_field_values(webhook, entity, field_id)
        for opt in distinct:
            opt["label"] = _bitrix_label_for_crm_status_value(opt["value"], status_map)
        catalog = [
            {"value": value, "label": label, "count": 0}
            for value, label in status_map.items()
        ]
        return _bitrix_merge_field_options(distinct, catalog)
    if ftype in REFERENCE_FIELD_TYPES:
        distinct = _bitrix_distinct_field_values(webhook, entity, field_id)
        try:
            user_map = _bitrix_fetch_users_map(webhook, [opt["value"] for opt in distinct])
            for opt in distinct:
                label = user_map.get(str(opt.get("value") or ""))
                if label:
                    opt["label"] = label
        except Exception:
            pass
        return distinct
    return _bitrix_distinct_field_values(webhook, entity, field_id)


def _bitrix_pick_user_item(data):
    result = data.get("result") if isinstance(data, dict) else None
    if isinstance(result, dict):
        return result
    if isinstance(result, list) and result:
        first = result[0]
        return first if isinstance(first, dict) else None
    return None


def _bitrix_user_label_from_item(item, fallback=""):
    if not isinstance(item, dict):
        return fallback
    name = " ".join(
        part for part in (item.get("NAME"), item.get("LAST_NAME")) if part
    ).strip()
    if name:
        return name
    return str(item.get("LOGIN") or item.get("EMAIL") or fallback)


def _bitrix_fetch_users_map(webhook, user_ids):
    unique = []
    seen = set()
    for uid in user_ids:
        text = str(uid or "").strip()
        if not text or text == BITRIX_FIELD_EMPTY_VALUE or text in seen:
            continue
        seen.add(text)
        unique.append(text)
    if not unique:
        return {}
    result = {}
    for uid in unique[:40]:
        try:
            lookup_id = int(uid) if uid.isdigit() else uid
            data = _bitrix_call(webhook, "user.get", {"ID": lookup_id})
            item = _bitrix_pick_user_item(data)
            if not item:
                continue
            label = _bitrix_user_label_from_item(item, uid)
            resolved_id = str(item.get("ID") or uid).strip()
            result[resolved_id] = label
            if uid != resolved_id:
                result[uid] = label
        except Exception:
            continue
    remaining = {uid for uid in unique if uid not in result and str(uid) not in result}
    if not remaining:
        return result
    start = 0
    pages = 0
    while remaining and pages < 6:
        try:
            data = _bitrix_call(
                webhook,
                "user.search",
                {"FILTER": {"ACTIVE": "Y"}, "start": start},
            )
        except Exception:
            break
        items = data.get("result") or []
        if not isinstance(items, list) or not items:
            break
        for item in items:
            if not isinstance(item, dict):
                continue
            uid = str(item.get("ID") or "").strip()
            if uid in remaining:
                result[uid] = _bitrix_user_label_from_item(item, uid)
                remaining.discard(uid)
        pages += 1
        next_start = data.get("next")
        if next_start is None:
            break
        start = int(next_start)
    return result


def _bitrix_fetch_entity_field_raw_map(webhook, entity, owner_ids, field_id):
    method = "crm.lead.list" if entity == "lead" else "crm.deal.list"
    values = {}
    ids = [str(owner_id) for owner_id in owner_ids if owner_id is not None and str(owner_id).strip()]
    if not ids or not field_id:
        return values
    chunk_size = 50
    for offset in range(0, len(ids), chunk_size):
        chunk = ids[offset : offset + chunk_size]
        data = _bitrix_call(
            webhook,
            method,
            {"filter": {"ID": chunk}, "select": ["ID", field_id]},
        )
        items = data.get("result") or []
        if not isinstance(items, list):
            continue
        for item in items:
            item_id = str(item.get("ID") or "")
            if item_id:
                values[item_id] = _bitrix_normalize_field_filter_value(item.get(field_id))
    return values


def _bitrix_filter_history_by_field(webhook, entity, history, field_id, hidden_values):
    hidden = [str(item) for item in (hidden_values or []) if str(item) != ""]
    if not field_id or field_id == BITRIX_FILTER_DATE_FIELD or not hidden:
        return history
    owner_ids = [item.get("OWNER_ID") for item in history if item.get("OWNER_ID") is not None]
    field_map = _bitrix_fetch_entity_field_raw_map(webhook, entity, owner_ids, field_id)
    filtered = []
    for item in history:
        owner_id = str(item.get("OWNER_ID") or "")
        value = field_map.get(owner_id, BITRIX_FIELD_EMPTY_VALUE)
        if value in hidden:
            continue
        filtered.append(item)
    return filtered


@app.route("/api/integrations/bitrix/filter-fields")
def bitrix_filter_fields():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    if entity not in ("lead", "deal"):
        entity = "deal"
    try:
        fields = _bitrix_fetch_filter_fields(webhook, entity)
        return jsonify({"entity": entity, "fields": fields})
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


@app.route("/api/integrations/bitrix/field-options")
def bitrix_field_options():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    if entity not in ("lead", "deal"):
        entity = "deal"
    field_id = str(request.args.get("field") or "").strip()
    if not field_id or field_id == BITRIX_FILTER_DATE_FIELD:
        return jsonify({"entity": entity, "field": field_id, "options": []})
    category_id = int(request.args.get("categoryId") or 0)
    stage_id = str(request.args.get("stageId") or "").strip()
    date_from = str(request.args.get("dateFrom") or "").strip()
    date_to = str(request.args.get("dateTo") or "").strip()
    scope_filters = _bitrix_parse_scope_filters(request.args.get("scopeFilters") or "")
    try:
        meta = _bitrix_fetch_fields_meta(webhook, entity).get(field_id) or {}
        if stage_id:
            options = _bitrix_distinct_field_values_from_history(
                webhook,
                entity,
                field_id,
                category_id,
                stage_id,
                date_from,
                date_to,
                scope_filters,
                meta,
            )
        else:
            options = _bitrix_fetch_field_options(webhook, entity, field_id, meta)
        return jsonify({"entity": entity, "field": field_id, "options": options})
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


def _bitrix_build_entity_filter(entity, category_id, stage_id, date_from, date_to):
    entity = "lead" if entity == "lead" else "deal"
    entity_filter = {}
    if stage_id:
        if entity == "lead":
            entity_filter["STATUS_ID"] = stage_id
        else:
            entity_filter["STAGE_ID"] = stage_id
    if entity == "deal":
        entity_filter["CATEGORY_ID"] = category_id
    if date_from:
        entity_filter[">=DATE_CREATE"] = date_from
    if date_to:
        entity_filter["<=DATE_CREATE"] = f"{date_to} 23:59:59"
    return entity_filter


def _bitrix_fetch_numeric_fields(webhook, entity):
    method = "crm.lead.fields" if entity == "lead" else "crm.deal.fields"
    data = _bitrix_call(webhook, method, {})
    result = data.get("result") or {}
    fields = []
    seen = set()
    defaults = (
        [("OPPORTUNITY", "Сумма"), ("OPPORTUNITY_ACCOUNT", "Сумма в валюте учёта")]
        if entity == "deal"
        else [("OPPORTUNITY", "Сумма")]
    )
    for field_id, label in defaults:
        meta = result.get(field_id) if isinstance(result, dict) else None
        fields.append(
            {
                "id": field_id,
                "name": str((meta or {}).get("title") or label),
                "type": str((meta or {}).get("type") or "money"),
            }
        )
        seen.add(field_id)
    if isinstance(result, dict):
        for field_id, meta in result.items():
            if field_id in seen or not isinstance(meta, dict):
                continue
            ftype = str(meta.get("type") or "").lower()
            if ftype not in NUMERIC_FIELD_TYPES:
                continue
            fields.append(
                {
                    "id": field_id,
                    "name": str(meta.get("title") or meta.get("listLabel") or field_id),
                    "type": ftype,
                }
            )
            seen.add(field_id)
    fields.sort(key=lambda row: row["name"].lower())
    return fields


def _bitrix_entity_count(webhook, entity, entity_filter):
    method = "crm.lead.list" if entity == "lead" else "crm.deal.list"
    data = _bitrix_call(webhook, method, {"filter": entity_filter, "select": ["ID"], "start": 0})
    return int(data.get("total") or 0)


def _bitrix_entity_sum(webhook, entity, entity_filter, field):
    method = "crm.lead.list" if entity == "lead" else "crm.deal.list"
    total_sum = 0.0
    start = 0
    while True:
        data = _bitrix_call(
            webhook,
            method,
            {"filter": entity_filter, "select": ["ID", field], "start": start},
        )
        items = data.get("result") or []
        if not isinstance(items, list):
            break
        for item in items:
            try:
                total_sum += float(item.get(field) or 0)
            except (TypeError, ValueError):
                continue
        next_start = data.get("next")
        if next_start is None:
            break
        start = int(next_start)
    return total_sum


@app.route("/api/integrations/bitrix/fields")
def bitrix_fields():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    if entity not in ("lead", "deal"):
        entity = "deal"
    try:
        fields = _bitrix_fetch_numeric_fields(webhook, entity)
        return jsonify({"entity": entity, "fields": fields})
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


def _bitrix_stage_history_metric(
    webhook,
    entity,
    category_id,
    stage_id,
    date_from,
    date_to,
    metric="count",
    sum_field="OPPORTUNITY",
    filter_field="",
    filter_hidden_values=None,
):
    history = _bitrix_fetch_stage_history(webhook, entity, category_id, stage_id, date_from, date_to)
    history = _bitrix_filter_history_by_field(webhook, entity, history, filter_field, filter_hidden_values or [])
    if metric == "sum":
        owner_ids = [item.get("OWNER_ID") for item in history if item.get("OWNER_ID") is not None]
        value_by_owner = _bitrix_fetch_entity_field_values(webhook, entity, owner_ids, sum_field)
        total = 0.0
        for item in history:
            owner_id = str(item.get("OWNER_ID") or "")
            try:
                total += float(value_by_owner.get(owner_id, 0) or 0)
            except (TypeError, ValueError):
                continue
        return total
    return len(history)


@app.route("/api/integrations/bitrix/card-data")
def bitrix_card_data():
    webhook = _resolve_bitrix_webhook()
    if not webhook:
        return jsonify({"error": "bitrix_not_configured"}), 400
    entity = str(request.args.get("entity") or "deal").strip().lower()
    if entity not in ("lead", "deal"):
        entity = "deal"
    category_id = int(request.args.get("categoryId") or 0)
    stage_id = str(request.args.get("stageId") or "").strip()
    date_from = str(request.args.get("dateFrom") or "").strip()
    date_to = str(request.args.get("dateTo") or "").strip()
    metric = str(request.args.get("metric") or "count").strip().lower()
    sum_field = str(request.args.get("sumField") or "OPPORTUNITY").strip() or "OPPORTUNITY"
    filter_field = str(request.args.get("filterField") or "").strip()
    filter_hidden_values = _bitrix_parse_hidden_values(request.args.get("filterHiddenValues") or "")
    if not date_from:
        date_from = (datetime.utcnow() - timedelta(days=120)).strftime("%Y-%m-%d")
    if not date_to:
        date_to = datetime.utcnow().strftime("%Y-%m-%d")
    entity_filter = _bitrix_build_entity_filter(entity, category_id, stage_id, date_from, date_to)
    try:
        if stage_id:
            if metric == "sum":
                value = _bitrix_stage_history_metric(
                    webhook, entity, category_id, stage_id, date_from, date_to,
                    metric="sum", sum_field=sum_field,
                    filter_field=filter_field, filter_hidden_values=filter_hidden_values,
                )
            else:
                metric = "count"
                value = _bitrix_stage_history_metric(
                    webhook, entity, category_id, stage_id, date_from, date_to,
                    metric="count",
                    filter_field=filter_field, filter_hidden_values=filter_hidden_values,
                )
        elif metric == "sum":
            value = _bitrix_entity_sum(webhook, entity, entity_filter, sum_field)
        else:
            metric = "count"
            value = _bitrix_entity_count(webhook, entity, entity_filter)
        return jsonify(
            {
                "entity": entity,
                "categoryId": category_id,
                "stageId": stage_id,
                "dateFrom": date_from,
                "dateTo": date_to,
                "metric": metric,
                "sumField": sum_field if metric == "sum" else "",
                "value": value,
            }
        )
    except Exception as err:
        return jsonify({"error": "bitrix_request_failed", "details": str(err)}), 502


def _google_title_from_export(raw_url):
    m = re.search(r"docs\.google\.com/spreadsheets/d/([a-zA-Z0-9-_]+)", raw_url)
    if not m:
        return None
    doc_id = m.group(1)
    export_url = f"https://docs.google.com/spreadsheets/d/{doc_id}/export?format=csv&gid=0"
    req = Request(export_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=8) as resp:
        disp = resp.headers.get("Content-Disposition", "")
        mm = re.search(r'filename\*?=(?:UTF-8\'\')?"?([^";]+)"?', disp, re.IGNORECASE)
        if not mm:
            return None
        filename = mm.group(1).strip()
        filename = filename.replace("%20", " ")
        filename = re.sub(r"\.csv$", "", filename, flags=re.IGNORECASE)
        return filename or None


register_api_v1(
    app,
    {
        "require_auth": require_login,
        "require_scope": require_scope,
        "current_email": _current_email,
        "get_docs_conn": _get_docs_conn,
        "get_doc_for_user": _get_doc_for_user,
        "list_docs": _list_docs,
        "new_doc_id": _new_doc_id,
        "is_role_at_least": _is_role_at_least,
        "role_editor": ROLE_EDITOR,
        "role_owner": ROLE_OWNER,
        "blank_layout": _blank_layout,
        "normalize_email": _normalize_email,
        "atomic_update_layout": _atomic_update_layout,
        "normalize_doc_ts": _normalize_doc_ts,
    },
)

_mcp_oauth = register_mcp_oauth(
    app,
    {
        "db": _db,
        "normalize_email": _normalize_email,
        "verify_password": _verify_password,
        "get_user": _get_user,
        "upsert_user": _upsert_user,
        "set_session_user": _set_session_user,
        "app_base_url": _app_base_url,
        "parse_scopes": _parse_scopes,
        "scopes_csv": _scopes_csv,
    },
)

register_mcp(
    app,
    {
        "authenticate": _authenticate_request,
        "has_scope": _has_scope,
        "current_email": _current_email,
        "get_docs_conn": _get_docs_conn,
        "get_doc_for_user": _get_doc_for_user,
        "list_docs": _list_docs,
        "new_doc_id": _new_doc_id,
        "is_role_at_least": _is_role_at_least,
        "role_editor": ROLE_EDITOR,
        "role_owner": ROLE_OWNER,
        "set_auth_context": _set_auth_context,
        "unauthorized_headers": lambda: {"WWW-Authenticate": _mcp_oauth["www_authenticate"]()},
        "atomic_update_layout": _atomic_update_layout,
    },
)


if __name__ == "__main__":
    app.run("127.0.0.1", 4173, debug=True)
