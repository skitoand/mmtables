# Фильтрация колонок таблицы (MIndMapTable)

Краткая выжимка кода из `app.js` и `styles.css`.

## Как это работает

1. В панели формата включается чекбокс **«Фильтр»** (`#fpTableFilter`) — в таблице появляется строка заголовков с иконкой воронки в каждой колонке.
2. Попап фильтра открывается **кликом по иконке воронки** (`.table-filter-btn`) в ячейке заголовка (строка `r === 0`).
3. Правый клик по заголовку колонки фильтр **не** открывает — в проекте для этого используется отдельная кнопка в ячейке.

Источники:
- `app.js` — строки ~2690–2876 (попап), ~12697–12829 (логика и открытие)
- `styles.css` — строки ~519–546
- `index.html` — чекбокс `#fpTableFilter`

---

## Включение режима фильтра

Чекбокс в панели формата:

```html
<!-- index.html -->
<label class="fp-check fp-table-only">
  <input id="fpTableFilter" type="checkbox" />
  <span>Фильтр</span>
</label>
```

Состояние хранится в `state.tableFilterEnabled` и сериализуется вместе с таблицей (`tableFilterEnabled`, `columnFilters`).

---

## Открытие попапа (клик по иконке воронки)

Функция `decorateFilterHeaderCell` вызывается при рендере строки заголовков (`cell.r === 0`), если `state.tableFilterEnabled === true`:

```javascript
// app.js — внутри createTableShape(), ~12791–12828
const decorateFilterHeaderCell = (td, cell) => {
  td.classList.add("table-filter-header-cell");
  td.textContent = "";
  const wrap = document.createElement("div");
  wrap.className = "table-filter-cell";
  const text = document.createElement("span");
  text.className = "table-filter-cell-text";
  text.textContent = getCellDisplayValue(cell);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `table-filter-btn${isColumnFilterActive(cell.c) ? " active" : ""}`;
  btn.title = "Фильтр";
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6h16l-6 7v5l-4 2v-7L4 6z"/></svg>';
  btn.addEventListener("pointerdown", (event) => event.stopPropagation());
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isWorkspaceReadOnly()) return;
    const values = getColumnUniqueFilterValues(cell.c);
    const current = getColumnFilter(cell.c);
    openTableColumnFilterPopup({
      col: cell.c,
      anchorEl: btn,
      values,
      search: "",
      draftHidden: new Set(current.hiddenValues),
      onSort: (direction) => sortDataRowsByColumn(cell.c, direction),
      onApply: (hiddenValues) => {
        setColumnFilterHiddenValues(cell.c, hiddenValues);
        renderTable();
        refreshAllFormulaDisplays();
        saveLayout();
      }
    });
  });
  wrap.appendChild(text);
  wrap.appendChild(btn);
  td.appendChild(wrap);
};
```

Вызов при отрисовке таблицы:

```javascript
// app.js — renderTable(), ~12972
if (state.tableFilterEnabled && cell.r === 0) decorateFilterHeaderCell(td, cell);
```

---

## Попап фильтра (создание, позиционирование, UI)

Глобальные переменные и константы:

```javascript
// app.js — ~2690–2693
const TABLE_FILTER_EMPTY_VALUE = "__EMPTY__";
const TABLE_FILTER_EMPTY_LABEL = "(Пустые)";
let tableColumnFilterPopup = null;
let tableColumnFilterSession = null;
```

Создание DOM и обработчики:

