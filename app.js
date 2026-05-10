const $ = (id) => document.getElementById(id);
const desktop = $("desktop");
const viewportEl = $("viewport");
const template = $("windowTemplate");

const addWindowBtn = $("addWindowBtn");
const modal = $("addWindowModal");
const modalSheetUrl = $("modalSheetUrl");
const modalCancelBtn = $("modalCancelBtn");
const modalCreateBtn = $("modalCreateBtn");
const fileMenuBtn = $("fileMenuBtn");
const fileMenuDropdown = $("fileMenuDropdown");
const fileCreateBtn = $("fileCreateBtn");
const fileOpenBtn = $("fileOpenBtn");
const fileDeleteBtn = $("fileDeleteBtn");
const fileCopyBtn = $("fileCopyBtn");
const fileAutosaveToggle = $("fileAutosaveToggle");
const fileModal = $("fileModal");
const fileModalList = $("fileModalList");
const fileModalCloseBtn = $("fileModalCloseBtn");
const shapeButton = $("shapeButton");
const shapeDropdown = $("shapeDropdown");
const themeLightBtn = $("themeLightBtn");
const themeDarkBtn = $("themeDarkBtn");
const zoomLabel = $("zoomLabel");
const undoBtn = $("undoBtn");
const redoBtn = $("redoBtn");
const zoomInBtn = $("zoomInBtn");
const zoomOutBtn = $("zoomOutBtn");
const resetZoomBtn = $("resetZoomBtn");
const authBtn = $("authBtn");
const userLabel = $("userLabel");
const freeModeHint = $("freeModeHint");
const formatToggle = $("formatToggle");
const formatToggleLabel = formatToggle ? formatToggle.closest("label") : null;
const formatPanel = $("formatPanel");
const toolbarEl = document.querySelector(".toolbar");

const fpFill = $("fpFill");
const fpBorder = $("fpBorder");
const fpBorderWidth = $("fpBorderWidth");
const fpBorderWidthNum = $("fpBorderWidthNum");
const fpRadius = $("fpRadius");
const fpRadiusNum = $("fpRadiusNum");
const fpLineStyle = $("fpLineStyle");
const fpConnGapStart = $("fpConnGapStart");
const fpConnGapEnd = $("fpConnGapEnd");
const fpArrowStartShape = $("fpArrowStartShape");
const fpArrowEndShape = $("fpArrowEndShape");
const fpTextColor = $("fpTextColor");
const fpFontFamily = $("fpFontFamily");
const fpFontSize = $("fpFontSize");
const fpBold = $("fpBold");
const fpItalic = $("fpItalic");
const fpStrike = $("fpStrike");
const fpUnderline = $("fpUnderline");
const fpWrap = $("fpWrap");
const fpCellBorders = $("fpCellBorders");
const fpNumberGrouping = $("fpNumberGrouping");
const fpTextScale = $("fpTextScale");
const fpOpacity = $("fpOpacity");
const fpOpacityNum = $("fpOpacityNum");
const fpFillEnabled = $("fpFillEnabled");
const fpGradientEnabled = $("fpGradientEnabled");
const fpFill2 = $("fpFill2");
const fpGradientWrap = $("fpGradientWrap");
const fpBorderEnabled = $("fpBorderEnabled");
const fpAutoSize = $("fpAutoSize");
const fpShadow = $("fpShadow");
const fpShadowNum = $("fpShadowNum");
const fpX = $("fpX");
const fpY = $("fpY");
const fpW = $("fpW");
const fpH = $("fpH");
const fpAngle = $("fpAngle");
const fpFillType = $("fpFillType");
const fpBorderHex = $("fpBorderHex");
const fpFront = $("fpFront");
const fpBack = $("fpBack");
const fpAddCol = $("fpAddCol");
const fpDelCol = $("fpDelCol");
const fpAddRow = $("fpAddRow");
const fpDelRow = $("fpDelRow");
const fpAlignLeft = $("fpAlignLeft");
const fpAlignCenter = $("fpAlignCenter");
const fpAlignRight = $("fpAlignRight");
const fpVTop = $("fpVTop");
const fpVMiddle = $("fpVMiddle");
const fpVBottom = $("fpVBottom");
const fpRotateRight = $("fpRotateRight");
const fpFlipH = $("fpFlipH");
const fpFlipV = $("fpFlipV");
const fpSnapGrid = $("fpSnapGrid");
const fpDistributeH = $("fpDistributeH");
const fpDistributeV = $("fpDistributeV");
const fpGroup = $("fpGroup");
const fpLock = $("fpLock");
const fpCopyStyle = $("fpCopyStyle");
const fpDefaultStyle = $("fpDefaultStyle");
const tabStyle = $("tabStyle");
const tabText = $("tabText");
const tabOrder = $("tabOrder");
const panelStyle = $("panelStyle");
const panelText = $("panelText");
const panelOrder = $("panelOrder");
const fpCollapseBtn = $("fpCollapseBtn");
const fpClose = $("fpClose");
const fpApplyBtn = $("fpApplyBtn");
const fpCancelBtn = $("fpCancelBtn");
const fpResetBtn = $("fpResetBtn");
const safeOn = (el, event, fn, opts) => { if (el) el.addEventListener(event, fn, opts); };

const FONT_STACKS = {
  Arial: "Arial, sans-serif",
  "Segoe UI": "'Segoe UI', Tahoma, sans-serif",
  Helvetica: "Helvetica, Arial, sans-serif",
  "Trebuchet MS": "'Trebuchet MS', sans-serif",
  "Times New Roman": "'Times New Roman', serif",
  Georgia: "Georgia, serif",
  "Courier New": "'Courier New', monospace",
  "Lucida Console": "'Lucida Console', monospace"
};

let zCounter = 10;
let windowCounter = 1;
let shapeCounter = 1;
let shapeSpawnStep = 0;
let zoom = 1;
let currentUser = null;
let hintTimer = null;
let selectedShape = null;
let selectedConnector = null;
let selectedWindow = null;
let connectorCounter = 1;
const connectors = [];
let connectorDraft = null;
let connectorDragOverlay = null;
let viewportPan = null;
const undoStack = [];
const redoStack = [];
let historyLock = false;
let viewportStabilizer = null;
const ENABLE_TABLE_SHAPE_HANDLE_RESIZE = false;
const APP_BUILD = "20260508-file-docs-1";

