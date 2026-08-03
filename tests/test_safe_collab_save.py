"""Tests for exclusive edit lock + optimistic layout versioning."""

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

    def _acquire_edit(self, doc_id, session_id):
        post = self.client.post(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": session_id, "mode": "edit"},
        )
        self.assertEqual(post.status_code, 200, post.get_data(as_text=True))
        body = post.get_json()
        self.assertTrue(body.get("lockAcquired"), body)
        self.assertEqual(body.get("mode"), "edit")
        return body

    def test_atomic_conflict_blocks_stale_save(self):
        create = self.client.post("/api/docs", json={"name": "Collab Doc", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc = create.get_json()["document"]
        doc_id = doc["id"]
        base = doc["updatedAt"]
        self.assertTrue(base)
        sid = "sess-atomic-1"
        self._acquire_edit(doc_id, sid)

        layout_a = self._blank_layout()
        layout_a["sheets"][0]["layout"]["shapes"][0]["x"] = 50
        ok = self.client.post(
            "/api/layout",
            json={
                "documentId": doc_id,
                "layout": layout_a,
                "baseUpdatedAt": base,
                "sessionId": sid,
            },
        )
        self.assertEqual(ok.status_code, 200, ok.get_data(as_text=True))
        new_base = ok.get_json()["updatedAt"]
        self.assertTrue(new_base)

        layout_b = self._blank_layout()
        layout_b["sheets"][0]["layout"]["shapes"][0]["x"] = 999
        conflict = self.client.post(
            "/api/layout",
            json={
                "documentId": doc_id,
                "layout": layout_b,
                "baseUpdatedAt": base,
                "sessionId": sid,
            },
        )
        self.assertEqual(conflict.status_code, 409, conflict.get_data(as_text=True))
        body = conflict.get_json()
        self.assertEqual(body.get("error"), "conflict")

        got = self.client.get(f"/api/docs/{doc_id}")
        self.assertEqual(got.status_code, 200)
        shapes = got.get_json()["document"]["layout"]["sheets"][0]["layout"]["shapes"]
        self.assertEqual(shapes[0]["x"], 50)

    def test_save_without_lock_rejected(self):
        create = self.client.post("/api/docs", json={"name": "Lock Req", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc = create.get_json()["document"]
        doc_id = doc["id"]
        base = doc["updatedAt"]

        denied = self.client.post(
            "/api/layout",
            json={
                "documentId": doc_id,
                "layout": self._blank_layout(),
                "baseUpdatedAt": base,
            },
        )
        self.assertEqual(denied.status_code, 403, denied.get_data(as_text=True))
        self.assertEqual(denied.get_json().get("error"), "lock_required")

    def test_second_session_cannot_acquire_edit_lock(self):
        create = self.client.post("/api/docs", json={"name": "Exclusive", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc_id = create.get_json()["document"]["id"]

        first = self._acquire_edit(doc_id, "sess-a")
        self.assertTrue(first.get("lockAcquired"))

        second = self.client.post(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": "sess-b", "mode": "edit"},
        )
        self.assertEqual(second.status_code, 200, second.get_data(as_text=True))
        body = second.get_json()
        self.assertFalse(body.get("lockAcquired"))
        self.assertEqual(body.get("mode"), "view")
        self.assertEqual(body.get("editLock", {}).get("sessionId"), "sess-a")
        self.assertEqual(body.get("editLock", {}).get("name"), "Collab A")

    def test_view_mode_does_not_hold_lock(self):
        create = self.client.post("/api/docs", json={"name": "View Only", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc_id = create.get_json()["document"]["id"]

        view = self.client.post(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": "sess-view", "mode": "view"},
        )
        self.assertEqual(view.status_code, 200, view.get_data(as_text=True))
        body = view.get_json()
        self.assertFalse(body.get("lockAcquired"))
        self.assertEqual(body.get("mode"), "view")
        self.assertIsNone(body.get("editLock"))

        # Another session can still take edit.
        edit = self._acquire_edit(doc_id, "sess-edit")
        self.assertTrue(edit.get("lockAcquired"))

    def test_edit_lock_expires_after_ttl(self):
        create = self.client.post("/api/docs", json={"name": "TTL Doc", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc_id = create.get_json()["document"]["id"]
        self._acquire_edit(doc_id, "sess-old")

        conn = self.srv._db()
        conn.execute(
            """
            UPDATE document_edit_locks
            SET last_seen = datetime('now', ?)
            WHERE document_id = ?
            """,
            (f"-{self.srv.EDIT_LOCK_TTL_SECONDS + 5} seconds", doc_id),
        )
        conn.commit()
        conn.close()

        takeover = self.client.post(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": "sess-new", "mode": "edit"},
        )
        self.assertEqual(takeover.status_code, 200, takeover.get_data(as_text=True))
        body = takeover.get_json()
        self.assertTrue(body.get("lockAcquired"), body)
        self.assertEqual(body.get("mode"), "edit")

    def test_release_lock_on_delete_presence(self):
        create = self.client.post("/api/docs", json={"name": "Release", "layout": self._blank_layout()})
        self.assertEqual(create.status_code, 200, create.get_data(as_text=True))
        doc_id = create.get_json()["document"]["id"]
        self._acquire_edit(doc_id, "sess-rel")

        delete = self.client.delete(
            f"/api/docs/{doc_id}/presence",
            json={"sessionId": "sess-rel"},
        )
        self.assertEqual(delete.status_code, 200)
        self.assertIsNone(delete.get_json().get("editLock"))

        again = self._acquire_edit(doc_id, "sess-other")
        self.assertTrue(again.get("lockAcquired"))


if __name__ == "__main__":
    unittest.main()
