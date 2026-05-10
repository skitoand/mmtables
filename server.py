import json
import os
import re
import sqlite3
import uuid
from functools import wraps
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request, send_from_directory, session


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
DB_PATH = os.path.join(BASE_DIR, "workspace.db")

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")
app.secret_key = os.getenv("SESSION_SECRET", "dev-secret-change-me")


def _db():
    return sqlite3.connect(DB_PATH)


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
    conn.commit()
    conn.close()


_init_db()

oauth = OAuth(app)
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")

if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
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
        email = session.get("email")
        if not email:
            return jsonify({"error": "unauthorized"}), 401
        return fn(*args, **kwargs)

    return wrapper


def _blank_layout():
    return {
        "zoom": 1,
        "zCounter": 10,
        "windowCounter": 1,
        "shapeCounter": 1,
        "windows": [],
        "shapes": [],
        "connectors": [],
    }


def _ensure_seed_document(conn, email):
    existing = conn.execute(
        "SELECT id FROM user_documents WHERE email = ? ORDER BY is_active DESC, updated_at DESC, created_at DESC LIMIT 1",
        (email,),
    ).fetchone()
    if existing:
        return existing[0]

    seed_layout = None
    legacy_row = conn.execute("SELECT layout_json FROM user_layouts WHERE email = ?", (email,)).fetchone()
    if legacy_row and legacy_row[0]:
        try:
          seed_layout = json.loads(legacy_row[0])
        except Exception:
          seed_layout = _blank_layout()
    if not seed_layout:
        seed_layout = _blank_layout()

    doc_id = str(uuid.uuid4())
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (doc_id, email, "Рабочий стол", json.dumps(seed_layout, ensure_ascii=False)),
    )
    conn.commit()
    return doc_id


def _get_docs_conn(email):
    conn = _db()
    _ensure_seed_document(conn, email)
    return conn


def _list_docs(conn, email):
    rows = conn.execute(
        """
        SELECT id, name, layout_json, is_active, created_at, updated_at
        FROM user_documents
        WHERE email = ?
        ORDER BY is_active DESC, updated_at DESC, created_at DESC
        """,
        (email,),
    ).fetchall()
    docs = []
    for row in rows:
        docs.append(
            {
                "id": row[0],
                "name": row[1],
                "isActive": bool(row[3]),
                "createdAt": row[4],
                "updatedAt": row[5],
            }
        )
    return docs


def _get_active_doc(conn, email):
    row = conn.execute(
        """
        SELECT id, name, layout_json
        FROM user_documents
        WHERE email = ? AND is_active = 1
        ORDER BY updated_at DESC, created_at DESC
        LIMIT 1
        """,
        (email,),
    ).fetchone()
    if row:
        return row
    row = conn.execute(
        """
        SELECT id, name, layout_json
        FROM user_documents
        WHERE email = ?
        ORDER BY updated_at DESC, created_at DESC
        LIMIT 1
        """,
        (email,),
    ).fetchone()
    if row:
        conn.execute("UPDATE user_documents SET is_active = 0 WHERE email = ?", (email,))
        conn.execute("UPDATE user_documents SET is_active = 1 WHERE id = ?", (row[0],))
        conn.commit()
    return row


def _set_active_doc(conn, email, doc_id):
    conn.execute("UPDATE user_documents SET is_active = 0 WHERE email = ?", (email,))
    conn.execute("UPDATE user_documents SET is_active = 1 WHERE id = ? AND email = ?", (doc_id, email))
    conn.commit()


def _get_doc_row(conn, email, doc_id):
    return conn.execute(
        """
        SELECT id, name, layout_json
        FROM user_documents
        WHERE email = ? AND id = ?
        """,
        (email, doc_id),
    ).fetchone()


def _doc_payload(row):
    if not row:
        return None
    return {
        "id": row[0],
        "name": row[1],
        "layout": json.loads(row[2]),
    }