const STORAGE_KEY = "table-workspace-layout-v2";
const DOC_STORE_KEY = "table-workspace-doc-store-v1";
const LEGACY_DOC_KEY = "table-workspace-active-doc-v1";
const AUTOSAVE_KEY = "table-workspace-autosave-v1";
const THEME_KEY = "table-workspace-theme-v1";
const PANEL_KEY = "table-format-panel-v1";
const VIEWPORT_KEY = "table-workspace-viewport-v1";
const DEFAULT_STYLES_KEY = "table-workspace-default-styles-v1";
const FORMAT_PANEL_SCALE = 0.5;
const BASE_DESKTOP_WIDTH = 2200;
const BASE_DESKTOP_HEIGHT = 1400;
const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhEx3Hf6nqfIuY73M8W8_QbKHNT8fVSaToTyP3GmPHfMiM2P3MZ-fjRF2f5W5mK2R4M9XQ2u4k/pubhtml?widget=true&headers=false";
let styleClipboard = null;
let defaultStyles = loadDefaultStyles();
let autoSaveEnabled = true;
let currentDocumentId = null;
let currentDocumentName = "Рабочий стол";
let currentDocumentStore = null;
let documentsCache = [];

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function bringToFront(el) { el.style.zIndex = String(++zCounter); }
function saveViewportState() {
  if (!viewportEl) return;
  const payload = { left: viewportEl.scrollLeft || 0, top: viewportEl.scrollTop || 0 };
  sessionStorage.setItem(VIEWPORT_KEY, JSON.stringify(payload));
}
function readViewportState() {
  try {
    const raw = sessionStorage.getItem(VIEWPORT_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return { left: Math.max(0, Number(p.left) || 0), top: Math.max(0, Number(p.top) || 0) };
  } catch {
    return null;
  }
}
function restoreViewportState(state, opts = {}) {
  if (!viewportEl || !state) return;
  const repeat = Math.max(1, Number(opts.repeat) || 1);
  let tries = 0;
  const apply = () => {
    viewportEl.scrollLeft = state.left;
    viewportEl.scrollTop = state.top;
    tries += 1;
    if (tries < repeat) requestAnimationFrame(apply);
  };
  apply();
}
function startViewportStabilizer(state, durationMs = 1200) {
  if (!viewportEl || !state) return;
  if (viewportStabilizer) {
    cancelAnimationFrame(viewportStabilizer.rafId);
    clearTimeout(viewportStabilizer.timerId);
    viewportStabilizer = null;
  }
  const targetLeft = Math.max(0, Number(state.left) || 0);
  const targetTop = Math.max(0, Number(state.top) || 0);
  const tick = () => {
    if (!viewportStabilizer) return;
    viewportEl.scrollLeft = targetLeft;
    viewportEl.scrollTop = targetTop;
    viewportStabilizer.rafId = requestAnimationFrame(tick);
  };
  viewportStabilizer = {
    rafId: requestAnimationFrame(tick),
    timerId: setTimeout(() => {
      if (!viewportStabilizer) return;
      cancelAnimationFrame(viewportStabilizer.rafId);
      viewportStabilizer = null;
      saveViewportState();
    }, Math.max(200, durationMs))
  };
}
function updateDesktopExtent() {
  const keepScrollLeft = viewportEl ? viewportEl.scrollLeft : 0;
  const keepScrollTop = viewportEl ? viewportEl.scrollTop : 0;
  let maxX = BASE_DESKTOP_WIDTH;
  let maxY = BASE_DESKTOP_HEIGHT;
  desktop.querySelectorAll(".sheet-window, .shape").forEach((el) => {
    maxX = Math.max(maxX, el.offsetLeft + el.offsetWidth + 280);
    maxY = Math.max(maxY, el.offsetTop + el.offsetHeight + 280);
  });
  desktop.style.width = `${Math.ceil(maxX)}px`;
  desktop.style.height = `${Math.ceil(maxY)}px`;
  if (viewportEl) {
    viewportEl.scrollLeft = keepScrollLeft;
    viewportEl.scrollTop = keepScrollTop;
  }
}
function applyZoom() { desktop.style.transform = `scale(${zoom})`; zoomLabel.textContent = `${Math.round(zoom * 100)}%`; }
function normalizeSheetUrl(raw) { return (raw || "").trim() || DEFAULT_SHEET_URL; }
function repairPossiblyBrokenSheetUrl(raw) {
  const url = normalizeSheetUrl(raw);
  if (!url || url === "about:blank") return DEFAULT_SHEET_URL;
  try {
    const u = new URL(url);
    if ((u.hostname === "accounts.google.com" || u.hostname === "contacts.google.com") && u.searchParams.get("continue")) {
      const c = decodeURIComponent(u.searchParams.get("continue") || "");
      if (/^https?:\/\/docs\.google\.com\/spreadsheets\//i.test(c)) return c;
    }
    if (u.hostname === "accounts.google.com" || u.hostname === "contacts.google.com") return DEFAULT_SHEET_URL;
    return url;
  } catch {
    return url;
  }
}
function rgbToHex(rgb) {
  const raw = String(rgb || "").trim();
  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const value = hex[1];
    return value.length === 3
      ? `#${value.split("").map((ch) => ch + ch).join("").toLowerCase()}`
      : `#${value.toLowerCase()}`;
  }
  const m = raw.match(/\d+/g);
  return m && m.length >= 3 ? `#${m.slice(0, 3).map((x) => Number(x).toString(16).padStart(2, "0")).join("")}` : "#000000";
}
function fontCssFromKey(key) { return FONT_STACKS[key] || FONT_STACKS.Arial; }
function fontKeyFromCss(css) {
  const raw = String(css || "").toLowerCase();
  if (raw.includes("courier new")) return "Courier New";
  if (raw.includes("lucida console")) return "Lucida Console";
  if (raw.includes("trebuchet ms")) return "Trebuchet MS";
  if (raw.includes("times new roman")) return "Times New Roman";
  if (raw.includes("georgia")) return "Georgia";
  if (raw.includes("helvetica")) return "Helvetica";
  if (raw.includes("arial")) return "Arial";
  return "Arial";
}
function setFontSelectValue(selectEl, cssOrKey) {
  if (!selectEl) return;
  selectEl.value = fontKeyFromCss(cssOrKey);
}
function setControlMixedFlag(el, mixed) {
  if (!el) return;
  el.dataset.mixed = mixed ? "1" : "0";
  el.classList.toggle("fp-mixed", !!mixed);
}
function setCheckboxMixedState(inputEl, mixed, checked = false) {
  if (!inputEl) return;
  inputEl.indeterminate = !!mixed;
  inputEl.checked = mixed ? false : !!checked;
  setControlMixedFlag(inputEl, mixed);
  const label = inputEl.closest("label");
  if (label) label.classList.toggle("fp-mixed", !!mixed);
}
function setTextMixedState(inputEl, mixed, value = "") {
  if (!inputEl) return;
  inputEl.value = mixed ? "" : String(value ?? "");
  setControlMixedFlag(inputEl, mixed);
}
function setSelectMixedState(selectEl, mixed, value = "") {
  if (!selectEl) return;
  if (mixed) {
    selectEl.value = "";
    selectEl.selectedIndex = -1;
  } else {
    selectEl.value = String(value ?? "");
  }
  setControlMixedFlag(selectEl, mixed);
}
function setRangeMixedState(rangeEl, numEl, mixed, value = 0) {
  if (!rangeEl || !numEl) return;
  const min = Number(rangeEl.min || 0);
  const max = Number(rangeEl.max || 100);
  const mid = Math.round((min + max) / 2);
  const next = mixed ? mid : clamp(Number(value) || min, min, max);
  rangeEl.value = String(next);
  numEl.value = mixed ? "" : String(next);
  setControlMixedFlag(rangeEl, mixed);
  setControlMixedFlag(numEl, mixed);
  const wrap = rangeEl.closest(".fp-spinner-wrap");
  if (wrap) wrap.classList.toggle("fp-mixed", !!mixed);
}
function isControlMixed(el) {
  return !!el && (el.dataset.mixed === "1" || el.classList.contains("fp-mixed") || el.indeterminate === true);
}
function clearControlMixedState(el) {
  if (!el) return;
  if (el.dataset.mixed !== "1") return;
  el.dataset.mixed = "0";
  el.classList.remove("fp-mixed");
  if (el.type === "checkbox") el.indeterminate = false;
  const label = el.closest("label");
  if (label) label.classList.remove("fp-mixed");
  const wrap = el.closest(".fp-spinner-wrap");
  if (wrap) wrap.classList.remove("fp-mixed");
  const colorButton = el.closest(".fp-color-button");
  if (colorButton) colorButton.classList.remove("fp-mixed");
}
function isTransparentColor(value) {
  const s = String(value || "").trim().toLowerCase();
  return !s || s === "transparent" || s === "rgba(0, 0, 0, 0)" || s === "rgba(0,0,0,0)";
}
function gradientDirectionCss(direction) {
  if (direction === "vertical") return "to bottom";
  if (direction === "diagonal") return "to bottom right";
  return "to right";
}
function parseGradientFillFromCss(backgroundImage) {
  const raw = String(backgroundImage || "");
  if (!raw.includes("gradient")) return null;
  const colors = raw.match(/#[0-9a-f]{3,6}\b|rgba?\([^)]+\)/gi) || [];
  if (colors.length < 2) return null;
  const lower = raw.toLowerCase();
  const fillDirection = lower.includes("to bottom right") || lower.includes("135deg")
    ? "diagonal"
    : (lower.includes("to bottom") || lower.includes("180deg") ? "vertical" : "horizontal");
  return {
    fill1: rgbToHex(colors[0]),
    fill2: rgbToHex(colors[1]),
    fillDirection
  };
}
function applyFillStyle(node, opts = {}) {
  if (!node) return;
  const fillEnabled = opts.fillEnabled !== false;
  const gradientEnabled = fillEnabled && !!opts.gradientEnabled;
  const fill1 = opts.fill1 || "#ffffff";
  const fill2 = opts.fill2 || fill1;
  const direction = opts.fillDirection || "horizontal";
  node.dataset.fillEnabled = fillEnabled ? "1" : "0";
  node.dataset.gradientEnabled = gradientEnabled ? "1" : "0";
  node.dataset.fillDirection = direction;
  node.dataset.fillColor = fill1;
  node.dataset.fillColor2 = fill2;
  if (gradientEnabled) {
    node.style.backgroundImage = `linear-gradient(${gradientDirectionCss(direction)}, ${fill1}, ${fill2})`;
    node.style.backgroundColor = fill1;
  } else {
    node.style.backgroundImage = "none";
    node.style.backgroundColor = fillEnabled ? fill1 : "transparent";
  }
}
function getNumberGroupingEnabled(node) {
  if (!node) return true;
  if (node.dataset && node.dataset.numberGrouping != null) return node.dataset.numberGrouping !== "0";
  return true;
}
function formatGroupedNumber(raw) {
  const value = String(raw ?? "").trim();
  if (!value) return value;
  const cleaned = value.replace(/[ \u00A0\u202F]/g, "");
  const m = cleaned.match(/^([+-]?)(\d+)([.,](\d+))?$/);
  if (!m) return value;
  const sign = m[1] || "";
  const intPart = m[2] || "0";
  const sep = m[3] ? m[3][0] : "";
  const fracPart = m[4] || "";
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${sign}${grouped}${sep}${fracPart}`;
}
function applyNumberGroupingToText(text, enabled = true) {
  const raw = String(text ?? "");
  if (!enabled) return raw;
  return raw.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;
    const grouped = formatGroupedNumber(trimmed);
    if (grouped === trimmed) return line;
    return line.replace(trimmed, grouped);
  }).join("\n");
}
function renderShapeText(textEl) {
  if (!textEl) return;
  const raw = textEl.dataset.rawText != null ? String(textEl.dataset.rawText) : String(textEl.innerText || "");
  textEl.dataset.rawText = raw;
  textEl.textContent = applyNumberGroupingToText(raw, getNumberGroupingEnabled(textEl));
}
function getFillStyleFromNode(node, fallbackFill = "#ffffff") {
  const cs = getComputedStyle(node);
  const fillEnabled = node.dataset.fillEnabled != null ? node.dataset.fillEnabled === "1" : !isTransparentColor(cs.backgroundColor);
  const gradientEnabled = node.dataset.gradientEnabled != null ? node.dataset.gradientEnabled === "1" : String(cs.backgroundImage || "").includes("gradient");
  const gradientFill = parseGradientFillFromCss(cs.backgroundImage);
  const fill1 = gradientFill ? gradientFill.fill1 : (node.dataset.fillColor || rgbToHex(cs.backgroundColor || fallbackFill));
  const fill2 = gradientFill ? gradientFill.fill2 : (node.dataset.fillColor2 || fill1);
  const fillDirection = gradientFill ? gradientFill.fillDirection : (node.dataset.fillDirection || "horizontal");
  return { fillEnabled, gradientEnabled, fill1, fill2, fillDirection };
}
let tableMeasureNode = null;
function getTableMeasureNode() {
  if (tableMeasureNode) return tableMeasureNode;
  tableMeasureNode = document.createElement("div");
  tableMeasureNode.style.position = "absolute";
  tableMeasureNode.style.left = "-99999px";
  tableMeasureNode.style.top = "0";
  tableMeasureNode.style.visibility = "hidden";
  tableMeasureNode.style.pointerEvents = "none";
  tableMeasureNode.style.whiteSpace = "pre-wrap";
  tableMeasureNode.style.boxSizing = "border-box";
  tableMeasureNode.style.display = "block";
  document.body.appendChild(tableMeasureNode);
  return tableMeasureNode;
}
function measureTableCellText(td, text, wrap, widthPx) {
  const el = getTableMeasureNode();
  const cs = getComputedStyle(td);
  el.style.fontFamily = cs.fontFamily;
  el.style.fontSize = cs.fontSize;
  el.style.fontWeight = cs.fontWeight;
  el.style.fontStyle = cs.fontStyle;
  el.style.letterSpacing = cs.letterSpacing;
  el.style.textTransform = cs.textTransform;
  el.style.lineHeight = cs.lineHeight;
  el.style.padding = cs.padding;
  el.style.border = "0 solid transparent";
  el.style.boxSizing = "content-box";
  el.style.whiteSpace = wrap ? "normal" : "nowrap";
  el.style.width = wrap ? `${Math.max(20, Math.floor(widthPx || 0))}px` : "auto";
  el.textContent = String(text || " ");
  const rect = el.getBoundingClientRect();
  return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
}
function clampShadowValue(v) { return Math.max(0, Math.min(48, Number(v) || 0)); }
function parseShadowValue(boxShadow) {
  const raw = String(boxShadow || "").trim();
  if (!raw || raw === "none") return 0;
  const values = raw.match(/-?\d*\.?\d+px/g) || [];
  if (values.length >= 3) return clampShadowValue(values[2]);
  if (values.length >= 1) return clampShadowValue(values[values.length - 1]);
  return 0;
}
function shadowStyleFromValue(value) {
  const px = clampShadowValue(value);
  return px > 0 ? `0 4px ${px}px rgba(0, 0, 0, 0.22)` : "none";
}
function applyNodeShadow(node, value) {
  if (!node) return;
  const px = clampShadowValue(value);
  node.dataset.shadow = String(px);
  node.style.boxShadow = shadowStyleFromValue(px);
}
function setViewportScrollLock(locked) {
  if (!viewportEl) return;
  viewportEl.dataset.scrollLock = locked ? "1" : "0";
}
function nextConnectorId() { return `conn-${connectorCounter++}`; }
function ensureUniqueConnectorIds() {
  const used = new Set();
  let maxIdNum = 0;
  connectors.forEach((c) => {
    let id = String(c.id || "");
    let ok = false;
    if (id) {
      const m = id.match(/^conn-(\d+)$/);
      if (m) {
        maxIdNum = Math.max(maxIdNum, Number(m[1]));
        if (!used.has(id)) ok = true;
      } else if (!used.has(id)) {
        ok = true;
      }
    }
    if (!ok) {
      id = `conn-${++maxIdNum}`;
      while (used.has(id)) id = `conn-${++maxIdNum}`;
      c.id = id;
    } else {
      c.id = id;
    }
    used.add(c.id);
  });
  connectorCounter = Math.max(connectorCounter, maxIdNum + 1);
}

function createBlankLayout() {
  return {
    schemaVersion: LAYOUT_SCHEMA_VERSION,
    zoom: 1,
    zCounter: 10,
    windowCounter: 1,
    shapeCounter: 1,
    windows: [],
    shapes: [],
    connectors: []
  };
}

function createDocId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return `doc-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function cloneLayout(data) {
  try {
    return data ? JSON.parse(JSON.stringify(data)) : createBlankLayout();
  } catch {
    return createBlankLayout();
  }
}

function migrateLayout(layout) {
  const safe = cloneLayout(layout || createBlankLayout());
  const version = Number(safe.schemaVersion) || 0;
  if (version < 2) {
    (safe.shapes || []).forEach((shape) => {
      if (!shape || shape.type !== "shape-table" || !shape.tableHeaderTextStyle) return;
      const headerText = shape.tableHeaderTextStyle;
      const fontSize = Math.max(8, Math.min(144, Number(headerText.baseFontSize ?? headerText.fontSize ?? 18) || 18));
      if (fontSize > 36) {
        headerText.baseFontSize = 18;
        headerText.fontSize = 18;
      } else {
        headerText.baseFontSize = fontSize;
        headerText.fontSize = fontSize;
      }
    });
    safe.schemaVersion = LAYOUT_SCHEMA_VERSION;
  }
  return safe;
}

function defaultDocumentName(name) {
  const raw = String(name || "").trim();
  return raw || "Рабочий стол";
}

function loadLocalDocStore() {
  try {
    const raw = localStorage.getItem(DOC_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.documents)) return parsed;
    }
  } catch {}
  return null;
}

function saveLocalDocStore(store) {
  localStorage.setItem(DOC_STORE_KEY, JSON.stringify(store));
  currentDocumentStore = store;
}

function ensureLocalDocStore() {
  let store = loadLocalDocStore();
  if (!store) {
    let layout = null;
    try {
      const legacy = localStorage.getItem(STORAGE_KEY);
      if (legacy) layout = JSON.parse(legacy);
    } catch {}
    if (!layout) layout = createBlankLayout();
    const docId = createDocId();
    store = {
      version: 1,
      activeDocumentId: docId,
      documents: [
        {
          id: docId,
          name: "Рабочий стол",
          layout,
          createdAt: nowIso(),
          updatedAt: nowIso()
        }
      ]
    };
    store.activeDocumentId = store.documents[0].id;
    saveLocalDocStore(store);
    return store;
  }
  if (!store.activeDocumentId && store.documents.length) store.activeDocumentId = store.documents[0].id;
  if (!store.documents.length) {
    const doc = {
      id: createDocId(),
      name: "Рабочий стол",
      layout: createBlankLayout(),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    store.documents.push(doc);
    store.activeDocumentId = doc.id;
  }
  saveLocalDocStore(store);
  return store;
}

function getLocalDocById(id) {
  const store = ensureLocalDocStore();
  return store.documents.find((doc) => doc.id === id) || null;
}

function setActiveLocalDoc(id) {
  const store = ensureLocalDocStore();
  if (!store.documents.some((doc) => doc.id === id)) return null;
  store.activeDocumentId = id;
  saveLocalDocStore(store);
  return getLocalDocById(id);
}

function upsertLocalDoc(doc) {
  const store = ensureLocalDocStore();
  const idx = store.documents.findIndex((item) => item.id === doc.id);
  if (idx >= 0) store.documents[idx] = { ...store.documents[idx], ...doc };
  else store.documents.push(doc);
  store.activeDocumentId = doc.id;
  saveLocalDocStore(store);
  return doc;
}

function removeLocalDoc(id) {
  const store = ensureLocalDocStore();
  store.documents = store.documents.filter((doc) => doc.id !== id);
  if (!store.documents.length) {
    const doc = {
      id: createDocId(),
      name: "Рабочий стол",
      layout: createBlankLayout(),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    store.documents.push(doc);
    store.activeDocumentId = doc.id;
  } else if (store.activeDocumentId === id) {
    store.activeDocumentId = store.documents[0].id;
  }
  saveLocalDocStore(store);
  return store.documents.find((doc) => doc.id === store.activeDocumentId) || null;
}

function loadActiveLocalDocument() {
  const store = ensureLocalDocStore();
  const doc = store.documents.find((item) => item.id === store.activeDocumentId) || store.documents[0];
  currentDocumentStore = store;
  currentDocumentId = doc.id;
  currentDocumentName = doc.name;
  documentsCache = store.documents.slice();
  return doc;
}

function updateAutosaveIndicator() {
  if (fileAutosaveToggle) fileAutosaveToggle.checked = autoSaveEnabled;
}

function setAutosaveEnabled(next) {
  autoSaveEnabled = !!next;
  localStorage.setItem(AUTOSAVE_KEY, autoSaveEnabled ? "1" : "0");
  updateAutosaveIndicator();
}

function getDocLabel(doc) {
  const active = doc && doc.id === currentDocumentId;
  const date = doc && (doc.updatedAt || doc.createdAt) ? new Date(doc.updatedAt || doc.createdAt) : null;
  const time = date && !Number.isNaN(date.getTime())
    ? date.toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" })
    : "";
  return {
    active,
    time
  };
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data && data.error ? String(data.error) : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return data;
}

async function loadDocumentsIndex() {
  if (currentUser) {
    const data = await fetchJson("/api/docs");
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : [];
    currentDocumentId = data.activeDocumentId || currentDocumentId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    return data;
  }
  const store = ensureLocalDocStore();
  documentsCache = store.documents.map((doc) => ({
    id: doc.id,
    name: doc.name,
    isActive: doc.id === store.activeDocumentId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  }));
  currentDocumentId = store.activeDocumentId;
  const doc = getLocalDocById(store.activeDocumentId) || store.documents[0];
  currentDocumentName = doc ? doc.name : currentDocumentName;
  currentDocumentStore = store;
  return {
    documents: documentsCache,
    activeDocumentId: currentDocumentId,
    activeDocumentName: currentDocumentName
  };
}

async function loadCurrentDocument() {
  if (currentUser) {
    const data = await fetchJson("/api/layout");
    currentDocumentId = data.documentId || currentDocumentId;
    currentDocumentName = data.documentName || currentDocumentName;
    const loaded = applyLayout(data.layout || createBlankLayout());
    if (loaded) documentsCache = documentsCache.map((doc) => ({
      ...doc,
      isActive: doc.id === currentDocumentId
    }));
    return loaded;
  }
  const doc = loadActiveLocalDocument();
  if (!doc) return false;
  currentDocumentId = doc.id;
  currentDocumentName = doc.name;
  return applyLayout(doc.layout || createBlankLayout());
}

async function persistCurrentDocument(layoutOverride = null) {
  const layout = cloneLayout(layoutOverride || getCurrentLayout());
  if (currentUser) {
    await fetchJson("/api/layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout, documentId: currentDocumentId })
    });
    return;
  }
  const store = ensureLocalDocStore();
  const doc = getLocalDocById(currentDocumentId) || store.documents[0];
  if (!doc) return;
  const nextDoc = {
    ...doc,
    layout,
    updatedAt: nowIso()
  };
  upsertLocalDoc(nextDoc);
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === currentDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
}

async function createDocumentRecord(name, mode = "new") {
  const safeName = defaultDocumentName(name);
  if (currentUser) {
    const payload = mode === "copy"
      ? { name: safeName, sourceDocumentId: currentDocumentId }
      : { name: safeName };
    const data = await fetchJson("/api/docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    currentDocumentId = data.activeDocumentId || data.document?.id || currentDocumentId;
    currentDocumentName = data.document?.name || safeName;
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    return data.document || null;
  }

  const layout = mode === "copy" && currentDocumentId
    ? cloneLayout(getCurrentLayout())
    : createBlankLayout();
  const doc = {
    id: createDocId(),
    name: safeName,
    layout,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  upsertLocalDoc(doc);
  currentDocumentId = doc.id;
  currentDocumentName = doc.name;
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === currentDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  return doc;
}

async function activateDocumentRecord(docId) {
  if (!docId) return false;
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}/activate`, { method: "POST" });
    currentDocumentId = data.activeDocumentId || docId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    await loadCurrentDocument();
    await loadDocumentsIndex();
    return true;
  }
  const doc = setActiveLocalDoc(docId);
  if (!doc) return false;
  currentDocumentId = doc.id;
  currentDocumentName = doc.name;
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === currentDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  return applyLayout(doc.layout || createBlankLayout());
}

async function deleteDocumentRecord(docId) {
  if (!docId) return false;
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}`, { method: "DELETE" });
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    currentDocumentId = data.activeDocumentId || currentDocumentId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    await loadCurrentDocument();
    return true;
  }
  const active = removeLocalDoc(docId);
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === ensureLocalDocStore().activeDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  if (active) {
    currentDocumentId = active.id;
    currentDocumentName = active.name;
    return applyLayout(active.layout || createBlankLayout());
  }
  return false;
}

function renderFileModalList() {
  if (!fileModalList) return;
  const docs = documentsCache.slice();
  if (!docs.length) {
    fileModalList.innerHTML = '<div class="file-doc-item"><div class="file-doc-meta"><div class="file-doc-name">Документы не найдены</div><div class="file-doc-sub">Создай первый документ через меню Файл.</div></div></div>';
    return;
  }
  fileModalList.innerHTML = "";
  docs.forEach((doc) => {
    const item = document.createElement("div");
    item.className = `file-doc-item${doc.id === currentDocumentId ? " active" : ""}`;
    const meta = document.createElement("div");
    meta.className = "file-doc-meta";
    const name = document.createElement("div");
    name.className = "file-doc-name";
    name.textContent = doc.name || "Без названия";
    const sub = document.createElement("div");
    sub.className = "file-doc-sub";
    const label = getDocLabel(doc);
    sub.textContent = `${doc.id === currentDocumentId ? "Открыт" : "Документ"}${label.time ? ` · ${label.time}` : ""}`;
    meta.appendChild(name);
    meta.appendChild(sub);
    const actions = document.createElement("div");
    actions.className = "file-doc-actions";
    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "file-doc-open";
    openBtn.textContent = doc.id === currentDocumentId ? "Текущий" : "Открыть";
    openBtn.disabled = doc.id === currentDocumentId;
    openBtn.addEventListener("click", async () => {
      try {
        await persistCurrentDocument();
        await activateDocumentRecord(doc.id);
        closeFileModal();
        showHint(`Открыт документ: ${doc.name}`, "warning", 1800);
      } catch (err) {
        console.error(err);
        showHint("Не удалось открыть документ.", "error", 2500);
      }
    });
    actions.appendChild(openBtn);
    item.appendChild(meta);
    item.appendChild(actions);
    fileModalList.appendChild(item);
  });
}

function openFileModal(title = "Открыть документ") {
  const header = fileModal ? fileModal.querySelector("#fileModalTitle") : null;
  if (header) header.textContent = title;
  renderFileModalList();
  if (fileModal) fileModal.classList.remove("hidden");
}

function closeFileModal() {
  if (fileModal) fileModal.classList.add("hidden");
}

function toggleFileMenu(force) {
  if (!fileMenuDropdown) return;
  const next = typeof force === "boolean" ? force : fileMenuDropdown.classList.contains("hidden");
  fileMenuDropdown.classList.toggle("hidden", !next);
}

function resetViewportToOrigin() {
  if (!viewportEl) return;
  viewportEl.scrollLeft = 0;
  viewportEl.scrollTop = 0;
  saveViewportState();
}

function setTheme(mode) {
  const dark = mode === "dark";
  document.body.classList.toggle("dark", dark);
  if (themeLightBtn) themeLightBtn.classList.toggle("active", !dark);
  if (themeDarkBtn) themeDarkBtn.classList.toggle("active", dark);
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
}

function loadDefaultStyles() {
  try {
    const raw = localStorage.getItem(DEFAULT_STYLES_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function saveDefaultStyles() {
  try {
    localStorage.setItem(DEFAULT_STYLES_KEY, JSON.stringify(defaultStyles || {}));
  } catch {}
}

function cloneStyleData(data) {
  try {
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch {
    return null;
  }
}

function applyCreationStylePreset(type, opts = {}) {
  const base = cloneStyleData(defaultStyles[type]) || {};
  const clip = styleClipboard && styleClipboard.type === type ? cloneStyleData(styleClipboard.data) || {} : {};
  return { ...base, ...clip, ...opts };
}

function snapshotStyleForSelection() {
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return null;
    return {
      type: "connector",
      data: {
        color: c.color || "#1f2937",
        width: c.width || 2,
        lineStyle: c.lineStyle || "solid",
        startArrowShape: c.startArrowShape || "classic",
        endArrowShape: c.endArrowShape || "classic",
        gapStart: c.gapStart ?? 30,
        gapEnd: c.gapEnd ?? 30
      }
    };
  }
  if (selectedShape) {
    const text = selectedShape.querySelector(".shape-text");
    const header = selectedShape.querySelector(".table-titlebar");
    const headerText = selectedShape.querySelector(".table-title-text");
    const fillNode = selectedShape.dataset.shapeType === "shape-table" ? (header || selectedShape) : selectedShape;
    const fillState = getFillStyleFromNode(fillNode, selectedShape.dataset.shapeType === "shape-table" ? "#f8fafc" : "#ffffff");
    if (selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells" && selectedShape.__tableApi && selectedShape.__tableApi.getSelection) {
      const tableSelection = selectedShape.__tableApi.getSelection();
      const selectedCell = tableSelection && tableSelection.cells && tableSelection.cells.length
        ? (tableSelection.activeCell || tableSelection.cells[0])
        : null;
      if (selectedCell) {
        const cellFillState = getFillStyleFromNode(selectedCell, "#ffffff");
        const cellBorderWidth = Math.max(0, parseInt(selectedCell.style.borderWidth || getComputedStyle(selectedCell).borderWidth || "1", 10) || 0);
        return {
          type: selectedShape.dataset.shapeType || "shape",
          data: {
            fillEnabled: cellFillState.fillEnabled,
            gradientEnabled: cellFillState.gradientEnabled,
            fillDirection: cellFillState.fillDirection,
            fill: cellFillState.fill1,
            fill2: cellFillState.fill2,
            border: selectedCell.style.borderColor || getComputedStyle(selectedCell).borderColor || "",
            borderEnabled: cellBorderWidth > 0,
            borderWidth: cellBorderWidth,
            tableWrap: selectedShape.dataset.tableWrap !== "0",
            tableAutoSize: selectedShape.dataset.tableAutoSize !== "0",
            opacity: selectedShape.style.opacity || "1",
            shadow: parseShadowValue(selectedShape.style.boxShadow || getComputedStyle(selectedShape).boxShadow),
            fontFamily: selectedCell.style.fontFamily || getComputedStyle(selectedCell).fontFamily || "",
            fontSize: parseInt(selectedCell.dataset.baseFontSize || selectedCell.style.fontSize || "16", 10),
            textColor: selectedCell.style.color || getComputedStyle(selectedCell).color || "",
            bold: (selectedCell.style.fontWeight || "400") === "700",
            italic: (selectedCell.style.fontStyle || "normal") === "italic",
            strike: (selectedCell.style.textDecoration || "none").includes("line-through"),
            underline: (selectedCell.style.textDecoration || "none").includes("underline"),
            wrap: (selectedCell.style.whiteSpace || "pre-wrap") !== "nowrap",
            numberGrouping: getNumberGroupingEnabled(selectedCell),
            hAlign: selectedCell.style.textAlign || "left",
            vAlign: selectedCell.style.verticalAlign || "top"
          }
        };
      }
    }
    return {
      type: selectedShape.dataset.shapeType || "shape",
      data: {
        fillEnabled: fillState.fillEnabled,
        gradientEnabled: fillState.gradientEnabled,
        fillDirection: fillState.fillDirection,
        fill: fillState.fill1,
        fill2: fillState.fill2,
        border: selectedShape.style.borderColor || "",
        borderEnabled: selectedShape.dataset.borderEnabled != null ? selectedShape.dataset.borderEnabled === "1" : parseInt(selectedShape.style.borderWidth || "1", 10) > 0,
        borderWidth: Math.max(0, Number(selectedShape.dataset.borderWidth || parseInt(selectedShape.style.borderWidth || "1", 10) || 0)),
        tableWrap: selectedShape.dataset.shapeType === "shape-table" ? (selectedShape.dataset.tableWrap !== "0") : undefined,
        tableAutoSize: selectedShape.dataset.shapeType === "shape-table" ? (selectedShape.dataset.tableAutoSize !== "0") : undefined,
        radius: parseInt(selectedShape.style.borderRadius || "0", 10),
        opacity: selectedShape.style.opacity || "1",
        shadow: Number(selectedShape.dataset.shadow ?? parseShadowValue(selectedShape.style.boxShadow || getComputedStyle(selectedShape).boxShadow)) || 0,
        fontFamily: text ? (text.style.fontFamily || "") : (headerText ? (headerText.style.fontFamily || "") : ""),
        fontSize: text ? parseInt(text.style.fontSize || "16", 10) : (headerText ? parseInt(headerText.style.fontSize || "18", 10) : 16),
        textColor: text ? (text.style.color || "") : (headerText ? (headerText.style.color || "") : ""),
        bold: text ? text.style.fontWeight === "700" : (headerText ? headerText.style.fontWeight === "700" : false),
        italic: text ? text.style.fontStyle === "italic" : (headerText ? headerText.style.fontStyle === "italic" : false),
        strike: text ? (text.style.textDecoration || "none").includes("line-through") : (headerText ? (headerText.style.textDecoration || "none").includes("line-through") : false),
        underline: text ? (text.style.textDecoration || "none").includes("underline") : (headerText ? (headerText.style.textDecoration || "none").includes("underline") : false),
        wrap: text ? (text.style.whiteSpace || "pre-wrap") !== "nowrap" : (headerText ? (headerText.style.whiteSpace || "nowrap") !== "nowrap" : true),
        numberGrouping: text ? getNumberGroupingEnabled(text) : (headerText ? getNumberGroupingEnabled(headerText) : true),
        hAlign: text ? (text.dataset.halign || "left") : "left",
        vAlign: text ? (text.dataset.valign || "top") : "top"
      }
    };
  }
  if (selectedWindow) {
    return {
      type: "window",
      data: {
        width: selectedWindow.offsetWidth,
        height: selectedWindow.offsetHeight
      }
    };
  }
  return null;
}

function copyCurrentStyle() {
  const snap = snapshotStyleForSelection();
  if (!snap) return false;
  styleClipboard = snap;
  return true;
}

function setCurrentStyleAsDefault() {
  const snap = snapshotStyleForSelection();
  if (!snap) return false;
  defaultStyles[snap.type] = cloneStyleData(snap.data) || {};
  saveDefaultStyles();
  return true;
}

function clampPanelIntoViewport() {
  if (!formatPanel || !toolbarEl) return;
  const tb = toolbarEl.getBoundingClientRect();
  const minTop = Math.round(tb.bottom + 6);
  const maxLeft = Math.max(8, window.innerWidth - formatPanel.offsetWidth - 8);
  const maxTop = Math.max(minTop, window.innerHeight - formatPanel.offsetHeight - 8);
  const left = clamp(parseFloat(formatPanel.style.left || "0"), 8, maxLeft);
  const top = clamp(parseFloat(formatPanel.style.top || `${minTop}`), minTop, maxTop);
  formatPanel.style.left = `${left}px`;
  formatPanel.style.top = `${top}px`;
  formatPanel.style.right = "auto";
}

function savePanelState() {
  if (!formatPanel) return;
  const st = {
    left: formatPanel.style.left || "",
    top: formatPanel.style.top || "",
    width: formatPanel.style.width || "",
    height: formatPanel.style.height || "",
    collapsed: formatPanel.classList.contains("is-collapsed")
  };
  localStorage.setItem(PANEL_KEY, JSON.stringify(st));
}

function initFormatPanelWindow() {
  if (!formatPanel || !toolbarEl) return;
  const stRaw = localStorage.getItem(PANEL_KEY);
  if (stRaw) {
    try {
      const st = JSON.parse(stRaw);
      if (st.left) formatPanel.style.left = st.left;
      if (st.top) formatPanel.style.top = st.top;
      if (st.width) formatPanel.style.width = st.width;
      if (st.height) formatPanel.style.height = st.height;
      formatPanel.classList.toggle("is-collapsed", Boolean(st.collapsed));
      if (fpCollapseBtn) fpCollapseBtn.textContent = st.collapsed ? "⌄" : "⌃";
      formatPanel.style.right = "auto";
    } catch {}
  }
  clampPanelIntoViewport();
  const header = formatPanel.querySelector(".fp-header");
  const resizeSpecs = [
    { cls: "top", mode: "n" },
    { cls: "right", mode: "e" },
    { cls: "bottom", mode: "s" },
    { cls: "corner", mode: "se" }
  ];
  resizeSpecs.forEach((spec) => {
    let handle = formatPanel.querySelector(`.fp-resize-handle.${spec.cls}`);
    if (!handle) {
      handle = document.createElement("div");
      handle.className = `fp-resize-handle ${spec.cls}`;
      handle.setAttribute("aria-hidden", "true");
      formatPanel.appendChild(handle);
    }
    let resize = null;
    handle.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      resize = {
        x: e.clientX,
        y: e.clientY,
        left: parseFloat(formatPanel.style.left || "0"),
        top: parseFloat(formatPanel.style.top || "0"),
        width: formatPanel.offsetWidth,
        height: formatPanel.offsetHeight
      };
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", (e) => {
      if (!resize || (e.buttons & 1) !== 1) return;
      const scale = 1 / FORMAT_PANEL_SCALE;
      const screenDx = e.clientX - resize.x;
      const screenDy = e.clientY - resize.y;
      const dx = screenDx * scale;
      const dy = screenDy * scale;
      const minTop = Math.round(toolbarEl.getBoundingClientRect().bottom + 6);
      const minWidth = 420;
      const minHeight = 1;
      let nextLeft = resize.left;
      let nextTop = resize.top;
      let nextWidth = resize.width;
      let nextHeight = resize.height;
      if (spec.mode.includes("e")) {
        nextWidth = Math.max(minWidth, resize.width + dx);
        nextLeft = resize.left - ((nextWidth - resize.width) / 2);
      }
      if (spec.mode.includes("s")) nextHeight = Math.max(minHeight, resize.height + dy);
      if (spec.mode.includes("n")) {
        nextHeight = Math.max(minHeight, resize.height - dy);
        nextTop = resize.top + ((resize.height - nextHeight) / 2);
      }
      formatPanel.style.left = `${nextLeft}px`;
      formatPanel.style.top = `${Math.max(minTop, nextTop)}px`;
      formatPanel.style.width = `${nextWidth}px`;
      formatPanel.style.height = `${nextHeight}px`;
      formatPanel.style.right = "auto";
      clampPanelIntoViewport();
    });
    const stopResize = (e) => {
      if (!resize) return;
      resize = null;
      if (e.pointerId != null) handle.releasePointerCapture(e.pointerId);
      savePanelState();
    };
    handle.addEventListener("pointerup", stopResize);
    handle.addEventListener("pointercancel", stopResize);
  });
  if (header) {
    let drag = null;
    header.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      drag = {
        x: e.clientX,
        y: e.clientY,
        left: parseFloat(formatPanel.style.left || "0"),
        top: parseFloat(formatPanel.style.top || "0")
      };
      header.setPointerCapture(e.pointerId);
    });
    header.addEventListener("pointermove", (e) => {
      if (!drag || (e.buttons & 1) !== 1) return;
      formatPanel.style.left = `${drag.left + (e.clientX - drag.x)}px`;
      formatPanel.style.top = `${drag.top + (e.clientY - drag.y)}px`;
      formatPanel.style.right = "auto";
      clampPanelIntoViewport();
    });
    const stop = (e) => {
      if (!drag) return;
      drag = null;
      if (e.pointerId != null) header.releasePointerCapture(e.pointerId);
      savePanelState();
    };
    header.addEventListener("pointerup", stop);
    header.addEventListener("pointercancel", stop);
  }
  const ro = new ResizeObserver(() => {
    clampPanelIntoViewport();
    savePanelState();
  });
  ro.observe(formatPanel);
  window.addEventListener("resize", () => {
    clampPanelIntoViewport();
    savePanelState();
  });
}

function insertLineBreakAtCursor() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const br = document.createElement("br");
  range.insertNode(br);
  range.setStartAfter(br);
  range.setEndAfter(br);
  sel.removeAllRanges();
  sel.addRange(range);
}

function placeCaretAtEnd(el) {
  if (!el) return;
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

function isPrintableKeyEvent(e) {
  return typeof e.key === "string" && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey;
}

function setAlignButtons(h, v) {
  [fpAlignLeft, fpAlignCenter, fpAlignRight, fpVTop, fpVMiddle, fpVBottom].forEach((b) => { if (b) b.classList.remove("active"); });
  if (h === "left" && fpAlignLeft) fpAlignLeft.classList.add("active");
  if (h === "center" && fpAlignCenter) fpAlignCenter.classList.add("active");
  if (h === "right" && fpAlignRight) fpAlignRight.classList.add("active");
  if (v === "top" && fpVTop) fpVTop.classList.add("active");
  if (v === "middle" && fpVMiddle) fpVMiddle.classList.add("active");
  if (v === "bottom" && fpVBottom) fpVBottom.classList.add("active");
}

function setArrowShapeButtons(container, value) {
  if (!container) return;
  container.querySelectorAll(".fp-arrow-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.shape === value);
  });
}

function getArrowShapeButtonsValue(container) {
  if (!container) return "classic";
  const active = container.querySelector(".fp-arrow-option.active");
  return (active && active.dataset.shape) || "classic";
}

