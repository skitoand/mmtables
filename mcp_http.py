"""Minimal MCP Streamable HTTP endpoint for Cursor (/mcp)."""

from __future__ import annotations

import json
import secrets
from typing import Any, Callable

from flask import Response, g, jsonify, make_response, request

import layout_engine as eng

PROTOCOL_VERSION = "2025-06-18"
SERVER_INFO = {"name": "mmtable-mcp", "version": "1.0.0"}


def _tool(name: str, description: str, properties: dict, required: list[str] | None = None) -> dict:
    return {
        "name": name,
        "description": description,
        "inputSchema": {
            "type": "object",
            "properties": properties,
            "required": required or [],
            "additionalProperties": True,
        },
    }


TOOLS = [
    _tool(
        "list_documents",
        "List MM Table documents available to the authenticated user.",
        {},
    ),
    _tool(
        "create_document",
        "Create a new blank MM Table document.",
        {"name": {"type": "string", "description": "Document name"}},
        [],
    ),
    _tool(
        "get_document_overview",
        "Get sheets, business processes, tables and counts for a document.",
        {"documentId": {"type": "string"}},
        ["documentId"],
    ),
    _tool(
        "describe_sheet",
        "Structured snapshot of a sheet (shape ids, BP, tables, connectors). Prefer this over raw layout JSON.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer", "description": "Optional sheet id; defaults to active sheet"},
        },
        ["documentId"],
    ),
    _tool(
        "create_shape",
        "Create a shape (shape-rect, shape-note, shape-line, shape-frame).",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "type": {"type": "string"},
            "variant": {"type": "string"},
            "x": {"type": "number"},
            "y": {"type": "number"},
            "width": {"type": "number"},
            "height": {"type": "number"},
            "text": {"type": "string"},
            "fill": {"type": "string"},
        },
        ["documentId"],
    ),
    _tool(
        "update_shape",
        "Update shape properties by id.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "shapeId": {"type": "string"},
            "x": {"type": "number"},
            "y": {"type": "number"},
            "width": {"type": "number"},
            "height": {"type": "number"},
            "text": {"type": "string"},
            "fill": {"type": "string"},
        },
        ["documentId", "shapeId"],
    ),
    _tool(
        "delete_shapes",
        "Delete one or more shapes by id.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "ids": {"type": "array", "items": {"type": "string"}},
        },
        ["documentId", "ids"],
    ),
    _tool(
        "move_shapes",
        "Move shapes absolutely (x/y) or relatively (dx/dy).",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "moves": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "x": {"type": "number"},
                        "y": {"type": "number"},
                        "dx": {"type": "number"},
                        "dy": {"type": "number"},
                    },
                },
            },
        },
        ["documentId", "moves"],
    ),
    _tool(
        "create_table",
        "Create a spreadsheet table shape.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "title": {"type": "string"},
            "rows": {"type": "integer"},
            "cols": {"type": "integer"},
            "x": {"type": "number"},
            "y": {"type": "number"},
            "data": {"type": "array", "items": {"type": "array"}},
        },
        ["documentId"],
    ),
    _tool(
        "get_table",
        "Read table grid by shape id.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "shapeId": {"type": "string"},
        },
        ["documentId", "shapeId"],
    ),
    _tool(
        "set_table_cells",
        "Set table cell values. cells: [{r,c,value}, ...]",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "shapeId": {"type": "string"},
            "cells": {"type": "array"},
        },
        ["documentId", "shapeId", "cells"],
    ),
    _tool(
        "create_business_process",
        "Create a sequential business process (chevron base + stages + optional tasks).",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "name": {"type": "string"},
            "x": {"type": "number"},
            "y": {"type": "number"},
            "stages": {"type": "array", "items": {"type": "string"}},
            "tasks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "stageIndex": {"type": "integer"},
                        "title": {"type": "string"},
                    },
                },
            },
        },
        ["documentId"],
    ),
    _tool(
        "add_bp_stage",
        "Insert a stage into an existing business process.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "processId": {"type": "string"},
            "name": {"type": "string"},
            "index": {"type": "integer"},
            "fill": {"type": "string"},
        },
        ["documentId", "processId"],
    ),
    _tool(
        "add_bp_task",
        "Add a task card under a BP stage.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "processId": {"type": "string"},
            "stageIndex": {"type": "integer"},
            "title": {"type": "string"},
            "executor": {"type": "string"},
            "deadline": {"type": "string"},
            "description": {"type": "string"},
        },
        ["documentId", "processId", "title"],
    ),
    _tool(
        "update_bp_task",
        "Update a BP task card fields.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "taskId": {"type": "string"},
            "title": {"type": "string"},
            "executor": {"type": "string"},
            "deadline": {"type": "string"},
            "description": {"type": "string"},
            "stageIndex": {"type": "integer"},
        },
        ["documentId", "taskId"],
    ),
    _tool(
        "list_business_processes",
        "List business processes on a sheet.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
        },
        ["documentId"],
    ),
    _tool(
        "connect_shapes",
        "Create a connector between two shapes.",
        {
            "documentId": {"type": "string"},
            "sheetId": {"type": "integer"},
            "from": {"type": "string"},
            "to": {"type": "string"},
            "fromAnchor": {"type": "string"},
            "toAnchor": {"type": "string"},
            "lineStyle": {"type": "string"},
        },
        ["documentId", "from", "to"],
    ),
]