@app.route("/")
def root():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/auth/google")
def login_google():
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        return "Google OAuth не настроен. Заполни .env", 400
    redirect_uri = request.host_url.rstrip("/") + "/auth/google/callback"
    return oauth.google.authorize_redirect(redirect_uri)


@app.route("/auth/google/callback")
def auth_google_callback():
    token = oauth.google.authorize_access_token()
    user_info = token.get("userinfo")
    if not user_info:
        user_info = oauth.google.parse_id_token(token)

    session["email"] = user_info.get("email")
    session["name"] = user_info.get("name") or user_info.get("email")
    return redirect("/")


@app.route("/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.route("/api/me")
def me():
    if not session.get("email"):
        return jsonify({"authenticated": False})

    email = session["email"]
    conn = _get_docs_conn(email)
    active = _get_active_doc(conn, email)
    docs = _list_docs(conn, email)
    conn.close()
    return jsonify(
        {
            "authenticated": True,
            "email": email,
            "name": session.get("name"),
            "activeDocumentId": active[0] if active else None,
            "activeDocumentName": active[1] if active else None,
            "documents": docs,
        }
    )


@app.route("/api/docs", methods=["GET"])
@require_login
def list_docs():
    email = session["email"]
    conn = _get_docs_conn(email)
    active = _get_active_doc(conn, email)
    docs = _list_docs(conn, email)
    conn.close()
    return jsonify(
        {
            "documents": docs,
            "activeDocumentId": active[0] if active else None,
            "activeDocumentName": active[1] if active else None,
        }
    )


@app.route("/api/docs", methods=["POST"])
@require_login
def create_doc():
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Новый документ").strip() or "Новый документ"
    source_id = str(payload.get("sourceDocumentId") or payload.get("sourceDocId") or "").strip() or None

    email = session["email"]
    conn = _get_docs_conn(email)
    layout = _blank_layout()
    if source_id:
        row = _get_doc_row(conn, email, source_id)
        if row:
            try:
                layout = json.loads(row[2])
            except Exception:
                layout = _blank_layout()

    doc_id = str(uuid.uuid4())
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (doc_id, email, name, json.dumps(layout, ensure_ascii=False)),
    )
    conn.execute("UPDATE user_documents SET is_active = 0 WHERE email = ? AND id != ?", (email, doc_id))
    conn.commit()
    docs = _list_docs(conn, email)
    conn.close()
    session["active_document_id"] = doc_id
    return jsonify(
        {
            "ok": True,
            "document": {"id": doc_id, "name": name, "layout": layout},
            "documents": docs,
            "activeDocumentId": doc_id,
        }
    )


