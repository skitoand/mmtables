"""Document / sheet helpers and counter management."""

from __future__ import annotations

import copy
import json
from typing import Any

from .constants import DOCUMENT_SCHEMA_VERSION, SHEET_SCHEMA_VERSION


def blank_sheet_layout() -> dict:
    return {
        "schemaVersion": SHEET_SCHEMA_VERSION,
        "zoom": 1,
        "zCounter": 10,
        "windowCounter": 1,
        "shapeCounter": 1,
        "groupCounter": 1,
        "frameCounter": 1,
        "bpProcessCounter": 1,
        "desktopStyle": {
            "fillEnabled": False,
            "gridSize": 24,
        },
        "windows": [],
        "shapes": [],
        "connectors": [],
    }


def blank_document() -> dict:
    return {
        "schemaVersion": DOCUMENT_SCHEMA_VERSION,
        "activeSheetId": 1,
        "sheets": [{"id": 1, "name": "Лист 1", "layout": blank_sheet_layout()}],
    }


def parse_layout(raw: Any) -> dict:
    if isinstance(raw, dict):
        return normalize_document(raw)
    if isinstance(raw, str):
        return normalize_document(json.loads(raw))
    return blank_document()


def ensure_list(value: Any) -> list:
    return value if isinstance(value, list) else []


def _as_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _max_shape_num(shapes: list) -> int:
    max_n = 0
    for shape in shapes:
        sid = str(shape.get("id") or "")
        if sid.startswith("shape_"):
            max_n = max(max_n, _as_int(sid.split("_", 1)[1], 0))
    return max_n


def _max_conn_num(connectors: list) -> int:
    max_n = 0
    for conn in connectors:
        cid = str(conn.get("id") or "")
        for prefix in ("conn_", "conn-"):
            if cid.startswith(prefix):
                max_n = max(max_n, _as_int(cid[len(prefix) :], 0))
    return max_n


def _max_group_num(shapes: list) -> int:
    max_n = 0
    for shape in shapes:
        gid = str(shape.get("groupId") or "")
        if gid.startswith("g"):
            max_n = max(max_n, _as_int(gid[1:], 0))
    return max_n


def _max_bp_num(shapes: list) -> int:
    max_n = 0
    for shape in shapes:
        pid = str(shape.get("bpProcessId") or "")
        if pid.startswith("bp"):
            max_n = max(max_n, _as_int(pid[2:], 0))
    return max_n


def normalize_sheet(layout: dict | None) -> dict:
    sheet = copy.deepcopy(layout) if isinstance(layout, dict) else blank_sheet_layout()
    if sheet.get("schemaVersion") != SHEET_SCHEMA_VERSION:
        sheet["schemaVersion"] = SHEET_SCHEMA_VERSION
    sheet["windows"] = ensure_list(sheet.get("windows"))
    sheet["shapes"] = ensure_list(sheet.get("shapes"))
    sheet["connectors"] = ensure_list(sheet.get("connectors"))
    shapes = sheet["shapes"]
    connectors = sheet["connectors"]
    sheet["shapeCounter"] = max(_as_int(sheet.get("shapeCounter"), 1), _max_shape_num(shapes) + 1)
    sheet["groupCounter"] = max(_as_int(sheet.get("groupCounter"), 1), _max_group_num(shapes) + 1)
    sheet["bpProcessCounter"] = max(_as_int(sheet.get("bpProcessCounter"), 1), _max_bp_num(shapes) + 1)
    sheet["frameCounter"] = max(_as_int(sheet.get("frameCounter"), 1), 1)
    sheet["windowCounter"] = max(_as_int(sheet.get("windowCounter"), 1), 1)
    sheet["zCounter"] = max(_as_int(sheet.get("zCounter"), 10), 10)
    # Keep connector ids unique going forward via a soft counter stored on sheet.
    sheet["_connCounter"] = max(_as_int(sheet.get("_connCounter"), 1), _max_conn_num(connectors) + 1)
    if "zoom" not in sheet:
        sheet["zoom"] = 1
    return sheet


