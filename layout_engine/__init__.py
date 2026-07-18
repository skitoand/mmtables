"""Server-side layout mutation engine for MM Table MCP / API v1."""

from .document import blank_document, normalize_document, parse_layout
from .ops import (
    add_bp_stage,
    add_bp_task,
    connect_shapes,
    create_business_process,
    create_shape,
    create_table,
    delete_shapes,
    describe_sheet,
    document_overview,
    get_table,
    list_business_processes,
    move_shapes,
    set_table_cells,
    update_bp_task,
    update_shape,
)

__all__ = [
    "blank_document",
    "normalize_document",
    "parse_layout",
    "add_bp_stage",
    "add_bp_task",
    "connect_shapes",
    "create_business_process",
    "create_shape",
    "create_table",
    "delete_shapes",
    "describe_sheet",
    "document_overview",
    "get_table",
    "list_business_processes",
    "move_shapes",
    "set_table_cells",
    "update_bp_task",
    "update_shape",
]
