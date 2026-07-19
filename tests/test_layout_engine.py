#!/usr/bin/env python3
"""Golden / unit tests for layout_engine."""

from __future__ import annotations

import os
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import layout_engine as eng
from layout_engine.document import normalize_document


class LayoutEngineTests(unittest.TestCase):
    def test_blank_normalize_counters(self):
        doc = eng.blank_document()
        doc = normalize_document(doc)
        layout = doc["sheets"][0]["layout"]
        self.assertEqual(layout["shapeCounter"], 1)
        self.assertEqual(layout["bpProcessCounter"], 1)

    def test_create_shape_and_table(self):
        doc = eng.blank_document()
        doc, shape = eng.create_shape(doc, 1, {"type": "shape-rect", "x": 10, "y": 20, "text": "A"})
        doc, table = eng.create_table(doc, 1, {"title": "T1", "rows": 2, "cols": 2, "data": [["a", "b"], ["c", "d"]]})
        self.assertTrue(shape["id"].startswith("shape_"))
        grid = eng.get_table(doc, 1, table["id"])
        self.assertEqual(grid["grid"][0][0], "a")
        self.assertEqual(grid["grid"][1][1], "d")

    def test_business_process_relayout(self):
        doc = eng.blank_document()
        doc, bp = eng.create_business_process(
            doc,
            1,
            {
                "name": "Sales",
                "x": 100,
                "y": 80,
                "stages": ["A", "B", "C"],
                "tasks": [{"stageIndex": 0, "title": "Task 1"}, {"stageIndex": 1, "title": "Task 2"}],
            },
        )
        self.assertEqual(bp["processId"], "bp1")
        self.assertEqual(len(bp["stages"]), 3)
        listed = eng.list_business_processes(doc, 1)
        self.assertEqual(len(listed), 1)
        self.assertEqual(len(listed[0]["tasks"]), 2)

        doc, stage = eng.add_bp_stage(doc, 1, bp["processId"], {"name": "D", "index": 1})
        self.assertEqual(stage["index"], 1)
        listed = eng.list_business_processes(doc, 1)
        names = [s["name"] for s in listed[0]["stages"]]
        self.assertEqual(names, ["A", "D", "B", "C"])

        # Stages share one row (same top).
        layout = doc["sheets"][0]["layout"]
        stage_shapes = [
            s for s in layout["shapes"] if s.get("bpProcessId") == bp["processId"] and s.get("bpRole") == "stage"
        ]
        tops = {s["top"] for s in stage_shapes}
        self.assertEqual(len(tops), 1)

    def test_connect_and_delete(self):
        doc = eng.blank_document()
        doc, a = eng.create_shape(doc, 1, {"type": "shape-note", "x": 0, "y": 0})
        doc, b = eng.create_shape(doc, 1, {"type": "shape-note", "x": 200, "y": 0})
        doc, conn = eng.connect_shapes(doc, 1, {"from": a["id"], "to": b["id"]})
        self.assertTrue(conn["id"].startswith("conn_"))
        doc, removed = eng.delete_shapes(doc, 1, [a["id"]])
        self.assertEqual(removed, [a["id"]])
        self.assertEqual(doc["sheets"][0]["layout"]["connectors"], [])

    def test_overview_and_describe(self):
        doc = eng.blank_document()
        doc, _ = eng.create_business_process(doc, 1, {"stages": ["One", "Two"]})
        overview = eng.document_overview(doc, {"id": "abc", "name": "Doc"})
        self.assertEqual(overview["id"], "abc")
        self.assertEqual(overview["sheets"][0]["counts"]["businessProcesses"], 1)
        desc = eng.describe_sheet(doc, 1)
        self.assertGreaterEqual(desc["counts"]["shapes"], 3)

    def test_create_rename_delete_sheet(self):
        doc = eng.blank_document()
        doc, created = eng.create_sheet(doc, {"name": "Воронка B"})
        self.assertEqual(created["id"], 2)
        self.assertEqual(created["name"], "Воронка B")
        self.assertEqual(doc["activeSheetId"], 2)
        self.assertEqual(len(doc["sheets"]), 2)

        doc, shape = eng.create_shape(doc, 2, {"type": "shape-note", "text": "on sheet 2"})
        self.assertEqual(shape["id"], "shape_1")
        self.assertEqual(len(doc["sheets"][1]["layout"]["shapes"]), 1)

        doc, renamed = eng.rename_sheet(doc, 2, {"name": "Ювелир"})
        self.assertEqual(renamed["name"], "Ювелир")

        doc, deleted = eng.delete_sheet(doc, 2)
        self.assertEqual(deleted["deletedId"], 2)
        self.assertEqual(len(doc["sheets"]), 1)
        self.assertEqual(doc["activeSheetId"], 1)

        with self.assertRaises(ValueError):
            eng.delete_sheet(doc, 1)

    def test_bp_tasks_and_automations_crud(self):
        doc = eng.blank_document()
        doc, bp = eng.create_business_process(
            doc,
            1,
            {
                "stages": ["A", "B", "C"],
                "tasks": [{"stageIndex": 0, "title": "T1", "results": ["Done", ""]}],
                "automations": [
                    {
                        "stageIndex": 1,
                        "title": "Auto 1",
                        "when": "on enter",
                        "conditions": ["x > 0"],
                        "results": ["ok"],
                    }
                ],
            },
        )
        listed = eng.list_business_processes(doc, 1)[0]
        self.assertEqual(len(listed["tasks"]), 1)
        self.assertEqual(len(listed["automations"]), 1)
        self.assertEqual(listed["automations"][0]["title"], "Auto 1")
        self.assertIn("ok", listed["automations"][0]["results"])

        task_id = listed["tasks"][0]["id"]
        doc, updated = eng.update_bp_task(
            doc, 1, task_id, {"executor": "Иван", "results": ["ЦКП 1", "ЦКП 2"], "stageIndex": 1}
        )
        self.assertEqual(updated["data"]["executor"], "Иван")
        self.assertEqual(updated["stageIndex"], 1)

        doc, auto = eng.add_bp_automation(
            doc, 1, bp["processId"], {"stageIndex": 0, "title": "Auto 2", "description": "desc"}
        )
        self.assertEqual(auto["title"], "Auto 2")
        doc, auto_u = eng.update_bp_automation(doc, 1, auto["id"], {"when": "daily", "conditions": ["a", "b"]})
        self.assertEqual(auto_u["data"]["when"], "daily")
        self.assertEqual(auto_u["data"]["conditions"][:2], ["a", "b"])

        # Automations sit above stage tops.
        layout = doc["sheets"][0]["layout"]
        stage_b = next(s for s in layout["shapes"] if s.get("bpRole") == "stage" and int(s.get("bpStageIndex") or 0) == 1)
        auto1 = next(s for s in layout["shapes"] if s.get("id") == listed["automations"][0]["id"])
        self.assertLess(float(str(auto1["top"]).replace("px", "")), float(str(stage_b["top"]).replace("px", "")))

        doc, _ = eng.delete_bp_task(doc, 1, task_id)
        doc, _ = eng.delete_bp_automation(doc, 1, auto["id"])
        listed2 = eng.list_business_processes(doc, 1)[0]
        self.assertEqual(len(listed2["tasks"]), 0)
        self.assertEqual(len(listed2["automations"]), 1)

        stage0 = listed2["stages"][0]["id"]
        doc, _ = eng.update_bp_stage(doc, 1, stage0, {"name": "Старт"})
        doc, _ = eng.delete_bp_stage(doc, 1, bp["processId"], stage_id=listed2["stages"][1]["id"])
        listed3 = eng.list_business_processes(doc, 1)[0]
        self.assertEqual([s["name"] for s in listed3["stages"]], ["Старт", "C"])

        doc, deleted = eng.delete_business_process(doc, 1, bp["processId"])
        self.assertEqual(deleted["deletedProcessId"], bp["processId"])
        self.assertEqual(eng.list_business_processes(doc, 1), [])


if __name__ == "__main__":
    unittest.main()
