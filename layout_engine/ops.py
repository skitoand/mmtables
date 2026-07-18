"""Object-level layout operations used by /api/v1 and MCP tools."""

from __future__ import annotations

from typing import Any

from .constants import (
    BP_BASE_FILL,
    BP_BASE_PAD_X,
    BP_BASE_PAD_Y,
    BP_CHEVRON_INSET_PX,
    BP_DEFAULT_STAGE_FILL,
    BP_STAGE_GAP,
    BP_STAGE_HEIGHT,
    BP_STAGE_WIDTH,
    BP_TASK_FILL,
    BP_TASK_GAP,
    BP_TASK_HEIGHT,
    BP_TASK_OFFSET_X,
    BP_TASK_RADIUS,
    BP_TASK_ROW_STRIDE,
    BP_TASK_STAGE_GAP,
    DEFAULT_STAGE_NAMES,
    RECT_VARIANTS,
    SHAPE_TYPES,
)
from .document import (
    bump_z,
    find_shape,
    get_sheet,
    next_bp_id,
    next_conn_id,
    next_group_id,
    next_shape_id,
    normalize_document,
    parse_px,
    px,
    remove_shapes,
    set_sheet_layout,
)


def _default_fields() -> dict:
    return {
        "numberGrouping": True,
        "numberFormat": "number",
        "decimalPlaces": None,
        "tableTitle": "",
        "tableHeaderFill": "",
        "tableHeaderFillEnabled": True,
        "tableHeaderGradientEnabled": False,
        "tableHeaderFill2": "#ffffff",
        "tableHeaderFillDirection": "horizontal",
        "tableHeaderTextStyle": {
            "color": "#334155",
            "baseFontSize": 18,
            "fontSize": 18,
            "bold": False,
            "italic": False,
            "strike": False,
            "wrap": False,
            "hAlign": "left",
            "vAlign": "top",
        },
        "scrollEnabled": False,
        "gradientEnabled": False,
        "fillDirection": "horizontal",
        "border": "transparent",
        "borderStyle": "solid",
        "radius": 0,
        "opacity": "1",
        "shadow": 0,
        "angle": 0,
        "flipX": False,
        "flipY": False,
        "bpTaskAutoHeight": True,
        "bpTaskManualPosition": False,
        "tableData": None,
    }


def _stage_stride(width: int, inset: int) -> int:
    return width - inset + BP_STAGE_GAP


def _stages_span(count: int, width: int, inset: int) -> int:
    return width + max(0, count - 1) * _stage_stride(width, inset)


def _empty_table_data(rows: int, cols: int, data: list[list[Any]] | None = None) -> dict:
    rows = max(1, int(rows))
    cols = max(1, int(cols))
    cells = []
    for r in range(rows):
        for c in range(cols):
            raw = ""
            if data and r < len(data) and c < len(data[r]):
                raw = "" if data[r][c] is None else str(data[r][c])
            cells.append({"r": r, "c": c, "raw": raw})
    return {
        "rows": rows,
        "cols": cols,
        "cells": cells,
        "colWidths": [120] * cols,
        "rowHeights": [28] * rows,
        "tableWrap": False,
        "tableAutoSize": True,
        "tableFilterEnabled": False,
        "columnFilters": {},
    }


def _bp_task_data(title: str, extra: dict | None = None) -> dict:
    base = {
        "title": title or "",
        "subtitle": "",
        "expanded": False,
        "description": "",
        "assigner": "",
        "executor": "",
        "deadline": "",
        "timeTracking": "",
        "project": "",
        "crmElements": "",
        "conditions": "",
        "tags": "",
        "results": [""],
        "additional": "",
    }
    if isinstance(extra, dict):
        for key, value in extra.items():
            if key in base:
                base[key] = value
    return base