function getSelectionMode() {
  if (selectedConnector) return "connector";
  if (selectedWindow) return "window";
  if (selectedShape) return "shape";
  return "none";
}

function setControlVisibilityByMode(mode) {
  const connectorOnlyControls = document.querySelectorAll(".fp-connector-only");
  const shapeOnlyControls = document.querySelectorAll(".fp-shape-only");
  const tableOnlyControls = document.querySelectorAll(".fp-table-only");
  const showConnector = mode === "connector";
  const showShapeOnly = mode === "shape";
  const showTableOnly = showShapeOnly && selectedShape && selectedShape.dataset && selectedShape.dataset.shapeType === "shape-table";
  connectorOnlyControls.forEach((el) => el.classList.toggle("hidden", !showConnector));
  shapeOnlyControls.forEach((el) => el.classList.toggle("hidden", !showShapeOnly));
  tableOnlyControls.forEach((el) => el.classList.toggle("hidden", !showTableOnly));
}

function applyTextAlign(text, h, v) {
  const mapH = { left: "flex-start", center: "center", right: "flex-end" };
  const mapV = { top: "flex-start", middle: "center", bottom: "flex-end" };
  text.style.justifyContent = mapH[h] || "flex-start";
  text.style.alignItems = mapV[v] || "flex-start";
  text.dataset.halign = h || "left";
  text.dataset.valign = v || "top";
}

function applyTableTitleAlign(titleBar, titleText, h, v) {
  if (!titleBar || !titleText) return;
  const mapV = { top: "flex-start", middle: "center", bottom: "flex-end" };
  titleBar.style.alignItems = mapV[v] || "center";
  titleText.style.flex = "1 1 auto";
  titleText.style.minWidth = "0";
  titleText.style.textAlign = h || "left";
  titleText.dataset.halign = h || "left";
  titleText.dataset.valign = v || "top";
}

function applyTransformState(node) {
  const rotate = Number(node.dataset.rotate || 0);
  const flipX = node.dataset.flipX === "1" ? -1 : 1;
  const flipY = node.dataset.flipY === "1" ? -1 : 1;
  const parts = [`rotate(${rotate}deg)`];
  if (flipX === -1) parts.push("scaleX(-1)");
  if (flipY === -1) parts.push("scaleY(-1)");
  node.style.transform = parts.join(" ");
}

function rotateSelection(delta) {
  const target = selectedShape || selectedWindow;
  if (!target || !selectedShape) return false;
  const current = Number(target.dataset.rotate || 0);
  target.dataset.rotate = String((current + delta) % 360);
  applyTransformState(target);
  saveLayout();
  return true;
}

function flipSelection(axis) {
  const target = selectedShape || selectedWindow;
  if (!target || !selectedShape) return false;
  if (axis === "x") target.dataset.flipX = target.dataset.flipX === "1" ? "0" : "1";
  if (axis === "y") target.dataset.flipY = target.dataset.flipY === "1" ? "0" : "1";
  applyTransformState(target);
  saveLayout();
  return true;
}

function snapSelectionToGrid(step = 24) {
  const target = selectedShape || selectedWindow;
  if (!target) return false;
  const left = Math.round((Number(target.style.left || target.offsetLeft || 0)) / step) * step;
  const top = Math.round((Number(target.style.top || target.offsetTop || 0)) / step) * step;
  target.style.left = `${Math.max(0, left)}px`;
  target.style.top = `${Math.max(0, top)}px`;
  if (selectedShape) layoutConnectorPoints(selectedShape);
  if (selectedWindow) layoutConnectorPoints(selectedWindow);
  renderConnectors();
  saveLayout();
  return true;
}

function showFeatureHint(label) {
  showHint(`${label} пока доступно только в полном многовыборе.`, "warning", 2500);
}

function startInlineShapeEditing(node, initialText = "") {
  if (!node) return false;
  const text = node.querySelector(".shape-text");
  if (!text) return false;
  selectShape(node);
  text.dataset.editingBackup = text.dataset.rawText || text.innerText || "";
  text.contentEditable = "true";
  text.textContent = initialText;
  text.focus();
  placeCaretAtEnd(text);
  return true;
}

function toggleFormatPanelCollapsed() {
  if (!formatPanel) return;
  const next = !formatPanel.classList.contains("is-collapsed");
  formatPanel.classList.toggle("is-collapsed", next);
  if (fpCollapseBtn) fpCollapseBtn.textContent = next ? "⌄" : "⌃";
  clampPanelIntoViewport();
  savePanelState();
}

function showHint(text, type = "warning", timeoutMs = 5000) {
  freeModeHint.textContent = text;
  freeModeHint.classList.remove("hidden", "error", "warning");
  freeModeHint.classList.add(type);
  if (hintTimer) clearTimeout(hintTimer);
  hintTimer = setTimeout(() => freeModeHint.classList.add("hidden"), timeoutMs);
}

function openAddModal() { modal.classList.remove("hidden"); modalSheetUrl.value = ""; modalSheetUrl.focus(); }
function closeAddModal() { modal.classList.add("hidden"); }

async function resolveDocumentTitle(url) {
  try {
    const res = await fetch(`/api/title?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.title ? String(data.title).trim() : null;
  } catch { return null; }
}

function attachDrag(node, handle, opts = {}) {
  const raiseOnDrag = opts.raiseOnDrag !== false;
  let drag = null;
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    if (event.target.closest(".shape-text[contenteditable='true']") || event.target.isContentEditable) return;
    if (event.target.closest(".table-add-col") || event.target.closest(".table-add-row")) return;
    if (event.target.closest(".table-cell-toolbar")) return;
    if (event.target.closest(".h") || event.target.closest(".shape-line-handle") || event.target.closest(".resize-handle")) return;
    drag = { x: event.clientX, y: event.clientY, l: node.offsetLeft, t: node.offsetTop };
    if (raiseOnDrag) bringToFront(node);
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!drag) return;
    node.style.left = `${Math.max(0, drag.l + (event.clientX - drag.x) / zoom)}px`;
    node.style.top = `${Math.max(0, drag.t + (event.clientY - drag.y) / zoom)}px`;
    syncFormatPanel();
    renderConnectors();
  });
  const stop = (event) => {
    if (!drag) return;
    drag = null;
    if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
    saveLayout();
  };
  handle.addEventListener("pointerup", stop);
  handle.addEventListener("pointercancel", stop);
}

function attachResize(node, handle, minW, minH, opts = {}) {
  const raiseOnResize = opts.raiseOnResize !== false;
  let state = null;
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    state = { x: event.clientX, y: event.clientY, w: node.offsetWidth, h: node.offsetHeight };
    if (raiseOnResize) bringToFront(node);
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  handle.addEventListener("pointermove", (event) => {
    if (!state || (event.buttons & 1) !== 1) return;
    node.style.width = `${Math.max(minW, state.w + (event.clientX - state.x) / zoom)}px`;
    node.style.height = `${Math.max(minH, state.h + (event.clientY - state.y) / zoom)}px`;
    syncFormatPanel();
    layoutConnectorPoints(node);
    renderConnectors();
  });
  const stop = (event) => {
    if (!state) return;
    const startState = state;
    state = null;
    if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
    if (node.dataset.shapeType === "shape-table") {
      if (node.__tableApi && node.__tableApi.scaleToShape) node.__tableApi.scaleToShape(startState.w, startState.h);
      node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || parseFloat(node.style.width || "0") || 0));
      node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || parseFloat(node.style.height || "0") || 0));
    }
    saveLayout();
  };
  handle.addEventListener("pointerup", stop);
  handle.addEventListener("pointercancel", stop);
}

function createSheetWindow(url, opts = {}, doSave = true) {
  const node = template.content.firstElementChild.cloneNode(true);
  const frame = node.querySelector(".sheet-frame");
  const title = node.querySelector(".window-title");
  const header = node.querySelector(".window-header");
  const resizeHandle = node.querySelector(".resize-handle");

  const index = windowCounter;
  node.dataset.connId = opts.connId || `window-${index}`;
  node.style.left = opts.left || `${40 + (index % 6) * 30}px`;
  node.style.top = opts.top || `${40 + (index % 6) * 24}px`;
  node.style.width = opts.width || "640px";
  node.style.height = opts.height || "420px";
  node.style.zIndex = String(opts.zIndex || ++zCounter);

  function updateWindowTitle() {
    const base = (node.dataset.docTitle || "").trim() || (opts.title || `Таблица ${index}`);
    const extra = (node.dataset.customTitle || "").trim();
    title.textContent = extra ? `${base} — ${extra}` : base;
  }

  const rawUrl = repairPossiblyBrokenSheetUrl(url);
  frame.src = rawUrl;
  node.dataset.docTitle = (opts.docTitle || opts.title || "").trim();
  node.dataset.customTitle = (opts.customTitle || "").trim();
  updateWindowTitle();

  node.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".window-actions")) return;
    clearAllTableCellSelections();
    clearSelectedShape();
    clearSelectedConnector();
    clearSelectedWindow();
    selectedWindow = node;
    node.classList.add("selected-window");
    if (formatToggle.checked) {
      formatPanel.classList.remove("hidden");
      clampPanelIntoViewport();
      syncFormatPanel();
    }
  });
  const actions = node.querySelector(".window-actions");
  actions.addEventListener("pointerdown", (e) => e.stopPropagation());
  actions.addEventListener("click", (e) => e.stopPropagation());

  node.querySelector(".open").addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(rawUrl, "_blank", "noopener,noreferrer");
  });
  node.querySelector(".close").addEventListener("click", (e) => {
    e.stopPropagation();
    const connId = node.dataset.connId || "";
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (fromId === connId || toId === connId) connectors.splice(i, 1);
    }
    node.remove();
    setViewportScrollLock(false);
    renderConnectors();
    saveLayout();
  });
  node.querySelector(".refresh").addEventListener("click", (e) => {
    e.stopPropagation();
    frame.src = frame.src;
  });
  frame.addEventListener("mouseenter", () => setViewportScrollLock(true));
  frame.addEventListener("mouseleave", () => setViewportScrollLock(false));

  attachDrag(node, header, { raiseOnDrag: false });
  attachResize(node, resizeHandle, 360, 240, { raiseOnResize: false });
  attachConnectorPoints(node);
  header.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    const current = node.dataset.customTitle || "";
    const next = window.prompt("Дополнительное название окна:", current);
    if (next === null) return;
    node.dataset.customTitle = String(next).trim();
    updateWindowTitle();
    saveLayout();
  });
  desktop.appendChild(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  windowCounter += 1;

  resolveDocumentTitle(rawUrl).then((docTitle) => {
    if (docTitle) {
      node.dataset.docTitle = docTitle;
      updateWindowTitle();
      saveLayout();
    }
  });
  if (doSave) saveLayout();
}

function addShapeHandles(node, isLine = false, opts = {}) {
  if (isLine) return;
  const disableResize = Boolean(opts.disableResize);
  const box = document.createElement("div");
  box.className = "shape-handles";
  ["nw","n","ne","e","se","s","sw","w"].forEach((d) => {
    const h = document.createElement("div");
    h.className = `h ${d}`;
    h.dataset.dir = d;
    box.appendChild(h);
  });
  node.appendChild(box);
  box.querySelectorAll(".h").forEach((h) => {
    let rs = null;
    if (disableResize) return;
    h.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      rs = { x: e.clientX, y: e.clientY, l: node.offsetLeft, t: node.offsetTop, w: node.offsetWidth, h: node.offsetHeight, dir: h.dataset.dir };
      h.setPointerCapture(e.pointerId);
    });
    h.addEventListener("pointermove", (e) => {
      if (!rs || (e.buttons & 1) !== 1) return;
      const dx = (e.clientX - rs.x) / zoom;
      const dy = (e.clientY - rs.y) / zoom;
      let l = rs.l, t = rs.t, w = rs.w, hh = rs.h;
      if (rs.dir.includes("e")) w = rs.w + dx;
      if (rs.dir.includes("s")) hh = rs.h + dy;
      if (rs.dir.includes("w")) { w = rs.w - dx; l = rs.l + dx; }
      if (rs.dir.includes("n")) { hh = rs.h - dy; t = rs.t + dy; }
      w = Math.max(40, w); hh = Math.max(20, hh);
      node.style.left = `${Math.max(0, l)}px`;
      node.style.top = `${Math.max(0, t)}px`;
      node.style.width = `${w}px`;
      node.style.height = `${hh}px`;
      syncFormatPanel();
    });
    const stop = (e) => {
      if (!rs) return;
      rs = null;
      if (e.pointerId != null) h.releasePointerCapture(e.pointerId);
      if (node.dataset.shapeType === "shape-table") {
        node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || parseFloat(node.style.width || "0") || 0));
        node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || parseFloat(node.style.height || "0") || 0));
      }
      saveLayout();
    };
    h.addEventListener("pointerup", stop);
    h.addEventListener("pointercancel", stop);
  });
}

function selectShape(node) {
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedWindow();
  clearSelectedConnector();
  selectedShape = node;
  if (selectedShape && selectedShape.dataset && selectedShape.dataset.shapeType === "shape-table") {
    selectedShape.__tableSelectionScope = "shape";
  }
  node.classList.add("selected");
  if (formatToggle.checked) formatPanel.classList.remove("hidden");
  syncFormatPanel();
}

function clearSelectedShape() {
  if (selectedShape) selectedShape.classList.remove("selected");
  selectedShape = null;
}

function clearSelectedWindow() {
  if (selectedWindow) selectedWindow.classList.remove("selected-window");
  selectedWindow = null;
}

function clearSelectedConnector() {
  selectedConnector = null;
  renderConnectors();
}
function clearAllTableCellSelections(exceptNode = null) {
  desktop.querySelectorAll(".shape.shape-table").forEach((node) => {
    if (exceptNode && node === exceptNode) return;
    const fn = node.__clearTableSelection;
    if (typeof fn === "function") fn();
  });
}

function clearSelection() {
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedWindow();
  clearSelectedConnector();
  formatPanel.classList.add("hidden");
}

function snapshotLayout() {
  return JSON.stringify(getCurrentLayout());
}

function updateHistoryButtons() {
  if (undoBtn) undoBtn.disabled = undoStack.length < 2;
  if (redoBtn) redoBtn.disabled = redoStack.length === 0;
}

function pushHistorySnapshot() {
  if (historyLock) return;
  const snap = snapshotLayout();
  if (undoStack[undoStack.length - 1] === snap) return;
  undoStack.push(snap);
  if (undoStack.length > 150) undoStack.shift();
  redoStack.length = 0;
  updateHistoryButtons();
}

function applySnapshot(snapshot) {
  if (!snapshot) return;
  historyLock = true;
  try {
    const data = JSON.parse(snapshot);
    applyLayout(data);
    clearSelection();
  } catch {}
  historyLock = false;
}

function undoAction() {
  if (undoStack.length < 2) return;
  const current = undoStack.pop();
  if (current) redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  applySnapshot(prev);
  saveLayout({ recordHistory: false });
  updateHistoryButtons();
}

function redoAction() {
  if (!redoStack.length) return;
  const next = redoStack.pop();
  if (!next) return;
  undoStack.push(next);
  applySnapshot(next);
  saveLayout({ recordHistory: false });
  updateHistoryButtons();
}

function deleteSelected() {
  let changed = false;
  if (selectedConnector) {
    const idx = connectors.findIndex((c) => c.id === selectedConnector);
    if (idx >= 0) {
      connectors.splice(idx, 1);
      changed = true;
    }
  } else if (selectedShape) {
    const shapeId = selectedShape.dataset.shapeId;
    const connId = selectedShape.dataset.connId;
    selectedShape.remove();
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (fromId === connId || toId === connId || c.from?.shapeId === shapeId || c.to?.shapeId === shapeId) connectors.splice(i, 1);
    }
    changed = true;
  }
  if (!changed) return;
  clearSelection();
  renderConnectors();
  saveLayout();
}

function createShapeBase(type, opts = {}) {
  const node = document.createElement("div");
  node.className = `shape ${type}`;
  node.dataset.shapeType = type;
  node.dataset.shapeId = opts.id || `shape-${shapeCounter++}`;
  node.dataset.connId = opts.connId || node.dataset.shapeId;
  node.dataset.borderWidth = String(Math.max(0, Number(opts.borderWidth ?? 1) || 0));
  node.dataset.borderEnabled = opts.borderEnabled === false ? "0" : "1";
  const defaultWidth = opts.width || (type === "shape-note" ? "260px" : type === "shape-line" ? "180px" : "220px");
  const defaultHeight = opts.height || (type === "shape-line" ? "2px" : type === "shape-note" ? "150px" : "120px");
  node.style.width = defaultWidth;
  node.style.height = defaultHeight;

  const hasManualPos = Boolean(opts.left || opts.top);
  let autoLeft = 140 + (shapeSpawnStep % 12) * 22;
  let autoTop = 140 + (shapeSpawnStep % 12) * 18;

  // New shapes spawn in the currently visible viewport with a slight cascade offset.
  if (!hasManualPos) {
    const vr = viewportEl.getBoundingClientRect();
    const center = getDesktopPoint(vr.left + vr.width / 2, vr.top + vr.height / 2);
    const w = Number.parseFloat(defaultWidth) || 220;
    const h = Number.parseFloat(defaultHeight) || 120;
    autoLeft = Math.max(0, center.x - w / 2 + (shapeSpawnStep % 10) * 18);
    autoTop = Math.max(0, center.y - h / 2 + (shapeSpawnStep % 10) * 14);
  }
  node.style.left = opts.left || `${autoLeft}px`;
  node.style.top = opts.top || `${autoTop}px`;
  node.style.zIndex = String(opts.zIndex || ++zCounter);
  node.style.opacity = opts.opacity || "1";
  if (opts.shadow != null) applyNodeShadow(node, opts.shadow);
  if (opts.angle != null) node.dataset.rotate = String(Number(opts.angle) || 0);
  if (opts.flipX != null) node.dataset.flipX = Number(opts.flipX) ? "1" : "0";
  if (opts.flipY != null) node.dataset.flipY = Number(opts.flipY) ? "1" : "0";
  if (opts.angle != null || opts.flipX != null || opts.flipY != null) applyTransformState(node);

  node.addEventListener("pointerdown", (e) => { e.stopPropagation(); bringToFront(node); selectShape(node); });
  attachDrag(node, node);
  if (!hasManualPos) shapeSpawnStep += 1;
  return node;
}

function ensureConnectorLayer() {
  let layer = desktop.querySelector("#connLayer");
  if (layer) return layer;
  layer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  layer.setAttribute("id", "connLayer");
  layer.setAttribute("class", "conn-layer");
  layer.innerHTML = "<defs></defs>";
  desktop.appendChild(layer);
  updateConnectorLayerSize();
  return layer;
}

function updateConnectorLayerSize() {
  const layer = desktop.querySelector("#connLayer");
  if (!layer) return;
  const w = desktop.scrollWidth || desktop.clientWidth;
  const h = desktop.scrollHeight || desktop.clientHeight;
  layer.setAttribute("width", String(w));
  layer.setAttribute("height", String(h));
  layer.setAttribute("viewBox", `0 0 ${w} ${h}`);
}

function getShapeById(id) { return desktop.querySelector(`.shape[data-shape-id="${id}"]`); }
function getConnectableById(id) { return desktop.querySelector(`[data-conn-id="${id}"]`); }

function getAnchorPos(shape, anchor) {
  const x = shape.offsetLeft;
  const y = shape.offsetTop;
  const w = shape.offsetWidth;
  const h = shape.offsetHeight;
  const map = {
    n: [x + w / 2, y],
    ne: [x + w, y],
    e: [x + w, y + h / 2],
    se: [x + w, y + h],
    s: [x + w / 2, y + h],
    sw: [x, y + h],
    w: [x, y + h / 2],
    nw: [x, y],
    c: [x + w / 2, y + h / 2]
  };
  const p = map[anchor] || map.c;
  return { x: p[0], y: p[1] };
}

function getNearestAnchorTarget(x, y, skipShapeId = "") {
  const threshold = 24;
  let best = null;
  desktop.querySelectorAll(".shape, .sheet-window").forEach((shape) => {
    if (shape.classList.contains("shape") && shape.dataset.shapeType === "shape-line") return;
    const nid = shape.dataset.connId || "";
    if (skipShapeId && nid === skipShapeId) return;
    ["n", "ne", "e", "se", "s", "sw", "w", "nw", "c"].forEach((anchor) => {
      const p = getAnchorPos(shape, anchor);
      const dx = p.x - x;
      const dy = p.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d <= threshold && (!best || d < best.d)) {
        best = { d, nodeId: nid, anchor, x: p.x, y: p.y };
      }
    });
  });
  return best;
}

function getDesktopPoint(clientX, clientY) {
  const dr = desktop.getBoundingClientRect();
  return {
    x: (clientX - dr.left) / zoom,
    y: (clientY - dr.top) / zoom
  };
}

function snapToShapeAnchor(x, y, skipShapeId = "") {
  const best = getNearestAnchorTarget(x, y, skipShapeId);
  return best ? { x: best.x, y: best.y } : { x, y };
}

function getConnectorPoint(end) {
  if (!end) return { x: 0, y: 0 };
  if (end.nodeId) {
    const node = getConnectableById(end.nodeId);
    if (node) {
      if ((end.anchor || "c") === "edge") {
        return {
          x: node.offsetLeft + node.offsetWidth * clamp(Number(end.rx) || 0, 0, 1),
          y: node.offsetTop + node.offsetHeight * clamp(Number(end.ry) || 0, 0, 1)
        };
      }
      return getAnchorPos(node, end.anchor || "c");
    }
  }
  if (end.shapeId) {
    const shape = getShapeById(end.shapeId);
    if (shape) return getAnchorPos(shape, end.anchor || "c");
  }
  return { x: Number(end.x) || 0, y: Number(end.y) || 0 };
}

function getConnectableFromEnd(end) {
  if (!end) return null;
  if (end.nodeId) return getConnectableById(end.nodeId);
  if (end.shapeId) return getShapeById(end.shapeId);
  return null;
}

function getOffsetPointFromShapeCenter(node, otherPoint, offsetPx = 5) {
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  const cx = left + w / 2;
  const cy = top + h / 2;
  let dx = otherPoint.x - cx;
  let dy = otherPoint.y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  dx /= len; dy /= len;
  const tx = dx === 0 ? Infinity : (w / 2) / Math.abs(dx);
  const ty = dy === 0 ? Infinity : (h / 2) / Math.abs(dy);
  const t = Math.min(tx, ty);
  const edgeX = cx + dx * t;
  const edgeY = cy + dy * t;
  return { x: edgeX + dx * offsetPx, y: edgeY + dy * offsetPx };
}

function getOffsetPointFromEdge(edgePoint, otherPoint, gapPx = 5) {
  const g = Math.max(0, Number(gapPx) || 0);
  const vx = (otherPoint.x - edgePoint.x);
  const vy = (otherPoint.y - edgePoint.y);
  const len = Math.sqrt(vx * vx + vy * vy) || 1;
  return { x: edgePoint.x + (vx / len) * g, y: edgePoint.y + (vy / len) * g };
}

function getEdgeAnchorData(node, x, y) {
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  const nx = clamp(x, left, left + w);
  const ny = clamp(y, top, top + h);
  const rx = w ? (nx - left) / w : 0.5;
  const ry = h ? (ny - top) / h : 0.5;
  return { rx: clamp(rx, 0, 1), ry: clamp(ry, 0, 1) };
}

function getDropAnchorForShape(node, x, y) {
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  const nx = clamp(x, left, left + w);
  const ny = clamp(y, top, top + h);
  const dLeft = Math.abs(nx - left);
  const dRight = Math.abs(left + w - nx);
  const dTop = Math.abs(ny - top);
  const dBottom = Math.abs(top + h - ny);
  const borderDist = Math.min(dLeft, dRight, dTop, dBottom);
  if (borderDist <= 14) {
    const edge = getEdgeAnchorData(node, x, y);
    return { anchor: "edge", rx: edge.rx, ry: edge.ry };
  }
  return { anchor: "c" };
}

function markerPathForShape(shape) {
  if (shape === "triangle") return "M0,1 L10,5 L0,9 z";
  if (shape === "open") return "M0,1 L10,5 L0,9";
  if (shape === "block") return "M0,1 H6 L10,5 L6,9 H0 Z";
  return "M0,0 L10,5 L0,10 z";
}

function layoutConnectorPoints(node) {
  const box = node.querySelector(".conn-points");
  if (!box) return;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  const pts = {
    n: [w / 2, 0], ne: [w, 0], e: [w, h / 2], se: [w, h],
    s: [w / 2, h], sw: [0, h], w: [0, h / 2], nw: [0, 0]
  };
  box.querySelectorAll(".conn-point").forEach((p) => {
    const v = pts[p.dataset.anchor];
    if (!v) return;
    p.style.left = `${v[0]}px`;
    p.style.top = `${v[1]}px`;
  });
  const arrows = {
    n: [w / 2, -22, "↑"],
    e: [w + 22, h / 2, "→"],
    s: [w / 2, h + 22, "↓"],
    w: [-22, h / 2, "←"]
  };
  box.querySelectorAll(".conn-arrow").forEach((a) => {
    const v = arrows[a.dataset.anchor];
    if (!v) return;
    a.style.left = `${v[0]}px`;
    a.style.top = `${v[1]}px`;
    a.textContent = v[2];
  });
}

function startConnectorFromPoint(shape, anchor, event) {
  event.preventDefault();
  event.stopPropagation();
  const fromArrow = event.currentTarget && event.currentTarget.classList && event.currentTarget.classList.contains("conn-arrow");
  const fromAnchor = fromArrow ? "c" : anchor;
  const p = getAnchorPos(shape, fromAnchor);
  const cursor = getDesktopPoint(event.clientX, event.clientY);
  connectorDraft = { fromNodeId: shape.dataset.connId, fromAnchor, fromDir: anchor, x2: cursor.x, y2: cursor.y };
  if (!connectorDragOverlay) {
    connectorDragOverlay = document.createElement("div");
    connectorDragOverlay.style.position = "fixed";
    connectorDragOverlay.style.inset = "0";
    connectorDragOverlay.style.zIndex = "9998";
    connectorDragOverlay.style.cursor = "crosshair";
    connectorDragOverlay.style.background = "transparent";
    connectorDragOverlay.style.display = "none";
    document.body.appendChild(connectorDragOverlay);
  }
  connectorDragOverlay.style.display = "block";
  renderConnectors();
}

function attachConnectorPoints(shape) {
  const box = document.createElement("div");
  box.className = "conn-points";
  ["n", "ne", "e", "se", "s", "sw", "w", "nw"].forEach((a) => {
    const p = document.createElement("div");
    p.className = "conn-point";
    p.dataset.anchor = a;
    p.addEventListener("pointerdown", (e) => startConnectorFromPoint(shape, a, e));
    box.appendChild(p);
  });
  ["n", "e", "s", "w"].forEach((a) => {
    const ar = document.createElement("div");
    ar.className = "conn-arrow";
    ar.dataset.anchor = a;
    ar.addEventListener("pointerdown", (e) => startConnectorFromPoint(shape, a, e));
    box.appendChild(ar);
  });
  shape.appendChild(box);
  layoutConnectorPoints(shape);
}

function renderConnectors() {
  updateDesktopExtent();
  const layer = ensureConnectorLayer();
  updateConnectorLayerSize();
  const defs = layer.querySelector("defs");
  if (defs) defs.innerHTML = "";
  layer.querySelectorAll("circle.conn-handle").forEach((n) => n.remove());
  layer.querySelectorAll("line.conn-line").forEach((n) => n.remove());
  connectors.forEach((c) => {
    const p1Raw = getConnectorPoint(c.from);
    const p2Raw = getConnectorPoint(c.to);
    let p1 = p1Raw;
    let p2 = p2Raw;
    const gapStart = Number(c.gapStart ?? c.gap ?? 30);
    const gapEnd = Number(c.gapEnd ?? c.gap ?? 30);
    const fromAnchor = c.from?.anchor || "c";
    const toAnchor = c.to?.anchor || "c";
    const fromNode = getConnectableFromEnd(c.from);
    const toNode = getConnectableFromEnd(c.to);

    if (fromNode) {
      if (fromAnchor === "c") p1 = getOffsetPointFromShapeCenter(fromNode, p2Raw, gapStart);
      else p1 = getOffsetPointFromEdge(p1Raw, p2Raw, gapStart);
    }
    if (toNode) {
      if (toAnchor === "c") p2 = getOffsetPointFromShapeCenter(toNode, p1Raw, gapEnd);
      else p2 = getOffsetPointFromEdge(p2Raw, p1Raw, gapEnd);
    }
    const color = c.color || "#1f2937";
    const width = Math.max(1, Number(c.width) || 2);
    const startMarkerId = `conn-start-${c.id}`;
    const endMarkerId = `conn-end-${c.id}`;
    if (defs) {
      if ((c.startArrowShape || "classic") !== "line") {
        const mStart = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        mStart.setAttribute("id", startMarkerId);
        mStart.setAttribute("markerWidth", "10");
        mStart.setAttribute("markerHeight", "10");
        mStart.setAttribute("refX", "2");
        mStart.setAttribute("refY", "5");
        mStart.setAttribute("orient", "auto-start-reverse");
        const pStart = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pStart.setAttribute("d", markerPathForShape(c.startArrowShape || "classic"));
        pStart.setAttribute("fill", color);
        pStart.setAttribute("stroke", color);
        pStart.setAttribute("stroke-width", "1.5");
        if ((c.startArrowShape || "classic") === "open") pStart.setAttribute("fill", "none");
        mStart.appendChild(pStart);
        defs.appendChild(mStart);
      }
      if ((c.endArrowShape || "classic") !== "line") {
        const mEnd = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        mEnd.setAttribute("id", endMarkerId);
        mEnd.setAttribute("markerWidth", "10");
        mEnd.setAttribute("markerHeight", "10");
        mEnd.setAttribute("refX", "8");
        mEnd.setAttribute("refY", "5");
        mEnd.setAttribute("orient", "auto");
        const pEnd = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pEnd.setAttribute("d", markerPathForShape(c.endArrowShape || "classic"));
        pEnd.setAttribute("fill", color);
        pEnd.setAttribute("stroke", color);
        pEnd.setAttribute("stroke-width", "1.5");
        if ((c.endArrowShape || "classic") === "open") pEnd.setAttribute("fill", "none");
        mEnd.appendChild(pEnd);
        defs.appendChild(mEnd);
      }
    }
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `conn-line${selectedConnector === c.id ? " selected" : ""}`);
    line.dataset.connectorId = c.id;
    line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", String(width));
    line.setAttribute("stroke-dasharray", c.lineStyle === "dashed" ? "8 6" : "0");
    line.setAttribute("marker-start", (c.startArrowShape || "classic") !== "line" ? `url(#${startMarkerId})` : "none");
    line.setAttribute("marker-end", (c.endArrowShape || "classic") !== "line" ? `url(#${endMarkerId})` : "none");
    line.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      clearSelectedShape();
      selectedConnector = c.id;
      renderConnectors();
      if (formatToggle.checked) {
        formatPanel.classList.remove("hidden");
        syncFormatPanel();
      }
    });
    layer.appendChild(line);
    if (selectedConnector === c.id) {
      ["from", "to"].forEach((side) => {
        const p = side === "from" ? p1 : p2;
        const h = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        h.setAttribute("class", "conn-handle");
        h.setAttribute("cx", String(p.x));
        h.setAttribute("cy", String(p.y));
        h.setAttribute("r", "6");
        h.dataset.connectorId = c.id;
        h.dataset.side = side;
        h.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
          const connId = h.dataset.connectorId;
          const dragSide = h.dataset.side;
          const move = (ev) => {
            const conn = connectors.find((it) => it.id === connId);
            if (!conn) return;
            const pt = getDesktopPoint(ev.clientX, ev.clientY);
            const skipId = dragSide === "from" ? ((conn.to?.nodeId || conn.to?.shapeId) || "") : ((conn.from?.nodeId || conn.from?.shapeId) || "");
            const nearest = getNearestAnchorTarget(pt.x, pt.y, skipId);
            if (nearest) {
              const node = getConnectableById(nearest.nodeId);
              if (node) {
                const edge = getEdgeAnchorData(node, pt.x, pt.y);
                conn[dragSide] = { nodeId: nearest.nodeId, anchor: "edge", rx: edge.rx, ry: edge.ry };
              }
            }
            else conn[dragSide] = { x: pt.x, y: pt.y };
            renderConnectors();
          };
          const up = () => {
            document.removeEventListener("pointermove", move);
            document.removeEventListener("pointerup", up);
            saveLayout();
          };
          document.addEventListener("pointermove", move);
          document.addEventListener("pointerup", up);
        });
        layer.appendChild(h);
      });
    }
  });
  if (connectorDraft) {
    const fromShape = getConnectableById(connectorDraft.fromNodeId || "");
    if (fromShape) {
      let p1 = getAnchorPos(fromShape, connectorDraft.fromAnchor || "c");
      if ((connectorDraft.fromAnchor || "c") === "c") {
        p1 = getOffsetPointFromShapeCenter(fromShape, { x: connectorDraft.x2, y: connectorDraft.y2 }, 20);
      }
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", "conn-line");
      line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y);
      line.setAttribute("x2", connectorDraft.x2); line.setAttribute("y2", connectorDraft.y2);
      line.setAttribute("stroke", "#1f2937");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-dasharray", "0");
      line.setAttribute("marker-start", "none");
      line.setAttribute("marker-end", "none");
      layer.appendChild(line);
    }
  }
}