```javascript
// app.js — ensureTableColumnFilterPopup(), ~2790–2865
function ensureTableColumnFilterPopup() {
  if (tableColumnFilterPopup) return tableColumnFilterPopup;
  const popup = document.createElement("div");
  popup.className = "table-column-filter-popup hidden";
  popup.innerHTML = `
    <button type="button" class="table-filter-sort" data-sort="asc">Сортировать А → Я</button>
    <button type="button" class="table-filter-sort" data-sort="desc">Сортировать Я → А</button>
    <div class="table-filter-select-row">
      <button type="button" class="table-filter-select-all">Выбрать все</button>
      <span class="table-filter-sep">—</span>
      <button type="button" class="table-filter-clear">Сбросить</button>
    </div>
    <div class="table-filter-shown">Показано: <span data-role="shown-count">0</span></div>
    <label class="table-filter-search-wrap">
      <input type="search" class="table-filter-search" placeholder="Поиск" />
      <span class="table-filter-search-icon" aria-hidden="true">⌕</span>
    </label>
    <div class="table-filter-values"></div>
    <div class="table-filter-actions">
      <button type="button" class="table-filter-cancel">Отмена</button>
      <button type="button" class="table-filter-ok">ОК</button>
    </div>
  `;
  document.body.appendChild(popup);

  popup.querySelectorAll(".table-filter-sort").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!tableColumnFilterSession?.onSort) return;
      tableColumnFilterSession.onSort(btn.dataset.sort === "desc" ? "desc" : "asc");
      closeTableColumnFilterPopup();
    });
  });
  popup.querySelector(".table-filter-select-all")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!tableColumnFilterSession) return;
    tableColumnFilterSession.draftHidden.clear();
    renderTableColumnFilterPopupValues();
  });
  popup.querySelector(".table-filter-clear")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!tableColumnFilterSession) return;
    tableColumnFilterSession.values.forEach((entry) => tableColumnFilterSession.draftHidden.add(entry.value));
    renderTableColumnFilterPopupValues();
  });
  popup.querySelector(".table-filter-search")?.addEventListener("input", (event) => {
    if (!tableColumnFilterSession) return;
    tableColumnFilterSession.search = event.target.value || "";
    renderTableColumnFilterPopupValues();
  });
  popup.querySelector(".table-filter-cancel")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeTableColumnFilterPopup();
  });
  popup.querySelector(".table-filter-ok")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!tableColumnFilterSession?.onApply) return;
    tableColumnFilterSession.onApply(Array.from(tableColumnFilterSession.draftHidden));
    closeTableColumnFilterPopup();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!tableColumnFilterPopup || tableColumnFilterPopup.classList.contains("hidden")) return;
    const target = event.target;
    if (tableColumnFilterPopup.contains(target)) return;
    if (tableColumnFilterSession?.anchorEl && tableColumnFilterSession.anchorEl.contains(target)) return;
    closeTableColumnFilterPopup();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTableColumnFilterPopup();
  });

  tableColumnFilterPopup = popup;
  return popup;
}
```

Отрисовка списка значений и открытие:

```javascript
// app.js — ~2756–2876
function renderTableColumnFilterPopupValues() {
  if (!tableColumnFilterPopup || !tableColumnFilterSession) return;
  const list = tableColumnFilterPopup.querySelector(".table-filter-values");
  const shownCount = tableColumnFilterPopup.querySelector("[data-role='shown-count']");
  const selectAllBtn = tableColumnFilterPopup.querySelector(".table-filter-select-all");
  if (!list) return;
  const { values, draftHidden, search } = tableColumnFilterSession;
  const query = String(search || "").trim().toLowerCase();
  const filteredValues = values.filter((entry) => {
    const label = entry.label.toLowerCase();
    return !query || label.includes(query);
  });
  const visibleCount = values.filter((entry) => !draftHidden.has(entry.value)).length;
  if (shownCount) shownCount.textContent = String(visibleCount);
  if (selectAllBtn) selectAllBtn.textContent = `Выбрать все (${values.length})`;
  list.innerHTML = "";
  filteredValues.forEach((entry) => {
    const label = document.createElement("label");
    label.className = "table-filter-value-item";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !draftHidden.has(entry.value);
    input.addEventListener("change", () => {
      if (input.checked) tableColumnFilterSession.draftHidden.delete(entry.value);
      else tableColumnFilterSession.draftHidden.add(entry.value);
      renderTableColumnFilterPopupValues();
    });
    const text = document.createElement("span");
    text.textContent = entry.count > 1 ? `${entry.label} (${entry.count})` : entry.label;
    label.appendChild(input);
    label.appendChild(text);
    list.appendChild(label);
  });
}

function openTableColumnFilterPopup(session) {
  const popup = ensureTableColumnFilterPopup();
  tableColumnFilterSession = session;
  const searchInput = popup.querySelector(".table-filter-search");
  if (searchInput) searchInput.value = session.search || "";
  renderTableColumnFilterPopupValues();
  popup.classList.remove("hidden");
  positionTableColumnFilterPopup(session.anchorEl.getBoundingClientRect());
  requestAnimationFrame(() => positionTableColumnFilterPopup(session.anchorEl.getBoundingClientRect()));
}

function closeTableColumnFilterPopup() {
  tableColumnFilterSession = null;
  if (tableColumnFilterPopup) tableColumnFilterPopup.classList.add("hidden");
}
```

