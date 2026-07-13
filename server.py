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
from functools import wraps
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from flask import Flask, jsonify, make_response, redirect, request, send_from_directory, session
from werkzeug.middleware.proxy_fix import ProxyFix


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
                    "windows": [],
                    "shapes": [],
                    "connectors": [],
                },
            }
        ],
    }


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


def require_login(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        email = _normalize_email(session.get("email"))
        if not email:
            return jsonify({"error": "unauthorized"}), 401
        return fn(*args, **kwargs)

    return wrapper


def _set_session_user(email, name):
    session["email"] = _normalize_email(email)
    session["name"] = (name or email or "").strip()


def _current_email():
    return _normalize_email(session.get("email"))


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
    _upsert_user(conn, email, name=session.get("name"))
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
        docs.append(
            {
                "id": row["id"],
                "name": row["name"],
                "role": row["role"],
                "ownerEmail": row["owner_email"],
                "folderId": row["folder_id"] if is_owner else None,
                "isOwned": is_owner,
                "isActive": row["id"] == active_doc_id,
                "createdAt": row["created_at"],
                "updatedAt": row["updated_at"],
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
    }
    if include_layout:
        payload["layout"] = json.loads(row["layout_json"])
    return payload


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
        (doc_id,),
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
    if source_id:
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
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    if isinstance(name, str) and name.strip():
        conn.execute(
            "UPDATE user_documents SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (name.strip(), doc_id),
        )
    if isinstance(layout, dict):
        conn.execute(
            "UPDATE user_documents SET layout_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (json.dumps(layout, ensure_ascii=False), doc_id),
        )
    if "folderId" in payload:
        if _normalize_email(row["owner_email"]) != _normalize_email(email):
            conn.close()
            return jsonify({"error": "forbidden"}), 403
        folder_id = str(payload.get("folderId") or "").strip() or None
        if folder_id and not _get_folder_for_user(conn, email, folder_id):
            conn.close()
            return jsonify({"error": "folder_not_found"}), 404
        conn.execute(
            "UPDATE user_documents SET folder_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (folder_id, doc_id),
        )
    conn.commit()
    updated = _get_doc_for_user(conn, email, doc_id)
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
    session["active_document_id"] = doc_id
    return jsonify(
        {
            "ok": True,
            "activeDocumentId": doc_id,
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
    conn.execute("DELETE FROM document_access WHERE document_id = ?", (doc_id,))
    conn.execute("DELETE FROM user_documents WHERE id = ?", (doc_id,))
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    access = _share_payload(conn, doc_id)
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
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
        (doc_id,),
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
    if not _is_role_at_least(row["role"], ROLE_ADMIN):
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
        }
    )


@app.route("/api/layout", methods=["POST"])
@require_login
def save_layout():
    payload = request.get_json(force=True, silent=True) or {}
    layout = payload.get("layout")
    doc_id = str(payload.get("documentId") or session.get("active_document_id") or "").strip() or None
    if not isinstance(layout, dict):
        return jsonify({"error": "layout must be object"}), 400
    email = _current_email()
    conn = _get_docs_conn(email)
    row = _get_doc_for_user(conn, email, doc_id) if doc_id else _get_active_doc(conn, email)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    if not _is_role_at_least(row["role"], ROLE_EDITOR):
        conn.close()
        return jsonify({"error": "forbidden"}), 403
    conn.execute(
        """
        UPDATE user_documents
        SET layout_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (json.dumps(layout, ensure_ascii=False), row["id"]),
    )
    conn.commit()
    conn.close()
    session["active_document_id"] = row["id"]
    return jsonify({"ok": True})


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


if __name__ == "__main__":
    app.run("127.0.0.1", 4173, debug=True)
