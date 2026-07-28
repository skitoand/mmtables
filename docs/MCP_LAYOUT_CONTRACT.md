# MCP Layout Contract (v1)

Server-side mutations for MM Table MCP / `/api/v1` write document JSON that the browser `applyLayout()` can load.

## Document

```json
{
  "schemaVersion": 3,
  "activeSheetId": 1,
  "sheets": [
    {
      "id": 1,
      "name": "Лист 1",
      "layout": { "schemaVersion": 2, "...": "..." }
    }
  ]
}
```

## Sheets

MCP/API may add sheets without rewriting the whole document:

- `create_sheet` → blank `layout` (same as UI «+ лист»), default name `Лист N`, optional `activate` (default true)
- `rename_sheet` / `delete_sheet` (last sheet cannot be deleted)

Sheet ids are positive integers; new id = `max(existing)+1`.

## Sheet layout

Required fields:

- `schemaVersion`: `2`
- counters: `shapeCounter`, `groupCounter`, `bpProcessCounter`, `frameCounter`, `windowCounter`, `zCounter`
- arrays: `windows`, `shapes`, `connectors`

Engine may keep internal `_connCounter` for connector ids (`conn_N`).

## Shapes (MVP)

| type | Notes |
|------|--------|
| `shape-rect` | `shapeVariant`: rectangle, rounded, trapezoid, circle, chevron, diamond, … |
| `shape-note` | sticky / BP task card |
| `shape-line` | segment |
| `shape-frame` | dashed container; label via `frameName` (aliases: `name`, `text` on create/update) |
| `shape-table` | spreadsheet; payload in `tableData` |

Common fields: `id`, `connId`, `left/top/width/height` (px strings), `zIndex`, fill/border/text fields.

## Tables

`tableData`:

```json
{
  "rows": 4,
  "cols": 4,
  "cells": [{ "r": 0, "c": 0, "raw": "A1" }],
  "colWidths": [120],
  "rowHeights": [28]
}
```

Title: `tableTitle` on the shape.

## Business processes

Composite of shapes sharing `bpProcessId` + `groupId`:

| bpRole | type | Fields |
|--------|------|--------|
| `base` | `shape-rect` chevron | container; optional `bpTasksHidden` / `bpAutomationsHidden` |
| `stage` | `shape-rect` chevron | `bpStageIndex` |
| `task` | `shape-note` | `bpTaskStageIndex`, `bpTaskOrder`, `bpTaskData` |
| `automation` | `shape-note` | `bpAutomationStageIndex`, `bpAutomationOrder`, `bpAutomationData` |

`bpTaskData`: title, subtitle, description, assigner, executor, deadline, timeTracking, project, crmElements, conditions, tags, results[], additional, expanded.

`bpAutomationData`: title, when, conditions[], description, results[], expanded.

MCP CRUD:
- stages: `add_bp_stage` / `update_bp_stage` / `delete_bp_stage`
- tasks: `add_bp_task` / `update_bp_task` / `delete_bp_task`
- automations: `add_bp_automation` / `update_bp_automation` / `delete_bp_automation`
- process: `create_business_process` / `delete_business_process` / `list_business_processes`

After structural edits the engine runs `relayout_bp` (tasks below stages, automations stacked above).

## Connectors

```json
{
  "id": "conn_1",
  "from": { "nodeId": "shape_1", "anchor": "r" },
  "to": { "nodeId": "shape_2", "anchor": "l" },
  "lineStyle": "solid",
  "routeStyle": "straight"
}
```

## Out of scope (v1)

Bitrix widgets, freedraw, image upload, comments, sharing, raw full-layout replace via MCP.