---

## Логика фильтрации строк

```javascript
// app.js — внутри createTableShape(), ~12697–12751
const getCellFilterValue = (r, c) => {
  const cell = getCellState(r, c);
  if (!cell) return TABLE_FILTER_EMPTY_VALUE;
  const raw = String(cell.raw || "").trim();
  if (!raw) return TABLE_FILTER_EMPTY_VALUE;
  if (raw.startsWith("=")) {
    const display = String(getCellDisplayValue(cell) || "").trim();
    return display || TABLE_FILTER_EMPTY_VALUE;
  }
  return raw;
};

const getColumnFilter = (col) => {
  const raw = state.columnFilters[col];
  if (!raw) return { hiddenValues: [], sort: null };
  return {
    hiddenValues: Array.isArray(raw.hiddenValues) ? raw.hiddenValues.slice() : [],
    sort: raw.sort === "asc" || raw.sort === "desc" ? raw.sort : null
  };
};

const isColumnFilterActive = (col) => {
  const filter = getColumnFilter(col);
  return filter.hiddenValues.length > 0 || !!filter.sort;
};

const isRowVisibleByFilters = (r) => {
  if (!state.tableFilterEnabled || r === 0) return true;
  for (let c = 0; c < state.cols; c += 1) {
    const hiddenValues = getColumnFilter(c).hiddenValues;
    if (!hiddenValues.length) continue;
    if (hiddenValues.includes(getCellFilterValue(r, c))) return false;
  }
  return true;
};

const getColumnUniqueFilterValues = (col) => {
  const counts = new Map();
  for (let r = 1; r < state.rows; r += 1) {
    const value = getCellFilterValue(r, col);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  const values = Array.from(counts.keys()).sort((a, b) => {
    if (a === TABLE_FILTER_EMPTY_VALUE) return 1;
    if (b === TABLE_FILTER_EMPTY_VALUE) return -1;
    return filterValueLabel(a).localeCompare(filterValueLabel(b), "ru", { numeric: true, sensitivity: "base" });
  });
  return values.map((value) => ({ value, label: filterValueLabel(value), count: counts.get(value) || 0 }));
};

const setColumnFilterHiddenValues = (col, hiddenValues) => {
  const next = hiddenValues.map(String);
  const existing = getColumnFilter(col);
  if (!next.length && !existing.sort) {
    delete state.columnFilters[col];
    return;
  }
  state.columnFilters[col] = { hiddenValues: next, sort: existing.sort };
};
```

При рендере строки с `r > 0` скрываются, если `!isRowVisibleByFilters(r)`.

Сортировка колонки — `sortDataRowsByColumn(col, direction)` (~12752–12789): переставляет строки данных и сохраняет `sort` в `state.columnFilters[col]`.

---

## Стили

