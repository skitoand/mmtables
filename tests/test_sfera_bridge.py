import hashlib
import hmac
import json
import os
import sqlite3
import tempfile
import time
import unittest

from flask import Flask

from sfera_bridge import init_sfera_bridge_tables, register_sfera_bridge


class SferaBridgeTests(unittest.TestCase):
    def setUp(self):
        self.database_file = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.database_file.close()
        self.previous_secret = os.environ.get("SFERA_BRIDGE_SECRET")
        os.environ["SFERA_BRIDGE_SECRET"] = "bridge-test-secret"
        self.next_document_number = 0

        connection = self.db()
        connection.executescript(
            """
            CREATE TABLE users (email TEXT PRIMARY KEY, name TEXT, auth_provider TEXT);
            CREATE TABLE user_documents (
              id TEXT PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL,
              layout_json TEXT NOT NULL, is_active INTEGER NOT NULL,
              created_at TEXT, updated_at TEXT
            );
            CREATE TABLE document_access (
              document_id TEXT NOT NULL, user_email TEXT NOT NULL, role TEXT NOT NULL,
              created_at TEXT, updated_at TEXT
            );
            """
        )
        init_sfera_bridge_tables(connection)
        connection.commit()
        connection.close()

        self.app = Flask(__name__)
        register_sfera_bridge(
            self.app,
            {
                "db": self.db,
                "normalize_email": lambda value: str(value or "").strip().lower(),
                "upsert_user": self.upsert_user,
                "new_doc_id": self.new_doc_id,
                "blank_layout": lambda: {"sheets": []},
                "role_owner": "owner",
                "app_base_url": lambda: "https://mmtable.test",
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
            "INSERT OR REPLACE INTO users(email, name, auth_provider) VALUES (?, ?, ?)",
            (email, name, auth_provider),
        )

    def new_doc_id(self, _connection):
        self.next_document_number += 1
        return f"mmtable-{self.next_document_number}"

    def signed_post(self, payload, signature="valid"):
        raw_body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        timestamp = str(int(time.time()))
        if signature == "valid":
            digest = hmac.new(
                b"bridge-test-secret", timestamp.encode("utf-8") + b"." + raw_body, hashlib.sha256
            ).hexdigest()
        else:
            digest = "0" * 64
        return self.client.post(
            "/api/sfera/bridge/documents",
            data=raw_body,
            content_type="application/json",
            headers={
                "X-Sfera-Bridge-Timestamp": timestamp,
                "X-Sfera-Bridge-Signature": digest,
            },
        )

    def signed_preview_post(self, document_id, payload, signature="valid"):
        raw_body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        timestamp = str(int(time.time()))
        digest = (
            hmac.new(
                b"bridge-test-secret", timestamp.encode("utf-8") + b"." + raw_body, hashlib.sha256
            ).hexdigest()
            if signature == "valid"
            else "0" * 64
        )
        return self.client.post(
            f"/api/sfera/bridge/documents/{document_id}/preview",
            data=raw_body,
            content_type="application/json",
            headers={
                "X-Sfera-Bridge-Timestamp": timestamp,
                "X-Sfera-Bridge-Signature": digest,
            },
        )

    def test_creates_one_document_and_is_idempotent(self):
        payload = {
            "sferaDocumentId": "kbd_1234",
            "organizationId": "org_1234",
            "ownerEmail": "owner@example.test",
            "ownerName": "Owner",
            "name": "Таблица из Сферы",
        }

        created = self.signed_post(payload)
        self.assertEqual(created.status_code, 201)
        self.assertTrue(created.json["created"])
        self.assertEqual(created.json["document"]["id"], "mmtable-1")

        repeated = self.signed_post(payload)
        self.assertEqual(repeated.status_code, 200)
        self.assertFalse(repeated.json["created"])
        self.assertEqual(repeated.json["document"]["id"], "mmtable-1")

        connection = self.db()
        links = connection.execute("SELECT * FROM sfera_document_links").fetchall()
        access = connection.execute("SELECT role FROM document_access").fetchone()
        connection.close()
        self.assertEqual(len(links), 1)
        self.assertEqual(links[0]["sfera_organization_id"], "org_1234")
        self.assertEqual(access["role"], "owner")

    def test_rejects_invalid_signature(self):
        response = self.signed_post(
            {
                "sferaDocumentId": "kbd_1234",
                "organizationId": "org_1234",
                "ownerEmail": "owner@example.test",
            },
            signature="invalid",
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json["error"], "invalid_bridge_signature")

    def test_returns_preview_only_for_the_exact_sfera_link(self):
        payload = {
            "sferaDocumentId": "kbd_1234",
            "organizationId": "org_1234",
            "ownerEmail": "owner@example.test",
            "ownerName": "Owner",
            "name": "Таблица из Сферы",
        }
        created = self.signed_post(payload)
        document_id = created.json["document"]["id"]

        preview = self.signed_preview_post(document_id, {
            "sferaDocumentId": "kbd_1234", "organizationId": "org_1234"
        })
        self.assertEqual(preview.status_code, 200)
        self.assertEqual(preview.json["preview"]["documentId"], document_id)
        self.assertIn("layout", preview.json["preview"])

        forbidden = self.signed_preview_post(document_id, {
            "sferaDocumentId": "kbd_other", "organizationId": "org_1234"
        })
        self.assertEqual(forbidden.status_code, 404)


if __name__ == "__main__":
    unittest.main()