function createShapeRectangle(opts = {}, doSave = true) {
  opts = applyCreationStylePreset("shape-rect", opts);
  const node = createShapeBase("shape-rect", opts);
  const text = document.createElement("div");
  text.className = "shape-text";
  text.contentEditable = "false";
  text.dataset.rawText = String(opts.text || "");
  text.dataset.numberGrouping = opts.numberGrouping != null ? (opts.numberGrouping ? "1" : "0") : "1";
  text.style.fontFamily = opts.fontFamily ? fontCssFromKey(opts.fontFamily) : FONT_STACKS.Arial;
  text.style.color = opts.textColor || "#000000";
  text.style.fontSize = (opts.fontSize || 16) + "px";
  text.style.fontWeight = opts.bold ? "700" : "400";
  applyTextAlign(text, opts.hAlign || "left", opts.vAlign || "top");
  node.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    text.textContent = text.dataset.rawText || "";
    text.contentEditable = "true";
    text.focus();
  });
  text.addEventListener("pointerdown", (e) => {
    if (text.contentEditable === "true") e.stopPropagation();
  });
  text.addEventListener("blur", () => {
    text.contentEditable = "false";
    text.dataset.editingBackup = "";
    renderShapeText(text);
    saveLayout();
  });
  text.addEventListener("keydown", (e) => {
    if (text.contentEditable !== "true") return;
    if (e.key === "Escape") {
      e.preventDefault();
      const backup = text.dataset.editingBackup || text.dataset.rawText || "";
      text.dataset.rawText = backup;
      text.textContent = backup;
      text.blur();
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      insertLineBreakAtCursor();
      text.dataset.rawText = text.innerText || "";
      saveLayout();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      text.blur();
    }
  });
  text.addEventListener("input", () => {
    text.dataset.rawText = text.innerText || "";
    saveLayout();
  });
  const rh = document.createElement("div"); rh.className = "resize-handle";
  node.appendChild(text); node.appendChild(rh);
  addShapeHandles(node, false);
  attachResize(node, rh, 80, 40);
  attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: opts.fillEnabled !== false,
    gradientEnabled: opts.gradientEnabled,
    fill1: opts.fill || opts.fillColor || "#ffffff",
    fill2: opts.fillColor2 || opts.fill2 || opts.fill || opts.fillColor || "#ffffff",
    fillDirection: opts.fillDirection || "horizontal"
  });
  node.style.borderColor = opts.border || "#111827";
  node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(0, Number(node.dataset.borderWidth) || 0)}px` : "0px";
  node.style.borderStyle = "solid";
  if (opts.radius != null) node.style.borderRadius = `${opts.radius}px`;
  renderShapeText(text);
  desktop.appendChild(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
}

function createShapeNote(opts = {}, doSave = true) {
  opts = applyCreationStylePreset("shape-note", opts);
  const node = createShapeBase("shape-note", opts);
  const text = document.createElement("div");
  text.className = "shape-text";
  text.contentEditable = "false";
  text.dataset.rawText = String(opts.text || "");
  text.dataset.numberGrouping = opts.numberGrouping != null ? (opts.numberGrouping ? "1" : "0") : "1";
  text.style.fontFamily = opts.fontFamily ? fontCssFromKey(opts.fontFamily) : FONT_STACKS.Arial;
  text.style.color = opts.textColor || "#000000";
  text.style.fontSize = (opts.fontSize || 16) + "px";
  text.style.fontWeight = opts.bold ? "700" : "400";
  applyTextAlign(text, opts.hAlign || "left", opts.vAlign || "top");
  node.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    text.textContent = text.dataset.rawText || "";
    text.contentEditable = "true";
    text.focus();
  });
  text.addEventListener("blur", () => {
    text.contentEditable = "false";
    text.dataset.editingBackup = "";
    renderShapeText(text);
    saveLayout();
  });
  text.addEventListener("keydown", (e) => {
    if (text.contentEditable !== "true") return;
    if (e.key === "Escape") {
      e.preventDefault();
      const backup = text.dataset.editingBackup || text.dataset.rawText || "";
      text.dataset.rawText = backup;
      text.textContent = backup;
      text.blur();
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      insertLineBreakAtCursor();
      text.dataset.rawText = text.innerText || "";
      saveLayout();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      text.blur();
    }
  });
  text.addEventListener("input", () => {
    text.dataset.rawText = text.innerText || "";
    saveLayout();
  });
  const rh = document.createElement("div"); rh.className = "resize-handle";
  node.appendChild(text); node.appendChild(rh);
  addShapeHandles(node, false);
  attachResize(node, rh, 100, 60);
  attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: opts.fillEnabled !== false,
    gradientEnabled: opts.gradientEnabled,
    fill1: opts.fill || opts.fillColor || "#ffffff",
    fill2: opts.fillColor2 || opts.fill2 || opts.fill || opts.fillColor || "#ffffff",
    fillDirection: opts.fillDirection || "horizontal"
  });
  node.style.borderColor = opts.border || "#111827";
  node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(0, Number(node.dataset.borderWidth) || 0)}px` : "0px";
  node.style.borderStyle = "solid";
  if (opts.radius != null) node.style.borderRadius = `${opts.radius}px`;
  renderShapeText(text);
  desktop.appendChild(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
}

function createShapeLine(opts = {}, doSave = true) {
  opts = applyCreationStylePreset("shape-line", opts);
  const node = createShapeBase("shape-line", opts);
  node.style.height = "2px";
  node.style.background = opts.border || "#000000";
  if (opts.borderWidth != null) node.style.height = `${Math.max(1, opts.borderWidth)}px`;
  if (opts.borderEnabled === false) node.style.background = "transparent";

  const startHandle = document.createElement("div");
  const endHandle = document.createElement("div");
  startHandle.className = "shape-line-handle start";
  endHandle.className = "shape-line-handle end";
  node.appendChild(startHandle);
  node.appendChild(endHandle);

  function getLineEndpoints() {
    const x1 = node.offsetLeft;
    const y1 = node.offsetTop;
    const len = Math.max(1, node.offsetWidth);
    const m = (node.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/);
    const a = ((m ? Number(m[1]) : 0) * Math.PI) / 180;
    return { x1, y1, x2: x1 + Math.cos(a) * len, y2: y1 + Math.sin(a) * len };
  }

  function applyLineEndpoints(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(40, Math.sqrt(dx * dx + dy * dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    node.style.left = `${Math.max(0, x1)}px`;
    node.style.top = `${Math.max(0, y1)}px`;
    node.style.width = `${len}px`;
    node.style.transform = `rotate(${angle}deg)`;
  }

  function bindEndpointDrag(handle, side) {
    let active = false;
    handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.stopPropagation();
      active = true;
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", (event) => {
      if (!active || (event.buttons & 1) !== 1) return;
      const p = getDesktopPoint(event.clientX, event.clientY);
      const snap = snapToShapeAnchor(p.x, p.y, node.dataset.shapeId);
      const ep = getLineEndpoints();
      if (side === "start") applyLineEndpoints(snap.x, snap.y, ep.x2, ep.y2);
      else applyLineEndpoints(ep.x1, ep.y1, snap.x, snap.y);
      syncFormatPanel();
      renderConnectors();
    });
    const stop = (event) => {
      if (!active) return;
      active = false;
      if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
      saveLayout();
    };
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
  }

  bindEndpointDrag(startHandle, "start");
  bindEndpointDrag(endHandle, "end");
  desktop.appendChild(node);
  updateDesktopExtent();
  renderConnectors();
  if (doSave) saveLayout();
}

