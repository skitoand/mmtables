(function () {
  "use strict";

  const BITRIX_GUEST_WEBHOOK_KEY = "mmtable-bitrix-webhook-guest-v1";
  const DEFAULT_CHART_WIDTH = "420px";
  const DEFAULT_CHART_HEIGHT = "260px";
  const DEFAULT_CARD_WIDTH = "220px";
  const DEFAULT_CARD_HEIGHT = "130px";
  const DEFAULT_FILTER_WIDTH = "300px";
  const DEFAULT_FILTER_HEIGHT = "118px";
  const FILTER_SLIDER_MIN_DATE = "2020-01-01";

  const bitrixMetaCache = {
    pipelines: Object.create(null),
    stages: Object.create(null),
    fields: Object.create(null)
  };

  function bitrixStagesCacheKey(entity, categoryId) {
    return `${entity}:${categoryId}`;
  }

  async function fetchBitrixPipelines(entity) {
    if (bitrixMetaCache.pipelines[entity]) return bitrixMetaCache.pipelines[entity];
    const data = await bitrixFetch(`/api/integrations/bitrix/pipelines?entity=${encodeURIComponent(entity)}`);
    bitrixMetaCache.pipelines[entity] = data;
    return data;
  }

  async function fetchBitrixStages(entity, categoryId) {
    const cacheKey = bitrixStagesCacheKey(entity, categoryId);
    if (bitrixMetaCache.stages[cacheKey]) return bitrixMetaCache.stages[cacheKey];
    const data = await bitrixFetch(
      `/api/integrations/bitrix/stages?entity=${encodeURIComponent(entity)}&categoryId=${encodeURIComponent(categoryId)}`
    );
    bitrixMetaCache.stages[cacheKey] = data;
    return data;
  }

  async function fetchBitrixFields(entity) {
    if (bitrixMetaCache.fields[entity]) return bitrixMetaCache.fields[entity];
    const data = await bitrixFetch(`/api/integrations/bitrix/fields?entity=${encodeURIComponent(entity)}`);
    bitrixMetaCache.fields[entity] = data;
    return data;
  }

  function prefillBitrixConfigSelects(cfg, pipelineSelect, stageSelect, sumFieldSelect, opts = {}) {
    const stageOptional = !!opts.stageOptional;
    if (pipelineSelect) {
      pipelineSelect.innerHTML = "";
      const pipeOpt = document.createElement("option");
      pipeOpt.value = String(cfg.categoryId || 0);
      pipeOpt.textContent = cfg.categoryName || "Загрузка…";
      pipelineSelect.appendChild(pipeOpt);
      pipelineSelect.disabled = cfg.entity === "lead";
    }
    if (stageSelect) {
      stageSelect.innerHTML = "";
      if (stageOptional && !cfg.stageId) {
        const allOpt = document.createElement("option");
        allOpt.value = "";
        allOpt.textContent = "Все стадии";
        stageSelect.appendChild(allOpt);
      } else {
        const stageOpt = document.createElement("option");
        stageOpt.value = cfg.stageId || "";
        stageOpt.textContent = cfg.stageName || "Загрузка…";
        stageSelect.appendChild(stageOpt);
      }
    }
    if (sumFieldSelect) {
      sumFieldSelect.innerHTML = "";
      const fieldOpt = document.createElement("option");
      fieldOpt.value = cfg.sumField || "OPPORTUNITY";
      fieldOpt.textContent = cfg.sumFieldName || cfg.sumField || "Загрузка…";
      sumFieldSelect.appendChild(fieldOpt);
    }
  }

  function prefetchBitrixMeta(entity = "deal") {
    fetchBitrixFields(entity).catch(() => {});
    fetchBitrixPipelines(entity)
      .then((data) => {
        const pipelines = data.pipelines || [];
        if (!pipelines.length) return;
        const primary = pipelines.find((pipe) => pipe.isDefault) || pipelines[0];
        return fetchBitrixStages(entity, primary.id);
      })
      .catch(() => {});
  }

  let chartConfigModal = null;
  let cardConfigModal = null;
  let dateFilterConfigModal = null;
  let chartConfigResolve = null;
  let pendingChartNode = null;

  function $(id) {
    return document.getElementById(id);
  }

  function defaultChartConfig() {
    const today = new Date();
    const from = new Date(today);
    from.setMonth(from.getMonth() - 3);
    return {
      entity: "deal",
      categoryId: 0,
      categoryName: "",
      stageId: "",
      stageName: "",
      granularity: "week",
      metric: "count",
      sumField: "OPPORTUNITY",
      sumFieldName: "Сумма",
      dateFrom: from.toISOString().slice(0, 10),
      dateTo: today.toISOString().slice(0, 10),
      title: "График Bitrix24"
    };
  }

  function normalizeChartConfig(raw) {
    const base = defaultChartConfig();
    if (!raw || typeof raw !== "object") return base;
    return {
      entity: raw.entity === "lead" ? "lead" : "deal",
      categoryId: Number(raw.categoryId) || 0,
      categoryName: String(raw.categoryName || ""),
      stageId: String(raw.stageId || ""),
      stageName: String(raw.stageName || ""),
      granularity: ["day", "week", "month"].includes(raw.granularity) ? raw.granularity : "week",
      metric: raw.metric === "sum" ? "sum" : "count",
      sumField: String(raw.sumField || base.sumField),
      sumFieldName: String(raw.sumFieldName || base.sumFieldName),
      dateFrom: String(raw.dateFrom || base.dateFrom),
      dateTo: String(raw.dateTo || base.dateTo),
      title: String(raw.title || raw.stageName || "График Bitrix24")
    };
  }

  function getGuestWebhook() {
    try {
      return String(localStorage.getItem(BITRIX_GUEST_WEBHOOK_KEY) || "").trim();
    } catch {
      return "";
    }
  }

  function setGuestWebhook(url) {
    try {
      if (url) localStorage.setItem(BITRIX_GUEST_WEBHOOK_KEY, url);
      else localStorage.removeItem(BITRIX_GUEST_WEBHOOK_KEY);
    } catch {
      /* ignore */
    }
  }

  async function bitrixFetch(path, opts = {}) {
    const headers = Object.assign({}, opts.headers || {});
    if (!window.currentUser) {
      const guestWebhook = getGuestWebhook();
      if (guestWebhook) headers["X-Bitrix-Webhook"] = guestWebhook;
    }
    const res = await fetch(path, Object.assign({}, opts, { headers }));
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const details = data && data.details ? String(data.details) : "";
      const code = data && data.error ? String(data.error) : `HTTP ${res.status}`;
      const err = new Error(details ? `${code}: ${details}` : code);
      err.status = res.status;
      err.payload = data;
      throw err;
    }
    return data;
  }

  async function loadBitrixStatus() {
    return bitrixFetch("/api/integrations/bitrix");
  }

  async function saveBitrixWebhook(webhookUrl) {
    if (window.currentUser) {
      return bitrixFetch("/api/integrations/bitrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl })
      });
    }
    setGuestWebhook(webhookUrl);
    return { connected: true, domain: tryParseDomain(webhookUrl), webhookMasked: maskWebhook(webhookUrl) };
  }

  async function disconnectBitrix() {
    if (window.currentUser) {
      return bitrixFetch("/api/integrations/bitrix", { method: "DELETE" });
    }
    setGuestWebhook("");
    return { connected: false };
  }

  function tryParseDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }

  function maskWebhook(url) {
    const raw = String(url || "").replace(/\/+$/, "");
    const parts = raw.split("/");
    if (parts.length < 2) return raw;
    const token = parts[parts.length - 1];
    parts[parts.length - 1] = token.slice(0, 4) + "…";
    return parts.join("/") + "/";
  }

  function showBitrixError(errorEl, err) {
    if (!errorEl) return;
    const raw = String((err && err.message) || err || "").trim();
    const code = raw.split(":")[0];
    const map = {
      bitrix_not_configured: "Подключите Bitrix24 в профиле или укажите webhook.",
      unauthorized: "Войдите в аккаунт или сохраните webhook для гостя.",
      invalid_webhook_url: "Некорректный URL входящего webhook Bitrix24.",
      bitrix_request_failed: "Bitrix24 не ответил на запрос."
    };
    errorEl.textContent = map[code] && raw === code ? map[code] : raw || "Не удалось загрузить данные Bitrix24.";
    errorEl.classList.toggle("hidden", !errorEl.textContent);
  }

  function clearBitrixError(errorEl) {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }

  function defaultDateRange() {
    const today = new Date();
    const from = new Date(today);
    from.setMonth(from.getMonth() - 3);
    return {
      dateFrom: from.toISOString().slice(0, 10),
      dateTo: today.toISOString().slice(0, 10)
    };
  }

  async function loadBitrixPipelines(entity, pipelineSelect, stageSelect, errorEl, opts = {}) {
    const stageOptional = !!opts.stageOptional;
    pipelineSelect.innerHTML = "";
    stageSelect.innerHTML = "";
    if (entity === "lead") {
      pipelineSelect.disabled = true;
      pipelineSelect.innerHTML = '<option value="0">Лиды</option>';
      await loadBitrixStages(entity, pipelineSelect, stageSelect, errorEl, { stageOptional });
      return;
    }
    pipelineSelect.disabled = false;
    const data = await fetchBitrixPipelines(entity);
    (data.pipelines || []).forEach((pipe) => {
      const opt = document.createElement("option");
      opt.value = String(pipe.id);
      opt.textContent = pipe.name;
      pipelineSelect.appendChild(opt);
    });
    if (!pipelineSelect.value && pipelineSelect.options.length) {
      pipelineSelect.selectedIndex = 0;
    }
    await loadBitrixStages(entity, pipelineSelect, stageSelect, errorEl, { stageOptional });
  }

  async function loadBitrixStages(entity, pipelineSelect, stageSelect, errorEl, opts = {}) {
    const stageOptional = !!opts.stageOptional;
    const categoryId = Number(pipelineSelect.value) || 0;
    stageSelect.innerHTML = '<option value="">Загрузка…</option>';
    const data = await fetchBitrixStages(entity, categoryId);
    stageSelect.innerHTML = "";
    if (stageOptional) {
      const allOpt = document.createElement("option");
      allOpt.value = "";
      allOpt.textContent = "Все стадии";
      stageSelect.appendChild(allOpt);
    }
    (data.stages || []).forEach((stage) => {
      const opt = document.createElement("option");
      opt.value = stage.id;
      opt.textContent = stage.name;
      stageSelect.appendChild(opt);
    });
    if (!stageSelect.value && stageSelect.options.length > (stageOptional ? 1 : 0)) {
      stageSelect.selectedIndex = stageOptional ? 1 : 0;
    }
  }

  async function loadBitrixSumFields(entity, sumFieldSelect) {
    sumFieldSelect.innerHTML = '<option value="">Загрузка…</option>';
    const data = await fetchBitrixFields(entity);
    sumFieldSelect.innerHTML = "";
    (data.fields || []).forEach((field) => {
      const opt = document.createElement("option");
      opt.value = field.id;
      opt.textContent = field.name;
      sumFieldSelect.appendChild(opt);
    });
    if (!sumFieldSelect.value && sumFieldSelect.options.length) {
      sumFieldSelect.selectedIndex = 0;
    }
  }

  function bindBitrixEntitySelectors(refs, opts = {}) {
    const { entitySelect, pipelineSelect, stageSelect, errorEl } = refs;
    entitySelect.addEventListener("change", () => {
      loadBitrixPipelines(entitySelect.value, pipelineSelect, stageSelect, errorEl, opts).catch((err) => showBitrixError(errorEl, err));
      if (refs.onEntityChange) refs.onEntityChange(entitySelect.value);
    });
    pipelineSelect.addEventListener("change", () => {
      loadBitrixStages(entitySelect.value, pipelineSelect, stageSelect, errorEl, opts).catch((err) => showBitrixError(errorEl, err));
    });
  }

  function defaultCardStyle() {
    return {
      fillEnabled: true,
      gradientEnabled: false,
      fill: "#ffffff",
      fill2: "#ffffff",
      fillDirection: "horizontal",
      borderEnabled: true,
      border: "#dbe4f0",
      borderWidth: 1,
      borderStyle: "solid",
      radius: 14,
      opacity: 1,
      shadow: 8
    };
  }

  function defaultCardValueStyle() {
    return {
      fontFamily: "Arial",
      fontSize: 42,
      textColor: "#334155",
      bold: true,
      italic: false,
      strike: false,
      underline: false,
      hAlign: "center",
      vAlign: "middle"
    };
  }

  function defaultCardLabelStyle() {
    return {
      fontFamily: "Arial",
      fontSize: 11,
      textColor: "#94a3b8",
      bold: true,
      italic: false,
      strike: false,
      underline: false,
      hAlign: "center",
      vAlign: "top"
    };
  }

  function normalizeCardTextStyle(raw, fallback) {
    const base = fallback();
    if (!raw || typeof raw !== "object") return base;
    return {
      fontFamily: String(raw.fontFamily || base.fontFamily),
      fontSize: Math.max(8, Math.min(144, Number(raw.fontSize) || base.fontSize)),
      textColor: String(raw.textColor || base.textColor),
      bold: raw.bold != null ? !!raw.bold : base.bold,
      italic: raw.italic != null ? !!raw.italic : base.italic,
      strike: raw.strike != null ? !!raw.strike : base.strike,
      underline: raw.underline != null ? !!raw.underline : base.underline,
      hAlign: ["left", "center", "right"].includes(raw.hAlign) ? raw.hAlign : base.hAlign,
      vAlign: ["top", "middle", "bottom"].includes(raw.vAlign) ? raw.vAlign : base.vAlign
    };
  }

  function normalizeCardStyle(raw) {
    const base = defaultCardStyle();
    if (!raw || typeof raw !== "object") return base;
    return {
      fillEnabled: raw.fillEnabled != null ? !!raw.fillEnabled : base.fillEnabled,
      gradientEnabled: raw.gradientEnabled != null ? !!raw.gradientEnabled : base.gradientEnabled,
      fill: String(raw.fill || base.fill),
      fill2: String(raw.fill2 || raw.fill || base.fill2),
      fillDirection: raw.fillDirection || base.fillDirection,
      borderEnabled: raw.borderEnabled != null ? !!raw.borderEnabled : base.borderEnabled,
      border: String(raw.border || base.border),
      borderWidth: Math.max(0, Number(raw.borderWidth ?? base.borderWidth) || 0),
      borderStyle: String(raw.borderStyle || base.borderStyle),
      radius: Math.max(0, Number(raw.radius ?? base.radius) || 0),
      opacity: Math.max(0, Math.min(1, Number(raw.opacity ?? base.opacity) || 1)),
      shadow: Math.max(0, Number(raw.shadow ?? base.shadow) || 0)
    };
  }

  function defaultCardConfig() {
    const dates = defaultDateRange();
    return {
      entity: "deal",
      categoryId: 0,
      categoryName: "",
      stageId: "",
      stageName: "",
      metric: "count",
      sumField: "OPPORTUNITY",
      sumFieldName: "Сумма",
      useDates: false,
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
      title: "Карточка Bitrix24",
      cardStyle: defaultCardStyle(),
      valueStyle: defaultCardValueStyle(),
      labelStyle: defaultCardLabelStyle()
    };
  }

  function normalizeCardConfig(raw) {
    const base = defaultCardConfig();
    if (!raw || typeof raw !== "object") return base;
    return {
      entity: raw.entity === "lead" ? "lead" : "deal",
      categoryId: Number(raw.categoryId) || 0,
      categoryName: String(raw.categoryName || ""),
      stageId: String(raw.stageId || ""),
      stageName: String(raw.stageName || ""),
      metric: raw.metric === "sum" ? "sum" : "count",
      sumField: String(raw.sumField || base.sumField),
      sumFieldName: String(raw.sumFieldName || base.sumFieldName),
      useDates: !!raw.useDates,
      dateFrom: String(raw.dateFrom || base.dateFrom),
      dateTo: String(raw.dateTo || base.dateTo),
      title: String(raw.title || raw.stageName || base.title),
      cardStyle: normalizeCardStyle(raw.cardStyle),
      valueStyle: normalizeCardTextStyle(raw.valueStyle, defaultCardValueStyle),
      labelStyle: normalizeCardTextStyle(raw.labelStyle, defaultCardLabelStyle),
      lastValue: Number.isFinite(Number(raw.lastValue)) ? Number(raw.lastValue) : null
    };
  }

  function parseBitrixCardNumericValue(node) {
    if (!node) return 0;
    const api = node.__cardApi;
    if (api && Number.isFinite(api.lastValue)) return api.lastValue;
    try {
      const cfg = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
      if (Number.isFinite(cfg.lastValue)) return cfg.lastValue;
    } catch {
      /* ignore */
    }
    const text = String(api?.valueEl?.textContent || "").trim();
    if (!text || text === "…" || text === "—") return 0;
    if (window.parseNumericLikeText) {
      const parsed = window.parseNumericLikeText(text);
      if (Number.isFinite(parsed)) return parsed;
    }
    const normalized = text.replace(/[\s\u00A0\u202F]/g, "").replace(",", ".");
    const fallback = Number(normalized);
    return Number.isFinite(fallback) ? fallback : 0;
  }

  function getBitrixCardFormulaValue(node) {
    return parseBitrixCardNumericValue(node);
  }

  function setBitrixCardLastValue(node, value) {
    if (!node) return;
    const numeric = Number(value);
    const safeValue = Number.isFinite(numeric) ? numeric : 0;
    node.dataset.bitrixCardValue = String(safeValue);
    if (node.__cardApi) {
      node.__cardApi.lastValue = safeValue;
      const cfg = normalizeCardConfig(node.__cardApi.config);
      cfg.lastValue = safeValue;
      node.__cardApi.config = cfg;
      node.dataset.cardConfig = JSON.stringify(cfg);
    }
    scheduleRefreshAllFormulaDisplays();
  }

  let formulaRefreshTimer = null;
  function scheduleRefreshAllFormulaDisplays() {
    if (!window.refreshAllFormulaDisplays) return;
    clearTimeout(formulaRefreshTimer);
    formulaRefreshTimer = setTimeout(() => {
      formulaRefreshTimer = null;
      window.refreshAllFormulaDisplays();
    }, 60);
  }

  function fpEl(id) {
    return $(id);
  }

  function readTextStyleFromElement(el) {
    if (!el) return defaultCardLabelStyle();
    const cs = getComputedStyle(el);
    return {
      fontFamily: window.fontKeyFromCss ? window.fontKeyFromCss(cs.fontFamily || "Arial") : "Arial",
      fontSize: parseInt(cs.fontSize || "16", 10) || 16,
      textColor: window.rgbToHex ? window.rgbToHex(cs.color || "#334155") : "#334155",
      bold: cs.fontWeight === "700" || Number(cs.fontWeight) >= 600,
      italic: cs.fontStyle === "italic",
      strike: (cs.textDecoration || "").includes("line-through"),
      underline: (cs.textDecoration || "").includes("underline"),
      hAlign: el.style.textAlign || "center",
      vAlign: "top"
    };
  }

  function applyTextStyleToElement(el, style) {
    if (!el || !style) return;
    el.style.fontFamily = window.fontCssFromKey
      ? window.fontCssFromKey(style.fontFamily || "Arial")
      : (style.fontFamily || "Arial");
    el.style.color = style.textColor || "#334155";
    el.style.fontSize = `${Math.max(8, Number(style.fontSize) || 11)}px`;
    el.style.fontWeight = style.bold ? "700" : "400";
    el.style.fontStyle = style.italic ? "italic" : "normal";
    const deco = [];
    if (style.strike) deco.push("line-through");
    if (style.underline) deco.push("underline");
    el.style.textDecoration = deco.length ? deco.join(" ") : "none";
    el.style.textAlign = style.hAlign || "center";
  }

  function readCardStyleFromElement(cardEl) {
    if (!cardEl) return defaultCardStyle();
    const fillState = window.getFillStyleFromNode
      ? window.getFillStyleFromNode(cardEl, "#ffffff")
      : { fillEnabled: true, gradientEnabled: false, fill1: "#ffffff", fill2: "#ffffff", fillDirection: "horizontal" };
    const cs = getComputedStyle(cardEl);
    const borderWidth = Math.max(0, Number(cardEl.dataset.borderWidth || parseInt(cs.borderWidth || "1", 10) || 0));
    const borderEnabled = cardEl.dataset.borderEnabled != null ? cardEl.dataset.borderEnabled === "1" : borderWidth > 0;
    return {
      fillEnabled: fillState.fillEnabled,
      gradientEnabled: fillState.gradientEnabled,
      fill: fillState.fill1,
      fill2: fillState.fill2,
      fillDirection: fillState.fillDirection,
      borderEnabled,
      border: window.rgbToHex ? window.rgbToHex(cs.borderColor || "#dbe4f0") : "#dbe4f0",
      borderWidth,
      borderStyle: window.getShapeBorderLineStyle ? window.getShapeBorderLineStyle(cardEl) : "solid",
      radius: Math.max(0, Number(cardEl.dataset.cornerRadius || parseInt(cs.borderRadius || "14", 10) || 14)),
      opacity: Math.max(0, Math.min(1, Number(cs.opacity) || 1)),
      shadow: Number(cardEl.dataset.shadow ?? (window.parseShadowValue ? window.parseShadowValue(cardEl.style.boxShadow || cs.boxShadow) : 0)) || 0
    };
  }

  function applyCardContainerStyle(cardEl, cardStyle) {
    if (!cardEl) return;
    const style = normalizeCardStyle(cardStyle);
    if (window.applyFillStyle) {
      window.applyFillStyle(cardEl, {
        fillEnabled: style.fillEnabled,
        gradientEnabled: style.gradientEnabled,
        fill1: style.fill,
        fill2: style.fill2,
        fillDirection: style.fillDirection
      });
    }
    cardEl.dataset.borderEnabled = style.borderEnabled ? "1" : "0";
    cardEl.dataset.borderWidth = String(style.borderWidth);
    cardEl.dataset.borderStyle = style.borderStyle;
    cardEl.dataset.cornerRadius = String(style.radius);
    cardEl.style.border = style.borderEnabled
      ? `${Math.max(1, style.borderWidth)}px ${style.borderStyle} ${style.border}`
      : "0px solid transparent";
    cardEl.style.borderRadius = `${style.radius}px`;
    cardEl.style.opacity = String(style.opacity);
    if (window.applyNodeShadow) window.applyNodeShadow(cardEl, style.shadow);
  }

  function persistCardConfig(node) {
    if (!node || !node.__cardApi) return;
    const cfg = normalizeCardConfig(node.__cardApi.config);
    cfg.cardStyle = readCardStyleFromElement(node.__cardApi.cardEl);
    cfg.valueStyle = readTextStyleFromElement(node.__cardApi.valueEl);
    cfg.labelStyle = readTextStyleFromElement(node.__cardApi.labelEl);
    node.__cardApi.config = cfg;
    node.dataset.cardConfig = JSON.stringify(cfg);
  }

  function getCardActiveTextPart(node) {
    return String(node?.dataset?.bitrixTextPart || "");
  }

  function applyCardTextAlign(node, h, v) {
    const part = getCardActiveTextPart(node);
    if (!part || !node.__cardApi) return false;
    const cfg = normalizeCardConfig(node.__cardApi.config);
    const key = part === "value" ? "valueStyle" : "labelStyle";
    const fallback = part === "value" ? defaultCardValueStyle : defaultCardLabelStyle;
    cfg[key] = normalizeCardTextStyle(Object.assign({}, cfg[key], { hAlign: h, vAlign: v }), fallback);
    applyTextStyleToElement(part === "value" ? node.__cardApi.valueEl : node.__cardApi.labelEl, cfg[key]);
    node.__cardApi.config = cfg;
    node.dataset.cardConfig = JSON.stringify(cfg);
    if (window.saveLayout) window.saveLayout();
    return true;
  }

  function canEditBitrixWidget() {
    if (typeof window.canEditCurrentDocument === "function") return window.canEditCurrentDocument();
    if (typeof window.isWorkspaceReadOnly === "function") return !window.isWorkspaceReadOnly();
    return true;
  }

  function attachBitrixCardInteractions(node) {
    if (!node || node.dataset.bitrixCardInteractions === "1") return;
    node.dataset.bitrixCardInteractions = "1";
    node.addEventListener("dblclick", (e) => {
      if (typeof window.isActiveFormulaEditing === "function" && window.isActiveFormulaEditing()) return;
      const api = node.__cardApi;
      if (!api) return;
      if (e.target.closest(".bitrix-kpi-label")) {
        e.stopPropagation();
        e.preventDefault();
        startCardLabelEdit(node, api.labelEl);
        return;
      }
      if (e.target.closest(".bitrix-kpi-value")) {
        e.stopPropagation();
        e.preventDefault();
        selectCardTextPart(node, "value");
        if (window.openFormatTab) window.openFormatTab("text");
        if (window.showFormatPanel) window.showFormatPanel();
      }
    });
  }

  function stopBitrixActionPointer(e) {
    e.stopPropagation();
  }

  function getCardActiveTextPartPublic(node) {
    return getCardActiveTextPart(node);
  }

  function clearBitrixCardTextPart(node, opts = {}) {
    if (!node || node.dataset.shapeType !== "shape-bitrix-card") return;
    node.dataset.bitrixTextPart = "";
    const api = node.__cardApi;
    if (api) {
      api.valueEl.classList.remove("bitrix-kpi-text-active");
      api.labelEl.classList.remove("bitrix-kpi-text-active");
    }
    if (opts.sync !== false && window.syncFormatPanel) window.syncFormatPanel();
  }

  function clearAllBitrixCardTextSelections(exceptNode = null) {
    let changed = false;
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-card"]').forEach((node) => {
      if (exceptNode && node === exceptNode) return;
      if (!node.dataset.bitrixTextPart && !node.querySelector(".bitrix-kpi-text-active")) return;
      clearBitrixCardTextPart(node, { sync: false });
      changed = true;
    });
    if (changed && window.syncFormatPanel) window.syncFormatPanel();
  }

  function selectCardTextPart(node, part, opts = {}) {
    if (!node) return;
    clearAllBitrixCardTextSelections(node);
    node.dataset.bitrixTextPart = part || "";
    const api = node.__cardApi;
    if (api) {
      api.valueEl.classList.toggle("bitrix-kpi-text-active", part === "value");
      api.labelEl.classList.toggle("bitrix-kpi-text-active", part === "label");
    }
    if (!opts.silent && window.syncFormatPanel) window.syncFormatPanel();
  }

  function startCardLabelEdit(node, labelEl) {
    if (!canEditBitrixWidget()) return;
    selectCardTextPart(node, "label");
    labelEl.contentEditable = "true";
    labelEl.dataset.editing = "1";
    labelEl.classList.add("bitrix-kpi-label-editing");
    labelEl.focus();
    const range = document.createRange();
    range.selectNodeContents(labelEl);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    const finish = () => {
      if (!labelEl.isConnected) return;
      labelEl.contentEditable = "false";
      delete labelEl.dataset.editing;
      labelEl.classList.remove("bitrix-kpi-label-editing");
      const cfg = normalizeCardConfig(node.__cardApi.config);
      cfg.title = String(labelEl.textContent || "").trim() || cfg.title;
      cfg.labelStyle = readTextStyleFromElement(labelEl);
      applyCardConfig(node, cfg, true);
    };
    labelEl.addEventListener("blur", finish, { once: true });
    labelEl.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        e.preventDefault();
        labelEl.blur();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        const cfg = normalizeCardConfig(node.__cardApi.config);
        labelEl.textContent = cfg.title;
        labelEl.blur();
      }
    });
  }

  function syncCardFormatPanel(node) {
    const api = node && node.__cardApi;
    if (!api) return;
    const cardEl = api.cardEl;
    const cardStyle = readCardStyleFromElement(cardEl);
    const part = getCardActiveTextPart(node);
    const textStyle = part === "value"
      ? readTextStyleFromElement(api.valueEl)
      : part === "label"
        ? readTextStyleFromElement(api.labelEl)
        : null;

    const fpFillEnabled = fpEl("fpFillEnabled");
    const fpGradientEnabled = fpEl("fpGradientEnabled");
    const fpFill = fpEl("fpFill");
    const fpFill2 = fpEl("fpFill2");
    const fpFillType = fpEl("fpFillType");
    const fpBorderEnabled = fpEl("fpBorderEnabled");
    const fpBorder = fpEl("fpBorder");
    const fpBorderWidth = fpEl("fpBorderWidth");
    const fpBorderWidthNum = fpEl("fpBorderWidthNum");
    const fpLineStyle = fpEl("fpLineStyle");
    const fpRadius = fpEl("fpRadius");
    const fpRadiusNum = fpEl("fpRadiusNum");
    const fpOpacity = fpEl("fpOpacity");
    const fpOpacityNum = fpEl("fpOpacityNum");
    const fpShadow = fpEl("fpShadow");
    const fpShadowNum = fpEl("fpShadowNum");
    const fpFontFamily = fpEl("fpFontFamily");
    const fpFontSize = fpEl("fpFontSize");
    const fpTextColor = fpEl("fpTextColor");
    const fpBold = fpEl("fpBold");
    const fpItalic = fpEl("fpItalic");
    const fpStrike = fpEl("fpStrike");
    const fpUnderline = fpEl("fpUnderline");

    if (fpFillEnabled) fpFillEnabled.checked = cardStyle.fillEnabled;
    if (fpGradientEnabled) fpGradientEnabled.checked = cardStyle.gradientEnabled;
    if (fpFill) fpFill.value = cardStyle.fill;
    if (fpFill2) fpFill2.value = cardStyle.fill2;
    if (fpFillType) fpFillType.value = cardStyle.fillDirection;
    if (fpBorderEnabled) fpBorderEnabled.checked = cardStyle.borderEnabled;
    if (fpBorder) fpBorder.value = cardStyle.border;
    if (fpBorderWidth) fpBorderWidth.value = String(cardStyle.borderWidth);
    if (fpBorderWidthNum) fpBorderWidthNum.value = String(cardStyle.borderWidth);
    if (fpLineStyle) fpLineStyle.value = cardStyle.borderStyle;
    if (fpRadius) fpRadius.value = String(cardStyle.radius);
    if (fpRadiusNum) fpRadiusNum.value = String(cardStyle.radius);
    if (fpOpacity) fpOpacity.value = String(Math.round(cardStyle.opacity * 100));
    if (fpOpacityNum) fpOpacityNum.value = String(Math.round(cardStyle.opacity * 100));
    if (fpShadow) fpShadow.value = String(cardStyle.shadow);
    if (fpShadowNum) fpShadowNum.value = String(cardStyle.shadow);

    if (textStyle) {
      if (window.setFontSelectValue && fpFontFamily) window.setFontSelectValue(fpFontFamily, textStyle.fontFamily);
      if (fpFontSize) fpFontSize.value = String(textStyle.fontSize);
      if (fpTextColor) fpTextColor.value = textStyle.textColor;
      if (fpBold) fpBold.checked = textStyle.bold;
      if (fpItalic) fpItalic.checked = textStyle.italic;
      if (fpStrike) fpStrike.checked = textStyle.strike;
      if (fpUnderline) fpUnderline.checked = textStyle.underline;
      if (window.setAlignButtons) window.setAlignButtons(textStyle.hAlign, textStyle.vAlign);
    }

    const hint = fpEl("bitrixCardFormatHint");
    if (hint) {
      hint.textContent = part === "value"
        ? "Форматирование: число"
        : part === "label"
          ? "Форматирование: подпись"
          : "Кликните по числу или подписи, чтобы форматировать текст. Вкладка «Стиль» — карточка.";
      hint.classList.remove("hidden");
    }
    if (window.updateFormatPanelVisuals) window.updateFormatPanelVisuals();
  }

  function applyCardFormatPanel(node, opts = {}) {
    const api = node && node.__cardApi;
    if (!api) return false;
    const formatSource = opts.source || null;
    const isTextControl = (id) => !formatSource || String(formatSource.id || "") === id || !formatSource.id;
    const part = getCardActiveTextPart(node);
    const cardEl = api.cardEl;
    const cfg = normalizeCardConfig(api.config);

    const fpFillEnabled = fpEl("fpFillEnabled");
    const fpGradientEnabled = fpEl("fpGradientEnabled");
    const fpFill = fpEl("fpFill");
    const fpFill2 = fpEl("fpFill2");
    const fpFillType = fpEl("fpFillType");
    const fpBorderEnabled = fpEl("fpBorderEnabled");
    const fpBorder = fpEl("fpBorder");
    const fpBorderWidth = fpEl("fpBorderWidth");
    const fpLineStyle = fpEl("fpLineStyle");
    const fpRadius = fpEl("fpRadius");
    const fpOpacity = fpEl("fpOpacity");
    const fpShadow = fpEl("fpShadow");
    const fpFontFamily = fpEl("fpFontFamily");
    const fpFontSize = fpEl("fpFontSize");
    const fpTextColor = fpEl("fpTextColor");
    const fpBold = fpEl("fpBold");
    const fpItalic = fpEl("fpItalic");
    const fpStrike = fpEl("fpStrike");
    const fpUnderline = fpEl("fpUnderline");

    const styleTarget = formatSource && ["fpFontFamily", "fpFontSize", "fpTextColor", "fpBold", "fpItalic", "fpStrike", "fpUnderline", "fpAlignLeft", "fpAlignCenter", "fpAlignRight"].includes(formatSource.id)
      ? "text"
      : (!formatSource || ["fpFillEnabled", "fpGradientEnabled", "fpFill", "fpFill2", "fpFillType", "fpBorderEnabled", "fpBorder", "fpBorderWidth", "fpLineStyle", "fpRadius", "fpOpacity", "fpShadow"].includes(formatSource.id) ? "card" : "both");

    if (styleTarget === "card" || styleTarget === "both") {
      cfg.cardStyle = normalizeCardStyle({
        fillEnabled: fpFillEnabled ? fpFillEnabled.checked : true,
        gradientEnabled: fpGradientEnabled ? fpGradientEnabled.checked : false,
        fill: fpFill ? fpFill.value : "#ffffff",
        fill2: fpFill2 ? fpFill2.value : (fpFill ? fpFill.value : "#ffffff"),
        fillDirection: fpFillType ? fpFillType.value : "horizontal",
        borderEnabled: fpBorderEnabled ? fpBorderEnabled.checked : true,
        border: fpBorder ? fpBorder.value : "#dbe4f0",
        borderWidth: fpBorderWidth ? Number(fpBorderWidth.value) || 1 : 1,
        borderStyle: fpLineStyle ? fpLineStyle.value : "solid",
        radius: fpRadius ? Number(fpRadius.value) || 14 : 14,
        opacity: fpOpacity ? Number(fpOpacity.value) / 100 : 1,
        shadow: fpShadow ? Number(fpShadow.value) || 0 : 0
      });
      applyCardContainerStyle(cardEl, cfg.cardStyle);
    }

    if ((styleTarget === "text" || styleTarget === "both") && part) {
      const textPatch = {
        fontFamily: fpFontFamily ? fpFontFamily.value : "Arial",
        fontSize: fpFontSize ? Number(fpFontSize.value) || 11 : 11,
        textColor: fpTextColor ? fpTextColor.value : "#334155",
        bold: fpBold ? fpBold.checked : false,
        italic: fpItalic ? fpItalic.checked : false,
        strike: fpStrike ? fpStrike.checked : false,
        underline: fpUnderline ? fpUnderline.checked : false
      };
      if (part === "value") {
        cfg.valueStyle = normalizeCardTextStyle(Object.assign({}, cfg.valueStyle, textPatch), defaultCardValueStyle);
        applyTextStyleToElement(api.valueEl, cfg.valueStyle);
      } else if (part === "label") {
        cfg.labelStyle = normalizeCardTextStyle(Object.assign({}, cfg.labelStyle, textPatch), defaultCardLabelStyle);
        applyTextStyleToElement(api.labelEl, cfg.labelStyle);
      }
    }

    api.config = cfg;
    node.dataset.cardConfig = JSON.stringify(cfg);
    return true;
  }

  function adjustCardFontSize(node, delta) {
    const part = getCardActiveTextPart(node);
    if (!part || !node.__cardApi) return false;
    const cfg = normalizeCardConfig(node.__cardApi.config);
    const key = part === "value" ? "valueStyle" : "labelStyle";
    const fallback = part === "value" ? defaultCardValueStyle : defaultCardLabelStyle;
    const next = normalizeCardTextStyle(cfg[key], fallback);
    next.fontSize = Math.max(8, Math.min(144, next.fontSize + delta));
    cfg[key] = next;
    applyTextStyleToElement(part === "value" ? node.__cardApi.valueEl : node.__cardApi.labelEl, next);
    node.__cardApi.config = cfg;
    node.dataset.cardConfig = JSON.stringify(cfg);
    if (window.syncFormatPanel) window.syncFormatPanel();
    if (window.saveLayout) window.saveLayout();
    return true;
  }

  function formatCardValue(value, metric) {
    const n = Number(value) || 0;
    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: metric === "sum" ? 2 : 0
    }).format(n);
  }

  function syncCardMetricUi(metricSelect, sumFieldSelect) {
    syncBitrixMetricUi(metricSelect, sumFieldSelect, "bitrixCardSumField");
  }

  function syncChartMetricUi(metricSelect, sumFieldSelect) {
    syncBitrixMetricUi(metricSelect, sumFieldSelect, "bitrixChartSumField");
  }

  function syncBitrixMetricUi(metricSelect, sumFieldSelect, sumFieldLabelFor) {
    const isSum = metricSelect.value === "sum";
    sumFieldSelect.disabled = !isSum;
    sumFieldSelect.closest(".bitrix-chart-config-grid")?.querySelector(`label[for="${sumFieldLabelFor}"]`)?.classList.toggle("bitrix-field-muted", !isSum);
  }

  function syncCardDateUi(useDatesInput, dateFromInput, dateToInput) {
    const enabled = !!useDatesInput.checked;
    dateFromInput.disabled = !enabled;
    dateToInput.disabled = !enabled;
  }

  function ensureChartConfigModal() {
    if (chartConfigModal) return chartConfigModal;
    chartConfigModal = $("bitrixChartConfigModal");
    if (!chartConfigModal) return null;

    const entitySelect = $("bitrixChartEntity");
    const pipelineSelect = $("bitrixChartPipeline");
    const stageSelect = $("bitrixChartStage");
    const granularitySelect = $("bitrixChartGranularity");
    const metricSelect = $("bitrixChartMetric");
    const sumFieldSelect = $("bitrixChartSumField");
    const dateFromInput = $("bitrixChartDateFrom");
    const dateToInput = $("bitrixChartDateTo");
    const titleInput = $("bitrixChartTitle");
    const errorEl = $("bitrixChartConfigError");
    const saveBtn = $("bitrixChartConfigSaveBtn");
    const cancelBtn = $("bitrixChartConfigCancelBtn");

    async function loadPipelines() {
      await loadBitrixPipelines(entitySelect.value, pipelineSelect, stageSelect, errorEl);
    }

    async function loadStages() {
      await loadBitrixStages(entitySelect.value, pipelineSelect, stageSelect, errorEl);
    }

    entitySelect.addEventListener("change", () => {
      loadPipelines().catch((err) => showBitrixError(errorEl, err));
      loadBitrixSumFields(entitySelect.value, sumFieldSelect).catch((err) => showBitrixError(errorEl, err));
    });
    pipelineSelect.addEventListener("change", () => {
      loadStages().catch((err) => showBitrixError(errorEl, err));
    });
    metricSelect.addEventListener("change", () => syncChartMetricUi(metricSelect, sumFieldSelect));

    function showChartConfigError(err) {
      showBitrixError(errorEl, err);
    }

    function clearChartConfigError() {
      clearBitrixError(errorEl);
    }

    async function openChartConfigModal(initialConfig) {
      clearChartConfigError();
      const cfg = normalizeChartConfig(initialConfig);
      entitySelect.value = cfg.entity;
      metricSelect.value = cfg.metric;
      granularitySelect.value = cfg.granularity;
      dateFromInput.value = cfg.dateFrom;
      dateToInput.value = cfg.dateTo;
      titleInput.value = cfg.title;
      syncChartMetricUi(metricSelect, sumFieldSelect);
      prefillBitrixConfigSelects(cfg, pipelineSelect, stageSelect, sumFieldSelect);
      chartConfigModal.classList.remove("hidden");
      try {
        await Promise.all([
          (async () => {
            await loadPipelines();
            if (cfg.categoryId != null) pipelineSelect.value = String(cfg.categoryId);
            await loadStages();
            if (cfg.stageId) stageSelect.value = cfg.stageId;
          })(),
          (async () => {
            await loadBitrixSumFields(entitySelect.value, sumFieldSelect);
            if (cfg.sumField) sumFieldSelect.value = cfg.sumField;
          })()
        ]);
      } catch (err) {
        showChartConfigError(err);
      }
      syncChartMetricUi(metricSelect, sumFieldSelect);
      return new Promise((resolve) => {
        chartConfigResolve = resolve;
      });
    }

    function closeChartConfigModal(result) {
      chartConfigModal.classList.add("hidden");
      const resolve = chartConfigResolve;
      chartConfigResolve = null;
      if (resolve) resolve(result || null);
    }

    cancelBtn.addEventListener("click", () => closeChartConfigModal(null));
    chartConfigModal.addEventListener("click", (e) => {
      if (e.target === chartConfigModal) closeChartConfigModal(null);
    });
    saveBtn.addEventListener("click", () => {
      const stageId = stageSelect.value;
      if (!stageId) {
        showChartConfigError("Выберите стадию воронки.");
        return;
      }
      const pipelineOption = pipelineSelect.selectedOptions[0];
      const stageOption = stageSelect.selectedOptions[0];
      const sumFieldOption = sumFieldSelect.selectedOptions[0];
      closeChartConfigModal(
        normalizeChartConfig({
          entity: entitySelect.value,
          categoryId: Number(pipelineSelect.value) || 0,
          categoryName: pipelineOption ? pipelineOption.textContent : "",
          stageId,
          stageName: stageOption ? stageOption.textContent : "",
          metric: metricSelect.value,
          sumField: sumFieldSelect.value || "OPPORTUNITY",
          sumFieldName: sumFieldOption ? sumFieldOption.textContent : "",
          granularity: granularitySelect.value,
          dateFrom: dateFromInput.value,
          dateTo: dateToInput.value,
          title: titleInput.value || (stageOption ? stageOption.textContent : "График")
        })
      );
    });

    chartConfigModal.__open = openChartConfigModal;
    return chartConfigModal;
  }

  async function promptChartConfig(initialConfig) {
    const modal = ensureChartConfigModal();
    if (!modal || !modal.__open) return null;
    return modal.__open(initialConfig);
  }

  function buildChartDom(node, config) {
    node.classList.add("shape-chart-widget");
    node.innerHTML = "";
    const card = document.createElement("div");
    card.className = "bitrix-chart-card";
    const header = document.createElement("div");
    header.className = "bitrix-chart-header";
    const headerText = document.createElement("div");
    headerText.className = "bitrix-chart-header-text";
    const title = document.createElement("div");
    title.className = "bitrix-chart-title";
    title.textContent = config.title || config.stageName || "График";
    const meta = document.createElement("div");
    meta.className = "bitrix-chart-meta";
    meta.textContent = [
      config.entity === "lead" ? "Лиды" : "Сделки",
      config.categoryName,
      config.stageName,
      config.granularity === "day" ? "день" : config.granularity === "month" ? "месяц" : "неделя"
    ].filter(Boolean).join(" · ");
    headerText.appendChild(title);
    headerText.appendChild(meta);
    const actions = document.createElement("div");
    actions.className = "bitrix-chart-actions";
    const refreshBtn = document.createElement("button");
    refreshBtn.type = "button";
    refreshBtn.className = "bitrix-chart-icon-btn";
    refreshBtn.title = "Обновить";
    refreshBtn.textContent = "↻";
    const settingsBtn = document.createElement("button");
    settingsBtn.type = "button";
    settingsBtn.className = "bitrix-chart-icon-btn";
    settingsBtn.title = "Настройки";
    settingsBtn.textContent = "⚙";
    actions.appendChild(refreshBtn);
    actions.appendChild(settingsBtn);
    header.appendChild(headerText);
    header.appendChild(actions);
    const legend = document.createElement("div");
    legend.className = "bitrix-chart-legend";
    const legendLabel = config.metric === "sum"
      ? (config.sumFieldName || config.sumField || "Сумма")
      : "all";
    legend.innerHTML = `<span class="bitrix-chart-legend-dot"></span><span>${legendLabel}</span>`;
    const body = document.createElement("div");
    body.className = "bitrix-chart-body";
    const canvas = document.createElement("canvas");
    canvas.className = "bitrix-chart-canvas";
    const status = document.createElement("div");
    status.className = "bitrix-chart-status";
    body.appendChild(canvas);
    body.appendChild(status);
    card.appendChild(header);
    card.appendChild(legend);
    card.appendChild(body);
    node.appendChild(card);

    node.__chartApi = {
      config: normalizeChartConfig(config),
      canvas,
      status,
      titleEl: title,
      metaEl: meta,
      refreshBtn,
      settingsBtn
    };

    refreshBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    settingsBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    refreshBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      refreshShapeChart(node);
    });
    settingsBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!canEditBitrixWidget()) return;
      const next = await promptChartConfig(node.__chartApi.config);
      if (!next) return;
      applyChartConfig(node, next, true);
    });
    node.addEventListener("dblclick", async (e) => {
      e.stopPropagation();
      if (!canEditBitrixWidget()) return;
      if (!e.target.closest(".bitrix-chart-header, .bitrix-chart-actions")) return;
      const next = await promptChartConfig(node.__chartApi.config);
      if (!next) return;
      applyChartConfig(node, next, true);
    });
  }

  function applyChartConfig(node, config, doSave) {
    const normalized = normalizeChartConfig(config);
    node.dataset.chartConfig = JSON.stringify(normalized);
    buildChartDom(node, normalized);
    refreshShapeChart(node);
    if (doSave && window.saveLayout) window.saveLayout();
  }

  async function refreshShapeChart(node) {
    const api = node && node.__chartApi;
    if (!api) return;
    const requestId = (api.refreshRequestId = (api.refreshRequestId || 0) + 1);
    const cfg = normalizeChartConfig(api.config);
    api.config = cfg;
    const dateRange = resolveShapeDateRange(node, cfg);
    api.titleEl.textContent = cfg.title || cfg.stageName || "График";
    api.metaEl.textContent = [
      cfg.entity === "lead" ? "Лиды" : "Сделки",
      cfg.categoryName,
      cfg.stageName,
      dateRange.fromFilter ? `фильтр: ${dateRange.dateFrom} — ${dateRange.dateTo}` : null
    ].filter(Boolean).join(" · ");
    api.status.textContent = "Загрузка…";
    api.status.classList.remove("hidden");
    try {
      const query = new URLSearchParams({
        entity: cfg.entity,
        categoryId: String(cfg.categoryId || 0),
        stageId: cfg.stageId,
        dateFrom: dateRange.dateFrom,
        dateTo: dateRange.dateTo,
        granularity: cfg.granularity,
        metric: cfg.metric,
        sumField: cfg.sumField || "OPPORTUNITY"
      });
      const data = await bitrixFetch(`/api/integrations/bitrix/chart-data?${query.toString()}`);
      if (api.refreshRequestId !== requestId) return;
      const points = filterChartPointsByDateRange(data.points || [], dateRange.dateFrom, dateRange.dateTo, cfg.granularity);
      renderLineChart(api.canvas, points, cfg);
      const total = points.reduce((sum, point) => sum + (Number(point.value) || 0), 0);
      api.status.textContent = `Всего: ${formatCardValue(total, cfg.metric)}`;
      api.status.classList.toggle("hidden", false);
    } catch (err) {
      if (api.refreshRequestId !== requestId) return;
      api.status.textContent = String((err && err.message) || "Ошибка загрузки");
      api.status.classList.remove("hidden");
      renderLineChart(api.canvas, [], cfg);
    }
  }

  function formatChartAxisLabel(label, granularity) {
    const isoDate = bucketLabelToIsoDate(label, granularity);
    const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return `${match[3]}.${match[2]}`;
    return String(label || "").trim();
  }

  function drawChartAxisLabel(ctx, text, x, baselineY) {
    ctx.save();
    ctx.translate(x, baselineY);
    ctx.rotate(-Math.PI / 4);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  function renderLineChart(canvas, points, config) {
    const width = Math.max(280, canvas.clientWidth || 360);
    const height = Math.max(140, canvas.clientHeight || 180);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const granularity = config && config.granularity ? config.granularity : "week";
    const pad = { top: 18, right: 12, bottom: 46, left: 12 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const values = points.map((p) => Number(p.value) || 0);
    const maxValue = Math.max(1, ...values, 1);

    ctx.strokeStyle = "#dbe4f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();

    if (!points.length) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Нет данных за период", width / 2, height / 2);
      return;
    }

    const stepX = points.length > 1 ? plotW / (points.length - 1) : 0;
    const coords = points.map((point, index) => {
      const value = Number(point.value) || 0;
      const x = pad.left + (points.length > 1 ? stepX * index : plotW / 2);
      const y = pad.top + plotH - (value / maxValue) * plotH;
      return { x, y, value, label: point.label };
    });

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();
    coords.forEach((pt, index) => {
      if (index === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    coords.forEach((pt, index) => {
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.font = "11px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(formatCardValue(pt.value, config && config.metric === "sum" ? "sum" : "count"), pt.x, pt.y - 8);
      if (index === 0 || index === coords.length - 1 || coords.length <= 8 || index % Math.ceil(coords.length / 6) === 0) {
        ctx.fillStyle = "#64748b";
        ctx.font = "10px Inter, system-ui, sans-serif";
        const axisLabel = formatChartAxisLabel(pt.label, granularity);
        drawChartAxisLabel(ctx, axisLabel, pt.x, pad.top + plotH + 6);
      }
    });
  }

  async function createShapeChart(opts = {}, doSave = true) {
    if (!window.createShapeBase) throw new Error("createShapeBase is not available");
    const node = window.createShapeBase("shape-chart", Object.assign({
      width: DEFAULT_CHART_WIDTH,
      height: DEFAULT_CHART_HEIGHT
    }, opts));
    node.style.border = "none";
    node.style.background = "transparent";
    node.style.boxShadow = "none";
    const initialConfig = normalizeChartConfig(opts.chartConfig || defaultChartConfig());
    if (!opts.chartConfig && (!window.isWorkspaceReadOnly || !window.isWorkspaceReadOnly())) {
      const chosen = await promptChartConfig(initialConfig);
      if (!chosen) {
        node.remove();
        return null;
      }
      Object.assign(initialConfig, chosen);
    }
    applyChartConfig(node, initialConfig, false);
    if (window.appendToDesktop) window.appendToDesktop(node);
    if (window.addShapeHandles) window.addShapeHandles(node);
    if (window.attachConnectorPoints) window.attachConnectorPoints(node);
    if (doSave && window.saveLayout) window.saveLayout();
    return node;
  }

  function readShapeChartExtras(node, base) {
    if (!node || node.dataset.shapeType !== "shape-chart") return base;
    let chartConfig = null;
    try {
      chartConfig = normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}"));
    } catch {
      chartConfig = node.__chartApi ? normalizeChartConfig(node.__chartApi.config) : defaultChartConfig();
    }
    return Object.assign({}, base, { chartConfig });
  }

  function restoreShapeChart(shapeData, doSave) {
    return createShapeChart(shapeData, doSave);
  }

  let cardConfigResolve = null;
  let cardConfigEditingBase = null;

  function ensureCardConfigModal() {
    if (cardConfigModal) return cardConfigModal;
    cardConfigModal = $("bitrixCardConfigModal");
    if (!cardConfigModal) return null;

    const entitySelect = $("bitrixCardEntity");
    const pipelineSelect = $("bitrixCardPipeline");
    const stageSelect = $("bitrixCardStage");
    const metricSelect = $("bitrixCardMetric");
    const sumFieldSelect = $("bitrixCardSumField");
    const useDatesInput = $("bitrixCardUseDates");
    const dateFromInput = $("bitrixCardDateFrom");
    const dateToInput = $("bitrixCardDateTo");
    const titleInput = $("bitrixCardTitle");
    const errorEl = $("bitrixCardConfigError");
    const saveBtn = $("bitrixCardConfigSaveBtn");
    const cancelBtn = $("bitrixCardConfigCancelBtn");

    bindBitrixEntitySelectors(
      {
        entitySelect,
        pipelineSelect,
        stageSelect,
        errorEl,
        onEntityChange: (entity) => {
          loadBitrixSumFields(entity, sumFieldSelect).catch((err) => showBitrixError(errorEl, err));
        }
      },
      { stageOptional: true }
    );

    metricSelect.addEventListener("change", () => syncCardMetricUi(metricSelect, sumFieldSelect));
    useDatesInput.addEventListener("change", () => syncCardDateUi(useDatesInput, dateFromInput, dateToInput));

    async function openCardConfigModal(initialConfig) {
      clearBitrixError(errorEl);
      const cfg = normalizeCardConfig(initialConfig);
      cardConfigEditingBase = cfg;
      entitySelect.value = cfg.entity;
      metricSelect.value = cfg.metric;
      useDatesInput.checked = cfg.useDates;
      dateFromInput.value = cfg.dateFrom;
      dateToInput.value = cfg.dateTo;
      titleInput.value = cfg.title;
      syncCardMetricUi(metricSelect, sumFieldSelect);
      syncCardDateUi(useDatesInput, dateFromInput, dateToInput);
      prefillBitrixConfigSelects(cfg, pipelineSelect, stageSelect, sumFieldSelect, { stageOptional: true });
      cardConfigModal.classList.remove("hidden");
      try {
        await Promise.all([
          (async () => {
            await loadBitrixPipelines(entitySelect.value, pipelineSelect, stageSelect, errorEl, { stageOptional: true });
            if (cfg.categoryId != null) pipelineSelect.value = String(cfg.categoryId);
            await loadBitrixStages(entitySelect.value, pipelineSelect, stageSelect, errorEl, { stageOptional: true });
            if (cfg.stageId) stageSelect.value = cfg.stageId;
          })(),
          (async () => {
            await loadBitrixSumFields(entitySelect.value, sumFieldSelect);
            if (cfg.sumField) sumFieldSelect.value = cfg.sumField;
          })()
        ]);
      } catch (err) {
        showBitrixError(errorEl, err);
      }
      syncCardMetricUi(metricSelect, sumFieldSelect);
      return new Promise((resolve) => {
        cardConfigResolve = resolve;
      });
    }

    function closeCardConfigModal(result) {
      cardConfigModal.classList.add("hidden");
      const resolve = cardConfigResolve;
      cardConfigResolve = null;
      if (resolve) resolve(result || null);
    }

    cancelBtn.addEventListener("click", () => closeCardConfigModal(null));
    cardConfigModal.addEventListener("click", (e) => {
      if (e.target === cardConfigModal) closeCardConfigModal(null);
    });
    saveBtn.addEventListener("click", () => {
      const pipelineOption = pipelineSelect.selectedOptions[0];
      const stageOption = stageSelect.selectedOptions[0];
      const sumFieldOption = sumFieldSelect.selectedOptions[0];
      closeCardConfigModal(
        normalizeCardConfig(Object.assign({}, cardConfigEditingBase || {}, {
          entity: entitySelect.value,
          categoryId: Number(pipelineSelect.value) || 0,
          categoryName: pipelineOption ? pipelineOption.textContent : "",
          stageId: stageSelect.value,
          stageName: stageOption && stageOption.value ? stageOption.textContent : "",
          metric: metricSelect.value,
          sumField: sumFieldSelect.value || "OPPORTUNITY",
          sumFieldName: sumFieldOption ? sumFieldOption.textContent : "",
          useDates: useDatesInput.checked,
          dateFrom: dateFromInput.value,
          dateTo: dateToInput.value,
          title: titleInput.value || (stageOption && stageOption.value ? stageOption.textContent : "Карточка")
        }))
      );
    });

    cardConfigModal.__open = openCardConfigModal;
    return cardConfigModal;
  }

  async function promptCardConfig(initialConfig) {
    const modal = ensureCardConfigModal();
    if (!modal || !modal.__open) return null;
    return modal.__open(initialConfig);
  }

  function buildCardDom(node, config) {
    node.classList.add("shape-bitrix-card-widget");
    node.innerHTML = "";
    const cfg = normalizeCardConfig(config);
    const card = document.createElement("div");
    card.className = "bitrix-kpi-card";
    const actions = document.createElement("div");
    actions.className = "bitrix-kpi-actions";
    const refreshBtn = document.createElement("button");
    refreshBtn.type = "button";
    refreshBtn.className = "bitrix-chart-icon-btn";
    refreshBtn.title = "Обновить";
    refreshBtn.textContent = "↻";
    const settingsBtn = document.createElement("button");
    settingsBtn.type = "button";
    settingsBtn.className = "bitrix-chart-icon-btn";
    settingsBtn.title = "Настройки Bitrix24";
    settingsBtn.textContent = "⚙";
    actions.appendChild(refreshBtn);
    actions.appendChild(settingsBtn);
    const valueEl = document.createElement("div");
    valueEl.className = "bitrix-kpi-value";
    const cachedValue = Number.isFinite(Number(cfg.lastValue)) ? Number(cfg.lastValue) : null;
    valueEl.textContent = cachedValue != null ? formatCardValue(cachedValue, cfg.metric) : "—";
    const labelEl = document.createElement("div");
    labelEl.className = "bitrix-kpi-label";
    labelEl.textContent = cfg.title || cfg.stageName || "Карточка";
    const statusEl = document.createElement("div");
    statusEl.className = "bitrix-kpi-status hidden";
    card.appendChild(actions);
    card.appendChild(valueEl);
    card.appendChild(labelEl);
    card.appendChild(statusEl);
    node.appendChild(card);

    applyCardContainerStyle(card, cfg.cardStyle);
    applyTextStyleToElement(valueEl, cfg.valueStyle);
    applyTextStyleToElement(labelEl, cfg.labelStyle);

    const activePart = getCardActiveTextPart(node);
    valueEl.classList.toggle("bitrix-kpi-text-active", activePart === "value");
    labelEl.classList.toggle("bitrix-kpi-text-active", activePart === "label");

    node.__cardApi = {
      config: cfg,
      cardEl: card,
      valueEl,
      labelEl,
      statusEl,
      refreshBtn,
      settingsBtn,
      lastValue: cachedValue,
      syncToFormatPanel: () => syncCardFormatPanel(node),
      applyFromFormatPanel: (opts) => applyCardFormatPanel(node, opts)
    };
    if (cachedValue != null) {
      node.dataset.bitrixCardValue = String(cachedValue);
    }

    refreshBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    settingsBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    refreshBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      refreshShapeCard(node);
    });
    settingsBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!canEditBitrixWidget()) return;
      const next = await promptCardConfig(node.__cardApi.config);
      if (!next) return;
      applyCardConfig(node, next, true);
    });
    valueEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (typeof window.isActiveFormulaEditing === "function" && window.isActiveFormulaEditing()) return;
      e.stopPropagation();
      selectCardTextPart(node, "value");
      if (window.selectShape) window.selectShape(node);
    });
    labelEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (typeof window.isActiveFormulaEditing === "function" && window.isActiveFormulaEditing()) return;
      e.stopPropagation();
      selectCardTextPart(node, "label");
      if (window.selectShape) window.selectShape(node);
    });
    valueEl.addEventListener("click", (e) => {
      if (typeof window.isActiveFormulaEditing === "function" && window.isActiveFormulaEditing()) return;
      e.stopPropagation();
      selectCardTextPart(node, "value");
    });
    labelEl.addEventListener("click", (e) => {
      if (typeof window.isActiveFormulaEditing === "function" && window.isActiveFormulaEditing()) return;
      e.stopPropagation();
      selectCardTextPart(node, "label");
    });
    labelEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      e.preventDefault();
      startCardLabelEdit(node, labelEl);
    });
    valueEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      e.preventDefault();
      selectCardTextPart(node, "value");
      if (window.openFormatTab) window.openFormatTab("text");
      if (window.showFormatPanel) window.showFormatPanel();
    });
    card.addEventListener("click", (e) => {
      if (e.target === card || e.target === statusEl) {
        e.stopPropagation();
        selectCardTextPart(node, "");
      }
    });
    attachBitrixCardInteractions(node);
  }

  function applyCardConfig(node, config, doSave) {
    const normalized = normalizeCardConfig(config);
    node.dataset.cardConfig = JSON.stringify(normalized);
    buildCardDom(node, normalized);
    refreshShapeCard(node);
    if (doSave && window.saveLayout) window.saveLayout();
  }

  async function refreshShapeCard(node) {
    const api = node && node.__cardApi;
    if (!api) return;
    const requestId = (api.refreshRequestId = (api.refreshRequestId || 0) + 1);
    const cfg = normalizeCardConfig(api.config);
    api.config = cfg;
    if (!api.labelEl.dataset.editing) {
      api.labelEl.textContent = cfg.title || cfg.stageName || "Карточка";
    }
    api.valueEl.textContent = "…";
    api.statusEl.textContent = "Загрузка…";
    api.statusEl.classList.remove("hidden");
    try {
      const dateRange = resolveShapeDateRange(node, cfg);
      const useDates = dateRange.fromFilter ? true : cfg.useDates;
      const query = new URLSearchParams({
        entity: cfg.entity,
        categoryId: String(cfg.categoryId || 0),
        stageId: cfg.stageId || "",
        metric: cfg.metric,
        sumField: cfg.sumField || "OPPORTUNITY"
      });
      if (useDates) {
        query.set("dateFrom", dateRange.fromFilter ? dateRange.dateFrom : cfg.dateFrom);
        query.set("dateTo", dateRange.fromFilter ? dateRange.dateTo : cfg.dateTo);
      }
      const data = await bitrixFetch(`/api/integrations/bitrix/card-data?${query.toString()}`);
      if (api.refreshRequestId !== requestId) return;
      api.valueEl.textContent = formatCardValue(data.value, cfg.metric);
      setBitrixCardLastValue(node, data.value);
      api.statusEl.classList.add("hidden");
    } catch (err) {
      if (api.refreshRequestId !== requestId) return;
      api.valueEl.textContent = "—";
      setBitrixCardLastValue(node, 0);
      api.statusEl.textContent = String((err && err.message) || "Ошибка");
      api.statusEl.classList.remove("hidden");
    }
  }

  async function createShapeCard(opts = {}, doSave = true) {
    if (!window.createShapeBase) throw new Error("createShapeBase is not available");
    const node = window.createShapeBase("shape-bitrix-card", Object.assign({
      width: DEFAULT_CARD_WIDTH,
      height: DEFAULT_CARD_HEIGHT
    }, opts));
    node.style.border = "none";
    node.style.background = "transparent";
    node.style.boxShadow = "none";
    const initialConfig = normalizeCardConfig(opts.cardConfig || defaultCardConfig());
    if (!opts.cardConfig && (!window.isWorkspaceReadOnly || !window.isWorkspaceReadOnly())) {
      const chosen = await promptCardConfig(initialConfig);
      if (!chosen) {
        node.remove();
        return null;
      }
      Object.assign(initialConfig, chosen);
    }
    applyCardConfig(node, initialConfig, false);
    if (window.appendToDesktop) window.appendToDesktop(node);
    if (window.addShapeHandles) window.addShapeHandles(node);
    if (window.attachConnectorPoints) window.attachConnectorPoints(node);
    if (doSave && window.saveLayout) window.saveLayout();
    return node;
  }

  function readShapeCardExtras(node, base) {
    if (!node || node.dataset.shapeType !== "shape-bitrix-card") return base;
    let cardConfig = null;
    try {
      cardConfig = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
    } catch {
      cardConfig = node.__cardApi ? normalizeCardConfig(node.__cardApi.config) : defaultCardConfig();
    }
    return Object.assign({}, base, { cardConfig });
  }

  function restoreShapeCard(shapeData, doSave) {
    return createShapeCard(shapeData, doSave);
  }

  function readBitrixShapeExtras(node, base) {
    if (node.dataset.shapeType === "shape-chart") return readShapeChartExtras(node, base);
    if (node.dataset.shapeType === "shape-bitrix-card") return readShapeCardExtras(node, base);
    if (node.dataset.shapeType === "shape-bitrix-date-filter") return readShapeFilterExtras(node, base);
    return base;
  }

  function defaultFilterConfig() {
    const dates = defaultDateRange();
    return {
      title: "Дата",
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
      excludedShapeIds: []
    };
  }

  function normalizeFilterConfig(raw) {
    const base = defaultFilterConfig();
    if (!raw || typeof raw !== "object") return base;
    const excluded = Array.isArray(raw.excludedShapeIds)
      ? raw.excludedShapeIds.map((id) => String(id || "").trim()).filter(Boolean)
      : [];
    return {
      title: String(raw.title || base.title),
      dateFrom: String(raw.dateFrom || base.dateFrom),
      dateTo: String(raw.dateTo || base.dateTo),
      excludedShapeIds: excluded
    };
  }

  function getFilterConfigFromNode(node) {
    if (!node) return defaultFilterConfig();
    if (node.__filterApi && node.__filterApi.config) return normalizeFilterConfig(node.__filterApi.config);
    try {
      return normalizeFilterConfig(JSON.parse(node.dataset.filterConfig || "{}"));
    } catch {
      return defaultFilterConfig();
    }
  }

  function getBitrixFilterableShapes() {
    return Array.from(document.querySelectorAll('.shape[data-shape-type="shape-chart"], .shape[data-shape-type="shape-bitrix-card"]'));
  }

  function describeBitrixShapeForFilter(node) {
    if (!node) return "Элемент Bitrix24";
    const type = node.dataset.shapeType === "shape-chart" ? "График" : "Карточка";
    let title = "";
    try {
      if (node.dataset.shapeType === "shape-chart") {
        title = normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}")).title;
      } else {
        title = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}")).title;
      }
    } catch {
      /* ignore */
    }
    return `${type}${title ? `: ${title}` : ""}`;
  }

  function getEffectiveDateFilterForShape(targetNode) {
    if (!targetNode || !targetNode.dataset.shapeId) return null;
    const targetId = String(targetNode.dataset.shapeId).trim();
    const filters = Array.from(document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]'));
    for (const filterNode of filters) {
      const cfg = getFilterConfigFromNode(filterNode);
      const excluded = (cfg.excludedShapeIds || []).map((id) => String(id || "").trim());
      if (excluded.includes(targetId)) continue;
      return { dateFrom: cfg.dateFrom, dateTo: cfg.dateTo, filterNode };
    }
    return null;
  }

  function resolveShapeDateRange(node, cfg) {
    const filterDates = getEffectiveDateFilterForShape(node);
    if (filterDates) {
      return {
        dateFrom: filterDates.dateFrom,
        dateTo: filterDates.dateTo,
        fromFilter: true
      };
    }
    return {
      dateFrom: cfg.dateFrom,
      dateTo: cfg.dateTo,
      fromFilter: false
    };
  }

  function bucketLabelToIsoDate(label, granularity) {
    const text = String(label || "").trim();
    if (!text) return "";
    if (granularity === "day") return text;
    if (granularity === "month") return `${text}-01`;
    const match = text.match(/^(\d{4})-W(\d{1,2})$/i);
    if (!match) return text;
    const year = Number(match[1]);
    const week = Number(match[2]);
    if (!Number.isFinite(year) || !Number.isFinite(week)) return text;
    const jan4 = new Date(Date.UTC(year, 0, 4));
    const jan4Day = jan4.getUTCDay() || 7;
    const monday = new Date(jan4);
    monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (week - 1) * 7);
    return monday.toISOString().slice(0, 10);
  }

  function filterChartPointsByDateRange(points, dateFrom, dateTo, granularity) {
    const from = String(dateFrom || "").trim();
    const to = String(dateTo || "").trim();
    if (!from && !to) return Array.isArray(points) ? points.slice() : [];
    return (points || []).filter((point) => {
      const bucketDate = bucketLabelToIsoDate(point.label, granularity);
      if (!bucketDate) return true;
      if (from && bucketDate < from) return false;
      if (to && bucketDate > to) return false;
      return true;
    });
  }

  function getFilterSliderMaxDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function clampIsoDate(value, minStr, maxStr) {
    const min = new Date(minStr).getTime();
    const max = new Date(maxStr).getTime();
    const raw = new Date(String(value || "")).getTime();
    if (!Number.isFinite(raw)) return minStr;
    const clamped = Math.max(min, Math.min(max, raw));
    return new Date(clamped).toISOString().slice(0, 10);
  }

  function dateToSliderRatio(dateStr, minStr, maxStr) {
    const min = new Date(minStr).getTime();
    const max = new Date(maxStr).getTime();
    const val = new Date(dateStr).getTime();
    if (!Number.isFinite(val) || max <= min) return 0;
    return Math.max(0, Math.min(1, (val - min) / (max - min)));
  }

  function sliderRatioToDate(ratio, minStr, maxStr) {
    const min = new Date(minStr).getTime();
    const max = new Date(maxStr).getTime();
    const safe = Math.max(0, Math.min(1, Number(ratio) || 0));
    return new Date(min + safe * (max - min)).toISOString().slice(0, 10);
  }

  function syncFilterSliderUi(node) {
    const api = node && node.__filterApi;
    if (!api) return;
    const cfg = getFilterConfigFromNode(node);
    const minStr = FILTER_SLIDER_MIN_DATE;
    const maxStr = getFilterSliderMaxDate();
    const fromRatio = dateToSliderRatio(cfg.dateFrom, minStr, maxStr);
    const toRatio = dateToSliderRatio(cfg.dateTo, minStr, maxStr);
    const left = Math.min(fromRatio, toRatio) * 100;
    const right = Math.max(fromRatio, toRatio) * 100;
    api.rangeEl.style.left = `${left}%`;
    api.rangeEl.style.width = `${Math.max(0, right - left)}%`;
    api.handleFrom.style.left = `${fromRatio * 100}%`;
    api.handleTo.style.left = `${toRatio * 100}%`;
    if (api.dateFromInput.value !== cfg.dateFrom) api.dateFromInput.value = cfg.dateFrom;
    if (api.dateToInput.value !== cfg.dateTo) api.dateToInput.value = cfg.dateTo;
    if (api.titleEl.textContent !== cfg.title) api.titleEl.textContent = cfg.title;
  }

  function persistFilterConfig(node, config, doSave) {
    const normalized = normalizeFilterConfig(config);
    node.dataset.filterConfig = JSON.stringify(normalized);
    if (node.__filterApi) {
      node.__filterApi.config = normalized;
      syncFilterSliderUi(node);
    }
    if (doSave && window.saveLayout) window.saveLayout();
    return normalized;
  }

  function refreshFilterTargets(_filterNode) {
    refreshAllBitrixWidgets();
  }

  async function refreshAllBitrixWidgets() {
    const charts = Array.from(document.querySelectorAll('.shape[data-shape-type="shape-chart"]'));
    const cards = Array.from(document.querySelectorAll('.shape[data-shape-type="shape-bitrix-card"]'));
    await Promise.all([
      ...charts.map((node) => refreshShapeChart(node)),
      ...cards.map((node) => refreshShapeCard(node))
    ]);
  }

  function applyFilterDateRange(node, patch, opts = {}) {
    const doSave = opts.doSave !== false;
    const doRefresh = opts.doRefresh !== false;
    const cfg = normalizeFilterConfig(Object.assign({}, getFilterConfigFromNode(node), patch));
    const minStr = FILTER_SLIDER_MIN_DATE;
    const maxStr = getFilterSliderMaxDate();
    cfg.dateFrom = clampIsoDate(cfg.dateFrom, minStr, maxStr);
    cfg.dateTo = clampIsoDate(cfg.dateTo, minStr, maxStr);
    if (new Date(cfg.dateFrom).getTime() > new Date(cfg.dateTo).getTime()) {
      const tmp = cfg.dateFrom;
      cfg.dateFrom = cfg.dateTo;
      cfg.dateTo = tmp;
    }
    persistFilterConfig(node, cfg, doSave);
    if (doRefresh) refreshFilterTargets(node);
  }

  function bindFilterSlider(node) {
    const api = node.__filterApi;
    if (!api || api.sliderBound) return;
    api.sliderBound = true;
    const minStr = FILTER_SLIDER_MIN_DATE;
    const maxStr = getFilterSliderMaxDate();

    const startDrag = (handleKey, event) => {
      if (!canEditBitrixWidget()) return;
      event.preventDefault();
      event.stopPropagation();
      const track = api.trackEl;
      const rect = track.getBoundingClientRect();
      const move = (e) => {
        const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) : 0;
        const date = sliderRatioToDate(ratio, minStr, maxStr);
        const cfg = getFilterConfigFromNode(node);
        if (handleKey === "from") applyFilterDateRange(node, { dateFrom: date, dateTo: cfg.dateTo }, { doSave: false, doRefresh: false });
        else applyFilterDateRange(node, { dateFrom: cfg.dateFrom, dateTo: date }, { doSave: false, doRefresh: false });
      };
      const stop = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", stop);
        document.removeEventListener("pointercancel", stop);
        refreshFilterTargets(node);
        if (window.saveLayout) window.saveLayout();
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", stop);
      document.addEventListener("pointercancel", stop);
      move(event);
    };

    api.handleFrom.addEventListener("pointerdown", (e) => startDrag("from", e));
    api.handleTo.addEventListener("pointerdown", (e) => startDrag("to", e));
    api.trackEl.addEventListener("pointerdown", (e) => {
      if (e.target !== api.trackEl) return;
      if (!canEditBitrixWidget()) return;
      const rect = api.trackEl.getBoundingClientRect();
      const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) : 0;
      const date = sliderRatioToDate(ratio, minStr, maxStr);
      const cfg = getFilterConfigFromNode(node);
      const fromDist = Math.abs(dateToSliderRatio(cfg.dateFrom, minStr, maxStr) - ratio);
      const toDist = Math.abs(dateToSliderRatio(cfg.dateTo, minStr, maxStr) - ratio);
      if (fromDist <= toDist) applyFilterDateRange(node, { dateFrom: date, dateTo: cfg.dateTo });
      else applyFilterDateRange(node, { dateFrom: cfg.dateFrom, dateTo: date });
    });
  }

  function buildFilterDom(node, config) {
    node.classList.add("shape-bitrix-date-filter-widget");
    node.innerHTML = "";
    const cfg = normalizeFilterConfig(config);
    const card = document.createElement("div");
    card.className = "bitrix-date-filter-card";

    const header = document.createElement("div");
    header.className = "bitrix-date-filter-header";
    const titleEl = document.createElement("div");
    titleEl.className = "bitrix-date-filter-title";
    titleEl.textContent = cfg.title || "Дата";
    const actions = document.createElement("div");
    actions.className = "bitrix-date-filter-actions";
    const settingsBtn = document.createElement("button");
    settingsBtn.type = "button";
    settingsBtn.className = "bitrix-chart-icon-btn";
    settingsBtn.title = "Настройки фильтра";
    settingsBtn.textContent = "⚙";
    actions.appendChild(settingsBtn);
    header.appendChild(titleEl);
    header.appendChild(actions);

    const inputs = document.createElement("div");
    inputs.className = "bitrix-date-filter-inputs";
    const dateFromInput = document.createElement("input");
    dateFromInput.type = "date";
    dateFromInput.className = "bitrix-date-filter-input";
    dateFromInput.value = cfg.dateFrom;
    const dateToInput = document.createElement("input");
    dateToInput.type = "date";
    dateToInput.className = "bitrix-date-filter-input";
    dateToInput.value = cfg.dateTo;
    inputs.appendChild(dateFromInput);
    inputs.appendChild(dateToInput);

    const slider = document.createElement("div");
    slider.className = "bitrix-date-filter-slider";
    const track = document.createElement("div");
    track.className = "bitrix-date-slider-track";
    const range = document.createElement("div");
    range.className = "bitrix-date-slider-range";
    const handleFrom = document.createElement("button");
    handleFrom.type = "button";
    handleFrom.className = "bitrix-date-slider-handle bitrix-date-slider-handle-from";
    handleFrom.setAttribute("aria-label", "Дата начала");
    const handleTo = document.createElement("button");
    handleTo.type = "button";
    handleTo.className = "bitrix-date-slider-handle bitrix-date-slider-handle-to";
    handleTo.setAttribute("aria-label", "Дата окончания");
    track.appendChild(range);
    track.appendChild(handleFrom);
    track.appendChild(handleTo);
    slider.appendChild(track);

    card.appendChild(header);
    card.appendChild(inputs);
    card.appendChild(slider);
    node.appendChild(card);

    node.__filterApi = {
      config: cfg,
      cardEl: card,
      titleEl,
      settingsBtn,
      dateFromInput,
      dateToInput,
      trackEl: track,
      rangeEl: range,
      handleFrom,
      handleTo
    };

    settingsBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    settingsBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!canEditBitrixWidget()) return;
      const next = await promptDateFilterConfig(node);
      if (!next) return;
      persistFilterConfig(node, next, true);
      refreshFilterTargets(node);
    });

    const onDateInputChange = () => {
      applyFilterDateRange(node, {
        dateFrom: dateFromInput.value,
        dateTo: dateToInput.value
      });
    };
    dateFromInput.addEventListener("input", (e) => {
      e.stopPropagation();
      onDateInputChange();
    });
    dateFromInput.addEventListener("change", (e) => {
      e.stopPropagation();
      onDateInputChange();
    });
    dateToInput.addEventListener("input", (e) => {
      e.stopPropagation();
      onDateInputChange();
    });
    dateToInput.addEventListener("change", (e) => {
      e.stopPropagation();
      onDateInputChange();
    });
    [dateFromInput, dateToInput, track, handleFrom, handleTo].forEach((el) => {
      el.addEventListener("pointerdown", (e) => e.stopPropagation());
    });

    bindFilterSlider(node);
    syncFilterSliderUi(node);
  }

  function applyFilterConfig(node, config, doSave) {
    const normalized = normalizeFilterConfig(config);
    node.dataset.filterConfig = JSON.stringify(normalized);
    buildFilterDom(node, normalized);
    if (doSave && window.saveLayout) window.saveLayout();
  }

  let dateFilterConfigResolve = null;
  let dateFilterEditingNode = null;

  function ensureDateFilterConfigModal() {
    if (dateFilterConfigModal) return dateFilterConfigModal;
    dateFilterConfigModal = $("bitrixDateFilterConfigModal");
    if (!dateFilterConfigModal) return null;

    const listEl = $("bitrixDateFilterTargetList");
    const saveBtn = $("bitrixDateFilterConfigSaveBtn");
    const cancelBtn = $("bitrixDateFilterConfigCancelBtn");

    function closeDateFilterConfigModal(result) {
      dateFilterConfigModal.classList.add("hidden");
      const resolve = dateFilterConfigResolve;
      dateFilterConfigResolve = null;
      dateFilterEditingNode = null;
      if (resolve) resolve(result || null);
    }

    async function openDateFilterConfigModal(filterNode) {
      const cfg = getFilterConfigFromNode(filterNode);
      dateFilterEditingNode = filterNode;
      if (listEl) {
        listEl.innerHTML = "";
        const shapes = getBitrixFilterableShapes();
        if (!shapes.length) {
          const empty = document.createElement("div");
          empty.className = "bitrix-date-filter-empty";
          empty.textContent = "На рабочем столе пока нет графиков и карточек Bitrix24.";
          listEl.appendChild(empty);
        } else {
          shapes.forEach((shape) => {
            const shapeId = String(shape.dataset.shapeId || "");
            const row = document.createElement("label");
            row.className = "bitrix-date-filter-target-row";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.dataset.shapeId = shapeId;
            input.checked = !cfg.excludedShapeIds.map(String).includes(shapeId);
            const text = document.createElement("span");
            text.textContent = describeBitrixShapeForFilter(shape);
            row.appendChild(input);
            row.appendChild(text);
            listEl.appendChild(row);
          });
        }
      }
      dateFilterConfigModal.classList.remove("hidden");
      return new Promise((resolve) => {
        dateFilterConfigResolve = resolve;
      });
    }

    cancelBtn.addEventListener("click", () => closeDateFilterConfigModal(null));
    dateFilterConfigModal.addEventListener("click", (e) => {
      if (e.target === dateFilterConfigModal) closeDateFilterConfigModal(null);
    });
    saveBtn.addEventListener("click", () => {
      const excluded = [];
      if (listEl) {
        listEl.querySelectorAll('input[type="checkbox"][data-shape-id]').forEach((input) => {
          if (!input.checked) excluded.push(String(input.dataset.shapeId || ""));
        });
      }
      const base = dateFilterEditingNode ? getFilterConfigFromNode(dateFilterEditingNode) : defaultFilterConfig();
      closeDateFilterConfigModal(normalizeFilterConfig(Object.assign({}, base, { excludedShapeIds: excluded })));
    });

    dateFilterConfigModal.__open = openDateFilterConfigModal;
    return dateFilterConfigModal;
  }

  async function promptDateFilterConfig(filterNode) {
    const modal = ensureDateFilterConfigModal();
    if (!modal || !modal.__open) return null;
    return modal.__open(filterNode);
  }

  async function createShapeDateFilter(opts = {}, doSave = true) {
    if (!window.createShapeBase) throw new Error("createShapeBase is not available");
    const node = window.createShapeBase("shape-bitrix-date-filter", Object.assign({
      width: DEFAULT_FILTER_WIDTH,
      height: DEFAULT_FILTER_HEIGHT
    }, opts));
    node.style.border = "none";
    node.style.background = "transparent";
    node.style.boxShadow = "none";
    const initialConfig = normalizeFilterConfig(opts.filterConfig || defaultFilterConfig());
    applyFilterConfig(node, initialConfig, false);
    if (window.appendToDesktop) window.appendToDesktop(node);
    if (window.addShapeHandles) window.addShapeHandles(node);
    if (window.attachConnectorPoints) window.attachConnectorPoints(node);
    refreshFilterTargets(node);
    if (doSave && window.saveLayout) window.saveLayout();
    return node;
  }

  function readShapeFilterExtras(node, base) {
    if (!node || node.dataset.shapeType !== "shape-bitrix-date-filter") return base;
    let filterConfig = null;
    try {
      filterConfig = normalizeFilterConfig(JSON.parse(node.dataset.filterConfig || "{}"));
    } catch {
      filterConfig = node.__filterApi ? normalizeFilterConfig(node.__filterApi.config) : defaultFilterConfig();
    }
    return Object.assign({}, base, { filterConfig });
  }

  function restoreShapeDateFilter(shapeData, doSave) {
    return createShapeDateFilter(shapeData, doSave);
  }

  async function syncBitrixProfileUi() {
    const statusEl = $("bitrixIntegrationStatus");
    const inputEl = $("bitrixWebhookInput");
    const connectBtn = $("bitrixConnectBtn");
    const disconnectBtn = $("bitrixDisconnectBtn");
    if (!statusEl || !inputEl) return;
    try {
      const status = await loadBitrixStatus();
      if (status.connected) {
        statusEl.textContent = status.domain
          ? `Подключено: ${status.domain} (${status.webhookMasked || ""})`
          : "Подключено";
      } else if (!window.currentUser && getGuestWebhook()) {
        statusEl.textContent = `Гостевой webhook: ${maskWebhook(getGuestWebhook())}`;
        inputEl.value = getGuestWebhook();
      } else {
        statusEl.textContent = "Bitrix24 не подключён";
      }
      if (disconnectBtn) disconnectBtn.disabled = !status.connected && !getGuestWebhook();
    } catch (err) {
      statusEl.textContent = String((err && err.message) || "Не удалось проверить подключение");
    }
    if (connectBtn) {
      connectBtn.onclick = async () => {
        const webhookUrl = String(inputEl.value || "").trim();
        if (!webhookUrl) {
          statusEl.textContent = "Вставьте URL входящего webhook из Bitrix24.";
          return;
        }
        try {
          const result = await saveBitrixWebhook(webhookUrl);
          statusEl.textContent = result.domain
            ? `Подключено: ${result.domain}`
            : "Подключено";
          if (disconnectBtn) disconnectBtn.disabled = false;
          if (window.showHint) window.showHint("Bitrix24 подключён", "success");
        } catch (err) {
          statusEl.textContent = String((err && err.message) || "Ошибка подключения");
        }
      };
    }
    if (disconnectBtn) {
      disconnectBtn.onclick = async () => {
        try {
          await disconnectBitrix();
          inputEl.value = "";
          statusEl.textContent = "Bitrix24 не подключён";
          disconnectBtn.disabled = true;
          if (window.showHint) window.showHint("Bitrix24 отключён", "success");
        } catch (err) {
          statusEl.textContent = String((err && err.message) || "Ошибка отключения");
        }
      };
    }
  }

  const clearBitrixCardTextSelection = clearAllBitrixCardTextSelections;

  window.BitrixChart = {
    createShapeChart,
    createShapeCard,
    createShapeDateFilter,
    restoreShapeChart,
    restoreShapeCard,
    restoreShapeDateFilter,
    readBitrixShapeExtras,
    readShapeChartExtras,
    readShapeCardExtras,
    readShapeFilterExtras,
    refreshShapeChart,
    refreshShapeCard,
    refreshAllCharts: refreshAllBitrixWidgets,
    refreshAllBitrixWidgets,
    refreshFilterTargets,
    getEffectiveDateFilterForShape,
    syncCardFormatPanel,
    applyCardFormatPanel,
    adjustCardFontSize,
    selectCardTextPart,
    clearBitrixCardTextSelection,
    clearBitrixCardTextPart,
    clearAllBitrixCardTextSelections,
    applyCardTextAlign,
    getCardActiveTextPart: getCardActiveTextPartPublic,
    getBitrixCardFormulaValue,
    setBitrixCardLastValue,
    syncBitrixProfileUi,
    promptChartConfig,
    promptCardConfig,
    promptDateFilterConfig
  };

  const originalOpenProfileModal = window.openProfileModal;
  if (typeof originalOpenProfileModal === "function") {
    window.openProfileModal = function patchedOpenProfileModal() {
      originalOpenProfileModal();
      syncBitrixProfileUi();
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const guestProfileBtn = $("profileBtn");
    if (guestProfileBtn) {
      guestProfileBtn.addEventListener("click", () => {
        setTimeout(() => syncBitrixProfileUi(), 0);
      });
    }
    if (getGuestWebhook() || window.currentUser) {
      prefetchBitrixMeta("deal");
    }
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll('.shape[data-shape-type="shape-chart"] .bitrix-chart-canvas').forEach((canvas) => {
      const node = canvas.closest('.shape[data-shape-type="shape-chart"]');
      if (node) refreshShapeChart(node);
    });
  });
})();