def normalize_document(doc: dict | None) -> dict:
    if not isinstance(doc, dict):
        return blank_document()
    # Legacy flat sheet layout (schema 2 at root).
    if "sheets" not in doc and ("shapes" in doc or "windows" in doc or doc.get("schemaVersion") == 2):
        return {
            "schemaVersion": DOCUMENT_SCHEMA_VERSION,
            "activeSheetId": 1,
            "sheets": [{"id": 1, "name": "Лист 1", "layout": normalize_sheet(doc)}],
        }
    out = {
        "schemaVersion": DOCUMENT_SCHEMA_VERSION,
        "activeSheetId": _as_int(doc.get("activeSheetId"), 1) or 1,
        "sheets": [],
    }
    sheets = ensure_list(doc.get("sheets"))
    if not sheets:
        return blank_document()
    for index, sheet in enumerate(sheets):
        if not isinstance(sheet, dict):
            continue
        sid = _as_int(sheet.get("id"), index + 1) or (index + 1)
        out["sheets"].append(
            {
                "id": sid,
                "name": str(sheet.get("name") or f"Лист {sid}"),
                "layout": normalize_sheet(sheet.get("layout")),
            }
        )
    if not out["sheets"]:
        return blank_document()
    active = out["activeSheetId"]
    if not any(s["id"] == active for s in out["sheets"]):
        out["activeSheetId"] = out["sheets"][0]["id"]
    return out


def get_sheet(doc: dict, sheet_id: int | None = None) -> tuple[dict, dict]:
    document = normalize_document(doc)
    target = _as_int(sheet_id, 0) or _as_int(document.get("activeSheetId"), 1)
    for sheet in document["sheets"]:
        if sheet["id"] == target:
            return document, sheet
    return document, document["sheets"][0]


def set_sheet_layout(doc: dict, sheet_id: int, layout: dict) -> dict:
    document, sheet = get_sheet(doc, sheet_id)
    sheet["layout"] = normalize_sheet(layout)
    return document


def next_shape_id(sheet_layout: dict) -> str:
    n = _as_int(sheet_layout.get("shapeCounter"), 1)
    sheet_layout["shapeCounter"] = n + 1
    return f"shape_{n}"


def next_group_id(sheet_layout: dict) -> str:
    n = _as_int(sheet_layout.get("groupCounter"), 1)
    sheet_layout["groupCounter"] = n + 1
    return f"g{n}"


def next_bp_id(sheet_layout: dict) -> str:
    n = _as_int(sheet_layout.get("bpProcessCounter"), 1)
    sheet_layout["bpProcessCounter"] = n + 1
    return f"bp{n}"


def next_conn_id(sheet_layout: dict) -> str:
    n = _as_int(sheet_layout.get("_connCounter"), 1)
    sheet_layout["_connCounter"] = n + 1
    return f"conn_{n}"


def bump_z(sheet_layout: dict) -> int:
    z = _as_int(sheet_layout.get("zCounter"), 10) + 1
    sheet_layout["zCounter"] = z
    return z


def px(value: float | int) -> str:
    return f"{int(round(float(value)))}px"


def parse_px(value: Any, default: float = 0.0) -> float:
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value or "").strip().lower().replace("px", "")
    try:
        return float(text)
    except ValueError:
        return default


def find_shape(sheet_layout: dict, shape_id: str) -> dict | None:
    sid = str(shape_id or "").strip()
    for shape in sheet_layout.get("shapes") or []:
        if str(shape.get("id")) == sid or str(shape.get("connId")) == sid:
            return shape
    return None


def remove_shapes(sheet_layout: dict, shape_ids: list[str]) -> list[str]:
    wanted = {str(x) for x in shape_ids}
    kept = []
    removed = []
    for shape in sheet_layout.get("shapes") or []:
        sid = str(shape.get("id") or "")
        if sid in wanted or str(shape.get("connId") or "") in wanted:
            removed.append(sid)
        else:
            kept.append(shape)
    sheet_layout["shapes"] = kept
    if removed:
        removed_set = set(removed)
        sheet_layout["connectors"] = [
            c
            for c in sheet_layout.get("connectors") or []
            if str((c.get("from") or {}).get("nodeId")) not in removed_set
            and str((c.get("to") or {}).get("nodeId")) not in removed_set
        ]
    return removed