```css
/* styles.css — ~519–546 */
.table-filter-header-cell{background:#d3e3fd !important;color:#1f2937;font-weight:600;padding-right:28px !important;position:relative;border:0 !important}
.table-filter-cell{display:flex;align-items:center;min-height:100%;width:100%;position:relative;padding-right:24px;box-sizing:border-box}
.table-filter-cell-text{display:block;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.table-filter-btn{position:absolute;right:2px;top:50%;transform:translateY(-50%);width:22px;height:22px;border:0;border-radius:6px;background:rgba(255,255,255,.72);color:#64748b;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;box-shadow:0 0 0 1px rgba(148,163,184,.45)}
.table-filter-btn:hover{background:#fff;color:#0f766e}
.table-filter-btn.active{background:#dcfce7;color:#15803d;box-shadow:0 0 0 1px rgba(34,197,94,.45)}
.table-filter-btn svg{width:13px;height:13px;pointer-events:none}
.table-column-filter-popup{position:fixed;z-index:21050;width:min(320px,calc(100vw - 24px));background:#fff;border:1px solid #d5dbe6;border-radius:12px;box-shadow:0 18px 42px rgba(15,23,42,.18);padding:10px;display:flex;flex-direction:column;gap:8px}
.table-column-filter-popup.hidden{display:none}
.table-filter-sort{display:block;width:100%;text-align:left;border:0;background:transparent;padding:8px 10px;border-radius:8px;font-size:14px;color:#1f2937;cursor:pointer}
.table-filter-sort:hover{background:#f1f5f9}
.table-filter-select-row{display:flex;align-items:center;gap:8px;padding:0 4px;font-size:13px;color:#475569}
.table-filter-select-row button{border:0;background:transparent;padding:0;color:#2563eb;cursor:pointer;font-size:13px}
.table-filter-select-row button:hover{text-decoration:underline}
.table-filter-sep{color:#94a3b8}
.table-filter-shown{padding:0 4px;font-size:13px;color:#64748b}
.table-filter-search-wrap{display:flex;align-items:center;gap:8px;border:1px solid #d1d5db;border-radius:8px;padding:0 10px;background:#fff}
.table-filter-search{flex:1;border:0;outline:none;background:transparent;font-size:14px;padding:8px 0}
.table-filter-search-icon{color:#94a3b8;font-size:16px;line-height:1}
.table-filter-values{max-height:min(42vh,280px);overflow:auto;display:flex;flex-direction:column;gap:2px;padding-right:2px}
.table-filter-value-item{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;font-size:14px;color:#1f2937;cursor:pointer}
.table-filter-value-item:hover{background:#f8fafc}
.table-filter-value-item input{margin:0}
.table-filter-value-item span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.table-filter-actions{display:flex;justify-content:flex-end;gap:8px;padding-top:4px}
.table-filter-cancel,.table-filter-ok{min-width:88px;border-radius:999px;padding:8px 16px;font-size:14px;cursor:pointer}
.table-filter-cancel{border:1px solid #22a06b;background:#fff;color:#15803d}
.table-filter-ok{border:1px solid #22a06b;background:#22a06b;color:#fff}
```

---

## Как открыть по правому клику (если нужно)

Сейчас в коде попап открывается только по `click` на `.table-filter-btn`. Чтобы открывать по ПКМ по всей ячейке заголовка, можно добавить в `decorateFilterHeaderCell`:

```javascript
const openFilterForColumn = () => {
  if (isWorkspaceReadOnly()) return;
  const values = getColumnUniqueFilterValues(cell.c);
  const current = getColumnFilter(cell.c);
  openTableColumnFilterPopup({
    col: cell.c,
    anchorEl: btn,
    values,
    search: "",
    draftHidden: new Set(current.hiddenValues),
    onSort: (direction) => sortDataRowsByColumn(cell.c, direction),
    onApply: (hiddenValues) => {
      setColumnFilterHiddenValues(cell.c, hiddenValues);
      renderTable();
      refreshAllFormulaDisplays();
      saveLayout();
    }
  });
};

btn.addEventListener("click", (event) => { /* ... как сейчас ... */ });
td.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  event.stopPropagation();
  openFilterForColumn();
});
```

Этот фрагмент в репозитории **пока не реализован** — приведён как возможное расширение.
