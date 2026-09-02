#!/usr/bin/env python3
"""Regression tests for complete Bitrix chart time axes."""

from __future__ import annotations

import os
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import server


class BitrixChartBucketTests(unittest.TestCase):
    def test_week_axis_includes_empty_weeks_across_months(self):
        items = [{"CREATED_TIME": "2026-08-17T12:00:00", "OWNER_ID": "1"}]

        points = server._bucket_stage_history(items, "week", "2026-06-01", "2026-09-02")

        self.assertEqual(points[0], {"label": "2026-W23", "value": 0.0})
        self.assertEqual(points[-1], {"label": "2026-W36", "value": 0.0})
        self.assertEqual(next(point for point in points if point["label"] == "2026-W34")["value"], 1.0)
        self.assertEqual(len(points), 14)

    def test_week_axis_keeps_partial_first_week(self):
        items = [{"CREATED_TIME": "2026-08-01T12:00:00", "OWNER_ID": "1"}]

        points = server._bucket_stage_history(items, "week", "2026-08-01", "2026-08-03")

        self.assertEqual(points, [
            {"label": "2026-W31", "value": 1.0},
            {"label": "2026-W32", "value": 0.0},
        ])

    def test_month_and_day_axes_include_empty_buckets(self):
        monthly = server._bucket_stage_history([], "month", "2026-06-15", "2026-09-02")
        daily = server._bucket_stage_history([], "day", "2026-09-01", "2026-09-03")

        self.assertEqual([point["label"] for point in monthly], ["2026-06", "2026-07", "2026-08", "2026-09"])
        self.assertEqual([point["label"] for point in daily], ["2026-09-01", "2026-09-02", "2026-09-03"])


if __name__ == "__main__":
    unittest.main()
