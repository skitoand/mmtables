#!/usr/bin/env python3
"""MCP tool discovery contract tests."""

from __future__ import annotations

import os
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from mcp_http import SERVER_INFO, TOOLS


class McpContractTests(unittest.TestCase):
    def test_full_business_process_tools_are_discoverable(self):
        tools = {tool["name"]: tool for tool in TOOLS}
        expected = {
            "create_business_process", "update_business_process", "list_business_processes",
            "delete_business_process", "add_bp_stage", "update_bp_stage", "delete_bp_stage",
            "add_bp_task", "update_bp_task", "delete_bp_task", "add_bp_automation",
            "update_bp_automation", "delete_bp_automation",
        }
        self.assertTrue(expected.issubset(tools))
        self.assertEqual(SERVER_INFO["version"], "1.3.0")

        create_props = tools["create_business_process"]["inputSchema"]["properties"]
        self.assertIn("tasksHidden", create_props)
        self.assertIn("automationsHidden", create_props)
        task_props = create_props["tasks"]["items"]["properties"]
        for field in (
            "subtitle", "assigner", "timeTracking", "project", "crmElements",
            "conditions", "tags", "additional", "expanded", "order",
        ):
            self.assertIn(field, task_props)
        automation_props = create_props["automations"]["items"]["properties"]
        for field in ("tool", "toolColor", "toolOptions"):
            self.assertIn(field, automation_props)
        for tool_name in ("add_bp_automation", "update_bp_automation"):
            props = tools[tool_name]["inputSchema"]["properties"]
            for field in ("tool", "toolColor", "toolOptions"):
                self.assertIn(field, props)


if __name__ == "__main__":
    unittest.main()
