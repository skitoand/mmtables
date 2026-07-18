"""Object-level REST API (/api/v1) for MCP and programmatic clients."""

from __future__ import annotations

import json

from flask import jsonify, request

import layout_engine as eng


class ApiError(Exception):
    def __init__(self, code: str, status: int = 400):
        super().__init__(code)
        self.code = code
        self.status = status


def register_api_v1(app, deps):
    """
    deps: dict with callables
      require_auth(fn)
      require_scope(scope)
      current_email()
      get_docs_conn(email)
      get_doc_for_user(conn, email, doc_id)
      list_docs(conn, email)
      new_doc_id(conn)
      is_role_at_least(role, expected)
      role_editor
      blank_layout()
      normalize_email(value)
    """

    require_auth = deps["require_auth"]
    require_scope = deps["require_scope"]
    current_email = deps["current_email"]
    get_docs_conn = deps["get_docs_conn"]
    get_doc_for_user = deps["get_doc_for_user"]
    list_docs = deps["list_docs"]
    new_doc_id = deps["new_doc_id"]
    is_role_at_least = deps["is_role_at_least"]
    role_editor = deps["role_editor"]
    blank_layout = deps["blank_layout"]
    role_owner = deps.get("role_owner", "owner")

    def _json():
        return request.get_json(force=True, silent=True) or {}

    def _err(exc):
        if isinstance(exc, ApiError):
            return jsonify({"error": exc.code}), exc.status
        code = str(exc)
        status = 404 if code.endswith("not_found") else 400
        return jsonify({"error": code}), status

    def _load_writable(conn, email, doc_id):
        row = get_doc_for_user(conn, email, doc_id)
        if not row:
            raise ApiError("not_found", 404)
        if not is_role_at_least(row["role"], role_editor):
            raise ApiError("forbidden", 403)
        return row

    def _check_conflict(row, payload):
        expected = payload.get("expectedUpdatedAt") or request.headers.get("If-Match")
        if not expected:
            return
        current = str(row["updated_at"] or "")
        if str(expected).strip() != current:
            raise ApiError("conflict", 409)

    def _save_layout(conn, row, document, name=None):
        doc_id = row["id"]
        if name:
            conn.execute(
                "UPDATE user_documents SET name = ?, layout_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                (name, json.dumps(document, ensure_ascii=False), doc_id),
            )
        else:
            conn.execute(
                "UPDATE user_documents SET layout_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                (json.dumps(document, ensure_ascii=False), doc_id),
            )
        conn.commit()
        return get_doc_for_user(conn, current_email(), doc_id)

    def _doc_meta(row):
        return {
            "id": row["id"],
            "name": row["name"],
            "role": row["role"],
            "updatedAt": row["updated_at"],
        }

    def _mutate(doc_id, mutator, payload=None):
        payload = payload or {}
        email = current_email()
        conn = get_docs_conn(email)
        try:
            row = _load_writable(conn, email, doc_id)
            _check_conflict(row, payload)
            document = eng.parse_layout(row["layout_json"])
            document, result = mutator(document, payload)
            updated = _save_layout(conn, row, document, name=payload.get("documentName"))
            return {
                "ok": True,
                "document": _doc_meta(updated),
                "result": result,
                "updatedAt": updated["updated_at"],
            }
        finally:
            conn.close()

    @app.get("/api/v1/docs")
    @require_auth
    @require_scope("docs:read")
    def api_v1_list_docs():
        email = current_email()
        conn = get_docs_conn(email)
        docs = list_docs(conn, email)
        conn.close()
        return jsonify({"documents": docs})

    @app.post("/api/v1/docs")
    @require_auth
    @require_scope("docs:write")
    def api_v1_create_doc():
        payload = _json()
        name = str(payload.get("name") or "Новый документ").strip() or "Новый документ"
        email = current_email()
        conn = get_docs_conn(email)
        doc_id = new_doc_id(conn)
        layout = eng.blank_document()
        conn.execute(
            """
            INSERT INTO user_documents(id, email, name, layout_json, is_active, created_at, updated_at)
            VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """,
            (doc_id, email, name, json.dumps(layout, ensure_ascii=False)),
        )
        conn.execute(
            "INSERT OR IGNORE INTO document_access(document_id, user_email, role) VALUES(?, ?, ?)",
            (doc_id, email, role_owner),
        )
        conn.commit()
        row = get_doc_for_user(conn, email, doc_id)
        conn.close()
        return jsonify({"ok": True, "document": _doc_meta(row), "updatedAt": row["updated_at"]}), 201

    @app.get("/api/v1/docs/<doc_id>")
    @require_auth
    @require_scope("docs:read")
    def api_v1_doc_overview(doc_id):
        email = current_email()
        conn = get_docs_conn(email)
        row = get_doc_for_user(conn, email, doc_id)
        conn.close()
        if not row:
            return jsonify({"error": "not_found"}), 404
        overview = eng.document_overview(eng.parse_layout(row["layout_json"]), _doc_meta(row))
        overview["updatedAt"] = row["updated_at"]
        return jsonify({"document": overview})

    @app.get("/api/v1/docs/<doc_id>/sheets/<int:sheet_id>")
    @require_auth
    @require_scope("docs:read")
    def api_v1_describe_sheet(doc_id, sheet_id):
        email = current_email()
        conn = get_docs_conn(email)
        row = get_doc_for_user(conn, email, doc_id)
        conn.close()
        if not row:
            return jsonify({"error": "not_found"}), 404
        desc = eng.describe_sheet(eng.parse_layout(row["layout_json"]), sheet_id)
        desc["document"] = _doc_meta(row)
        desc["updatedAt"] = row["updated_at"]
        return jsonify(desc)

    @app.post("/api/v1/docs/<doc_id>/shapes")
    @require_auth
    @require_scope("docs:write")
    def api_v1_create_shape(doc_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.create_shape(document, p.get("sheetId"), p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.patch("/api/v1/docs/<doc_id>/shapes/<shape_id>")
    @require_auth
    @require_scope("docs:write")
    def api_v1_update_shape(doc_id, shape_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.update_shape(document, p.get("sheetId"), shape_id, p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.delete("/api/v1/docs/<doc_id>/shapes")
    @require_auth
    @require_scope("docs:write")
    def api_v1_delete_shapes(doc_id):
        payload = _json()
        ids = payload.get("ids") or payload.get("shapeIds") or []
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.delete_shapes(document, p.get("sheetId"), ids),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.post("/api/v1/docs/<doc_id>/shapes/move")
    @require_auth
    @require_scope("docs:write")
    def api_v1_move_shapes(doc_id):
        payload = _json()
        moves = payload.get("moves") or []
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.move_shapes(document, p.get("sheetId"), moves),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.post("/api/v1/docs/<doc_id>/tables")
    @require_auth
    @require_scope("docs:write")
    def api_v1_create_table(doc_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.create_table(document, p.get("sheetId"), p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.get("/api/v1/docs/<doc_id>/tables/<shape_id>")
    @require_auth
    @require_scope("docs:read")
    def api_v1_get_table(doc_id, shape_id):
        email = current_email()
        conn = get_docs_conn(email)
        row = get_doc_for_user(conn, email, doc_id)
        conn.close()
        if not row:
            return jsonify({"error": "not_found"}), 404
        try:
            sheet_id = request.args.get("sheetId", type=int)
            table = eng.get_table(eng.parse_layout(row["layout_json"]), sheet_id, shape_id)
            return jsonify({"table": table, "updatedAt": row["updated_at"]})
        except Exception as exc:
            return _err(exc)

    @app.patch("/api/v1/docs/<doc_id>/tables/<shape_id>/cells")
    @require_auth
    @require_scope("docs:write")
    def api_v1_set_cells(doc_id, shape_id):
        payload = _json()
        cells = payload.get("cells") or []
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.set_table_cells(document, p.get("sheetId"), shape_id, cells),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.post("/api/v1/docs/<doc_id>/business-processes")
    @require_auth
    @require_scope("docs:write")
    def api_v1_create_bp(doc_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.create_business_process(document, p.get("sheetId"), p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.get("/api/v1/docs/<doc_id>/business-processes")
    @require_auth
    @require_scope("docs:read")
    def api_v1_list_bp(doc_id):
        email = current_email()
        conn = get_docs_conn(email)
        row = get_doc_for_user(conn, email, doc_id)
        conn.close()
        if not row:
            return jsonify({"error": "not_found"}), 404
        sheet_id = request.args.get("sheetId", type=int)
        return jsonify(
            {
                "businessProcesses": eng.list_business_processes(eng.parse_layout(row["layout_json"]), sheet_id),
                "updatedAt": row["updated_at"],
            }
        )

    @app.post("/api/v1/docs/<doc_id>/business-processes/<process_id>/stages")
    @require_auth
    @require_scope("docs:write")
    def api_v1_add_stage(doc_id, process_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.add_bp_stage(document, p.get("sheetId"), process_id, p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.post("/api/v1/docs/<doc_id>/business-processes/<process_id>/tasks")
    @require_auth
    @require_scope("docs:write")
    def api_v1_add_task(doc_id, process_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.add_bp_task(document, p.get("sheetId"), process_id, p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.patch("/api/v1/docs/<doc_id>/tasks/<task_id>")
    @require_auth
    @require_scope("docs:write")
    def api_v1_update_task(doc_id, task_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.update_bp_task(document, p.get("sheetId"), task_id, p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    @app.post("/api/v1/docs/<doc_id>/connectors")
    @require_auth
    @require_scope("docs:write")
    def api_v1_connect(doc_id):
        payload = _json()
        try:
            return jsonify(
                _mutate(
                    doc_id,
                    lambda document, p: eng.connect_shapes(document, p.get("sheetId"), p),
                    payload,
                )
            )
        except Exception as exc:
            return _err(exc)

    # silence unused
    _ = blank_layout