function createShapeTable(opts = {}, doSave = true) {
  const toPx = (value, fallback) => {
    const n = Number.parseFloat(String(value ?? ""));
    return Number.isFinite(n) ? `${Math.max(1, n)}px` : fallback;
  };
  const toNumber = (value, fallback, min = -Infinity, max = Infinity) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  };
  const toBool = (value, fallback = false) => {
    if (value == null) return fallback;
    if (value === "0" || value === "false") return false;
    return !!value;
  };
  const colorValue = (value, fallback) => {
    const raw = String(value ?? "").trim();
    return raw || fallback;
  };
  const MIN_COL_WIDTH = 48;
  const MIN_ROW_HEIGHT = 24;
  const DEFAULT_COL_WIDTH = 160;
  const DEFAULT_ROW_HEIGHT = 52;
  const HEADER_HEIGHT = 34;
  const normalizeSizes = (sizes, count, totalPx, defaultPx, minPx) => {
    const raw = Array.isArray(sizes) ? sizes.slice(0, count).map((v) => Number(v)).filter(Number.isFinite) : [];
    const looksLikeFractions = raw.length > 0 && raw.every((v) => v > 0 && v <= 1);
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const rawValue = raw[i];
      const converted = looksLikeFractions ? rawValue * totalPx : rawValue;
      list.push(Math.max(minPx, Number.isFinite(converted) && converted > 0 ? converted : defaultPx));
    }
    return list;
  };
  const sumSizes = (sizes) => sizes.reduce((acc, value) => acc + value, 0);
  const defaultCells = () => [
    { r: 0, c: 0, raw: "Привероа" },
    { r: 0, c: 1, raw: "привет отлично" },
    { r: 1, c: 0, raw: "Количество часов\nпрограммиста." },
    { r: 1, c: 1, raw: "2 000", align: "right" },
    { r: 2, c: 0, raw: "Стоимость часа" },
    { r: 2, c: 1, raw: "2 000", align: "right" },
    { r: 3, c: 0, raw: "Доход" },
    { r: 3, c: 1, raw: "4 000 000", align: "right" }
  ];
  const sourceData = (opts && typeof opts.tableData === "object" && opts.tableData) ? opts.tableData : {};
  const sourceStyle = (sourceData.tableStyle && typeof sourceData.tableStyle === "object") ? sourceData.tableStyle : (opts.tableStyle || {});
  const rows = Math.max(1, Math.floor(toNumber(sourceData.rows ?? opts.rows, 5, 1, 200)));
  const cols = Math.max(1, Math.floor(toNumber(sourceData.cols ?? opts.cols, 2, 1, 100)));
  const sourceCells = Array.isArray(sourceData.cells) && sourceData.cells.length ? sourceData.cells : defaultCells();
  const initialWidth = Math.max(220, Number(opts.tablePixelWidth) || Number.parseFloat(opts.width || "") || 620);
  const initialHeight = Math.max(120, Number(opts.tablePixelHeight) || Number.parseFloat(opts.height || "") || 360);
  const state = {
    rows,
    cols,
    cells: new Map(),
    colWidths: normalizeSizes(sourceData.colWidths, cols, initialWidth, Math.max(MIN_COL_WIDTH, initialWidth / cols), MIN_COL_WIDTH),
    rowHeights: normalizeSizes(sourceData.rowHeights, rows, Math.max(MIN_ROW_HEIGHT, initialHeight - HEADER_HEIGHT), Math.max(MIN_ROW_HEIGHT, (initialHeight - HEADER_HEIGHT) / rows), MIN_ROW_HEIGHT),
    tableWrap: toBool(sourceData.tableWrap ?? opts.tableWrap, true),
    tableAutoSize: toBool(sourceData.tableAutoSize ?? opts.tableAutoSize, true),
    tableTextScale: toBool(sourceData.tableTextScale ?? opts.tableTextScale, false),
    title: String(opts.tableTitle || opts.title || sourceData.title || "Расчет ЗП программиста").trim() || "Таблица",
    headerText: {
      fontFamily: opts.tableHeaderTextStyle?.fontFamily || "Arial",
      color: colorValue(opts.tableHeaderTextStyle?.color || opts.textColor, "#111827"),
      fontSize: toNumber(opts.tableHeaderTextStyle?.baseFontSize ?? opts.tableHeaderTextStyle?.fontSize, 18, 8, 144),
      bold: toBool(opts.tableHeaderTextStyle?.bold, true),
      italic: toBool(opts.tableHeaderTextStyle?.italic, false),
      strike: toBool(opts.tableHeaderTextStyle?.strike, false),
      wrap: toBool(opts.tableHeaderTextStyle?.wrap, false),
      hAlign: opts.tableHeaderTextStyle?.hAlign || "center",
      vAlign: opts.tableHeaderTextStyle?.vAlign || "middle"
    },
    style: {
      headerFill: colorValue(sourceStyle.tableHeaderFill || opts.tableHeaderFill || opts.fill, "#f4c6cc"),
      headerFillEnabled: toBool(sourceStyle.tableHeaderFillEnabled ?? opts.tableHeaderFillEnabled ?? opts.fillEnabled, true),
      headerGradientEnabled: toBool(sourceStyle.tableHeaderGradientEnabled ?? opts.tableHeaderGradientEnabled ?? opts.gradientEnabled, true),
      headerFill2: colorValue(sourceStyle.tableHeaderFill2 || opts.tableHeaderFill2 || opts.fill2 || opts.fillColor2, "#4d8edd"),
      headerFillDirection: sourceStyle.tableHeaderFillDirection || opts.tableHeaderFillDirection || opts.fillDirection || "horizontal",
      border: colorValue(sourceStyle.border || opts.border, "#b8c0cc"),
      borderEnabled: toBool(sourceStyle.borderEnabled ?? opts.borderEnabled, true),
      borderWidth: toNumber(sourceStyle.borderWidth ?? opts.borderWidth, 1, 0, 24),
      radius: toNumber(sourceStyle.radius ?? opts.radius, 8, 0, 80),
      opacity: toNumber(sourceStyle.opacity ?? opts.opacity, 1, 0, 1),
      shadow: toNumber(sourceStyle.shadow ?? opts.shadow, 7, 0, 48)
    }
  };
  const normalizeCell = (cell, r, c) => ({
    r,
    c,
    raw: String(cell.raw ?? cell.text ?? ""),
    fontFamily: cell.fontFamily || "Arial",
    fontSize: toNumber(cell.fontSize, 14, 8, 144),
    color: colorValue(cell.color, "#334155"),
    numberGrouping: toBool(cell.numberGrouping, true),
    fillEnabled: toBool(cell.fillEnabled, false),
    gradientEnabled: toBool(cell.gradientEnabled, false),
    fillDirection: cell.fillDirection || "horizontal",
    fill1: colorValue(cell.fill1 || cell.background, "#ffffff"),
    fill2: colorValue(cell.fill2 || cell.fill1 || cell.background, "#ffffff"),
    borderColor: colorValue(cell.borderColor, "#b8c0cc"),
    borderWidth: toNumber(cell.borderWidth, 1, 0, 24),
    borderEnabled: toBool(cell.borderEnabled, true),
    align: cell.align || "left",
    vAlign: cell.vAlign || "middle",
    bold: toBool(cell.bold, false),
    italic: toBool(cell.italic, false),
    strike: toBool(cell.strike, false),
    wrap: toBool(cell.wrap, true)
  });
  const cellKey = (r, c) => `${r}:${c}`;
  const colNameFromIndex = (index) => {
    let n = index + 1;
    let name = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      name = String.fromCharCode(65 + rem) + name;
      n = Math.floor((n - 1) / 26);
    }
    return name;
  };
  const addressFromCell = (r, c) => `${colNameFromIndex(c)}${r + 1}`;
  const parseCellAddress = (address) => {
    const match = String(address || "").toUpperCase().match(/^([A-Z]+)([1-9]\d*)$/);
    if (!match) return null;
    let col = 0;
    for (const ch of match[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
    const row = Number(match[2]);
    if (!Number.isFinite(row)) return null;
    return { r: row - 1, c: col - 1 };
  };
  sourceCells.forEach((cell) => {
    const r = Math.floor(toNumber(cell.r, 0, 0, rows - 1));
    const c = Math.floor(toNumber(cell.c, 0, 0, cols - 1));
    state.cells.set(cellKey(r, c), normalizeCell(cell, r, c));
  });
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (!state.cells.has(cellKey(r, c))) state.cells.set(cellKey(r, c), normalizeCell({}, r, c));
    }
  }

  const node = createShapeBase("shape-table", {
    ...opts,
    width: `${Math.max(initialWidth, sumSizes(state.colWidths))}px`,
    height: `${Math.max(initialHeight, HEADER_HEIGHT + sumSizes(state.rowHeights))}px`,
    border: state.style.border,
    borderEnabled: state.style.borderEnabled,
    borderWidth: state.style.borderWidth,
    radius: state.style.radius,
    opacity: state.style.opacity,
    shadow: state.style.shadow
  });
  node.__tableState = state;
  node.__tableSelectionScope = "shape";
  node.dataset.tableRows = String(state.rows);
  node.dataset.tableCols = String(state.cols);
  node.dataset.tableWrap = state.tableWrap ? "1" : "0";
  node.dataset.tableAutoSize = state.tableAutoSize ? "1" : "0";
  node.dataset.tableTextScale = state.tableTextScale ? "1" : "0";
  node.dataset.tableTitle = state.title;
  node.dataset.tableHeaderFill = state.style.headerFill;
  node.dataset.tableHeaderFillEnabled = state.style.headerFillEnabled ? "1" : "0";
  node.dataset.tableHeaderGradientEnabled = state.style.headerGradientEnabled ? "1" : "0";
  node.dataset.tableHeaderFill2 = state.style.headerFill2;
  node.dataset.tableHeaderFillDirection = state.style.headerFillDirection;
  node.dataset.borderColor = state.style.border;
  node.dataset.borderEnabled = state.style.borderEnabled ? "1" : "0";
  node.dataset.borderWidth = String(state.style.borderWidth);
  node.dataset.radius = String(state.style.radius);
  node.dataset.opacity = String(state.style.opacity);
  node.dataset.shadow = String(state.style.shadow);
  node.dataset.tablePixelWidth = String(Math.round(Number.parseFloat(node.style.width) || 620));
  node.dataset.tablePixelHeight = String(Math.round(Number.parseFloat(node.style.height) || 360));
  node.style.background = "#ffffff";
  node.style.borderStyle = "solid";
  node.style.borderColor = state.style.border;
  node.style.borderWidth = state.style.borderEnabled ? `${state.style.borderWidth}px` : "0px";
  node.style.borderRadius = `${state.style.radius}px`;
  node.style.opacity = String(state.style.opacity);
  applyNodeShadow(node, state.style.shadow);

  const titleBar = document.createElement("div");
  titleBar.className = "table-titlebar";
  const titleText = document.createElement("div");
  titleText.className = "table-title-text";
  const tableRoot = document.createElement("div");
  tableRoot.className = "shape-table-root";
  const tableWrap = document.createElement("div");
  tableWrap.className = "shape-table-wrap";
  const tableEl = document.createElement("table");
  tableEl.className = "shape-table-grid";
  const resizeHandle = document.createElement("div");
  resizeHandle.className = "resize-handle";
  const addColBtn = document.createElement("button");
  addColBtn.type = "button";
  addColBtn.className = "table-add-col";
  addColBtn.textContent = "+";
  addColBtn.title = "Добавить столбец";
  const addRowBtn = document.createElement("button");
  addRowBtn.type = "button";
  addRowBtn.className = "table-add-row";
  addRowBtn.textContent = "+";
  addRowBtn.title = "Добавить строку";

  let activeCell = null;
  let selectedCells = [];
  let editingCell = null;
  let rangeAnchor = null;
  let rangeSelecting = false;
  let resizeDrag = null;

  const getCellState = (r, c) => state.cells.get(cellKey(r, c));
  const setCellState = (cell) => state.cells.set(cellKey(cell.r, cell.c), cell);
  const dumpCellStates = () => Array.from(state.cells.values()).map((cell) => {
    const isFormula = String(cell.raw || "").trim().startsWith("=");
    const computed = isFormula ? evaluateCellValue(cell.r, cell.c) : parseNumberValue(cell.raw);
    const numericRaw = String(cell.raw || "").trim().replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
    const isNumber = !isFormula && numericRaw !== "" && Number.isFinite(Number(numericRaw));
    return {
      ...cell,
      address: addressFromCell(cell.r, cell.c),
      valueType: isFormula ? "formula" : (isNumber ? "number" : "text"),
      computedValue: isFormula ? computed : (isNumber ? Number(numericRaw) : cell.raw)
    };
  });
  const updateStoredSize = () => {
    node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || Number.parseFloat(node.style.width) || 0));
    node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || Number.parseFloat(node.style.height) || 0));
  };
  const applyTitle = () => {
    titleText.textContent = state.title;
    titleText.dataset.rawText = state.title;
    titleText.dataset.baseFontSize = String(state.headerText.fontSize);
    titleText.style.fontFamily = fontCssFromKey(state.headerText.fontFamily);
    titleText.style.color = state.headerText.color;
    titleText.style.fontSize = `${state.headerText.fontSize}px`;
    titleText.style.fontWeight = state.headerText.bold ? "700" : "600";
    titleText.style.fontStyle = state.headerText.italic ? "italic" : "normal";
    titleText.style.textDecoration = state.headerText.strike ? "line-through" : "none";
    titleText.style.whiteSpace = state.headerText.wrap ? "normal" : "nowrap";
    node.dataset.tableTitle = state.title;
    applyTableTitleAlign(titleBar, titleText, state.headerText.hAlign, state.headerText.vAlign);
    applyFillStyle(titleBar, {
      fillEnabled: state.style.headerFillEnabled,
      gradientEnabled: state.style.headerGradientEnabled,
      fill1: state.style.headerFill,
      fill2: state.style.headerFill2,
      fillDirection: state.style.headerFillDirection
    });
  };
  const parseNumberValue = (value) => {
    const normalized = String(value ?? "").replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  };
  const getRangeValues = (range, visiting) => {
    const [from, to] = String(range || "").split(":");
    const a = parseCellAddress(from);
    const b = parseCellAddress(to);
    if (!a || !b) return [];
    const rMin = Math.max(0, Math.min(a.r, b.r));
    const rMax = Math.min(state.rows - 1, Math.max(a.r, b.r));
    const cMin = Math.max(0, Math.min(a.c, b.c));
    const cMax = Math.min(state.cols - 1, Math.max(a.c, b.c));
    const values = [];
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        values.push(evaluateCellValue(r, c, visiting));
      }
    }
    return values;
  };
  const evaluateCellValue = (r, c, visiting = new Set()) => {
    if (r < 0 || c < 0 || r >= state.rows || c >= state.cols) return "#ERROR";
    const cell = getCellState(r, c);
    if (!cell) return 0;
    const raw = String(cell.raw || "").trim();
    if (!raw.startsWith("=")) return parseNumberValue(raw);
    const key = cellKey(r, c);
    if (visiting.has(key)) return "#CYCLE";
    visiting.add(key);
    let expression = raw.slice(1).toUpperCase();
    let hasCycle = false;
    const calcRange = (fn, range) => {
      const values = getRangeValues(range, new Set(visiting));
      if (values.some((value) => typeof value === "string")) return NaN;
      if (fn === "SUM") return values.reduce((sum, value) => sum + value, 0);
      if (fn === "AVERAGE") return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
      if (fn === "MIN") return values.length ? Math.min(...values) : 0;
      if (fn === "MAX") return values.length ? Math.max(...values) : 0;
      if (fn === "COUNT") return values.filter((value) => Number.isFinite(value)).length;
      return NaN;
    };
    expression = expression.replace(/\b(SUM|AVERAGE|MIN|MAX|COUNT)\(([A-Z]+\d+:[A-Z]+\d+)\)/g, (_m, fn, range) => String(calcRange(fn, range)));
    expression = expression.replace(/\b([A-Z]+\d+:[A-Z]+\d+)\b/g, (_m, range) => String(getRangeValues(range, new Set(visiting)).reduce((sum, value) => sum + (Number(value) || 0), 0)));
    expression = expression.replace(/\b([A-Z]+\d+)\b/g, (_m, address) => {
      const ref = parseCellAddress(address);
      if (!ref) return "0";
      const value = evaluateCellValue(ref.r, ref.c, new Set(visiting));
      if (value === "#CYCLE") hasCycle = true;
      return typeof value === "string" ? "NaN" : String(value);
    });
    visiting.delete(key);
    if (hasCycle) return "#CYCLE";
    if (!/^[0-9+\-*/().\s,NaN]+$/.test(expression)) return "#ERROR";
    try {
      const value = Function(`"use strict"; return (${expression.replace(/,/g, ".")});`)();
      return Number.isFinite(value) ? value : "#ERROR";
    } catch {
      return "#ERROR";
    }
  };
  const getCellDisplayValue = (cell) => {
    if (!cell) return "";
    const raw = String(cell.raw || "");
    if (!raw.trim().startsWith("=")) return applyNumberGroupingToText(raw, cell.numberGrouping);
    const value = evaluateCellValue(cell.r, cell.c);
    return typeof value === "string" ? value : applyNumberGroupingToText(String(value), cell.numberGrouping);
  };
  const applyCellStyle = (td, cell) => {
    td.dataset.r = String(cell.r);
    td.dataset.c = String(cell.c);
    td.dataset.address = addressFromCell(cell.r, cell.c);
    td.dataset.raw = cell.raw;
    td.dataset.baseFontSize = String(cell.fontSize);
    td.dataset.numberGrouping = cell.numberGrouping ? "1" : "0";
    td.dataset.borderColor = cell.borderColor;
    td.dataset.borderWidth = String(cell.borderWidth);
    td.dataset.borderEnabled = cell.borderEnabled ? "1" : "0";
    td.style.fontFamily = fontCssFromKey(cell.fontFamily);
    td.style.fontSize = `${cell.fontSize}px`;
    td.style.color = cell.color;
    td.style.textAlign = cell.align;
    td.style.verticalAlign = cell.vAlign;
    td.style.fontWeight = cell.bold ? "700" : "400";
    td.style.fontStyle = cell.italic ? "italic" : "normal";
    td.style.textDecoration = cell.strike ? "line-through" : "none";
    td.style.whiteSpace = cell.wrap && state.tableWrap ? "normal" : "nowrap";
    td.style.overflow = "hidden";
    td.style.textOverflow = "clip";
    td.style.borderStyle = "solid";
    td.style.borderWidth = cell.borderEnabled ? `${Math.max(1, cell.borderWidth)}px` : "0px";
    td.style.borderColor = cell.borderColor;
    applyFillStyle(td, {
      fillEnabled: cell.fillEnabled,
      gradientEnabled: cell.gradientEnabled,
      fill1: cell.fill1,
      fill2: cell.fill2,
      fillDirection: cell.fillDirection
    });
    td.textContent = getCellDisplayValue(cell);
  };
  const refreshAllCellDisplays = () => {
    tableEl.querySelectorAll("td").forEach((td) => {
      const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
      if (cell && td !== editingCell) applyCellStyle(td, cell);
    });
    paintSelectedCells();
  };
  const autoFitWrappedRows = () => {
    if (!state.tableWrap || !state.tableAutoSize) return;
    for (let r = 0; r < state.rows; r += 1) {
      let nextHeight = state.rowHeights[r] || DEFAULT_ROW_HEIGHT;
      for (let c = 0; c < state.cols; c += 1) {
        const td = getCellElement(r, c);
        const cell = getCellState(r, c);
        if (!td || !cell || !cell.wrap) continue;
        const measured = measureTableCellText(td, cell.raw || " ", true, state.colWidths[c] || DEFAULT_COL_WIDTH);
        nextHeight = Math.max(nextHeight, measured.height + 12);
      }
      state.rowHeights[r] = Math.max(MIN_ROW_HEIGHT, nextHeight);
    }
    node.style.height = `${Math.max(node.offsetHeight || initialHeight, HEADER_HEIGHT + sumSizes(state.rowHeights))}px`;
  };
  const clearCellSelection = () => {
    tableEl.querySelectorAll("td").forEach((td) => {
      td.classList.remove("cell-selected");
      td.classList.remove("cell-range-selected");
    });
    selectedCells = [];
    activeCell = null;
    rangeAnchor = null;
    rangeSelecting = false;
    node.__tableSelectionScope = "shape";
  };
  const paintSelectedCells = () => {
    tableEl.querySelectorAll("td").forEach((td) => {
      td.classList.toggle("cell-selected", td === activeCell);
      td.classList.toggle("cell-range-selected", selectedCells.includes(td) && td !== activeCell);
    });
  };
  const selectCellRange = (fromTd, toTd) => {
    if (!fromTd || !toTd) return false;
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    const r1 = Number(fromTd.dataset.r);
    const c1 = Number(fromTd.dataset.c);
    const r2 = Number(toTd.dataset.r);
    const c2 = Number(toTd.dataset.c);
    const rMin = Math.min(r1, r2);
    const rMax = Math.max(r1, r2);
    const cMin = Math.min(c1, c2);
    const cMax = Math.max(c1, c2);
    selectedCells = [];
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        const td = getCellElement(r, c);
        if (td) selectedCells.push(td);
      }
    }
    activeCell = fromTd;
    rangeAnchor = fromTd;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    syncFormatPanel();
    return true;
  };
  const selectCell = (td) => {
    if (!td) return;
    if (selectedShape !== node || !node.classList.contains("selected")) {
      selectShape(node);
    } else {
      clearCellSelection();
    }
    activeCell = td;
    selectedCells = [td];
    rangeAnchor = td;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof td.focus === "function") td.focus({ preventScroll: true });
    syncFormatPanel();
  };
  const getCellElement = (r, c) => tableEl.querySelector(`td[data-r="${r}"][data-c="${c}"]`);
  const finishCellEdit = (td) => {
    if (!td || editingCell !== td) return;
    const r = Number(td.dataset.r);
    const c = Number(td.dataset.c);
    const cell = getCellState(r, c);
    if (cell) {
      cell.raw = td.innerText || td.textContent || "";
      setCellState(cell);
    }
    td.contentEditable = "false";
    td.classList.remove("cell-editing");
    editingCell = null;
    autoFitWrappedRows();
    renderTable();
    refreshAllCellDisplays();
    saveLayout();
  };
  const cancelCellEdit = (td) => {
    if (!td || editingCell !== td) return false;
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    if (cell) applyCellStyle(td, cell);
    td.contentEditable = "false";
    td.classList.remove("cell-editing");
    editingCell = null;
    if (typeof td.focus === "function") td.focus({ preventScroll: true });
    return true;
  };
  const beginCellEdit = (td, initialText) => {
    if (!td) return;
    selectCell(td);
    editingCell = td;
    td.contentEditable = "true";
    td.classList.add("cell-editing");
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    td.dataset.editingBackup = cell ? cell.raw : "";
    td.textContent = initialText != null ? String(initialText) : (cell ? cell.raw : "");
    td.focus();
    placeCaretAtEnd(td);
    return true;
  };
  const moveSelectionBy = (deltaRow, deltaCol) => {
    const current = activeCell || selectedCells[0] || tableEl.querySelector("td");
    if (!current || editingCell) return false;
    const row = Math.max(0, Math.min(state.rows - 1, Number(current.dataset.r) + deltaRow));
    const col = Math.max(0, Math.min(state.cols - 1, Number(current.dataset.c) + deltaCol));
    const next = getCellElement(row, col);
    if (!next) return false;
    selectCell(next);
    return true;
  };
  const clearSelectedText = () => {
    const cells = selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []);
    if (!cells.length || editingCell) return false;
    cells.forEach((td) => {
      const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
      if (!cell) return;
      cell.raw = "";
      setCellState(cell);
    });
    autoFitWrappedRows();
    renderTable();
    refreshAllCellDisplays();
    saveLayout();
    syncFormatPanel();
    return true;
  };
  const getSelectedRange = () => {
    const cells = selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []);
    if (!cells.length) return null;
    const rows = cells.map((td) => Number(td.dataset.r));
    const cols = cells.map((td) => Number(td.dataset.c));
    return { rMin: Math.min(...rows), rMax: Math.max(...rows), cMin: Math.min(...cols), cMax: Math.max(...cols) };
  };
  const getClipboardText = () => {
    const range = getSelectedRange();
    if (!range) return "";
    const lines = [];
    for (let r = range.rMin; r <= range.rMax; r += 1) {
      const parts = [];
      for (let c = range.cMin; c <= range.cMax; c += 1) {
        const cell = getCellState(r, c);
        parts.push(cell ? cell.raw : "");
      }
      lines.push(parts.join("\t"));
    }
    return lines.join("\n");
  };
  const pasteTextToSelection = (text) => {
    const td = activeCell || selectedCells[0] || tableEl.querySelector("td");
    if (!td || editingCell) return false;
    const value = String(text ?? "");
    if (!value.includes("\t") && !value.includes("\n")) return beginCellEdit(td, value);
    const startR = Number(td.dataset.r);
    const startC = Number(td.dataset.c);
    value.replace(/\r/g, "").split("\n").forEach((line, dr) => {
      line.split("\t").forEach((part, dc) => {
        const cell = getCellState(startR + dr, startC + dc);
        if (!cell) return;
        cell.raw = part;
        setCellState(cell);
      });
    });
    autoFitWrappedRows();
    renderTable();
    refreshAllCellDisplays();
    saveLayout();
    return true;
  };
  const renderTable = () => {
    const activeCoords = activeCell ? { r: Number(activeCell.dataset.r), c: Number(activeCell.dataset.c) } : null;
    const selectedCoords = selectedCells.map((td) => ({ r: Number(td.dataset.r), c: Number(td.dataset.c) }));
    tableEl.innerHTML = "";
    const colgroup = document.createElement("colgroup");
    state.colWidths = normalizeSizes(state.colWidths, state.cols, sumSizes(state.colWidths) || initialWidth, DEFAULT_COL_WIDTH, MIN_COL_WIDTH);
    state.rowHeights = normalizeSizes(state.rowHeights, state.rows, sumSizes(state.rowHeights) || initialHeight - HEADER_HEIGHT, DEFAULT_ROW_HEIGHT, MIN_ROW_HEIGHT);
    tableEl.style.width = `${sumSizes(state.colWidths)}px`;
    tableEl.style.height = `${sumSizes(state.rowHeights)}px`;
    state.colWidths.forEach((width) => {
      const col = document.createElement("col");
      col.style.width = `${width}px`;
      colgroup.appendChild(col);
    });
    tableEl.appendChild(colgroup);
    for (let r = 0; r < state.rows; r += 1) {
      const tr = document.createElement("tr");
      tr.style.height = `${state.rowHeights[r]}px`;
      for (let c = 0; c < state.cols; c += 1) {
        const td = document.createElement("td");
        const cell = getCellState(r, c) || normalizeCell({}, r, c);
        setCellState(cell);
        applyCellStyle(td, cell);
        td.tabIndex = 0;
        td.contentEditable = "false";
        td.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
          if (event.shiftKey && rangeAnchor) {
            selectCellRange(rangeAnchor, td);
            return;
          }
          selectCell(td);
          rangeSelecting = true;
        });
        td.addEventListener("pointerenter", () => {
          if (!rangeSelecting || !rangeAnchor || editingCell || resizeDrag) return;
          selectCellRange(rangeAnchor, td);
        });
        td.addEventListener("dblclick", (event) => {
          event.stopPropagation();
          beginCellEdit(td);
        });
        td.addEventListener("keydown", (event) => {
          if (editingCell !== td) return;
          event.stopPropagation();
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            finishCellEdit(td);
            if (typeof td.focus === "function") td.focus({ preventScroll: true });
            return;
          }
          if (event.key === "Tab") {
            event.preventDefault();
            const step = event.shiftKey ? -1 : 1;
            finishCellEdit(td);
            moveSelectionBy(0, step);
            return;
          }
          if (event.key === "Enter" && event.shiftKey) {
            return;
          }
          if (event.key === "Escape") {
            event.preventDefault();
            cancelCellEdit(td);
          }
        });
        td.addEventListener("blur", () => finishCellEdit(td));
        tr.appendChild(td);
      }
      tableEl.appendChild(tr);
    }
    node.dataset.tableRows = String(state.rows);
    node.dataset.tableCols = String(state.cols);
    if (node.__tableSelectionScope === "cells") {
      selectedCells = selectedCoords.map((pos) => getCellElement(pos.r, pos.c)).filter(Boolean);
      activeCell = activeCoords ? getCellElement(activeCoords.r, activeCoords.c) : (selectedCells[0] || null);
      if (activeCell && !selectedCells.includes(activeCell)) selectedCells.unshift(activeCell);
      paintSelectedCells();
    }
    updateStoredSize();
  };
  const detectTableBoundary = (event) => {
    const rect = tableWrap.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
    let accX = 0;
    for (let c = 0; c < state.cols - 1; c += 1) {
      accX += state.colWidths[c];
      if (Math.abs(x - accX) <= 5) return { type: "col", index: c };
    }
    let accY = 0;
    for (let r = 0; r < state.rows - 1; r += 1) {
      accY += state.rowHeights[r];
      if (Math.abs(y - accY) <= 5) return { type: "row", index: r };
    }
    return null;
  };
  const applyResizeDrag = (event) => {
    if (!resizeDrag) return;
    if (resizeDrag.type === "col") {
      const delta = (event.clientX - resizeDrag.startX) / zoom;
      const nextWidth = Math.max(MIN_COL_WIDTH, resizeDrag.startSize + delta);
      state.colWidths[resizeDrag.index] = nextWidth;
      const sizeDelta = nextWidth - resizeDrag.startSize;
      node.style.width = `${Math.max(220, resizeDrag.nodeSize + sizeDelta)}px`;
    } else {
      const delta = (event.clientY - resizeDrag.startY) / zoom;
      const nextHeight = Math.max(MIN_ROW_HEIGHT, resizeDrag.startSize + delta);
      state.rowHeights[resizeDrag.index] = nextHeight;
      const sizeDelta = nextHeight - resizeDrag.startSize;
      node.style.height = `${Math.max(120, resizeDrag.nodeSize + sizeDelta)}px`;
    }
    renderTable();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
  };
  const addColumn = () => {
    const insertAt = state.cols;
    const inheritedWidth = state.colWidths[Math.max(0, insertAt - 1)] || DEFAULT_COL_WIDTH;
    state.cols += 1;
    state.colWidths = [...state.colWidths, Math.max(MIN_COL_WIDTH, inheritedWidth)];
    node.style.width = `${Math.max(node.offsetWidth || initialWidth, sumSizes(state.colWidths))}px`;
    for (let r = 0; r < state.rows; r += 1) setCellState(normalizeCell({}, r, insertAt));
    renderTable();
    saveLayout();
  };
  const addRow = () => {
    const insertAt = state.rows;
    const inheritedHeight = state.rowHeights[Math.max(0, insertAt - 1)] || DEFAULT_ROW_HEIGHT;
    state.rows += 1;
    state.rowHeights = [...state.rowHeights, Math.max(MIN_ROW_HEIGHT, inheritedHeight)];
    node.style.height = `${Math.max(node.offsetHeight || initialHeight, HEADER_HEIGHT + sumSizes(state.rowHeights))}px`;
    for (let c = 0; c < state.cols; c += 1) setCellState(normalizeCell({}, insertAt, c));
    renderTable();
    saveLayout();
  };
  const deleteLastColumn = () => {
    if (state.cols <= 1) return false;
    const removed = state.cols - 1;
    const removedWidth = state.colWidths[removed] || DEFAULT_COL_WIDTH;
    state.cols -= 1;
    state.colWidths = state.colWidths.slice(0, state.cols);
    node.style.width = `${Math.max(220, (node.offsetWidth || Number.parseFloat(node.style.width || "") || sumSizes(state.colWidths) + removedWidth) - removedWidth)}px`;
    Array.from(state.cells.keys()).forEach((key) => {
      if (key.endsWith(`:${removed}`)) state.cells.delete(key);
    });
    renderTable();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
    saveLayout();
    return true;
  };
  const deleteLastRow = () => {
    if (state.rows <= 1) return false;
    const removed = state.rows - 1;
    const removedHeight = state.rowHeights[removed] || DEFAULT_ROW_HEIGHT;
    state.rows -= 1;
    state.rowHeights = state.rowHeights.slice(0, state.rows);
    node.style.height = `${Math.max(120, (node.offsetHeight || Number.parseFloat(node.style.height || "") || HEADER_HEIGHT + sumSizes(state.rowHeights) + removedHeight) - removedHeight)}px`;
    Array.from(state.cells.keys()).forEach((key) => {
      if (key.startsWith(`${removed}:`)) state.cells.delete(key);
    });
    renderTable();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
    saveLayout();
    return true;
  };
  const getPanelAlign = () => {
    const alignBtn = [fpAlignLeft, fpAlignCenter, fpAlignRight].find((btn) => btn && btn.classList.contains("active"));
    return alignBtn === fpAlignCenter ? "center" : alignBtn === fpAlignRight ? "right" : "left";
  };
  const getPanelVAlign = () => {
    const vAlignBtn = [fpVTop, fpVMiddle, fpVBottom].find((btn) => btn && btn.classList.contains("active"));
    return vAlignBtn === fpVMiddle ? "middle" : vAlignBtn === fpVBottom ? "bottom" : "top";
  };
  const syncShapeStateToDataset = () => {
    node.dataset.tableWrap = state.tableWrap ? "1" : "0";
    node.dataset.tableAutoSize = state.tableAutoSize ? "1" : "0";
    node.dataset.tableTextScale = state.tableTextScale ? "1" : "0";
    node.dataset.tableHeaderFill = state.style.headerFill;
    node.dataset.tableHeaderFillEnabled = state.style.headerFillEnabled ? "1" : "0";
    node.dataset.tableHeaderGradientEnabled = state.style.headerGradientEnabled ? "1" : "0";
    node.dataset.tableHeaderFill2 = state.style.headerFill2;
    node.dataset.tableHeaderFillDirection = state.style.headerFillDirection;
    node.dataset.borderColor = state.style.border;
    node.dataset.borderEnabled = state.style.borderEnabled ? "1" : "0";
    node.dataset.borderWidth = String(state.style.borderWidth);
    node.dataset.radius = String(state.style.radius);
    node.dataset.opacity = String(state.style.opacity);
    node.dataset.shadow = String(state.style.shadow);
    node.style.borderColor = state.style.border;
    node.style.borderWidth = state.style.borderEnabled ? `${state.style.borderWidth}px` : "0px";
    node.style.borderStyle = "solid";
    node.style.borderRadius = `${state.style.radius}px`;
    node.style.opacity = String(state.style.opacity);
    node.style.outline = "none";
    applyNodeShadow(node, state.style.shadow);
  };
  const syncShapeToFormatPanel = () => {
    if (fpFillEnabled) fpFillEnabled.checked = state.style.headerFillEnabled;
    if (fpGradientEnabled) fpGradientEnabled.checked = state.style.headerGradientEnabled;
    if (fpFill) fpFill.value = state.style.headerFill;
    if (fpFill2) fpFill2.value = state.style.headerFill2;
    if (fpFillType) fpFillType.value = state.style.headerFillDirection;
    if (fpBorderEnabled) fpBorderEnabled.checked = state.style.borderEnabled;
    if (fpBorder) fpBorder.value = state.style.border;
    if (fpBorderWidth) fpBorderWidth.value = String(state.style.borderWidth);
    if (fpBorderWidthNum) fpBorderWidthNum.value = String(state.style.borderWidth);
    if (fpRadius) fpRadius.value = String(state.style.radius);
    if (fpRadiusNum) fpRadiusNum.value = String(state.style.radius);
    if (fpOpacity) fpOpacity.value = String(Math.round(state.style.opacity * 100));
    if (fpOpacityNum) fpOpacityNum.value = String(Math.round(state.style.opacity * 100));
    if (fpShadow) fpShadow.value = String(state.style.shadow);
    if (fpShadowNum) fpShadowNum.value = String(state.style.shadow);
    if (fpX) fpX.value = String(node.offsetLeft);
    if (fpY) fpY.value = String(node.offsetTop);
    if (fpW) fpW.value = String(node.offsetWidth);
    if (fpH) fpH.value = String(node.offsetHeight);
    if (fpFontFamily) fpFontFamily.value = state.headerText.fontFamily;
    if (fpTextColor) fpTextColor.value = state.headerText.color;
    if (fpFontSize) fpFontSize.value = String(state.headerText.fontSize);
    if (fpBold) fpBold.checked = state.headerText.bold;
    if (fpItalic) fpItalic.checked = state.headerText.italic;
    if (fpStrike) fpStrike.checked = state.headerText.strike;
    if (fpUnderline) fpUnderline.checked = false;
    if (fpWrap) fpWrap.checked = state.headerText.wrap;
    if (fpAutoSize) fpAutoSize.checked = state.tableAutoSize;
    if (fpTextScale) fpTextScale.checked = state.tableTextScale;
    if (fpNumberGrouping) fpNumberGrouping.checked = true;
    setAlignButtons(state.headerText.hAlign, state.headerText.vAlign);
    updateFormatPanelVisuals();
    return true;
  };
  const syncCellToFormatPanel = () => {
    const td = activeCell || selectedCells[0];
    if (!td) return false;
    const cells = (selectedCells.length ? selectedCells : [td])
      .map((cellEl) => getCellState(Number(cellEl.dataset.r), Number(cellEl.dataset.c)))
      .filter(Boolean);
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    if (!cell || !cells.length) return false;
    const mixed = (field) => cells.some((item) => item[field] !== cell[field]);
    if (fpFillEnabled) setCheckboxMixedState(fpFillEnabled, mixed("fillEnabled"), cell.fillEnabled);
    if (fpGradientEnabled) setCheckboxMixedState(fpGradientEnabled, mixed("gradientEnabled"), cell.gradientEnabled);
    if (fpFill) {
      fpFill.value = cell.fill1;
      setControlMixedFlag(fpFill, mixed("fill1"));
      fpFill.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("fill1"));
    }
    if (fpFill2) {
      fpFill2.value = cell.fill2;
      setControlMixedFlag(fpFill2, mixed("fill2"));
      fpFill2.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("fill2"));
    }
    if (fpFillType) setSelectMixedState(fpFillType, mixed("fillDirection"), cell.fillDirection);
    if (fpBorderEnabled) setCheckboxMixedState(fpBorderEnabled, mixed("borderEnabled"), cell.borderEnabled);
    if (fpCellBorders) setCheckboxMixedState(fpCellBorders, mixed("borderEnabled"), cell.borderEnabled);
    if (fpBorder) {
      fpBorder.value = cell.borderColor;
      setControlMixedFlag(fpBorder, mixed("borderColor"));
      fpBorder.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("borderColor"));
    }
    if (fpBorderWidth) setTextMixedState(fpBorderWidth, mixed("borderWidth"), cell.borderWidth);
    if (fpBorderWidthNum) setRangeMixedState(fpBorderWidthNum, fpBorderWidth, mixed("borderWidth"), cell.borderWidth);
    if (fpFontFamily) setSelectMixedState(fpFontFamily, mixed("fontFamily"), cell.fontFamily);
    if (fpTextColor) {
      fpTextColor.value = cell.color;
      setControlMixedFlag(fpTextColor, mixed("color"));
      fpTextColor.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("color"));
    }
    if (fpFontSize) setTextMixedState(fpFontSize, mixed("fontSize"), cell.fontSize);
    if (fpBold) setCheckboxMixedState(fpBold, mixed("bold"), cell.bold);
    if (fpItalic) setCheckboxMixedState(fpItalic, mixed("italic"), cell.italic);
    if (fpStrike) setCheckboxMixedState(fpStrike, mixed("strike"), cell.strike);
    if (fpUnderline) setCheckboxMixedState(fpUnderline, false, false);
    if (fpWrap) setCheckboxMixedState(fpWrap, mixed("wrap"), cell.wrap);
    if (fpNumberGrouping) setCheckboxMixedState(fpNumberGrouping, mixed("numberGrouping"), cell.numberGrouping);
    if (fpAutoSize) fpAutoSize.checked = state.tableAutoSize;
    if (fpTextScale) fpTextScale.checked = state.tableTextScale;
    if (fpOpacity) fpOpacity.value = String(Math.round(state.style.opacity * 100));
    if (fpOpacityNum) fpOpacityNum.value = String(Math.round(state.style.opacity * 100));
    if (fpShadow) fpShadow.value = String(state.style.shadow);
    if (fpShadowNum) fpShadowNum.value = String(state.style.shadow);
    setAlignButtons(cell.align, cell.vAlign);
    updateFormatPanelVisuals();
    return true;
  };
  const syncToFormatPanelFromState = () => {
    if (node.__tableSelectionScope === "cells" && selectedCells.length) return syncCellToFormatPanel();
    return syncShapeToFormatPanel();
  };
  const applyPanelToShapeState = () => {
    state.tableWrap = fpWrap ? fpWrap.checked : state.tableWrap;
    state.tableAutoSize = fpAutoSize ? fpAutoSize.checked : state.tableAutoSize;
    state.tableTextScale = fpTextScale ? fpTextScale.checked : state.tableTextScale;
    state.style.headerFillEnabled = fpFillEnabled ? fpFillEnabled.checked : state.style.headerFillEnabled;
    state.style.headerGradientEnabled = state.style.headerFillEnabled && fpGradientEnabled ? fpGradientEnabled.checked : false;
    state.style.headerFill = fpFill ? fpFill.value : state.style.headerFill;
    state.style.headerFill2 = fpFill2 ? fpFill2.value : state.style.headerFill2;
    state.style.headerFillDirection = fpFillType ? fpFillType.value : state.style.headerFillDirection;
    state.style.borderEnabled = fpBorderEnabled ? fpBorderEnabled.checked : state.style.borderEnabled;
    state.style.border = fpBorder ? fpBorder.value : state.style.border;
    state.style.borderWidth = state.style.borderEnabled ? Math.max(1, Number(fpBorderWidth ? fpBorderWidth.value : state.style.borderWidth) || 1) : 0;
    state.style.radius = Math.max(0, Number(fpRadius ? fpRadius.value : state.style.radius) || 0);
    state.style.opacity = Math.max(0, Math.min(100, Number(fpOpacity ? fpOpacity.value : state.style.opacity * 100) || 100)) / 100;
    state.style.shadow = Math.max(0, Math.min(48, Number(fpShadow ? fpShadow.value : state.style.shadow) || 0));
    state.headerText.fontFamily = fpFontFamily ? fontKeyFromCss(fpFontFamily.value) : state.headerText.fontFamily;
    state.headerText.color = fpTextColor ? fpTextColor.value : state.headerText.color;
    state.headerText.fontSize = Math.max(8, Number(fpFontSize ? fpFontSize.value : state.headerText.fontSize) || 8);
    state.headerText.bold = fpBold ? fpBold.checked : state.headerText.bold;
    state.headerText.italic = fpItalic ? fpItalic.checked : state.headerText.italic;
    state.headerText.strike = fpStrike ? fpStrike.checked : state.headerText.strike;
    state.headerText.wrap = fpWrap ? fpWrap.checked : state.headerText.wrap;
    state.headerText.hAlign = getPanelAlign();
    state.headerText.vAlign = getPanelVAlign();
    if (fpX) node.style.left = `${Math.max(0, Number(fpX.value) || 0)}px`;
    if (fpY) node.style.top = `${Math.max(0, Number(fpY.value) || 0)}px`;
    if (fpW) node.style.width = `${Math.max(220, Number(fpW.value) || node.offsetWidth || 220)}px`;
    if (fpH) node.style.height = `${Math.max(120, Number(fpH.value) || node.offsetHeight || 120)}px`;
    syncShapeStateToDataset();
    applyTitle();
    renderTable();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
    return true;
  };
  const applyPanelToCellState = () => {
    const cells = selectedCells.length ? selectedCells.slice() : (activeCell ? [activeCell] : []);
    if (!cells.length) return false;
    state.tableWrap = fpWrap ? fpWrap.checked : state.tableWrap;
    state.tableAutoSize = fpAutoSize ? fpAutoSize.checked : state.tableAutoSize;
    state.tableTextScale = fpTextScale ? fpTextScale.checked : state.tableTextScale;
    cells.forEach((td) => {
      const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
      if (!cell) return;
      cell.fillEnabled = fpFillEnabled && !isControlMixed(fpFillEnabled) ? fpFillEnabled.checked : cell.fillEnabled;
      cell.gradientEnabled = fpGradientEnabled && !isControlMixed(fpGradientEnabled) ? (cell.fillEnabled && fpGradientEnabled.checked) : cell.gradientEnabled;
      cell.fill1 = fpFill && !isControlMixed(fpFill) ? fpFill.value : cell.fill1;
      cell.fill2 = fpFill2 && !isControlMixed(fpFill2) ? fpFill2.value : cell.fill2;
      cell.fillDirection = fpFillType && !isControlMixed(fpFillType) ? fpFillType.value : cell.fillDirection;
      cell.borderEnabled = fpCellBorders && !isControlMixed(fpCellBorders) ? fpCellBorders.checked : (fpBorderEnabled && !isControlMixed(fpBorderEnabled) ? fpBorderEnabled.checked : cell.borderEnabled);
      cell.borderColor = fpBorder && !isControlMixed(fpBorder) ? fpBorder.value : cell.borderColor;
      cell.borderWidth = fpBorderWidth && !isControlMixed(fpBorderWidth) ? (cell.borderEnabled ? Math.max(1, Number(fpBorderWidth.value) || 1) : 0) : cell.borderWidth;
      cell.fontFamily = fpFontFamily && !isControlMixed(fpFontFamily) ? fontKeyFromCss(fpFontFamily.value) : cell.fontFamily;
      cell.color = fpTextColor && !isControlMixed(fpTextColor) ? fpTextColor.value : cell.color;
      cell.fontSize = fpFontSize && !isControlMixed(fpFontSize) ? Math.max(8, Number(fpFontSize.value) || 8) : cell.fontSize;
      cell.bold = fpBold && !isControlMixed(fpBold) ? fpBold.checked : cell.bold;
      cell.italic = fpItalic && !isControlMixed(fpItalic) ? fpItalic.checked : cell.italic;
      cell.strike = fpStrike && !isControlMixed(fpStrike) ? fpStrike.checked : cell.strike;
      cell.wrap = fpWrap && !isControlMixed(fpWrap) ? fpWrap.checked : cell.wrap;
      cell.numberGrouping = fpNumberGrouping && !isControlMixed(fpNumberGrouping) ? fpNumberGrouping.checked : cell.numberGrouping;
      cell.align = getPanelAlign();
      cell.vAlign = getPanelVAlign();
      setCellState(cell);
      applyCellStyle(td, cell);
    });
    syncShapeStateToDataset();
    updateStoredSize();
    return true;
  };
  const scaleToShape = (oldWidth, oldHeight) => {
    const nextWidth = Math.max(MIN_COL_WIDTH, node.offsetWidth || Number.parseFloat(node.style.width || "") || oldWidth || sumSizes(state.colWidths));
    const nextHeight = Math.max(MIN_ROW_HEIGHT, (node.offsetHeight || Number.parseFloat(node.style.height || "") || oldHeight || (HEADER_HEIGHT + sumSizes(state.rowHeights))) - HEADER_HEIGHT);
    const prevWidth = Math.max(MIN_COL_WIDTH, oldWidth || sumSizes(state.colWidths));
    const prevHeight = Math.max(MIN_ROW_HEIGHT, (oldHeight || HEADER_HEIGHT + sumSizes(state.rowHeights)) - HEADER_HEIGHT);
    const sx = nextWidth / prevWidth;
    const sy = nextHeight / prevHeight;
    state.colWidths = state.colWidths.map((width) => Math.max(MIN_COL_WIDTH, width * sx));
    state.rowHeights = state.rowHeights.map((height) => Math.max(MIN_ROW_HEIGHT, height * sy));
    if (state.tableTextScale) {
      state.cells.forEach((cell) => {
        cell.fontSize = Math.max(8, Math.min(144, cell.fontSize * Math.min(sx, sy)));
      });
    }
    renderTable();
    updateStoredSize();
  };

  titleText.addEventListener("dblclick", (event) => {
    event.stopPropagation();
    titleText.contentEditable = "true";
    titleText.focus();
    placeCaretAtEnd(titleText);
  });
  titleText.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    titleText.blur();
  });
  titleText.addEventListener("blur", () => {
    if (titleText.contentEditable !== "true") return;
    titleText.contentEditable = "false";
    state.title = String(titleText.innerText || titleText.textContent || "Таблица").replace(/\s+/g, " ").trim() || "Таблица";
    applyTitle();
    saveLayout();
  });
  node.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".shape-table-grid td")) return;
    if (event.target.closest(".table-add-col") || event.target.closest(".table-add-row")) return;
    clearCellSelection();
  });
  tableWrap.addEventListener("pointermove", (event) => {
    if (resizeDrag) return;
    const boundary = detectTableBoundary(event);
    tableWrap.style.cursor = boundary ? (boundary.type === "col" ? "col-resize" : "row-resize") : "";
  });
  tableWrap.addEventListener("pointerdown", (event) => {
    const boundary = detectTableBoundary(event);
    if (!boundary) return;
    event.preventDefault();
    event.stopPropagation();
    selectShape(node);
    clearCellSelection();
    resizeDrag = {
      type: boundary.type,
      index: boundary.index,
      startX: event.clientX,
      startY: event.clientY,
      startSize: boundary.type === "col" ? state.colWidths[boundary.index] : state.rowHeights[boundary.index],
      nodeSize: boundary.type === "col" ? (node.offsetWidth || initialWidth) : (node.offsetHeight || initialHeight)
    };
    tableWrap.setPointerCapture(event.pointerId);
  }, true);
  tableWrap.addEventListener("pointermove", (event) => {
    if (!resizeDrag || (event.buttons & 1) !== 1) return;
    event.preventDefault();
    applyResizeDrag(event);
  }, true);
  const finishTableResize = (event) => {
    if (!resizeDrag) return;
    resizeDrag = null;
    tableWrap.style.cursor = "";
    if (event.pointerId != null) tableWrap.releasePointerCapture(event.pointerId);
    updateStoredSize();
    saveLayout();
  };
  tableWrap.addEventListener("pointerup", finishTableResize);
  tableWrap.addEventListener("pointercancel", finishTableResize);
  document.addEventListener("pointerup", () => {
    rangeSelecting = false;
  });
  titleBar.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    selectShape(node);
    bringToFront(node);
  });
  addColBtn.addEventListener("pointerdown", (event) => event.stopPropagation());
  addRowBtn.addEventListener("pointerdown", (event) => event.stopPropagation());
  addColBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addColumn();
  });
  addRowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addRow();
  });

  titleBar.appendChild(titleText);
  tableWrap.appendChild(tableEl);
  tableRoot.appendChild(tableWrap);
  node.appendChild(titleBar);
  node.appendChild(tableRoot);
  node.appendChild(addColBtn);
  node.appendChild(addRowBtn);
  node.appendChild(resizeHandle);

  node.__clearTableSelection = clearCellSelection;
  node.__tableApi = {
    getSelection: () => ({ activeCell, cells: selectedCells.slice() }),
    beginCellEdit,
    syncToFormatPanel: syncToFormatPanelFromState,
    applyCellStyleFromFormatPanel: applyPanelToCellState,
    applyFromFormatPanel: () => {
      if (node.__tableSelectionScope === "cells" && selectedCells.length) return applyPanelToCellState();
      return applyPanelToShapeState();
    },
    addColumnAfterSelection: addColumn,
    addRowAfterSelection: addRow,
    deleteSelectedColumns: deleteLastColumn,
    deleteSelectedRows: deleteLastRow,
    moveSelectionBy,
    clearSelectedText,
    getClipboardText,
    pasteTextToSelection,
    scaleToShape,
    getColWidths: () => state.colWidths.slice(),
    getRowHeights: () => state.rowHeights.slice(),
    reflowTextLayout: () => {
      updateStoredSize();
      return true;
    },
    dumpState: () => ({
      title: state.title,
      rows: state.rows,
      cols: state.cols,
      cells: dumpCellStates(),
      colWidths: state.colWidths.slice(),
      rowHeights: state.rowHeights.slice(),
      tableWrap: state.tableWrap,
      tableAutoSize: state.tableAutoSize,
      tableTextScale: state.tableTextScale,
      headerText: { ...state.headerText },
      tableStyle: { ...state.style }
    })
  };

  applyTitle();
  renderTable();
  attachDrag(node, titleBar);
  addShapeHandles(node, false);
  attachResize(node, resizeHandle, 220, 120);
  attachConnectorPoints(node);
  desktop.appendChild(node);
  updateStoredSize();
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
  return node;
}

