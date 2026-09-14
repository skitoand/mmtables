import hashlib
import hmac
import json
import os
import sqlite3
import tempfile
import time
import unittest

from flask import Flask

from sfera_bridge import init_sfera_bridge_tables
from sfera_sync import dispatch_mmtable_outbox, enqueue_mmtable_event, init_sfera_sync_tables, register_sfera_sync


class SferaSyncReceiverTests(unittest.TestCase):
    def setUp(self):
        self.database_file = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.database_file.close()
        self.previous_secret = os.environ.get("SFERA_BRIDGE_SECRET")
        os.environ["SFERA_BRIDGE_SECRET"] = "sync-test-secret"
        connection = self.db()
        connection.executescript(
            """
            CREATE TABLE users (email TEXT PRIMARY KEY, name TEXT, auth_provider TEXT);
            CREATE TABLE user_documents (id TEXT PRIMARY KEY, email TEXT, name TEXT, layout_json TEXT, is_active INTEGER);
            CREATE TABLE document_access (document_id TEXT, user_email TEXT, role TEXT);
            CREATE TABLE user_folders (id TEXT PRIMARY KEY, email TEXT, name TEXT, sort_order INTEGER, created_at TEXT, updated_at TEXT);
            CREATE TABLE sfera_user_identity_links (sfera_user_id TEXT PRIMARY KEY, mmtable_email TEXT);
            """
        )
        init_sfera_bridge_tables(connection)
        init_sfera_sync_tables(connection)
        connection.commit()
        connection.close()
        self.app = Flask(__name__)
        register_sfera_sync(
            self.app,
            {
                "db": self.db,
                "normalize_email": lambda value: str(value or "").strip().lower(),
                "upsert_user": self.upsert_user,
                "new_folder_id": lambda _connection: "folder-1",
            },
        )
        self.client = self.app.test_client()

    def tearDown(self):
        if self.previous_secret is None:
            os.environ.pop("SFERA_BRIDGE_SECRET", None)
        else:
            os.environ["SFERA_BRIDGE_SECRET"] = self.previous_secret
        os.unlink(self.database_file.name)

    def db(self):
        connection = sqlite3.connect(self.database_file.name)
        connection.row_factory = sqlite3.Row
        return connection

    def upsert_user(self, connection, email, name, auth_provider):
        connection.execute(
            "INSERT OR REPLACE INTO users(email, name, auth_provider) VALUES (?, ?, ?)", (email, name, auth_provider)
        )

    def signed_post(self, payload):
        raw_body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        timestamp = str(int(time.time()))
        signature = hmac.new(
            b"sync-test-secret", timestamp.encode("utf-8") + b"." + raw_body, hashlib.sha256
        ).hexdigest()
        return self.client.post(
            "/api/sfera/sync/events",
            data=raw_body,
            content_type="application/json",
            headers={"X-Sfera-Bridge-Timestamp": timestamp, "X-Sfera-Bridge-Signature": signature},
        )

    def test_receiver_deduplicates_conflicts_and_rejects_stale_state(self):
        payload = {
            "sourceApp": "sfera", "event": "organization.updated", "organizationId": "org_1",
            "idempotencyKey": "org-event-1", "occurredAt": "2026-09-14T10:00:00+00:00",
            "data": {"id": "org_1", "name": "Crystal Systems", "updatedAt": "2026-09-14T10:00:00+00:00"},
        }
        self.assertEqual(self.signed_post(payload).status_code, 200)
        self.assertTrue(self.signed_post(payload).json["duplicate"])

        conflict = {**payload, "data": {"id": "org_1", "name": "Подмена", "updatedAt": "2026-09-14T10:00:00+00:00"}}
        self.assertEqual(self.signed_post(conflict).status_code, 409)

        older = {
            **payload,
            "idempotencyKey": "org-event-2",
            "occurredAt": "2026-09-14T09:00:00+00:00",
            "data": {"id": "org_1", "name": "Старое", "updatedAt": "2026-09-14T09:00:00+00:00"},
        }
        response = self.signed_post(older)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json["stale"])
        connection = self.db()
        organization = connection.execute("SELECT name FROM sfera_organizations WHERE sfera_organization_id = 'org_1'").fetchone()
        connection.close()
        self.assertEqual(organization["name"], "Crystal Systems")

    def test_membership_creates_sfera_user_snapshot(self):
        payload = {
            "sourceApp": "sfera", "event": "membership.updated", "organizationId": "org_1",
            "idempotencyKey": "membership-event-1", "occurredAt": "2026-09-14T10:00:00+00:00",
            "data": {"id": "user_1", "userId": "user_1", "email": "member@example.test", "fullName": "Member", "role": "admin", "updatedAt": "2026-09-14T10:00:00+00:00"},
        }
        self.assertEqual(self.signed_post(payload).status_code, 200)
        connection = self.db()
        membership = connection.execute(
            "SELECT email, role, active FROM sfera_organization_memberships"
        ).fetchone()
        user = connection.execute("SELECT auth_provider FROM users WHERE email = ?", ("member@example.test",)).fetchone()
        connection.close()
        self.assertEqual((membership["email"], membership["role"], membership["active"]), ("member@example.test", "admin", 1))
        self.assertEqual(user["auth_provider"], "sfera")

    def test_reverse_outbox_retries_without_duplicate_event(self):
        connection = self.db()
        data = {"id": "mmt_doc_1", "title": "Таблица", "updatedAt": "2026-09-14T10:00:00+00:00"}
        first = enqueue_mmtable_event(connection, "document.updated", "org_1", "mmt_doc_1", data)
        self.assertEqual(
            first,
            enqueue_mmtable_event(connection, "document.updated", "org_1", "mmt_doc_1", data),
        )
        failed = dispatch_mmtable_outbox(
            connection, deliver_fn=lambda _payload: (_ for _ in ()).throw(RuntimeError("offline"))
        )
        self.assertEqual(failed, {"attempted": 1, "delivered": 0, "failed": 1})
        connection.execute("UPDATE sfera_sync_outbox SET next_attempt_at = '2000-01-01T00:00:00+00:00'")
        sent = []
        self.assertEqual(dispatch_mmtable_outbox(connection, deliver_fn=sent.append), {"attempted": 1, "delivered": 1, "failed": 0})
        self.assertEqual(sent[0]["idempotencyKey"], first)
        connection.close()


if __name__ == "__main__":
    unittest.main()
