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


if __name__ == "__main__":
    unittest.main()
