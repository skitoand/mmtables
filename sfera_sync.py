"""Durable, signed event receiver for Sfera → MMTable synchronization."""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import time
import uuid
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from flask import jsonify, request


def _now():
    return time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime())


def _canonical(payload):
    return json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _digest(payload):
    return hashlib.sha256(_canonical(payload).encode("utf-8")).hexdigest()


def init_sfera_sync_tables(conn):
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_sync_receipts (
          idempotency_key TEXT PRIMARY KEY,
          payload_hash TEXT NOT NULL,
          event_type TEXT NOT NULL,
          status TEXT NOT NULL,
          received_at TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT ''
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_sync_event_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_type TEXT NOT NULL,
          idempotency_key TEXT NOT NULL,
          payload_hash TEXT NOT NULL,
          status TEXT NOT NULL,
          detail TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_organizations (
          sfera_organization_id TEXT PRIMARY KEY,
          name TEXT NOT NULL DEFAULT '',
          archived_at TEXT NOT NULL DEFAULT '',
          source_updated_at TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_organization_memberships (
          sfera_organization_id TEXT NOT NULL,
          sfera_user_id TEXT NOT NULL,
          email TEXT NOT NULL DEFAULT '',
          full_name TEXT NOT NULL DEFAULT '',
          role TEXT NOT NULL DEFAULT 'member',
          active INTEGER NOT NULL DEFAULT 1,
          source_updated_at TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL,
          PRIMARY KEY (sfera_organization_id, sfera_user_id)
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_folder_links (
          sfera_folder_id TEXT PRIMARY KEY,
          sfera_organization_id TEXT NOT NULL,
          mmtable_folder_id TEXT NOT NULL DEFAULT '',
          source_updated_at TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_document_snapshots (
          sfera_document_id TEXT PRIMARY KEY,
          sfera_organization_id TEXT NOT NULL,
          mmtable_document_id TEXT NOT NULL DEFAULT '',
          payload_json TEXT NOT NULL,
          source_updated_at TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL
        )
        """
    )
    columns = {row["name"] for row in conn.execute("PRAGMA table_info(sfera_document_links)").fetchall()}
    if "source_updated_at" not in columns:
        conn.execute("ALTER TABLE sfera_document_links ADD COLUMN source_updated_at TEXT NOT NULL DEFAULT ''")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sfera_sync_outbox (
          id TEXT PRIMARY KEY,
          event_type TEXT NOT NULL,
          organization_id TEXT NOT NULL,
          resource_id TEXT NOT NULL,
          idempotency_key TEXT NOT NULL UNIQUE,
          payload_json TEXT NOT NULL,
          payload_hash TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          attempt_count INTEGER NOT NULL DEFAULT 0,
          next_attempt_at TEXT NOT NULL,
          last_error TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          delivered_at TEXT NOT NULL DEFAULT ''
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_sfera_sync_outbox_due ON sfera_sync_outbox(status, next_attempt_at)")


def _event_key(event_type, organization_id, resource_id, updated_at, digest):
    raw = "|".join([str(event_type), str(organization_id), str(resource_id), str(updated_at), digest])
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _log_outbox(conn, event_type, key, digest, status, detail=""):
    conn.execute(
        """
        INSERT INTO sfera_sync_event_log(event_type, idempotency_key, payload_hash, status, detail, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (event_type, key, digest, status, str(detail or "")[:1000], _now())
    )


def enqueue_mmtable_event(conn, event_type, organization_id, resource_id, data):
    """Persist reverse synchronization before returning from a local mutation."""
    updated_at = str((data or {}).get("updatedAt") or _now())
    payload = {
        "sourceApp": "mmtable", "event": str(event_type), "organizationId": str(organization_id),
        "resourceId": str(resource_id), "occurredAt": updated_at, "data": data if isinstance(data, dict) else {},
    }
    digest = _digest(payload)
    key = _event_key(event_type, organization_id, resource_id, updated_at, digest)
    payload["idempotencyKey"] = key
    now = _now()
    conn.execute(
        """
        INSERT INTO sfera_sync_outbox(
          id, event_type, organization_id, resource_id, idempotency_key, payload_json, payload_hash,
          status, attempt_count, next_attempt_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?, ?)
        ON CONFLICT(idempotency_key) DO NOTHING
        """,
        (uuid.uuid4().hex, event_type, organization_id, resource_id, key, _canonical(payload), digest, now, now, now),
    )
    if conn.execute("SELECT changes()").fetchone()[0]:
        _log_outbox(conn, event_type, key, digest, "queued", "outbound")
    return key


def _retry_at(attempts):
    seconds = min(3600, 15 * (2 ** max(0, int(attempts) - 1)))
    return (datetime.now(timezone.utc) + timedelta(seconds=seconds)).isoformat()


def _send_to_sfera(payload):
    secret = str(os.getenv("SFERA_BRIDGE_SECRET") or "").strip()
    endpoint = str(os.getenv("SFERA_SYNC_INGEST_URL") or "https://sfera.crystalsystems.ru/api/kb/v1/sync/ingest").strip()
    if not secret or not endpoint:
        raise RuntimeError("sfera_sync_not_configured")
    raw_body = _canonical(payload).encode("utf-8")
    timestamp = str(int(time.time()))
    signature = hmac.new(
        secret.encode("utf-8"), timestamp.encode("utf-8") + b"." + raw_body, hashlib.sha256
    ).hexdigest()
    request = Request(
        endpoint, data=raw_body, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8", "X-Sfera-Bridge-Timestamp": timestamp,
                 "X-Sfera-Bridge-Signature": signature},
    )
    try:
        with urlopen(request, timeout=12) as response:
            data = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        raise RuntimeError(f"sfera_http_{error.code}") from error
    except (URLError, OSError, TimeoutError) as error:
        raise RuntimeError("sfera_unavailable") from error
    if not isinstance(data, dict) or not data.get("ok"):
        raise RuntimeError("sfera_invalid_sync_response")


def dispatch_mmtable_outbox(conn, deliver_fn=None, limit=50):
    deliver = deliver_fn or _send_to_sfera
    rows = conn.execute(
        """SELECT * FROM sfera_sync_outbox WHERE status IN ('pending', 'failed') AND next_attempt_at <= ?
           ORDER BY created_at LIMIT ?""", (_now(), max(1, min(int(limit or 50), 200)))).fetchall()
    delivered = failed = 0
    for row in rows:
        attempts = int(row["attempt_count"] or 0) + 1
        try:
            deliver(json.loads(row["payload_json"]))
        except Exception as error:
            failed += 1
            conn.execute(
                """UPDATE sfera_sync_outbox SET status = 'failed', attempt_count = ?, next_attempt_at = ?,
                   last_error = ?, updated_at = ? WHERE id = ?""",
                (attempts, _retry_at(attempts), str(error)[:1000], _now(), row["id"]),
            )
            _log_outbox(conn, row["event_type"], row["idempotency_key"], row["payload_hash"], "failed", str(error))
            continue
        delivered += 1
        conn.execute(
            """UPDATE sfera_sync_outbox SET status = 'delivered', attempt_count = ?, last_error = '',
               delivered_at = ?, updated_at = ? WHERE id = ?""",
            (attempts, _now(), _now(), row["id"]),
        )
        _log_outbox(conn, row["event_type"], row["idempotency_key"], row["payload_hash"], "delivered", "outbound")
    return {"attempted": len(rows), "delivered": delivered, "failed": failed}


def register_sfera_sync(app, deps):
    db = deps["db"]
    normalize_email = deps["normalize_email"]
    upsert_user = deps["upsert_user"]
    new_folder_id = deps["new_folder_id"]

    def verify_signature(raw_body):
        secret = str(os.getenv("SFERA_BRIDGE_SECRET") or "").strip()
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
        expected = hmac.new(
            secret.encode("utf-8"), timestamp.encode("utf-8") + b"." + raw_body, hashlib.sha256
        ).hexdigest()
        return "" if hmac.compare_digest(expected, signature) else "invalid_bridge_signature"

    def log(conn, event_type, key, digest, status, detail=""):
        conn.execute(
            """
            INSERT INTO sfera_sync_event_log(event_type, idempotency_key, payload_hash, status, detail, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (event_type, key, digest, status, str(detail or "")[:1000], _now()),
        )

    def stale(existing, incoming):
        return bool(existing and incoming and str(incoming) < str(existing))

    def owner_email(conn, source_user_id):
        row = conn.execute(
            "SELECT mmtable_email FROM sfera_user_identity_links WHERE sfera_user_id = ?", (source_user_id,)
        ).fetchone()
        return row["mmtable_email"] if row else ""

    def apply_event(conn, payload):
        event = str(payload.get("event") or "").strip()
        organization_id = str(payload.get("organizationId") or "").strip()
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
        source_updated_at = str(data.get("updatedAt") or payload.get("occurredAt") or "").strip()
        if not event or not organization_id:
            raise ValueError("invalid_sync_event")

        if event.startswith("organization."):
            existing = conn.execute(
                "SELECT source_updated_at FROM sfera_organizations WHERE sfera_organization_id = ?", (organization_id,)
            ).fetchone()
            if existing and stale(existing["source_updated_at"], source_updated_at):
                return {"stale": True}
            conn.execute(
                """
                INSERT INTO sfera_organizations(sfera_organization_id, name, archived_at, source_updated_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(sfera_organization_id) DO UPDATE SET
                  name = excluded.name, archived_at = excluded.archived_at,
                  source_updated_at = excluded.source_updated_at, updated_at = excluded.updated_at
                """,
                (organization_id, str(data.get("name") or ""), str(data.get("archivedAt") or ""), source_updated_at, _now()),
            )
            return {"organizationId": organization_id}

        if event.startswith("membership."):
            user_id = str(data.get("userId") or data.get("id") or "").strip()
            if not user_id:
                raise ValueError("membership_user_id_required")
            existing = conn.execute(
                """
                SELECT source_updated_at FROM sfera_organization_memberships
                WHERE sfera_organization_id = ? AND sfera_user_id = ?
                """, (organization_id, user_id)
            ).fetchone()
            if existing and stale(existing["source_updated_at"], source_updated_at):
                return {"stale": True}
            email = normalize_email(data.get("email"))
            if email:
                upsert_user(conn, email, name=str(data.get("fullName") or email), auth_provider="sfera")
            conn.execute(
                """
                INSERT INTO sfera_organization_memberships(
                  sfera_organization_id, sfera_user_id, email, full_name, role, active, source_updated_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(sfera_organization_id, sfera_user_id) DO UPDATE SET
                  email = excluded.email, full_name = excluded.full_name, role = excluded.role,
                  active = excluded.active, source_updated_at = excluded.source_updated_at, updated_at = excluded.updated_at
                """,
                (organization_id, user_id, email, str(data.get("fullName") or ""), str(data.get("role") or "member"),
                 0 if event == "membership.deleted" else 1, source_updated_at, _now()),
            )
            return {"organizationId": organization_id, "userId": user_id}

        if event.startswith("folder."):
            folder_id = str(data.get("id") or "").strip()
            if not folder_id:
                raise ValueError("folder_id_required")
            existing = conn.execute(
                "SELECT * FROM sfera_folder_links WHERE sfera_folder_id = ?", (folder_id,)
            ).fetchone()
            if existing and stale(existing["source_updated_at"], source_updated_at):
                return {"stale": True}
            if event == "folder.deleted":
                if existing and existing["mmtable_folder_id"]:
                    conn.execute("DELETE FROM user_folders WHERE id = ?", (existing["mmtable_folder_id"],))
                conn.execute("DELETE FROM sfera_folder_links WHERE sfera_folder_id = ?", (folder_id,))
                return {"folderId": folder_id, "deleted": True}
            local_folder_id = existing["mmtable_folder_id"] if existing else ""
            email = owner_email(conn, str(data.get("createdByUserId") or ""))
            if not local_folder_id and email:
                local_folder_id = new_folder_id(conn)
                conn.execute(
                    """INSERT INTO user_folders(id, email, name, sort_order, created_at, updated_at)
                       VALUES (?, ?, ?, 999, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)""",
                    (local_folder_id, email, str(data.get("title") or "Папка")),
                )
            elif local_folder_id:
                conn.execute(
                    "UPDATE user_folders SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    (str(data.get("title") or "Папка"), local_folder_id),
                )
            conn.execute(
                """
                INSERT INTO sfera_folder_links(sfera_folder_id, sfera_organization_id, mmtable_folder_id, source_updated_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(sfera_folder_id) DO UPDATE SET
                  sfera_organization_id = excluded.sfera_organization_id,
                  mmtable_folder_id = excluded.mmtable_folder_id,
                  source_updated_at = excluded.source_updated_at, updated_at = excluded.updated_at
                """, (folder_id, organization_id, local_folder_id, source_updated_at, _now())
            )
            return {"folderId": folder_id, "mmtableFolderId": local_folder_id}

        if event.startswith("document."):
            document_id = str(data.get("id") or "").strip()
            if not document_id:
                raise ValueError("document_id_required")
            snapshot = conn.execute(
                "SELECT * FROM sfera_document_snapshots WHERE sfera_document_id = ?", (document_id,)
            ).fetchone()
            if snapshot and stale(snapshot["source_updated_at"], source_updated_at):
                return {"stale": True}
            link = conn.execute(
                "SELECT * FROM sfera_document_links WHERE sfera_document_id = ?", (document_id,)
            ).fetchone()
            local_document_id = link["mmtable_document_id"] if link else ""
            if event != "document.deleted" and local_document_id:
                conn.execute(
                    "UPDATE user_documents SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    (str(data.get("title") or "Документ MMTable"), local_document_id),
                )
                conn.execute(
                    "UPDATE sfera_document_links SET source_updated_at = ? WHERE sfera_document_id = ?",
                    (source_updated_at, document_id),
                )
            if event == "document.deleted" and local_document_id:
                conn.execute("DELETE FROM user_documents WHERE id = ?", (local_document_id,))
                conn.execute("DELETE FROM document_access WHERE document_id = ?", (local_document_id,))
                conn.execute("DELETE FROM sfera_document_links WHERE sfera_document_id = ?", (document_id,))
            conn.execute(
                """
                INSERT INTO sfera_document_snapshots(
                  sfera_document_id, sfera_organization_id, mmtable_document_id, payload_json, source_updated_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(sfera_document_id) DO UPDATE SET
                  sfera_organization_id = excluded.sfera_organization_id,
                  mmtable_document_id = excluded.mmtable_document_id,
                  payload_json = excluded.payload_json, source_updated_at = excluded.source_updated_at,
                  updated_at = excluded.updated_at
                """, (document_id, organization_id, local_document_id, _canonical(data), source_updated_at, _now())
            )
            return {"documentId": document_id, "mmtableDocumentId": local_document_id}
        raise ValueError("unsupported_sync_event")

    @app.route("/api/sfera/sync/events", methods=["POST"])
    def receive_sfera_sync_event():
        raw_body = request.get_data(cache=True)
        signature_error = verify_signature(raw_body)
        if signature_error:
            return jsonify({"error": signature_error}), 401 if signature_error != "bridge_not_configured" else 503
        payload = request.get_json(force=True, silent=True) or {}
        if str(payload.get("sourceApp") or "").strip().lower() != "sfera":
            return jsonify({"error": "invalid_sync_source"}), 400
        event_type = str(payload.get("event") or "").strip()
        key = str(payload.get("idempotencyKey") or "").strip()
        if not event_type or not key:
            return jsonify({"error": "idempotency_key_required"}), 400
        digest = _digest(payload)
        conn = db()
        try:
            receipt = conn.execute(
                "SELECT payload_hash, status FROM sfera_sync_receipts WHERE idempotency_key = ?", (key,)
            ).fetchone()
            if receipt:
                if not hmac.compare_digest(receipt["payload_hash"], digest):
                    return jsonify({"error": "idempotency_conflict"}), 409
                if receipt["status"] == "applied":
                    log(conn, event_type, key, digest, "duplicate")
                    conn.commit()
                    return jsonify({"ok": True, "duplicate": True})
            else:
                conn.execute(
                    """INSERT INTO sfera_sync_receipts(idempotency_key, payload_hash, event_type, status, received_at)
                       VALUES (?, ?, ?, 'processing', ?)""", (key, digest, event_type, _now())
                )
            result = apply_event(conn, payload)
            conn.execute(
                "UPDATE sfera_sync_receipts SET status = 'applied', applied_at = ? WHERE idempotency_key = ?", (_now(), key)
            )
            log(conn, event_type, key, digest, "applied")
            conn.commit()
            return jsonify({"ok": True, **result})
        except ValueError as error:
            conn.rollback()
            return jsonify({"error": str(error)}), 400
        finally:
            conn.close()
