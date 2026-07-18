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

## Sheet layout

Required fields:

- `schemaVersion`: `2`
- counters: `shapeCounter`, `groupCounter`, `bpProcessCounter`, `frameCounter`, `windowCounter`, `zCounter`
- arrays: `windows`, `shapes`, `connectors`

Engine may keep internal `_connCounter` for connector ids (`conn_N`).

## Shapes (MVP)

| type | Notes |
|------|--------|
| `shape-rect` | `shapeVariant`: rectangle, rounded, circle, chevron, diamond, … |
| `shape-note` | sticky / BP task card |
| `shape-line` | segment |
| `shape-frame` | dashed container |
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
| `base` | `shape-rect` chevron | container |
| `stage` | `shape-rect` chevron | `bpStageIndex` |
| `task` | `shape-note` | `bpTaskStageIndex`, `bpTaskOrder`, `bpTaskData` |

After structural edits the engine runs `relayout_bp` (same geometry rules as `FormalLayoutBuilder`).

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
