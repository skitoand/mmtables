"""Shared layout / business-process constants for server-side mutations."""

DOCUMENT_SCHEMA_VERSION = 3
SHEET_SCHEMA_VERSION = 2

BP_STAGE_WIDTH = 140
BP_STAGE_HEIGHT = 46
BP_STAGE_GAP = 5
BP_BASE_PAD_X = 15
BP_BASE_PAD_Y = 15
BP_CHEVRON_INSET_PX = 14
BP_TASK_OFFSET_X = 24
BP_TASK_STAGE_GAP = 12
BP_TASK_GAP = 5
BP_TASK_RADIUS = 5
BP_TASK_HEIGHT = 34
BP_TASK_STACK_GAP = 15
BP_TASK_ROW_STRIDE = 38
BP_AUTOMATION_FILL = "#fddd68"
BP_AUTOMATION_DEFAULT_HEIGHT = 40
BP_AUTOMATION_STACK_GAP = 7.5  # half of BP_TASK_STACK_GAP
BP_BASE_FILL = "#ece8fd"
BP_TASK_FILL = "#fbcfe8"
BP_DEFAULT_STAGE_FILL = "#d1d5db"

SHAPE_TYPES = {
    "shape-rect",
    "shape-note",
    "shape-line",
    "shape-frame",
    "shape-table",
}

RECT_VARIANTS = {
    "rectangle",
    "rounded",
    "trapezoid",
    "circle",
    "chevron",
    "diamond",
    "triangle",
    "hexagon",
    "parallelogram",
}

DEFAULT_STAGE_NAMES = ("Этап 1", "Этап 2", "Этап 3", "Этап 4", "Этап 5")