def create_shape(doc: dict, sheet_id: int | None, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    shape_type = str(payload.get("type") or "shape-rect")
    if shape_type not in SHAPE_TYPES:
        raise ValueError(f"unsupported_shape_type:{shape_type}")
    variant = str(payload.get("variant") or payload.get("shapeVariant") or "rectangle")
    if shape_type == "shape-rect" and variant not in RECT_VARIANTS:
        variant = "rectangle"

    sid = next_shape_id(layout)
    left = float(payload.get("x", payload.get("left", 120)))
    top = float(payload.get("y", payload.get("top", 120)))
    width = float(payload.get("width", 160 if shape_type != "shape-note" else 180))
    height = float(payload.get("height", 80 if shape_type != "shape-note" else 100))
    fill = str(payload.get("fill") or ("#fef08a" if shape_type == "shape-note" else "#ffffff"))
    text = str(payload.get("text") or "")

    shape = {
        "id": sid,
        "connId": sid,
        "type": shape_type,
        "left": px(left),
        "top": px(top),
        "width": px(width),
        "height": px(height),
        "zIndex": bump_z(layout),
        "text": text,
        "fillEnabled": bool(payload.get("fillEnabled", True)),
        "fill": fill,
        "fill2": str(payload.get("fill2") or fill),
        "borderEnabled": bool(payload.get("borderEnabled", shape_type != "shape-note")),
        "borderWidth": int(payload.get("borderWidth", 1)),
        "border": str(payload.get("border") or "#cbd5e1"),
        "textColor": str(payload.get("textColor") or "#111827"),
        "fontSize": int(payload.get("fontSize", 14)),
        "bold": bool(payload.get("bold", False)),
        "hAlign": str(payload.get("hAlign") or "center"),
        "vAlign": str(payload.get("vAlign") or "middle"),
        **_default_fields(),
    }
    if shape_type == "shape-rect":
        shape["shapeVariant"] = variant
        if variant == "chevron":
            shape["shapeInsetDepthPx"] = int(payload.get("inset", BP_CHEVRON_INSET_PX))
        if variant == "rounded":
            shape["radius"] = int(payload.get("radius", 12))
    if shape_type == "shape-note":
        shape["radius"] = int(payload.get("radius", 8))
        shape["hAlign"] = str(payload.get("hAlign") or "left")
        shape["vAlign"] = str(payload.get("vAlign") or "top")
        shape["borderEnabled"] = bool(payload.get("borderEnabled", False))
    if shape_type == "shape-line":
        shape["fillEnabled"] = False
        shape["borderEnabled"] = True
        shape["height"] = px(float(payload.get("height", 2)))
    if shape_type == "shape-frame":
        shape["fillEnabled"] = False
        shape["borderEnabled"] = True
        shape["border"] = str(payload.get("border") or "#94a3b8")
        shape["borderStyle"] = "dashed"
        shape["radius"] = 12

    layout["shapes"].append(shape)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {"id": sid, "type": shape_type, "sheetId": sheet["id"]}


def update_shape(doc: dict, sheet_id: int | None, shape_id: str, patch: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    shape = find_shape(layout, shape_id)
    if not shape:
        raise ValueError("shape_not_found")
    mapping = {
        "x": "left",
        "y": "top",
        "left": "left",
        "top": "top",
        "width": "width",
        "height": "height",
        "text": "text",
        "fill": "fill",
        "fill2": "fill2",
        "fillEnabled": "fillEnabled",
        "border": "border",
        "borderEnabled": "borderEnabled",
        "borderWidth": "borderWidth",
        "textColor": "textColor",
        "fontSize": "fontSize",
        "bold": "bold",
        "hAlign": "hAlign",
        "vAlign": "vAlign",
        "radius": "radius",
        "variant": "shapeVariant",
        "shapeVariant": "shapeVariant",
    }
    for src, dst in mapping.items():
        if src not in patch:
            continue
        value = patch[src]
        if dst in {"left", "top", "width", "height"}:
            shape[dst] = px(value)
        else:
            shape[dst] = value
    if "fill" in patch and "fill2" not in patch:
        shape["fill2"] = shape["fill"]
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {"id": shape["id"], "type": shape.get("type"), "sheetId": sheet["id"]}


def move_shapes(doc: dict, sheet_id: int | None, moves: list[dict]) -> tuple[dict, list]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    updated = []
    for move in moves or []:
        shape = find_shape(layout, str(move.get("id") or ""))
        if not shape:
            continue
        if "x" in move or "left" in move:
            shape["left"] = px(move.get("x", move.get("left")))
        if "y" in move or "top" in move:
            shape["top"] = px(move.get("y", move.get("top")))
        if "dx" in move:
            shape["left"] = px(parse_px(shape.get("left")) + float(move["dx"]))
        if "dy" in move:
            shape["top"] = px(parse_px(shape.get("top")) + float(move["dy"]))
        updated.append(shape["id"])
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, updated


def delete_shapes(doc: dict, sheet_id: int | None, shape_ids: list[str]) -> tuple[dict, list]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    removed = remove_shapes(layout, shape_ids)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, removed


def create_table(doc: dict, sheet_id: int | None, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    sid = next_shape_id(layout)
    rows = int(payload.get("rows", 4))
    cols = int(payload.get("cols", 4))
    data = payload.get("data") if isinstance(payload.get("data"), list) else None
    title = str(payload.get("title") or payload.get("tableTitle") or "Таблица")
    left = float(payload.get("x", payload.get("left", 160)))
    top = float(payload.get("y", payload.get("top", 160)))
    width = float(payload.get("width", max(240, cols * 120)))
    height = float(payload.get("height", max(140, rows * 28 + 40)))
    table_data = _empty_table_data(rows, cols, data)
    shape = {
        "id": sid,
        "connId": sid,
        "type": "shape-table",
        "left": px(left),
        "top": px(top),
        "width": px(width),
        "height": px(height),
        "zIndex": bump_z(layout),
        "text": "",
        "fillEnabled": True,
        "fill": "#ffffff",
        "fill2": "#ffffff",
        "borderEnabled": True,
        "borderWidth": 1,
        "border": "#cbd5e1",
        "textColor": "#111827",
        "fontSize": 13,
        "bold": False,
        "hAlign": "left",
        "vAlign": "top",
        **_default_fields(),
        "tableTitle": title,
        "tableStyle": str(payload.get("tableStyle") or "default"),
        "tableData": table_data,
    }
    layout["shapes"].append(shape)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {
        "id": sid,
        "type": "shape-table",
        "title": title,
        "rows": table_data["rows"],
        "cols": table_data["cols"],
        "sheetId": sheet["id"],
    }


def get_table(doc: dict, sheet_id: int | None, shape_id: str) -> dict:
    _document, sheet = get_sheet(doc, sheet_id)
    shape = find_shape(sheet["layout"], shape_id)
    if not shape or shape.get("type") != "shape-table":
        raise ValueError("table_not_found")
    table_data = shape.get("tableData") or _empty_table_data(1, 1)
    rows = int(table_data.get("rows") or 1)
    cols = int(table_data.get("cols") or 1)
    grid = [["" for _ in range(cols)] for _ in range(rows)]
    for cell in table_data.get("cells") or []:
        r = int(cell.get("r", 0))
        c = int(cell.get("c", 0))
        if 0 <= r < rows and 0 <= c < cols:
            grid[r][c] = str(cell.get("raw") or "")
    return {
        "id": shape["id"],
        "title": shape.get("tableTitle") or "",
        "rows": rows,
        "cols": cols,
        "grid": grid,
        "sheetId": sheet["id"],
    }


def set_table_cells(doc: dict, sheet_id: int | None, shape_id: str, cells: list[dict]) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    shape = find_shape(layout, shape_id)
    if not shape or shape.get("type") != "shape-table":
        raise ValueError("table_not_found")
    table_data = shape.get("tableData") or _empty_table_data(1, 1)
    by_key = {(int(c.get("r", 0)), int(c.get("c", 0))): c for c in table_data.get("cells") or []}
    rows = int(table_data.get("rows") or 1)
    cols = int(table_data.get("cols") or 1)
    for item in cells or []:
        r = int(item.get("r", item.get("row", 0)))
        c = int(item.get("c", item.get("col", 0)))
        raw = "" if item.get("value", item.get("raw")) is None else str(item.get("value", item.get("raw")))
        rows = max(rows, r + 1)
        cols = max(cols, c + 1)
        existing = by_key.get((r, c))
        if existing:
            existing["raw"] = raw
        else:
            cell = {"r": r, "c": c, "raw": raw}
            by_key[(r, c)] = cell
    # Expand sparse missing cells.
    for r in range(rows):
        for c in range(cols):
            by_key.setdefault((r, c), {"r": r, "c": c, "raw": ""})
    table_data["rows"] = rows
    table_data["cols"] = cols
    table_data["cells"] = [by_key[(r, c)] for r in range(rows) for c in range(cols)]
    widths = list(table_data.get("colWidths") or [])
    heights = list(table_data.get("rowHeights") or [])
    while len(widths) < cols:
        widths.append(120)
    while len(heights) < rows:
        heights.append(28)
    table_data["colWidths"] = widths[:cols]
    table_data["rowHeights"] = heights[:rows]
    shape["tableData"] = table_data
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, get_table(document, sheet["id"], shape_id)


def relayout_bp(layout: dict, process_id: str) -> None:
    pid = str(process_id)
    shapes = layout.get("shapes") or []
    base = next((s for s in shapes if s.get("bpProcessId") == pid and s.get("bpRole") == "base"), None)
    stages = sorted(
        [s for s in shapes if s.get("bpProcessId") == pid and s.get("bpRole") == "stage"],
        key=lambda s: int(s.get("bpStageIndex") or 0),
    )
    tasks = [s for s in shapes if s.get("bpProcessId") == pid and s.get("bpRole") == "task"]
    if not base or not stages:
        return

    inset = int(base.get("shapeInsetDepthPx") or BP_CHEVRON_INSET_PX)
    stage_width = int(parse_px(stages[0].get("width"), BP_STAGE_WIDTH))
    stage_height = int(parse_px(stages[0].get("height"), BP_STAGE_HEIGHT))
    origin_x = parse_px(base.get("left"))
    origin_y = parse_px(base.get("top"))
    span = _stages_span(len(stages), stage_width, inset)
    base_w = span + BP_BASE_PAD_X * 2
    base_h = stage_height + BP_BASE_PAD_Y * 2
    base["left"] = px(origin_x)
    base["top"] = px(origin_y)
    base["width"] = px(base_w)
    base["height"] = px(base_h)

    stage_top = origin_y + BP_BASE_PAD_Y
    left = origin_x + BP_BASE_PAD_X
    stage_positions: dict[int, tuple[float, float]] = {}
    for index, stage in enumerate(stages):
        stage["bpStageIndex"] = index
        stage["left"] = px(left)
        stage["top"] = px(stage_top)
        stage["width"] = px(stage_width)
        stage["height"] = px(stage_height)
        stage_positions[index] = (left, stage_width)
        if index < len(stages) - 1:
            left += _stage_stride(stage_width, inset)

    tasks_by_stage: dict[int, list[dict]] = {}
    for task in tasks:
        idx = int(task.get("bpTaskStageIndex") or 0)
        tasks_by_stage.setdefault(idx, []).append(task)

    task_top = origin_y + base_h + BP_TASK_STAGE_GAP
    prev_right: float | None = None
    for stage_index in sorted(tasks_by_stage):
        if stage_index not in stage_positions:
            continue
        stage_left, stage_w = stage_positions[stage_index]
        ideal = stage_left + BP_TASK_OFFSET_X
        task_left = ideal if prev_right is None else max(ideal, prev_right + BP_TASK_GAP)
        ordered = sorted(tasks_by_stage[stage_index], key=lambda t: int(t.get("bpTaskOrder") or 0))
        for order, task in enumerate(ordered):
            task["bpTaskStageIndex"] = stage_index
            task["bpTaskOrder"] = order
            task["left"] = px(task_left)
            task["top"] = px(task_top + order * BP_TASK_ROW_STRIDE)
            task["width"] = px(stage_w)
            if not task.get("height"):
                task["height"] = px(BP_TASK_HEIGHT)
        prev_right = task_left + stage_w


def create_business_process(doc: dict, sheet_id: int | None, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    process_id = next_bp_id(layout)
    group_id = next_group_id(layout)
    origin_x = float(payload.get("x", payload.get("left", 120)))
    origin_y = float(payload.get("y", payload.get("top", 120)))
    stage_names = payload.get("stages") or list(DEFAULT_STAGE_NAMES)
    if not isinstance(stage_names, list) or not stage_names:
        stage_names = list(DEFAULT_STAGE_NAMES)
    stage_width = int(payload.get("stageWidth", BP_STAGE_WIDTH))
    stage_height = int(payload.get("stageHeight", BP_STAGE_HEIGHT))
    inset = int(payload.get("inset", BP_CHEVRON_INSET_PX))
    name = str(payload.get("name") or "Бизнес-процесс")

    span = _stages_span(len(stage_names), stage_width, inset)
    base_w = span + BP_BASE_PAD_X * 2
    base_h = stage_height + BP_BASE_PAD_Y * 2
    base_id = next_shape_id(layout)
    layout["shapes"].append(
        {
            "id": base_id,
            "connId": base_id,
            "groupId": group_id,
            "type": "shape-rect",
            "shapeVariant": "chevron",
            "shapeInsetDepthPx": inset,
            "left": px(origin_x),
            "top": px(origin_y),
            "width": px(base_w),
            "height": px(base_h),
            "zIndex": bump_z(layout),
            "text": "",
            "fillEnabled": True,
            "fill": BP_BASE_FILL,
            "fill2": BP_BASE_FILL,
            "borderEnabled": False,
            "borderWidth": 1,
            "textColor": "#111827",
            "fontSize": 13,
            "bold": False,
            "hAlign": "center",
            "vAlign": "middle",
            "bpProcessId": process_id,
            "bpRole": "base",
            "bpProcessName": name,
            **_default_fields(),
        }
    )

    stage_ids = []
    left = origin_x + BP_BASE_PAD_X
    stage_top = origin_y + BP_BASE_PAD_Y
    for index, stage_name in enumerate(stage_names):
        text = stage_name if isinstance(stage_name, str) else str(stage_name.get("name") or f"Этап {index + 1}")
        fill = (
            stage_name.get("fill")
            if isinstance(stage_name, dict) and stage_name.get("fill")
            else BP_DEFAULT_STAGE_FILL
        )
        sid = next_shape_id(layout)
        layout["shapes"].append(
            {
                "id": sid,
                "connId": sid,
                "groupId": group_id,
                "type": "shape-rect",
                "shapeVariant": "chevron",
                "shapeInsetDepthPx": inset,
                "left": px(left),
                "top": px(stage_top),
                "width": px(stage_width),
                "height": px(stage_height),
                "zIndex": bump_z(layout),
                "text": text,
                "fillEnabled": True,
                "fill": fill,
                "fill2": fill,
                "borderEnabled": False,
                "borderWidth": 1,
                "textColor": "#111827",
                "fontSize": 13,
                "bold": False,
                "hAlign": "center",
                "vAlign": "middle",
                "bpProcessId": process_id,
                "bpRole": "stage",
                "bpStageIndex": index,
                **_default_fields(),
            }
        )
        stage_ids.append({"id": sid, "index": index, "name": text})
        if index < len(stage_names) - 1:
            left += _stage_stride(stage_width, inset)

    for task in payload.get("tasks") or []:
        if not isinstance(task, dict):
            continue
        add_bp_task_to_layout(
            layout,
            process_id,
            group_id,
            {
                "stageIndex": int(task.get("stageIndex", 0)),
                "title": str(task.get("title") or "Задача"),
                **{k: task[k] for k in ("subtitle", "description", "assigner", "executor", "deadline", "project", "tags") if k in task},
            },
        )

    relayout_bp(layout, process_id)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {
        "processId": process_id,
        "groupId": group_id,
        "baseId": base_id,
        "name": name,
        "stages": stage_ids,
        "sheetId": sheet["id"],
    }


def add_bp_task_to_layout(layout: dict, process_id: str, group_id: str, payload: dict) -> dict:
    stage_index = int(payload.get("stageIndex", 0))
    existing = [
        s
        for s in layout.get("shapes") or []
        if s.get("bpProcessId") == process_id and s.get("bpRole") == "task" and int(s.get("bpTaskStageIndex") or 0) == stage_index
    ]
    order = int(payload.get("order", len(existing)))
    title = str(payload.get("title") or "Задача")
    sid = next_shape_id(layout)
    task_data = _bp_task_data(title, payload)
    layout["shapes"].append(
        {
            "id": sid,
            "connId": sid,
            "groupId": group_id,
            "type": "shape-note",
            "left": px(0),
            "top": px(0),
            "width": px(BP_STAGE_WIDTH),
            "height": px(BP_TASK_HEIGHT),
            "zIndex": bump_z(layout),
            "text": title,
            "fillEnabled": True,
            "fill": BP_TASK_FILL,
            "fill2": BP_TASK_FILL,
            "borderEnabled": False,
            "borderWidth": 1,
            "border": "rgb(17, 24, 39)",
            "radius": BP_TASK_RADIUS,
            "textColor": "",
            "fontSize": 12,
            "bold": False,
            "hAlign": "left",
            "vAlign": "top",
            "bpProcessId": process_id,
            "bpRole": "task",
            "bpTaskStageIndex": stage_index,
            "bpTaskOrder": order,
            "bpTaskAutoHeight": True,
            "bpTaskManualPosition": False,
            "bpTaskData": task_data,
            **_default_fields(),
        }
    )
    return {"id": sid, "processId": process_id, "stageIndex": stage_index, "title": title}


def add_bp_stage(doc: dict, sheet_id: int | None, process_id: str, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    pid = str(process_id)
    base = next((s for s in layout["shapes"] if s.get("bpProcessId") == pid and s.get("bpRole") == "base"), None)
    stages = [s for s in layout["shapes"] if s.get("bpProcessId") == pid and s.get("bpRole") == "stage"]
    if not base:
        raise ValueError("bp_not_found")
    group_id = str(base.get("groupId") or next_group_id(layout))
    index = int(payload.get("index", len(stages)))
    index = max(0, min(index, len(stages)))
    for stage in stages:
        cur = int(stage.get("bpStageIndex") or 0)
        if cur >= index:
            stage["bpStageIndex"] = cur + 1
    for task in layout["shapes"]:
        if task.get("bpProcessId") == pid and task.get("bpRole") == "task":
            cur = int(task.get("bpTaskStageIndex") or 0)
            if cur >= index:
                task["bpTaskStageIndex"] = cur + 1
    name = str(payload.get("name") or f"Этап {index + 1}")
    fill = str(payload.get("fill") or BP_DEFAULT_STAGE_FILL)
    sid = next_shape_id(layout)
    layout["shapes"].append(
        {
            "id": sid,
            "connId": sid,
            "groupId": group_id,
            "type": "shape-rect",
            "shapeVariant": "chevron",
            "shapeInsetDepthPx": int(base.get("shapeInsetDepthPx") or BP_CHEVRON_INSET_PX),
            "left": px(0),
            "top": px(0),
            "width": px(BP_STAGE_WIDTH),
            "height": px(BP_STAGE_HEIGHT),
            "zIndex": bump_z(layout),
            "text": name,
            "fillEnabled": True,
            "fill": fill,
            "fill2": fill,
            "borderEnabled": False,
            "borderWidth": 1,
            "textColor": "#111827",
            "fontSize": 13,
            "bold": False,
            "hAlign": "center",
            "vAlign": "middle",
            "bpProcessId": pid,
            "bpRole": "stage",
            "bpStageIndex": index,
            **_default_fields(),
        }
    )
    relayout_bp(layout, pid)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {"id": sid, "processId": pid, "index": index, "name": name, "sheetId": sheet["id"]}


def add_bp_task(doc: dict, sheet_id: int | None, process_id: str, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    pid = str(process_id)
    base = next((s for s in layout["shapes"] if s.get("bpProcessId") == pid and s.get("bpRole") == "base"), None)
    if not base:
        raise ValueError("bp_not_found")
    summary = add_bp_task_to_layout(layout, pid, str(base.get("groupId") or ""), payload)
    relayout_bp(layout, pid)
    document = set_sheet_layout(document, sheet["id"], layout)
    summary["sheetId"] = sheet["id"]
    return document, summary


def update_bp_task(doc: dict, sheet_id: int | None, task_id: str, patch: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    shape = find_shape(layout, task_id)
    if not shape or shape.get("bpRole") != "task":
        raise ValueError("task_not_found")
    data = shape.get("bpTaskData") if isinstance(shape.get("bpTaskData"), dict) else _bp_task_data(str(shape.get("text") or ""))
    for key in ("title", "subtitle", "description", "assigner", "executor", "deadline", "project", "tags", "expanded"):
        if key in patch:
            data[key] = patch[key]
    if "title" in patch:
        shape["text"] = str(patch["title"] or "")
        data["title"] = shape["text"]
    if "stageIndex" in patch:
        shape["bpTaskStageIndex"] = int(patch["stageIndex"])
    shape["bpTaskData"] = data
    relayout_bp(layout, str(shape.get("bpProcessId")))
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {
        "id": shape["id"],
        "processId": shape.get("bpProcessId"),
        "stageIndex": shape.get("bpTaskStageIndex"),
        "title": data.get("title"),
        "sheetId": sheet["id"],
    }


def list_business_processes(doc: dict, sheet_id: int | None = None) -> list[dict]:
    _document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    by_pid: dict[str, dict] = {}
    for shape in layout.get("shapes") or []:
        pid = str(shape.get("bpProcessId") or "")
        if not pid:
            continue
        entry = by_pid.setdefault(
            pid,
            {
                "processId": pid,
                "name": "",
                "baseId": None,
                "stages": [],
                "tasks": [],
                "sheetId": sheet["id"],
            },
        )
        role = shape.get("bpRole")
        if role == "base":
            entry["baseId"] = shape.get("id")
            entry["name"] = str(shape.get("bpProcessName") or entry["name"] or pid)
        elif role == "stage":
            entry["stages"].append(
                {
                    "id": shape.get("id"),
                    "index": int(shape.get("bpStageIndex") or 0),
                    "name": str(shape.get("text") or ""),
                }
            )
        elif role == "task":
            data = shape.get("bpTaskData") if isinstance(shape.get("bpTaskData"), dict) else {}
            entry["tasks"].append(
                {
                    "id": shape.get("id"),
                    "stageIndex": int(shape.get("bpTaskStageIndex") or 0),
                    "title": str(data.get("title") or shape.get("text") or ""),
                    "executor": str(data.get("executor") or ""),
                    "deadline": str(data.get("deadline") or ""),
                }
            )
    result = []
    for entry in by_pid.values():
        entry["stages"].sort(key=lambda s: s["index"])
        entry["tasks"].sort(key=lambda t: (t["stageIndex"], t["title"]))
        if not entry["name"]:
            entry["name"] = entry["processId"]
        result.append(entry)
    result.sort(key=lambda e: e["processId"])
    return result


def connect_shapes(doc: dict, sheet_id: int | None, payload: dict) -> tuple[dict, dict]:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    from_id = str(payload.get("from") or payload.get("fromId") or "")
    to_id = str(payload.get("to") or payload.get("toId") or "")
    if not find_shape(layout, from_id) or not find_shape(layout, to_id):
        raise ValueError("shape_not_found")
    cid = next_conn_id(layout)
    connector = {
        "id": cid,
        "zIndex": 1,
        "from": {"nodeId": from_id, "anchor": str(payload.get("fromAnchor") or "r")},
        "to": {"nodeId": to_id, "anchor": str(payload.get("toAnchor") or "l")},
        "color": str(payload.get("color") or "#1f2937"),
        "width": int(payload.get("width", 2)),
        "lineStyle": str(payload.get("lineStyle") or "solid"),
        "opacity": 1,
        "shadow": 0,
        "startArrowShape": str(payload.get("startArrowShape") or "line"),
        "endArrowShape": str(payload.get("endArrowShape") or "classic"),
        "routeStyle": str(payload.get("routeStyle") or "straight"),
        "routePoints": [],
        "gapStart": int(payload.get("gapStart", 30)),
        "gapEnd": int(payload.get("gapEnd", 30)),
    }
    layout["connectors"].append(connector)
    document = set_sheet_layout(document, sheet["id"], layout)
    return document, {"id": cid, "from": from_id, "to": to_id, "sheetId": sheet["id"]}


def describe_sheet(doc: dict, sheet_id: int | None = None) -> dict:
    document, sheet = get_sheet(doc, sheet_id)
    layout = sheet["layout"]
    shapes_summary = []
    tables = []
    for shape in layout.get("shapes") or []:
        item = {
            "id": shape.get("id"),
            "type": shape.get("type"),
            "x": parse_px(shape.get("left")),
            "y": parse_px(shape.get("top")),
            "width": parse_px(shape.get("width")),
            "height": parse_px(shape.get("height")),
            "text": str(shape.get("text") or "")[:120],
        }
        if shape.get("bpProcessId"):
            item["bpProcessId"] = shape.get("bpProcessId")
            item["bpRole"] = shape.get("bpRole")
        if shape.get("type") == "shape-table":
            td = shape.get("tableData") or {}
            item["tableTitle"] = shape.get("tableTitle") or ""
            item["rows"] = td.get("rows")
            item["cols"] = td.get("cols")
            tables.append(item)
        shapes_summary.append(item)
    return {
        "documentSchemaVersion": document.get("schemaVersion"),
        "sheetId": sheet["id"],
        "sheetName": sheet["name"],
        "counts": {
            "shapes": len(layout.get("shapes") or []),
            "tables": len(tables),
            "connectors": len(layout.get("connectors") or []),
            "windows": len(layout.get("windows") or []),
            "businessProcesses": len(list_business_processes(document, sheet["id"])),
        },
        "shapes": shapes_summary,
        "tables": tables,
        "businessProcesses": list_business_processes(document, sheet["id"]),
        "connectors": [
            {
                "id": c.get("id"),
                "from": (c.get("from") or {}).get("nodeId"),
                "to": (c.get("to") or {}).get("nodeId"),
            }
            for c in layout.get("connectors") or []
        ],
    }


def document_overview(doc: dict, meta: dict | None = None) -> dict:
    document = normalize_document(doc)
    sheets = []
    for sheet in document["sheets"]:
        desc = describe_sheet(document, sheet["id"])
        sheets.append(
            {
                "id": sheet["id"],
                "name": sheet["name"],
                "counts": desc["counts"],
                "businessProcesses": [
                    {"processId": bp["processId"], "name": bp["name"], "stages": len(bp["stages"]), "tasks": len(bp["tasks"])}
                    for bp in desc["businessProcesses"]
                ],
                "tables": [{"id": t["id"], "title": t.get("tableTitle") or ""} for t in desc["tables"]],
            }
        )
    overview = {
        "schemaVersion": document.get("schemaVersion"),
        "activeSheetId": document.get("activeSheetId"),
        "sheets": sheets,
    }
    if meta:
        overview.update(meta)
    return overview
