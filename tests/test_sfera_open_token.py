import os
import tempfile
import unittest

import server


class SferaOpenTokenTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.old_db_path = server.DB_PATH
        server.DB_PATH = os.path.join(self.temp_dir.name, "workspace.db")
        server._init_db()
        connection = server._db()
        self.document_id = "a" * 12
        connection.execute(
            "INSERT INTO user_documents(id, email, name, layout_json, is_active) VALUES (?, ?, ?, ?, 0)",
            (self.document_id, "owner@example.test", "From Sfera", '{"sheets": []}'),
        )
        connection.execute(
            """
            INSERT INTO sfera_document_links(
              sfera_document_id, sfera_organization_id, mmtable_document_id, owner_email
            ) VALUES (?, ?, ?, ?)
            """,
            ("kbd_test", "org_test", self.document_id, "owner@example.test"),
        )
        connection.commit()
        connection.close()
        self.client = server.app.test_client()
        self.original_consume = server.consume_sfera_open_token

    def tearDown(self):
        server.consume_sfera_open_token = self.original_consume
        server.DB_PATH = self.old_db_path
        self.temp_dir.cleanup()

    def test_ticket_creates_document_scoped_session_and_is_not_forwarded(self):
        server.consume_sfera_open_token = lambda _token, document_id: {
            "sferaUserId": "sfera_alice",
            "email": "alice@example.test",
            "name": "Alice",
            "organizationId": "org_test",
            "sferaDocumentId": "kbd_test",
            "mmtableDocumentId": document_id,
            "accessRole": "editor",
            "expiresIn": 90,
        }
        response = self.client.get(
            f"/auth/sfera/open?token=secret-ticket&documentId={self.document_id}",
            follow_redirects=False,
        )
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.headers["Location"], f"/d/{self.document_id}")
        self.assertEqual(response.headers["Cache-Control"], "no-store")

        connection = server._db()
        access = connection.execute(
            "SELECT role FROM document_access WHERE document_id = ? AND user_email = ?",
            (self.document_id, "alice@example.test"),
        ).fetchone()
        connection.close()
        self.assertEqual(access["role"], "editor")

    def test_embed_ticket_opens_the_same_document_in_preview_mode(self):
        server.consume_sfera_open_token = lambda _token, document_id: {
            "sferaUserId": "sfera_alice",
            "email": "alice@example.test",
            "name": "Alice",
            "organizationId": "org_test",
            "sferaDocumentId": "kbd_test",
            "mmtableDocumentId": document_id,
            "accessRole": "reader",
            "expiresIn": 90,
        }
        response = self.client.get(
            f"/auth/sfera/open?token=secret-ticket&documentId={self.document_id}&embed=1",
            follow_redirects=False,
        )
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.headers["Location"], f"/d/{self.document_id}?embed=1")
        self.assertEqual(response.headers["Cache-Control"], "no-store")

    def test_embed_document_allows_only_the_sfera_frame_ancestors(self):
        response = self.client.get(f"/d/{self.document_id}?embed=1")
        self.assertNotIn("X-Frame-Options", response.headers)
        self.assertEqual(
            response.headers["Content-Security-Policy"],
            "frame-ancestors https://sfera.crystalsystems.ru http://127.0.0.1:4177",
        )

        normal = self.client.get(f"/d/{self.document_id}")
        self.assertEqual(normal.headers["X-Frame-Options"], "SAMEORIGIN")

    def test_ticket_cannot_open_an_unlinked_document(self):
        server.consume_sfera_open_token = lambda _token, document_id: {
            "sferaUserId": "sfera_alice",
            "email": "alice@example.test",
            "name": "Alice",
            "organizationId": "org_test",
            "sferaDocumentId": "kbd_other",
            "mmtableDocumentId": document_id,
            "accessRole": "reader",
            "expiresIn": 90,
        }
        response = self.client.get(
            f"/auth/sfera/open?token=secret-ticket&documentId={self.document_id}",
            follow_redirects=False,
        )
        self.assertEqual(response.status_code, 302)
        self.assertIn("open_document_mismatch", response.headers["Location"])


if __name__ == "__main__":
    unittest.main()
