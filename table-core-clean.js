(() => {
  const legacySyncFormatPanel = typeof syncFormatPanel === "function" ? syncFormatPanel : null;
  const legacyApplyFormat = typeof applyFormat === "function" ? applyFormat : null;
  const legacyReadShapeData = typeof readShapeData === "function" ? readShapeData : null;
  const legacyCreateShapeTable = typeof createShapeTable === "function" ? createShapeTable : null;
  const legacyGetTableUiState = typeof getTableUiState === "function" ? getTableUiState : null;
  const legacyGetPersistedTableStyle = typeof getPersistedTableStyle === "function" ? getPersistedTableStyle : null;

  const TABLE_SCHEMA_VERSION = 3;

  function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  }

  function getTableNodeState(node) {
    if (!node) return null;
    const header = node.querySelector(".table-titlebar") || node;
    const titleText = node.querySelector(".table-title-text");
    const headerLive = typeof getFillStyleFromNode === "function"
      ? getFillStyleFromNode(header, "#f8fafc")
      : { fillEnabled: true, gradientEnabled: false, fill1: "#f8fafc", fill2: "#f8fafc", fillDirection: "horizontal" };
    const cs = getComputedStyle(node);
    const borderEnabled = parseInt(node.style.borderWidth || cs.borderWidth || "1", 10) > 0;
    const borderWidth = Math.max(0, Number(parseInt(node.style.borderWidth || cs.borderWidth || node.dataset.borderWidth || "0", 10) || 0));
    const borderColor = typeof rgbToHex === "function" ? rgbToHex(cs.borderColor || node.dataset.borderColor || "#111827") : (node.dataset.borderColor || "#111827");
    const opacity = Math.round(Number(cs.opacity ?? node.dataset.opacity ?? "1") * 100);
    const shadow = Number(node.dataset.shadow ?? (typeof parseShadowValue === "function" ? parseShadowValue(node.style.boxShadow || cs.boxShadow) : 0)) || 0;
    const radius = Math.max(0, Number(parseInt(node.style.borderRadius || cs.borderRadius || node.dataset.radius || "0", 10) || 0));
    const baseFontRaw = titleText ? (titleText.dataset.baseFontSize || titleText.style.fontSize || "18") : "18";
    let baseFontSize = clampNumber(baseFontRaw, 8, 144, 18);
    if (titleText && !titleText.dataset.baseFontSize && baseFontSize > 36) {
      baseFontSize = 18;
    }
    return {
      headerFillState: {
        fillEnabled: headerLive.fillEnabled,
        gradientEnabled: headerLive.gradientEnabled,
        fill1: headerLive.fill1 || "#f8fafc",
        fill2: headerLive.fill2 || headerLive.fill1 || "#f8fafc",
        fillDirection: headerLive.fillDirection || "horizontal",
      },
      borderColor,
      borderEnabled,
      borderWidth,
      opacity,
      shadow,
      radius,
      headerFontSize: baseFontSize,
      headerText
    };
  }

  function getTableUiState(node) {
    return getTableNodeState(node);
  }

  function getPersistedTableStyle(node) {
    const state = getTableNodeState(node);
    if (!state) return null;
    return {
      tableHeaderFill: state.headerFillState.fill1,
      tableHeaderFillEnabled: state.headerFillState.fillEnabled,
      tableHeaderGradientEnabled: state.headerFillState.gradientEnabled,
      tableHeaderFill2: state.headerFillState.fill2,
      tableHeaderFillDirection: state.headerFillState.fillDirection,
      border: state.borderColor,
      borderEnabled: state.borderEnabled,
      borderWidth: state.borderWidth,
      opacity: state.opacity / 100,
      shadow: state.shadow,
      radius: state.radius
    };
  }

  function setTableHeaderState(node, state) {
    if (!node || !state) return;
    const header = node.querySelector(".table-titlebar") || node;
    const titleText = node.querySelector(".table-title-text");
    if (header && typeof applyFillStyle === "function") {
      applyFillStyle(header, {
        fillEnabled: state.headerFillState.fillEnabled,
        gradientEnabled: state.headerFillState.gradientEnabled,
        fill1: state.headerFillState.fill1,
        fill2: state.headerFillState.fill2,
        fillDirection: state.headerFillState.fillDirection,
      });
    }
    node.dataset.tableHeaderFill = state.headerFillState.fill1;
    node.dataset.tableHeaderFillEnabled = state.headerFillState.fillEnabled ? "1" : "0";
    node.dataset.tableHeaderGradientEnabled = state.headerFillState.gradientEnabled ? "1" : "0";
    node.dataset.tableHeaderFill2 = state.headerFillState.fill2;
    node.dataset.tableHeaderFillDirection = state.headerFillState.fillDirection;
    node.dataset.borderColor = state.borderColor;
    node.dataset.borderEnabled = state.borderEnabled ? "1" : "0";
    node.dataset.borderWidth = String(state.borderWidth);
    node.dataset.opacity = String(state.opacity / 100);
    node.dataset.shadow = String(state.shadow);
    node.dataset.radius = String(state.radius);
    node.style.borderColor = state.borderColor;
    node.style.borderStyle = "solid";
    node.style.borderWidth = state.borderEnabled ? `${Math.max(1, state.borderWidth)}px` : "0px";
    node.style.outline = state.borderEnabled ? `${Math.max(1, state.borderWidth)}px solid ${state.borderColor}` : "none";
    node.style.borderRadius = `${state.radius}px`;
    node.style.opacity = String(state.opacity / 100);
    if (typeof applyNodeShadow === "function") applyNodeShadow(node, state.shadow);
    if (titleText) {
      titleText.dataset.baseFontSize = String(state.headerFontSize);
      titleText.style.fontSize = `${state.headerFontSize}px`;
      titleText.style.whiteSpace = titleText.style.whiteSpace || "nowrap";
    }
  }

  function normalizeTableNode(node) {
    if (!node || node.dataset.shapeType !== "shape-table") return;
    const state = getTableNodeState(node);
    if (!state) return;
    setTableHeaderState(node, state);
  }

  function normalizeTableOptions(opts = {}) {
    const next = { ...opts };
    const style = next.tableStyle && typeof next.tableStyle === "object" ? { ...next.tableStyle } : {};
    const headerTextStyle = next.tableHeaderTextStyle && typeof next.tableHeaderTextStyle === "object"
      ? { ...next.tableHeaderTextStyle }
      : {};
    const baseFont = clampNumber(headerTextStyle.baseFontSize ?? headerTextStyle.fontSize ?? next.fontSize ?? 18, 8, 144, 18);
    headerTextStyle.baseFontSize = baseFont > 36 && !headerTextStyle.baseFontSize ? 18 : baseFont;
    headerTextStyle.fontSize = headerTextStyle.baseFontSize;
    next.tableHeaderTextStyle = headerTextStyle;
    style.borderWidth = Math.max(0, Number(style.borderWidth ?? next.borderWidth ?? 1) || 0);
    style.borderEnabled = style.borderEnabled != null ? !!style.borderEnabled : next.borderEnabled !== false;
    style.radius = Math.max(0, Number(style.radius ?? next.radius ?? 8) || 0);
    next.tableStyle = style;
    return next;
  }

  function findLatestTableNode() {
    const nodes = Array.from(document.querySelectorAll(".shape.shape-table"));
    return nodes[nodes.length - 1] || null;
  }

  function applyCleanTableFormat() {
    if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table") {
      if (legacyApplyFormat) return legacyApplyFormat();
      return;
    }
    const tableSelection = selectedShape.__tableApi && selectedShape.__tableApi.getSelection ? selectedShape.__tableApi.getSelection() : null;
    const hasCellSelection = selectedShape.__tableSelectionScope === "cells" && !!(tableSelection && tableSelection.cells && tableSelection.cells.length);
    if (hasCellSelection && selectedShape.__tableApi && selectedShape.__tableApi.applyCellStyleFromFormatPanel) {
      const changed = selectedShape.__tableApi.applyCellStyleFromFormatPanel();
      if (changed) {
        saveLayout();
        return;
      }
    }

    const header = selectedShape.querySelector(".table-titlebar");
    const headerText = selectedShape.querySelector(".table-title-text");
    const alignBtn = [fpAlignLeft, fpAlignCenter, fpAlignRight].find((b) => b && b.classList.contains("active"));
    const vAlignBtn = [fpVTop, fpVMiddle, fpVBottom].find((b) => b && b.classList.contains("active"));
    const panelAlign = alignBtn === fpAlignCenter ? "center" : alignBtn === fpAlignRight ? "right" : "left";
    const panelVAlign = vAlignBtn === fpVMiddle ? "middle" : vAlignBtn === fpVBottom ? "bottom" : "top";
    const fillEnabled = !!(fpFillEnabled ? fpFillEnabled.checked : true);
    const gradientEnabled = fillEnabled && !!(fpGradientEnabled ? fpGradientEnabled.checked : false);
    const fillDirection = fpFillType ? fpFillType.value : "horizontal";
    const fill2 = fpFill2 ? fpFill2.value : fpFill.value;
    const borderEnabled = !!(fpBorderEnabled ? fpBorderEnabled.checked : true);
    const borderWidth = borderEnabled ? Math.max(1, Number(fpBorderWidth?.value) || 1) : 0;
    const radius = Math.max(0, Number(fpRadius?.value) || 0);
    const opacity = Math.max(0, Math.min(100, Number(fpOpacity?.value) || 100));
    const shadow = Math.max(0, Number(fpShadow?.value) || 0);
    const headerFontSize = Math.max(8, Number(fpFontSize?.value) || 18);

    if (header) {
      applyFillStyle(header, {
        fillEnabled,
        gradientEnabled,
        fill1: fpFill ? fpFill.value : "#f8fafc",
        fill2,
        fillDirection,
      });
    }
    selectedShape.dataset.tableHeaderFill = fillEnabled ? (fpFill ? fpFill.value : "#f8fafc") : "";
    selectedShape.dataset.tableHeaderFillEnabled = fillEnabled ? "1" : "0";
    selectedShape.dataset.tableHeaderGradientEnabled = gradientEnabled ? "1" : "0";
    selectedShape.dataset.tableHeaderFill2 = fill2;
    selectedShape.dataset.tableHeaderFillDirection = fillDirection;
    selectedShape.dataset.borderColor = fpBorder ? fpBorder.value : "#111827";
    selectedShape.dataset.borderEnabled = borderEnabled ? "1" : "0";
    selectedShape.dataset.borderWidth = String(borderWidth);
    selectedShape.dataset.radius = String(radius);
    selectedShape.dataset.opacity = String(opacity / 100);
    selectedShape.dataset.shadow = String(shadow);
    selectedShape.style.borderColor = fpBorder ? fpBorder.value : "#111827";
    selectedShape.style.borderStyle = "solid";
    selectedShape.style.borderWidth = borderEnabled ? `${borderWidth}px` : "0px";
    selectedShape.style.outline = borderEnabled ? `${borderWidth}px solid ${fpBorder ? fpBorder.value : "#111827"}` : "none";
    selectedShape.style.borderRadius = `${radius}px`;
    selectedShape.style.opacity = `${opacity / 100}`;
    if (typeof applyNodeShadow === "function") applyNodeShadow(selectedShape, shadow);

    if (headerText && !hasCellSelection) {
      if (fpFontFamily) headerText.style.fontFamily = typeof fontCssFromKey === "function" ? fontCssFromKey(fpFontFamily.value) : fpFontFamily.value;
      if (fpTextColor) headerText.style.color = fpTextColor.value;
      headerText.style.fontSize = `${headerFontSize}px`;
      headerText.dataset.baseFontSize = String(headerFontSize);
      headerText.style.fontWeight = fpBold && fpBold.checked ? "700" : "600";
      headerText.style.fontStyle = fpItalic && fpItalic.checked ? "italic" : "normal";
      const textDeco = [];
      if (fpStrike && fpStrike.checked) textDeco.push("line-through");
      if (fpUnderline && fpUnderline.checked) textDeco.push("underline");
      headerText.style.textDecoration = textDeco.length ? textDeco.join(" ") : "none";
      headerText.style.whiteSpace = fpWrap && fpWrap.checked ? "normal" : "nowrap";
      const align = panelAlign;
      const vAlign = panelVAlign;
      if (typeof applyTableTitleAlign === "function") applyTableTitleAlign(header, headerText, align, vAlign);
    }
    saveLayout();
    if (typeof syncFormatPanel === "function") syncFormatPanel();
  }

  function syncCleanTableFormatPanel() {
    if (!formatToggle || !formatToggle.checked) return;
    if (!selectedShape || selectedShape.dataset.shapeType !== "shape-table") {
      if (legacySyncFormatPanel) legacySyncFormatPanel();
      return;
    }
    setControlVisibilityByMode(getSelectionMode());
    const tableSelection = selectedShape.__tableApi && selectedShape.__tableApi.getSelection ? selectedShape.__tableApi.getSelection() : null;
    const hasCellSelection = selectedShape.__tableSelectionScope === "cells" && !!(tableSelection && tableSelection.cells && tableSelection.cells.length);
    if (hasCellSelection && selectedShape.__tableApi && selectedShape.__tableApi.syncToFormatPanel && selectedShape.__tableApi.syncToFormatPanel()) {
      updateFormatPanelVisuals();
      return;
    }
    const state = getTableNodeState(selectedShape);
    const headerText = selectedShape.querySelector(".table-title-text");
    const fillState = state ? state.headerFillState : { fillEnabled: true, gradientEnabled: false, fill1: "#f8fafc", fill2: "#f8fafc", fillDirection: "horizontal" };
    if (fpFillEnabled) fpFillEnabled.checked = !!fillState.fillEnabled;
    if (fpGradientEnabled) fpGradientEnabled.checked = !!fillState.gradientEnabled;
    if (fpFill) fpFill.value = fillState.fill1 || "#f8fafc";
    if (fpFill2) fpFill2.value = fillState.fill2 || fillState.fill1 || "#f8fafc";
    if (fpFillType) fpFillType.value = fillState.fillDirection || "horizontal";
    if (fpBorderEnabled) fpBorderEnabled.checked = state ? !!state.borderEnabled : true;
    const borderWidth = state ? Math.max(1, state.borderWidth || 1) : 1;
    if (fpBorderWidth) fpBorderWidth.value = String(borderWidth);
    if (fpBorderWidthNum) fpBorderWidthNum.value = String(borderWidth);
    if (fpBorder) fpBorder.value = state ? state.borderColor : "#111827";
    if (fpOpacity) fpOpacity.value = String(state ? state.opacity : 100);
    if (fpOpacityNum) fpOpacityNum.value = String(state ? state.opacity : 100);
    if (fpShadow) fpShadow.value = String(state ? state.shadow : 0);
    if (fpShadowNum) fpShadowNum.value = String(state ? state.shadow : 0);
    if (fpRadius) fpRadius.value = String(state ? state.radius : 0);
    if (fpRadiusNum) fpRadiusNum.value = String(state ? state.radius : 0);
    if (fpTextScale) fpTextScale.checked = selectedShape.dataset.tableTextScale !== "0";
    if (fpWrap) fpWrap.checked = selectedShape.dataset.tableWrap !== "0";
    if (fpAutoSize) fpAutoSize.checked = selectedShape.dataset.tableAutoSize !== "0";
    if (fpFontFamily && headerText) setFontSelectValue(fpFontFamily, getComputedStyle(headerText).fontFamily || "Arial");
    if (fpTextColor && headerText) fpTextColor.value = typeof rgbToHex === "function" ? rgbToHex(getComputedStyle(headerText).color || "#334155") : "#334155";
    if (fpFontSize) fpFontSize.value = String(state ? state.headerFontSize : 18);
    if (fpBold && headerText) fpBold.checked = getComputedStyle(headerText).fontWeight === "700";
    if (fpItalic && headerText) fpItalic.checked = getComputedStyle(headerText).fontStyle === "italic";
    if (fpStrike && headerText) fpStrike.checked = (getComputedStyle(headerText).textDecoration || "none").includes("line-through");
    if (fpUnderline && headerText) fpUnderline.checked = (getComputedStyle(headerText).textDecoration || "none").includes("underline");
    if (fpNumberGrouping && headerText) fpNumberGrouping.checked = getNumberGroupingEnabled(headerText);
    const align = headerText ? (headerText.dataset.halign || "left") : "left";
    const vAlign = headerText ? (headerText.dataset.valign || "top") : "top";
    if (typeof setAlignButtons === "function") setAlignButtons(align, vAlign);
    if (typeof updateFormatPanelVisuals === "function") updateFormatPanelVisuals();
  }

  function readCleanShapeData(node) {
    const data = legacyReadShapeData ? legacyReadShapeData(node) : null;
    if (!data || node.dataset.shapeType !== "shape-table") return data;
    const state = getTableNodeState(node);
    if (!state) return data;
    data.tableHeaderFill = state.headerFillState.fill1;
    data.tableHeaderFillEnabled = state.headerFillState.fillEnabled;
    data.tableHeaderGradientEnabled = state.headerFillState.gradientEnabled;
    data.tableHeaderFill2 = state.headerFillState.fill2;
    data.tableHeaderFillDirection = state.headerFillState.fillDirection;
    data.border = state.borderColor;
    data.borderEnabled = state.borderEnabled;
    data.borderWidth = state.borderWidth;
    data.opacity = state.opacity / 100;
    data.shadow = state.shadow;
    data.radius = state.radius;
    data.tableHeaderTextStyle = {
      color: state.headerText ? (state.headerText.style.color || "#334155") : "#334155",
      baseFontSize: state.headerFontSize,
      fontSize: state.headerFontSize,
      bold: state.headerText ? (state.headerText.style.fontWeight || "600") === "700" : false,
      italic: state.headerText ? (state.headerText.style.fontStyle || "normal") === "italic" : false,
      strike: state.headerText ? (state.headerText.style.textDecoration || "none").includes("line-through") : false,
      wrap: state.headerText ? (state.headerText.style.whiteSpace || "nowrap") !== "nowrap" : false,
      hAlign: state.headerText ? (state.headerText.dataset.halign || "left") : "left",
      vAlign: state.headerText ? (state.headerText.dataset.valign || "top") : "top",
    };
    data.tableStyle = {
      tableHeaderFill: state.headerFillState.fill1,
      tableHeaderFillEnabled: state.headerFillState.fillEnabled,
      tableHeaderGradientEnabled: state.headerFillState.gradientEnabled,
      tableHeaderFill2: state.headerFillState.fill2,
      tableHeaderFillDirection: state.headerFillState.fillDirection,
      border: state.borderColor,
      borderEnabled: state.borderEnabled,
      borderWidth: state.borderWidth,
      opacity: state.opacity / 100,
      shadow: state.shadow,
      radius: state.radius,
    };
    return data;
  }

  function createCleanShapeTable(opts = {}, doSave = true) {
    const normalized = normalizeTableOptions(opts);
    const result = legacyCreateShapeTable ? legacyCreateShapeTable(normalized, doSave) : null;
    const node = findLatestTableNode();
    if (node) normalizeTableNode(node);
    if (doSave && typeof saveLayout === "function") saveLayout({ recordHistory: false });
    return result;
  }

  if (legacyGetTableUiState) {
    getTableUiState = getTableUiState;
  }
  if (legacyGetPersistedTableStyle) {
    getPersistedTableStyle = getPersistedTableStyle;
  }
  if (legacySyncFormatPanel) {
    syncFormatPanel = syncCleanTableFormatPanel;
  }
  if (legacyApplyFormat) {
    applyFormat = applyCleanTableFormat;
  }
  if (legacyReadShapeData) {
    readShapeData = readCleanShapeData;
  }
  if (legacyCreateShapeTable) {
    createShapeTable = createCleanShapeTable;
  }

  const originalApplyLayout = typeof applyLayout === "function" ? applyLayout : null;
  if (originalApplyLayout) {
    applyLayout = function cleanApplyLayout(data) {
      const result = originalApplyLayout(migrateLayout ? migrateLayout(data) : data);
      document.querySelectorAll(".shape.shape-table").forEach((node) => normalizeTableNode(node));
      return result;
    };
  }

  function migrateLayout(layout) {
    const copy = layout ? JSON.parse(JSON.stringify(layout)) : null;
    if (!copy || typeof copy !== "object") return copy;
    const version = Number(copy.schemaVersion) || 0;
    if (version >= TABLE_SCHEMA_VERSION) return copy;
    (copy.shapes || []).forEach((shape) => {
      if (!shape || shape.type !== "shape-table" || !shape.tableHeaderTextStyle) return;
      const current = Number(shape.tableHeaderTextStyle.baseFontSize ?? shape.tableHeaderTextStyle.fontSize ?? 18) || 18;
      shape.tableHeaderTextStyle.baseFontSize = current > 36 ? 18 : current;
      shape.tableHeaderTextStyle.fontSize = shape.tableHeaderTextStyle.baseFontSize;
    });
    copy.schemaVersion = TABLE_SCHEMA_VERSION;
    return copy;
  }
})();
