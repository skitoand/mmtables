"""Signed service bridge used by Sfera to create MMTable documents.

The endpoint intentionally does not accept browser sessions or personal API
tokens.  Sfera signs the exact request body with a shared secret and a short
lived timestamp.  A persistent link makes retries safe: one Sfera document
always maps to one MMTable document.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import re
import time

from flask import jsonify, request


_EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
_RESOURCE_ID_RE = re.compile(r"^[A-Za-z0-9_-]{4,160}$")


def init_sfera_bridge_tables(conn):
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_document_links (
          sfera_document_id TEXT PRIMARY KEY,
          sfera_organization_id TEXT NOT NULL,
          mmtable_document_id TEXT NOT NULL UNIQUE,
          owner_email TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_sfera_document_links_org "
        "ON sfera_document_links(sfera_organization_id)"
    )


def register_sfera_bridge(app, deps):
    """Register Sfera-only document creation endpoint.

    ``deps`` keeps this module independent from the application storage and
    authentication implementation, so the bridge can be tested in isolation.
    """

    db = deps["db"]
    normalize_email = deps["normalize_email"]
    upsert_user = deps["upsert_user"]
    new_doc_id = deps["new_doc_id"]
    blank_layout = deps["blank_layout"]
    role_owner = deps["role_owner"]
    app_base_url = deps["app_base_url"]

    def bridge_secret():
        return str(os.getenv("SFERA_BRIDGE_SECRET") or "").strip()

    def verify_signature(raw_body):
        secret = bridge_secret()
        if not secret:
            return "bridge_not_configured"
        timestamp = str(request.headers.get("X-Sfera-Bridge-Timestamp") or "").strip()
        signature = str(request.headers.get("X-Sfera-Bridge-Signature") or "").strip().lower()
        try:
            issued_at = int(timestamp)
        except ValueError:
            return "invalid_bridge_signature"
        if abs(int(time.time()) - issued_at) > 90:
            return "expired_bridge_signature"
        signed = timestamp.encode("utf-8") + b"." + raw_body
        expected = hmac.new(secret.encode("utf-8"), signed, hashlib.sha256).hexdigest()
        if not hmac.compare_digest(expected, signature):
            return "invalid_bridge_signature"
        return ""

    def document_payload(row):
        base_url = str(app_base_url() or "").rstrip("/")
        return {
            "id": row["id"],
            "name": row["name"],
            "url": f"{base_url}/d/{row['id']}" if base_url else f"/d/{row['id']}",
        }

    @app.route("/api/sfera/bridge/documents", methods=["POST"])
    def create_sfera_bridge_document():
        raw_body = request.get_data(cache=True)
        error = verify_signature(raw_body)
        if error:
            return jsonify({"error": error}), 401 if error != "bridge_not_configured" else 503

        payload = request.get_json(force=True, silent=True) or {}
        sfera_document_id = str(payload.get("sferaDocumentId") or "").strip()
        organization_id = str(payload.get("organizationId") or "").strip()
        email = normalize_email(payload.get("ownerEmail"))
        owner_name = str(payload.get("ownerName") or "").strip()
        name = str(payload.get("name") or "Новая таблица MMTable").strip() or "Новая таблица MMTable"
        if not _RESOURCE_ID_RE.fullmatch(sfera_document_id) or not _RESOURCE_ID_RE.fullmatch(organization_id):
            return jsonify({"error": "invalid_sfera_resource"}), 400
        if not _EMAIL_RE.fullmatch(email):
            return jsonify({"error": "invalid_owner_email"}), 400
        if len(name) > 200:
            return jsonify({"error": "invalid_document_name"}), 400

        conn = db()
        try:
            existing = conn.execute(
                """
                SELECT l.owner_email, d.id, d.name
                FROM sfera_document_links l
                JOIN user_documents d ON d.id = l.mmtable_document_id
                WHERE l.sfera_document_id = ?
                LIMIT 1
                """,
                (sfera_document_id,),
            ).fetchone()
            if existing:
                if normalize_email(existing["owner_email"]) != email:
                    return jsonify({"error": "sfera_document_owner_mismatch"}), 409
                return jsonify({"ok": True, "created": False, "document": document_payload(existing)})

            upsert_user(conn, email, name=owner_name or email, auth_provider="sfera")
            document_id = new_doc_id(conn)
            conn.execute(
                """
                INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
                VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """,
                (document_id, email, name, json.dumps(blank_layout(), ensure_ascii=False)),
            )
            conn.execute(
                """
                INSERT INTO document_access(document_id, user_email, role, created_at, updated_at)
                VALUES(?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """,
                (document_id, email, role_owner),
            )
            conn.execute(
                """
                INSERT INTO sfera_document_links(
                  sfera_document_id, sfera_organization_id, mmtable_document_id, owner_email
                ) VALUES (?, ?, ?, ?)
                """,
                (sfera_document_id, organization_id, document_id, email),
            )
            conn.commit()
            created = conn.execute(
                "SELECT id, name FROM user_documents WHERE id = ?", (document_id,)
            ).fetchone()
            return jsonify({"ok": True, "created": True, "document": document_payload(created)}), 201
        finally:
            conn.close()

    @app.route("/api/sfera/bridge/documents/<document_id>/preview", methods=["POST"])
    def preview_sfera_bridge_document(document_id):
        """Return a linked document layout to Sfera over the signed backchannel."""
        raw_body = request.get_data(cache=True)
        error = verify_signature(raw_body)
        if error:
            return jsonify({"error": error}), 401 if error != "bridge_not_configured" else 503

        payload = request.get_json(force=True, silent=True) or {}
        sfera_document_id = str(payload.get("sferaDocumentId") or "").strip()
        organization_id = str(payload.get("organizationId") or "").strip()
        if (
            not _RESOURCE_ID_RE.fullmatch(document_id)
            or not _RESOURCE_ID_RE.fullmatch(sfera_document_id)
            or not _RESOURCE_ID_RE.fullmatch(organization_id)
        ):
            return jsonify({"error": "invalid_sfera_resource"}), 400

        conn = db()
        try:
            row = conn.execute(
                """
                SELECT d.id, d.name, d.layout_json, d.updated_at
                FROM sfera_document_links l
                JOIN user_documents d ON d.id = l.mmtable_document_id
                WHERE l.sfera_document_id = ?
                  AND l.sfera_organization_id = ?
                  AND l.mmtable_document_id = ?
                LIMIT 1
                """,
                (sfera_document_id, organization_id, document_id),
            ).fetchone()
            if not row:
                return jsonify({"error": "sfera_document_not_linked"}), 404
            try:
                layout = json.loads(row["layout_json"] or "")
            except (TypeError, ValueError):
                layout = blank_layout()
            return jsonify(
                {
                    "ok": True,
                    "preview": {
                        "documentId": row["id"],
                        "name": row["name"],
                        "updatedAt": row["updated_at"],
                        "layout": layout,
                    },
                }
            )
        finally:
            conn.close()
