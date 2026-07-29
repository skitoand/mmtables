"""Tests for draw.io-style exclusive save: atomic optimistic lock + presence."""

from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


class SafeCollabSaveTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls._tmpdir = tempfile.TemporaryDirectory()
        cls.db_path = os.path.join(cls._tmpdir.name, "test_workspace.db")
        import server as srv

        cls.srv = srv
        srv.DB_PATH = cls.db_path
        srv._init_db()

    @classmethod
    def tearDownClass(cls):
        cls._tmpdir.cleanup()

    def setUp(self):
        self.client = self.srv.app.test_client()
        self.email = "collab-a@example.com"
        conn = self.srv._db()
        self.srv._upsert_user(
            conn,
            self.email,
            name="Collab A",
            password_hash=self.srv._hash_password("test-pass-123"),
            auth_provider="password",
        )
        conn.commit()
        conn.close()
        with self.client.session_transaction() as sess:
            sess["email"] = self.email
            sess["name"] = "Collab A"

    def _blank_layout(self):
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
                        "shapes": [{"id": "shape_1", "type": "shape-rect", "x": 10, "y": 10, "w": 100, "h": 40}],
                        "connectors": [],
                    },
                }
            ],
        }

    def test_atomic_conflict_blocks_stale_save(self):
        create = self.client.post("/api/docs", json={"name": "Collab Doc", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc = create.get_json()["document"]
        doc_id = doc["id"]
        base = doc["updatedAt"]
        self.assertTrue(base)

        layout_a = self._blank_layout()
        layout_a["sheets"][0]["layout"]["shapes"][0]["x"] = 50
        ok = self.client.post(
            "/api/layout",
            json={"documentId": doc_id, "layout": layout_a, "baseUpdatedAt": base},
        )
        self.assertEqual(ok.status_code, 200, ok.get_data(as_text=True))
        new_base = ok.get_json()["updatedAt"]
        self.assertTrue(new_base)

        layout_b = self._blank_layout()
        layout_b["sheets"][0]["layout"]["shapes"][0]["x"] = 999
        conflict = self.client.post(
            "/api/layout",
            json={"documentId": doc_id, "layout": layout_b, "baseUpdatedAt": base},
        )
        self.assertEqual(conflict.status_code, 409, conflict.get_data(as_text=True))
        body = conflict.get_json()
        self.assertEqual(body.get("error"), "conflict")

        got = self.client.get(f"/api/docs/{doc_id}")
        self.assertEqual(got.status_code, 200)
        shapes = got.get_json()["document"]["layout"]["sheets"][0]["layout"]["shapes"]
        self.assertEqual(shapes[0]["x"], 50)

    def test_presence_heartbeat(self):
        create = self.client.post("/api/docs", json={"name": "Presence Doc", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc_id = create.get_json()["document"]["id"]
        sid = "test-session-1"
        post = self.client.post(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": sid},
        )
        self.assertEqual(post.status_code, 200, post.get_data(as_text=True))
        self.assertTrue(post.get_json().get("selfRegistered"))

        other = self.client.get(f"/api/docs/{doc_id}/presence?sessionId=other-session")
        self.assertEqual(other.status_code, 200)
        editors = other.get_json().get("editors") or []
        self.assertTrue(any(e.get("sessionId") == sid for e in editors))

        delete = self.client.delete(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": sid},
        )
        self.assertEqual(delete.status_code, 200)
        after = self.client.get(f"/api/docs/{doc_id}/presence")
        editors_after = after.get_json().get("editors") or []
        self.assertFalse(any(e.get("sessionId") == sid for e in editors_after))


if __name__ == "__main__":
    unittest.main()