function readWindowData(win) {
  return {
    connId: win.dataset.connId || "",
    docTitle: win.dataset.docTitle || "",
    customTitle: win.dataset.customTitle || "",
    title: win.querySelector(".window-title").textContent,
    src: win.querySelector(".sheet-frame").src,
    left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height,
    zIndex: Number(win.style.zIndex || 0)
  };
}

function readShapeData(node) {
  const text = node.querySelector(".shape-text");
  const titleEl = node.querySelector(".table-title-text");
  const fillNode = node.dataset.shapeType === "shape-table" ? (node.querySelector(".table-titlebar") || node) : node;
  const fillState = getFillStyleFromNode(fillNode, node.dataset.shapeType === "shape-table" ? "#f8fafc" : "#ffffff");
  const shadowState = Number(node.dataset.shadow ?? parseShadowValue(node.style.boxShadow || getComputedStyle(node).boxShadow)) || 0;
  const ang = Number(node.dataset.rotate || ((node.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/) || [0, 0])[1] || 0);
  let tableData = null;
  let tableStyle = null;
  let tableSnapshot = null;
  let titleFontSize = 18;
  if (node.dataset.shapeType === "shape-table") {
    tableSnapshot = node.__tableApi && node.__tableApi.dumpState ? node.__tableApi.dumpState() : null;
    if (tableSnapshot) {
      tableStyle = tableSnapshot.tableStyle || null;
      tableData = {
        rows: tableSnapshot.rows,
        cols: tableSnapshot.cols,
        cells: tableSnapshot.cells,
        colWidths: tableSnapshot.colWidths,
        rowHeights: tableSnapshot.rowHeights,
        tableWrap: tableSnapshot.tableWrap,
        tableAutoSize: tableSnapshot.tableAutoSize,
        tableTextScale: tableSnapshot.tableTextScale,
        tableStyle
      };
      titleFontSize = Math.max(8, Math.min(144, Number(tableSnapshot.headerText?.fontSize || 18) || 18));
    }
  }
  const actualLeft = Number.isFinite(node.offsetLeft) ? node.offsetLeft : parseFloat(node.style.left || "0") || 0;
  const actualTop = Number.isFinite(node.offsetTop) ? node.offsetTop : parseFloat(node.style.top || "0") || 0;
  const actualWidth = Number.isFinite(node.offsetWidth) ? node.offsetWidth : parseFloat(node.style.width || "0") || 0;
  const actualHeight = Number.isFinite(node.offsetHeight) ? node.offsetHeight : parseFloat(node.style.height || "0") || 0;
  return {
    id: node.dataset.shapeId,
    connId: node.dataset.connId || node.dataset.shapeId,
    type: node.dataset.shapeType,
    left: `${Math.max(0, actualLeft)}px`,
    top: `${Math.max(0, actualTop)}px`,
    width: `${Math.max(20, (node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelWidth) || 0) : 0) || actualWidth || parseFloat(node.style.width || "20") || 20)}px`,
    height: `${Math.max(2, (node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelHeight) || 0) : 0) || actualHeight || parseFloat(node.style.height || "2") || 2)}px`,
    zIndex: Number(node.style.zIndex || 0),
    text: text ? (text.dataset.rawText != null ? text.dataset.rawText : text.innerText) : "",
    numberGrouping: text ? getNumberGroupingEnabled(text) : true,
    tableTitle: tableSnapshot ? tableSnapshot.title : (node.dataset.tableTitle || ""),
    tableHeaderFill: tableStyle ? tableStyle.tableHeaderFill : (node.dataset.tableHeaderFill || ""),
    tableHeaderFillEnabled: tableStyle ? tableStyle.tableHeaderFillEnabled : (node.dataset.tableHeaderFillEnabled != null ? node.dataset.tableHeaderFillEnabled === "1" : fillState.fillEnabled),
    tableHeaderGradientEnabled: tableStyle ? tableStyle.tableHeaderGradientEnabled : (node.dataset.tableHeaderGradientEnabled != null ? node.dataset.tableHeaderGradientEnabled === "1" : fillState.gradientEnabled),
    tableHeaderFill2: tableStyle ? tableStyle.tableHeaderFill2 : (node.dataset.tableHeaderFill2 || fillState.fill2),
    tableHeaderFillDirection: tableStyle ? tableStyle.tableHeaderFillDirection : (node.dataset.tableHeaderFillDirection || fillState.fillDirection),
    tableHeaderTextStyle: {
      color: tableSnapshot ? tableSnapshot.headerText.color : (titleEl ? (titleEl.style.color || "#334155") : "#334155"),
      baseFontSize: titleFontSize,
      fontSize: titleFontSize,
      fontFamily: tableSnapshot ? tableSnapshot.headerText.fontFamily : undefined,
      bold: tableSnapshot ? tableSnapshot.headerText.bold : (titleEl ? ((titleEl.style.fontWeight || "600") === "700") : false),
      italic: tableSnapshot ? tableSnapshot.headerText.italic : (titleEl ? ((titleEl.style.fontStyle || "normal") === "italic") : false),
      strike: tableSnapshot ? tableSnapshot.headerText.strike : (titleEl ? ((titleEl.style.textDecoration || "none").includes("line-through")) : false),
      wrap: tableSnapshot ? tableSnapshot.headerText.wrap : (titleEl ? ((titleEl.style.whiteSpace || "nowrap") !== "nowrap") : false),
      hAlign: tableSnapshot ? tableSnapshot.headerText.hAlign : (titleEl ? (titleEl.dataset.halign || "left") : "left"),
      vAlign: tableSnapshot ? tableSnapshot.headerText.vAlign : (titleEl ? (titleEl.dataset.valign || "top") : "top")
    },
    tablePixelWidth: node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelWidth) || actualWidth || 0) : undefined,
    tablePixelHeight: node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelHeight) || actualHeight || 0) : undefined,
    tableWrap: node.dataset.shapeType === "shape-table" ? (tableSnapshot ? tableSnapshot.tableWrap : node.dataset.tableWrap !== "0") : undefined,
    tableAutoSize: node.dataset.shapeType === "shape-table" ? (tableSnapshot ? tableSnapshot.tableAutoSize : node.dataset.tableAutoSize !== "0") : undefined,
    tableTextScale: node.dataset.shapeType === "shape-table" ? (tableSnapshot ? tableSnapshot.tableTextScale : node.dataset.tableTextScale !== "0") : undefined,
    tableStyle: node.dataset.shapeType === "shape-table" ? tableStyle : undefined,
    fillEnabled: tableStyle ? tableStyle.tableHeaderFillEnabled : fillState.fillEnabled,
    gradientEnabled: tableStyle ? tableStyle.tableHeaderGradientEnabled : fillState.gradientEnabled,
    fillDirection: tableStyle ? tableStyle.tableHeaderFillDirection : fillState.fillDirection,
    fill: tableStyle ? tableStyle.tableHeaderFill : fillState.fill1,
    fill2: tableStyle ? tableStyle.tableHeaderFill2 : fillState.fill2,
    border: tableStyle ? tableStyle.border : (node.dataset.borderColor || node.style.borderColor || ""),
    borderEnabled: tableStyle ? tableStyle.borderEnabled : (node.dataset.borderEnabled != null ? node.dataset.borderEnabled === "1" : parseInt(node.style.borderWidth || "1", 10) > 0),
    borderWidth: tableStyle ? tableStyle.borderWidth : Math.max(0, Number(node.dataset.borderWidth || parseInt(node.style.borderWidth || "1", 10) || 0)),
    radius: tableStyle ? tableStyle.radius : parseInt(node.style.borderRadius || "0", 10),
    opacity: tableStyle ? tableStyle.opacity : (node.dataset.opacity || node.style.opacity || "1"),
    shadow: tableStyle ? tableStyle.shadow : (Number(node.dataset.shadow ?? shadowState) || 0),
    textColor: text ? text.style.color : "#000000",
    fontSize: text ? parseInt(text.style.fontSize || "16", 10) : 16,
    bold: text ? text.style.fontWeight === "700" : false,
    hAlign: text ? (text.dataset.halign || "left") : "left",
    vAlign: text ? (text.dataset.valign || "top") : "top",
    angle: Number(ang) || 0,
    flipX: node.dataset.flipX === "1",
    flipY: node.dataset.flipY === "1",
    tableData
  };
}