def register_mcp(app, deps: dict[str, Callable]):
    authenticate = deps["authenticate"]
    has_scope = deps["has_scope"]
    current_email = deps["current_email"]
    get_docs_conn = deps["get_docs_conn"]
    get_doc_for_user = deps["get_doc_for_user"]
    list_docs = deps["list_docs"]
    new_doc_id = deps["new_doc_id"]
    is_role_at_least = deps["is_role_at_least"]
    role_editor = deps["role_editor"]
    role_owner = deps.get("role_owner", "owner")
    set_auth_context = deps["set_auth_context"]

    def _rpc_error(id_value, code, message):
        return {"jsonrpc": "2.0", "id": id_value, "error": {"code": code, "message": message}}

    def _rpc_result(id_value, result):
        return {"jsonrpc": "2.0", "id": id_value, "result": result}

    def _text_result(payload: Any, is_error: bool = False) -> dict:
        text = payload if isinstance(payload, str) else json.dumps(payload, ensure_ascii=False, indent=2)
        return {"content": [{"type": "text", "text": text}], "isError": bool(is_error)}

    def _load_doc(email: str, doc_id: str, write: bool):
        conn = get_docs_conn(email)
        row = get_doc_for_user(conn, email, doc_id)
        if not row:
            conn.close()
            raise ValueError("not_found")
        if write and not is_role_at_least(row["role"], role_editor):
            conn.close()
            raise ValueError("forbidden")
        return conn, row

    def _save(conn, row, document):
        conn.execute(
            "UPDATE user_documents SET layout_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (json.dumps(document, ensure_ascii=False), row["id"]),
        )
        conn.commit()
        updated = get_doc_for_user(conn, current_email(), row["id"])
        return updated

    def _mutate(doc_id: str, mutator):
        email = current_email()
        conn, row = _load_doc(email, doc_id, write=True)
        try:
            document = eng.parse_layout(row["layout_json"])
            document, result = mutator(document)
            updated = _save(conn, row, document)
            return {"ok": True, "result": result, "updatedAt": updated["updated_at"], "documentId": updated["id"]}
        finally:
            conn.close()

    def call_tool(name: str, arguments: dict | None) -> dict:
        args = arguments or {}
        email = current_email()

        if name == "list_documents":
            if not has_scope("docs:read"):
                raise ValueError("forbidden_scope")
            conn = get_docs_conn(email)
            docs = list_docs(conn, email)
            conn.close()
            return _text_result({"documents": docs})

        if name == "create_document":
            if not has_scope("docs:write"):
                raise ValueError("forbidden_scope")
            conn = get_docs_conn(email)
            doc_id = new_doc_id(conn)
            doc_name = str(args.get("name") or "Новый документ").strip() or "Новый документ"
            layout = eng.blank_document()
            conn.execute(
                """
                INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
                VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """,
                (doc_id, email, doc_name, json.dumps(layout, ensure_ascii=False)),
            )
            conn.execute(
                "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
                (doc_id, email, role_owner),
            )
            conn.commit()
            row = get_doc_for_user(conn, email, doc_id)
            conn.close()
            return _text_result({"id": row["id"], "name": row["name"], "updatedAt": row["updated_at"]})

        doc_id = str(args.get("documentId") or "").strip()
        sheet_id = args.get("sheetId")
        if sheet_id is not None:
            try:
                sheet_id = int(sheet_id)
            except (TypeError, ValueError):
                sheet_id = None

        read_tools = {
            "get_document_overview",
            "describe_sheet",
            "get_table",
            "list_business_processes",
        }
        write_tools = {
            "create_shape",
            "update_shape",
            "delete_shapes",
            "move_shapes",
            "create_table",
            "set_table_cells",
            "create_business_process",
            "add_bp_stage",
            "add_bp_task",
            "update_bp_task",
            "connect_shapes",
        }

        if name in read_tools:
            if not has_scope("docs:read"):
                raise ValueError("forbidden_scope")
            if not doc_id:
                raise ValueError("documentId_required")
            conn, row = _load_doc(email, doc_id, write=False)
            try:
                document = eng.parse_layout(row["layout_json"])
                if name == "get_document_overview":
                    payload = eng.document_overview(
                        document,
                        {"id": row["id"], "name": row["name"], "role": row["role"], "updatedAt": row["updated_at"]},
                    )
                elif name == "describe_sheet":
                    payload = eng.describe_sheet(document, sheet_id)
                    payload["updatedAt"] = row["updated_at"]
                elif name == "get_table":
                    payload = eng.get_table(document, sheet_id, str(args.get("shapeId") or ""))
                else:
                    payload = {"businessProcesses": eng.list_business_processes(document, sheet_id)}
                return _text_result(payload)
            finally:
                conn.close()

        if name in write_tools:
            if not has_scope("docs:write"):
                raise ValueError("forbidden_scope")
            if not doc_id:
                raise ValueError("documentId_required")

            if name == "create_shape":
                return _text_result(_mutate(doc_id, lambda d: eng.create_shape(d, sheet_id, args)))
            if name == "update_shape":
                return _text_result(
                    _mutate(doc_id, lambda d: eng.update_shape(d, sheet_id, str(args.get("shapeId") or ""), args))
                )
            if name == "delete_shapes":
                ids = args.get("ids") or []
                return _text_result(_mutate(doc_id, lambda d: eng.delete_shapes(d, sheet_id, ids)))
            if name == "move_shapes":
                return _text_result(_mutate(doc_id, lambda d: eng.move_shapes(d, sheet_id, args.get("moves") or [])))
            if name == "create_table":
                return _text_result(_mutate(doc_id, lambda d: eng.create_table(d, sheet_id, args)))
            if name == "set_table_cells":
                return _text_result(
                    _mutate(
                        doc_id,
                        lambda d: eng.set_table_cells(d, sheet_id, str(args.get("shapeId") or ""), args.get("cells") or []),
                    )
                )
            if name == "create_business_process":
                return _text_result(_mutate(doc_id, lambda d: eng.create_business_process(d, sheet_id, args)))
            if name == "add_bp_stage":
                return _text_result(
                    _mutate(doc_id, lambda d: eng.add_bp_stage(d, sheet_id, str(args.get("processId") or ""), args))
                )
            if name == "add_bp_task":
                return _text_result(
                    _mutate(doc_id, lambda d: eng.add_bp_task(d, sheet_id, str(args.get("processId") or ""), args))
                )
            if name == "update_bp_task":
                return _text_result(
                    _mutate(doc_id, lambda d: eng.update_bp_task(d, sheet_id, str(args.get("taskId") or ""), args))
                )
            if name == "connect_shapes":
                return _text_result(_mutate(doc_id, lambda d: eng.connect_shapes(d, sheet_id, args)))

        raise ValueError(f"unknown_tool:{name}")

    def handle_message(message: dict):
        if not isinstance(message, dict):
            return _rpc_error(None, -32600, "Invalid Request")
        msg_id = message.get("id")
        method = message.get("method")
        params = message.get("params") or {}

        # Notifications have no id — acknowledge with empty 202 handled by caller.
        if msg_id is None and method and method.startswith("notifications/"):
            return None

        if method == "initialize":
            return _rpc_result(
                msg_id,
                {
                    "protocolVersion": PROTOCOL_VERSION,
                    "capabilities": {"tools": {"listChanged": False}},
                    "serverInfo": SERVER_INFO,
                },
            )
        if method == "ping":
            return _rpc_result(msg_id, {})
        if method == "tools/list":
            return _rpc_result(msg_id, {"tools": TOOLS})
        if method == "tools/call":
            name = str(params.get("name") or "")
            arguments = params.get("arguments") or {}
            try:
                result = call_tool(name, arguments)
                return _rpc_result(msg_id, result)
            except Exception as exc:
                return _rpc_result(msg_id, _text_result({"error": str(exc)}, is_error=True))
        if method in {"resources/list", "prompts/list"}:
            key = "resources" if method.startswith("resources") else "prompts"
            return _rpc_result(msg_id, {key: []})
        return _rpc_error(msg_id, -32601, f"Method not found: {method}")

    def _ensure_auth():
        email, scopes, token_row = authenticate()
        if not email:
            return None
        set_auth_context(email, scopes, token_row)
        return email

    def _json_response(payload, status=200, session_id=None):
        resp = make_response(jsonify(payload), status)
        resp.headers["Content-Type"] = "application/json"
        if session_id:
            resp.headers["Mcp-Session-Id"] = session_id
        return resp

    def _sse_response(payload, session_id=None):
        data = json.dumps(payload, ensure_ascii=False)
        body = f"event: message\ndata: {data}\n\n"

        def generate():
            yield body

        resp = Response(generate(), status=200, mimetype="text/event-stream")
        resp.headers["Cache-Control"] = "no-cache"
        resp.headers["Connection"] = "keep-alive"
        if session_id:
            resp.headers["Mcp-Session-Id"] = session_id
        return resp

    @app.route("/mcp", methods=["GET", "POST", "DELETE", "OPTIONS"])
    def mcp_endpoint():
        if request.method == "OPTIONS":
            resp = make_response("", 204)
            resp.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
            resp.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id"
            resp.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
            return resp

        if request.method == "DELETE":
            return make_response("", 204)

        if not _ensure_auth():
            return jsonify({"error": "unauthorized"}), 401

        session_id = request.headers.get("Mcp-Session-Id") or secrets.token_hex(16)

        if request.method == "GET":
            # Optional SSE stream placeholder for server-initiated messages.
            def generate():
                yield "event: endpoint\ndata: /mcp\n\n"

            resp = Response(generate(), status=200, mimetype="text/event-stream")
            resp.headers["Mcp-Session-Id"] = session_id
            resp.headers["Cache-Control"] = "no-cache"
            return resp

        payload = request.get_json(force=True, silent=True)
        if payload is None:
            return _json_response(_rpc_error(None, -32700, "Parse error"), 400)

        accept = (request.headers.get("Accept") or "").lower()
        want_sse = "text/event-stream" in accept and "application/json" not in accept

        if isinstance(payload, list):
            results = []
            for message in payload:
                out = handle_message(message)
                if out is not None:
                    results.append(out)
            if not results:
                return make_response("", 202)
            body = results
        else:
            out = handle_message(payload)
            if out is None:
                return make_response("", 202)
            body = out

        if want_sse:
            return _sse_response(body, session_id=session_id)
        return _json_response(body, session_id=session_id)

    # silence lint for unused g
    _ = g