@app.route("/api/docs/<doc_id>", methods=["GET"])
@require_login
def get_doc(doc_id):
    email = session["email"]
    conn = _get_docs_conn(email)
    row = _get_doc_row(conn, email, doc_id)
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

    email = session["email"]
    conn = _get_docs_conn(email)
    row = _get_doc_row(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404

    if isinstance(name, str) and name.strip():
        conn.execute(
            "UPDATE user_documents SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND email = ?",
            (name.strip(), doc_id, email),
        )
    if isinstance(layout, dict):
        conn.execute(
            "UPDATE user_documents SET layout_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND email = ?",
            (json.dumps(layout, ensure_ascii=False), doc_id, email),
        )
    conn.commit()
    updated = _get_doc_row(conn, email, doc_id)
    conn.close()
    return jsonify({"ok": True, "document": _doc_payload(updated)})


@app.route("/api/docs/<doc_id>/activate", methods=["POST"])
@require_login
def activate_doc(doc_id):
    email = session["email"]
    conn = _get_docs_conn(email)
    row = _get_doc_row(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404
    _set_active_doc(conn, email, doc_id)
    conn.close()
    session["active_document_id"] = doc_id
    return jsonify({"ok": True, "activeDocumentId": doc_id, "activeDocumentName": row[1]})


@app.route("/api/docs/<doc_id>/copy", methods=["POST"])
@require_login
def copy_doc(doc_id):
    payload = request.get_json(force=True, silent=True) or {}
    name = str(payload.get("name") or "Копия документа").strip() or "Копия документа"
    email = session["email"]
    conn = _get_docs_conn(email)
    row = _get_doc_row(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404

    new_doc_id = str(uuid.uuid4())
    conn.execute(
        """
        INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
        VALUES(?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """,
        (new_doc_id, email, name, row[2]),
    )
    conn.execute("UPDATE user_documents SET is_active = 0 WHERE email = ? AND id != ?", (email, new_doc_id))
    conn.commit()
    docs = _list_docs(conn, email)
    conn.close()
    session["active_document_id"] = new_doc_id
    return jsonify(
        {
            "ok": True,
            "document": _doc_payload((new_doc_id, name, row[2])),
            "documents": docs,
            "activeDocumentId": new_doc_id,
        }
    )


@app.route("/api/docs/<doc_id>", methods=["DELETE"])
@require_login
def delete_doc(doc_id):
    email = session["email"]
    conn = _get_docs_conn(email)
    row = _get_doc_row(conn, email, doc_id)
    if not row:
        conn.close()
        return jsonify({"error": "not_found"}), 404

    conn.execute("DELETE FROM user_documents WHERE email = ? AND id = ?", (email, doc_id))
    remaining = conn.execute(
        "SELECT id, name FROM user_documents WHERE email = ? ORDER BY updated_at DESC, created_at DESC LIMIT 1",
        (email,),
    ).fetchone()
    if remaining:
        conn.execute("UPDATE user_documents SET is_active = 0 WHERE email = ?", (email,))
        conn.execute("UPDATE user_documents SET is_active = 1 WHERE id = ?", (remaining[0],))
        session["active_document_id"] = remaining[0]
    else:
        new_id = _ensure_seed_document(conn, email)
        session["active_document_id"] = new_id
    conn.commit()
    docs = _list_docs(conn, email)
    active = _get_active_doc(conn, email)
    conn.close()
    return jsonify(
        {
            "ok": True,
            "documents": docs,
            "activeDocumentId": active[0] if active else None,
            "activeDocumentName": active[1] if active else None,
        }
    )


@app.route("/api/layout", methods=["GET"])
@require_login
def get_layout():
    email = session["email"]
    conn = _get_docs_conn(email)
    active = _get_active_doc(conn, email)
    conn.close()
    if not active:
        return jsonify({"layout": None})
    return jsonify({"layout": json.loads(active[2]), "documentId": active[0], "documentName": active[1]})


@app.route("/api/layout", methods=["POST"])
@require_login
def save_layout():
    payload = request.get_json(force=True, silent=True) or {}
    layout = payload.get("layout")
    doc_id = str(payload.get("documentId") or session.get("active_document_id") or "").strip() or None
    if not isinstance(layout, dict):
        return jsonify({"error": "layout must be object"}), 400

    email = session["email"]
    conn = _get_docs_conn(email)
    if not doc_id:
        active = _get_active_doc(conn, email)
        doc_id = active[0] if active else None
    if not doc_id:
        conn.close()
        return jsonify({"error": "no_active_document"}), 400

    existing = _get_doc_row(conn, email, doc_id)
    if not existing:
        conn.close()
        return jsonify({"error": "not_found"}), 404

    conn.execute(
        """
        UPDATE user_documents
        SET layout_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND email = ?
        """,
        (json.dumps(layout, ensure_ascii=False), doc_id, email),
    )
    conn.commit()
    conn.close()
    session["active_document_id"] = doc_id
    return jsonify({"ok": True})


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
        filename = re.sub(r"\.(csv|xlsx|tsv)$", "", filename, flags=re.IGNORECASE).strip()
        return filename or None


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=4173, debug=False)