function getCurrentLayout() {
  return {
    schemaVersion: LAYOUT_SCHEMA_VERSION,
    zoom, zCounter, windowCounter, shapeCounter,
    windows: Array.from(desktop.querySelectorAll(".sheet-window")).map(readWindowData),
    shapes: Array.from(desktop.querySelectorAll(".shape")).map(readShapeData),
    connectors
  };
}

async function saveLayout(opts = {}) {
  const recordHistory = opts.recordHistory !== false;
  const keepScrollLeft = viewportEl ? viewportEl.scrollLeft : 0;
  const keepScrollTop = viewportEl ? viewportEl.scrollTop : 0;
  if (recordHistory) pushHistorySnapshot();
  const payload = getCurrentLayout();
  if (autoSaveEnabled) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    try {
      await persistCurrentDocument(payload);
    } catch (err) {
      console.error("Failed to persist document:", err);
    }
  }
  saveViewportState();
  if (viewportEl) {
    viewportEl.scrollLeft = keepScrollLeft;
    viewportEl.scrollTop = keepScrollTop;
  }
}

function applyLayout(data) {
  if (!data || (!Array.isArray(data.windows) && !Array.isArray(data.shapes))) return false;
  const layout = migrateLayout(data);
  clearSelection();
  closeFileModal();
  desktop.innerHTML = "";
  zoom = clamp(Number(layout.zoom) || 1, 0.4, 2);
  zCounter = Number(layout.zCounter) || 10;
  windowCounter = Number(layout.windowCounter) || 1;
  shapeCounter = Number(layout.shapeCounter) || 1;
  connectors.length = 0;
  (layout.windows || []).forEach((w) => {
    try {
      createSheetWindow(repairPossiblyBrokenSheetUrl(w.src), w, false);
    } catch (err) {
      console.error("Failed to restore window:", w, err);
    }
  });
  (layout.shapes || []).forEach((s) => {
    try {
      if (s.type === "shape-rect") createShapeRectangle(s, false);
      else if (s.type === "shape-note") createShapeNote(s, false);
      else if (s.type === "shape-line") createShapeLine(s, false);
      else if (s.type === "shape-table") createShapeTable(s, false);
    } catch (err) {
      console.error("Failed to restore shape:", s, err);
    }
  });
  (layout.connectors || []).forEach((c) => connectors.push(c));
  ensureUniqueConnectorIds();
  updateDesktopExtent();
  applyZoom();
  renderConnectors();
  return true;
}

async function loadLocalLayout() {
  if (currentUser) return false;
  return loadCurrentDocument();
}

async function loadRemoteLayout() {
  if (!currentUser) return false;
  try {
    await loadDocumentsIndex();
    return loadCurrentDocument();
  } catch {
    return false;
  }
}

async function initAuth() {
  try {
    const res = await fetch("/api/me");
    const data = await res.json();
    if (data.authenticated) {
      currentUser = data;
      userLabel.textContent = data.name || data.email;
      authBtn.textContent = "Выйти";
      currentDocumentId = data.activeDocumentId || currentDocumentId;
      currentDocumentName = data.activeDocumentName || currentDocumentName;
      documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    } else {
      currentUser = null;
      userLabel.textContent = "Гость";
      authBtn.textContent = "Войти через Google";
    }
  } catch { currentUser = null; }
  authBtn.onclick = async () => {
    if (!currentUser) { window.location.href = "/auth/google"; return; }
    await fetch("/auth/logout", { method: "POST" }); window.location.reload();
  };
}

async function handleFileCreate() {
  let name = "Новый документ";
  try {
    const prompted = window.prompt("Название нового документа:", "Новый документ");
    if (prompted !== null && String(prompted).trim()) name = String(prompted).trim();
  } catch {
    // Some embedded browsers suppress native prompts; fall back to a default name.
  }
  try {
    try {
      await persistCurrentDocument();
    } catch (persistErr) {
      console.warn("Не удалось сохранить текущий документ перед созданием нового:", persistErr);
    }
    await createDocumentRecord(name, "new");
    await loadCurrentDocument();
    resetViewportToOrigin();
    await loadDocumentsIndex();
    closeFileModal();
    showHint(`Создан документ: ${currentDocumentName}`, "warning", 1800);
  } catch (err) {
    console.error(err);
    showHint("Не удалось создать документ.", "error", 2500);
  }
}

async function handleFileCopy() {
  if (!currentDocumentId) return;
  const suggested = `${currentDocumentName || "Рабочий стол"} копия`;
  let name = suggested;
  try {
    const prompted = window.prompt("Название копии документа:", suggested);
    if (prompted !== null && String(prompted).trim()) name = String(prompted).trim();
  } catch {
    // Fallback to the suggested copy name if the native prompt is unavailable.
  }
  try {
    await persistCurrentDocument();
    await createDocumentRecord(name, "copy");
    await loadCurrentDocument();
    resetViewportToOrigin();
    await loadDocumentsIndex();
    closeFileModal();
    showHint(`Создана копия: ${currentDocumentName}`, "warning", 1800);
  } catch (err) {
    console.error(err);
    showHint("Не удалось скопировать документ.", "error", 2500);
  }
}

async function handleFileDelete() {
  if (!currentDocumentId) return;
  const ok = window.confirm(`Удалить документ "${currentDocumentName || "без названия"}"?`);
  if (!ok) return;
  try {
    await persistCurrentDocument();
    await deleteDocumentRecord(currentDocumentId);
    await loadDocumentsIndex();
    await loadCurrentDocument();
    closeFileModal();
    showHint("Документ удалён.", "warning", 1800);
  } catch (err) {
    console.error(err);
    showHint("Не удалось удалить документ.", "error", 2500);
  }
}

async function handleFileOpen() {
  try {
    await loadDocumentsIndex();
    openFileModal("Открыть документ");
  } catch (err) {
    console.error(err);
    showHint("Не удалось открыть список документов.", "error", 2500);
  }
}

function syncFormatPanel() {
  if (!formatToggle.checked) return;
  setControlVisibilityByMode(getSelectionMode());
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    fpBorder.value = c.color || "#1f2937";
    fpBorderWidth.value = Math.max(1, Number(c.width) || 2);
    if (fpBorderWidthNum) fpBorderWidthNum.value = fpBorderWidth.value;
    if (fpLineStyle) fpLineStyle.value = c.lineStyle || "solid";
    if (fpConnGapStart) fpConnGapStart.value = String(Number(c.gapStart ?? c.gap ?? 30));
    if (fpConnGapEnd) fpConnGapEnd.value = String(Number(c.gapEnd ?? c.gap ?? 30));
    setArrowShapeButtons(fpArrowStartShape, c.startArrowShape || "classic");
    setArrowShapeButtons(fpArrowEndShape, c.endArrowShape || "classic");
    updateFormatPanelVisuals();
    return;
  }
  if (selectedWindow) {
    fpX.value = selectedWindow.offsetLeft;
    fpY.value = selectedWindow.offsetTop;
    fpW.value = selectedWindow.offsetWidth;
    fpH.value = selectedWindow.offsetHeight;
    return;
  }
  if (!selectedShape) return;
  if (selectedShape.dataset.shapeType === "shape-table") {
    if (selectedShape.__tableApi && selectedShape.__tableApi.syncToFormatPanel) {
      selectedShape.__tableApi.syncToFormatPanel();
    }
    return;
  }
  const cs = getComputedStyle(selectedShape);
  const text = selectedShape.querySelector(".shape-text");
  const fillState = getFillStyleFromNode(selectedShape, "#ffffff");
  if (fpFillEnabled) fpFillEnabled.checked = fillState.fillEnabled;
  if (fpGradientEnabled) fpGradientEnabled.checked = fillState.gradientEnabled;
  fpFill.value = fillState.fill1;
  if (fpFill2) fpFill2.value = fillState.fill2;
  if (fpFillType) fpFillType.value = fillState.fillDirection;
  fpBorder.value = rgbToHex(cs.borderColor);
  const shapeBorderWidth = Math.max(0, Number(selectedShape.dataset.borderWidth || cs.borderWidth || 1) || 0);
  fpBorderWidth.value = String(shapeBorderWidth);
  if (fpBorderWidthNum) fpBorderWidthNum.value = fpBorderWidth.value;
  const shapeBorderEnabled = selectedShape.dataset.borderEnabled != null ? selectedShape.dataset.borderEnabled === "1" : parseInt(cs.borderWidth || "1", 10) > 0;
  if (fpBorderEnabled) fpBorderEnabled.checked = shapeBorderEnabled;
  fpRadius.value = parseInt(cs.borderRadius || "0", 10);
  if (fpRadiusNum) fpRadiusNum.value = fpRadius.value;
  fpOpacity.value = Math.round(Number(cs.opacity) * 100);
  if (fpOpacityNum) fpOpacityNum.value = fpOpacity.value;
  fpShadow.value = String(Number(selectedShape.dataset.shadow ?? parseShadowValue(selectedShape.style.boxShadow || cs.boxShadow)) || 0);
  if (fpShadowNum) fpShadowNum.value = fpShadow.value;
  fpX.value = selectedShape.offsetLeft;
  fpY.value = selectedShape.offsetTop;
  fpW.value = selectedShape.offsetWidth;
  fpH.value = selectedShape.offsetHeight;
  const m = (selectedShape.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/);
  fpAngle.value = m ? Number(m[1]).toFixed(0) : 0;
  if (text) {
    const tc = getComputedStyle(text);
    setFontSelectValue(fpFontFamily, tc.fontFamily || "Arial");
    fpTextColor.value = rgbToHex(tc.color);
    fpFontSize.value = parseInt(tc.fontSize || "16", 10);
    fpBold.checked = tc.fontWeight === "700";
    if (fpItalic) fpItalic.checked = tc.fontStyle === "italic";
    if (fpStrike) fpStrike.checked = (tc.textDecoration || "none").includes("line-through");
    if (fpUnderline) fpUnderline.checked = (tc.textDecoration || "none").includes("underline");
    if (fpNumberGrouping) fpNumberGrouping.checked = getNumberGroupingEnabled(text);
    if (fpWrap) fpWrap.checked = (tc.whiteSpace || "pre-wrap") !== "nowrap";
    setAlignButtons(text.dataset.halign || "left", text.dataset.valign || "top");
  }
  updateFormatPanelVisuals();
}

function updateFormatPanelVisuals() {
  if (fpBorderHex && fpBorder) fpBorderHex.textContent = (fpBorder.value || "#000000").toUpperCase();
  const borderDot = document.querySelector(".fp-border-dot");
  if (borderDot && fpBorder) borderDot.style.background = fpBorder.value;
  const paintColorPreview = (input, fallback = "#ffffff") => {
    if (!input) return;
    const button = input.closest(".fp-color-button");
    const preview = button ? button.querySelector(".fp-color-preview") : null;
    if (preview) preview.style.background = input.value || fallback;
  };
  paintColorPreview(fpFill, "#ffffff");
  paintColorPreview(fpFill2, fpFill ? fpFill.value : "#ffffff");
  paintColorPreview(fpBorder, "#000000");
  if (fpGradientWrap) {
    fpGradientWrap.classList.remove("hidden");
  }
}

function applyFormat() {
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    c.color = fpBorder.value;
    c.width = Math.max(1, Number(fpBorderWidth.value) || 2);
    c.lineStyle = fpLineStyle ? fpLineStyle.value : "solid";
    c.gapStart = Math.max(0, Number(fpConnGapStart ? fpConnGapStart.value : 30) || 0);
    c.gapEnd = Math.max(0, Number(fpConnGapEnd ? fpConnGapEnd.value : 30) || 0);
    c.startArrowShape = getArrowShapeButtonsValue(fpArrowStartShape);
    c.endArrowShape = getArrowShapeButtonsValue(fpArrowEndShape);
    renderConnectors();
    syncFormatPanel();
    saveLayout();
    return;
  }
  if (selectedWindow) {
    selectedWindow.style.left = `${Math.max(0, Number(fpX.value) || 0)}px`;
    selectedWindow.style.top = `${Math.max(0, Number(fpY.value) || 0)}px`;
    selectedWindow.style.width = `${Math.max(360, Number(fpW.value) || 360)}px`;
    selectedWindow.style.height = `${Math.max(240, Number(fpH.value) || 240)}px`;
    layoutConnectorPoints(selectedWindow);
    renderConnectors();
    saveLayout();
    return;
  }
  if (!selectedShape) return;
  if (selectedShape.dataset.shapeType === "shape-table") {
    if (selectedShape.__tableApi && selectedShape.__tableApi.applyFromFormatPanel) {
      const changed = selectedShape.__tableApi.applyFromFormatPanel();
      if (changed) {
        syncFormatPanel();
        saveLayout();
      }
    }
    return;
  }
  const text = selectedShape.querySelector(".shape-text");
  const fillEnabled = fpFillEnabled ? fpFillEnabled.checked : true;
  const gradientEnabled = fillEnabled && fpGradientEnabled ? fpGradientEnabled.checked : false;
  const fillDirection = fpFillType ? fpFillType.value : "horizontal";
  const fill2 = fpFill2 ? fpFill2.value : fpFill.value;
  applyFillStyle(selectedShape, {
    fillEnabled,
    gradientEnabled,
    fill1: fpFill.value,
    fill2,
    fillDirection
  });
  const lineEnabled = fpBorderEnabled ? fpBorderEnabled.checked : true;
  const borderWidth = Math.max(0, Number(fpBorderWidth.value) || 0);
  selectedShape.style.border = lineEnabled ? `${Math.max(1, borderWidth)}px solid ${fpBorder.value}` : "0px solid transparent";
  selectedShape.style.borderColor = fpBorder.value;
  selectedShape.dataset.borderWidth = String(borderWidth);
  selectedShape.dataset.borderEnabled = lineEnabled ? "1" : "0";
  selectedShape.style.borderWidth = lineEnabled ? `${Math.max(1, borderWidth)}px` : "0px";
  selectedShape.style.borderStyle = "solid";
  selectedShape.style.borderRadius = `${fpRadius.value}px`;
  selectedShape.style.opacity = `${Number(fpOpacity.value) / 100}`;
  applyNodeShadow(selectedShape, fpShadow ? fpShadow.value : 0);
  if (selectedShape.dataset.shapeType === "shape-line") {
    selectedShape.style.backgroundImage = "none";
    selectedShape.style.background = lineEnabled ? fpBorder.value : "transparent";
  }
  selectedShape.style.left = `${Math.max(0, Number(fpX.value) || 0)}px`;
  selectedShape.style.top = `${Math.max(0, Number(fpY.value) || 0)}px`;
  selectedShape.style.width = `${Math.max(20, Number(fpW.value) || 20)}px`;
  selectedShape.style.height = `${Math.max(2, Number(fpH.value) || 2)}px`;
  selectedShape.dataset.rotate = String(Number(fpAngle.value) || 0);
  applyTransformState(selectedShape);
  if (selectedShape.dataset.shapeType === "shape-line") {
    selectedShape.style.height = `${Math.max(1, Number(fpBorderWidth.value) || 1)}px`;
    selectedShape.style.background = lineEnabled ? fpBorder.value : "transparent";
  }
  if (text) {
    if (fpFontFamily) text.style.fontFamily = fontCssFromKey(fpFontFamily.value);
    text.style.color = fpTextColor.value;
    text.style.fontSize = `${Math.max(8, Number(fpFontSize.value) || 8)}px`;
    text.style.fontWeight = fpBold.checked ? "700" : "400";
    if (fpItalic) text.style.fontStyle = fpItalic.checked ? "italic" : "normal";
    {
      const textDeco = [];
      if (fpStrike && fpStrike.checked) textDeco.push("line-through");
      if (fpUnderline && fpUnderline.checked) textDeco.push("underline");
      text.style.textDecoration = textDeco.length ? textDeco.join(" ") : "none";
    }
    text.dataset.numberGrouping = fpNumberGrouping && fpNumberGrouping.checked ? "1" : "0";
    if (fpWrap) text.style.whiteSpace = fpWrap.checked ? "pre-wrap" : "nowrap";
    renderShapeText(text);
  }
  layoutConnectorPoints(selectedShape);
  renderConnectors();
  saveLayout();
}

function openFormatTab(name) {
  const tabs = [tabStyle, tabText, tabOrder].filter(Boolean);
  const panels = [panelStyle, panelText, panelOrder].filter(Boolean);
  tabs.forEach((t) => t.classList.remove("active"));
  panels.forEach((p) => p.classList.add("hidden"));
  if (name === "style") { if (tabStyle) tabStyle.classList.add("active"); if (panelStyle) panelStyle.classList.remove("hidden"); }
  if (name === "text") { if (tabText) tabText.classList.add("active"); if (panelText) panelText.classList.remove("hidden"); }
  if (name === "order") { if (tabOrder) tabOrder.classList.add("active"); if (panelOrder) panelOrder.classList.remove("hidden"); }
}

function submitAddWindow() {
  const raw = (modalSheetUrl.value || "").trim();
  if (!raw) { showHint("Вставь URL таблицы перед добавлением.", "error"); return; }
  if (/docs\.google\.com\/spreadsheets\/.+\/edit/i.test(raw)) showHint("Google edit-ссылка может не встраиваться полностью. Для полного редактирования используй \"Открыть\".", "warning");
  else showHint("Если встройка недоступна, открой таблицу кнопкой \"Открыть\".", "warning");
  createSheetWindow(raw);
  closeAddModal();
}

addWindowBtn.addEventListener("click", openAddModal);
modalCancelBtn.addEventListener("click", closeAddModal);
modalCreateBtn.addEventListener("click", submitAddWindow);
modal.addEventListener("click", (e) => { if (e.target === modal) closeAddModal(); });
modalSheetUrl.addEventListener("keydown", (e) => { if (e.key === "Enter") submitAddWindow(); if (e.key === "Escape") closeAddModal(); });

