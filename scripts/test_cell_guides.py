#!/usr/bin/env python3
import json
import time
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4173/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1600, "height": 1200})
    page.goto(URL, wait_until="domcontentloaded", timeout=60000)
    for _ in range(40):
        count = page.evaluate("document.querySelectorAll('.shape.shape-table').length")
        if count:
            break
        if _ == 3:
            page.click("#fileMenuBtn")
            page.click('button[data-shape="table"]')
        time.sleep(0.5)
    table = page.locator(".shape.shape-table").first
    table.wait_for(state="visible", timeout=10000)
    table.scroll_into_view_if_needed()
    cell = table.locator("td[data-r='1'][data-c='1']").first
    cell.scroll_into_view_if_needed()
    cell.click()
    page.keyboard.down("Meta")
    page.wait_for_timeout(300)
    state = page.evaluate(
        """() => {
          const table = document.querySelector('.shape.shape-table');
          const guides = document.querySelector('#interactionControlsLayer .table-cell-connector-guides')
            || table?.querySelector('.table-cell-connector-guides');
          const sel = table?.__tableApi?.getSelection?.();
          const arrow = guides?.querySelector('.table-cell-conn-arrow');
          const arrowRect = arrow?.getBoundingClientRect();
          return {
            scope: table?.__tableSelectionScope,
            selected: table?.classList.contains('selected'),
            active: !!sel?.activeCell,
            guides: guides ? {
              hidden: guides.classList.contains('hidden'),
              lifted: guides.classList.contains('lifted'),
              parent: guides.parentElement?.id || guides.parentElement?.className?.slice(0, 30),
              z: guides.style.zIndex,
              box: { left: guides.style.left, top: guides.style.top, w: guides.style.width, h: guides.style.height },
              arrowVisible: !!(arrowRect && arrowRect.width > 0 && arrowRect.height > 0),
              arrowPos: arrow ? { left: arrow.style.left, top: arrow.style.top } : null,
            } : null,
          };
        }"""
    )
    print(json.dumps(state, indent=2, ensure_ascii=False))
    ok = (
        state.get("scope") == "cells"
        and state.get("active")
        and state.get("guides")
        and not state["guides"].get("hidden")
        and state["guides"].get("lifted")
        and state["guides"].get("arrowVisible")
    )
    browser.close()
    raise SystemExit(0 if ok else 2)
