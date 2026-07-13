#!/usr/bin/env python3
"""Apply sharing-related SQLite migrations by importing server (runs _init_db)."""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

import server  # noqa: F401

print("Sharing migrations applied:", server.DB_PATH)