safeOn(fileMenuBtn, "click", (e) => {
  e.stopPropagation();
  toggleFileMenu();
});
safeOn(fileCreateBtn, "click", async (e) => {
  e.stopPropagation();
  toggleFileMenu(false);
  await handleFileCreate();
});
safeOn(fileOpenBtn, "click", async (e) => {
  e.stopPropagation();
  toggleFileMenu(false);
  await handleFileOpen();
});
safeOn(fileDeleteBtn, "click", async (e) => {
  e.stopPropagation();
  toggleFileMenu(false);
  await handleFileDelete();
});
safeOn(fileCopyBtn, "click", async (e) => {
  e.stopPropagation();
  toggleFileMenu(false);
  await handleFileCopy();
});
safeOn(fileAutosaveToggle, "change", () => {
  setAutosaveEnabled(!!fileAutosaveToggle.checked);
  showHint(autoSaveEnabled ? "Автоматическое сохранение включено." : "Автоматическое сохранение выключено.", "warning", 1800);
});
safeOn(fileModalCloseBtn, "click", closeFileModal);
safeOn(fileModal, "click", (e) => {
  if (e.target === fileModal) closeFileModal();
});

desktop.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".shape")) return;
  if (e.target.closest(".sheet-window")) return;
  if (e.target.closest(".conn-line")) return;
  clearSelection();
});
document.addEventListener("click", (e) => {
  if (!fileMenuDropdown) return;
  if (e.target.closest("#fileMenuBtn") || e.target.closest("#fileMenuDropdown")) return;
  toggleFileMenu(false);
});
document.addEventListener("pointermove", (e) => {
  if (!connectorDraft) return;
  const dr = desktop.getBoundingClientRect();
  connectorDraft.x2 = (e.clientX - dr.left) / zoom;
  connectorDraft.y2 = (e.clientY - dr.top) / zoom;
  renderConnectors();
});
document.addEventListener("pointerup", (e) => {
  if (!connectorDraft) return;
  if (connectorDragOverlay) connectorDragOverlay.style.display = "none";
  const target = document.elementFromPoint(e.clientX, e.clientY);
  const targetPoint = target && target.closest ? target.closest(".conn-point") : null;
  const targetShape = target && target.closest ? target.closest(".shape, .sheet-window") : null;
  if (targetShape) {
    const dropX = (e.clientX - desktop.getBoundingClientRect().left) / zoom;
    const dropY = (e.clientY - desktop.getBoundingClientRect().top) / zoom;
    const toData = targetPoint
      ? { anchor: targetPoint.dataset.anchor }
      : getDropAnchorForShape(targetShape, dropX, dropY);
    if (targetShape.dataset.connId !== connectorDraft.fromNodeId || toData.anchor !== connectorDraft.fromAnchor) {
      connectors.push({
        id: nextConnectorId(),
        from: { nodeId: connectorDraft.fromNodeId, anchor: connectorDraft.fromAnchor },
        to: toData.anchor === "edge"
          ? { nodeId: targetShape.dataset.connId, anchor: "edge", rx: toData.rx, ry: toData.ry }
          : { nodeId: targetShape.dataset.connId, anchor: toData.anchor },
        color: "#1f2937",
        width: 2,
        lineStyle: "solid",
        startArrowShape: "line",
        endArrowShape: "classic",
        gapStart: 30,
        gapEnd: 30
      });
      saveLayout();
    }
  }
  connectorDraft = null;
  if (connectorDragOverlay) connectorDragOverlay.style.display = "none";
  renderConnectors();
});

safeOn(formatToggle, "change", () => {
  if (formatToggle.checked && (selectedShape || selectedConnector || selectedWindow)) { formatPanel.classList.remove("hidden"); clampPanelIntoViewport(); syncFormatPanel(); }
  else formatPanel.classList.add("hidden");
});
function bindRangeAndNumber(rangeEl, numEl) {
  if (!rangeEl || !numEl) return;
  const syncNum = () => { numEl.value = rangeEl.value; };
  const syncRange = () => {
    const min = Number(numEl.min || rangeEl.min || 0);
    const max = Number(numEl.max || rangeEl.max || 9999);
    const v = clamp(Number(numEl.value), min, max);
    numEl.value = String(v);
    rangeEl.value = String(v);
  };
  rangeEl.addEventListener("input", syncNum);
  rangeEl.addEventListener("change", syncNum);
  numEl.addEventListener("input", syncRange);
  numEl.addEventListener("change", syncRange);
}
bindRangeAndNumber(fpBorderWidth, fpBorderWidthNum);
bindRangeAndNumber(fpRadius, fpRadiusNum);
bindRangeAndNumber(fpOpacity, fpOpacityNum);
bindRangeAndNumber(fpShadow, fpShadowNum);
safeOn(fpFillEnabled, "input", () => {
  clearControlMixedState(fpFillEnabled);
  if (fpFillEnabled && !fpFillEnabled.checked && fpGradientEnabled) fpGradientEnabled.checked = false;
  updateFormatPanelVisuals();
  applyFormat();
});
safeOn(fpFillEnabled, "change", () => {
  clearControlMixedState(fpFillEnabled);
  if (fpFillEnabled && !fpFillEnabled.checked && fpGradientEnabled) fpGradientEnabled.checked = false;
  updateFormatPanelVisuals();
  applyFormat();
});
safeOn(fpGradientEnabled, "input", () => {
  clearControlMixedState(fpGradientEnabled);
  if (fpGradientEnabled && fpGradientEnabled.checked && fpFillEnabled) fpFillEnabled.checked = true;
  updateFormatPanelVisuals();
  applyFormat();
});
safeOn(fpGradientEnabled, "change", () => {
  clearControlMixedState(fpGradientEnabled);
  if (fpGradientEnabled && fpGradientEnabled.checked && fpFillEnabled) fpFillEnabled.checked = true;
  updateFormatPanelVisuals();
  applyFormat();
});
safeOn(fpTextScale, "input", () => {
  clearControlMixedState(fpTextScale);
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table") return;
  if (selectedShape.__tableApi && selectedShape.__tableApi.applyFromFormatPanel) {
    selectedShape.__tableApi.applyFromFormatPanel();
  } else {
    selectedShape.dataset.tableTextScale = fpTextScale && fpTextScale.checked ? "1" : "0";
  }
  saveLayout();
});
safeOn(fpTextScale, "change", () => {
  clearControlMixedState(fpTextScale);
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table") return;
  if (selectedShape.__tableApi && selectedShape.__tableApi.applyFromFormatPanel) {
    selectedShape.__tableApi.applyFromFormatPanel();
  } else {
    selectedShape.dataset.tableTextScale = fpTextScale && fpTextScale.checked ? "1" : "0";
  }
  saveLayout();
});
[
  fpFill, fpFill2, fpFillType, fpBorder, fpBorderEnabled, fpBorderWidth, fpBorderWidthNum, fpRadius, fpRadiusNum, fpTextColor, fpFontFamily, fpFontSize,
  fpBold, fpItalic, fpStrike, fpUnderline, fpWrap, fpNumberGrouping, fpAutoSize, fpCellBorders, fpOpacity, fpOpacityNum, fpShadow, fpShadowNum, fpX, fpY, fpW, fpH, fpAngle, fpLineStyle, fpConnGapStart, fpConnGapEnd
].filter(Boolean).forEach((ctrl) => {
  ctrl.addEventListener("input", () => clearControlMixedState(ctrl));
  ctrl.addEventListener("change", () => clearControlMixedState(ctrl));
  ctrl.addEventListener("input", applyFormat);
  ctrl.addEventListener("change", applyFormat);
});
[fpFill, fpFill2, fpFillType, fpBorder].filter(Boolean).forEach((ctrl) => {
  ctrl.addEventListener("input", updateFormatPanelVisuals);
  ctrl.addEventListener("change", updateFormatPanelVisuals);
});
updateFormatPanelVisuals();
if (fpArrowStartShape) {
  fpArrowStartShape.querySelectorAll(".fp-arrow-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      setArrowShapeButtons(fpArrowStartShape, btn.dataset.shape || "classic");
      applyFormat();
    });
  });
}
if (fpArrowEndShape) {
  fpArrowEndShape.querySelectorAll(".fp-arrow-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      setArrowShapeButtons(fpArrowEndShape, btn.dataset.shape || "classic");
      applyFormat();
    });
  });
}
safeOn(fpFront, "click", () => {
  const target = selectedShape || selectedWindow;
  if (!target) return;
  bringToFront(target);
  saveLayout();
  syncFormatPanel();
});
safeOn(fpBack, "click", () => {
  const target = selectedShape || selectedWindow;
  if (!target) return;
  target.style.zIndex = "1";
  saveLayout();
  syncFormatPanel();
});
safeOn(fpAddCol, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.addColumnAfterSelection()) saveLayout();
});
safeOn(fpDelCol, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.deleteSelectedColumns()) saveLayout();
});
safeOn(fpAddRow, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.addRowAfterSelection()) saveLayout();
});
safeOn(fpDelRow, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.deleteSelectedRows()) saveLayout();
});
safeOn(fpRotateRight, "click", () => {
  if (!rotateSelection(90)) showFeatureHint("Поворот");
  syncFormatPanel();
});
safeOn(fpCollapseBtn, "click", toggleFormatPanelCollapsed);
safeOn(fpFlipH, "click", () => {
  if (!flipSelection("x")) showFeatureHint("Отражение");
  syncFormatPanel();
});
safeOn(fpFlipV, "click", () => {
  if (!flipSelection("y")) showFeatureHint("Отражение");
  syncFormatPanel();
});
safeOn(fpSnapGrid, "click", () => {
  if (!snapSelectionToGrid()) showFeatureHint("Привязка к сетке");
  syncFormatPanel();
});
safeOn(fpDistributeH, "click", () => showFeatureHint("Горизонтальное распределение"));
safeOn(fpDistributeV, "click", () => showFeatureHint("Вертикальное распределение"));
safeOn(fpGroup, "click", () => showFeatureHint("Группировка"));
safeOn(fpLock, "click", () => showFeatureHint("Блокировка"));
safeOn(fpCopyStyle, "click", () => {
  if (copyCurrentStyle()) showHint("Стиль скопирован и будет применен к новым объектам.", "warning", 2200);
  else showFeatureHint("Копирование стиля");
});
safeOn(fpDefaultStyle, "click", () => {
  if (setCurrentStyleAsDefault()) showHint("Стиль сохранен как стиль по умолчанию.", "warning", 2200);
  else showFeatureHint("Стиль по умолчанию");
});
safeOn(tabStyle, "click", () => openFormatTab("style"));
safeOn(tabText, "click", () => openFormatTab("text"));
safeOn(tabOrder, "click", () => openFormatTab("order"));
safeOn(fpClose, "click", () => formatPanel.classList.add("hidden"));
safeOn(fpCancelBtn, "click", () => {
  formatPanel.classList.add("hidden");
  syncFormatPanel();
});
safeOn(fpApplyBtn, "click", () => applyFormat());
safeOn(fpResetBtn, "click", () => {
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    c.color = "#1f2937";
    c.width = 2;
    c.lineStyle = "solid";
    c.startArrowShape = "line";
    c.endArrowShape = "classic";
    c.gapStart = 30;
    c.gapEnd = 30;
    renderConnectors();
    saveLayout();
    syncFormatPanel();
    return;
  }
  if (selectedShape) {
    const text = selectedShape.querySelector(".shape-text");
    selectedShape.style.background = selectedShape.dataset.shapeType === "shape-note" ? "#fff7a8" : "#fff";
    selectedShape.style.borderColor = selectedShape.dataset.shapeType === "shape-note" ? "#d1c76a" : "#000";
    selectedShape.style.borderWidth = "1px";
    selectedShape.style.borderRadius = "0px";
    selectedShape.style.opacity = "1";
    selectedShape.dataset.rotate = "0";
    selectedShape.dataset.flipX = "0";
    selectedShape.dataset.flipY = "0";
    applyTransformState(selectedShape);
    if (text) {
      text.style.color = "#000";
      text.style.fontSize = "16px";
      text.style.fontWeight = "400";
      text.style.fontStyle = "normal";
      text.style.textDecoration = "none";
      text.style.whiteSpace = "pre-wrap";
      text.style.fontFamily = FONT_STACKS.Arial;
    }
    renderConnectors();
    saveLayout();
    syncFormatPanel();
  }
});

function applyAlignButtonsForCurrentSelection(h, v) {
  if (!selectedShape) return;
  if (selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableApi) {
    setAlignButtons(h, v);
    const changed = selectedShape.__tableApi.applyFromFormatPanel();
    if (changed) saveLayout();
    syncFormatPanel();
    return;
  }
  const t = selectedShape.querySelector(".shape-text");
  if (!t) return;
  applyTextAlign(t, h, v);
  setAlignButtons(h, v);
  saveLayout();
}
safeOn(fpAlignLeft, "click", () => applyAlignButtonsForCurrentSelection("left", (selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpVTop && fpVTop.classList.contains("active") ? "top" : (fpVBottom && fpVBottom.classList.contains("active") ? "bottom" : "middle")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.valign || "top") : "top")));
safeOn(fpAlignCenter, "click", () => applyAlignButtonsForCurrentSelection("center", (selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpVTop && fpVTop.classList.contains("active") ? "top" : (fpVBottom && fpVBottom.classList.contains("active") ? "bottom" : "middle")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.valign || "top") : "top")));
safeOn(fpAlignRight, "click", () => applyAlignButtonsForCurrentSelection("right", (selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpVTop && fpVTop.classList.contains("active") ? "top" : (fpVBottom && fpVBottom.classList.contains("active") ? "bottom" : "middle")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.valign || "top") : "top")));
safeOn(fpVTop, "click", () => applyAlignButtonsForCurrentSelection((selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpAlignCenter && fpAlignCenter.classList.contains("active") ? "center" : (fpAlignRight && fpAlignRight.classList.contains("active") ? "right" : "left")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.halign || "left") : "left"), "top"));
safeOn(fpVMiddle, "click", () => applyAlignButtonsForCurrentSelection((selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpAlignCenter && fpAlignCenter.classList.contains("active") ? "center" : (fpAlignRight && fpAlignRight.classList.contains("active") ? "right" : "left")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.halign || "left") : "left"), "middle"));
safeOn(fpVBottom, "click", () => applyAlignButtonsForCurrentSelection((selectedShape && selectedShape.dataset.shapeType === "shape-table") ? (fpAlignCenter && fpAlignCenter.classList.contains("active") ? "center" : (fpAlignRight && fpAlignRight.classList.contains("active") ? "right" : "left")) : ((selectedShape && selectedShape.querySelector(".shape-text")) ? (selectedShape.querySelector(".shape-text").dataset.halign || "left") : "left"), "bottom"));

document.querySelectorAll(".swatch").forEach((sw) => {
  sw.addEventListener("click", () => {
    if (!selectedShape) return;
    const fill = sw.getAttribute("data-fill");
    const border = sw.getAttribute("data-border");
    if (fill && fpFill) fpFill.value = fill;
    if (border && fpBorder) fpBorder.value = border;
    applyFormat();
  });
});


safeOn(shapeButton, "click", (e) => {
  e.stopPropagation();
  if (!shapeDropdown) return;
  shapeDropdown.classList.toggle("hidden");
});

(shapeDropdown ? shapeDropdown.querySelectorAll("button[data-shape]") : []).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const k = btn.dataset.shape;
    try {
      if (k === "rectangle") createShapeRectangle();
      else if (k === "line") createShapeLine();
      else if (k === "note") createShapeNote();
      else if (k === "table") createShapeTable();
    } catch (err) {
      console.error("Failed to create shape:", k, err);
      showHint("Не удалось создать фигуру. Открой Console и пришли ошибку.", "error");
    }
    if (shapeDropdown) shapeDropdown.classList.add("hidden");
  });
});

document.addEventListener("click", (e) => {
  if (!shapeDropdown) return;
  if (e.target.closest("#shapeButton") || e.target.closest("#shapeDropdown")) return;
  shapeDropdown.classList.add("hidden");
});
safeOn(themeLightBtn, "click", () => setTheme("light"));
safeOn(themeDarkBtn, "click", () => setTheme("dark"));

safeOn(undoBtn, "click", undoAction);
safeOn(redoBtn, "click", redoAction);

document.addEventListener("keydown", (e) => {
  const target = e.target;
  const typing = !!(target && (target.closest("input, textarea, select") || target.isContentEditable));
  const key = (e.key || "").toLowerCase();
  if (!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells" && selectedShape.__tableApi) {
    const sel = selectedShape.__tableApi.getSelection();
    const cell = sel.activeCell || sel.cells[0];
    if (!cell) return;
    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(-1, 0);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(1, 0);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(0, -1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(0, 1);
        return;
      }
    }
    if (e.metaKey || e.ctrlKey) {
      if (key === "c") {
        e.preventDefault();
        const text = selectedShape.__tableApi.getClipboardText ? selectedShape.__tableApi.getClipboardText() : (cell.dataset.raw || cell.textContent || "");
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(() => {});
        return;
      }
      if (key === "v") {
        e.preventDefault();
        const applyPaste = (text) => {
          const clean = String(text ?? "");
          if (selectedShape.__tableApi.pasteTextToSelection) selectedShape.__tableApi.pasteTextToSelection(clean);
          else selectedShape.__tableApi.beginCellEdit(cell, clean);
        };
        if (navigator.clipboard && navigator.clipboard.readText) {
          navigator.clipboard.readText().then(applyPaste).catch(() => {});
        }
        return;
      }
    }
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      if (selectedShape.__tableApi.beginCellEdit(cell, cell.dataset.raw || cell.textContent || "")) return;
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(e.shiftKey ? -1 : 1, 0);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(0, e.shiftKey ? -1 : 1);
      return;
    }
    if (cell && e.key === "Backspace") {
      e.preventDefault();
      if (selectedShape.__tableApi.clearSelectedText) {
        selectedShape.__tableApi.clearSelectedText();
      } else {
        selectedShape.__tableApi.beginCellEdit(cell, "");
      }
      return;
    }
    if (cell && isPrintableKeyEvent(e)) {
      if (selectedShape.__tableApi.beginCellEdit(cell, e.key)) {
        e.preventDefault();
        return;
      }
    }
  } else if (!typing && selectedShape && selectedShape.querySelector(".shape-text")) {
    const text = selectedShape.querySelector(".shape-text");
    const currentText = text ? (text.dataset.rawText || text.innerText || "") : "";
    if (!text) return;
    if (e.metaKey || e.ctrlKey) {
      if (key === "c") {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(currentText).catch(() => {});
        return;
      }
      if (key === "v") {
        e.preventDefault();
        const applyPaste = (pasteText) => {
          startInlineShapeEditing(selectedShape, String(pasteText ?? ""));
        };
        if (navigator.clipboard && navigator.clipboard.readText) {
          navigator.clipboard.readText().then(applyPaste).catch(() => {});
        }
        return;
      }
    }
    if (e.key === " " || e.code === "Space" || e.key === "Enter") {
      e.preventDefault();
      startInlineShapeEditing(selectedShape, currentText);
      return;
    }
    if (isPrintableKeyEvent(e)) {
      e.preventDefault();
      startInlineShapeEditing(selectedShape, e.key);
      return;
    }
  } else if (!typing && isPrintableKeyEvent(e)) {
    if (selectedShape) {
      const text = selectedShape.querySelector(".shape-text");
      if (text) {
        e.preventDefault();
        startInlineShapeEditing(selectedShape, e.key);
        return;
      }
    }
  }
  if (!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells") {
    return;
  }
  if (!typing && (e.key === "Delete" || e.key === "Backspace")) {
    if (selectedShape || selectedConnector) {
      e.preventDefault();
      deleteSelected();
    }
    return;
  }
  const mod = e.metaKey || e.ctrlKey;
  if (!mod) return;
  if (!typing && key === "z" && !e.shiftKey) {
    e.preventDefault();
    undoAction();
    return;
  }
  if (!typing && ((key === "z" && e.shiftKey) || (key === "y" && e.ctrlKey))) {
    e.preventDefault();
    redoAction();
  }
});

function zoomAroundClientPoint(clientX, clientY, nextZoom) {
  const prevZoom = zoom;
  const vz = viewportEl.getBoundingClientRect();
  const px = clientX - vz.left + viewportEl.scrollLeft;
  const py = clientY - vz.top + viewportEl.scrollTop;
  const worldX = px / prevZoom;
  const worldY = py / prevZoom;
  zoom = clamp(nextZoom, 0.4, 2);
  applyZoom();
  viewportEl.scrollLeft = worldX * zoom - (clientX - vz.left);
  viewportEl.scrollTop = worldY * zoom - (clientY - vz.top);
}

zoomInBtn.addEventListener("click", () => {
  const vz = viewportEl.getBoundingClientRect();
  zoomAroundClientPoint(vz.left + vz.width / 2, vz.top + vz.height / 2, zoom * 1.05);
  saveLayout();
});
zoomOutBtn.addEventListener("click", () => {
  const vz = viewportEl.getBoundingClientRect();
  zoomAroundClientPoint(vz.left + vz.width / 2, vz.top + vz.height / 2, zoom / 1.05);
  saveLayout();
});
resetZoomBtn.addEventListener("click", () => { zoom = 1; applyZoom(); saveLayout(); });
viewportEl.addEventListener("wheel", (e) => {
  const zoomModifier = e.altKey || e.ctrlKey;
  const locked = viewportEl.dataset.scrollLock === "1";
  if (locked && !zoomModifier) {
    e.preventDefault();
    return;
  }
  if (!zoomModifier) return;
  e.preventDefault();
  const factor = Math.exp(-e.deltaY * 0.0015);
  zoomAroundClientPoint(e.clientX, e.clientY, zoom * factor);
  saveLayout();
}, { passive: false });

// Pan workspace with middle mouse button (wheel click).
viewportEl.addEventListener("pointerdown", (e) => {
  if (e.button !== 1) return;
  viewportPan = {
    x: e.clientX,
    y: e.clientY,
    left: viewportEl.scrollLeft,
    top: viewportEl.scrollTop
  };
  viewportEl.classList.add("panning");
  e.preventDefault();
});

viewportEl.addEventListener("pointermove", (e) => {
  if (!viewportPan || (e.buttons & 4) !== 4) return;
  const dx = e.clientX - viewportPan.x;
  const dy = e.clientY - viewportPan.y;
  viewportEl.scrollLeft = viewportPan.left - dx;
  viewportEl.scrollTop = viewportPan.top - dy;
});

const stopViewportPan = () => {
  if (!viewportPan) return;
  viewportPan = null;
  viewportEl.classList.remove("panning");
};
viewportEl.addEventListener("pointerup", stopViewportPan);
viewportEl.addEventListener("pointercancel", stopViewportPan);
viewportEl.addEventListener("scroll", () => {
  saveViewportState();
}, { passive: true });
viewportEl.addEventListener("pointerdown", () => {
  if (!viewportStabilizer) return;
  cancelAnimationFrame(viewportStabilizer.rafId);
  clearTimeout(viewportStabilizer.timerId);
  viewportStabilizer = null;
}, { passive: true });

(async function main() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  document.documentElement.dataset.appBuild = APP_BUILD;
  console.info(`MindMapTable build ${APP_BUILD}`);
  openFormatTab("style");
  setArrowShapeButtons(fpArrowStartShape, "classic");
  setArrowShapeButtons(fpArrowEndShape, "classic");
  initFormatPanelWindow();
  setTheme(localStorage.getItem(THEME_KEY) || "light");
  setAutosaveEnabled(localStorage.getItem(AUTOSAVE_KEY) !== "0");
  updateAutosaveIndicator();
  await initAuth();
  if (!currentUser) loadLocalDocStore();
  const loadedRemote = await loadRemoteLayout();
  const loadedLocal = loadedRemote ? true : await loadLocalLayout();
  if (!loadedLocal) {
    applyZoom();
    saveLayout();
  }
  const vpState = readViewportState();
  restoreViewportState(vpState, { repeat: 10 });
  startViewportStabilizer(vpState, 1400);
  window.addEventListener("load", () => {
    const st = readViewportState();
    restoreViewportState(st, { repeat: 8 });
    startViewportStabilizer(st, 1200);
  }, { once: true });
  window.addEventListener("beforeunload", saveViewportState);
  pushHistorySnapshot();
  updateHistoryButtons();
})();
const LAYOUT_SCHEMA_VERSION = 2;
