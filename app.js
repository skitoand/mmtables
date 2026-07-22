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
const fileActionsBtn = $("fileActionsBtn");
const fileActionsDropdown = $("fileActionsDropdown");
const fileCreateBtn = $("fileCreateBtn");
const fileOpenBtn = $("fileOpenBtn");
const fileShareBtn = $("fileShareBtn");
const fileCommentsBtn = $("fileCommentsBtn");
const fileSubmenuSection = $("fileSubmenuSection");
const shapeMenuSection = $("shapeMenuSection");
const fileDeleteBtn = $("fileDeleteBtn");
const fileCopyBtn = $("fileCopyBtn");
const fileCopyLinkBtn = $("fileCopyLinkBtn");
const fileAutosaveToggle = $("fileAutosaveToggle");
const fileModal = $("fileModal");
const fileBrowserTree = $("fileBrowserTree");
const fileBrowserPreview = $("fileBrowserPreview");
const fileBrowserInfo = $("fileBrowserInfo");
const fileBrowserNewFolderBtn = $("fileBrowserNewFolderBtn");
const fileModalOpenBtn = $("fileModalOpenBtn");
const fileModalCloseBtn = $("fileModalCloseBtn");
const authModal = $("authModal");
const authModalCloseBtn = $("authModalCloseBtn");
const authLoginTab = $("authLoginTab");
const authRegisterTab = $("authRegisterTab");
const authNameLabel = $("authNameLabel");
const authNameInput = $("authNameInput");
const authEmailInput = $("authEmailInput");
const authPasswordInput = $("authPasswordInput");
const authErrorText = $("authErrorText");
const authSubmitBtn = $("authSubmitBtn");
const profileBtn = $("profileBtn");
const profileModal = $("profileModal");
const profileModalCloseBtn = $("profileModalCloseBtn");
const profileSaveBtn = $("profileSaveBtn");
const profileTabAccountBtn = $("profileTabAccountBtn");
const profileTabIntegrationsBtn = $("profileTabIntegrationsBtn");
const profileTabAccount = $("profileTabAccount");
const profileTabIntegrations = $("profileTabIntegrations");
const profileEmailMeta = $("profileEmailMeta");
const profileAuthProviderMeta = $("profileAuthProviderMeta");
const profileNameInput = $("profileNameInput");
const profileChangePasswordBtn = $("profileChangePasswordBtn");
const profilePasswordBlock = $("profilePasswordBlock");
const profileCurrentPasswordLabel = $("profileCurrentPasswordLabel");
const profileCurrentPasswordInput = $("profileCurrentPasswordInput");
const profileNewPasswordLabel = $("profileNewPasswordLabel");
const profileNewPasswordInput = $("profileNewPasswordInput");
const profileErrorText = $("profileErrorText");
let profileActiveTab = "account";
let profilePasswordFormOpen = false;
const mcpTokenNameInput = $("mcpTokenNameInput");
const mcpCreateTokenBtn = $("mcpCreateTokenBtn");
const mcpCopyConfigBtn = $("mcpCopyConfigBtn");
const mcpTokenOnceWrap = $("mcpTokenOnceWrap");
const mcpTokenOnceInput = $("mcpTokenOnceInput");
const mcpCopyTokenBtn = $("mcpCopyTokenBtn");
const mcpConfigPreview = $("mcpConfigPreview");
const mcpTokenList = $("mcpTokenList");
const mcpIntegrationStatus = $("mcpIntegrationStatus");
let mcpConfigCache = null;
let mcpCreatedToken = "";
const shareModal = $("shareModal");
const shareModalCloseBtn = $("shareModalCloseBtn");
const shareModalDoneBtn = $("shareModalDoneBtn");
const shareModalTitle = $("shareModalTitle");
const shareEmailInput = $("shareEmailInput");
const shareSuggestions = $("shareSuggestions");
const shareAccessList = $("shareAccessList");
const shareGeneralSelect = $("shareGeneralSelect");
const shareGeneralIcon = $("shareGeneralIcon");
const shareGeneralHint = $("shareGeneralHint");
const shareGeneralRole = $("shareGeneralRole");
const sharePublicCopyBtn = $("sharePublicCopyBtn");
const shareSearchLabel = shareEmailInput ? shareEmailInput.closest(".share-search") : null;
let sharePublicLinkInfo = null;
let shareModalDocName = "";
let shareAccessCache = [];
let shareContactsCache = [];
let shareSuggestionsOpen = false;
const commentsModal = $("commentsModal");
const commentsModalCloseBtn = $("commentsModalCloseBtn");
const commentsDocMeta = $("commentsDocMeta");
const commentsList = $("commentsList");
const commentsComposer = $("commentsComposer");
const commentsAnchorHint = $("commentsAnchorHint");
const commentsInput = $("commentsInput");
const commentsAddBtn = $("commentsAddBtn");
const shapeButton = $("shapeButton");
const shapeDropdown = $("shapeDropdown");
const csvImportInput = $("csvImportInput");
const imageImportInput = $("imageImportInput");
const sheetSwitcher = $("sheetSwitcher");
const sheetSwitcherToggle = $("sheetSwitcherToggle");
const sheetSwitcherCurrent = $("sheetSwitcherCurrent");
const sheetSwitcherPanel = $("sheetSwitcherPanel");
const sheetSwitcherList = $("sheetSwitcherList");
const sheetSwitcherAdd = $("sheetSwitcherAdd");
const themeLightBtn = $("themeLightBtn");
const themeDarkBtn = $("themeDarkBtn");
const themeDarkToggle = $("themeDarkToggle");
const objectsToggle = $("objectsToggle");
const objectsToggleLabel = objectsToggle ? objectsToggle.closest("label") : null;
const objectsToolbar = $("objectsToolbar");
const zoomLabel = $("zoomLabel");
const undoBtn = $("undoBtn");
const redoBtn = $("redoBtn");
const zoomInBtn = $("zoomInBtn");
const zoomOutBtn = $("zoomOutBtn");
const resetZoomBtn = $("resetZoomBtn");
const authBtn = $("authBtn");
const userLabel = $("userLabel");
const currentDocumentTitle = $("currentDocumentTitle");
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
const fpConnRouteStyle = $("fpConnRouteStyle");
const fpConnGapStart = $("fpConnGapStart");
const fpConnGapEnd = $("fpConnGapEnd");
const fpConnGapStartNum = $("fpConnGapStartNum");
const fpConnGapEndNum = $("fpConnGapEndNum");
const fpArrowStartShape = $("fpArrowStartShape");
const fpArrowEndShape = $("fpArrowEndShape");
const fpTextColor = $("fpTextColor");
const fpFontFamily = $("fpFontFamily");
const fpFontSize = $("fpFontSize");
const fpFontDecrease = $("fpFontDecrease");
const fpFontIncrease = $("fpFontIncrease");
const fpBold = $("fpBold");
const fpItalic = $("fpItalic");
const fpStrike = $("fpStrike");
const fpUnderline = $("fpUnderline");
const fpWrap = $("fpWrap");
const fpScroll = $("fpScroll");
const fpCellBorders = $("fpCellBorders");
const fpNumberGrouping = $("fpNumberGrouping");
const fpNumberFormat = $("fpNumberFormat");
const fpFormulaDecimals = $("fpFormulaDecimals");
const fpNumberFormatRow = $("fpNumberFormatRow");
const fpFormulaDecimalsRow = $("fpFormulaDecimalsRow");
const fpTextScale = $("fpTextScale");
const fpOpacity = $("fpOpacity");
const fpOpacityNum = $("fpOpacityNum");
const fpFillEnabled = $("fpFillEnabled");
const fpGradientEnabled = $("fpGradientEnabled");
const fpFill2 = $("fpFill2");
const fpGradientWrap = $("fpGradientWrap");
const fpBorderEnabled = $("fpBorderEnabled");
const fpAutoSize = $("fpAutoSize");
const fpTableFilter = $("fpTableFilter");
const fpShadow = $("fpShadow");
const fpShadowNum = $("fpShadowNum");
const fpX = $("fpX");
const fpY = $("fpY");
const fpW = $("fpW");
const fpH = $("fpH");
const fpR = $("fpR");
const fpAngle = $("fpAngle");
const fpFillType = $("fpFillType");
const fpBorderHex = $("fpBorderHex");
const fpFront = $("fpFront");
const fpBack = $("fpBack");
const fpAddCol = $("fpAddCol");
const fpDelCol = $("fpDelCol");
const fpAddRow = $("fpAddRow");
const fpDelRow = $("fpDelRow");
const fpColLeft = $("fpColLeft");
const fpColRight = $("fpColRight");
const fpRowUp = $("fpRowUp");
const fpRowDown = $("fpRowDown");
const fpMergeCells = $("fpMergeCells");
const fpUnmergeCells = $("fpUnmergeCells");
const fpTableColWidth = $("fpTableColWidth");
const fpTableRowHeight = $("fpTableRowHeight");
const fpAlignLeft = $("fpAlignLeft");
const fpAlignCenter = $("fpAlignCenter");
const fpAlignRight = $("fpAlignRight");
const fpVTop = $("fpVTop");
const fpVMiddle = $("fpVMiddle");
const fpVBottom = $("fpVBottom");
const fpOrderAlignLeft = $("fpOrderAlignLeft");
const fpOrderAlignCenter = $("fpOrderAlignCenter");
const fpOrderAlignRight = $("fpOrderAlignRight");
const fpOrderAlignTop = $("fpOrderAlignTop");
const fpOrderAlignMiddle = $("fpOrderAlignMiddle");
const fpOrderAlignBottom = $("fpOrderAlignBottom");
const fpRotateRight = $("fpRotateRight");
const fpFlipH = $("fpFlipH");
const fpFlipV = $("fpFlipV");
const fpSnapGrid = $("fpSnapGrid");
const fpDistributeH = $("fpDistributeH");
const fpDistributeV = $("fpDistributeV");
const fpGroup = $("fpGroup");
const fpLock = $("fpLock");
const fpCopyStyle = $("fpCopyStyle");
const fpPasteStyle = $("fpPasteStyle");
const fpDefaultStyle = $("fpDefaultStyle");
const fpResetDefaultStyle = $("fpResetDefaultStyle");
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
let guestPublicView = false;
let guestPublicToken = "";
var currentUser = null;
let hintTimer = null;
let currentDocumentRole = null;
let selectedShape = null;
let selectedGroupId = null;
const multiSelectedShapeIds = new Set();
const multiSelectedConnectorIds = new Set();
let selectedConnector = null;
let selectedWindow = null;
let connectorCounter = 1;
const connectors = [];
let connectorDraft = null;
let connectorDragOverlay = null;
let connectorDraftSvg = null;
let connectorDraftPointerMove = null;
let connectorDraftPointerUp = null;
let activeConnectorLabelEditId = null;
let ctrlModifierActive = false;
let altModifierActive = false;
let groupCounter = 1;
let frameCounter = 1;
let bpProcessCounter = 1;
let groupSelectionBox = null;
let frameToolActive = false;
let frameDrawSelection = null;
let shapePlaceTool = null;
let shapePlaceDraw = null;
const FRAME_MIN_SIZE = 40;
const FRAME_DEFAULT_NAME = "Фрейм";
const FRAME_WRAP_PADDING = 16;
const SHAPE_PLACE_MIN_SIZE = 8;
const SHAPE_PLACE_DEFAULT_STYLE = Object.freeze({
  fillEnabled: true,
  fill: "#ffffff",
  fill2: "#ffffff",
  borderEnabled: true,
  border: "#000000",
  borderWidth: 1,
  borderStyle: "solid",
  shadow: 0
});
let pendingGroupMemberSelect = null;
let contextMenuEl = null;
let contextMenuCloseTimer = null;
let shapeClipboard = null;
let shapeClipboardPasteHandledUntil = 0;
let pendingImageSpawnPoint = null;
let lastDesktopPointer = null;
let tableCellClipboard = null;
let marqueeSelection = null;
let viewportPan = null;
let activeFormulaEditor = null;
let activeFormulaHighlights = [];
let authModalMode = "login";
const undoStack = [];
const redoStack = [];
let historyLock = false;
let viewportStabilizer = null;
let viewportInteracted = false;
let wheelZoomGesture = null;
const ENABLE_TABLE_SHAPE_HANDLE_RESIZE = false;
const APP_BUILD = "20260722-doc-switch-save-guard";
const LAYOUT_SCHEMA_VERSION = 2;
const DOCUMENT_LAYOUT_SCHEMA_VERSION = 3;
const DOC_ID_PATTERN = "(?:[0-9a-f]{12}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})";
const SHAPE_VARIANTS = {
  rectangle: { kind: "native" },
  rounded: { kind: "native", radius: 28 },
  circle: { kind: "svg", tag: "ellipse", attrs: { cx: 50, cy: 50, rx: 49, ry: 49 }, width: "160px", height: "160px" },
  parallelogram: { kind: "svg", tag: "polygon", points: "18,0 100,0 82,100 0,100" },
  diamond: { kind: "svg", tag: "polygon", points: "50,0 100,50 50,100 0,50", width: "150px", height: "150px" },
  chevron: { kind: "svg", tag: "polygon", points: "0,0 82,0 100,50 82,100 0,100 18,50" },
  "arrow-right": { kind: "svg", tag: "polygon", points: "0,28 62,28 62,0 100,50 62,100 62,72 0,72" },
  hexagon: { kind: "svg", tag: "polygon", points: "18,0 82,0 100,50 82,100 18,100 0,50" }
};
const WB_ICON_BASE = "assets/whiteboard-icons/";
const SHAPE_MENU_ITEMS = [
  { variant: "rectangle", label: "Прямоугольник", icon: "shape-rectangle.svg" },
  { variant: "rounded", label: "Скругленный прямоугольник", icon: "shape-rounded-rectangle.svg" },
  { variant: "circle", label: "Круг", icon: "shape-circle.svg" },
  { variant: "parallelogram", label: "Параллелограмм", icon: "shape-parallelogram.svg" },
  { variant: "diamond", label: "Ромб", icon: "shape-diamond.svg" },
  { variant: "chevron", label: "Шеврон", icon: "shape-chevron.svg" },
  { variant: "arrow-right", label: "Стрелка вправо", icon: "shape-arrow-right.svg" },
  { variant: "hexagon", label: "Шестиугольник", icon: "shape-hexagon.svg" }
];
const BITRIX_MENU_ITEMS = [
  { variant: "chart", label: "График", icon: "chart.svg" },
  { variant: "bitrix-card", label: "Карточка", icon: "card.svg" },
  { variant: "bitrix-date-filter", label: "Фильтр", icon: "filter.svg" }
];
const SHAPE_SELECTION_PAD = 4;
const CONN_ARROW_OFFSET = 22;
const BP_CONN_ARROW_OFFSET = 38;
function getDesktopZoom() {
  return Math.max(0.001, Number(zoom) || 1);
}
function getShapeSelectionPadWorld() {
  return SHAPE_SELECTION_PAD / getDesktopZoom();
}
function getConnArrowOffsetWorld(node) {
  const screenOffset = node && isBpProcessStage(node) ? BP_CONN_ARROW_OFFSET : CONN_ARROW_OFFSET;
  return screenOffset / getDesktopZoom();
}
const DEFAULT_CHEVRON_INSET_DEPTH = 18;
const MIN_CHEVRON_INSET_DEPTH = 6;
const MAX_CHEVRON_INSET_DEPTH = 40;
const DEFAULT_CHEVRON_INSET_PX = Math.round((DEFAULT_CHEVRON_INSET_DEPTH / 100) * 180);
const MIN_CHEVRON_INSET_PX = 4;
const MAX_CHEVRON_INSET_PX = 80;
const BP_CHEVRON_INSET_PX = Math.round(DEFAULT_CHEVRON_INSET_PX / 2);
const DEFAULT_PARALLELOGRAM_SKEW = 18;
const MIN_PARALLELOGRAM_SKEW = 6;
const MAX_PARALLELOGRAM_SKEW = 40;
const DEFAULT_HEXAGON_CHAMFER = 18;
const MIN_HEXAGON_CHAMFER = 6;
const MAX_HEXAGON_CHAMFER = 32;
const BP_STAGE_WIDTH = 180;
const BP_STAGE_HEIGHT = 50;
const BP_STAGE_GAP = 5;
const BP_BASE_PAD_X = 15;
const BP_BASE_PAD_Y = 15;
const BP_DEFAULT_STAGE_COUNT = 4;
const BP_STAGE_COLORS_LIGHT = Object.freeze(["#bfdbfe", "#93c5fd", "#60a5fa", "#22c55e"]);
const BP_STAGE_COLORS_DARK = Object.freeze(["#1e3a5f", "#1d4ed8", "#3b82f6", "#16a34a"]);
const BP_BASE_FILL_LIGHT = "#ece8fd";
const BP_BASE_FILL_DARK = "#2a2738";
const BP_STAGE_TEXT_LIGHT = "#111827";
const BP_STAGE_TEXT_DARK = "#f1f5f9";
const BP_STAGE_COLORS = BP_STAGE_COLORS_LIGHT;
const BP_BASE_FILL = BP_BASE_FILL_LIGHT;
const BP_FACTORY_VISUAL_OPTS = Object.freeze({
  gradientEnabled: false,
  shadow: 0,
  radius: 0,
  borderEnabled: false,
  borderWidth: 0,
  fillEnabled: true,
  opacity: 1,
  scrollEnabled: false
});
function getBpStageColors() {
  return isDarkThemeActive() ? BP_STAGE_COLORS_DARK : BP_STAGE_COLORS_LIGHT;
}
function getBpBaseFill() {
  return isDarkThemeActive() ? BP_BASE_FILL_DARK : BP_BASE_FILL_LIGHT;
}
function getBpStageTextColor(isLast = false) {
  if (isLast) return "#ffffff";
  return isDarkThemeActive() ? BP_STAGE_TEXT_DARK : BP_STAGE_TEXT_LIGHT;
}
function normalizeHexColor(value) {
  return rgbToHex(String(value || "").trim()).toLowerCase();
}
function remapBpFactoryFillForTheme(fill) {
  const hex = normalizeHexColor(fill);
  if (!hex) return null;
  const fromColors = isDarkThemeActive() ? BP_STAGE_COLORS_LIGHT : BP_STAGE_COLORS_DARK;
  const toColors = getBpStageColors();
  const fromBase = isDarkThemeActive() ? BP_BASE_FILL_LIGHT : BP_BASE_FILL_DARK;
  const toBase = getBpBaseFill();
  if (hex === normalizeHexColor(fromBase) || hex === normalizeHexColor(toBase)) return toBase;
  const idx = fromColors.findIndex((c) => normalizeHexColor(c) === hex);
  if (idx >= 0) return toColors[Math.min(idx, toColors.length - 1)];
  const sameIdx = toColors.findIndex((c) => normalizeHexColor(c) === hex);
  if (sameIdx >= 0) return toColors[sameIdx];
  return null;
}
const BP_TASK_OFFSET_X = 30;
const BP_TASK_GAP = 5;
const BP_TASK_STAGE_GAP = 15;
const BP_TASK_STACK_GAP = 15;
const BP_TASK_RADIUS = 5;
const BP_TASK_DEFAULT_HEIGHT = 40;
const BP_AUTOMATION_FILL = "#fddd68";
const BP_AUTOMATION_DEFAULT_HEIGHT = 40;
const BP_AUTOMATION_TOGGLE_ICON_SRC = "assets/bp-automation-gear-icon.svg";
/** Fixed tip depth in px (independent of width). Smaller than h/2 → blunter (obtuse) tip angle. */
const BP_AUTOMATION_TIP_PX = 12;
/** Gap between stacked automations (half of task stack gap). */
const BP_AUTOMATION_STACK_GAP = BP_TASK_STACK_GAP / 2;
const SHAPE_REF_PATTERN = "@([A-Za-z][A-Za-z0-9_]*)";
const SHAPE_REF_RE = new RegExp(SHAPE_REF_PATTERN, "g");
const TABLE_CELL_ADDRESS_PATTERN = "\\$?[A-Za-z]+\\$?[1-9]\\d*";
const STANDALONE_CELL_ADDRESS_PATTERN = "\\$?[A-Za-z]+\\$?[1-9]\\d*";
const TABLE_CELL_REF_RE = new RegExp(`(?:[\\p{L}\\p{N}][\\p{L}\\p{N} ._-]*?\\[${TABLE_CELL_ADDRESS_PATTERN}\\]|[\\p{L}\\p{N}][\\p{L}\\p{N} ._-]*?_${TABLE_CELL_ADDRESS_PATTERN})`, "gu");
const STANDALONE_CELL_RANGE_RE = new RegExp(`(^|[^A-Z0-9_$])((${STANDALONE_CELL_ADDRESS_PATTERN}):(${STANDALONE_CELL_ADDRESS_PATTERN}))(?![A-Z0-9_])`, "gi");
const STANDALONE_CELL_ADDRESS_RE = new RegExp(`(^|[^A-Z0-9_$])(${STANDALONE_CELL_ADDRESS_PATTERN})(?![A-Z0-9_])`, "gi");
const NUMBER_FORMAT_NUMBER = "number";
const NUMBER_FORMAT_PERCENT = "percent";
const NUMBER_FORMAT_CURRENCY_RUB = "currency_rub";
const NUMBER_FORMAT_CURRENCY_USD = "currency_usd";
const SHAPE_CLIPBOARD_PREFIX = "MMTABLE_CLIPBOARD_V1:";
const SHAPE_CLIPBOARD_MIME = "application/x-mmtable-clipboard";

const STORAGE_KEY = "table-workspace-layout-v2";
const DOC_STORE_KEY = "table-workspace-doc-store-v1";
const LEGACY_DOC_KEY = "table-workspace-active-doc-v1";
const AUTOSAVE_KEY = "table-workspace-autosave-v1";
const THEME_KEY = "table-workspace-theme-v1";
const OBJECTS_TOOLBAR_KEY = "table-workspace-objects-toolbar-v1";
const PANEL_KEY = "table-format-panel-v1";
const FILE_BROWSER_SIZE_KEY = "table-file-browser-size-v2";
const VIEWPORT_KEY = "table-workspace-viewport-v1";
const APP_ROUTE_PENDING_KEY = "table-workspace-pending-route-v1";
const DEFAULT_STYLES_KEY = "table-workspace-default-styles-v2";
const BUILTIN_DEFAULT_STYLES = Object.freeze({
  "shape-rect": {
    fillEnabled: true,
    gradientEnabled: false,
    fill: "#ffffff",
    fill2: "#ffffff",
    fillDirection: "horizontal",
    borderEnabled: true,
    border: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    radius: 0,
    shadow: 0,
    opacity: 1,
    scrollEnabled: false,
    fontFamily: "Arial",
    fontSize: 16,
    textColor: "#000000",
    bold: false,
    italic: false,
    strike: false,
    underline: false,
    wrap: true,
    hAlign: "left",
    vAlign: "top"
  }
});
const FORMAT_PANEL_SCALE = 0.5;
const BASE_DESKTOP_WIDTH = 2200;
const BASE_DESKTOP_HEIGHT = 1400;
const DESKTOP_ORIGIN_MARGIN = 1000;
const WHEEL_ZOOM_SENSITIVITY = 0.0035;
const WHEEL_ZOOM_MAX_DELTA = 80;
const DEFAULT_DESKTOP_STYLE = Object.freeze({
  fillEnabled: true,
  gradientEnabled: false,
  fill: "#f6f8fc",
  fill2: "#eef3ff",
  fillDirection: "horizontal",
  borderEnabled: true,
  border: "#d8e2f0",
  gridSize: 24,
  opacity: 100
});
const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhEx3Hf6nqfIuY73M8W8_QbKHNT8fVSaToTyP3GmPHfMiM2P3MZ-fjRF2f5W5mK2R4M9XQ2u4k/pubhtml?widget=true&headers=false";
let styleClipboard = null;
let defaultStyles = loadDefaultStyles();
let autoSaveEnabled = true;
let currentDocumentId = null;
let currentDocumentName = "Рабочий стол";
let currentDocumentStore = null;
let documentsCache = [];
let foldersCache = [];
let fileBrowserCollapsedFolders = new Set();
let fileBrowserSelectedDocId = null;
let fileBrowserPreviewCache = new Map();
let shareModalDocId = null;
let documentSheetsState = [];
let currentSheetId = 1;
let sheetSwitcherOpen = false;
let commentsCache = [];
let desktopStyleState = { ...DEFAULT_DESKTOP_STYLE };
let formatPanelExpandedPosition = null;
let expandedAttachedNoteId = null;
const ATTACHED_NOTE_FILL = "#fef9c3";
const ATTACHED_NOTE_DEFAULT_WIDTH = 220;
const ATTACHED_NOTE_DEFAULT_HEIGHT = 180;
const ATTACHED_NOTE_LEGACY_PLACEHOLDER = "Тут текст заметки";
const ATTACHED_NOTE_BADGE_SCREEN_SIZE = 22;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function normalizeOpacityValue(value, fallback = 1) {
  const n = Number(value);
  return clamp(Number.isFinite(n) ? n : fallback, 0, 1);
}
function isCtrlModifierActive() {
  return !!ctrlModifierActive;
}
function isAltModifierActive() {
  return !!altModifierActive;
}
function shouldPreferCellTargets(event = null) {
  return !!((event && event.altKey) || altModifierActive);
}
function normalizeCellRef(cell) {
  if (!cell || !Number.isFinite(Number(cell.r)) || !Number.isFinite(Number(cell.c))) return null;
  return { r: Math.max(0, Number(cell.r) || 0), c: Math.max(0, Number(cell.c) || 0) };
}
function connectorEndHasCell(end) {
  return !!normalizeCellRef(end && end.cell);
}
function connectorEndEquals(a, b) {
  if (!a || !b) return false;
  if ((a.nodeId || "") !== (b.nodeId || "")) return false;
  if ((a.shapeId || "") !== (b.shapeId || "")) return false;
  if ((a.anchor || "c") !== (b.anchor || "c")) return false;
  const aCell = normalizeCellRef(a.cell);
  const bCell = normalizeCellRef(b.cell);
  if (!!aCell !== !!bCell) return false;
  if (aCell && bCell && (aCell.r !== bCell.r || aCell.c !== bCell.c)) return false;
  if ((a.anchor || "") === "edge" || (b.anchor || "") === "edge") {
    return Math.abs((Number(a.rx) || 0) - (Number(b.rx) || 0)) < 0.001
      && Math.abs((Number(a.ry) || 0) - (Number(b.ry) || 0)) < 0.001;
  }
  return true;
}
function connectorRendersAboveTables(conn) {
  return !!(connectorEndHasCell(conn?.from) || connectorEndHasCell(conn?.to));
}
const INTERACTION_CONTROLS_LAYER_Z = 20000;
const CONNECTOR_Z_MAX = INTERACTION_CONTROLS_LAYER_Z - 50;
const TABLE_TITLE_BAR_HEIGHT = 34;
const TABLE_CELL_ANCHOR_OUTSET = 2;
function capConnectorZIndex(z) {
  return Math.min(CONNECTOR_Z_MAX, Math.max(1, z));
}
function getMaxDesktopObjectZIndex() {
  let max = 1;
  if (!desktop) return max;
  desktop.querySelectorAll(".shape, .sheet-window").forEach((node) => {
    max = Math.max(max, Number(node.style.zIndex) || 1);
  });
  return max;
}
function isRaisedAboveConnectors(node) {
  return !!(node && node.dataset && node.dataset.aboveConnectors === "1");
}
function getMaxShapeZForConnectorStack() {
  let max = 1;
  if (!desktop) return max;
  desktop.querySelectorAll(".shape, .sheet-window").forEach((node) => {
    if (isRaisedAboveConnectors(node)) return;
    max = Math.max(max, Number(node.style.zIndex) || 1);
  });
  return max;
}
function getConnectorStackBaseZIndex() {
  return capConnectorZIndex(getMaxShapeZForConnectorStack() + 1);
}
function getMaxRaisedShapeZIndex() {
  let max = 0;
  if (!desktop) return max;
  desktop.querySelectorAll(".shape, .sheet-window").forEach((node) => {
    if (!isRaisedAboveConnectors(node)) return;
    max = Math.max(max, Number(node.style.zIndex) || 0);
  });
  return max;
}
function getTopConnectorRenderZIndex() {
  const base = getConnectorStackBaseZIndex();
  if (!connectors.length) return base;
  return connectors.reduce((max, conn) => Math.max(max, getConnectorRenderZIndex(conn)), base);
}
const SHAPE_ABOVE_CONNECTORS_MAX_Z = INTERACTION_CONTROLS_LAYER_Z - 100;
function raiseShapeAboveConnectorsZ(el) {
  if (!el) return;
  el.dataset.aboveConnectors = "1";
  const nextZ = Math.min(
    SHAPE_ABOVE_CONNECTORS_MAX_Z,
    Math.max(getTopConnectorRenderZIndex(), getMaxRaisedShapeZIndex()) + 1
  );
  el.style.zIndex = String(nextZ);
  zCounter = Math.max(zCounter, nextZ);
}
function bringShapeAboveConnectors(el) {
  raiseShapeAboveConnectorsZ(el);
  renderConnectors();
}
function clearShapeAboveConnectors(el) {
  if (!el) return;
  delete el.dataset.aboveConnectors;
}
function getConnectorRenderZIndex(conn) {
  const rel = Math.max(1, Math.min(500, Number(conn?.zIndex) || 1));
  return capConnectorZIndex(getConnectorStackBaseZIndex() + rel);
}
function getConnectorOverlayLayerZIndex() {
  if (connectorDraft) return INTERACTION_CONTROLS_LAYER_Z + 5;
  const topConnectorZ = connectors.reduce(
    (max, conn) => Math.max(max, getConnectorRenderZIndex(conn)),
    getConnectorStackBaseZIndex()
  );
  return capConnectorZIndex(topConnectorZ + 1);
}
function getConnectorOverlayHandleZIndex() {
  if (connectorDraft) return INTERACTION_CONTROLS_LAYER_Z + 8;
  return capConnectorZIndex(getConnectorOverlayLayerZIndex() + 4);
}
function updateConnectorDraftTargetGuides() {
  desktop.querySelectorAll(".shape.shape-table").forEach((node) => {
    node.__tableApi?.setDraftConnectorTarget?.(null);
  });
  if (!connectorDraft) return;
  const drop = getDropConnectionForClientPoint(
    connectorDraft.clientX,
    connectorDraft.clientY,
    connectorDraft.fromNodeId || "",
    { preferCells: !!(connectorDraft.preferCells || connectorDraft.fromCell) }
  );
  if (!drop?.anchorData?.cell) return;
  const table = getConnectableById(drop.nodeId);
  table?.__tableApi?.setDraftConnectorTarget?.(drop.anchorData.cell);
}
function updateAllTableCellConnectorGuides() {
  desktop.querySelectorAll(".shape.shape-table").forEach((node) => {
    node.__tableApi?.updateConnectorGuides?.();
  });
}
function suppressCellConnectorArrowBrowserMenu(event) {
  event.preventDefault();
  event.stopPropagation();
  if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
  hideContextMenu();
}

function shouldSuppressConnectorContextMenu(event) {
  if (!event) return false;
  if (connectorDraft) return true;
  if (event.target?.closest?.(".conn-arrow, .conn-point, .table-cell-conn-arrow, .table-cell-connector-guides")) {
    return true;
  }
  // macOS: Ctrl+click opens the browser menu; Ctrl is reserved for connector arrows.
  if ((event.ctrlKey || event.metaKey) && ctrlModifierActive && !isWorkspaceReadOnly() && !guestPublicView) {
    return true;
  }
  return false;
}
function bringToFront(el) { el.style.zIndex = String(++zCounter); }
function bringNodesToFront(nodes) {
  nodes.forEach((node) => {
    if (!node) return;
    node.style.zIndex = String(++zCounter);
  });
}
function bringGroupToFront(groupId) {
  getGroupMembers(groupId).forEach((node) => {
    node.style.zIndex = String(++zCounter);
  });
}

let interactionControlsLayer = null;

function ensureInteractionControlsLayer() {
  if (interactionControlsLayer?.isConnected) return interactionControlsLayer;
  interactionControlsLayer = document.createElement("div");
  interactionControlsLayer.id = "interactionControlsLayer";
  interactionControlsLayer.className = "interaction-controls-layer";
  appendToDesktop(interactionControlsLayer);
  return interactionControlsLayer;
}

function restoreLiftedShapeControls(shapeId = null) {
  const layer = interactionControlsLayer;
  if (!layer?.isConnected) return;
  const selector = shapeId ? `[data-lifted-from-shape="${shapeId}"]` : "[data-lifted-from-shape]";
  Array.from(layer.querySelectorAll(selector)).forEach((el) => {
    if (el.classList.contains("table-cell-connector-guides")) return;
    if (el.classList.contains("shape-note-badge")) {
      el.remove();
      return;
    }
    const ownerId = el.dataset.liftedFromShape;
    const owner = ownerId ? getControlOwnerNode(ownerId) : null;
    if (owner) {
      owner.appendChild(el);
    } else {
      el.remove();
    }
    delete el.dataset.liftedFromShape;
    el.style.left = "";
    el.style.top = "";
    el.style.width = "";
    el.style.height = "";
    el.style.inset = "";
    if (el.classList.contains("shape-param-handle")) {
      el.style.transform = "translate(-50%, -50%)";
    }
  });
}

function purgeOrphanedInteractionControls() {
  const layer = interactionControlsLayer;
  if (!layer?.isConnected) return;
  layer.querySelectorAll("[data-lifted-from-shape]").forEach((el) => {
    if (el.classList.contains("table-cell-connector-guides")) return;
    const owner = getControlOwnerNode(el.dataset.liftedFromShape || "");
    if (!owner) el.remove();
  });
  layer.querySelectorAll(":scope > .shape-handles, :scope > .shape-param-handle, :scope > .bp-stage-controls").forEach((el) => {
    if (el.dataset.liftedFromShape) return;
    el.remove();
  });
}

function syncLiftedControlsPosition(node) {
  const shapeId = getControlOwnerId(node);
  if (!shapeId || !interactionControlsLayer?.isConnected) return;
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  interactionControlsLayer.querySelectorAll(`[data-lifted-from-shape="${shapeId}"]`).forEach((el) => {
    if (el.classList.contains("shape-handles")) {
      const pad = getShapeSelectionPadWorld();
      el.style.inset = "auto";
      el.style.left = `${left - pad}px`;
      el.style.top = `${top - pad}px`;
      el.style.width = `${w + pad * 2}px`;
      el.style.height = `${h + pad * 2}px`;
    } else if (el.classList.contains("bp-stage-controls")) {
      el.style.inset = "auto";
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    } else if (el.classList.contains("shape-note-badge")) {
      const size = ATTACHED_NOTE_BADGE_SCREEN_SIZE / getDesktopZoom();
      el.style.inset = "auto";
      el.style.left = `${left + w - size}px`;
      el.style.top = `${top - size}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.transform = "none";
    } else if (el.classList.contains("shape-param-handle")) {
      const variant = normalizeShapeVariant(node.dataset.shapeVariant);
      if (variant === "chevron") {
        const depthPx = getChevronInsetDepthPx(node);
        el.style.left = `${left + depthPx}px`;
        el.style.top = `${top + (h / 2)}px`;
      } else if (variant === "parallelogram" || variant === "hexagon") {
        const depth = getShapeVariantDepth(node, variant);
        el.style.left = `${left + (w * depth) / 100}px`;
        el.style.top = `${top}px`;
      }
      el.style.transform = "translate(-50%, -50%)";
    }
  });
}

function syncAllLiftedControlsPositions() {
  if (!interactionControlsLayer?.isConnected) return;
  const seen = new Set();
  interactionControlsLayer.querySelectorAll("[data-lifted-from-shape]").forEach((el) => {
    if (el.classList.contains("table-cell-connector-guides")) return;
    const id = el.dataset.liftedFromShape;
    if (!id || seen.has(id)) return;
    seen.add(id);
    const node = getControlOwnerNode(id);
    if (node) syncLiftedControlsPosition(node);
  });
  refreshLiftedTableCellConnectorGuides();
}

function syncTableCellConnectorGuidesLayer(tableNode, guides) {
  if (!tableNode || !guides?.classList?.contains("lifted")) return;
  guides.style.left = `${tableNode.offsetLeft}px`;
  guides.style.top = `${tableNode.offsetTop}px`;
  guides.style.width = `${tableNode.offsetWidth}px`;
  guides.style.height = `${tableNode.offsetHeight}px`;
}

function restoreTableCellConnectorGuidesToOwner(tableNode) {
  const guides = tableNode?.querySelector?.(":scope > .table-cell-connector-guides")
    || (tableNode?.dataset?.shapeId
      ? interactionControlsLayer?.querySelector(`.table-cell-connector-guides[data-lifted-from-shape="${tableNode.dataset.shapeId}"]`)
      : null);
  if (!guides || !tableNode) return;
  if (guides.parentElement !== tableNode) tableNode.appendChild(guides);
  delete guides.dataset.liftedFromShape;
  guides.classList.remove("lifted");
  guides.style.left = "";
  guides.style.top = "";
  guides.style.width = "";
  guides.style.height = "";
}

function liftTableCellConnectorGuides(tableNode, guides) {
  if (!tableNode || !guides) return;
  const layer = ensureInteractionControlsLayer();
  if (guides.parentElement !== layer) layer.appendChild(guides);
  guides.dataset.liftedFromShape = tableNode.dataset.shapeId || "";
  guides.classList.add("lifted");
  syncTableCellConnectorGuidesLayer(tableNode, guides);
}

function refreshLiftedTableCellConnectorGuides() {
  if (!interactionControlsLayer?.isConnected) return;
  interactionControlsLayer.querySelectorAll(".table-cell-connector-guides.lifted").forEach((guides) => {
    const tableNode = getShapeById(guides.dataset.liftedFromShape || "");
    if (!tableNode) return;
    syncTableCellConnectorGuidesLayer(tableNode, guides);
  });
}

function syncModifierKeysFromEvent(event) {
  const nextCtrl = !!(event && (event.ctrlKey || event.metaKey));
  const nextAlt = !!(event && event.altKey);
  if (nextCtrl === ctrlModifierActive && nextAlt === altModifierActive) return;
  ctrlModifierActive = nextCtrl;
  altModifierActive = nextAlt;
  syncConnectorModifierChrome();
}

function syncConnectorModifierChrome() {
  document.body.classList.toggle(
    "ctrl-connector-mode",
    !!ctrlModifierActive && !isWorkspaceReadOnly() && !guestPublicView
  );
  updateAllTableCellConnectorGuides();
}

function liftShapeControlsToOverlay(node) {
  const shapeId = getControlOwnerId(node);
  if (!shapeId || isWorkspaceReadOnly()) return;
  restoreLiftedShapeControls(shapeId);
  const layer = ensureInteractionControlsLayer();
  [":scope > .shape-handles", ":scope > .shape-param-handle", ":scope > .bp-stage-controls"].forEach((sel) => {
    const el = node.querySelector(sel);
    if (!el) return;
    el.dataset.liftedFromShape = shapeId;
    el.classList.toggle("bp-automation-handles", isBpProcessAutomation(node) && el.classList.contains("shape-handles"));
    layer.appendChild(el);
  });
  syncLiftedControlsPosition(node);
  if (isBpProcessStage(node)) layoutConnectorPoints(node);
}

function syncSelectionControlsOverlay() {
  restoreLiftedShapeControls();
  purgeOrphanedInteractionControls();
  if (isWorkspaceReadOnly()) {
    syncAttachedNoteBadge();
    return;
  }
  if (selectedShape) {
    liftShapeControlsToOverlay(selectedShape);
  } else if (selectedWindow) {
    liftShapeControlsToOverlay(selectedWindow);
  } else {
    getMultiSelectedShapes().forEach((node) => liftShapeControlsToOverlay(node));
  }
  syncAttachedNoteBadge();
}
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
function getLiveViewportState() {
  if (!viewportEl) return null;
  return {
    left: Math.max(0, Number(viewportEl.scrollLeft) || 0),
    top: Math.max(0, Number(viewportEl.scrollTop) || 0)
  };
}
function restoreViewportStateImmediate(state, repeat = 3) {
  if (!viewportEl || !state) return;
  let tries = 0;
  const apply = () => {
    viewportEl.scrollLeft = state.left;
    viewportEl.scrollTop = state.top;
    tries += 1;
    if (tries < repeat) requestAnimationFrame(apply);
  };
  apply();
}
function setViewportScrollImmediate(left, top, repeat = 3) {
  restoreViewportStateImmediate({
    left: Math.max(0, Number(left) || 0),
    top: Math.max(0, Number(top) || 0)
  }, repeat);
}
function restoreViewportState(state, opts = {}) {
  if (!viewportEl || !state) return;
  const repeat = Math.max(1, Number(opts.repeat) || 1);
  let tries = 0;
  const apply = () => {
    if (viewportInteracted) return;
    viewportEl.scrollLeft = state.left;
    viewportEl.scrollTop = state.top;
    tries += 1;
    if (tries < repeat && !viewportInteracted) requestAnimationFrame(apply);
  };
  apply();
}
function startViewportStabilizer(state, durationMs = 1200) {
  if (!viewportEl || !state || viewportInteracted) return;
  stopViewportStabilizer();
  const targetLeft = Math.max(0, Number(state.left) || 0);
  const targetTop = Math.max(0, Number(state.top) || 0);
  const tick = () => {
    if (!viewportStabilizer) return;
    if (viewportInteracted) {
      stopViewportStabilizer();
      return;
    }
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
function stopViewportStabilizer() {
  if (!viewportStabilizer) return;
  cancelAnimationFrame(viewportStabilizer.rafId);
  clearTimeout(viewportStabilizer.timerId);
  viewportStabilizer = null;
}
function markViewportInteracted() {
  if (viewportInteracted) return;
  viewportInteracted = true;
  stopViewportStabilizer();
}

function getDesktopSurface() {
  if (!desktop) return null;
  let surface = desktop.querySelector("#desktopSurface");
  if (!surface) {
    surface = document.createElement("div");
    surface.id = "desktopSurface";
    surface.className = "desktop-surface";
    desktop.appendChild(surface);
  }
  return surface;
}

function getDesktopOrigin() {
  const surface = getDesktopSurface();
  if (!surface) return null;
  let origin = surface.querySelector("#desktopOrigin");
  if (!origin) {
    origin = document.createElement("div");
    origin.id = "desktopOrigin";
    origin.className = "desktop-origin";
    surface.appendChild(origin);
  }
  return origin;
}

function getDesktopContentRoot() {
  return getDesktopOrigin() || getDesktopSurface() || desktop;
}

function appendToDesktop(node) {
  getDesktopContentRoot().appendChild(node);
}

function migrateDesktopChildrenToSurface() {
  const origin = getDesktopOrigin();
  const surface = getDesktopSurface();
  if (!desktop || !surface || !origin) return;
  [desktop, surface].forEach((container) => {
    Array.from(container.children).forEach((child) => {
      if (child === surface || child === origin) return;
      origin.appendChild(child);
    });
  });
}

function clearDesktop() {
  if (!desktop) return;
  const origin = getDesktopOrigin();
  if (origin) {
    origin.replaceChildren();
    return;
  }
  desktop.innerHTML = "";
}

function getDesktopPaddingOffset() {
  const surface = getDesktopSurface();
  if (!surface) return { left: 0, top: 0 };
  return {
    left: parseFloat(surface.dataset.originLeft || DESKTOP_ORIGIN_MARGIN) || DESKTOP_ORIGIN_MARGIN,
    top: parseFloat(surface.dataset.originTop || DESKTOP_ORIGIN_MARGIN) || DESKTOP_ORIGIN_MARGIN
  };
}

function autoScrollViewportDuringDrag(clientX, clientY) {
  if (!viewportEl) return;
  const rect = viewportEl.getBoundingClientRect();
  const margin = 72;
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  const step = Math.max(12, 28 / localZoom);
  if (clientX < rect.left + margin) viewportEl.scrollLeft = Math.max(0, viewportEl.scrollLeft - step);
  else if (clientX > rect.right - margin) {
    const maxLeft = Math.max(0, viewportEl.scrollWidth - viewportEl.clientWidth);
    viewportEl.scrollLeft = Math.min(maxLeft, viewportEl.scrollLeft + step);
  }
  if (clientY < rect.top + margin) viewportEl.scrollTop = Math.max(0, viewportEl.scrollTop - step);
  else if (clientY > rect.bottom - margin) {
    const maxTop = Math.max(0, viewportEl.scrollHeight - viewportEl.clientHeight);
    viewportEl.scrollTop = Math.min(maxTop, viewportEl.scrollTop + step);
  }
}

function formatPositionPx(value) {
  return `${Math.round(Number(value) || 0)}px`;
}

function setNodePosition(node, left, top) {
  if (!node) return;
  node.style.left = formatPositionPx(left);
  node.style.top = formatPositionPx(top);
}

function getElementLogicalBox(el) {
  const styleLeft = parseFloat(el.style.left);
  const styleTop = parseFloat(el.style.top);
  const left = Number.isFinite(styleLeft) ? styleLeft : el.offsetLeft;
  const top = Number.isFinite(styleTop) ? styleTop : el.offsetTop;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function getDesktopContentBounds() {
  let minLeft = 0;
  let minTop = 0;
  let maxRight = 0;
  let maxBottom = 0;
  let hasContent = false;
  if (!desktop) {
    return {
      minLeft: 0,
      minTop: 0,
      maxRight: 0,
      maxBottom: 0,
      boundLeft: -DESKTOP_ORIGIN_MARGIN,
      boundTop: -DESKTOP_ORIGIN_MARGIN,
      boundRight: DESKTOP_ORIGIN_MARGIN,
      boundBottom: DESKTOP_ORIGIN_MARGIN
    };
  }
  desktop.querySelectorAll(".sheet-window, .shape").forEach((el) => {
    hasContent = true;
    const box = getElementLogicalBox(el);
    minLeft = Math.min(minLeft, box.left);
    minTop = Math.min(minTop, box.top);
    maxRight = Math.max(maxRight, box.right);
    maxBottom = Math.max(maxBottom, box.bottom);
  });
  if (!hasContent) {
    return {
      minLeft: 0,
      minTop: 0,
      maxRight: 0,
      maxBottom: 0,
      boundLeft: -DESKTOP_ORIGIN_MARGIN,
      boundTop: -DESKTOP_ORIGIN_MARGIN,
      boundRight: DESKTOP_ORIGIN_MARGIN,
      boundBottom: DESKTOP_ORIGIN_MARGIN
    };
  }
  return {
    minLeft,
    minTop,
    maxRight,
    maxBottom,
    boundLeft: minLeft - DESKTOP_ORIGIN_MARGIN,
    boundTop: minTop - DESKTOP_ORIGIN_MARGIN,
    boundRight: maxRight + DESKTOP_ORIGIN_MARGIN,
    boundBottom: maxBottom + DESKTOP_ORIGIN_MARGIN
  };
}

function updateDesktopExtent() {
  if (!desktop) return;
  const surface = getDesktopSurface() || desktop;
  const origin = getDesktopOrigin();
  const keepScrollLeft = viewportEl ? viewportEl.scrollLeft : 0;
  const keepScrollTop = viewportEl ? viewportEl.scrollTop : 0;
  const prevOriginLeft = parseFloat(surface.dataset.originLeft || DESKTOP_ORIGIN_MARGIN) || DESKTOP_ORIGIN_MARGIN;
  const prevOriginTop = parseFloat(surface.dataset.originTop || DESKTOP_ORIGIN_MARGIN) || DESKTOP_ORIGIN_MARGIN;
  const bounds = getDesktopContentBounds();
  const originLeft = DESKTOP_ORIGIN_MARGIN - bounds.minLeft;
  const originTop = DESKTOP_ORIGIN_MARGIN - bounds.minTop;
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  const viewW = viewportEl ? viewportEl.clientWidth / localZoom : 0;
  const viewH = viewportEl ? viewportEl.clientHeight / localZoom : 0;
  const contentWidth = Math.max(originLeft + bounds.maxRight + DESKTOP_ORIGIN_MARGIN, viewW);
  const contentHeight = Math.max(originTop + bounds.maxBottom + DESKTOP_ORIGIN_MARGIN, viewH);

  surface.style.boxSizing = "content-box";
  surface.style.padding = "0";
  surface.style.width = `${Math.ceil(contentWidth)}px`;
  surface.style.height = `${Math.ceil(contentHeight)}px`;
  surface.dataset.originLeft = String(originLeft);
  surface.dataset.originTop = String(originTop);

  if (origin) {
    origin.style.left = `${originLeft}px`;
    origin.style.top = `${originTop}px`;
  }

  if (getDesktopSurface()) {
    desktop.style.boxSizing = "content-box";
    desktop.style.padding = "0";
    desktop.style.width = `${Math.ceil(contentWidth * localZoom)}px`;
    desktop.style.height = `${Math.ceil(contentHeight * localZoom)}px`;
    desktop.style.transform = "none";
    surface.style.transform = `scale(${localZoom})`;
    surface.style.transformOrigin = "top left";
    surface.style.setProperty("--desktop-zoom", String(localZoom));
    desktop.style.setProperty("--desktop-zoom", String(localZoom));
  } else {
    desktop.style.width = `${Math.ceil(contentWidth)}px`;
    desktop.style.height = `${Math.ceil(contentHeight)}px`;
    desktop.style.transform = `scale(${localZoom})`;
    desktop.style.transformOrigin = "top left";
    desktop.style.setProperty("--desktop-zoom", String(localZoom));
  }

  if (viewportEl) {
    const dOriginLeft = originLeft - prevOriginLeft;
    const dOriginTop = originTop - prevOriginTop;
    viewportEl.scrollLeft = keepScrollLeft + (dOriginLeft * localZoom);
    viewportEl.scrollTop = keepScrollTop + (dOriginTop * localZoom);
  }
  updateConnectorLayerSize();
  window.DrawTools?.onDesktopExtentChanged?.();
}
function applyZoom() {
  updateDesktopExtent();
  zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  syncViewportDesktopBackground();
  relayoutAllBpProcesses();
  syncAllLiftedControlsPositions();
  updateGroupSelectionBox();
  relayoutAllConnectorPoints();
}
function relayoutAllConnectorPoints() {
  if (!desktop) return;
  desktop.querySelectorAll(".shape, .sheet-window").forEach((node) => {
    if (node.querySelector(":scope > .conn-points")) layoutConnectorPoints(node);
  });
}
function normalizeSheetUrl(raw) { return (raw || "").trim() || DEFAULT_SHEET_URL; }

function getEmbeddableNotionUrl(raw) {
  const url = normalizeSheetUrl(raw);
  try {
    const u = new URL(url);
    const host = (u.hostname || "").toLowerCase();
    const parts = u.pathname.split("/").filter(Boolean);
    const isNotionHost = host === "app.notion.com" || host === "www.notion.so" || host.endsWith(".notion.site");
    if (!isNotionHost || !parts.length) return "";
    if (host === "app.notion.com" || host === "www.notion.so") {
      if (parts[0] !== "p" || parts.length < 3) return "";
      const workspace = parts[1];
      const pagePath = parts.slice(2).join("/");
      return `https://${workspace}.notion.site/ebd/${pagePath}`;
    }
    if (parts[0] === "ebd") return u.toString();
    return `https://${u.hostname}/ebd/${parts.join("/")}`;
  } catch {
    return "";
  }
}

function repairPossiblyBrokenSheetUrl(raw) {
  const url = normalizeSheetUrl(raw);
  if (!url || url === "about:blank") return DEFAULT_SHEET_URL;
  try {
    const u = new URL(url);
    const notionEmbedUrl = getEmbeddableNotionUrl(url);
    if (notionEmbedUrl) return notionEmbedUrl;
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
let cssColorResolveProbe = null;
function resolveUiColorValue(value, fallback = "#000000") {
  const raw = String(value || "").trim();
  const fallbackHex = rgbToHex(fallback);
  if (!raw) return fallbackHex;
  if (!document?.body) return rgbToHex(raw || fallbackHex);
  if (!cssColorResolveProbe) {
    cssColorResolveProbe = document.createElement("div");
    cssColorResolveProbe.style.position = "absolute";
    cssColorResolveProbe.style.width = "0";
    cssColorResolveProbe.style.height = "0";
    cssColorResolveProbe.style.opacity = "0";
    cssColorResolveProbe.style.pointerEvents = "none";
    cssColorResolveProbe.style.left = "-9999px";
    cssColorResolveProbe.style.top = "-9999px";
    document.body.appendChild(cssColorResolveProbe);
  }
  cssColorResolveProbe.style.color = "";
  cssColorResolveProbe.style.color = raw;
  const resolved = getComputedStyle(cssColorResolveProbe).color;
  if (!resolved || isTransparentColor(resolved)) return fallbackHex;
  return rgbToHex(resolved);
}
function hexToRgba(hex, alpha = 1) {
  const color = rgbToHex(hex);
  const value = color.slice(1);
  const num = Number.parseInt(value, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${clamp(Number(alpha), 0, 1)})`;
}
function normalizeDesktopStyle(style = {}) {
  return {
    fillEnabled: style.fillEnabled !== false,
    gradientEnabled: !!style.gradientEnabled,
    fill: rgbToHex(style.fill || DEFAULT_DESKTOP_STYLE.fill),
    fill2: rgbToHex(style.fill2 || DEFAULT_DESKTOP_STYLE.fill2),
    fillDirection: style.fillDirection || DEFAULT_DESKTOP_STYLE.fillDirection,
    borderEnabled: style.borderEnabled !== false,
    border: rgbToHex(style.border || DEFAULT_DESKTOP_STYLE.border),
    gridSize: clamp(Number(style.gridSize) || DEFAULT_DESKTOP_STYLE.gridSize, 8, 120),
    opacity: clamp(Number(style.opacity) || DEFAULT_DESKTOP_STYLE.opacity, 0, 100)
  };
}

function desktopThemeAwareColor(value, fallback, tokenName) {
  const normalized = rgbToHex(value || fallback).toLowerCase();
  const fallbackHex = rgbToHex(fallback).toLowerCase();
  return normalized === fallbackHex
    ? { themed: true, color: `rgba(var(${tokenName}), 1)`, rgbToken: tokenName }
    : { themed: false, color: normalized, rgbToken: "" };
}

function withAlpha(colorInfo, opacity) {
  if (colorInfo && colorInfo.themed && colorInfo.rgbToken) {
    return `rgba(var(${colorInfo.rgbToken}), ${clamp(Number(opacity), 0, 1)})`;
  }
  return hexToRgba(colorInfo?.color || "#000000", opacity);
}

function syncViewportDesktopBackground() {
  if (!viewportEl) return;
  const opacity = desktopStyleState.opacity / 100;
  const layers = [];
  const sizes = [];
  const repeats = [];
  const positions = [];
  const scaledGrid = Math.max(1, desktopStyleState.gridSize * Math.max(0.001, Number(zoom) || 1));
  const fill1 = desktopThemeAwareColor(desktopStyleState.fill, DEFAULT_DESKTOP_STYLE.fill, "--desktop-fill-rgb");
  const fill2 = desktopThemeAwareColor(desktopStyleState.fill2, DEFAULT_DESKTOP_STYLE.fill2, "--desktop-fill-2-rgb");
  const grid = desktopThemeAwareColor(desktopStyleState.border, DEFAULT_DESKTOP_STYLE.border, "--desktop-grid-rgb");
  let baseFill = "transparent";
  let bodyFill = "";
  if (desktopStyleState.fillEnabled && desktopStyleState.gradientEnabled) {
    bodyFill = `linear-gradient(${gradientDirectionCss(desktopStyleState.fillDirection)}, ${withAlpha(fill1, opacity)}, ${withAlpha(fill2, opacity)})`;
    layers.push(bodyFill);
    sizes.push("100% 100%");
    repeats.push("no-repeat");
    positions.push("0px 0px");
    viewportEl.style.backgroundColor = "transparent";
  } else {
    baseFill = desktopStyleState.fillEnabled ? withAlpha(fill1, opacity) : "transparent";
    viewportEl.style.backgroundColor = baseFill;
    bodyFill = baseFill;
  }
  if (desktopStyleState.borderEnabled) {
    const lineColor = withAlpha(grid, opacity);
    layers.push(
      `linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
      `linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`
    );
    sizes.push(
      `${scaledGrid}px ${scaledGrid}px`,
      `${scaledGrid}px ${scaledGrid}px`
    );
    repeats.push("repeat", "repeat");
    positions.push(
      `${-(viewportEl.scrollLeft || 0)}px ${-(viewportEl.scrollTop || 0)}px`,
      `${-(viewportEl.scrollLeft || 0)}px ${-(viewportEl.scrollTop || 0)}px`
    );
  }
  viewportEl.style.backgroundImage = layers.length ? layers.join(", ") : "none";
  viewportEl.style.backgroundSize = sizes.length ? sizes.join(", ") : "";
  viewportEl.style.backgroundRepeat = repeats.length ? repeats.join(", ") : "";
  viewportEl.style.backgroundPosition = positions.length ? positions.join(", ") : "";
  if (desktopStyleState.fillEnabled) {
    document.body.style.background = bodyFill || baseFill || "rgba(var(--desktop-fill-rgb), 1)";
  } else {
    document.body.style.background = "";
  }
  const surface = getDesktopSurface();
  if (surface) {
    surface.style.backgroundColor = "transparent";
    surface.style.backgroundImage = "none";
    surface.style.backgroundSize = "";
    surface.style.backgroundRepeat = "";
    surface.style.backgroundPosition = "";
  }
}
function applyDesktopStyle(style = desktopStyleState) {
  desktopStyleState = normalizeDesktopStyle(style);
  desktop.style.backgroundColor = "transparent";
  desktop.style.backgroundImage = "none";
  desktop.style.backgroundSize = "";
  desktop.style.backgroundRepeat = "";
  desktop.style.backgroundPosition = "";
  syncViewportDesktopBackground();
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
window.isControlMixed = isControlMixed;
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
function normalizeBorderLineStyle(value) {
  const style = String(value || "solid").trim().toLowerCase();
  return style === "dashed" || style === "dotted" ? style : "solid";
}
function getShapeBorderLineStyle(node) {
  if (!node) return "solid";
  return normalizeBorderLineStyle(node.dataset.borderStyle || node.style.borderStyle || "solid");
}
function getShapeBorderColor(node, fallback = "#111827") {
  const fromData = String(node?.dataset?.borderColor || "").trim();
  if (fromData && fromData !== "transparent") return fromData;
  const fromStyle = String(node?.style?.borderColor || "").trim();
  if (fromStyle && fromStyle !== "transparent") return fromStyle;
  const stroke = String(node?.querySelector?.(":scope > .shape-visual .shape-fill")?.getAttribute("stroke") || "").trim();
  if (stroke && stroke !== "transparent") return stroke;
  return fallback;
}
function setShapeBorderColor(node, color, fallback = "#111827") {
  if (!node) return fallback;
  const next = String(color || "").trim();
  const resolved = next && next !== "transparent" ? next : fallback;
  node.dataset.borderColor = resolved;
  node.style.borderColor = resolved;
  return resolved;
}
function getShapeStrokeDasharray(lineStyle, borderWidth = 1) {
  const width = Math.max(1, Number(borderWidth) || 1);
  if (lineStyle === "dashed") return `${Math.max(6, Math.round(width * 4))} ${Math.max(4, Math.round(width * 3))}`;
  if (lineStyle === "dotted") return `1 ${Math.max(4, Math.round(width * 2.5))}`;
  return "0";
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
  const usesTableThemeSurface = !!(
    node.classList?.contains("shape-table-chrome")
    || node.classList?.contains("shape-table-wrap")
    || node.classList?.contains("table-titlebar")
    || (node.tagName === "TD" && node.closest(".shape-table-grid"))
  );
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
    node.style.backgroundColor = fillEnabled ? fill1 : (usesTableThemeSurface ? "" : "transparent");
  }
  syncShapeVisualStyle(node);
}

function themeAwareColor(value, fallback, aliases = []) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const normalized = raw.toLowerCase();
  const known = [fallback, ...aliases]
    .map((item) => String(item || "").trim().toLowerCase())
    .filter(Boolean);
  return known.includes(normalized) ? fallback : raw;
}
function normalizeShapeVariant(value) {
  const key = String(value || "rectangle").trim();
  return SHAPE_VARIANTS[key] ? key : "rectangle";
}
function ensureShapeVisual(node) {
  if (!node || node.dataset.shapeType !== "shape-rect") return null;
  let svg = node.querySelector(":scope > .shape-visual");
  if (svg) return svg;
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "shape-visual");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  node.insertBefore(svg, node.firstChild);
  return svg;
}
function parseShapePoints(points) {
  return String(points || "")
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(",").map(Number))
    .filter((pair) => pair.length === 2 && Number.isFinite(pair[0]) && Number.isFinite(pair[1]))
    .map(([x, y]) => ({ x, y }));
}
function buildRoundedPolygonPath(points, radius = 0) {
  const pts = Array.isArray(points) ? points : [];
  if (pts.length < 3) return "";
  const safeRadius = Math.max(0, Number(radius) || 0);
  if (safeRadius <= 0) {
    return `M ${pts.map((pt) => `${pt.x} ${pt.y}`).join(" L ")} Z`;
  }
  const getLen = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const getPointTowards = (from, to, dist) => {
    const len = getLen(from, to) || 1;
    const t = Math.max(0, Math.min(0.5, dist / len));
    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t
    };
  };
  const corners = pts.map((curr, index) => {
    const prev = pts[(index - 1 + pts.length) % pts.length];
    const next = pts[(index + 1) % pts.length];
    const maxOffset = Math.min(getLen(curr, prev), getLen(curr, next)) / 2;
    const offset = Math.min(safeRadius, maxOffset);
    return {
      entry: getPointTowards(curr, prev, offset),
      corner: curr,
      exit: getPointTowards(curr, next, offset)
    };
  });
  let path = `M ${corners[0].exit.x} ${corners[0].exit.y}`;
  for (let i = 1; i <= corners.length; i += 1) {
    const prevCorner = corners[i - 1];
    const currentCorner = corners[i % corners.length];
    path += ` L ${currentCorner.entry.x} ${currentCorner.entry.y}`;
    path += ` Q ${currentCorner.corner.x} ${currentCorner.corner.y} ${currentCorner.exit.x} ${currentCorner.exit.y}`;
    if (i === corners.length) {
      path += ` L ${corners[0].entry.x} ${corners[0].entry.y}`;
      path += ` Q ${corners[0].corner.x} ${corners[0].corner.y} ${corners[0].exit.x} ${corners[0].exit.y}`;
    }
  }
  return `${path} Z`;
}
function getShapeCornerRadiusUnits(node) {
  if (!node) return 0;
  const pxRadius = Math.max(0, Number(node.dataset.cornerRadius || 0) || 0);
  if (!pxRadius) return 0;
  const width = Math.max(1, node.offsetWidth || Number.parseFloat(node.style.width || "") || 1);
  const height = Math.max(1, node.offsetHeight || Number.parseFloat(node.style.height || "") || 1);
  return (pxRadius / Math.min(width, height)) * 100;
}
function getShapeWidthPx(node) {
  return Math.max(1, node.offsetWidth || parseFloat(node.style.width) || 1);
}
function getChevronInsetDepthPx(node) {
  if (node?.dataset?.shapeInsetDepthPx != null && node.dataset.shapeInsetDepthPx !== "") {
    return clamp(Number(node.dataset.shapeInsetDepthPx) || 0, MIN_CHEVRON_INSET_PX, MAX_CHEVRON_INSET_PX);
  }
  const pct = getShapeVariantDepth(node, "chevron");
  return clamp((pct / 100) * getShapeWidthPx(node), MIN_CHEVRON_INSET_PX, MAX_CHEVRON_INSET_PX);
}
function setChevronInsetDepthPx(node, px) {
  const next = clamp(Number(px) || DEFAULT_CHEVRON_INSET_PX, MIN_CHEVRON_INSET_PX, MAX_CHEVRON_INSET_PX);
  node.dataset.shapeInsetDepthPx = String(Math.round(next * 10) / 10);
  return next;
}
function ensureChevronInsetDepthPx(node, value, mode = "px") {
  if (!node) return DEFAULT_CHEVRON_INSET_PX;
  if (node.dataset.shapeInsetDepthPx != null && node.dataset.shapeInsetDepthPx !== "") {
    return getChevronInsetDepthPx(node);
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    setChevronInsetDepthPx(node, DEFAULT_CHEVRON_INSET_PX);
    return getChevronInsetDepthPx(node);
  }
  if (mode === "percent") {
    setChevronInsetDepthPx(node, (numeric / 100) * getShapeWidthPx(node));
  } else {
    setChevronInsetDepthPx(node, numeric);
  }
  return getChevronInsetDepthPx(node);
}
function chevronDepthPxToPercent(node, depthPx) {
  return clamp((depthPx / getShapeWidthPx(node)) * 100, 0, 49);
}
function getVariantDepthConfig(variant) {
  if (variant === "chevron") {
    return { key: "shapeInsetDepth", min: MIN_CHEVRON_INSET_DEPTH, max: MAX_CHEVRON_INSET_DEPTH, fallback: DEFAULT_CHEVRON_INSET_DEPTH };
  }
  if (variant === "parallelogram") {
    return { key: "shapeSkewDepth", min: MIN_PARALLELOGRAM_SKEW, max: MAX_PARALLELOGRAM_SKEW, fallback: DEFAULT_PARALLELOGRAM_SKEW };
  }
  if (variant === "hexagon") {
    return { key: "shapeChamferDepth", min: MIN_HEXAGON_CHAMFER, max: MAX_HEXAGON_CHAMFER, fallback: DEFAULT_HEXAGON_CHAMFER };
  }
  return null;
}
function getShapeVariantDepth(node, variant = null) {
  const currentVariant = variant || normalizeShapeVariant(node?.dataset?.shapeVariant);
  const cfg = getVariantDepthConfig(currentVariant);
  if (!cfg) return 0;
  return Math.max(
    cfg.min,
    Math.min(cfg.max, Number(node?.dataset?.[cfg.key] || cfg.fallback) || cfg.fallback)
  );
}
function setShapeVariantDepth(node, variant, value) {
  const cfg = getVariantDepthConfig(variant);
  if (!node || !cfg) return 0;
  const next = Math.max(cfg.min, Math.min(cfg.max, Number(value) || cfg.fallback));
  node.dataset[cfg.key] = String(next);
  return next;
}
function getVariantPoints(node, variant, spec) {
  if (variant === "chevron") {
    const depth = chevronDepthPxToPercent(node, getChevronInsetDepthPx(node));
    return `0,0 ${100 - depth},0 100,50 ${100 - depth},100 0,100 ${depth},50`;
  }
  if (variant === "parallelogram") {
    const depth = getShapeVariantDepth(node, variant);
    return `${depth},0 100,0 ${100 - depth},100 0,100`;
  }
  if (variant === "hexagon") {
    const depth = getShapeVariantDepth(node, variant);
    return `${depth},0 ${100 - depth},0 100,50 ${100 - depth},100 ${depth},100 0,50`;
  }
  return spec?.points || "";
}
function findShapeParamHandle(node) {
  if (!node) return null;
  const local = node.querySelector(":scope > .shape-param-handle");
  if (local) return local;
  const shapeId = getControlOwnerId(node);
  if (!shapeId || !interactionControlsLayer?.isConnected) return null;
  return interactionControlsLayer.querySelector(`.shape-param-handle[data-lifted-from-shape="${shapeId}"]`);
}
function syncShapeParamHandle(node) {
  if (!node || node.dataset.shapeType !== "shape-rect") return;
  const variant = normalizeShapeVariant(node.dataset.shapeVariant);
  let handle = findShapeParamHandle(node);
  const cfg = getVariantDepthConfig(variant);
  if (!cfg) {
    if (handle) handle.remove();
    return;
  }
  if (!handle) {
    handle = document.createElement("div");
    handle.className = "shape-param-handle";
    handle.title = "Глубина врезки";
    let drag = null;
    handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      drag = true;
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", (event) => {
      if (!drag || (event.buttons & 1) !== 1) return;
      const rect = node.getBoundingClientRect();
      const currentVariant = normalizeShapeVariant(node.dataset.shapeVariant);
      if (currentVariant === "chevron") {
        const localX = event.clientX - rect.left;
        setChevronInsetDepthPx(node, localX);
      } else {
        const localX = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
        setShapeVariantDepth(node, currentVariant, localX);
      }
      renderShapeVisual(node);
      syncShapeVisualStyle(node);
      layoutConnectorPoints(node);
      renderConnectors();
      syncFormatPanel();
    });
    const stop = (event) => {
      if (!drag) return;
      drag = null;
      if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
      saveLayout();
    };
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
    node.appendChild(handle);
  }
  if (handle.parentElement === interactionControlsLayer) {
    syncLiftedControlsPosition(node);
    return;
  }
  const depth = getShapeVariantDepth(node, variant);
  if (variant === "chevron") {
    const depthPx = getChevronInsetDepthPx(node);
    handle.style.left = `${chevronDepthPxToPercent(node, depthPx)}%`;
    handle.style.top = "50%";
  } else if (variant === "parallelogram" || variant === "hexagon") {
    handle.style.left = `${depth}%`;
    handle.style.top = "0%";
  }
}
function renderShapeVisual(node) {
  if (!node || node.dataset.shapeType !== "shape-rect") return;
  const variant = normalizeShapeVariant(node.dataset.shapeVariant);
  node.dataset.shapeVariant = variant;
  const spec = SHAPE_VARIANTS[variant];
  if (!spec || spec.kind === "native") {
    node.dataset.shapeVisual = "0";
    const oldSvg = node.querySelector(":scope > .shape-visual");
    if (oldSvg) oldSvg.remove();
    syncShapeParamHandle(node);
    node.style.borderRadius = variant === "rounded" ? `${spec?.radius || 28}px` : `${Number(node.dataset.cornerRadius || 0) || 0}px`;
    return;
  }
  node.dataset.shapeVisual = "1";
  const svg = ensureShapeVisual(node);
  if (!svg) return;
  svg.innerHTML = "";
  const el = document.createElementNS("http://www.w3.org/2000/svg", spec.points ? "path" : spec.tag);
  el.setAttribute("class", "shape-fill");
  el.setAttribute("vector-effect", "non-scaling-stroke");
  if (spec.points) {
    const points = parseShapePoints(getVariantPoints(node, variant, spec));
    el.setAttribute("d", buildRoundedPolygonPath(points, getShapeCornerRadiusUnits(node)));
  } else {
    Object.entries(spec.attrs || {}).forEach(([key, value]) => el.setAttribute(key, String(value)));
  }
  svg.appendChild(el);
  syncShapeParamHandle(node);
  syncShapeVisualStyle(node);
}
function syncShapeVisualStyle(node) {
  if (!node || node.dataset.shapeType !== "shape-rect") return;
  const variant = normalizeShapeVariant(node.dataset.shapeVariant);
  const spec = SHAPE_VARIANTS[variant];
  const borderEnabled = node.dataset.borderEnabled !== "0";
  const borderWidth = borderEnabled ? Math.max(0, Number(node.dataset.borderWidth || parseInt(node.style.borderWidth || "1", 10) || 0)) : 0;
  const lineStyle = getShapeBorderLineStyle(node);
  const shadow = Math.max(0, Number(node.dataset.shadow || 0) || 0);
  if (!spec || spec.kind !== "svg") {
    syncShapeParamHandle(node);
    applyShadowStylesToNode(node, shadow);
    node.style.borderWidth = borderEnabled ? `${Math.max(0, borderWidth)}px` : "0px";
    node.style.borderStyle = lineStyle;
    if (variant === "rounded") {
      node.style.borderRadius = `${spec?.radius || 28}px`;
    } else {
      node.style.borderRadius = `${Number(node.dataset.cornerRadius || 0) || 0}px`;
    }
    const svg = node.querySelector(":scope > .shape-visual");
    if (svg) svg.style.filter = "";
    return;
  }
  const svg = node.querySelector(":scope > .shape-visual");
  const shape = svg ? svg.querySelector(".shape-fill") : null;
  if (!svg || !shape) return;
  const fillState = getFillStyleFromNode(node, "#ffffff");
  const borderColor = getShapeBorderColor(node);
  if (spec.points) {
    const points = parseShapePoints(getVariantPoints(node, variant, spec));
    shape.setAttribute("d", buildRoundedPolygonPath(points, getShapeCornerRadiusUnits(node)));
  }
  syncShapeParamHandle(node);
  // Keep CSS box border off for SVG shapes; stroke is drawn on .shape-fill.
  // Persist the real color in dataset so later syncs don't read "transparent".
  node.dataset.borderColor = borderColor;
  node.style.background = "transparent";
  node.style.border = "0px solid transparent";
  node.style.borderWidth = "0px";
  node.style.borderColor = "transparent";
  node.style.borderStyle = "solid";
  node.style.borderRadius = "0px";
  node.style.boxShadow = "none";
  svg.style.filter = shadowFilterFromValue(shadow);
  shape.setAttribute("stroke", borderEnabled ? borderColor : "transparent");
  shape.setAttribute("stroke-width", String(borderWidth));
  shape.setAttribute("stroke-dasharray", borderEnabled ? getShapeStrokeDasharray(lineStyle, borderWidth) : "0");
  shape.setAttribute("stroke-linecap", lineStyle === "dotted" ? "round" : "butt");
  shape.setAttribute("stroke-linejoin", "round");
  if (fillState.gradientEnabled && fillState.fillEnabled) {
    const gradientId = `${node.dataset.shapeId}-gradient`;
    const coords = fillState.fillDirection === "vertical"
      ? { x1: "0%", y1: "0%", x2: "0%", y2: "100%" }
      : fillState.fillDirection === "diagonal"
        ? { x1: "0%", y1: "0%", x2: "100%", y2: "100%" }
        : { x1: "0%", y1: "0%", x2: "100%", y2: "0%" };
    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }
    defs.innerHTML = `<linearGradient id="${gradientId}" x1="${coords.x1}" y1="${coords.y1}" x2="${coords.x2}" y2="${coords.y2}"><stop offset="0%" stop-color="${fillState.fill1}"/><stop offset="100%" stop-color="${fillState.fill2}"/></linearGradient>`;
    shape.setAttribute("fill", `url(#${gradientId})`);
  } else {
    const defs = svg.querySelector("defs");
    if (defs) defs.remove();
    shape.setAttribute("fill", fillState.fillEnabled ? fillState.fill1 : "transparent");
  }
}
function getShapeById(id) {
  const target = String(id || "").trim().toLowerCase();
  if (!target) return null;
  return Array.from(desktop.querySelectorAll(".shape")).find((node) => String(node.dataset.shapeId || "").trim().toLowerCase() === target) || null;
}
function getControlOwnerId(node) {
  if (!node) return "";
  return String(node.dataset.shapeId || node.dataset.connId || "").trim();
}
function getControlOwnerNode(id) {
  const target = String(id || "").trim();
  if (!target) return null;
  const shape = getShapeById(target);
  if (shape) return shape;
  return Array.from(desktop?.querySelectorAll?.(".sheet-window") || []).find(
    (node) => String(node.dataset.connId || "").trim() === target
  ) || null;
}
function parseNumericLikeTextInternal(value, opts = {}) {
  let normalized = String(value ?? "").trim();
  if (!normalized) return opts.strict ? null : 0;
  let hasExplicitPercent = false;
  if (normalized.endsWith("%")) {
    hasExplicitPercent = true;
    normalized = normalized.slice(0, -1).trim();
  }
  normalized = normalized.replace(/[ \u00A0\u202F]/g, "").replace(",", ".");
  if (opts.strict && !/^[+-]?\d+(?:\.\d+)?$/.test(normalized)) return null;
  const num = Number(normalized);
  if (!Number.isFinite(num)) return opts.strict ? null : 0;
  const formatPercent = String(opts.numberFormat || "").trim().toLowerCase() === NUMBER_FORMAT_PERCENT;
  return (hasExplicitPercent || formatPercent) ? num / 100 : num;
}
function parseNumericLikeText(value, opts = {}) {
  return parseNumericLikeTextInternal(value, opts);
}
function parseStrictNumericLikeText(value, opts = {}) {
  return parseNumericLikeTextInternal(value, { ...opts, strict: true });
}
function replacePercentLiteralsInExpression(expression) {
  return String(expression || "").replace(/(^|[+\-*/(,\s])([+-]?\d+(?:[.,]\d+)?)%/g, (_match, prefix, numericPart) => {
    const value = parseNumericLikeText(`${numericPart}%`);
    return `${prefix}(${String(value)})`;
  });
}
function normalizeFormulaExpressionBody(body) {
  return String(body || "").replace(/\s*\n\s*/g, " ");
}
function normalizeNumberFormat(value, fallback = NUMBER_FORMAT_NUMBER) {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === NUMBER_FORMAT_PERCENT) return NUMBER_FORMAT_PERCENT;
  if (raw === NUMBER_FORMAT_CURRENCY_RUB) return NUMBER_FORMAT_CURRENCY_RUB;
  if (raw === NUMBER_FORMAT_CURRENCY_USD) return NUMBER_FORMAT_CURRENCY_USD;
  return fallback;
}
function getNumberFormat(node, fallback = NUMBER_FORMAT_NUMBER) {
  if (!node?.dataset) return fallback;
  return normalizeNumberFormat(node.dataset.numberFormat, fallback);
}
function setNumberFormat(node, value) {
  if (!node?.dataset) return NUMBER_FORMAT_NUMBER;
  const normalized = normalizeNumberFormat(value, NUMBER_FORMAT_NUMBER);
  node.dataset.numberFormat = normalized;
  return normalized;
}
function setNumberFormatButtons(container, value, mixed = false) {
  if (!container) return;
  const normalized = normalizeNumberFormat(value, NUMBER_FORMAT_NUMBER);
  container.dataset.value = normalized;
  setControlMixedFlag(container, mixed);
  container.querySelectorAll("[data-number-format]").forEach((btn) => {
    btn.classList.toggle("active", !mixed && btn.dataset.numberFormat === normalized);
  });
}
function getNumberFormatButtonsValue(container) {
  return normalizeNumberFormat(container?.dataset?.value, NUMBER_FORMAT_NUMBER);
}
function formatNumberByStyle(value, opts = {}) {
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  const numberFormat = normalizeNumberFormat(opts.numberFormat, NUMBER_FORMAT_NUMBER);
  const decimalPlaces = normalizeFormulaDecimalPlaces(opts.decimalPlaces, null);
  const groupingEnabled = opts.numberGrouping !== false;
  let scaled = num;
  let prefix = "";
  let suffix = "";
  if (numberFormat === NUMBER_FORMAT_PERCENT) {
    scaled *= 100;
    suffix = "%";
  } else if (numberFormat === NUMBER_FORMAT_CURRENCY_RUB) {
    suffix = " ₽";
  } else if (numberFormat === NUMBER_FORMAT_CURRENCY_USD) {
    prefix = "$";
  }
  let text = formatFormulaNumber(scaled, decimalPlaces);
  if (groupingEnabled) text = formatGroupedNumber(text);
  return `${prefix}${text}${suffix}`;
}
function normalizeTableReferenceName(title) {
  const normalized = String(title || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N} ._-]+/gu, "")
    .replace(/[.]{2,}/g, ".")
    .replace(/^[-._]+|[-._]+$/g, "");
  return normalized || "Таблица";
}
function normalizeLegacyTableReferenceName(title) {
  return normalizeTableReferenceName(title).replace(/\s+/g, ".");
}
function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function syncTableReferenceName(node, title = null) {
  if (!node || node.dataset.shapeType !== "shape-table") return "";
  const next = normalizeTableReferenceName(title != null ? title : (node.dataset.tableTitle || ""));
  node.dataset.tableRef = next;
  return next;
}
function getTableNodes() {
  return Array.from(desktop.querySelectorAll('.shape[data-shape-type="shape-table"]'));
}
function getTableByReferenceName(refName) {
  const target = String(refName || "").trim().toLowerCase();
  if (!target) return null;
  return getTableNodes().find((node) => {
    const current = syncTableReferenceName(node);
    return current.toLowerCase() === target || normalizeLegacyTableReferenceName(current).toLowerCase() === target;
  }) || null;
}
function formatTableCellReferenceToken(tableRef, address) {
  const ref = String(tableRef || "").trim();
  const cellAddress = String(address || "").toUpperCase();
  if (!ref || !cellAddress) return "";
  return `${ref}[${cellAddress}]`;
}
function columnNameFromIndex(index) {
  let n = Number(index) + 1;
  if (!Number.isFinite(n) || n <= 0) return "";
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}
function parseFormulaCellAddress(address) {
  const match = String(address || "").toUpperCase().match(/^(\$?)([A-Z]+)(\$?)([1-9]\d*)$/);
  if (!match) return null;
  let colIndex = 0;
  for (const ch of match[2]) colIndex = (colIndex * 26) + (ch.charCodeAt(0) - 64);
  const rowIndex = Number(match[4]) - 1;
  if (!Number.isFinite(rowIndex) || rowIndex < 0) return null;
  return {
    raw: String(address || ""),
    c: colIndex - 1,
    r: rowIndex,
    colAbs: match[1] === "$",
    rowAbs: match[3] === "$",
    colLabel: match[2],
    rowLabel: match[4]
  };
}
function formatFormulaCellAddress(ref) {
  if (!ref) return "";
  const colLabel = columnNameFromIndex(ref.c);
  const rowLabel = String((Number(ref.r) || 0) + 1);
  if (!colLabel || !/^[1-9]\d*$/.test(rowLabel)) return "";
  return `${ref.colAbs ? "$" : ""}${colLabel}${ref.rowAbs ? "$" : ""}${rowLabel}`;
}
function shiftFormulaCellAddress(address, deltaRow = 0, deltaCol = 0, opts = {}) {
  const parsed = parseFormulaCellAddress(address);
  if (!parsed) return String(address || "");
  const respectAbsolute = opts.respectAbsolute === true;
  const nextRow = respectAbsolute && parsed.rowAbs ? parsed.r : parsed.r + (Number(deltaRow) || 0);
  const nextCol = respectAbsolute && parsed.colAbs ? parsed.c : parsed.c + (Number(deltaCol) || 0);
  if (!Number.isFinite(nextRow) || !Number.isFinite(nextCol) || nextRow < 0 || nextCol < 0) return String(address || "");
  return formatFormulaCellAddress({
    ...parsed,
    r: nextRow,
    c: nextCol
  });
}
function replaceStandaloneCellRanges(text, replacer) {
  return String(text || "").replace(STANDALONE_CELL_RANGE_RE, (match, prefix, fullRange) => {
    const [from, to] = String(fullRange || "").split(":");
    const next = typeof replacer === "function" ? replacer(from, to, fullRange) : fullRange;
    return `${prefix}${next}`;
  });
}
function replaceStandaloneCellAddresses(text, replacer) {
  return String(text || "").replace(STANDALONE_CELL_ADDRESS_RE, (match, prefix, address) => {
    const next = typeof replacer === "function" ? replacer(address) : address;
    return `${prefix}${next}`;
  });
}
function parseTableCellReferenceToken(token) {
  const raw = String(token || "").trim();
  let match = raw.match(new RegExp(`^(.*)\\[(${TABLE_CELL_ADDRESS_PATTERN})\\]$`, "u"));
  if (match) return { tableRef: match[1], address: String(match[2] || "").toUpperCase() };
  match = raw.match(new RegExp(`^(.*)_(${TABLE_CELL_ADDRESS_PATTERN})$`, "u"));
  if (!match) return null;
  return { tableRef: match[1], address: String(match[2] || "").toUpperCase() };
}
function replaceTableReferenceTokens(text, oldRefs, nextRef) {
  const refs = Array.from(new Set((oldRefs || []).map((ref) => String(ref || "").trim()).filter(Boolean)));
  if (!refs.length || !nextRef) return String(text || "");
  return String(text || "").replace(TABLE_CELL_REF_RE, (match) => {
    const parsed = parseTableCellReferenceToken(match);
    if (!parsed) return match;
    if (!refs.includes(String(parsed.tableRef || "").trim())) return match;
    return formatTableCellReferenceToken(nextRef, parsed.address);
  });
}
function remapCellAddressRows(address, rowMapper) {
  if (typeof rowMapper !== "function") return String(address || "");
  const parsed = parseFormulaCellAddress(address);
  if (!parsed) return String(address || "");
  const nextRow = rowMapper(parsed.r);
  if (!Number.isFinite(nextRow) || nextRow < 0) return String(address || "");
  return formatFormulaCellAddress({
    ...parsed,
    r: nextRow
  });
}
function remapCellAddressCols(address, colMapper) {
  if (typeof colMapper !== "function") return String(address || "");
  const parsed = parseFormulaCellAddress(address);
  if (!parsed) return String(address || "");
  const nextCol = colMapper(parsed.c);
  if (!Number.isFinite(nextCol) || nextCol < 0) return String(address || "");
  return formatFormulaCellAddress({
    ...parsed,
    c: nextCol
  });
}
function rewriteFormulaCellReferences(raw, opts = {}) {
  const text = String(raw || "");
  if (!text.trim().startsWith("=")) return text;
  const plainRowMapper = typeof opts.plainRowMapper === "function" ? opts.plainRowMapper : null;
  const plainColMapper = typeof opts.plainColMapper === "function" ? opts.plainColMapper : null;
  const tokenRowMapper = typeof opts.tokenRowMapper === "function" ? opts.tokenRowMapper : null;
  const tokenColMapper = typeof opts.tokenColMapper === "function" ? opts.tokenColMapper : null;
  const tokenRefs = new Set((opts.tokenRefs || []).map((ref) => String(ref || "").trim().toLowerCase()).filter(Boolean));
  let updated = text;
  const protectedTokens = [];
  const protectToken = (value) => {
    const marker = `__TABLE_TOKEN_${protectedTokens.length}__`;
    protectedTokens.push(String(value || ""));
    return marker;
  };
  if ((tokenRowMapper || tokenColMapper) && tokenRefs.size) {
    updated = updated.replace(TABLE_CELL_REF_RE, (match) => {
      const parsed = parseTableCellReferenceToken(match);
      if (!parsed) return match;
      if (!tokenRefs.has(String(parsed.tableRef || "").trim().toLowerCase())) return match;
      let nextAddress = parsed.address;
      if (tokenColMapper) nextAddress = remapCellAddressCols(nextAddress, tokenColMapper);
      if (tokenRowMapper) nextAddress = remapCellAddressRows(nextAddress, tokenRowMapper);
      return protectToken(formatTableCellReferenceToken(parsed.tableRef, nextAddress));
    });
  }
  const protectedRanges = [];
  const protectRange = (value) => {
    const marker = `__PLAIN_RANGE_${protectedRanges.length}__`;
    protectedRanges.push(String(value || ""));
    return marker;
  };
  if (plainRowMapper || plainColMapper) {
    updated = replaceStandaloneCellRanges(updated, (from, to) => {
      let nextFrom = from;
      let nextTo = to;
      if (plainColMapper) {
        nextFrom = remapCellAddressCols(nextFrom, plainColMapper);
        nextTo = remapCellAddressCols(nextTo, plainColMapper);
      }
      if (plainRowMapper) {
        nextFrom = remapCellAddressRows(nextFrom, plainRowMapper);
        nextTo = remapCellAddressRows(nextTo, plainRowMapper);
      }
      return protectRange(`${nextFrom}:${nextTo}`);
    });
    updated = replaceStandaloneCellAddresses(updated, (address) => {
      let nextAddress = address;
      if (plainColMapper) nextAddress = remapCellAddressCols(nextAddress, plainColMapper);
      if (plainRowMapper) nextAddress = remapCellAddressRows(nextAddress, plainRowMapper);
      return nextAddress;
    });
  }
  if (protectedRanges.length) {
    updated = updated.replace(/__PLAIN_RANGE_(\d+)__/g, (_match, index) => protectedRanges[Number(index)] || "");
  }
  if (protectedTokens.length) {
    updated = updated.replace(/__TABLE_TOKEN_(\d+)__/g, (_match, index) => protectedTokens[Number(index)] || "");
  }
  return updated;
}
function shiftFormulaReferencesForClipboard(raw, deltaRow = 0, deltaCol = 0) {
  const text = String(raw || "");
  if (!text.trim().startsWith("=")) return text;
  let updated = text;
  const protectedTokens = [];
  const protectToken = (value) => {
    const marker = `__CLIP_TABLE_TOKEN_${protectedTokens.length}__`;
    protectedTokens.push(String(value || ""));
    return marker;
  };
  const protectedRanges = [];
  const protectRange = (value) => {
    const marker = `__CLIP_RANGE_${protectedRanges.length}__`;
    protectedRanges.push(String(value || ""));
    return marker;
  };
  updated = updated.replace(TABLE_CELL_REF_RE, (match) => {
    const parsed = parseTableCellReferenceToken(match);
    if (!parsed) return match;
    return protectToken(formatTableCellReferenceToken(
      parsed.tableRef,
      shiftFormulaCellAddress(parsed.address, deltaRow, deltaCol, { respectAbsolute: true })
    ));
  });
  updated = replaceStandaloneCellRanges(updated, (from, to) => protectRange(
    `${shiftFormulaCellAddress(from, deltaRow, deltaCol, { respectAbsolute: true })}:${shiftFormulaCellAddress(to, deltaRow, deltaCol, { respectAbsolute: true })}`
  ));
  updated = replaceStandaloneCellAddresses(updated, (address) => shiftFormulaCellAddress(address, deltaRow, deltaCol, { respectAbsolute: true }));
  if (protectedRanges.length) {
    updated = updated.replace(/__CLIP_RANGE_(\d+)__/g, (_match, index) => protectedRanges[Number(index)] || "");
  }
  if (protectedTokens.length) {
    updated = updated.replace(/__CLIP_TABLE_TOKEN_(\d+)__/g, (_match, index) => protectedTokens[Number(index)] || "");
  }
  return updated;
}
function normalizeClipboardPlainText(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}
function renameTableReferencesInAllFormulas(oldTitle, nextTitle) {
  const oldRef = normalizeTableReferenceName(oldTitle);
  const oldLegacyRef = normalizeLegacyTableReferenceName(oldTitle);
  const nextRef = normalizeTableReferenceName(nextTitle);
  if (!oldRef || !nextRef || oldRef === nextRef) return false;
  let changed = false;
  getTableNodes().forEach((tableNode) => {
    const tableState = tableNode.__tableState;
    if (!tableState || !tableState.cells) return;
    tableState.cells.forEach((cell) => {
      const raw = String(cell.raw || "");
      if (!raw.trim().startsWith("=")) return;
      const updated = replaceTableReferenceTokens(raw, [oldRef, oldLegacyRef], nextRef);
      if (updated === raw) return;
      cell.raw = updated;
      changed = true;
    });
    if (changed && tableNode.__tableApi?.refreshDisplays) tableNode.__tableApi.refreshDisplays();
  });
  return changed;
}
function rewriteTableReferencesInRawFormula(raw, titleMap) {
  const mappings = titleMap instanceof Map ? Array.from(titleMap.entries()) : [];
  if (!mappings.length) return String(raw || "");
  let updated = String(raw || "");
  mappings.forEach(([oldTitle, nextTitle]) => {
    const oldRef = normalizeTableReferenceName(oldTitle);
    const oldLegacyRef = normalizeLegacyTableReferenceName(oldTitle);
    const nextRef = normalizeTableReferenceName(nextTitle);
    if (!oldRef || !nextRef || oldRef === nextRef) return;
    updated = replaceTableReferenceTokens(updated, [oldRef, oldLegacyRef], nextRef);
  });
  return updated;
}
function rewriteTableReferencesInTableFormulas(tableNode, titleMap) {
  if (!tableNode || tableNode.dataset.shapeType !== "shape-table" || !(titleMap instanceof Map) || !titleMap.size) return false;
  const tableState = tableNode.__tableState;
  if (!tableState?.cells) return false;
  let changed = false;
  tableState.cells.forEach((cell) => {
    const raw = String(cell.raw || "");
    if (!raw.trim().startsWith("=")) return;
    const nextRaw = rewriteTableReferencesInRawFormula(raw, titleMap);
    if (nextRaw === raw) return;
    cell.raw = nextRaw;
    changed = true;
  });
  if (changed) tableNode.__tableApi?.refreshDisplays?.();
  return changed;
}
function rewriteTableFormulasForRowChange(tableNode, opts = {}) {
  if (!tableNode || tableNode.dataset.shapeType !== "shape-table") return false;
  const tableState = tableNode.__tableState;
  if (!tableState?.cells) return false;
  const targetTable = opts.targetTable && opts.targetTable.dataset?.shapeType === "shape-table" ? opts.targetTable : null;
  const targetRef = targetTable ? syncTableReferenceName(targetTable) : syncTableReferenceName(tableNode);
  const targetLegacyRef = normalizeLegacyTableReferenceName(targetRef);
  let changed = false;
  tableState.cells.forEach((cell) => {
    const raw = String(cell.raw || "");
    if (!raw.trim().startsWith("=")) return;
    const targetCellMappers = tableNode === targetTable && typeof opts.getTargetCellMappers === "function"
      ? (opts.getTargetCellMappers(cell) || null)
      : null;
    const nextRaw = rewriteFormulaCellReferences(raw, {
      plainRowMapper: targetCellMappers
        ? (targetCellMappers.plainRowMapper || null)
        : (tableNode === targetTable ? opts.plainRowMapper : null),
      plainColMapper: targetCellMappers
        ? (targetCellMappers.plainColMapper || null)
        : (tableNode === targetTable ? opts.plainColMapper : null),
      tokenRowMapper: targetCellMappers
        ? (targetCellMappers.tokenRowMapper || null)
        : opts.tokenRowMapper,
      tokenColMapper: targetCellMappers
        ? (targetCellMappers.tokenColMapper || null)
        : opts.tokenColMapper,
      tokenRefs: [targetRef, targetLegacyRef]
    });
    if (nextRaw === raw) return;
    cell.raw = nextRaw;
    changed = true;
  });
  if (changed) tableNode.__tableApi?.refreshDisplays?.();
  return changed;
}
function rewriteShapeFormulasForTableChange(targetTable, opts = {}) {
  if (!targetTable || targetTable.dataset?.shapeType !== "shape-table") return false;
  const targetRef = syncTableReferenceName(targetTable);
  const targetLegacyRef = normalizeLegacyTableReferenceName(targetRef);
  let changed = false;
  desktop.querySelectorAll(".shape-text").forEach((textEl) => {
    if (!textEl?.dataset) return;
    const raw = textEl.dataset.rawText != null
      ? String(textEl.dataset.rawText || "")
      : String(textEl.innerText || textEl.textContent || "");
    if (!raw.trim().startsWith("=")) return;
    const nextRaw = rewriteFormulaCellReferences(raw, {
      tokenRowMapper: opts.tokenRowMapper,
      tokenColMapper: opts.tokenColMapper,
      tokenRefs: [targetRef, targetLegacyRef]
    });
    if (nextRaw === raw) return;
    textEl.dataset.rawText = nextRaw;
    if (textEl.contentEditable === "true") textEl.textContent = nextRaw;
    changed = true;
  });
  if (changed) refreshAllShapeDisplays();
  return changed;
}
function rewriteFormulaReferencesForTableChange(targetTable, opts = {}) {
  if (!targetTable || targetTable.dataset?.shapeType !== "shape-table") return false;
  let changed = false;
  getTableNodes().forEach((tableNode) => {
    if (rewriteTableFormulasForRowChange(tableNode, {
      targetTable,
      plainRowMapper: opts.plainRowMapper,
      plainColMapper: opts.plainColMapper,
      tokenRowMapper: opts.tokenRowMapper,
      tokenColMapper: opts.tokenColMapper,
      getTargetCellMappers: opts.getTargetCellMappers
    })) changed = true;
  });
  if (rewriteShapeFormulasForTableChange(targetTable, opts)) changed = true;
  return changed;
}
function getEditorRawText(editor) {
  if (!editor) return "";
  const isLiveEditing = editor.isContentEditable || editor.contentEditable === "true";
  if (isLiveEditing) {
    return String(editor.innerText || editor.textContent || "");
  }
  if (editor.dataset && editor.dataset.rawText != null) return String(editor.dataset.rawText);
  if (editor.dataset && editor.dataset.raw != null) return String(editor.dataset.raw);
  return String(editor.innerText || editor.textContent || "");
}
function syncEditorRawText(editor) {
  if (!editor) return "";
  const raw = String(editor.innerText || editor.textContent || "");
  if (editor.dataset) {
    if (editor.dataset.rawText != null) editor.dataset.rawText = raw;
    if (editor.dataset.raw != null) editor.dataset.raw = raw;
  }
  return raw;
}
function clearFormulaReferenceHighlights() {
  activeFormulaHighlights.forEach((entry) => {
    if (!entry || !entry.node) return;
    entry.node.classList.remove(entry.className || "formula-ref-active");
  });
  activeFormulaHighlights = [];
}
function addFormulaReferenceHighlight(node, className) {
  if (!node) return;
  node.classList.add(className);
  activeFormulaHighlights.push({ node, className });
}
function getCaretCharacterOffsetWithin(el) {
  const sel = window.getSelection();
  if (!el || !sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!el.contains(range.startContainer)) return null;
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length;
}
function collectFormulaReferences(raw) {
  const refs = [];
  const text = String(raw || "");
  for (const match of text.matchAll(new RegExp(SHAPE_REF_PATTERN, "g"))) {
    refs.push({ type: "shape", token: match[0], key: match[1], start: match.index || 0, end: (match.index || 0) + match[0].length });
  }
  for (const match of text.matchAll(TABLE_CELL_REF_RE)) {
    refs.push({ type: "cell", token: match[0], key: match[0], start: match.index || 0, end: (match.index || 0) + match[0].length });
  }
  refs.sort((a, b) => a.start - b.start);
  return refs;
}
function getFormulaReferenceNodes(ref) {
  if (!ref) return [];
  if (ref.type === "shape") {
    const shape = getShapeById(ref.key);
    return shape ? [{ node: shape, className: "formula-ref-active-shape" }] : [];
  }
  if (ref.type === "cell") {
    const parsed = parseTableCellReferenceToken(ref.key);
    if (!parsed) return [];
    const table = getTableByReferenceName(parsed.tableRef);
    if (!table || !table.__tableApi || !table.__tableApi.getCellElementByAddress) return [];
    const cell = table.__tableApi.getCellElementByAddress(parsed.address);
    return cell ? [{ node: cell, className: "formula-ref-active-cell" }] : [];
  }
  return [];
}
function refreshActiveFormulaReferenceHighlight() {
  clearFormulaReferenceHighlights();
  const editor = activeFormulaEditor;
  if (!editor || !editor.isConnected) return;
  const raw = getEditorRawText(editor);
  if (!String(raw || "").trim().startsWith("=")) return;
  const refs = collectFormulaReferences(raw);
  if (!refs.length) return;
  const caretOffset = getCaretCharacterOffsetWithin(editor);
  const targetRef = refs.find((ref) => {
    if (caretOffset == null) return false;
    return caretOffset >= ref.start && caretOffset <= ref.end;
  }) || refs.find((ref) => {
    if (caretOffset == null) return false;
    return caretOffset > 0 && (caretOffset - 1) >= ref.start && (caretOffset - 1) < ref.end;
  }) || refs[refs.length - 1];
  getFormulaReferenceNodes(targetRef).forEach((entry) => addFormulaReferenceHighlight(entry.node, entry.className));
}
function setActiveFormulaEditor(editor) {
  activeFormulaEditor = editor || null;
  refreshActiveFormulaReferenceHighlight();
}
function clearActiveFormulaEditor(editor = null) {
  if (!editor || activeFormulaEditor === editor) activeFormulaEditor = null;
  clearFormulaReferenceHighlights();
}
function isActiveFormulaEditing() {
  const editor = activeFormulaEditor;
  if (!editor || !editor.isConnected) return false;
  return String(getEditorRawText(editor) || "").trim().startsWith("=");
}
function insertFormulaReferenceToken(token, event = null) {
  const editor = activeFormulaEditor;
  if (!editor || !editor.isConnected || !isActiveFormulaEditing()) return false;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
  }
  insertTextAtCursor(editor, token);
  syncEditorRawText(editor);
  if (typeof editor.__relayout === "function") editor.__relayout();
  refreshAllFormulaDisplays();
  refreshActiveFormulaReferenceHighlight();
  saveLayout();
  return true;
}

function tryInsertFormulaReferenceFromTarget(target, event = null) {
  if (!isActiveFormulaEditing()) return false;
  const cell = target && target.closest ? target.closest(".shape-table-grid td") : null;
  if (cell && cell.dataset.refToken && (!activeFormulaEditor || !cell.contains(activeFormulaEditor))) {
    return insertFormulaReferenceToken(cell.dataset.refToken, event);
  }
  const shape = target && target.closest ? target.closest(".shape") : null;
  if (shape && shape.dataset.shapeId && (!activeFormulaEditor || !shape.contains(activeFormulaEditor))) {
    return insertFormulaReferenceToken(`@${shape.dataset.shapeId}`, event);
  }
  return false;
}
function getShapeFormulaValueById(id, visiting = new Set()) {
  const node = getShapeById(id);
  if (!node) return 0;
  if (node.dataset.shapeType === "shape-bitrix-card") {
    if (window.BitrixChart && window.BitrixChart.getBitrixCardFormulaValue) {
      return window.BitrixChart.getBitrixCardFormulaValue(node);
    }
    const stored = Number(node.dataset.bitrixCardValue);
    return Number.isFinite(stored) ? stored : 0;
  }
  const text = node.querySelector(".shape-text");
  const raw = text ? (text.dataset.rawText != null ? text.dataset.rawText : (text.innerText || text.textContent || "")) : "";
  const key = `shape:${String(node.dataset.shapeId || "").trim().toLowerCase()}`;
  if (key && visiting.has(key)) return "#CYCLE";
  if (key) visiting.add(key);
  const result = String(raw || "").trim().startsWith("=")
    ? evaluateShapeFormulaText(raw, visiting)
    : parseNumericLikeText(raw, { numberFormat: getNumberFormat(text) });
  if (key) visiting.delete(key);
  return result;
}
function getTableCellFormulaValueByToken(token, visiting = new Set()) {
  const parsed = parseTableCellReferenceToken(token);
  if (!parsed) return 0;
  const table = getTableByReferenceName(parsed.tableRef);
  if (!table || !table.__tableApi || !table.__tableApi.getCellValueByAddress) return 0;
  return table.__tableApi.getCellValueByAddress(parsed.address, visiting);
}
function evaluateShapeFormulaText(rawText, visiting = new Set()) {
  const raw = String(rawText ?? "").trim();
  if (!raw.startsWith("=")) return parseNumericLikeText(raw);
  let hasCycle = false;
  let expression = normalizeFormulaExpressionBody(raw.slice(1)).replace(SHAPE_REF_RE, (_m, shapeId) => {
    const value = getShapeFormulaValueById(shapeId, new Set(visiting));
    if (value === "#CYCLE") {
      hasCycle = true;
      return "NaN";
    }
    return typeof value === "string" ? "NaN" : String(value);
  });
  expression = expression.replace(TABLE_CELL_REF_RE, (match) => {
    const value = getTableCellFormulaValueByToken(match, new Set(visiting));
    if (value === "#CYCLE") {
      hasCycle = true;
      return "NaN";
    }
    return typeof value === "string" ? "NaN" : String(value);
  });
  expression = replacePercentLiteralsInExpression(expression);
  if (hasCycle) return "#CYCLE";
  if (!/^[0-9+\-*/().\s,NaN]+$/.test(expression)) return "#ERROR";
  try {
    const value = Function(`"use strict"; return (${expression.replace(/,/g, ".")});`)();
    return Number.isFinite(value) ? value : "#ERROR";
  } catch {
    return "#ERROR";
  }
}
function refreshAllShapeDisplays() {
  desktop.querySelectorAll(".shape-text").forEach((textEl) => {
    if (textEl.contentEditable === "true") return;
    renderShapeText(textEl);
  });
}
function refreshAllFormulaDisplays() {
  refreshAllShapeDisplays();
  desktop.querySelectorAll('.shape[data-shape-type="shape-table"]').forEach((node) => {
    if (node.__tableApi && node.__tableApi.refreshDisplays) node.__tableApi.refreshDisplays();
  });
  refreshActiveFormulaReferenceHighlight();
}
function selectionSupportsNumberFormatting() {
  if (!selectedShape && multiSelectedShapeIds.size) return true;
  if (!selectedShape) return false;
  if (selectedShape.dataset.shapeType === "shape-table") {
    if (selectedShape.__tableSelectionScope !== "cells" || !selectedShape.__tableApi?.getSelection) return false;
    const selection = selectedShape.__tableApi.getSelection();
    return !!(selection?.activeCell || (Array.isArray(selection?.cells) && selection.cells.length));
  }
  if (isBpProcessTask(selectedShape) || isBpProcessAutomation(selectedShape)) return false;
  return !!selectedShape.querySelector(".shape-text");
}
function getNumberGroupingEnabled(node) {
  if (!node) return true;
  if (node.dataset && node.dataset.numberGrouping != null) return node.dataset.numberGrouping !== "0";
  return true;
}
function normalizeFormulaDecimalPlaces(value, fallback = null) {
  if (value === "" || value == null) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(12, Math.round(n)));
}
function getFormulaDecimalPlaces(node) {
  if (!node || !node.dataset) return null;
  return normalizeFormulaDecimalPlaces(node.dataset.decimalPlaces, null);
}
function setFormulaDecimalPlaces(node, value) {
  if (!node || !node.dataset) return null;
  const normalized = normalizeFormulaDecimalPlaces(value, null);
  if (normalized == null) delete node.dataset.decimalPlaces;
  else node.dataset.decimalPlaces = String(normalized);
  return normalized;
}
function formatFormulaNumber(value, decimalPlaces = null) {
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  if (decimalPlaces == null) return String(num);
  const rounded = Number(num.toFixed(decimalPlaces));
  const safeValue = Object.is(rounded, -0) ? 0 : rounded;
  return safeValue.toFixed(decimalPlaces);
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
  if (textEl.contentEditable === "true") return;
  const raw = textEl.dataset.rawText != null ? String(textEl.dataset.rawText) : String(textEl.innerText || "");
  textEl.dataset.rawText = raw;
  const trimmed = raw.trim();
  if (!trimmed.startsWith("=")) {
    const textHtml = textEl.dataset.textHtml;
    if (textHtml && shapeTextHtmlHasInlineFormatting(textHtml)) {
      textEl.innerHTML = textHtml;
      syncShapeTextVerticalAlign(textEl);
      return;
    }
    const numericValue = parseStrictNumericLikeText(raw, { numberFormat: getNumberFormat(textEl) });
    textEl.textContent = numericValue == null
      ? applyNumberGroupingToText(raw, getNumberGroupingEnabled(textEl))
      : formatNumberByStyle(numericValue, {
        numberFormat: getNumberFormat(textEl),
        decimalPlaces: getFormulaDecimalPlaces(textEl),
        numberGrouping: getNumberGroupingEnabled(textEl)
      });
    return;
  }
  const value = evaluateShapeFormulaText(raw);
  textEl.textContent = typeof value === "string" ? value : formatNumberByStyle(value, {
    numberFormat: getNumberFormat(textEl),
    decimalPlaces: getFormulaDecimalPlaces(textEl),
    numberGrouping: getNumberGroupingEnabled(textEl)
  });
}
const SHAPE_TEXT_RICH_ALLOWED_TAGS = new Set(["SPAN", "BR", "B", "I", "U", "S", "STRONG", "EM"]);
const SHAPE_TEXT_RICH_ALLOWED_STYLES = new Set([
  "color", "font-weight", "font-style", "font-size", "font-family", "text-decoration"
]);
function isShapeTextRichFormattingAllowed(textEl) {
  if (!textEl) return false;
  const raw = textEl.dataset.rawText != null ? String(textEl.dataset.rawText) : String(textEl.innerText || "");
  return !isFormulaTextValue(raw);
}
function shapeTextHtmlHasInlineFormatting(html) {
  return /<(span|b|i|u|s|strong|em)\b/i.test(String(html || ""));
}
function filterShapeTextInlineStyle(styleText) {
  const out = [];
  String(styleText || "").split(";").forEach((chunk) => {
    const idx = chunk.indexOf(":");
    if (idx < 0) return;
    const key = chunk.slice(0, idx).trim().toLowerCase();
    const value = chunk.slice(idx + 1).trim();
    if (!SHAPE_TEXT_RICH_ALLOWED_STYLES.has(key) || !value) return;
    out.push(`${key}:${value}`);
  });
  return out.join(";");
}
function sanitizeShapeTextHtml(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = String(html || "");
  const unwrap = (el) => {
    const parent = el.parentNode;
    if (!parent) return;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  };
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      if (!SHAPE_TEXT_RICH_ALLOWED_TAGS.has(child.nodeName)) {
        unwrap(child);
        walk(node);
        return;
      }
      if (child.nodeName === "SPAN") {
        const style = filterShapeTextInlineStyle(child.getAttribute("style"));
        Array.from(child.attributes).forEach((attr) => child.removeAttribute(attr.name));
        if (style) child.setAttribute("style", style);
      } else {
        Array.from(child.attributes).forEach((attr) => child.removeAttribute(attr.name));
      }
      walk(child);
    });
  };
  walk(tpl.content);
  return tpl.innerHTML;
}
function syncShapeTextRichContent(textEl) {
  if (!textEl) return;
  const plain = textEl.innerText || textEl.textContent || "";
  textEl.dataset.rawText = plain;
  if (!isShapeTextRichFormattingAllowed(textEl)) {
    delete textEl.dataset.textHtml;
    return;
  }
  const html = sanitizeShapeTextHtml(textEl.innerHTML || "");
  if (shapeTextHtmlHasInlineFormatting(html)) textEl.dataset.textHtml = html;
  else delete textEl.dataset.textHtml;
}
function setShapeTextContentForEditing(textEl) {
  if (!textEl) return;
  const raw = textEl.dataset.rawText != null ? String(textEl.dataset.rawText) : "";
  if (isFormulaTextValue(raw)) {
    textEl.textContent = raw;
    return;
  }
  const html = textEl.dataset.textHtml;
  if (html && shapeTextHtmlHasInlineFormatting(html)) textEl.innerHTML = html;
  else textEl.textContent = raw;
}
function hasShapeTextRangeSelection(textEl) {
  if (!textEl || textEl.contentEditable !== "true" || !isShapeTextRichFormattingAllowed(textEl)) return false;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return false;
  const range = sel.getRangeAt(0);
  return textEl.contains(range.commonAncestorContainer);
}
const shapeTextSelectionStore = new WeakMap();
let shapeTextFormatPanelGesture = false;
function saveShapeTextSelection(textEl) {
  if (!textEl || textEl.contentEditable !== "true") return;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (!textEl.contains(range.commonAncestorContainer)) return;
  if (sel.isCollapsed) return;
  shapeTextSelectionStore.set(textEl, range.cloneRange());
}
function restoreShapeTextSelection(textEl) {
  const saved = shapeTextSelectionStore.get(textEl);
  if (!saved || !textEl) return false;
  const sel = window.getSelection();
  if (!sel) return false;
  sel.removeAllRanges();
  sel.addRange(saved);
  return true;
}
function clearShapeTextSelection(textEl) {
  if (textEl) shapeTextSelectionStore.delete(textEl);
}
function hasSavedShapeTextSelection(textEl) {
  return !!shapeTextSelectionStore.get(textEl);
}
function getShapeTextInlineFormatControls() {
  return [fpTextColor, fpFontFamily, fpFontSize, fpBold, fpItalic, fpStrike, fpUnderline, fpFontDecrease, fpFontIncrease].filter(Boolean);
}
function getInlineTextFormatControlFromTarget(target) {
  if (!target) return null;
  for (const ctrl of getShapeTextInlineFormatControls()) {
    if (ctrl === target) return ctrl;
    const label = ctrl.closest("label");
    if (label?.contains(target)) return ctrl;
    const field = ctrl.closest(".fp-spinner-wrap, .fp-text-quickbar-row");
    if (field?.contains(target)) return ctrl;
  }
  return null;
}
function ensureShapeTextEditingForPartialFormat(textEl) {
  if (!textEl || textEl.contentEditable === "true") return true;
  if (!hasSavedShapeTextSelection(textEl) || !selectedShape?.contains(textEl)) return false;
  textEl.dataset.editingBackup = textEl.dataset.rawText != null ? String(textEl.dataset.rawText) : String(textEl.innerText || "");
  textEl.dataset.editingBackupHtml = textEl.dataset.textHtml || "";
  setShapeTextContentForEditing(textEl);
  textEl.contentEditable = "true";
  setActiveFormulaEditor(textEl);
  return true;
}
function getShapeTextRangeSelectionForFormat(textEl) {
  if (!textEl || !isShapeTextRichFormattingAllowed(textEl)) return false;
  ensureShapeTextEditingForPartialFormat(textEl);
  if (textEl.contentEditable !== "true") return false;
  if (hasShapeTextRangeSelection(textEl)) return true;
  return restoreShapeTextSelection(textEl) && hasShapeTextRangeSelection(textEl);
}
function bindFormatPanelShapeTextSelectionGuard() {
  if (!formatPanel || formatPanel.dataset.shapeTextSelGuard === "1") return;
  formatPanel.dataset.shapeTextSelGuard = "1";
  formatPanel.addEventListener("mousedown", (event) => {
    const editor = activeFormulaEditor;
    if (!editor?.classList?.contains("shape-text") || editor.contentEditable !== "true") return;
    if (!formatPanel.contains(event.target)) return;
    shapeTextFormatPanelGesture = true;
    saveShapeTextSelection(editor);
  }, true);
}
function getShapeTextSelectionFormat(textEl) {
  if (!textEl) return null;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const node = sel.anchorNode;
  if (!node || !textEl.contains(node)) return null;
  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  if (!el || !textEl.contains(el)) return null;
  const cs = getComputedStyle(el);
  const deco = cs.textDecorationLine || cs.textDecoration || "";
  return {
    bold: cs.fontWeight === "700" || Number(cs.fontWeight) >= 600,
    italic: cs.fontStyle === "italic",
    strike: String(deco).includes("line-through"),
    underline: String(deco).includes("underline"),
    color: rgbToHex(cs.color || "#000000"),
    fontSize: Math.max(8, parseInt(cs.fontSize || "16", 10) || 16),
    fontFamily: cs.fontFamily || ""
  };
}
function applyShapeTextInlineFormat(textEl, options = {}) {
  if (!textEl || textEl.contentEditable !== "true" || !isShapeTextRichFormattingAllowed(textEl)) return false;
  if (!getShapeTextRangeSelectionForFormat(textEl)) return false;
  const sel = window.getSelection();
  const range = sel.getRangeAt(0).cloneRange();
  const styles = {};
  if (options.bold != null) styles.fontWeight = options.bold ? "700" : "400";
  if (options.italic != null) styles.fontStyle = options.italic ? "italic" : "normal";
  if (options.color) styles.color = options.color;
  if (options.fontSize != null) styles.fontSize = `${Math.max(8, Number(options.fontSize) || 8)}px`;
  if (options.fontFamily) styles.fontFamily = options.fontFamily;
  const deco = [];
  if (options.underline) deco.push("underline");
  if (options.strike) deco.push("line-through");
  if (options.underline != null || options.strike != null) {
    styles.textDecoration = deco.length ? deco.join(" ") : "none";
  }
  if (!Object.keys(styles).length) return false;
  const span = document.createElement("span");
  Object.assign(span.style, styles);
  const content = range.extractContents();
  span.appendChild(content);
  range.insertNode(span);
  range.selectNodeContents(span);
  sel.removeAllRanges();
  sel.addRange(range);
  syncShapeTextRichContent(textEl);
  syncShapeTextVerticalAlign(textEl);
  return true;
}
function bumpInlineStyleFontSize(styleText, delta) {
  const style = String(styleText || "");
  const match = /font-size\s*:\s*([^;]+)/i.exec(style);
  if (!match) return style;
  const next = clampFontSizeStep(parseFloat(match[1]) + delta);
  return style.replace(/font-size\s*:\s*[^;]+/i, `font-size:${next}px`);
}
function adjustShapeTextContentFontSizesBy(textEl, delta) {
  const step = Number(delta) || 0;
  if (!step || !textEl) return false;
  const rootNext = clampFontSizeStep(parseFloat(textEl.style.fontSize || getComputedStyle(textEl).fontSize) + step);
  textEl.style.fontSize = `${rootNext}px`;
  const bumpSpanFontSizes = (root) => {
    root.querySelectorAll("span[style]").forEach((span) => {
      const nextStyle = filterShapeTextInlineStyle(bumpInlineStyleFontSize(span.getAttribute("style"), step));
      if (nextStyle) span.setAttribute("style", nextStyle);
      else span.removeAttribute("style");
    });
  };
  if (textEl.contentEditable === "true" && isShapeTextRichFormattingAllowed(textEl)) {
    bumpSpanFontSizes(textEl);
    syncShapeTextRichContent(textEl);
    syncShapeTextVerticalAlign(textEl);
    renderShapeText(textEl);
    return true;
  }
  const html = textEl.dataset.textHtml;
  if (html && shapeTextHtmlHasInlineFormatting(html)) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    bumpSpanFontSizes(tpl.content);
    textEl.dataset.textHtml = sanitizeShapeTextHtml(tpl.innerHTML);
  }
  renderShapeText(textEl);
  return true;
}
function buildShapeTextFormatOptionsFromPanel(source = null) {
  const options = {};
  const include = (ctrl, key, value) => {
    if (!ctrl || isControlMixed(ctrl)) return;
    if (source && source !== ctrl) {
      const label = ctrl.closest("label");
      if (!label?.contains(source) && source !== label) return;
    }
    options[key] = value;
  };
  include(fpBold, "bold", !!fpBold?.checked);
  include(fpItalic, "italic", !!fpItalic?.checked);
  include(fpStrike, "strike", !!fpStrike?.checked);
  include(fpUnderline, "underline", !!fpUnderline?.checked);
  include(fpTextColor, "color", fpTextColor?.value);
  include(fpFontSize, "fontSize", Math.max(8, Number(fpFontSize?.value) || 8));
  include(fpFontFamily, "fontFamily", fontCssFromKey(fpFontFamily?.value));
  return options;
}
const DEFAULT_SHAPE_TEXT_PADDING = 10;
function getTextPaddingControls() {
  return [fpX, fpY, fpW, fpH, fpR].filter(Boolean);
}
function parseShapeTextPaddingPx(value, fallback = DEFAULT_SHAPE_TEXT_PADDING) {
  if (value == null || value === "") return fallback;
  const n = Number.parseFloat(String(value).replace("px", "").trim());
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : fallback;
}
function getShapeTextPaddingValues(text) {
  if (!text) {
    return {
      top: DEFAULT_SHAPE_TEXT_PADDING,
      right: DEFAULT_SHAPE_TEXT_PADDING,
      bottom: DEFAULT_SHAPE_TEXT_PADDING,
      left: DEFAULT_SHAPE_TEXT_PADDING
    };
  }
  const hasInlinePadding = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
    .some((key) => String(text.style[key] || "").trim());
  const tc = getComputedStyle(text);
  const readSide = (inlineKey, computedKey) => parseShapeTextPaddingPx(
    text.style[inlineKey] || (hasInlinePadding ? "" : tc[computedKey]),
    DEFAULT_SHAPE_TEXT_PADDING
  );
  return {
    top: readSide("paddingTop", "paddingTop"),
    right: readSide("paddingRight", "paddingRight"),
    bottom: readSide("paddingBottom", "paddingBottom"),
    left: readSide("paddingLeft", "paddingLeft")
  };
}
function applyShapeTextPaddingValues(text, pad) {
  if (!text || !pad) return;
  text.style.paddingTop = `${Math.max(0, Number(pad.top) || 0)}px`;
  text.style.paddingRight = `${Math.max(0, Number(pad.right) || 0)}px`;
  text.style.paddingBottom = `${Math.max(0, Number(pad.bottom) || 0)}px`;
  text.style.paddingLeft = `${Math.max(0, Number(pad.left) || 0)}px`;
}
function syncTextPaddingControlsFromText(text) {
  const pad = getShapeTextPaddingValues(text);
  const allEqual = pad.top === pad.right && pad.right === pad.bottom && pad.bottom === pad.left;
  if (fpX) fpX.value = String(pad.top);
  if (fpH) fpH.value = String(pad.bottom);
  if (fpW) fpW.value = String(pad.left);
  if (fpR) fpR.value = String(pad.right);
  if (fpY) fpY.value = allEqual ? String(pad.top) : "";
}
function readTextPaddingFromFormatPanel(formatSource) {
  if (formatSource === fpY) {
    const all = Math.max(0, Number(fpY?.value) || 0);
    return { top: all, right: all, bottom: all, left: all };
  }
  return {
    top: Math.max(0, Number(fpX?.value) || 0),
    left: Math.max(0, Number(fpW?.value) || 0),
    bottom: Math.max(0, Number(fpH?.value) || 0),
    right: Math.max(0, Number(fpR?.value) || 0)
  };
}
function isTextPaddingFormatControl(el) {
  return !!(el && getTextPaddingControls().includes(el));
}
function isInlineTextFormatControl(el) {
  return !!(el && [fpTextColor, fpFontFamily, fpFontSize, fpBold, fpItalic, fpStrike, fpUnderline].filter(Boolean).includes(el));
}
function isBlockTextFormatControl(el) {
  return !!(el && [fpWrap, fpScroll, fpNumberGrouping, fpNumberFormat, fpFormulaDecimals, fpX, fpY, fpW, fpH, fpR].filter(Boolean).includes(el));
}
function isAnyTextFormatControl(el) {
  return isInlineTextFormatControl(el) || isBlockTextFormatControl(el);
}
function isShapeScrollEnabled(node) {
  return !!(node && node.dataset && node.dataset.scrollEnabled === "1");
}
function applyShapeScrollState(node) {
  if (!node) return;
  const text = node.querySelector(".shape-text");
  if (!text) return;
  const enabled = isShapeScrollEnabled(node);
  text.style.overflow = enabled ? "auto" : "hidden";
  text.dataset.scrollEnabled = enabled ? "1" : "0";
}
function applyTableScrollState(tableWrap, enabled) {
  if (!tableWrap) return;
  tableWrap.style.overflow = enabled ? "auto" : "hidden";
}
const TABLE_FILTER_EMPTY_VALUE = "__EMPTY__";
const TABLE_FILTER_EMPTY_LABEL = "(Пустые)";
let tableColumnFilterPopup = null;
let tableColumnFilterSession = null;
function normalizeTableColumnFilters(source) {
  const out = {};
  if (!source || typeof source !== "object") return out;
  Object.entries(source).forEach(([key, raw]) => {
    const col = Number(key);
    if (!Number.isFinite(col) || col < 0 || !raw) return;
    const hiddenValues = Array.isArray(raw.hiddenValues) ? raw.hiddenValues.map((item) => String(item)) : [];
    const sort = raw.sort === "asc" || raw.sort === "desc" ? raw.sort : null;
    if (hiddenValues.length || sort) out[col] = { hiddenValues, sort };
  });
  return out;
}
function serializeTableColumnFilters(columnFilters) {
  const out = {};
  if (!columnFilters || typeof columnFilters !== "object") return out;
  Object.entries(columnFilters).forEach(([key, raw]) => {
    const col = Number(key);
    if (!Number.isFinite(col) || col < 0 || !raw) return;
    const hiddenValues = Array.isArray(raw.hiddenValues) ? raw.hiddenValues.slice() : [];
    const sort = raw.sort === "asc" || raw.sort === "desc" ? raw.sort : null;
    if (hiddenValues.length || sort) out[col] = { hiddenValues, sort };
  });
  return out;
}
function normalizeTableStyleRecord(style = {}) {
  if (!style || typeof style !== "object") return {};
  return {
    tableHeaderFill: style.tableHeaderFill ?? style.headerFill ?? "",
    tableHeaderFillEnabled: style.tableHeaderFillEnabled ?? style.headerFillEnabled,
    tableHeaderGradientEnabled: style.tableHeaderGradientEnabled ?? style.headerGradientEnabled,
    tableHeaderFill2: style.tableHeaderFill2 ?? style.headerFill2 ?? "",
    tableHeaderFillDirection: style.tableHeaderFillDirection ?? style.headerFillDirection ?? "horizontal",
    border: style.border ?? "",
    borderEnabled: style.borderEnabled,
    borderWidth: style.borderWidth,
    borderStyle: style.borderStyle ?? "solid",
    radius: style.radius,
    opacity: style.opacity,
    shadow: style.shadow
  };
}
function boolFromStyleValue(value, fallback = false) {
  if (value == null) return !!fallback;
  return value !== false && value !== "0" && value !== 0;
}
function closeTableColumnFilterPopup() {
  tableColumnFilterSession = null;
  if (tableColumnFilterPopup) tableColumnFilterPopup.classList.add("hidden");
}
function positionTableColumnFilterPopup(anchorRect) {
  if (!tableColumnFilterPopup || !anchorRect) return;
  const margin = 8;
  const popupRect = tableColumnFilterPopup.getBoundingClientRect();
  const viewportWidth = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 0);
  const viewportHeight = Math.max(240, window.innerHeight || document.documentElement.clientHeight || 0);
  let left = anchorRect.left;
  let top = anchorRect.bottom + margin;
  if (left + popupRect.width > viewportWidth - margin) left = Math.max(margin, viewportWidth - popupRect.width - margin);
  if (top + popupRect.height > viewportHeight - margin) top = Math.max(margin, anchorRect.top - popupRect.height - margin);
  tableColumnFilterPopup.style.left = `${left}px`;
  tableColumnFilterPopup.style.top = `${top}px`;
}
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
function selectionSupportsScrollOption() {
  if (selectedShape) return selectedShape.dataset.shapeType === "shape-rect" || selectedShape.dataset.shapeType === "shape-table";
  if (!multiSelectedShapeIds.size) return false;
  return getMultiSelectedShapes().some((node) => node.dataset.shapeType === "shape-rect" || node.dataset.shapeType === "shape-table");
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
  el.style.whiteSpace = wrap ? "pre-wrap" : "nowrap";
  el.style.overflowWrap = "anywhere";
  el.style.wordBreak = "break-word";
  el.style.width = wrap ? `${Math.max(20, Math.floor(widthPx || 0))}px` : "auto";
  el.textContent = String(text || " ");
  const rect = el.getBoundingClientRect();
  return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
}
function clampShadowValue(v) { return Math.max(0, Math.min(48, Number(v) || 0)); }
function isDarkThemeActive() {
  return !!document.body && document.body.classList.contains("dark");
}
function isDesktopFillDisabled() {
  return typeof desktopStyleState === "object" && desktopStyleState && desktopStyleState.fillEnabled === false;
}
function parseShadowValue(boxShadow) {
  const raw = String(boxShadow || "").trim();
  if (!raw || raw === "none") return 0;
  const values = raw.match(/-?\d*\.?\d+px/g) || [];
  if (values.length >= 3) return clampShadowValue(values[2]);
  if (values.length >= 1) return clampShadowValue(values[values.length - 1]);
  return 0;
}
function getShadowRenderParams(value) {
  const px = clampShadowValue(value);
  if (px <= 0) return null;
  if (isDarkThemeActive()) {
    const bareCanvas = isDesktopFillDisabled();
    return {
      blur: Math.max(bareCanvas ? 26 : 20, Math.round(px * (bareCanvas ? 3.4 : 2.7))),
      spread: Math.max(0, Math.round(px * (bareCanvas ? 0.3 : 0.15))),
      color: `rgba(226, 232, 240, ${bareCanvas ? 0.22 : 0.16})`,
      rimAlpha: bareCanvas ? 0.26 : 0.2
    };
  }
  return {
    blur: Math.max(4, Math.round(px * 2.8)),
    spread: Math.max(0, Math.round(px * 0.2)),
    color: `rgba(15, 23, 42, ${Math.min(0.3, 0.07 + px * 0.015).toFixed(3)})`,
    rimAlpha: null
  };
}
function shadowStyleFromValue(value) {
  const params = getShadowRenderParams(value);
  if (!params) return "none";
  if (params.rimAlpha != null) {
    return `0 0 ${params.blur}px ${params.spread}px ${params.color}, 0 0 0 1px rgba(226, 232, 240, ${params.rimAlpha})`;
  }
  return `0 0 ${params.blur}px ${params.spread}px ${params.color}`;
}
function shadowFilterFromValue(value) {
  const params = getShadowRenderParams(value);
  if (!params) return "";
  return `drop-shadow(0 0 ${params.blur}px ${params.color})`;
}
function nodeUsesPerimeterShadowFilter(node) {
  if (!node) return false;
  const type = node.dataset.shapeType;
  if (type === "shape-note") return true;
  if (type === "shape-rect") {
    const spec = SHAPE_VARIANTS[normalizeShapeVariant(node.dataset.shapeVariant)];
    return !spec || spec.kind !== "svg";
  }
  return false;
}
function applyShadowStylesToNode(node, value) {
  const px = clampShadowValue(value);
  if (nodeUsesPerimeterShadowFilter(node)) {
    node.style.boxShadow = "none";
    node.style.filter = shadowFilterFromValue(px) || "";
    return;
  }
  node.style.filter = "";
  node.style.boxShadow = shadowStyleFromValue(px);
}
function applyNodeShadow(node, value) {
  if (!node) return;
  const px = clampShadowValue(value);
  node.dataset.shadow = String(px);
  applyShadowStylesToNode(node, px);
  if (node.dataset.shapeType === "shape-rect") {
    const spec = SHAPE_VARIANTS[normalizeShapeVariant(node.dataset.shapeVariant)];
    if (spec?.kind === "svg") syncShapeVisualStyle(node);
  }
}
function applyTableShapeVisualState(node, tableState = null) {
  if (!node || node.dataset.shapeType !== "shape-table") return;
  const state = tableState || node.__tableState;
  const chrome = node.querySelector(".shape-table-chrome");
  if (!state || !chrome) return;
  const borderWidth = state.style.borderEnabled ? Math.max(0, Number(state.style.borderWidth) || 0) : 0;
  const borderStyle = normalizeBorderLineStyle(state.style.borderStyle || node.dataset.borderStyle || "solid");
  node.dataset.borderColor = state.style.border;
  node.dataset.borderEnabled = state.style.borderEnabled ? "1" : "0";
  node.dataset.borderWidth = String(state.style.borderWidth);
  node.dataset.borderStyle = borderStyle;
  node.dataset.radius = String(state.style.radius);
  node.dataset.opacity = String(state.style.opacity);
  node.dataset.shadow = String(state.style.shadow);
  node.style.background = "transparent";
  node.style.border = "0px solid transparent";
  node.style.borderWidth = "0px";
  node.style.borderColor = "transparent";
  node.style.borderStyle = "solid";
  node.style.borderRadius = "0px";
  node.style.boxShadow = "none";
  node.style.opacity = String(state.style.opacity);
  const radius = Math.max(0, Number(state.style.radius) || 0);
  const innerRadius = Math.max(0, radius - borderWidth);
  chrome.style.borderColor = "transparent";
  chrome.style.borderWidth = "0px";
  chrome.style.borderStyle = "solid";
  chrome.style.borderRadius = `${radius}px`;
  chrome.style.overflow = "hidden";
  chrome.style.clipPath = radius > 0 ? `inset(0 round ${radius}px)` : "";
  chrome.style.boxShadow = shadowStyleFromValue(state.style.shadow);
  if (state.style.borderEnabled && borderWidth > 0) {
    chrome.dataset.chromeBorder = "1";
    chrome.style.setProperty("--table-chrome-border-width", `${borderWidth}px`);
    chrome.style.setProperty("--table-chrome-border-color", state.style.border);
    chrome.style.setProperty("--table-chrome-border-style", borderStyle);
  } else {
    chrome.dataset.chromeBorder = "0";
    chrome.style.removeProperty("--table-chrome-border-width");
    chrome.style.removeProperty("--table-chrome-border-color");
    chrome.style.removeProperty("--table-chrome-border-style");
  }
  const titleBar = node.querySelector(".table-titlebar");
  const tableRoot = node.querySelector(".shape-table-root");
  const tableWrap = node.querySelector(".shape-table-wrap");
  if (titleBar) {
    titleBar.style.borderTopLeftRadius = radius > 0 ? `${innerRadius}px` : "";
    titleBar.style.borderTopRightRadius = radius > 0 ? `${innerRadius}px` : "";
  }
  if (tableRoot) {
    tableRoot.style.borderBottomLeftRadius = radius > 0 ? `${innerRadius}px` : "";
    tableRoot.style.borderBottomRightRadius = radius > 0 ? `${innerRadius}px` : "";
  }
  if (tableWrap) {
    tableWrap.style.borderBottomLeftRadius = radius > 0 ? `${innerRadius}px` : "";
    tableWrap.style.borderBottomRightRadius = radius > 0 ? `${innerRadius}px` : "";
  }
}

function refreshTableShapeFormatPanelState(node) {
  if (!node || node.dataset.shapeType !== "shape-table" || !node.__tableState) return;
  const state = node.__tableState;
  const titleBar = node.querySelector(".table-titlebar");
  const titleText = node.querySelector(".table-title-text");
  if (titleText) {
    titleText.style.fontFamily = fontCssFromKey(state.headerText.fontFamily || "Arial");
    titleText.style.color = state.headerText.color || "#334155";
    titleText.style.fontSize = `${Math.max(8, Number(state.headerText.fontSize) || 18)}px`;
    titleText.style.fontWeight = state.headerText.bold ? "700" : "600";
    titleText.style.fontStyle = state.headerText.italic ? "italic" : "normal";
    titleText.style.textDecoration = state.headerText.strike ? "line-through" : "none";
    titleText.style.whiteSpace = state.headerText.wrap ? "normal" : "nowrap";
    applyTableTitleAlign(titleBar, titleText, state.headerText.hAlign, state.headerText.vAlign);
  }
  if (titleBar) {
    applyFillStyle(titleBar, {
      fillEnabled: state.style.headerFillEnabled,
      gradientEnabled: state.style.headerGradientEnabled,
      fill1: state.style.headerFill,
      fill2: state.style.headerFill2,
      fillDirection: state.style.headerFillDirection
    });
  }
  applyTableShapeVisualState(node, state);
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
    desktopStyle: { ...DEFAULT_DESKTOP_STYLE },
    windows: [],
    shapes: [],
    connectors: []
  };
}

function createBlankDocumentLayout() {
  return {
    schemaVersion: DOCUMENT_LAYOUT_SCHEMA_VERSION,
    activeSheetId: 1,
    sheets: [{ id: 1, name: "Лист 1", layout: createBlankLayout() }]
  };
}

function defaultSheetName(sheetId) {
  return `Лист ${Math.max(1, Number(sheetId) || 1)}`;
}

function sameSheetId(a, b) {
  return Math.max(1, Number(a) || 0) === Math.max(1, Number(b) || 0);
}

function normalizeDocumentSheets(sheets) {
  const list = Array.isArray(sheets) ? sheets.slice() : [];
  const normalized = list
    .map((sheet, index) => {
      const id = Math.max(1, Number(sheet?.id) || index + 1);
      const name = String(sheet?.name || "").trim() || defaultSheetName(id);
      return {
        id,
        name,
        layout: migrateLayout(sheet?.layout || createBlankLayout())
      };
    })
    .sort((a, b) => a.id - b.id);
  if (!normalized.length) {
    normalized.push({ id: 1, name: "Лист 1", layout: createBlankLayout() });
  }
  const used = new Set();
  normalized.forEach((sheet) => {
    while (used.has(sheet.id)) sheet.id += 1;
    used.add(sheet.id);
  });
  return normalized;
}

function migrateDocumentLayout(layout) {
  const raw = cloneLayout(layout || createBlankDocumentLayout());
  if (Array.isArray(raw.sheets)) {
    const sheets = normalizeDocumentSheets(raw.sheets);
    let activeSheetId = Math.max(1, Number(raw.activeSheetId) || sheets[0].id);
    if (!sheets.some((sheet) => sheet.id === activeSheetId)) activeSheetId = sheets[0].id;
    return {
      schemaVersion: DOCUMENT_LAYOUT_SCHEMA_VERSION,
      activeSheetId,
      sheets
    };
  }
  const singleLayout = migrateLayout(raw);
  return {
    schemaVersion: DOCUMENT_LAYOUT_SCHEMA_VERSION,
    activeSheetId: 1,
    sheets: [{ id: 1, name: "Лист 1", layout: singleLayout }]
  };
}

function getDocumentSheetById(sheetId) {
  const id = Math.max(1, Number(sheetId) || 1);
  return documentSheetsState.find((sheet) => Number(sheet.id) === id) || null;
}

function flushCurrentSheetLayout(layoutOverride = null) {
  const sheet = getDocumentSheetById(currentSheetId);
  if (!sheet) return;
  sheet.layout = cloneLayout(layoutOverride || getCurrentLayout());
}

function buildDocumentLayoutPayload() {
  flushCurrentSheetLayout();
  return {
    schemaVersion: DOCUMENT_LAYOUT_SCHEMA_VERSION,
    activeSheetId: currentSheetId,
    sheets: documentSheetsState.map((sheet) => ({
      id: sheet.id,
      name: sheet.name,
      layout: cloneLayout(sheet.layout || createBlankLayout())
    }))
  };
}

function resetHistoryStacks() {
  undoStack.length = 0;
  redoStack.length = 0;
  if (canEditCurrentDocument()) pushHistorySnapshot();
  updateHistoryButtons();
}

function applyDocumentLayout(docLayout, preferredSheetId = null) {
  const normalized = migrateDocumentLayout(docLayout);
  documentSheetsState = normalized.sheets.map((sheet) => ({
    id: Number(sheet.id),
    name: sheet.name,
    layout: cloneLayout(sheet.layout)
  }));
  const hasPreferred = preferredSheetId != null && preferredSheetId !== "" && Number(preferredSheetId) > 0;
  let sheetId = hasPreferred
    ? Math.max(1, Number(preferredSheetId) || 1)
    : Math.max(1, Number(normalized.activeSheetId) || documentSheetsState[0]?.id || 1);
  if (!getDocumentSheetById(sheetId)) sheetId = documentSheetsState[0]?.id || 1;
  currentSheetId = sheetId;
  const loaded = applyLayout(getDocumentSheetById(sheetId)?.layout || createBlankLayout());
  resetHistoryStacks();
  renderSheetSwitcher();
  syncSheetSwitcherPanel(false);
  return loaded;
}

function nextDocumentSheetId() {
  let maxId = 0;
  documentSheetsState.forEach((sheet) => {
    maxId = Math.max(maxId, Number(sheet.id) || 0);
  });
  return maxId + 1;
}

async function switchToSheet(sheetId, opts = {}) {
  const targetId = Math.max(1, Number(sheetId) || 0);
  if (!targetId || sameSheetId(targetId, currentSheetId)) return false;
  const targetSheet = getDocumentSheetById(targetId);
  if (!targetSheet) return false;
  const previousId = currentSheetId;
  clearTimeout(pendingHistoryTimer);
  pendingHistoryTimer = null;
  clearTimeout(pendingPersistTimer);
  pendingPersistTimer = null;
  if (canEditCurrentDocument()) flushCurrentSheetLayout();
  currentSheetId = targetId;
  if (sheetSwitcherCurrent) sheetSwitcherCurrent.textContent = targetSheet.name || defaultSheetName(targetId);
  try {
    applyLayout(cloneLayout(targetSheet.layout || createBlankLayout()));
  } catch (err) {
    console.error("Failed to open sheet:", err);
    currentSheetId = previousId;
    try {
      applyLayout(cloneLayout(getDocumentSheetById(previousId)?.layout || createBlankLayout()));
    } catch (rollbackErr) {
      console.error("Failed to rollback sheet:", rollbackErr);
    }
    renderSheetSwitcher();
    syncSheetSwitcherPanel(sheetSwitcherOpen);
    showHint("Не удалось открыть лист.", "error", 2500);
    return false;
  }
  resetHistoryStacks();
  renderSheetSwitcher();
  syncSheetSwitcherPanel(!!opts.keepPanelOpen);
  if (opts.updateUrl !== false && currentDocumentId && !guestPublicView) {
    navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: opts.replace !== false });
  }
  if (canEditCurrentDocument() && autoSaveEnabled) {
    try {
      await persistCurrentDocument();
    } catch (err) {
      console.error("Failed to persist sheet switch:", err);
    }
  }
  saveViewportState();
  return true;
}

async function addDocumentSheet() {
  if (!canEditCurrentDocument()) return null;
  flushCurrentSheetLayout();
  const id = nextDocumentSheetId();
  const sheet = { id, name: defaultSheetName(id), layout: createBlankLayout() };
  documentSheetsState.push(sheet);
  documentSheetsState.sort((a, b) => a.id - b.id);
  await switchToSheet(id, { replace: false, keepPanelOpen: true });
  showHint(`Создан ${sheet.name}`, "warning", 1600);
  return sheet;
}

async function deleteDocumentSheet(sheetId) {
  if (!canEditCurrentDocument()) return false;
  const id = Math.max(1, Number(sheetId) || 0);
  if (documentSheetsState.length <= 1) {
    showHint("Нельзя удалить последний лист.", "warning", 2200);
    return false;
  }
  const sheet = getDocumentSheetById(id);
  if (!sheet) return false;
  const ok = window.confirm(`Удалить лист "${sheet.name}"?`);
  if (!ok) return false;
  flushCurrentSheetLayout();
  documentSheetsState = documentSheetsState.filter((item) => item.id !== id);
  if (currentSheetId === id) {
    const nextSheet = documentSheetsState[0];
    currentSheetId = nextSheet.id;
    applyLayout(nextSheet.layout || createBlankLayout());
    resetHistoryStacks();
    if (currentDocumentId && !guestPublicView) {
      navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: true });
    }
  }
  renderSheetSwitcher();
  syncSheetSwitcherPanel(sheetSwitcherOpen);
  if (autoSaveEnabled) await persistCurrentDocument();
  showHint(`Лист "${sheet.name}" удалён`, "warning", 1600);
  return true;
}

async function renameDocumentSheet(sheetId, name) {
  if (!canEditCurrentDocument()) return false;
  const sheet = getDocumentSheetById(sheetId);
  if (!sheet) return false;
  const nextName = String(name || "").trim() || defaultSheetName(sheet.id);
  if (sheet.name === nextName) return true;
  sheet.name = nextName;
  renderSheetSwitcher();
  syncSheetSwitcherPanel(sheetSwitcherOpen);
  if (autoSaveEnabled) await persistCurrentDocument();
  return true;
}

function syncSheetSwitcherPanel(open = sheetSwitcherOpen) {
  sheetSwitcherOpen = !!open;
  if (sheetSwitcherPanel) sheetSwitcherPanel.classList.toggle("hidden", !sheetSwitcherOpen);
  if (sheetSwitcherToggle) sheetSwitcherToggle.setAttribute("aria-expanded", sheetSwitcherOpen ? "true" : "false");
}

function syncSheetSwitcherVisibility() {
  if (!sheetSwitcher) return;
  const visible = !!currentDocumentId && documentSheetsState.length > 0;
  sheetSwitcher.classList.toggle("hidden", !visible);
}

function renderSheetSwitcher() {
  syncSheetSwitcherVisibility();
  const activeSheet = getDocumentSheetById(currentSheetId);
  if (sheetSwitcherCurrent) sheetSwitcherCurrent.textContent = activeSheet?.name || defaultSheetName(currentSheetId);
  if (!sheetSwitcherList) return;
  sheetSwitcherList.innerHTML = "";
  const editable = canEditCurrentDocument();
  documentSheetsState.forEach((sheet) => {
    const item = document.createElement("li");
    const isActive = sameSheetId(sheet.id, currentSheetId);
    item.className = `sheet-switcher-item${isActive ? " is-active" : ""}`;
    item.dataset.sheetId = String(sheet.id);
    const name = document.createElement("button");
    name.type = "button";
    name.className = "sheet-switcher-name";
    name.textContent = sheet.name;
    name.title = sheet.name;
    let sheetNameClickTimer = null;
    name.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Delay single-click actions so dblclick can rename without closing/rebuilding the panel first.
      if (sheetNameClickTimer) {
        clearTimeout(sheetNameClickTimer);
        sheetNameClickTimer = null;
      }
      if (e.detail > 1) return;
      sheetNameClickTimer = setTimeout(() => {
        sheetNameClickTimer = null;
        if (!sameSheetId(sheet.id, currentSheetId)) void switchToSheet(sheet.id);
        else syncSheetSwitcherPanel(false);
      }, 280);
    });
    if (editable) {
      name.addEventListener("dblclick", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sheetNameClickTimer) {
          clearTimeout(sheetNameClickTimer);
          sheetNameClickTimer = null;
        }
        startSheetNameEdit(sheet.id, name);
      });
    }
    item.appendChild(name);
    if (editable) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "sheet-switcher-delete";
      deleteBtn.setAttribute("aria-label", `Удалить ${sheet.name}`);
      deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M8 7l1 12h6l1-12"/></svg>';
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        void deleteDocumentSheet(sheet.id);
      });
      item.appendChild(deleteBtn);
    }
    sheetSwitcherList.appendChild(item);
  });
  if (sheetSwitcherAdd) sheetSwitcherAdd.classList.toggle("hidden", !editable);
}

function startSheetNameEdit(sheetId, nameEl) {
  const sheet = getDocumentSheetById(sheetId);
  if (!sheet || !nameEl || !canEditCurrentDocument()) return;
  syncSheetSwitcherPanel(true);
  const input = document.createElement("input");
  input.type = "text";
  input.className = "sheet-switcher-name-input";
  input.value = sheet.name;
  let finished = false;
  nameEl.replaceWith(input);
  input.focus();
  input.select();
  const finish = (save) => {
    if (finished) return;
    finished = true;
    if (save) void renameDocumentSheet(sheetId, input.value);
    else renderSheetSwitcher();
    syncSheetSwitcherPanel(true);
  };
  input.addEventListener("blur", () => finish(true));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      finish(false);
    }
  });
}

function initSheetSwitcher() {
  if (!sheetSwitcherToggle) return;
  sheetSwitcherToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const nextOpen = !sheetSwitcherOpen;
    if (nextOpen) renderSheetSwitcher();
    syncSheetSwitcherPanel(nextOpen);
  });
  if (sheetSwitcherAdd) {
    sheetSwitcherAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      void addDocumentSheet();
    });
  }
  document.addEventListener("pointerdown", (e) => {
    if (!sheetSwitcherOpen || !sheetSwitcher) return;
    if (sheetSwitcher.contains(e.target)) return;
    syncSheetSwitcherPanel(false);
  });
}

function createDocId() {
  if (window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return Math.random().toString(16).slice(2, 14).padEnd(12, "0").slice(0, 12);
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
  safe.desktopStyle = normalizeDesktopStyle(safe.desktopStyle || DEFAULT_DESKTOP_STYLE);
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
    if (!layout) layout = createBlankDocumentLayout();
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
      layout: createBlankDocumentLayout(),
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
      layout: createBlankDocumentLayout(),
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
  syncCurrentDocumentTitle();
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
function syncCurrentDocumentTitle() {
  const name = String(currentDocumentName || "").trim() || "Рабочий стол";
  if (currentDocumentTitle) {
    currentDocumentTitle.textContent = name;
    currentDocumentTitle.title = name;
  }
  document.title = `${name} - MMTable`;
}

function parseAppRoute(pathname = window.location.pathname) {
  const path = String(pathname || "/");
  if (path === "/login") return { mode: "login" };
  if (path === "/register") return { mode: "register" };
  const docWithSheetRe = new RegExp(`^/d/(${DOC_ID_PATTERN})/([1-9][0-9]*)$`, "i");
  const docIdRe = new RegExp(`^/d/(${DOC_ID_PATTERN})$`, "i");
  const publicLegacyRe = new RegExp(`^/p/(${DOC_ID_PATTERN})/([^/]+)$`, "i");
  const publicShortRe = /^\/p\/([0-9a-f]{12})$/i;
  let match = path.match(docWithSheetRe);
  if (match) return { mode: "document", docId: match[1], sheetId: Number(match[2]) || 1 };
  match = path.match(docIdRe);
  if (match) return { mode: "document", docId: match[1], sheetId: null };
  match = path.match(publicLegacyRe);
  if (match) return { mode: "public", docId: match[1], token: match[2], sheetId: null };
  match = path.match(publicShortRe);
  if (match) return { mode: "public", token: match[1], sheetId: null };
  return { mode: "home" };
}

function buildDocumentPath(docId, sheetId = 1) {
  const sid = Math.max(1, Number(sheetId) || 1);
  return `/d/${encodeURIComponent(docId)}/${sid}`;
}

function buildPublicPath(token) {
  return `/p/${encodeURIComponent(token)}`;
}

function navigateToDocument(docId, opts = {}) {
  if (!docId || guestPublicView) return;
  const sheetId = Math.max(1, Number(opts.sheetId ?? currentSheetId) || 1);
  const path = buildDocumentPath(docId, sheetId);
  const state = { docId, sheetId };
  if (opts.replace) history.replaceState(state, "", path);
  else if (window.location.pathname !== path) history.pushState(state, "", path);
}

function persistPendingRoute(route) {
  if (!route) {
    sessionStorage.removeItem(APP_ROUTE_PENDING_KEY);
    return;
  }
  sessionStorage.setItem(APP_ROUTE_PENDING_KEY, JSON.stringify(route));
}

function readPendingRoute() {
  try {
    const raw = sessionStorage.getItem(APP_ROUTE_PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function consumePendingRoute() {
  const route = readPendingRoute();
  sessionStorage.removeItem(APP_ROUTE_PENDING_KEY);
  return route;
}

function rememberAuthReturnRoute() {
  const route = parseAppRoute();
  if (route.mode === "document") persistPendingRoute(route);
  else if (route.mode === "home" && currentDocumentId && currentUser) {
    persistPendingRoute({ mode: "document", docId: currentDocumentId });
  }
}

function roleLabel(role) {
  const map = {
    owner: "Владелец",
    admin: "Администратор",
    editor: "Редактор",
    commenter: "Комментатор",
    reader: "Просмотр"
  };
  return map[String(role || "").toLowerCase()] || "Доступ";
}

function getCurrentDocumentRole() {
  const cached = documentsCache.find((doc) => doc && doc.id === currentDocumentId);
  const cachedRole = cached && cached.role ? String(cached.role).toLowerCase() : "";
  const liveRole = String(currentDocumentRole || "").toLowerCase();
  // Prefer cache when it knows the active doc — avoids a stale role after switching documents.
  if (cachedRole) {
    if (cachedRole !== liveRole) currentDocumentRole = cachedRole;
    return cachedRole;
  }
  return liveRole;
}

function canShareCurrentDocument() {
  const role = getCurrentDocumentRole();
  return !guestPublicView && currentUser && ["owner", "admin", "editor"].includes(role);
}

function canManagePublicLinkCurrentDocument() {
  return canShareCurrentDocument();
}

function canEditCurrentDocument() {
  if (guestPublicView) return false;
  return currentUser && ["owner", "admin", "editor"].includes(getCurrentDocumentRole());
}

function isWorkspaceReadOnly() {
  return !canEditCurrentDocument() && (guestPublicView || !!currentUser);
}

function canCommentCurrentDocument() {
  if (guestPublicView) return false;
  return currentUser && ["owner", "admin", "editor", "commenter"].includes(getCurrentDocumentRole());
}

function canViewCommentsPanel() {
  return canCommentCurrentDocument();
}

function canResolveComments() {
  return canEditCurrentDocument();
}

function exitGuestPublicView() {
  if (!guestPublicView) return false;
  guestPublicView = false;
  guestPublicToken = "";
  return true;
}

function setGuestPublicHidden(el, hidden) {
  if (!el) return;
  el.classList.toggle("guest-public-hidden", !!hidden);
}

function syncGuestPublicUi() {
  const isGuest = guestPublicView;
  const guestAuthed = isGuest && !!currentUser;
  document.body.classList.toggle("workspace-guest-auth", guestAuthed);

  setGuestPublicHidden(undoBtn, isGuest);
  setGuestPublicHidden(redoBtn, isGuest);
  setGuestPublicHidden(addWindowBtn, isGuest);
  setGuestPublicHidden(shapeMenuSection, isGuest);
  setGuestPublicHidden(formatToggleLabel, isGuest);
  setGuestPublicHidden(objectsToggleLabel, isGuest);
  setGuestPublicHidden(objectsToolbar, isGuest);
  setGuestPublicHidden(profileBtn, isGuest);
  setGuestPublicHidden(fileSubmenuSection, isGuest && !guestAuthed);

  const trimFileMenu = isGuest && guestAuthed;
  setGuestPublicHidden(fileShareBtn, trimFileMenu);
  setGuestPublicHidden(fileCommentsBtn, trimFileMenu);
  setGuestPublicHidden(fileDeleteBtn, trimFileMenu);
  setGuestPublicHidden(fileCopyBtn, trimFileMenu);
  setGuestPublicHidden(fileCopyLinkBtn, trimFileMenu);
  if (fileAutosaveToggle && fileAutosaveToggle.closest("label")) {
    setGuestPublicHidden(fileAutosaveToggle.closest("label"), trimFileMenu);
  }

  if (isGuest) {
    if (formatToggle) formatToggle.checked = false;
    if (formatPanel) formatPanel.classList.add("hidden");
    closeAllMenus();
  }
  syncObjectsToolbarVisibility();
}

function syncWorkspaceAccessMode() {
  const readonly = isWorkspaceReadOnly();
  document.body.classList.toggle("workspace-readonly", readonly);
  document.body.classList.toggle("workspace-guest-public", guestPublicView);
  if (readonly) clearSelection();
  updateWorkspaceAccessBanner();
  syncGuestPublicUi();
  updateCurrentDocumentCapabilities();
  syncConnectorModifierChrome();
}

function getPersonalAccessForCurrentPublicDoc() {
  if (!currentUser || !currentDocumentId) return null;
  return documentsCache.find((doc) => doc.id === currentDocumentId) || null;
}

function updateWorkspaceAccessBanner() {
  let banner = document.getElementById("workspaceAccessBanner");
  const ensureBanner = () => {
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "workspaceAccessBanner";
      banner.className = "workspace-view-mode-label";
      banner.setAttribute("role", "status");
      const host = document.querySelector(".app") || document.body;
      host.appendChild(banner);
    } else {
      banner.className = "workspace-view-mode-label";
    }
    return banner;
  };
  const removeBanner = () => {
    if (banner) banner.remove();
    banner = null;
  };

  const readonly = guestPublicView || document.body.classList.contains("workspace-readonly");
  if (!readonly) {
    removeBanner();
    return;
  }

  const el = ensureBanner();
  el.replaceChildren();
  const text = document.createElement("span");
  text.textContent = "режим просмотра";
  el.appendChild(text);

  if (guestPublicView) {
    const personal = getPersonalAccessForCurrentPublicDoc();
    if (personal && ["owner", "admin", "editor"].includes(String(personal.role || "").toLowerCase())) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "workspace-view-mode-edit";
      btn.textContent = "Редактировать";
      btn.addEventListener("click", async () => {
        try {
          const opened = await openDocumentById(currentDocumentId, {
            replace: true,
            sheetId: currentSheetId || 1
          });
          if (opened) {
            showHint(`Документ открыт с правами: ${roleLabel(currentDocumentRole)}.`, "warning", 2200);
          }
        } catch (err) {
          console.error(err);
          showHint("Не удалось открыть документ для редактирования.", "error", 2500);
        }
      });
      el.appendChild(btn);
    }
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function updateCurrentDocumentCapabilities() {
  const editable = canEditCurrentDocument();
  const role = getCurrentDocumentRole();
  const canShare = canShareCurrentDocument();
  const canDelete = !guestPublicView && !!currentUser && role === "owner";
  // Keep Access/Delete clickable for authed users so we can explain why the action is blocked.
  if (fileShareBtn) {
    fileShareBtn.disabled = !!guestPublicView;
    fileShareBtn.title = canShare
      ? "Настроить доступ к документу"
      : currentUser
        ? `Настроить доступ может владелец, администратор или редактор. Сейчас: ${roleLabel(role || "reader")}.`
        : "Войдите, чтобы настроить доступ";
  }
  if (fileDeleteBtn) {
    fileDeleteBtn.disabled = !!guestPublicView;
    fileDeleteBtn.title = canDelete
      ? "Удалить документ"
      : currentUser
        ? `Удалить может только владелец. Сейчас: ${roleLabel(role || "reader")}.`
        : "Войдите, чтобы удалить документ";
  }
  if (fileCreateBtn) fileCreateBtn.disabled = guestPublicView && !currentUser;
  if (fileOpenBtn) fileOpenBtn.disabled = guestPublicView && !currentUser;
  if (fileCopyBtn) fileCopyBtn.disabled = guestPublicView;
  if (fileCopyLinkBtn) fileCopyLinkBtn.disabled = guestPublicView || !currentDocumentId;
  if (fileCommentsBtn) fileCommentsBtn.disabled = guestPublicView || !canViewCommentsPanel();
  if (addWindowBtn) addWindowBtn.disabled = !editable;
  if (shapeButton) shapeButton.disabled = !editable;
  if (undoBtn) undoBtn.disabled = !editable;
  if (redoBtn) redoBtn.disabled = !editable;
  if (formatToggle) formatToggle.disabled = !editable;
  if (objectsToggle) objectsToggle.disabled = !editable;
  syncObjectsToolbarVisibility();
}

function setAuthLocked(locked) {
  document.body.classList.toggle("auth-locked", !!locked);
}

function notifyApiError(err, fallback = "Не удалось выполнить запрос.") {
  const map = {
    forbidden: "Нет доступа.",
    not_found: "Не найдено.",
    rate_limited: "Слишком много запросов. Попробуй позже.",
    empty_body: "Комментарий не может быть пустым."
  };
  const message = map[String(err && err.message || "").toLowerCase()] || fallback;
  showHint(message, "error", 2800);
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data && data.error ? String(data.error) : `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = data;
    if (!opts.silent && (err.status === 403 || err.status === 429)) {
      notifyApiError(err);
    }
    throw err;
  }
  return data;
}

async function loadDocumentsIndex() {
  if (currentUser) {
    const data = await fetchJson("/api/docs");
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : [];
    foldersCache = Array.isArray(data.folders) ? data.folders.slice() : [];
    currentDocumentId = data.activeDocumentId || currentDocumentId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    currentDocumentRole = data.activeDocumentRole || currentDocumentRole;
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    return data;
  }
  const store = ensureLocalDocStore();
  foldersCache = Array.isArray(store.folders) ? store.folders.slice() : [];
  documentsCache = store.documents.map((doc) => ({
    id: doc.id,
    name: doc.name,
    folderId: doc.folderId || null,
    isOwned: true,
    isActive: doc.id === store.activeDocumentId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  }));
  currentDocumentId = store.activeDocumentId;
  const doc = getLocalDocById(store.activeDocumentId) || store.documents[0];
  currentDocumentName = doc ? doc.name : currentDocumentName;
  currentDocumentRole = "owner";
  currentDocumentStore = store;
  syncCurrentDocumentTitle();
  updateCurrentDocumentCapabilities();
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
    currentDocumentRole = data.documentRole || currentDocumentRole;
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    const loaded = applyDocumentLayout(data.layout || createBlankDocumentLayout(), parseAppRoute().sheetId);
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
  currentDocumentRole = "owner";
  syncCurrentDocumentTitle();
  updateCurrentDocumentCapabilities();
  return applyDocumentLayout(doc.layout || createBlankDocumentLayout(), parseAppRoute().sheetId);
}

async function persistCurrentDocument(layoutOverride = null) {
  if (!canEditCurrentDocument()) return;
  clearTimeout(pendingPersistTimer);
  pendingPersistTimer = null;
  const docIdAtSave = currentDocumentId;
  if (!docIdAtSave) return;
  if (layoutOverride && !Array.isArray(layoutOverride.sheets)) {
    flushCurrentSheetLayout(layoutOverride);
  } else {
    flushCurrentSheetLayout();
  }
  // Never persist an empty sheet list — this is how documents were wiped to 54 bytes.
  if (!Array.isArray(documentSheetsState) || documentSheetsState.length === 0) {
    console.warn("Skip persist: document has no sheets in memory", docIdAtSave);
    return;
  }
  const layout = buildDocumentLayoutPayload();
  if (!Array.isArray(layout.sheets) || layout.sheets.length === 0) {
    console.warn("Skip persist: built layout has no sheets", docIdAtSave);
    return;
  }
  // If the open document changed while we were building the payload, do not write
  // the previous canvas into another document id (cross-document overwrite).
  if (currentDocumentId !== docIdAtSave) return;
  if (currentUser) {
    await fetchJson("/api/layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout, documentId: docIdAtSave })
    });
    return;
  }
  const store = ensureLocalDocStore();
  const doc = getLocalDocById(docIdAtSave) || store.documents[0];
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
    currentDocumentRole = data.activeDocumentRole || data.document?.role || "owner";
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    navigateToDocument(currentDocumentId, { sheetId: 1, replace: false });
    return data.document || null;
  }

  const layout = mode === "copy" && currentDocumentId
    ? cloneLayout(buildDocumentLayoutPayload())
    : createBlankDocumentLayout();
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
  currentDocumentRole = "owner";
  syncCurrentDocumentTitle();
  updateCurrentDocumentCapabilities();
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === currentDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  applyDocumentLayout(doc.layout, 1);
  navigateToDocument(doc.id, { sheetId: 1, replace: false });
  return doc;
}

async function prepareDocumentSwitch(nextDocId) {
  clearTimeout(pendingPersistTimer);
  pendingPersistTimer = null;
  if (!nextDocId || !currentDocumentId || nextDocId === currentDocumentId) return;
  if (!canEditCurrentDocument() || !autoSaveEnabled) return;
  try {
    await persistCurrentDocument();
  } catch (err) {
    console.error("Failed to persist before document switch:", err);
  }
  clearTimeout(pendingPersistTimer);
  pendingPersistTimer = null;
}

async function openDocumentById(docId, opts = {}) {
  if (!docId) return false;
  if (guestPublicView) {
    if (!currentUser) return false;
    exitGuestPublicView();
  }
  await prepareDocumentSwitch(docId);
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}/activate`, { method: "POST" });
    clearTimeout(pendingPersistTimer);
    pendingPersistTimer = null;
    const nextId = data.document?.id || data.activeDocumentId || docId;
    const nextLayout = data.document && data.document.layout
      ? data.document.layout
      : null;
    // Set id and layout back-to-back so a deferred autosave cannot bind the old
    // canvas to the newly activated document id.
    currentDocumentId = nextId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    currentDocumentRole = data.activeDocumentRole || currentDocumentRole;
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    if (nextLayout) {
      applyDocumentLayout(nextLayout, opts.sheetId ?? parseAppRoute().sheetId);
      documentsCache = documentsCache.map((doc) => ({
        ...doc,
        isActive: doc.id === currentDocumentId
      }));
      ensureFormatPanelEnabledCollapsed();
    } else {
      await loadCurrentDocument();
    }
    navigateToDocument(currentDocumentId, { sheetId: currentSheetId, ...opts });
    syncWorkspaceAccessMode();
    return true;
  }
  const loaded = await activateDocumentRecord(docId, opts);
  if (loaded !== false) {
    navigateToDocument(currentDocumentId, { sheetId: currentSheetId, ...opts });
    syncWorkspaceAccessMode();
  }
  return loaded;
}

async function loadPublicDocument(route = {}) {
  const token = String(route.token || "").trim();
  const docId = route.docId ? String(route.docId).trim() : "";
  if (!token) return false;
  guestPublicView = true;
  guestPublicToken = token;
  setAuthLocked(false);
  document.body.classList.remove("auth-locked");
  const apiUrl = docId
    ? `/api/public/p/${encodeURIComponent(docId)}/${encodeURIComponent(token)}`
    : `/api/public/p/${encodeURIComponent(token)}`;
  const data = await fetchJson(apiUrl);
  currentDocumentId = data.documentId || docId;
  currentDocumentName = data.documentName || "Документ";
  currentDocumentRole = data.documentRole || "reader";
  syncCurrentDocumentTitle();
  const loaded = applyDocumentLayout(data.layout || createBlankDocumentLayout(), route.sheetId);
  syncWorkspaceAccessMode();
  return loaded;
}

function getDocumentShareUrl() {
  if (!currentDocumentId) return "";
  return `${window.location.origin}${buildDocumentPath(currentDocumentId, currentSheetId)}`;
}

async function copyDocumentShareUrl() {
  const url = getDocumentShareUrl();
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    showHint("Ссылка на документ скопирована.", "warning", 1800);
  } catch {
    window.prompt("Ссылка на документ:", url);
  }
}

async function activateDocumentRecord(docId, opts = {}) {
  if (!docId) return false;
  if (guestPublicView && currentUser) exitGuestPublicView();
  await prepareDocumentSwitch(docId);
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}/activate`, { method: "POST" });
    clearTimeout(pendingPersistTimer);
    pendingPersistTimer = null;
    const nextId = data.document?.id || data.activeDocumentId || docId;
    currentDocumentId = nextId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    currentDocumentRole = data.activeDocumentRole || currentDocumentRole;
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    if (data.document && data.document.layout) {
      const loaded = applyDocumentLayout(data.document.layout, opts.sheetId ?? parseAppRoute().sheetId);
      documentsCache = documentsCache.map((doc) => ({
        ...doc,
        isActive: doc.id === currentDocumentId
      }));
      ensureFormatPanelEnabledCollapsed();
      navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: false });
      syncWorkspaceAccessMode();
      return loaded;
    }
    await loadCurrentDocument();
    await loadDocumentsIndex();
    ensureFormatPanelEnabledCollapsed();
    return true;
  }
  const doc = setActiveLocalDoc(docId);
  if (!doc) return false;
  currentDocumentId = doc.id;
  currentDocumentName = doc.name;
  currentDocumentRole = "owner";
  syncCurrentDocumentTitle();
  updateCurrentDocumentCapabilities();
  documentsCache = ensureLocalDocStore().documents.map((item) => ({
    id: item.id,
    name: item.name,
    isActive: item.id === currentDocumentId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }));
  const loaded = applyDocumentLayout(doc.layout || createBlankDocumentLayout(), opts.sheetId ?? parseAppRoute().sheetId);
  ensureFormatPanelEnabledCollapsed();
  return loaded;
}

async function deleteDocumentRecord(docId) {
  if (!docId) return false;
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}`, { method: "DELETE" });
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    currentDocumentId = data.activeDocumentId || currentDocumentId;
    currentDocumentName = data.activeDocumentName || currentDocumentName;
    currentDocumentRole = data.activeDocumentRole || currentDocumentRole;
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
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
    currentDocumentRole = "owner";
    syncCurrentDocumentTitle();
    updateCurrentDocumentCapabilities();
    return applyDocumentLayout(active.layout || createBlankDocumentLayout(), 1);
  }
  currentDocumentName = "Рабочий стол";
  currentDocumentRole = "owner";
  syncCurrentDocumentTitle();
  updateCurrentDocumentCapabilities();
  return false;
}

function ensureLocalFoldersStore() {
  const store = ensureLocalDocStore();
  if (!Array.isArray(store.folders)) store.folders = [];
  return store;
}

function getShareModalDocumentId() {
  return shareModalDocId || currentDocumentId;
}

function canShareDocument(doc) {
  if (!currentUser || guestPublicView || !doc) return false;
  const role = String(doc.role || (doc.isOwned ? "owner" : "")).toLowerCase();
  return role === "owner" || role === "admin" || role === "editor";
}

function shareUserInitials(nameOrEmail) {
  const source = String(nameOrEmail || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function shareAvatarColor(seed) {
  const palette = ["#1677FF", "#0F9D8A", "#7C3AED", "#DB2777", "#EA580C", "#2563EB", "#059669"];
  const text = String(seed || "");
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

function looksLikeShareEmail(value) {
  const email = String(value || "").trim();
  if (!email || email.includes(" ")) return false;
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;
  const domain = email.slice(at + 1);
  return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
}

function syncShareSearchFilled() {
  if (!shareSearchLabel || !shareEmailInput) return;
  shareSearchLabel.classList.toggle("is-filled", !!String(shareEmailInput.value || "").trim());
}

function hideShareSuggestions() {
  shareSuggestionsOpen = false;
  if (!shareSuggestions) return;
  shareSuggestions.classList.add("hidden");
  shareSuggestions.classList.remove("share-suggestions--empty");
  shareSuggestions.innerHTML = "";
}

function appendShareSuggestion(contact, { inviteHint = false } = {}) {
  if (!shareSuggestions) return;
  const email = String(contact.email || "").trim();
  if (!email) return;
  const displayName = String(contact.name || email).trim() || email;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "share-suggestion";
  btn.setAttribute("role", "option");
  btn.dataset.email = email;
  const avatar = document.createElement("span");
  avatar.className = "share-access-avatar";
  avatar.textContent = shareUserInitials(displayName);
  avatar.style.background = shareAvatarColor(email || displayName);
  const meta = document.createElement("span");
  meta.className = "share-suggestion-meta";
  const name = document.createElement("span");
  name.className = "share-suggestion-name";
  name.textContent = displayName;
  const emailEl = document.createElement("span");
  emailEl.className = "share-suggestion-email";
  emailEl.textContent = inviteHint ? "Пригласить как читателя" : email;
  meta.appendChild(name);
  meta.appendChild(emailEl);
  btn.appendChild(avatar);
  btn.appendChild(meta);
  btn.addEventListener("mousedown", (e) => e.preventDefault());
  btn.addEventListener("click", () => {
    void addShareAccess(email, displayName);
  });
  shareSuggestions.appendChild(btn);
}

function getShareSuggestionCandidates(filter = "") {
  const filterLower = String(filter || "").trim().toLowerCase();
  const accessEmails = new Set(
    shareAccessCache.map((item) => String(item.email || "").toLowerCase()).filter(Boolean)
  );
  const matches = shareContactsCache.filter((contact) => {
    const email = String(contact.email || "").toLowerCase();
    if (!email || accessEmails.has(email)) return false;
    if (!filterLower) return true;
    const name = String(contact.name || "").toLowerCase();
    return email.includes(filterLower) || name.includes(filterLower);
  });
  return matches.slice(0, filterLower ? 8 : 6);
}

function renderShareSuggestions({ forceOpen = false } = {}) {
  if (!shareSuggestions || !shareEmailInput) return;
  if (!canShareShareModalDocument()) {
    hideShareSuggestions();
    return;
  }
  const filter = String(shareEmailInput.value || "").trim();
  const filterLower = filter.toLowerCase();
  if (!forceOpen && !shareSuggestionsOpen && !filter) {
    hideShareSuggestions();
    return;
  }
  shareSuggestionsOpen = true;
  const candidates = getShareSuggestionCandidates(filter);
  const exactMatch = candidates.some(
    (item) => String(item.email || "").toLowerCase() === filterLower
  );
  const alreadyAdded = shareAccessCache.some(
    (item) => String(item.email || "").toLowerCase() === filterLower
  );
  shareSuggestions.innerHTML = "";
  shareSuggestions.classList.remove("hidden", "share-suggestions--empty");

  if (candidates.length) {
    candidates.forEach((contact) => appendShareSuggestion(contact));
  }

  if (filter && looksLikeShareEmail(filter) && !exactMatch && !alreadyAdded) {
    appendShareSuggestion({ email: filter, name: filter }, { inviteHint: true });
    return;
  }

  if (candidates.length) return;

  shareSuggestions.classList.add("share-suggestions--empty");
  if (alreadyAdded) {
    shareSuggestions.textContent = "Уже в списке доступа";
    return;
  }
  if (filter) {
    shareSuggestions.textContent = "Никого не найдено";
    return;
  }
  shareSuggestions.textContent = "Пока нет недавних контактов — введите e-mail";
}

async function loadShareContacts() {
  try {
    const data = await fetchJson("/api/me/share-contacts");
    shareContactsCache = Array.isArray(data.contacts) ? data.contacts : [];
  } catch (err) {
    console.error(err);
    shareContactsCache = [];
  }
}

function resetShareInviteField() {
  if (shareEmailInput) shareEmailInput.value = "";
  syncShareSearchFilled();
  hideShareSuggestions();
}

function getShareModalCopyUrl() {
  if (sharePublicLinkInfo && sharePublicLinkInfo.enabled && sharePublicLinkInfo.url) {
    return sharePublicLinkInfo.url;
  }
  const docId = getShareModalDocumentId();
  if (!docId) return "";
  if (docId === currentDocumentId) return getDocumentShareUrl();
  return `${window.location.origin}/d/${encodeURIComponent(docId)}`;
}

function canDeleteDocument(doc) {
  if (!doc) return false;
  if (!currentUser) return !!doc.isOwned;
  return String(doc.role || "").toLowerCase() === "owner" || !!doc.isOwned;
}

function parseCssPx(value, fallback = 0) {
  const n = Number.parseFloat(String(value || ""));
  return Number.isFinite(n) ? n : fallback;
}

function getDocumentLayoutForPreview(layout) {
  const normalized = migrateDocumentLayout(layout || createBlankDocumentLayout());
  const sheet = normalized.sheets.find((item) => item.id === normalized.activeSheetId) || normalized.sheets[0];
  return sheet ? sheet.layout : createBlankLayout();
}

function getPreviewBounds(layout) {
  let minX = 0;
  let minY = 0;
  let maxX = 480;
  let maxY = 320;
  const consider = (x, y, w, h) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + w);
    maxY = Math.max(maxY, y + h);
  };
  (layout.shapes || []).forEach((shape) => {
    const x = parseCssPx(shape.left);
    const y = parseCssPx(shape.top);
    const w = parseCssPx(shape.width, 180);
    const h = parseCssPx(shape.height, 100);
    consider(x, y, w, h);
  });
  (layout.windows || []).forEach((win) => {
    const x = parseCssPx(win.left);
    const y = parseCssPx(win.top);
    const w = parseCssPx(win.width, 280);
    const h = parseCssPx(win.height, 180);
    consider(x, y, w, h);
  });
  const width = Math.max(120, maxX - minX);
  const height = Math.max(120, maxY - minY);
  return { minX, minY, width, height };
}

function buildDocumentPreviewElement(layout) {
  const sheetLayout = getDocumentLayoutForPreview(layout);
  const bounds = getPreviewBounds(sheetLayout);
  const canvas = document.createElement("div");
  canvas.className = "file-browser-preview-canvas";
  const stage = document.createElement("div");
  stage.className = "file-browser-preview-stage";
  const desktopBg = sheetLayout.desktopStyle && sheetLayout.desktopStyle.fillEnabled !== false
    ? (sheetLayout.desktopStyle.fill || "#f3f4f6")
    : "#f3f4f6";
  stage.style.width = `${bounds.width}px`;
  stage.style.height = `${bounds.height}px`;
  stage.style.background = desktopBg;
  stage.style.borderRadius = "12px";
  const offsetX = -bounds.minX;
  const offsetY = -bounds.minY;
  (sheetLayout.shapes || []).forEach((shape) => {
    const node = document.createElement("div");
    node.className = "file-browser-preview-shape";
    const x = parseCssPx(shape.left) + offsetX;
    const y = parseCssPx(shape.top) + offsetY;
    const w = parseCssPx(shape.width, 180);
    const h = parseCssPx(shape.height, 100);
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.width = `${w}px`;
    node.style.height = `${h}px`;
    node.style.background = shape.fillEnabled === false ? "transparent" : (shape.fill || "#ffffff");
    node.style.borderRadius = `${Math.max(0, Number(shape.radius) || 10)}px`;
    if (shape.text) {
      const text = document.createElement("div");
      text.className = "file-browser-preview-shape-text";
      text.textContent = String(shape.text).replace(/\s+/g, " ").trim();
      node.appendChild(text);
    }
    stage.appendChild(node);
  });
  (sheetLayout.windows || []).forEach((win) => {
    const node = document.createElement("div");
    node.className = "file-browser-preview-window";
    node.style.left = `${parseCssPx(win.left) + offsetX}px`;
    node.style.top = `${parseCssPx(win.top) + offsetY}px`;
    node.style.width = `${parseCssPx(win.width, 280)}px`;
    node.style.height = `${parseCssPx(win.height, 180)}px`;
    stage.appendChild(node);
  });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "file-browser-preview-connectors");
  svg.setAttribute("width", String(bounds.width));
  svg.setAttribute("height", String(bounds.height));
  (sheetLayout.connectors || []).slice(0, 80).forEach((conn) => {
    const start = conn.startPoint || conn.start || null;
    const end = conn.endPoint || conn.end || null;
    if (!start || !end) return;
    const x1 = parseCssPx(start.x, parseCssPx(start.left)) + offsetX;
    const y1 = parseCssPx(start.y, parseCssPx(start.top)) + offsetY;
    const x2 = parseCssPx(end.x, parseCssPx(end.left)) + offsetX;
    const y2 = parseCssPx(end.y, parseCssPx(end.top)) + offsetY;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(x1));
    line.setAttribute("y1", String(y1));
    line.setAttribute("x2", String(x2));
    line.setAttribute("y2", String(y2));
    line.setAttribute("stroke", conn.color || "#64748b");
    line.setAttribute("stroke-width", String(Math.max(1, Number(conn.width) || 2)));
    svg.appendChild(line);
  });
  stage.appendChild(svg);
  canvas.appendChild(stage);
  canvas.dataset.previewWidth = String(bounds.width);
  canvas.dataset.previewHeight = String(bounds.height);
  requestAnimationFrame(() => applyFileBrowserPreviewScale(canvas, bounds));
  return canvas;
}

function applyFileBrowserPreviewScale(canvas, bounds) {
  const stage = canvas.querySelector(".file-browser-preview-stage");
  if (!stage || !bounds) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const scale = Math.min(rect.width / bounds.width, rect.height / bounds.height, 1) * 0.92;
  const tx = (rect.width - bounds.width * scale) / 2;
  const ty = (rect.height - bounds.height * scale) / 2;
  stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
}

function refreshFileBrowserPreviewScale() {
  const canvas = fileBrowserPreview ? fileBrowserPreview.querySelector(".file-browser-preview-canvas") : null;
  if (!canvas) return;
  applyFileBrowserPreviewScale(canvas, {
    width: Number(canvas.dataset.previewWidth) || 480,
    height: Number(canvas.dataset.previewHeight) || 320
  });
}

async function fetchDocumentPreviewLayout(docId) {
  if (fileBrowserPreviewCache.has(docId)) return fileBrowserPreviewCache.get(docId);
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}`);
    const layout = data.document && data.document.layout ? data.document.layout : createBlankDocumentLayout();
    fileBrowserPreviewCache.set(docId, layout);
    return layout;
  }
  const doc = getLocalDocById(docId);
  const layout = doc && doc.layout ? doc.layout : createBlankDocumentLayout();
  fileBrowserPreviewCache.set(docId, layout);
  return layout;
}

function formatFileBrowserDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatFileBrowserSize(bytes) {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(size < 10 * 1024 ? 1 : 0).replace(".0", "")} КБ`;
  return `${(size / (1024 * 1024)).toFixed(1).replace(".0", "")} МБ`;
}

function getFileBrowserAuthorInitials(name, email) {
  const source = String(name || email || "").trim();
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function appendFileBrowserInfoRow(list, label, valueNodeOrText) {
  const row = document.createElement("div");
  row.className = "file-browser-info-row";
  const labelEl = document.createElement("div");
  labelEl.className = "file-browser-info-label";
  labelEl.textContent = label;
  row.appendChild(labelEl);
  if (typeof valueNodeOrText === "string") {
    const valueEl = document.createElement("div");
    valueEl.className = "file-browser-info-value";
    valueEl.textContent = valueNodeOrText;
    row.appendChild(valueEl);
  } else {
    row.appendChild(valueNodeOrText);
  }
  list.appendChild(row);
}

function renderFileBrowserInfo(docId) {
  if (!fileBrowserInfo) return;
  if (!docId) {
    fileBrowserInfo.innerHTML = '<div class="file-browser-info-empty">Выбери документ, чтобы увидеть сведения</div>';
    return;
  }
  const doc = documentsCache.find((item) => item.id === docId);
  if (!doc) {
    fileBrowserInfo.innerHTML = '<div class="file-browser-info-empty">Сведения недоступны</div>';
    return;
  }
  const ownerName = doc.ownerName || doc.ownerEmail || (doc.isOwned !== false ? (currentUser?.name || currentUser?.email || "Вы") : "—");
  const ownerEmail = doc.ownerEmail || (doc.isOwned !== false ? (currentUser?.email || "") : "");
  const accessCount = Number(doc.accessCount) || 0;
  const accessText = accessCount > 0 ? `${accessCount} назнач.` : "Только владелец";

  fileBrowserInfo.innerHTML = "";
  const title = document.createElement("h4");
  title.className = "file-browser-info-title";
  title.textContent = "Сведения";
  fileBrowserInfo.appendChild(title);

  const list = document.createElement("div");
  list.className = "file-browser-info-list";
  appendFileBrowserInfoRow(list, "Создан", formatFileBrowserDate(doc.createdAt));
  appendFileBrowserInfoRow(list, "Изменён", formatFileBrowserDate(doc.updatedAt));

  const authorValue = document.createElement("div");
  authorValue.className = "file-browser-info-author";
  const avatar = document.createElement("div");
  avatar.className = "file-browser-info-avatar";
  avatar.textContent = getFileBrowserAuthorInitials(ownerName, ownerEmail);
  const authorText = document.createElement("div");
  authorText.className = "file-browser-info-author-text";
  const authorName = document.createElement("div");
  authorName.className = "file-browser-info-author-name";
  authorName.textContent = ownerName;
  authorText.appendChild(authorName);
  if (ownerEmail && ownerEmail !== ownerName) {
    const authorEmail = document.createElement("div");
    authorEmail.className = "file-browser-info-author-email";
    authorEmail.textContent = ownerEmail;
    authorText.appendChild(authorEmail);
  }
  authorValue.appendChild(avatar);
  authorValue.appendChild(authorText);
  appendFileBrowserInfoRow(list, "Автор", authorValue);

  appendFileBrowserInfoRow(list, "Размер", formatFileBrowserSize(doc.sizeBytes));
  appendFileBrowserInfoRow(list, "Доступ", accessText);
  appendFileBrowserInfoRow(list, "Твоя роль", roleLabel(doc.role || (doc.isOwned !== false ? "owner" : "reader")));
  fileBrowserInfo.appendChild(list);
}

function renderFileBrowserPreview(docId) {
  if (!fileBrowserPreview) return;
  if (!docId) {
    fileBrowserPreview.innerHTML = '<div class="file-browser-preview-empty">Выбери документ для превью</div>';
    renderFileBrowserInfo(null);
    return;
  }
  const doc = documentsCache.find((item) => item.id === docId);
  fileBrowserPreview.innerHTML = '<div class="file-browser-preview-empty">Загрузка превью...</div>';
  renderFileBrowserInfo(docId);
  fetchDocumentPreviewLayout(docId)
    .then((layout) => {
      if (fileBrowserSelectedDocId !== docId) return;
      fileBrowserPreview.innerHTML = "";
      fileBrowserPreview.appendChild(buildDocumentPreviewElement(layout));
      if (doc && doc.name) {
        const caption = document.createElement("div");
        caption.className = "file-browser-preview-empty";
        caption.style.inset = "auto 12px 12px auto";
        caption.style.width = "auto";
        caption.style.height = "auto";
        caption.style.padding = "6px 10px";
        caption.style.borderRadius = "10px";
        caption.style.background = "rgba(255,255,255,.88)";
        caption.style.color = "#111827";
        caption.style.fontSize = "12px";
        caption.style.fontWeight = "600";
        caption.textContent = doc.name;
        fileBrowserPreview.appendChild(caption);
      }
      if ((!doc.sizeBytes || doc.sizeBytes <= 0) && layout) {
        try {
          doc.sizeBytes = new Blob([JSON.stringify(layout)]).size;
          renderFileBrowserInfo(docId);
        } catch {}
      }
    })
    .catch((err) => {
      console.error(err);
      if (fileBrowserSelectedDocId !== docId) return;
      fileBrowserPreview.innerHTML = '<div class="file-browser-preview-empty">Не удалось загрузить превью</div>';
    });
}

function syncFileBrowserOpenButton() {
  if (!fileModalOpenBtn) return;
  fileModalOpenBtn.disabled = !fileBrowserSelectedDocId;
}

function selectFileBrowserDocument(docId) {
  fileBrowserSelectedDocId = docId;
  renderFileBrowser();
  renderFileBrowserPreview(docId);
  syncFileBrowserOpenButton();
}

async function openFileBrowserDocument(docId) {
  if (!docId) return;
  try {
    await activateDocumentRecord(docId);
    closeFileModal();
    const doc = documentsCache.find((item) => item.id === docId);
    showHint(`Открыт документ: ${doc ? doc.name : currentDocumentName}`, "warning", 1800);
  } catch (err) {
    console.error(err);
    showHint("Не удалось открыть документ.", "error", 2500);
  }
}

async function openSelectedFileBrowserDocument() {
  if (!fileBrowserSelectedDocId) {
    showHint("Выбери документ для открытия.", "error", 2200);
    return;
  }
  await openFileBrowserDocument(fileBrowserSelectedDocId);
}

function toggleFileBrowserFolder(folderKey) {
  if (fileBrowserCollapsedFolders.has(folderKey)) fileBrowserCollapsedFolders.delete(folderKey);
  else fileBrowserCollapsedFolders.add(folderKey);
  renderFileBrowser();
}

function createFileBrowserMenuButton(onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "file-browser-menu-btn";
  btn.setAttribute("aria-label", "Действия");
  btn.textContent = "⋮";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = btn.getBoundingClientRect();
    // Anchor near the button so the menu stays next to ⋮ inside the file dialog.
    onClick({
      clientX: Math.round(rect.right),
      clientY: Math.round(rect.top),
      target: btn,
      stopPropagation() {},
      preventDefault() {}
    });
  });
  return btn;
}

function getOwnedDocuments() {
  return documentsCache.filter((doc) => doc.isOwned !== false && String(doc.role || "owner") === "owner");
}

function getSharedDocuments() {
  return documentsCache.filter((doc) => doc.isOwned === false || (doc.role && String(doc.role) !== "owner"));
}

function getDocumentsInFolder(folderId) {
  const key = folderId || null;
  return getOwnedDocuments().filter((doc) => (doc.folderId || null) === key);
}

async function createFolderRecord(name) {
  const safeName = String(name || "Новая папка").trim() || "Новая папка";
  if (currentUser) {
    const data = await fetchJson("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: safeName })
    });
    foldersCache = Array.isArray(data.folders) ? data.folders.slice() : foldersCache;
    return data.folderId;
  }
  const store = ensureLocalFoldersStore();
  const folder = {
    id: createDocId(),
    name: safeName,
    sortOrder: store.folders.length,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.folders.push(folder);
  saveLocalDocStore(store);
  foldersCache = store.folders.slice();
  return folder.id;
}

async function renameFolderRecord(folderId, nextName) {
  const name = String(nextName || "").trim();
  if (!folderId || !name) return false;
  if (currentUser) {
    const data = await fetchJson(`/api/folders/${encodeURIComponent(folderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    foldersCache = Array.isArray(data.folders) ? data.folders.slice() : foldersCache;
    return true;
  }
  const store = ensureLocalFoldersStore();
  const folder = store.folders.find((item) => item.id === folderId);
  if (!folder) return false;
  folder.name = name;
  folder.updatedAt = nowIso();
  saveLocalDocStore(store);
  foldersCache = store.folders.slice();
  return true;
}

async function deleteFolderRecord(folderId) {
  if (!folderId) return false;
  if (currentUser) {
    const data = await fetchJson(`/api/folders/${encodeURIComponent(folderId)}`, { method: "DELETE" });
    foldersCache = Array.isArray(data.folders) ? data.folders.slice() : foldersCache;
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    return true;
  }
  const store = ensureLocalFoldersStore();
  store.folders = store.folders.filter((item) => item.id !== folderId);
  store.documents.forEach((doc) => {
    if (doc.folderId === folderId) doc.folderId = null;
  });
  saveLocalDocStore(store);
  foldersCache = store.folders.slice();
  await loadDocumentsIndex();
  return true;
}

async function renameDocumentRecord(docId, nextName) {
  const name = String(nextName || "").trim();
  if (!docId || !name) return false;
  if (currentUser) {
    await fetchJson(`/api/docs/${encodeURIComponent(docId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    await loadDocumentsIndex();
    if (currentDocumentId === docId) {
      currentDocumentName = name;
      syncCurrentDocumentTitle();
    }
    return true;
  }
  const doc = getLocalDocById(docId);
  if (!doc) return false;
  doc.name = name;
  doc.updatedAt = nowIso();
  upsertLocalDoc(doc);
  await loadDocumentsIndex();
  if (currentDocumentId === docId) {
    currentDocumentName = name;
    syncCurrentDocumentTitle();
  }
  return true;
}

async function moveDocumentToFolder(docId, folderId) {
  if (!docId) return false;
  const nextFolderId = folderId || null;
  if (currentUser) {
    await fetchJson(`/api/docs/${encodeURIComponent(docId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId: nextFolderId })
    });
    await loadDocumentsIndex();
    return true;
  }
  const doc = getLocalDocById(docId);
  if (!doc) return false;
  doc.folderId = nextFolderId;
  doc.updatedAt = nowIso();
  upsertLocalDoc(doc);
  await loadDocumentsIndex();
  return true;
}

async function copyDocumentById(docId) {
  const source = documentsCache.find((item) => item.id === docId);
  if (!source) return false;
  const suggested = `${source.name || "Документ"} копия`;
  let name = suggested;
  try {
    const prompted = window.prompt("Название копии документа:", suggested);
    if (prompted === null) return false;
    if (String(prompted).trim()) name = String(prompted).trim();
  } catch {}
  if (currentUser) {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}/copy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    if (data.activeDocumentId) currentDocumentId = data.activeDocumentId;
    if (data.activeDocumentName) currentDocumentName = data.activeDocumentName;
    return true;
  }
  const original = getLocalDocById(docId);
  if (!original) return false;
  const copy = {
    id: createDocId(),
    name,
    layout: cloneLayout(original.layout || createBlankDocumentLayout()),
    folderId: original.folderId || null,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  const store = ensureLocalDocStore();
  store.documents.push(copy);
  store.activeDocumentId = copy.id;
  saveLocalDocStore(store);
  await loadDocumentsIndex();
  return true;
}

async function deleteDocumentById(docId) {
  if (!docId) return false;
  const doc = documentsCache.find((item) => item.id === docId);
  const ok = window.confirm(`Удалить документ "${doc ? doc.name : "без названия"}"?`);
  if (!ok) return false;
  if (docId === currentDocumentId) await persistCurrentDocument();
  await deleteDocumentRecord(docId);
  fileBrowserPreviewCache.delete(docId);
  if (fileBrowserSelectedDocId === docId) {
    fileBrowserSelectedDocId = null;
    renderFileBrowserPreview(null);
    syncFileBrowserOpenButton();
  }
  await loadDocumentsIndex();
  if (docId === currentDocumentId) await loadCurrentDocument();
  return true;
}

async function publishDocumentById(docId) {
  if (!currentUser) return false;
  const doc = documentsCache.find((item) => item.id === docId);
  if (!canShareDocument(doc)) {
    showHint("Опубликовать документ может владелец, администратор или редактор.", "error", 2500);
    return false;
  }
  try {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(docId)}/public-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const url = data.publicLink && data.publicLink.url ? data.publicLink.url : "";
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        showHint("Публичная ссылка включена и скопирована.", "warning", 2200);
      } catch {
        window.prompt("Публичная ссылка:", url);
      }
    } else {
      showHint("Публичная ссылка включена.", "warning", 1800);
    }
    return true;
  } catch (err) {
    console.error(err);
    showHint("Не удалось опубликовать документ.", "error", 2500);
    return false;
  }
}

async function openShareModalForDocument(docId) {
  if (!currentUser) {
    openAuthModal("login");
    return;
  }
  const doc = documentsCache.find((item) => item.id === docId);
  if (!canShareDocument(doc)) {
    showHint("Делиться документом может владелец, администратор или редактор.", "error", 2500);
    return;
  }
  shareModalDocId = docId;
  shareModalDocName = doc ? doc.name : "Документ";
  try {
    const [accessData, publicData] = await Promise.all([
      fetchJson(`/api/docs/${encodeURIComponent(docId)}/access`),
      fetchJson(`/api/docs/${encodeURIComponent(docId)}/public-link`)
    ]);
    if (shareModalTitle) shareModalTitle.textContent = `Доступ – ${shareModalDocName || "Документ"}`;
    resetShareInviteField();
    renderShareAccessList(accessData.access || []);
    await syncSharePublicLinkUi(publicData.publicLink || null);
    await loadShareContacts();
    if (shareModal) shareModal.classList.remove("hidden");
    if (shareEmailInput) shareEmailInput.focus();
    renderShareSuggestions({ forceOpen: true });
  } catch (err) {
    console.error(err);
    showHint("Не удалось загрузить доступы.", "error", 2500);
  }
}

function buildMoveFolderMenuItems(docId) {
  const items = [{
    label: "Без папки",
    action: () => { void moveDocumentToFolder(docId, null).then(() => renderFileBrowser()); }
  }];
  foldersCache.forEach((folder) => {
    items.push({
      label: folder.name || "Папка",
      action: () => { void moveDocumentToFolder(docId, folder.id).then(() => renderFileBrowser()); }
    });
  });
  return items;
}

function startFileBrowserItemRename(labelEl, kind, itemId, currentName) {
  if (!labelEl || !itemId) return;
  hideContextMenu();
  const input = document.createElement("input");
  input.type = "text";
  input.className = "file-browser-row-label-input";
  input.value = currentName || "";
  labelEl.replaceWith(input);
  input.focus();
  input.select();
  let finished = false;
  const finish = async (save) => {
    if (finished) return;
    finished = true;
    const nextName = String(input.value || "").trim();
    if (save && nextName && nextName !== String(currentName || "").trim()) {
      try {
        if (kind === "folder") await renameFolderRecord(itemId, nextName);
        else await renameDocumentRecord(itemId, nextName);
      } catch (err) {
        console.error(err);
        showHint("Не удалось переименовать.", "error", 2500);
      }
    }
    renderFileBrowser();
  };
  input.addEventListener("click", (e) => e.stopPropagation());
  input.addEventListener("blur", () => { void finish(true); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      void finish(false);
    }
  });
}

function showFileBrowserFolderMenu(event, folder) {
  const labelEl = event.target.closest(".file-browser-row")?.querySelector(".file-browser-row-label");
  const items = [
    {
      label: "Переименовать",
      action: () => {
        startFileBrowserItemRename(labelEl, "folder", folder.id, folder.name || "Папка");
      }
    },
  ];
  showContextMenu(event.clientX, event.clientY, items.concat([
    { label: "Поделиться", disabled: true },
    { label: "Опубликовать", disabled: true },
    { label: "Копировать", disabled: true },
    {
      label: "Удалить",
      action: () => {
        const ok = window.confirm(`Удалить папку "${folder.name || "без названия"}"? Документы останутся без папки.`);
        if (!ok) return;
        void deleteFolderRecord(folder.id).then(() => renderFileBrowser());
      }
    }
  ]));
}

function showFileBrowserDocumentMenu(event, doc) {
  const canShare = canShareDocument(doc);
  const canDelete = canDeleteDocument(doc);
  const labelEl = event.target.closest(".file-browser-row")?.querySelector(".file-browser-row-label");
  showContextMenu(event.clientX, event.clientY, [
    {
      label: "Переименовать",
      disabled: !["owner", "admin", "editor"].includes(String(doc.role || (doc.isOwned ? "owner" : "")).toLowerCase()),
      action: () => {
        startFileBrowserItemRename(labelEl, "document", doc.id, doc.name || "Документ");
      }
    },
    {
      label: "Переместить",
      disabled: doc.isOwned === false,
      children: buildMoveFolderMenuItems(doc.id)
    },
    {
      label: "Поделиться",
      disabled: !canShare,
      action: () => { void openShareModalForDocument(doc.id); }
    },
    {
      label: "Опубликовать",
      disabled: !canShare,
      action: () => { void publishDocumentById(doc.id); }
    },
    {
      label: "Копировать",
      action: () => {
        void copyDocumentById(doc.id).then((ok) => {
          if (ok) renderFileBrowser();
        });
      }
    },
    {
      label: "Удалить",
      disabled: !canDelete,
      action: () => {
        void deleteDocumentById(doc.id).then((ok) => {
          if (ok) renderFileBrowser();
        });
      }
    }
  ]);
}

function createFileBrowserDocumentRow(doc, extraClass = "") {
  const row = document.createElement("div");
  row.className = `file-browser-row file${doc.id === fileBrowserSelectedDocId ? " selected" : ""}${extraClass ? ` ${extraClass}` : ""}`;
  row.setAttribute("role", "treeitem");
  const caret = document.createElement("span");
  caret.className = "file-browser-caret placeholder";
  caret.textContent = "▸";
  const label = document.createElement("span");
  label.className = "file-browser-row-label";
  label.textContent = doc.name || "Без названия";
  row.appendChild(caret);
  row.appendChild(label);
  row.appendChild(createFileBrowserMenuButton((event) => showFileBrowserDocumentMenu(event, doc)));
  row.addEventListener("click", () => selectFileBrowserDocument(doc.id));
  row.addEventListener("dblclick", () => { void openFileBrowserDocument(doc.id); });
  return row;
}

function createFileBrowserFolderRow(folder, childDocs) {
  const folderKey = `folder:${folder.id}`;
  const collapsed = fileBrowserCollapsedFolders.has(folderKey);
  const row = document.createElement("div");
  row.className = "file-browser-row folder";
  row.setAttribute("role", "treeitem");
  row.setAttribute("aria-expanded", collapsed ? "false" : "true");
  const caret = document.createElement("span");
  caret.className = "file-browser-caret";
  caret.textContent = collapsed ? "▸" : "▾";
  const label = document.createElement("span");
  label.className = "file-browser-row-label";
  label.textContent = folder.name || "Папка";
  row.appendChild(caret);
  row.appendChild(label);
  row.appendChild(createFileBrowserMenuButton((event) => showFileBrowserFolderMenu(event, folder)));
  row.addEventListener("click", (event) => {
    if (event.target.closest(".file-browser-menu-btn")) return;
    toggleFileBrowserFolder(folderKey);
  });
  const wrap = document.createElement("div");
  wrap.className = "file-browser-group";
  wrap.appendChild(row);
  const children = document.createElement("div");
  children.className = `file-browser-children${collapsed ? " collapsed" : ""}`;
  childDocs.forEach((doc) => children.appendChild(createFileBrowserDocumentRow(doc)));
  wrap.appendChild(children);
  return wrap;
}

function renderFileBrowser() {
  if (!fileBrowserTree) return;
  const ownedDocs = getOwnedDocuments();
  const sharedDocs = getSharedDocuments();
  if (!ownedDocs.length && !sharedDocs.length && !foldersCache.length) {
    fileBrowserTree.innerHTML = '<div class="file-browser-row"><span class="file-browser-row-label">Документы не найдены. Создай первый документ через меню Файл.</span></div>';
    return;
  }
  fileBrowserTree.innerHTML = "";
  foldersCache.forEach((folder) => {
    fileBrowserTree.appendChild(createFileBrowserFolderRow(folder, getDocumentsInFolder(folder.id)));
  });
  getDocumentsInFolder(null).forEach((doc) => {
    fileBrowserTree.appendChild(createFileBrowserDocumentRow(doc));
  });
  if (sharedDocs.length) {
    const sharedKey = "shared";
    const collapsed = fileBrowserCollapsedFolders.has(sharedKey);
    const row = document.createElement("div");
    row.className = "file-browser-row shared-root";
    row.setAttribute("role", "treeitem");
    const caret = document.createElement("span");
    caret.className = "file-browser-caret";
    caret.textContent = collapsed ? "▸" : "▾";
    const label = document.createElement("span");
    label.className = "file-browser-row-label";
    label.textContent = "Доступные мне";
    row.appendChild(caret);
    row.appendChild(label);
    row.appendChild(document.createElement("span"));
    row.addEventListener("click", () => toggleFileBrowserFolder(sharedKey));
    const wrap = document.createElement("div");
    wrap.className = "file-browser-group";
    wrap.appendChild(row);
    const children = document.createElement("div");
    children.className = `file-browser-children${collapsed ? " collapsed" : ""}`;
    sharedDocs.forEach((doc) => children.appendChild(createFileBrowserDocumentRow(doc)));
    wrap.appendChild(children);
    fileBrowserTree.appendChild(wrap);
  }
}

function renderFileModalList() {
  renderFileBrowser();
}

function getFileBrowserCard() {
  return fileModal ? fileModal.querySelector(".file-browser-card") : null;
}

function clampFileBrowserSize(width, height) {
  const maxWidth = Math.max(820, window.innerWidth - 24);
  const maxHeight = Math.max(420, window.innerHeight - 24);
  return {
    width: Math.max(820, Math.min(width, maxWidth)),
    height: Math.max(420, Math.min(height, maxHeight))
  };
}

function applyFileBrowserSize(width, height, persist = false) {
  const card = getFileBrowserCard();
  if (!card) return;
  const next = clampFileBrowserSize(width, height);
  card.style.width = `${next.width}px`;
  card.style.height = `${next.height}px`;
  if (persist) {
    localStorage.setItem(FILE_BROWSER_SIZE_KEY, JSON.stringify(next));
  }
  refreshFileBrowserPreviewScale();
}

function restoreFileBrowserSize() {
  const card = getFileBrowserCard();
  if (!card) return;
  let width = Math.min(1180, window.innerWidth - 32);
  let height = Math.min(560, window.innerHeight - 48);
  try {
    const raw = localStorage.getItem(FILE_BROWSER_SIZE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Number(saved.width) > 0) width = Number(saved.width);
      if (Number(saved.height) > 0) height = Number(saved.height);
    }
  } catch {}
  applyFileBrowserSize(width, height, false);
}

function initFileBrowserResize() {
  const card = getFileBrowserCard();
  const handle = card ? card.querySelector(".file-browser-resize-handle") : null;
  if (!card || !handle) return;
  let resize = null;
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    resize = {
      x: event.clientX,
      y: event.clientY,
      width: card.offsetWidth,
      height: card.offsetHeight
    };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!resize || (event.buttons & 1) !== 1) return;
    applyFileBrowserSize(
      resize.width + (event.clientX - resize.x),
      resize.height + (event.clientY - resize.y),
      false
    );
  });
  const stop = (event) => {
    if (!resize) return;
    resize = null;
    if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
    applyFileBrowserSize(card.offsetWidth, card.offsetHeight, true);
  };
  handle.addEventListener("pointerup", stop);
  handle.addEventListener("pointercancel", stop);
  window.addEventListener("resize", () => {
    if (!fileModal || fileModal.classList.contains("hidden")) return;
    applyFileBrowserSize(card.offsetWidth, card.offsetHeight, true);
  });
}

function openFileModal(title = "Открыть документ") {
  const header = fileModal ? fileModal.querySelector("#fileModalTitle") : null;
  if (header) header.textContent = title;
  restoreFileBrowserSize();
  if (!fileBrowserSelectedDocId && currentDocumentId) fileBrowserSelectedDocId = currentDocumentId;
  renderFileBrowser();
  renderFileBrowserPreview(fileBrowserSelectedDocId);
  syncFileBrowserOpenButton();
  if (fileModal) fileModal.classList.remove("hidden");
  requestAnimationFrame(refreshFileBrowserPreviewScale);
}

function closeFileModal() {
  if (fileModal) fileModal.classList.add("hidden");
  hideContextMenu();
}

function updateProfileMenuState() {
  if (profileBtn) profileBtn.disabled = !currentUser;
}

function clearProfileError() {
  if (!profileErrorText) return;
  profileErrorText.textContent = "";
  profileErrorText.classList.add("hidden");
}

function showProfileError(text) {
  if (!profileErrorText) return;
  profileErrorText.textContent = String(text || "").trim();
  profileErrorText.classList.toggle("hidden", !profileErrorText.textContent);
}

function syncProfilePasswordUi() {
  const hasPassword = !!(currentUser && currentUser.hasPassword);
  const needsPasswordSetup = !!(currentUser && currentUser.needsPasswordSetup);
  const provider = String(currentUser && currentUser.authProvider || "password");
  if (profileCurrentPasswordLabel) {
    profileCurrentPasswordLabel.classList.toggle("hidden", !hasPassword);
  }
  if (profileCurrentPasswordInput) {
    profileCurrentPasswordInput.classList.toggle("hidden", !hasPassword);
    if (!hasPassword) profileCurrentPasswordInput.value = "";
  }
  if (profileNewPasswordLabel) {
    profileNewPasswordLabel.textContent = hasPassword ? "Новый пароль" : "Пароль";
  }
  if (profileChangePasswordBtn) {
    profileChangePasswordBtn.textContent = profilePasswordFormOpen
      ? "Скрыть смену пароля"
      : (hasPassword ? "Сменить пароль" : "Задать пароль");
  }
  if (profilePasswordBlock) {
    const showForm = profilePasswordFormOpen || needsPasswordSetup;
    profilePasswordBlock.classList.toggle("hidden", !showForm);
  }
  if (profileEmailMeta && currentUser) {
    profileEmailMeta.textContent = currentUser.email || "";
  }
  if (profileAuthProviderMeta && currentUser) {
    profileAuthProviderMeta.textContent = provider === "google"
      ? "Вход через Google"
      : "Регистрация по e-mail и паролю";
  }
}

function setProfileTab(tab) {
  profileActiveTab = tab === "integrations" ? "integrations" : "account";
  const isAccount = profileActiveTab === "account";
  if (profileTabAccountBtn) {
    profileTabAccountBtn.classList.toggle("active", isAccount);
    profileTabAccountBtn.setAttribute("aria-selected", isAccount ? "true" : "false");
  }
  if (profileTabIntegrationsBtn) {
    profileTabIntegrationsBtn.classList.toggle("active", !isAccount);
    profileTabIntegrationsBtn.setAttribute("aria-selected", isAccount ? "false" : "true");
  }
  if (profileTabAccount) profileTabAccount.classList.toggle("hidden", !isAccount);
  if (profileTabIntegrations) profileTabIntegrations.classList.toggle("hidden", isAccount);
  if (profileSaveBtn) profileSaveBtn.classList.toggle("hidden", !isAccount);
  if (isAccount) {
    if (profileNameInput) profileNameInput.focus();
  } else if (window.BitrixChart && window.BitrixChart.syncBitrixProfileUi) {
    window.BitrixChart.syncBitrixProfileUi();
  }
}

function toggleProfilePasswordForm(forceOpen = null) {
  profilePasswordFormOpen = forceOpen == null ? !profilePasswordFormOpen : !!forceOpen;
  if (!profilePasswordFormOpen) {
    if (profileNewPasswordInput) profileNewPasswordInput.value = "";
    if (profileCurrentPasswordInput) profileCurrentPasswordInput.value = "";
  }
  syncProfilePasswordUi();
  if (profilePasswordFormOpen && profileNewPasswordInput && !profileNewPasswordInput.classList.contains("hidden")) {
    const focusEl = profileCurrentPasswordInput && !profileCurrentPasswordInput.classList.contains("hidden")
      ? profileCurrentPasswordInput
      : profileNewPasswordInput;
    focusEl.focus();
  }
}

function setMcpStatus(text, isError = false) {
  if (!mcpIntegrationStatus) return;
  mcpIntegrationStatus.textContent = String(text || "");
  mcpIntegrationStatus.classList.toggle("mcp-integration-status-error", !!isError && !!text);
}

function buildMcpConfigText(tokenValue) {
  const url = (mcpConfigCache && mcpConfigCache.mcpUrl) || `${location.origin}/mcp`;
  const token = tokenValue || "<PASTE_TOKEN_HERE>";
  return JSON.stringify(
    {
      mcpServers: {
        mmtable: {
          url,
          headers: { Authorization: `Bearer ${token}` }
        }
      }
    },
    null,
    2
  );
}

function renderMcpConfigPreview() {
  if (mcpConfigPreview) mcpConfigPreview.textContent = buildMcpConfigText(mcpCreatedToken || undefined);
}

async function loadMcpProfileUi() {
  if (!currentUser) return;
  setMcpStatus("");
  try {
    const [configData, tokensData] = await Promise.all([
      fetchJson("/api/mcp/config"),
      fetchJson("/api/me/tokens")
    ]);
    mcpConfigCache = configData || null;
    renderMcpConfigPreview();
    renderMcpTokenList((tokensData && tokensData.tokens) || []);
  } catch (err) {
    console.error(err);
    setMcpStatus("Не удалось загрузить настройки MCP.", true);
  }
}

function renderMcpTokenList(tokens) {
  if (!mcpTokenList) return;
  mcpTokenList.innerHTML = "";
  if (!tokens.length) {
    const empty = document.createElement("div");
    empty.className = "mcp-token-meta";
    empty.textContent = "Активных токенов нет.";
    mcpTokenList.appendChild(empty);
    return;
  }
  tokens.forEach((token) => {
    const row = document.createElement("div");
    row.className = "mcp-token-row";
    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = token.name || "Токен";
    const meta = document.createElement("div");
    meta.className = "mcp-token-meta";
    meta.textContent = `${token.tokenPrefix || ""} · ${(token.scopes || []).join(", ")}`;
    info.appendChild(title);
    info.appendChild(meta);
    const revokeBtn = document.createElement("button");
    revokeBtn.type = "button";
    revokeBtn.textContent = "Отозвать";
    revokeBtn.addEventListener("click", async () => {
      try {
        await fetchJson(`/api/me/tokens/${encodeURIComponent(token.id)}`, { method: "DELETE" });
        setMcpStatus("Токен отозван.");
        await loadMcpProfileUi();
      } catch (err) {
        console.error(err);
        setMcpStatus("Не удалось отозвать токен.", true);
      }
    });
    row.appendChild(info);
    row.appendChild(revokeBtn);
    mcpTokenList.appendChild(row);
  });
}

async function createMcpToken() {
  if (!currentUser) return;
  const name = String(mcpTokenNameInput ? mcpTokenNameInput.value : "").trim() || "Cursor MCP";
  setMcpStatus("");
  try {
    const data = await fetchJson("/api/me/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, scopes: ["docs:read", "docs:write"] })
    });
    mcpCreatedToken = String((data && data.token) || "");
    if (mcpTokenOnceInput) mcpTokenOnceInput.value = mcpCreatedToken;
    if (mcpTokenOnceWrap) mcpTokenOnceWrap.classList.toggle("hidden", !mcpCreatedToken);
    renderMcpConfigPreview();
    setMcpStatus("Токен создан. Скопируйте его сейчас — повторно показать нельзя.");
    await loadMcpProfileUi();
  } catch (err) {
    console.error(err);
    setMcpStatus("Не удалось создать токен.", true);
  }
}

async function copyTextToClipboard(text) {
  const value = String(text || "");
  if (!value) return false;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  const area = document.createElement("textarea");
  area.value = value;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return true;
}

function openProfileModal() {
  if (!currentUser) {
    openAuthModal("login");
    return;
  }
  clearProfileError();
  profilePasswordFormOpen = !!(currentUser && currentUser.needsPasswordSetup);
  if (profileNameInput) profileNameInput.value = currentUser.name || currentUser.email || "";
  if (profileNewPasswordInput) profileNewPasswordInput.value = "";
  if (profileCurrentPasswordInput) profileCurrentPasswordInput.value = "";
  syncProfilePasswordUi();
  setProfileTab("account");
  if (window.BitrixChart && window.BitrixChart.syncBitrixProfileUi) window.BitrixChart.syncBitrixProfileUi();
  mcpCreatedToken = "";
  if (mcpTokenOnceWrap) mcpTokenOnceWrap.classList.add("hidden");
  if (mcpTokenOnceInput) mcpTokenOnceInput.value = "";
  if (mcpTokenNameInput) mcpTokenNameInput.value = "Cursor MCP";
  loadMcpProfileUi();
  if (profileModal) profileModal.classList.remove("hidden");
  if (profileNameInput) profileNameInput.focus();
}
window.openProfileModal = openProfileModal;

function closeProfileModal() {
  clearProfileError();
  if (profileModal) profileModal.classList.add("hidden");
}

async function saveProfileSettings() {
  if (!currentUser) return;
  const name = String(profileNameInput ? profileNameInput.value : "").trim();
  const currentPassword = String(profileCurrentPasswordInput ? profileCurrentPasswordInput.value : "");
  const newPassword = String(profileNewPasswordInput ? profileNewPasswordInput.value : "");
  if (!name) {
    showProfileError("Укажи имя.");
    return;
  }
  clearProfileError();
  try {
    const profileData = await fetchJson("/api/me/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    currentUser = { ...currentUser, name: profileData.name || name };
    userLabel.textContent = currentUser.name || currentUser.email;
    if (newPassword) {
      const payload = { newPassword };
      if (currentUser.hasPassword) payload.currentPassword = currentPassword;
      const passData = await fetchJson("/api/me/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      currentUser = {
        ...currentUser,
        hasPassword: !!passData.hasPassword,
        needsPasswordSetup: !!passData.needsPasswordSetup
      };
      if (profileNewPasswordInput) profileNewPasswordInput.value = "";
      if (profileCurrentPasswordInput) profileCurrentPasswordInput.value = "";
      profilePasswordFormOpen = false;
    }
    syncProfilePasswordUi();
    closeProfileModal();
    showHint("Профиль обновлён.", "warning", 1800);
  } catch (err) {
    console.error(err);
    const map = {
      invalid_name: "Укажи имя.",
      password_too_short: "Пароль должен быть не короче 6 символов.",
      invalid_current_password: "Неверный текущий пароль."
    };
    showProfileError(map[err.message] || "Не удалось сохранить профиль.");
  }
}

function setAuthModalMode(mode) {
  authModalMode = mode === "register" ? "register" : "login";
  const isRegister = authModalMode === "register";
  clearAuthError();
  if (authLoginTab) authLoginTab.classList.toggle("active", !isRegister);
  if (authRegisterTab) authRegisterTab.classList.toggle("active", isRegister);
  if (authNameLabel) authNameLabel.classList.toggle("hidden", !isRegister);
  if (authNameInput) {
    authNameInput.classList.toggle("hidden", !isRegister);
    authNameInput.value = isRegister ? authNameInput.value : "";
  }
  if (authPasswordInput) authPasswordInput.autocomplete = isRegister ? "new-password" : "current-password";
  if (authSubmitBtn) authSubmitBtn.textContent = isRegister ? "Создать аккаунт" : "Войти";
}

function openAuthModal(mode = "login") {
  setAuthModalMode(mode);
  clearAuthError();
  if (authModal) authModal.classList.remove("hidden");
  if (authEmailInput) authEmailInput.focus();
}

function closeAuthModal() {
  clearAuthError();
  if (authModal) authModal.classList.add("hidden");
}

function showAuthError(text) {
  if (!authErrorText) return;
  authErrorText.textContent = String(text || "").trim();
  authErrorText.classList.toggle("hidden", !authErrorText.textContent);
}

function clearAuthError() {
  if (!authErrorText) return;
  authErrorText.textContent = "";
  authErrorText.classList.add("hidden");
}

async function submitAuthForm() {
  const email = String(authEmailInput ? authEmailInput.value : "").trim();
  const password = String(authPasswordInput ? authPasswordInput.value : "");
  const name = String(authNameInput ? authNameInput.value : "").trim();
  if (!email || !password) {
    showAuthError("Укажи e-mail и пароль.");
    showHint("Укажи e-mail и пароль.", "error", 2500);
    return;
  }
  clearAuthError();
  const isRegister = authModalMode === "register";
  const url = isRegister ? "/auth/register" : "/auth/login";
  const payload = isRegister ? { email, password, name } : { email, password };
  try {
    await fetchJson(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    closeAuthModal();
    await initAuth();
    setAuthLocked(false);
    await loadDocumentsIndex();
    const route = parseAppRoute();
    const pending = consumePendingRoute() || (route.mode === "document" ? route : null);
    if (pending?.docId) {
      await openDocumentById(pending.docId, { replace: true, sheetId: pending.sheetId });
    } else if (route.mode === "public") {
      // Stay on the view-only public link; personal edit access is offered via the banner button.
      await loadPublicDocument(route);
    } else {
      await loadCurrentDocument();
      if (currentDocumentId) navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: true });
    }
    ensureFormatPanelEnabledCollapsed();
    syncWorkspaceAccessMode();
    await finishWorkspaceInit();
    showHint(isRegister ? "Аккаунт создан." : "Вход выполнен.", "warning", 1800);
  } catch (err) {
    console.error(err);
    if (err.message === "password_not_set") {
      setAuthModalMode("register");
      const message = "Аккаунт приглашён. Задайте пароль во вкладке «Регистрация».";
      showAuthError(message);
      showHint(message, "warning", 3500);
      return;
    }
    const map = {
      invalid_email: "Некорректный e-mail.",
      password_too_short: "Пароль должен быть не короче 6 символов.",
      email_taken: "Такой e-mail уже зарегистрирован.",
      invalid_credentials: "Неверный e-mail или пароль."
    };
    const message = map[err.message] || "Не удалось выполнить вход.";
    showAuthError(message);
    showHint(message, "error", 2500);
  }
}

function closeShareModal() {
  shareModalDocId = null;
  shareModalDocName = "";
  sharePublicLinkInfo = null;
  shareAccessCache = [];
  resetShareInviteField();
  if (shareModal) shareModal.classList.add("hidden");
}

function canShareShareModalDocument() {
  const docId = getShareModalDocumentId();
  if (shareModalDocId) {
    const doc = documentsCache.find((item) => item.id === docId);
    return canShareDocument(doc);
  }
  return canShareCurrentDocument();
}

function renderShareAccessList(access = []) {
  if (!shareAccessList) return;
  shareAccessCache = Array.isArray(access) ? access.slice() : [];
  if (!access.length) {
    shareAccessList.innerHTML = '<div class="share-people-note">Добавьте пользователей через поле выше.</div>';
    return;
  }
  shareAccessList.innerHTML = "";
  const canManage = canShareShareModalDocument();
  const myEmail = String(currentUser && currentUser.email || "").toLowerCase();
  access.forEach((item) => {
    const row = document.createElement("div");
    row.className = "share-access-row";
    const avatar = document.createElement("span");
    avatar.className = "share-access-avatar";
    const displayName = item.name || item.email || "?";
    avatar.textContent = shareUserInitials(displayName);
    avatar.style.background = shareAvatarColor(item.email || displayName);
    const meta = document.createElement("div");
    meta.className = "share-access-meta";
    const name = document.createElement("div");
    name.className = "share-access-name";
    const isYou = myEmail && String(item.email || "").toLowerCase() === myEmail;
    name.textContent = isYou ? `${displayName} (вы)` : displayName;
    const email = document.createElement("div");
    email.className = "share-access-email";
    email.textContent = item.hasPassword === false
      ? `${item.email} · пароль ещё не задан`
      : (item.email || "");
    meta.appendChild(name);
    meta.appendChild(email);
    const actions = document.createElement("div");
    actions.className = "share-access-actions";
    if (item.role === "owner") {
      const roleBadge = document.createElement("span");
      roleBadge.className = "share-owner-badge";
      roleBadge.textContent = "Владелец";
      actions.appendChild(roleBadge);
    } else if (canManage) {
      const roleSelect = document.createElement("select");
      roleSelect.className = "share-access-role";
      roleSelect.setAttribute("aria-label", "Роль");
      ["reader", "commenter", "editor", "admin"].forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = roleLabel(role);
        option.selected = item.role === role;
        roleSelect.appendChild(option);
      });
      const removeOption = document.createElement("option");
      removeOption.value = "__remove__";
      removeOption.textContent = "Удалить доступ";
      roleSelect.appendChild(removeOption);
      roleSelect.addEventListener("change", async () => {
        if (roleSelect.value === "__remove__") {
          try {
            const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/access/${encodeURIComponent(item.email)}`, { method: "DELETE" });
            renderShareAccessList(data.access || []);
          } catch (err) {
            console.error(err);
            showHint("Не удалось убрать доступ.", "error", 2500);
            roleSelect.value = item.role;
          }
          return;
        }
        try {
          const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/access`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: item.email, role: roleSelect.value, name: item.name })
          });
          renderShareAccessList(data.access || []);
        } catch (err) {
          console.error(err);
          showHint("Не удалось изменить роль.", "error", 2500);
          roleSelect.value = item.role;
        }
      });
      actions.appendChild(roleSelect);
    } else {
      const roleBadge = document.createElement("span");
      roleBadge.className = "share-owner-badge";
      roleBadge.textContent = roleLabel(item.role);
      actions.appendChild(roleBadge);
    }
    row.appendChild(avatar);
    row.appendChild(meta);
    row.appendChild(actions);
    shareAccessList.appendChild(row);
  });
}

async function syncSharePublicLinkUi(publicLink = null) {
  let info = publicLink;
  if (!info && getShareModalDocumentId() && canShareShareModalDocument()) {
    try {
      const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/public-link`);
      info = data.publicLink || null;
    } catch {
      info = null;
    }
  }
  sharePublicLinkInfo = info || null;
  const enabled = !!(info && info.enabled && (info.url || info.path));
  if (shareGeneralSelect) {
    shareGeneralSelect.value = enabled ? "link" : "restricted";
    shareGeneralSelect.disabled = !canShareShareModalDocument();
  }
  if (shareGeneralIcon) {
    shareGeneralIcon.textContent = enabled ? "🔗" : "⊘";
    shareGeneralIcon.classList.toggle("is-open", enabled);
  }
  if (shareGeneralHint) {
    shareGeneralHint.textContent = enabled
      ? "Открыть по ссылке может любой — даже без входа в систему."
      : "Доступ только у владельца и тех, кто добавлен в список выше.";
  }
  if (shareGeneralRole) {
    shareGeneralRole.textContent = enabled ? "Читатель" : "—";
  }
}

async function setSharePublicLinkEnabled(enabled) {
  if (!getShareModalDocumentId() || !canShareShareModalDocument()) return;
  try {
    if (enabled) {
      const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/public-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      await syncSharePublicLinkUi(data.publicLink);
      showHint("Доступ по ссылке включён (только просмотр).", "warning", 1800);
      return;
    }
    const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/public-link`, { method: "DELETE" });
    await syncSharePublicLinkUi(data.publicLink);
    showHint("Доступ по ссылке отключён.", "warning", 1800);
  } catch (err) {
    console.error(err);
    showHint("Не удалось обновить общий доступ.", "error", 2500);
    await syncSharePublicLinkUi();
  }
}

async function copySharePublicLink() {
  const url = String(getShareModalCopyUrl() || "").trim();
  if (!url) {
    showHint("Сначала откройте документ или включите доступ по ссылке.", "error", 2500);
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    showHint(
      sharePublicLinkInfo && sharePublicLinkInfo.enabled
        ? "Публичная ссылка скопирована."
        : "Ссылка на документ скопирована.",
      "warning",
      1800
    );
  } catch {
    window.prompt("Ссылка:", url);
  }
}

async function openShareModal() {
  if (!currentUser) {
    openAuthModal("login");
    return;
  }
  shareModalDocId = null;
  shareModalDocName = currentDocumentName || "Документ";
  if (!canShareCurrentDocument()) {
    const role = getCurrentDocumentRole();
    showHint(
      `Настроить доступ может владелец, администратор или редактор. Сейчас: ${roleLabel(role || "reader")}.`,
      "error",
      3200
    );
    return;
  }
  try {
    const [accessData, publicData] = await Promise.all([
      fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/access`),
      fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/public-link`)
    ]);
    if (shareModalTitle) shareModalTitle.textContent = `Доступ – ${shareModalDocName || "Документ"}`;
    resetShareInviteField();
    renderShareAccessList(accessData.access || []);
    await syncSharePublicLinkUi(publicData.publicLink || null);
    await loadShareContacts();
    if (shareModal) shareModal.classList.remove("hidden");
    if (shareEmailInput) shareEmailInput.focus();
    renderShareSuggestions({ forceOpen: true });
  } catch (err) {
    console.error(err);
    showHint("Не удалось загрузить доступы.", "error", 2500);
  }
}

async function addShareAccess(emailOverride, nameOverride) {
  const email = String(emailOverride != null ? emailOverride : (shareEmailInput ? shareEmailInput.value : "")).trim();
  const role = "reader";
  const name = String(nameOverride || "").trim();
  if (!email) {
    showHint("Укажи e-mail пользователя.", "error", 2500);
    return;
  }
  if (!looksLikeShareEmail(email)) {
    showHint("Укажи корректный e-mail.", "error", 2500);
    return;
  }
  const typoDomains = {
    "gmaul.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "yamdex.ru": "yandex.ru",
    "yndex.ru": "yandex.ru",
    "yanex.ru": "yandex.ru"
  };
  const at = email.lastIndexOf("@");
  if (at > 0) {
    const domain = email.slice(at + 1).toLowerCase();
    const fix = typoDomains[domain];
    if (fix) {
      showHint(`Похоже на опечатку в домене. Проверьте: ${email.slice(0, at + 1)}${fix}`, "error", 5000);
      return;
    }
  }
  try {
    const payload = { email, role };
    if (name) payload.name = name;
    const data = await fetchJson(`/api/docs/${encodeURIComponent(getShareModalDocumentId())}/access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const contactName = name || email;
    const existingIdx = shareContactsCache.findIndex(
      (item) => String(item.email || "").toLowerCase() === email.toLowerCase()
    );
    const contactRow = { email: email.toLowerCase(), name: contactName, lastSharedAt: new Date().toISOString() };
    if (existingIdx >= 0) shareContactsCache.splice(existingIdx, 1);
    shareContactsCache.unshift(contactRow);
    resetShareInviteField();
    renderShareAccessList(data.access || []);
    if (document.activeElement === shareEmailInput) {
      renderShareSuggestions({ forceOpen: true });
    }
    const invited = (data.access || []).find((item) => String(item.email || "").toLowerCase() === email.toLowerCase());
    if (invited && !invited.hasPassword) {
      showHint("Доступ выдан. Пользователю нужно зарегистрироваться и задать пароль.", "warning", 3200);
    } else {
      showHint("Доступ обновлен.", "warning", 1800);
    }
  } catch (err) {
    console.error(err);
    const map = {
      invalid_email: "Некорректный e-mail.",
      email_typo_suspected: err.payload?.suggestion
        ? `Похоже на опечатку. Возможно: ${err.payload.suggestion}`
        : "Похоже на опечатку в e-mail.",
      invalid_role: "Некорректная роль.",
      owner_role_fixed: "Роль владельца изменить нельзя."
    };
    showHint(map[err.message] || "Не удалось выдать доступ.", "error", 2500);
  }
}

function formatCommentAnchor(comment) {
  const anchor = comment && comment.anchor ? comment.anchor : {};
  if (comment && comment.anchorType === "shape" && anchor.shapeId) {
    return `Фигура ${anchor.shapeId}`;
  }
  if (comment && comment.anchorType === "cell" && anchor.shapeId && anchor.cellRef) {
    return `Ячейка ${anchor.shapeId} · ${anchor.cellRef}`;
  }
  return "Документ";
}

function getCommentAnchorDraft() {
  if (selectedShape && selectedShape.dataset && selectedShape.dataset.shapeId) {
    if (selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableApi) {
      const sel = selectedShape.__tableApi.getSelection ? selectedShape.__tableApi.getSelection() : null;
      const cell = sel && (sel.activeCell || sel.cells?.[0]);
      if (cell && cell.dataset) {
        const cellRef = selectedShape.__tableApi.getCellReferenceToken
          ? selectedShape.__tableApi.getCellReferenceToken(Number(cell.dataset.r), Number(cell.dataset.c))
          : `${cell.dataset.r}:${cell.dataset.c}`;
        return {
          anchorType: "cell",
          anchor: { shapeId: selectedShape.dataset.shapeId, cellRef }
        };
      }
    }
    return {
      anchorType: "shape",
      anchor: { shapeId: selectedShape.dataset.shapeId }
    };
  }
  return { anchorType: "document", anchor: {} };
}

function syncCommentsComposerUi() {
  if (!commentsComposer || !commentsAnchorHint) return;
  const canPost = canCommentCurrentDocument();
  commentsComposer.classList.toggle("hidden", !canPost);
  if (!canPost) return;
  const draft = getCommentAnchorDraft();
  commentsAnchorHint.textContent = `Привязка: ${formatCommentAnchor({ anchorType: draft.anchorType, anchor: draft.anchor })}`;
}

function renderCommentsList(comments = commentsCache) {
  if (!commentsList) return;
  if (!comments.length) {
    commentsList.innerHTML = '<div class="file-doc-item"><div class="file-doc-meta"><div class="file-doc-name">Комментариев пока нет</div><div class="file-doc-sub">Добавь первый комментарий ниже.</div></div></div>';
    return;
  }
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const item = document.createElement("div");
    item.className = `comment-item${comment.status === "resolved" ? " resolved" : ""}`;
    const head = document.createElement("div");
    head.className = "comment-head";
    const meta = document.createElement("div");
    meta.className = "comment-meta";
    const author = document.createElement("div");
    author.className = "comment-author";
    author.textContent = comment.authorName || comment.authorEmail || "Пользователь";
    const sub = document.createElement("div");
    sub.className = "comment-sub";
    const when = comment.createdAt ? new Date(comment.createdAt).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" }) : "";
    sub.textContent = `${formatCommentAnchor(comment)}${when ? ` · ${when}` : ""}${comment.status === "resolved" ? " · решён" : ""}`;
    meta.appendChild(author);
    meta.appendChild(sub);
    const actions = document.createElement("div");
    actions.className = "comment-actions";
    if (canResolveComments()) {
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.textContent = comment.status === "resolved" ? "Открыть" : "Решить";
      toggleBtn.addEventListener("click", async () => {
        try {
          const data = await fetchJson(
            `/api/docs/${encodeURIComponent(currentDocumentId)}/comments/${encodeURIComponent(comment.id)}/resolve`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: comment.status === "resolved" ? "open" : "resolved" })
            }
          );
          commentsCache = commentsCache.map((item) => (item.id === comment.id ? data.comment : item));
          renderCommentsList();
        } catch (err) {
          console.error(err);
        }
      });
      actions.appendChild(toggleBtn);
    }
    head.appendChild(meta);
    head.appendChild(actions);
    const body = document.createElement("div");
    body.className = "comment-body";
    body.textContent = comment.body || "";
    item.appendChild(head);
    item.appendChild(body);
    commentsList.appendChild(item);
  });
}

async function loadComments() {
  if (!currentDocumentId || !canViewCommentsPanel()) {
    commentsCache = [];
    renderCommentsList();
    return;
  }
  const data = await fetchJson(`/api/docs/${encodeURIComponent(currentDocumentId)}/comments`);
  commentsCache = Array.isArray(data.comments) ? data.comments.slice() : [];
  renderCommentsList();
}

function closeCommentsModal() {
  if (commentsModal) commentsModal.classList.add("hidden");
}

async function openCommentsModal() {
  if (!currentUser) {
    openAuthModal("login");
    return;
  }
  if (!canViewCommentsPanel()) {
    showHint("Комментарии доступны участникам с ролью «Комментатор» и выше.", "error", 2800);
    return;
  }
  try {
    if (commentsDocMeta) {
      commentsDocMeta.textContent = `${currentDocumentName} · ${roleLabel(currentDocumentRole)}`;
    }
    syncCommentsComposerUi();
    await loadComments();
    if (commentsModal) commentsModal.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    showHint("Не удалось загрузить комментарии.", "error", 2500);
  }
}

async function addDocumentComment() {
  const body = String(commentsInput ? commentsInput.value : "").trim();
  if (!body) {
    showHint("Введи текст комментария.", "error", 2200);
    return;
  }
  const draft = getCommentAnchorDraft();
  try {
    const data = await fetchJson(`/api/docs/${encodeURIComponent(currentDocumentId)}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body,
        anchorType: draft.anchorType,
        anchor: draft.anchor
      })
    });
    if (commentsInput) commentsInput.value = "";
    commentsCache = commentsCache.concat(data.comment ? [data.comment] : []);
    renderCommentsList();
    showHint("Комментарий добавлен.", "warning", 1600);
  } catch (err) {
    console.error(err);
    if (err.status !== 403 && err.status !== 429) {
      showHint("Не удалось добавить комментарий.", "error", 2500);
    }
  }
}

function toggleFileMenu(force) {
  if (!fileMenuDropdown) return;
  const next = typeof force === "boolean" ? force : fileMenuDropdown.classList.contains("hidden");
  fileMenuDropdown.classList.toggle("hidden", !next);
  if (fileMenuBtn) fileMenuBtn.setAttribute("aria-expanded", next ? "true" : "false");
  if (!next) toggleFileActionsMenu(false);
}

function toggleFileActionsMenu(force) {
  if (!fileActionsDropdown) return;
  const next = typeof force === "boolean" ? force : fileActionsDropdown.classList.contains("hidden");
  fileActionsDropdown.classList.toggle("hidden", !next);
  if (fileActionsBtn) fileActionsBtn.setAttribute("aria-expanded", next ? "true" : "false");
}

function toggleShapeMenu(force) {
  if (!shapeDropdown) return;
  const next = typeof force === "boolean" ? force : shapeDropdown.classList.contains("hidden");
  shapeDropdown.classList.toggle("hidden", !next);
  if (shapeButton) shapeButton.setAttribute("aria-expanded", next ? "true" : "false");
}

function openNestedMenu(kind) {
  if (kind === "file") {
    toggleFileActionsMenu(true);
    toggleShapeMenu(false);
    return;
  }
  if (kind === "shape") {
    toggleShapeMenu(true);
    toggleFileActionsMenu(false);
  }
}

function closeAllMenus() {
  toggleFileMenu(false);
  toggleShapeMenu(false);
}

function resetViewportToOrigin() {
  if (!viewportEl || !desktop) return;
  const pad = getDesktopPaddingOffset();
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  viewportEl.scrollLeft = Math.max(0, pad.left * localZoom);
  viewportEl.scrollTop = Math.max(0, pad.top * localZoom);
  saveViewportState();
}

function setTheme(mode) {
  const dark = mode === "dark";
  document.body.classList.toggle("dark", dark);
  if (themeLightBtn) themeLightBtn.classList.toggle("active", !dark);
  if (themeDarkBtn) themeDarkBtn.classList.toggle("active", dark);
  if (themeDarkToggle) themeDarkToggle.checked = dark;
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  syncViewportDesktopBackground();
  syncBpProcessesToTheme({ save: false });
  if (window.BitrixChart?.syncBitrixWidgetsToTheme) {
    window.BitrixChart.syncBitrixWidgetsToTheme({ save: false });
  }
}

function loadDefaultStyles() {
  try {
    const raw = localStorage.getItem(DEFAULT_STYLES_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && typeof data === "object") return data;
    }
  } catch {}
  return cloneStyleData(BUILTIN_DEFAULT_STYLES) || {};
}

function getDefaultStyleData(type) {
  const saved = cloneStyleData(defaultStyles[type]);
  if (saved && Object.keys(saved).length) return saved;
  return cloneStyleData(BUILTIN_DEFAULT_STYLES[type]) || {};
}

function getBuiltinDefaultStyleData(type) {
  return cloneStyleData(BUILTIN_DEFAULT_STYLES[type]) || {};
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
  const base = getDefaultStyleData(type) || {};
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
        opacity: c.opacity ?? 1,
        shadow: c.shadow ?? 0,
        startArrowShape: c.startArrowShape || "classic",
        endArrowShape: c.endArrowShape || "classic",
        routeStyle: normalizeConnectorRouteStyle(c.routeStyle),
        gapStart: c.gapStart ?? 30,
        gapEnd: c.gapEnd ?? 30,
        labelStyle: cloneStyleData(getConnectorLabelStyle(c)) || getConnectorLabelStyle(c)
      }
    };
  }
  const styleShape = selectedShape
    || (selectedGroupId ? getGroupMembers(selectedGroupId).find((node) => node.dataset.shapeType !== "shape-line") : null);
  if (styleShape) {
    const text = styleShape.querySelector(".shape-text");
    const header = styleShape.querySelector(".table-titlebar");
    const headerText = styleShape.querySelector(".table-title-text");
    const tableState = styleShape.dataset.shapeType === "shape-table" ? styleShape.__tableState : null;
    const fillNode = styleShape.dataset.shapeType === "shape-table" ? (header || styleShape) : styleShape;
    const fillState = getFillStyleFromNode(fillNode, styleShape.dataset.shapeType === "shape-table" ? "#f8fafc" : "#ffffff");
    if (styleShape.dataset.shapeType === "shape-table" && styleShape.__tableSelectionScope === "cells" && styleShape.__tableApi && styleShape.__tableApi.getSelection) {
      const tableSelection = styleShape.__tableApi.getSelection();
      const selectedCell = tableSelection && tableSelection.cells && tableSelection.cells.length
        ? (tableSelection.activeCell || tableSelection.cells[0])
        : null;
      if (selectedCell) {
        const cellFillState = getFillStyleFromNode(selectedCell, "#ffffff");
        const cellBorderWidth = Math.max(0, parseInt(selectedCell.style.borderWidth || getComputedStyle(selectedCell).borderWidth || "1", 10) || 0);
        return {
          type: styleShape.dataset.shapeType || "shape",
          data: {
            fillEnabled: cellFillState.fillEnabled,
            gradientEnabled: cellFillState.gradientEnabled,
            fillDirection: cellFillState.fillDirection,
            fill: cellFillState.fill1,
            fill2: cellFillState.fill2,
            border: selectedCell.style.borderColor || getComputedStyle(selectedCell).borderColor || "",
            borderEnabled: cellBorderWidth > 0,
            borderWidth: cellBorderWidth,
            tableWrap: styleShape.dataset.tableWrap !== "0",
            tableAutoSize: styleShape.dataset.tableAutoSize !== "0",
            scrollEnabled: styleShape.dataset.scrollEnabled === "1",
            opacity: styleShape.style.opacity || "1",
            shadow: parseShadowValue(styleShape.style.boxShadow || getComputedStyle(styleShape).boxShadow),
            fontFamily: selectedCell.style.fontFamily || getComputedStyle(selectedCell).fontFamily || "",
            fontSize: parseInt(selectedCell.dataset.baseFontSize || selectedCell.style.fontSize || "16", 10),
            textColor: selectedCell.style.color || getComputedStyle(selectedCell).color || "",
            bold: (selectedCell.style.fontWeight || "400") === "700",
            italic: (selectedCell.style.fontStyle || "normal") === "italic",
            strike: (selectedCell.style.textDecoration || "none").includes("line-through"),
            underline: (selectedCell.style.textDecoration || "none").includes("underline"),
            wrap: (selectedCell.style.whiteSpace || "pre-wrap") !== "nowrap",
            numberGrouping: getNumberGroupingEnabled(selectedCell),
            numberFormat: getNumberFormat(selectedCell),
            decimalPlaces: getFormulaDecimalPlaces(selectedCell),
            hAlign: selectedCell.style.textAlign || "left",
            vAlign: selectedCell.style.verticalAlign || "top"
          }
        };
      }
    }
    return {
      type: styleShape.dataset.shapeType || "shape",
      data: {
        fillEnabled: fillState.fillEnabled,
        gradientEnabled: fillState.gradientEnabled,
        fillDirection: fillState.fillDirection,
        fill: fillState.fill1,
        fill2: fillState.fill2,
        border: tableState ? tableState.style.border : (styleShape.style.borderColor || ""),
        borderEnabled: tableState ? tableState.style.borderEnabled : (styleShape.dataset.borderEnabled != null ? styleShape.dataset.borderEnabled === "1" : parseInt(styleShape.style.borderWidth || "1", 10) > 0),
        borderWidth: tableState ? Math.max(0, Number(tableState.style.borderWidth) || 0) : Math.max(0, Number(styleShape.dataset.borderWidth || parseInt(styleShape.style.borderWidth || "1", 10) || 0)),
        borderStyle: tableState ? normalizeBorderLineStyle(tableState.style.borderStyle || "solid") : getShapeBorderLineStyle(styleShape),
        tableWrap: styleShape.dataset.shapeType === "shape-table" ? (styleShape.dataset.tableWrap !== "0") : undefined,
        tableAutoSize: styleShape.dataset.shapeType === "shape-table" ? (styleShape.dataset.tableAutoSize !== "0") : undefined,
        scrollEnabled: styleShape.dataset.scrollEnabled === "1",
        radius: tableState ? Math.max(0, Number(tableState.style.radius) || 0) : Math.max(0, Number(styleShape.dataset.cornerRadius || parseInt(styleShape.style.borderRadius || "0", 10) || 0)),
        opacity: styleShape.style.opacity || "1",
        shadow: tableState ? (Number(tableState.style.shadow) || 0) : (Number(styleShape.dataset.shadow ?? parseShadowValue(styleShape.style.boxShadow || getComputedStyle(styleShape).boxShadow)) || 0),
        fontFamily: text ? (text.style.fontFamily || "") : (headerText ? (headerText.style.fontFamily || "") : ""),
        fontSize: text ? parseInt(text.style.fontSize || "16", 10) : (headerText ? parseInt(headerText.style.fontSize || "18", 10) : 16),
        textColor: text ? (text.style.color || "") : (headerText ? (headerText.style.color || "") : ""),
        bold: text ? text.style.fontWeight === "700" : (headerText ? headerText.style.fontWeight === "700" : false),
        italic: text ? text.style.fontStyle === "italic" : (headerText ? headerText.style.fontStyle === "italic" : false),
        strike: text ? (text.style.textDecoration || "none").includes("line-through") : (headerText ? (headerText.style.textDecoration || "none").includes("line-through") : false),
        underline: text ? (text.style.textDecoration || "none").includes("underline") : (headerText ? (headerText.style.textDecoration || "none").includes("underline") : false),
        wrap: text ? (text.style.whiteSpace || "pre-wrap") !== "nowrap" : (headerText ? (headerText.style.whiteSpace || "nowrap") !== "nowrap" : true),
        numberGrouping: text ? getNumberGroupingEnabled(text) : (headerText ? getNumberGroupingEnabled(headerText) : true),
        numberFormat: text ? getNumberFormat(text) : NUMBER_FORMAT_NUMBER,
        decimalPlaces: text ? getFormulaDecimalPlaces(text) : null,
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

function applyStyleDataToFormatPanel(data = {}) {
  if (fpFillEnabled && data.fillEnabled != null) fpFillEnabled.checked = !!data.fillEnabled;
  if (fpGradientEnabled && data.gradientEnabled != null) fpGradientEnabled.checked = !!data.gradientEnabled;
  if (fpFill && data.fill) fpFill.value = rgbToHex(data.fill);
  if (fpFill2 && data.fill2) fpFill2.value = rgbToHex(data.fill2);
  if (fpFillType && data.fillDirection) fpFillType.value = data.fillDirection;
  if (fpBorderEnabled && data.borderEnabled != null) fpBorderEnabled.checked = !!data.borderEnabled;
  if (fpBorder && data.border) fpBorder.value = rgbToHex(data.border);
  if (fpLineStyle && data.borderStyle) fpLineStyle.value = normalizeBorderLineStyle(data.borderStyle);
  if (fpBorderWidth) fpBorderWidth.value = String(Math.max(0, Number(data.borderWidth) || 0));
  if (fpBorderWidthNum) fpBorderWidthNum.value = fpBorderWidth.value;
  if (fpRadius && data.radius != null) fpRadius.value = String(Math.max(0, Number(data.radius) || 0));
  if (fpRadiusNum && fpRadius) fpRadiusNum.value = fpRadius.value;
  if (fpOpacity && data.opacity != null) {
    const opacityValue = Math.round((Number(data.opacity) || 0) * 100);
    fpOpacity.value = String(opacityValue);
    if (fpOpacityNum) fpOpacityNum.value = fpOpacity.value;
  }
  if (fpShadow && data.shadow != null) fpShadow.value = String(Math.max(0, Number(data.shadow) || 0));
  if (fpShadowNum && fpShadow) fpShadowNum.value = fpShadow.value;
  if (fpFontFamily && data.fontFamily) setFontSelectValue(fpFontFamily, data.fontFamily);
  if (fpFontSize && data.fontSize != null) fpFontSize.value = String(Math.max(8, Number(data.fontSize) || 8));
  if (fpTextColor && data.textColor) fpTextColor.value = rgbToHex(data.textColor);
  if (fpBold && data.bold != null) fpBold.checked = !!data.bold;
  if (fpItalic && data.italic != null) fpItalic.checked = !!data.italic;
  if (fpStrike && data.strike != null) fpStrike.checked = !!data.strike;
  if (fpUnderline && data.underline != null) fpUnderline.checked = !!data.underline;
  if (fpWrap && data.wrap != null) fpWrap.checked = !!data.wrap;
  if (fpScroll && data.scrollEnabled != null) fpScroll.checked = !!data.scrollEnabled;
  if (fpNumberGrouping && data.numberGrouping != null) fpNumberGrouping.checked = !!data.numberGrouping;
  if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, data.numberFormat || NUMBER_FORMAT_NUMBER);
  if (fpFormulaDecimals) fpFormulaDecimals.value = data.decimalPlaces == null ? "" : String(Math.max(0, Number(data.decimalPlaces) || 0));
  if (fpAutoSize && data.tableAutoSize != null) fpAutoSize.checked = !!data.tableAutoSize;
  if (data.hAlign || data.vAlign) setAlignButtons(data.hAlign || "left", data.vAlign || "top");
  if (data.textPaddingTop != null || data.textPaddingRight != null || data.textPaddingBottom != null || data.textPaddingLeft != null) {
    if (fpX && data.textPaddingTop != null) fpX.value = String(data.textPaddingTop);
    if (fpW && data.textPaddingLeft != null) fpW.value = String(data.textPaddingLeft);
    if (fpH && data.textPaddingBottom != null) fpH.value = String(data.textPaddingBottom);
    if (fpR && data.textPaddingRight != null) fpR.value = String(data.textPaddingRight);
    if (fpY) {
      const allEqual = data.textPaddingTop === data.textPaddingRight
        && data.textPaddingRight === data.textPaddingBottom
        && data.textPaddingBottom === data.textPaddingLeft;
      fpY.value = allEqual ? String(data.textPaddingTop) : "";
    }
  }
}

function getStyleOperationTargets() {
  if (selectedConnector) return [];
  if (selectedShape) return [selectedShape];
  const multi = getMultiSelectedShapes();
  if (multi.length) return multi;
  if (selectedGroupId) return getGroupMembers(selectedGroupId);
  return [];
}

function clearFormatStyleMixedStates() {
  [
    fpFillEnabled, fpGradientEnabled, fpFill, fpFill2, fpFillType,
    fpBorderEnabled, fpBorder, fpLineStyle, fpBorderWidth, fpBorderWidthNum,
    fpRadius, fpRadiusNum, fpOpacity, fpOpacityNum, fpShadow, fpShadowNum,
    fpFontFamily, fpFontSize, fpTextColor, fpBold, fpItalic, fpStrike, fpUnderline,
    fpWrap, fpScroll, fpNumberGrouping, fpNumberFormat, fpFormulaDecimals, fpAutoSize
  ].forEach((el) => clearControlMixedState(el));
}

function applyStyleDataToShape(node, data = {}, opts = {}) {
  if (!node || !data) return false;
  if (node.dataset.shapeType === "shape-table") return false;
  const text = node.querySelector(".shape-text");
  const fillEnabled = data.fillEnabled != null ? !!data.fillEnabled : true;
  const gradientEnabled = fillEnabled && !!(data.gradientEnabled != null ? data.gradientEnabled : false);
  applyFillStyle(node, {
    fillEnabled,
    gradientEnabled,
    fill1: rgbToHex(data.fill || "#ffffff"),
    fill2: rgbToHex(data.fill2 || data.fill || "#ffffff"),
    fillDirection: data.fillDirection || "horizontal"
  });
  const lineEnabled = data.borderEnabled != null ? !!data.borderEnabled : true;
  const borderWidth = Math.max(0, Number(data.borderWidth) || 0);
  const borderStyle = normalizeBorderLineStyle(data.borderStyle || "solid");
  const borderColor = setShapeBorderColor(node, rgbToHex(data.border || "#000000"), "#000000");
  node.dataset.borderEnabled = lineEnabled ? "1" : "0";
  node.dataset.borderWidth = String(borderWidth);
  node.dataset.borderStyle = borderStyle;
  node.style.borderStyle = borderStyle;
  node.style.borderWidth = lineEnabled ? `${Math.max(lineEnabled ? 1 : 0, borderWidth)}px` : "0px";
  node.style.border = lineEnabled ? `${Math.max(1, borderWidth)}px solid ${borderColor}` : "0px solid transparent";
  const radius = Math.max(0, Number(data.radius) || 0);
  if (node.dataset.shapeType === "shape-rect") node.dataset.cornerRadius = String(radius);
  node.style.borderRadius = `${radius}px`;
  node.style.opacity = String(Number(data.opacity) || 1);
  applyNodeShadow(node, data.shadow != null ? data.shadow : 0);
  if (data.scrollEnabled != null) {
    node.dataset.scrollEnabled = data.scrollEnabled ? "1" : "0";
    applyShapeScrollState(node);
  }
  if (text) {
    if (!opts.preserveText) delete text.dataset.textHtml;
    if (data.fontFamily) text.style.fontFamily = fontCssFromKey(fontKeyFromCss(data.fontFamily));
    if (data.textColor) text.style.color = rgbToHex(data.textColor);
    if (data.fontSize != null) text.style.fontSize = `${Math.max(8, Number(data.fontSize) || 8)}px`;
    if (data.bold != null) text.style.fontWeight = data.bold ? "700" : "400";
    if (data.italic != null) text.style.fontStyle = data.italic ? "italic" : "normal";
    const deco = [];
    if (data.strike) deco.push("line-through");
    if (data.underline) deco.push("underline");
    if (data.strike != null || data.underline != null) text.style.textDecoration = deco.length ? deco.join(" ") : "none";
    if (data.wrap != null) text.style.whiteSpace = data.wrap ? "pre-wrap" : "nowrap";
    if (data.numberGrouping != null) text.dataset.numberGrouping = data.numberGrouping ? "1" : "0";
    if (data.numberFormat) setNumberFormat(text, data.numberFormat);
    if (data.decimalPlaces != null) setFormulaDecimalPlaces(text, data.decimalPlaces);
    applyTextAlign(text, data.hAlign || "left", data.vAlign || "top");
    if (data.textPaddingTop != null || data.textPaddingRight != null || data.textPaddingBottom != null || data.textPaddingLeft != null) {
      applyShapeTextPaddingValues(text, {
        top: data.textPaddingTop ?? DEFAULT_SHAPE_TEXT_PADDING,
        right: data.textPaddingRight ?? DEFAULT_SHAPE_TEXT_PADDING,
        bottom: data.textPaddingBottom ?? DEFAULT_SHAPE_TEXT_PADDING,
        left: data.textPaddingLeft ?? DEFAULT_SHAPE_TEXT_PADDING
      });
    }
    renderShapeText(text);
  }
  renderShapeVisual(node);
  syncShapeVisualStyle(node);
  if (isBpProcessStage(node)) onChevronShapeResized(node);
  else if (isBpProcessTask(node)) onBpTaskResized(node);
  else if (isBpProcessAutomation(node)) onBpAutomationResized(node);
  layoutConnectorPoints(node);
  return true;
}

function applyStyleDataToShapeTargets(targets, data) {
  if (!Array.isArray(targets) || !targets.length || !data) return false;
  const bpProcessIds = new Set();
  let changed = false;
  targets.forEach((node) => {
    if (!node || node.dataset.shapeType === "shape-line") return;
    if (applyStyleDataToShape(node, data)) {
      changed = true;
      if (node.dataset.bpProcessId) bpProcessIds.add(node.dataset.bpProcessId);
    }
  });
  bpProcessIds.forEach((processId) => layoutBpProcessBase(processId));
  if (!changed) return false;
  renderConnectors();
  updateDesktopExtent();
  return true;
}

function getStyleTypeForCurrentSelection() {
  if (selectedConnector) return "connector";
  const targets = getStyleOperationTargets().filter((node) => node.dataset.shapeType !== "shape-line");
  if (!targets.length) return null;
  return targets[0].dataset.shapeType || "shape";
}

function applyStyleSnapshotToSelection(snap) {
  if (!snap?.data) return false;
  if (selectedConnector) {
    if (snap.type !== "connector") return false;
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return false;
    const data = snap.data || {};
    c.color = data.color || c.color || "#1f2937";
    c.width = Math.max(1, Number(data.width) || c.width || 2);
    c.lineStyle = normalizeBorderLineStyle(data.lineStyle || c.lineStyle || "solid");
    c.opacity = normalizeOpacityValue(data.opacity ?? c.opacity ?? 1);
    c.shadow = Math.max(0, Number(data.shadow ?? c.shadow ?? 0) || 0);
    c.startArrowShape = data.startArrowShape || c.startArrowShape || "classic";
    c.endArrowShape = data.endArrowShape || c.endArrowShape || "classic";
    c.routeStyle = normalizeConnectorRouteStyle(data.routeStyle || c.routeStyle);
    if (!isOrthogonalRouteStyle(c.routeStyle)) c.routePoints = [];
    c.gapStart = Math.max(0, Number(data.gapStart ?? c.gapStart ?? 30) || 0);
    c.gapEnd = Math.max(0, Number(data.gapEnd ?? c.gapEnd ?? 30) || 0);
    if (data.labelStyle) c.labelStyle = normalizeConnectorLabelStyle(data.labelStyle);
    renderConnectors();
    saveLayout();
    syncFormatPanel();
    return true;
  }
  if (!selectedShape && !multiSelectedShapeIds.size && !selectedGroupId) return false;
  if (snap.type === "connector") return false;
  const targets = getStyleOperationTargets().filter((node) => node.dataset.shapeType !== "shape-line" && (node.dataset.shapeType || "shape") === snap.type);
  if (!targets.length) return false;
  if (!applyStyleDataToShapeTargets(targets, snap.data || {})) return false;
  clearFormatStyleMixedStates();
  applyStyleDataToFormatPanel(snap.data || {});
  updateFormatPanelVisuals();
  syncFormatPanel();
  saveLayout();
  return true;
}

function pasteCurrentStyle() {
  if (!styleClipboard) return false;
  return applyStyleSnapshotToSelection(styleClipboard);
}

function collectBpProcessIdsFromNodes(nodes) {
  const ids = new Set();
  (nodes || []).forEach((node) => {
    if (node?.dataset?.bpProcessId) ids.add(node.dataset.bpProcessId);
  });
  return [...ids];
}

function buildBpBaseFactoryStyleData() {
  const fill = getBpBaseFill();
  return {
    fillEnabled: true,
    gradientEnabled: false,
    fill,
    fill2: fill,
    borderEnabled: false,
    borderWidth: 0,
    radius: 0,
    shadow: 0,
    opacity: 1,
    hAlign: "center",
    vAlign: "middle",
    scrollEnabled: false
  };
}

function buildBpStageFactoryStyleData(stageNode) {
  const processId = stageNode?.dataset?.bpProcessId;
  const stageIndex = Number(stageNode?.dataset?.bpStageIndex) || 0;
  const stages = processId ? getBpStages(processId) : [];
  const lastIndex = stages.length
    ? Number(stages[stages.length - 1].dataset.bpStageIndex)
    : stageIndex;
  const isLast = stageIndex === lastIndex;
  const colors = getBpStageColors();
  const fill = isLast
    ? colors[colors.length - 1]
    : colors[Math.min(stageIndex, colors.length - 2)];
  return {
    fillEnabled: true,
    gradientEnabled: false,
    fill,
    fill2: fill,
    borderEnabled: false,
    borderWidth: 0,
    radius: 0,
    shadow: 0,
    opacity: 1,
    textColor: getBpStageTextColor(isLast),
    fontSize: isLast ? 13 : 15,
    bold: isLast,
    hAlign: "center",
    vAlign: "middle",
    scrollEnabled: false
  };
}

function applyBpFactoryVisualStyle(node) {
  if (!node?.dataset?.bpProcessId) return false;
  const role = node.dataset.bpRole;
  if (role === "task") {
    applyFillStyle(node, {
      fillEnabled: true,
      gradientEnabled: false,
      fill1: "#fbcfe8",
      fill2: "#fbcfe8",
      fillDirection: "horizontal"
    });
    node.dataset.borderEnabled = "0";
    node.dataset.borderWidth = "0";
    node.style.borderWidth = "0px";
    node.style.border = "0px solid transparent";
    node.style.opacity = "1";
    applyNodeShadow(node, 0);
    node.style.borderRadius = `${BP_TASK_RADIUS}px`;
    applyBpTaskTypography(node, { title: 15, label: 10.5, field: 14 });
    applyBpTaskStyle(node);
    layoutConnectorPoints(node);
    return true;
  }
  if (role === "automation") {
    applyFillStyle(node, {
      fillEnabled: false,
      gradientEnabled: false,
      fill1: BP_AUTOMATION_FILL,
      fill2: BP_AUTOMATION_FILL,
      fillDirection: "horizontal"
    });
    node.dataset.borderEnabled = "0";
    node.dataset.borderWidth = "0";
    node.style.borderWidth = "0px";
    node.style.border = "0px solid transparent";
    node.style.opacity = "1";
    applyNodeShadow(node, 0);
    applyBpAutomationTypography(node, { title: 15, label: 10.5, field: 14 });
    applyBpAutomationStyle(node);
    layoutConnectorPoints(node);
    return true;
  }
  let data = null;
  if (role === "base") data = buildBpBaseFactoryStyleData();
  else if (role === "stage") data = buildBpStageFactoryStyleData(node);
  if (!data) return false;
  return applyStyleDataToShape(node, data, { preserveText: true });
}

function restoreBpProcessFactoryStyles(processId) {
  if (!processId) return false;
  const members = [...desktop.querySelectorAll(`.shape[data-bp-process-id="${processId}"]`)];
  if (!members.length) return false;
  let changed = false;
  members.forEach((node) => {
    if (applyBpFactoryVisualStyle(node)) changed = true;
  });
  if (!changed) return false;
  layoutBpProcessBase(processId);
  layoutAllBpTasksInProcess(processId);
  layoutAllBpAutomationsInProcess(processId);
  renderConnectors();
  updateDesktopExtent();
  return true;
}

function syncBpProcessNodeToTheme(node) {
  if (!node?.dataset?.bpProcessId) return false;
  const role = node.dataset.bpRole;
  if (role === "base") {
    const nextFill = remapBpFactoryFillForTheme(node.dataset.fillColor || node.style.backgroundColor);
    if (!nextFill) return false;
    applyFillStyle(node, {
      fillEnabled: true,
      gradientEnabled: false,
      fill1: nextFill,
      fill2: nextFill,
      fillDirection: "horizontal"
    });
    return true;
  }
  if (role !== "stage") return false;
  const processId = node.dataset.bpProcessId;
  const stageIndex = Number(node.dataset.bpStageIndex) || 0;
  const stages = getBpStages(processId);
  const lastIndex = stages.length
    ? Number(stages[stages.length - 1].dataset.bpStageIndex)
    : stageIndex;
  const isLast = stageIndex === lastIndex;
  let changed = false;
  const nextFill = remapBpFactoryFillForTheme(node.dataset.fillColor || node.style.backgroundColor);
  if (nextFill) {
    applyFillStyle(node, {
      fillEnabled: true,
      gradientEnabled: false,
      fill1: nextFill,
      fill2: nextFill,
      fillDirection: "horizontal"
    });
    changed = true;
  }
  const text = node.querySelector(".shape-text");
  if (text) {
    const current = normalizeHexColor(text.style.color || getComputedStyle(text).color);
    const knownNonLast = new Set([
      normalizeHexColor(BP_STAGE_TEXT_LIGHT),
      normalizeHexColor(BP_STAGE_TEXT_DARK),
      "#000000"
    ]);
    const shouldUpdateText = isLast
      ? (!current || current === "#ffffff" || knownNonLast.has(current))
      : (!current || knownNonLast.has(current));
    if (shouldUpdateText) {
      const nextText = getBpStageTextColor(isLast);
      if (normalizeHexColor(text.style.color) !== normalizeHexColor(nextText)) {
        text.style.color = nextText;
        changed = true;
      }
    }
  }
  return changed;
}

function syncBpProcessesToTheme(opts = {}) {
  if (!desktop) return false;
  let changed = false;
  desktop.querySelectorAll('.shape[data-bp-role="base"], .shape[data-bp-role="stage"]').forEach((node) => {
    if (syncBpProcessNodeToTheme(node)) changed = true;
  });
  if (changed && opts.save !== false) saveLayout();
  return changed;
}

function resetCurrentStyleToDefault() {
  if (selectedConnector) {
    const data = getDefaultStyleData("connector");
    if (!data || !Object.keys(data).length) return false;
    return applyStyleSnapshotToSelection({ type: "connector", data });
  }
  const targets = getStyleOperationTargets().filter((node) => node.dataset.shapeType !== "shape-line");
  if (!targets.length) return false;

  const bpProcessIds = collectBpProcessIdsFromNodes(targets);
  const nonBpTargets = targets.filter((node) => !node.dataset.bpProcessId);
  let changed = false;

  bpProcessIds.forEach((processId) => {
    if (restoreBpProcessFactoryStyles(processId)) changed = true;
  });

  if (nonBpTargets.length) {
    const type = nonBpTargets[0].dataset.shapeType || "shape";
    let data = getBuiltinDefaultStyleData(type);
    if (!data || !Object.keys(data).length) data = getDefaultStyleData(type);
    if (data && Object.keys(data).length) {
      const matching = nonBpTargets.filter((node) => (node.dataset.shapeType || "shape") === type);
      if (applyStyleDataToShapeTargets(matching, data)) changed = true;
      if (!bpProcessIds.length) {
        applyStyleDataToFormatPanel(data);
        updateFormatPanelVisuals();
      }
    }
  }

  if (!changed) return false;
  clearFormatStyleMixedStates();
  syncFormatPanel();
  saveLayout();
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
  if (!formatPanel) return;
  const margin = 8;
  const rect = formatPanel.getBoundingClientRect();
  const currentLeft = parseFloat(formatPanel.style.left || "0");
  const currentTop = parseFloat(formatPanel.style.top || "0");
  let nextLeft = currentLeft;
  let nextTop = currentTop;

  if (rect.left < margin) nextLeft += margin - rect.left;
  if (rect.right > window.innerWidth - margin) nextLeft -= rect.right - (window.innerWidth - margin);
  if (rect.top < margin) nextTop += margin - rect.top;
  if (rect.bottom > window.innerHeight - margin) nextTop -= rect.bottom - (window.innerHeight - margin);

  formatPanel.style.left = `${nextLeft}px`;
  formatPanel.style.top = `${nextTop}px`;
  formatPanel.style.right = "auto";
}

function placeFormatPanelDefault() {
  if (!formatPanel) return;
  const toolbarTop = toolbarEl ? Math.round(parseFloat(getComputedStyle(toolbarEl).top || "24")) : 24;
  const left = Math.max(8, window.innerWidth - formatPanel.offsetWidth - 8);
  formatPanel.style.left = `${left}px`;
  formatPanel.style.top = `${Math.max(8, toolbarTop)}px`;
  formatPanel.style.right = "auto";
}

function placeCollapsedFormatPanel() {
  if (!formatPanel) return;
  const margin = 8;
  const toolbarTop = toolbarEl ? Math.round(parseFloat(getComputedStyle(toolbarEl).top || "24")) : 24;
  const left = Math.max(margin, window.innerWidth - formatPanel.offsetWidth - margin);
  formatPanel.style.left = `${left}px`;
  formatPanel.style.top = `${Math.max(margin, toolbarTop)}px`;
  formatPanel.style.right = "auto";
}

function setFormatCollapseIcon(collapsed) {
  if (!fpCollapseBtn) return;
  const path = collapsed ? "M5 8.5 9 12.5 13 8.5" : "M5 10.5 9 6.5 13 10.5";
  fpCollapseBtn.innerHTML = `<svg viewBox="0 0 18 18" aria-hidden="true"><path d="${path}"/></svg>`;
}

function ensureFormatPanelEnabledCollapsed() {
  if (!formatPanel) return;
  if (guestPublicView || !canEditCurrentDocument()) {
    if (formatToggle) formatToggle.checked = false;
    formatPanel.classList.add("hidden");
    return;
  }
  if (formatToggle) formatToggle.checked = true;
  formatPanel.classList.remove("hidden");
  formatPanel.classList.add("is-collapsed");
  setFormatCollapseIcon(true);
  placeCollapsedFormatPanel();
  clampPanelIntoViewport();
  savePanelState();
}

function showFormatPanel() {
  if (!formatPanel || guestPublicView || !canEditCurrentDocument()) return;
  const wasHidden = formatPanel.classList.contains("hidden");
  formatPanel.classList.remove("hidden");
  if (wasHidden) {
    if (formatPanel.classList.contains("is-collapsed")) placeCollapsedFormatPanel();
    else placeFormatPanelDefault();
    if (toolbarEl && !formatPanel.classList.contains("is-collapsed")) {
      const targetTop = Math.round(toolbarEl.getBoundingClientRect().top);
      const currentTop = Math.round(formatPanel.getBoundingClientRect().top);
      const delta = targetTop - currentTop;
      if (delta) formatPanel.style.top = `${Math.max(8, (parseFloat(formatPanel.style.top || "0") + delta))}px`;
    }
  }
  clampPanelIntoViewport();
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
  if (!formatPanel) return;
  const stRaw = localStorage.getItem(PANEL_KEY);
  if (stRaw) {
    try {
      const st = JSON.parse(stRaw);
      if (st.width) formatPanel.style.width = st.width;
      if (st.height) formatPanel.style.height = st.height;
      formatPanel.classList.toggle("is-collapsed", Boolean(st.collapsed));
      setFormatCollapseIcon(Boolean(st.collapsed));
      formatPanel.style.right = "auto";
    } catch {}
  }
  placeFormatPanelDefault();
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
      const minTop = 8;
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
      if (formatPanel.classList.contains("is-collapsed")) return;
      if (e.target && e.target.closest && e.target.closest(".fp-header-actions, .fp-header-icon")) return;
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
    });
    const stop = (e) => {
      if (!drag) return;
      drag = null;
      if (e.pointerId != null) header.releasePointerCapture(e.pointerId);
      clampPanelIntoViewport();
      savePanelState();
    };
    header.addEventListener("pointerup", stop);
    header.addEventListener("pointercancel", stop);
    header.addEventListener("click", (e) => {
      if (!formatPanel.classList.contains("is-collapsed")) return;
      if (e.target && e.target.closest && e.target.closest(".fp-header-actions, .fp-header-icon")) return;
      toggleFormatPanelCollapsed();
    });
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

function insertLineBreakAtCursor(rootEl = null) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (rootEl && !rootEl.contains(range.commonAncestorContainer)) return;
  if (typeof document.execCommand === "function" && document.execCommand("insertLineBreak")) return;
  range.deleteContents();
  const br = document.createElement("br");
  range.insertNode(br);
  // В contenteditable div одиночный <br> в конце блока часто не даёт видимую новую строку.
  if (!br.nextSibling) {
    const tail = document.createElement("br");
    br.parentNode.insertBefore(tail, br.nextSibling);
    range.setStartBefore(tail);
    range.setEndBefore(tail);
  } else {
    range.setStartAfter(br);
    range.setEndAfter(br);
  }
  sel.removeAllRanges();
  sel.addRange(range);
}

const shapeTextDblSelectSessions = new WeakMap();

function resetShapeTextDblSelectSession(textEl) {
  if (!textEl) return;
  shapeTextDblSelectSessions.delete(textEl);
  if (textEl.__dblResetTimer) {
    clearTimeout(textEl.__dblResetTimer);
    textEl.__dblResetTimer = null;
  }
}

function getCaretRangeFromClientPoint(clientX, clientY) {
  if (document.caretRangeFromPoint) return document.caretRangeFromPoint(clientX, clientY);
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(clientX, clientY);
    if (!pos) return null;
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.collapse(true);
    return range;
  }
  return null;
}

function isShapeTextWordChar(ch) {
  if (!ch) return false;
  return /[\p{L}\p{N}_]/u.test(ch);
}

function forEachShapeTextContentOffset(textEl, visit) {
  let offset = 0;
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.textContent || "";
      for (let i = 0; i < value.length; i += 1) {
        visit(offset, { type: "text", node, index: i });
        offset += 1;
      }
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "BR") {
      visit(offset, { type: "br", node });
      offset += 1;
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(textEl.childNodes).forEach(walk);
  return offset;
}

function setSelectionCharacterRange(textEl, start, end) {
  if (!textEl) return;
  const total = (textEl.innerText || "").length;
  const safeStart = clamp(Math.floor(start), 0, total);
  const safeEnd = clamp(Math.floor(end), safeStart, total);
  let startRef = null;
  let endRef = null;
  forEachShapeTextContentOffset(textEl, (offset, ref) => {
    if (offset === safeStart && !startRef) startRef = ref;
    if (offset === safeEnd && !endRef) endRef = ref;
  });
  const range = document.createRange();
  if (safeEnd >= total) {
    range.selectNodeContents(textEl);
    range.collapse(false);
    if (safeStart >= total) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
      return;
    }
    if (startRef?.type === "text") range.setStart(startRef.node, startRef.index);
    else if (startRef?.type === "br") range.setStartBefore(startRef.node);
    else range.setStart(textEl, 0);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    return;
  }
  if (startRef?.type === "text") range.setStart(startRef.node, startRef.index);
  else if (startRef?.type === "br") range.setStartBefore(startRef.node);
  else range.setStart(textEl, 0);
  if (endRef?.type === "text") range.setEnd(endRef.node, endRef.index);
  else if (endRef?.type === "br") range.setEndBefore(endRef.node);
  else range.setEnd(textEl, 0);
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

function selectAllShapeText(textEl) {
  if (!textEl) return;
  const range = document.createRange();
  range.selectNodeContents(textEl);
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

function getShapeTextCaretOffsetFromPoint(textEl, clientX, clientY) {
  const range = getCaretRangeFromClientPoint(clientX, clientY);
  if (!range || !textEl.contains(range.startContainer)) return null;
  const sel = window.getSelection();
  if (!sel) return null;
  sel.removeAllRanges();
  sel.addRange(range);
  return getCaretCharacterOffsetWithin(textEl);
}

function selectWordAtPointInShapeText(textEl, clientX, clientY) {
  const raw = textEl.innerText || "";
  if (!raw.length) {
    selectAllShapeText(textEl);
    return;
  }
  let offset = getShapeTextCaretOffsetFromPoint(textEl, clientX, clientY);
  if (offset == null) offset = 0;
  if (offset >= raw.length) offset = raw.length - 1;
  let start = offset;
  let end = offset;
  if (!isShapeTextWordChar(raw[offset])) {
    if (offset > 0 && isShapeTextWordChar(raw[offset - 1])) {
      start = offset - 1;
      end = offset;
    } else if (offset + 1 < raw.length && isShapeTextWordChar(raw[offset + 1])) {
      start = offset;
      end = offset + 1;
    }
  }
  while (start > 0 && isShapeTextWordChar(raw[start - 1])) start -= 1;
  while (end < raw.length && isShapeTextWordChar(raw[end])) end += 1;
  if (start >= end) {
    selectAllShapeText(textEl);
    return;
  }
  setSelectionCharacterRange(textEl, start, end);
}

function selectLineAtPointInShapeText(textEl, clientX, clientY) {
  const raw = textEl.innerText || "";
  if (!raw.length) {
    selectAllShapeText(textEl);
    return;
  }
  let offset = getShapeTextCaretOffsetFromPoint(textEl, clientX, clientY);
  if (offset == null) offset = 0;
  const lineStart = raw.lastIndexOf("\n", Math.max(0, offset - 1)) + 1;
  const nextBreak = raw.indexOf("\n", offset);
  const lineEnd = nextBreak === -1 ? raw.length : nextBreak;
  setSelectionCharacterRange(textEl, lineStart, lineEnd);
}

function handleShapeTextDoubleClick(node, textEl, event) {
  if (event.target.closest(".h, .resize-handle, .shape-param-handle, .shape-line-handle, .bp-stage-control, .conn-point")) return;
  event.preventDefault();
  event.stopPropagation();

  const wasEditing = textEl.contentEditable === "true";
  const now = Date.now();
  const prev = shapeTextDblSelectSessions.get(textEl);
  const near = prev && Math.hypot(event.clientX - prev.x, event.clientY - prev.y) <= 14;
  const soon = prev && (now - prev.ts) <= 1200;
  const continuing = wasEditing && near && soon;

  let stage = 0;
  if (continuing) stage = ((prev.stage ?? -1) + 1) % 3;

  const clientX = event.clientX;
  const clientY = event.clientY;
  const applyStageSelection = () => {
    if (stage === 0) selectWordAtPointInShapeText(textEl, clientX, clientY);
    else if (stage === 1) selectLineAtPointInShapeText(textEl, clientX, clientY);
    else selectAllShapeText(textEl);
    shapeTextDblSelectSessions.set(textEl, { stage, x: clientX, y: clientY, ts: now });
  };

  if (!wasEditing) {
    setShapeTextContentForEditing(textEl);
    textEl.contentEditable = "true";
    setActiveFormulaEditor(textEl);
    textEl.focus();
    requestAnimationFrame(() => {
      const offset = getShapeTextCaretOffsetFromPoint(textEl, clientX, clientY);
      if (offset != null) setSelectionCharacterRange(textEl, offset, offset);
      else placeCaretAtEnd(textEl);
      shapeTextDblSelectSessions.set(textEl, { stage: -1, x: clientX, y: clientY, ts: now });
    });
    return;
  }

  applyStageSelection();
}

function bindShapeTextDblSelectEditing(node, textEl) {
  if (!node || !textEl || textEl.dataset.shapeTextDblBound === "1") return;
  textEl.dataset.shapeTextDblBound = "1";
  textEl.addEventListener("pointerdown", (e) => {
    if (textEl.contentEditable !== "true") return;
    if (e.detail === 1) {
      clearTimeout(textEl.__dblResetTimer);
      textEl.__dblResetTimer = setTimeout(() => resetShapeTextDblSelectSession(textEl), 450);
    } else if (e.detail >= 2) {
      clearTimeout(textEl.__dblResetTimer);
    }
  });
  node.addEventListener("dblclick", (e) => {
    if (e.target.closest(".h, .resize-handle, .shape-param-handle, .shape-line-handle, .bp-stage-control, .conn-point, .table-add-col, .table-add-row")) return;
    handleShapeTextDoubleClick(node, textEl, e);
  });
  textEl.addEventListener("mouseup", () => {
    if (textEl.contentEditable !== "true") return;
    syncFormatPanel();
  });
  textEl.addEventListener("keyup", () => {
    if (textEl.contentEditable !== "true") return;
    syncFormatPanel();
  });
}

function insertTextAtCursor(el, text) {
  if (!el || !text) return;
  el.focus();
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    el.textContent = (el.textContent || "") + text;
    placeCaretAtEnd(el);
    return;
  }
  const range = sel.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) {
    el.textContent = (el.textContent || "") + text;
    placeCaretAtEnd(el);
    return;
  }
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.setEndAfter(node);
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

function setHorizontalAlignButtons(h) {
  [fpAlignLeft, fpAlignCenter, fpAlignRight].forEach((b) => { if (b) b.classList.remove("active"); });
  if (h === "left" && fpAlignLeft) fpAlignLeft.classList.add("active");
  if (h === "center" && fpAlignCenter) fpAlignCenter.classList.add("active");
  if (h === "right" && fpAlignRight) fpAlignRight.classList.add("active");
}

function setVerticalAlignButtons(v) {
  [fpVTop, fpVMiddle, fpVBottom].forEach((b) => { if (b) b.classList.remove("active"); });
  if (v === "top" && fpVTop) fpVTop.classList.add("active");
  if (v === "middle" && fpVMiddle) fpVMiddle.classList.add("active");
  if (v === "bottom" && fpVBottom) fpVBottom.classList.add("active");
}

function setAlignButtons(h, v) {
  setHorizontalAlignButtons(h);
  setVerticalAlignButtons(v);
}

function setArrowShapeButtons(container, value) {
  if (!container) return;
  if (container.matches && container.matches("select")) {
    container.value = value || "classic";
    return;
  }
  container.dataset.value = value || "classic";
  container.querySelectorAll(".fp-arrow-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.shape === value);
  });
  const active = container.querySelector(".fp-arrow-option.active") || container.querySelector(".fp-arrow-option");
  const preview = container.querySelector(".fp-arrow-select-preview");
  const svg = active ? active.querySelector("svg") : null;
  if (preview && svg) preview.innerHTML = svg.outerHTML;
}

function getArrowShapeButtonsValue(container) {
  if (!container) return "classic";
  if (container.matches && container.matches("select")) return container.value || "classic";
  if (container.dataset.value) return container.dataset.value;
  const active = container.querySelector(".fp-arrow-option.active");
  return (active && active.dataset.shape) || "classic";
}

function setConnectorRouteButtons(container, value) {
  if (!container) return;
  const routeStyle = normalizeConnectorRouteStyle(value);
  container.dataset.value = routeStyle;
  container.querySelectorAll(".fp-conn-route-option").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.route === routeStyle);
  });
  const active = container.querySelector(".fp-conn-route-option.active") || container.querySelector(".fp-conn-route-option");
  const preview = container.querySelector(".fp-arrow-select-preview");
  const svg = active ? active.querySelector("svg") : null;
  if (preview && svg) preview.innerHTML = svg.outerHTML;
}

function getConnectorRouteButtonsValue(container) {
  if (!container) return "straight";
  if (container.dataset.value) return normalizeConnectorRouteStyle(container.dataset.value);
  const active = container.querySelector(".fp-conn-route-option.active");
  return normalizeConnectorRouteStyle(active?.dataset.route);
}

function getSelectionMode() {
  if (selectedConnector) return "connector";
  if (selectedWindow) return "window";
  if (selectedGroupId) return "shape";
  if (!selectedShape && multiSelectedShapeIds.size) return "shape";
  if (selectedShape) return "shape";
  return "desktop";
}

function setControlVisibilityByMode(mode) {
  const connectorOnlyControls = document.querySelectorAll(".fp-connector-only");
  const shapeOnlyControls = document.querySelectorAll(".fp-shape-only");
  const sharedStyleControls = document.querySelectorAll(".fp-shared-style");
  const tableOnlyControls = document.querySelectorAll(".fp-table-only");
  const scrollOnlyControls = document.querySelectorAll(".fp-scroll-only");
  const showConnector = mode === "connector";
  const showShapeOnly = mode === "shape";
  const showDesktop = mode === "desktop";
  const showSharedStyle = showShapeOnly || showConnector || showDesktop;
  const showTableOnly = showShapeOnly && selectedShape && selectedShape.dataset && selectedShape.dataset.shapeType === "shape-table";
  connectorOnlyControls.forEach((el) => el.classList.toggle("hidden", !showConnector));
  shapeOnlyControls.forEach((el) => el.classList.toggle("hidden", !showShapeOnly));
  sharedStyleControls.forEach((el) => el.classList.toggle("hidden", !showSharedStyle));
  tableOnlyControls.forEach((el) => el.classList.toggle("hidden", !showTableOnly));
  scrollOnlyControls.forEach((el) => el.classList.toggle("hidden", !(showShapeOnly && selectionSupportsScrollOption())));

  const fillRow = fpFillEnabled ? fpFillEnabled.closest(".fp-row") : null;
  const gradientRow = fpGradientWrap;
  const borderWidthRow = fpBorderWidth ? fpBorderWidth.closest(".fp-row") : null;
  const radiusRow = fpRadius ? fpRadius.closest(".fp-row") : null;
  const opacityRow = fpOpacity ? fpOpacity.closest(".fp-row") : null;
  const shadowRow = fpShadow ? fpShadow.closest(".fp-row") : null;
  const lineStyleSelect = fpLineStyle;
  const borderWidthLabel = borderWidthRow ? borderWidthRow.querySelector(".fp-label-inline") : null;
  const borderWidthUnit = fpBorderWidth ? fpBorderWidth.parentElement?.querySelector(".fp-unit") : null;

  if (fillRow) fillRow.classList.toggle("hidden", !(showShapeOnly || showDesktop));
  if (gradientRow) gradientRow.classList.toggle("hidden", !(showShapeOnly || showDesktop));
  if (borderWidthRow) borderWidthRow.classList.toggle("hidden", !(showShapeOnly || showConnector || showDesktop));
  if (opacityRow) opacityRow.classList.toggle("hidden", !(showShapeOnly || showConnector || showDesktop));
  if (radiusRow) radiusRow.classList.toggle("hidden", !showShapeOnly);
  if (shadowRow) shadowRow.classList.toggle("hidden", !(showShapeOnly || showConnector));
  if (lineStyleSelect) lineStyleSelect.classList.toggle("hidden", showDesktop);
  if (borderWidthLabel) borderWidthLabel.textContent = showDesktop ? "Размер клетки" : "Линия";
  if (borderWidthUnit) borderWidthUnit.textContent = showDesktop ? "px" : "pt";
  if (fpBorderWidth) {
    fpBorderWidth.min = showDesktop ? "8" : "0";
    fpBorderWidth.max = showDesktop ? "120" : "20";
  }
  if (fpBorderWidthNum) {
    fpBorderWidthNum.min = showDesktop ? "8" : "0";
    fpBorderWidthNum.max = showDesktop ? "120" : "20";
  }
  updateFormulaDecimalsControl();
}

function applyTextAlign(text, h, v) {
  // Keep CSS display:grid so data-valign can use align-content (middle/bottom).
  // Inline display:block was overriding that and made H/V align fight each other.
  text.style.display = "";
  text.style.textAlign = h || "left";
  text.dataset.halign = h || "left";
  text.dataset.valign = v || "top";
  text.style.justifyContent = "";
  text.style.alignItems = "";
  text.style.alignContent = "";
  syncShapeTextVerticalAlign(text);
}

function syncShapeTextVerticalAlign(text) {
  if (!text) return;
  const v = text.dataset.valign || "top";
  if (v === "middle" || v === "bottom") text.dataset.valign = v;
  else delete text.dataset.valign;
}

function isFormulaTextValue(value) {
  return String(value || "").trim().startsWith("=");
}

function updateFormulaDecimalsControl() {
  if (!fpFormulaDecimalsRow || !fpFormulaDecimals || !fpNumberFormatRow) return;
  const visible = selectionSupportsNumberFormatting();
  fpNumberFormatRow.classList.toggle("hidden", !visible);
  fpFormulaDecimalsRow.classList.toggle("hidden", !visible);
  if (!visible) {
    clearControlMixedState(fpFormulaDecimals);
    fpFormulaDecimals.value = "";
    if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, NUMBER_FORMAT_NUMBER);
  }
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
  target.style.left = formatPositionPx(left);
  target.style.top = formatPositionPx(top);
  if (selectedShape) layoutConnectorPoints(selectedShape);
  if (selectedWindow) layoutConnectorPoints(selectedWindow);
  renderConnectors();
  updateDesktopExtent();
  saveLayout();
  return true;
}

function getObjectAlignmentTargets() {
  const multi = getMultiSelectedShapes();
  if (multi.length >= 2) return multi;
  if (selectedGroupId && !selectedShape) return getGroupMembers(selectedGroupId);
  if (selectedShape) return [selectedShape];
  if (selectedWindow) return [selectedWindow];
  return [];
}

function getZOrderTargets() {
  const multi = getMultiSelectedShapes();
  if (multi.length) return multi;
  if (selectedGroupId && !selectedShape) return getGroupMembers(selectedGroupId);
  if (selectedShape) return [selectedShape];
  if (selectedWindow) return [selectedWindow];
  return [];
}

function markBpTaskManualPosition(node) {
  if (isBpProcessTask(node)) node.dataset.bpTaskManualPosition = "1";
  if (isBpProcessAutomation(node)) node.dataset.bpAutomationManualPosition = "1";
}

function alignObjectSelection(mode) {
  if (!canEditCurrentDocument()) return false;
  const targets = getObjectAlignmentTargets().filter(Boolean);
  if (targets.length < 2) return false;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  targets.forEach((node) => {
    left = Math.min(left, node.offsetLeft);
    top = Math.min(top, node.offsetTop);
    right = Math.max(right, node.offsetLeft + node.offsetWidth);
    bottom = Math.max(bottom, node.offsetTop + node.offsetHeight);
  });
  const bounds = {
    left,
    top,
    right,
    bottom,
    centerX: left + ((right - left) / 2),
    centerY: top + ((bottom - top) / 2)
  };
  targets.forEach((node) => {
    let nextLeft = node.offsetLeft;
    let nextTop = node.offsetTop;
    if (mode === "left") nextLeft = bounds.left;
    if (mode === "center") nextLeft = bounds.centerX - (node.offsetWidth / 2);
    if (mode === "right") nextLeft = bounds.right - node.offsetWidth;
    if (mode === "top") nextTop = bounds.top;
    if (mode === "middle") nextTop = bounds.centerY - (node.offsetHeight / 2);
    if (mode === "bottom") nextTop = bounds.bottom - node.offsetHeight;
    setNodePosition(node, Math.round(nextLeft), Math.round(nextTop));
    markBpTaskManualPosition(node);
    layoutConnectorPoints(node);
  });
  updateGroupSelectionBox();
  renderConnectors();
  syncAllLiftedControlsPositions();
  syncSelectionControlsOverlay();
  updateDesktopExtent();
  saveLayout();
  syncFormatPanel();
  return true;
}

function distributeObjectSelection(axis) {
  if (!canEditCurrentDocument()) return false;
  const targets = getObjectAlignmentTargets().filter(Boolean);
  if (targets.length < 3) return false;
  const isHorizontal = axis === "horizontal";
  const ordered = targets
    .map((node) => ({
      node,
      left: node.offsetLeft,
      top: node.offsetTop,
      width: node.offsetWidth,
      height: node.offsetHeight,
      centerX: node.offsetLeft + (node.offsetWidth / 2),
      centerY: node.offsetTop + (node.offsetHeight / 2)
    }))
    .sort((a, b) => (isHorizontal ? (a.centerX - b.centerX) : (a.centerY - b.centerY)));
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  const startCenter = isHorizontal ? first.centerX : first.centerY;
  const endCenter = isHorizontal ? last.centerX : last.centerY;
  const step = (endCenter - startCenter) / (ordered.length - 1);
  ordered.forEach((entry, index) => {
    if (index === 0 || index === ordered.length - 1) {
      layoutConnectorPoints(entry.node);
      return;
    }
    const targetCenter = startCenter + (step * index);
    if (isHorizontal) {
      entry.node.style.left = formatPositionPx(Math.round(targetCenter - (entry.width / 2)));
      entry.node.style.top = formatPositionPx(Math.round(entry.top));
    } else {
      entry.node.style.top = formatPositionPx(Math.round(targetCenter - (entry.height / 2)));
      entry.node.style.left = formatPositionPx(Math.round(entry.left));
    }
    markBpTaskManualPosition(entry.node);
    layoutConnectorPoints(entry.node);
  });
  updateGroupSelectionBox();
  renderConnectors();
  syncAllLiftedControlsPositions();
  syncSelectionControlsOverlay();
  updateDesktopExtent();
  saveLayout();
  syncFormatPanel();
  return true;
}

function showFeatureHint(label) {
  showHint(`${label} пока доступно только в полном многовыборе.`, "warning", 2500);
}

function getGroupConnId(groupId) {
  return `group_${groupId}`;
}

function isGroupConnId(id) {
  return String(id || "").startsWith("group_");
}

function getGroupIdFromConnId(connId) {
  return isGroupConnId(connId) ? String(connId).slice("group_".length) : "";
}

function getGroupMembers(groupId) {
  const target = String(groupId || "").trim();
  if (!target) return [];
  return Array.from(desktop.querySelectorAll(`.shape[data-group-id="${target}"]`));
}

function getGroupedShapeIds(groupId) {
  return getGroupMembers(groupId).map((node) => node.dataset.shapeId).filter(Boolean);
}

function getShapeGroupId(node) {
  return node && node.dataset ? String(node.dataset.groupId || "").trim() : "";
}

function isFrameShape(node) {
  return !!(node && node.dataset && node.dataset.shapeType === "shape-frame");
}

function getShapeFrameId(node) {
  return node && node.dataset ? String(node.dataset.frameId || "").trim() : "";
}

function setShapeFrameId(node, frameId) {
  if (!node?.dataset) return;
  const next = String(frameId || "").trim();
  if (next) node.dataset.frameId = next;
  else delete node.dataset.frameId;
}

function getFrameShapeById(frameId) {
  const target = String(frameId || "").trim();
  if (!target) return null;
  return Array.from(desktop.querySelectorAll('.shape[data-shape-type="shape-frame"]')).find((node) => node.dataset.shapeId === target) || null;
}

function getFrameChildren(frameId) {
  const target = String(frameId || "").trim();
  if (!target) return [];
  return Array.from(desktop.querySelectorAll(".shape")).filter((node) => node && getShapeFrameId(node) === target);
}

function getFrameDescendants(frameId) {
  const result = [];
  const queue = [String(frameId || "").trim()];
  const seen = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (!current || seen.has(current)) continue;
    seen.add(current);
    getFrameChildren(current).forEach((child) => {
      result.push(child);
      if (isFrameShape(child) && child.dataset.shapeId) queue.push(child.dataset.shapeId);
    });
  }
  return result;
}

function isFrameAncestorOf(ancestorFrameId, descendantFrameId) {
  const ancestor = String(ancestorFrameId || "").trim();
  let currentId = String(descendantFrameId || "").trim();
  if (!ancestor || !currentId || ancestor === currentId) return false;
  const seen = new Set();
  while (currentId) {
    if (seen.has(currentId)) return false;
    seen.add(currentId);
    const current = getFrameShapeById(currentId);
    if (!current) return false;
    const parentId = getShapeFrameId(current);
    if (!parentId) return false;
    if (parentId === ancestor) return true;
    currentId = parentId;
  }
  return false;
}

function canAssignShapeToFrame(node, frameId) {
  const target = String(frameId || "").trim();
  if (!node?.dataset || !target) return false;
  if (node.dataset.shapeId === target) return false;
  if (isFrameShape(node) && isFrameAncestorOf(node.dataset.shapeId, target)) return false;
  return true;
}

function isShapeInsideFrameById(shapeNode, frameId) {
  const frame = getFrameShapeById(frameId);
  if (!frame || !shapeNode) return false;
  return boundsContainShape(getElementLogicalBox(frame), getElementLogicalBox(shapeNode));
}
window.isShapeInsideFrameById = isShapeInsideFrameById;

function boundsContainShape(outer, inner) {
  return outer.left <= inner.left
    && outer.top <= inner.top
    && outer.right >= inner.right
    && outer.bottom >= inner.bottom;
}

function boundsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function getFrameBoundsArea(bounds) {
  return Math.max(0, bounds.right - bounds.left) * Math.max(0, bounds.bottom - bounds.top);
}

function findContainingFrameForShape(node) {
  if (!node) return null;
  const shapeBounds = getElementLogicalBox(node);
  let best = null;
  let bestArea = Infinity;
  Array.from(desktop.querySelectorAll('.shape[data-shape-type="shape-frame"]')).forEach((frame) => {
    if (!frame || frame === node) return;
    const frameId = frame.dataset.shapeId;
    if (!canAssignShapeToFrame(node, frameId)) return;
    const frameBounds = getElementLogicalBox(frame);
    if (!boundsContainShape(frameBounds, shapeBounds)) return;
    const area = getFrameBoundsArea(frameBounds);
    if (area < bestArea) {
      bestArea = area;
      best = frame;
    }
  });
  return best;
}

function getEligibleFrameChildCandidates(frame) {
  const frameId = frame?.dataset?.shapeId || "";
  if (!frameId) return [];
  const frameBounds = getElementLogicalBox(frame);
  return Array.from(desktop.querySelectorAll(".shape")).filter((node) => {
    if (!node || node === frame) return false;
    if (!canAssignShapeToFrame(node, frameId)) return false;
    const existingFrameId = getShapeFrameId(node);
    if (existingFrameId && existingFrameId !== frameId) {
      const existingFrame = getFrameShapeById(existingFrameId);
      if (existingFrame) {
        // Allow reclaiming into a nested frame that sits inside the current parent.
        if (!boundsContainShape(getElementLogicalBox(existingFrame), frameBounds)) return false;
      }
    }
    return true;
  });
}

function getElementsCompletelyInFrame(frame) {
  const frameBounds = getElementLogicalBox(frame);
  return getEligibleFrameChildCandidates(frame).filter((node) => boundsContainShape(frameBounds, getElementLogicalBox(node)));
}

function reorderFrameBehindChildren(frame, visited = null) {
  if (!frame) return;
  const frameId = frame.dataset?.shapeId || "";
  if (!frameId) return;
  const seen = visited instanceof Set ? visited : new Set();
  if (seen.has(frameId)) return;
  seen.add(frameId);

  const children = getFrameChildren(frameId);
  children.forEach((child) => {
    if (isFrameShape(child)) reorderFrameBehindChildren(child, seen);
  });
  if (children.length) {
    const minZ = Math.min(...children.map((child) => Number(child.style.zIndex) || 0));
    frame.style.zIndex = String(Math.max(1, minZ - 1));
    const origin = getDesktopContentRoot();
    if (origin) {
      const firstChild = children.reduce((min, child) => {
        if (!min) return child;
        return (Number(child.style.zIndex) || 0) < (Number(min.style.zIndex) || 0) ? child : min;
      }, null);
      if (firstChild && firstChild.parentElement === origin) origin.insertBefore(frame, firstChild);
    }
  }

  const parentId = getShapeFrameId(frame);
  if (!parentId) return;
  const parent = getFrameShapeById(parentId);
  if (parent) reorderFrameBehindChildren(parent, seen);
}

function addElementsToFrame(frame, elements) {
  if (!frame || !isFrameShape(frame) || !elements?.length) return;
  const frameId = frame.dataset.shapeId;
  elements.forEach((node) => {
    if (!node || !canAssignShapeToFrame(node, frameId)) return;
    setShapeFrameId(node, frameId);
  });
  reorderFrameBehindChildren(frame);
}

function removeAllElementsFromFrame(frame) {
  if (!frame) return;
  getFrameChildren(frame.dataset.shapeId).forEach((node) => setShapeFrameId(node, null));
}

function updateFrameMembership(frame) {
  if (!frame || !isFrameShape(frame)) return;
  const frameBounds = getElementLogicalBox(frame);
  const frameId = frame.dataset.shapeId;
  getFrameChildren(frameId).forEach((node) => {
    const shapeBounds = getElementLogicalBox(node);
    if (!boundsOverlap(frameBounds, shapeBounds) || !boundsContainShape(frameBounds, shapeBounds)) {
      setShapeFrameId(node, null);
    }
  });
  getEligibleFrameChildCandidates(frame).forEach((node) => {
    const shapeBounds = getElementLogicalBox(node);
    if (boundsContainShape(frameBounds, shapeBounds)) setShapeFrameId(node, frameId);
  });
  reorderFrameBehindChildren(frame);
}

function updateShapeFrameMembershipAfterMove(node) {
  if (!node) return;
  const shapeBounds = getElementLogicalBox(node);
  const currentFrameId = getShapeFrameId(node);
  if (currentFrameId) {
    const frame = getFrameShapeById(currentFrameId);
    if (frame) {
      const frameBounds = getElementLogicalBox(frame);
      if (!boundsOverlap(frameBounds, shapeBounds) || !boundsContainShape(frameBounds, shapeBounds)) {
        setShapeFrameId(node, null);
      } else {
        const nested = findContainingFrameForShape(node);
        if (nested && nested.dataset.shapeId !== currentFrameId) {
          setShapeFrameId(node, nested.dataset.shapeId);
          reorderFrameBehindChildren(nested);
        } else {
          reorderFrameBehindChildren(frame);
        }
        return;
      }
    } else {
      setShapeFrameId(node, null);
    }
  }
  const frame = findContainingFrameForShape(node);
  if (frame) {
    setShapeFrameId(node, frame.dataset.shapeId);
    reorderFrameBehindChildren(frame);
  }
}

function getDefaultFrameName() {
  return FRAME_DEFAULT_NAME;
}

function syncFrameNameLabel(frame) {
  const label = frame?.querySelector?.(".frame-name");
  if (!label || label.querySelector("input")) return;
  label.textContent = String(frame.dataset.frameName || "").trim() || getDefaultFrameName();
}

function beginFrameNameEdit(frame) {
  if (!frame || !canEditCurrentDocument()) return;
  const label = frame.querySelector(".frame-name");
  if (!label || label.querySelector("input")) return;
  const current = String(frame.dataset.frameName || "").trim() || getDefaultFrameName();
  const input = document.createElement("input");
  input.type = "text";
  input.className = "frame-name-input";
  input.value = current;
  label.textContent = "";
  label.appendChild(input);
  input.focus();
  input.select();
  const finish = (save) => {
    if (save) frame.dataset.frameName = String(input.value || "").trim() || getDefaultFrameName();
    label.textContent = "";
    syncFrameNameLabel(frame);
    saveLayout();
  };
  input.addEventListener("blur", () => finish(true));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); input.blur(); }
    if (e.key === "Escape") {
      e.preventDefault();
      frame.dataset.frameName = current;
      input.blur();
    }
  });
}

function closeObjectsToolbarSubmenus() {
  if (!objectsToolbar) return;
  objectsToolbar.querySelectorAll(".context-menu-group.open").forEach((node) => node.classList.remove("open"));
}

function setFrameToolActive(active) {
  if (active && window.DrawTools?.deactivateAll) window.DrawTools.deactivateAll();
  if (active) setShapePlaceToolActive(null);
  frameToolActive = !!active;
  if (desktop) desktop.classList.toggle("frame-tool-active", frameToolActive);
  if (!frameToolActive) {
    frameDrawSelection = null;
    hideFrameDrawPreview();
  }
  syncObjectsToolbarToolState();
}

function isShapePlaceToolActive() {
  return !!shapePlaceTool;
}

function setShapePlaceToolActive(tool) {
  const next = tool && typeof tool === "object"
    ? (tool.kind === "line"
      ? { kind: "line" }
      : tool.kind === "text"
        ? { kind: "text" }
        : { kind: "rect", variant: normalizeShapeVariant(tool.variant || tool.shapeVariant || "rectangle") })
    : null;
  if (next) {
    if (window.DrawTools?.deactivateAll) window.DrawTools.deactivateAll();
    if (frameToolActive) {
      frameToolActive = false;
      if (desktop) desktop.classList.remove("frame-tool-active");
      frameDrawSelection = null;
      hideFrameDrawPreview();
    }
  }
  shapePlaceTool = next;
  if (desktop) {
    desktop.classList.toggle("shape-place-tool-active", !!shapePlaceTool && shapePlaceTool.kind !== "text");
    desktop.classList.toggle("text-tool-active", shapePlaceTool?.kind === "text");
  }
  if (!shapePlaceTool) {
    shapePlaceDraw = null;
    hideShapePlacePreview();
  }
  syncObjectsToolbarToolState();
}

function beginShapePlaceTool(tool) {
  if (!canEditCurrentDocument()) return;
  setShapePlaceToolActive(tool);
  hideContextMenu();
  closeObjectsToolbarSubmenus();
  closeAllMenus();
}

function fitTextToolShape(node) {
  if (!node || node.dataset.textTool !== "1") return;
  const text = node.querySelector(".shape-text");
  if (!text) return;
  const fontSize = Math.max(12, parseInt(text.style.fontSize || text.dataset.baseFontSize || "20", 10) || 20);
  const minW = Math.max(16, Math.round(fontSize * 0.7));
  const minH = Math.max(24, Math.round(fontSize * 1.35));
  const style = window.getComputedStyle(text);
  const measure = document.createElement("div");
  measure.setAttribute("aria-hidden", "true");
  measure.style.cssText = [
    "position:absolute",
    "left:-99999px",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    "white-space:pre-wrap",
    "word-break:break-word",
    `font-family:${style.fontFamily || "Arial, sans-serif"}`,
    `font-size:${fontSize}px`,
    `font-weight:${style.fontWeight || "400"}`,
    `font-style:${style.fontStyle || "normal"}`,
    `line-height:${style.lineHeight || "normal"}`,
    `letter-spacing:${style.letterSpacing || "normal"}`,
    `padding:${style.paddingTop || "0"} ${style.paddingRight || "0"} ${style.paddingBottom || "0"} ${style.paddingLeft || "0"}`,
    "max-width:960px"
  ].join(";");
  const raw = String(text.innerText || text.dataset.rawText || "");
  measure.textContent = raw.length ? raw : " ";
  document.body.appendChild(measure);
  const width = Math.ceil(measure.offsetWidth) + 4;
  const height = Math.ceil(measure.offsetHeight) + 4;
  measure.remove();
  node.style.width = `${Math.max(minW, width)}px`;
  node.style.height = `${Math.max(minH, height)}px`;
  syncShapeVisualStyle(node);
  syncAllLiftedControlsPositions();
}

function finalizeTextToolShape(node, { discard = false } = {}) {
  if (!node || node.dataset.textTool !== "1") return false;
  const text = node.querySelector(".shape-text");
  const content = String(text?.dataset?.rawText || text?.innerText || "").trim();
  node.classList.remove("is-text-placing");
  setShapePlaceToolActive(null);
  if (discard || !content) {
    const shapeId = node.dataset.shapeId;
    restoreLiftedShapeControls(shapeId);
    if (selectedShape === node) clearSelectedShape();
    multiSelectedShapeIds.delete(shapeId);
    node.remove();
    updateDesktopExtent();
    renderConnectors();
    syncSelectionControlsOverlay();
    saveLayout();
    return true;
  }
  fitTextToolShape(node);
  selectShape(node);
  return false;
}

function clearTextToolPlacingFlag(textEl) {
  if (textEl) delete textEl.dataset.textToolPlacing;
}

function retainTextToolEditorFocus(node) {
  if (!node?.isConnected) return;
  const text = node.querySelector(".shape-text");
  if (!text || text.contentEditable !== "true") return;
  clearTextToolPlacingFlag(text);
  text.focus();
  placeCaretAtEnd(text);
}

function placeTextShapeAtEvent(event) {
  if (!canEditCurrentDocument() || isWorkspaceReadOnly()) return false;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const editing = document.querySelector('.shape-text[contenteditable="true"]');
  if (editing) finishInlineShapeEditing(editing);
  const pt = getDesktopPoint(event.clientX, event.clientY);
  clearSelection();
  const node = createShapeRectangle({
    shapeVariant: "rectangle",
    left: formatPositionPx(pt.x),
    top: formatPositionPx(pt.y),
    width: "20px",
    height: "28px",
    fillEnabled: false,
    gradientEnabled: false,
    borderEnabled: false,
    borderWidth: 0,
    border: "#000000",
    fill: "#ffffff",
    fill2: "#ffffff",
    shadow: 0,
    text: "",
    fontSize: 20,
    textColor: "#000000",
    hAlign: "left",
    vAlign: "top",
    textTool: true
  }, true);
  if (!node) return false;
  node.dataset.textTool = "1";
  node.classList.add("shape-text-tool", "is-text-placing");
  startInlineShapeEditing(node, "", { select: false });
  fitTextToolShape(node);
  const text = node.querySelector(".shape-text");
  if (text) {
    // Keep the empty editor alive until the placing click gesture ends.
    // Focusing during pointerdown on the desktop would otherwise blur immediately
    // and finalizeTextToolShape would discard the empty rectangle.
    text.dataset.textToolPlacing = "1";
    const releasePlacing = () => {
      window.removeEventListener("pointerup", releasePlacing, true);
      window.removeEventListener("pointercancel", releasePlacing, true);
      requestAnimationFrame(() => retainTextToolEditorFocus(node));
    };
    window.addEventListener("pointerup", releasePlacing, true);
    window.addEventListener("pointercancel", releasePlacing, true);
    window.setTimeout(() => {
      if (text.dataset.textToolPlacing === "1") retainTextToolEditorFocus(node);
    }, 120);
  }
  return true;
}

function ensureShapePlacePreviewEl() {
  let el = desktop.querySelector(".shape-place-preview");
  if (el) return el;
  el = document.createElement("div");
  el.className = "shape-place-preview hidden";
  appendToDesktop(el);
  return el;
}

function hideShapePlacePreview() {
  const el = desktop?.querySelector(".shape-place-preview");
  if (!el) return;
  el.classList.add("hidden");
  el.style.transform = "";
  el.style.borderRadius = "";
  el.style.background = "";
  el.style.border = "";
  el.innerHTML = "";
  el.classList.remove("shape-place-preview--line", "shape-place-preview--rect", "shape-place-preview--svg");
}

function getShapePlacePreviewPoints(variant, widthPx) {
  const spec = SHAPE_VARIANTS[variant];
  if (!spec?.points) return "";
  if (variant === "chevron") {
    const depth = clamp((DEFAULT_CHEVRON_INSET_PX / Math.max(1, widthPx)) * 100, 0, 49);
    return `0,0 ${100 - depth},0 100,50 ${100 - depth},100 0,100 ${depth},50`;
  }
  if (variant === "parallelogram") {
    const depth = DEFAULT_PARALLELOGRAM_SKEW;
    return `${depth},0 100,0 ${100 - depth},100 0,100`;
  }
  if (variant === "hexagon") {
    const depth = DEFAULT_HEXAGON_CHAMFER;
    return `${depth},0 ${100 - depth},0 100,50 ${100 - depth},100 ${depth},100 0,50`;
  }
  return spec.points;
}

function renderShapePlacePreviewVisual(el, variant, width, height) {
  const spec = SHAPE_VARIANTS[variant] || SHAPE_VARIANTS.rectangle;
  el.innerHTML = "";
  el.style.background = "";
  el.style.border = "";
  el.style.borderRadius = "";
  if (!spec || spec.kind !== "svg") {
    el.classList.add("shape-place-preview--rect");
    el.classList.remove("shape-place-preview--svg");
    if (variant === "circle") el.style.borderRadius = "50%";
    else if (variant === "rounded") el.style.borderRadius = `${SHAPE_VARIANTS.rounded?.radius || 28}px`;
    else el.style.borderRadius = "0";
    return;
  }
  el.classList.add("shape-place-preview--svg");
  el.classList.remove("shape-place-preview--rect");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  const strokeWidth = Math.max(0.6, Math.min(2.4, 100 / Math.max(8, Math.min(width || 100, height || 100))));
  if (spec.points) {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const points = parseShapePoints(getShapePlacePreviewPoints(variant, width));
    shape.setAttribute("d", buildRoundedPolygonPath(points, 0));
    shape.setAttribute("fill", "#ffffff");
    shape.setAttribute("stroke", "#000000");
    shape.setAttribute("stroke-width", String(strokeWidth));
    shape.setAttribute("vector-effect", "non-scaling-stroke");
    svg.appendChild(shape);
  } else {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", spec.tag || "ellipse");
    Object.entries(spec.attrs || {}).forEach(([key, value]) => shape.setAttribute(key, String(value)));
    shape.setAttribute("fill", "#ffffff");
    shape.setAttribute("stroke", "#000000");
    shape.setAttribute("stroke-width", String(strokeWidth));
    shape.setAttribute("vector-effect", "non-scaling-stroke");
    svg.appendChild(shape);
  }
  el.appendChild(svg);
}

function updateShapePlacePreview() {
  if (!shapePlaceDraw || !shapePlaceTool) return;
  const el = ensureShapePlacePreviewEl();
  el.classList.remove("hidden", "shape-place-preview--line", "shape-place-preview--rect", "shape-place-preview--svg");
  if (shapePlaceTool.kind === "line") {
    el.innerHTML = "";
    const dx = shapePlaceDraw.x2 - shapePlaceDraw.x1;
    const dy = shapePlaceDraw.y2 - shapePlaceDraw.y1;
    const len = Math.max(1, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    el.classList.add("shape-place-preview--line");
    el.style.left = `${shapePlaceDraw.x1}px`;
    el.style.top = `${shapePlaceDraw.y1}px`;
    el.style.width = `${len}px`;
    el.style.height = "1px";
    el.style.borderRadius = "0";
    el.style.background = "";
    el.style.border = "";
    el.style.transform = `rotate(${angle}deg)`;
    return;
  }
  const left = Math.min(shapePlaceDraw.x1, shapePlaceDraw.x2);
  const top = Math.min(shapePlaceDraw.y1, shapePlaceDraw.y2);
  const width = Math.abs(shapePlaceDraw.x2 - shapePlaceDraw.x1);
  const height = Math.abs(shapePlaceDraw.y2 - shapePlaceDraw.y1);
  const variant = normalizeShapeVariant(shapePlaceTool.variant || "rectangle");
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.transform = "";
  renderShapePlacePreviewVisual(el, variant, width, height);
}

function startShapePlaceDraw(event) {
  if (isWorkspaceReadOnly() || !shapePlaceTool) return false;
  if (shapePlaceTool.kind === "text") {
    placeTextShapeAtEvent(event);
    return true;
  }
  const pt = getDesktopPoint(event.clientX, event.clientY);
  shapePlaceDraw = {
    pointerId: event.pointerId,
    x1: pt.x,
    y1: pt.y,
    x2: pt.x,
    y2: pt.y
  };
  updateShapePlacePreview();
  desktop.setPointerCapture(event.pointerId);
  clearSelection();
  return true;
}

function finishShapePlaceDraw() {
  if (!shapePlaceDraw || !shapePlaceTool) return;
  const tool = shapePlaceTool;
  const x1 = shapePlaceDraw.x1;
  const y1 = shapePlaceDraw.y1;
  const x2 = shapePlaceDraw.x2;
  const y2 = shapePlaceDraw.y2;
  const bounds = {
    left: Math.min(x1, x2),
    top: Math.min(y1, y2),
    right: Math.max(x1, x2),
    bottom: Math.max(y1, y2)
  };
  shapePlaceDraw = null;
  hideShapePlacePreview();
  setShapePlaceToolActive(null);

  if (tool.kind === "line") {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const lineOpts = {
      ...SHAPE_PLACE_DEFAULT_STYLE,
      left: formatPositionPx(x1),
      top: formatPositionPx(y1),
      minLength: dist < SHAPE_PLACE_MIN_SIZE ? 180 : SHAPE_PLACE_MIN_SIZE
    };
    if (dist >= SHAPE_PLACE_MIN_SIZE) {
      lineOpts.x2 = x2;
      lineOpts.y2 = y2;
    } else {
      lineOpts.x2 = x1 + 180;
      lineOpts.y2 = y1;
    }
    const node = createShapeLine(lineOpts);
    if (node) selectShape(node);
    return;
  }

  const variant = normalizeShapeVariant(tool.variant || "rectangle");
  const variantSpec = SHAPE_VARIANTS[variant] || SHAPE_VARIANTS.rectangle;
  const defaultWidth = Number.parseFloat(variantSpec.width) || 220;
  const defaultHeight = Number.parseFloat(variantSpec.height) || 120;
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const rectOpts = {
    ...SHAPE_PLACE_DEFAULT_STYLE,
    shapeVariant: variant
  };
  if (width < SHAPE_PLACE_MIN_SIZE && height < SHAPE_PLACE_MIN_SIZE) {
    rectOpts.left = formatPositionPx(bounds.left - defaultWidth / 2);
    rectOpts.top = formatPositionPx(bounds.top - defaultHeight / 2);
    rectOpts.width = `${defaultWidth}px`;
    rectOpts.height = `${defaultHeight}px`;
  } else {
    rectOpts.left = formatPositionPx(bounds.left);
    rectOpts.top = formatPositionPx(bounds.top);
    rectOpts.width = `${Math.max(SHAPE_PLACE_MIN_SIZE, width)}px`;
    rectOpts.height = `${Math.max(SHAPE_PLACE_MIN_SIZE, height)}px`;
  }
  const node = createShapeRectangle(rectOpts);
  if (node) selectShape(node);
}

function ensureFrameDrawPreviewEl() {
  let el = desktop.querySelector(".frame-draw-preview");
  if (el) return el;
  el = document.createElement("div");
  el.className = "frame-draw-preview hidden";
  appendToDesktop(el);
  return el;
}

function hideFrameDrawPreview() {
  const el = ensureFrameDrawPreviewEl();
  el.classList.add("hidden");
}

function updateFrameDrawPreview() {
  if (!frameDrawSelection) return;
  const el = ensureFrameDrawPreviewEl();
  const left = Math.min(frameDrawSelection.x1, frameDrawSelection.x2);
  const top = Math.min(frameDrawSelection.y1, frameDrawSelection.y2);
  const width = Math.abs(frameDrawSelection.x2 - frameDrawSelection.x1);
  const height = Math.abs(frameDrawSelection.y2 - frameDrawSelection.y1);
  el.classList.remove("hidden");
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
}

function startFrameDraw(event) {
  if (isWorkspaceReadOnly() || !frameToolActive) return false;
  const pt = getDesktopPoint(event.clientX, event.clientY);
  frameDrawSelection = {
    pointerId: event.pointerId,
    x1: pt.x,
    y1: pt.y,
    x2: pt.x,
    y2: pt.y
  };
  updateFrameDrawPreview();
  desktop.setPointerCapture(event.pointerId);
  clearSelection();
  return true;
}

function finishFrameDraw() {
  if (!frameDrawSelection) return;
  const bounds = {
    left: Math.min(frameDrawSelection.x1, frameDrawSelection.x2),
    top: Math.min(frameDrawSelection.y1, frameDrawSelection.y2),
    right: Math.max(frameDrawSelection.x1, frameDrawSelection.x2),
    bottom: Math.max(frameDrawSelection.y1, frameDrawSelection.y2)
  };
  frameDrawSelection = null;
  hideFrameDrawPreview();
  setFrameToolActive(false);
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  if (width < 8 && height < 8) {
    createShapeFrame({
      left: formatPositionPx(bounds.left - 160),
      top: formatPositionPx(bounds.top - 120),
      width: "320px",
      height: "240px"
    });
    return;
  }
  createShapeFrame({
    left: formatPositionPx(bounds.left),
    top: formatPositionPx(bounds.top),
    width: `${Math.max(FRAME_MIN_SIZE, width)}px`,
    height: `${Math.max(FRAME_MIN_SIZE, height)}px`
  });
}

function wrapSelectionInFrame() {
  const shapes = getWrapSelectionTargets();
  if (!shapes.length) return;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  shapes.forEach((node) => {
    const box = getElementLogicalBox(node);
    left = Math.min(left, box.left);
    top = Math.min(top, box.top);
    right = Math.max(right, box.right);
    bottom = Math.max(bottom, box.bottom);
  });
  const frame = createShapeFrame({
    left: formatPositionPx(left - FRAME_WRAP_PADDING),
    top: formatPositionPx(top - FRAME_WRAP_PADDING),
    width: `${Math.max(FRAME_MIN_SIZE, right - left + FRAME_WRAP_PADDING * 2)}px`,
    height: `${Math.max(FRAME_MIN_SIZE, bottom - top + FRAME_WRAP_PADDING * 2)}px`,
    collectChildren: false
  }, false);
  addElementsToFrame(frame, shapes);
  clearMultiSelection();
  selectShape(frame);
  saveLayout();
}

function getWrapSelectionTargets() {
  if (multiSelectedShapeIds.size) {
    return getMultiSelectedShapes().filter((node) => !!node);
  }
  if (selectedShape) return [selectedShape];
  return [];
}

function getGroupBounds(groupId) {
  const members = getGroupMembers(groupId);
  if (!members.length) return null;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  members.forEach((node) => {
    left = Math.min(left, node.offsetLeft);
    top = Math.min(top, node.offsetTop);
    right = Math.max(right, node.offsetLeft + node.offsetWidth);
    bottom = Math.max(bottom, node.offsetTop + node.offsetHeight);
  });
  return {
    left,
    top,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top)
  };
}

function ensureGroupSelectionBox() {
  if (groupSelectionBox && groupSelectionBox.isConnected) return groupSelectionBox;
  const box = document.createElement("div");
  box.className = "group-selection-box hidden";
  ["nw","n","ne","e","se","s","sw","w"].forEach((d) => {
    const h = document.createElement("div");
    h.className = `h ${d}`;
    box.appendChild(h);
  });
  appendToDesktop(box);
  groupSelectionBox = box;
  return box;
}

function updateGroupSelectionBox() {
  const box = ensureGroupSelectionBox();
  if (!selectedGroupId || selectedShape) {
    box.classList.add("hidden");
    return;
  }
  const bounds = getGroupBounds(selectedGroupId);
  if (!bounds || (bounds.width < 4 && bounds.height < 4)) {
    box.classList.add("hidden");
    return;
  }
  box.classList.remove("hidden");
  const pad = getShapeSelectionPadWorld();
  box.style.left = `${bounds.left - pad}px`;
  box.style.top = `${bounds.top - pad}px`;
  box.style.width = `${bounds.width + pad * 2}px`;
  box.style.height = `${bounds.height + pad * 2}px`;
}

function clearMultiSelection() {
  const hadConnectorSelection = multiSelectedConnectorIds.size > 0;
  multiSelectedShapeIds.clear();
  multiSelectedConnectorIds.clear();
  desktop.querySelectorAll(".shape.multi-selected").forEach((node) => node.classList.remove("multi-selected"));
  if (hadConnectorSelection) renderConnectors();
}

function syncMultiSelectionClasses() {
  desktop.querySelectorAll(".shape").forEach((node) => {
    node.classList.toggle("multi-selected", multiSelectedShapeIds.has(node.dataset.shapeId));
  });
  syncSelectionControlsOverlay();
}

function getMultiSelectedShapes() {
  return Array.from(multiSelectedShapeIds).map((id) => getShapeById(id)).filter(Boolean);
}

function expandSelectionToWholeGroup(shapes) {
  const nodes = Array.isArray(shapes) ? shapes.filter(Boolean) : [];
  if (!nodes.length) return nodes;
  const groupIds = new Set(nodes.map(getShapeGroupId).filter(Boolean));
  if (groupIds.size === 1 && nodes.every((node) => getShapeGroupId(node))) {
    return getGroupMembers([...groupIds][0]);
  }
  return nodes;
}

function getActiveShapeSelection() {
  if (selectedShape) {
    const groupId = getShapeGroupId(selectedShape);
    if (groupId) return getGroupMembers(groupId);
    return [selectedShape];
  }
  const multi = getMultiSelectedShapes();
  if (multi.length) return expandSelectionToWholeGroup(multi);
  if (selectedGroupId && !selectedShape) return getGroupMembers(selectedGroupId);
  return [];
}

function collectConnectorsForShapeClipboard(shapes) {
  const explicit = getSelectedConnectorsForClipboard();
  if (explicit.length) return explicit.map((conn) => cloneStyleData(conn)).filter(Boolean);
  if (!shapes.length) return [];
  const shapeIds = new Set();
  const groupConnIds = new Set();
  shapes.forEach((node) => {
    if (!node?.dataset) return;
    shapeIds.add(node.dataset.connId || node.dataset.shapeId);
    const groupId = getShapeGroupId(node);
    if (groupId) groupConnIds.add(getGroupConnId(groupId));
  });
  return connectors.filter((conn) => {
    const fromId = conn.from?.nodeId || conn.from?.shapeId || "";
    const toId = conn.to?.nodeId || conn.to?.shapeId || "";
    const fromIn = shapeIds.has(fromId) || groupConnIds.has(fromId);
    const toIn = shapeIds.has(toId) || groupConnIds.has(toId);
    return fromIn && toIn;
  }).map((conn) => cloneStyleData(conn)).filter(Boolean);
}

function buildClipboardPasteRemaps(payload) {
  const groupMap = new Map();
  const processMap = new Map();
  const frameMap = new Map();
  const shapes = payload?.shapes || [];
  shapes.forEach((item) => {
    const oldGroupId = String(item?.groupId || "").trim();
    if (oldGroupId && !groupMap.has(oldGroupId)) groupMap.set(oldGroupId, `g${groupCounter++}`);
    const oldProcessId = String(item?.bpProcessId || "").trim();
    if (oldProcessId && !processMap.has(oldProcessId)) processMap.set(oldProcessId, `bp${bpProcessCounter++}`);
    if (item?.type === "shape-frame" && item?.id) frameMap.set(String(item.id), "");
  });
  const ungroupedCount = shapes.filter((item) => !String(item?.groupId || "").trim()).length;
  if (!groupMap.size && shapes.length >= 2 && ungroupedCount === shapes.length) {
    const syntheticId = "__paste_set__";
    groupMap.set(syntheticId, `g${groupCounter++}`);
    shapes.forEach((item) => {
      if (!String(item?.groupId || "").trim()) item.groupId = syntheticId;
    });
  }
  return { groupMap, processMap, frameMap };
}

function finalizePastedFrameMembership(createdEntries, remaps) {
  if (!remaps?.frameMap?.size || !createdEntries?.length) return;
  createdEntries.forEach(({ source, node }) => {
    if (source?.type === "shape-frame" && source?.id) {
      remaps.frameMap.set(String(source.id), node.dataset.shapeId || "");
    }
  });
  createdEntries.forEach(({ source, node }) => {
    const oldFrameId = String(source?.frameId || "").trim();
    if (!oldFrameId || !remaps.frameMap.has(oldFrameId)) return;
    const nextFrameId = remaps.frameMap.get(oldFrameId);
    if (nextFrameId) setShapeFrameId(node, nextFrameId);
  });
  remaps.frameMap.forEach((frameId) => {
    const frame = getFrameShapeById(frameId);
    if (frame) reorderFrameBehindChildren(frame);
  });
}

function finalizePastedShapeGroups(createdEntries, remaps) {
  if (!remaps?.groupMap?.size || !createdEntries?.length) return;
  remaps.groupMap.forEach((newGroupId, oldGroupId) => {
    createdEntries.forEach(({ source, node }) => {
      if (!node) return;
      if (String(source?.groupId || "").trim() !== oldGroupId) return;
      node.dataset.groupId = newGroupId;
    });
  });
}

function finalizePastedBpProcessCopies(processMap) {
  if (!processMap || !processMap.size) return;
  processMap.forEach((processId) => {
    relayoutBpStagesAfter(processId, 1);
    layoutBpProcessBase(processId);
    layoutAllBpTasksInProcess(processId);
    layoutAllBpAutomationsInProcess(processId);
  });
  updateDesktopExtent();
  renderConnectors();
}

function isSyntheticPasteOnlyGroup(remaps) {
  return !!(remaps?.groupMap?.size === 1 && remaps.groupMap.has("__paste_set__"));
}

function stripSyntheticPasteGroupIds(createdEntries, remaps) {
  if (!isSyntheticPasteOnlyGroup(remaps) || !createdEntries?.length) return;
  createdEntries.forEach(({ node }) => {
    if (node?.dataset) delete node.dataset.groupId;
  });
}

function selectPastedShapes(created, remaps = null) {
  const shapes = Array.isArray(created) ? created.filter((node) => node?.dataset?.shapeId) : [];
  if (!shapes.length) return;
  if (isSyntheticPasteOnlyGroup(remaps)) {
    selectCreatedShapes(shapes);
    return;
  }
  if (remaps?.groupMap?.size === 1) {
    const newGroupId = [...remaps.groupMap.values()][0];
    if (shapes.length >= 2 && shapes.every((node) => getShapeGroupId(node) === newGroupId) && !isBpProcessGroupId(newGroupId)) {
      selectGroup(newGroupId);
      return;
    }
  }
  const groupIds = new Set(shapes.map((node) => getShapeGroupId(node)).filter(Boolean));
  if (groupIds.size === 1) {
    const groupId = [...groupIds][0];
    if (shapes.length >= 2 && shapes.every((node) => getShapeGroupId(node) === groupId) && !isBpProcessGroupId(groupId)) {
      selectGroup(groupId);
      return;
    }
  }
  selectCreatedShapes(shapes);
}

function selectCreatedShapes(nodes) {
  const shapes = Array.isArray(nodes) ? nodes.filter((node) => node && node.dataset && node.dataset.shapeId) : [];
  if (!shapes.length) return false;
  clearSelection();
  if (shapes.length === 1) {
    selectShape(shapes[0]);
    return true;
  }
  shapes.forEach((node) => multiSelectedShapeIds.add(node.dataset.shapeId));
  syncMultiSelectionClasses();
  if (formatToggle.checked) {
    showFormatPanel();
    syncFormatPanel();
  }
  return true;
}

function isNodeInActiveMultiSelection(node) {
  return !!(
    node
    && !selectedShape
    && multiSelectedShapeIds.size > 1
    && multiSelectedShapeIds.has(node.dataset.shapeId)
  );
}

function countDelimitedFields(line, delimiter) {
  let count = 1;
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && ch === delimiter) count += 1;
  }
  return count;
}

function detectCsvDelimiter(text) {
  const lines = String(text || "").replace(/^\ufeff/, "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, 5);
  if (!lines.length) return ",";
  const candidates = [",", ";", "\t"];
  let best = { delimiter: ",", score: -1 };
  candidates.forEach((delimiter) => {
    const score = lines.reduce((sum, line) => sum + countDelimitedFields(line, delimiter), 0);
    if (score > best.score) best = { delimiter, score };
  });
  return best.delimiter;
}

function parseDelimitedText(text, delimiter) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  const source = String(text || "").replace(/^\ufeff/, "");
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"') {
      if (inQuotes && source[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && ch === delimiter) {
      row.push(value);
      value = "";
      continue;
    }
    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && source[i + 1] === "\n") i += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
      continue;
    }
    value += ch;
  }
  row.push(value);
  rows.push(row);
  while (rows.length && rows[rows.length - 1].every((cell) => String(cell).trim() === "")) rows.pop();
  return rows;
}

function createTableFromDelimitedRows(rows, opts = {}) {
  const normalizedRows = Array.isArray(rows) ? rows.filter((row) => Array.isArray(row)) : [];
  if (!normalizedRows.length) throw new Error("CSV file is empty.");
  const cols = Math.max(1, ...normalizedRows.map((row) => row.length));
  const cells = [];
  normalizedRows.forEach((row, r) => {
    for (let c = 0; c < cols; c += 1) {
      cells.push({ r, c, raw: String(row[c] ?? "") });
    }
  });
  return createShapeTable({
    tableTitle: opts.title || "Таблица",
    tableData: {
      rows: normalizedRows.length,
      cols,
      cells
    }
  });
}

async function importCsvAsTable(file) {
  if (!file) return false;
  const rawText = await file.text();
  const delimiter = detectCsvDelimiter(rawText);
  const rows = parseDelimitedText(rawText, delimiter);
  if (!rows.length) {
    showHint("CSV пустой. Выбери файл с данными.", "warning");
    return false;
  }
  const title = String(file.name || "Таблица").replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim() || "Таблица";
  createTableFromDelimitedRows(rows, { title });
  return true;
}

function selectAllShapes() {
  const shapes = Array.from(desktop.querySelectorAll(".shape"));
  if (!shapes.length) return false;
  clearSelection();
  if (shapes.length === 1) {
    selectShape(shapes[0]);
    return true;
  }
  shapes.forEach((node) => {
    if (!node.dataset.shapeId) return;
    multiSelectedShapeIds.add(node.dataset.shapeId);
  });
  syncMultiSelectionClasses();
  if (formatToggle.checked) {
    showFormatPanel();
    syncFormatPanel();
  }
  return true;
}

function toggleMultiSelection(node) {
  if (isWorkspaceReadOnly()) return;
  if (!node || !node.dataset.shapeId) return;
  if (multiSelectedShapeIds.has(node.dataset.shapeId)) multiSelectedShapeIds.delete(node.dataset.shapeId);
  else multiSelectedShapeIds.add(node.dataset.shapeId);
  syncMultiSelectionClasses();
}

function clearPendingGroupMemberSelect() {
  pendingGroupMemberSelect = null;
}

function beginPendingGroupMemberSelect(node, event) {
  pendingGroupMemberSelect = {
    node,
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY
  };
}

function finalizePendingGroupMemberSelect(event) {
  const pending = pendingGroupMemberSelect;
  if (!pending || pending.pointerId !== event.pointerId) return;
  clearPendingGroupMemberSelect();
  if (Math.hypot(event.clientX - pending.x, event.clientY - pending.y) > 4) return;
  if (!pending.node?.isConnected || !canEditCurrentDocument()) return;
  selectShape(pending.node);
}

function selectGroup(groupId) {
  if (isWorkspaceReadOnly()) return;
  clearPendingGroupMemberSelect();
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedWindow();
  clearSelectedConnector();
  clearMultiSelection();
  selectedGroupId = String(groupId || "").trim() || null;
  if (formatToggle.checked) {
    showFormatPanel();
    clampPanelIntoViewport();
    syncFormatPanel();
  } else if (formatPanel) {
    formatPanel.classList.add("hidden");
  }
  updateGroupSelectionBox();
  syncBpProcessControls();
  syncSelectionControlsOverlay();
}

function clearSelectedGroup() {
  selectedGroupId = null;
  clearPendingGroupMemberSelect();
  updateGroupSelectionBox();
  syncBpProcessControls();
  syncSelectionControlsOverlay();
}

function createGroupFromSelection() {
  const shapes = getMultiSelectedShapes().filter((node) => node.dataset.shapeType !== "shape-line");
  if (shapes.length < 2) return false;
  const groupId = `g${groupCounter++}`;
  const memberConnIds = new Set(shapes.map((node) => node.dataset.connId || node.dataset.shapeId));
  const groupConnId = getGroupConnId(groupId);
  shapes.forEach((node) => {
    node.dataset.groupId = groupId;
  });
  connectors.forEach((conn) => {
    const fromId = conn.from?.nodeId || conn.from?.shapeId || "";
    const toId = conn.to?.nodeId || conn.to?.shapeId || "";
    const fromInside = memberConnIds.has(fromId);
    const toInside = memberConnIds.has(toId);
    if (fromInside && !toInside && conn.from) conn.from.nodeId = groupConnId;
    if (toInside && !fromInside && conn.to) conn.to.nodeId = groupConnId;
  });
  clearMultiSelection();
  selectGroup(groupId);
  renderConnectors();
  saveLayout();
  return true;
}

function ungroupSelectedGroup() {
  if (!selectedGroupId) return false;
  const members = getGroupMembers(selectedGroupId);
  if (!members.length) return false;
  const fallbackConnId = members[0].dataset.connId || members[0].dataset.shapeId;
  const groupConnId = getGroupConnId(selectedGroupId);
  connectors.forEach((conn) => {
    if (conn.from?.nodeId === groupConnId) conn.from.nodeId = fallbackConnId;
    if (conn.to?.nodeId === groupConnId) conn.to.nodeId = fallbackConnId;
  });
  members.forEach((node) => { delete node.dataset.groupId; });
  clearSelectedGroup();
  renderConnectors();
  saveLayout();
  return true;
}

function getContextTargetShape(target) {
  return target && target.closest ? target.closest(".shape") : null;
}

function ensureContextMenu() {
  if (contextMenuEl && contextMenuEl.isConnected) return contextMenuEl;
  const menu = document.createElement("div");
  menu.className = "context-menu hidden";
  document.body.appendChild(menu);
  contextMenuEl = menu;
  return menu;
}

function clearContextMenuCloseTimer() {
  if (!contextMenuCloseTimer) return;
  clearTimeout(contextMenuCloseTimer);
  contextMenuCloseTimer = null;
}

function openContextSubmenu(group) {
  if (!group) return;
  clearContextMenuCloseTimer();
  const parentMenu = group.parentElement;
  if (parentMenu) {
    parentMenu.querySelectorAll(".context-menu-group.open").forEach((node) => {
      if (node !== group) node.classList.remove("open");
    });
  }
  group.classList.add("open");
}

function scheduleContextSubmenuClose(group, delay = 180) {
  clearContextMenuCloseTimer();
  contextMenuCloseTimer = setTimeout(() => {
    if (group && group.isConnected) group.classList.remove("open");
    contextMenuCloseTimer = null;
  }, Math.max(0, Number(delay) || 0));
}

function resolveInsertSpawnPoint(spawnPoint) {
  const resolved = typeof spawnPoint === "function" ? spawnPoint() : spawnPoint;
  if (resolved && Number.isFinite(Number(resolved.x)) && Number.isFinite(Number(resolved.y))) {
    return { x: Number(resolved.x), y: Number(resolved.y) };
  }
  return lastDesktopPointer || getViewportCenterDesktopPoint();
}

function getContextShapeMenuItems(_spawnPoint) {
  return SHAPE_MENU_ITEMS.map((item) => ({
    label: item.label,
    icon: item.icon,
    iconOnly: true,
    shapeVariant: item.variant,
    action: () => beginShapePlaceTool({ kind: "rect", variant: item.variant })
  }));
}

function getContextBitrixMenuItems(spawnPoint) {
  return BITRIX_MENU_ITEMS.map((item) => ({
    label: item.label,
    icon: item.icon,
    action: () => createShapeAtContextPoint(item.variant, resolveInsertSpawnPoint(spawnPoint))
  }));
}

function getDesktopInsertMenuItems(spawnPoint) {
  const point = () => resolveInsertSpawnPoint(spawnPoint);
  return [
    {
      label: "Фигуры",
      icon: "figures.svg",
      placeTool: "shapes",
      children: getContextShapeMenuItems(point),
      submenuClass: "context-shape-palette"
    },
    { label: "Линия", icon: "line.svg", placeTool: "line", action: () => beginShapePlaceTool({ kind: "line" }) },
    { label: "Текст", icon: "text.svg", placeTool: "text", action: () => {
      if (shapePlaceTool?.kind === "text") setShapePlaceToolActive(null);
      else beginShapePlaceTool({ kind: "text" });
    } },
    { label: "Заметка", icon: "note.svg", action: () => attachOrExpandNoteForSelection() },
    {
      label: "Картинка",
      icon: "image.svg",
      disabled: !imageImportInput,
      action: () => promptImageImportAtPoint(point())
    },
    { label: "Таблица", icon: "table.svg", action: () => createShapeAtContextPoint("table", point()) },
    { label: "Фрейм", icon: "frame.svg", tool: "frame", action: () => createShapeAtContextPoint("frame", point()) },
    { label: "Рисование", icon: "draw.svg", tool: "draw", action: () => window.DrawTools?.activateDrawToolFromMenu?.() },
    { label: "Лазерная указка", icon: "laser-pointer.svg", tool: "laser", action: () => window.DrawTools?.activateLaserToolFromMenu?.() },
    {
      label: "Bitrix24",
      icon: "bitrix24.svg",
      children: getContextBitrixMenuItems(point),
      submenuClass: "context-bitrix-submenu"
    },
    { label: "Последовательный бизнес-процесс", icon: "sequential-business-process.svg", action: () => createShapeAtContextPoint("bp-process", point()) },
    {
      label: "Импорт CSV",
      icon: "import-csv.svg",
      disabled: !csvImportInput,
      action: () => {
        if (!csvImportInput) {
          showHint("Импорт CSV недоступен: не найден input для файла.", "error");
          return;
        }
        csvImportInput.value = "";
        csvImportInput.click();
      }
    }
  ];
}

function createWhiteboardIcon(file) {
  const wrap = document.createElement("span");
  wrap.className = "context-toolbar-icon";
  const img = document.createElement("img");
  img.src = `${WB_ICON_BASE}${file}`;
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  if (file === "bitrix24.svg") img.classList.add("context-toolbar-icon-bitrix");
  wrap.appendChild(img);
  return wrap;
}

function createToolbarLabel(text, hasSubmenu = false) {
  const label = document.createElement("span");
  label.className = "context-toolbar-label";
  if (text.length > 10 || /\s/.test(text)) label.classList.add("context-toolbar-label--wrap");
  label.appendChild(document.createTextNode(text));
  if (hasSubmenu) {
    const caret = document.createElement("span");
    caret.className = "context-toolbar-caret";
    caret.setAttribute("aria-hidden", "true");
    caret.textContent = "▾";
    label.appendChild(caret);
  }
  return label;
}

function createContextSubmenuButton(child, options = {}) {
  const { toolbar = false } = options;
  const childBtn = document.createElement("button");
  childBtn.type = "button";
  childBtn.disabled = !!child.disabled;
  if (child.shapeVariant) childBtn.dataset.shapeVariant = child.shapeVariant;
  if (toolbar && child.icon && !child.iconOnly) {
    childBtn.className = "context-submenu-item";
    childBtn.appendChild(createWhiteboardIcon(child.icon));
    const childLabel = document.createElement("span");
    childLabel.className = "context-submenu-label";
    childLabel.textContent = child.label;
    childBtn.appendChild(childLabel);
  } else if (child.icon) {
    childBtn.classList.add("context-shape-btn");
    const img = document.createElement("img");
    img.src = `${WB_ICON_BASE}${child.icon}`;
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    childBtn.appendChild(img);
  } else if (child.iconSvg) {
    childBtn.innerHTML = child.iconSvg;
    if (child.iconOnly) childBtn.classList.add("context-shape-btn");
  } else {
    childBtn.textContent = child.label;
  }
  if (toolbar && (child.iconOnly || !(child.icon && !child.iconOnly))) {
    bindObjectsToolbarTooltip(childBtn, child.label);
  } else if (!toolbar && child.label) {
    childBtn.title = child.label;
    childBtn.setAttribute("aria-label", child.label);
  } else if (child.label) {
    childBtn.setAttribute("aria-label", child.label);
  }
  childBtn.addEventListener("click", () => {
    if (!child.disabled && typeof child.action === "function") child.action();
    hideContextMenu();
    hideObjectsToolbarTooltip();
  });
  return childBtn;
}

function attachContextSubmenu(group, submenu, item, options = {}) {
  const { toolbar = false } = options;
  const openSubmenu = () => openContextSubmenu(group);
  const closeSubmenu = () => scheduleContextSubmenuClose(group);
  group.addEventListener("pointerenter", openSubmenu);
  group.addEventListener("pointerleave", closeSubmenu);
  group.addEventListener("focusin", openSubmenu);
  group.addEventListener("focusout", (event) => {
    if (group.contains(event.relatedTarget)) return;
    closeSubmenu();
  });
  item.children.forEach((child) => {
    submenu.appendChild(createContextSubmenuButton(child, { toolbar }));
  });
}

function positionContextMenu(menu, x, y) {
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  requestAnimationFrame(() => {
    const rect = menu.getBoundingClientRect();
    const pad = 8;
    let left = x;
    let top = y;
    if (rect.right > window.innerWidth - pad) left = Math.max(pad, window.innerWidth - rect.width - pad);
    if (rect.bottom > window.innerHeight - pad) top = Math.max(pad, window.innerHeight - rect.height - pad);
    if (left < pad) left = pad;
    if (top < pad) top = pad;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  });
}

function ensureMarqueeSelectionEl() {
  let el = desktop.querySelector(".marquee-selection");
  if (el) return el;
  el = document.createElement("div");
  el.className = "marquee-selection hidden";
  appendToDesktop(el);
  return el;
}

function hideMarqueeSelection() {
  const el = ensureMarqueeSelectionEl();
  el.classList.add("hidden");
}

function updateMarqueeSelectionBox() {
  if (!marqueeSelection) return;
  const el = ensureMarqueeSelectionEl();
  const left = Math.min(marqueeSelection.x1, marqueeSelection.x2);
  const top = Math.min(marqueeSelection.y1, marqueeSelection.y2);
  const width = Math.abs(marqueeSelection.x2 - marqueeSelection.x1);
  const height = Math.abs(marqueeSelection.y2 - marqueeSelection.y1);
  el.classList.remove("hidden");
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
}

function shapeMatchesMarquee(node, bounds, touchMode = false) {
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const right = left + node.offsetWidth;
  const bottom = top + node.offsetHeight;
  if (touchMode) {
    return !(right < bounds.left || left > bounds.right || bottom < bounds.top || top > bounds.bottom);
  }
  return left >= bounds.left && top >= bounds.top && right <= bounds.right && bottom <= bounds.bottom;
}

function pointInBounds(point, bounds) {
  return point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom;
}

function segmentsIntersect(a, b, c, d) {
  const ccw = (p1, p2, p3) => (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

function lineIntersectsBounds(p1, p2, bounds) {
  if (pointInBounds(p1, bounds) || pointInBounds(p2, bounds)) return true;
  const corners = [
    { x: bounds.left, y: bounds.top },
    { x: bounds.right, y: bounds.top },
    { x: bounds.right, y: bounds.bottom },
    { x: bounds.left, y: bounds.bottom }
  ];
  return corners.some((corner, index) => segmentsIntersect(p1, p2, corner, corners[(index + 1) % corners.length]));
}

function connectorMatchesMarquee(conn, bounds, touchMode = false) {
  const state = getConnectorPathState(conn);
  if (!state) return false;
  const segments = getConnectorSegments(state.points);
  if (touchMode) return segments.some(({ a, b }) => lineIntersectsBounds(a, b, bounds));
  return state.points.every((point) => pointInBounds(point, bounds));
}

function selectConnector(connId) {
  if (isWorkspaceReadOnly()) return;
  if (!connId) return;
  if (activeConnectorLabelEditId && activeConnectorLabelEditId !== connId) {
    finishConnectorLabelEditing();
  }
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedGroup();
  clearMultiSelection();
  clearSelectedWindow();
  selectedConnector = connId;
  renderConnectors();
  if (formatToggle.checked) {
    showFormatPanel();
    syncFormatPanel();
  }
}

function finishMarqueeSelection() {
  if (isWorkspaceReadOnly()) {
    if (marqueeSelection) {
      marqueeSelection = null;
      hideMarqueeSelection();
    }
    return;
  }
  if (!marqueeSelection) return;
  const bounds = {
    left: Math.min(marqueeSelection.x1, marqueeSelection.x2),
    top: Math.min(marqueeSelection.y1, marqueeSelection.y2),
    right: Math.max(marqueeSelection.x1, marqueeSelection.x2),
    bottom: Math.max(marqueeSelection.y1, marqueeSelection.y2)
  };
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const touchMode = !!marqueeSelection.touchMode;
  marqueeSelection = null;
  hideMarqueeSelection();
  if (width < 4 && height < 4) return;
  clearSelection();
  const shapes = Array.from(desktop.querySelectorAll(".shape"));
  const matched = shapes.filter((node) => shapeMatchesMarquee(node, bounds, touchMode));
  const matchedConnectors = connectors.filter((conn) => connectorMatchesMarquee(conn, bounds, touchMode));
  if (!matched.length && matchedConnectors.length === 1) {
    selectConnector(matchedConnectors[matchedConnectors.length - 1].id);
    return;
  }
  if (!matched.length && !matchedConnectors.length) return;
  if (matched.length === 1 && !matchedConnectors.length) {
    selectShape(matched[0]);
    return;
  }
  matched.forEach((node) => multiSelectedShapeIds.add(node.dataset.shapeId));
  matchedConnectors.forEach((conn) => multiSelectedConnectorIds.add(conn.id));
  syncMultiSelectionClasses();
  renderConnectors();
  if (formatToggle.checked) {
    showFormatPanel();
    syncFormatPanel();
  }
}

function connectorEndReferenceId(end) {
  if (!end) return "";
  return String(end.nodeId || end.shapeId || "").trim();
}

function connectorTouchesAnyNodeIds(conn, nodeIds) {
  if (!conn || !(nodeIds instanceof Set) || !nodeIds.size) return false;
  return nodeIds.has(connectorEndReferenceId(conn.from)) || nodeIds.has(connectorEndReferenceId(conn.to));
}

function cloneConnectorEndState(end) {
  if (!end) return null;
  return {
    ...end,
    ...(Number.isFinite(Number(end.x)) ? { x: Number(end.x) } : {}),
    ...(Number.isFinite(Number(end.y)) ? { y: Number(end.y) } : {}),
    ...(Number.isFinite(Number(end.rx)) ? { rx: Number(end.rx) } : {}),
    ...(Number.isFinite(Number(end.ry)) ? { ry: Number(end.ry) } : {}),
    ...(end.cell ? { cell: { r: Number(end.cell.r) || 0, c: Number(end.cell.c) || 0 } } : {})
  };
}

function buildDraggedConnectorEntries(movedNodeIds, selectedConnectorIds = new Set()) {
  const connectorIds = new Set();
  connectors.forEach((conn) => {
    if (selectedConnectorIds.has(conn.id) || connectorTouchesAnyNodeIds(conn, movedNodeIds)) connectorIds.add(conn.id);
  });
  return connectors
    .filter((conn) => connectorIds.has(conn.id))
    .map((conn) => ({
      connector: conn,
      from: cloneConnectorEndState(conn.from),
      to: cloneConnectorEndState(conn.to),
      routePoints: normalizeConnectorRoutePoints(conn.routePoints).map(cloneConnectorPoint),
      moveFromFreely: !connectorEndReferenceId(conn.from),
      moveToFreely: !connectorEndReferenceId(conn.to),
      shiftRoutePoints: true
    }));
}

function applyDraggedConnectorEntries(entries, dx, dy) {
  (entries || []).forEach((entry) => {
    const conn = entry?.connector;
    if (!conn) return;
    if (entry.moveFromFreely && entry.from) {
      conn.from = {
        ...entry.from,
        x: (Number(entry.from.x) || 0) + dx,
        y: (Number(entry.from.y) || 0) + dy
      };
    }
    if (entry.moveToFreely && entry.to) {
      conn.to = {
        ...entry.to,
        x: (Number(entry.to.x) || 0) + dx,
        y: (Number(entry.to.y) || 0) + dy
      };
    }
    if (entry.shiftRoutePoints) {
      conn.routePoints = entry.routePoints.map((point) => ({
        x: point.x + dx,
        y: point.y + dy
      }));
    }
  });
}

function isDesktopBackgroundPointerTarget(target) {
  if (!target || !target.closest) return false;
  if (!target.closest("#desktop")) return false;
  if (target.closest(".shape, .sheet-window, .context-menu")) return false;
  return target.id === "desktop"
    || target.id === "desktopSurface"
    || target.id === "desktopOrigin"
    || target.classList.contains("desktop-surface")
    || target.classList.contains("desktop-origin");
}

function canStartMarqueeSelectionFromTarget(target, touchMode = false) {
  if (!target || isActiveFormulaEditing()) return false;
  if (target.closest(".shape-table-grid td")) return false;
  if (target.closest(".sheet-window")) return false;
  if (target.closest(".conn-line, .conn-hit-line")) return false;
  if (target.closest(".resize-handle, .shape-resize-handle, .shape-line-handle, .shape-param-handle, .conn-point, .conn-arrow")) return false;
  if (target.closest("input, textarea, select, button")) return false;
  if (target.isContentEditable || target.closest('[contenteditable="true"]')) return false;
  if (target.closest(".shape")) return !!touchMode;
  return !!target.closest("#desktop");
}

function startMarqueeSelection(event, touchMode = false) {
  if (window.DrawTools?.isDrawToolEngaged?.()) return;
  if (isWorkspaceReadOnly()) return;
  const pt = getDesktopPoint(event.clientX, event.clientY);
  marqueeSelection = {
    pointerId: event.pointerId,
    x1: pt.x,
    y1: pt.y,
    x2: pt.x,
    y2: pt.y,
    touchMode: !!touchMode
  };
  updateMarqueeSelectionBox();
  desktop.setPointerCapture(event.pointerId);
  clearSelection();
}

function hideContextMenu() {
  clearContextMenuCloseTimer();
  if (contextMenuEl) contextMenuEl.classList.add("hidden");
}

let objectsToolbarTooltipEl = null;
let objectsToolbarTooltipTimer = null;
let objectsToolbarTooltipHideTimer = null;

function ensureObjectsToolbarTooltip() {
  if (objectsToolbarTooltipEl) return objectsToolbarTooltipEl;
  objectsToolbarTooltipEl = document.createElement("div");
  objectsToolbarTooltipEl.className = "objects-toolbar-tooltip hidden";
  objectsToolbarTooltipEl.setAttribute("role", "tooltip");
  document.body.appendChild(objectsToolbarTooltipEl);
  return objectsToolbarTooltipEl;
}

function hideObjectsToolbarTooltip() {
  if (objectsToolbarTooltipTimer) {
    clearTimeout(objectsToolbarTooltipTimer);
    objectsToolbarTooltipTimer = null;
  }
  if (objectsToolbarTooltipHideTimer) {
    clearTimeout(objectsToolbarTooltipHideTimer);
    objectsToolbarTooltipHideTimer = null;
  }
  if (objectsToolbarTooltipEl) objectsToolbarTooltipEl.classList.add("hidden");
}

function showObjectsToolbarTooltip(target, text) {
  if (!target || !text) return;
  hideObjectsToolbarTooltip();
  objectsToolbarTooltipTimer = setTimeout(() => {
    objectsToolbarTooltipTimer = null;
    if (!target.isConnected) return;
    const tip = ensureObjectsToolbarTooltip();
    tip.textContent = text;
    tip.classList.remove("hidden");
    const rect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const left = Math.max(8, Math.min(window.innerWidth - tipRect.width - 8, rect.left + (rect.width - tipRect.width) / 2));
    const top = Math.min(window.innerHeight - tipRect.height - 8, rect.bottom + 8);
    tip.style.left = `${Math.round(left)}px`;
    tip.style.top = `${Math.round(top)}px`;
  }, 120);
}

function bindObjectsToolbarTooltip(el, text) {
  if (!el || !text) return;
  const label = String(text).trim();
  if (!label) return;
  el.setAttribute("data-tooltip", label);
  el.setAttribute("aria-label", label);
  el.removeAttribute("title");
}

function syncObjectsToolbarToolState() {
  if (!objectsToolbar) return;
  const drawActive = !!window.DrawTools?.isDrawToolActive?.();
  const laserActive = !!window.DrawTools?.isLaserToolActive?.();
  const shapeKind = shapePlaceTool?.kind || null;
  const shapeVariant = shapeKind === "rect" ? (shapePlaceTool.variant || "rectangle") : null;

  objectsToolbar.querySelectorAll(".objects-toolbar-item").forEach((btn) => {
    const tool = btn.dataset.tool || "";
    const placeTool = btn.dataset.placeTool || "";
    let active = false;
    if (tool === "draw") active = drawActive;
    else if (tool === "laser") active = laserActive;
    else if (tool === "frame") active = !!frameToolActive;
    else if (placeTool === "line") active = shapeKind === "line";
    else if (placeTool === "text") active = shapeKind === "text";
    else if (placeTool === "shapes") active = shapeKind === "rect";
    btn.classList.toggle("is-tool-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  objectsToolbar.querySelectorAll(".context-shape-btn[data-shape-variant]").forEach((btn) => {
    const active = !!shapeVariant && btn.dataset.shapeVariant === shapeVariant;
    btn.classList.toggle("is-tool-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function populateObjectsToolbar() {
  if (!objectsToolbar) return;
  hideObjectsToolbarTooltip();
  objectsToolbar.innerHTML = "";
  const items = getDesktopInsertMenuItems(() => lastDesktopPointer || getViewportCenterDesktopPoint());
  items.forEach((item) => {
    if (Array.isArray(item.children) && item.children.length) {
      const group = document.createElement("div");
      group.className = "context-menu-group";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "objects-toolbar-item";
      btn.disabled = !!item.disabled;
      if (item.tool) btn.dataset.tool = item.tool;
      if (item.placeTool) btn.dataset.placeTool = item.placeTool;
      bindObjectsToolbarTooltip(btn, item.label);
      if (item.icon) btn.appendChild(createWhiteboardIcon(item.icon));
      group.appendChild(btn);
      const submenu = document.createElement("div");
      submenu.className = "context-submenu";
      if (item.submenuClass) submenu.classList.add(item.submenuClass);
      else if (item.children.every((child) => child.iconOnly)) submenu.classList.add("context-shape-palette");
      attachContextSubmenu(group, submenu, item, { toolbar: true });
      group.appendChild(submenu);
      objectsToolbar.appendChild(group);
      return;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "objects-toolbar-item";
    btn.disabled = !!item.disabled;
    if (item.tool) btn.dataset.tool = item.tool;
    if (item.placeTool) btn.dataset.placeTool = item.placeTool;
    bindObjectsToolbarTooltip(btn, item.label);
    if (item.icon) btn.appendChild(createWhiteboardIcon(item.icon));
    btn.addEventListener("click", () => {
      if (!item.disabled && typeof item.action === "function") item.action();
      syncObjectsToolbarToolState();
    });
    objectsToolbar.appendChild(btn);
  });
  if (!objectsToolbar.dataset.tooltipBound) {
    objectsToolbar.dataset.tooltipBound = "1";
    objectsToolbar.addEventListener("pointerover", (event) => {
      const target = event.target.closest("[data-tooltip]");
      if (!target || !objectsToolbar.contains(target)) return;
      if (event.relatedTarget && target.contains(event.relatedTarget)) return;
      showObjectsToolbarTooltip(target, target.getAttribute("data-tooltip"));
    });
    objectsToolbar.addEventListener("pointerout", (event) => {
      const target = event.target.closest("[data-tooltip]");
      if (!target || !objectsToolbar.contains(target)) return;
      if (event.relatedTarget && target.contains(event.relatedTarget)) return;
      hideObjectsToolbarTooltip();
    });
    objectsToolbar.addEventListener("pointerdown", hideObjectsToolbarTooltip);
  }
  window.DrawTools?.syncToolbarState?.();
  syncObjectsToolbarToolState();
}

function syncObjectsToolbarVisibility() {
  if (!objectsToolbar) return;
  const show = !!(objectsToggle && objectsToggle.checked && canEditCurrentDocument() && !guestPublicView);
  objectsToolbar.classList.toggle("hidden", !show);
  if (show) {
    objectsToolbar.removeAttribute("hidden");
    if (!objectsToolbar.childElementCount) populateObjectsToolbar();
  } else {
    objectsToolbar.setAttribute("hidden", "");
    objectsToolbar.querySelectorAll(".context-menu-group.open").forEach((node) => node.classList.remove("open"));
  }
}

function setObjectsToolbarPreferred(visible) {
  const next = !!visible;
  if (objectsToggle) objectsToggle.checked = next;
  try {
    localStorage.setItem(OBJECTS_TOOLBAR_KEY, next ? "1" : "0");
  } catch {}
  syncObjectsToolbarVisibility();
}

function syncObjectsToolbarFromStorage() {
  let preferred = false;
  try {
    preferred = localStorage.getItem(OBJECTS_TOOLBAR_KEY) === "1";
  } catch {}
  if (objectsToggle) objectsToggle.checked = preferred;
  syncObjectsToolbarVisibility();
}

function showContextMenu(x, y, items = [], options = {}) {
  const toolbar = options.variant === "toolbar";
  const menu = ensureContextMenu();
  clearContextMenuCloseTimer();
  menu.className = toolbar ? "context-menu context-menu--toolbar" : "context-menu";
  menu.innerHTML = "";
  items.forEach((item) => {
    if (Array.isArray(item.children) && item.children.length) {
      const group = document.createElement("div");
      group.className = "context-menu-group";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = toolbar ? "context-toolbar-item" : "context-menu-parent";
      btn.disabled = !!item.disabled;
      if (toolbar) {
        if (item.icon) btn.appendChild(createWhiteboardIcon(item.icon));
        btn.appendChild(createToolbarLabel(item.label, true));
      } else {
        const label = document.createElement("span");
        label.textContent = item.label;
        const caret = document.createElement("span");
        caret.className = "context-menu-caret";
        caret.textContent = "▸";
        btn.appendChild(label);
        btn.appendChild(caret);
      }
      group.appendChild(btn);
      const submenu = document.createElement("div");
      submenu.className = "context-submenu";
      if (item.submenuClass) submenu.classList.add(item.submenuClass);
      else if (item.children.every((child) => child.iconOnly)) submenu.classList.add("context-shape-palette");
      attachContextSubmenu(group, submenu, item, { toolbar });
      group.appendChild(submenu);
      menu.appendChild(group);
      return;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = toolbar ? "context-toolbar-item" : "";
    btn.disabled = !!item.disabled;
    if (toolbar) {
      if (item.icon) btn.appendChild(createWhiteboardIcon(item.icon));
      btn.appendChild(createToolbarLabel(item.label));
    } else {
      btn.textContent = item.label;
    }
    btn.addEventListener("click", () => {
      if (!item.disabled && typeof item.action === "function") item.action();
      hideContextMenu();
    });
    menu.appendChild(btn);
  });
  menu.classList.remove("hidden");
  positionContextMenu(menu, x, y);
}

function formatContextSpawnPx(value) {
  return formatPositionPx(value);
}

function getImageSpawnPoint(point) {
  if (point && Number.isFinite(point.x) && Number.isFinite(point.y)) {
    return { x: point.x, y: point.y };
  }
  const vr = viewportEl.getBoundingClientRect();
  return getDesktopPoint(vr.left + vr.width / 2, vr.top + vr.height / 2);
}

function fitImageDimensions(naturalW, naturalH, maxW = 560) {
  let w = Math.max(1, Number(naturalW) || 240);
  let h = Math.max(1, Number(naturalH) || 180);
  if (w > maxW) {
    h = Math.round(h * maxW / w);
    w = maxW;
  }
  return { width: Math.max(40, w), height: Math.max(40, h) };
}

function readBlobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("read failed"));
    reader.readAsDataURL(blob);
  });
}

function getImageNaturalSize(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("invalid image"));
    img.src = dataUrl;
  });
}

function getClipboardImageBlob(dataTransfer) {
  if (!dataTransfer || !dataTransfer.items) return null;
  for (const item of dataTransfer.items) {
    if (item.kind === "file" && String(item.type || "").startsWith("image/")) {
      const blob = item.getAsFile();
      if (blob) return blob;
    }
  }
  return null;
}

function promptImageImportAtPoint(point = null) {
  if (!canEditCurrentDocument()) return;
  if (!imageImportInput) {
    showHint("Добавление картинки недоступно: не найден input для файла.", "error");
    return;
  }
  pendingImageSpawnPoint = point;
  imageImportInput.value = "";
  imageImportInput.click();
}

async function insertImageFromBlob(blob, point = null, opts = {}, doSave = true) {
  if (!blob || !canEditCurrentDocument()) return null;
  if (!String(blob.type || "").startsWith("image/")) return null;
  try {
    const dataUrl = await readBlobAsDataUrl(blob);
    return await createShapeImageFromDataUrl(dataUrl, point, opts, doSave);
  } catch (err) {
    console.error("Failed to insert image:", err);
    showHint("Не удалось вставить картинку.", "error");
    return null;
  }
}

async function createShapeImageFromDataUrl(dataUrl, point = null, opts = {}, doSave = true) {
  if (!dataUrl || !canEditCurrentDocument()) return null;
  const spawn = getImageSpawnPoint(point);
  let width = opts.width;
  let height = opts.height;
  if (!width || !height) {
    try {
      const size = await getImageNaturalSize(dataUrl);
      const fitted = fitImageDimensions(size.width, size.height);
      width = `${fitted.width}px`;
      height = `${fitted.height}px`;
    } catch {
      width = "240px";
      height = "180px";
    }
  }
  const w = parseFloat(width) || 240;
  const h = parseFloat(height) || 180;
  const node = createShapeImage({
    ...opts,
    imageSrc: dataUrl,
    left: opts.left || formatContextSpawnPx(spawn.x - w / 2),
    top: opts.top || formatContextSpawnPx(spawn.y - h / 2),
    width,
    height
  }, doSave);
  if (node) selectShape(node);
  return node;
}

function createShapeAtContextPoint(shape, point) {
  if (!canEditCurrentDocument()) return;
  const x = Number(point?.x) || 0;
  const y = Number(point?.y) || 0;
  if (shape === "line") {
    beginShapePlaceTool({ kind: "line" });
    return;
  }
  if (shape === "note") {
    attachOrExpandNoteForSelection();
    return;
  }
  if (shape === "table") {
    createShapeTable({ left: formatContextSpawnPx(x), top: formatContextSpawnPx(y) });
    return;
  }
  if (shape === "chart" && window.BitrixChart) {
    window.BitrixChart.createShapeChart({ left: formatContextSpawnPx(x), top: formatContextSpawnPx(y) });
    return;
  }
  if (shape === "bitrix-card" && window.BitrixChart) {
    window.BitrixChart.createShapeCard({ left: formatContextSpawnPx(x), top: formatContextSpawnPx(y) });
    return;
  }
  if (shape === "bitrix-date-filter" && window.BitrixChart) {
    window.BitrixChart.createShapeDateFilter({ left: formatContextSpawnPx(x), top: formatContextSpawnPx(y) });
    return;
  }
  if (shape === "bp-process") {
    createSequentialBusinessProcess({ left: formatContextSpawnPx(x), top: formatContextSpawnPx(y) });
    return;
  }
  if (shape === "frame") {
    setFrameToolActive(true);
    return;
  }
  if (shape === "image") {
    promptImageImportAtPoint(point);
    return;
  }
  beginShapePlaceTool({ kind: "rect", variant: normalizeShapeVariant(shape || "rectangle") });
}

function startInlineShapeEditing(node, initialText = "", opts = {}) {
  if (!canEditCurrentDocument()) return false;
  if (!node) return false;
  const text = node.querySelector(".shape-text");
  if (!text) return false;
  if (opts.select !== false) selectShape(node);
  text.dataset.editingBackup = text.dataset.rawText || text.innerText || "";
  text.dataset.editingBackupHtml = text.dataset.textHtml || "";
  text.contentEditable = "true";
  if (initialText === "" || initialText === text.dataset.editingBackup) {
    setShapeTextContentForEditing(text);
  } else {
    text.textContent = initialText;
    delete text.dataset.textHtml;
  }
  syncEditorRawText(text);
  setActiveFormulaEditor(text);
  text.focus();
  placeCaretAtEnd(text);
  return true;
}

function finishInlineShapeEditing(text, { revert = false } = {}) {
  if (!text) return;
  clearTextToolPlacingFlag(text);
  resetShapeTextDblSelectSession(text);
  clearShapeTextSelection(text);
  if (revert) {
    const backup = text.dataset.editingBackup || text.dataset.rawText || "";
    text.dataset.rawText = backup;
    const backupHtml = text.dataset.editingBackupHtml || "";
    if (backupHtml) text.dataset.textHtml = backupHtml;
    else delete text.dataset.textHtml;
    if (backupHtml && shapeTextHtmlHasInlineFormatting(backupHtml)) text.innerHTML = backupHtml;
    else text.textContent = backup;
  } else {
    syncShapeTextRichContent(text);
  }
  text.contentEditable = "false";
  text.dataset.editingBackup = "";
  delete text.dataset.editingBackupHtml;
  clearActiveFormulaEditor(text);
  renderShapeText(text);
  const owner = text.closest(".shape");
  if (owner?.dataset?.textTool === "1") {
    const removed = finalizeTextToolShape(owner, { discard: !!revert });
    refreshAllFormulaDisplays();
    if (removed) return;
  } else if (isBpProcessTask(owner)) {
    owner.dataset.bpTaskAutoHeight = "1";
    fitBpTaskHeightToText(owner);
    layoutAllBpTasksInProcess(owner.dataset.bpProcessId);
  } else if (isBpProcessAutomation(owner)) {
    owner.dataset.bpAutomationAutoHeight = "1";
    fitBpAutomationHeightToText(owner);
    layoutAllBpAutomationsInProcess(owner.dataset.bpProcessId);
  }
  refreshAllFormulaDisplays();
  saveLayout();
  syncShapeTextVerticalAlign(text);
  if (document.activeElement === text && typeof text.blur === "function") text.blur();
}

function shouldKeepShapeTextEditingOnFocusChange(textEl) {
  if (!textEl || textEl.contentEditable !== "true") return false;
  if (textEl.dataset.textToolPlacing === "1") return true;
  const active = document.activeElement;
  if (active && (textEl === active || textEl.contains(active))) return true;
  if (formatPanel && !formatPanel.classList.contains("hidden")) {
    if (active && formatPanel.contains(active)) return true;
    if (shapeTextFormatPanelGesture) return true;
  }
  return false;
}

function scheduleFinishInlineShapeEditingOnBlur(textEl) {
  if (!textEl || textEl.contentEditable !== "true") return;
  window.setTimeout(() => {
    if (!textEl || textEl.contentEditable !== "true") return;
    if (shouldKeepShapeTextEditingOnFocusChange(textEl)) return;
    finishInlineShapeEditing(textEl);
  }, 0);
}

function toggleFormatPanelCollapsed() {
  if (!formatPanel) return;
  const next = !formatPanel.classList.contains("is-collapsed");
  if (next) {
    formatPanelExpandedPosition = {
      left: formatPanel.style.left || "",
      top: formatPanel.style.top || ""
    };
  }
  formatPanel.classList.toggle("is-collapsed", next);
  setFormatCollapseIcon(next);
  if (next) {
    placeCollapsedFormatPanel();
  } else if (formatPanelExpandedPosition) {
    if (formatPanelExpandedPosition.left) formatPanel.style.left = formatPanelExpandedPosition.left;
    if (formatPanelExpandedPosition.top) formatPanel.style.top = formatPanelExpandedPosition.top;
  }
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

function createBulkSelectionDrag(node, event) {
  if (!node || !event) return null;
  const groupId = getShapeGroupId(node);
  if (groupId && selectedGroupId === groupId && !selectedShape) {
    const members = getGroupMembers(groupId);
    if (members.length < 2) return null;
    const movedNodeIds = new Set([getGroupConnId(groupId), ...members.map((member) => member.dataset.connId || member.dataset.shapeId).filter(Boolean)]);
    return {
      type: "group",
      x: event.clientX,
      y: event.clientY,
      members: members.map((member) => {
        const box = getElementLogicalBox(member);
        return { node: member, left: box.left, top: box.top };
      }),
      connectors: buildDraggedConnectorEntries(movedNodeIds, multiSelectedConnectorIds)
    };
  }
  if (!selectedShape && multiSelectedShapeIds.size > 1 && multiSelectedShapeIds.has(node.dataset.shapeId)) {
    const members = getMultiSelectedShapes();
    const movedNodeIds = new Set(members.map((member) => member.dataset.connId || member.dataset.shapeId).filter(Boolean));
    return {
      type: "multi",
      x: event.clientX,
      y: event.clientY,
      members: members.map((member) => {
        const box = getElementLogicalBox(member);
        return { node: member, left: box.left, top: box.top };
      }),
      connectors: buildDraggedConnectorEntries(movedNodeIds, multiSelectedConnectorIds)
    };
  }
  return null;
}

function applyBulkSelectionDragMove(drag, event) {
  if (!drag || !event) return;
  const dx = (event.clientX - drag.x) / zoom;
  const dy = (event.clientY - drag.y) / zoom;
  drag.members.forEach((entry) => {
    setNodePosition(entry.node, entry.left + dx, entry.top + dy);
    layoutConnectorPoints(entry.node);
  });
  applyDraggedConnectorEntries(drag.connectors, dx, dy);
  if (drag.type === "group") updateGroupSelectionBox();
  updateDesktopExtent();
  autoScrollViewportDuringDrag(event.clientX, event.clientY);
  syncFormatPanel();
  renderConnectors();
  syncAllLiftedControlsPositions();
}

function finishBulkSelectionDrag(lastDrag) {
  if (!lastDrag) return;
  if (lastDrag.type === "group" || lastDrag.type === "multi") {
    const bpProcessIds = new Set();
    lastDrag.members.forEach((entry) => {
      if (isBpProcessTask(entry.node)) {
        delete entry.node.dataset.bpTaskManualPosition;
        const processId = entry.node.dataset.bpProcessId;
        if (processId) bpProcessIds.add(processId);
      } else if (isBpProcessAutomation(entry.node)) {
        delete entry.node.dataset.bpAutomationManualPosition;
        const processId = entry.node.dataset.bpProcessId;
        if (processId) bpProcessIds.add(processId);
      } else {
        markBpTaskManualPosition(entry.node);
      }
    });
    bpProcessIds.forEach((processId) => {
      layoutAllBpTasksInProcess(processId);
      layoutAllBpAutomationsInProcess(processId);
    });
    const movedNodes = lastDrag.members.map((entry) => entry.node).filter(Boolean);
    movedNodes.filter((node) => isFrameShape(node)).forEach((node) => updateFrameMembership(node));
    movedNodes.forEach((node) => updateShapeFrameMembershipAfterMove(node));
  }
  updateDesktopExtent();
  saveLayout();
}

function runBulkSelectionDragSession(anchorNode, drag, event, captureTarget) {
  if (!drag || !captureTarget || !event) return false;
  let activeDrag = drag;
  const target = captureTarget;
  if (drag.type === "group") bringGroupToFront(getShapeGroupId(anchorNode));
  else if (drag.type === "multi") bringNodesToFront(drag.members.map((entry) => entry.node));
  try { target.setPointerCapture(event.pointerId); } catch {}
  const onMove = (ev) => {
    if (!activeDrag) return;
    applyBulkSelectionDragMove(activeDrag, ev);
  };
  const onStop = (ev) => {
    if (!activeDrag) return;
    const lastDrag = activeDrag;
    activeDrag = null;
    if (ev.pointerId != null) {
      try { target.releasePointerCapture(ev.pointerId); } catch {}
    }
    target.removeEventListener("pointermove", onMove);
    target.removeEventListener("pointerup", onStop);
    target.removeEventListener("pointercancel", onStop);
    finishBulkSelectionDrag(lastDrag);
  };
  target.addEventListener("pointermove", onMove);
  target.addEventListener("pointerup", onStop);
  target.addEventListener("pointercancel", onStop);
  return true;
}

function attachDrag(node, handle, opts = {}) {
  const raiseOnDrag = opts.raiseOnDrag !== false;
  let drag = null;
  handle.addEventListener("pointerdown", (event) => {
    if (!canEditCurrentDocument()) return;
    if (event.button !== 0) return;
    if (event.target.closest(".shape-text[contenteditable='true']") || event.target.isContentEditable) return;
    if (event.target.closest(".table-add-col") || event.target.closest(".table-add-row")) return;
    if (event.target.closest(".table-cell-toolbar")) return;
    if (event.target.closest(".h") || event.target.closest(".shape-line-handle") || event.target.closest(".shape-param-handle") || event.target.closest(".resize-handle")) return;
    if (event.target.closest(".conn-arrow, .conn-point")) return;
    if (event.target.closest(".bp-process-section-toggle")) return;
    if (event.target.closest(".bp-task-title, .bp-task-toggle, .bp-task-field")) return;
    if (event.target.closest(".bp-automation-title, .bp-automation-toggle, .bp-automation-field")) return;
    if (event.target.closest(".bitrix-kpi-value, .bitrix-kpi-label, .bitrix-kpi-actions, .bitrix-kpi-status")) return;
    if (event.target.closest(".bitrix-date-filter-inputs, .bitrix-date-filter-slider, .bitrix-date-filter-actions, .bitrix-date-filter-input")) return;
    if (event.target.closest(".bitrix-chart-icon-btn, .bitrix-chart-actions")) return;
    const bulkDrag = createBulkSelectionDrag(node, event);
    if (bulkDrag) {
      drag = bulkDrag;
      if (raiseOnDrag) {
        if (bulkDrag.type === "group") bringGroupToFront(getShapeGroupId(node));
        else bringNodesToFront(bulkDrag.members.map((entry) => entry.node));
      }
    } else {
      const startBox = getElementLogicalBox(node);
      const bpTaskReassign = isBpProcessTask(node)
        && (node.dataset.bpTaskReassignReady === "1" || selectedShape === node);
      const bpAutomationReassign = isBpProcessAutomation(node)
        && (node.dataset.bpAutomationReassignReady === "1" || selectedShape === node);
      drag = {
        type: "single",
        x: event.clientX,
        y: event.clientY,
        l: startBox.left,
        t: startBox.top,
        bpTaskReassign,
        bpTaskDropTarget: null,
        bpAutomationReassign,
        bpAutomationDropTarget: null
      };
      if (isBpProcessStage(node)) {
        const processId = node.dataset.bpProcessId;
        const stageIndex = Number(node.dataset.bpStageIndex);
        drag.bpStageReorder = true;
        drag.bpStageTasks = getBpTasksForStage(processId, stageIndex).map((task) => {
          const box = getElementLogicalBox(task);
          return { node: task, left: box.left, top: box.top };
        });
        drag.bpStageAutomations = getBpAutomationsForStage(processId, stageIndex).map((auto) => {
          const box = getElementLogicalBox(auto);
          return { node: auto, left: box.left, top: box.top };
        });
      }
      if (isFrameShape(node)) {
        drag.frameChildren = getFrameDescendants(node.dataset.shapeId).map((child) => {
          const box = getElementLogicalBox(child);
          return { node: child, left: box.left, top: box.top };
        });
      }
      if (raiseOnDrag && !bpTaskReassign && !bpAutomationReassign && !isFrameShape(node)) {
        if (drag.bpStageReorder) {
          bringNodesToFront([
            node,
            ...(drag.bpStageTasks || []).map((entry) => entry.node),
            ...(drag.bpStageAutomations || []).map((entry) => entry.node)
          ]);
        } else bringToFront(node);
      }
    }
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = (event.clientX - drag.x) / zoom;
    const dy = (event.clientY - drag.y) / zoom;
    if (drag.type === "group" || drag.type === "multi") {
      applyBulkSelectionDragMove(drag, event);
    } else {
      const nextTop = drag.bpStageReorder ? drag.t : drag.t + dy;
      setNodePosition(node, drag.l + dx, nextTop);
      if (drag.bpStageTasks?.length) {
        drag.bpStageTasks.forEach((entry) => {
          setNodePosition(entry.node, entry.left + dx, drag.bpStageReorder ? entry.top : entry.top + dy);
          layoutConnectorPoints(entry.node);
        });
      }
      if (drag.bpStageAutomations?.length) {
        drag.bpStageAutomations.forEach((entry) => {
          setNodePosition(entry.node, entry.left + dx, drag.bpStageReorder ? entry.top : entry.top + dy);
          layoutConnectorPoints(entry.node);
        });
      }
      if (drag.frameChildren?.length) {
        drag.frameChildren.forEach((entry) => {
          setNodePosition(entry.node, entry.left + dx, entry.top + dy);
          layoutConnectorPoints(entry.node);
        });
      }
      if (drag.bpTaskReassign || drag.bpAutomationReassign) {
        const target = findBpProcessStageAtClientPoint(event.clientX, event.clientY, node.dataset.bpProcessId, {
          ignoreNode: node,
          columnSnap: true
        });
        if (drag.bpTaskReassign) drag.bpTaskDropTarget = target;
        if (drag.bpAutomationReassign) drag.bpAutomationDropTarget = target;
        setBpStageDropHighlight(target);
      } else if (isBpProcessStage(node)) {
        layoutConnectorPoints(node);
      }
    }
    updateDesktopExtent();
    autoScrollViewportDuringDrag(event.clientX, event.clientY);
    scheduleSyncFormatPanel();
    renderConnectors();
    syncAllLiftedControlsPositions();
  });
  const stop = (event) => {
    if (!drag) return;
    const lastDrag = drag;
    const draggedBpProcessId = lastDrag.type === "single" && isBpProcessStage(node) ? node.dataset.bpProcessId : null;
    drag = null;
    if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
    if (lastDrag.type === "group" || lastDrag.type === "multi") {
      finishBulkSelectionDrag(lastDrag);
      return;
    } else if (isBpProcessTask(node)) {
      if (lastDrag.bpTaskReassign) {
        const target = lastDrag.bpTaskDropTarget;
        clearBpStageDropHighlight();
        if (target) {
          reassignBpTaskToStage(node, target);
          armBpTaskReassign(node);
        } else {
          delete node.dataset.bpTaskManualPosition;
          layoutAllBpTasksInProcess(node.dataset.bpProcessId);
          armBpTaskReassign(node);
        }
      } else {
        delete node.dataset.bpTaskManualPosition;
        const processId = node.dataset.bpProcessId;
        if (processId) layoutAllBpTasksInProcess(processId);
      }
    } else if (isBpProcessAutomation(node)) {
      if (lastDrag.bpAutomationReassign) {
        const target = lastDrag.bpAutomationDropTarget;
        clearBpStageDropHighlight();
        if (target) {
          reassignBpAutomationToStage(node, target);
          armBpAutomationReassign(node);
        } else {
          const processId = node.dataset.bpProcessId;
          const stageIndex = Number(node.dataset.bpAutomationStageIndex);
          resequenceBpAutomationsByVisualY(processId, stageIndex);
          delete node.dataset.bpAutomationManualPosition;
          layoutAllBpAutomationsInProcess(processId);
          armBpAutomationReassign(node);
        }
      } else {
        const processId = node.dataset.bpProcessId;
        const stageIndex = Number(node.dataset.bpAutomationStageIndex);
        resequenceBpAutomationsByVisualY(processId, stageIndex);
        delete node.dataset.bpAutomationManualPosition;
        if (processId) layoutAllBpAutomationsInProcess(processId);
      }
    }
    if (draggedBpProcessId) repairBpProcessStageOrder(draggedBpProcessId);
    if (isFrameShape(node)) {
      updateFrameMembership(node);
      updateShapeFrameMembershipAfterMove(node);
    } else {
      updateShapeFrameMembershipAfterMove(node);
    }
    updateDesktopExtent();
    saveLayout();
  };
  handle.addEventListener("pointerup", stop);
  handle.addEventListener("pointercancel", stop);
}

function attachResize(node, handle, minW, minH, opts = {}) {
  const raiseOnResize = opts.raiseOnResize !== false;
  let state = null;
  handle.addEventListener("pointerdown", (event) => {
    if (!canEditCurrentDocument()) return;
    if (event.button !== 0) return;
    if (isBpProcessAutomation(node)) return;
    event.stopPropagation();
    if (node.dataset.shapeType === "shape-table" && node.__tableApi?.createResizeSnapshot) {
      state = node.__tableApi.createResizeSnapshot("se", event);
    } else {
      state = { x: event.clientX, y: event.clientY, w: node.offsetWidth, h: node.offsetHeight };
    }
    if (raiseOnResize) bringToFront(node);
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  handle.addEventListener("pointermove", (event) => {
    if (!state || (event.buttons & 1) !== 1) return;
    if (isBpProcessAutomation(node)) return;
    if (node.dataset.shapeType === "shape-table" && node.__tableApi?.applyHandleResize) {
      const dx = (event.clientX - state.x) / zoom;
      const dy = (event.clientY - state.y) / zoom;
      node.__tableApi.applyHandleResize(state, dx, dy);
    } else {
      node.style.width = `${Math.max(minW, state.w + (event.clientX - state.x) / zoom)}px`;
      node.style.height = `${Math.max(minH, state.h + (event.clientY - state.y) / zoom)}px`;
      syncShapeVisualStyle(node);
      onChevronShapeResized(node);
      if (isBpProcessTask(node)) {
        onBpTaskResized(node);
      } else if (!isBpProcessStage(node)) {
        layoutConnectorPoints(node);
        renderConnectors();
      }
    }
    syncFormatPanel();
    syncAllLiftedControlsPositions();
  });
  const stop = (event) => {
    if (!state) return;
    const rs = state;
    state = null;
    if (event.pointerId != null) handle.releasePointerCapture(event.pointerId);
    if (node.dataset.shapeType === "shape-table") {
      node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || parseFloat(node.style.width || "0") || 0));
      node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || parseFloat(node.style.height || "0") || 0));
    }
    finalizeBpTaskManualResize(node, rs);
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
  if (opts.aboveConnectors) node.dataset.aboveConnectors = "1";

  function updateWindowTitle() {
    const base = (node.dataset.docTitle || "").trim() || (opts.title || `Таблица ${index}`);
    const extra = (node.dataset.customTitle || "").trim();
    title.textContent = extra ? `${base} — ${extra}` : base;
  }

  const sourceUrl = normalizeSheetUrl(url);
  const rawUrl = repairPossiblyBrokenSheetUrl(sourceUrl);
  node.dataset.sourceUrl = sourceUrl;
  node.dataset.embedUrl = rawUrl;
  frame.src = rawUrl;
  node.dataset.docTitle = (opts.docTitle || opts.title || "").trim();
  node.dataset.customTitle = (opts.customTitle || "").trim();
  updateWindowTitle();

  node.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".window-actions")) return;
    if (isWorkspaceReadOnly()) return;
    selectWindow(node);
  });
  const actions = node.querySelector(".window-actions");
  actions.addEventListener("pointerdown", (e) => e.stopPropagation());
  actions.addEventListener("click", (e) => e.stopPropagation());

  node.querySelector(".open").addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(node.dataset.sourceUrl || rawUrl, "_blank", "noopener,noreferrer");
  });
  node.querySelector(".close").addEventListener("click", (e) => {
    e.stopPropagation();
    if (!canEditCurrentDocument()) return;
    const connId = node.dataset.connId || "";
    restoreLiftedShapeControls(getControlOwnerId(node));
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
    frame.src = node.dataset.embedUrl || frame.src;
  });
  frame.addEventListener("mouseenter", () => setViewportScrollLock(true));
  frame.addEventListener("mouseleave", () => setViewportScrollLock(false));

  attachDrag(node, header, { raiseOnDrag: false });
  attachResize(node, resizeHandle, 360, 240, { raiseOnResize: false });
  addShapeHandles(node, false, { minWidth: 360, minHeight: 240 });
  attachConnectorPoints(node);
  header.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    if (!canEditCurrentDocument()) return;
    const current = node.dataset.customTitle || "";
    const next = window.prompt("Дополнительное название окна:", current);
    if (next === null) return;
    node.dataset.customTitle = String(next).trim();
    updateWindowTitle();
    saveLayout();
  });
  appendToDesktop(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  windowCounter += 1;

  resolveDocumentTitle(node.dataset.sourceUrl || rawUrl).then((docTitle) => {
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
  const minW = Number(opts.minWidth) || (node.classList.contains("sheet-window") ? 360 : 40);
  const minH = Number(opts.minHeight) || (node.classList.contains("sheet-window") ? 240 : 20);
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
      if (!canEditCurrentDocument()) return;
      if (isBpProcessAutomation(node)) return;
      const bulkDrag = createBulkSelectionDrag(node, e);
      if (bulkDrag && runBulkSelectionDragSession(node, bulkDrag, e, h)) return;
      if (node.dataset.shapeType === "shape-table" && node.__tableApi?.createResizeSnapshot) {
        rs = node.__tableApi.createResizeSnapshot(h.dataset.dir, e);
      } else {
        rs = { x: e.clientX, y: e.clientY, l: node.offsetLeft, t: node.offsetTop, w: node.offsetWidth, h: node.offsetHeight, dir: h.dataset.dir };
      }
      h.setPointerCapture(e.pointerId);
    });
    h.addEventListener("pointermove", (e) => {
      if (!rs || (e.buttons & 1) !== 1) return;
      if (isBpProcessAutomation(node)) return;
      const dx = (e.clientX - rs.x) / zoom;
      const dy = (e.clientY - rs.y) / zoom;
      if (node.dataset.shapeType === "shape-table" && node.__tableApi?.applyHandleResize) {
        node.__tableApi.applyHandleResize(rs, dx, dy);
      } else {
        let l = rs.l, t = rs.t, w = rs.w, hh = rs.h;
        if (rs.dir.includes("e")) w = rs.w + dx;
        if (rs.dir.includes("s")) hh = rs.h + dy;
        if (rs.dir.includes("w")) { w = rs.w - dx; l = rs.l + dx; }
        if (rs.dir.includes("n")) { hh = rs.h - dy; t = rs.t + dy; }
        w = Math.max(minW, w); hh = Math.max(minH, hh);
        setNodePosition(node, l, t);
        node.style.width = `${w}px`;
        node.style.height = `${hh}px`;
        syncShapeVisualStyle(node);
        onChevronShapeResized(node);
        if (isBpProcessTask(node)) {
          onBpTaskResized(node);
        } else if (!isBpProcessStage(node)) {
          layoutConnectorPoints(node);
          renderConnectors();
        }
      }
      syncFormatPanel();
      syncAllLiftedControlsPositions();
      updateDesktopExtent();
    });
    const stop = (e) => {
      if (!rs) return;
      const resizeState = rs;
      rs = null;
      if (e.pointerId != null) h.releasePointerCapture(e.pointerId);
      if (node.dataset.shapeType === "shape-table") {
        node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || parseFloat(node.style.width || "0") || 0));
        node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || parseFloat(node.style.height || "0") || 0));
      }
      finalizeBpTaskManualResize(node, resizeState);
      finalizeBpAutomationManualResize(node, resizeState);
      if (isFrameShape(node)) {
        updateFrameMembership(node);
        updateShapeFrameMembershipAfterMove(node);
      }
      saveLayout();
    };
    h.addEventListener("pointerup", stop);
    h.addEventListener("pointercancel", stop);
  });
}

function selectShape(node) {
  if (isWorkspaceReadOnly()) return;
  clearPendingGroupMemberSelect();
  if (window.BitrixChart?.clearAllBitrixCardTextSelections) {
    window.BitrixChart.clearAllBitrixCardTextSelections(node);
  }
  const preserveBpTaskReassign = selectedShape === node && node?.dataset?.bpTaskReassignReady === "1";
  const preserveBpAutomationReassign = selectedShape === node && node?.dataset?.bpAutomationReassignReady === "1";
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedGroup();
  clearSelectedWindow();
  clearSelectedConnector();
  clearMultiSelection();
  selectedShape = node;
  if (isBpProcessTask(node) && canEditCurrentDocument()) armBpTaskReassign(node);
  if (isBpProcessAutomation(node) && canEditCurrentDocument()) armBpAutomationReassign(node);
  if (preserveBpTaskReassign) node.dataset.bpTaskReassignReady = "1";
  if (preserveBpAutomationReassign) node.dataset.bpAutomationReassignReady = "1";
  if (selectedShape && selectedShape.dataset && selectedShape.dataset.shapeType === "shape-table") {
    selectedShape.__tableSelectionScope = "shape";
  }
  node.classList.add("selected");
  updateAllTableCellConnectorGuides();
  if (formatToggle.checked) showFormatPanel();
  syncFormatPanel();
  syncBpProcessControls();
  syncSelectionControlsOverlay();
}

function clearSelectedShape() {
  if (selectedShape) {
    if (selectedShape.dataset.shapeType === "shape-bitrix-card" && window.BitrixChart?.clearBitrixCardTextPart) {
      window.BitrixChart.clearBitrixCardTextPart(selectedShape, { sync: false });
    }
    if (selectedShape.dataset.bpTaskReassignReady === "1") delete selectedShape.dataset.bpTaskReassignReady;
    if (selectedShape.dataset.bpAutomationReassignReady === "1") delete selectedShape.dataset.bpAutomationReassignReady;
    restoreLiftedShapeControls(selectedShape.dataset.shapeId);
    selectedShape.classList.remove("selected");
  }
  clearBpStageDropHighlight();
  selectedShape = null;
  updateAllTableCellConnectorGuides();
}

function selectWindow(node) {
  if (isWorkspaceReadOnly()) return;
  clearAllTableCellSelections();
  clearSelectedShape();
  clearSelectedGroup();
  clearSelectedConnector();
  clearMultiSelection();
  clearSelectedWindow();
  selectedWindow = node;
  node.classList.add("selected-window");
  if (formatToggle.checked) {
    showFormatPanel();
    clampPanelIntoViewport();
    syncFormatPanel();
  }
  syncSelectionControlsOverlay();
}

function clearSelectedWindow() {
  if (selectedWindow) {
    restoreLiftedShapeControls(getControlOwnerId(selectedWindow));
    selectedWindow.classList.remove("selected-window");
  }
  selectedWindow = null;
}

function clearSelectedConnector() {
  if (activeConnectorLabelEditId) finishConnectorLabelEditing();
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
  if (window.BitrixChart?.clearAllBitrixCardTextSelections) {
    window.BitrixChart.clearAllBitrixCardTextSelections();
  }
  collapseAllAttachedNotes({ sync: false });
  clearSelectedShape();
  clearSelectedGroup();
  clearMultiSelection();
  clearSelectedWindow();
  clearSelectedConnector();
  if (formatToggle.checked) {
    showFormatPanel();
    clampPanelIntoViewport();
    openFormatTab("style");
    syncFormatPanel();
  } else {
    formatPanel.classList.add("hidden");
  }
  updateAllTableCellConnectorGuides();
  syncBpProcessControls();
  syncSelectionControlsOverlay();
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
  if (!canEditCurrentDocument()) return;
  if (undoStack.length < 2) return;
  const viewportState = getLiveViewportState();
  const currentZoom = clamp(Number(zoom) || 1, 0.4, 2);
  const current = undoStack.pop();
  if (current) redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  applySnapshot(prev);
  zoom = currentZoom;
  applyZoom();
  restoreViewportStateImmediate(viewportState);
  saveLayout({ recordHistory: false });
  updateHistoryButtons();
}

function redoAction() {
  if (!canEditCurrentDocument()) return;
  if (!redoStack.length) return;
  const viewportState = getLiveViewportState();
  const currentZoom = clamp(Number(zoom) || 1, 0.4, 2);
  const next = redoStack.pop();
  if (!next) return;
  undoStack.push(next);
  applySnapshot(next);
  zoom = currentZoom;
  applyZoom();
  restoreViewportStateImmediate(viewportState);
  saveLayout({ recordHistory: false });
  updateHistoryButtons();
}

function deleteSelected() {
  let changed = false;
  const bpProcessesToRepair = new Set();
  const noteBpStage = (node) => {
    if (isBpProcessStage(node) && node.dataset.bpProcessId) {
      bpProcessesToRepair.add(node.dataset.bpProcessId);
    }
  };
  const noteBpProcessFromNode = (node) => {
    if (!node?.dataset?.bpProcessId) return;
    if (node.dataset.bpRole === "stage") noteBpStage(node);
    else if (node.dataset.bpRole === "base" || node.dataset.bpRole === "task" || node.dataset.bpRole === "automation") {
      bpProcessesToRepair.add(node.dataset.bpProcessId);
    }
  };
  if (selectedConnector) {
    const idx = connectors.findIndex((c) => c.id === selectedConnector);
    if (idx >= 0) {
      connectors.splice(idx, 1);
      changed = true;
    }
  } else if (selectedShape) {
    if (isFrameShape(selectedShape)) {
      getFrameChildren(selectedShape.dataset.shapeId).forEach((node) => setShapeFrameId(node, null));
    }
    const shapeId = selectedShape.dataset.shapeId;
    const connId = selectedShape.dataset.connId;
    restoreLiftedShapeControls(shapeId);
    if (isAttachedAnnotationNote(selectedShape)) {
      const owner = getNoteOwnerShape(selectedShape);
      if (owner && owner.dataset.attachedNoteId === shapeId) delete owner.dataset.attachedNoteId;
      if (expandedAttachedNoteId === shapeId) expandedAttachedNoteId = null;
    } else if (selectedShape.dataset.attachedNoteId) {
      const note = getShapeById(selectedShape.dataset.attachedNoteId);
      if (note) {
        restoreLiftedShapeControls(note.dataset.shapeId);
        note.remove();
      }
      if (expandedAttachedNoteId === selectedShape.dataset.attachedNoteId) expandedAttachedNoteId = null;
    }
    noteBpProcessFromNode(selectedShape);
    selectedShape.remove();
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (fromId === connId || toId === connId || c.from?.shapeId === shapeId || c.to?.shapeId === shapeId) connectors.splice(i, 1);
    }
    changed = true;
  } else if (selectedWindow) {
    const connId = selectedWindow.dataset.connId || "";
    restoreLiftedShapeControls(getControlOwnerId(selectedWindow));
    selectedWindow.remove();
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (fromId === connId || toId === connId) connectors.splice(i, 1);
    }
    setViewportScrollLock(false);
    changed = true;
  } else if (selectedGroupId) {
    const memberIds = new Set(getGroupedShapeIds(selectedGroupId));
    getGroupMembers(selectedGroupId).forEach((node) => {
      noteBpProcessFromNode(node);
      restoreLiftedShapeControls(node.dataset.shapeId);
      node.remove();
    });
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (fromId === getGroupConnId(selectedGroupId) || toId === getGroupConnId(selectedGroupId) || memberIds.has(fromId) || memberIds.has(toId)) connectors.splice(i, 1);
    }
    changed = true;
  } else if (multiSelectedShapeIds.size || multiSelectedConnectorIds.size) {
    const shapeIds = new Set(Array.from(multiSelectedShapeIds));
    const connectorIds = new Set(Array.from(multiSelectedConnectorIds));
    if (shapeIds.size) getMultiSelectedShapes().forEach((node) => {
      if (isFrameShape(node)) {
        getFrameChildren(node.dataset.shapeId).forEach((child) => setShapeFrameId(child, null));
      }
      noteBpProcessFromNode(node);
      restoreLiftedShapeControls(node.dataset.shapeId);
      node.remove();
    });
    for (let i = connectors.length - 1; i >= 0; i -= 1) {
      const c = connectors[i];
      const fromId = c.from?.nodeId || c.from?.shapeId || "";
      const toId = c.to?.nodeId || c.to?.shapeId || "";
      if (connectorIds.has(c.id) || shapeIds.has(fromId) || shapeIds.has(toId)) {
        connectors.splice(i, 1);
        changed = true;
      }
    }
    if (shapeIds.size) changed = true;
  }
  if (!changed) return;
  bpProcessesToRepair.forEach((processId) => repairBpProcessStageOrder(processId));
  clearSelection();
  renderConnectors();
  saveLayout();
}

function getSelectedConnectorsForClipboard() {
  if (selectedConnector) {
    const conn = connectors.find((item) => item.id === selectedConnector);
    return conn ? [conn] : [];
  }
  if (!multiSelectedConnectorIds.size) return [];
  return connectors.filter((conn) => multiSelectedConnectorIds.has(conn.id));
}

function buildDuplicateTableTitle(sourceTitle, usedTitles) {
  const raw = String(sourceTitle || "").replace(/\s+/g, " ").trim() || "Таблица";
  const set = usedTitles instanceof Set ? usedTitles : new Set();
  const suffixMatch = raw.match(/^(.*?)(?:_(\d+))$/u);
  const baseTitle = (suffixMatch ? suffixMatch[1] : raw).trim() || raw;
  let index = 1;
  while (set.has(`${baseTitle}_${index}`)) index += 1;
  return `${baseTitle}_${index}`;
}

function finalizePastedTableCopies(createdEntries = []) {
  const tableEntries = Array.isArray(createdEntries)
    ? createdEntries.filter((entry) => entry?.source?.type === "shape-table" && entry?.node?.dataset?.shapeType === "shape-table")
    : [];
  if (!tableEntries.length) return false;
  const usedTitles = new Set(getTableNodes().map((table) => String(table.dataset.tableTitle || "").replace(/\s+/g, " ").trim()).filter(Boolean));
  const titleMap = new Map();
  const createdTables = tableEntries.map((entry) => entry.node);
  tableEntries.forEach(({ node: tableNode, source }) => {
    const oldTitle = String(source.tableTitle || source.title || tableNode.dataset.tableTitle || "Таблица").replace(/\s+/g, " ").trim() || "Таблица";
    const nextTitle = buildDuplicateTableTitle(oldTitle, usedTitles);
    usedTitles.add(nextTitle);
    titleMap.set(oldTitle, nextTitle);
    if (tableNode.__tableState) tableNode.__tableState.title = nextTitle;
    tableNode.dataset.tableTitle = nextTitle;
    const titleEl = tableNode.querySelector(".table-title-text");
    if (titleEl) titleEl.textContent = nextTitle;
    syncTableReferenceName(tableNode, nextTitle);
    const syncFn = tableNode.__tableApi?.syncToFormatPanel;
    tableNode.__tableApi?.refreshDisplays?.();
    if (typeof syncFn === "function" && selectedShape === tableNode) syncFn();
  });
  if (!titleMap.size) return false;
  createdTables.forEach((tableNode) => rewriteTableReferencesInTableFormulas(tableNode, titleMap));
  createdTables.forEach((tableNode) => {
    const chrome = tableNode.querySelector(".shape-table-chrome");
    if (chrome) applyTableShapeVisualState(tableNode, tableNode.__tableState);
  });
  refreshAllFormulaDisplays();
  return true;
}

function snapshotSelectedShapesForClipboard() {
  const shapes = getActiveShapeSelection();
  const selectedConnectors = collectConnectorsForShapeClipboard(shapes);
  if (!shapes.length && !selectedConnectors.length) return null;
  return {
    version: 2,
    shapes: shapes.map(readShapeData),
    connectors: selectedConnectors
  };
}

function normalizeShapeClipboardPayload(source) {
  if (!source) return null;
  const payload = Array.isArray(source)
    ? { version: 1, shapes: source, connectors: [] }
    : {
      version: Number(source.version) || 2,
      shapes: Array.isArray(source.shapes) ? source.shapes : [],
      connectors: Array.isArray(source.connectors) ? source.connectors : []
    };
  return payload.shapes.length || payload.connectors.length ? payload : null;
}

function serializeShapeClipboardPayload(payload) {
  const normalized = normalizeShapeClipboardPayload(payload);
  if (!normalized) return "";
  try {
    return `${SHAPE_CLIPBOARD_PREFIX}${JSON.stringify(normalized)}`;
  } catch {
    return "";
  }
}

function parseShapeClipboardText(text) {
  const raw = String(text || "");
  if (!raw.startsWith(SHAPE_CLIPBOARD_PREFIX)) return null;
  try {
    return normalizeShapeClipboardPayload(JSON.parse(raw.slice(SHAPE_CLIPBOARD_PREFIX.length)));
  } catch {
    return null;
  }
}

function parseShapeClipboardDataTransfer(dataTransfer) {
  if (!dataTransfer) return null;
  try {
    const customText = dataTransfer.getData(SHAPE_CLIPBOARD_MIME);
    if (customText) {
      const payload = normalizeShapeClipboardPayload(JSON.parse(customText));
      if (payload) return payload;
    }
  } catch {}
  return parseShapeClipboardText(dataTransfer.getData("text/plain") || "");
}

async function writeShapeClipboardToSystem(payload) {
  const serialized = serializeShapeClipboardPayload(payload);
  if (!serialized || !navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(serialized);
    return true;
  } catch {
    return false;
  }
}

async function readShapeClipboardFromSystem() {
  if (!navigator.clipboard?.readText) return null;
  try {
    const text = await navigator.clipboard.readText();
    return parseShapeClipboardText(text);
  } catch {
    return null;
  }
}

function markShapeClipboardPasteHandled() {
  shapeClipboardPasteHandledUntil = Date.now() + 300;
}

function wasShapeClipboardPasteHandledRecently() {
  return Date.now() < shapeClipboardPasteHandledUntil;
}

function createShapeFromData(shapeData, offsetX = 0, offsetY = 0, opts = {}) {
  if (!shapeData) return null;
  const copy = cloneStyleData(shapeData) || {};
  delete copy.id;
  delete copy.connId;
  const remaps = opts.remaps || null;
  const oldGroupId = String(copy.groupId || "").trim();
  if (remaps?.groupMap && oldGroupId) {
    copy.groupId = remaps.groupMap.get(oldGroupId) || oldGroupId;
  } else {
    delete copy.groupId;
  }
  delete copy.frameId;
  const oldProcessId = String(copy.bpProcessId || "").trim();
  if (remaps?.processMap && oldProcessId) {
    copy.bpProcessId = remaps.processMap.get(oldProcessId) || oldProcessId;
  } else if (oldProcessId) {
    delete copy.bpProcessId;
    delete copy.bpRole;
    delete copy.bpStageIndex;
    delete copy.bpTaskStageIndex;
    delete copy.bpTaskOrder;
    delete copy.bpTaskAutoHeight;
    delete copy.bpTaskManualPosition;
    delete copy.bpTaskData;
    delete copy.bpTaskTypography;
    delete copy.bpAutomationStageIndex;
    delete copy.bpAutomationOrder;
    delete copy.bpAutomationAutoHeight;
    delete copy.bpAutomationManualPosition;
    delete copy.bpAutomationData;
    delete copy.bpAutomationTypography;
    delete copy.bpTasksHidden;
    delete copy.bpAutomationsHidden;
  }
  const left = (parseFloat(copy.left || "0") || 0) + offsetX;
  const top = (parseFloat(copy.top || "0") || 0) + offsetY;
  copy.left = formatPositionPx(left);
  copy.top = formatPositionPx(top);
  const doSave = opts.doSave !== false;
  if (copy.type === "shape-rect") return createShapeRectangle(copy, doSave);
  if (copy.type === "shape-note") return createShapeNote(copy, doSave);
  if (copy.type === "shape-line") return createShapeLine(copy, doSave);
  if (copy.type === "shape-table") return createShapeTable(copy, doSave);
  if (copy.type === "shape-image") return createShapeImage(copy, doSave);
  if (copy.type === "shape-frame") return createShapeFrame(copy, doSave);
  if (copy.type === "shape-freedraw" && window.DrawTools) return window.DrawTools.restoreShapeFreedraw(copy, doSave);
  if (copy.type === "shape-chart" && window.BitrixChart) return window.BitrixChart.restoreShapeChart(copy, doSave);
  if (copy.type === "shape-bitrix-card" && window.BitrixChart) return window.BitrixChart.restoreShapeCard(copy, doSave);
  if (copy.type === "shape-bitrix-date-filter" && window.BitrixChart) return window.BitrixChart.restoreShapeDateFilter(copy, doSave);
  return null;
}

function remapConnectorClipboardEnd(end, maps, offsetX = 0, offsetY = 0) {
  if (!end) return null;
  const nodeId = String(end.nodeId || "").trim();
  const shapeId = String(end.shapeId || "").trim();
  const nextNodeId = nodeId ? (maps.connIds.get(nodeId) || maps.shapeIds.get(nodeId) || "") : "";
  const nextShapeId = shapeId ? (maps.shapeIds.get(shapeId) || maps.connIds.get(shapeId) || "") : "";
  if (nextNodeId || nextShapeId) {
    const cloned = cloneConnectorEndState(end) || {};
    if (nextNodeId) {
      cloned.nodeId = nextNodeId;
      delete cloned.shapeId;
    } else if (nextShapeId) {
      cloned.shapeId = nextShapeId;
      delete cloned.nodeId;
    }
    return cloned;
  }
  if (nodeId || shapeId) {
    const point = getConnectorPoint(end);
    return {
      x: point.x + offsetX,
      y: point.y + offsetY
    };
  }
  return {
    ...cloneConnectorEndState(end),
    x: (Number(end.x) || 0) + offsetX,
    y: (Number(end.y) || 0) + offsetY
  };
}

function createConnectorFromClipboardData(connectorData, maps, offsetX = 0, offsetY = 0) {
  const copy = cloneStyleData(connectorData) || {};
  const from = remapConnectorClipboardEnd(copy.from, maps, offsetX, offsetY);
  const to = remapConnectorClipboardEnd(copy.to, maps, offsetX, offsetY);
  if (!from || !to || connectorEndEquals(from, to)) return null;
  const connector = {
    ...copy,
    id: nextConnectorId(),
    from,
    to,
    routePoints: normalizeConnectorRoutePoints(copy.routePoints).map((point) => ({
      x: point.x + offsetX,
      y: point.y + offsetY
    }))
  };
  connectors.push(connector);
  return connector;
}

function copySelectedShapes() {
  const snap = snapshotSelectedShapesForClipboard();
  if (!snap) return false;
  shapeClipboard = snap;
  void writeShapeClipboardToSystem(snap);
  return true;
}

function getViewportCenterDesktopPoint() {
  if (!viewportEl) return { x: 200, y: 200 };
  const vr = viewportEl.getBoundingClientRect();
  return getDesktopPoint(vr.left + vr.width / 2, vr.top + vr.height / 2);
}

function updateLastDesktopPointer(clientX, clientY) {
  if (!desktop || clientX == null || clientY == null) return;
  const vr = viewportEl?.getBoundingClientRect();
  if (!vr) return;
  if (clientX < vr.left || clientX > vr.right || clientY < vr.top || clientY > vr.bottom) return;
  lastDesktopPointer = getDesktopPoint(clientX, clientY);
}

function parseClipboardDimensionPx(value, fallback = 0) {
  return Math.max(0, parseFloat(String(value ?? "")) || fallback);
}

function getClipboardPayloadBounds(payload) {
  const shapes = payload?.shapes || [];
  if (!shapes.length) return null;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  shapes.forEach((item) => {
    const l = parseClipboardDimensionPx(item.left);
    const t = parseClipboardDimensionPx(item.top);
    const w = parseClipboardDimensionPx(item.width, 220);
    const h = parseClipboardDimensionPx(item.height, 120);
    left = Math.min(left, l);
    top = Math.min(top, t);
    right = Math.max(right, l + w);
    bottom = Math.max(bottom, t + h);
  });
  if (!Number.isFinite(left)) return null;
  return {
    left,
    top,
    right,
    bottom,
    centerX: (left + right) / 2,
    centerY: (top + bottom) / 2
  };
}

function resolveClipboardPasteOffset(payload, mode = "cursor", pointOverride = null) {
  if (mode === "duplicate") return { offsetX: 24, offsetY: 24 };
  const point = pointOverride || lastDesktopPointer || getViewportCenterDesktopPoint();
  const bounds = getClipboardPayloadBounds(payload);
  if (!bounds) return { offsetX: 24, offsetY: 24 };
  return {
    offsetX: point.x - bounds.centerX,
    offsetY: point.y - bounds.centerY
  };
}

function pasteShapeClipboardAtClient(sourcePayload, clientX, clientY) {
  const payload = normalizeShapeClipboardPayload(sourcePayload);
  if (!payload) return false;
  shapeClipboard = payload;
  const point = getDesktopPoint(clientX, clientY);
  const { offsetX, offsetY } = resolveClipboardPasteOffset(payload, "cursor", point);
  return pasteShapeClipboard(offsetX, offsetY, payload);
}

function pasteShapeClipboard(offsetX = 24, offsetY = 24, sourcePayload = null) {
  const payload = normalizeShapeClipboardPayload(sourcePayload || shapeClipboard);
  if (!payload) return false;
  if (!payload.shapes.length && !payload.connectors.length) return false;
  const remaps = buildClipboardPasteRemaps(payload);
  const created = [];
  const createdEntries = [];
  const maps = {
    shapeIds: new Map(),
    connIds: new Map()
  };
  remaps.groupMap.forEach((newGroupId, oldGroupId) => {
    maps.connIds.set(getGroupConnId(oldGroupId), getGroupConnId(newGroupId));
    maps.shapeIds.set(getGroupConnId(oldGroupId), getGroupConnId(newGroupId));
  });
  historyLock = true;
  try {
    payload.shapes.forEach((item) => {
      const createdNode = createShapeFromData(item, offsetX, offsetY, { remaps, doSave: false });
      if (!createdNode) return;
      created.push(createdNode);
      createdEntries.push({ source: item, node: createdNode });
      if (item?.id) maps.shapeIds.set(String(item.id), createdNode.dataset.shapeId || "");
      if (item?.connId) maps.connIds.set(String(item.connId), createdNode.dataset.connId || createdNode.dataset.shapeId || "");
      const oldGroupId = String(item?.groupId || "").trim();
      if (oldGroupId && remaps.groupMap.has(oldGroupId)) {
        const newGroupConnId = getGroupConnId(remaps.groupMap.get(oldGroupId));
        maps.connIds.set(getGroupConnId(oldGroupId), newGroupConnId);
      }
    });
    finalizePastedShapeGroups(createdEntries, remaps);
    finalizePastedFrameMembership(createdEntries, remaps);
    stripSyntheticPasteGroupIds(createdEntries, remaps);
    finalizePastedTableCopies(createdEntries);
    finalizePastedBpProcessCopies(remaps.processMap);
    finalizePastedAttachedNotes(createdEntries, maps);
    const createdConnectors = payload.connectors
      .map((item) => createConnectorFromClipboardData(item, maps, offsetX, offsetY))
      .filter(Boolean);
    if (!created.length && !createdConnectors.length) return false;
    bringNodesToFront(created);
    clearSelection();
    if (created.length) {
      if (createdConnectors.length) {
        createdConnectors.forEach((conn) => multiSelectedConnectorIds.add(conn.id));
      }
      selectPastedShapes(created, remaps);
      if (createdConnectors.length && formatToggle.checked) {
        showFormatPanel();
        syncFormatPanel();
      }
    } else if (createdConnectors.length === 1) {
      selectConnector(createdConnectors[0].id);
    } else if (createdConnectors.length > 1) {
      createdConnectors.forEach((conn) => multiSelectedConnectorIds.add(conn.id));
      renderConnectors();
      if (formatToggle.checked) {
        showFormatPanel();
        syncFormatPanel();
      }
    }
    renderConnectors();
    saveLayout({ recordHistory: true });
    return true;
  } finally {
    historyLock = false;
  }
}

async function pasteShapeClipboardFromSystemOrMemory(mode = "cursor") {
  const systemPayload = await readShapeClipboardFromSystem();
  const payload = normalizeShapeClipboardPayload(systemPayload || shapeClipboard);
  if (!payload) return false;
  const { offsetX, offsetY } = resolveClipboardPasteOffset(payload, mode);
  if (systemPayload) shapeClipboard = systemPayload;
  return pasteShapeClipboard(offsetX, offsetY, systemPayload || shapeClipboard);
}

async function pasteImageFromSystemClipboard(point = null) {
  if (!navigator.clipboard?.read) return false;
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const imageType = item.types.find((type) => String(type).startsWith("image/"));
      if (!imageType) continue;
      const blob = await item.getType(imageType);
      if (!blob || !String(blob.type || "").startsWith("image/")) continue;
      const spawn = point || lastDesktopPointer || getViewportCenterDesktopPoint();
      await insertImageFromBlob(blob, spawn);
      return true;
    }
  } catch {}
  return false;
}

async function pasteFromClipboardKeyboard() {
  if (!canEditCurrentDocument()) return false;
  if (await pasteImageFromSystemClipboard()) return true;
  markShapeClipboardPasteHandled();
  return pasteShapeClipboardFromSystemOrMemory("cursor");
}

function duplicateSelectedShapes() {
  const snap = snapshotSelectedShapesForClipboard();
  if (!snap) return false;
  shapeClipboard = snap;
  return pasteShapeClipboard(24, 24);
}

function createShapeBase(type, opts = {}) {
  const node = document.createElement("div");
  node.className = `shape ${type}`;
  node.dataset.shapeType = type;
  node.dataset.shapeId = opts.id || `shape_${shapeCounter++}`;
  node.dataset.connId = opts.connId || node.dataset.shapeId;
  if (opts.groupId) node.dataset.groupId = String(opts.groupId);
  if (opts.frameId) node.dataset.frameId = String(opts.frameId);
  if (opts.attachedNoteId) node.dataset.attachedNoteId = String(opts.attachedNoteId);
  if (opts.attachedNote) node.dataset.attachedNote = "1";
  if (opts.noteOwnerId) node.dataset.noteOwnerId = String(opts.noteOwnerId);
  node.dataset.borderWidth = String(Math.max(0, Number(opts.borderWidth ?? 1) || 0));
  node.dataset.borderEnabled = opts.borderEnabled === false ? "0" : "1";
  if (opts.border != null || opts.borderColor != null) {
    setShapeBorderColor(node, opts.border || opts.borderColor || "#111827");
  }
  const defaultWidth = opts.width || (type === "shape-note" ? "260px" : type === "shape-image" ? "240px" : type === "shape-line" ? "180px" : "220px");
  const defaultHeight = opts.height || (type === "shape-line" ? "1px" : type === "shape-note" ? "150px" : type === "shape-image" ? "180px" : "120px");
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
    autoLeft = center.x - w / 2 + (shapeSpawnStep % 10) * 18;
    autoTop = center.y - h / 2 + (shapeSpawnStep % 10) * 14;
  }
  node.style.left = opts.left || `${autoLeft}px`;
  node.style.top = opts.top || `${autoTop}px`;
  node.style.zIndex = String(opts.zIndex || ++zCounter);
  if (opts.aboveConnectors) node.dataset.aboveConnectors = "1";
  node.style.opacity = opts.opacity || "1";
  if (opts.shadow != null) applyNodeShadow(node, opts.shadow);
  if (opts.angle != null) node.dataset.rotate = String(Number(opts.angle) || 0);
  if (opts.flipX != null) node.dataset.flipX = Number(opts.flipX) ? "1" : "0";
  if (opts.flipY != null) node.dataset.flipY = Number(opts.flipY) ? "1" : "0";
  if (opts.angle != null || opts.flipX != null || opts.flipY != null) applyTransformState(node);

  node.addEventListener("pointerdown", (e) => {
    if (activeFormulaEditor && node.contains(activeFormulaEditor)) return;
    if (insertFormulaReferenceToken(`@${node.dataset.shapeId}`, e)) return;
    if (node.dataset.shapeType === "shape-bitrix-card" && window.BitrixChart?.clearBitrixCardTextPart) {
      if (!e.target.closest(".bitrix-kpi-value, .bitrix-kpi-label")) {
        window.BitrixChart.clearBitrixCardTextPart(node, { sync: false });
      }
    }
    if (e.button !== 0) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    if (isWorkspaceReadOnly()) return;
    const additiveSelection = e.shiftKey || e.metaKey || e.ctrlKey;
    if (additiveSelection) {
      if (selectedShape && selectedShape !== node) {
        multiSelectedShapeIds.add(selectedShape.dataset.shapeId);
        selectedShape.classList.remove("selected");
        selectedShape = null;
      }
      clearSelectedShape();
      clearSelectedGroup();
      clearSelectedWindow();
      clearSelectedConnector();
      toggleMultiSelection(node);
      if (formatPanel) formatPanel.classList.add("hidden");
      if (formatToggle.checked && multiSelectedShapeIds.size) {
        showFormatPanel();
        syncFormatPanel();
      }
      return;
    }
    if (isNodeInActiveMultiSelection(node)) {
      if (formatToggle.checked) {
        showFormatPanel();
        syncFormatPanel();
      }
      return;
    }
    const groupId = getShapeGroupId(node);
    if (groupId && !isBpProcessMember(node)) {
      if (!selectedGroupId && selectedShape && getShapeGroupId(selectedShape) === groupId) {
        selectGroup(groupId);
        return;
      }
      if (selectedGroupId === groupId) {
        beginPendingGroupMemberSelect(node, e);
        return;
      }
      selectGroup(groupId);
      return;
    }
    if (isBpProcessTask(node) && canEditCurrentDocument()) {
      const processId = node.dataset.bpProcessId;
      const transferReassign = isBpReassignSessionActive(processId)
        || selectedShape?.dataset?.bpTaskReassignReady === "1";
      selectShape(node);
      if (transferReassign) armBpTaskReassign(node);
      return;
    }
    if (isBpProcessAutomation(node) && canEditCurrentDocument()) {
      const processId = node.dataset.bpProcessId;
      const transferReassign = isBpReassignSessionActive(processId)
        || selectedShape?.dataset?.bpAutomationReassignReady === "1";
      selectShape(node);
      if (transferReassign) armBpAutomationReassign(node);
      return;
    }
    selectShape(node);
  });
  attachDrag(node, node, { raiseOnDrag: false });
  if (!hasManualPos) shapeSpawnStep += 1;
  return node;
}

function ensureConnectorLayer() {
  let layer = desktop.querySelector("#connOverlayLayer");
  if (layer) return layer;
  layer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  layer.setAttribute("id", "connOverlayLayer");
  layer.setAttribute("class", "conn-layer conn-overlay-layer");
  appendToDesktop(layer);
  updateConnectorLayerSize();
  return layer;
}

function updateConnectorLayerSize() {
  const surface = getDesktopContentRoot();
  if (!surface) return;
  const w = surface.scrollWidth || surface.clientWidth;
  const h = surface.scrollHeight || surface.clientHeight;
  desktop.querySelectorAll(".conn-layer").forEach((layer) => {
    layer.setAttribute("width", String(w));
    layer.setAttribute("height", String(h));
    layer.setAttribute("viewBox", `0 0 ${w} ${h}`);
  });
}

function getConnectableById(id) {
  if (isGroupConnId(id)) return { __isGroup: true, groupId: getGroupIdFromConnId(id), dataset: { connId: id } };
  return desktop.querySelector(`[data-conn-id="${id}"]`);
}

function getConnectableBounds(shape) {
  if (shape && shape.__isGroup) {
    return getGroupBounds(shape.groupId) || { left: 0, top: 0, width: 0, height: 0 };
  }
  return { left: shape.offsetLeft, top: shape.offsetTop, width: shape.offsetWidth, height: shape.offsetHeight };
}

function clientRectToDesktopBounds(rect) {
  if (!rect || !desktop) return null;
  const desktopRect = desktop.getBoundingClientRect();
  const pad = getDesktopPaddingOffset();
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  const left = (rect.left - desktopRect.left) / localZoom - pad.left;
  const top = (rect.top - desktopRect.top) / localZoom - pad.top;
  const width = rect.width / localZoom;
  const height = rect.height / localZoom;
  return { left, top, width, height, right: left + width, bottom: top + height };
}

function getTableCellClampRect(tableShape) {
  const tableWrap = tableShape?.__tableWrapEl || tableShape?.querySelector?.(".shape-table-wrap");
  const titleBar = tableShape?.querySelector?.(".table-titlebar");
  if (!tableWrap) return null;
  const visible = clientRectToDesktopBounds(tableWrap.getBoundingClientRect());
  if (!visible) return null;
  const title = titleBar ? clientRectToDesktopBounds(titleBar.getBoundingClientRect()) : null;
  const titleY = title ? title.top + title.height / 2 : visible.top;
  return { visible, titleY };
}

function getCellAnchorEdgePoint(bounds, anchor) {
  const { left: x, top: y, width: w, height: h } = bounds;
  const g = TABLE_CELL_ANCHOR_OUTSET;
  const map = {
    n: [x + w / 2, y - g],
    e: [x + w + g, y + h / 2],
    s: [x + w / 2, y + h + g],
    w: [x - g, y + h / 2],
    c: [x + w / 2, y + h / 2]
  };
  const point = map[anchor] || map.c;
  return { x: point[0], y: point[1] };
}

function clampCellConnectorAnchor(cellEl, rawPoint, anchor = "c") {
  try {
    if (!cellEl || !rawPoint) return rawPoint || { x: 0, y: 0 };
    const tableShape = cellEl.closest ? cellEl.closest(".shape.shape-table") : null;
    if (!tableShape) return rawPoint;
    const ctx = getTableCellClampRect(tableShape);
    if (!ctx) return rawPoint;
    const cellBounds = getCellBounds(cellEl);
    if (!cellBounds) return rawPoint;
    const cellRight = cellBounds.left + cellBounds.width;
    const cellBottom = cellBounds.top + cellBounds.height;
    const { visible, titleY } = ctx;
    const g = TABLE_CELL_ANCHOR_OUTSET;
    const intersects = !(cellRight < visible.left
      || cellBounds.left > visible.right
      || cellBottom < visible.top
      || cellBounds.top > visible.bottom);
    const withinVisible = rawPoint.x >= visible.left - g && rawPoint.x <= visible.right + g
      && rawPoint.y >= visible.top - g && rawPoint.y <= visible.bottom + g;
    if (intersects && withinVisible) return rawPoint;
    let x = rawPoint.x;
    let y = rawPoint.y;
    if (anchor === "w") x = visible.left - g;
    else if (anchor === "e") x = visible.right + g;
    else x = clamp(x, visible.left, visible.right);
    if (anchor === "n") y = titleY;
    else if (anchor === "s") y = visible.bottom + g;
    else if (y < visible.top) y = titleY;
    else if (y > visible.bottom) y = visible.bottom + g;
    else y = clamp(y, visible.top, visible.bottom);
    return { x, y };
  } catch {
    return rawPoint || { x: 0, y: 0 };
  }
}

function getCellBounds(cellEl) {
  if (!cellEl || !desktop) return null;
  const desktopRect = desktop.getBoundingClientRect();
  const cellRect = cellEl.getBoundingClientRect();
  const pad = getDesktopPaddingOffset();
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  return {
    left: (cellRect.left - desktopRect.left) / localZoom - pad.left,
    top: (cellRect.top - desktopRect.top) / localZoom - pad.top,
    width: cellRect.width / localZoom,
    height: cellRect.height / localZoom
  };
}

function getCellAnchorPos(cellEl, anchor) {
  const bounds = getCellBounds(cellEl);
  if (!bounds) return { x: 0, y: 0 };
  const edgePoint = getCellAnchorEdgePoint(bounds, anchor || "c");
  return clampCellConnectorAnchor(cellEl, edgePoint, anchor || "c");
}

function getCellElementForConnectorEnd(end) {
  const cellRef = normalizeCellRef(end && end.cell);
  if (!cellRef || !end?.nodeId) return null;
  const node = getConnectableById(end.nodeId);
  if (!node || node.__isGroup || node.dataset.shapeType !== "shape-table") return null;
  return node.__tableApi?.getCellElement?.(cellRef.r, cellRef.c) || null;
}

function getAnchorPos(shape, anchor) {
  const { left: x, top: y, width: w, height: h } = getConnectableBounds(shape);
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
  const seen = new Set();
  desktop.querySelectorAll(".shape, .sheet-window").forEach((shape) => {
    if (shape.classList.contains("shape") && shape.dataset.shapeType === "shape-line") return;
    const groupId = getShapeGroupId(shape);
    const nid = groupId ? getGroupConnId(groupId) : (shape.dataset.connId || "");
    if (seen.has(nid)) return;
    seen.add(nid);
    if (skipShapeId && nid === skipShapeId) return;
    const target = groupId ? getConnectableById(nid) : shape;
    ["n", "ne", "e", "se", "s", "sw", "w", "nw", "c"].forEach((anchor) => {
      const p = getAnchorPos(target, anchor);
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
  const pad = getDesktopPaddingOffset();
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  return {
    x: (clientX - dr.left) / localZoom - pad.left,
    y: (clientY - dr.top) / localZoom - pad.top
  };
}

function desktopPointToClient(desktopX, desktopY) {
  const dr = desktop.getBoundingClientRect();
  const pad = getDesktopPaddingOffset();
  const localZoom = Math.max(0.001, Number(zoom) || 1);
  return {
    x: (Number(desktopX) + pad.left) * localZoom + dr.left,
    y: (Number(desktopY) + pad.top) * localZoom + dr.top
  };
}

function snapToShapeAnchor(x, y, skipShapeId = "") {
  const best = getNearestAnchorTarget(x, y, skipShapeId);
  return best ? { x: best.x, y: best.y } : { x, y };
}

function getConnectorPoint(end) {
  if (!end) return { x: 0, y: 0 };
  if (end.nodeId) {
    const cellEl = getCellElementForConnectorEnd(end);
    if (cellEl) return getCellAnchorPos(cellEl, end.anchor || "c");
    const node = getConnectableById(end.nodeId);
    if (node) {
      const bounds = getConnectableBounds(node);
      if ((end.anchor || "c") === "edge") {
        return {
          x: bounds.left + bounds.width * clamp(Number(end.rx) || 0, 0, 1),
          y: bounds.top + bounds.height * clamp(Number(end.ry) || 0, 0, 1)
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

function getConnectorRenderPoints(conn) {
  if (!conn) return null;
  const routeStyle = normalizeConnectorRouteStyle(conn.routeStyle);
  const p1Raw = getConnectorPoint(conn.from);
  const p2Raw = getConnectorPoint(conn.to);
  let p1 = p1Raw;
  let p2 = p2Raw;
  const gapStart = Number(conn.gapStart ?? conn.gap ?? 30);
  const gapEnd = Number(conn.gapEnd ?? conn.gap ?? 30);
  const fromAnchor = conn.from?.anchor || "c";
  const toAnchor = conn.to?.anchor || "c";
  const fromNode = connectorEndHasCell(conn.from) ? null : getConnectableFromEnd(conn.from);
  const toNode = connectorEndHasCell(conn.to) ? null : getConnectableFromEnd(conn.to);
  const previewInternal = normalizeConnectorRoutePoints(conn.routePoints).map(cloneConnectorPoint);
  const defaultInternal = previewInternal.length
    ? previewInternal
    : buildDefaultConnectorRoutePoints(p1Raw, p2Raw, routeStyle);
  const fromReferencePoint = defaultInternal.length ? defaultInternal[0] : p2Raw;
  const toReferencePoint = defaultInternal.length ? defaultInternal[defaultInternal.length - 1] : p1Raw;
  if (fromNode) {
    p1 = fromAnchor === "c"
      ? getOffsetPointFromShapeCenter(
        fromNode,
        fromReferencePoint,
        gapStart,
        getPreferredCenterExitDirection(fromNode, fromReferencePoint, routeStyle)
      )
      : getOffsetPointFromEdge(p1Raw, p2Raw, gapStart);
  } else if (connectorEndHasCell(conn.from) && fromAnchor !== "c") {
    p1 = getOffsetPointFromEdge(p1Raw, fromReferencePoint, gapStart);
  }
  if (toNode) {
    p2 = toAnchor === "c"
      ? getOffsetPointFromShapeCenter(
        toNode,
        toReferencePoint,
        gapEnd,
        getPreferredCenterExitDirection(toNode, toReferencePoint, routeStyle)
      )
      : getOffsetPointFromEdge(p2Raw, p1Raw, gapEnd);
  } else if (connectorEndHasCell(conn.to) && toAnchor !== "c") {
    p2 = getOffsetPointFromEdge(p2Raw, toReferencePoint, gapEnd);
  }
  return {
    p1,
    p2,
    p1Raw,
    p2Raw,
    attach1: getConnectorAttachmentPoint(conn.from, p2Raw),
    attach2: getConnectorAttachmentPoint(conn.to, p1Raw)
  };
}

function normalizeConnectorRouteStyle(value) {
  return ["straight", "orthogonal-horizontal", "orthogonal-vertical"].includes(value)
    ? value
    : "straight";
}

function isOrthogonalRouteStyle(value) {
  return normalizeConnectorRouteStyle(value) !== "straight";
}

function cloneConnectorPoint(point) {
  return {
    x: Number(point?.x) || 0,
    y: Number(point?.y) || 0
  };
}

function pointsEqual(a, b) {
  return Math.abs((a?.x ?? 0) - (b?.x ?? 0)) < 0.5 && Math.abs((a?.y ?? 0) - (b?.y ?? 0)) < 0.5;
}

function normalizeConnectorRoutePoints(points) {
  if (!Array.isArray(points)) return [];
  const normalized = [];
  points.forEach((point) => {
    const x = Number(point?.x);
    const y = Number(point?.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const nextPoint = { x, y };
    if (!normalized.length || !pointsEqual(normalized[normalized.length - 1], nextPoint)) normalized.push(nextPoint);
  });
  for (let i = normalized.length - 2; i > 0; i -= 1) {
    const prev = normalized[i - 1];
    const current = normalized[i];
    const next = normalized[i + 1];
    if ((Math.abs(prev.x - current.x) < 0.5 && Math.abs(current.x - next.x) < 0.5)
      || (Math.abs(prev.y - current.y) < 0.5 && Math.abs(current.y - next.y) < 0.5)) {
      normalized.splice(i, 1);
    }
  }
  return normalized;
}

function buildDefaultConnectorRoutePoints(p1, p2, routeStyle) {
  const style = normalizeConnectorRouteStyle(routeStyle);
  if (!isOrthogonalRouteStyle(style)) return [];
  if (style === "orthogonal-vertical") {
    if (Math.abs(p1.x - p2.x) < 0.5 || Math.abs(p1.y - p2.y) < 0.5) return [];
    return [{ x: p1.x, y: p2.y }];
  }
  if (Math.abs(p1.x - p2.x) < 0.5 || Math.abs(p1.y - p2.y) < 0.5) return [];
  return [{ x: p2.x, y: p1.y }];
}

function getConnectorPathState(conn) {
  const renderPoints = getConnectorRenderPoints(conn);
  if (!renderPoints) return null;
  const routeStyle = normalizeConnectorRouteStyle(conn.routeStyle);
  const { p1, p2, p1Raw, p2Raw } = renderPoints;
  if (!isOrthogonalRouteStyle(routeStyle)) {
    return { routeStyle, orthogonal: false, points: [p1, p2], p1, p2, p1Raw, p2Raw };
  }
  const internal = normalizeConnectorRoutePoints(conn.routePoints).map(cloneConnectorPoint);
  if (!internal.length) {
    internal.push(...buildDefaultConnectorRoutePoints(p1, p2, routeStyle));
  } else if (internal.length === 1) {
    if (routeStyle === "orthogonal-vertical") {
      internal[0].x = p1.x;
      internal[0].y = p2.y;
    } else {
      internal[0].x = p2.x;
      internal[0].y = p1.y;
    }
  } else {
    const first = internal[0];
    const second = internal[1];
    if (Math.abs(first.x - second.x) < 0.5) first.y = p1.y;
    else first.x = p1.x;
    const last = internal[internal.length - 1];
    const prev = internal[internal.length - 2];
    if (Math.abs(last.x - prev.x) < 0.5) last.y = p2.y;
    else last.x = p2.x;
  }
  const points = [p1, ...normalizeConnectorRoutePoints(internal), p2];
  return { routeStyle, orthogonal: true, points, p1, p2, p1Raw, p2Raw };
}

function connectorPathToSvg(points) {
  if (!Array.isArray(points) || points.length < 2) return "";
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

const CONNECTOR_LABEL_FONT_SIZE = 14;
const CONNECTOR_LABEL_GAP_PAD = 8;
const CONNECTOR_LABEL_DEFAULT_STYLE = {
  fontFamily: "Arial",
  fontSize: CONNECTOR_LABEL_FONT_SIZE,
  color: "",
  bold: false,
  italic: false,
  strike: false,
  underline: false,
  hAlign: "center",
  vAlign: "middle"
};
let connectorLabelMeasureCtx = null;

function normalizeConnectorLabelStyle(source) {
  const raw = (source && typeof source === "object") ? source : {};
  return {
    fontFamily: String(raw.fontFamily || CONNECTOR_LABEL_DEFAULT_STYLE.fontFamily),
    fontSize: clampFontSizeStep(Number(raw.fontSize ?? CONNECTOR_LABEL_FONT_SIZE), CONNECTOR_LABEL_FONT_SIZE),
    color: String(raw.color || "").trim(),
    bold: !!raw.bold,
    italic: !!raw.italic,
    strike: !!raw.strike,
    underline: !!raw.underline,
    hAlign: raw.hAlign === "left" || raw.hAlign === "right" ? raw.hAlign : "center",
    vAlign: raw.vAlign === "top" || raw.vAlign === "bottom" ? raw.vAlign : "middle"
  };
}

function getConnectorLabelStyle(conn) {
  return normalizeConnectorLabelStyle(conn?.labelStyle);
}

function connectorLabelFontCss(style) {
  const labelStyle = normalizeConnectorLabelStyle(style);
  const weight = labelStyle.bold ? "700" : "400";
  const fontStyle = labelStyle.italic ? "italic" : "normal";
  return `${fontStyle} ${weight} ${labelStyle.fontSize}px ${fontCssFromKey(labelStyle.fontFamily)}`;
}

function applyConnectorLabelStyle(textEl, conn, style = null) {
  if (!textEl || !conn) return;
  const labelStyle = style || getConnectorLabelStyle(conn);
  textEl.style.fontFamily = fontCssFromKey(labelStyle.fontFamily);
  textEl.style.fontSize = `${labelStyle.fontSize}px`;
  textEl.style.fontWeight = labelStyle.bold ? "700" : "400";
  textEl.style.fontStyle = labelStyle.italic ? "italic" : "normal";
  textEl.style.color = labelStyle.color || conn.color || "#1f2937";
  const decorations = [];
  if (labelStyle.underline) decorations.push("underline");
  if (labelStyle.strike) decorations.push("line-through");
  textEl.style.textDecoration = decorations.length ? decorations.join(" ") : "none";
  textEl.style.textAlign = labelStyle.hAlign || "center";
}

function getFormatPanelAlign() {
  const alignBtn = [fpAlignLeft, fpAlignCenter, fpAlignRight].find((btn) => btn && btn.classList.contains("active"));
  return alignBtn === fpAlignCenter ? "center" : alignBtn === fpAlignRight ? "right" : "left";
}

function getFormatPanelVAlign() {
  const vAlignBtn = [fpVTop, fpVMiddle, fpVBottom].find((btn) => btn && btn.classList.contains("active"));
  return vAlignBtn === fpVMiddle ? "middle" : vAlignBtn === fpVBottom ? "bottom" : "top";
}

function readConnectorLabelStyleFromPanel(conn) {
  const prev = getConnectorLabelStyle(conn);
  return normalizeConnectorLabelStyle({
    fontFamily: fpFontFamily ? fpFontFamily.value : prev.fontFamily,
    fontSize: fpFontSize ? Number(fpFontSize.value) : prev.fontSize,
    color: fpTextColor ? fpTextColor.value : prev.color,
    bold: fpBold ? fpBold.checked : prev.bold,
    italic: fpItalic ? fpItalic.checked : prev.italic,
    strike: fpStrike ? fpStrike.checked : prev.strike,
    underline: fpUnderline ? fpUnderline.checked : prev.underline,
    hAlign: getFormatPanelAlign(),
    vAlign: getFormatPanelVAlign()
  });
}

function applyConnectorLabelStyleFromPanel(conn) {
  if (!conn) return;
  conn.labelStyle = readConnectorLabelStyleFromPanel(conn);
}

function measureConnectorLabelText(text, styleOrSize = CONNECTOR_LABEL_FONT_SIZE) {
  const sample = String(text || "");
  if (!sample) return 0;
  const style = typeof styleOrSize === "object"
    ? normalizeConnectorLabelStyle(styleOrSize)
    : normalizeConnectorLabelStyle({ fontSize: styleOrSize });
  if (!connectorLabelMeasureCtx) {
    const canvas = document.createElement("canvas");
    connectorLabelMeasureCtx = canvas.getContext("2d");
  }
  connectorLabelMeasureCtx.font = connectorLabelFontCss(style);
  return connectorLabelMeasureCtx.measureText(sample).width;
}

function getConnectorPathMetrics(points) {
  const segments = [];
  let total = 0;
  if (!Array.isArray(points) || points.length < 2) return { segments, total: 0 };
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot((b.x || 0) - (a.x || 0), (b.y || 0) - (a.y || 0));
    if (len < 0.001) continue;
    segments.push({ a, b, len, start: total, end: total + len, index: i });
    total += len;
  }
  return { segments, total };
}

function pointAtConnectorDistance(points, distance) {
  const metrics = getConnectorPathMetrics(points);
  const dist = clamp(Number(distance) || 0, 0, metrics.total);
  if (!metrics.segments.length) return null;
  if (dist <= 0) return { x: metrics.segments[0].a.x, y: metrics.segments[0].a.y };
  if (dist >= metrics.total) {
    const last = metrics.segments[metrics.segments.length - 1];
    return { x: last.b.x, y: last.b.y };
  }
  for (const seg of metrics.segments) {
    if (dist <= seg.end + 0.001) {
      const t = (dist - seg.start) / seg.len;
      return {
        x: seg.a.x + (seg.b.x - seg.a.x) * t,
        y: seg.a.y + (seg.b.y - seg.a.y) * t
      };
    }
  }
  const last = metrics.segments[metrics.segments.length - 1];
  return { x: last.b.x, y: last.b.y };
}

function collectConnectorPolylineRange(points, distFrom, distTo) {
  const metrics = getConnectorPathMetrics(points);
  const from = clamp(Number(distFrom) || 0, 0, metrics.total);
  const to = clamp(Number(distTo) || 0, from, metrics.total);
  if (to - from < 0.5 || !metrics.segments.length) return [];
  const out = [pointAtConnectorDistance(points, from)];
  metrics.segments.forEach((seg) => {
    if (seg.end > from + 0.5 && seg.start < to - 0.5 && seg.end <= to + 0.5) {
      const vertex = { x: seg.b.x, y: seg.b.y };
      const prev = out[out.length - 1];
      if (!prev || Math.abs(prev.x - vertex.x) > 0.001 || Math.abs(prev.y - vertex.y) > 0.001) {
        out.push(vertex);
      }
    }
  });
  const endPoint = pointAtConnectorDistance(points, to);
  const prev = out[out.length - 1];
  if (!prev || Math.abs(prev.x - endPoint.x) > 0.001 || Math.abs(prev.y - endPoint.y) > 0.001) {
    out.push(endPoint);
  }
  return out.length >= 2 ? out : [];
}

function splitConnectorPathForLabel(points, centerDistance, gapWidth) {
  const metrics = getConnectorPathMetrics(points);
  if (!metrics.total || gapWidth <= 0) return { segments: [{ points: points.map(cloneConnectorPoint) }], centerPoint: pointAtConnectorDistance(points, centerDistance) };
  const gapHalf = Math.max(4, gapWidth / 2);
  const center = clamp(Number(centerDistance) || 0, gapHalf, Math.max(gapHalf, metrics.total - gapHalf));
  const before = collectConnectorPolylineRange(points, 0, center - gapHalf);
  const after = collectConnectorPolylineRange(points, center + gapHalf, metrics.total);
  const segments = [];
  if (before.length >= 2) segments.push({ points: before });
  if (after.length >= 2) segments.push({ points: after });
  if (!segments.length) segments.push({ points: points.map(cloneConnectorPoint) });
  return { segments, centerPoint: pointAtConnectorDistance(points, center) };
}

function normalizeConnectorLabelOffset(offset, metrics, gapHalf) {
  if (!metrics.total) return 0.5;
  const margin = Math.min(0.49, (gapHalf + 2) / metrics.total);
  return clamp(Number(offset) || 0.5, margin, 1 - margin);
}

function buildConnectorLabelLayout(points, conn) {
  const text = String(conn?.labelText || "");
  if (!text) return null;
  const labelStyle = getConnectorLabelStyle(conn);
  const metrics = getConnectorPathMetrics(points);
  const textWidth = measureConnectorLabelText(text, labelStyle);
  const gapWidth = metrics.total
    ? Math.min(textWidth + CONNECTOR_LABEL_GAP_PAD, Math.max(12, metrics.total * 0.92))
    : (textWidth + CONNECTOR_LABEL_GAP_PAD);
  const gapHalf = gapWidth / 2;
  const offset = normalizeConnectorLabelOffset(conn.labelOffset, metrics, gapHalf);
  if (conn.labelOffset !== offset) conn.labelOffset = offset;
  const centerDistance = offset * metrics.total;
  const split = splitConnectorPathForLabel(points, centerDistance, gapWidth);
  return {
    text,
    textWidth,
    gapWidth,
    offset,
    labelStyle,
    centerPoint: split.centerPoint,
    segments: split.segments
  };
}

function projectPointOntoConnectorPath(points, x, y) {
  const metrics = getConnectorPathMetrics(points);
  if (!metrics.segments.length) return { x, y, offset: 0.5, distance: 0 };
  let best = { x, y, offset: 0.5, distance: Infinity };
  metrics.segments.forEach((seg) => {
    const dx = seg.b.x - seg.a.x;
    const dy = seg.b.y - seg.a.y;
    const denom = (dx * dx) + (dy * dy) || 1;
    const t = clamp((((x - seg.a.x) * dx) + ((y - seg.a.y) * dy)) / denom, 0, 1);
    const px = seg.a.x + (dx * t);
    const py = seg.a.y + (dy * t);
    const distance = Math.hypot(x - px, y - py);
    if (distance < best.distance) {
      best = {
        x: px,
        y: py,
        offset: metrics.total ? (seg.start + (seg.len * t)) / metrics.total : 0.5,
        distance
      };
    }
  });
  return best;
}

function appendConnectorLabelOverlay(conn, layout, isSelected) {
  if (!conn || !layout?.centerPoint) return null;
  const isEditing = activeConnectorLabelEditId === conn.id;
  const wrap = document.createElement("div");
  wrap.className = `conn-label${isSelected ? " selected" : ""}${isEditing ? " editing" : ""}`;
  wrap.dataset.connectorId = conn.id;
  wrap.style.left = `${layout.centerPoint.x}px`;
  wrap.style.top = `${layout.centerPoint.y}px`;
  wrap.style.zIndex = String(getConnectorOverlayHandleZIndex() + 2);
  const labelStyle = layout.labelStyle || getConnectorLabelStyle(conn);
  const textEl = document.createElement("span");
  textEl.className = "conn-label-text";
  textEl.textContent = layout.text;
  applyConnectorLabelStyle(textEl, conn, labelStyle);
  if (isEditing) {
    textEl.contentEditable = "true";
    textEl.dataset.editingBackup = String(conn.labelText || "");
  }
  const dragHandle = document.createElement("div");
  dragHandle.className = "conn-label-drag";
  dragHandle.title = "Переместить подпись";
  wrap.appendChild(dragHandle);
  wrap.appendChild(textEl);
  textEl.addEventListener("dblclick", (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isWorkspaceReadOnly()) return;
    startConnectorLabelEditing(conn.id);
  });
  if (isEditing) {
    textEl.addEventListener("input", () => {
      if (activeConnectorLabelEditId !== conn.id) return;
      conn.labelText = String(textEl.textContent || "").replace(/\r/g, "");
    });
    textEl.addEventListener("blur", () => {
      if (activeConnectorLabelEditId === conn.id) finishConnectorLabelEditing();
    });
    textEl.addEventListener("keydown", (event) => {
      if (activeConnectorLabelEditId !== conn.id) return;
      event.stopPropagation();
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        finishConnectorLabelEditing();
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        finishConnectorLabelEditing({ revert: true });
      }
    });
    requestAnimationFrame(() => {
      if (activeConnectorLabelEditId !== conn.id || !textEl.isConnected) return;
      textEl.focus();
      placeCaretAtEnd(textEl);
    });
  }
  wrap.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    if (isWorkspaceReadOnly()) return;
    if (isEditing) return;
    if (selectedConnector !== conn.id) {
      selectConnector(conn.id);
      return;
    }
    if (!isSelected) return;
    if (event.button !== 0) return;
    if (event.target.closest(".conn-label-text")) return;
    event.preventDefault();
    const connId = conn.id;
    let dragState = { x: event.clientX, y: event.clientY, active: false };
    const move = (ev) => {
      const live = connectors.find((item) => item.id === connId);
      if (!live) return;
      if (!dragState.active) {
        const dx = ev.clientX - dragState.x;
        const dy = ev.clientY - dragState.y;
        if (Math.hypot(dx, dy) < 4) return;
        dragState.active = true;
      }
      const state = getConnectorPathState(live);
      if (!state) return;
      const pt = getDesktopPoint(ev.clientX, ev.clientY);
      const proj = projectPointOntoConnectorPath(state.points, pt.x, pt.y);
      live.labelOffset = proj.offset;
      renderConnectors();
    };
    const up = () => {
      dragState = null;
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      saveLayout();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    if (event.pointerId != null && wrap.setPointerCapture) {
      try { wrap.setPointerCapture(event.pointerId); } catch {}
    }
  });
  appendToDesktop(wrap);
  return wrap;
}

function startConnectorLabelEditing(connId) {
  if (!canEditCurrentDocument()) return false;
  const conn = connectors.find((item) => item.id === connId);
  if (!conn || !String(conn.labelText || "").length) return false;
  if (activeConnectorLabelEditId && activeConnectorLabelEditId !== connId) {
    finishConnectorLabelEditing();
  }
  if (selectedConnector !== connId) selectConnector(connId);
  activeConnectorLabelEditId = connId;
  renderConnectors();
  return true;
}

function finishConnectorLabelEditing({ revert = false } = {}) {
  const connId = activeConnectorLabelEditId;
  if (!connId) return;
  const conn = connectors.find((item) => item.id === connId);
  const textEl = desktop.querySelector(`.conn-label[data-connector-id="${connId}"] .conn-label-text`);
  activeConnectorLabelEditId = null;
  if (conn) {
    if (revert) {
      conn.labelText = textEl?.dataset?.editingBackup || "";
    } else {
      const next = String(textEl?.textContent || conn.labelText || "").replace(/\r/g, "");
      if (next.trim()) conn.labelText = next;
      else {
        delete conn.labelText;
        delete conn.labelOffset;
      }
    }
    if (!String(conn.labelText || "").trim()) {
      delete conn.labelText;
      delete conn.labelOffset;
    }
  }
  renderConnectors();
  saveLayout();
}

function getConnectorSegments(points) {
  const segments = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    if (pointsEqual(points[i], points[i + 1])) continue;
    segments.push({ index: i, a: points[i], b: points[i + 1] });
  }
  return segments;
}

function updateConnectorRoutePointsFromSegmentDrag(conn, segmentIndex, cursorPoint) {
  const state = getConnectorPathState(conn);
  if (!state || !state.orthogonal) return segmentIndex;
  const fullPoints = state.points.map(cloneConnectorPoint);
  const internal = fullPoints.slice(1, -1).map(cloneConnectorPoint);
  const a = fullPoints[segmentIndex];
  const b = fullPoints[segmentIndex + 1];
  if (!a || !b) return segmentIndex;
  const startInternal = segmentIndex > 0;
  const endInternal = segmentIndex < fullPoints.length - 2;
  const horizontal = Math.abs(a.y - b.y) < 0.5;
  let activeSegmentIndex = segmentIndex;
  if (horizontal) {
    const nextY = cursorPoint.y;
    if (startInternal && endInternal) {
      internal[segmentIndex - 1].y = nextY;
      internal[segmentIndex].y = nextY;
    } else if (startInternal) {
      internal[segmentIndex - 1].y = nextY;
      internal.splice(segmentIndex, 0, { x: b.x, y: nextY });
    } else if (endInternal) {
      internal[segmentIndex].y = nextY;
      internal.splice(segmentIndex, 0, { x: a.x, y: nextY });
      activeSegmentIndex = segmentIndex + 1;
    } else {
      internal.splice(0, 0, { x: a.x, y: nextY }, { x: b.x, y: nextY });
      activeSegmentIndex = 1;
    }
  } else {
    const nextX = cursorPoint.x;
    if (startInternal && endInternal) {
      internal[segmentIndex - 1].x = nextX;
      internal[segmentIndex].x = nextX;
    } else if (startInternal) {
      internal[segmentIndex - 1].x = nextX;
      internal.splice(segmentIndex, 0, { x: nextX, y: b.y });
    } else if (endInternal) {
      internal[segmentIndex].x = nextX;
      internal.splice(segmentIndex, 0, { x: nextX, y: a.y });
      activeSegmentIndex = segmentIndex + 1;
    } else {
      internal.splice(0, 0, { x: nextX, y: a.y }, { x: nextX, y: b.y });
      activeSegmentIndex = 1;
    }
  }
  conn.routePoints = normalizeConnectorRoutePoints(internal);
  return activeSegmentIndex;
}

function getOffsetPointFromShapeCenter(node, otherPoint, offsetPx = 5, preferredDirection = null) {
  if (preferredDirection) {
    const directedPoint = getOffsetPointFromShapeCenterDirected(node, preferredDirection, offsetPx);
    if (directedPoint) return directedPoint;
  }
  const { left, top, width: w, height: h } = getConnectableBounds(node);
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

function getPreferredCenterExitDirection(node, otherPoint, routeStyle = "straight") {
  const style = normalizeConnectorRouteStyle(routeStyle);
  const { left, top, width: w, height: h } = getConnectableBounds(node);
  const cx = left + w / 2;
  const cy = top + h / 2;
  const dx = otherPoint.x - cx;
  const dy = otherPoint.y - cy;
  if (style !== "straight" && (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5)) {
    if (Math.abs(dx) > Math.abs(dy)) return dx >= 0 ? "e" : "w";
    return dy >= 0 ? "s" : "n";
  }
  if (style === "orthogonal-horizontal") return otherPoint.x >= cx ? "e" : "w";
  if (style === "orthogonal-vertical") return otherPoint.y >= cy ? "s" : "n";
  return null;
}

function getOffsetPointFromShapeCenterDirected(node, direction, offsetPx = 5) {
  const { left, top, width: w, height: h } = getConnectableBounds(node);
  const g = Math.max(0, Number(offsetPx) || 0);
  if (direction === "n") return { x: left + w / 2, y: top - g };
  if (direction === "s") return { x: left + w / 2, y: top + h + g };
  if (direction === "w") return { x: left - g, y: top + h / 2 };
  if (direction === "e") return { x: left + w + g, y: top + h / 2 };
  return null;
}

function getConnectorAttachmentPoint(end, otherPoint) {
  if (!end) return { x: 0, y: 0 };
  const cellEl = getCellElementForConnectorEnd(end);
  if (cellEl) return getCellAnchorPos(cellEl, end.anchor || "c");
  const node = getConnectableFromEnd(end);
  if (!node) return getConnectorPoint(end);
  if ((end.anchor || "c") === "edge") return getConnectorPoint(end);
  return getOffsetPointFromShapeCenter(node, otherPoint || getConnectorPoint(end), 0);
}

function getOffsetPointFromEdge(edgePoint, otherPoint, gapPx = 5) {
  const g = Math.max(0, Number(gapPx) || 0);
  const vx = (otherPoint.x - edgePoint.x);
  const vy = (otherPoint.y - edgePoint.y);
  const len = Math.sqrt(vx * vx + vy * vy) || 1;
  return { x: edgePoint.x + (vx / len) * g, y: edgePoint.y + (vy / len) * g };
}

function getEdgeAnchorData(node, x, y) {
  const { left, top, width: w, height: h } = getConnectableBounds(node);
  const nx = clamp(x, left, left + w);
  const ny = clamp(y, top, top + h);
  const rx = w ? (nx - left) / w : 0.5;
  const ry = h ? (ny - top) / h : 0.5;
  return { rx: clamp(rx, 0, 1), ry: clamp(ry, 0, 1) };
}

function isBpConnectableMember(shape) {
  const role = shape?.dataset?.bpRole;
  return role === "stage" || role === "task" || role === "base";
}

function getConnectorEndpointIdForShape(shape) {
  if (!shape) return "";
  if (isBpConnectableMember(shape)) return shape.dataset.connId || "";
  const groupId = getShapeGroupId(shape);
  if (groupId) return getGroupConnId(groupId);
  return shape.dataset.connId || "";
}

function getConnectorEndpointNodeForShape(shape) {
  if (!shape) return null;
  if (isBpConnectableMember(shape) || !getShapeGroupId(shape)) return shape;
  return getConnectableById(getGroupConnId(getShapeGroupId(shape)));
}

function elementsFromPointForConnectorDrop(clientX, clientY) {
  const stack = typeof document.elementsFromPoint === "function"
    ? document.elementsFromPoint(clientX, clientY)
    : [document.elementFromPoint(clientX, clientY)];
  return stack.filter((node) => {
    if (!node) return false;
    if (node === connectorDragOverlay) return false;
    if (node.classList && node.classList.contains("conn-overlay-handle")) return false;
    return true;
  });
}

function getDropAnchorForShape(node, x, y, opts = {}) {
  const { left, top, width: w, height: h } = getConnectableBounds(node);
  const nx = clamp(x, left, left + w);
  const ny = clamp(y, top, top + h);
  if (opts.forceTopEdge) {
    const edge = getEdgeAnchorData(node, x, top);
    return { anchor: "edge", rx: edge.rx, ry: 0 };
  }
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

function getDropAnchorForCell(cellEl, x, y) {
  const bounds = getCellBounds(cellEl);
  if (!bounds) return { anchor: "c" };
  const nx = clamp(x, bounds.left, bounds.left + bounds.width);
  const ny = clamp(y, bounds.top, bounds.top + bounds.height);
  const distances = [
    { anchor: "n", distance: Math.abs(ny - bounds.top) },
    { anchor: "e", distance: Math.abs((bounds.left + bounds.width) - nx) },
    { anchor: "s", distance: Math.abs((bounds.top + bounds.height) - ny) },
    { anchor: "w", distance: Math.abs(nx - bounds.left) }
  ];
  distances.sort((a, b) => a.distance - b.distance);
  return { anchor: distances[0]?.anchor || "c" };
}

function getDropConnectionForClientPoint(clientX, clientY, skipNodeId = "", opts = {}) {
  const stack = elementsFromPointForConnectorDrop(clientX, clientY);
  const pt = getDesktopPoint(clientX, clientY);
  const dropX = pt.x;
  const dropY = pt.y;
  const preferCells = !!opts.preferCells;
  if (preferCells) {
    const targetCell = stack.find((node) => node && node.tagName === "TD" && node.closest && node.closest(".shape-table-grid"));
    const tableShape = targetCell && targetCell.closest ? targetCell.closest(".shape.shape-table") : null;
    const targetConnId = tableShape ? (tableShape.dataset.connId || "") : "";
    const cellRef = targetCell ? normalizeCellRef({ r: targetCell.dataset.r, c: targetCell.dataset.c }) : null;
    if (tableShape && targetConnId && cellRef) {
      return {
        nodeId: targetConnId,
        anchorData: {
          ...getDropAnchorForCell(targetCell, dropX, dropY),
          cell: cellRef
        }
      };
    }
  }
  const target = stack.find((node) => node) || null;
  const targetShape = target && target.closest ? target.closest(".shape, .sheet-window") : null;
  let targetConnectable = null;
  let targetConnId = "";
  if (targetShape) {
    targetConnId = getConnectorEndpointIdForShape(targetShape);
    if (targetConnId && (!skipNodeId || targetConnId !== skipNodeId)) {
      targetConnectable = getConnectorEndpointNodeForShape(targetShape);
    }
  }
  if (!targetConnectable) {
    const nearby = findNearbyConnectableForPoint(dropX, dropY, skipNodeId);
    if (nearby) {
      targetConnId = nearby.nodeId;
      targetConnectable = nearby.node;
    }
  }
  if (!targetConnectable || !targetConnId) return null;
  const anchorData = getDropAnchorForShape(targetConnectable, dropX, dropY, opts);
  return {
    nodeId: targetConnId,
    anchorData
  };
}

function distancePointToBounds(x, y, bounds) {
  const dx = x < bounds.left ? bounds.left - x : (x > bounds.left + bounds.width ? x - (bounds.left + bounds.width) : 0);
  const dy = y < bounds.top ? bounds.top - y : (y > bounds.top + bounds.height ? y - (bounds.top + bounds.height) : 0);
  return Math.sqrt(dx * dx + dy * dy);
}

function findNearbyConnectableForPoint(x, y, skipNodeId = "") {
  const threshold = 28;
  let best = null;
  const seen = new Set();
  desktop.querySelectorAll(".shape, .sheet-window").forEach((shape) => {
    if (shape.classList.contains("shape") && shape.dataset.shapeType === "shape-line") return;
    const nodeId = getConnectorEndpointIdForShape(shape);
    if (!nodeId || seen.has(nodeId) || (skipNodeId && nodeId === skipNodeId)) return;
    seen.add(nodeId);
    const node = getConnectorEndpointNodeForShape(shape);
    if (!node) return;
    const bounds = getConnectableBounds(node);
    const distance = distancePointToBounds(x, y, bounds);
    if (distance > threshold) return;
    if (!best || distance < best.distance) best = { nodeId, node, distance };
  });
  return best;
}

function getDraftTargetPreview(connectorState) {
  if (!connectorState) return null;
  const preview = getDropConnectionForClientPoint(
    connectorState.clientX,
    connectorState.clientY,
    connectorState.fromNodeId || "",
    { preferCells: !!connectorState.preferCells }
  );
  if (!preview) return null;
  const targetNode = getConnectableById(preview.nodeId);
  if (!targetNode) return null;
  const fromShape = getConnectableById(connectorState.fromNodeId || "");
  const sourceEnd = {
    nodeId: connectorState.fromNodeId,
    anchor: connectorState.fromAnchor,
    ...(connectorState.fromCell ? { cell: connectorState.fromCell } : {})
  };
  const sourcePoint = fromShape
    ? getConnectorAttachmentPoint(sourceEnd, { x: connectorState.x2, y: connectorState.y2 })
    : { x: connectorState.x2, y: connectorState.y2 };
  const previewEnd = preview.anchorData.anchor === "edge"
    ? { nodeId: preview.nodeId, anchor: "edge", rx: preview.anchorData.rx, ry: preview.anchorData.ry }
    : { nodeId: preview.nodeId, anchor: preview.anchorData.anchor, ...(preview.anchorData.cell ? { cell: preview.anchorData.cell } : {}) };
  return {
    nodeId: preview.nodeId,
    point: getConnectorAttachmentPoint(previewEnd, sourcePoint)
  };
}

function appendConnectorOverlayHandle(point, opts = {}) {
  if (!point) return null;
  const handle = document.createElement("div");
  handle.className = "conn-overlay-handle";
  if (opts.preview) handle.classList.add("preview");
  if (opts.segment) handle.classList.add("segment");
  handle.style.left = `${point.x}px`;
  handle.style.top = `${point.y}px`;
  handle.style.zIndex = String(getConnectorOverlayHandleZIndex());
  if (opts.connectorId) handle.dataset.connectorId = opts.connectorId;
  if (opts.side) handle.dataset.side = opts.side;
  if (opts.segmentIndex != null) handle.dataset.segmentIndex = String(opts.segmentIndex);
  if (typeof opts.onPointerDown === "function") handle.addEventListener("pointerdown", opts.onPointerDown);
  appendToDesktop(handle);
  return handle;
}

function markerPathForShape(shape) {
  if (shape === "triangle") return "M0,1 L10,5 L0,9 z";
  if (shape === "open") return "M0,1 L10,5 L0,9";
  if (shape === "block") return "M0,1 H6 L10,5 L6,9 H0 Z";
  return "M0,0 L10,5 L0,10 z";
}

function layoutConnectorPoints(node) {
  const box = node.querySelector(":scope > .conn-points");
  if (!box) return;
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  const arrowOffset = getConnArrowOffsetWorld(node);
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
    n: [w / 2, -arrowOffset, "↑"],
    e: [w + arrowOffset, h / 2, "→"],
    s: [w / 2, h + arrowOffset, "↓"],
    w: [-arrowOffset, h / 2, "←"]
  };
  box.querySelectorAll(".conn-arrow").forEach((a) => {
    const v = arrows[a.dataset.anchor];
    if (!v) return;
    a.style.left = `${v[0]}px`;
    a.style.top = `${v[1]}px`;
    a.textContent = v[2];
  });
}

function syncConnectorDraftSvgSize(svg) {
  if (!svg) return;
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  const h = window.innerHeight || document.documentElement.clientHeight || 0;
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
}

function ensureConnectorDraftSvg() {
  if (connectorDraftSvg?.isConnected) return connectorDraftSvg;
  connectorDraftSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  connectorDraftSvg.id = "connectorDraftSvg";
  connectorDraftSvg.setAttribute("class", "conn-draft-overlay");
  connectorDraftSvg.style.pointerEvents = "none";
  document.body.appendChild(connectorDraftSvg);
  return connectorDraftSvg;
}

function clearConnectorDraftSvg() {
  if (connectorDraftSvg?.isConnected) connectorDraftSvg.remove();
  connectorDraftSvg = null;
}

function clearConnectorDraftPreviewHandles() {
  desktop.querySelectorAll(".conn-overlay-handle.preview").forEach((node) => node.remove());
}

function refreshConnectorDraftUi() {
  updateConnectorDraftTargetGuides();
  clearConnectorDraftPreviewHandles();
  updateAllTableCellConnectorGuides();
  renderConnectorDraftPreview();
}

function renderConnectorDraftPreview() {
  if (!connectorDraft) {
    clearConnectorDraftSvg();
    return;
  }
  const fromShape = getConnectableById(connectorDraft.fromNodeId || "");
  if (!fromShape) {
    clearConnectorDraftSvg();
    return;
  }
  const fromEnd = {
    nodeId: connectorDraft.fromNodeId,
    anchor: connectorDraft.fromAnchor || "c",
    ...(connectorDraft.fromCell ? { cell: connectorDraft.fromCell } : {})
  };
  let p1 = getConnectorPoint(fromEnd);
  if (!connectorDraft.fromCell && (connectorDraft.fromAnchor || "c") === "c") {
    p1 = getOffsetPointFromShapeCenter(
      fromShape,
      { x: connectorDraft.x2, y: connectorDraft.y2 },
      20,
      connectorDraft.fromDir || null
    );
  }
  const draftSvg = ensureConnectorDraftSvg();
  syncConnectorDraftSvgSize(draftSvg);
  draftSvg.innerHTML = "";
  const p1Client = desktopPointToClient(p1.x, p1.y);
  const p2Client = { x: connectorDraft.clientX, y: connectorDraft.clientY };
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("class", "conn-line conn-line-draft");
  line.setAttribute("d", connectorPathToSvg([p1Client, p2Client]));
  line.setAttribute("stroke", "#1f2937");
  line.setAttribute("stroke-width", "2");
  line.setAttribute("stroke-dasharray", "6 4");
  line.setAttribute("marker-start", "none");
  line.setAttribute("marker-end", "none");
  draftSvg.appendChild(line);
  const preview = getDraftTargetPreview(connectorDraft);
  if (preview) appendConnectorOverlayHandle(preview.point, { preview: true });
}

function stopConnectorDraftPointerTracking() {
  if (connectorDraftPointerMove) {
    document.removeEventListener("pointermove", connectorDraftPointerMove, true);
    connectorDraftPointerMove = null;
  }
  if (connectorDraftPointerUp) {
    document.removeEventListener("pointerup", connectorDraftPointerUp, true);
    document.removeEventListener("pointercancel", connectorDraftPointerUp, true);
    connectorDraftPointerUp = null;
  }
}

function updateConnectorDraftFromPointer(event) {
  if (!connectorDraft) return;
  const pt = getDesktopPoint(event.clientX, event.clientY);
  connectorDraft.x2 = pt.x;
  connectorDraft.y2 = pt.y;
  connectorDraft.clientX = event.clientX;
  connectorDraft.clientY = event.clientY;
  connectorDraft.preferCells = shouldPreferCellTargets(event);
  refreshConnectorDraftUi();
}

function finishConnectorDraft(event) {
  if (!connectorDraft) return;
  if (event?.pointerId != null) {
    try { document.body.releasePointerCapture(event.pointerId); } catch {}
  }
  stopConnectorDraftPointerTracking();
  if (connectorDragOverlay) connectorDragOverlay.style.display = "none";
  const dropped = getDropConnectionForClientPoint(
    event.clientX,
    event.clientY,
    connectorDraft.fromNodeId || "",
    { preferCells: shouldPreferCellTargets(event) }
  );
  if (dropped) {
    const fromEnd = {
      nodeId: connectorDraft.fromNodeId,
      anchor: connectorDraft.fromAnchor,
      ...(connectorDraft.fromCell ? { cell: connectorDraft.fromCell } : {})
    };
    const toData = dropped.anchorData;
    const toEnd = toData.anchor === "edge"
      ? { nodeId: dropped.nodeId, anchor: "edge", rx: toData.rx, ry: toData.ry }
      : { nodeId: dropped.nodeId, anchor: toData.anchor, ...(toData.cell ? { cell: toData.cell } : {}) };
    if (!connectorEndEquals(fromEnd, toEnd)) {
      connectors.push({
        id: nextConnectorId(),
        zIndex: 1,
        from: fromEnd,
        to: toEnd,
        ...{
          color: "#1f2937",
          width: 2,
          lineStyle: "solid",
          opacity: 1,
          shadow: 0,
          startArrowShape: "line",
          endArrowShape: "classic",
          routeStyle: "straight",
          routePoints: [],
          gapStart: 30,
          gapEnd: 30
        },
        ...(cloneStyleData(defaultStyles.connector) || {}),
        ...(styleClipboard && styleClipboard.type === "connector" ? cloneStyleData(styleClipboard.data) || {} : {})
      });
      saveLayout();
    }
  }
  connectorDraft = null;
  if (connectorDragOverlay) connectorDragOverlay.style.display = "none";
  renderConnectors();
}

function startConnectorDraftPointerTracking(event) {
  stopConnectorDraftPointerTracking();
  updateConnectorDraftFromPointer(event);
  connectorDraftPointerMove = (e) => updateConnectorDraftFromPointer(e);
  connectorDraftPointerUp = (e) => finishConnectorDraft(e);
  document.addEventListener("pointermove", connectorDraftPointerMove, true);
  document.addEventListener("pointerup", connectorDraftPointerUp, true);
  document.addEventListener("pointercancel", connectorDraftPointerUp, true);
  if (event.pointerId != null && document.body?.setPointerCapture) {
    try { document.body.setPointerCapture(event.pointerId); } catch {}
  }
}

function startConnectorFromPoint(shape, anchor, event, opts = {}) {
  if (!canEditCurrentDocument()) return;
  event.preventDefault();
  event.stopPropagation();
  const fromCell = normalizeCellRef(opts.cell);
  if (shape?.dataset?.shapeType === "shape-table" && !fromCell) {
    shape.__tableApi?.resetConnectorGuideLatch?.();
  }
  const fromArrow = event.currentTarget && event.currentTarget.classList && event.currentTarget.classList.contains("conn-arrow");
  const fromAnchor = fromCell ? anchor : (fromArrow ? "c" : anchor);
  const groupId = getShapeGroupId(shape);
  const useMemberEndpoint = fromArrow || fromCell || selectedShape === shape
    || isBpProcessStage(shape) || isBpProcessTask(shape) || isBpProcessAutomation(shape) || shape?.dataset?.bpRole === "base";
  const fromNodeId = useMemberEndpoint
    ? shape.dataset.connId
    : (groupId ? getGroupConnId(groupId) : shape.dataset.connId);
  const cursor = getDesktopPoint(event.clientX, event.clientY);
  connectorDraft = {
    fromNodeId,
    fromAnchor,
    fromCell,
    fromDir: fromArrow ? anchor : null,
    preferCells: shouldPreferCellTargets(event),
    x2: cursor.x,
    y2: cursor.y,
    clientX: event.clientX,
    clientY: event.clientY
  };
  if (!connectorDragOverlay) {
    connectorDragOverlay = document.createElement("div");
    connectorDragOverlay.style.position = "fixed";
    connectorDragOverlay.style.inset = "0";
    connectorDragOverlay.style.zIndex = "9998";
    connectorDragOverlay.style.cursor = "crosshair";
    connectorDragOverlay.style.background = "transparent";
    connectorDragOverlay.style.pointerEvents = "none";
    connectorDragOverlay.style.display = "none";
    document.body.appendChild(connectorDragOverlay);
  }
  connectorDragOverlay.style.display = "block";
  refreshConnectorDraftUi();
  startConnectorDraftPointerTracking(event);
}

function attachConnectorPoints(shape) {
  if (shape?.dataset?.bpRole === "base") return;
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
    ["contextmenu", "auxclick"].forEach((eventName) => {
      ar.addEventListener(eventName, (event) => {
        if (eventName === "auxclick" && event.button !== 2) return;
        suppressCellConnectorArrowBrowserMenu(event);
      });
    });
    ar.addEventListener("pointerdown", (e) => startConnectorFromPoint(shape, a, e));
    box.appendChild(ar);
  });
  shape.appendChild(box);
  layoutConnectorPoints(shape);
}

function renderConnectors() {
  updateDesktopExtent();
  updateGroupSelectionBox();
  updateConnectorDraftTargetGuides();
  updateAllTableCellConnectorGuides();
  const overlayLayer = ensureConnectorLayer();
  overlayLayer.style.zIndex = String(getConnectorOverlayLayerZIndex());
  desktop.querySelectorAll(".conn-layer-item").forEach((n) => n.remove());
  updateConnectorLayerSize();
  overlayLayer.innerHTML = "";
  desktop.querySelectorAll(".conn-overlay-handle").forEach((n) => n.remove());
  desktop.querySelectorAll(".conn-label").forEach((n) => n.remove());
  connectors.slice().sort((a, b) => {
    const az = Math.max(1, Number(a.zIndex) || 1);
    const bz = Math.max(1, Number(b.zIndex) || 1);
    if (az !== bz) return az - bz;
    return connectors.indexOf(a) - connectors.indexOf(b);
  }).forEach((c) => {
    const layer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    layer.setAttribute("class", "conn-layer conn-layer-item");
    layer.dataset.connectorId = c.id;
    layer.style.zIndex = String(getConnectorRenderZIndex(c));
    layer.innerHTML = "<defs></defs>";
    appendToDesktop(layer);
    updateConnectorLayerSize();
    const defs = layer.querySelector("defs");
    const state = getConnectorPathState(c);
    if (!state) return;
    const { p1, p2, attach1, attach2 } = state;
    const pathD = connectorPathToSvg(state.points);
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
        pStart.setAttribute("opacity", String(normalizeOpacityValue(c.opacity ?? 1)));
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
        pEnd.setAttribute("opacity", String(normalizeOpacityValue(c.opacity ?? 1)));
        if ((c.endArrowShape || "classic") === "open") pEnd.setAttribute("fill", "none");
        mEnd.appendChild(pEnd);
        defs.appendChild(mEnd);
      }
    }
    const selectFromPointer = (e) => {
      e.stopPropagation();
      selectConnector(c.id);
    };
    const hitLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hitLine.setAttribute("class", "conn-hit-line");
    hitLine.dataset.connectorId = c.id;
    hitLine.setAttribute("d", pathD);
    hitLine.setAttribute("stroke-width", String(Math.max(16, width + 14)));
    hitLine.setAttribute("stroke-linecap", "round");
    hitLine.setAttribute("stroke-linejoin", "round");
    hitLine.addEventListener("pointerdown", selectFromPointer);
    hitLine.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      if (isWorkspaceReadOnly()) return;
      if (String(c.labelText || "").length) startConnectorLabelEditing(c.id);
    });
    layer.appendChild(hitLine);

    const isConnectorSelected = selectedConnector === c.id || multiSelectedConnectorIds.has(c.id);
    const labelLayout = buildConnectorLabelLayout(state.points, c);
    const lineSegments = labelLayout?.segments || [{ points: state.points }];
    const startArrowShape = c.startArrowShape || "classic";
    const endArrowShape = c.endArrowShape || "classic";
    lineSegments.forEach((segment, segmentIndex) => {
      const segmentPoints = segment.points || [];
      const segPathD = connectorPathToSvg(segmentPoints);
      if (!segPathD) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
      line.setAttribute("class", `conn-line${isConnectorSelected ? " selected" : ""}`);
      line.dataset.connectorId = c.id;
      line.setAttribute("d", segPathD);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", String(width));
      line.setAttribute("stroke-dasharray", c.lineStyle === "dashed" ? "8 6" : "0");
      line.setAttribute("opacity", String(normalizeOpacityValue(c.opacity ?? 1)));
      line.setAttribute("stroke-linecap", c.lineStyle === "dotted" ? "round" : "butt");
      line.setAttribute("stroke-linejoin", "round");
      const shadow = Math.max(0, Number(c.shadow) || 0);
      const filters = [];
      if (isConnectorSelected) filters.push("drop-shadow(0 0 2px rgba(14,165,233,.8))");
      if (shadow) filters.push(`drop-shadow(0 ${Math.max(1, Math.round(shadow / 4))}px ${shadow}px rgba(15,23,42,.35))`);
      line.style.filter = filters.join(" ");
      const isFirst = segmentIndex === 0;
      const isLast = segmentIndex === lineSegments.length - 1;
      line.setAttribute("marker-start", isFirst && startArrowShape !== "line" ? `url(#${startMarkerId})` : "none");
      line.setAttribute("marker-end", isLast && endArrowShape !== "line" ? `url(#${endMarkerId})` : "none");
      layer.appendChild(line);
    });
    if (labelLayout) appendConnectorLabelOverlay(c, labelLayout, selectedConnector === c.id);
    if (selectedConnector === c.id) {
      ["from", "to"].forEach((side) => {
        const p = side === "from" ? p1 : p2;
        appendConnectorOverlayHandle(p, {
          connectorId: c.id,
          side,
          onPointerDown: (e) => {
          e.stopPropagation();
          const connId = e.currentTarget.dataset.connectorId;
          const dragSide = e.currentTarget.dataset.side;
          const move = (ev) => {
            const conn = connectors.find((it) => it.id === connId);
            if (!conn) return;
            const pt = getDesktopPoint(ev.clientX, ev.clientY);
            const skipId = dragSide === "from" ? ((conn.to?.nodeId || conn.to?.shapeId) || "") : ((conn.from?.nodeId || conn.from?.shapeId) || "");
            const drop = getDropConnectionForClientPoint(ev.clientX, ev.clientY, skipId, { preferCells: shouldPreferCellTargets(ev) });
            if (drop) {
              if (drop.anchorData.anchor === "edge") {
                conn[dragSide] = { nodeId: drop.nodeId, anchor: "edge", rx: drop.anchorData.rx, ry: drop.anchorData.ry };
              } else {
                conn[dragSide] = {
                  nodeId: drop.nodeId,
                  anchor: drop.anchorData.anchor || "c",
                  ...(drop.anchorData.cell ? { cell: drop.anchorData.cell } : {})
                };
              }
            } else {
              conn[dragSide] = { x: pt.x, y: pt.y };
            }
            if (isOrthogonalRouteStyle(conn.routeStyle)) conn.routePoints = [];
            renderConnectors();
          };
          const up = () => {
            document.removeEventListener("pointermove", move);
            document.removeEventListener("pointerup", up);
            saveLayout();
          };
          document.addEventListener("pointermove", move);
          document.addEventListener("pointerup", up);
          }
        });
      });
      if (state.orthogonal) {
        getConnectorSegments(state.points).forEach(({ index, a, b }) => {
          appendConnectorOverlayHandle({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, {
            connectorId: c.id,
            segment: true,
            segmentIndex: index,
            onPointerDown: (e) => {
            e.stopPropagation();
            const connId = e.currentTarget.dataset.connectorId;
            let dragSegmentIndex = Number(e.currentTarget.dataset.segmentIndex) || 0;
            const move = (ev) => {
              const conn = connectors.find((it) => it.id === connId);
              if (!conn) return;
              const pt = getDesktopPoint(ev.clientX, ev.clientY);
              dragSegmentIndex = updateConnectorRoutePointsFromSegmentDrag(conn, dragSegmentIndex, pt);
              renderConnectors();
            };
            const up = () => {
              document.removeEventListener("pointermove", move);
              document.removeEventListener("pointerup", up);
              saveLayout();
            };
            document.addEventListener("pointermove", move);
            document.addEventListener("pointerup", up);
            }
          });
        });
      }
    }
  });
  if (connectorDraft) {
    refreshConnectorDraftUi();
  } else {
    clearConnectorDraftSvg();
    clearConnectorDraftPreviewHandles();
  }
  refreshLiftedTableCellConnectorGuides();
}

function applyBpProcessMeta(node, opts = {}) {
  if (!node) return;
  if (opts.bpProcessId) node.dataset.bpProcessId = String(opts.bpProcessId);
  if (opts.bpRole) node.dataset.bpRole = String(opts.bpRole);
  if (opts.bpStageIndex != null) node.dataset.bpStageIndex = String(opts.bpStageIndex);
  if (opts.bpTaskStageIndex != null) node.dataset.bpTaskStageIndex = String(opts.bpTaskStageIndex);
  if (opts.bpTaskOrder != null) node.dataset.bpTaskOrder = String(opts.bpTaskOrder);
  if (opts.bpTaskAutoHeight != null) {
    node.dataset.bpTaskAutoHeight = opts.bpTaskAutoHeight ? "1" : "0";
  } else if (opts.bpRole === "task") {
    node.dataset.bpTaskAutoHeight = "1";
  }
  if (opts.bpTaskManualPosition != null) {
    node.dataset.bpTaskManualPosition = opts.bpTaskManualPosition ? "1" : "0";
  }
  if (opts.bpAutomationStageIndex != null) node.dataset.bpAutomationStageIndex = String(opts.bpAutomationStageIndex);
  if (opts.bpAutomationOrder != null) node.dataset.bpAutomationOrder = String(opts.bpAutomationOrder);
  if (opts.bpAutomationAutoHeight != null) {
    node.dataset.bpAutomationAutoHeight = opts.bpAutomationAutoHeight ? "1" : "0";
  } else if (opts.bpRole === "automation") {
    node.dataset.bpAutomationAutoHeight = "1";
  }
  if (opts.bpAutomationManualPosition != null) {
    node.dataset.bpAutomationManualPosition = opts.bpAutomationManualPosition ? "1" : "0";
  }
  if (opts.bpTasksHidden != null) {
    if (opts.bpTasksHidden) node.dataset.bpTasksHidden = "1";
    else delete node.dataset.bpTasksHidden;
  }
  if (opts.bpAutomationsHidden != null) {
    if (opts.bpAutomationsHidden) node.dataset.bpAutomationsHidden = "1";
    else delete node.dataset.bpAutomationsHidden;
  }
}

function getBpStages(processId) {
  const id = String(processId || "").trim();
  if (!id) return [];
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="stage"]`))
    .sort((a, b) => Number(a.dataset.bpStageIndex) - Number(b.dataset.bpStageIndex));
}

function getBpStagesByVisualOrder(processId) {
  const id = String(processId || "").trim();
  if (!id) return [];
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="stage"]`))
    .sort((a, b) => {
      const leftDiff = getElementLogicalBox(a).left - getElementLogicalBox(b).left;
      if (leftDiff !== 0) return leftDiff;
      return Number(a.dataset.bpStageIndex) - Number(b.dataset.bpStageIndex);
    });
}

function compactBpStageIndices(processId) {
  const stages = getBpStagesByVisualOrder(processId);
  const oldToNew = new Map();
  stages.forEach((node, newIndex) => {
    const oldIndex = Number(node.dataset.bpStageIndex);
    if (Number.isFinite(oldIndex)) oldToNew.set(oldIndex, newIndex);
    node.dataset.bpStageIndex = String(newIndex);
  });
  getAllBpTasksInProcess(processId).forEach((task) => {
    const old = Number(task.dataset.bpTaskStageIndex);
    if (!Number.isFinite(old) || !oldToNew.has(old)) {
      task.remove();
      return;
    }
    task.dataset.bpTaskStageIndex = String(oldToNew.get(old));
  });
  getAllBpAutomationsInProcess(processId).forEach((auto) => {
    const old = Number(auto.dataset.bpAutomationStageIndex);
    if (!Number.isFinite(old) || !oldToNew.has(old)) {
      auto.remove();
      return;
    }
    auto.dataset.bpAutomationStageIndex = String(oldToNew.get(old));
  });
  return stages;
}

/** Align bpStageIndex / task stage refs with left-to-right visual order (0..n-1). */
function reindexBpProcessStages(processId, orderedStages = null) {
  return compactBpStageIndices(processId);
}

function getBpStageRowTop(processId) {
  const stages = getBpStages(processId);
  if (!stages.length) return 0;
  return stages.reduce((min, stage) => {
    const top = Number.isFinite(parseFloat(stage.style.top))
      ? parseFloat(stage.style.top)
      : getElementLogicalBox(stage).top;
    return Math.min(min, top);
  }, Infinity);
}

function repairBpProcessStageOrder(processId) {
  const id = String(processId || "").trim();
  if (!id) return;
  compactBpStageIndices(id);
  const stages = getBpStages(id);
  if (!stages.length) {
    layoutBpProcessBase(id);
    return;
  }
  relayoutBpStagesAfter(id, 1);
  layoutAllBpTasksInProcess(id);
  layoutAllBpAutomationsInProcess(id);
}

function getBpBase(processId) {
  return desktop.querySelector(`.shape[data-bp-process-id="${processId}"][data-bp-role="base"]`);
}

function getBpStageLeftAfter(prevNode) {
  if (!prevNode) return 0;
  const box = getElementLogicalBox(prevNode);
  return box.left + box.width - getChevronInsetDepthPx(prevNode) + BP_STAGE_GAP;
}

function getBpStageStride(width = BP_STAGE_WIDTH, inset = BP_CHEVRON_INSET_PX) {
  return width - inset + BP_STAGE_GAP;
}

function getBpStagesSpan(stageCount, width = BP_STAGE_WIDTH, inset = BP_CHEVRON_INSET_PX) {
  const count = Math.max(1, Number(stageCount) || 1);
  return width + (count - 1) * getBpStageStride(width, inset);
}

function relayoutAllBpProcesses() {
  const processIds = new Set();
  desktop.querySelectorAll(".shape[data-bp-process-id][data-bp-role='stage'], .shape[data-bp-process-id][data-bp-role='task'], .shape[data-bp-process-id][data-bp-role='automation']").forEach((node) => {
    if (node.dataset.bpProcessId) processIds.add(node.dataset.bpProcessId);
  });
  processIds.forEach((processId) => relayoutBpStagesAfter(processId, 1));
  processIds.forEach((processId) => layoutAllBpTasksInProcess(processId));
  processIds.forEach((processId) => layoutAllBpAutomationsInProcess(processId));
  syncAllBpProcessSectionToggles();
}

function layoutBpProcessBase(processId) {
  const base = getBpBase(processId);
  const stages = getBpStages(processId);
  if (!base || !stages.length) return;
  const first = stages[0];
  const last = stages[stages.length - 1];
  const left = first.offsetLeft - BP_BASE_PAD_X;
  const top = first.offsetTop - BP_BASE_PAD_Y;
  const width = (last.offsetLeft + last.offsetWidth) - first.offsetLeft + BP_BASE_PAD_X * 2;
  const height = first.offsetHeight + BP_BASE_PAD_Y * 2;
  setNodePosition(base, left, top);
  base.style.width = `${Math.max(BP_STAGE_WIDTH, width)}px`;
  base.style.height = `${height}px`;
  renderShapeVisual(base);
  const minStageZ = Math.min(...stages.map((node) => Number(node.style.zIndex) || 0));
  base.style.zIndex = String(Math.max(1, minStageZ - 1));
  layoutConnectorPoints(base);
}

function isBpProcessStage(node) {
  return node?.dataset?.bpRole === "stage" && !!node?.dataset?.bpProcessId;
}

function isBpProcessTask(node) {
  return node?.dataset?.bpRole === "task" && !!node?.dataset?.bpProcessId;
}

function isBpProcessMember(node) {
  return !!node?.dataset?.bpProcessId && (
    node.dataset.bpRole === "stage"
    || node.dataset.bpRole === "task"
    || node.dataset.bpRole === "automation"
    || node.dataset.bpRole === "base"
  );
}

function isBpProcessGroupId(groupId) {
  const members = getGroupMembers(groupId);
  return members.length > 0 && members.every((node) => !!node.dataset.bpProcessId);
}

function getBpStageWidth(stageNode) {
  const box = getElementLogicalBox(stageNode);
  return Math.max(40, box.width || parseFloat(stageNode?.style?.width) || BP_STAGE_WIDTH);
}

function getBpStageBodyWidth(stageNode) {
  const width = getBpStageWidth(stageNode);
  if (!stageNode || normalizeShapeVariant(stageNode.dataset?.shapeVariant) !== "chevron") return width;
  return Math.max(40, width - getChevronInsetDepthPx(stageNode));
}

function getBpTaskLeftForStage(stageNode) {
  const box = getElementLogicalBox(stageNode);
  return box.left + BP_TASK_OFFSET_X;
}

function getBpTaskWidthForStage(stageNode) {
  return getBpStageBodyWidth(stageNode);
}

/**
 * Automation aligns to the chevron outline:
 * - left tip → outer-left corner of the stage (bbox left)
 * - right tip → top-right shoulder (where the stage tip begins), not the tip itself
 */
function getBpAutomationLeftForStage(stageNode) {
  const box = getElementLogicalBox(stageNode);
  return box.left;
}

function getBpAutomationWidthForStage(stageNode) {
  return getBpStageBodyWidth(stageNode);
}

function getBpStageForIndex(processId, stageIndex) {
  const idx = Number(stageIndex);
  return getBpStages(processId).find((node) => Number(node.dataset.bpStageIndex) === idx) || null;
}

function getBpTasksForStage(processId, stageIndex) {
  const id = String(processId || "").trim();
  if (!id) return [];
  const idx = Number(stageIndex);
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="task"]`))
    .filter((node) => Number(node.dataset.bpTaskStageIndex) === idx);
}

function getBpStageForTask(taskNode) {
  if (!isBpProcessTask(taskNode)) return null;
  const processId = taskNode.dataset.bpProcessId;
  const stageIndex = Number(taskNode.dataset.bpTaskStageIndex);
  return getBpStages(processId).find((node) => Number(node.dataset.bpStageIndex) === stageIndex) || null;
}

let bpStageDropHighlightNode = null;
let bpStageDropHighlightRestoreZ = null;

function clearBpTaskReassignInProcess(processId, exceptNode = null) {
  const id = String(processId || "").trim();
  if (!id) return;
  document.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="task"][data-bp-task-reassign-ready="1"]`).forEach((task) => {
    if (task !== exceptNode) delete task.dataset.bpTaskReassignReady;
  });
}

function isBpReassignSessionActive(processId) {
  const id = String(processId || "").trim();
  if (!id) return false;
  return !!(
    document.querySelector(`.shape[data-bp-process-id="${id}"][data-bp-role="task"][data-bp-task-reassign-ready="1"]`)
    || document.querySelector(`.shape[data-bp-process-id="${id}"][data-bp-role="automation"][data-bp-automation-reassign-ready="1"]`)
  );
}

function armBpTaskReassign(taskNode) {
  if (!isBpProcessTask(taskNode)) return;
  clearBpTaskReassignInProcess(taskNode.dataset.bpProcessId, taskNode);
  clearBpAutomationReassignInProcess(taskNode.dataset.bpProcessId);
  taskNode.dataset.bpTaskReassignReady = "1";
}

function setBpStageDropHighlight(stageNode) {
  if (bpStageDropHighlightNode === stageNode) return;
  if (bpStageDropHighlightNode) {
    bpStageDropHighlightNode.classList.remove("bp-stage-drop-target");
    if (bpStageDropHighlightRestoreZ != null) {
      bpStageDropHighlightNode.style.zIndex = bpStageDropHighlightRestoreZ;
      bpStageDropHighlightRestoreZ = null;
    }
  }
  bpStageDropHighlightNode = stageNode || null;
  if (!bpStageDropHighlightNode) return;
  bpStageDropHighlightRestoreZ = bpStageDropHighlightNode.style.zIndex;
  bpStageDropHighlightNode.classList.add("bp-stage-drop-target");
  const processId = bpStageDropHighlightNode.dataset.bpProcessId;
  const peers = processId ? getBpStages(processId) : [bpStageDropHighlightNode];
  const peerMaxZ = peers.reduce((max, node) => Math.max(max, Number(node.style.zIndex) || 0), 0);
  bpStageDropHighlightNode.style.zIndex = String(Math.max(peerMaxZ, Number(zCounter) || 0) + 1);
}

function clearBpStageDropHighlight() {
  setBpStageDropHighlight(null);
  bpStageDropHighlightRestoreZ = null;
}

function findBpProcessStageAtClientPoint(clientX, clientY, processId, opts = {}) {
  const id = String(processId || "").trim();
  if (!id) return null;
  const ignoreNode = opts.ignoreNode || null;
  const columnSnap = opts.columnSnap === true;
  const stack = typeof document.elementsFromPoint === "function"
    ? document.elementsFromPoint(clientX, clientY)
    : [document.elementFromPoint(clientX, clientY)];
  for (const el of stack) {
    if (!el || el === ignoreNode || ignoreNode?.contains?.(el)) continue;
    const stage = el.closest?.(`.shape[data-bp-process-id="${id}"][data-bp-role="stage"]`);
    if (stage && stage !== ignoreNode) return stage;
  }
  const pt = getDesktopPoint(clientX, clientY);
  const stages = getBpStages(id);
  if (!stages.length) return null;
  const sorted = [...stages].sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0));
  if (columnSnap) {
    for (const stage of sorted) {
      const box = getElementLogicalBox(stage);
      if (pt.x >= box.left && pt.x <= box.right) return stage;
    }
    return null;
  }
  const padY = 16;
  for (const stage of sorted) {
    const box = getElementLogicalBox(stage);
    if (pt.x >= box.left && pt.x <= box.right && pt.y >= box.top && pt.y <= box.bottom + padY) return stage;
  }
  return null;
}

function renormalizeBpTaskOrdersForStage(processId, stageIndex, excludeTask = null) {
  const tasks = getBpTasksForStage(processId, stageIndex)
    .filter((task) => task !== excludeTask)
    .sort((a, b) => (Number(a.dataset.bpTaskOrder) || 0) - (Number(b.dataset.bpTaskOrder) || 0));
  tasks.forEach((task, index) => {
    task.dataset.bpTaskOrder = String(index);
    if (task.dataset.bpTaskManualPosition === "1") delete task.dataset.bpTaskManualPosition;
  });
}

function reassignBpTaskToStage(taskNode, targetStageNode) {
  if (!taskNode || !targetStageNode || !isBpProcessTask(taskNode) || !isBpProcessStage(targetStageNode)) return false;
  const processId = taskNode.dataset.bpProcessId;
  if (processId !== targetStageNode.dataset.bpProcessId) return false;
  const oldStageIndex = Number(taskNode.dataset.bpTaskStageIndex);
  const newStageIndex = Number(targetStageNode.dataset.bpStageIndex);
  if (oldStageIndex === newStageIndex) {
    delete taskNode.dataset.bpTaskManualPosition;
    layoutAllBpTasksInProcess(processId);
    return false;
  }
  renormalizeBpTaskOrdersForStage(processId, oldStageIndex, taskNode);
  const newOrder = getBpTasksForStage(processId, newStageIndex).filter((task) => task !== taskNode).length;
  taskNode.dataset.bpTaskStageIndex = String(newStageIndex);
  taskNode.dataset.bpTaskOrder = String(newOrder);
  delete taskNode.dataset.bpTaskManualPosition;
  layoutAllBpTasksInProcess(processId);
  return true;
}

function getAllBpTasksInProcess(processId) {
  const id = String(processId || "").trim();
  if (!id) return [];
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="task"]`))
    .sort((a, b) => {
      const stageA = Number(a.dataset.bpTaskStageIndex) || 0;
      const stageB = Number(b.dataset.bpTaskStageIndex) || 0;
      if (stageA !== stageB) return stageA - stageB;
      const orderA = Number(a.dataset.bpTaskOrder) || 0;
      const orderB = Number(b.dataset.bpTaskOrder) || 0;
      if (orderA !== orderB) return orderA - orderB;
      return String(a.dataset.shapeId || "").localeCompare(String(b.dataset.shapeId || ""));
    });
}

function getBpTaskHeight(taskNode) {
  const styleH = parseFloat(taskNode.style.height);
  if (Number.isFinite(styleH) && styleH > 0 && taskNode.dataset.bpTaskAutoHeight !== "0") return styleH;
  return Math.max(20, taskNode.offsetHeight || styleH || BP_TASK_DEFAULT_HEIGHT);
}

function removeBpTaskConnectors(processId) {
  const id = String(processId || "").trim();
  if (!id) return;
  const taskConnIds = new Set(
    Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="task"]`))
      .map((node) => node.dataset.connId)
      .filter(Boolean)
  );
  if (!taskConnIds.size) return;
  for (let i = connectors.length - 1; i >= 0; i -= 1) {
    const conn = connectors[i];
    const fromId = conn.from?.nodeId;
    const toId = conn.to?.nodeId;
    if (taskConnIds.has(fromId) || taskConnIds.has(toId)) connectors.splice(i, 1);
  }
}

function getBpProcessBackgroundBottom(processId) {
  const base = getBpBase(processId);
  if (base) return base.offsetTop + base.offsetHeight;
  const stages = getBpStages(processId);
  if (!stages.length) return 0;
  const stage = stages[0];
  return stage.offsetTop + stage.offsetHeight + BP_BASE_PAD_Y;
}

function applyBpTaskStyle(taskNode) {
  if (!isBpProcessTask(taskNode)) return;
  taskNode.style.borderRadius = `${BP_TASK_RADIUS}px`;
  taskNode.classList.add("bp-task-card");
}

const BP_TASK_FORM_ROWS = [
  ["assigner", "Постановщик"],
  ["executor", "Исполнитель"],
  ["deadline", "Крайний срок"],
  ["timeTracking", "Учёт времени"],
  ["project", "Проект"],
  ["crmElements", "Элементы CRM"],
  ["conditions", "Условия"],
  ["tags", "Теги"]
];

const BP_TASK_FORM_SECTIONS = [
  { key: "personnel", className: "bp-task-form-section-meta", rows: BP_TASK_FORM_ROWS.slice(0, 4) },
  { key: "project", className: "bp-task-form-section-meta", rows: BP_TASK_FORM_ROWS.slice(4, 6) },
  { key: "tags", className: "bp-task-form-section-meta", rows: BP_TASK_FORM_ROWS.slice(6, 8) }
];

const BP_TASK_TOGGLE_ICON_SRC = "assets/bp-task-check-icon.svg";

function decorateBpTaskToggleButton(btn) {
  if (!btn) return;
  btn.textContent = "";
  btn.innerHTML = `<img class="bp-task-toggle-icon" src="${BP_TASK_TOGGLE_ICON_SRC}" width="16" height="16" alt="" draggable="false">`;
}

/** Growing lists: keep non-empty values in order, then exactly one trailing empty field. */
function normalizeGrowingTextList(values) {
  const filled = (Array.isArray(values) ? values : [])
    .map((v) => String(v ?? ""))
    .filter((v) => v.trim());
  filled.push("");
  return filled;
}

function normalizeBpTaskData(raw, fallbackTitle = "") {
  const base = raw && typeof raw === "object" ? raw : {};
  let title = String(base.title || "").trim();
  const subtitle = String(base.subtitle || "").trim();
  if (!title) title = String(fallbackTitle || "Задача").replace(/^☑\s*/, "").trim() || "Задача";
  if (subtitle && (!title || /^Задача(?:\s+\d+)?$/.test(title))) title = subtitle;
  const results = normalizeGrowingTextList(base.results);
  return {
    title,
    subtitle: String(base.subtitle || ""),
    expanded: !!base.expanded,
    description: String(base.description || ""),
    assigner: String(base.assigner || ""),
    executor: String(base.executor || ""),
    deadline: String(base.deadline || ""),
    timeTracking: String(base.timeTracking || ""),
    project: String(base.project || ""),
    crmElements: String(base.crmElements || ""),
    conditions: String(base.conditions || ""),
    tags: String(base.tags || ""),
    results,
    additional: String(base.additional || "")
  };
}

function getBpTaskData(node) {
  if (!node) return normalizeBpTaskData(null);
  if (node.__bpTaskData) return node.__bpTaskData;
  try {
    const raw = node.dataset.bpTaskData ? JSON.parse(node.dataset.bpTaskData) : null;
    node.__bpTaskData = normalizeBpTaskData(raw, node.querySelector(".bp-task-title")?.textContent || node.querySelector(".shape-text")?.dataset?.rawText);
    return node.__bpTaskData;
  } catch {
    node.__bpTaskData = normalizeBpTaskData(null);
    return node.__bpTaskData;
  }
}

function syncBpTaskDataToDataset(node) {
  if (!node) return;
  const data = getBpTaskData(node);
  node.dataset.bpTaskData = JSON.stringify(data);
  const hidden = node.querySelector(".shape-text");
  if (hidden) hidden.dataset.rawText = data.title;
}

function autoGrowBpTaskField(field) {
  if (!field) return;
  field.style.height = "auto";
  field.style.height = `${Math.max(28, field.scrollHeight)}px`;
}

function syncBpTaskHiddenText(node) {
  const hidden = node?.querySelector(".shape-text");
  if (!hidden) return;
  hidden.dataset.rawText = getBpTaskData(node).title;
}

function clampFontSizeStep(value, fallback = 14) {
  const n = Number(value);
  return Math.max(8, Math.min(144, Number.isFinite(n) ? n : fallback));
}

function getBpTaskTypography(node) {
  const fallback = { title: 15, label: 10.5, field: 14 };
  if (!node) return fallback;
  try {
    const raw = node.dataset.bpTaskTypography ? JSON.parse(node.dataset.bpTaskTypography) : null;
    if (raw && typeof raw === "object") {
      return {
        title: clampFontSizeStep(raw.title, fallback.title),
        label: clampFontSizeStep(raw.label, fallback.label),
        field: clampFontSizeStep(raw.field, fallback.field)
      };
    }
  } catch {}
  const title = node.querySelector(".bp-task-title");
  const label = node.querySelector(".bp-task-form-label, .bp-task-form-label-block");
  const field = node.querySelector(".bp-task-field");
  return {
    title: clampFontSizeStep(parseFloat(getComputedStyle(title || node).fontSize), fallback.title),
    label: clampFontSizeStep(parseFloat(getComputedStyle(label || node).fontSize), fallback.label),
    field: clampFontSizeStep(parseFloat(getComputedStyle(field || node).fontSize), fallback.field)
  };
}

function syncBpTaskTypographyToDataset(node, typography = null) {
  if (!node) return;
  const next = typography || getBpTaskTypography(node);
  node.dataset.bpTaskTypography = JSON.stringify(next);
  const hidden = node.querySelector(".shape-text");
  if (hidden) hidden.style.fontSize = `${next.field}px`;
}

function applyBpTaskTypography(node, typography = null) {
  if (!isBpProcessTask(node)) return;
  const next = typography || getBpTaskTypography(node);
  const title = node.querySelector(".bp-task-title");
  if (title) title.style.fontSize = `${next.title}px`;
  node.querySelectorAll(".bp-task-form-label, .bp-task-form-label-block").forEach((el) => {
    el.style.fontSize = `${next.label}px`;
  });
  node.querySelectorAll(".bp-task-field").forEach((el) => {
    el.style.fontSize = `${next.field}px`;
  });
  syncBpTaskTypographyToDataset(node, next);
}

function refreshBpTaskCardHeight(node, doLayout = true) {
  if (!isBpProcessTask(node)) return;
  if (node.dataset.bpTaskAutoHeight !== "0") fitBpTaskHeightToText(node);
  if (doLayout && node.dataset.bpProcessId) layoutAllBpTasksInProcess(node.dataset.bpProcessId);
  syncAllLiftedControlsPositions();
}

function onBpTaskFieldInput(node, fieldKey, fieldEl) {
  if (!node || isWorkspaceReadOnly()) return;
  const data = getBpTaskData(node);
  data[fieldKey] = fieldEl.value;
  autoGrowBpTaskField(fieldEl);
  syncBpTaskDataToDataset(node);
  refreshBpTaskCardHeight(node);
  saveLayout({ recordHistory: false });
}

function ensureBpTaskResultFields(node, listEl) {
  const data = getBpTaskData(node);
  data.results = normalizeGrowingTextList(data.results);
  while (listEl.children.length > data.results.length) {
    listEl.lastElementChild?.remove();
  }
  const appendResultField = () => {
    const ta = document.createElement("textarea");
    ta.className = "bp-task-field bp-task-result-field";
    ta.rows = 1;
    ta.placeholder = "";
    ta.addEventListener("input", () => {
      if (isWorkspaceReadOnly()) return;
      const d = getBpTaskData(node);
      const fields = Array.from(listEl.querySelectorAll(".bp-task-result-field"));
      d.results = normalizeGrowingTextList(fields.map((field) => field.value));
      syncBpTaskDataToDataset(node);
      ensureBpTaskResultFields(node, listEl);
      renderBpTaskCardValues(node);
      refreshBpTaskCardHeight(node, false);
      saveLayout({ recordHistory: false });
    });
    ta.addEventListener("pointerdown", (e) => e.stopPropagation());
    listEl.appendChild(ta);
  };
  while (listEl.children.length < data.results.length) {
    appendResultField();
  }
  Array.from(listEl.querySelectorAll(".bp-task-result-field")).forEach((field, idx) => {
    field.dataset.resultIndex = String(idx);
  });
}

function renderBpTaskCardValues(node) {
  const data = getBpTaskData(node);
  const title = node.querySelector(".bp-task-title");
  if (title && title.contentEditable !== "true") title.textContent = data.title;
  node.querySelectorAll("[data-bp-field]").forEach((field) => {
    const key = field.dataset.bpField;
    if (!key || key === "title") return;
    if (field.tagName === "TEXTAREA") {
      field.value = data[key] ?? "";
      autoGrowBpTaskField(field);
    }
  });
  const resultsList = node.querySelector(".bp-task-results-list");
  if (resultsList) {
    ensureBpTaskResultFields(node, resultsList);
    Array.from(resultsList.querySelectorAll(".bp-task-result-field")).forEach((field, idx) => {
      field.value = data.results[idx] ?? "";
      autoGrowBpTaskField(field);
    });
  }
  node.classList.toggle("bp-task-expanded", !!data.expanded);
  const form = node.querySelector(".bp-task-form");
  if (form) form.classList.toggle("hidden", !data.expanded);
  const toggle = node.querySelector(".bp-task-toggle");
  if (toggle) {
    const label = data.expanded ? "Свернуть задачу" : "Подробности задачи";
    toggle.title = label;
    toggle.setAttribute("aria-label", label);
  }
  const readOnly = isWorkspaceReadOnly();
  node.querySelectorAll(".bp-task-field").forEach((field) => {
    field.disabled = readOnly;
  });
  if (title && title.contentEditable !== "true") title.contentEditable = "false";
  applyBpTaskTypography(node);
  syncBpTaskHiddenText(node);
}

function toggleBpTaskExpanded(node) {
  if (!node) return;
  const data = getBpTaskData(node);
  data.expanded = !data.expanded;
  if (!data.expanded) node.dataset.bpTaskAutoHeight = "1";
  syncBpTaskDataToDataset(node);
  renderBpTaskCardValues(node);
  refreshBpTaskCardHeight(node);
  if (!isWorkspaceReadOnly()) saveLayout();
}

function bindBpTaskToggleButton(node, btn) {
  if (!btn || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBpTaskExpanded(node);
  });
}

function beginBpTaskTitleEdit(node, titleEl) {
  if (!titleEl || isWorkspaceReadOnly() || titleEl.contentEditable === "true") return;
  titleEl.contentEditable = "true";
  titleEl.classList.add("is-editing");
  titleEl.focus();
  placeCaretAtEnd(titleEl);
}

function startBpTaskTitleTypingEdit(node, initialText = null) {
  if (!canEditCurrentDocument() || !node || !isBpProcessTask(node)) return false;
  const titleEl = node.querySelector(".bp-task-title");
  if (!titleEl || titleEl.contentEditable === "true") return false;
  if (selectedShape !== node) {
    selectShape(node);
    armBpTaskReassign(node);
  }
  beginBpTaskTitleEdit(node, titleEl);
  if (initialText != null) {
    titleEl.textContent = initialText;
    placeCaretAtEnd(titleEl);
  }
  return true;
}

function bindBpTaskSelection(node) {
  if (!node || node.dataset.bpTaskSelectionBound === "1") return;
  node.dataset.bpTaskSelectionBound = "1";
  node.addEventListener("dblclick", (e) => {
    if (!canEditCurrentDocument()) return;
    if (e.target.closest(".bp-task-toggle, .bp-task-field, .bp-task-title")) return;
    e.preventDefault();
    e.stopPropagation();
    selectShape(node);
    armBpTaskReassign(node);
  }, true);
}

function bindBpTaskTitleEdit(node, titleEl) {
  if (!titleEl || titleEl.dataset.bound === "1") return;
  titleEl.dataset.bound = "1";
  titleEl.addEventListener("dblclick", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedShape !== node) {
      selectShape(node);
      armBpTaskReassign(node);
    }
    beginBpTaskTitleEdit(node, titleEl);
  });
  titleEl.addEventListener("blur", () => {
    if (titleEl.contentEditable !== "true") return;
    titleEl.contentEditable = "false";
    titleEl.classList.remove("is-editing");
    const data = getBpTaskData(node);
    data.title = (titleEl.innerText || "").trim() || data.title;
    syncBpTaskDataToDataset(node);
    renderBpTaskCardValues(node);
    refreshBpTaskCardHeight(node);
    saveLayout();
  });
  titleEl.addEventListener("keydown", (e) => {
    if (titleEl.contentEditable !== "true") return;
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      titleEl.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      renderBpTaskCardValues(node);
      titleEl.contentEditable = "false";
      titleEl.classList.remove("is-editing");
      titleEl.blur();
    }
  });
  titleEl.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (titleEl.contentEditable === "true") e.stopPropagation();
  });
}

function appendBpTaskFormField(node, parent, key, className = "") {
  const field = document.createElement("textarea");
  field.className = className ? `bp-task-field ${className}` : "bp-task-field";
  field.dataset.bpField = key;
  field.rows = 1;
  field.addEventListener("input", () => onBpTaskFieldInput(node, key, field));
  field.addEventListener("pointerdown", (e) => e.stopPropagation());
  parent.appendChild(field);
  return field;
}

function appendBpTaskFormRow(node, parent, key, labelText) {
  const row = document.createElement("div");
  row.className = "bp-task-form-row";
  const label = document.createElement("div");
  label.className = "bp-task-form-label";
  label.textContent = labelText;
  row.appendChild(label);
  appendBpTaskFormField(node, row, key);
  parent.appendChild(row);
}

function appendBpTaskFormSection(node, form, sectionKey, rows, sectionClassName = "bp-task-form-section-meta") {
  const section = document.createElement("div");
  section.className = `bp-task-form-section bp-task-form-section-${sectionKey} ${sectionClassName}`;
  rows.forEach(([key, labelText]) => appendBpTaskFormRow(node, section, key, labelText));
  form.appendChild(section);
}

function upgradeBpTaskCardDesign(node) {
  if (!isBpProcessTask(node) || !node.querySelector(".bp-task-card-inner")) return;
  if (node.dataset.bpTaskDesignRev === "9") return;
  const inner = node.querySelector(".bp-task-card-inner");
  if (inner) inner.remove();
  node.querySelector(".bp-task-hidden-text")?.remove();
  delete node.__bpTaskData;
  buildBpTaskCardUI(node);
}

function buildBpTaskCardUI(node) {
  if (!node || node.querySelector(".bp-task-card-inner")) return;
  node.classList.add("bp-task-card");
  const data = getBpTaskData(node);
  const inner = document.createElement("div");
  inner.className = "bp-task-card-inner";

  const header = document.createElement("div");
  header.className = "bp-task-header";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "bp-task-toggle";
  toggle.title = data.expanded ? "Свернуть задачу" : "Подробности задачи";
  toggle.setAttribute("aria-label", toggle.title);
  decorateBpTaskToggleButton(toggle);
  const title = document.createElement("div");
  title.className = "bp-task-title";
  title.textContent = data.title;
  title.setAttribute("tabindex", "0");
  header.appendChild(toggle);
  header.appendChild(title);

  const form = document.createElement("div");
  form.className = `bp-task-form${data.expanded ? "" : " hidden"}`;

  const formBody = document.createElement("div");
  formBody.className = "bp-task-form-body";

  const descSection = document.createElement("div");
  descSection.className = "bp-task-form-section bp-task-form-section-description";
  const descLabel = document.createElement("div");
  descLabel.className = "bp-task-form-label bp-task-form-label-block";
  descLabel.textContent = "Описание";
  descSection.appendChild(descLabel);
  appendBpTaskFormField(node, descSection, "description", "bp-task-field-area");
  formBody.appendChild(descSection);

  const resultsSection = document.createElement("div");
  resultsSection.className = "bp-task-form-section bp-task-form-section-results";
  const resultsLabel = document.createElement("div");
  resultsLabel.className = "bp-task-form-label bp-task-form-label-block";
  resultsLabel.textContent = "Результаты задачи (ЦКП, DoD)";
  const resultsList = document.createElement("div");
  resultsList.className = "bp-task-results-list";
  resultsSection.appendChild(resultsLabel);
  resultsSection.appendChild(resultsList);
  formBody.appendChild(resultsSection);

  BP_TASK_FORM_SECTIONS.forEach(({ key, rows, className }) => appendBpTaskFormSection(node, formBody, key, rows, className));

  const additionalSection = document.createElement("div");
  additionalSection.className = "bp-task-form-section bp-task-form-section-additional";
  const additionalLabel = document.createElement("div");
  additionalLabel.className = "bp-task-form-label bp-task-form-label-block";
  additionalLabel.textContent = "Дополнительно";
  additionalSection.appendChild(additionalLabel);
  appendBpTaskFormField(node, additionalSection, "additional", "bp-task-field-area");
  formBody.appendChild(additionalSection);

  form.appendChild(formBody);

  inner.appendChild(header);
  inner.appendChild(form);

  const hiddenText = document.createElement("div");
  hiddenText.className = "shape-text bp-task-hidden-text";
  hiddenText.style.display = "none";
  hiddenText.dataset.rawText = data.title;

  const existingText = node.querySelector(".shape-text:not(.bp-task-hidden-text)");
  if (existingText) existingText.remove();

  node.insertBefore(inner, node.firstChild);
  node.appendChild(hiddenText);

  node.dataset.bpTaskDesignRev = "9";
  bindBpTaskToggleButton(node, toggle);
  bindBpTaskTitleEdit(node, title);
  bindBpTaskSelection(node);
  ensureBpTaskResultFields(node, resultsList);
  renderBpTaskCardValues(node);
  applyBpTaskTypography(node);
}

function upgradeLegacyBpTaskNode(node) {
  if (!isBpProcessTask(node) || node.querySelector(".bp-task-card-inner")) return;
  try {
    const legacyText = node.querySelector(".shape-text");
    const fallback = legacyText?.dataset?.rawText || legacyText?.textContent || "";
    let raw = null;
    try {
      raw = node.dataset.bpTaskData ? JSON.parse(node.dataset.bpTaskData) : null;
    } catch {
      raw = null;
    }
    node.__bpTaskData = normalizeBpTaskData(raw, fallback);
    syncBpTaskDataToDataset(node);
    buildBpTaskCardUI(node);
  } catch (err) {
    console.error("Failed to upgrade BP task:", node?.dataset?.shapeId, err);
  }
}

function measureBpTaskContentHeight(taskNode) {
  const inner = taskNode.querySelector(".bp-task-card-inner");
  if (!inner) return BP_TASK_DEFAULT_HEIGHT;
  const width = Math.max(40, taskNode.offsetWidth || parseFloat(taskNode.style.width) || BP_STAGE_WIDTH);
  inner.style.width = `${width}px`;
  const prevHeight = taskNode.style.height;
  taskNode.style.height = "auto";
  const measured = Math.ceil(taskNode.offsetHeight || inner.offsetHeight || BP_TASK_DEFAULT_HEIGHT);
  taskNode.style.height = prevHeight;
  return measured;
}

function measureBpTaskTextHeight(taskNode) {
  const inner = taskNode.querySelector(".bp-task-card-inner");
  if (inner) return measureBpTaskContentHeight(taskNode);
  const text = taskNode.querySelector(".shape-text");
  if (!text) return BP_TASK_DEFAULT_HEIGHT;
  const width = Math.max(40, taskNode.offsetWidth || parseFloat(taskNode.style.width) || BP_STAGE_WIDTH);
  const cs = getComputedStyle(text);
  const el = getTableMeasureNode();
  el.style.fontFamily = cs.fontFamily;
  el.style.fontSize = cs.fontSize;
  el.style.fontWeight = cs.fontWeight;
  el.style.fontStyle = cs.fontStyle;
  el.style.lineHeight = cs.lineHeight;
  el.style.letterSpacing = cs.letterSpacing;
  el.style.padding = cs.padding;
  el.style.boxSizing = "border-box";
  el.style.width = `${width}px`;
  el.style.whiteSpace = "pre-wrap";
  el.style.wordBreak = cs.wordBreak || "normal";
  const raw = text.dataset.rawText != null ? String(text.dataset.rawText) : String(text.textContent || "");
  el.textContent = raw || " ";
  return Math.ceil(el.getBoundingClientRect().height);
}

function fitBpTaskHeightToText(taskNode) {
  if (!isBpProcessTask(taskNode) || taskNode.dataset.bpTaskAutoHeight === "0") return false;
  if (!taskNode.querySelector(".bp-task-title.is-editing")) {
    renderBpTaskCardValues(taskNode);
  }
  const expanded = taskNode.classList.contains("bp-task-expanded");
  const nextH = Math.max(expanded ? 36 : 28, measureBpTaskTextHeight(taskNode));
  const prevH = getBpTaskHeight(taskNode);
  if (Math.abs(prevH - nextH) < 0.5) return false;
  taskNode.style.height = `${nextH}px`;
  return true;
}

function finalizeBpTaskManualResize(taskNode, resizeState) {
  if (!isBpProcessTask(taskNode) || !resizeState) return;
  const processId = taskNode.dataset.bpProcessId;
  const nextW = taskNode.offsetWidth || parseFloat(taskNode.style.width) || 0;
  const nextH = getBpTaskHeight(taskNode);
  const heightChanged = Math.abs(nextH - (resizeState.h ?? nextH)) > 0.5;
  const widthChanged = Math.abs(nextW - (resizeState.w ?? nextW)) > 0.5;
  if (heightChanged) {
    taskNode.dataset.bpTaskAutoHeight = "0";
    if (processId) layoutAllBpTasksInProcess(processId);
    return;
  }
  if (widthChanged && fitBpTaskHeightToText(taskNode) && processId) {
    layoutAllBpTasksInProcess(processId);
  }
}

function getPrimaryBpTaskOnStage(processId, stageIndex) {
  const tasks = getBpTasksForStage(processId, stageIndex);
  if (!tasks.length) return null;
  return tasks.sort((a, b) => (Number(a.dataset.bpTaskOrder) || 0) - (Number(b.dataset.bpTaskOrder) || 0))[0];
}

function layoutAllBpTasksInProcess(processId) {
  removeBpTaskConnectors(processId);
  const tasks = getAllBpTasksInProcess(processId);
  if (!tasks.length) {
    syncBpProcessSectionToggles(processId);
    return;
  }
  const sectionHidden = isBpTasksSectionHidden(processId);
  tasks.forEach((task) => {
    task.classList.remove("bp-section-hidden");
    upgradeLegacyBpTaskNode(task);
    upgradeBpTaskCardDesign(task);
    bindBpTaskSelection(task);
  });
  const bgBottom = getBpProcessBackgroundBottom(processId);
  const tasksByStage = new Map();

  tasks.forEach((task) => {
    const stageIndex = Number(task.dataset.bpTaskStageIndex);
    if (!tasksByStage.has(stageIndex)) tasksByStage.set(stageIndex, []);
    tasksByStage.get(stageIndex).push(task);
  });
  tasksByStage.forEach((stageTasks) => {
    stageTasks.sort((a, b) => (Number(a.dataset.bpTaskOrder) || 0) - (Number(b.dataset.bpTaskOrder) || 0));
  });

  const sortedStageIndices = [...tasksByStage.keys()].sort((a, b) => a - b);
  const stageAnchors = new Map();
  const sharedRowTop = bgBottom + BP_TASK_STAGE_GAP;

  sortedStageIndices.forEach((stageIndex) => {
    const stageTasks = tasksByStage.get(stageIndex);
    const primary = stageTasks[0];
    if (!primary) return;
    const stage = getBpStageForIndex(processId, stageIndex);
    if (!stage) return;

    const taskWidth = getBpTaskWidthForStage(stage);
    const left = getBpTaskLeftForStage(stage);

    primary.style.left = `${left}px`;
    primary.style.width = `${taskWidth}px`;
    primary.style.top = `${sharedRowTop}px`;

    stageAnchors.set(stageIndex, { left, width: taskWidth });
  });

  sortedStageIndices.forEach((stageIndex) => {
    const stageTasks = tasksByStage.get(stageIndex);
    const anchor = stageAnchors.get(stageIndex);
    if (!anchor || !stageTasks?.length) return;
    const primary = stageTasks[0];
    const stage = primary ? getBpStageForTask(primary) : null;
    const stageZ = Math.max(1, Number(stage?.style?.zIndex) || 0);
    const stackTopZ = stageZ + stageTasks.length;
    stageTasks.forEach((task, index) => {
      task.style.width = `${anchor.width}px`;
      const layoutZ = stackTopZ - index;
      const currentZ = Number(task.style.zIndex) || 0;
      task.style.zIndex = String(currentZ > stackTopZ ? currentZ : layoutZ);
      if (index > 0) {
        task.style.left = `${anchor.left}px`;
      }
    });
  });

  tasks.forEach((task) => {
    if (task.dataset.bpTaskAutoHeight !== "0") fitBpTaskHeightToText(task);
  });

  sortedStageIndices.forEach((stageIndex) => {
    const stageTasks = tasksByStage.get(stageIndex);
    const anchor = stageAnchors.get(stageIndex);
    if (!anchor || stageTasks.length < 2) return;

    for (let i = 1; i < stageTasks.length; i += 1) {
      const task = stageTasks[i];
      const above = stageTasks[i - 1];
      const top = above.offsetTop + getBpTaskHeight(above) + BP_TASK_STACK_GAP;
      task.style.left = `${anchor.left}px`;
      task.style.width = `${anchor.width}px`;
      task.style.top = `${top}px`;
    }
  });

  tasks.forEach((task) => {
    applyBpTaskStyle(task);
    layoutConnectorPoints(task);
    task.classList.toggle("bp-section-hidden", sectionHidden);
  });

  renderConnectors();
  updateDesktopExtent();
  syncBpProcessSectionToggles(processId);
}

function layoutBpTaskAboveStage(taskNode, stageNode) {
  if (!taskNode || !stageNode?.dataset?.bpProcessId) return;
  layoutAllBpTasksInProcess(stageNode.dataset.bpProcessId);
}

function syncBpTasksForStage(stageNode) {
  if (!stageNode?.dataset?.bpProcessId) return;
  layoutAllBpTasksInProcess(stageNode.dataset.bpProcessId);
  layoutAllBpAutomationsInProcess(stageNode.dataset.bpProcessId);
}

function syncAllBpTasksInProcess(processId) {
  layoutAllBpTasksInProcess(processId);
  layoutAllBpAutomationsInProcess(processId);
}

function onBpTaskResized(taskNode) {
  if (!isBpProcessTask(taskNode)) return;
  const processId = taskNode.dataset.bpProcessId;
  if (!processId) return;
  layoutAllBpTasksInProcess(processId);
}

function isBpProcessAutomation(node) {
  return node?.dataset?.bpRole === "automation" && !!node?.dataset?.bpProcessId;
}

function getBpAutomationsForStage(processId, stageIndex) {
  const id = String(processId || "").trim();
  if (!id) return [];
  const idx = Number(stageIndex);
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="automation"]`))
    .filter((node) => Number(node.dataset.bpAutomationStageIndex) === idx);
}

function getBpStageForAutomation(autoNode) {
  if (!isBpProcessAutomation(autoNode)) return null;
  const processId = autoNode.dataset.bpProcessId;
  const stageIndex = Number(autoNode.dataset.bpAutomationStageIndex);
  return getBpStages(processId).find((node) => Number(node.dataset.bpStageIndex) === stageIndex) || null;
}

function getAllBpAutomationsInProcess(processId) {
  const id = String(processId || "").trim();
  if (!id) return [];
  return Array.from(desktop.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="automation"]`))
    .sort((a, b) => {
      const stageA = Number(a.dataset.bpAutomationStageIndex) || 0;
      const stageB = Number(b.dataset.bpAutomationStageIndex) || 0;
      if (stageA !== stageB) return stageA - stageB;
      const orderA = Number(a.dataset.bpAutomationOrder) || 0;
      const orderB = Number(b.dataset.bpAutomationOrder) || 0;
      if (orderA !== orderB) return orderA - orderB;
      return String(a.dataset.shapeId || "").localeCompare(String(b.dataset.shapeId || ""));
    });
}

function getBpAutomationHeight(autoNode) {
  const styleH = parseFloat(autoNode.style.height);
  if (Number.isFinite(styleH) && styleH > 0 && autoNode.dataset.bpAutomationAutoHeight !== "0") return styleH;
  return Math.max(20, autoNode.offsetHeight || styleH || BP_AUTOMATION_DEFAULT_HEIGHT);
}

function getBpProcessBackgroundTop(processId) {
  const stages = getBpStages(processId);
  if (stages.length) return getBpStageRowTop(processId);
  const base = getBpBase(processId);
  if (base) return base.offsetTop + BP_BASE_PAD_Y;
  return 0;
}

/** Visual gap from stage edge to first task row (base pad below stage + stage→task gap). */
function getBpStageAttachGap(processId) {
  const stages = getBpStages(processId);
  if (!stages.length) return BP_BASE_PAD_Y + BP_TASK_STAGE_GAP;
  const stage = stages[0];
  const stageBottom = stage.offsetTop + stage.offsetHeight;
  return Math.max(BP_TASK_STAGE_GAP, getBpProcessBackgroundBottom(processId) + BP_TASK_STAGE_GAP - stageBottom);
}

const BP_SECTION_TOGGLE_SIZE = 16;
const BP_SECTION_TASK_TOGGLE_SIZE = Math.round(BP_SECTION_TOGGLE_SIZE * 0.85);
/** Gap between stage edge and section toggle icons (near stage corners). */
const BP_SECTION_TOGGLE_EDGE = 4;

function isBpTasksSectionHidden(processId) {
  return getBpBase(processId)?.dataset?.bpTasksHidden === "1";
}

function isBpAutomationsSectionHidden(processId) {
  return getBpBase(processId)?.dataset?.bpAutomationsHidden === "1";
}

function setBpSectionHidden(processId, section, hidden) {
  const base = getBpBase(processId);
  if (!base) return;
  const key = section === "automations" ? "bpAutomationsHidden" : "bpTasksHidden";
  if (hidden) base.dataset[key] = "1";
  else delete base.dataset[key];
}

function applyBpSectionVisibility(processId) {
  const tasksHidden = isBpTasksSectionHidden(processId);
  const autosHidden = isBpAutomationsSectionHidden(processId);
  getAllBpTasksInProcess(processId).forEach((node) => {
    node.classList.toggle("bp-section-hidden", tasksHidden);
  });
  getAllBpAutomationsInProcess(processId).forEach((node) => {
    node.classList.toggle("bp-section-hidden", autosHidden);
  });
}

function toggleBpProcessSection(processId, section) {
  if (!processId) return;
  if (section === "automations") {
    setBpSectionHidden(processId, "automations", !isBpAutomationsSectionHidden(processId));
    layoutAllBpAutomationsInProcess(processId);
  } else {
    setBpSectionHidden(processId, "tasks", !isBpTasksSectionHidden(processId));
    layoutAllBpTasksInProcess(processId);
  }
  syncBpProcessSectionToggles(processId);
  if (!isWorkspaceReadOnly()) saveLayout();
}

function syncAllBpProcessSectionToggles() {
  const ids = new Set();
  desktop.querySelectorAll('.shape[data-bp-role="base"][data-bp-process-id]').forEach((node) => {
    if (node.dataset.bpProcessId) ids.add(node.dataset.bpProcessId);
  });
  ids.forEach((id) => syncBpProcessSectionToggles(id));
}

function syncBpProcessSectionToggles(processId) {
  const id = String(processId || "").trim();
  const base = getBpBase(id);
  if (!base) return;
  applyBpSectionVisibility(id);

  // Remove stale layers from base (older placement) and non-first stages.
  base.querySelector(":scope > .bp-process-section-toggles")?.remove();
  const stages = getBpStages(id);
  stages.forEach((stage, index) => {
    if (index !== 0) stage.querySelector(":scope > .bp-process-section-toggles")?.remove();
  });

  const stage0 = stages[0];
  let layer = stage0?.querySelector(":scope > .bp-process-section-toggles");
  const tasks = getAllBpTasksInProcess(id);
  const autos = getAllBpAutomationsInProcess(id);
  const showTasks = tasks.length > 0;
  const showAutos = autos.length > 0;
  if (!stage0 || (!showTasks && !showAutos)) {
    layer?.remove();
    if (!showTasks) delete base.dataset.bpTasksHidden;
    if (!showAutos) delete base.dataset.bpAutomationsHidden;
    return;
  }

  if (!layer) {
    layer = document.createElement("div");
    layer.className = "bp-process-section-toggles";
    stage0.appendChild(layer);
  }

  // Sit on the left tip of stage 1: just above / just below the stage edge.
  const left = 0;
  const autoTop = -(BP_SECTION_TOGGLE_SIZE + BP_SECTION_TOGGLE_EDGE);
  const taskTop = stage0.offsetHeight + BP_SECTION_TOGGLE_EDGE;

  const ensureBtn = (kind, title, iconSrc, top, size, collapsed, onClick) => {
    let btn = layer.querySelector(`.bp-process-section-toggle[data-bp-section="${kind}"]`);
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bp-process-section-toggle";
      btn.dataset.bpSection = kind;
      btn.innerHTML = `<img class="bp-process-section-toggle-icon" src="${iconSrc}" width="${size}" height="${size}" alt="" draggable="false">`;
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      });
      layer.appendChild(btn);
    }
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.setAttribute("aria-pressed", collapsed ? "true" : "false");
    btn.classList.toggle("is-collapsed", collapsed);
    btn.classList.toggle("bp-process-section-toggle-task", kind === "tasks");
    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
    btn.style.width = `${size}px`;
    btn.style.height = `${size}px`;
    const icon = btn.querySelector(".bp-process-section-toggle-icon");
    if (icon) {
      icon.setAttribute("width", String(size));
      icon.setAttribute("height", String(size));
      icon.style.width = `${size}px`;
      icon.style.height = `${size}px`;
    }
    btn.hidden = false;
    return btn;
  };

  if (showAutos) {
    ensureBtn(
      "automations",
      isBpAutomationsSectionHidden(id) ? "Показать автоматизации" : "Скрыть автоматизации",
      BP_AUTOMATION_TOGGLE_ICON_SRC,
      autoTop,
      BP_SECTION_TOGGLE_SIZE,
      isBpAutomationsSectionHidden(id),
      () => toggleBpProcessSection(id, "automations")
    );
  } else {
    layer.querySelector('.bp-process-section-toggle[data-bp-section="automations"]')?.remove();
  }

  if (showTasks) {
    ensureBtn(
      "tasks",
      isBpTasksSectionHidden(id) ? "Показать задачи" : "Скрыть задачи",
      BP_TASK_TOGGLE_ICON_SRC,
      taskTop,
      BP_SECTION_TASK_TOGGLE_SIZE,
      isBpTasksSectionHidden(id),
      () => toggleBpProcessSection(id, "tasks")
    );
  } else {
    layer.querySelector('.bp-process-section-toggle[data-bp-section="tasks"]')?.remove();
  }
}

function clearBpAutomationReassignInProcess(processId, exceptNode = null) {
  const id = String(processId || "").trim();
  if (!id) return;
  document.querySelectorAll(`.shape[data-bp-process-id="${id}"][data-bp-role="automation"][data-bp-automation-reassign-ready="1"]`).forEach((node) => {
    if (node !== exceptNode) delete node.dataset.bpAutomationReassignReady;
  });
}

function armBpAutomationReassign(autoNode) {
  if (!isBpProcessAutomation(autoNode)) return;
  clearBpAutomationReassignInProcess(autoNode.dataset.bpProcessId, autoNode);
  clearBpTaskReassignInProcess(autoNode.dataset.bpProcessId);
  autoNode.dataset.bpAutomationReassignReady = "1";
}

function renormalizeBpAutomationOrdersForStage(processId, stageIndex, excludeNode = null) {
  const autos = getBpAutomationsForStage(processId, stageIndex)
    .filter((node) => node !== excludeNode)
    .sort((a, b) => (Number(a.dataset.bpAutomationOrder) || 0) - (Number(b.dataset.bpAutomationOrder) || 0));
  autos.forEach((node, index) => {
    node.dataset.bpAutomationOrder = String(index);
    if (node.dataset.bpAutomationManualPosition === "1") delete node.dataset.bpAutomationManualPosition;
  });
}

function resequenceBpAutomationsByVisualY(processId, stageIndex) {
  const autos = getBpAutomationsForStage(processId, stageIndex);
  if (!autos.length) return;
  autos.sort((a, b) => getElementLogicalBox(a).top - getElementLogicalBox(b).top);
  autos.reverse();
  autos.forEach((node, index) => {
    node.dataset.bpAutomationOrder = String(index);
    if (node.dataset.bpAutomationManualPosition === "1") delete node.dataset.bpAutomationManualPosition;
  });
}

function reassignBpAutomationToStage(autoNode, targetStageNode) {
  if (!autoNode || !targetStageNode || !isBpProcessAutomation(autoNode) || !isBpProcessStage(targetStageNode)) return false;
  const processId = autoNode.dataset.bpProcessId;
  if (processId !== targetStageNode.dataset.bpProcessId) return false;
  const oldStageIndex = Number(autoNode.dataset.bpAutomationStageIndex);
  const newStageIndex = Number(targetStageNode.dataset.bpStageIndex);
  if (oldStageIndex === newStageIndex) {
    resequenceBpAutomationsByVisualY(processId, newStageIndex);
    delete autoNode.dataset.bpAutomationManualPosition;
    layoutAllBpAutomationsInProcess(processId);
    return false;
  }
  renormalizeBpAutomationOrdersForStage(processId, oldStageIndex, autoNode);
  const newOrder = getBpAutomationsForStage(processId, newStageIndex).filter((node) => node !== autoNode).length;
  autoNode.dataset.bpAutomationStageIndex = String(newStageIndex);
  autoNode.dataset.bpAutomationOrder = String(newOrder);
  delete autoNode.dataset.bpAutomationManualPosition;
  resequenceBpAutomationsByVisualY(processId, newStageIndex);
  layoutAllBpAutomationsInProcess(processId);
  return true;
}

function applyBpAutomationStyle(autoNode) {
  if (!isBpProcessAutomation(autoNode)) return;
  autoNode.classList.add("bp-automation-card");
  autoNode.style.borderRadius = "0";
  autoNode.style.background = "transparent";
  syncBpAutomationHeaderShape(autoNode);
}

function getBpAutomationTipPx(header, widthHint = 0) {
  const h = Math.max(1, header?.offsetHeight || BP_AUTOMATION_DEFAULT_HEIGHT);
  const w = Math.max(1, widthHint || header?.offsetWidth || 1);
  // Keep tip depth fixed in px (not % of width). Cap so tips never collide on very narrow cards.
  return Math.max(8, Math.min(BP_AUTOMATION_TIP_PX, Math.floor(w / 2) - 1, Math.floor(h / 2)));
}

function syncBpAutomationHeaderShape(node) {
  if (!isBpProcessAutomation(node)) return;
  const header = node.querySelector(".bp-automation-header");
  if (!header) return;
  const width = Math.max(1, header.offsetWidth || parseFloat(node.style.width) || 1);
  const height = Math.max(1, header.offsetHeight || BP_AUTOMATION_DEFAULT_HEIGHT);
  const tip = getBpAutomationTipPx(header, width);
  let svg = header.querySelector(":scope > .bp-automation-hex-fill");
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "bp-automation-hex-fill");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("preserveAspectRatio", "none");
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("class", "bp-automation-hex-poly");
    svg.appendChild(poly);
    header.insertBefore(svg, header.firstChild);
  }
  // viewBox matches current pixel size so tip depth stays constant when width changes
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const poly = svg.querySelector("polygon");
  if (poly) {
    poly.setAttribute(
      "points",
      `${tip},0 ${width - tip},0 ${width},${height / 2} ${width - tip},${height} ${tip},${height} 0,${height / 2}`
    );
  }
  header.style.clipPath = "none";
  header.style.background = "transparent";
  // Same left inset as .bp-task-header (7px); right keeps text clear of the tip.
  header.style.paddingLeft = "7px";
  header.style.paddingRight = `${tip + 7}px`;
}

function decorateBpAutomationToggleButton(btn) {
  if (!btn) return;
  btn.textContent = "";
  btn.innerHTML = `<img class="bp-automation-toggle-icon" src="${BP_AUTOMATION_TOGGLE_ICON_SRC}" width="18" height="18" alt="" draggable="false">`;
}

function normalizeBpAutomationList(values) {
  return normalizeGrowingTextList(values);
}

function normalizeBpAutomationData(raw, fallbackTitle = "") {
  const base = raw && typeof raw === "object" ? raw : {};
  let title = String(base.title || "").trim();
  if (!title) title = String(fallbackTitle || "Автоматизация").trim() || "Автоматизация";
  return {
    title,
    expanded: !!base.expanded,
    when: String(base.when || ""),
    conditions: normalizeBpAutomationList(base.conditions),
    description: String(base.description || ""),
    results: normalizeBpAutomationList(base.results)
  };
}

function getBpAutomationData(node) {
  if (!node) return normalizeBpAutomationData(null);
  if (node.__bpAutomationData) return node.__bpAutomationData;
  try {
    const raw = node.dataset.bpAutomationData ? JSON.parse(node.dataset.bpAutomationData) : null;
    node.__bpAutomationData = normalizeBpAutomationData(
      raw,
      node.querySelector(".bp-automation-title")?.textContent || node.querySelector(".shape-text")?.dataset?.rawText
    );
    return node.__bpAutomationData;
  } catch {
    node.__bpAutomationData = normalizeBpAutomationData(null);
    return node.__bpAutomationData;
  }
}

function syncBpAutomationDataToDataset(node) {
  if (!node) return;
  const data = getBpAutomationData(node);
  node.dataset.bpAutomationData = JSON.stringify(data);
  const hidden = node.querySelector(".shape-text");
  if (hidden) hidden.dataset.rawText = data.title;
}

function autoGrowBpAutomationField(field) {
  if (!field) return;
  field.style.height = "auto";
  field.style.height = `${Math.max(28, field.scrollHeight)}px`;
}

function getBpAutomationTypography(node) {
  const fallback = { title: 15, label: 10.5, field: 14 };
  if (!node) return fallback;
  try {
    const raw = node.dataset.bpAutomationTypography ? JSON.parse(node.dataset.bpAutomationTypography) : null;
    if (raw && typeof raw === "object") {
      return {
        title: clampFontSizeStep(raw.title, fallback.title),
        label: clampFontSizeStep(raw.label, fallback.label),
        field: clampFontSizeStep(raw.field, fallback.field)
      };
    }
  } catch {}
  return fallback;
}

function syncBpAutomationTypographyToDataset(node, typography = null) {
  if (!node) return;
  const next = typography || getBpAutomationTypography(node);
  node.dataset.bpAutomationTypography = JSON.stringify(next);
}

function applyBpAutomationTypography(node, typography = null) {
  if (!isBpProcessAutomation(node)) return;
  const next = typography || getBpAutomationTypography(node);
  const title = node.querySelector(".bp-automation-title");
  if (title) title.style.fontSize = `${next.title}px`;
  node.querySelectorAll(".bp-automation-form-label, .bp-automation-form-label-block").forEach((el) => {
    el.style.fontSize = `${next.label}px`;
  });
  node.querySelectorAll(".bp-automation-field").forEach((el) => {
    el.style.fontSize = `${next.field}px`;
  });
  syncBpAutomationTypographyToDataset(node, next);
}

function refreshBpAutomationCardHeight(node, doLayout = true) {
  if (!isBpProcessAutomation(node)) return;
  const heightChanged = node.dataset.bpAutomationAutoHeight !== "0"
    ? fitBpAutomationHeightToText(node)
    : false;
  // Relayout whenever height changes so the yellow header stays stage-anchored
  // while the form grows/shrinks upward (also keeps stacked automations in place).
  if ((doLayout || heightChanged) && node.dataset.bpProcessId) {
    layoutAllBpAutomationsInProcess(node.dataset.bpProcessId);
  }
  syncAllLiftedControlsPositions();
}

function onBpAutomationFieldInput(node, fieldKey, fieldEl) {
  if (!node || isWorkspaceReadOnly()) return;
  const data = getBpAutomationData(node);
  data[fieldKey] = fieldEl.value;
  autoGrowBpAutomationField(fieldEl);
  syncBpAutomationDataToDataset(node);
  refreshBpAutomationCardHeight(node);
  saveLayout({ recordHistory: false });
}

function ensureBpAutomationMultiFields(node, listEl, listKey) {
  const data = getBpAutomationData(node);
  data[listKey] = normalizeGrowingTextList(data[listKey]);
  while (listEl.children.length > data[listKey].length) {
    listEl.lastElementChild?.remove();
  }
  const fieldSelector = `.bp-automation-${listKey}-field`;
  const appendField = () => {
    const ta = document.createElement("textarea");
    ta.className = `bp-automation-field bp-automation-${listKey}-field`;
    ta.rows = 1;
    ta.placeholder = "";
    ta.addEventListener("input", () => {
      if (isWorkspaceReadOnly()) return;
      const d = getBpAutomationData(node);
      const fields = Array.from(listEl.querySelectorAll(fieldSelector));
      d[listKey] = normalizeGrowingTextList(fields.map((field) => field.value));
      syncBpAutomationDataToDataset(node);
      ensureBpAutomationMultiFields(node, listEl, listKey);
      renderBpAutomationCardValues(node);
      refreshBpAutomationCardHeight(node, false);
      saveLayout({ recordHistory: false });
    });
    ta.addEventListener("pointerdown", (e) => e.stopPropagation());
    listEl.appendChild(ta);
  };
  while (listEl.children.length < data[listKey].length) {
    appendField();
  }
  Array.from(listEl.querySelectorAll(fieldSelector)).forEach((field, idx) => {
    field.dataset[`${listKey}Index`] = String(idx);
  });
}

function renderBpAutomationCardValues(node) {
  const data = getBpAutomationData(node);
  const title = node.querySelector(".bp-automation-title");
  if (title && title.contentEditable !== "true") title.textContent = data.title;
  node.querySelectorAll("[data-bp-auto-field]").forEach((field) => {
    const key = field.dataset.bpAutoField;
    if (!key || key === "title") return;
    if (field.tagName === "TEXTAREA") {
      field.value = data[key] ?? "";
      autoGrowBpAutomationField(field);
    }
  });
  const conditionsList = node.querySelector(".bp-automation-conditions-list");
  if (conditionsList) {
    ensureBpAutomationMultiFields(node, conditionsList, "conditions");
    Array.from(conditionsList.querySelectorAll(".bp-automation-conditions-field")).forEach((field, idx) => {
      field.value = data.conditions[idx] ?? "";
      autoGrowBpAutomationField(field);
    });
  }
  const resultsList = node.querySelector(".bp-automation-results-list");
  if (resultsList) {
    ensureBpAutomationMultiFields(node, resultsList, "results");
    Array.from(resultsList.querySelectorAll(".bp-automation-results-field")).forEach((field, idx) => {
      field.value = data.results[idx] ?? "";
      autoGrowBpAutomationField(field);
    });
  }
  node.classList.toggle("bp-automation-expanded", !!data.expanded);
  const form = node.querySelector(".bp-automation-form");
  if (form) form.classList.toggle("hidden", !data.expanded);
  const toggle = node.querySelector(".bp-automation-toggle");
  if (toggle) {
    const label = data.expanded ? "Свернуть автоматизацию" : "Подробности автоматизации";
    toggle.title = label;
    toggle.setAttribute("aria-label", label);
  }
  const readOnly = isWorkspaceReadOnly();
  node.querySelectorAll(".bp-automation-field").forEach((field) => {
    field.disabled = readOnly;
  });
  if (title && title.contentEditable !== "true") title.contentEditable = "false";
  applyBpAutomationTypography(node);
  syncBpAutomationDataToDataset(node);
}

function toggleBpAutomationExpanded(node) {
  if (!node) return;
  const data = getBpAutomationData(node);
  data.expanded = !data.expanded;
  if (!data.expanded) node.dataset.bpAutomationAutoHeight = "1";
  syncBpAutomationDataToDataset(node);
  renderBpAutomationCardValues(node);
  refreshBpAutomationCardHeight(node);
  if (!isWorkspaceReadOnly()) saveLayout();
}

function bindBpAutomationToggleButton(node, btn) {
  if (!btn || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBpAutomationExpanded(node);
  });
}

function beginBpAutomationTitleEdit(node, titleEl) {
  if (!titleEl || isWorkspaceReadOnly() || titleEl.contentEditable === "true") return;
  titleEl.contentEditable = "true";
  titleEl.classList.add("is-editing");
  titleEl.focus();
  placeCaretAtEnd(titleEl);
}

function startBpAutomationTitleTypingEdit(node, initialText = null) {
  if (!canEditCurrentDocument() || !node || !isBpProcessAutomation(node)) return false;
  const titleEl = node.querySelector(".bp-automation-title");
  if (!titleEl || titleEl.contentEditable === "true") return false;
  if (selectedShape !== node) {
    selectShape(node);
    armBpAutomationReassign(node);
  }
  beginBpAutomationTitleEdit(node, titleEl);
  if (initialText != null) {
    titleEl.textContent = initialText;
    placeCaretAtEnd(titleEl);
  }
  return true;
}

function bindBpAutomationSelection(node) {
  if (!node || node.dataset.bpAutomationSelectionBound === "1") return;
  node.dataset.bpAutomationSelectionBound = "1";
  node.addEventListener("dblclick", (e) => {
    if (!canEditCurrentDocument()) return;
    if (e.target.closest(".bp-automation-toggle, .bp-automation-field, .bp-automation-title")) return;
    e.preventDefault();
    e.stopPropagation();
    selectShape(node);
    armBpAutomationReassign(node);
  }, true);
}

function bindBpAutomationTitleEdit(node, titleEl) {
  if (!titleEl || titleEl.dataset.bound === "1") return;
  titleEl.dataset.bound = "1";
  titleEl.addEventListener("dblclick", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedShape !== node) {
      selectShape(node);
      armBpAutomationReassign(node);
    }
    beginBpAutomationTitleEdit(node, titleEl);
  });
  titleEl.addEventListener("blur", () => {
    if (titleEl.contentEditable !== "true") return;
    titleEl.contentEditable = "false";
    titleEl.classList.remove("is-editing");
    const data = getBpAutomationData(node);
    data.title = (titleEl.innerText || "").trim() || data.title;
    syncBpAutomationDataToDataset(node);
    renderBpAutomationCardValues(node);
    refreshBpAutomationCardHeight(node);
    saveLayout();
  });
  titleEl.addEventListener("keydown", (e) => {
    if (titleEl.contentEditable !== "true") return;
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      titleEl.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      renderBpAutomationCardValues(node);
      titleEl.contentEditable = "false";
      titleEl.classList.remove("is-editing");
      titleEl.blur();
    }
  });
  titleEl.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (titleEl.contentEditable === "true") e.stopPropagation();
  });
}

function appendBpAutomationFormField(node, parent, key, className = "") {
  const field = document.createElement("textarea");
  field.className = className ? `bp-automation-field ${className}` : "bp-automation-field";
  field.dataset.bpAutoField = key;
  field.rows = 1;
  field.addEventListener("input", () => onBpAutomationFieldInput(node, key, field));
  field.addEventListener("pointerdown", (e) => e.stopPropagation());
  parent.appendChild(field);
  return field;
}

function buildBpAutomationCardUI(node) {
  if (!node || node.querySelector(".bp-automation-card-inner")) return;
  node.classList.add("bp-automation-card");
  const data = getBpAutomationData(node);
  const inner = document.createElement("div");
  inner.className = "bp-automation-card-inner";

  const header = document.createElement("div");
  header.className = "bp-automation-header";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "bp-automation-toggle";
  toggle.title = data.expanded ? "Свернуть автоматизацию" : "Подробности автоматизации";
  toggle.setAttribute("aria-label", toggle.title);
  decorateBpAutomationToggleButton(toggle);
  const title = document.createElement("div");
  title.className = "bp-automation-title";
  title.textContent = data.title;
  title.setAttribute("tabindex", "0");
  header.appendChild(toggle);
  header.appendChild(title);

  const form = document.createElement("div");
  form.className = `bp-automation-form${data.expanded ? "" : " hidden"}`;
  const formBody = document.createElement("div");
  formBody.className = "bp-automation-form-body";

  const whenSection = document.createElement("div");
  whenSection.className = "bp-automation-form-section";
  const whenLabel = document.createElement("div");
  whenLabel.className = "bp-automation-form-label bp-automation-form-label-block";
  whenLabel.textContent = "Когда";
  whenSection.appendChild(whenLabel);
  appendBpAutomationFormField(node, whenSection, "when");
  formBody.appendChild(whenSection);

  const conditionsSection = document.createElement("div");
  conditionsSection.className = "bp-automation-form-section";
  const conditionsLabel = document.createElement("div");
  conditionsLabel.className = "bp-automation-form-label bp-automation-form-label-block";
  conditionsLabel.textContent = "Условие";
  const conditionsList = document.createElement("div");
  conditionsList.className = "bp-automation-conditions-list";
  conditionsSection.appendChild(conditionsLabel);
  conditionsSection.appendChild(conditionsList);
  formBody.appendChild(conditionsSection);

  const descSection = document.createElement("div");
  descSection.className = "bp-automation-form-section";
  const descLabel = document.createElement("div");
  descLabel.className = "bp-automation-form-label bp-automation-form-label-block";
  descLabel.textContent = "Описание";
  descSection.appendChild(descLabel);
  appendBpAutomationFormField(node, descSection, "description", "bp-automation-field-area");
  formBody.appendChild(descSection);

  const resultsSection = document.createElement("div");
  resultsSection.className = "bp-automation-form-section";
  const resultsLabel = document.createElement("div");
  resultsLabel.className = "bp-automation-form-label bp-automation-form-label-block";
  resultsLabel.textContent = "Результат (ЦКП, DoD)";
  const resultsList = document.createElement("div");
  resultsList.className = "bp-automation-results-list";
  resultsSection.appendChild(resultsLabel);
  resultsSection.appendChild(resultsList);
  formBody.appendChild(resultsSection);

  form.appendChild(formBody);
  inner.appendChild(header);
  inner.appendChild(form);

  const hiddenText = document.createElement("div");
  hiddenText.className = "shape-text bp-automation-hidden-text";
  hiddenText.style.display = "none";
  hiddenText.dataset.rawText = data.title;

  const existingText = node.querySelector(".shape-text:not(.bp-automation-hidden-text)");
  if (existingText) existingText.remove();

  node.insertBefore(inner, node.firstChild);
  node.appendChild(hiddenText);

  node.dataset.bpAutomationDesignRev = "1";
  bindBpAutomationToggleButton(node, toggle);
  bindBpAutomationTitleEdit(node, title);
  bindBpAutomationSelection(node);
  ensureBpAutomationMultiFields(node, conditionsList, "conditions");
  ensureBpAutomationMultiFields(node, resultsList, "results");
  renderBpAutomationCardValues(node);
  applyBpAutomationTypography(node);
  syncBpAutomationHeaderShape(node);
}

function upgradeLegacyBpAutomationNode(node) {
  if (!isBpProcessAutomation(node) || node.querySelector(".bp-automation-card-inner")) return;
  try {
    const legacyText = node.querySelector(".shape-text");
    const fallback = legacyText?.dataset?.rawText || legacyText?.textContent || "";
    let raw = null;
    try {
      raw = node.dataset.bpAutomationData ? JSON.parse(node.dataset.bpAutomationData) : null;
    } catch {
      raw = null;
    }
    node.__bpAutomationData = normalizeBpAutomationData(raw, fallback);
    syncBpAutomationDataToDataset(node);
    buildBpAutomationCardUI(node);
  } catch (err) {
    console.error("Failed to upgrade BP automation:", node?.dataset?.shapeId, err);
  }
}

function measureBpAutomationContentHeight(autoNode) {
  const inner = autoNode.querySelector(".bp-automation-card-inner");
  if (!inner) return BP_AUTOMATION_DEFAULT_HEIGHT;
  const width = Math.max(40, autoNode.offsetWidth || parseFloat(autoNode.style.width) || BP_STAGE_WIDTH);
  inner.style.width = `${width}px`;
  const prevHeight = autoNode.style.height;
  autoNode.style.height = "auto";
  const measured = Math.ceil(autoNode.offsetHeight || inner.offsetHeight || BP_AUTOMATION_DEFAULT_HEIGHT);
  autoNode.style.height = prevHeight;
  return measured;
}

function fitBpAutomationHeightToText(autoNode) {
  if (!isBpProcessAutomation(autoNode) || autoNode.dataset.bpAutomationAutoHeight === "0") return false;
  if (!autoNode.querySelector(".bp-automation-title.is-editing")) {
    renderBpAutomationCardValues(autoNode);
  }
  const expanded = autoNode.classList.contains("bp-automation-expanded");
  const nextH = Math.max(expanded ? 36 : 28, measureBpAutomationContentHeight(autoNode));
  const prevH = getBpAutomationHeight(autoNode);
  const prevTop = getElementLogicalBox(autoNode).top;
  if (Math.abs(prevH - nextH) < 0.5) {
    syncBpAutomationHeaderShape(autoNode);
    return false;
  }
  autoNode.style.height = `${nextH}px`;
  // Anchor the yellow header (bottom edge); content expands/contracts upward.
  autoNode.style.top = `${prevTop + prevH - nextH}px`;
  syncBpAutomationHeaderShape(autoNode);
  return true;
}

function beginBpAutomationResizeState(autoNode, event, dir = "se") {
  const stage = getBpStageForAutomation(autoNode);
  const box = getElementLogicalBox(autoNode);
  return {
    x: event.clientX,
    y: event.clientY,
    l: box.left,
    t: box.top,
    w: box.width,
    h: box.height,
    dir,
    stageW: stage ? (stage.offsetWidth || parseFloat(stage.style.width) || BP_STAGE_WIDTH) : 0,
    stageNode: stage
  };
}

/** Width is bound to the stage: horizontal resize changes the stage (tasks follow). Height stays on the automation. */
function applyBpAutomationLinkedResize(autoNode, rs, event, minH = 28) {
  if (!isBpProcessAutomation(autoNode) || !rs) return false;
  const dx = (event.clientX - rs.x) / zoom;
  const dy = (event.clientY - rs.y) / zoom;
  const dir = String(rs.dir || "se");
  const stage = rs.stageNode && rs.stageNode.isConnected ? rs.stageNode : getBpStageForAutomation(autoNode);
  const processId = autoNode.dataset.bpProcessId;
  const wantsWidth = /[ew]/.test(dir);
  const wantsHeight = /[ns]/.test(dir);

  if (stage && wantsWidth && Number.isFinite(rs.stageW)) {
    let nextStageW = rs.stageW;
    if (dir.includes("e")) nextStageW = rs.stageW + dx;
    else if (dir.includes("w")) nextStageW = rs.stageW - dx;
    nextStageW = Math.max(80, nextStageW);
    stage.style.width = `${nextStageW}px`;
    renderShapeVisual(stage);
    layoutConnectorPoints(stage);
    syncBpProcessStageHeights(stage);
    if (processId) relayoutBpStagesAfter(processId, Number(stage.dataset.bpStageIndex) + 1);
  }

  if (wantsHeight) {
    let nextH = rs.h;
    if (dir.includes("s")) nextH = rs.h + dy;
    if (dir.includes("n")) nextH = rs.h - dy;
    nextH = Math.max(minH, nextH);
    autoNode.dataset.bpAutomationAutoHeight = "0";
    autoNode.style.height = `${nextH}px`;
  }

  if (processId) {
    // relayoutBpStagesAfter already syncs tasks+automations when width changed;
    // height-only still needs an automation pass.
    if (!wantsWidth) layoutAllBpAutomationsInProcess(processId);
    else {
      layoutAllBpTasksInProcess(processId);
      layoutAllBpAutomationsInProcess(processId);
    }
  } else {
    syncBpAutomationHeaderShape(autoNode);
  }
  return true;
}

function finalizeBpAutomationManualResize(autoNode, resizeState) {
  if (!isBpProcessAutomation(autoNode) || !resizeState) return;
  const processId = autoNode.dataset.bpProcessId;
  const nextH = getBpAutomationHeight(autoNode);
  const heightChanged = Math.abs(nextH - (resizeState.h ?? nextH)) > 0.5;
  if (heightChanged) autoNode.dataset.bpAutomationAutoHeight = "0";
  if (processId) {
    layoutAllBpTasksInProcess(processId);
    layoutAllBpAutomationsInProcess(processId);
  }
}

function onBpAutomationResized(autoNode) {
  if (!isBpProcessAutomation(autoNode)) return;
  const processId = autoNode.dataset.bpProcessId;
  if (!processId) return;
  layoutAllBpAutomationsInProcess(processId);
}

function layoutAllBpAutomationsInProcess(processId) {
  const autos = getAllBpAutomationsInProcess(processId);
  if (!autos.length) {
    syncBpProcessSectionToggles(processId);
    return;
  }
  const sectionHidden = isBpAutomationsSectionHidden(processId);
  autos.forEach((node) => {
    node.classList.remove("bp-section-hidden");
    upgradeLegacyBpAutomationNode(node);
    bindBpAutomationSelection(node);
  });
  const stageTop = getBpProcessBackgroundTop(processId);
  const stageAttachGap = getBpStageAttachGap(processId);
  const sharedBottom = stageTop - stageAttachGap;
  const byStage = new Map();
  autos.forEach((node) => {
    const stageIndex = Number(node.dataset.bpAutomationStageIndex);
    if (!byStage.has(stageIndex)) byStage.set(stageIndex, []);
    byStage.get(stageIndex).push(node);
  });
  byStage.forEach((stageAutos) => {
    stageAutos.sort((a, b) => (Number(a.dataset.bpAutomationOrder) || 0) - (Number(b.dataset.bpAutomationOrder) || 0));
  });

  const sortedStageIndices = [...byStage.keys()].sort((a, b) => a - b);
  sortedStageIndices.forEach((stageIndex) => {
    const stageAutos = byStage.get(stageIndex);
    const stage = getBpStageForIndex(processId, stageIndex);
    if (!stage || !stageAutos?.length) return;
    const width = getBpAutomationWidthForStage(stage);
    const left = getBpAutomationLeftForStage(stage);
    const stageZ = Math.max(1, Number(stage.style.zIndex) || 0);
    const stackTopZ = stageZ + stageAutos.length;
    let cursorBottom = sharedBottom;
    stageAutos.forEach((node, index) => {
      // Width follows stage; height follows content — never keep a manual stretch size.
      node.dataset.bpAutomationAutoHeight = "1";
      delete node.dataset.bpAutomationManualPosition;
      node.querySelector(":scope > .resize-handle")?.remove();
      fitBpAutomationHeightToText(node);
      const height = getBpAutomationHeight(node);
      const top = cursorBottom - height;
      node.style.left = `${left}px`;
      node.style.width = `${width}px`;
      node.style.top = `${top}px`;
      const layoutZ = stackTopZ - index;
      const currentZ = Number(node.style.zIndex) || 0;
      node.style.zIndex = String(currentZ > stackTopZ ? currentZ : layoutZ);
      applyBpAutomationStyle(node);
      syncBpAutomationHeaderShape(node);
      layoutConnectorPoints(node);
      node.classList.toggle("bp-section-hidden", sectionHidden);
      cursorBottom = top - BP_AUTOMATION_STACK_GAP;
    });
  });

  renderConnectors();
  updateDesktopExtent();
  syncBpProcessSectionToggles(processId);
}

function bumpBpAutomationStageIndicesFrom(processId, fromIndex) {
  const start = Number(fromIndex);
  if (!Number.isFinite(start)) return;
  getAllBpAutomationsInProcess(processId).forEach((node) => {
    const idx = Number(node.dataset.bpAutomationStageIndex);
    if (idx >= start) node.dataset.bpAutomationStageIndex = String(idx + 1);
  });
}

function addBpAutomationForStage(stageNode) {
  if (!canEditCurrentDocument() || !stageNode) return;
  try {
    const processId = stageNode.dataset.bpProcessId;
    const groupId = getShapeGroupId(stageNode);
    const stageIndex = Number(stageNode.dataset.bpStageIndex);
    if (!processId || !groupId) return;
    const autoCount = desktop.querySelectorAll(`.shape[data-bp-process-id="${processId}"][data-bp-role="automation"]`).length;
    const stageTop = getElementLogicalBox(stageNode).top;
    const attachGap = getBpStageAttachGap(processId);
    const note = createBpAutomationNote({
      left: `${getBpAutomationLeftForStage(stageNode)}px`,
      top: `${stageTop - attachGap - BP_AUTOMATION_DEFAULT_HEIGHT}px`,
      width: `${getBpAutomationWidthForStage(stageNode)}px`,
      height: `${BP_AUTOMATION_DEFAULT_HEIGHT}px`,
      title: `Автоматизация ${autoCount + 1}`,
      fill: BP_AUTOMATION_FILL,
      borderEnabled: false,
      hAlign: "left",
      vAlign: "top",
      fontSize: 14,
      bpAutomationAutoHeight: true,
      groupId,
      bpProcessId: processId,
      bpRole: "automation",
      bpAutomationStageIndex: stageIndex,
      bpAutomationOrder: getBpAutomationsForStage(processId, stageIndex).length,
      zIndex: ++zCounter
    }, false);
    layoutAllBpAutomationsInProcess(processId);
    selectShape(note);
    saveLayout();
  } catch (err) {
    console.error("Failed to add BP automation:", err);
    showHint(`Не удалось создать автоматизацию: ${err && err.message ? err.message : err}`, "error", 5000);
  }
}

function createBpAutomationNote(opts = {}, doSave = true) {
  opts = { ...BP_FACTORY_VISUAL_OPTS, ...opts, bpRole: "automation", borderEnabled: false, radius: 0 };
  const node = createShapeBase("shape-note", opts);
  applyBpProcessMeta(node, opts);
  node.__bpAutomationData = normalizeBpAutomationData(opts.bpAutomationData, opts.title || opts.text || "Автоматизация");
  syncBpAutomationDataToDataset(node);
  if (opts.bpAutomationTypography && typeof opts.bpAutomationTypography === "object") {
    node.dataset.bpAutomationTypography = JSON.stringify({
      title: clampFontSizeStep(opts.bpAutomationTypography.title, 15),
      label: clampFontSizeStep(opts.bpAutomationTypography.label, 10.5),
      field: clampFontSizeStep(opts.bpAutomationTypography.field, 14)
    });
  }

  buildBpAutomationCardUI(node);
  // Size is bound to stage width + content height — no manual resize (same idea as BP tasks' locked width).
  addShapeHandles(node, false, { disableResize: true });
  attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: false,
    gradientEnabled: false,
    fill1: BP_AUTOMATION_FILL,
    fill2: BP_AUTOMATION_FILL,
    fillDirection: "horizontal"
  });
  node.style.borderColor = "transparent";
  node.style.borderWidth = "0px";
  node.dataset.borderEnabled = "0";
  node.dataset.borderStyle = "solid";
  node.style.borderStyle = "solid";
  applyBpAutomationStyle(node);
  appendToDesktop(node);
  fitBpAutomationHeightToText(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
  return node;
}

function getSortedBpStagesForSteppedFill(nodes) {
  if (!Array.isArray(nodes) || nodes.length < 2) return null;
  if (!nodes.every(isBpProcessStage)) return null;
  const processIds = new Set(nodes.map((node) => node.dataset.bpProcessId));
  if (processIds.size !== 1) return null;
  return [...nodes].sort((a, b) => Number(a.dataset.bpStageIndex) - Number(b.dataset.bpStageIndex));
}

function lerpHexColor(color1, color2, t) {
  const a = rgbToHex(color1).replace("#", "");
  const b = rgbToHex(color2).replace("#", "");
  const ar = parseInt(a.slice(0, 2), 16);
  const ag = parseInt(a.slice(2, 4), 16);
  const ab = parseInt(a.slice(4, 6), 16);
  const br = parseInt(b.slice(0, 2), 16);
  const bg = parseInt(b.slice(2, 4), 16);
  const bb = parseInt(b.slice(4, 6), 16);
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const r = clamp(ar + (br - ar) * t);
  const g = clamp(ag + (bg - ag) * t);
  const bl = clamp(ab + (bb - ab) * t);
  return `#${[r, g, bl].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function shouldApplyBpStagesSteppedGradient(shapes) {
  const stages = getSortedBpStagesForSteppedFill(shapes);
  if (!stages) return null;
  if (!fpFillEnabled || isControlMixed(fpFillEnabled) || !fpFillEnabled.checked) return null;
  if (!fpGradientEnabled || isControlMixed(fpGradientEnabled) || !fpGradientEnabled.checked) return null;
  if (!fpFill || isControlMixed(fpFill)) return null;
  if (!fpFill2 || isControlMixed(fpFill2)) return null;
  return { stages, fill1: fpFill.value, fill2: fpFill2.value };
}

function applyBpStagesSteppedFill(stages, fill1, fill2) {
  const start = rgbToHex(fill1);
  const end = rgbToHex(fill2);
  const count = stages.length;
  stages.forEach((node, index) => {
    const t = count === 1 ? 0 : index / (count - 1);
    const color = lerpHexColor(start, end, t);
    applyFillStyle(node, {
      fillEnabled: true,
      gradientEnabled: false,
      fill1: color,
      fill2: color,
      fillDirection: "horizontal"
    });
    if (node.dataset.shapeVisual === "1") renderShapeVisual(node);
  });
}

function relayoutBpStagesAfter(processId, fromIndex = 1) {
  const stages = getBpStages(processId);
  if (!stages.length) return;
  const rowTop = getBpStageRowTop(processId);

  stages.forEach((stage) => {
    const top = Number.isFinite(parseFloat(stage.style.top))
      ? parseFloat(stage.style.top)
      : getElementLogicalBox(stage).top;
    if (Math.abs(top - rowTop) > 0.5) {
      setNodePosition(stage, getElementLogicalBox(stage).left, rowTop);
      layoutConnectorPoints(stage);
    }
  });

  if (stages.length === 1) {
    layoutBpProcessBase(processId);
    syncAllBpTasksInProcess(processId);
    renderConnectors();
    return;
  }

  const start = Math.max(1, Number(fromIndex) || 1);
  for (let i = start; i < stages.length; i += 1) {
    const prev = stages[i - 1];
    const current = stages[i];
    setNodePosition(current, getBpStageLeftAfter(prev), rowTop);
    layoutConnectorPoints(current);
  }
  layoutBpProcessBase(processId);
  updateDesktopExtent();
  syncAllBpTasksInProcess(processId);
  renderConnectors();
}

function syncBpProcessStageHeights(sourceNode) {
  if (!isBpProcessStage(sourceNode)) return;
  const processId = sourceNode.dataset.bpProcessId;
  const stages = getBpStages(processId);
  if (!stages.length) return;
  const nextHeight = Math.max(40, sourceNode.offsetHeight || parseFloat(sourceNode.style.height) || BP_STAGE_HEIGHT);
  const nextTop = sourceNode.style.top;
  stages.forEach((stage) => {
    stage.style.height = `${nextHeight}px`;
    if (nextTop) stage.style.top = nextTop;
    renderShapeVisual(stage);
    layoutConnectorPoints(stage);
  });
  layoutBpProcessBase(processId);
  updateDesktopExtent();
  renderConnectors();
}

function onChevronShapeResized(node) {
  if (normalizeShapeVariant(node?.dataset?.shapeVariant) !== "chevron") return;
  renderShapeVisual(node);
  layoutConnectorPoints(node);
  if (isBpProcessStage(node)) {
    syncBpProcessStageHeights(node);
    relayoutBpStagesAfter(node.dataset.bpProcessId, Number(node.dataset.bpStageIndex) + 1);
  }
  syncAllLiftedControlsPositions();
}

function createBpProcessStage(opts = {}, doSave = true) {
  const stageIndex = Number(opts.bpStageIndex) || 0;
  const isLast = opts.isLastStage === true;
  const colors = getBpStageColors();
  return createShapeRectangle({
    ...BP_FACTORY_VISUAL_OPTS,
    shapeVariant: "chevron",
    shapeInsetDepthPx: BP_CHEVRON_INSET_PX,
    width: `${BP_STAGE_WIDTH}px`,
    height: opts.height || `${BP_STAGE_HEIGHT}px`,
    borderEnabled: false,
    hAlign: "center",
    vAlign: "middle",
    fontSize: isLast ? 13 : 15,
    bold: isLast,
    fill: opts.fill || colors[Math.min(stageIndex, colors.length - 1)],
    textColor: opts.textColor || getBpStageTextColor(isLast),
    text: opts.text != null ? opts.text : (isLast ? "ПРЕДОПЛАТА ПОЛУЧЕНА" : `Стадия ${stageIndex + 1}`),
    bpProcessId: opts.bpProcessId,
    bpRole: "stage",
    bpStageIndex: stageIndex,
    groupId: opts.groupId,
    left: opts.left,
    top: opts.top,
    zIndex: opts.zIndex
  }, doSave);
}

function bumpBpTaskStageIndicesFrom(processId, fromIndex) {
  const start = Number(fromIndex);
  if (!Number.isFinite(start)) return;
  getAllBpTasksInProcess(processId).forEach((task) => {
    const idx = Number(task.dataset.bpTaskStageIndex);
    if (idx >= start) task.dataset.bpTaskStageIndex = String(idx + 1);
  });
  bumpBpAutomationStageIndicesFrom(processId, fromIndex);
}

function insertBpStageAt(processId, groupId, atIndex, refStageNode = null) {
  // Visual order is the source of truth; sync indices before computing the insert slot.
  const sorted = compactBpStageIndices(processId);
  if (!sorted.length) return null;
  let insertAt = Number(atIndex);
  if (!Number.isFinite(insertAt)) insertAt = sorted.length;
  insertAt = Math.max(0, Math.min(insertAt, sorted.length));
  const heightRef = refStageNode && refStageNode.dataset.bpProcessId === processId
    ? refStageNode
    : (insertAt <= 0 ? sorted[0] : (insertAt >= sorted.length ? sorted[sorted.length - 1] : sorted[insertAt - 1]));
  const stageHeight = Math.max(40, heightRef.offsetHeight || parseFloat(heightRef.style.height) || BP_STAGE_HEIGHT);
  const newTop = heightRef.style.top || sorted[0].style.top;
  const anchorLeft = sorted[0].offsetLeft;
  sorted.forEach((node) => {
    const idx = Number(node.dataset.bpStageIndex);
    if (idx >= insertAt) node.dataset.bpStageIndex = String(idx + 1);
  });
  bumpBpTaskStageIndicesFrom(processId, insertAt);
  const isLast = insertAt === sorted.length;
  const colors = getBpStageColors();
  const newStage = createBpProcessStage({
    bpProcessId: processId,
    groupId,
    bpStageIndex: insertAt,
    isLastStage: isLast,
    // Temporary left; relayoutBpStagesAfter rebuilds the full chain from index order.
    left: `${anchorLeft}px`,
    top: newTop,
    height: `${stageHeight}px`,
    zIndex: ++zCounter,
    text: isLast ? "ПРЕДОПЛАТА ПОЛУЧЕНА" : `Стадия ${insertAt + 1}`,
    fill: isLast ? colors[colors.length - 1] : colors[Math.min(insertAt, colors.length - 2)],
    textColor: getBpStageTextColor(isLast)
  }, false);
  syncBpProcessStageHeights(heightRef);
  relayoutBpStagesAfter(processId, 1);
  selectShape(newStage);
  return newStage;
}

function insertBpStageRelative(stageNode, side) {
  if (!canEditCurrentDocument() || !stageNode) return;
  const processId = stageNode.dataset.bpProcessId;
  const groupId = getShapeGroupId(stageNode);
  if (!processId || !groupId) return;
  const visual = getBpStagesByVisualOrder(processId);
  const visualIndex = visual.indexOf(stageNode);
  if (visualIndex < 0) return;
  const atIndex = side === "left" ? visualIndex : visualIndex + 1;
  insertBpStageAt(processId, groupId, atIndex, stageNode);
  saveLayout();
}

function addBpTaskForStage(stageNode) {
  if (!canEditCurrentDocument() || !stageNode) return;
  try {
    const processId = stageNode.dataset.bpProcessId;
    const groupId = getShapeGroupId(stageNode);
    const stageIndex = Number(stageNode.dataset.bpStageIndex);
    if (!processId || !groupId) return;
    const taskCount = desktop.querySelectorAll(`.shape[data-bp-process-id="${processId}"][data-bp-role="task"]`).length;
    const note = createBpTaskNote({
      left: `${getBpTaskLeftForStage(stageNode)}px`,
      top: `${getBpProcessBackgroundBottom(processId) + BP_TASK_STAGE_GAP}px`,
      width: `${getBpTaskWidthForStage(stageNode)}px`,
      height: `${BP_TASK_DEFAULT_HEIGHT}px`,
      radius: BP_TASK_RADIUS,
      title: `Задача ${taskCount + 1}`,
      fill: "#fbcfe8",
      borderEnabled: false,
      hAlign: "left",
      vAlign: "top",
      fontSize: 14,
      bpTaskAutoHeight: true,
      groupId,
      bpProcessId: processId,
      bpRole: "task",
      bpTaskStageIndex: stageIndex,
      bpTaskOrder: getBpTasksForStage(processId, stageIndex).length,
      zIndex: ++zCounter
    }, false);
    layoutAllBpTasksInProcess(processId);
    selectShape(note);
    saveLayout();
  } catch (err) {
    console.error("Failed to add BP task:", err);
    showHint(`Не удалось создать задачу: ${err && err.message ? err.message : err}`, "error", 5000);
  }
}

function syncBpProcessControls() {
  document.querySelectorAll(".bp-stage-controls").forEach((el) => el.remove());
  interactionControlsLayer?.querySelectorAll(".bp-stage-controls").forEach((el) => el.remove());
  if (!selectedShape || selectedShape.dataset.bpRole !== "stage" || isWorkspaceReadOnly()) return;
  const layer = document.createElement("div");
  layer.className = "bp-stage-controls";
  [
    { dir: "left", title: "Вставить стадию слева", action: () => insertBpStageRelative(selectedShape, "left") },
    { dir: "right", title: "Вставить стадию справа", action: () => insertBpStageRelative(selectedShape, "right") },
    { dir: "top", title: "Добавить автоматизацию", action: () => addBpAutomationForStage(selectedShape) },
    { dir: "bottom", title: "Добавить задачу", action: () => addBpTaskForStage(selectedShape) }
  ].forEach(({ dir, title, action }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `bp-stage-control bp-stage-control-${dir}`;
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.textContent = "+";
    btn.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      action();
    });
    layer.appendChild(btn);
  });
  selectedShape.appendChild(layer);
}

function createSequentialBusinessProcess(opts = {}, doSave = true) {
  const processId = `bp${bpProcessCounter++}`;
  const groupId = `g${groupCounter++}`;
  const count = BP_DEFAULT_STAGE_COUNT;
  const stagesSpan = getBpStagesSpan(count);
  const hasManualPos = Boolean(opts.left || opts.top);
  let originX = 140;
  let originY = 140;
  if (hasManualPos) {
    originX = parseFloat(opts.left) || originX;
    originY = parseFloat(opts.top) || originY;
  } else {
    const vr = viewportEl.getBoundingClientRect();
    const center = getDesktopPoint(vr.left + vr.width / 2, vr.top + vr.height / 2);
    const baseWidth = stagesSpan + BP_BASE_PAD_X * 2;
    originX = Math.max(0, center.x - baseWidth / 2);
    originY = Math.max(0, center.y - (BP_STAGE_HEIGHT + BP_BASE_PAD_Y * 2) / 2);
  }
  const baseWidth = stagesSpan + BP_BASE_PAD_X * 2;
  const stageTop = `${originY + BP_BASE_PAD_Y}px`;
  const baseZ = ++zCounter;
  createShapeRectangle({
    ...BP_FACTORY_VISUAL_OPTS,
    left: `${originX}px`,
    top: `${originY}px`,
    width: `${baseWidth}px`,
    height: `${BP_STAGE_HEIGHT + BP_BASE_PAD_Y * 2}px`,
    shapeVariant: "chevron",
    shapeInsetDepthPx: BP_CHEVRON_INSET_PX,
    fill: getBpBaseFill(),
    borderEnabled: false,
    text: "",
    groupId,
    bpProcessId: processId,
    bpRole: "base",
    zIndex: baseZ,
    hAlign: "center",
    vAlign: "middle"
  }, false);
  const stages = [];
  let stageLeft = originX + BP_BASE_PAD_X;
  let prevStage = null;
  for (let i = 0; i < count; i += 1) {
    const isLast = i === count - 1;
    const left = i === 0 ? stageLeft : getBpStageLeftAfter(prevStage);
    const stage = createBpProcessStage({
      bpProcessId: processId,
      groupId,
      bpStageIndex: i,
      isLastStage: isLast,
      left: `${left}px`,
      top: stageTop,
      zIndex: ++zCounter
    }, false);
    stages.push(stage);
    prevStage = stage;
  }
  layoutBpProcessBase(processId);
  updateDesktopExtent();
  renderConnectors();
  if (stages[0]) selectShape(stages[0]);
  if (doSave) saveLayout();
  return { processId, groupId, stages };
}

function createShapeFrame(opts = {}, doSave = true) {
  const width = opts.width || "320px";
  const height = opts.height || "240px";
  const node = createShapeBase("shape-frame", {
    ...opts,
    width,
    height
  });
  node.dataset.frameName = String(opts.frameName || "").trim() || getDefaultFrameName();
  node.style.background = "transparent";
  node.style.border = "2px solid #bbbbbb";
  node.style.borderRadius = "8px";
  node.style.boxShadow = "none";
  node.dataset.borderColor = "#bbbbbb";
  node.dataset.borderEnabled = "1";
  node.dataset.borderWidth = "2";
  const label = document.createElement("div");
  label.className = "frame-name";
  label.addEventListener("pointerdown", (e) => e.stopPropagation());
  label.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    beginFrameNameEdit(node);
  });
  node.appendChild(label);
  syncFrameNameLabel(node);
  addShapeHandles(node, false, { minWidth: FRAME_MIN_SIZE, minHeight: FRAME_MIN_SIZE });
  appendToDesktop(node);
  if (opts.collectChildren !== false) {
    const children = Array.isArray(opts.children) ? opts.children : getElementsCompletelyInFrame(node);
    addElementsToFrame(node, children);
  } else {
    reorderFrameBehindChildren(node);
  }
  updateDesktopExtent();
  selectShape(node);
  if (doSave) saveLayout();
  return node;
}

function createShapeRectangle(opts = {}, doSave = true) {
  const isTextTool = !!opts.textTool;
  if (opts.bpRole !== "base" && opts.bpRole !== "stage") {
    opts = applyCreationStylePreset("shape-rect", opts);
  }
  if (isTextTool) {
    opts = {
      ...opts,
      textTool: true,
      fillEnabled: false,
      gradientEnabled: false,
      borderEnabled: false,
      borderWidth: 0,
      shadow: 0,
      textPaddingTop: opts.textPaddingTop ?? 2,
      textPaddingRight: opts.textPaddingRight ?? 2,
      textPaddingBottom: opts.textPaddingBottom ?? 2,
      textPaddingLeft: opts.textPaddingLeft ?? 2
    };
  }
  opts.shapeVariant = normalizeShapeVariant(opts.shapeVariant || opts.variant);
  const variantSpec = SHAPE_VARIANTS[opts.shapeVariant] || SHAPE_VARIANTS.rectangle;
  opts.width = opts.width || variantSpec.width;
  opts.height = opts.height || variantSpec.height;
  const node = createShapeBase("shape-rect", opts);
  applyBpProcessMeta(node, opts);
  node.dataset.shapeVariant = opts.shapeVariant;
  if (isTextTool) {
    node.dataset.textTool = "1";
    node.classList.add("shape-text-tool");
  }
  if (opts.shapeVariant === "chevron") {
    if (opts.shapeInsetDepthPx != null) {
      setChevronInsetDepthPx(node, opts.shapeInsetDepthPx);
    } else if (opts.shapeInsetDepth != null) {
      ensureChevronInsetDepthPx(node, opts.shapeInsetDepth, "percent");
    } else {
      const bpChevron = opts.bpRole === "base" || opts.bpRole === "stage";
      setChevronInsetDepthPx(node, bpChevron ? BP_CHEVRON_INSET_PX : DEFAULT_CHEVRON_INSET_PX);
    }
  } else if (getVariantDepthConfig(opts.shapeVariant)) {
    setShapeVariantDepth(
      node,
      opts.shapeVariant,
      opts.shapeInsetDepth ?? opts.shapeSkewDepth ?? opts.shapeChamferDepth
    );
  }
  node.dataset.scrollEnabled = opts.scrollEnabled ? "1" : "0";
  if (opts.radius != null) node.dataset.cornerRadius = String(opts.radius);
  renderShapeVisual(node);
  const text = document.createElement("div");
  text.className = "shape-text";
  text.contentEditable = "false";
  text.dataset.rawText = String(opts.text || "");
  if (opts.textHtml) text.dataset.textHtml = sanitizeShapeTextHtml(String(opts.textHtml));
  text.dataset.numberGrouping = opts.numberGrouping != null ? (opts.numberGrouping ? "1" : "0") : "1";
  setNumberFormat(text, opts.numberFormat);
  setFormulaDecimalPlaces(text, opts.decimalPlaces);
  text.style.fontFamily = opts.fontFamily ? fontCssFromKey(opts.fontFamily) : FONT_STACKS.Arial;
  text.style.color = opts.textColor || "#000000";
  text.style.fontSize = (opts.fontSize || 16) + "px";
  text.style.fontWeight = opts.bold ? "700" : "400";
  applyTextAlign(text, opts.hAlign || "left", opts.vAlign || "top");
  if (opts.textPaddingTop != null || opts.textPaddingRight != null || opts.textPaddingBottom != null || opts.textPaddingLeft != null) {
    applyShapeTextPaddingValues(text, {
      top: opts.textPaddingTop ?? DEFAULT_SHAPE_TEXT_PADDING,
      right: opts.textPaddingRight ?? DEFAULT_SHAPE_TEXT_PADDING,
      bottom: opts.textPaddingBottom ?? DEFAULT_SHAPE_TEXT_PADDING,
      left: opts.textPaddingLeft ?? DEFAULT_SHAPE_TEXT_PADDING
    });
  }
  bindShapeTextDblSelectEditing(node, text);
  text.addEventListener("pointerdown", (e) => {
    if (text.contentEditable === "true") e.stopPropagation();
  });
  text.addEventListener("blur", () => scheduleFinishInlineShapeEditingOnBlur(text));
  text.addEventListener("keydown", (e) => {
    if (text.contentEditable !== "true") return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      finishInlineShapeEditing(text, { revert: true });
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      insertLineBreakAtCursor(text);
      syncShapeTextRichContent(text);
      refreshActiveFormulaReferenceHighlight();
      if (node.dataset.textTool === "1") fitTextToolShape(node);
      saveLayout();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      finishInlineShapeEditing(text);
    }
  });
  text.addEventListener("input", () => {
    syncShapeTextRichContent(text);
    refreshAllFormulaDisplays();
    refreshActiveFormulaReferenceHighlight();
    if (node.dataset.textTool === "1") fitTextToolShape(node);
    saveLayout();
  });
  text.addEventListener("keyup", refreshActiveFormulaReferenceHighlight);
  text.addEventListener("mouseup", refreshActiveFormulaReferenceHighlight);
  const rh = document.createElement("div"); rh.className = "resize-handle";
  node.appendChild(text); node.appendChild(rh);
  applyShapeScrollState(node);
  addShapeHandles(node, false);
  attachResize(node, rh, 80, 40, { raiseOnResize: false });
  attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: opts.fillEnabled !== false,
    gradientEnabled: opts.gradientEnabled,
    fill1: opts.fill || opts.fillColor || "#ffffff",
    fill2: opts.fillColor2 || opts.fill2 || opts.fill || opts.fillColor || "#ffffff",
    fillDirection: opts.fillDirection || "horizontal"
  });
  setShapeBorderColor(node, opts.border || opts.borderColor || node.dataset.borderColor || "#111827");
  node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(0, Number(node.dataset.borderWidth) || 0)}px` : "0px";
  node.dataset.borderStyle = normalizeBorderLineStyle(opts.borderStyle || "solid");
  node.style.borderStyle = node.dataset.borderStyle;
  if (opts.radius != null && opts.shapeVariant === "rectangle") node.style.borderRadius = `${opts.radius}px`;
  if (opts.shapeVariant === "rounded" && opts.radius == null) node.style.borderRadius = `${variantSpec.radius || 28}px`;
  syncShapeVisualStyle(node);
  renderShapeText(text);
  node.addEventListener("wheel", (event) => {
    if (!isShapeScrollEnabled(node)) return;
    const targetText = node.querySelector(".shape-text");
    if (!targetText || targetText.contentEditable === "true") return;
    const canScrollY = targetText.scrollHeight > targetText.clientHeight;
    const canScrollX = targetText.scrollWidth > targetText.clientWidth;
    if (!canScrollY && !canScrollX) return;
    targetText.scrollTop += event.deltaY;
    targetText.scrollLeft += event.deltaX;
    event.preventDefault();
    event.stopPropagation();
  }, { passive: false });
  appendToDesktop(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
  return node;
}

function isAttachedAnnotationNote(node) {
  return !!(node
    && node.dataset?.shapeType === "shape-note"
    && node.dataset.attachedNote === "1"
    && node.dataset.bpRole !== "task"
    && node.dataset.bpRole !== "automation");
}

function getAttachedNoteForOwner(owner) {
  const id = owner?.dataset?.attachedNoteId || "";
  if (!id) return null;
  const note = getShapeById(id);
  return isAttachedAnnotationNote(note) ? note : null;
}

function getNoteOwnerShape(note) {
  const id = note?.dataset?.noteOwnerId || "";
  return id ? getShapeById(id) : null;
}

function canAttachNoteToShape(node) {
  if (!node || isWorkspaceReadOnly() || !canEditCurrentDocument()) return false;
  if (isAttachedAnnotationNote(node)) return false;
  if (node.dataset?.bpRole === "task" || node.dataset?.bpRole === "automation") return false;
  if (node.dataset?.shapeType === "shape-line") return false;
  return !!node.dataset?.shapeId;
}

function setAttachedNoteCollapsed(note, collapsed) {
  if (!note || !isAttachedAnnotationNote(note)) return;
  note.classList.toggle("attached-note-collapsed", !!collapsed);
  if (collapsed) {
    note.setAttribute("aria-hidden", "true");
  } else {
    note.removeAttribute("aria-hidden");
  }
}

function isAttachedNoteCollapsed(note) {
  return !!(note && note.classList.contains("attached-note-collapsed"));
}

function getAttachedNoteBadgeAnchor(owner) {
  const box = getElementLogicalBox(owner);
  const size = ATTACHED_NOTE_BADGE_SCREEN_SIZE / getDesktopZoom();
  const left = box.left + box.width - size;
  const top = box.top - size;
  return {
    left,
    top,
    right: left + size,
    bottom: top + size,
    size
  };
}

function positionAttachedNoteNearOwner(note, owner) {
  if (!note || !owner) return;
  const nh = Math.max(60, note.offsetHeight || parseFloat(note.style.height) || ATTACHED_NOTE_DEFAULT_HEIGHT);
  const anchor = getAttachedNoteBadgeAnchor(owner);
  // Bottom-left of the note coincides with bottom-left of the note icon.
  setNodePosition(note, anchor.left, anchor.bottom - nh);
  bringToFront(note);
}

function collapseAttachedNote(note, opts = {}) {
  if (!note || !isAttachedAnnotationNote(note)) return;
  setAttachedNoteCollapsed(note, true);
  if (expandedAttachedNoteId === note.dataset.shapeId) expandedAttachedNoteId = null;
  if (opts.clearSelection !== false && selectedShape === note) {
    const owner = getNoteOwnerShape(note);
    clearSelectedShape();
    if (owner && opts.reselectOwner) selectShape(owner);
    else syncSelectionControlsOverlay();
  }
  if (opts.sync !== false) syncAttachedNoteBadge();
}

function collapseAllAttachedNotes(opts = {}) {
  if (!desktop) return;
  desktop.querySelectorAll('.shape[data-attached-note="1"]').forEach((note) => {
    if (!isAttachedAnnotationNote(note)) return;
    if (!isAttachedNoteCollapsed(note)) collapseAttachedNote(note, { clearSelection: false, sync: false });
  });
  expandedAttachedNoteId = null;
  if (opts.sync !== false) syncAttachedNoteBadge();
}

function expandAttachedNoteForOwner(owner) {
  if (!owner) return null;
  const note = getAttachedNoteForOwner(owner);
  if (!note) return null;
  if (expandedAttachedNoteId && expandedAttachedNoteId !== note.dataset.shapeId) {
    const prev = getShapeById(expandedAttachedNoteId);
    if (prev) collapseAttachedNote(prev, { clearSelection: false, sync: false });
  }
  positionAttachedNoteNearOwner(note, owner);
  setAttachedNoteCollapsed(note, false);
  expandedAttachedNoteId = note.dataset.shapeId;
  // Expand for reading only; select on a subsequent click when editing size/text.
  if (selectedShape === note) {
    clearSelectedShape();
    if (formatToggle.checked) syncFormatPanel();
    syncSelectionControlsOverlay();
  }
  syncAttachedNoteBadge();
  return note;
}

function resolveNoteAttachTarget() {
  if (selectedShape) {
    if (isAttachedAnnotationNote(selectedShape)) {
      return getNoteOwnerShape(selectedShape);
    }
    if (canAttachNoteToShape(selectedShape)) return selectedShape;
  }
  if (multiSelectedShapeIds.size === 1) {
    const only = getShapeById([...multiSelectedShapeIds][0]);
    if (canAttachNoteToShape(only)) return only;
  }
  return null;
}

function createAttachedNoteForOwner(owner, opts = {}) {
  if (!canAttachNoteToShape(owner)) return null;
  const existing = getAttachedNoteForOwner(owner);
  if (existing) return expandAttachedNoteForOwner(owner);
  const anchor = getAttachedNoteBadgeAnchor(owner);
  const note = createShapeNote({
    fill: ATTACHED_NOTE_FILL,
    fill2: ATTACHED_NOTE_FILL,
    fillEnabled: true,
    gradientEnabled: false,
    borderEnabled: false,
    borderWidth: 0,
    text: "",
    width: `${ATTACHED_NOTE_DEFAULT_WIDTH}px`,
    height: `${ATTACHED_NOTE_DEFAULT_HEIGHT}px`,
    left: formatContextSpawnPx(anchor.left),
    top: formatContextSpawnPx(anchor.bottom - ATTACHED_NOTE_DEFAULT_HEIGHT),
    attachedNote: true,
    noteOwnerId: owner.dataset.shapeId,
    collapsed: false,
    ...opts
  }, false);
  if (!note) return null;
  owner.dataset.attachedNoteId = note.dataset.shapeId;
  note.dataset.attachedNote = "1";
  note.dataset.noteOwnerId = owner.dataset.shapeId;
  note.classList.add("attached-annotation-note");
  expandAttachedNoteForOwner(owner);
  saveLayout();
  return note;
}

function attachOrExpandNoteForSelection() {
  if (!canEditCurrentDocument()) return null;
  const owner = resolveNoteAttachTarget();
  if (!owner) {
    showHint("Выделите фигуру, чтобы добавить заметку", "warning", 2200);
    return null;
  }
  const existing = getAttachedNoteForOwner(owner);
  if (existing) {
    if (!isAttachedNoteCollapsed(existing)) return existing;
    return expandAttachedNoteForOwner(owner);
  }
  return createAttachedNoteForOwner(owner);
}

function syncAttachedNoteBadge() {
  const layer = interactionControlsLayer?.isConnected ? interactionControlsLayer : null;
  if (layer) layer.querySelectorAll(".shape-note-badge").forEach((el) => el.remove());
  if (!desktop) return;
  const owners = [];
  desktop.querySelectorAll(".shape[data-attached-note-id]").forEach((owner) => {
    if (!owner?.dataset?.shapeId) return;
    const note = getAttachedNoteForOwner(owner);
    if (!note) return;
    // Hide icon while the note panel is expanded — it should "become" the note.
    if (!isAttachedNoteCollapsed(note)) return;
    owners.push(owner);
  });
  if (!owners.length) return;
  const useLayer = ensureInteractionControlsLayer();
  owners.forEach((owner) => {
    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "shape-note-badge";
    badge.dataset.liftedFromShape = owner.dataset.shapeId || "";
    badge.dataset.noteOwnerId = owner.dataset.shapeId || "";
    badge.setAttribute("aria-label", "Открыть заметку");
    badge.title = "Заметка";
    badge.appendChild(createWhiteboardIcon("note.svg"));
    badge.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      if (event.button === 0) event.preventDefault();
    });
    badge.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      expandAttachedNoteForOwner(owner);
    });
    useLayer.appendChild(badge);
    syncLiftedControlsPosition(owner);
  });
}

function finalizePastedAttachedNotes(createdEntries, maps) {
  if (!Array.isArray(createdEntries) || !maps?.shapeIds) return;
  createdEntries.forEach(({ source, node }) => {
    if (!node) return;
    const oldAttachedNoteId = String(source?.attachedNoteId || "").trim();
    if (oldAttachedNoteId) {
      const nextNoteId = maps.shapeIds.get(oldAttachedNoteId) || "";
      if (nextNoteId) node.dataset.attachedNoteId = nextNoteId;
      else delete node.dataset.attachedNoteId;
    }
    const oldOwnerId = String(source?.noteOwnerId || "").trim();
    if (source?.attachedNote || oldOwnerId) {
      const nextOwnerId = oldOwnerId ? (maps.shapeIds.get(oldOwnerId) || "") : "";
      if (nextOwnerId) {
        node.dataset.attachedNote = "1";
        node.dataset.noteOwnerId = nextOwnerId;
        node.classList.add("attached-annotation-note");
        setAttachedNoteCollapsed(node, true);
      } else {
        delete node.dataset.attachedNote;
        delete node.dataset.noteOwnerId;
        node.classList.remove("attached-annotation-note", "attached-note-collapsed");
      }
    }
  });
  expandedAttachedNoteId = null;
}

function maybeCollapseAttachedNotesFromPointer(event) {
  if (!expandedAttachedNoteId || !event) return;
  const note = getShapeById(expandedAttachedNoteId);
  if (!note || isAttachedNoteCollapsed(note)) {
    expandedAttachedNoteId = null;
    return;
  }
  const target = event.target;
  if (!target || typeof target.closest !== "function") return;
  if (note.contains(target)) return;
  const noteId = note.dataset.shapeId || "";
  const lifted = target.closest("[data-lifted-from-shape]");
  if (lifted && lifted.dataset.liftedFromShape === noteId) return;
  if (target.closest(".shape-note-badge")) return;
  if (target.closest("#formatPanel, .format-panel")) return;
  if (target.closest(".app-menu-dropdown, .file-dropdown, .shape-dropdown, .context-menu, .modal, .objects-toolbar")) return;
  if (target.closest(".objects-toolbar-tooltip")) return;
  collapseAttachedNote(note, { clearSelection: true, reselectOwner: false });
}

function createBpTaskNote(opts = {}, doSave = true) {
  opts = { ...BP_FACTORY_VISUAL_OPTS, radius: BP_TASK_RADIUS, ...opts, bpRole: "task" };
  const node = createShapeBase("shape-note", opts);
  applyBpProcessMeta(node, opts);
  node.__bpTaskData = normalizeBpTaskData(opts.bpTaskData, opts.title || opts.text || "Задача");
  syncBpTaskDataToDataset(node);
  if (opts.bpTaskTypography && typeof opts.bpTaskTypography === "object") {
    node.dataset.bpTaskTypography = JSON.stringify({
      title: clampFontSizeStep(opts.bpTaskTypography.title, 15),
      label: clampFontSizeStep(opts.bpTaskTypography.label, 10.5),
      field: clampFontSizeStep(opts.bpTaskTypography.field, 14)
    });
  }

  const rh = document.createElement("div");
  rh.className = "resize-handle";
  node.appendChild(rh);
  buildBpTaskCardUI(node);
  addShapeHandles(node, false);
  attachResize(node, rh, 280, 36, { raiseOnResize: false });
  attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: opts.fillEnabled !== false,
    gradientEnabled: opts.gradientEnabled,
    fill1: opts.fill || opts.fillColor || "#fbcfe8",
    fill2: opts.fillColor2 || opts.fill2 || opts.fill || opts.fillColor || "#fbcfe8",
    fillDirection: opts.fillDirection || "horizontal"
  });
  node.style.borderColor = opts.border || "#111827";
  node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(0, Number(node.dataset.borderWidth) || 0)}px` : "0px";
  node.dataset.borderStyle = normalizeBorderLineStyle(opts.borderStyle || "solid");
  node.style.borderStyle = node.dataset.borderStyle;
  if (opts.radius != null) node.style.borderRadius = `${opts.radius}px`;
  applyBpTaskStyle(node);
  appendToDesktop(node);
  fitBpTaskHeightToText(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
  return node;
}

function createShapeNote(opts = {}, doSave = true) {
  if (opts.bpRole === "task") return createBpTaskNote(opts, doSave);
  if (opts.bpRole === "automation") return createBpAutomationNote(opts, doSave);
  const isAttached = !!(opts.attachedNote || opts.noteOwnerId);
  if (!isAttached) opts = applyCreationStylePreset("shape-note", opts);
  else {
    opts = {
      fill: ATTACHED_NOTE_FILL,
      fill2: ATTACHED_NOTE_FILL,
      fillEnabled: true,
      gradientEnabled: false,
      borderEnabled: false,
      borderWidth: 0,
      text: opts.text != null ? opts.text : "",
      width: opts.width || `${ATTACHED_NOTE_DEFAULT_WIDTH}px`,
      height: opts.height || `${ATTACHED_NOTE_DEFAULT_HEIGHT}px`,
      ...opts,
      fill: opts.fill || ATTACHED_NOTE_FILL,
      fill2: opts.fill2 || opts.fill || ATTACHED_NOTE_FILL,
      borderEnabled: opts.borderEnabled === true,
      borderWidth: opts.borderEnabled === true ? (opts.borderWidth ?? 1) : 0
    };
  }
  const node = createShapeBase("shape-note", opts);
  applyBpProcessMeta(node, opts);
  if (isAttached) {
    node.dataset.attachedNote = "1";
    node.classList.add("attached-annotation-note");
    if (opts.noteOwnerId) node.dataset.noteOwnerId = String(opts.noteOwnerId);
  }
  const text = document.createElement("div");
  text.className = "shape-text";
  text.contentEditable = "false";
  let noteText = String(opts.text ?? "");
  if (isAttached && noteText === ATTACHED_NOTE_LEGACY_PLACEHOLDER) noteText = "";
  text.dataset.rawText = noteText;
  if (opts.textHtml) text.dataset.textHtml = sanitizeShapeTextHtml(String(opts.textHtml));
  text.dataset.numberGrouping = opts.numberGrouping != null ? (opts.numberGrouping ? "1" : "0") : "1";
  setNumberFormat(text, opts.numberFormat);
  setFormulaDecimalPlaces(text, opts.decimalPlaces);
  text.style.fontFamily = opts.fontFamily ? fontCssFromKey(opts.fontFamily) : FONT_STACKS.Arial;
  text.style.color = opts.textColor || "#000000";
  text.style.fontSize = (opts.fontSize || 16) + "px";
  text.style.fontWeight = opts.bold ? "700" : "400";
  applyTextAlign(text, opts.hAlign || "left", opts.vAlign || "top");
  if (opts.textPaddingTop != null || opts.textPaddingRight != null || opts.textPaddingBottom != null || opts.textPaddingLeft != null) {
    applyShapeTextPaddingValues(text, {
      top: opts.textPaddingTop ?? DEFAULT_SHAPE_TEXT_PADDING,
      right: opts.textPaddingRight ?? DEFAULT_SHAPE_TEXT_PADDING,
      bottom: opts.textPaddingBottom ?? DEFAULT_SHAPE_TEXT_PADDING,
      left: opts.textPaddingLeft ?? DEFAULT_SHAPE_TEXT_PADDING
    });
  }
  bindShapeTextDblSelectEditing(node, text);
  text.addEventListener("pointerdown", (e) => {
    if (text.contentEditable === "true") e.stopPropagation();
  });
  text.addEventListener("blur", () => scheduleFinishInlineShapeEditingOnBlur(text));
  text.addEventListener("keydown", (e) => {
    if (text.contentEditable !== "true") return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      finishInlineShapeEditing(text, { revert: true });
      return;
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      insertLineBreakAtCursor(text);
      syncShapeTextRichContent(text);
      refreshActiveFormulaReferenceHighlight();
      saveLayout();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      finishInlineShapeEditing(text);
    }
  });
  text.addEventListener("input", () => {
    syncShapeTextRichContent(text);
    refreshAllFormulaDisplays();
    refreshActiveFormulaReferenceHighlight();
    saveLayout();
  });
  text.addEventListener("keyup", refreshActiveFormulaReferenceHighlight);
  text.addEventListener("mouseup", refreshActiveFormulaReferenceHighlight);
  const rh = document.createElement("div"); rh.className = "resize-handle";
  node.appendChild(text); node.appendChild(rh);
  addShapeHandles(node, false);
  attachResize(node, rh, 100, 60, { raiseOnResize: false });
  if (!isAttached) attachConnectorPoints(node);
  applyFillStyle(node, {
    fillEnabled: opts.fillEnabled !== false,
    gradientEnabled: opts.gradientEnabled,
    fill1: opts.fill || opts.fillColor || (isAttached ? ATTACHED_NOTE_FILL : "#ffffff"),
    fill2: opts.fillColor2 || opts.fill2 || opts.fill || opts.fillColor || (isAttached ? ATTACHED_NOTE_FILL : "#ffffff"),
    fillDirection: opts.fillDirection || "horizontal"
  });
  node.style.borderColor = opts.border || "#111827";
  node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(0, Number(node.dataset.borderWidth) || 0)}px` : "0px";
  node.dataset.borderStyle = normalizeBorderLineStyle(opts.borderStyle || "solid");
  node.style.borderStyle = node.dataset.borderStyle;
  if (opts.radius != null) node.style.borderRadius = `${opts.radius}px`;
  if (!isAttached) applyBpTaskStyle(node);
  renderShapeText(text);
  if (isBpProcessTask(node)) fitBpTaskHeightToText(node);
  appendToDesktop(node);
  if (isAttached) {
    setAttachedNoteCollapsed(node, opts.collapsed !== false);
  }
  updateDesktopExtent();
  if (!isAttached) {
    layoutConnectorPoints(node);
    renderConnectors();
  }
  if (doSave) saveLayout();
  return node;
}

function createShapeImage(opts = {}, doSave = true) {
  const src = String(opts.imageSrc || opts.src || "");
  if (!src) return null;
  const node = createShapeBase("shape-image", opts);
  node.dataset.imageSrc = src;
  node.style.border = "none";
  node.style.background = "transparent";
  node.style.overflow = "hidden";
  node.style.padding = "0";
  const img = document.createElement("img");
  img.className = "shape-image-el";
  img.draggable = false;
  img.alt = "";
  img.src = src;
  img.addEventListener("dragstart", (e) => e.preventDefault());
  const rh = document.createElement("div");
  rh.className = "resize-handle";
  node.appendChild(img);
  node.appendChild(rh);
  addShapeHandles(node, false);
  attachResize(node, rh, 40, 40, { raiseOnResize: false });
  attachConnectorPoints(node);
  appendToDesktop(node);
  updateDesktopExtent();
  layoutConnectorPoints(node);
  renderConnectors();
  if (doSave) saveLayout();
  return node;
}

function createShapeLine(opts = {}, doSave = true) {
  opts = applyCreationStylePreset("shape-line", opts);
  const node = createShapeBase("shape-line", opts);
  const lineWidth = Math.max(1, Number(opts.borderWidth ?? node.dataset.borderWidth ?? 1) || 1);
  node.style.height = `${lineWidth}px`;
  node.style.background = opts.borderEnabled === false ? "transparent" : (opts.border || "#000000");
  node.dataset.borderWidth = String(lineWidth);

  const startHandle = document.createElement("div");
  const endHandle = document.createElement("div");
  startHandle.className = "shape-line-handle start";
  endHandle.className = "shape-line-handle end";
  node.appendChild(startHandle);
  node.appendChild(endHandle);

  const minLength = Math.max(1, Number(opts.minLength != null ? opts.minLength : 40) || 1);

  function getLineEndpoints() {
    const x1 = node.offsetLeft;
    const y1 = node.offsetTop;
    const len = Math.max(1, node.offsetWidth);
    const m = (node.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/);
    const a = ((m ? Number(m[1]) : 0) * Math.PI) / 180;
    return { x1, y1, x2: x1 + Math.cos(a) * len, y2: y1 + Math.sin(a) * len };
  }

  function applyLineEndpoints(x1, y1, x2, y2, lengthFloor = minLength) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(lengthFloor, Math.sqrt(dx * dx + dy * dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    setNodePosition(node, x1, y1);
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
  appendToDesktop(node);
  if (opts.x2 != null && opts.y2 != null) {
    const startX = Number.parseFloat(opts.left != null ? opts.left : node.style.left) || node.offsetLeft;
    const startY = Number.parseFloat(opts.top != null ? opts.top : node.style.top) || node.offsetTop;
    applyLineEndpoints(startX, startY, Number(opts.x2), Number(opts.y2), minLength);
  }
  updateDesktopExtent();
  renderConnectors();
  if (doSave) saveLayout();
  return node;
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
  const nextDefaultTableTitle = () => {
    const used = new Set(getTableNodes().map((table) => String(table.dataset.tableTitle || "").trim()));
    let index = 1;
    while (used.has(`Таблица ${index}`)) index += 1;
    return `Таблица ${index}`;
  };
  const sourceData = (opts && typeof opts.tableData === "object" && opts.tableData) ? opts.tableData : {};
  const sourceStyle = normalizeTableStyleRecord(
    (sourceData.tableStyle && typeof sourceData.tableStyle === "object") ? sourceData.tableStyle : (opts.tableStyle || {})
  );
  const rows = Math.max(1, Math.floor(toNumber(sourceData.rows ?? opts.rows, 3, 1, 200)));
  const cols = Math.max(1, Math.floor(toNumber(sourceData.cols ?? opts.cols, 2, 1, 100)));
  const sourceCells = Array.isArray(sourceData.cells) ? sourceData.cells : [];
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
    tableScroll: toBool(sourceData.tableScroll ?? opts.tableScroll ?? opts.scrollEnabled, false),
    tableFilterEnabled: toBool(sourceData.tableFilterEnabled ?? opts.tableFilterEnabled, false),
    columnFilters: normalizeTableColumnFilters(sourceData.columnFilters || opts.columnFilters),
    title: String(opts.tableTitle || opts.title || sourceData.title || nextDefaultTableTitle()).trim() || "Таблица",
    headerText: {
      fontFamily: opts.tableHeaderTextStyle?.fontFamily || "Arial",
      color: themeAwareColor(opts.tableHeaderTextStyle?.color || opts.textColor, "var(--table-header-text, #111827)", ["#111827"]),
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
      border: themeAwareColor(sourceStyle.border || opts.border, "var(--table-border, #b8c0cc)", ["#b8c0cc"]),
      borderEnabled: toBool(sourceStyle.borderEnabled ?? opts.borderEnabled, true),
      borderWidth: toNumber(sourceStyle.borderWidth ?? opts.borderWidth, 1, 0, 24),
      borderStyle: normalizeBorderLineStyle(sourceStyle.borderStyle || opts.borderStyle || "solid"),
      radius: toNumber(sourceStyle.radius ?? opts.radius, 8, 0, 80),
      opacity: toNumber(sourceStyle.opacity ?? opts.opacity, 1, 0, 1),
      shadow: toNumber(sourceStyle.shadow ?? opts.shadow, 7, 0, 48)
    }
  };
  const normalizeMergeMaster = (value) => {
    if (!value || typeof value !== "object") return null;
    const mr = Math.floor(Number(value.r));
    const mc = Math.floor(Number(value.c));
    if (!Number.isFinite(mr) || !Number.isFinite(mc) || mr < 0 || mc < 0) return null;
    return { r: mr, c: mc };
  };
  const normalizeCell = (cell, r, c) => {
    const rowSpan = Math.max(1, Math.floor(toNumber(cell.rowSpan, 1, 1, 200)));
    const colSpan = Math.max(1, Math.floor(toNumber(cell.colSpan, 1, 1, 100)));
    const mergeMaster = normalizeMergeMaster(cell.mergeMaster);
    const isCovered = !!(mergeMaster && (mergeMaster.r !== r || mergeMaster.c !== c));
    return {
      r,
      c,
      raw: String(cell.raw ?? cell.text ?? ""),
      fontFamily: cell.fontFamily || "Arial",
      fontSize: toNumber(cell.fontSize, 14, 8, 144),
      color: themeAwareColor(cell.color, "var(--table-cell-text, #334155)", ["#334155"]),
      numberGrouping: toBool(cell.numberGrouping, true),
      numberFormat: normalizeNumberFormat(cell.numberFormat, NUMBER_FORMAT_NUMBER),
      fillEnabled: toBool(cell.fillEnabled, false),
      gradientEnabled: toBool(cell.gradientEnabled, false),
      fillDirection: cell.fillDirection || "horizontal",
      fill1: themeAwareColor(cell.fill1 || cell.background, "var(--table-cell-fill, #ffffff)", ["#ffffff"]),
      fill2: themeAwareColor(cell.fill2 || cell.fill1 || cell.background, "var(--table-cell-fill, #ffffff)", ["#ffffff"]),
      borderColor: themeAwareColor(cell.borderColor, "var(--table-border, #b8c0cc)", ["#b8c0cc"]),
      borderWidth: toNumber(cell.borderWidth, 1, 0, 24),
      borderEnabled: toBool(cell.borderEnabled, true),
      align: cell.align || "left",
      vAlign: cell.vAlign || "middle",
      bold: toBool(cell.bold, false),
      italic: toBool(cell.italic, false),
      strike: toBool(cell.strike, false),
      wrap: toBool(cell.wrap, true),
      decimalPlaces: normalizeFormulaDecimalPlaces(cell.decimalPlaces, null),
      rowSpan: isCovered ? 1 : rowSpan,
      colSpan: isCovered ? 1 : colSpan,
      mergeMaster: isCovered ? mergeMaster : null
    };
  };
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
    const parsed = parseFormulaCellAddress(address);
    if (!parsed) return null;
    return { r: parsed.r, c: parsed.c };
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
  // Rebuild merge coverage from persisted rowSpan/colSpan/mergeMaster.
  {
    const masters = [];
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = state.cells.get(cellKey(r, c));
        if (!cell) continue;
        if (!cell.mergeMaster && (cell.rowSpan > 1 || cell.colSpan > 1)) masters.push(cell);
      }
    }
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = state.cells.get(cellKey(r, c));
        if (!cell) continue;
        cell.mergeMaster = null;
        if (!(cell.rowSpan > 1 || cell.colSpan > 1)) {
          cell.rowSpan = 1;
          cell.colSpan = 1;
        }
      }
    }
    const occupied = new Set();
    masters.forEach((master) => {
      const rowSpan = Math.max(1, Math.min(state.rows - master.r, master.rowSpan));
      const colSpan = Math.max(1, Math.min(state.cols - master.c, master.colSpan));
      master.rowSpan = rowSpan;
      master.colSpan = colSpan;
      if (rowSpan === 1 && colSpan === 1) return;
      let valid = true;
      for (let r = master.r; r < master.r + rowSpan && valid; r += 1) {
        for (let c = master.c; c < master.c + colSpan; c += 1) {
          if (r === master.r && c === master.c) continue;
          if (occupied.has(cellKey(r, c))) { valid = false; break; }
        }
      }
      if (!valid) {
        master.rowSpan = 1;
        master.colSpan = 1;
        return;
      }
      occupied.add(cellKey(master.r, master.c));
      for (let r = master.r; r < master.r + rowSpan; r += 1) {
        for (let c = master.c; c < master.c + colSpan; c += 1) {
          if (r === master.r && c === master.c) continue;
          const covered = state.cells.get(cellKey(r, c)) || normalizeCell({}, r, c);
          covered.mergeMaster = { r: master.r, c: master.c };
          covered.rowSpan = 1;
          covered.colSpan = 1;
          state.cells.set(cellKey(r, c), covered);
          occupied.add(cellKey(r, c));
        }
      }
    });
  }

  const viewportWidth = Math.max(MIN_COL_WIDTH, initialWidth);
  const viewportHeight = Math.max(HEADER_HEIGHT + MIN_ROW_HEIGHT, initialHeight);
  const contentWidth = sumSizes(state.colWidths);
  const contentHeight = HEADER_HEIGHT + sumSizes(state.rowHeights);
  if (viewportHeight < contentHeight - 0.5 || viewportWidth < contentWidth - 0.5) {
    state.tableScroll = true;
  }

  const node = createShapeBase("shape-table", {
    ...opts,
    width: `${viewportWidth}px`,
    height: `${viewportHeight}px`,
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
  node.dataset.scrollEnabled = state.tableScroll ? "1" : "0";
  node.dataset.tableFilterEnabled = state.tableFilterEnabled ? "1" : "0";
  node.dataset.tableTitle = state.title;
  node.dataset.tableRef = normalizeTableReferenceName(state.title);
  node.dataset.tableHeaderFill = state.style.headerFill;
  node.dataset.tableHeaderFillEnabled = state.style.headerFillEnabled ? "1" : "0";
  node.dataset.tableHeaderGradientEnabled = state.style.headerGradientEnabled ? "1" : "0";
  node.dataset.tableHeaderFill2 = state.style.headerFill2;
  node.dataset.tableHeaderFillDirection = state.style.headerFillDirection;
  node.dataset.borderColor = state.style.border;
  node.dataset.borderEnabled = state.style.borderEnabled ? "1" : "0";
  node.dataset.borderWidth = String(state.style.borderWidth);
  node.dataset.borderStyle = normalizeBorderLineStyle(state.style.borderStyle || "solid");
  node.dataset.radius = String(state.style.radius);
  node.dataset.opacity = String(state.style.opacity);
  node.dataset.shadow = String(state.style.shadow);
  node.dataset.tablePixelWidth = String(Math.round(Number.parseFloat(node.style.width) || 620));
  node.dataset.tablePixelHeight = String(Math.round(Number.parseFloat(node.style.height) || 360));
  node.style.background = "transparent";
  node.style.opacity = String(state.style.opacity);

  const chrome = document.createElement("div");
  chrome.className = "shape-table-chrome";
  const titleBar = document.createElement("div");
  titleBar.className = "table-titlebar";
  const titleText = document.createElement("div");
  titleText.className = "table-title-text";
  const tableRoot = document.createElement("div");
  tableRoot.className = "shape-table-root";
  const rowHandleLayer = document.createElement("div");
  rowHandleLayer.className = "table-row-handle-layer";
  const colHandleLayer = document.createElement("div");
  colHandleLayer.className = "table-col-handle-layer";
  const tableWrap = document.createElement("div");
  tableWrap.className = "shape-table-wrap";
  applyTableScrollState(tableWrap, state.tableScroll);
  node.__tableWrapEl = tableWrap;
  const tableEl = document.createElement("table");
  tableEl.className = "shape-table-grid";
  const rowDropIndicator = document.createElement("div");
  rowDropIndicator.className = "table-row-drop-indicator";
  const colDropIndicator = document.createElement("div");
  colDropIndicator.className = "table-col-drop-indicator";
  const cellConnectorGuides = document.createElement("div");
  cellConnectorGuides.className = "table-cell-connector-guides hidden";
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
  let formulaEditorOverlay = null;
  let rangeAnchor = null;
  let rangeSelecting = false;
  let resizeDrag = null;
  let rowDrag = null;
  let colDrag = null;
  let cellConnectorGuidesLatched = false;
  const cellConnectorArrows = new Map();

  const getCellState = (r, c) => state.cells.get(cellKey(r, c));
  const setCellState = (cell) => state.cells.set(cellKey(cell.r, cell.c), cell);
  const getMergeAnchor = (r, c) => {
    const cell = getCellState(r, c);
    if (cell?.mergeMaster) return { r: cell.mergeMaster.r, c: cell.mergeMaster.c };
    return { r, c };
  };
  const getMergeBoundsAt = (r, c) => {
    const anchor = getMergeAnchor(r, c);
    const master = getCellState(anchor.r, anchor.c);
    const rowSpan = Math.max(1, Math.min(state.rows - anchor.r, Math.floor(Number(master?.rowSpan) || 1)));
    const colSpan = Math.max(1, Math.min(state.cols - anchor.c, Math.floor(Number(master?.colSpan) || 1)));
    return {
      rMin: anchor.r,
      cMin: anchor.c,
      rMax: anchor.r + rowSpan - 1,
      cMax: anchor.c + colSpan - 1,
      rowSpan,
      colSpan
    };
  };
  const isCoveredByMerge = (r, c) => {
    const cell = getCellState(r, c);
    return !!(cell?.mergeMaster && (cell.mergeMaster.r !== r || cell.mergeMaster.c !== c));
  };
  const resyncMergeCoverage = () => {
    const masters = [];
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = getCellState(r, c) || normalizeCell({}, r, c);
        cell.mergeMaster = null;
        cell.rowSpan = Math.max(1, Math.floor(Number(cell.rowSpan) || 1));
        cell.colSpan = Math.max(1, Math.floor(Number(cell.colSpan) || 1));
        if (cell.rowSpan > 1 || cell.colSpan > 1) masters.push(cell);
        setCellState(cell);
      }
    }
    const occupied = new Set();
    masters
      .sort((a, b) => (a.r - b.r) || (a.c - b.c))
      .forEach((master) => {
        const rowSpan = Math.max(1, Math.min(state.rows - master.r, master.rowSpan));
        const colSpan = Math.max(1, Math.min(state.cols - master.c, master.colSpan));
        master.rowSpan = rowSpan;
        master.colSpan = colSpan;
        if (rowSpan === 1 && colSpan === 1) {
          setCellState(master);
          return;
        }
        let valid = true;
        for (let r = master.r; r < master.r + rowSpan && valid; r += 1) {
          for (let c = master.c; c < master.c + colSpan; c += 1) {
            const key = cellKey(r, c);
            if (r === master.r && c === master.c) continue;
            if (occupied.has(key)) {
              valid = false;
              break;
            }
            const other = getCellState(r, c);
            if (other && (other.rowSpan > 1 || other.colSpan > 1) && !(other.r === master.r && other.c === master.c)) {
              valid = false;
              break;
            }
          }
        }
        if (!valid) {
          master.rowSpan = 1;
          master.colSpan = 1;
          setCellState(master);
          return;
        }
        occupied.add(cellKey(master.r, master.c));
        setCellState(master);
        for (let r = master.r; r < master.r + rowSpan; r += 1) {
          for (let c = master.c; c < master.c + colSpan; c += 1) {
            if (r === master.r && c === master.c) continue;
            const covered = getCellState(r, c) || normalizeCell({}, r, c);
            covered.mergeMaster = { r: master.r, c: master.c };
            covered.rowSpan = 1;
            covered.colSpan = 1;
            setCellState(covered);
            occupied.add(cellKey(r, c));
          }
        }
      });
  };
  const clearMergeBounds = (rMin, cMin, rMax, cMax) => {
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        const cell = getCellState(r, c);
        if (!cell) continue;
        cell.rowSpan = 1;
        cell.colSpan = 1;
        cell.mergeMaster = null;
        setCellState(cell);
      }
    }
  };
  const expandSelectionThroughMerges = (rMin, cMin, rMax, cMax) => {
    let nextRMin = rMin;
    let nextCMin = cMin;
    let nextRMax = rMax;
    let nextCMax = cMax;
    let changed = true;
    while (changed) {
      changed = false;
      for (let r = nextRMin; r <= nextRMax; r += 1) {
        for (let c = nextCMin; c <= nextCMax; c += 1) {
          const bounds = getMergeBoundsAt(r, c);
          if (bounds.rMin < nextRMin) { nextRMin = bounds.rMin; changed = true; }
          if (bounds.cMin < nextCMin) { nextCMin = bounds.cMin; changed = true; }
          if (bounds.rMax > nextRMax) { nextRMax = bounds.rMax; changed = true; }
          if (bounds.cMax > nextCMax) { nextCMax = bounds.cMax; changed = true; }
        }
      }
    }
    return { rMin: nextRMin, cMin: nextCMin, rMax: nextRMax, cMax: nextCMax };
  };
  const getSelectionRect = () => {
    const cells = (node.__tableSelectionScope === "cells"
      ? (selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []))
      : [])
      .filter(Boolean);
    if (!cells.length) return null;
    let rMin = Infinity;
    let cMin = Infinity;
    let rMax = -Infinity;
    let cMax = -Infinity;
    const selectedAnchors = new Set();
    cells.forEach((td) => {
      const r = Number(td.dataset.r);
      const c = Number(td.dataset.c);
      if (!Number.isFinite(r) || !Number.isFinite(c)) return;
      const bounds = getMergeBoundsAt(r, c);
      selectedAnchors.add(cellKey(bounds.rMin, bounds.cMin));
      rMin = Math.min(rMin, bounds.rMin);
      cMin = Math.min(cMin, bounds.cMin);
      rMax = Math.max(rMax, bounds.rMax);
      cMax = Math.max(cMax, bounds.cMax);
    });
    if (!Number.isFinite(rMin) || !Number.isFinite(cMin)) return null;
    const expanded = expandSelectionThroughMerges(rMin, cMin, rMax, cMax);
    for (let r = expanded.rMin; r <= expanded.rMax; r += 1) {
      for (let c = expanded.cMin; c <= expanded.cMax; c += 1) {
        const anchor = getMergeAnchor(r, c);
        if (!selectedAnchors.has(cellKey(anchor.r, anchor.c))) return null;
      }
    }
    return expanded;
  };
  const mergeSelectedCells = () => {
    if (isWorkspaceReadOnly()) return false;
    const rect = getSelectionRect();
    if (!rect) return false;
    const { rMin, cMin, rMax, cMax } = rect;
    const rowSpan = rMax - rMin + 1;
    const colSpan = cMax - cMin + 1;
    if (rowSpan < 2 && colSpan < 2) return false;
    // Unmerge anything intersecting the target rectangle first.
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        const bounds = getMergeBoundsAt(r, c);
        if (bounds.rowSpan > 1 || bounds.colSpan > 1) {
          clearMergeBounds(bounds.rMin, bounds.cMin, bounds.rMax, bounds.cMax);
        }
      }
    }
    const master = getCellState(rMin, cMin) || normalizeCell({}, rMin, cMin);
    master.rowSpan = rowSpan;
    master.colSpan = colSpan;
    master.mergeMaster = null;
    setCellState(master);
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        if (r === rMin && c === cMin) continue;
        const covered = getCellState(r, c) || normalizeCell({}, r, c);
        covered.mergeMaster = { r: rMin, c: cMin };
        covered.rowSpan = 1;
        covered.colSpan = 1;
        setCellState(covered);
      }
    }
    resyncMergeCoverage();
    renderTable();
    const masterTd = getCellElement(rMin, cMin);
    if (masterTd) selectCell(masterTd);
    saveLayout();
    return true;
  };
  const unmergeSelectedCells = () => {
    if (isWorkspaceReadOnly()) return false;
    const cells = (node.__tableSelectionScope === "cells"
      ? (selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []))
      : [])
      .filter(Boolean);
    if (!cells.length) return false;
    let changed = false;
    const seen = new Set();
    cells.forEach((td) => {
      const r = Number(td.dataset.r);
      const c = Number(td.dataset.c);
      if (!Number.isFinite(r) || !Number.isFinite(c)) return;
      const bounds = getMergeBoundsAt(r, c);
      const key = cellKey(bounds.rMin, bounds.cMin);
      if (seen.has(key)) return;
      seen.add(key);
      if (bounds.rowSpan === 1 && bounds.colSpan === 1) return;
      clearMergeBounds(bounds.rMin, bounds.cMin, bounds.rMax, bounds.cMax);
      changed = true;
    });
    if (!changed) return false;
    resyncMergeCoverage();
    renderTable();
    const focus = cells[0];
    const focusR = Number(focus?.dataset?.r);
    const focusC = Number(focus?.dataset?.c);
    const focusTd = Number.isFinite(focusR) && Number.isFinite(focusC)
      ? getCellElement(focusR, focusC)
      : null;
    if (focusTd) selectCell(focusTd);
    saveLayout();
    return true;
  };
  const adjustMergesAfterColInsert = (insertAt) => {
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = getCellState(r, c);
        if (!cell) continue;
        if (cell.mergeMaster && cell.mergeMaster.c >= insertAt) {
          cell.mergeMaster = { r: cell.mergeMaster.r, c: cell.mergeMaster.c + 1 };
        }
        if (!cell.mergeMaster && (cell.colSpan > 1 || cell.rowSpan > 1) && cell.c < insertAt && cell.c + cell.colSpan > insertAt) {
          cell.colSpan += 1;
        }
        setCellState(cell);
      }
    }
    resyncMergeCoverage();
  };
  const adjustMergesAfterRowInsert = (insertAt) => {
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = getCellState(r, c);
        if (!cell) continue;
        if (cell.mergeMaster && cell.mergeMaster.r >= insertAt) {
          cell.mergeMaster = { r: cell.mergeMaster.r + 1, c: cell.mergeMaster.c };
        }
        if (!cell.mergeMaster && (cell.colSpan > 1 || cell.rowSpan > 1) && cell.r < insertAt && cell.r + cell.rowSpan > insertAt) {
          cell.rowSpan += 1;
        }
        setCellState(cell);
      }
    }
    resyncMergeCoverage();
  };
  const getCellReferenceToken = (r, c) => formatTableCellReferenceToken(syncTableReferenceName(node, state.title), addressFromCell(r, c));
  const getEditingCellRawText = () => {
    if (!editingCell) return "";
    if (formulaEditorOverlay && formulaEditorOverlay.isConnected) return getEditorRawText(formulaEditorOverlay);
    return getEditorRawText(editingCell);
  };
  const dumpCellStates = () => Array.from(state.cells.values()).map((cell) => {
    const isFormula = String(cell.raw || "").trim().startsWith("=");
    const parsedNumeric = parseStrictNumericLikeText(cell.raw, { numberFormat: cell.numberFormat });
    const computed = isFormula ? evaluateCellValue(cell.r, cell.c) : parseNumberValue(cell.raw, cell);
    const isNumber = !isFormula && parsedNumeric != null;
    return {
      ...cell,
      address: addressFromCell(cell.r, cell.c),
      valueType: isFormula ? "formula" : (isNumber ? "number" : "text"),
      computedValue: isFormula ? computed : (isNumber ? parsedNumeric : cell.raw)
    };
  });
  const updateStoredSize = () => {
    node.dataset.tablePixelWidth = String(Math.round(node.offsetWidth || Number.parseFloat(node.style.width) || 0));
    node.dataset.tablePixelHeight = String(Math.round(node.offsetHeight || Number.parseFloat(node.style.height) || 0));
  };
  const ensureTableScrollForViewport = () => {
    const bodyWidth = node.offsetWidth || Number.parseFloat(node.style.width) || sumSizes(state.colWidths);
    const bodyHeight = Math.max(0, (node.offsetHeight || Number.parseFloat(node.style.height) || 0) - HEADER_HEIGHT);
    const needsScroll = bodyHeight < sumSizes(state.rowHeights) - 0.5 || bodyWidth < sumSizes(state.colWidths) - 0.5;
    if (!needsScroll) return;
    if (state.tableScroll) {
      applyTableScrollState(tableWrap, true);
      return;
    }
    state.tableScroll = true;
    node.dataset.scrollEnabled = "1";
    applyTableScrollState(tableWrap, true);
  };
  const beginTitleEdit = () => {
    titleText.contentEditable = "true";
    titleText.textContent = state.title;
    titleText.focus();
    placeCaretAtEnd(titleText);
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
    syncTableReferenceName(node, state.title);
    applyTableTitleAlign(titleBar, titleText, state.headerText.hAlign, state.headerText.vAlign);
    applyFillStyle(titleBar, {
      fillEnabled: state.style.headerFillEnabled,
      gradientEnabled: state.style.headerGradientEnabled,
      fill1: state.style.headerFill,
      fill2: state.style.headerFill2,
      fillDirection: state.style.headerFillDirection
    });
  };
  const parseNumberValue = (value, cell = null) => {
    return parseNumericLikeText(value, { numberFormat: cell?.numberFormat });
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
    if (!raw.startsWith("=")) return parseNumberValue(raw, cell);
    const key = `cell:${String(node.dataset.shapeId || "").trim().toLowerCase()}:${r}:${c}`;
    if (visiting.has(key)) return "#CYCLE";
    visiting.add(key);
    let expression = normalizeFormulaExpressionBody(raw.slice(1)).toUpperCase();
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
    expression = expression.replace(new RegExp(`\\b(SUM|AVERAGE|MIN|MAX|COUNT)\\((${STANDALONE_CELL_ADDRESS_PATTERN}:${STANDALONE_CELL_ADDRESS_PATTERN})\\)`, "gi"), (_m, fn, range) => String(calcRange(String(fn || "").toUpperCase(), range)));
    expression = replaceStandaloneCellRanges(expression, (_from, _to, range) => String(getRangeValues(range, new Set(visiting)).reduce((sum, value) => sum + (Number(value) || 0), 0)));
    expression = expression.replace(SHAPE_REF_RE, (_m, shapeId) => {
      const value = getShapeFormulaValueById(shapeId, new Set(visiting));
      if (value === "#CYCLE") hasCycle = true;
      return typeof value === "string" ? "NaN" : String(value);
    });
    expression = expression.replace(TABLE_CELL_REF_RE, (match) => {
      const ownToken = getCellReferenceToken(r, c).toUpperCase();
      if (match.toUpperCase() === ownToken) {
        hasCycle = true;
        return "NaN";
      }
      const value = getTableCellFormulaValueByToken(match, new Set(visiting));
      if (value === "#CYCLE") hasCycle = true;
      return typeof value === "string" ? "NaN" : String(value);
    });
    expression = replaceStandaloneCellAddresses(expression, (address) => {
      const ref = parseCellAddress(address);
      if (!ref) return "0";
      const value = evaluateCellValue(ref.r, ref.c, new Set(visiting));
      if (value === "#CYCLE") hasCycle = true;
      return typeof value === "string" ? "NaN" : String(value);
    });
    expression = replacePercentLiteralsInExpression(expression);
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
    if (!raw.trim().startsWith("=")) {
      const numericValue = parseStrictNumericLikeText(raw, { numberFormat: cell.numberFormat });
      return numericValue == null
        ? applyNumberGroupingToText(raw, cell.numberGrouping)
        : formatNumberByStyle(numericValue, {
          numberFormat: cell.numberFormat,
          decimalPlaces: normalizeFormulaDecimalPlaces(cell.decimalPlaces, null),
          numberGrouping: cell.numberGrouping
        });
    }
    const value = evaluateCellValue(cell.r, cell.c);
    return typeof value === "string" ? value : formatNumberByStyle(value, {
      numberFormat: cell.numberFormat,
      decimalPlaces: normalizeFormulaDecimalPlaces(cell.decimalPlaces, null),
      numberGrouping: cell.numberGrouping
    });
  };
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
  const filterValueLabel = (value) => (value === TABLE_FILTER_EMPTY_VALUE ? TABLE_FILTER_EMPTY_LABEL : value);
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
  const sortDataRowsByColumn = (col, direction) => {
    if (!state.tableFilterEnabled || state.rows < 2) return;
    const order = Array.from({ length: state.rows - 1 }, (_, index) => index + 1);
    order.sort((a, b) => {
      const cmp = getCellFilterValue(a, col).localeCompare(getCellFilterValue(b, col), "ru", { numeric: true, sensitivity: "base" });
      return direction === "desc" ? -cmp : cmp;
    });
    const targetOrder = [0, ...order];
    const oldToNew = new Map();
    targetOrder.forEach((oldRow, newIndex) => oldToNew.set(oldRow, newIndex));
    rewriteFormulaReferencesForTableChange(node, {
      plainRowMapper: (row) => (oldToNew.has(row) ? oldToNew.get(row) : row),
      tokenRowMapper: (row) => (oldToNew.has(row) ? oldToNew.get(row) : row)
    });
    const nextHeights = targetOrder.map((oldRow) => state.rowHeights[oldRow]);
    const nextCells = new Map();
    targetOrder.forEach((oldRow, newRow) => {
      for (let c = 0; c < state.cols; c += 1) {
        const sourceCell = getCellState(oldRow, c);
        nextCells.set(cellKey(newRow, c), normalizeCell({ ...(sourceCell || {}), r: newRow, c }, newRow, c));
      }
    });
    state.cells = nextCells;
    state.rowHeights = nextHeights;
    Object.keys(state.columnFilters).forEach((key) => {
      const index = Number(key);
      if (!Number.isFinite(index)) return;
      if (index === col) {
        state.columnFilters[index] = { hiddenValues: getColumnFilter(index).hiddenValues, sort: direction };
      } else if (state.columnFilters[index]) {
        state.columnFilters[index] = { ...state.columnFilters[index], sort: null };
      }
    });
    if (!state.columnFilters[col]) state.columnFilters[col] = { hiddenValues: [], sort: direction };
    renderTable();
    refreshAllFormulaDisplays();
    updateStoredSize();
    saveLayout();
  };
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
  const applyCellStyle = (td, cell) => {
    const isFilterHeaderCell = state.tableFilterEnabled && cell.r === 0;
    const rowSpan = Math.max(1, Math.floor(Number(cell.rowSpan) || 1));
    const colSpan = Math.max(1, Math.floor(Number(cell.colSpan) || 1));
    td.dataset.r = String(cell.r);
    td.dataset.c = String(cell.c);
    td.dataset.address = addressFromCell(cell.r, cell.c);
    td.dataset.refToken = getCellReferenceToken(cell.r, cell.c);
    td.dataset.raw = cell.raw;
    td.dataset.baseFontSize = String(cell.fontSize);
    td.dataset.numberGrouping = cell.numberGrouping ? "1" : "0";
    td.dataset.numberFormat = normalizeNumberFormat(cell.numberFormat, NUMBER_FORMAT_NUMBER);
    if (cell.decimalPlaces == null) delete td.dataset.decimalPlaces;
    else td.dataset.decimalPlaces = String(cell.decimalPlaces);
    td.dataset.borderColor = cell.borderColor;
    td.dataset.borderWidth = String(cell.borderWidth);
    td.dataset.borderEnabled = cell.borderEnabled ? "1" : "0";
    td.rowSpan = rowSpan;
    td.colSpan = colSpan;
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
    if (isFilterHeaderCell) {
      td.style.borderWidth = "0";
      td.style.borderColor = "transparent";
    } else {
      td.style.borderWidth = cell.borderEnabled ? `${Math.max(1, cell.borderWidth)}px` : "0px";
      td.style.borderColor = cell.borderColor;
    }
    applyFillStyle(td, {
      fillEnabled: cell.fillEnabled,
      gradientEnabled: cell.gradientEnabled,
      fill1: cell.fill1,
      fill2: cell.fill2,
      fillDirection: cell.fillDirection
    });
    if (!isFilterHeaderCell) td.textContent = getCellDisplayValue(cell);
  };
  const removeFormulaEditorOverlay = () => {
    if (!formulaEditorOverlay) return;
    clearActiveFormulaEditor(formulaEditorOverlay);
    if (formulaEditorOverlay.parentNode) formulaEditorOverlay.parentNode.removeChild(formulaEditorOverlay);
    formulaEditorOverlay = null;
  };
  const layoutFormulaEditorOverlay = () => {
    if (!formulaEditorOverlay || !editingCell || !formulaEditorOverlay.isConnected) return;
    const cellRect = editingCell.getBoundingClientRect();
    const viewportWidth = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 0);
    const viewportHeight = Math.max(240, window.innerHeight || document.documentElement.clientHeight || 0);
    const horizontalPadding = 16;
    const maxWidth = Math.max(cellRect.width, viewportWidth - horizontalPadding * 2);
    const minWidth = Math.max(cellRect.width, 140);
    const raw = getEditorRawText(formulaEditorOverlay);
    const singleLineMeasure = measureTableCellText(editingCell, raw || " ", false, minWidth);
    const preferredWidth = Math.max(minWidth, Math.min(maxWidth, Math.ceil(singleLineMeasure.width) + 14));
    const wrappedMeasure = measureTableCellText(editingCell, raw || " ", true, preferredWidth);
    const targetHeight = Math.max(
      Math.ceil(cellRect.height),
      Math.min(Math.max(80, viewportHeight - 24), Math.ceil(wrappedMeasure.height) + 14)
    );
    let left = cellRect.left;
    const top = Math.max(8, Math.min(viewportHeight - targetHeight - 8, cellRect.top));
    if (left + preferredWidth > viewportWidth - 8) left = Math.max(8, viewportWidth - preferredWidth - 8);
    formulaEditorOverlay.style.left = `${left}px`;
    formulaEditorOverlay.style.top = `${top}px`;
    formulaEditorOverlay.style.width = `${preferredWidth}px`;
    formulaEditorOverlay.style.maxWidth = `${maxWidth}px`;
    formulaEditorOverlay.style.minHeight = `${Math.ceil(cellRect.height)}px`;
    formulaEditorOverlay.style.height = `${targetHeight}px`;
    formulaEditorOverlay.style.maxHeight = `${Math.max(80, viewportHeight - 16)}px`;
    formulaEditorOverlay.style.overflowY = wrappedMeasure.height + 10 > targetHeight ? "auto" : "hidden";
    formulaEditorOverlay.style.fontFamily = editingCell.style.fontFamily;
    formulaEditorOverlay.style.fontSize = editingCell.style.fontSize;
    formulaEditorOverlay.style.fontWeight = editingCell.style.fontWeight;
    formulaEditorOverlay.style.fontStyle = editingCell.style.fontStyle;
    formulaEditorOverlay.style.lineHeight = getComputedStyle(editingCell).lineHeight;
    formulaEditorOverlay.style.textAlign = "left";
  };
  const ensureFormulaEditorOverlay = () => {
    if (!editingCell) return null;
    if (!formulaEditorOverlay || !formulaEditorOverlay.isConnected) {
      formulaEditorOverlay = document.createElement("div");
      formulaEditorOverlay.className = "table-formula-editor";
      formulaEditorOverlay.contentEditable = "true";
      formulaEditorOverlay.spellcheck = false;
      formulaEditorOverlay.dataset.raw = "";
      document.body.appendChild(formulaEditorOverlay);
      formulaEditorOverlay.addEventListener("input", () => {
        syncEditorRawText(formulaEditorOverlay);
        layoutFormulaEditorOverlay();
        refreshActiveFormulaReferenceHighlight();
      });
      formulaEditorOverlay.addEventListener("keyup", () => {
        layoutFormulaEditorOverlay();
        refreshActiveFormulaReferenceHighlight();
      });
      formulaEditorOverlay.addEventListener("mouseup", () => {
        refreshActiveFormulaReferenceHighlight();
      });
      formulaEditorOverlay.addEventListener("blur", () => {
        setTimeout(() => {
          if (!editingCell || !formulaEditorOverlay) return;
          if (document.activeElement === formulaEditorOverlay) return;
          finishCellEdit(editingCell);
        }, 0);
      });
      formulaEditorOverlay.addEventListener("keydown", (event) => {
        event.stopPropagation();
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          finishCellEdit(editingCell);
          if (typeof editingCell?.focus === "function") editingCell.focus({ preventScroll: true });
          return;
        }
        if (event.key === "Tab") {
          event.preventDefault();
          const step = event.shiftKey ? -1 : 1;
          finishCellEdit(editingCell);
          moveSelectionBy(0, step);
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          cancelCellEdit(editingCell);
        }
      });
      formulaEditorOverlay.__relayout = layoutFormulaEditorOverlay;
      window.addEventListener("resize", layoutFormulaEditorOverlay);
      viewportEl?.addEventListener("scroll", layoutFormulaEditorOverlay, true);
    }
    return formulaEditorOverlay;
  };
  const refreshAllCellDisplays = () => {
    tableEl.querySelectorAll("td").forEach((td) => {
      const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
      if (!cell || td === editingCell) return;
      applyCellStyle(td, cell);
      if (state.tableFilterEnabled && cell.r === 0) decorateFilterHeaderCell(td, cell);
    });
    paintSelectedCells();
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
    cellConnectorGuidesLatched = false;
    node.__tableSelectionScope = "shape";
    renderRowHandles();
    renderColHandles();
    updateCellConnectorGuides();
  };
  const paintSelectedCells = () => {
    tableEl.querySelectorAll("td").forEach((td) => {
      td.classList.toggle("cell-selected", td === activeCell);
      td.classList.toggle("cell-range-selected", selectedCells.includes(td) && td !== activeCell);
    });
    renderRowHandles();
    renderColHandles();
    updateCellConnectorGuides();
  };
  const positionCellConnectorGuides = (td = activeCell) => {
    if (!td) return false;
    const nodeRect = node.getBoundingClientRect();
    const cellRect = td.getBoundingClientRect();
    const localZoom = Math.max(0.001, Number(zoom) || 1);
    const left = (cellRect.left - nodeRect.left) / localZoom;
    const top = (cellRect.top - nodeRect.top) / localZoom;
    const width = cellRect.width / localZoom;
    const height = cellRect.height / localZoom;
    const arrowOffset = 18;
    const positions = {
      n: [left + width / 2, top - arrowOffset],
      e: [left + width + arrowOffset, top + height / 2],
      s: [left + width / 2, top + height + arrowOffset],
      w: [left - arrowOffset, top + height / 2]
    };
    cellConnectorArrows.forEach((arrow, anchor) => {
      const point = positions[anchor];
      if (!point) return;
      arrow.style.left = `${point[0]}px`;
      arrow.style.top = `${point[1]}px`;
    });
    return true;
  };
  function updateCellConnectorGuides() {
    const draftCell = normalizeCellRef(node.__draftConnectorTargetCell);
    const draftTd = draftCell ? getCellElement(draftCell.r, draftCell.c) : null;
    const canShowSource = node.classList.contains("selected")
      && node.__tableSelectionScope === "cells"
      && !!activeCell
      && !editingCell;
    if (canShowSource && isAltModifierActive()) cellConnectorGuidesLatched = true;
    const canShowDraft = !!draftTd
      && !!connectorDraft
      && (connectorDraft.preferCells || connectorDraft.fromCell);
    const shouldShow = canShowDraft
      || (canShowSource && (isAltModifierActive() || cellConnectorGuidesLatched));
    const liftedHandles = interactionControlsLayer?.querySelector(`.shape-handles[data-lifted-from-shape="${node.dataset.shapeId}"]`);
    node.classList.toggle("table-cell-connector-guides-active", shouldShow);
    if (liftedHandles) liftedHandles.classList.toggle("table-cell-connector-guides-active", shouldShow);
    if (!shouldShow) {
      restoreTableCellConnectorGuidesToOwner(node);
      cellConnectorGuides.classList.add("hidden");
      return;
    }
    liftTableCellConnectorGuides(node, cellConnectorGuides);
    syncTableCellConnectorGuidesLayer(node, cellConnectorGuides);
    const guideTd = draftTd || activeCell;
    if (!positionCellConnectorGuides(guideTd)) {
      restoreTableCellConnectorGuidesToOwner(node);
      cellConnectorGuides.classList.add("hidden");
      return;
    }
    cellConnectorGuides.classList.remove("hidden");
    cellConnectorGuides.classList.toggle("table-cell-connector-guides-draft", !!draftTd);
  }
  const selectCellRange = (fromTd, toTd) => {
    if (!fromTd || !toTd) return false;
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    const r1 = Number(fromTd.dataset.r);
    const c1 = Number(fromTd.dataset.c);
    const r2 = Number(toTd.dataset.r);
    const c2 = Number(toTd.dataset.c);
    let rMin = Math.min(r1, r2);
    let rMax = Math.max(r1, r2);
    let cMin = Math.min(c1, c2);
    let cMax = Math.max(c1, c2);
    const expanded = expandSelectionThroughMerges(rMin, cMin, rMax, cMax);
    rMin = expanded.rMin;
    rMax = expanded.rMax;
    cMin = expanded.cMin;
    cMax = expanded.cMax;
    selectedCells = [];
    const seen = new Set();
    for (let r = rMin; r <= rMax; r += 1) {
      for (let c = cMin; c <= cMax; c += 1) {
        const anchor = getMergeAnchor(r, c);
        const key = cellKey(anchor.r, anchor.c);
        if (seen.has(key)) continue;
        seen.add(key);
        const td = getCellElement(anchor.r, anchor.c);
        if (td) selectedCells.push(td);
      }
    }
    activeCell = toTd;
    rangeAnchor = fromTd;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof toTd.focus === "function") toTd.focus({ preventScroll: true });
    syncFormatPanel();
    return true;
  };
  const addCellToSelection = (td) => {
    if (!td) return false;
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    if (!selectedCells.length && activeCell) selectedCells = [activeCell];
    if (!selectedCells.includes(td)) selectedCells.push(td);
    activeCell = td;
    if (!rangeAnchor) rangeAnchor = selectedCells[0] || td;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof td.focus === "function") td.focus({ preventScroll: true });
    syncFormatPanel();
    return true;
  };
  const selectAllCells = () => {
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    selectedCells = [];
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const td = getCellElement(r, c);
        if (td) selectedCells.push(td);
      }
    }
    activeCell = activeCell && selectedCells.includes(activeCell) ? activeCell : (selectedCells[0] || null);
    rangeAnchor = activeCell || selectedCells[0] || null;
    node.__tableSelectionScope = selectedCells.length ? "cells" : "shape";
    paintSelectedCells();
    if (activeCell && typeof activeCell.focus === "function") activeCell.focus({ preventScroll: true });
    syncFormatPanel();
    return selectedCells.length > 0;
  };
  const selectCell = (td) => {
    if (isWorkspaceReadOnly()) return;
    if (!td) return;
    if (selectedShape !== node || !node.classList.contains("selected")) {
      selectShape(node);
    } else {
      clearCellSelection();
    }
    if (!isAltModifierActive()) cellConnectorGuidesLatched = false;
    activeCell = td;
    selectedCells = [td];
    rangeAnchor = td;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof td.focus === "function") td.focus({ preventScroll: true });
    syncFormatPanel();
    updateCellConnectorGuides();
  };
  const getCellElement = (r, c) => tableEl.querySelector(`td[data-r="${r}"][data-c="${c}"]`);
  const finishCellEdit = (td) => {
    if (!td || editingCell !== td) return;
    const r = Number(td.dataset.r);
    const c = Number(td.dataset.c);
    const cell = getCellState(r, c);
    if (cell) {
      cell.raw = getEditingCellRawText();
      setCellState(cell);
    }
    removeFormulaEditorOverlay();
    td.contentEditable = "false";
    td.classList.remove("cell-editing");
    editingCell = null;
    clearActiveFormulaEditor(td);
    renderTable();
    refreshAllFormulaDisplays();
    saveLayout();
  };
  const cancelCellEdit = (td) => {
    if (!td || editingCell !== td) return false;
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    if (cell) {
      applyCellStyle(td, cell);
      if (state.tableFilterEnabled && Number(td.dataset.r) === 0) decorateFilterHeaderCell(td, cell);
    }
    removeFormulaEditorOverlay();
    td.contentEditable = "false";
    td.classList.remove("cell-editing");
    editingCell = null;
    if (!isAltModifierActive()) cellConnectorGuidesLatched = false;
    clearActiveFormulaEditor(td);
    if (typeof td.focus === "function") td.focus({ preventScroll: true });
    updateCellConnectorGuides();
    return true;
  };
  const beginCellEdit = (td, initialText) => {
    if (!canEditCurrentDocument()) return false;
    if (!td) return false;
    selectCell(td);
    cellConnectorGuidesLatched = false;
    editingCell = td;
    td.classList.add("cell-editing");
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    const nextText = initialText != null ? String(initialText) : (cell ? cell.raw : "");
    const useOverlay = String(nextText || "").trim().startsWith("=");
    td.dataset.editingBackup = cell ? cell.raw : "";
    if (useOverlay) {
      td.contentEditable = "false";
      const overlay = ensureFormulaEditorOverlay();
      overlay.dataset.raw = nextText;
      overlay.textContent = nextText;
      setActiveFormulaEditor(overlay);
      layoutFormulaEditorOverlay();
      overlay.focus();
      placeCaretAtEnd(overlay);
    } else {
      removeFormulaEditorOverlay();
      td.contentEditable = "true";
      td.textContent = nextText;
      syncEditorRawText(td);
      setActiveFormulaEditor(td);
      td.focus();
      placeCaretAtEnd(td);
    }
    updateCellConnectorGuides();
    return true;
  };
  const moveSelectionBy = (deltaRow, deltaCol, opts = {}) => {
    const current = activeCell || selectedCells[0] || tableEl.querySelector("td");
    if (!current || editingCell) return false;
    const startR = Number(current.dataset.r);
    const startC = Number(current.dataset.c);
    const bounds = getMergeBoundsAt(startR, startC);
    let row = startR;
    let col = startC;
    if (deltaRow < 0) row = bounds.rMin - 1;
    else if (deltaRow > 0) row = bounds.rMax + 1;
    else row = startR;
    if (deltaCol < 0) col = bounds.cMin - 1;
    else if (deltaCol > 0) col = bounds.cMax + 1;
    else col = startC;
    row = Math.max(0, Math.min(state.rows - 1, row));
    col = Math.max(0, Math.min(state.cols - 1, col));
    const anchor = getMergeAnchor(row, col);
    const next = getCellElement(anchor.r, anchor.c);
    if (!next) return false;
    if (opts.extend) return selectCellRange(rangeAnchor || current, next);
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
    renderTable();
    refreshAllFormulaDisplays();
    saveLayout();
    syncFormatPanel();
    return true;
  };
  const getSelectedRange = () => {
    const cells = selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []);
    if (!cells.length) return null;
    let rMin = Infinity;
    let cMin = Infinity;
    let rMax = -Infinity;
    let cMax = -Infinity;
    cells.forEach((td) => {
      const bounds = getMergeBoundsAt(Number(td.dataset.r), Number(td.dataset.c));
      rMin = Math.min(rMin, bounds.rMin);
      cMin = Math.min(cMin, bounds.cMin);
      rMax = Math.max(rMax, bounds.rMax);
      cMax = Math.max(cMax, bounds.cMax);
    });
    if (!Number.isFinite(rMin)) return null;
    return expandSelectionThroughMerges(rMin, cMin, rMax, cMax);
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
  const getClipboardPayload = () => {
    const range = getSelectedRange();
    if (!range) return null;
    const rows = [];
    for (let r = range.rMin; r <= range.rMax; r += 1) {
      const cells = [];
      for (let c = range.cMin; c <= range.cMax; c += 1) {
        const cell = getCellState(r, c);
        cells.push({
          r,
          c,
          cell: cell ? {
            raw: String(cell.raw || ""),
            fontFamily: cell.fontFamily,
            fontSize: cell.fontSize,
            color: cell.color,
            numberGrouping: cell.numberGrouping,
            numberFormat: cell.numberFormat,
            fillEnabled: cell.fillEnabled,
            gradientEnabled: cell.gradientEnabled,
            fillDirection: cell.fillDirection,
            fill1: cell.fill1,
            fill2: cell.fill2,
            borderColor: cell.borderColor,
            borderWidth: cell.borderWidth,
            borderEnabled: cell.borderEnabled,
            align: cell.align,
            vAlign: cell.vAlign,
            bold: cell.bold,
            italic: cell.italic,
            strike: cell.strike,
            wrap: cell.wrap,
            decimalPlaces: cell.decimalPlaces
          } : { raw: "" }
        });
      }
      rows.push(cells);
    }
    return {
      sourceTableId: String(node.dataset.shapeId || ""),
      sourceTableRef: syncTableReferenceName(node, state.title),
      origin: { r: range.rMin, c: range.cMin },
      width: range.cMax - range.cMin + 1,
      height: range.rMax - range.rMin + 1,
      text: getClipboardText(),
      rows
    };
  };
  const getSelectedTrackIndexes = () => {
    if (node.__tableSelectionScope === "cells" && (selectedCells.length || activeCell)) {
      const cells = selectedCells.length ? selectedCells : [activeCell];
      const rowSet = new Set();
      const colSet = new Set();
      cells.forEach((td) => {
        if (!td) return;
        rowSet.add(Number(td.dataset.r));
        colSet.add(Number(td.dataset.c));
      });
      return {
        rows: Array.from(rowSet).sort((a, b) => a - b),
        cols: Array.from(colSet).sort((a, b) => a - b)
      };
    }
    return {
      rows: Array.from({ length: state.rows }, (_item, index) => index),
      cols: Array.from({ length: state.cols }, (_item, index) => index)
    };
  };
  const getTrackMixedState = (sizes, indexes) => {
    if (!indexes.length) return { mixed: false, value: "" };
    const first = Number(sizes[indexes[0]]) || 0;
    const mixed = indexes.some((index) => Math.abs((Number(sizes[index]) || 0) - first) > 0.5);
    return { mixed, value: Math.round(first) };
  };
  const getSelectedRowIndexes = (opts = {}) => {
    const requireFullWidth = opts.requireFullWidth !== false;
    if (node.__tableSelectionScope !== "cells" || !(selectedCells.length || activeCell)) return [];
    const cells = selectedCells.length ? selectedCells : [activeCell];
    const rowMap = new Map();
    cells.forEach((td) => {
      if (!td || td.dataset.r == null || td.dataset.c == null) return;
      const bounds = getMergeBoundsAt(Number(td.dataset.r), Number(td.dataset.c));
      for (let row = bounds.rMin; row <= bounds.rMax; row += 1) {
        if (!rowMap.has(row)) rowMap.set(row, new Set());
        for (let col = bounds.cMin; col <= bounds.cMax; col += 1) {
          rowMap.get(row).add(col);
        }
      }
    });
    const rows = Array.from(rowMap.entries())
      .filter(([, cols]) => !requireFullWidth || cols.size === state.cols)
      .map(([row]) => row)
      .sort((a, b) => a - b);
    if (!rows.length) return [];
    for (let i = 1; i < rows.length; i += 1) {
      if (rows[i] !== rows[i - 1] + 1) return [];
    }
    return rows;
  };
  const getSelectedColIndexes = (opts = {}) => {
    const requireFullHeight = opts.requireFullHeight !== false;
    if (node.__tableSelectionScope !== "cells" || !(selectedCells.length || activeCell)) return [];
    const cells = selectedCells.length ? selectedCells : [activeCell];
    const colMap = new Map();
    cells.forEach((td) => {
      if (!td || td.dataset.r == null || td.dataset.c == null) return;
      const bounds = getMergeBoundsAt(Number(td.dataset.r), Number(td.dataset.c));
      for (let col = bounds.cMin; col <= bounds.cMax; col += 1) {
        if (!colMap.has(col)) colMap.set(col, new Set());
        for (let row = bounds.rMin; row <= bounds.rMax; row += 1) {
          colMap.get(col).add(row);
        }
      }
    });
    const cols = Array.from(colMap.entries())
      .filter(([, rows]) => !requireFullHeight || rows.size === state.rows)
      .map(([col]) => col)
      .sort((a, b) => a - b);
    if (!cols.length) return [];
    for (let i = 1; i < cols.length; i += 1) {
      if (cols[i] !== cols[i - 1] + 1) return [];
    }
    return cols;
  };
  const selectRows = (rows, opts = {}) => {
    const uniqueRows = Array.from(new Set((rows || []).map((row) => Math.max(0, Math.min(state.rows - 1, Number(row) || 0))))).sort((a, b) => a - b);
    if (!uniqueRows.length) return false;
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    selectedCells = [];
    const seen = new Set();
    uniqueRows.forEach((row) => {
      for (let c = 0; c < state.cols; c += 1) {
        const anchor = getMergeAnchor(row, c);
        const key = cellKey(anchor.r, anchor.c);
        if (seen.has(key)) continue;
        seen.add(key);
        const td = getCellElement(anchor.r, anchor.c);
        if (td) selectedCells.push(td);
      }
    });
    const focusRow = uniqueRows.includes(opts.focusRow) ? opts.focusRow : uniqueRows[uniqueRows.length - 1];
    const focusCol = Math.max(0, Math.min(state.cols - 1, Number(opts.focusCol) || 0));
    const focusAnchor = getMergeAnchor(focusRow, focusCol);
    activeCell = getCellElement(focusAnchor.r, focusAnchor.c) || selectedCells[0] || null;
    rangeAnchor = selectedCells[0] || null;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof activeCell?.focus === "function") activeCell.focus({ preventScroll: true });
    syncFormatPanel();
    return true;
  };
  const selectColumns = (cols, opts = {}) => {
    const uniqueCols = Array.from(new Set((cols || []).map((col) => Math.max(0, Math.min(state.cols - 1, Number(col) || 0))))).sort((a, b) => a - b);
    if (!uniqueCols.length) return false;
    if (selectedShape !== node || !node.classList.contains("selected")) selectShape(node);
    selectedCells = [];
    const seen = new Set();
    for (let r = 0; r < state.rows; r += 1) {
      uniqueCols.forEach((col) => {
        const anchor = getMergeAnchor(r, col);
        const key = cellKey(anchor.r, anchor.c);
        if (seen.has(key)) return;
        seen.add(key);
        const td = getCellElement(anchor.r, anchor.c);
        if (td) selectedCells.push(td);
      });
    }
    const focusCol = uniqueCols.includes(opts.focusCol) ? opts.focusCol : uniqueCols[uniqueCols.length - 1];
    const focusRow = Math.max(0, Math.min(state.rows - 1, Number(opts.focusRow) || 0));
    const focusAnchor = getMergeAnchor(focusRow, focusCol);
    const firstAnchor = getMergeAnchor(0, uniqueCols[0]);
    activeCell = getCellElement(focusAnchor.r, focusAnchor.c) || selectedCells[0] || null;
    rangeAnchor = getCellElement(firstAnchor.r, firstAnchor.c) || selectedCells[0] || null;
    node.__tableSelectionScope = "cells";
    paintSelectedCells();
    if (typeof activeCell?.focus === "function") activeCell.focus({ preventScroll: true });
    syncFormatPanel();
    return true;
  };
  const moveRowsBlock = (rows, insertBeforeRow) => {
    const blockRows = Array.from(new Set((rows || []).map((row) => Number(row)).filter((row) => row >= 0 && row < state.rows))).sort((a, b) => a - b);
    if (!blockRows.length) return false;
    if (state.tableFilterEnabled) {
      if (blockRows.includes(0)) return false;
      if (Number(insertBeforeRow) === 0) return false;
    }
    const blockSet = new Set(blockRows);
    const finalInsertBefore = Math.max(0, Math.min(state.rows, Number(insertBeforeRow) || 0));
    if (finalInsertBefore === blockRows[0] || finalInsertBefore === blockRows[blockRows.length - 1] + 1) return false;
    const remainingRows = [];
    for (let row = 0; row < state.rows; row += 1) {
      if (!blockSet.has(row)) remainingRows.push(row);
    }
    const insertAt = Math.max(0, Math.min(remainingRows.length, finalInsertBefore - blockRows.filter((row) => row < finalInsertBefore).length));
    const finalOrder = [...remainingRows.slice(0, insertAt), ...blockRows, ...remainingRows.slice(insertAt)];
    const rowMap = new Map();
    finalOrder.forEach((oldRow, newRow) => rowMap.set(oldRow, newRow));
    const rowDelta = insertAt - blockRows[0];
    rewriteFormulaReferencesForTableChange(node, {
      plainRowMapper: (row) => rowMap.has(row) ? rowMap.get(row) : row,
      tokenRowMapper: (row) => rowMap.has(row) ? rowMap.get(row) : row,
      getTargetCellMappers: (cell) => {
        const row = Number(cell?.r);
        if (!blockSet.has(row)) return null;
        return {
          plainRowMapper: (refRow) => refRow + rowDelta,
          tokenRowMapper: (refRow) => refRow + rowDelta
        };
      }
    });
    state.rowHeights = finalOrder.map((oldRow) => state.rowHeights[oldRow]);
    const nextCells = new Map();
    finalOrder.forEach((oldRow, newRow) => {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = getCellState(oldRow, c);
        nextCells.set(cellKey(newRow, c), normalizeCell({ ...(cell || {}), r: newRow, c }, newRow, c));
      }
    });
    state.cells = nextCells;
    // Remap mergeMaster coords after row reorder, then rebuild coverage.
    for (const cell of state.cells.values()) {
      if (!cell.mergeMaster) continue;
      const mapped = rowMap.get(cell.mergeMaster.r);
      if (mapped == null) {
        cell.mergeMaster = null;
        cell.rowSpan = 1;
        cell.colSpan = 1;
      } else {
        cell.mergeMaster = { r: mapped, c: cell.mergeMaster.c };
      }
    }
    resyncMergeCoverage();
    renderTable();
    selectRows(Array.from({ length: blockRows.length }, (_item, index) => insertAt + index), { focusRow: insertAt + blockRows.length - 1 });
    refreshAllFormulaDisplays();
    return true;
  };
  const moveColsBlock = (cols, insertBeforeCol) => {
    const blockCols = Array.from(new Set((cols || []).map((col) => Number(col)).filter((col) => col >= 0 && col < state.cols))).sort((a, b) => a - b);
    if (!blockCols.length) return false;
    const blockSet = new Set(blockCols);
    const finalInsertBefore = Math.max(0, Math.min(state.cols, Number(insertBeforeCol) || 0));
    if (finalInsertBefore === blockCols[0] || finalInsertBefore === blockCols[blockCols.length - 1] + 1) return false;
    const remainingCols = [];
    for (let col = 0; col < state.cols; col += 1) {
      if (!blockSet.has(col)) remainingCols.push(col);
    }
    const insertAt = Math.max(0, Math.min(remainingCols.length, finalInsertBefore - blockCols.filter((col) => col < finalInsertBefore).length));
    const finalOrder = [...remainingCols.slice(0, insertAt), ...blockCols, ...remainingCols.slice(insertAt)];
    const colMap = new Map();
    finalOrder.forEach((oldCol, newCol) => colMap.set(oldCol, newCol));
    const colDelta = insertAt - blockCols[0];
    rewriteFormulaReferencesForTableChange(node, {
      plainColMapper: (col) => colMap.has(col) ? colMap.get(col) : col,
      tokenColMapper: (col) => colMap.has(col) ? colMap.get(col) : col,
      getTargetCellMappers: (cell) => {
        const col = Number(cell?.c);
        if (!blockSet.has(col)) return null;
        return {
          plainColMapper: (refCol) => refCol + colDelta,
          tokenColMapper: (refCol) => refCol + colDelta
        };
      }
    });
    state.colWidths = finalOrder.map((oldCol) => state.colWidths[oldCol]);
    const nextCells = new Map();
    for (let r = 0; r < state.rows; r += 1) {
      finalOrder.forEach((oldCol, newCol) => {
        const cell = getCellState(r, oldCol);
        nextCells.set(cellKey(r, newCol), normalizeCell({ ...(cell || {}), r, c: newCol }, r, newCol));
      });
    }
    state.cells = nextCells;
    for (const cell of state.cells.values()) {
      if (!cell.mergeMaster) continue;
      const mapped = colMap.get(cell.mergeMaster.c);
      if (mapped == null) {
        cell.mergeMaster = null;
        cell.rowSpan = 1;
        cell.colSpan = 1;
      } else {
        cell.mergeMaster = { r: cell.mergeMaster.r, c: mapped };
      }
    }
    resyncMergeCoverage();
    renderTable();
    selectColumns(Array.from({ length: blockCols.length }, (_item, index) => insertAt + index), { focusCol: insertAt + blockCols.length - 1 });
    refreshAllFormulaDisplays();
    return true;
  };
  const moveSelectedRowsBy = (delta) => {
    const rows = getSelectedRowIndexes({ requireFullWidth: false });
    if (!rows.length) return false;
    if (delta < 0) {
      if (rows[0] <= 0) return false;
      return moveRowsBlock(rows, rows[0] - 1);
    }
    if (rows[rows.length - 1] >= state.rows - 1) return false;
    return moveRowsBlock(rows, rows[rows.length - 1] + 2);
  };
  const moveSelectedColsBy = (delta) => {
    const cols = getSelectedColIndexes({ requireFullHeight: false });
    if (!cols.length) return false;
    if (delta < 0) {
      if (cols[0] <= 0) return false;
      return moveColsBlock(cols, cols[0] - 1);
    }
    if (cols[cols.length - 1] >= state.cols - 1) return false;
    return moveColsBlock(cols, cols[cols.length - 1] + 2);
  };
  const getRowDropIndexFromClientY = (clientY) => {
    const rect = tableWrap.getBoundingClientRect();
    const localZoom = Math.max(0.001, Number(zoom) || 1);
    const localY = ((clientY - rect.top) / localZoom) + tableWrap.scrollTop;
    let acc = 0;
    for (let r = 0; r < state.rows; r += 1) {
      const mid = acc + (state.rowHeights[r] / 2);
      if (localY < mid) return r;
      acc += state.rowHeights[r];
    }
    return state.rows;
  };
  const setRowDropIndicator = (insertBeforeRow) => {
    if (insertBeforeRow == null) {
      rowDropIndicator.style.display = "none";
      return;
    }
    let top = -tableWrap.scrollTop;
    for (let r = 0; r < insertBeforeRow; r += 1) top += state.rowHeights[r];
    rowDropIndicator.style.top = `${top}px`;
    rowDropIndicator.style.display = "block";
  };
  const getVisibleRowIndexRange = () => {
    const viewportHeight = Math.max(0, tableWrap.clientHeight || 0);
    if (viewportHeight <= 0) return { first: 0, last: state.rows - 1 };
    const scrollTop = Math.max(0, tableWrap.scrollTop || 0);
    const viewBottom = scrollTop + viewportHeight;
    let first = -1;
    let last = -1;
    for (let r = 0; r < state.rows; r += 1) {
      if (!isRowVisibleByFilters(r)) continue;
      const tr = tableEl.querySelector(`tr[data-row="${r}"]`);
      if (!tr || tr.style.display === "none") continue;
      const rowTop = tr.offsetTop;
      const rowBottom = rowTop + tr.offsetHeight;
      if (rowBottom > scrollTop + 0.5 && rowTop < viewBottom - 0.5) {
        if (first < 0) first = r;
        last = r;
      }
    }
    if (first < 0) return { first: 0, last: -1 };
    return { first, last };
  };
  const renderRowHandles = () => {
    rowHandleLayer.innerHTML = "";
    rowHandleLayer.appendChild(rowDropIndicator);
    const selectedRows = new Set(getSelectedRowIndexes({ requireFullWidth: true }));
    const { first: visibleFirst, last: visibleLast } = getVisibleRowIndexRange();
    for (let r = 0; r < state.rows; r += 1) {
      if (state.tableFilterEnabled && r === 0) continue;
      if (!isRowVisibleByFilters(r)) continue;
      const tr = tableEl.querySelector(`tr[data-row="${r}"]`);
      if (!tr || tr.style.display === "none") continue;
      if (r < visibleFirst || r > visibleLast) continue;
      const rowCenter = tr.offsetTop + (tr.offsetHeight / 2) - tableWrap.scrollTop;
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = `table-row-handle${selectedRows.has(r) ? " selected" : ""}`;
      handle.dataset.row = String(r);
      handle.textContent = "⋮⋮";
      handle.title = `Строка ${r + 1}: тянуть для перемещения`;
      handle.style.top = `${rowCenter}px`;
      handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        if (isWorkspaceReadOnly()) return;
        const currentRows = getSelectedRowIndexes({ requireFullWidth: true });
        const blockRows = currentRows.includes(r) ? currentRows : [r];
        if (!currentRows.includes(r)) selectRows([r], { focusRow: r });
        rowDrag = {
          pointerId: event.pointerId,
          startY: event.clientY,
          rows: blockRows,
          moved: false,
          dropIndex: getRowDropIndexFromClientY(event.clientY)
        };
        handle.classList.add("dragging");
        setRowDropIndicator(null);
        const onMove = (moveEvent) => {
          if (!rowDrag || moveEvent.pointerId !== rowDrag.pointerId) return;
          const nextDropIndex = getRowDropIndexFromClientY(moveEvent.clientY);
          rowDrag.dropIndex = nextDropIndex;
          if (Math.abs(moveEvent.clientY - rowDrag.startY) > 3) rowDrag.moved = true;
          setRowDropIndicator(rowDrag.moved ? nextDropIndex : null);
        };
        const onUp = (upEvent) => {
          if (!rowDrag || upEvent.pointerId !== rowDrag.pointerId) return;
          document.removeEventListener("pointermove", onMove, true);
          document.removeEventListener("pointerup", onUp, true);
          document.removeEventListener("pointercancel", onUp, true);
          handle.classList.remove("dragging");
          const dragState = rowDrag;
          rowDrag = null;
          setRowDropIndicator(null);
          if (!dragState.moved) {
            selectRows(dragState.rows, { focusRow: dragState.rows[dragState.rows.length - 1] });
            return;
          }
          if (moveRowsBlock(dragState.rows, dragState.dropIndex)) saveLayout();
        };
        document.addEventListener("pointermove", onMove, true);
        document.addEventListener("pointerup", onUp, true);
        document.addEventListener("pointercancel", onUp, true);
      });
      handle.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentRows = getSelectedRowIndexes({ requireFullWidth: true });
        if (!currentRows.includes(r)) selectRows([r], { focusRow: r });
        const rows = getSelectedRowIndexes({ requireFullWidth: true });
        showContextMenu(event.clientX, event.clientY, [
          {
            label: "Переместить выше",
            disabled: !rows.length || rows[0] <= 0,
            action: () => { if (moveSelectedRowsBy(-1)) saveLayout(); }
          },
          {
            label: "Переместить ниже",
            disabled: !rows.length || rows[rows.length - 1] >= state.rows - 1,
            action: () => { if (moveSelectedRowsBy(1)) saveLayout(); }
          }
        ]);
      });
      rowHandleLayer.appendChild(handle);
    }
  };
  const getColDropIndexFromClientX = (clientX) => {
    const rect = tableWrap.getBoundingClientRect();
    const localZoom = Math.max(0.001, Number(zoom) || 1);
    const localX = ((clientX - rect.left) / localZoom) + tableWrap.scrollLeft;
    let acc = 0;
    for (let c = 0; c < state.cols; c += 1) {
      const mid = acc + (state.colWidths[c] / 2);
      if (localX < mid) return c;
      acc += state.colWidths[c];
    }
    return state.cols;
  };
  const setColDropIndicator = (insertBeforeCol) => {
    if (insertBeforeCol == null) {
      colDropIndicator.style.display = "none";
      return;
    }
    let left = -tableWrap.scrollLeft;
    for (let c = 0; c < insertBeforeCol; c += 1) left += state.colWidths[c];
    colDropIndicator.style.left = `${left}px`;
    colDropIndicator.style.display = "block";
  };
  const getVisibleColIndexRange = () => {
    const viewportWidth = Math.max(0, tableWrap.clientWidth || 0);
    if (viewportWidth <= 0) return { first: 0, last: state.cols - 1 };
    const scrollLeft = Math.max(0, tableWrap.scrollLeft || 0);
    const viewRight = scrollLeft + viewportWidth;
    let first = -1;
    let last = -1;
    let acc = 0;
    for (let c = 0; c < state.cols; c += 1) {
      const colLeft = acc;
      const colRight = acc + (state.colWidths[c] || 0);
      if (colRight > scrollLeft + 0.5 && colLeft < viewRight - 0.5) {
        if (first < 0) first = c;
        last = c;
      }
      acc = colRight;
    }
    if (first < 0) return { first: 0, last: -1 };
    return { first, last };
  };
  const renderColHandles = () => {
    colHandleLayer.innerHTML = "";
    colHandleLayer.appendChild(colDropIndicator);
    const selectedCols = new Set(getSelectedColIndexes({ requireFullHeight: true }));
    const { first: visibleFirst, last: visibleLast } = getVisibleColIndexRange();
    let acc = 0;
    for (let c = 0; c < state.cols; c += 1) {
      const width = state.colWidths[c] || 0;
      if (c < visibleFirst || c > visibleLast) {
        acc += width;
        continue;
      }
      const colCenter = acc + (width / 2) - tableWrap.scrollLeft;
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = `table-col-handle${selectedCols.has(c) ? " selected" : ""}`;
      handle.dataset.col = String(c);
      handle.title = `Столбец ${c + 1}: тянуть для перемещения`;
      handle.style.left = `${colCenter}px`;
      handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        if (isWorkspaceReadOnly()) return;
        const currentCols = getSelectedColIndexes({ requireFullHeight: true });
        const blockCols = currentCols.includes(c) ? currentCols : [c];
        if (!currentCols.includes(c)) selectColumns([c], { focusCol: c });
        colDrag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          cols: blockCols,
          moved: false,
          dropIndex: getColDropIndexFromClientX(event.clientX)
        };
        handle.classList.add("dragging");
        setColDropIndicator(null);
        const onMove = (moveEvent) => {
          if (!colDrag || moveEvent.pointerId !== colDrag.pointerId) return;
          const nextDropIndex = getColDropIndexFromClientX(moveEvent.clientX);
          colDrag.dropIndex = nextDropIndex;
          if (Math.abs(moveEvent.clientX - colDrag.startX) > 3) colDrag.moved = true;
          setColDropIndicator(colDrag.moved ? nextDropIndex : null);
        };
        const onUp = (upEvent) => {
          if (!colDrag || upEvent.pointerId !== colDrag.pointerId) return;
          document.removeEventListener("pointermove", onMove, true);
          document.removeEventListener("pointerup", onUp, true);
          document.removeEventListener("pointercancel", onUp, true);
          handle.classList.remove("dragging");
          const dragState = colDrag;
          colDrag = null;
          setColDropIndicator(null);
          if (!dragState.moved) {
            selectColumns(dragState.cols, { focusCol: dragState.cols[dragState.cols.length - 1] });
            return;
          }
          if (moveColsBlock(dragState.cols, dragState.dropIndex)) saveLayout();
        };
        document.addEventListener("pointermove", onMove, true);
        document.addEventListener("pointerup", onUp, true);
        document.addEventListener("pointercancel", onUp, true);
      });
      handle.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentCols = getSelectedColIndexes({ requireFullHeight: true });
        if (!currentCols.includes(c)) selectColumns([c], { focusCol: c });
        const cols = getSelectedColIndexes({ requireFullHeight: true });
        showContextMenu(event.clientX, event.clientY, [
          {
            label: "Переместить влево",
            disabled: !cols.length || cols[0] <= 0,
            action: () => { if (moveSelectedColsBy(-1)) saveLayout(); }
          },
          {
            label: "Переместить вправо",
            disabled: !cols.length || cols[cols.length - 1] >= state.cols - 1,
            action: () => { if (moveSelectedColsBy(1)) saveLayout(); }
          }
        ]);
      });
      colHandleLayer.appendChild(handle);
      acc += width;
    }
  };
  const applyTableTrackSizesFromPanel = () => {
    const targets = getSelectedTrackIndexes();
    let changed = false;
    if (fpTableColWidth && !isControlMixed(fpTableColWidth) && fpTableColWidth.value !== "") {
      const nextWidth = Math.max(MIN_COL_WIDTH, Number(fpTableColWidth.value) || MIN_COL_WIDTH);
      targets.cols.forEach((index) => {
        if (Math.abs((state.colWidths[index] || 0) - nextWidth) > 0.01) {
          state.colWidths[index] = nextWidth;
          changed = true;
        }
      });
    }
    if (fpTableRowHeight && !isControlMixed(fpTableRowHeight) && fpTableRowHeight.value !== "") {
      const nextHeight = Math.max(MIN_ROW_HEIGHT, Number(fpTableRowHeight.value) || MIN_ROW_HEIGHT);
      targets.rows.forEach((index) => {
        if (Math.abs((state.rowHeights[index] || 0) - nextHeight) > 0.01) {
          state.rowHeights[index] = nextHeight;
          changed = true;
        }
      });
    }
    if (!changed) return false;
    node.style.width = `${Math.max(220, sumSizes(state.colWidths))}px`;
    node.style.height = `${Math.max(120, HEADER_HEIGHT + sumSizes(state.rowHeights))}px`;
    renderTable();
    syncShapeStateToDataset();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
    return true;
  };
  const pasteTextToSelection = (text, clipboardPayload = null, opts = {}) => {
    const td = activeCell || selectedCells[0] || tableEl.querySelector("td");
    if (!td || editingCell) return false;
    const value = normalizeClipboardPlainText(text);
    const plainOnly = opts?.plain === true;
    const startR = Number(td.dataset.r);
    const startC = Number(td.dataset.c);
    const normalizedPayload = clipboardPayload
      && normalizeClipboardPlainText(clipboardPayload.text) === value
      && Array.isArray(clipboardPayload.rows)
      ? clipboardPayload
      : null;
    if (normalizedPayload) {
      const deltaRow = startR - (Number(normalizedPayload.origin?.r) || 0);
      const deltaCol = startC - (Number(normalizedPayload.origin?.c) || 0);
      normalizedPayload.rows.forEach((row, dr) => {
        row.forEach((entry, dc) => {
          const cell = getCellState(startR + dr, startC + dc);
          if (!cell) return;
          const sourceCell = entry?.cell || entry || {};
          const raw = String(sourceCell.raw || "");
          const nextRaw = raw.trim().startsWith("=")
            ? shiftFormulaReferencesForClipboard(raw, deltaRow, deltaCol)
            : raw;
          if (plainOnly) {
            cell.raw = nextRaw;
            setCellState(cell);
            return;
          }
          const nextCell = normalizeCell({
            ...sourceCell,
            raw: nextRaw
          }, startR + dr, startC + dc);
          setCellState(nextCell);
        });
      });
    } else {
      value.replace(/\r/g, "").split("\n").forEach((line, dr) => {
        line.split("\t").forEach((part, dc) => {
          const cell = getCellState(startR + dr, startC + dc);
          if (!cell) return;
          cell.raw = part;
          setCellState(cell);
        });
      });
    }
    renderTable();
    refreshAllFormulaDisplays();
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
    const totalRowHeight = sumSizes(state.rowHeights);
    const hasHiddenFilterRows = state.tableFilterEnabled
      && Array.from({ length: state.rows }, (_, row) => row).some((row) => row > 0 && !isRowVisibleByFilters(row));
    const visibleRowHeight = hasHiddenFilterRows
      ? state.rowHeights.reduce((sum, height, row) => sum + ((row === 0 || isRowVisibleByFilters(row)) ? height : 0), 0)
      : totalRowHeight;
    tableEl.style.width = `${sumSizes(state.colWidths)}px`;
    tableEl.style.height = `${visibleRowHeight}px`;
    tableEl.classList.toggle("shape-table-grid-filtered", hasHiddenFilterRows);
    state.colWidths.forEach((width) => {
      const col = document.createElement("col");
      col.style.width = `${width}px`;
      colgroup.appendChild(col);
    });
    tableEl.appendChild(colgroup);
    for (let r = 0; r < state.rows; r += 1) {
      const tr = document.createElement("tr");
      tr.dataset.row = String(r);
      tr.style.height = `${state.rowHeights[r]}px`;
      if (state.tableFilterEnabled && r > 0 && !isRowVisibleByFilters(r)) {
        tr.style.display = "none";
      }
      for (let c = 0; c < state.cols; c += 1) {
        if (isCoveredByMerge(r, c)) continue;
        const td = document.createElement("td");
        const cell = getCellState(r, c) || normalizeCell({}, r, c);
        setCellState(cell);
        applyCellStyle(td, cell);
        if (state.tableFilterEnabled && r === 0) decorateFilterHeaderCell(td, cell);
        td.tabIndex = 0;
        td.contentEditable = "false";
        td.addEventListener("pointerdown", (event) => {
          if (editingCell === td) {
            event.stopPropagation();
            return;
          }
          if (activeFormulaEditor && activeFormulaEditor !== td && insertFormulaReferenceToken(getCellReferenceToken(r, c), event)) return;
          event.stopPropagation();
          if (isWorkspaceReadOnly()) return;
          if (event.metaKey || event.ctrlKey) {
            addCellToSelection(td);
            rangeSelecting = false;
            return;
          }
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
          if (isWorkspaceReadOnly()) return;
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
        td.addEventListener("input", () => {
          if (editingCell !== td) return;
          td.dataset.raw = td.innerText || td.textContent || "";
          refreshActiveFormulaReferenceHighlight();
        });
        td.addEventListener("keyup", () => {
          if (editingCell !== td) return;
          refreshActiveFormulaReferenceHighlight();
        });
        td.addEventListener("mouseup", () => {
          if (editingCell !== td) return;
          refreshActiveFormulaReferenceHighlight();
        });
        td.addEventListener("blur", () => {
          if (formulaEditorOverlay && formulaEditorOverlay.isConnected) return;
          finishCellEdit(td);
        });
        tr.appendChild(td);
      }
      tableEl.appendChild(tr);
    }
    node.dataset.tableRows = String(state.rows);
    node.dataset.tableCols = String(state.cols);
    if (node.__tableSelectionScope === "cells") {
      const resolveTd = (pos) => {
        const anchor = getMergeAnchor(pos.r, pos.c);
        return getCellElement(anchor.r, anchor.c);
      };
      selectedCells = Array.from(new Set(selectedCoords.map((pos) => resolveTd(pos)).filter(Boolean)));
      activeCell = activeCoords ? resolveTd(activeCoords) : (selectedCells[0] || null);
      if (activeCell && !selectedCells.includes(activeCell)) selectedCells.unshift(activeCell);
      paintSelectedCells();
    }
    updateStoredSize();
    renderRowHandles();
    renderColHandles();
    updateCellConnectorGuides();
    ensureTableScrollForViewport();
  };
  const detectTableBoundary = (event) => {
    const edgeThreshold = 3;
    const td = event.target instanceof Element ? event.target.closest("td") : null;
    if (td && tableEl.contains(td)) {
      const rect = td.getBoundingClientRect();
      const row = Number(td.dataset.r);
      const col = Number(td.dataset.c);
      const nearLeft = col > 0 ? (event.clientX - rect.left) <= edgeThreshold : false;
      const nearRight = col < state.cols - 1 ? (rect.right - event.clientX) <= edgeThreshold : false;
      const nearTop = row > 0 ? (event.clientY - rect.top) <= edgeThreshold : false;
      const nearBottom = row < state.rows - 1 ? (rect.bottom - event.clientY) <= edgeThreshold : false;
      const candidates = [];
      if (nearLeft) candidates.push({ type: "col", index: col - 1, distance: event.clientX - rect.left });
      if (nearRight) candidates.push({ type: "col", index: col, distance: rect.right - event.clientX });
      if (nearTop) candidates.push({ type: "row", index: row - 1, distance: event.clientY - rect.top });
      if (nearBottom) candidates.push({ type: "row", index: row, distance: rect.bottom - event.clientY });
      if (candidates.length) {
        candidates.sort((a, b) => a.distance - b.distance);
        return { type: candidates[0].type, index: candidates[0].index };
      }
    }
    const rect = tableWrap.getBoundingClientRect();
    const localZoom = Math.max(0.001, Number(zoom) || 1);
    const x = (event.clientX - rect.left) / localZoom;
    const y = (event.clientY - rect.top) / localZoom;
    const width = rect.width / localZoom;
    const height = rect.height / localZoom;
    if (x < 0 || y < 0 || x > width || y > height) return null;
    const tableWidth = sumSizes(state.colWidths);
    const tableHeight = sumSizes(state.rowHeights);
    if (x > tableWidth + edgeThreshold || y > tableHeight + edgeThreshold) return null;
    if (Math.abs(x - tableWidth) <= edgeThreshold && y <= tableHeight + edgeThreshold) return { type: "col", index: state.cols - 1 };
    if (Math.abs(y - tableHeight) <= edgeThreshold && x <= tableWidth + edgeThreshold) return { type: "row", index: state.rows - 1 };
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
    const selectionCols = (node.__tableSelectionScope === "cells"
      ? (selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []))
      : [])
      .map((td) => Number(td?.dataset?.c))
      .filter((col) => Number.isFinite(col) && col >= 0 && col < state.cols);
    const insertAt = selectionCols.length ? (Math.max(...selectionCols) + 1) : state.cols;
    rewriteFormulaReferencesForTableChange(node, {
      plainColMapper: (col) => col >= insertAt ? col + 1 : col,
      tokenColMapper: (col) => col >= insertAt ? col + 1 : col
    });
    const inheritedWidth = state.colWidths[Math.max(0, insertAt - 1)] || DEFAULT_COL_WIDTH;
    state.cols += 1;
    state.colWidths = [
      ...state.colWidths.slice(0, insertAt),
      Math.max(MIN_COL_WIDTH, inheritedWidth),
      ...state.colWidths.slice(insertAt)
    ];
    node.style.width = `${Math.max(node.offsetWidth || initialWidth, sumSizes(state.colWidths))}px`;
    const nextCells = new Map();
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        if (c === insertAt) {
          nextCells.set(cellKey(r, c), normalizeCell({}, r, c));
          continue;
        }
        const sourceCol = c > insertAt ? (c - 1) : c;
        const sourceCell = getCellState(r, sourceCol);
        nextCells.set(cellKey(r, c), normalizeCell({ ...(sourceCell || {}), r, c }, r, c));
      }
    }
    state.cells = nextCells;
    adjustMergesAfterColInsert(insertAt);
    renderTable();
    const newColCells = [];
    for (let r = 0; r < state.rows; r += 1) {
      const td = getCellElement(r, insertAt);
      if (td) newColCells.push(td);
    }
    selectedCells = newColCells;
    activeCell = newColCells[0] || null;
    rangeAnchor = activeCell;
    node.__tableSelectionScope = newColCells.length ? "cells" : node.__tableSelectionScope;
    paintSelectedCells();
    syncFormatPanel();
    saveLayout();
  };
  const addRow = () => {
    const selectionRows = (node.__tableSelectionScope === "cells"
      ? (selectedCells.length ? selectedCells : (activeCell ? [activeCell] : []))
      : [])
      .map((td) => Number(td?.dataset?.r))
      .filter((row) => Number.isFinite(row) && row >= 0 && row < state.rows);
    let insertAt = selectionRows.length ? (Math.max(...selectionRows) + 1) : state.rows;
    if (state.tableFilterEnabled) insertAt = Math.max(1, insertAt);
    rewriteFormulaReferencesForTableChange(node, {
      plainRowMapper: (row) => row >= insertAt ? row + 1 : row,
      tokenRowMapper: (row) => row >= insertAt ? row + 1 : row
    });
    const inheritedHeight = state.rowHeights[Math.max(0, insertAt - 1)] || DEFAULT_ROW_HEIGHT;
    state.rows += 1;
    state.rowHeights = [
      ...state.rowHeights.slice(0, insertAt),
      Math.max(MIN_ROW_HEIGHT, inheritedHeight),
      ...state.rowHeights.slice(insertAt)
    ];
    node.style.height = `${Math.max(node.offsetHeight || initialHeight, HEADER_HEIGHT + sumSizes(state.rowHeights))}px`;
    const nextCells = new Map();
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        if (r === insertAt) {
          nextCells.set(cellKey(r, c), normalizeCell({}, r, c));
          continue;
        }
        const sourceRow = r > insertAt ? (r - 1) : r;
        const sourceCell = getCellState(sourceRow, c);
        nextCells.set(cellKey(r, c), normalizeCell({ ...(sourceCell || {}), r, c }, r, c));
      }
    }
    state.cells = nextCells;
    adjustMergesAfterRowInsert(insertAt);
    renderTable();
    selectRows([insertAt], { focusRow: insertAt });
    syncFormatPanel();
    saveLayout();
  };
  const deleteSelectedColumns = () => {
    const cols = getSelectedColIndexes({ requireFullHeight: false });
    if (!cols.length || state.cols - cols.length < 1) return false;
    const deletedSet = new Set(cols);
    const remainingCols = [];
    for (let col = 0; col < state.cols; col += 1) {
      if (!deletedSet.has(col)) remainingCols.push(col);
    }
    const colMap = new Map();
    remainingCols.forEach((oldCol, newCol) => colMap.set(oldCol, newCol));
    const shiftCol = (col) => {
      let nextCol = Number(col);
      for (let i = 0; i < cols.length; i += 1) {
        if (cols[i] < nextCol) nextCol -= 1;
      }
      if (deletedSet.has(Number(col))) nextCol = Math.max(0, Math.min(remainingCols.length - 1, nextCol));
      return nextCol;
    };
    rewriteFormulaReferencesForTableChange(node, {
      plainColMapper: shiftCol,
      tokenColMapper: shiftCol
    });
    const removedWidth = cols.reduce((sum, col) => sum + (state.colWidths[col] || DEFAULT_COL_WIDTH), 0);
    state.cols = remainingCols.length;
    state.colWidths = remainingCols.map((oldCol) => state.colWidths[oldCol]);
    const nextCells = new Map();
    for (let r = 0; r < state.rows; r += 1) {
      remainingCols.forEach((oldCol, newCol) => {
        const sourceCell = getCellState(r, oldCol);
        nextCells.set(cellKey(r, newCol), normalizeCell({ ...(sourceCell || {}), r, c: newCol }, r, newCol));
      });
    }
    state.cells = nextCells;
    resyncMergeCoverage();
    node.style.width = `${Math.max(220, (node.offsetWidth || Number.parseFloat(node.style.width || "") || sumSizes(state.colWidths) + removedWidth) - removedWidth)}px`;
    renderTable();
    const nextCol = Math.max(0, Math.min(state.cols - 1, cols[0]));
    selectColumns([nextCol], { focusCol: nextCol });
    refreshAllFormulaDisplays();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
    saveLayout();
    return true;
  };
  const deleteSelectedRows = () => {
    let rows = getSelectedRowIndexes({ requireFullWidth: false });
    if (state.tableFilterEnabled) rows = rows.filter((row) => row !== 0);
    if (!rows.length || state.rows - rows.length < 1) return false;
    const deletedSet = new Set(rows);
    const remainingRows = [];
    for (let row = 0; row < state.rows; row += 1) {
      if (!deletedSet.has(row)) remainingRows.push(row);
    }
    const shiftRow = (row) => {
      let nextRow = Number(row);
      for (let i = 0; i < rows.length; i += 1) {
        if (rows[i] < nextRow) nextRow -= 1;
      }
      if (deletedSet.has(Number(row))) nextRow = Math.max(0, Math.min(remainingRows.length - 1, nextRow));
      return nextRow;
    };
    rewriteFormulaReferencesForTableChange(node, {
      plainRowMapper: shiftRow,
      tokenRowMapper: shiftRow
    });
    const removedHeight = rows.reduce((sum, row) => sum + (state.rowHeights[row] || DEFAULT_ROW_HEIGHT), 0);
    state.rows = remainingRows.length;
    state.rowHeights = remainingRows.map((oldRow) => state.rowHeights[oldRow]);
    const nextCells = new Map();
    remainingRows.forEach((oldRow, newRow) => {
      for (let c = 0; c < state.cols; c += 1) {
        const sourceCell = getCellState(oldRow, c);
        nextCells.set(cellKey(newRow, c), normalizeCell({ ...(sourceCell || {}), r: newRow, c }, newRow, c));
      }
    });
    state.cells = nextCells;
    resyncMergeCoverage();
    node.style.height = `${Math.max(120, (node.offsetHeight || Number.parseFloat(node.style.height || "") || HEADER_HEIGHT + sumSizes(state.rowHeights) + removedHeight) - removedHeight)}px`;
    renderTable();
    const nextRow = Math.max(0, Math.min(state.rows - 1, rows[0]));
    selectRows([nextRow], { focusRow: nextRow });
    refreshAllFormulaDisplays();
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
    node.dataset.tableTitle = state.title;
    syncTableReferenceName(node, state.title);
    node.dataset.tableWrap = state.tableWrap ? "1" : "0";
    node.dataset.tableAutoSize = state.tableAutoSize ? "1" : "0";
    node.dataset.tableTextScale = state.tableTextScale ? "1" : "0";
    node.dataset.scrollEnabled = state.tableScroll ? "1" : "0";
    node.dataset.tableFilterEnabled = state.tableFilterEnabled ? "1" : "0";
    node.dataset.tableHeaderFill = state.style.headerFill;
    node.dataset.tableHeaderFillEnabled = state.style.headerFillEnabled ? "1" : "0";
    node.dataset.tableHeaderGradientEnabled = state.style.headerGradientEnabled ? "1" : "0";
    node.dataset.tableHeaderFill2 = state.style.headerFill2;
    node.dataset.tableHeaderFillDirection = state.style.headerFillDirection;
    node.dataset.borderColor = state.style.border;
    node.dataset.borderEnabled = state.style.borderEnabled ? "1" : "0";
    node.dataset.borderWidth = String(state.style.borderWidth);
    node.dataset.borderStyle = normalizeBorderLineStyle(state.style.borderStyle || node.dataset.borderStyle || "solid");
    node.dataset.radius = String(state.style.radius);
    node.dataset.opacity = String(state.style.opacity);
    node.dataset.shadow = String(state.style.shadow);
    node.style.opacity = String(state.style.opacity);
    node.style.outline = "none";
    applyTableShapeVisualState(node, state);
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
    if (fpFontFamily) fpFontFamily.value = state.headerText.fontFamily;
    if (fpTextColor) fpTextColor.value = state.headerText.color;
    if (fpFontSize) fpFontSize.value = String(state.headerText.fontSize);
    if (fpBold) fpBold.checked = state.headerText.bold;
    if (fpItalic) fpItalic.checked = state.headerText.italic;
    if (fpStrike) fpStrike.checked = state.headerText.strike;
    if (fpUnderline) fpUnderline.checked = false;
    if (fpWrap) fpWrap.checked = state.headerText.wrap;
    if (fpScroll) fpScroll.checked = state.tableScroll;
    if (fpAutoSize) fpAutoSize.checked = state.tableAutoSize;
    if (fpTableFilter) fpTableFilter.checked = !!state.tableFilterEnabled;
    if (fpTextScale) fpTextScale.checked = state.tableTextScale;
    if (fpNumberGrouping) fpNumberGrouping.checked = true;
    if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, NUMBER_FORMAT_NUMBER);
    if (fpTableColWidth) {
      const { mixed, value } = getTrackMixedState(state.colWidths, Array.from({ length: state.cols }, (_item, index) => index));
      setTextMixedState(fpTableColWidth, mixed, value);
    }
    if (fpTableRowHeight) {
      const { mixed, value } = getTrackMixedState(state.rowHeights, Array.from({ length: state.rows }, (_item, index) => index));
      setTextMixedState(fpTableRowHeight, mixed, value);
    }
    setAlignButtons(state.headerText.hAlign, state.headerText.vAlign);
    updateFormatPanelVisuals();
    return true;
  };
  const syncCellToFormatPanel = () => {
    const td = activeCell || selectedCells[0];
    if (!td) return false;
    const tdStyle = getComputedStyle(td);
    const cells = (selectedCells.length ? selectedCells : [td])
      .map((cellEl) => getCellState(Number(cellEl.dataset.r), Number(cellEl.dataset.c)))
      .filter(Boolean);
    const cell = getCellState(Number(td.dataset.r), Number(td.dataset.c));
    if (!cell || !cells.length) return false;
    const mixed = (field) => cells.some((item) => item[field] !== cell[field]);
    if (fpFillEnabled) setCheckboxMixedState(fpFillEnabled, mixed("fillEnabled"), cell.fillEnabled);
    if (fpGradientEnabled) setCheckboxMixedState(fpGradientEnabled, mixed("gradientEnabled"), cell.gradientEnabled);
    if (fpFill) {
      fpFill.value = resolveUiColorValue(cell.fill1, tdStyle.backgroundColor || "#ffffff");
      setControlMixedFlag(fpFill, mixed("fill1"));
      fpFill.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("fill1"));
    }
    if (fpFill2) {
      fpFill2.value = resolveUiColorValue(cell.fill2, tdStyle.backgroundColor || "#ffffff");
      setControlMixedFlag(fpFill2, mixed("fill2"));
      fpFill2.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("fill2"));
    }
    if (fpFillType) setSelectMixedState(fpFillType, mixed("fillDirection"), cell.fillDirection);
    if (fpBorderEnabled) setCheckboxMixedState(fpBorderEnabled, mixed("borderEnabled"), cell.borderEnabled);
    if (fpCellBorders) setCheckboxMixedState(fpCellBorders, mixed("borderEnabled"), cell.borderEnabled);
    if (fpBorder) {
      fpBorder.value = resolveUiColorValue(cell.borderColor, tdStyle.borderColor || "#b8c0cc");
      setControlMixedFlag(fpBorder, mixed("borderColor"));
      fpBorder.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("borderColor"));
    }
    if (fpBorderWidth) setTextMixedState(fpBorderWidth, mixed("borderWidth"), cell.borderWidth);
    if (fpBorderWidthNum) setRangeMixedState(fpBorderWidthNum, fpBorderWidth, mixed("borderWidth"), cell.borderWidth);
    if (fpFontFamily) setSelectMixedState(fpFontFamily, mixed("fontFamily"), cell.fontFamily);
    if (fpTextColor) {
      fpTextColor.value = resolveUiColorValue(cell.color, tdStyle.color || "#334155");
      setControlMixedFlag(fpTextColor, mixed("color"));
      fpTextColor.closest(".fp-color-button")?.classList.toggle("fp-mixed", mixed("color"));
    }
    if (fpFontSize) setTextMixedState(fpFontSize, mixed("fontSize"), cell.fontSize);
    if (fpBold) setCheckboxMixedState(fpBold, mixed("bold"), cell.bold);
    if (fpItalic) setCheckboxMixedState(fpItalic, mixed("italic"), cell.italic);
    if (fpStrike) setCheckboxMixedState(fpStrike, mixed("strike"), cell.strike);
    if (fpUnderline) setCheckboxMixedState(fpUnderline, false, false);
    if (fpWrap) setCheckboxMixedState(fpWrap, mixed("wrap"), cell.wrap);
    if (fpScroll) fpScroll.checked = state.tableScroll;
    if (fpNumberGrouping) setCheckboxMixedState(fpNumberGrouping, mixed("numberGrouping"), cell.numberGrouping);
    if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, cell.numberFormat || NUMBER_FORMAT_NUMBER, mixed("numberFormat"));
    if (fpFormulaDecimals) setTextMixedState(fpFormulaDecimals, mixed("decimalPlaces"), cell.decimalPlaces == null ? "" : cell.decimalPlaces);
    if (fpAutoSize) fpAutoSize.checked = state.tableAutoSize;
    if (fpTableFilter) fpTableFilter.checked = !!state.tableFilterEnabled;
    if (fpTextScale) fpTextScale.checked = state.tableTextScale;
    if (fpOpacity) fpOpacity.value = String(Math.round(state.style.opacity * 100));
    if (fpOpacityNum) fpOpacityNum.value = String(Math.round(state.style.opacity * 100));
    if (fpShadow) fpShadow.value = String(state.style.shadow);
    if (fpShadowNum) fpShadowNum.value = String(state.style.shadow);
    if (fpTableColWidth) {
      const { mixed, value } = getTrackMixedState(state.colWidths, getSelectedTrackIndexes().cols);
      setTextMixedState(fpTableColWidth, mixed, value);
    }
    if (fpTableRowHeight) {
      const { mixed, value } = getTrackMixedState(state.rowHeights, getSelectedTrackIndexes().rows);
      setTextMixedState(fpTableRowHeight, mixed, value);
    }
    setAlignButtons(cell.align, cell.vAlign);
    updateFormatPanelVisuals();
    return true;
  };
  const syncToFormatPanelFromState = () => {
    if (node.__tableSelectionScope === "cells" && selectedCells.length) return syncCellToFormatPanel();
    return syncShapeToFormatPanel();
  };
  const applyPanelToShapeState = () => {
    applyTableTrackSizesFromPanel();
    state.tableWrap = fpWrap ? fpWrap.checked : state.tableWrap;
    state.tableAutoSize = fpAutoSize ? fpAutoSize.checked : state.tableAutoSize;
    state.tableTextScale = fpTextScale ? fpTextScale.checked : state.tableTextScale;
    state.tableScroll = fpScroll ? fpScroll.checked : state.tableScroll;
    state.tableFilterEnabled = fpTableFilter ? fpTableFilter.checked : state.tableFilterEnabled;
    if (!state.tableFilterEnabled) closeTableColumnFilterPopup();
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
    syncShapeStateToDataset();
    applyTableScrollState(tableWrap, state.tableScroll);
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
    applyTableTrackSizesFromPanel();
    state.tableWrap = fpWrap ? fpWrap.checked : state.tableWrap;
    state.tableAutoSize = fpAutoSize ? fpAutoSize.checked : state.tableAutoSize;
    state.tableTextScale = fpTextScale ? fpTextScale.checked : state.tableTextScale;
    state.tableScroll = fpScroll ? fpScroll.checked : state.tableScroll;
    const prevTableFilterEnabled = state.tableFilterEnabled;
    state.tableFilterEnabled = fpTableFilter ? fpTableFilter.checked : state.tableFilterEnabled;
    if (!state.tableFilterEnabled) closeTableColumnFilterPopup();
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
      cell.numberFormat = fpNumberFormat && !isControlMixed(fpNumberFormat)
        ? getNumberFormatButtonsValue(fpNumberFormat)
        : cell.numberFormat;
      cell.decimalPlaces = fpFormulaDecimals && !isControlMixed(fpFormulaDecimals)
        ? normalizeFormulaDecimalPlaces(fpFormulaDecimals.value, null)
        : cell.decimalPlaces;
      cell.align = getPanelAlign();
      cell.vAlign = getPanelVAlign();
      setCellState(cell);
      applyCellStyle(td, cell);
      if (state.tableFilterEnabled && cell.r === 0) decorateFilterHeaderCell(td, cell);
    });
    syncShapeStateToDataset();
    applyTableScrollState(tableWrap, state.tableScroll);
    if (prevTableFilterEnabled !== state.tableFilterEnabled) renderTable();
    updateStoredSize();
    return true;
  };
  const adjustAllFontSizesBy = (delta) => {
    const step = Number(delta) || 0;
    if (!step) return false;
    state.headerText.fontSize = clampFontSizeStep(state.headerText.fontSize + step, state.headerText.fontSize);
    state.cells.forEach((cell) => {
      cell.fontSize = clampFontSizeStep(cell.fontSize + step, cell.fontSize);
    });
    syncShapeStateToDataset();
    applyTitle();
    renderTable();
    updateStoredSize();
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
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
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
  };
  const countVisibleTracks = (sizes, limit) => {
    const maxLimit = Math.max(0, Number(limit) || 0);
    if (!sizes.length) return 1;
    let acc = 0;
    let count = 0;
    for (const size of sizes) {
      if (acc >= maxLimit - 0.5) break;
      acc += size;
      count += 1;
    }
    return Math.max(1, count);
  };
  const updateTableNodeRect = (left, top, width, height) => {
    node.style.left = `${left}px`;
    node.style.top = `${top}px`;
    node.style.width = `${Math.max(MIN_COL_WIDTH, width)}px`;
    node.style.height = `${Math.max(HEADER_HEIGHT + MIN_ROW_HEIGHT, height)}px`;
  };
  const createResizeSnapshot = (dir, event) => {
    const width = node.offsetWidth || Number.parseFloat(node.style.width || "") || sumSizes(state.colWidths);
    const height = node.offsetHeight || Number.parseFloat(node.style.height || "") || (HEADER_HEIGHT + sumSizes(state.rowHeights));
    const viewportWidth = tableWrap.clientWidth || width;
    const viewportHeight = tableWrap.clientHeight || Math.max(MIN_ROW_HEIGHT, height - HEADER_HEIGHT);
    return {
      x: event.clientX,
      y: event.clientY,
      dir,
      l: node.offsetLeft,
      t: node.offsetTop,
      w: width,
      h: height,
      viewportWidth,
      viewportHeight,
      visibleCols: countVisibleTracks(state.colWidths, viewportWidth),
      visibleRows: countVisibleTracks(state.rowHeights, viewportHeight),
      colWidths: state.colWidths.slice(),
      rowHeights: state.rowHeights.slice()
    };
  };
  const applyHandleResize = (drag, dx, dy) => {
    const isCornerResize = drag.dir.length === 2;
    const scaleCols = isCornerResize && (drag.dir.includes("e") || drag.dir.includes("w"));
    const scaleRows = isCornerResize && (drag.dir.includes("n") || drag.dir.includes("s"));
    let nextLeft = drag.l;
    let nextTop = drag.t;
    let nextWidth = drag.w;
    let nextHeight = drag.h;
    if (drag.dir.includes("e")) nextWidth = drag.w + dx;
    if (drag.dir.includes("s")) nextHeight = drag.h + dy;
    if (drag.dir.includes("w")) {
      nextWidth = drag.w - dx;
      nextLeft = drag.l + dx;
    }
    if (drag.dir.includes("n")) {
      nextHeight = drag.h - dy;
      nextTop = drag.t + dy;
    }
    const minWidth = MIN_COL_WIDTH;
    const minHeight = HEADER_HEIGHT + MIN_ROW_HEIGHT;
    nextWidth = Math.max(minWidth, nextWidth);
    nextHeight = Math.max(minHeight, nextHeight);
    if (drag.dir.includes("w")) nextLeft = drag.l + (drag.w - nextWidth);
    if (drag.dir.includes("n")) nextTop = drag.t + (drag.h - nextHeight);
    const sx = scaleCols ? (nextWidth / Math.max(MIN_COL_WIDTH, drag.viewportWidth)) : 1;
    const sy = scaleRows ? ((nextHeight - HEADER_HEIGHT) / Math.max(MIN_ROW_HEIGHT, drag.viewportHeight)) : 1;
    if (scaleCols) state.colWidths = drag.colWidths.map((width) => Math.max(MIN_COL_WIDTH, width * sx));
    if (scaleRows) state.rowHeights = drag.rowHeights.map((height) => Math.max(MIN_ROW_HEIGHT, height * sy));
    if (state.tableTextScale && (scaleCols || scaleRows)) {
      const textScale = scaleCols && scaleRows ? Math.min(sx, sy) : (scaleCols ? sx : sy);
      state.cells.forEach((cell) => {
        cell.fontSize = Math.max(8, Math.min(144, cell.fontSize * textScale));
      });
    }
    updateTableNodeRect(nextLeft, nextTop, nextWidth, nextHeight);
    if (isCornerResize) renderTable();
    else {
      updateStoredSize();
      ensureTableScrollForViewport();
    }
    updateDesktopExtent();
    layoutConnectorPoints(node);
    renderConnectors();
  };

  titleText.addEventListener("dblclick", (event) => {
    event.stopPropagation();
    beginTitleEdit();
  });
  titleBar.addEventListener("dblclick", (event) => {
    if (event.target.closest(".table-add-col") || event.target.closest(".table-add-row")) return;
    event.stopPropagation();
    selectShape(node);
    beginTitleEdit();
  });
  titleText.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    titleText.blur();
  });
  titleText.addEventListener("blur", () => {
    if (titleText.contentEditable !== "true") return;
    titleText.contentEditable = "false";
    const prevTitle = state.title;
    state.title = String(titleText.innerText || titleText.textContent || "Таблица").replace(/\s+/g, " ").trim() || "Таблица";
    const formulasChanged = renameTableReferencesInAllFormulas(prevTitle, state.title);
    applyTitle();
    renderTable();
    refreshAllFormulaDisplays();
    if (formulasChanged) getTableNodes().forEach((tableNode) => tableNode.__tableApi?.refreshDisplays?.());
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
    syncFormatPanel();
    saveLayout();
  };
  tableWrap.addEventListener("pointerup", finishTableResize);
  tableWrap.addEventListener("pointercancel", finishTableResize);
  tableWrap.addEventListener("scroll", () => {
    renderRowHandles();
    renderColHandles();
    updateCellConnectorGuides();
    renderConnectors();
  });
  document.addEventListener("pointerup", () => {
    rangeSelecting = false;
  });
  titleBar.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    if (isNodeInActiveMultiSelection(node)) {
      if (formatToggle.checked) {
        showFormatPanel();
        syncFormatPanel();
      }
      return;
    }
    selectShape(node);
  });
  ["n", "e", "s", "w"].forEach((anchor) => {
    const arrow = document.createElement("div");
    arrow.className = "table-cell-conn-arrow";
    arrow.dataset.anchor = anchor;
    arrow.textContent = ({ n: "↑", e: "→", s: "↓", w: "←" })[anchor] || "→";
    ["contextmenu", "mousedown", "mouseup", "click", "auxclick"].forEach((eventName) => {
      arrow.addEventListener(eventName, (event) => {
        if (eventName === "mousedown" || eventName === "mouseup" || eventName === "click" || eventName === "auxclick") {
          if (!(event.altKey || event.button === 2)) return;
        }
        suppressCellConnectorArrowBrowserMenu(event);
      });
    });
    arrow.addEventListener("pointerdown", (event) => {
      if (!activeCell) return;
      startConnectorFromPoint(node, anchor, event, {
        cell: { r: Number(activeCell.dataset.r), c: Number(activeCell.dataset.c) }
      });
    });
    cellConnectorArrows.set(anchor, arrow);
    cellConnectorGuides.appendChild(arrow);
  });
  ["contextmenu", "mousedown", "mouseup", "click", "auxclick"].forEach((eventName) => {
    cellConnectorGuides.addEventListener(eventName, (event) => {
      if (!event.target.closest(".table-cell-conn-arrow")) {
        if (eventName !== "contextmenu") return;
      } else if (eventName !== "contextmenu" && !(event.altKey || event.button === 2)) {
        return;
      }
      suppressCellConnectorArrowBrowserMenu(event);
    });
  });
  addColBtn.addEventListener("pointerdown", (event) => event.stopPropagation());
  addRowBtn.addEventListener("pointerdown", (event) => event.stopPropagation());
  addColBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canEditCurrentDocument()) return;
    addColumn();
  });
  addRowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canEditCurrentDocument()) return;
    addRow();
  });

  titleBar.appendChild(titleText);
  tableWrap.appendChild(tableEl);
  tableRoot.appendChild(tableWrap);
  chrome.appendChild(titleBar);
  chrome.appendChild(tableRoot);
  node.appendChild(chrome);
  node.appendChild(rowHandleLayer);
  node.appendChild(colHandleLayer);
  node.appendChild(cellConnectorGuides);
  node.appendChild(addColBtn);
  node.appendChild(addRowBtn);
  node.appendChild(resizeHandle);

  node.__clearTableSelection = clearCellSelection;
  node.__tableApi = {
    getSelection: () => ({ activeCell, cells: selectedCells.slice() }),
    getCellElement,
    beginCellEdit,
    refreshDisplays: refreshAllCellDisplays,
    resetConnectorGuideLatch: () => {
      cellConnectorGuidesLatched = false;
      updateCellConnectorGuides();
    },
    setDraftConnectorTarget: (cellRef) => {
      node.__draftConnectorTargetCell = cellRef ? normalizeCellRef(cellRef) : null;
      updateCellConnectorGuides();
    },
    updateConnectorGuides: updateCellConnectorGuides,
    syncToFormatPanel: syncToFormatPanelFromState,
    applyCellStyleFromFormatPanel: applyPanelToCellState,
    adjustAllFontSizesBy,
    applyFromFormatPanel: () => {
      if (node.__tableSelectionScope === "cells" && selectedCells.length) return applyPanelToCellState();
      return applyPanelToShapeState();
    },
    addColumnAfterSelection: addColumn,
    addRowAfterSelection: addRow,
    deleteSelectedColumns,
    deleteSelectedRows,
    moveSelectedColsBy,
    moveSelectedRowsBy,
    mergeSelectedCells,
    unmergeSelectedCells,
    moveSelectionBy,
    selectAllCells,
    clearSelectedText,
    getClipboardText,
    getClipboardPayload,
    pasteTextToSelection,
    getCellElementByAddress: (address) => {
      const ref = parseCellAddress(address);
      return ref ? getCellElement(ref.r, ref.c) : null;
    },
    getCellValueByAddress: (address, visiting = new Set()) => {
      const ref = parseCellAddress(address);
      return ref ? evaluateCellValue(ref.r, ref.c, visiting) : "#ERROR";
    },
    getCellReferenceToken: (r, c) => getCellReferenceToken(r, c),
    getReferenceName: () => syncTableReferenceName(node, state.title),
    createResizeSnapshot,
    applyHandleResize,
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
      tableScroll: state.tableScroll,
      tableFilterEnabled: state.tableFilterEnabled,
      columnFilters: serializeTableColumnFilters(state.columnFilters),
      headerText: { ...state.headerText },
      tableStyle: normalizeTableStyleRecord(state.style)
    })
  };

  applyTitle();
  applyTableShapeVisualState(node, state);
  renderTable();
  ensureTableScrollForViewport();
  attachDrag(node, titleBar, { raiseOnDrag: false });
  addShapeHandles(node, false);
  attachResize(node, resizeHandle, 220, 120, { raiseOnResize: false });
  attachConnectorPoints(node);
  appendToDesktop(node);
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
    src: win.dataset.sourceUrl || win.querySelector(".sheet-frame").src,
    left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height,
    zIndex: Number(win.style.zIndex || 0),
    aboveConnectors: win.dataset.aboveConnectors === "1"
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
      tableStyle = normalizeTableStyleRecord(tableSnapshot.tableStyle || {});
      tableData = {
        rows: tableSnapshot.rows,
        cols: tableSnapshot.cols,
        cells: tableSnapshot.cells,
        colWidths: tableSnapshot.colWidths,
        rowHeights: tableSnapshot.rowHeights,
        tableWrap: tableSnapshot.tableWrap,
        tableAutoSize: tableSnapshot.tableAutoSize,
        tableTextScale: tableSnapshot.tableTextScale,
        tableScroll: tableSnapshot.tableScroll,
        tableFilterEnabled: tableSnapshot.tableFilterEnabled,
        columnFilters: tableSnapshot.columnFilters,
        tableStyle
      };
      titleFontSize = Math.max(8, Math.min(144, Number(tableSnapshot.headerText?.fontSize || 18) || 18));
    }
  }
  const resolvedTableStyle = node.dataset.shapeType === "shape-table"
    ? normalizeTableStyleRecord({
      ...(tableStyle || {}),
      tableHeaderFill: (tableStyle?.tableHeaderFill || node.dataset.tableHeaderFill || ""),
      tableHeaderFillEnabled: tableStyle?.tableHeaderFillEnabled ?? (node.dataset.tableHeaderFillEnabled != null ? node.dataset.tableHeaderFillEnabled === "1" : undefined),
      tableHeaderGradientEnabled: tableStyle?.tableHeaderGradientEnabled ?? (node.dataset.tableHeaderGradientEnabled != null ? node.dataset.tableHeaderGradientEnabled === "1" : undefined),
      tableHeaderFill2: (tableStyle?.tableHeaderFill2 || node.dataset.tableHeaderFill2 || ""),
      tableHeaderFillDirection: tableStyle?.tableHeaderFillDirection || node.dataset.tableHeaderFillDirection || "horizontal",
      border: tableStyle?.border || node.dataset.borderColor || "",
      borderEnabled: tableStyle?.borderEnabled ?? (node.dataset.borderEnabled != null ? node.dataset.borderEnabled === "1" : undefined),
      borderWidth: tableStyle?.borderWidth ?? (Number(node.dataset.borderWidth) || undefined),
      borderStyle: tableStyle?.borderStyle || node.dataset.borderStyle || "solid",
      radius: tableStyle?.radius ?? (Number(node.dataset.radius) || undefined),
      opacity: tableStyle?.opacity ?? (Number(node.dataset.opacity) || undefined),
      shadow: tableStyle?.shadow ?? (Number(node.dataset.shadow) || undefined)
    })
    : null;
  const actualLeft = Number.isFinite(node.offsetLeft) ? node.offsetLeft : parseFloat(node.style.left || "0") || 0;
  const actualTop = Number.isFinite(node.offsetTop) ? node.offsetTop : parseFloat(node.style.top || "0") || 0;
  const actualWidth = Number.isFinite(node.offsetWidth) ? node.offsetWidth : parseFloat(node.style.width || "0") || 0;
  const actualHeight = Number.isFinite(node.offsetHeight) ? node.offsetHeight : parseFloat(node.style.height || "0") || 0;
  const textPadding = text ? getShapeTextPaddingValues(text) : null;
  const base = {
    id: node.dataset.shapeId,
    connId: node.dataset.connId || node.dataset.shapeId,
    groupId: node.dataset.groupId || undefined,
    frameId: node.dataset.frameId || undefined,
    frameName: node.dataset.shapeType === "shape-frame" ? (node.dataset.frameName || getDefaultFrameName()) : undefined,
    type: node.dataset.shapeType,
    shapeVariant: node.dataset.shapeType === "shape-rect" ? normalizeShapeVariant(node.dataset.shapeVariant) : undefined,
    shapeInsetDepth: node.dataset.shapeType === "shape-rect" && getVariantDepthConfig(normalizeShapeVariant(node.dataset.shapeVariant)) && normalizeShapeVariant(node.dataset.shapeVariant) !== "chevron" ? getShapeVariantDepth(node) : undefined,
    shapeInsetDepthPx: node.dataset.shapeType === "shape-rect" && normalizeShapeVariant(node.dataset.shapeVariant) === "chevron" ? getChevronInsetDepthPx(node) : undefined,
    left: formatPositionPx(actualLeft),
    top: formatPositionPx(actualTop),
    width: `${Math.max(20, (node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelWidth) || 0) : 0) || actualWidth || parseFloat(node.style.width || "20") || 20)}px`,
    height: `${Math.max(2, (node.dataset.shapeType === "shape-table" ? (Number(node.dataset.tablePixelHeight) || 0) : 0) || actualHeight || parseFloat(node.style.height || "2") || 2)}px`,
    zIndex: Number(node.style.zIndex || 0),
    aboveConnectors: node.dataset.aboveConnectors === "1",
    numberGrouping: text ? getNumberGroupingEnabled(text) : true,
    numberFormat: text ? getNumberFormat(text) : NUMBER_FORMAT_NUMBER,
    decimalPlaces: text ? getFormulaDecimalPlaces(text) : null,
    tableTitle: tableSnapshot ? tableSnapshot.title : (node.dataset.tableTitle || ""),
    tableHeaderFill: resolvedTableStyle ? resolvedTableStyle.tableHeaderFill : (node.dataset.tableHeaderFill || ""),
    tableHeaderFillEnabled: resolvedTableStyle
      ? boolFromStyleValue(resolvedTableStyle.tableHeaderFillEnabled, fillState.fillEnabled)
      : (node.dataset.tableHeaderFillEnabled != null ? node.dataset.tableHeaderFillEnabled === "1" : fillState.fillEnabled),
    tableHeaderGradientEnabled: resolvedTableStyle
      ? boolFromStyleValue(resolvedTableStyle.tableHeaderGradientEnabled, fillState.gradientEnabled)
      : (node.dataset.tableHeaderGradientEnabled != null ? node.dataset.tableHeaderGradientEnabled === "1" : fillState.gradientEnabled),
    tableHeaderFill2: resolvedTableStyle ? resolvedTableStyle.tableHeaderFill2 : (node.dataset.tableHeaderFill2 || fillState.fill2),
    tableHeaderFillDirection: resolvedTableStyle ? resolvedTableStyle.tableHeaderFillDirection : (node.dataset.tableHeaderFillDirection || fillState.fillDirection),
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
    scrollEnabled: node.dataset.shapeType === "shape-table" ? (tableSnapshot ? tableSnapshot.tableScroll : node.dataset.scrollEnabled === "1") : (node.dataset.scrollEnabled === "1"),
    tableStyle: node.dataset.shapeType === "shape-table" ? resolvedTableStyle : undefined,
    fillEnabled: resolvedTableStyle ? boolFromStyleValue(resolvedTableStyle.tableHeaderFillEnabled, fillState.fillEnabled) : fillState.fillEnabled,
    gradientEnabled: resolvedTableStyle ? boolFromStyleValue(resolvedTableStyle.tableHeaderGradientEnabled, fillState.gradientEnabled) : fillState.gradientEnabled,
    fillDirection: resolvedTableStyle ? resolvedTableStyle.tableHeaderFillDirection : fillState.fillDirection,
    fill: resolvedTableStyle ? resolvedTableStyle.tableHeaderFill : fillState.fill1,
    fill2: resolvedTableStyle ? resolvedTableStyle.tableHeaderFill2 : fillState.fill2,
    border: resolvedTableStyle ? resolvedTableStyle.border : (node.dataset.borderColor || node.style.borderColor || ""),
    borderEnabled: resolvedTableStyle
      ? boolFromStyleValue(resolvedTableStyle.borderEnabled, parseInt(node.style.borderWidth || "1", 10) > 0)
      : (node.dataset.borderEnabled != null ? node.dataset.borderEnabled === "1" : parseInt(node.style.borderWidth || "1", 10) > 0),
    borderWidth: resolvedTableStyle ? (resolvedTableStyle.borderWidth ?? Math.max(0, Number(node.dataset.borderWidth || parseInt(node.style.borderWidth || "1", 10) || 0))) : Math.max(0, Number(node.dataset.borderWidth || parseInt(node.style.borderWidth || "1", 10) || 0)),
    borderStyle: resolvedTableStyle ? (resolvedTableStyle.borderStyle || "solid") : getShapeBorderLineStyle(node),
    radius: resolvedTableStyle ? (resolvedTableStyle.radius ?? Math.max(0, Number(node.dataset.cornerRadius || parseInt(node.style.borderRadius || "0", 10) || 0))) : Math.max(0, Number(node.dataset.cornerRadius || parseInt(node.style.borderRadius || "0", 10) || 0)),
    opacity: resolvedTableStyle ? (resolvedTableStyle.opacity ?? (node.dataset.opacity || node.style.opacity || "1")) : (node.dataset.opacity || node.style.opacity || "1"),
    shadow: resolvedTableStyle ? (resolvedTableStyle.shadow ?? (Number(node.dataset.shadow ?? shadowState) || 0)) : (Number(node.dataset.shadow ?? shadowState) || 0),
    text: text ? (text.dataset.rawText != null ? text.dataset.rawText : (text.innerText || text.textContent || "")) : "",
    textHtml: text && text.dataset.textHtml ? String(text.dataset.textHtml) : undefined,
    textColor: text ? text.style.color : "#000000",
    fontSize: text ? parseInt(text.style.fontSize || "16", 10) : 16,
    bold: text ? text.style.fontWeight === "700" : false,
    hAlign: text ? (text.dataset.halign || "left") : "left",
    vAlign: text ? (text.dataset.valign || "top") : "top",
    textPaddingTop: textPadding ? textPadding.top : undefined,
    textPaddingRight: textPadding ? textPadding.right : undefined,
    textPaddingBottom: textPadding ? textPadding.bottom : undefined,
    textPaddingLeft: textPadding ? textPadding.left : undefined,
    angle: Number(ang) || 0,
    flipX: node.dataset.flipX === "1",
    flipY: node.dataset.flipY === "1",
    bpProcessId: node.dataset.bpProcessId || undefined,
    bpRole: node.dataset.bpRole || undefined,
    bpStageIndex: node.dataset.bpStageIndex != null ? Number(node.dataset.bpStageIndex) : undefined,
    bpTaskStageIndex: node.dataset.bpTaskStageIndex != null ? Number(node.dataset.bpTaskStageIndex) : undefined,
    bpTaskOrder: node.dataset.bpTaskOrder != null ? Number(node.dataset.bpTaskOrder) : undefined,
    bpTaskAutoHeight: node.dataset.bpTaskAutoHeight !== "0",
    bpTaskManualPosition: node.dataset.bpTaskManualPosition === "1",
    bpTaskData: isBpProcessTask(node) ? getBpTaskData(node) : undefined,
    bpTaskTypography: isBpProcessTask(node) ? getBpTaskTypography(node) : undefined,
    bpAutomationStageIndex: node.dataset.bpAutomationStageIndex != null ? Number(node.dataset.bpAutomationStageIndex) : undefined,
    bpAutomationOrder: node.dataset.bpAutomationOrder != null ? Number(node.dataset.bpAutomationOrder) : undefined,
    bpAutomationAutoHeight: node.dataset.bpAutomationAutoHeight !== "0",
    bpAutomationManualPosition: node.dataset.bpAutomationManualPosition === "1",
    bpAutomationData: isBpProcessAutomation(node) ? getBpAutomationData(node) : undefined,
    bpAutomationTypography: isBpProcessAutomation(node) ? getBpAutomationTypography(node) : undefined,
    bpTasksHidden: node.dataset.bpRole === "base" && node.dataset.bpTasksHidden === "1" ? true : undefined,
    bpAutomationsHidden: node.dataset.bpRole === "base" && node.dataset.bpAutomationsHidden === "1" ? true : undefined,
    attachedNoteId: node.dataset.attachedNoteId || undefined,
    attachedNote: isAttachedAnnotationNote(node) || undefined,
    noteOwnerId: node.dataset.noteOwnerId || undefined,
    textTool: node.dataset.textTool === "1" || undefined,
    imageSrc: node.dataset.shapeType === "shape-image" ? (node.dataset.imageSrc || "") : undefined,
    tableData
  };
  if (node.dataset.shapeType === "shape-chart" || node.dataset.shapeType === "shape-bitrix-card" || node.dataset.shapeType === "shape-bitrix-date-filter") {
    if (window.BitrixChart && window.BitrixChart.readBitrixShapeExtras) {
      return window.BitrixChart.readBitrixShapeExtras(node, base);
    }
  }
  if (node.dataset.shapeType === "shape-freedraw" && window.DrawTools?.readShapeExtras) {
    return window.DrawTools.readShapeExtras(node, base);
  }
  return base;
}

function getCurrentLayout() {
  return {
    schemaVersion: LAYOUT_SCHEMA_VERSION,
    zoom, zCounter, windowCounter, shapeCounter, groupCounter, frameCounter, bpProcessCounter,
    desktopStyle: { ...desktopStyleState },
    windows: Array.from(desktop.querySelectorAll(".sheet-window")).map(readWindowData),
    shapes: Array.from(desktop.querySelectorAll(".shape")).map(readShapeData),
    connectors
  };
}

async function saveLayout(opts = {}) {
  if (!canEditCurrentDocument()) return;
  scheduleLayoutSave(opts);
}

function scheduleLayoutSave(opts = {}) {
  if (!canEditCurrentDocument()) return;
  const recordHistory = opts.recordHistory !== false;
  const immediate = !!opts.immediate;
  if (recordHistory) {
    scheduleHistorySnapshot(immediate ? 0 : 350);
  }
  flushCurrentSheetLayout();
  if (autoSaveEnabled) {
    scheduleDocumentPersist(immediate ? 0 : 700);
  }
  saveViewportState();
}

let pendingHistoryTimer = null;
let pendingPersistTimer = null;

function scheduleHistorySnapshot(delay = 350) {
  clearTimeout(pendingHistoryTimer);
  if (delay <= 0) {
    pushHistorySnapshot();
    return;
  }
  pendingHistoryTimer = setTimeout(() => {
    pendingHistoryTimer = null;
    pushHistorySnapshot();
  }, delay);
}

async function flushPersistDocument() {
  if (!canEditCurrentDocument() || !autoSaveEnabled) return;
  flushCurrentSheetLayout();
  const docPayload = buildDocumentLayoutPayload();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docPayload));
  try {
    await persistCurrentDocument();
  } catch (err) {
    console.error("Failed to persist document:", err);
  }
}

function scheduleDocumentPersist(delay = 700) {
  clearTimeout(pendingPersistTimer);
  if (delay <= 0) {
    void flushPersistDocument();
    return;
  }
  pendingPersistTimer = setTimeout(() => {
    pendingPersistTimer = null;
    void flushPersistDocument();
  }, delay);
}

function flushPendingLayoutSave() {
  clearTimeout(pendingHistoryTimer);
  pendingHistoryTimer = null;
  clearTimeout(pendingPersistTimer);
  pendingPersistTimer = null;
  if (!canEditCurrentDocument()) return;
  pushHistorySnapshot();
  if (autoSaveEnabled) {
    flushCurrentSheetLayout();
    const docPayload = buildDocumentLayoutPayload();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docPayload));
  }
  saveViewportState();
}

function applyLayout(data) {
  if (!data || (!Array.isArray(data.windows) && !Array.isArray(data.shapes))) return false;
  const layout = migrateLayout(data);
  clearSelection();
  closeFileModal();
  clearDesktop();
  interactionControlsLayer = null;
  groupSelectionBox = null;
  applyDesktopStyle(layout.desktopStyle || DEFAULT_DESKTOP_STYLE);
  zoom = clamp(Number(layout.zoom) || 1, 0.4, 2);
  zCounter = Number(layout.zCounter) || 10;
  windowCounter = Number(layout.windowCounter) || 1;
  shapeCounter = Number(layout.shapeCounter) || 1;
  groupCounter = Number(layout.groupCounter) || 1;
  frameCounter = Number(layout.frameCounter) || 1;
  bpProcessCounter = Number(layout.bpProcessCounter) || 1;
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
      else if (s.type === "shape-image") createShapeImage(s, false);
      else if (s.type === "shape-frame") createShapeFrame({ ...s, collectChildren: false }, false);
      else if (s.type === "shape-chart" && window.BitrixChart) window.BitrixChart.restoreShapeChart(s, false);
      else if (s.type === "shape-bitrix-card" && window.BitrixChart) window.BitrixChart.restoreShapeCard(s, false);
      else if (s.type === "shape-bitrix-date-filter" && window.BitrixChart) window.BitrixChart.restoreShapeDateFilter(s, false);
      else if (s.type === "shape-freedraw" && window.DrawTools) window.DrawTools.restoreShapeFreedraw(s, false);
    } catch (err) {
      console.error("Failed to restore shape:", s, err);
    }
  });
  desktop.querySelectorAll('.shape[data-shape-type="shape-frame"]').forEach((frame) => {
    reorderFrameBehindChildren(frame);
  });
  (layout.connectors || []).forEach((c) => connectors.push(c));
  ensureUniqueConnectorIds();
  desktop.querySelectorAll("[data-bp-process-id]").forEach((node) => {
    const match = String(node.dataset.bpProcessId || "").match(/^bp(\d+)$/);
    if (match) bpProcessCounter = Math.max(bpProcessCounter, Number(match[1]) + 1);
  });
  relayoutAllBpProcesses();
  updateDesktopExtent();
  applyZoom();
  renderConnectors();
  refreshAllFormulaDisplays();
  syncWorkspaceAccessMode();
  purgeOrphanedInteractionControls();
  if (window.BitrixChart && window.BitrixChart.refreshBitrixConnectionState) {
    window.BitrixChart.refreshBitrixConnectionState().then(() => {
      if (window.BitrixChart.rebuildAllBitrixWidgets) window.BitrixChart.rebuildAllBitrixWidgets();
    });
  } else if (window.BitrixChart && window.BitrixChart.rebuildAllBitrixWidgets) {
    window.BitrixChart.rebuildAllBitrixWidgets();
  }
  if (window.BitrixChart?.syncBitrixWidgetsToTheme && isDarkThemeActive()) {
    window.BitrixChart.syncBitrixWidgetsToTheme({ save: false });
  }
  if (isDarkThemeActive()) {
    syncBpProcessesToTheme({ save: false });
  }
  desktop.querySelectorAll('.shape[data-attached-note="1"]').forEach((note) => {
    if (!isAttachedAnnotationNote(note)) return;
    const owner = getNoteOwnerShape(note);
    if (owner) owner.dataset.attachedNoteId = note.dataset.shapeId;
    const text = note.querySelector(".shape-text");
    if (text && String(text.dataset.rawText || "") === ATTACHED_NOTE_LEGACY_PLACEHOLDER) {
      text.dataset.rawText = "";
      delete text.dataset.textHtml;
      if (typeof renderShapeText === "function") renderShapeText(text);
      else text.textContent = "";
    }
    setAttachedNoteCollapsed(note, true);
  });
  expandedAttachedNoteId = null;
  syncAttachedNoteBadge();
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
      setAuthLocked(false);
      userLabel.textContent = data.name || data.email;
      authBtn.textContent = "Выйти";
      currentDocumentId = data.activeDocumentId || currentDocumentId;
      currentDocumentName = data.activeDocumentName || currentDocumentName;
      currentDocumentRole = data.activeDocumentRole || currentDocumentRole;
      documentsCache = Array.isArray(data.documents) ? data.documents.slice() : documentsCache;
    } else {
      currentUser = null;
      setAuthLocked(true);
      userLabel.textContent = "Гость";
      authBtn.textContent = "Войти";
      currentDocumentRole = "owner";
    }
  } catch {
    currentUser = null;
    setAuthLocked(true);
    currentDocumentRole = "owner";
  }
  updateCurrentDocumentCapabilities();
  updateProfileMenuState();
  syncGuestPublicUi();
  window.dispatchEvent(new CustomEvent("mmtable:auth-ready"));
  authBtn.onclick = async () => {
    if (!currentUser) { openAuthModal("login"); return; }
    await fetch("/auth/logout", { method: "POST" }); window.location.reload();
  };
}

async function handleFileCreate() {
  if (guestPublicView) {
    if (!currentUser) return;
    exitGuestPublicView();
    syncWorkspaceAccessMode();
  } else if (!canEditCurrentDocument()) {
    return;
  }
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
  if (getCurrentDocumentRole() !== "owner") {
    showHint(
      `Удалить может только владелец. Сейчас: ${roleLabel(getCurrentDocumentRole() || "reader")}.`,
      "error",
      3200
    );
    return;
  }
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
  if (guestPublicView && !currentUser) return;
  try {
    await loadDocumentsIndex();
    openFileModal("Открыть документ");
  } catch (err) {
    console.error(err);
    showHint("Не удалось открыть список документов.", "error", 2500);
  }
}

function getFormatPanelTargets() {
  if (selectedShape) return [selectedShape];
  const multi = getMultiSelectedShapes();
  if (multi.length) return multi;
  if (selectedGroupId) {
    return getGroupMembers(selectedGroupId).filter((node) => node && node.dataset.shapeType !== "shape-line");
  }
  return [];
}

function isGroupFormatSelection() {
  return !selectedShape && (multiSelectedShapeIds.size > 0 || !!selectedGroupId);
}

function readShapeFormatPanelSnapshot(node) {
  const snapshot = readShapeData(node);
  const text = node.querySelector(".shape-text");
  let result = snapshot;
  if (text) {
    const tc = getComputedStyle(text);
    result = Object.assign({}, snapshot, {
      fontFamily: fontKeyFromCss(tc.fontFamily || "Arial"),
      italic: tc.fontStyle === "italic",
      strike: (tc.textDecoration || "none").includes("line-through"),
      underline: (tc.textDecoration || "none").includes("underline"),
      wrap: (tc.whiteSpace || "pre-wrap") !== "nowrap"
    });
  }
  const opacity = Number(result.opacity);
  result = Object.assign({}, result, {
    opacity: opacity > 1 ? opacity / 100 : opacity
  });
  if (window.BitrixChart && window.BitrixChart.readShapeFormatPanelSnapshot) {
    return window.BitrixChart.readShapeFormatPanelSnapshot(node, result);
  }
  return result;
}

function applyFormatPanelToShape(node, opts = {}) {
  if (!node) return false;
  const formatSource = opts.source || null;
  const shapeType = node.dataset.shapeType;
  const groupMode = !!opts.groupMode;

  if (shapeType === "shape-bitrix-card") {
    const applyFn = node.__cardApi?.applyFromFormatPanel
      || (window.BitrixChart && window.BitrixChart.applyCardFormatPanel
        ? (target, nextOpts) => window.BitrixChart.applyCardFormatPanel(target, nextOpts)
        : null);
    return applyFn ? !!applyFn(node, { ...opts, groupMode: true }) : false;
  }
  if (shapeType === "shape-chart" && window.BitrixChart && window.BitrixChart.applyChartFormatPanel) {
    return !!window.BitrixChart.applyChartFormatPanel(node, { ...opts, groupMode: true });
  }
  if (shapeType === "shape-bitrix-date-filter" && window.BitrixChart && window.BitrixChart.applyFilterFormatPanel) {
    return !!window.BitrixChart.applyFilterFormatPanel(node, { ...opts, groupMode: true });
  }

  const text = node.querySelector(".shape-text");
  const tableState = shapeType === "shape-table" ? node.__tableState : null;
  const steppedBpFill = opts.steppedBpFill || null;
  const steppedBpStageSet = steppedBpFill ? new Set(steppedBpFill.stages) : null;

  if (!steppedBpStageSet?.has(node)) {
    if (fpFillEnabled && !isControlMixed(fpFillEnabled)) {
      const fillEnabled = fpFillEnabled.checked;
      const gradientEnabled = fillEnabled && fpGradientEnabled && !isControlMixed(fpGradientEnabled) ? fpGradientEnabled.checked : (node.dataset.gradientEnabled === "1");
      applyFillStyle(node, {
        fillEnabled,
        gradientEnabled,
        fill1: !isControlMixed(fpFill) ? fpFill.value : (node.dataset.fillColor || "#ffffff"),
        fill2: fpFill2 && !isControlMixed(fpFill2) ? fpFill2.value : (node.dataset.fillColor2 || node.dataset.fillColor || "#ffffff"),
        fillDirection: fpFillType && !isControlMixed(fpFillType) ? fpFillType.value : (node.dataset.fillDirection || "horizontal")
      });
    } else if (fpGradientEnabled && !isControlMixed(fpGradientEnabled) && fpFill && !isControlMixed(fpFill)) {
      applyFillStyle(node, {
        fillEnabled: node.dataset.fillEnabled !== "0",
        gradientEnabled: fpGradientEnabled.checked,
        fill1: fpFill.value,
        fill2: fpFill2 && !isControlMixed(fpFill2) ? fpFill2.value : (node.dataset.fillColor2 || fpFill.value),
        fillDirection: fpFillType && !isControlMixed(fpFillType) ? fpFillType.value : (node.dataset.fillDirection || "horizontal")
      });
    }
  }
  if (fpBorderEnabled && !isControlMixed(fpBorderEnabled)) {
    node.dataset.borderEnabled = fpBorderEnabled.checked ? "1" : "0";
    if (tableState) tableState.style.borderEnabled = fpBorderEnabled.checked;
  }
  if (fpBorder && !isControlMixed(fpBorder)) {
    setShapeBorderColor(node, fpBorder.value);
    if (tableState) tableState.style.border = fpBorder.value;
  }
  if (fpLineStyle && !isControlMixed(fpLineStyle)) {
    node.dataset.borderStyle = normalizeBorderLineStyle(fpLineStyle.value);
    node.style.borderStyle = node.dataset.borderStyle;
    if (tableState) tableState.style.borderStyle = node.dataset.borderStyle;
  }
  if (fpBorderWidth && !isControlMixed(fpBorderWidth)) {
    const borderWidth = Math.max(0, Number(fpBorderWidth.value) || 0);
    node.dataset.borderWidth = String(borderWidth);
    node.style.borderWidth = node.dataset.borderEnabled === "1" ? `${Math.max(1, borderWidth)}px` : "0px";
    if (tableState) tableState.style.borderWidth = node.dataset.borderEnabled === "1" ? Math.max(1, borderWidth) : 0;
  }
  if (fpRadius && !isControlMixed(fpRadius)) {
    if (shapeType === "shape-rect") node.dataset.cornerRadius = String(Number(fpRadius.value) || 0);
    node.style.borderRadius = `${fpRadius.value}px`;
    if (tableState) tableState.style.radius = Math.max(0, Number(fpRadius.value) || 0);
  }
  if (fpOpacity && !isControlMixed(fpOpacity)) {
    node.style.opacity = `${Number(fpOpacity.value) / 100}`;
    if (tableState) tableState.style.opacity = Number(fpOpacity.value) / 100;
  }
  if (fpShadow && !isControlMixed(fpShadow)) {
    applyNodeShadow(node, fpShadow.value);
    if (tableState) tableState.style.shadow = Math.max(0, Number(fpShadow.value) || 0);
  }
  if (tableState) {
    if (fpFillEnabled && !isControlMixed(fpFillEnabled)) tableState.style.headerFillEnabled = fpFillEnabled.checked;
    if (fpGradientEnabled && !isControlMixed(fpGradientEnabled)) tableState.style.headerGradientEnabled = fpFillEnabled?.checked !== false && fpGradientEnabled.checked;
    if (fpFill && !isControlMixed(fpFill)) tableState.style.headerFill = fpFill.value;
    if (fpFill2 && !isControlMixed(fpFill2)) tableState.style.headerFill2 = fpFill2.value;
    if (fpFillType && !isControlMixed(fpFillType)) tableState.style.headerFillDirection = fpFillType.value;
    if (fpFontFamily && !isControlMixed(fpFontFamily)) tableState.headerText.fontFamily = fontKeyFromCss(fpFontFamily.value);
    if (fpTextColor && !isControlMixed(fpTextColor)) tableState.headerText.color = fpTextColor.value;
    if (fpFontSize && !isControlMixed(fpFontSize)) tableState.headerText.fontSize = Math.max(8, Number(fpFontSize.value) || 8);
    if (fpBold && !isControlMixed(fpBold)) tableState.headerText.bold = fpBold.checked;
    if (fpItalic && !isControlMixed(fpItalic)) tableState.headerText.italic = fpItalic.checked;
    if (fpStrike && !isControlMixed(fpStrike)) tableState.headerText.strike = fpStrike.checked;
    if (fpWrap && !isControlMixed(fpWrap)) tableState.headerText.wrap = fpWrap.checked;
  }
  if (text) {
    if (fpTextColor && !isControlMixed(fpTextColor)) text.style.color = fpTextColor.value;
    if (fpFontFamily && !isControlMixed(fpFontFamily)) text.style.fontFamily = fontCssFromKey(fpFontFamily.value);
    if (fpFontSize && !isControlMixed(fpFontSize)) text.style.fontSize = `${Math.max(8, Number(fpFontSize.value) || 8)}px`;
    if (fpBold && !isControlMixed(fpBold)) text.style.fontWeight = fpBold.checked ? "700" : "400";
    if (fpItalic && !isControlMixed(fpItalic)) text.style.fontStyle = fpItalic.checked ? "italic" : "normal";
    if (fpStrike || fpUnderline) {
      const textDeco = [];
      if (fpStrike && !isControlMixed(fpStrike) && fpStrike.checked) textDeco.push("line-through");
      if (fpUnderline && !isControlMixed(fpUnderline) && fpUnderline.checked) textDeco.push("underline");
      if ((fpStrike && !isControlMixed(fpStrike)) || (fpUnderline && !isControlMixed(fpUnderline))) {
        text.style.textDecoration = textDeco.length ? textDeco.join(" ") : "none";
      }
    }
    if (fpNumberFormat && !isControlMixed(fpNumberFormat)) setNumberFormat(text, getNumberFormatButtonsValue(fpNumberFormat));
    if (fpFormulaDecimals && !isControlMixed(fpFormulaDecimals)) setFormulaDecimalPlaces(text, fpFormulaDecimals.value);
    if (fpWrap && !isControlMixed(fpWrap)) text.style.whiteSpace = fpWrap.checked ? "pre-wrap" : "nowrap";
    if (fpScroll && !isControlMixed(fpScroll) && (shapeType === "shape-rect" || shapeType === "shape-table")) {
      node.dataset.scrollEnabled = fpScroll.checked ? "1" : "0";
      if (shapeType === "shape-rect") applyShapeScrollState(node);
      if (shapeType === "shape-table") applyTableScrollState(node.__tableWrapEl, fpScroll.checked);
    }
    if (!formatSource || isTextPaddingFormatControl(formatSource)) {
      applyShapeTextPaddingValues(text, readTextPaddingFromFormatPanel(formatSource));
    }
    renderShapeText(text);
  }
  if (shapeType === "shape-table" && fpScroll && !isControlMixed(fpScroll)) {
    node.dataset.scrollEnabled = fpScroll.checked ? "1" : "0";
    applyTableScrollState(node.__tableWrapEl, fpScroll.checked);
  }
  if (shapeType === "shape-line") {
    const lineEnabled = fpBorderEnabled ? fpBorderEnabled.checked : true;
    if (fpBorder && !isControlMixed(fpBorder)) node.style.background = lineEnabled ? fpBorder.value : "transparent";
    if (fpBorderWidth && !isControlMixed(fpBorderWidth)) node.style.height = `${Math.max(1, Number(fpBorderWidth.value) || 1)}px`;
  }
  if (tableState) refreshTableShapeFormatPanelState(node);
  renderShapeVisual(node);
  syncShapeVisualStyle(node);
  if (isBpProcessStage(node)) onChevronShapeResized(node);
  else if (isBpProcessTask(node)) onBpTaskResized(node);
  else if (isBpProcessAutomation(node)) onBpAutomationResized(node);
  layoutConnectorPoints(node);
  return true;
}

let syncFormatPanelRaf = 0;
function scheduleSyncFormatPanel() {
  if (!formatToggle.checked) return;
  if (syncFormatPanelRaf) return;
  syncFormatPanelRaf = requestAnimationFrame(() => {
    syncFormatPanelRaf = 0;
    syncFormatPanel();
  });
}

function syncFormatPanel() {
  if (!formatToggle.checked) return;
  const bitrixHint = $("bitrixCardFormatHint");
  if (bitrixHint && (!selectedShape || selectedShape.dataset.shapeType !== "shape-bitrix-card" || multiSelectedShapeIds.size || selectedGroupId)) {
    bitrixHint.classList.add("hidden");
  }
  setControlVisibilityByMode(getSelectionMode());
  if (getSelectionMode() === "desktop") {
    if (fpFillEnabled) fpFillEnabled.checked = desktopStyleState.fillEnabled;
    if (fpGradientEnabled) fpGradientEnabled.checked = desktopStyleState.gradientEnabled;
    if (fpFill) fpFill.value = desktopStyleState.fill;
    if (fpFill2) fpFill2.value = desktopStyleState.fill2;
    if (fpFillType) fpFillType.value = desktopStyleState.fillDirection;
    if (fpBorderEnabled) fpBorderEnabled.checked = desktopStyleState.borderEnabled;
    if (fpBorder) fpBorder.value = desktopStyleState.border;
    if (fpBorderWidth) fpBorderWidth.value = String(desktopStyleState.gridSize);
    if (fpBorderWidthNum) fpBorderWidthNum.value = String(desktopStyleState.gridSize);
    if (fpOpacity) fpOpacity.value = String(desktopStyleState.opacity);
    if (fpOpacityNum) fpOpacityNum.value = String(desktopStyleState.opacity);
    updateFormatPanelVisuals();
    return;
  }
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    fpBorder.value = c.color || "#1f2937";
    if (fpBorderEnabled) fpBorderEnabled.checked = true;
    fpBorderWidth.value = Math.max(1, Number(c.width) || 2);
    if (fpBorderWidthNum) fpBorderWidthNum.value = fpBorderWidth.value;
    if (fpLineStyle) fpLineStyle.value = c.lineStyle || "solid";
    setConnectorRouteButtons(fpConnRouteStyle, normalizeConnectorRouteStyle(c.routeStyle));
    if (fpOpacity) fpOpacity.value = String(Math.round(normalizeOpacityValue(c.opacity ?? 1) * 100));
    if (fpOpacityNum && fpOpacity) fpOpacityNum.value = fpOpacity.value;
    if (fpShadow) fpShadow.value = String(Math.max(0, Number(c.shadow) || 0));
    if (fpShadowNum && fpShadow) fpShadowNum.value = fpShadow.value;
    if (fpConnGapStart) fpConnGapStart.value = String(Number(c.gapStart ?? c.gap ?? 30));
    if (fpConnGapStartNum && fpConnGapStart) fpConnGapStartNum.value = fpConnGapStart.value;
    if (fpConnGapEnd) fpConnGapEnd.value = String(Number(c.gapEnd ?? c.gap ?? 30));
    if (fpConnGapEndNum && fpConnGapEnd) fpConnGapEndNum.value = fpConnGapEnd.value;
    setArrowShapeButtons(fpArrowStartShape, c.startArrowShape || "classic");
    setArrowShapeButtons(fpArrowEndShape, c.endArrowShape || "classic");
    const labelStyle = getConnectorLabelStyle(c);
    if (fpFontFamily) setFontSelectValue(fpFontFamily, labelStyle.fontFamily);
    if (fpFontSize) fpFontSize.value = String(labelStyle.fontSize);
    if (fpTextColor) fpTextColor.value = rgbToHex(labelStyle.color || c.color || "#1f2937");
    if (fpBold) fpBold.checked = labelStyle.bold;
    if (fpItalic) fpItalic.checked = labelStyle.italic;
    if (fpStrike) fpStrike.checked = labelStyle.strike;
    if (fpUnderline) fpUnderline.checked = labelStyle.underline;
    setAlignButtons(labelStyle.hAlign, labelStyle.vAlign);
    updateFormatPanelVisuals();
    return;
  }
  if (selectedWindow) {
    return;
  }
  const panelShape = selectedShape
    || ((!multiSelectedShapeIds.size && selectedGroupId)
      ? getGroupMembers(selectedGroupId).find((node) => node.dataset.shapeType !== "shape-line")
      : null);
  if (!selectedShape && (multiSelectedShapeIds.size || selectedGroupId)) {
    const shapes = getFormatPanelTargets();
    if (!shapes.length) return;
    const data = shapes.map(readShapeFormatPanelSnapshot);
    const mixed = (key) => data.some((item) => item[key] !== data[0][key]);
    const first = data[0];
    if (fpFillEnabled) setCheckboxMixedState(fpFillEnabled, mixed("fillEnabled"), first.fillEnabled);
    if (fpGradientEnabled) setCheckboxMixedState(fpGradientEnabled, mixed("gradientEnabled"), first.gradientEnabled);
    if (fpFill) {
      fpFill.value = first.fill || "#ffffff";
      setControlMixedFlag(fpFill, mixed("fill"));
    }
    if (fpFill2) {
      fpFill2.value = first.fill2 || fpFill.value;
      setControlMixedFlag(fpFill2, mixed("fill2"));
    }
    if (fpFillType) {
      fpFillType.value = first.fillDirection || "horizontal";
      setControlMixedFlag(fpFillType, mixed("fillDirection"));
    }
    if (fpBorderEnabled) setCheckboxMixedState(fpBorderEnabled, mixed("borderEnabled"), first.borderEnabled);
    if (fpBorder) {
      fpBorder.value = rgbToHex(first.border || "#000000");
      setControlMixedFlag(fpBorder, mixed("border"));
    }
    if (fpLineStyle) setSelectMixedState(fpLineStyle, mixed("borderStyle"), first.borderStyle || "solid");
    if (fpBorderWidth && fpBorderWidthNum) setRangeMixedState(fpBorderWidth, fpBorderWidthNum, mixed("borderWidth"), first.borderWidth);
    if (fpRadius && fpRadiusNum) setRangeMixedState(fpRadius, fpRadiusNum, mixed("radius"), first.radius || 0);
    if (fpOpacity && fpOpacityNum) setRangeMixedState(fpOpacity, fpOpacityNum, mixed("opacity"), Math.round(Number(first.opacity || 1) * 100));
    if (fpShadow && fpShadowNum) setRangeMixedState(fpShadow, fpShadowNum, mixed("shadow"), first.shadow || 0);
    if (fpFontFamily) {
      setFontSelectValue(fpFontFamily, first.fontFamily || "Arial");
      setControlMixedFlag(fpFontFamily, mixed("fontFamily"));
    }
    if (fpTextColor) {
      fpTextColor.value = rgbToHex(first.textColor || "#000000");
      setControlMixedFlag(fpTextColor, mixed("textColor"));
    }
    if (fpFontSize) {
      fpFontSize.value = String(first.fontSize || 16);
      setControlMixedFlag(fpFontSize, mixed("fontSize"));
    }
    if (fpFormulaDecimals) {
      fpFormulaDecimals.value = first.decimalPlaces == null ? "" : String(Math.max(0, Number(first.decimalPlaces) || 0));
      setControlMixedFlag(fpFormulaDecimals, mixed("decimalPlaces"));
    }
    if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, first.numberFormat || NUMBER_FORMAT_NUMBER, mixed("numberFormat"));
    if (fpBold) setCheckboxMixedState(fpBold, mixed("bold"), first.bold);
    if (fpItalic) setCheckboxMixedState(fpItalic, mixed("italic"), first.italic);
    if (fpStrike) setCheckboxMixedState(fpStrike, mixed("strike"), first.strike);
    if (fpUnderline) setCheckboxMixedState(fpUnderline, mixed("underline"), first.underline);
    if (fpWrap) setCheckboxMixedState(fpWrap, mixed("wrap"), first.wrap);
    if (fpScroll) setCheckboxMixedState(fpScroll, mixed("scrollEnabled"), first.scrollEnabled);
    if (fpX) setTextMixedState(fpX, mixed("textPaddingTop"), first.textPaddingTop ?? DEFAULT_SHAPE_TEXT_PADDING);
    if (fpW) setTextMixedState(fpW, mixed("textPaddingLeft"), first.textPaddingLeft ?? DEFAULT_SHAPE_TEXT_PADDING);
    if (fpH) setTextMixedState(fpH, mixed("textPaddingBottom"), first.textPaddingBottom ?? DEFAULT_SHAPE_TEXT_PADDING);
    if (fpR) setTextMixedState(fpR, mixed("textPaddingRight"), first.textPaddingRight ?? DEFAULT_SHAPE_TEXT_PADDING);
    if (fpY) {
      const uniform = data.every((item) => (
        item.textPaddingTop === item.textPaddingRight
        && item.textPaddingRight === item.textPaddingBottom
        && item.textPaddingBottom === item.textPaddingLeft
      ));
      fpY.value = uniform && !mixed("textPaddingTop") ? String(first.textPaddingTop ?? DEFAULT_SHAPE_TEXT_PADDING) : "";
    }
    if (!mixed("hAlign") && !mixed("vAlign")) {
      setAlignButtons(first.hAlign || "left", first.vAlign || "top");
    } else {
      if (!mixed("hAlign")) setHorizontalAlignButtons(first.hAlign || "left");
      else [fpAlignLeft, fpAlignCenter, fpAlignRight].forEach((b) => b?.classList.remove("active"));
      if (!mixed("vAlign")) setVerticalAlignButtons(first.vAlign || "top");
      else [fpVTop, fpVMiddle, fpVBottom].forEach((b) => b?.classList.remove("active"));
    }
    updateFormatPanelVisuals();
    return;
  }
  if (!panelShape) return;
  if (panelShape.dataset.shapeType === "shape-table") {
    if (panelShape.__tableApi && panelShape.__tableApi.syncToFormatPanel) {
      panelShape.__tableApi.syncToFormatPanel();
    }
    return;
  }
  if (panelShape.dataset.shapeType === "shape-bitrix-card") {
    if (panelShape.__cardApi && panelShape.__cardApi.syncToFormatPanel) {
      panelShape.__cardApi.syncToFormatPanel();
    } else if (window.BitrixChart && window.BitrixChart.syncCardFormatPanel) {
      window.BitrixChart.syncCardFormatPanel(panelShape);
    }
    return;
  }
  if (panelShape.dataset.shapeType === "shape-chart") {
    if (window.BitrixChart && window.BitrixChart.syncChartFormatPanel) {
      window.BitrixChart.syncChartFormatPanel(panelShape);
    }
    return;
  }
  if (panelShape.dataset.shapeType === "shape-bitrix-date-filter") {
    if (window.BitrixChart && window.BitrixChart.syncFilterFormatPanel) {
      window.BitrixChart.syncFilterFormatPanel(panelShape);
    }
    return;
  }
  const cs = getComputedStyle(panelShape);
  const text = panelShape.querySelector(".shape-text");
  const fillState = getFillStyleFromNode(panelShape, "#ffffff");
  if (fpFillEnabled) fpFillEnabled.checked = fillState.fillEnabled;
  if (fpGradientEnabled) fpGradientEnabled.checked = fillState.gradientEnabled;
  fpFill.value = fillState.fill1;
  if (fpFill2) fpFill2.value = fillState.fill2;
  if (fpFillType) fpFillType.value = fillState.fillDirection;
  fpBorder.value = rgbToHex(getShapeBorderColor(panelShape, cs.borderColor || "#000000"));
  const shapeBorderWidth = Math.max(0, Number(panelShape.dataset.borderWidth || cs.borderWidth || 1) || 0);
  fpBorderWidth.value = String(shapeBorderWidth);
  if (fpBorderWidthNum) fpBorderWidthNum.value = fpBorderWidth.value;
  if (fpLineStyle) fpLineStyle.value = getShapeBorderLineStyle(panelShape);
  const shapeBorderEnabled = panelShape.dataset.borderEnabled != null ? panelShape.dataset.borderEnabled === "1" : parseInt(cs.borderWidth || "1", 10) > 0;
  if (fpBorderEnabled) fpBorderEnabled.checked = shapeBorderEnabled;
  fpRadius.value = String(Math.max(0, Number(panelShape.dataset.cornerRadius || parseInt(cs.borderRadius || "0", 10) || 0)));
  if (fpRadiusNum) fpRadiusNum.value = fpRadius.value;
  fpOpacity.value = Math.round(Number(cs.opacity) * 100);
  if (fpOpacityNum) fpOpacityNum.value = fpOpacity.value;
  fpShadow.value = String(Number(panelShape.dataset.shadow ?? parseShadowValue(panelShape.style.boxShadow || cs.boxShadow)) || 0);
  if (fpShadowNum) fpShadowNum.value = fpShadow.value;
  const m = (panelShape.style.transform || "").match(/rotate\(([-0-9.]+)deg\)/);
  fpAngle.value = m ? Number(m[1]).toFixed(0) : 0;
  if (text) {
    const tc = getComputedStyle(text);
    const selectionFormat = text.contentEditable === "true" ? getShapeTextSelectionFormat(text) : null;
    if (selectionFormat) {
      setFontSelectValue(fpFontFamily, selectionFormat.fontFamily || "Arial");
      fpTextColor.value = rgbToHex(selectionFormat.color || "#000000");
      fpFontSize.value = selectionFormat.fontSize;
      fpBold.checked = selectionFormat.bold;
      if (fpItalic) fpItalic.checked = selectionFormat.italic;
      if (fpStrike) fpStrike.checked = selectionFormat.strike;
      if (fpUnderline) fpUnderline.checked = selectionFormat.underline;
    } else {
      setFontSelectValue(fpFontFamily, tc.fontFamily || "Arial");
      fpTextColor.value = rgbToHex(tc.color);
      fpFontSize.value = parseInt(tc.fontSize || "16", 10);
      fpBold.checked = tc.fontWeight === "700";
      if (fpItalic) fpItalic.checked = tc.fontStyle === "italic";
      if (fpStrike) fpStrike.checked = (tc.textDecoration || "none").includes("line-through");
      if (fpUnderline) fpUnderline.checked = (tc.textDecoration || "none").includes("underline");
    }
    if (fpNumberGrouping) fpNumberGrouping.checked = getNumberGroupingEnabled(text);
    if (fpNumberFormat) setNumberFormatButtons(fpNumberFormat, getNumberFormat(text));
    if (fpFormulaDecimals) fpFormulaDecimals.value = getFormulaDecimalPlaces(text) == null ? "" : String(getFormulaDecimalPlaces(text));
    if (fpWrap) fpWrap.checked = (tc.whiteSpace || "pre-wrap") !== "nowrap";
    if (fpScroll) fpScroll.checked = panelShape.dataset.scrollEnabled === "1";
    setAlignButtons(text.dataset.halign || "left", text.dataset.valign || "top");
    syncTextPaddingControlsFromText(text);
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
    fpGradientWrap.classList.toggle("hidden", !["shape", "desktop"].includes(getSelectionMode()));
  }
}

function adjustShapeTextFontSizesBy(delta) {
  const step = Number(delta) || 0;
  if (!step) return false;
  if (selectedConnector) {
    const conn = connectors.find((item) => item.id === selectedConnector);
    if (!conn || !String(conn.labelText || "").length) return false;
    const labelStyle = getConnectorLabelStyle(conn);
    labelStyle.fontSize = clampFontSizeStep(labelStyle.fontSize + step, labelStyle.fontSize);
    conn.labelStyle = labelStyle;
    renderConnectors();
    syncFormatPanel();
    saveLayout();
    return true;
  }
  const shapes = !selectedShape && (multiSelectedShapeIds.size || selectedGroupId)
    ? getFormatPanelTargets()
    : (selectedShape ? [selectedShape] : []);
  if (!shapes.length) return false;
  const groupMode = shapes.length > 1;
  const bpProcessIds = new Set();
  let changed = false;

  shapes.forEach((node) => {
    if (!node) return;
    if (node.dataset.shapeType === "shape-table" && node.__tableApi?.adjustAllFontSizesBy) {
      changed = node.__tableApi.adjustAllFontSizesBy(step) || changed;
      return;
    }
    if (node.dataset.shapeType === "shape-bitrix-card" && window.BitrixChart?.adjustCardFontSize) {
      changed = window.BitrixChart.adjustCardFontSize(node, step, { groupMode }) || changed;
      return;
    }
    if (node.dataset.shapeType === "shape-chart" && window.BitrixChart?.adjustChartFontSize) {
      changed = window.BitrixChart.adjustChartFontSize(node, step) || changed;
      return;
    }
    if (isBpProcessTask(node)) {
      const typography = getBpTaskTypography(node);
      applyBpTaskTypography(node, {
        title: clampFontSizeStep(typography.title + step, typography.title),
        label: clampFontSizeStep(typography.label + step, typography.label),
        field: clampFontSizeStep(typography.field + step, typography.field)
      });
      bpProcessIds.add(node.dataset.bpProcessId);
      changed = true;
      return;
    }
    if (isBpProcessAutomation(node)) {
      const typography = getBpAutomationTypography(node);
      applyBpAutomationTypography(node, {
        title: clampFontSizeStep(typography.title + step, typography.title),
        label: clampFontSizeStep(typography.label + step, typography.label),
        field: clampFontSizeStep(typography.field + step, typography.field)
      });
      bpProcessIds.add(node.dataset.bpProcessId);
      changed = true;
      return;
    }
    const text = node.querySelector(".shape-text");
    if (!text) return;
    adjustShapeTextContentFontSizesBy(text, step);
    layoutConnectorPoints(node);
    changed = true;
  });

  bpProcessIds.forEach((processId) => {
    if (processId) {
      layoutAllBpTasksInProcess(processId);
      layoutAllBpAutomationsInProcess(processId);
    }
  });
  if (!bpProcessIds.size) {
    renderConnectors();
    updateDesktopExtent();
  }
  if (!changed) return false;
  syncFormatPanel();
  saveLayout();
  return true;
}

function applyFormat(opts = {}) {
  const formatSource = opts.source || null;
  if (getSelectionMode() === "desktop") {
    applyDesktopStyle({
      fillEnabled: fpFillEnabled ? fpFillEnabled.checked : desktopStyleState.fillEnabled,
      gradientEnabled: fpGradientEnabled ? fpGradientEnabled.checked : desktopStyleState.gradientEnabled,
      fill: fpFill ? fpFill.value : desktopStyleState.fill,
      fill2: fpFill2 ? fpFill2.value : desktopStyleState.fill2,
      fillDirection: fpFillType ? fpFillType.value : desktopStyleState.fillDirection,
      borderEnabled: fpBorderEnabled ? fpBorderEnabled.checked : desktopStyleState.borderEnabled,
      border: fpBorder ? fpBorder.value : desktopStyleState.border,
      gridSize: fpBorderWidth ? Number(fpBorderWidth.value) || desktopStyleState.gridSize : desktopStyleState.gridSize,
      opacity: fpOpacity ? Number(fpOpacity.value) || desktopStyleState.opacity : desktopStyleState.opacity
    });
    updateFormatPanelVisuals();
    if (!opts.preview) saveLayout({ recordHistory: false });
    return;
  }
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    c.color = fpBorder.value;
    c.width = Math.max(1, Number(fpBorderWidth.value) || 2);
    c.lineStyle = fpLineStyle ? fpLineStyle.value : "solid";
    c.routeStyle = getConnectorRouteButtonsValue(fpConnRouteStyle);
    if (!isOrthogonalRouteStyle(c.routeStyle)) c.routePoints = [];
    c.opacity = normalizeOpacityValue(Number(fpOpacity ? fpOpacity.value : 100) / 100);
    c.shadow = Math.max(0, Number(fpShadow ? fpShadow.value : 0) || 0);
    c.gapStart = Math.max(0, Number(fpConnGapStart ? fpConnGapStart.value : 30) || 0);
    c.gapEnd = Math.max(0, Number(fpConnGapEnd ? fpConnGapEnd.value : 30) || 0);
    c.startArrowShape = getArrowShapeButtonsValue(fpArrowStartShape);
    c.endArrowShape = getArrowShapeButtonsValue(fpArrowEndShape);
    applyConnectorLabelStyleFromPanel(c);
    renderConnectors();
    if (!opts.preview) {
      syncFormatPanel();
      saveLayout();
    }
    return;
  }
  if (selectedWindow) {
    if (!opts.preview) saveLayout();
    return;
  }
  if (!selectedShape && (multiSelectedShapeIds.size || selectedGroupId)) {
    const shapes = getFormatPanelTargets();
    if (!shapes.length) return;
    const steppedBpFill = shouldApplyBpStagesSteppedGradient(shapes);
    if (steppedBpFill) {
      applyBpStagesSteppedFill(steppedBpFill.stages, steppedBpFill.fill1, steppedBpFill.fill2);
    }
    shapes.forEach((node) => {
      applyFormatPanelToShape(node, { ...opts, steppedBpFill, groupMode: true });
    });
    if (formatSource && isTextPaddingFormatControl(formatSource)) {
      const firstText = shapes.map((node) => node.querySelector(".shape-text")).find(Boolean);
      if (firstText) syncTextPaddingControlsFromText(firstText);
    }
    renderConnectors();
    updateDesktopExtent();
    if (!opts.preview) {
      syncFormatPanel();
      saveLayout();
    }
    return;
  }
  if (!selectedShape) return;
  if (selectedShape.dataset.shapeType === "shape-table") {
    if (selectedShape.__tableApi && selectedShape.__tableApi.applyFromFormatPanel) {
      const changed = selectedShape.__tableApi.applyFromFormatPanel();
      if (changed) {
        if (!opts.preview) {
          syncFormatPanel();
          saveLayout();
        }
      }
    }
    return;
  }
  if (selectedShape.dataset.shapeType === "shape-bitrix-card") {
    const applyFn = selectedShape.__cardApi?.applyFromFormatPanel
      || (window.BitrixChart && window.BitrixChart.applyCardFormatPanel
        ? (node, opts) => window.BitrixChart.applyCardFormatPanel(node, opts)
        : null);
    if (applyFn && applyFn(selectedShape, opts)) {
      if (!opts.preview) {
        syncFormatPanel();
        saveLayout();
      }
    }
    return;
  }
  if (selectedShape.dataset.shapeType === "shape-chart") {
    if (window.BitrixChart && window.BitrixChart.applyChartFormatPanel) {
      if (window.BitrixChart.applyChartFormatPanel(selectedShape, opts)) {
        if (!opts.preview) {
          syncFormatPanel();
          saveLayout();
        }
      }
    }
    return;
  }
  if (selectedShape.dataset.shapeType === "shape-bitrix-date-filter") {
    if (window.BitrixChart && window.BitrixChart.applyFilterFormatPanel) {
      if (window.BitrixChart.applyFilterFormatPanel(selectedShape, opts)) {
        if (!opts.preview) {
          syncFormatPanel();
          saveLayout();
        }
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
  const borderStyle = normalizeBorderLineStyle(fpLineStyle ? fpLineStyle.value : (selectedShape.dataset.borderStyle || "solid"));
  const borderColor = setShapeBorderColor(selectedShape, fpBorder.value);
  selectedShape.style.border = lineEnabled ? `${Math.max(1, borderWidth)}px solid ${borderColor}` : "0px solid transparent";
  selectedShape.dataset.borderWidth = String(borderWidth);
  selectedShape.dataset.borderEnabled = lineEnabled ? "1" : "0";
  selectedShape.dataset.borderStyle = borderStyle;
  selectedShape.style.borderWidth = lineEnabled ? `${Math.max(1, borderWidth)}px` : "0px";
  selectedShape.style.borderStyle = borderStyle;
  if (selectedShape.dataset.shapeType === "shape-rect") selectedShape.dataset.cornerRadius = String(Number(fpRadius.value) || 0);
  selectedShape.style.borderRadius = `${fpRadius.value}px`;
  selectedShape.style.opacity = `${Number(fpOpacity.value) / 100}`;
  applyNodeShadow(selectedShape, fpShadow ? fpShadow.value : 0);
  if (selectedShape.dataset.shapeType === "shape-line") {
    selectedShape.style.backgroundImage = "none";
    selectedShape.style.background = lineEnabled ? fpBorder.value : "transparent";
  }
  renderShapeVisual(selectedShape);
  syncShapeVisualStyle(selectedShape);
  if (isBpProcessStage(selectedShape)) {
    onChevronShapeResized(selectedShape);
  } else if (isBpProcessTask(selectedShape)) {
    onBpTaskResized(selectedShape);
  } else if (isBpProcessAutomation(selectedShape)) {
    onBpAutomationResized(selectedShape);
  }
  selectedShape.dataset.rotate = String(Number(fpAngle.value) || 0);
  applyTransformState(selectedShape);
  if (selectedShape.dataset.shapeType === "shape-line") {
    selectedShape.style.height = `${Math.max(1, Number(fpBorderWidth.value) || 1)}px`;
    selectedShape.style.background = lineEnabled ? fpBorder.value : "transparent";
  }
  if (text) {
    const skipText = formatSource && !isAnyTextFormatControl(formatSource) && getShapeTextRangeSelectionForFormat(text);
    if (!skipText) {
      const inlineControl = !formatSource || isInlineTextFormatControl(formatSource);
      const blockTextControl = !formatSource || isBlockTextFormatControl(formatSource);
      let appliedPartial = false;
      if (inlineControl) {
        appliedPartial = getShapeTextRangeSelectionForFormat(text) && applyShapeTextInlineFormat(text, buildShapeTextFormatOptionsFromPanel(formatSource));
        if (appliedPartial) text.focus();
        if (!appliedPartial) {
          delete text.dataset.textHtml;
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
          renderShapeText(text);
        }
      }
      if (blockTextControl || !formatSource) {
        text.dataset.numberGrouping = fpNumberGrouping && fpNumberGrouping.checked ? "1" : "0";
        if (fpNumberFormat) setNumberFormat(text, getNumberFormatButtonsValue(fpNumberFormat));
        setFormulaDecimalPlaces(text, fpFormulaDecimals ? fpFormulaDecimals.value : null);
        if (fpWrap) text.style.whiteSpace = fpWrap.checked ? "pre-wrap" : "nowrap";
        if (fpScroll) {
          selectedShape.dataset.scrollEnabled = fpScroll.checked ? "1" : "0";
          applyShapeScrollState(selectedShape);
        }
      }
      if (!formatSource || isTextPaddingFormatControl(formatSource)) {
        applyShapeTextPaddingValues(text, readTextPaddingFromFormatPanel(formatSource));
        syncTextPaddingControlsFromText(text);
      }
    }
  }
  layoutConnectorPoints(selectedShape);
  renderConnectors();
  updateDesktopExtent();
  if (!opts.preview) saveLayout();
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
  if (!canEditCurrentDocument()) return;
  const raw = (modalSheetUrl.value || "").trim();
  if (!raw) { showHint("Вставь URL таблицы перед добавлением.", "error"); return; }
  if (/docs\.google\.com\/spreadsheets\/.+\/edit/i.test(raw)) showHint("Google edit-ссылка может не встраиваться полностью. Для полного редактирования используй \"Открыть\".", "warning");
  else showHint("Если встройка недоступна, открой таблицу кнопкой \"Открыть\".", "warning");
  createSheetWindow(raw);
  closeAddModal();
}

addWindowBtn.addEventListener("click", () => {
  closeAllMenus();
  openAddModal();
});
modalCancelBtn.addEventListener("click", closeAddModal);
modalCreateBtn.addEventListener("click", submitAddWindow);
modal.addEventListener("click", (e) => { if (e.target === modal) closeAddModal(); });
modalSheetUrl.addEventListener("keydown", (e) => { if (e.key === "Enter") submitAddWindow(); if (e.key === "Escape") closeAddModal(); });

safeOn(profileBtn, "click", (e) => {
  e.stopPropagation();
  closeAllMenus();
  openProfileModal();
});
safeOn(profileTabAccountBtn, "click", () => setProfileTab("account"));
safeOn(profileTabIntegrationsBtn, "click", () => setProfileTab("integrations"));
safeOn(profileChangePasswordBtn, "click", () => toggleProfilePasswordForm());
safeOn(profileModalCloseBtn, "click", closeProfileModal);
safeOn(profileModal, "click", (e) => {
  if (e.target === profileModal) closeProfileModal();
});
safeOn(profileSaveBtn, "click", saveProfileSettings);
safeOn(mcpCreateTokenBtn, "click", (e) => {
  e.preventDefault();
  createMcpToken();
});
safeOn(mcpCopyTokenBtn, "click", async (e) => {
  e.preventDefault();
  try {
    await copyTextToClipboard(mcpCreatedToken || (mcpTokenOnceInput && mcpTokenOnceInput.value) || "");
    setMcpStatus("Токен скопирован.");
  } catch (err) {
    console.error(err);
    setMcpStatus("Не удалось скопировать токен.", true);
  }
});
safeOn(mcpCopyConfigBtn, "click", async (e) => {
  e.preventDefault();
  try {
    if (!mcpConfigCache) await loadMcpProfileUi();
    await copyTextToClipboard(buildMcpConfigText(mcpCreatedToken || undefined));
    setMcpStatus(mcpCreatedToken ? "Конфиг со токеном скопирован." : "Конфиг скопирован. Вставьте токен вместо плейсхолдера.");
  } catch (err) {
    console.error(err);
    setMcpStatus("Не удалось скопировать конфиг.", true);
  }
});
safeOn(profileNameInput, "keydown", (e) => {
  if (e.key === "Enter") saveProfileSettings();
  if (e.key === "Escape") closeProfileModal();
});
safeOn(fileMenuBtn, "click", (e) => {
  e.stopPropagation();
  toggleFileMenu();
});
safeOn(fileActionsBtn, "click", (e) => {
  e.stopPropagation();
  openNestedMenu("file");
});
safeOn(fileActionsBtn && fileActionsBtn.closest(".app-menu-nested"), "mouseenter", () => openNestedMenu("file"));
safeOn(fileActionsBtn && fileActionsBtn.closest(".app-menu-nested"), "focusin", () => openNestedMenu("file"));
safeOn(fileCreateBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await handleFileCreate();
});
safeOn(fileOpenBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await handleFileOpen();
});
safeOn(fileShareBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await openShareModal();
});
safeOn(fileCommentsBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await openCommentsModal();
});
safeOn(fileDeleteBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await handleFileDelete();
});
safeOn(fileCopyBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await handleFileCopy();
});
safeOn(fileCopyLinkBtn, "click", async (e) => {
  e.stopPropagation();
  closeAllMenus();
  await copyDocumentShareUrl();
});
safeOn(fileAutosaveToggle, "change", () => {
  setAutosaveEnabled(!!fileAutosaveToggle.checked);
  showHint(autoSaveEnabled ? "Автоматическое сохранение включено." : "Автоматическое сохранение выключено.", "warning", 1800);
});
safeOn(fileModalOpenBtn, "click", () => { void openSelectedFileBrowserDocument(); });
safeOn(fileModalCloseBtn, "click", closeFileModal);
safeOn(fileBrowserNewFolderBtn, "click", async () => {
  let name = "Новая папка";
  try {
    const prompted = window.prompt("Название папки:", "Новая папка");
    if (prompted === null) return;
    if (String(prompted).trim()) name = String(prompted).trim();
  } catch {}
  try {
    await createFolderRecord(name);
    renderFileBrowser();
    showHint("Папка создана.", "warning", 1600);
  } catch (err) {
    console.error(err);
    showHint("Не удалось создать папку.", "error", 2500);
  }
});
safeOn(fileModal, "click", (e) => {
  if (e.target === fileModal) closeFileModal();
});
safeOn(authLoginTab, "click", () => setAuthModalMode("login"));
safeOn(authRegisterTab, "click", () => setAuthModalMode("register"));
safeOn(authModalCloseBtn, "click", closeAuthModal);
safeOn(authModal, "click", (e) => {
  if (e.target === authModal) closeAuthModal();
});
safeOn(authSubmitBtn, "click", submitAuthForm);
safeOn(authEmailInput, "keydown", (e) => {
  if (e.key === "Enter") submitAuthForm();
  if (e.key === "Escape") closeAuthModal();
});
safeOn(authEmailInput, "input", clearAuthError);
safeOn(authPasswordInput, "keydown", (e) => {
  if (e.key === "Enter") submitAuthForm();
  if (e.key === "Escape") closeAuthModal();
});
safeOn(authPasswordInput, "input", clearAuthError);
safeOn(authNameInput, "keydown", (e) => {
  if (e.key === "Enter") submitAuthForm();
  if (e.key === "Escape") closeAuthModal();
});
safeOn(authNameInput, "input", clearAuthError);
safeOn(shareModalCloseBtn, "click", closeShareModal);
safeOn(shareModalDoneBtn, "click", closeShareModal);
safeOn(shareModal, "click", (e) => {
  if (e.target === shareModal) closeShareModal();
});
safeOn(shareGeneralSelect, "change", () => {
  void setSharePublicLinkEnabled(shareGeneralSelect && shareGeneralSelect.value === "link");
});
safeOn(sharePublicCopyBtn, "click", copySharePublicLink);
const shareSearchWrap = shareEmailInput ? shareEmailInput.closest(".share-search-wrap") : null;
let shareSuggestionsBlurTimer = 0;

function scheduleHideShareSuggestions() {
  if (shareSuggestionsBlurTimer) window.clearTimeout(shareSuggestionsBlurTimer);
  shareSuggestionsBlurTimer = window.setTimeout(() => {
    shareSuggestionsBlurTimer = 0;
    if (document.activeElement === shareEmailInput) return;
    if (shareSuggestions && shareSuggestions.contains(document.activeElement)) return;
    if (shareSearchWrap && shareSearchWrap.matches(":hover")) return;
    hideShareSuggestions();
  }, 160);
}

function cancelHideShareSuggestions() {
  if (!shareSuggestionsBlurTimer) return;
  window.clearTimeout(shareSuggestionsBlurTimer);
  shareSuggestionsBlurTimer = 0;
}

safeOn(shareEmailInput, "input", () => {
  syncShareSearchFilled();
  renderShareSuggestions({ forceOpen: true });
});
safeOn(shareEmailInput, "focus", () => {
  cancelHideShareSuggestions();
  syncShareSearchFilled();
  renderShareSuggestions({ forceOpen: true });
});
safeOn(shareEmailInput, "blur", (e) => {
  const related = e && e.relatedTarget;
  if (related && shareSearchWrap && shareSearchWrap.contains(related)) return;
  scheduleHideShareSuggestions();
});
if (shareSearchWrap) {
  shareSearchWrap.addEventListener("focusout", (e) => {
    const next = e.relatedTarget;
    if (next && shareSearchWrap.contains(next)) return;
    scheduleHideShareSuggestions();
  });
  shareSearchWrap.addEventListener("pointerenter", () => {
    cancelHideShareSuggestions();
  });
  // Intentionally no pointerleave hide: absolute suggestions can leave a dead
  // gap outside the wrap hit-box, and closing there makes the list vanish mid-move.
}
safeOn(shareModal, "pointerdown", (e) => {
  if (!shareSearchWrap || !shareSuggestions) return;
  if (shareSuggestions.classList.contains("hidden")) return;
  if (shareSearchWrap.contains(e.target)) return;
  hideShareSuggestions();
  if (shareEmailInput && document.activeElement === shareEmailInput) shareEmailInput.blur();
});
safeOn(commentsModalCloseBtn, "click", closeCommentsModal);
safeOn(commentsModal, "click", (e) => {
  if (e.target === commentsModal) closeCommentsModal();
});
safeOn(commentsAddBtn, "click", addDocumentComment);
safeOn(commentsInput, "keydown", (e) => {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addDocumentComment();
  if (e.key === "Escape") closeCommentsModal();
});
safeOn(shareEmailInput, "keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const filter = String(shareEmailInput ? shareEmailInput.value : "").trim();
    const candidates = getShareSuggestionCandidates(filter);
    if (candidates.length === 1 || (candidates.length && !looksLikeShareEmail(filter))) {
      void addShareAccess(candidates[0].email, candidates[0].name);
      return;
    }
    void addShareAccess();
  }
  if (e.key === "Escape") {
    if (shareSuggestions && !shareSuggestions.classList.contains("hidden")) {
      hideShareSuggestions();
      return;
    }
    closeShareModal();
  }
});

desktop.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  if (window.DrawTools?.isDrawToolEngaged?.()) return;
  if (isDesktopBackgroundPointerTarget(e.target) && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
    clearSelection();
  }
  if (shapePlaceTool && canStartMarqueeSelectionFromTarget(e.target)) {
    if (startShapePlaceDraw(e)) return;
  }
  if (frameToolActive && canStartMarqueeSelectionFromTarget(e.target)) {
    if (startFrameDraw(e)) return;
  }
  if (!canStartMarqueeSelectionFromTarget(e.target, e.shiftKey)) return;
  startMarqueeSelection(e, e.shiftKey);
});
if (formatPanel) {
  formatPanel.addEventListener("pointerdown", (e) => {
    if (!selectedShape || selectedShape.dataset.shapeType !== "shape-bitrix-card") return;
    if (e.target.closest(".bitrix-kpi-value, .bitrix-kpi-label")) return;
    if (window.BitrixChart?.clearBitrixCardTextPart) {
      window.BitrixChart.clearBitrixCardTextPart(selectedShape, { sync: true });
    }
  });
}
document.addEventListener("click", (e) => {
  if (!fileMenuDropdown) return;
  if (e.target.closest("#fileMenuBtn") || e.target.closest("#fileMenuDropdown")) return;
  closeAllMenus();
});
document.addEventListener("pointermove", (e) => {
  updateLastDesktopPointer(e.clientX, e.clientY);
}, { passive: true });
document.addEventListener("pointerdown", (e) => {
  updateLastDesktopPointer(e.clientX, e.clientY);
  maybeCollapseAttachedNotesFromPointer(e);
}, true);
document.addEventListener("pointerup", finalizePendingGroupMemberSelect);
document.addEventListener("pointercancel", finalizePendingGroupMemberSelect);
document.addEventListener("keydown", (e) => {
  syncModifierKeysFromEvent(e);
}, true);
document.addEventListener("keyup", (e) => {
  syncModifierKeysFromEvent(e);
}, true);
document.addEventListener("pointerdown", (e) => {
  syncModifierKeysFromEvent(e);
}, true);
document.addEventListener("pointerup", (e) => {
  syncModifierKeysFromEvent(e);
}, true);
window.addEventListener("blur", () => {
  if (!ctrlModifierActive && !altModifierActive) return;
  ctrlModifierActive = false;
  altModifierActive = false;
  syncConnectorModifierChrome();
});
window.addEventListener("beforeunload", () => {
  flushPendingLayoutSave();
});
document.addEventListener("pointermove", (e) => {
  if (window.DrawTools?.handlePointerMove?.(e)) return;
  if (shapePlaceDraw && e.pointerId === shapePlaceDraw.pointerId) {
    const pt = getDesktopPoint(e.clientX, e.clientY);
    shapePlaceDraw.x2 = pt.x;
    shapePlaceDraw.y2 = pt.y;
    updateShapePlacePreview();
    return;
  }
  if (frameDrawSelection && e.pointerId === frameDrawSelection.pointerId) {
    const pt = getDesktopPoint(e.clientX, e.clientY);
    frameDrawSelection.x2 = pt.x;
    frameDrawSelection.y2 = pt.y;
    updateFrameDrawPreview();
    return;
  }
  if (marqueeSelection && e.pointerId === marqueeSelection.pointerId) {
    const pt = getDesktopPoint(e.clientX, e.clientY);
    marqueeSelection.x2 = pt.x;
    marqueeSelection.y2 = pt.y;
    marqueeSelection.touchMode = marqueeSelection.touchMode || !!e.shiftKey;
    updateMarqueeSelectionBox();
  }
});
document.addEventListener("pointerup", (e) => {
  if (window.DrawTools?.handlePointerUp?.(e)) return;
  if (shapePlaceDraw && e.pointerId === shapePlaceDraw.pointerId) {
    try { desktop.releasePointerCapture(e.pointerId); } catch {}
    finishShapePlaceDraw();
    return;
  }
  if (frameDrawSelection && e.pointerId === frameDrawSelection.pointerId) {
    try { desktop.releasePointerCapture(e.pointerId); } catch {}
    finishFrameDraw();
    return;
  }
  if (marqueeSelection && e.pointerId === marqueeSelection.pointerId) {
    marqueeSelection.touchMode = marqueeSelection.touchMode || !!e.shiftKey;
    try { desktop.releasePointerCapture(e.pointerId); } catch {}
    finishMarqueeSelection();
  }
});

safeOn(formatToggle, "change", () => {
  if (formatToggle.checked) {
    ensureFormatPanelEnabledCollapsed();
    syncFormatPanel();
  } else if (formatPanel) {
    formatPanel.classList.add("hidden");
    savePanelState();
  }
});
safeOn(formatToggleLabel, "click", (e) => e.stopPropagation());
safeOn(objectsToggleLabel, "click", (e) => e.stopPropagation());
safeOn(themeDarkToggle && themeDarkToggle.closest("label"), "click", (e) => e.stopPropagation());
safeOn(objectsToggle, "change", () => {
  setObjectsToolbarPreferred(!!objectsToggle.checked);
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
bindRangeAndNumber(fpConnGapStartNum, fpConnGapStart);
bindRangeAndNumber(fpConnGapEndNum, fpConnGapEnd);
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
  fpBold, fpItalic, fpStrike, fpUnderline, fpWrap, fpScroll, fpTableFilter, fpNumberGrouping, fpFormulaDecimals, fpAutoSize, fpCellBorders, fpOpacity, fpOpacityNum, fpShadow, fpShadowNum, fpX, fpY, fpW, fpH, fpR, fpAngle, fpLineStyle, fpConnRouteStyle, fpConnGapStart, fpConnGapStartNum, fpConnGapEnd, fpConnGapEndNum, fpArrowStartShape, fpArrowEndShape
  , fpTableColWidth, fpTableRowHeight
].filter(Boolean).forEach((ctrl) => {
  ctrl.addEventListener("input", () => clearControlMixedState(ctrl));
  ctrl.addEventListener("change", () => clearControlMixedState(ctrl));
  ctrl.addEventListener("input", () => applyFormat({ source: ctrl, preview: true }));
  ctrl.addEventListener("change", () => applyFormat({ source: ctrl }));
});
bindFormatPanelShapeTextSelectionGuard();
[fpFill, fpFill2, fpFillType, fpBorder].filter(Boolean).forEach((ctrl) => {
  ctrl.addEventListener("input", updateFormatPanelVisuals);
  ctrl.addEventListener("change", updateFormatPanelVisuals);
});
safeOn(fpFontDecrease, "click", () => adjustShapeTextFontSizesBy(-1));
safeOn(fpFontIncrease, "click", () => adjustShapeTextFontSizesBy(1));
updateFormatPanelVisuals();
function bindArrowShapePicker(container) {
  if (!container || container.matches("select")) return;
  const trigger = container.querySelector(".fp-arrow-select-trigger");
  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll(".fp-arrow-select.is-open").forEach((el) => {
        if (el !== container) el.classList.remove("is-open");
      });
      container.classList.toggle("is-open");
    });
  }
  container.querySelectorAll(".fp-arrow-option").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setArrowShapeButtons(container, btn.dataset.shape || "classic");
      container.classList.remove("is-open");
      applyFormat();
    });
  });
  setArrowShapeButtons(container, getArrowShapeButtonsValue(container));
}
bindArrowShapePicker(fpArrowStartShape);
bindArrowShapePicker(fpArrowEndShape);
function bindConnectorRoutePicker(container) {
  if (!container) return;
  const trigger = container.querySelector(".fp-arrow-select-trigger");
  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll(".fp-arrow-select.is-open").forEach((el) => {
        if (el !== container) el.classList.remove("is-open");
      });
      container.classList.toggle("is-open");
    });
  }
  container.querySelectorAll(".fp-conn-route-option").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setConnectorRouteButtons(container, btn.dataset.route || "straight");
      container.classList.remove("is-open");
      applyFormat();
    });
  });
  setConnectorRouteButtons(container, getConnectorRouteButtonsValue(container));
}
bindConnectorRoutePicker(fpConnRouteStyle);
document.addEventListener("click", (event) => {
  if (event.target.closest(".fp-arrow-select")) return;
  document.querySelectorAll(".fp-arrow-select.is-open").forEach((el) => el.classList.remove("is-open"));
});
safeOn(fpFront, "click", () => {
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    c.zIndex = ++zCounter;
    renderConnectors();
    saveLayout();
    syncFormatPanel();
    return;
  }
  const targets = getZOrderTargets();
  if (!targets.length) return;
  targets.forEach((node) => raiseShapeAboveConnectorsZ(node));
  renderConnectors();
  saveLayout();
  syncFormatPanel();
});
safeOn(fpBack, "click", () => {
  if (selectedConnector) {
    const c = connectors.find((it) => it.id === selectedConnector);
    if (!c) return;
    c.zIndex = 1;
    renderConnectors();
    saveLayout();
    syncFormatPanel();
    return;
  }
  const targets = getZOrderTargets();
  if (!targets.length) return;
  targets.forEach((node) => {
    clearShapeAboveConnectors(node);
    node.style.zIndex = "1";
  });
  renderConnectors();
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
safeOn(fpColLeft, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.moveSelectedColsBy) return;
  if (selectedShape.__tableApi.moveSelectedColsBy(-1)) saveLayout();
});
safeOn(fpColRight, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.moveSelectedColsBy) return;
  if (selectedShape.__tableApi.moveSelectedColsBy(1)) saveLayout();
});
safeOn(fpAddRow, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.addRowAfterSelection()) saveLayout();
});
safeOn(fpDelRow, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi) return;
  if (selectedShape.__tableApi.deleteSelectedRows()) saveLayout();
});
safeOn(fpRowUp, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.moveSelectedRowsBy) return;
  if (selectedShape.__tableApi.moveSelectedRowsBy(-1)) saveLayout();
});
safeOn(fpRowDown, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.moveSelectedRowsBy) return;
  if (selectedShape.__tableApi.moveSelectedRowsBy(1)) saveLayout();
});
safeOn(fpMergeCells, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.mergeSelectedCells) return;
  if (selectedShape.__tableApi.mergeSelectedCells()) saveLayout();
});
safeOn(fpUnmergeCells, "click", () => {
  if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table" || !selectedShape.__tableApi?.unmergeSelectedCells) return;
  if (selectedShape.__tableApi.unmergeSelectedCells()) saveLayout();
});
safeOn(fpRotateRight, "click", () => {
  if (!rotateSelection(90)) showFeatureHint("Поворот");
  syncFormatPanel();
});
safeOn(fpCollapseBtn, "pointerdown", (e) => {
  e.stopPropagation();
});
safeOn(fpCollapseBtn, "click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleFormatPanelCollapsed();
});
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
safeOn(fpOrderAlignLeft, "click", () => {
  if (!alignObjectSelection("left")) showFeatureHint("Выравнивание");
});
safeOn(fpOrderAlignCenter, "click", () => {
  if (!alignObjectSelection("center")) showFeatureHint("Выравнивание");
});
safeOn(fpOrderAlignRight, "click", () => {
  if (!alignObjectSelection("right")) showFeatureHint("Выравнивание");
});
safeOn(fpOrderAlignTop, "click", () => {
  if (!alignObjectSelection("top")) showFeatureHint("Выравнивание");
});
safeOn(fpOrderAlignMiddle, "click", () => {
  if (!alignObjectSelection("middle")) showFeatureHint("Выравнивание");
});
safeOn(fpOrderAlignBottom, "click", () => {
  if (!alignObjectSelection("bottom")) showFeatureHint("Выравнивание");
});
safeOn(fpDistributeH, "click", () => {
  if (!distributeObjectSelection("horizontal")) showFeatureHint("Горизонтальное распределение");
});
safeOn(fpDistributeV, "click", () => {
  if (!distributeObjectSelection("vertical")) showFeatureHint("Вертикальное распределение");
});
safeOn(fpGroup, "click", () => showFeatureHint("Группировка"));
safeOn(fpLock, "click", () => showFeatureHint("Блокировка"));
safeOn(fpCopyStyle, "click", () => {
  if (copyCurrentStyle()) showHint("Стиль скопирован и будет применен к новым объектам.", "warning", 2200);
  else showFeatureHint("Копирование стиля");
});
safeOn(fpPasteStyle, "click", () => {
  if (pasteCurrentStyle()) showHint("Стиль применен к выделению.", "warning", 2200);
  else showFeatureHint("Вставка стиля");
});
safeOn(fpDefaultStyle, "click", () => {
  if (setCurrentStyleAsDefault()) showHint("Стиль сохранен как стиль по умолчанию.", "warning", 2200);
  else showFeatureHint("Стиль по умолчанию");
});
safeOn(fpResetDefaultStyle, "click", () => {
  const bpIds = collectBpProcessIdsFromNodes(getStyleOperationTargets());
  if (resetCurrentStyleToDefault()) {
    showHint(
      bpIds.length ? "Стиль бизнес-процесса восстановлен." : "Стиль сброшен к заводскому значению.",
      "warning",
      2200
    );
  } else showHint("Стиль по умолчанию для этого типа не задан. Выделите объект и нажмите «Установить как стиль по умолчанию».", "warning", 2800);
});
safeOn(tabStyle, "click", () => openFormatTab("style"));
safeOn(tabText, "click", () => openFormatTab("text"));
safeOn(tabOrder, "click", () => openFormatTab("order"));
safeOn(fpClose, "click", () => {
  formatPanel.classList.add("hidden");
  if (formatToggle) formatToggle.checked = false;
});
safeOn(fpCancelBtn, "click", () => {
  formatPanel.classList.add("hidden");
  if (formatToggle) formatToggle.checked = false;
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
    c.opacity = 1;
    c.shadow = 0;
    c.startArrowShape = "line";
    c.endArrowShape = "classic";
    c.routeStyle = "straight";
    c.routePoints = [];
    c.gapStart = 30;
    c.gapEnd = 30;
    delete c.labelStyle;
    delete c.labelText;
    delete c.labelOffset;
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
      text.dataset.numberGrouping = "1";
      setNumberFormat(text, NUMBER_FORMAT_NUMBER);
      setFormulaDecimalPlaces(text, null);
      renderShapeText(text);
    }
    renderConnectors();
    saveLayout();
    syncFormatPanel();
  }
});

function readUiHorizontalAlign() {
  if (fpAlignCenter?.classList.contains("active")) return "center";
  if (fpAlignRight?.classList.contains("active")) return "right";
  return "left";
}

function readUiVerticalAlign() {
  if (fpVMiddle?.classList.contains("active")) return "middle";
  if (fpVBottom?.classList.contains("active")) return "bottom";
  return "top";
}

function applyHorizontalAlignForCurrentSelection(h) {
  const nextH = h || "left";
  // Capture V from the UI BEFORE changing any buttons — H click must not touch V.
  const keepVFromUi = readUiVerticalAlign();
  if (selectedConnector) {
    const conn = connectors.find((item) => item.id === selectedConnector);
    if (!conn) return;
    const labelStyle = getConnectorLabelStyle(conn);
    conn.labelStyle = { ...labelStyle, hAlign: nextH, vAlign: labelStyle.vAlign || keepVFromUi };
    setHorizontalAlignButtons(nextH);
    renderConnectors();
    saveLayout();
    return;
  }
  const shapes = getFormatPanelTargets();
  if (!shapes.length) return;
  setHorizontalAlignButtons(nextH);
  let changed = false;
  shapes.forEach((node) => {
    if (node.dataset.shapeType === "shape-bitrix-card" && window.BitrixChart?.applyCardTextAlign) {
      const text = node.querySelector(".shape-text");
      const keepV = text?.dataset?.valign || keepVFromUi;
      changed = window.BitrixChart.applyCardTextAlign(node, nextH, keepV, { groupMode: shapes.length > 1 }) || changed;
      return;
    }
    if (node.dataset.shapeType === "shape-table" && node.__tableApi?.applyFromFormatPanel) {
      changed = node.__tableApi.applyFromFormatPanel() || changed;
      return;
    }
    const text = node.querySelector(".shape-text");
    if (!text) return;
    // Keep shape V if set; otherwise keep whatever the V button currently shows.
    applyTextAlign(text, nextH, text.dataset.valign || keepVFromUi);
    changed = true;
  });
  if (changed) saveLayout();
}

function applyVerticalAlignForCurrentSelection(v) {
  const nextV = v || "top";
  // Capture H from the UI BEFORE changing any buttons — V click must not touch H.
  const keepHFromUi = readUiHorizontalAlign();
  if (selectedConnector) {
    const conn = connectors.find((item) => item.id === selectedConnector);
    if (!conn) return;
    const labelStyle = getConnectorLabelStyle(conn);
    conn.labelStyle = { ...labelStyle, hAlign: labelStyle.hAlign || keepHFromUi, vAlign: nextV };
    setVerticalAlignButtons(nextV);
    renderConnectors();
    saveLayout();
    return;
  }
  const shapes = getFormatPanelTargets();
  if (!shapes.length) return;
  setVerticalAlignButtons(nextV);
  let changed = false;
  shapes.forEach((node) => {
    if (node.dataset.shapeType === "shape-bitrix-card" && window.BitrixChart?.applyCardTextAlign) {
      const text = node.querySelector(".shape-text");
      const keepH = text?.dataset?.halign || keepHFromUi;
      changed = window.BitrixChart.applyCardTextAlign(node, keepH, nextV, { groupMode: shapes.length > 1 }) || changed;
      return;
    }
    if (node.dataset.shapeType === "shape-table" && node.__tableApi?.applyFromFormatPanel) {
      changed = node.__tableApi.applyFromFormatPanel() || changed;
      return;
    }
    const text = node.querySelector(".shape-text");
    if (!text) return;
    applyTextAlign(text, text.dataset.halign || keepHFromUi, nextV);
    changed = true;
  });
  if (changed) saveLayout();
}

function applyNumberFormatForCurrentSelection(numberFormat) {
  if (!fpNumberFormat) return;
  setNumberFormatButtons(fpNumberFormat, numberFormat);
  if (!getFormatPanelTargets().length) return;
  applyFormat();
  syncFormatPanel();
}
safeOn(fpAlignLeft, "click", () => applyHorizontalAlignForCurrentSelection("left"));
safeOn(fpAlignCenter, "click", () => applyHorizontalAlignForCurrentSelection("center"));
safeOn(fpAlignRight, "click", () => applyHorizontalAlignForCurrentSelection("right"));
safeOn(fpVTop, "click", () => applyVerticalAlignForCurrentSelection("top"));
safeOn(fpVMiddle, "click", () => applyVerticalAlignForCurrentSelection("middle"));
safeOn(fpVBottom, "click", () => applyVerticalAlignForCurrentSelection("bottom"));
fpNumberFormat?.querySelectorAll("[data-number-format]").forEach((btn) => {
  btn.addEventListener("click", () => applyNumberFormatForCurrentSelection(btn.dataset.numberFormat || NUMBER_FORMAT_NUMBER));
});

document.querySelectorAll(".swatch").forEach((sw) => {
  sw.addEventListener("click", () => {
    if (!getFormatPanelTargets().length) return;
    const fill = sw.getAttribute("data-fill");
    const border = sw.getAttribute("data-border");
    if (fill && fpFill) fpFill.value = fill;
    if (border && fpBorder) fpBorder.value = border;
    applyFormat();
  });
});


safeOn(shapeButton, "click", (e) => {
  e.stopPropagation();
  openNestedMenu("shape");
});
safeOn(shapeButton && shapeButton.closest(".app-menu-nested"), "mouseenter", () => openNestedMenu("shape"));
safeOn(shapeButton && shapeButton.closest(".app-menu-nested"), "focusin", () => openNestedMenu("shape"));

(shapeDropdown ? shapeDropdown.querySelectorAll("button[data-shape]") : []).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!canEditCurrentDocument()) return;
    const k = btn.dataset.shape;
    const shapeVariant = btn.dataset.shapeVariant || "rectangle";
    try {
      if (k === "rectangle") beginShapePlaceTool({ kind: "rect", variant: shapeVariant });
      else if (k === "line") beginShapePlaceTool({ kind: "line" });
      else if (k === "note") attachOrExpandNoteForSelection();
      else if (k === "table") createShapeTable();
      else if (k === "chart" && window.BitrixChart) window.BitrixChart.createShapeChart();
      else if (k === "bitrix-card" && window.BitrixChart) window.BitrixChart.createShapeCard();
      else if (k === "bitrix-date-filter" && window.BitrixChart) window.BitrixChart.createShapeDateFilter();
      else if (k === "bp-process") createSequentialBusinessProcess();
      else if (k === "frame") setFrameToolActive(true);
    } catch (err) {
      console.error("Failed to create shape:", k, err);
      showHint("Не удалось создать фигуру. Открой Console и пришли ошибку.", "error");
    }
    closeAllMenus();
  });
});

(shapeDropdown ? shapeDropdown.querySelectorAll("button[data-tool]") : []).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const tool = btn.dataset.tool;
    try {
      if (tool === "draw") {
        if (!canEditCurrentDocument()) return;
        if (window.DrawTools?.activateDrawToolFromMenu) window.DrawTools.activateDrawToolFromMenu();
        return;
      }
      if (tool === "laser") {
        if (window.DrawTools?.activateLaserToolFromMenu) window.DrawTools.activateLaserToolFromMenu();
        return;
      }
    } catch (err) {
      console.error("Failed to activate draw tool:", tool, err);
    }
    closeAllMenus();
  });
});

(shapeDropdown ? shapeDropdown.querySelectorAll("button[data-action]") : []).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!canEditCurrentDocument()) return;
    if (btn.dataset.action === "import-csv") {
      if (!csvImportInput) {
        showHint("Импорт CSV недоступен: не найден input для файла.", "error");
        return;
      }
      csvImportInput.value = "";
      csvImportInput.click();
      closeAllMenus();
      return;
    }
    if (btn.dataset.action === "import-image") {
      promptImageImportAtPoint(null);
      closeAllMenus();
    }
  });
});

safeOn(csvImportInput, "change", async () => {
  const file = csvImportInput && csvImportInput.files ? csvImportInput.files[0] : null;
  if (!file) return;
  try {
    const created = await importCsvAsTable(file);
    if (created) showHint(`Импортирован CSV: ${file.name}`, "warning", 1800);
  } catch (err) {
    console.error("Failed to import CSV:", err);
    showHint("Не удалось импортировать CSV. Проверь формат файла.", "error");
  } finally {
    if (csvImportInput) csvImportInput.value = "";
  }
});

safeOn(imageImportInput, "change", async () => {
  const file = imageImportInput && imageImportInput.files ? imageImportInput.files[0] : null;
  const point = pendingImageSpawnPoint;
  pendingImageSpawnPoint = null;
  if (!file) return;
  try {
    const node = await insertImageFromBlob(file, point);
    if (node) showHint(`Добавлена картинка: ${file.name}`, "warning", 1800);
  } catch (err) {
    console.error("Failed to import image:", err);
    showHint("Не удалось добавить картинку.", "error");
  } finally {
    if (imageImportInput) imageImportInput.value = "";
  }
});

document.addEventListener("click", (e) => {
  if (!shapeDropdown) return;
  if (e.target.closest("#shapeButton") || e.target.closest("#shapeDropdown")) return;
  toggleShapeMenu(false);
});
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".context-menu, .file-browser-menu-btn")) return;
  hideContextMenu();
});
document.addEventListener("click", (e) => {
  if (!objectsToolbar || e.target.closest("#objectsToolbar")) return;
  objectsToolbar.querySelectorAll(".context-menu-group.open").forEach((node) => node.classList.remove("open"));
});
document.addEventListener("mousedown", (e) => {
  if (e.target.closest && e.target.closest(".table-cell-conn-arrow") && (e.altKey || e.button === 2)) {
    suppressCellConnectorArrowBrowserMenu(e);
  }
}, true);
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".table-cell-conn-arrow") && (e.altKey || e.button === 2)) {
    suppressCellConnectorArrowBrowserMenu(e);
  }
}, true);
document.addEventListener("contextmenu", (e) => {
  if (shouldSuppressConnectorContextMenu(e)) {
    suppressCellConnectorArrowBrowserMenu(e);
  }
}, true);
document.addEventListener("contextmenu", (e) => {
  if (shouldSuppressConnectorContextMenu(e)) {
    suppressCellConnectorArrowBrowserMenu(e);
    return;
  }
  if (e.target.closest && (e.target.closest(".table-cell-conn-arrow") || e.target.closest(".table-cell-connector-guides"))) {
    suppressCellConnectorArrowBrowserMenu(e);
    return;
  }
  const shape = getContextTargetShape(e.target);
  if (!shape) {
    if (!e.target.closest || !e.target.closest("#desktop")) {
      hideContextMenu();
      return;
    }
    if (!canEditCurrentDocument()) return;
    e.preventDefault();
    const spawnPoint = getDesktopPoint(e.clientX, e.clientY);
    showContextMenu(e.clientX, e.clientY, getDesktopInsertMenuItems(spawnPoint), { variant: "toolbar" });
    return;
  }
  if (!canEditCurrentDocument()) return;
  e.preventDefault();
  if (selectedShape !== shape && !multiSelectedShapeIds.has(shape.dataset.shapeId) && getShapeGroupId(shape) !== selectedGroupId) {
    if (getShapeGroupId(shape) && !isBpProcessMember(shape)) selectGroup(getShapeGroupId(shape));
    else selectShape(shape);
  }
  const multiCount = getMultiSelectedShapes().length;
  const groupId = getShapeGroupId(shape);
  const frameMenuItems = [];
  if (isFrameShape(shape)) {
    const frameChildCount = getFrameChildren(shape.dataset.shapeId).length;
    frameMenuItems.push(
      {
        label: "Выбрать всё во фрейме",
        disabled: !frameChildCount,
        action: () => {
          const children = getFrameDescendants(shape.dataset.shapeId);
          clearSelection();
          children.forEach((node) => multiSelectedShapeIds.add(node.dataset.shapeId));
          syncMultiSelectionClasses();
          if (formatToggle.checked) {
            showFormatPanel();
            syncFormatPanel();
          }
        }
      },
      {
        label: "Убрать элементы из фрейма",
        disabled: !frameChildCount,
        action: () => {
          removeAllElementsFromFrame(shape);
          saveLayout();
        }
      }
    );
  }
  showContextMenu(e.clientX, e.clientY, [
    {
      label: "Сгруппировать",
      disabled: multiCount < 2,
      action: () => { createGroupFromSelection(); }
    },
    {
      label: "Поместить в фрейм",
      disabled: !getWrapSelectionTargets().length,
      action: () => { wrapSelectionInFrame(); }
    },
    {
      label: "Снять группировку",
      disabled: !(selectedGroupId || groupId),
      action: () => {
        if (!selectedGroupId && groupId) selectGroup(groupId);
        ungroupSelectedGroup();
      }
    },
    ...frameMenuItems
  ]);
});
safeOn(themeLightBtn, "click", () => setTheme("light"));
safeOn(themeDarkBtn, "click", () => setTheme("dark"));
safeOn(themeDarkToggle, "change", () => setTheme(themeDarkToggle.checked ? "dark" : "light"));

safeOn(undoBtn, "click", undoAction);
safeOn(redoBtn, "click", redoAction);

document.addEventListener("mouseup", () => {
  window.setTimeout(() => { shapeTextFormatPanelGesture = false; }, 0);
}, true);

document.addEventListener("selectionchange", () => {
  const editor = activeFormulaEditor;
  if (!editor || editor.contentEditable !== "true" || !editor.classList?.contains("shape-text")) return;
  saveShapeTextSelection(editor);
});

document.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  if (window.DrawTools?.isDrawToolEngaged?.()) return;
  if (!isActiveFormulaEditing() && e.shiftKey && canStartMarqueeSelectionFromTarget(e.target, true)) {
    startMarqueeSelection(e, true);
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    return;
  }
  tryInsertFormulaReferenceFromTarget(e.target, e);
}, true);

document.addEventListener("keydown", (e) => {
  const editor = activeFormulaEditor;
  if (!editor || !editor.isConnected) return;
  if (!editor.classList || !editor.classList.contains("shape-text")) return;
  if (editor.contentEditable !== "true") return;
  const target = e.target;
  if (target !== editor && !(target && editor.contains(target))) return;
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    finishInlineShapeEditing(editor);
    return;
  }
  if (e.key === "Escape") {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    finishInlineShapeEditing(editor, { revert: true });
  }
}, true);

document.addEventListener("keydown", (e) => {
  const target = e.target;
  const typing = !!(target && (target.closest("input, textarea, select") || target.isContentEditable));
  const key = (e.key || "").toLowerCase();
  const mod = e.metaKey || e.ctrlKey;
  const tableCellMode = !!(!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells" && selectedShape.__tableApi);
  const editable = canEditCurrentDocument();
  if (!typing && mod && key === "z" && !e.shiftKey) {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    undoAction();
    return;
  }
  if (!typing && ((key === "z" && e.shiftKey) || (key === "y" && e.ctrlKey))) {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    redoAction();
    return;
  }
  if (!typing && !mod && !e.shiftKey && !e.altKey && key === "f") {
    if (!editable) return;
    e.preventDefault();
    setFrameToolActive(!frameToolActive);
    showHint(frameToolActive ? "Инструмент «Фрейм»: нарисуйте область на столе" : "Инструмент «Фрейм» выключен", "warning", 1800);
    return;
  }
  if (!typing && key === "Escape" && frameToolActive) {
    setFrameToolActive(false);
    return;
  }
  if (!typing && key === "Escape" && shapePlaceTool) {
    setShapePlaceToolActive(null);
    return;
  }
  if (!typing && key === "Escape" && window.DrawTools?.isDrawToolEngaged?.()) {
    window.DrawTools.deactivateAll();
    showHint("Инструмент рисования/лазера выключен", "warning", 1400);
    return;
  }
  if (!typing && !tableCellMode && mod && key === "c") {
    if (!editable) return;
    if (copySelectedShapes()) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    }
    return;
  }
  if (!typing && !tableCellMode && mod && key === "d") {
    if (!editable) return;
    if (duplicateSelectedShapes()) {
      e.preventDefault();
      return;
    }
  }
  if (!typing && !tableCellMode && mod && key === "v") {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    void pasteFromClipboardKeyboard();
    return;
  }
  if (tableCellMode) {
    const sel = selectedShape.__tableApi.getSelection();
    const cell = sel.activeCell || sel.cells[0];
    if (!cell) return;
    if (!editable) {
      if (e.metaKey || e.ctrlKey) {
        if (key === "c") {
          e.preventDefault();
          const text = selectedShape.__tableApi.getClipboardText ? selectedShape.__tableApi.getClipboardText() : (cell.dataset.raw || cell.textContent || "");
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(normalizeClipboardPlainText(text)).catch(() => {});
        }
      }
      return;
    }
    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(-1, 0, { extend: e.shiftKey });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(1, 0, { extend: e.shiftKey });
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(0, -1, { extend: e.shiftKey });
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (selectedShape.__tableApi.moveSelectionBy) selectedShape.__tableApi.moveSelectionBy(0, 1, { extend: e.shiftKey });
        return;
      }
    }
    if (e.metaKey || e.ctrlKey) {
      if (key === "a") {
        e.preventDefault();
        if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
        if (selectedShape.__tableApi.selectAllCells) selectedShape.__tableApi.selectAllCells();
        return;
      }
      if (key === "c") {
        e.preventDefault();
        const text = selectedShape.__tableApi.getClipboardText ? selectedShape.__tableApi.getClipboardText() : (cell.dataset.raw || cell.textContent || "");
        tableCellClipboard = selectedShape.__tableApi.getClipboardPayload ? selectedShape.__tableApi.getClipboardPayload() : null;
        if (tableCellClipboard) tableCellClipboard.text = normalizeClipboardPlainText(tableCellClipboard.text);
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(normalizeClipboardPlainText(text)).catch(() => {});
        return;
      }
      if (key === "v") {
        e.preventDefault();
        const applyPaste = (text) => {
          const clean = normalizeClipboardPlainText(text);
          const payload = tableCellClipboard && normalizeClipboardPlainText(tableCellClipboard.text) === clean
            ? tableCellClipboard
            : null;
          if (selectedShape.__tableApi.pasteTextToSelection) {
            selectedShape.__tableApi.pasteTextToSelection(clean, payload, { plain: e.shiftKey });
          }
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
  } else if (!typing && mod && key === "a") {
    if (selectAllShapes()) {
      e.preventDefault();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      return;
    }
  } else if (!typing && selectedShape && isBpProcessTask(selectedShape)) {
    const titleEl = selectedShape.querySelector(".bp-task-title");
    if (!titleEl || titleEl.contentEditable === "true") return;
    if (!editable) return;
    if (e.key === " " || e.code === "Space" || (e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();
      startBpTaskTitleTypingEdit(selectedShape, titleEl.textContent || "");
      return;
    }
    if (isPrintableKeyEvent(e)) {
      e.preventDefault();
      startBpTaskTitleTypingEdit(selectedShape, e.key);
      return;
    }
  } else if (!typing && selectedShape && isBpProcessAutomation(selectedShape)) {
    const titleEl = selectedShape.querySelector(".bp-automation-title");
    if (!titleEl || titleEl.contentEditable === "true") return;
    if (!editable) return;
    if (e.key === " " || e.code === "Space" || (e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();
      startBpAutomationTitleTypingEdit(selectedShape, titleEl.textContent || "");
      return;
    }
    if (isPrintableKeyEvent(e)) {
      e.preventDefault();
      startBpAutomationTitleTypingEdit(selectedShape, e.key);
      return;
    }
  } else if (!typing && selectedShape && selectedShape.querySelector(".shape-text:not(.bp-task-hidden-text):not(.bp-automation-hidden-text)")) {
    const text = selectedShape.querySelector(".shape-text:not(.bp-task-hidden-text):not(.bp-automation-hidden-text)");
    const currentText = text ? (text.dataset.rawText || text.innerText || "") : "";
    if (!text) return;
    if (e.metaKey || e.ctrlKey) {
      if (key === "c") {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(currentText).catch(() => {});
        return;
      }
      if (key === "v") {
        if (!editable) return;
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
    if (!editable) return;
    if (e.key === " " || e.code === "Space" || (e.key === "Enter" && !e.shiftKey)) {
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
    if (!editable) return;
    if (selectedShape) {
      if (isBpProcessTask(selectedShape)) {
        e.preventDefault();
        startBpTaskTitleTypingEdit(selectedShape, e.key);
        return;
      }
      if (isBpProcessAutomation(selectedShape)) {
        e.preventDefault();
        startBpAutomationTitleTypingEdit(selectedShape, e.key);
        return;
      }
      const text = selectedShape.querySelector(".shape-text:not(.bp-task-hidden-text):not(.bp-automation-hidden-text)");
      if (text) {
        e.preventDefault();
        startInlineShapeEditing(selectedShape, e.key);
        return;
      }
    }
    if (selectedConnector) {
      const conn = connectors.find((it) => it.id === selectedConnector);
      if (conn && activeConnectorLabelEditId !== selectedConnector) {
        e.preventDefault();
        conn.labelText = String(conn.labelText || "") + e.key;
        if (!Number.isFinite(Number(conn.labelOffset))) conn.labelOffset = 0.5;
        renderConnectors();
        saveLayout();
        return;
      }
    }
  }
  if (!typing && selectedConnector && editable && e.key === "Backspace") {
    const conn = connectors.find((it) => it.id === selectedConnector);
    if (conn) {
      const cur = String(conn.labelText || "");
      if (cur.length) {
        e.preventDefault();
        conn.labelText = cur.slice(0, -1);
        if (!conn.labelText) {
          delete conn.labelText;
          delete conn.labelOffset;
        }
        renderConnectors();
        saveLayout();
        return;
      }
    }
  }
  if (!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells") {
    return;
  }
  if (!typing && (e.key === "Delete" || e.key === "Backspace")) {
    if (!editable) return;
    if (selectedShape || selectedConnector || selectedGroupId || multiSelectedShapeIds.size || multiSelectedConnectorIds.size || selectedWindow) {
      e.preventDefault();
      deleteSelected();
    }
    return;
  }
});

document.addEventListener("paste", (e) => {
  const target = e.target;
  const typing = !!(target && (target.closest("input, textarea, select") || target.isContentEditable));
  const tableCellMode = !!(!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells" && selectedShape.__tableApi);
  if (typing || tableCellMode) return;
  const imageBlob = getClipboardImageBlob(e.clipboardData);
  if (imageBlob && canEditCurrentDocument()) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    const point = Number.isFinite(e.clientX) && Number.isFinite(e.clientY)
      ? getDesktopPoint(e.clientX, e.clientY)
      : (lastDesktopPointer || getViewportCenterDesktopPoint());
    void insertImageFromBlob(imageBlob, point);
    return;
  }
  if (wasShapeClipboardPasteHandledRecently()) return;
  let payload = parseShapeClipboardDataTransfer(e.clipboardData);
  if (!payload && e.clipboardData) {
    payload = parseShapeClipboardText(e.clipboardData.getData("text/plain") || "");
  }
  if (!payload) {
    if (!canEditCurrentDocument()) return;
    void readShapeClipboardFromSystem().then((systemPayload) => {
      if (!systemPayload || wasShapeClipboardPasteHandledRecently()) return;
      pasteShapeClipboardAtClient(systemPayload, e.clientX, e.clientY);
    });
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  pasteShapeClipboardAtClient(payload, e.clientX, e.clientY);
}, true);

document.addEventListener("copy", (e) => {
  const target = e.target;
  const typing = !!(target && (target.closest("input, textarea, select") || target.isContentEditable));
  const tableCellMode = !!(!typing && selectedShape && selectedShape.dataset.shapeType === "shape-table" && selectedShape.__tableSelectionScope === "cells" && selectedShape.__tableApi);
  if (typing || tableCellMode) return;
  const snap = snapshotSelectedShapesForClipboard();
  if (!snap) return;
  const serialized = serializeShapeClipboardPayload(snap);
  if (!serialized || !e.clipboardData) {
    shapeClipboard = snap;
    void writeShapeClipboardToSystem(snap);
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  shapeClipboard = snap;
  e.clipboardData.setData("text/plain", serialized);
  try {
    e.clipboardData.setData(SHAPE_CLIPBOARD_MIME, JSON.stringify(normalizeShapeClipboardPayload(snap)));
  } catch {}
}, true);

function normalizeWheelDelta(event) {
  let dx = event.deltaX;
  let dy = event.deltaY;
  if (event.deltaMode === 1) {
    dx *= 16;
    dy *= 16;
  } else if (event.deltaMode === 2 && viewportEl) {
    dx *= viewportEl.clientWidth;
    dy *= viewportEl.clientHeight;
  }
  return { dx, dy };
}

function isElementScrollableForWheel(el) {
  if (!el || el.nodeType !== 1) return false;
  const style = getComputedStyle(el);
  const canY = /(auto|scroll|overlay)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
  const canX = /(auto|scroll|overlay)/.test(style.overflowX) && el.scrollWidth > el.clientWidth + 1;
  return canY || canX;
}

function getShapeTextScrollTarget(fromEl) {
  if (!(fromEl instanceof Element)) return null;
  const shape = fromEl.closest?.(".shape");
  if (!shape || shape.dataset.shapeType === "shape-table") return null;
  const text = shape.querySelector(":scope > .shape-text");
  if (!text || !isElementScrollableForWheel(text)) return null;
  return text;
}

function findScrollableWheelTarget(start, stopAt, clientX, clientY) {
  let node = start instanceof Node ? start : null;
  while (node && node !== stopAt) {
    if (node.nodeType === 1) {
      if (isElementScrollableForWheel(node)) return node;
      const shapeText = getShapeTextScrollTarget(node);
      if (shapeText) return shapeText;
    }
    node = node.parentElement;
  }
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
  const stack = typeof document.elementsFromPoint === "function"
    ? document.elementsFromPoint(clientX, clientY)
    : [];
  for (const el of stack) {
    if (!(el instanceof Element) || el === stopAt) continue;
    const tableWrap = el.closest(".shape-table-wrap");
    if (tableWrap && isElementScrollableForWheel(tableWrap)) return tableWrap;
    const shapeText = getShapeTextScrollTarget(el);
    if (shapeText) return shapeText;
    if (isElementScrollableForWheel(el)) return el;
  }
  return null;
}

function scrollViewportByWheel(event) {
  if (!viewportEl) return false;
  const { dx, dy } = normalizeWheelDelta(event);
  if (!dx && !dy) return false;
  const inner = findScrollableWheelTarget(event.target, viewportEl, event.clientX, event.clientY);
  if (inner) {
    event.preventDefault();
    const maxTop = Math.max(0, inner.scrollHeight - inner.clientHeight);
    const maxLeft = Math.max(0, inner.scrollWidth - inner.clientWidth);
    inner.scrollTop = clamp(inner.scrollTop + dy, 0, maxTop);
    inner.scrollLeft = clamp(inner.scrollLeft + dx, 0, maxLeft);
    return true;
  }
  const maxTop = Math.max(0, viewportEl.scrollHeight - viewportEl.clientHeight);
  const maxLeft = Math.max(0, viewportEl.scrollWidth - viewportEl.clientWidth);
  const nextTop = clamp(viewportEl.scrollTop + dy, 0, maxTop);
  const nextLeft = clamp(viewportEl.scrollLeft + dx, 0, maxLeft);
  if (Math.abs(nextTop - viewportEl.scrollTop) < 0.5 && Math.abs(nextLeft - viewportEl.scrollLeft) < 0.5) return false;
  event.preventDefault();
  viewportEl.scrollTop = nextTop;
  viewportEl.scrollLeft = nextLeft;
  return true;
}

function zoomAroundClientPoint(clientX, clientY, nextZoom) {
  markViewportInteracted();
  const vz = viewportEl.getBoundingClientRect();
  const localClientX = clientX - vz.left;
  const localClientY = clientY - vz.top;
  const prevZoom = zoom;
  const worldX = (viewportEl.scrollLeft + localClientX) / prevZoom;
  const worldY = (viewportEl.scrollTop + localClientY) / prevZoom;
  zoomToWorldPoint(worldX, worldY, clientX, clientY, nextZoom);
}

function zoomToWorldPoint(worldX, worldY, clientX, clientY, nextZoom) {
  markViewportInteracted();
  const vz = viewportEl.getBoundingClientRect();
  const localClientX = clientX - vz.left;
  const localClientY = clientY - vz.top;
  zoom = clamp(nextZoom, 0.4, 2);
  applyZoom();
  setViewportScrollImmediate(
    (worldX * zoom) - localClientX,
    (worldY * zoom) - localClientY,
    4
  );
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
resetZoomBtn.addEventListener("click", () => {
  stopViewportStabilizer();
  const vz = viewportEl.getBoundingClientRect();
  zoomAroundClientPoint(vz.left + vz.width / 2, vz.top + vz.height / 2, 1);
  saveLayout();
});
viewportEl.addEventListener("wheel", (e) => {
  const zoomModifier = e.altKey || e.ctrlKey;
  const locked = viewportEl.dataset.scrollLock === "1";
  if (locked && !zoomModifier) {
    e.preventDefault();
    return;
  }
  markViewportInteracted();
  if (!zoomModifier) {
    scrollViewportByWheel(e);
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  const delta = clamp(e.deltaY, -WHEEL_ZOOM_MAX_DELTA, WHEEL_ZOOM_MAX_DELTA);
  const factor = Math.exp(-delta * WHEEL_ZOOM_SENSITIVITY);
  const now = performance.now();
  const gestureExpired = !wheelZoomGesture || (now - wheelZoomGesture.ts) > 140;
  if (gestureExpired) {
    wheelZoomGesture = {
      ts: now,
      worldX: (viewportEl.scrollLeft + (e.clientX - viewportEl.getBoundingClientRect().left)) / Math.max(0.001, Number(zoom) || 1),
      worldY: (viewportEl.scrollTop + (e.clientY - viewportEl.getBoundingClientRect().top)) / Math.max(0.001, Number(zoom) || 1)
    };
  } else {
    wheelZoomGesture.ts = now;
  }
  zoomToWorldPoint(wheelZoomGesture.worldX, wheelZoomGesture.worldY, e.clientX, e.clientY, zoom * factor);
  saveLayout();
}, { passive: false, capture: true });

// Pan workspace with middle mouse button (wheel click).
viewportEl.addEventListener("pointerdown", (e) => {
  markViewportInteracted();
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
  syncViewportDesktopBackground();
  saveViewportState();
}, { passive: true });

async function finishWorkspaceInit() {
  ensureFormatPanelEnabledCollapsed();
  syncObjectsToolbarFromStorage();
  const vpState = readViewportState();
  restoreViewportState(vpState, { repeat: 10 });
  startViewportStabilizer(vpState, 1400);
  window.addEventListener("load", () => {
    if (viewportInteracted) return;
    const st = readViewportState();
    restoreViewportState(st, { repeat: 8 });
    startViewportStabilizer(st, 1200);
  }, { once: true });
  window.addEventListener("beforeunload", saveViewportState);
  syncWorkspaceAccessMode();
  renderSheetSwitcher();
  if (!guestPublicView && canEditCurrentDocument()) {
    pushHistorySnapshot();
    updateHistoryButtons();
  }
}

async function bootstrapWorkspace() {
  migrateDesktopChildrenToSurface();
  const route = parseAppRoute();
  if (route.mode === "public") {
    await initAuth();
    try {
      await loadPublicDocument(route);
    } catch (err) {
      console.error(err);
      showHint("Публичная ссылка недействительна или отключена.", "error", 3000);
      clearDesktop();
      return;
    }
    await finishWorkspaceInit();
    return;
  }

  await initAuth();
  if (!currentUser) {
    if (route.mode === "document") persistPendingRoute(route);
    clearDesktop();
    openAuthModal(route.mode === "register" ? "register" : "login");
    return;
  }

  if (route.mode === "login" || route.mode === "register") {
    const loadedRemote = await loadRemoteLayout();
    if (!loadedRemote) {
      applyZoom();
      saveLayout();
    }
    if (currentDocumentId) navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: true });
    await finishWorkspaceInit();
    return;
  }

  try {
    if (route.mode === "document") {
      await openDocumentById(route.docId, { replace: true, sheetId: route.sheetId });
    } else {
      const loadedRemote = await loadRemoteLayout();
      if (!loadedRemote) {
        applyZoom();
        saveLayout();
      }
      if (currentDocumentId) navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: true });
    }
  } catch (err) {
    console.error(err);
    const message = err && err.status === 403
      ? "Нет доступа к этому документу."
      : "Не удалось открыть документ.";
    showHint(message, "error", 3000);
    const loadedRemote = await loadRemoteLayout();
    if (!loadedRemote) {
      applyZoom();
      saveLayout();
    }
    if (currentDocumentId) navigateToDocument(currentDocumentId, { sheetId: currentSheetId, replace: true });
  }

  await finishWorkspaceInit();
}

window.addEventListener("popstate", async () => {
  const route = parseAppRoute();
  try {
    if (route.mode === "public") {
      await loadPublicDocument(route);
      syncWorkspaceAccessMode();
      return;
    }
    if (guestPublicView) {
      guestPublicView = false;
      guestPublicToken = "";
    }
    if (!currentUser) {
      if (route.mode === "document") {
        persistPendingRoute(route);
        openAuthModal("login");
      }
      return;
    }
    if (route.mode === "document" && route.docId === currentDocumentId) {
      if (route.sheetId && route.sheetId !== currentSheetId) {
        await switchToSheet(route.sheetId, { updateUrl: false });
        syncWorkspaceAccessMode();
      }
      return;
    }
    if (route.mode === "document" && route.docId !== currentDocumentId) {
      await openDocumentById(route.docId, { replace: true, sheetId: route.sheetId });
      syncWorkspaceAccessMode();
    }
  } catch (err) {
    console.error(err);
    showHint("Не удалось открыть документ.", "error", 2500);
  }
});

(async function main() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  document.documentElement.dataset.appBuild = APP_BUILD;
  console.info(`MindMapTable build ${APP_BUILD}`);
  applyDesktopStyle(DEFAULT_DESKTOP_STYLE);
  openFormatTab("style");
  setArrowShapeButtons(fpArrowStartShape, "classic");
  setArrowShapeButtons(fpArrowEndShape, "classic");
  setFormatCollapseIcon(false);
  initFormatPanelWindow();
  initFileBrowserResize();
  initSheetSwitcher();
  setTheme(localStorage.getItem(THEME_KEY) || "light");
  setAutosaveEnabled(localStorage.getItem(AUTOSAVE_KEY) !== "0");
  updateAutosaveIndicator();
  initDrawToolsModule();
  await bootstrapWorkspace();
})();

function initDrawToolsModule() {
  if (!window.DrawTools?.init) return;
  window.DrawTools.init({
    getDesktop: () => desktop,
    getDesktopSurface: () => getDesktopSurface(),
    getDesktopContentRoot: () => getDesktopContentRoot(),
    getDesktopPoint,
    getDesktopExtent: () => {
      const surface = getDesktopSurface() || desktop;
      return {
        width: parseFloat(surface?.style.width) || 4000,
        height: parseFloat(surface?.style.height) || 3000
      };
    },
    appendToDesktop,
    saveLayout,
    createShapeBase,
    formatPositionPx,
    canEdit: () => canEditCurrentDocument(),
    isReadOnly: () => isWorkspaceReadOnly(),
    showHint,
    selectShape,
    clearSelection,
    addShapeHandles,
    attachResize,
    attachConnectorPoints,
    layoutConnectorPoints,
    renderConnectors,
    updateDesktopExtent,
    setFrameToolActive,
    setShapePlaceToolActive,
    isShapePlaceToolActive,
    syncObjectsToolbarToolState,
    closeAllMenus
  });
}
