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
  const BITRIX_FILTER_DATE_FIELD = "__DATE__";
  const BITRIX_FIELD_EMPTY_LABEL = "(Пустые)";

  const bitrixMetaCache = {
    pipelines: Object.create(null),
    stages: Object.create(null),
    fields: Object.create(null),
    filterFields: Object.create(null),
    fieldOptions: Object.create(null)
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

  async function fetchBitrixFilterFields(entity) {
    if (bitrixMetaCache.filterFields[entity]) return bitrixMetaCache.filterFields[entity];
    const data = await bitrixFetch(`/api/integrations/bitrix/filter-fields?entity=${encodeURIComponent(entity)}`);
    bitrixMetaCache.filterFields[entity] = data;
    return data;
  }

  function normalizeBitrixFieldOptionEntries(data) {
    return (data?.options || []).map((entry) => ({
      value: String(entry.value),
      label: String(entry.label || entry.value),
      count: Number(entry.count) || 0
    }));
  }

  function bitrixFieldOptionsCacheKey(entity, fieldId, scope) {
    const base = `${entity}:${fieldId}`;
    if (!scope || !scope.stageId) return base;
    const filtersKey = (scope.scopeFilters || [])
      .map((item) => `${item.field}:${(item.hiddenValues || []).slice().sort().join(",")}`)
      .join("|");
    return `${base}@${scope.categoryId || 0}:${scope.stageId}:${scope.dateFrom || ""}:${scope.dateTo || ""}:${filtersKey}`;
  }

  function readBitrixTargetConfig(node) {
    if (!node) return null;
    try {
      if (node.dataset.shapeType === "shape-chart") {
        return normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}"));
      }
      return normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
    } catch {
      return null;
    }
  }

  function filterAppliesToShape(filterNode, targetNode) {
    if (!filterNode || !targetNode) return false;
    const cfg = getFilterConfigFromNode(filterNode);
    const targetId = String(targetNode.dataset.shapeId || "").trim();
    if (!targetId) return false;
    const excluded = (cfg.excludedShapeIds || []).map((id) => String(id || "").trim());
    if (excluded.includes(targetId)) return false;
    const filterFrame = String(filterNode.dataset.frameId || "").trim();
    const targetFrame = String(targetNode.dataset.frameId || "").trim();
    if (!filterFrame) return true;
    if (targetFrame === filterFrame) return true;
    if (!targetFrame && window.isShapeInsideFrameById && window.isShapeInsideFrameById(targetNode, filterFrame)) return true;
    return false;
  }

  function getLinkedBitrixTargetsForFilter(filterNode) {
    return getBitrixFilterableShapes().filter((shape) => filterAppliesToShape(filterNode, shape));
  }

  let filterTargetsRefreshTimer = null;
  let filterTargetsRefreshNode = null;
  let filterTargetsRefreshOpts = null;
  const BITRIX_FILTER_REFRESH_DEBOUNCE_MS = 300;

  function listFiltersShareTargets(a, b) {
    if (!a || !b || a === b) return true;
    const idsA = new Set(getLinkedBitrixTargetsForFilter(a).map((n) => String(n.dataset.shapeId || "")));
    const idsB = new Set(getLinkedBitrixTargetsForFilter(b).map((n) => String(n.dataset.shapeId || "")));
    for (const id of idsA) {
      if (id && idsB.has(id)) return true;
    }
    return false;
  }

  function queueFilterTargetsRefresh(filterNode, opts = {}) {
    filterTargetsRefreshNode = filterNode || null;
    filterTargetsRefreshOpts = opts || null;
    clearTimeout(filterTargetsRefreshTimer);
    filterTargetsRefreshTimer = setTimeout(() => {
      const pendingFilterNode = filterTargetsRefreshNode;
      const pendingOpts = filterTargetsRefreshOpts || {};
      filterTargetsRefreshTimer = null;
      filterTargetsRefreshNode = null;
      filterTargetsRefreshOpts = null;
      refreshFilterTargets(pendingFilterNode, pendingOpts);
    }, BITRIX_FILTER_REFRESH_DEBOUNCE_MS);
  }

  function invalidateScopedListFilterFieldOptions(sourceFilterNode) {
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]').forEach((node) => {
      if (isDateFilterMode(getFilterConfigFromNode(node))) return;
      if (sourceFilterNode && !listFiltersShareTargets(sourceFilterNode, node)) return;
      invalidateListFilterFieldOptions(node);
    });
  }

  function getFieldOptionsScopeForFilter(filterNode) {
    const cfg = getFilterConfigFromNode(filterNode);
    const targets = getLinkedBitrixTargetsForFilter(filterNode);
    const target = targets[0];
    if (!target) {
      return {
        entity: cfg.entity,
        categoryId: 0,
        stageId: "",
        dateFrom: "",
        dateTo: "",
        scopeFilters: []
      };
    }
    const targetCfg = readBitrixTargetConfig(target);
    if (!targetCfg) {
      return {
        entity: cfg.entity,
        categoryId: 0,
        stageId: "",
        dateFrom: "",
        dateTo: "",
        scopeFilters: []
      };
    }
    const dateRange = resolveShapeDateRange(target, targetCfg);
    const scopeFilters = getActiveBitrixFiltersForShape(target)
      .filter((filter) => filter.mode === "list" && filter.filterNode !== filterNode)
      .map((filter) => ({
        field: filter.filterField,
        hiddenValues: Array.isArray(filter.hiddenValues) ? filter.hiddenValues.slice() : []
      }));
    return {
      entity: targetCfg.entity || cfg.entity,
      categoryId: Number(targetCfg.categoryId) || 0,
      stageId: String(targetCfg.stageId || ""),
      dateFrom: dateRange.dateFrom,
      dateTo: dateRange.dateTo,
      scopeFilters
    };
  }

  function getCachedBitrixFieldOptions(node, cfg, scope) {
    const api = node?.__filterApi;
    const scopeKey = bitrixFieldOptionsCacheKey(cfg.entity, cfg.filterField, scope);
    if (api?.optionsScopeKey === scopeKey && api?.fieldOptions?.length) return api.fieldOptions.slice();
    const cached = bitrixMetaCache.fieldOptions[scopeKey];
    if (cached) return normalizeBitrixFieldOptionEntries(cached);
    return null;
  }

  function storeBitrixFieldOptions(node, cfg, options, scope) {
    const normalized = (options || []).map((entry) => ({
      value: String(entry.value),
      label: String(entry.label || entry.value),
      count: Number(entry.count) || 0
    }));
    const scopeKey = bitrixFieldOptionsCacheKey(cfg.entity, cfg.filterField, scope);
    if (node?.__filterApi) {
      node.__filterApi.fieldOptions = normalized;
      node.__filterApi.optionCount = normalized.length;
      node.__filterApi.optionsScopeKey = scopeKey;
      node.__filterApi.fieldOptionsPromise = null;
    }
    bitrixMetaCache.fieldOptions[scopeKey] = {
      entity: cfg.entity,
      field: cfg.filterField,
      options: normalized.map((entry) => ({
        value: entry.value,
        label: entry.label,
        count: entry.count
      }))
    };
    return normalized;
  }

  async function ensureBitrixFieldOptions(node, cfg) {
    const scope = getFieldOptionsScopeForFilter(node);
    const cached = getCachedBitrixFieldOptions(node, cfg, scope);
    if (cached?.length) return cached;
    const api = node?.__filterApi;
    if (api?.fieldOptionsPromise) return api.fieldOptionsPromise;
    const promise = fetchBitrixFieldOptions(cfg.entity, cfg.filterField, scope)
      .then((data) => storeBitrixFieldOptions(node, cfg, normalizeBitrixFieldOptionEntries(data), scope))
      .catch((err) => {
        if (api) api.fieldOptionsPromise = null;
        throw err;
      });
    if (api) api.fieldOptionsPromise = promise;
    return promise;
  }

  async function fetchBitrixFieldOptions(entity, fieldId, scope) {
    const cacheKey = bitrixFieldOptionsCacheKey(entity, fieldId, scope);
    if (bitrixMetaCache.fieldOptions[cacheKey]) return bitrixMetaCache.fieldOptions[cacheKey];
    const query = new URLSearchParams({
      entity,
      field: fieldId
    });
    if (scope?.stageId) {
      query.set("categoryId", String(scope.categoryId || 0));
      query.set("stageId", scope.stageId);
      query.set("dateFrom", scope.dateFrom || "");
      query.set("dateTo", scope.dateTo || "");
      if (scope.scopeFilters?.length) {
        query.set("scopeFilters", JSON.stringify(scope.scopeFilters));
      }
    }
    const data = await bitrixFetch(`/api/integrations/bitrix/field-options?${query.toString()}`);
    bitrixMetaCache.fieldOptions[cacheKey] = data;
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
  let bitrixFilterFieldCatalog = [];

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
      title: String(raw.title || raw.stageName || "График Bitrix24"),
      cardStyle: raw.cardStyle ? normalizeCardStyle(raw.cardStyle) : undefined,
      titleStyle: raw.titleStyle ? normalizeCardTextStyle(raw.titleStyle, defaultCardValueStyle) : undefined
    };
  }

  function applyChartVisualStyles(node, config) {
    const cardEl = getChartContainerEl(node);
    if (!cardEl) return;
    const cfg = normalizeChartConfig(config);
    const cardStyle = cfg.cardStyle ? adaptCardStyleToTheme(cfg.cardStyle) : defaultCardStyle();
    applyCardContainerStyle(cardEl, cardStyle);
    const titleEl = node.__chartApi?.titleEl || cardEl.querySelector(".bitrix-chart-title");
    if (titleEl) {
      const titleStyle = cfg.titleStyle
        ? adaptTextStyleToTheme(cfg.titleStyle, defaultCardValueStyle)
        : null;
      if (titleStyle) applyTextStyleToElement(titleEl, titleStyle, defaultCardValueStyle);
      else titleEl.style.color = "";
    }
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

  let bitrixConnectionState = { checked: false, connected: false };

  async function refreshBitrixConnectionState() {
    if (getGuestWebhook() && isValidBitrixWebhookUrl(getGuestWebhook())) {
      bitrixConnectionState = { checked: true, connected: true };
      return true;
    }
    if (!window.currentUser) {
      bitrixConnectionState = { checked: true, connected: false };
      return false;
    }
    try {
      const status = await loadBitrixStatus();
      bitrixConnectionState = { checked: true, connected: !!status.connected };
      if (bitrixConnectionState.connected && document.querySelector(".bitrix-connect-placeholder")) {
        rebuildAllBitrixWidgets();
      }
      return bitrixConnectionState.connected;
    } catch {
      bitrixConnectionState = { checked: true, connected: false };
      return false;
    }
  }

  function isBitrixWebhookConfigured() {
    if (getGuestWebhook() && isValidBitrixWebhookUrl(getGuestWebhook())) return true;
    if (bitrixConnectionState.checked) return !!bitrixConnectionState.connected;
    return false;
  }

  function openBitrixProfileFromPlaceholder(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (typeof window.openProfileModal === "function") window.openProfileModal();
  }

  function preserveBitrixShapeChrome(node, rebuildContent) {
    const shapeId = String(node?.dataset?.shapeId || "").trim();
    if (shapeId && typeof restoreLiftedShapeControls === "function") {
      restoreLiftedShapeControls(shapeId);
    }
    const handles = node.querySelector(":scope > .shape-handles");
    const connPoints = node.querySelector(":scope > .conn-points");
    const paramHandle = node.querySelector(":scope > .shape-param-handle");
    node.innerHTML = "";
    rebuildContent();
    if (handles) node.appendChild(handles);
    else if (window.addShapeHandles) window.addShapeHandles(node);
    if (connPoints) node.appendChild(connPoints);
    else if (window.attachConnectorPoints) window.attachConnectorPoints(node);
    if (paramHandle) node.appendChild(paramHandle);
    if (window.layoutConnectorPoints) window.layoutConnectorPoints(node);
    if (node.classList.contains("selected") || node.classList.contains("multi-selected")) {
      if (typeof syncSelectionControlsOverlay === "function") syncSelectionControlsOverlay();
    }
  }

  function buildBitrixConnectPlaceholder(node, widgetKind) {
    const labels = {
      chart: "график",
      card: "карточка",
      filter: "фильтр"
    };
    const label = labels[widgetKind] || "виджет";
    node.classList.remove("shape-chart-widget", "shape-bitrix-card-widget");
    node.__chartApi = null;
    node.__cardApi = null;
    node.__filterApi = null;
    node.__bitrixPlaceholder = true;
    preserveBitrixShapeChrome(node, () => {
      const card = document.createElement("div");
      card.className = "bitrix-connect-placeholder";
      card.innerHTML = `
      <div class="bitrix-connect-placeholder-icon" aria-hidden="true">⚠</div>
      <div class="bitrix-connect-placeholder-title">Bitrix24 не подключён</div>
      <p class="bitrix-connect-placeholder-text">Подключите входящий webhook в профиле, чтобы ${label} мог загружать данные из Bitrix24.</p>
      <button type="button" class="bitrix-connect-placeholder-btn">Открыть профиль</button>
    `;
      card.querySelector(".bitrix-connect-placeholder-btn")?.addEventListener("pointerdown", stopBitrixActionPointer);
      card.querySelector(".bitrix-connect-placeholder-btn")?.addEventListener("click", openBitrixProfileFromPlaceholder);
      card.addEventListener("pointerdown", (e) => e.stopPropagation());
      node.appendChild(card);
    });
  }

  function rebuildAllBitrixWidgets() {
    document.querySelectorAll('.shape[data-shape-type="shape-chart"]').forEach((node) => {
      let config = defaultChartConfig();
      try {
        config = normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}"));
      } catch {
        config = node.__chartApi ? normalizeChartConfig(node.__chartApi.config) : config;
      }
      applyChartConfig(node, config, false);
    });
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-card"]').forEach((node) => {
      let config = defaultCardConfig();
      try {
        config = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
      } catch {
        config = node.__cardApi ? normalizeCardConfig(node.__cardApi.config) : config;
      }
      applyCardConfig(node, config, false);
    });
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]').forEach((node) => {
      let config = defaultFilterConfig();
      try {
        config = normalizeFilterConfig(JSON.parse(node.dataset.filterConfig || "{}"));
      } catch {
        config = node.__filterApi ? normalizeFilterConfig(node.__filterApi.config) : config;
      }
      applyFilterConfig(node, config, false);
    });
    refreshAllBitrixWidgets();
  }

  const BITRIX_GET_CACHE_TTL_MS = 45000;
  const bitrixGetResponseCache = new Map();
  const bitrixGetInflight = new Map();

  function bitrixFetchCacheKey(path) {
    const userKey = window.currentUser?.email || "";
    const guest = !window.currentUser ? getGuestWebhook() : "";
    return `${userKey}|${guest}|${path}`;
  }

  function bustBitrixIntegrationStatusCache() {
    for (const key of bitrixGetResponseCache.keys()) {
      if (key.includes("/api/integrations/bitrix")) {
        bitrixGetResponseCache.delete(key);
      }
    }
  }

  function bustBitrixDataCache() {
    for (const key of bitrixGetResponseCache.keys()) {
      if (key.includes("/chart-data") || key.includes("/card-data")) {
        bitrixGetResponseCache.delete(key);
      }
    }
  }

  async function bitrixFetch(path, opts = {}) {
    const headers = Object.assign({}, opts.headers || {});
    if (!window.currentUser) {
      const guestWebhook = getGuestWebhook();
      if (guestWebhook) headers["X-Bitrix-Webhook"] = normalizeBitrixWebhookUrl(guestWebhook);
    }
    const method = String(opts.method || "GET").toUpperCase();
    const bustCache = !!opts.bustCache;
    const cacheKey = method === "GET" ? bitrixFetchCacheKey(path) : null;

    if (cacheKey && !bustCache) {
      const cached = bitrixGetResponseCache.get(cacheKey);
      if (cached && Date.now() - cached.ts < BITRIX_GET_CACHE_TTL_MS) {
        return cached.data;
      }
      if (bitrixGetInflight.has(cacheKey)) {
        return bitrixGetInflight.get(cacheKey);
      }
    } else if (bustCache && cacheKey) {
      bitrixGetResponseCache.delete(cacheKey);
    }

    const fetchOpts = Object.assign({ credentials: "same-origin" }, opts, { headers });
    delete fetchOpts.bustCache;

    const request = (async () => {
      const res = await fetch(path, fetchOpts);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const details = data && data.details ? String(data.details) : "";
        const code = data && data.error ? String(data.error) : `HTTP ${res.status}`;
        const err = new Error(details ? `${code}: ${details}` : code);
        err.status = res.status;
        err.payload = data;
        throw err;
      }
      if (cacheKey && !bustCache) {
        bitrixGetResponseCache.set(cacheKey, { ts: Date.now(), data });
      }
      return data;
    })();

    if (cacheKey) bitrixGetInflight.set(cacheKey, request);
    try {
      return await request;
    } finally {
      if (cacheKey) bitrixGetInflight.delete(cacheKey);
    }
  }

  function normalizeBitrixWebhookUrl(url) {
    const text = String(url || "").trim().split("#")[0].split("?")[0].trim();
    if (!text) return "";
    if (!/^https:\/\//i.test(text)) return "";
    return text.replace(/\/+$/, "") + "/";
  }

  function isValidBitrixWebhookUrl(url) {
    const normalized = normalizeBitrixWebhookUrl(url);
    return /^https:\/\/[^/?#\s]+\/rest\/\d+\/[a-zA-Z0-9_-]+\/?$/i.test(normalized);
  }

  async function validateBitrixWebhook(webhookUrl) {
    return bitrixFetch("/api/integrations/bitrix/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webhookUrl })
    });
  }

  async function loadBitrixStatus() {
    return bitrixFetch("/api/integrations/bitrix");
  }

  async function saveBitrixWebhook(webhookUrl) {
    const normalized = normalizeBitrixWebhookUrl(webhookUrl);
    if (!isValidBitrixWebhookUrl(normalized)) {
      const err = new Error("invalid_webhook_url");
      err.status = 400;
      throw err;
    }
    if (window.currentUser) {
      bustBitrixIntegrationStatusCache();
      return bitrixFetch("/api/integrations/bitrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: normalized })
      });
    }
    await validateBitrixWebhook(normalized);
    setGuestWebhook(normalized);
    bustBitrixIntegrationStatusCache();
    return { connected: true, domain: tryParseDomain(normalized), webhookMasked: maskWebhook(normalized), webhookUrl: normalized };
  }

  async function disconnectBitrix() {
    if (window.currentUser) {
      bustBitrixIntegrationStatusCache();
      return bitrixFetch("/api/integrations/bitrix", { method: "DELETE" });
    }
    setGuestWebhook("");
    bustBitrixIntegrationStatusCache();
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

  function formatBitrixErrorMessage(err) {
    const raw = String((err && err.message) || err || "").trim();
    const code = raw.split(":")[0];
    const map = {
      bitrix_not_configured: "Подключите Bitrix24 в профиле или укажите webhook.",
      unauthorized: "Войдите в аккаунт или сохраните webhook для гостя.",
      invalid_webhook_url: "Некорректный URL. Нужен полный входящий webhook из Bitrix24, например https://company.bitrix24.ru/rest/1/xxxxxxxx/",
      bitrix_connection_failed: "Bitrix24 не принял подключение. Проверьте URL и права webhook.",
      bitrix_request_failed: "Bitrix24 не ответил на запрос."
    };
    if (map[code] && raw === code) return map[code];
    if (map[code] && raw.startsWith(`${code}:`)) {
      const details = raw.slice(code.length + 1).trim();
      return details ? `${map[code]} ${details}` : map[code];
    }
    return raw || "Не удалось выполнить запрос к Bitrix24.";
  }

  function showBitrixError(errorEl, err) {
    if (!errorEl) return;
    errorEl.textContent = formatBitrixErrorMessage(err);
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

  function isDarkTheme() {
    return !!(document.body && document.body.classList.contains("dark"));
  }

  function normalizeThemeColor(color) {
    return String(color || "").trim().toLowerCase();
  }

  function bitrixThemePalette() {
    if (isDarkTheme()) {
      return {
        cardFill: "#0f172a",
        cardFill2: "#0f172a",
        cardBorder: "#334155",
        valueText: "#f8fafc",
        labelText: "#94a3b8",
        titleText: "#f8fafc",
        chartGrid: "#334155",
        chartAxis: "#94a3b8",
        chartValue: "#e2e8f0"
      };
    }
    return {
      cardFill: "#ffffff",
      cardFill2: "#ffffff",
      cardBorder: "#dbe4f0",
      valueText: "#334155",
      labelText: "#94a3b8",
      titleText: "#0f172a",
      chartGrid: "#dbe4f0",
      chartAxis: "#64748b",
      chartValue: "#0f172a"
    };
  }

  const BITRIX_LIGHT_CARD = { fill: "#ffffff", fill2: "#ffffff", border: "#dbe4f0" };
  const BITRIX_DARK_CARD = { fill: "#0f172a", fill2: "#0f172a", border: "#334155" };

  function cardStyleMatchesPalette(style, palette) {
    const normalized = normalizeCardStyle(style);
    return normalizeThemeColor(normalized.fill) === normalizeThemeColor(palette.fill)
      && normalizeThemeColor(normalized.fill2) === normalizeThemeColor(palette.fill2)
      && normalizeThemeColor(normalized.border) === normalizeThemeColor(palette.border);
  }

  function adaptCardStyleToTheme(cardStyle) {
    const style = normalizeCardStyle(cardStyle);
    const palette = bitrixThemePalette();
    if (isDarkTheme() && cardStyleMatchesPalette(style, BITRIX_LIGHT_CARD)) {
      return Object.assign({}, style, {
        fill: palette.cardFill,
        fill2: palette.cardFill2,
        border: palette.cardBorder
      });
    }
    if (!isDarkTheme() && cardStyleMatchesPalette(style, BITRIX_DARK_CARD)) {
      return Object.assign({}, style, {
        fill: palette.cardFill,
        fill2: palette.cardFill2,
        border: palette.cardBorder
      });
    }
    return style;
  }

  function adaptTextStyleToTheme(textStyle, fallbackFactory) {
    const style = normalizeCardTextStyle(textStyle, fallbackFactory);
    const color = normalizeThemeColor(style.textColor);
    const palette = bitrixThemePalette();
    if (isDarkTheme()) {
      if (color === normalizeThemeColor("#334155")) return Object.assign({}, style, { textColor: palette.valueText });
      if (color === normalizeThemeColor("#0f172a")) return Object.assign({}, style, { textColor: palette.titleText });
    } else {
      if (color === normalizeThemeColor("#f8fafc")) return Object.assign({}, style, { textColor: palette.valueText });
    }
    return style;
  }

  function migrateBitrixVisualConfig(config) {
    if (!config || typeof config !== "object") return config;
    const next = Object.assign({}, config);
    if (next.cardStyle) next.cardStyle = adaptCardStyleToTheme(next.cardStyle);
    if (next.valueStyle) next.valueStyle = adaptTextStyleToTheme(next.valueStyle, defaultCardValueStyle);
    if (next.labelStyle) next.labelStyle = adaptTextStyleToTheme(next.labelStyle, defaultCardLabelStyle);
    if (next.titleStyle) next.titleStyle = adaptTextStyleToTheme(next.titleStyle, defaultCardValueStyle);
    return next;
  }

  function defaultCardStyle() {
    const palette = bitrixThemePalette();
    return {
      fillEnabled: true,
      gradientEnabled: false,
      fill: palette.cardFill,
      fill2: palette.cardFill2,
      fillDirection: "horizontal",
      borderEnabled: true,
      border: palette.cardBorder,
      borderWidth: 1,
      borderStyle: "solid",
      radius: 14,
      opacity: 1,
      shadow: 8
    };
  }

  function defaultCardValueStyle() {
    const palette = bitrixThemePalette();
    return {
      fontFamily: "Arial",
      fontSize: 42,
      textColor: palette.valueText,
      bold: true,
      italic: false,
      strike: false,
      underline: false,
      hAlign: "center",
      vAlign: "middle"
    };
  }

  function defaultCardLabelStyle() {
    const palette = bitrixThemePalette();
    return {
      fontFamily: "Arial",
      fontSize: 11,
      textColor: palette.labelText,
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
      shadow: raw.shadow != null ? Math.max(0, Number(raw.shadow) || 0) : base.shadow
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

  function applyTextStyleToElement(el, style, fallbackFactory) {
    if (!el || !style) return;
    const adapted = adaptTextStyleToTheme(style, fallbackFactory || defaultCardLabelStyle);
    el.style.fontFamily = window.fontCssFromKey
      ? window.fontCssFromKey(adapted.fontFamily || "Arial")
      : (adapted.fontFamily || "Arial");
    el.style.color = adapted.textColor || bitrixThemePalette().labelText;
    el.style.fontSize = `${Math.max(8, Number(adapted.fontSize) || 11)}px`;
    el.style.fontWeight = adapted.bold ? "700" : "400";
    el.style.fontStyle = adapted.italic ? "italic" : "normal";
    const deco = [];
    if (adapted.strike) deco.push("line-through");
    if (adapted.underline) deco.push("underline");
    el.style.textDecoration = deco.length ? deco.join(" ") : "none";
    el.style.textAlign = adapted.hAlign || "center";
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
      shadow: cardEl.dataset.shadow != null
        ? Math.max(0, Number(cardEl.dataset.shadow) || 0)
        : Math.max(0, Number(window.parseShadowValue ? window.parseShadowValue(cardEl.style.boxShadow || cs.boxShadow) : 0) || 0)
    };
  }

  function applyCardContainerStyle(cardEl, cardStyle) {
    if (!cardEl) return;
    const style = adaptCardStyleToTheme(cardStyle);
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
    cardEl.dataset.shadow = String(style.shadow);
    if (window.applyNodeShadow) window.applyNodeShadow(cardEl, style.shadow);
  }

  function readContainerStyleFromFormatPanel(currentStyle) {
    return normalizeCardStyle({
      fillEnabled: readPanelCheckbox(fpEl("fpFillEnabled"), currentStyle.fillEnabled),
      gradientEnabled: readPanelCheckbox(fpEl("fpGradientEnabled"), currentStyle.gradientEnabled),
      fill: readPanelValue(fpEl("fpFill"), currentStyle.fill),
      fill2: readPanelValue(fpEl("fpFill2"), currentStyle.fill2),
      fillDirection: readPanelValue(fpEl("fpFillType"), currentStyle.fillDirection),
      borderEnabled: readPanelCheckbox(fpEl("fpBorderEnabled"), currentStyle.borderEnabled),
      border: readPanelValue(fpEl("fpBorder"), currentStyle.border),
      borderWidth: readPanelNumber(fpEl("fpBorderWidth"), currentStyle.borderWidth),
      borderStyle: readPanelValue(fpEl("fpLineStyle"), currentStyle.borderStyle),
      radius: readPanelNumber(fpEl("fpRadius"), currentStyle.radius),
      opacity: (readPanelNumber(fpEl("fpOpacity"), Math.round(currentStyle.opacity * 100)) || 100) / 100,
      shadow: readPanelNumber(fpEl("fpShadow"), currentStyle.shadow)
    });
  }

  function syncContainerStyleToFormatPanel(cardEl, textEl) {
    if (!cardEl) return;
    const cardStyle = readCardStyleFromElement(cardEl);
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

    if (textEl) {
      const textStyle = readTextStyleFromElement(textEl);
      const fpFontFamily = fpEl("fpFontFamily");
      const fpFontSize = fpEl("fpFontSize");
      const fpTextColor = fpEl("fpTextColor");
      const fpBold = fpEl("fpBold");
      const fpItalic = fpEl("fpItalic");
      const fpStrike = fpEl("fpStrike");
      const fpUnderline = fpEl("fpUnderline");
      if (window.setFontSelectValue && fpFontFamily) window.setFontSelectValue(fpFontFamily, textStyle.fontFamily);
      if (fpFontSize) fpFontSize.value = String(textStyle.fontSize);
      if (fpTextColor) fpTextColor.value = textStyle.textColor;
      if (fpBold) fpBold.checked = textStyle.bold;
      if (fpItalic) fpItalic.checked = textStyle.italic;
      if (fpStrike) fpStrike.checked = textStyle.strike;
      if (fpUnderline) fpUnderline.checked = textStyle.underline;
      if (window.setAlignButtons) window.setAlignButtons(textStyle.hAlign, textStyle.vAlign);
    }

    if (window.updateFormatPanelVisuals) window.updateFormatPanelVisuals();
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

  function applyCardTextAlign(node, h, v, opts = {}) {
    const groupMode = !!opts.groupMode;
    const part = groupMode ? "" : getCardActiveTextPart(node);
    if (!node.__cardApi) return false;
    const cfg = normalizeCardConfig(node.__cardApi.config);
    let changed = false;
    const applyPart = (key, el, fallback) => {
      cfg[key] = normalizeCardTextStyle(Object.assign({}, cfg[key], { hAlign: h, vAlign: v }), fallback);
      applyTextStyleToElement(el, cfg[key], fallback);
      changed = true;
    };
    if (groupMode || part === "value") applyPart("valueStyle", node.__cardApi.valueEl, defaultCardValueStyle);
    if (groupMode || part === "label") applyPart("labelStyle", node.__cardApi.labelEl, defaultCardLabelStyle);
    if (!changed) return false;
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

  const BITRIX_LOADING_MESSAGE = "Загрузка данных из Bitrix24…";

  function ensureBitrixLoadingOverlay(containerEl) {
    if (!containerEl) return null;
    let overlay = containerEl.querySelector(":scope > .bitrix-widget-loading");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "bitrix-widget-loading hidden";
      overlay.setAttribute("aria-live", "polite");
      overlay.innerHTML = '<div class="bitrix-widget-loading-spinner" aria-hidden="true"></div><div class="bitrix-widget-loading-text"></div>';
      containerEl.appendChild(overlay);
    }
    return overlay;
  }

  function setBitrixContainerLoading(containerEl, loading, message) {
    if (!containerEl) return;
    const overlay = ensureBitrixLoadingOverlay(containerEl);
    if (!overlay) return;
    const textEl = overlay.querySelector(".bitrix-widget-loading-text");
    if (textEl) textEl.textContent = message || BITRIX_LOADING_MESSAGE;
    overlay.classList.toggle("hidden", !loading);
    overlay.setAttribute("aria-hidden", loading ? "false" : "true");
    containerEl.classList.toggle("is-loading", !!loading);
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

  function readShapeFormatPanelSnapshot(node, base) {
    if (!node) return base;
    if (node.dataset.shapeType === "shape-bitrix-card") {
      const api = node.__cardApi;
      if (!api) return base;
      const cardStyle = readCardStyleFromElement(api.cardEl);
      const valueStyle = readTextStyleFromElement(api.valueEl);
      const labelStyle = readTextStyleFromElement(api.labelEl);
      return Object.assign({}, base, {
        fillEnabled: cardStyle.fillEnabled,
        gradientEnabled: cardStyle.gradientEnabled,
        fill: cardStyle.fill,
        fill2: cardStyle.fill2,
        fillDirection: cardStyle.fillDirection,
        borderEnabled: cardStyle.borderEnabled,
        border: cardStyle.border,
        borderWidth: cardStyle.borderWidth,
        borderStyle: cardStyle.borderStyle,
        radius: cardStyle.radius,
        opacity: cardStyle.opacity,
        shadow: cardStyle.shadow,
        fontFamily: valueStyle.fontFamily,
        textColor: valueStyle.textColor,
        fontSize: valueStyle.fontSize,
        bold: valueStyle.bold,
        italic: valueStyle.italic,
        strike: valueStyle.strike,
        underline: valueStyle.underline,
        wrap: false,
        scrollEnabled: false
      });
    }
    if (node.dataset.shapeType === "shape-chart") {
      const cardEl = node.querySelector(".bitrix-chart-card");
      if (!cardEl) return base;
      const cardStyle = readCardStyleFromElement(cardEl);
      const titleEl = node.__chartApi?.titleEl || cardEl.querySelector(".bitrix-chart-title");
      const titleStyle = readTextStyleFromElement(titleEl);
      return Object.assign({}, base, {
        fillEnabled: cardStyle.fillEnabled,
        gradientEnabled: cardStyle.gradientEnabled,
        fill: cardStyle.fill,
        fill2: cardStyle.fill2,
        fillDirection: cardStyle.fillDirection,
        borderEnabled: cardStyle.borderEnabled,
        border: cardStyle.border,
        borderWidth: cardStyle.borderWidth,
        borderStyle: cardStyle.borderStyle,
        radius: cardStyle.radius,
        opacity: cardStyle.opacity,
        shadow: cardStyle.shadow,
        fontFamily: titleStyle.fontFamily,
        textColor: titleStyle.textColor,
        fontSize: titleStyle.fontSize,
        bold: titleStyle.bold,
        italic: titleStyle.italic,
        strike: titleStyle.strike,
        underline: titleStyle.underline,
        wrap: false,
        scrollEnabled: false
      });
    }
    if (node.dataset.shapeType === "shape-bitrix-date-filter") {
      const cardEl = node.querySelector(".bitrix-date-filter-card");
      if (!cardEl) return base;
      const cardStyle = readCardStyleFromElement(cardEl);
      return Object.assign({}, base, {
        fillEnabled: cardStyle.fillEnabled,
        gradientEnabled: cardStyle.gradientEnabled,
        fill: cardStyle.fill,
        fill2: cardStyle.fill2,
        fillDirection: cardStyle.fillDirection,
        borderEnabled: cardStyle.borderEnabled,
        border: cardStyle.border,
        borderWidth: cardStyle.borderWidth,
        borderStyle: cardStyle.borderStyle,
        radius: cardStyle.radius,
        opacity: cardStyle.opacity,
        shadow: cardStyle.shadow,
        wrap: false,
        scrollEnabled: false
      });
    }
    return base;
  }

  function isPanelControlMixed(el) {
    return !!(window.isControlMixed && el && window.isControlMixed(el));
  }

  function readPanelCheckbox(el, fallback) {
    if (!el || isPanelControlMixed(el)) return fallback;
    return el.checked;
  }

  function readPanelValue(el, fallback) {
    if (!el || isPanelControlMixed(el)) return fallback;
    return el.value;
  }

  function readPanelNumber(el, fallback) {
    if (!el || isPanelControlMixed(el)) return fallback;
    return Number(el.value);
  }

  function getChartContainerEl(node) {
    return node && node.querySelector(".bitrix-chart-card");
  }

  function resolveChartLiveApi(node) {
    if (!node || node.__bitrixPlaceholder) return null;
    const cardEl = getChartContainerEl(node);
    if (!cardEl) return null;
    const canvas = cardEl.querySelector(".bitrix-chart-canvas");
    if (!canvas) return null;
    let api = node.__chartApi;
    if (!api) {
      let config = defaultChartConfig();
      try {
        config = normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}"));
      } catch {
        /* ignore */
      }
      api = {
        config,
        canvas,
        titleEl: cardEl.querySelector(".bitrix-chart-title"),
        titleTextEl: cardEl.querySelector(".bitrix-chart-title-text"),
        totalEl: cardEl.querySelector(".bitrix-chart-total"),
        infoLines: [],
        refreshRequestId: 0
      };
      node.__chartApi = api;
      return api;
    }
    if (!api.canvas || !api.canvas.isConnected || api.canvas !== canvas) {
      api.canvas = canvas;
    }
    api.titleEl = cardEl.querySelector(".bitrix-chart-title") || api.titleEl;
    api.titleTextEl = cardEl.querySelector(".bitrix-chart-title-text") || api.titleTextEl;
    api.totalEl = cardEl.querySelector(".bitrix-chart-total") || api.totalEl;
    api.bodyEl = cardEl.querySelector(".bitrix-chart-body") || api.bodyEl;
    api.cardEl = cardEl;
    return api;
  }

  function resolveCardLiveApi(node) {
    if (!node || node.__bitrixPlaceholder) return null;
    const cardEl = node.querySelector(".bitrix-kpi-card");
    if (!cardEl) return null;
    let api = node.__cardApi;
    if (!api) {
      let config = defaultCardConfig();
      try {
        config = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
      } catch {
        /* ignore */
      }
      api = {
        config,
        cardEl,
        valueEl: cardEl.querySelector(".bitrix-kpi-value"),
        labelEl: cardEl.querySelector(".bitrix-kpi-label"),
        statusEl: cardEl.querySelector(".bitrix-kpi-status"),
        refreshRequestId: 0
      };
      node.__cardApi = api;
      return api;
    }
    api.cardEl = cardEl;
    api.valueEl = cardEl.querySelector(".bitrix-kpi-value") || api.valueEl;
    api.labelEl = cardEl.querySelector(".bitrix-kpi-label") || api.labelEl;
    api.statusEl = cardEl.querySelector(".bitrix-kpi-status") || api.statusEl;
    return api;
  }

  function applyChartFormatPanel(node, opts = {}) {
    const cardEl = getChartContainerEl(node);
    if (!cardEl) return false;
    const cfg = normalizeChartConfig(node.__chartApi?.config || {});
    const currentStyle = readCardStyleFromElement(cardEl);
    const cardStyle = readContainerStyleFromFormatPanel(currentStyle);
    applyCardContainerStyle(cardEl, cardStyle);
    cfg.cardStyle = cardStyle;

    const titleEl = node.__chartApi?.titleEl || cardEl.querySelector(".bitrix-chart-title");
    const titleStyle = readTextStyleFromElement(titleEl);
    const nextTitleStyle = normalizeCardTextStyle({
      fontFamily: readPanelValue(fpEl("fpFontFamily"), titleStyle.fontFamily),
      fontSize: readPanelNumber(fpEl("fpFontSize"), titleStyle.fontSize),
      textColor: readPanelValue(fpEl("fpTextColor"), titleStyle.textColor),
      bold: readPanelCheckbox(fpEl("fpBold"), titleStyle.bold),
      italic: readPanelCheckbox(fpEl("fpItalic"), titleStyle.italic),
      strike: readPanelCheckbox(fpEl("fpStrike"), titleStyle.strike),
      underline: readPanelCheckbox(fpEl("fpUnderline"), titleStyle.underline),
      hAlign: titleStyle.hAlign,
      vAlign: titleStyle.vAlign
    }, defaultCardValueStyle);
    applyTextStyleToElement(titleEl, nextTitleStyle, defaultCardValueStyle);
    cfg.titleStyle = nextTitleStyle;
    if (node.__chartApi) node.__chartApi.config = cfg;
    node.dataset.chartConfig = JSON.stringify(cfg);
    return true;
  }

  function syncChartFormatPanel(node) {
    const cardEl = getChartContainerEl(node);
    if (!cardEl) return;
    const titleEl = node.__chartApi?.titleEl || cardEl.querySelector(".bitrix-chart-title");
    syncContainerStyleToFormatPanel(cardEl, titleEl);
    const hint = fpEl("bitrixCardFormatHint");
    if (hint) hint.classList.add("hidden");
  }

  function adjustChartFontSize(node, delta) {
    const cardEl = getChartContainerEl(node);
    if (!cardEl) return false;
    const titleEl = node.__chartApi?.titleEl || cardEl.querySelector(".bitrix-chart-title");
    if (!titleEl) return false;
    const step = Number(delta) || 0;
    if (!step) return false;
    const titleStyle = readTextStyleFromElement(titleEl);
    titleStyle.fontSize = Math.max(8, Math.min(144, titleStyle.fontSize + step));
    applyTextStyleToElement(titleEl, titleStyle, defaultCardValueStyle);
    const cfg = normalizeChartConfig(node.__chartApi?.config || {});
    cfg.titleStyle = titleStyle;
    if (node.__chartApi) node.__chartApi.config = cfg;
    node.dataset.chartConfig = JSON.stringify(cfg);
    if (window.saveLayout) window.saveLayout();
    return true;
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
    const groupMode = !!opts.groupMode;
    const part = groupMode ? "" : getCardActiveTextPart(node);
    const cardEl = api.cardEl;
    const cfg = normalizeCardConfig(api.config);
    const currentCardStyle = readCardStyleFromElement(cardEl);

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

    const styleTarget = groupMode
      ? "both"
      : (formatSource && ["fpFontFamily", "fpFontSize", "fpTextColor", "fpBold", "fpItalic", "fpStrike", "fpUnderline", "fpAlignLeft", "fpAlignCenter", "fpAlignRight"].includes(formatSource.id)
        ? "text"
        : (!formatSource || ["fpFillEnabled", "fpGradientEnabled", "fpFill", "fpFill2", "fpFillType", "fpBorderEnabled", "fpBorder", "fpBorderWidth", "fpLineStyle", "fpRadius", "fpOpacity", "fpShadow"].includes(formatSource.id) ? "card" : "both"));

    if (styleTarget === "card" || styleTarget === "both") {
      cfg.cardStyle = normalizeCardStyle({
        fillEnabled: readPanelCheckbox(fpFillEnabled, currentCardStyle.fillEnabled),
        gradientEnabled: readPanelCheckbox(fpGradientEnabled, currentCardStyle.gradientEnabled),
        fill: readPanelValue(fpFill, currentCardStyle.fill),
        fill2: readPanelValue(fpFill2, currentCardStyle.fill2),
        fillDirection: readPanelValue(fpFillType, currentCardStyle.fillDirection),
        borderEnabled: readPanelCheckbox(fpBorderEnabled, currentCardStyle.borderEnabled),
        border: readPanelValue(fpBorder, currentCardStyle.border),
        borderWidth: readPanelNumber(fpBorderWidth, currentCardStyle.borderWidth),
        borderStyle: readPanelValue(fpLineStyle, currentCardStyle.borderStyle),
        radius: readPanelNumber(fpRadius, currentCardStyle.radius),
        opacity: (readPanelNumber(fpOpacity, Math.round(currentCardStyle.opacity * 100)) || 100) / 100,
        shadow: readPanelNumber(fpShadow, currentCardStyle.shadow)
      });
      applyCardContainerStyle(cardEl, cfg.cardStyle);
    }

    if (styleTarget === "text" || styleTarget === "both") {
      const textPatch = {
        fontFamily: readPanelValue(fpFontFamily, "Arial"),
        fontSize: readPanelNumber(fpFontSize, 11),
        textColor: readPanelValue(fpTextColor, "#334155"),
        bold: readPanelCheckbox(fpBold, false),
        italic: readPanelCheckbox(fpItalic, false),
        strike: readPanelCheckbox(fpStrike, false),
        underline: readPanelCheckbox(fpUnderline, false)
      };
      const applyTextPart = (key, el, fallback) => {
        const current = readTextStyleFromElement(el);
        const next = normalizeCardTextStyle(Object.assign({}, current, {
          fontFamily: isPanelControlMixed(fpFontFamily) ? current.fontFamily : textPatch.fontFamily,
          fontSize: isPanelControlMixed(fpFontSize) ? current.fontSize : textPatch.fontSize,
          textColor: isPanelControlMixed(fpTextColor) ? current.textColor : textPatch.textColor,
          bold: isPanelControlMixed(fpBold) ? current.bold : textPatch.bold,
          italic: isPanelControlMixed(fpItalic) ? current.italic : textPatch.italic,
          strike: isPanelControlMixed(fpStrike) ? current.strike : textPatch.strike,
          underline: isPanelControlMixed(fpUnderline) ? current.underline : textPatch.underline
        }), fallback);
        cfg[key] = next;
        applyTextStyleToElement(el, next, fallback);
      };
      if (groupMode || part === "value") applyTextPart("valueStyle", api.valueEl, defaultCardValueStyle);
      if (groupMode || part === "label") applyTextPart("labelStyle", api.labelEl, defaultCardLabelStyle);
    }

    api.config = cfg;
    node.dataset.cardConfig = JSON.stringify(cfg);
    return true;
  }

  function adjustCardFontSize(node, delta, opts = {}) {
    const groupMode = !!opts.groupMode;
    const part = groupMode ? "" : getCardActiveTextPart(node);
    if (!node.__cardApi) return false;
    const step = Number(delta) || 0;
    if (!step) return false;
    const cfg = normalizeCardConfig(node.__cardApi.config);
    let changed = false;
    const bumpPart = (key, el, fallback) => {
      const next = normalizeCardTextStyle(cfg[key], fallback);
      next.fontSize = Math.max(8, Math.min(144, next.fontSize + step));
      cfg[key] = next;
      applyTextStyleToElement(el, next, fallback);
      changed = true;
    };
    if (groupMode || part === "value") bumpPart("valueStyle", node.__cardApi.valueEl, defaultCardValueStyle);
    if (groupMode || part === "label") bumpPart("labelStyle", node.__cardApi.labelEl, defaultCardLabelStyle);
    if (!changed) return false;
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

  let chartInfoPopover = null;
  let chartInfoSession = null;

  function buildChartInfoLines(node, cfg, dateRange) {
    const lines = [];
    lines.push(`Источник: ${cfg.entity === "lead" ? "Лиды" : "Сделки"}`);
    if (cfg.categoryName) lines.push(`Воронка: ${cfg.categoryName}`);
    if (cfg.stageName) lines.push(`Стадия: ${cfg.stageName}`);
    const granularityLabel = cfg.granularity === "day"
      ? "по дням"
      : cfg.granularity === "month"
        ? "по месяцам"
        : "по неделям (с понедельника)";
    lines.push(`Группировка: ${granularityLabel}`);
    lines.push(`Метрика: ${cfg.metric === "sum" ? `сумма (${cfg.sumFieldName || cfg.sumField || "Сумма"})` : "количество"}`);
    if (dateRange.fromFilter) {
      lines.push(`Период (фильтр даты): ${dateRange.dateFrom} — ${dateRange.dateTo}`);
    } else {
      lines.push(`Период: ${dateRange.dateFrom} — ${dateRange.dateTo}`);
    }
    getActiveBitrixFiltersForShape(node)
      .filter((filter) => filter.mode === "list" && filter.hiddenValues && filter.hiddenValues.length)
      .forEach((filter) => {
        const filterCfg = getFilterConfigFromNode(filter.filterNode);
        const name = filterCfg.filterFieldName || filterCfg.filterField || "поле";
        lines.push(`Фильтр «${name}»: скрыто ${filter.hiddenValues.length}`);
      });
    return lines;
  }

  function syncChartHeader(api, cfg, opts = {}) {
    const base = cfg.title || cfg.stageName || "График";
    if (api.titleTextEl) api.titleTextEl.textContent = base;
    if (api.totalEl) {
      if (opts.loading) api.totalEl.textContent = " (загрузка…)";
      else if (opts.error) api.totalEl.textContent = "";
      else if (opts.total != null) api.totalEl.textContent = ` (${formatCardValue(opts.total, cfg.metric)})`;
      else api.totalEl.textContent = "";
    }
    if (opts.infoLines) api.infoLines = opts.infoLines;
  }

  function closeChartInfoPopover() {
    chartInfoSession = null;
    if (chartInfoPopover) chartInfoPopover.classList.add("hidden");
  }

  function positionChartInfoPopover(anchorRect) {
    if (!chartInfoPopover || !anchorRect) return;
    const margin = 8;
    const popupRect = chartInfoPopover.getBoundingClientRect();
    const viewportWidth = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 0);
    const viewportHeight = Math.max(240, window.innerHeight || document.documentElement.clientHeight || 0);
    let left = anchorRect.left;
    let top = anchorRect.bottom + margin;
    if (left + popupRect.width > viewportWidth - margin) left = Math.max(margin, viewportWidth - popupRect.width - margin);
    if (top + popupRect.height > viewportHeight - margin) top = Math.max(margin, anchorRect.top - popupRect.height - margin);
    chartInfoPopover.style.left = `${left}px`;
    chartInfoPopover.style.top = `${top}px`;
  }

  function ensureChartInfoPopover() {
    if (chartInfoPopover) return chartInfoPopover;
    const popup = document.createElement("div");
    popup.className = "bitrix-chart-info-popover hidden";
    document.body.appendChild(popup);
    document.addEventListener("pointerdown", (e) => {
      if (!chartInfoPopover || chartInfoPopover.classList.contains("hidden")) return;
      if (popup.contains(e.target) || chartInfoSession?.anchorEl?.contains(e.target)) return;
      closeChartInfoPopover();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeChartInfoPopover();
    });
    chartInfoPopover = popup;
    return popup;
  }

  function openChartInfoPopover(node, anchorEl) {
    const api = node && node.__chartApi;
    if (!api || !anchorEl) return;
    const lines = api.infoLines && api.infoLines.length
      ? api.infoLines
      : buildChartInfoLines(node, normalizeChartConfig(api.config), resolveShapeDateRange(node, api.config));
    const popup = ensureChartInfoPopover();
    chartInfoSession = { node, anchorEl };
    popup.innerHTML = lines.map((line) => `<div class="bitrix-chart-info-line">${line}</div>`).join("");
    popup.classList.remove("hidden");
    positionChartInfoPopover(anchorEl.getBoundingClientRect());
  }

  async function promptChartConfig(initialConfig) {
    const modal = ensureChartConfigModal();
    if (!modal || !modal.__open) return null;
    return modal.__open(initialConfig);
  }

  function buildChartDom(node, config) {
    node.classList.add("shape-chart-widget");
    preserveBitrixShapeChrome(node, () => {
    const card = document.createElement("div");
    card.className = "bitrix-chart-card";
    const header = document.createElement("div");
    header.className = "bitrix-chart-header";
    const headerText = document.createElement("div");
    headerText.className = "bitrix-chart-header-text";
    const title = document.createElement("div");
    title.className = "bitrix-chart-title";
    const titleText = document.createElement("span");
    titleText.className = "bitrix-chart-title-text";
    titleText.textContent = config.title || config.stageName || "График";
    const totalEl = document.createElement("span");
    totalEl.className = "bitrix-chart-total";
    title.appendChild(titleText);
    title.appendChild(totalEl);
    headerText.appendChild(title);
    const actions = document.createElement("div");
    actions.className = "bitrix-chart-actions";
    const infoBtn = document.createElement("button");
    infoBtn.type = "button";
    infoBtn.className = "bitrix-chart-icon-btn bitrix-chart-info-btn";
    infoBtn.title = "Источник данных и фильтры";
    infoBtn.textContent = "i";
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
    actions.appendChild(infoBtn);
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
    body.appendChild(canvas);
    card.appendChild(header);
    card.appendChild(legend);
    card.appendChild(body);
    node.appendChild(card);

    node.__chartApi = {
      config: normalizeChartConfig(config),
      cardEl: card,
      bodyEl: body,
      canvas,
      titleEl: title,
      titleTextEl: titleText,
      totalEl,
      infoLines: [],
      infoBtn,
      refreshBtn,
      settingsBtn
    };
    applyChartVisualStyles(node, config);

    infoBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    refreshBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    settingsBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    infoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (chartInfoSession && chartInfoSession.node === node && chartInfoPopover && !chartInfoPopover.classList.contains("hidden")) {
        closeChartInfoPopover();
        return;
      }
      openChartInfoPopover(node, infoBtn);
    });
    refreshBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      refreshShapeChart(node, { bustCache: true });
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
    });
  }

  function applyChartConfig(node, config, doSave) {
    const normalized = normalizeChartConfig(config);
    node.dataset.chartConfig = JSON.stringify(normalized);
    if (!isBitrixWebhookConfigured()) {
      buildBitrixConnectPlaceholder(node, "chart");
      if (doSave && window.saveLayout) window.saveLayout();
      return;
    }
    node.__bitrixPlaceholder = false;
    buildChartDom(node, normalized);
    refreshShapeChart(node);
    if (doSave && window.saveLayout) window.saveLayout();
  }

  async function refreshShapeChart(node, opts = {}) {
    if (opts.bustCache) bustBitrixDataCache();
    const api = resolveChartLiveApi(node);
    if (!api) return;
    const requestId = (api.refreshRequestId = (api.refreshRequestId || 0) + 1);
    const cfg = normalizeChartConfig(api.config || (() => {
      try {
        return JSON.parse(node.dataset.chartConfig || "{}");
      } catch {
        return defaultChartConfig();
      }
    })());
    api.config = cfg;
    const dateRange = resolveShapeDateRange(node, cfg);
    api.infoLines = buildChartInfoLines(node, cfg, dateRange);
    const bodyEl = api.bodyEl || getChartContainerEl(node)?.querySelector(".bitrix-chart-body");
    setBitrixContainerLoading(bodyEl, true);
    syncChartHeader(api, cfg, { loading: true, infoLines: api.infoLines });
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
      appendBitrixFieldFilterQuery(query, node);
      const data = await bitrixFetch(`/api/integrations/bitrix/chart-data?${query.toString()}`, {
        bustCache: !!opts.bustCache
      });
      if (api.refreshRequestId !== requestId) return;
      const liveCanvas = resolveChartLiveApi(node)?.canvas;
      if (!liveCanvas || api.refreshRequestId !== requestId) return;
      const points = filterChartPointsByDateRange(data.points || [], dateRange.dateFrom, dateRange.dateTo, cfg.granularity);
      renderLineChart(liveCanvas, points, cfg);
      const total = points.reduce((sum, point) => sum + (Number(point.value) || 0), 0);
      syncChartHeader(api, cfg, { total, infoLines: api.infoLines });
    } catch (err) {
      if (api.refreshRequestId !== requestId) return;
      const liveCanvas = resolveChartLiveApi(node)?.canvas;
      syncChartHeader(api, cfg, { error: true, infoLines: api.infoLines });
      if (liveCanvas) renderLineChart(liveCanvas, [], cfg, { errorMessage: formatBitrixErrorMessage(err) });
    } finally {
      if (api.refreshRequestId === requestId) {
        setBitrixContainerLoading(bodyEl, false);
      }
    }
  }

  function formatChartAxisLabel(label, granularity) {
    const text = String(label || "").trim();
    if (granularity === "month") {
      const monthMatch = text.match(/^(\d{4})-(\d{2})$/);
      if (monthMatch) return `${monthMatch[2]}.${monthMatch[1]}`;
    }
    const isoDate = bucketLabelToIsoDate(label, granularity);
    const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return `${match[3]}.${match[2]}`;
    return text;
  }

  function getChartAxisLabelIndices(pointCount, granularity) {
    if (pointCount <= 0) return [];
    if (granularity === "day" || granularity === "week") {
      return Array.from({ length: pointCount }, (_, index) => index);
    }
    if (pointCount <= 12) return Array.from({ length: pointCount }, (_, index) => index);
    const step = Math.max(1, Math.ceil(pointCount / 8));
    return Array.from({ length: pointCount }, (_, index) => index).filter(
      (index) => index === 0 || index === pointCount - 1 || index % step === 0
    );
  }

  function getChartAxisFontSize(pointCount, granularity) {
    if (granularity !== "day" && granularity !== "week") return 10;
    if (pointCount > 24) return 7;
    if (pointCount > 16) return 8;
    if (pointCount > 10) return 9;
    return 10;
  }

  function drawChartAxisLabel(ctx, text, x, axisY) {
    const axisGap = 2;
    ctx.save();
    ctx.translate(x, axisY + axisGap);
    ctx.rotate(-Math.PI / 4);
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  function renderLineChart(canvas, points, config, opts = {}) {
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
    const axisFontSize = getChartAxisFontSize(points.length, granularity);
    const bottomPad = granularity === "day" || granularity === "week"
      ? Math.max(22, Math.min(32, 10 + axisFontSize * 2))
      : 28;
    const pad = { top: 16, right: 12, bottom: bottomPad, left: 12 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const values = points.map((p) => Number(p.value) || 0);
    const maxValue = Math.max(1, ...values, 1);
    const palette = bitrixThemePalette();

    ctx.strokeStyle = palette.chartGrid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();

    if (!points.length) {
      ctx.fillStyle = opts.errorMessage ? "#b91c1c" : "#94a3b8";
      ctx.font = "13px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(opts.errorMessage || "Нет данных за период", width / 2, height / 2);
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

    const labelIndices = new Set(getChartAxisLabelIndices(coords.length, granularity));
    coords.forEach((pt, index) => {
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = palette.chartValue;
      ctx.font = "11px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(formatCardValue(pt.value, config && config.metric === "sum" ? "sum" : "count"), pt.x, pt.y - 8);
      if (labelIndices.has(index)) {
        ctx.fillStyle = palette.chartAxis;
        ctx.font = `${axisFontSize}px Inter, system-ui, sans-serif`;
        const axisLabel = formatChartAxisLabel(pt.label, granularity);
        drawChartAxisLabel(ctx, axisLabel, pt.x, pad.top + plotH);
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
    if (!opts.chartConfig && isBitrixWebhookConfigured() && (!window.isWorkspaceReadOnly || !window.isWorkspaceReadOnly())) {
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
    preserveBitrixShapeChrome(node, () => {
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
    applyTextStyleToElement(valueEl, cfg.valueStyle, defaultCardValueStyle);
    applyTextStyleToElement(labelEl, cfg.labelStyle, defaultCardLabelStyle);

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
      refreshShapeCard(node, { bustCache: true });
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
    });
  }

  function applyCardConfig(node, config, doSave) {
    const normalized = normalizeCardConfig(config);
    node.dataset.cardConfig = JSON.stringify(normalized);
    if (!isBitrixWebhookConfigured()) {
      buildBitrixConnectPlaceholder(node, "card");
      if (doSave && window.saveLayout) window.saveLayout();
      return;
    }
    node.__bitrixPlaceholder = false;
    buildCardDom(node, normalized);
    refreshShapeCard(node);
    if (doSave && window.saveLayout) window.saveLayout();
  }

  async function refreshShapeCard(node, opts = {}) {
    if (opts.bustCache) bustBitrixDataCache();
    const api = resolveCardLiveApi(node);
    if (!api || !api.valueEl) return;
    const requestId = (api.refreshRequestId = (api.refreshRequestId || 0) + 1);
    const cfg = normalizeCardConfig(api.config || (() => {
      try {
        return JSON.parse(node.dataset.cardConfig || "{}");
      } catch {
        return defaultCardConfig();
      }
    })());
    api.config = cfg;
    if (!api.labelEl?.dataset.editing) {
      api.labelEl.textContent = cfg.title || cfg.stageName || "Карточка";
    }
    api.valueEl.textContent = "…";
    setBitrixContainerLoading(api.cardEl, true);
    if (api.statusEl) {
      api.statusEl.textContent = BITRIX_LOADING_MESSAGE;
      api.statusEl.classList.remove("hidden");
    }
    try {
      const dateRange = resolveShapeDateRange(node, cfg);
      const query = new URLSearchParams({
        entity: cfg.entity,
        categoryId: String(cfg.categoryId || 0),
        stageId: cfg.stageId || "",
        metric: cfg.metric,
        sumField: cfg.sumField || "OPPORTUNITY",
        dateFrom: dateRange.dateFrom,
        dateTo: dateRange.dateTo
      });
      appendBitrixFieldFilterQuery(query, node);
      const data = await bitrixFetch(`/api/integrations/bitrix/card-data?${query.toString()}`, {
        bustCache: !!opts.bustCache
      });
      if (api.refreshRequestId !== requestId) return;
      api.valueEl.textContent = formatCardValue(data.value, cfg.metric);
      setBitrixCardLastValue(node, data.value);
      if (api.statusEl) api.statusEl.classList.add("hidden");
    } catch (err) {
      if (api.refreshRequestId !== requestId) return;
      api.valueEl.textContent = "—";
      setBitrixCardLastValue(node, 0);
      if (api.statusEl) {
        api.statusEl.textContent = formatBitrixErrorMessage(err);
        api.statusEl.classList.remove("hidden");
      }
    } finally {
      if (api.refreshRequestId === requestId) {
        setBitrixContainerLoading(api.cardEl, false);
      }
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
    if (!opts.cardConfig && isBitrixWebhookConfigured() && (!window.isWorkspaceReadOnly || !window.isWorkspaceReadOnly())) {
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
    const today = new Date().toISOString().slice(0, 10);
    return {
      title: "Фильтр",
      entity: "deal",
      filterField: BITRIX_FILTER_DATE_FIELD,
      filterFieldName: "Дата",
      filterFieldType: "date",
      filterMode: "date",
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
      sliderMinDate: FILTER_SLIDER_MIN_DATE,
      sliderMaxDate: today,
      hiddenValues: [],
      excludedShapeIds: []
    };
  }

  function isDateFilterMode(cfg) {
    const config = normalizeFilterConfig(cfg);
    return config.filterField === BITRIX_FILTER_DATE_FIELD;
  }

  function normalizeFilterConfig(raw) {
    const base = defaultFilterConfig();
    if (!raw || typeof raw !== "object") return base;
    const excluded = Array.isArray(raw.excludedShapeIds)
      ? raw.excludedShapeIds.map((id) => String(id || "").trim()).filter(Boolean)
      : [];
    const filterField = String(raw.filterField || base.filterField);
    const filterFieldType = String(raw.filterFieldType || base.filterFieldType);
    const filterMode = filterField === BITRIX_FILTER_DATE_FIELD ? "date" : "list";
    let sliderMinDate = String(raw.sliderMinDate || base.sliderMinDate);
    let sliderMaxDate = String(raw.sliderMaxDate || base.sliderMaxDate);
    if (new Date(sliderMinDate).getTime() > new Date(sliderMaxDate).getTime()) {
      const tmp = sliderMinDate;
      sliderMinDate = sliderMaxDate;
      sliderMaxDate = tmp;
    }
    let dateFrom = clampIsoDate(String(raw.dateFrom || base.dateFrom), sliderMinDate, sliderMaxDate);
    let dateTo = clampIsoDate(String(raw.dateTo || base.dateTo), sliderMinDate, sliderMaxDate);
    if (new Date(dateFrom).getTime() > new Date(dateTo).getTime()) {
      const tmp = dateFrom;
      dateFrom = dateTo;
      dateTo = tmp;
    }
    const hiddenValues = Array.isArray(raw.hiddenValues)
      ? raw.hiddenValues.map((item) => String(item))
      : [];
    return {
      title: String(raw.title || raw.filterFieldName || base.title),
      entity: raw.entity === "lead" ? "lead" : "deal",
      filterField,
      filterFieldName: String(raw.filterFieldName || base.filterFieldName),
      filterFieldType,
      filterMode,
      dateFrom,
      dateTo,
      sliderMinDate,
      sliderMaxDate,
      hiddenValues,
      excludedShapeIds: excluded,
      cardStyle: raw.cardStyle ? normalizeCardStyle(raw.cardStyle) : undefined
    };
  }

  function getFilterContainerEl(node) {
    return node && node.querySelector(".bitrix-date-filter-card");
  }

  function applyFilterVisualStyles(node, config) {
    const cardEl = getFilterContainerEl(node);
    if (!cardEl) return;
    const cfg = normalizeFilterConfig(config);
    const cardStyle = cfg.cardStyle ? adaptCardStyleToTheme(cfg.cardStyle) : defaultCardStyle();
    applyCardContainerStyle(cardEl, cardStyle);
  }

  function syncBitrixWidgetsToTheme(opts = {}) {
    document.querySelectorAll('.shape[data-shape-type="shape-chart"]').forEach((node) => {
      if (node.__bitrixPlaceholder) return;
      let config;
      try {
        config = normalizeChartConfig(JSON.parse(node.dataset.chartConfig || "{}"));
      } catch {
        return;
      }
      config = migrateBitrixVisualConfig(config);
      node.dataset.chartConfig = JSON.stringify(config);
      if (node.__chartApi) node.__chartApi.config = config;
      applyChartVisualStyles(node, config);
      refreshShapeChart(node);
    });
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-card"]').forEach((node) => {
      if (node.__bitrixPlaceholder || !node.__cardApi) return;
      let config;
      try {
        config = normalizeCardConfig(JSON.parse(node.dataset.cardConfig || "{}"));
      } catch {
        return;
      }
      config = migrateBitrixVisualConfig(config);
      node.dataset.cardConfig = JSON.stringify(config);
      node.__cardApi.config = config;
      applyCardContainerStyle(node.__cardApi.cardEl, config.cardStyle);
      applyTextStyleToElement(node.__cardApi.valueEl, config.valueStyle, defaultCardValueStyle);
      applyTextStyleToElement(node.__cardApi.labelEl, config.labelStyle, defaultCardLabelStyle);
    });
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]').forEach((node) => {
      if (!node.__filterApi) return;
      let config;
      try {
        config = normalizeFilterConfig(JSON.parse(node.dataset.filterConfig || "{}"));
      } catch {
        return;
      }
      config = migrateBitrixVisualConfig(config);
      node.dataset.filterConfig = JSON.stringify(config);
      node.__filterApi.config = config;
      applyFilterVisualStyles(node, config);
    });
    if (opts.save && window.saveLayout) window.saveLayout();
  }

  function applyFilterFormatPanel(node) {
    const cardEl = getFilterContainerEl(node);
    if (!cardEl) return false;
    const cfg = normalizeFilterConfig(node.__filterApi?.config || {});
    const currentStyle = readCardStyleFromElement(cardEl);
    const cardStyle = readContainerStyleFromFormatPanel(currentStyle);
    applyCardContainerStyle(cardEl, cardStyle);
    cfg.cardStyle = cardStyle;
    if (node.__filterApi) node.__filterApi.config = cfg;
    node.dataset.filterConfig = JSON.stringify(cfg);
    return true;
  }

  function syncFilterFormatPanel(node) {
    const cardEl = getFilterContainerEl(node);
    if (!cardEl) return;
    syncContainerStyleToFormatPanel(cardEl, null);
    const hint = fpEl("bitrixCardFormatHint");
    if (hint) hint.classList.add("hidden");
  }

  function getFilterSliderBounds(cfg) {
    const normalized = normalizeFilterConfig(cfg);
    return {
      minStr: normalized.sliderMinDate,
      maxStr: normalized.sliderMaxDate
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

  function getActiveBitrixFiltersForShape(targetNode) {
    if (!targetNode || !targetNode.dataset.shapeId) return [];
    const filters = [];
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]').forEach((filterNode) => {
      if (!filterAppliesToShape(filterNode, targetNode)) return;
      const cfg = getFilterConfigFromNode(filterNode);
      if (isDateFilterMode(cfg)) {
        filters.push({
          mode: "date",
          dateFrom: cfg.dateFrom,
          dateTo: cfg.dateTo,
          filterNode
        });
        return;
      }
      if (cfg.filterField) {
        filters.push({
          mode: "list",
          entity: cfg.entity,
          filterField: cfg.filterField,
          hiddenValues: Array.isArray(cfg.hiddenValues) ? cfg.hiddenValues.slice() : [],
          filterNode
        });
      }
    });
    return filters;
  }

  function getEffectiveBitrixFilterForShape(targetNode) {
    const listFilter = getActiveBitrixFiltersForShape(targetNode).find((filter) => filter.mode === "list");
    return listFilter || null;
  }

  function getEffectiveDateFilterForShape(targetNode) {
    const dateFilter = getActiveBitrixFiltersForShape(targetNode).find((filter) => filter.mode === "date");
    if (!dateFilter) return null;
    return { dateFrom: dateFilter.dateFrom, dateTo: dateFilter.dateTo, filterNode: dateFilter.filterNode };
  }

  function appendBitrixFieldFilterQuery(query, targetNode) {
    const listFilter = getActiveBitrixFiltersForShape(targetNode).find(
      (filter) => filter.mode === "list" && filter.filterField && filter.hiddenValues && filter.hiddenValues.length
    );
    if (!listFilter) return;
    query.set("filterField", listFilter.filterField);
    query.set("filterHiddenValues", JSON.stringify(listFilter.hiddenValues));
  }

  function getListFilterVisibleCount(cfg, options) {
    const hidden = new Set((cfg.hiddenValues || []).map(String));
    if (Array.isArray(options) && options.length) {
      return options.filter((entry) => !hidden.has(String(entry.value))).length;
    }
    const optionCount = Number(options) || 0;
    if (!optionCount) return 0;
    return Math.max(0, optionCount - hidden.size);
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
    const { minStr, maxStr } = getFilterSliderBounds(cfg);
    const fromRatio = dateToSliderRatio(cfg.dateFrom, minStr, maxStr);
    const toRatio = dateToSliderRatio(cfg.dateTo, minStr, maxStr);
    const left = Math.min(fromRatio, toRatio) * 100;
    const right = Math.max(fromRatio, toRatio) * 100;
    api.rangeEl.style.left = `${left}%`;
    api.rangeEl.style.width = `${Math.max(0, right - left)}%`;
    api.handleFrom.style.left = `${fromRatio * 100}%`;
    api.handleTo.style.left = `${toRatio * 100}%`;
    api.dateFromInput.min = minStr;
    api.dateFromInput.max = maxStr;
    api.dateToInput.min = minStr;
    api.dateToInput.max = maxStr;
    if (api.dateFromInput.value !== cfg.dateFrom) api.dateFromInput.value = cfg.dateFrom;
    if (api.dateToInput.value !== cfg.dateTo) api.dateToInput.value = cfg.dateTo;
    if (api.titleEl.textContent !== cfg.title) api.titleEl.textContent = cfg.title;
  }

  function persistFilterConfig(node, config, doSave, opts = {}) {
    const normalized = normalizeFilterConfig(config);
    const prevJson = node.dataset.filterConfig || "";
    const nextJson = JSON.stringify(normalized);
    const changed = prevJson !== nextJson;
    node.dataset.filterConfig = nextJson;
    if (node.__filterApi) {
      node.__filterApi.config = normalized;
      if (isDateFilterMode(normalized)) {
        syncFilterSliderUi(node);
      } else {
        syncListFilterSummary(node);
      }
    }
    if (doSave && window.saveLayout) window.saveLayout();
    if (opts.refresh !== false) {
      if (changed) invalidateScopedListFilterFieldOptions(node);
      queueFilterTargetsRefresh(node, { bustCache: !!opts.bustCache });
    }
    return normalized;
  }

  function refreshLinkedBitrixTargets(filterNode, opts = {}) {
    const targets = filterNode ? getLinkedBitrixTargetsForFilter(filterNode) : [];
    if (targets.length) {
      void Promise.all(targets.map((node) => (
        node.dataset.shapeType === "shape-chart"
          ? refreshShapeChart(node, opts)
          : node.dataset.shapeType === "shape-bitrix-card"
            ? refreshShapeCard(node, opts)
            : Promise.resolve()
      )));
      return;
    }
    void refreshAllBitrixWidgets(opts);
  }

  function refreshScopedListFilterFieldOptions(sourceFilterNode) {
    document.querySelectorAll('.shape[data-shape-type="shape-bitrix-date-filter"]').forEach((node) => {
      if (isDateFilterMode(getFilterConfigFromNode(node))) return;
      if (sourceFilterNode && !listFiltersShareTargets(sourceFilterNode, node)) return;
      preloadListFilterSummary(node);
    });
  }

  function refreshFilterTargets(filterNode, opts = {}) {
    refreshLinkedBitrixTargets(filterNode, opts);
    setTimeout(() => refreshScopedListFilterFieldOptions(filterNode), 0);
  }

  function invalidateListFilterFieldOptions(filterNode) {
    const api = filterNode?.__filterApi;
    if (!api) return;
    api.fieldOptions = null;
    api.fieldOptionsPromise = null;
    api.optionCount = 0;
    api.optionsScopeKey = null;
  }

  async function refreshAllBitrixWidgets(opts = {}) {
    const charts = Array.from(document.querySelectorAll('.shape[data-shape-type="shape-chart"]'));
    const cards = Array.from(document.querySelectorAll('.shape[data-shape-type="shape-bitrix-card"]'));
    await Promise.all([
      ...charts.map((node) => refreshShapeChart(node, opts)),
      ...cards.map((node) => refreshShapeCard(node, opts))
    ]);
  }

  function applyFilterDateRange(node, patch, opts = {}) {
    const doSave = opts.doSave !== false;
    const doRefresh = opts.doRefresh !== false;
    const cfg = normalizeFilterConfig(Object.assign({}, getFilterConfigFromNode(node), patch));
    persistFilterConfig(node, cfg, doSave, { refresh: doRefresh, bustCache: !!opts.bustCache });
  }

  let bitrixFieldFilterPopup = null;
  let bitrixFieldFilterSession = null;

  function closeBitrixFieldFilterPopup() {
    bitrixFieldFilterSession = null;
    if (bitrixFieldFilterPopup) bitrixFieldFilterPopup.classList.add("hidden");
  }

  function positionBitrixFieldFilterPopup(anchorRect) {
    if (!bitrixFieldFilterPopup || !anchorRect) return;
    const margin = 8;
    const popupRect = bitrixFieldFilterPopup.getBoundingClientRect();
    const viewportWidth = Math.max(320, window.innerWidth || document.documentElement.clientWidth || 0);
    const viewportHeight = Math.max(240, window.innerHeight || document.documentElement.clientHeight || 0);
    let left = anchorRect.left;
    let top = anchorRect.bottom + margin;
    if (left + popupRect.width > viewportWidth - margin) left = Math.max(margin, viewportWidth - popupRect.width - margin);
    if (top + popupRect.height > viewportHeight - margin) top = Math.max(margin, anchorRect.top - popupRect.height - margin);
    bitrixFieldFilterPopup.style.left = `${left}px`;
    bitrixFieldFilterPopup.style.top = `${top}px`;
  }

  function renderBitrixFieldFilterPopupValues() {
    if (!bitrixFieldFilterPopup || !bitrixFieldFilterSession) return;
    const list = bitrixFieldFilterPopup.querySelector(".bitrix-field-filter-values");
    const shownCount = bitrixFieldFilterPopup.querySelector("[data-role='shown-count']");
    const selectAllBtn = bitrixFieldFilterPopup.querySelector(".bitrix-field-filter-select-all");
    if (!list) return;
    const { options, draftHidden, search, loading } = bitrixFieldFilterSession;
    const query = String(search || "").trim().toLowerCase();
    if (loading) {
      list.innerHTML = "";
      const pending = document.createElement("div");
      pending.className = "bitrix-field-filter-empty";
      pending.textContent = "Загрузка значений…";
      list.appendChild(pending);
      if (shownCount) shownCount.textContent = "…";
      if (selectAllBtn) selectAllBtn.textContent = "Выбрать все";
      return;
    }
    const filteredOptions = options.filter((entry) => {
      const label = String(entry.label || entry.value || "").toLowerCase();
      return !query || label.includes(query);
    });
    const visibleCount = options.filter((entry) => !draftHidden.has(String(entry.value))).length;
    if (shownCount) shownCount.textContent = String(visibleCount);
    if (selectAllBtn) selectAllBtn.textContent = `Выбрать все (${options.length})`;
    list.innerHTML = "";
    filteredOptions.forEach((entry) => {
      const label = document.createElement("label");
      label.className = "bitrix-field-filter-value-item";
      const input = document.createElement("input");
      input.type = "checkbox";
      const value = String(entry.value);
      input.checked = !draftHidden.has(value);
      input.addEventListener("change", () => {
        if (input.checked) bitrixFieldFilterSession.draftHidden.delete(value);
        else bitrixFieldFilterSession.draftHidden.add(value);
        renderBitrixFieldFilterPopupValues();
      });
      const text = document.createElement("span");
      const countSuffix = entry.count ? ` (${entry.count})` : "";
      text.textContent = `${entry.label || value}${countSuffix}`;
      label.appendChild(input);
      label.appendChild(text);
      list.appendChild(label);
    });
  }

  function ensureBitrixFieldFilterPopup() {
    if (bitrixFieldFilterPopup) return bitrixFieldFilterPopup;
    const popup = document.createElement("div");
    popup.className = "bitrix-field-filter-popup hidden";
    popup.innerHTML = `
      <div class="bitrix-field-filter-select-row">
        <button type="button" class="bitrix-field-filter-select-all">Выбрать все</button>
        <span class="bitrix-field-filter-sep">—</span>
        <button type="button" class="bitrix-field-filter-clear">Сбросить</button>
      </div>
      <div class="bitrix-field-filter-shown">Показано: <span data-role="shown-count">0</span></div>
      <label class="bitrix-field-filter-search-wrap">
        <input type="search" class="bitrix-field-filter-search" placeholder="Поиск" />
      </label>
      <div class="bitrix-field-filter-values"></div>
      <div class="bitrix-field-filter-actions">
        <button type="button" class="bitrix-field-filter-cancel">Отмена</button>
        <button type="button" class="bitrix-field-filter-ok">ОК</button>
      </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector(".bitrix-field-filter-select-all")?.addEventListener("click", () => {
      if (!bitrixFieldFilterSession) return;
      bitrixFieldFilterSession.draftHidden.clear();
      renderBitrixFieldFilterPopupValues();
    });
    popup.querySelector(".bitrix-field-filter-clear")?.addEventListener("click", () => {
      if (!bitrixFieldFilterSession) return;
      bitrixFieldFilterSession.options.forEach((entry) => bitrixFieldFilterSession.draftHidden.add(String(entry.value)));
      renderBitrixFieldFilterPopupValues();
    });
    popup.querySelector(".bitrix-field-filter-search")?.addEventListener("input", (e) => {
      if (!bitrixFieldFilterSession) return;
      bitrixFieldFilterSession.search = e.target.value;
      renderBitrixFieldFilterPopupValues();
    });
    popup.querySelector(".bitrix-field-filter-cancel")?.addEventListener("click", () => closeBitrixFieldFilterPopup());
    popup.querySelector(".bitrix-field-filter-ok")?.addEventListener("click", () => {
      if (!bitrixFieldFilterSession) return;
      const hiddenValues = Array.from(bitrixFieldFilterSession.draftHidden);
      const { node, onApply } = bitrixFieldFilterSession;
      closeBitrixFieldFilterPopup();
      if (onApply) onApply(hiddenValues);
      if (node) syncListFilterSummary(node);
    });
    document.addEventListener("pointerdown", (e) => {
      if (!bitrixFieldFilterPopup || bitrixFieldFilterPopup.classList.contains("hidden")) return;
      if (popup.contains(e.target) || bitrixFieldFilterSession?.anchorEl?.contains(e.target)) return;
      closeBitrixFieldFilterPopup();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeBitrixFieldFilterPopup();
    });
    bitrixFieldFilterPopup = popup;
    return popup;
  }

  async function openBitrixFieldFilterPopup(node, anchorEl) {
    const cfg = getFilterConfigFromNode(node);
    if (isDateFilterMode(cfg)) return;
    ensureBitrixFieldFilterPopup();
    const cachedOptions = getCachedBitrixFieldOptions(node, cfg, getFieldOptionsScopeForFilter(node));
    const hasCachedOptions = Array.isArray(cachedOptions) && cachedOptions.length > 0;
    bitrixFieldFilterSession = {
      node,
      anchorEl,
      options: hasCachedOptions ? cachedOptions : [],
      search: "",
      loading: !hasCachedOptions,
      draftHidden: new Set((cfg.hiddenValues || []).map(String)),
      onApply: (hiddenValues) => {
        applyFilterConfigPatch(node, { hiddenValues }, true);
      }
    };
    const searchInput = bitrixFieldFilterPopup.querySelector(".bitrix-field-filter-search");
    if (searchInput) searchInput.value = "";
    renderBitrixFieldFilterPopupValues();
    bitrixFieldFilterPopup.classList.remove("hidden");
    positionBitrixFieldFilterPopup(anchorEl.getBoundingClientRect());
    if (hasCachedOptions) return;
    try {
      const options = await ensureBitrixFieldOptions(node, cfg);
      if (!bitrixFieldFilterSession || bitrixFieldFilterSession.node !== node) return;
      bitrixFieldFilterSession.loading = false;
      bitrixFieldFilterSession.options = options;
      syncListFilterSummary(node);
      renderBitrixFieldFilterPopupValues();
      positionBitrixFieldFilterPopup(anchorEl.getBoundingClientRect());
    } catch {
      if (!bitrixFieldFilterSession || bitrixFieldFilterSession.node !== node) return;
      bitrixFieldFilterSession.loading = false;
      bitrixFieldFilterSession.options = [];
      renderBitrixFieldFilterPopupValues();
      const list = bitrixFieldFilterPopup.querySelector(".bitrix-field-filter-values");
      if (list) {
        list.innerHTML = "";
        const err = document.createElement("div");
        err.className = "bitrix-field-filter-empty";
        err.textContent = "Не удалось загрузить значения";
        list.appendChild(err);
      }
    }
  }

  function syncListFilterSummary(node) {
    const api = node && node.__filterApi;
    if (!api || !api.summaryEl) return;
    const cfg = getFilterConfigFromNode(node);
    const optionCount = Number(api.optionCount) || 0;
    const visible = getListFilterVisibleCount(cfg, api.fieldOptions || optionCount);
    api.summaryEl.textContent = optionCount
      ? `Показано: ${visible}`
      : "Загрузка значений…";
    if (api.openBtn) {
      api.openBtn.textContent = cfg.filterFieldName || cfg.filterField || "Фильтр";
    }
    if (api.titleEl) {
      api.titleEl.textContent = cfg.title || cfg.filterFieldName || "Фильтр";
    }
  }

  async function preloadListFilterSummary(node) {
    const api = node && node.__filterApi;
    if (!api || isDateFilterMode(getFilterConfigFromNode(node))) return;
    const cfg = getFilterConfigFromNode(node);
    const cached = getCachedBitrixFieldOptions(node, cfg, getFieldOptionsScopeForFilter(node));
    if (cached?.length) {
      api.fieldOptions = cached;
      api.optionCount = cached.length;
      syncListFilterSummary(node);
      return cached;
    }
    const cardEl = getFilterContainerEl(node);
    setBitrixContainerLoading(cardEl, true, "Загрузка значений…");
    syncListFilterSummary(node);
    api.fieldOptionsPromise = ensureBitrixFieldOptions(node, cfg)
      .then((options) => {
        syncListFilterSummary(node);
        return options;
      })
      .catch(() => {
        if (api.summaryEl) api.summaryEl.textContent = "Не удалось загрузить значения";
        if (node.__filterApi) node.__filterApi.fieldOptionsPromise = null;
        return [];
      })
      .finally(() => {
        setBitrixContainerLoading(cardEl, false);
      });
    return api.fieldOptionsPromise;
  }

  function applyFilterConfigPatch(node, patch, doSave) {
    const cfg = normalizeFilterConfig(Object.assign({}, getFilterConfigFromNode(node), patch));
    persistFilterConfig(node, cfg, doSave, { bustCache: true });
  }

  function bindFilterSlider(node) {
    const api = node.__filterApi;
    if (!api || api.sliderBound) return;
    api.sliderBound = true;

    const startDrag = (handleKey, event) => {
      if (!canEditBitrixWidget()) return;
      event.preventDefault();
      event.stopPropagation();
      const track = api.trackEl;
      const rect = track.getBoundingClientRect();
      const move = (e) => {
        const { minStr, maxStr } = getFilterSliderBounds(getFilterConfigFromNode(node));
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
        refreshFilterTargets(node, { bustCache: true });
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
      const cfg = getFilterConfigFromNode(node);
      const { minStr, maxStr } = getFilterSliderBounds(cfg);
      const rect = api.trackEl.getBoundingClientRect();
      const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) : 0;
      const date = sliderRatioToDate(ratio, minStr, maxStr);
      const fromDist = Math.abs(dateToSliderRatio(cfg.dateFrom, minStr, maxStr) - ratio);
      const toDist = Math.abs(dateToSliderRatio(cfg.dateTo, minStr, maxStr) - ratio);
      if (fromDist <= toDist) applyFilterDateRange(node, { dateFrom: date, dateTo: cfg.dateTo }, { bustCache: true });
      else applyFilterDateRange(node, { dateFrom: cfg.dateFrom, dateTo: date }, { bustCache: true });
    });
  }

  function buildFilterDom(node, config) {
    node.classList.add("shape-bitrix-date-filter-widget");
    preserveBitrixShapeChrome(node, () => {
    const cfg = normalizeFilterConfig(config);
    const card = document.createElement("div");
    card.className = "bitrix-date-filter-card";

    const header = document.createElement("div");
    header.className = "bitrix-date-filter-header";
    const titleEl = document.createElement("div");
    titleEl.className = "bitrix-date-filter-title";
    titleEl.textContent = cfg.title || cfg.filterFieldName || "Фильтр";
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
    card.appendChild(header);

    const api = {
      config: cfg,
      cardEl: card,
      titleEl,
      settingsBtn
    };

    if (isDateFilterMode(cfg)) {
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
      card.appendChild(inputs);
      card.appendChild(slider);

      Object.assign(api, {
        dateFromInput,
        dateToInput,
        trackEl: track,
        rangeEl: range,
        handleFrom,
        handleTo
      });

      const onDateInputChange = (doSave) => {
        applyFilterDateRange(node, {
          dateFrom: dateFromInput.value,
          dateTo: dateToInput.value
        }, { doSave, bustCache: doSave });
      };
      dateFromInput.addEventListener("input", (e) => {
        e.stopPropagation();
        onDateInputChange(false);
      });
      dateFromInput.addEventListener("change", (e) => {
        e.stopPropagation();
        onDateInputChange(true);
      });
      dateToInput.addEventListener("input", (e) => {
        e.stopPropagation();
        onDateInputChange(false);
      });
      dateToInput.addEventListener("change", (e) => {
        e.stopPropagation();
        onDateInputChange(true);
      });
      [dateFromInput, dateToInput, track, handleFrom, handleTo].forEach((el) => {
        el.addEventListener("pointerdown", (e) => e.stopPropagation());
      });
    } else {
      const body = document.createElement("div");
      body.className = "bitrix-field-filter-body";
      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "bitrix-field-filter-open";
      openBtn.textContent = cfg.filterFieldName || cfg.filterField || "Фильтр";
      const summaryEl = document.createElement("div");
      summaryEl.className = "bitrix-field-filter-summary";
      summaryEl.textContent = "Загрузка значений…";
      body.appendChild(openBtn);
      body.appendChild(summaryEl);
      card.appendChild(body);
      Object.assign(api, { openBtn, summaryEl, optionCount: 0, fieldOptions: null, fieldOptionsPromise: null, optionsScopeKey: null });
      openBtn.addEventListener("pointerdown", stopBitrixActionPointer);
      openBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await openBitrixFieldFilterPopup(node, openBtn);
      });
    }

    node.appendChild(card);
    node.__filterApi = api;

    applyFilterVisualStyles(node, cfg);

    settingsBtn.addEventListener("pointerdown", stopBitrixActionPointer);
    settingsBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!canEditBitrixWidget()) return;
      const prev = getFilterConfigFromNode(node);
      const next = await promptDateFilterConfig(node);
      if (!next) return;
      const normalized = normalizeFilterConfig(next);
      const needRebuild = prev.filterField !== normalized.filterField
        || prev.filterMode !== normalized.filterMode
        || isDateFilterMode(prev) !== isDateFilterMode(normalized);
      if (needRebuild) applyFilterConfig(node, normalized, true);
      else persistFilterConfig(node, normalized, true);
    });

    if (isDateFilterMode(cfg)) {
      bindFilterSlider(node);
      syncFilterSliderUi(node);
    } else {
      preloadListFilterSummary(node);
    }
    });
  }

  function applyFilterConfig(node, config, doSave) {
    const normalized = normalizeFilterConfig(config);
    node.dataset.filterConfig = JSON.stringify(normalized);
    if (!isBitrixWebhookConfigured()) {
      buildBitrixConnectPlaceholder(node, "filter");
      if (doSave && window.saveLayout) window.saveLayout();
      return;
    }
    node.__bitrixPlaceholder = false;
    buildFilterDom(node, normalized);
    if (doSave && window.saveLayout) window.saveLayout();
    queueFilterTargetsRefresh(node);
  }

  function normalizeFilterFieldSearchText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function filterBitrixFieldCatalog(fields, query) {
    const q = normalizeFilterFieldSearchText(query);
    if (!q) return fields.slice();
    return fields.filter((field) => {
      const name = normalizeFilterFieldSearchText(field.name || "");
      const id = normalizeFilterFieldSearchText(field.id || "");
      return name.includes(q) || id.includes(q);
    });
  }

  function renderBitrixFilterFieldSelect(fieldSelect, fields, selectedFieldId, query = "") {
    if (!fieldSelect) return;
    const selected = String(selectedFieldId || BITRIX_FILTER_DATE_FIELD);
    let visible = filterBitrixFieldCatalog(fields, query);
    if (selected && !visible.some((field) => String(field.id) === selected)) {
      const current = fields.find((field) => String(field.id) === selected);
      if (current) visible = [current, ...visible];
    }
    fieldSelect.innerHTML = "";
    if (!visible.length) {
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = "Ничего не найдено";
      empty.disabled = true;
      fieldSelect.appendChild(empty);
      fieldSelect.disabled = true;
      return;
    }
    visible.forEach((field) => {
      const opt = document.createElement("option");
      opt.value = String(field.id);
      opt.textContent = String(field.name || field.id);
      opt.dataset.fieldType = String(field.type || "");
      opt.dataset.fieldMode = String(field.mode || (field.id === BITRIX_FILTER_DATE_FIELD ? "date" : "list"));
      fieldSelect.appendChild(opt);
    });
    if (visible.some((field) => String(field.id) === selected)) {
      fieldSelect.value = selected;
    } else {
      fieldSelect.value = String(visible[0].id);
    }
    fieldSelect.disabled = false;
  }

  async function loadBitrixFilterFieldSelect(entity, fieldSelect, selectedFieldId, fieldSearchInput) {
    if (!fieldSelect) return [];
    fieldSelect.innerHTML = "";
    const loading = document.createElement("option");
    loading.value = "";
    loading.textContent = "Загрузка…";
    fieldSelect.appendChild(loading);
    fieldSelect.disabled = true;
    if (fieldSearchInput) fieldSearchInput.disabled = true;
    const data = await fetchBitrixFilterFields(entity);
    const fields = data.fields || [];
    bitrixFilterFieldCatalog = fields.slice();
    const query = fieldSearchInput ? fieldSearchInput.value : "";
    renderBitrixFilterFieldSelect(fieldSelect, fields, selectedFieldId, query);
    if (fieldSearchInput) fieldSearchInput.disabled = false;
    return fields;
  }

  function syncDateFilterBoundsUi(fieldSelect, dateBoundsEl) {
    if (!dateBoundsEl) return;
    const selected = fieldSelect && fieldSelect.selectedOptions && fieldSelect.selectedOptions[0];
    const fieldId = selected ? String(selected.value || "") : BITRIX_FILTER_DATE_FIELD;
    dateBoundsEl.classList.toggle("hidden", fieldId !== BITRIX_FILTER_DATE_FIELD);
  }

  function readSelectedFilterFieldMeta(fieldSelect) {
    const selected = fieldSelect && fieldSelect.selectedOptions && fieldSelect.selectedOptions[0];
    if (!selected) {
      return {
        filterField: BITRIX_FILTER_DATE_FIELD,
        filterFieldName: "Дата",
        filterFieldType: "date",
        filterMode: "date"
      };
    }
    const filterField = String(selected.value || BITRIX_FILTER_DATE_FIELD);
    return {
      filterField,
      filterFieldName: String(selected.textContent || filterField),
      filterFieldType: String(selected.dataset.fieldType || ""),
      filterMode: filterField === BITRIX_FILTER_DATE_FIELD ? "date" : "list"
    };
  }

  let dateFilterConfigResolve = null;
  let dateFilterEditingNode = null;

  function ensureDateFilterConfigModal() {
    if (dateFilterConfigModal) return dateFilterConfigModal;
    dateFilterConfigModal = $("bitrixDateFilterConfigModal");
    if (!dateFilterConfigModal) return null;

    const entitySelect = $("bitrixDateFilterEntity");
    const fieldSelect = $("bitrixDateFilterField");
    const fieldSearchInput = $("bitrixDateFilterFieldSearch");
    const dateBoundsEl = $("bitrixDateFilterDateBounds");
    const listEl = $("bitrixDateFilterTargetList");
    const sliderMinInput = $("bitrixDateFilterSliderMin");
    const sliderMaxInput = $("bitrixDateFilterSliderMax");
    const saveBtn = $("bitrixDateFilterConfigSaveBtn");
    const cancelBtn = $("bitrixDateFilterConfigCancelBtn");

    function closeDateFilterConfigModal(result) {
      dateFilterConfigModal.classList.add("hidden");
      const resolve = dateFilterConfigResolve;
      dateFilterConfigResolve = null;
      dateFilterEditingNode = null;
      if (resolve) resolve(result || null);
    }

    if (entitySelect && fieldSelect) {
      entitySelect.addEventListener("change", () => {
        if (fieldSearchInput) fieldSearchInput.value = "";
        loadBitrixFilterFieldSelect(entitySelect.value, fieldSelect, BITRIX_FILTER_DATE_FIELD, fieldSearchInput)
          .then(() => syncDateFilterBoundsUi(fieldSelect, dateBoundsEl))
          .catch(() => {});
      });
      fieldSelect.addEventListener("change", () => syncDateFilterBoundsUi(fieldSelect, dateBoundsEl));
    }
    if (fieldSearchInput && fieldSelect) {
      fieldSearchInput.addEventListener("input", () => {
        renderBitrixFilterFieldSelect(
          fieldSelect,
          bitrixFilterFieldCatalog,
          fieldSelect.value,
          fieldSearchInput.value
        );
        syncDateFilterBoundsUi(fieldSelect, dateBoundsEl);
      });
      fieldSearchInput.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") return;
        event.preventDefault();
        fieldSelect.focus();
        if (event.key === "Enter" && fieldSelect.options.length) {
          fieldSelect.dispatchEvent(new Event("change"));
        }
      });
    }

    async function openDateFilterConfigModal(filterNode) {
      const cfg = getFilterConfigFromNode(filterNode);
      dateFilterEditingNode = filterNode;
      if (entitySelect) entitySelect.value = cfg.entity;
      if (fieldSearchInput) fieldSearchInput.value = "";
      try {
        await loadBitrixFilterFieldSelect(cfg.entity, fieldSelect, cfg.filterField, fieldSearchInput);
      } catch {
        if (fieldSelect) {
          fieldSelect.innerHTML = "";
          const fallback = document.createElement("option");
          fallback.value = BITRIX_FILTER_DATE_FIELD;
          fallback.textContent = "Дата";
          fallback.dataset.fieldType = "date";
          fallback.dataset.fieldMode = "date";
          fieldSelect.appendChild(fallback);
          fieldSelect.value = BITRIX_FILTER_DATE_FIELD;
          fieldSelect.disabled = false;
        }
      }
      syncDateFilterBoundsUi(fieldSelect, dateBoundsEl);
      if (fieldSearchInput) {
        window.setTimeout(() => fieldSearchInput.focus(), 0);
      }
      if (sliderMinInput) sliderMinInput.value = cfg.sliderMinDate;
      if (sliderMaxInput) sliderMaxInput.value = cfg.sliderMaxDate;
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
      const fieldMeta = readSelectedFilterFieldMeta(fieldSelect);
      const fieldChanged = base.filterField !== fieldMeta.filterField;
      closeDateFilterConfigModal(normalizeFilterConfig(Object.assign({}, base, fieldMeta, {
        entity: entitySelect ? entitySelect.value : base.entity,
        title: fieldMeta.filterFieldName,
        sliderMinDate: sliderMinInput ? sliderMinInput.value : base.sliderMinDate,
        sliderMaxDate: sliderMaxInput ? sliderMaxInput.value : base.sliderMaxDate,
        hiddenValues: fieldChanged ? [] : base.hiddenValues,
        excludedShapeIds: excluded
      })));
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
        if (status.webhookUrl) inputEl.value = status.webhookUrl;
        statusEl.textContent = status.domain
          ? `Подключено: ${status.domain} (${status.webhookMasked || ""})`
          : "Подключено";
        statusEl.classList.remove("bitrix-integration-status-error");
      } else if (!window.currentUser && getGuestWebhook()) {
        inputEl.value = getGuestWebhook();
        statusEl.textContent = `Гостевой webhook: ${maskWebhook(getGuestWebhook())}`;
        statusEl.classList.remove("bitrix-integration-status-error");
      } else {
        statusEl.textContent = "Bitrix24 не подключён";
        statusEl.classList.remove("bitrix-integration-status-error");
      }
      if (disconnectBtn) disconnectBtn.disabled = !status.connected && !getGuestWebhook();
    } catch (err) {
      statusEl.textContent = formatBitrixErrorMessage(err);
      statusEl.classList.add("bitrix-integration-status-error");
    }
    if (connectBtn) {
      connectBtn.onclick = async () => {
        const webhookUrl = normalizeBitrixWebhookUrl(inputEl.value);
        inputEl.value = webhookUrl;
        if (!webhookUrl) {
          statusEl.textContent = "Вставьте URL входящего webhook из Bitrix24.";
          statusEl.classList.add("bitrix-integration-status-error");
          return;
        }
        if (!isValidBitrixWebhookUrl(webhookUrl)) {
          statusEl.textContent = formatBitrixErrorMessage(new Error("invalid_webhook_url"));
          statusEl.classList.add("bitrix-integration-status-error");
          return;
        }
        connectBtn.disabled = true;
        statusEl.textContent = "Проверяем подключение к Bitrix24…";
        statusEl.classList.remove("bitrix-integration-status-error");
        try {
          const result = await saveBitrixWebhook(webhookUrl);
          inputEl.value = result.webhookUrl || webhookUrl;
          statusEl.textContent = result.domain
            ? `Подключено: ${result.domain} (${result.webhookMasked || maskWebhook(webhookUrl)})`
            : "Подключено";
          if (disconnectBtn) disconnectBtn.disabled = false;
          await refreshBitrixConnectionState();
          rebuildAllBitrixWidgets();
          if (window.showHint) window.showHint("Bitrix24 подключён", "success");
        } catch (err) {
          statusEl.textContent = formatBitrixErrorMessage(err);
          statusEl.classList.add("bitrix-integration-status-error");
        } finally {
          connectBtn.disabled = false;
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
          await refreshBitrixConnectionState();
          rebuildAllBitrixWidgets();
          if (window.showHint) window.showHint("Bitrix24 отключён", "success");
        } catch (err) {
          statusEl.textContent = formatBitrixErrorMessage(err);
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
    rebuildAllBitrixWidgets,
    refreshBitrixConnectionState,
    syncBitrixWidgetsToTheme,
    isBitrixWebhookConfigured,
    refreshFilterTargets,
    getEffectiveDateFilterForShape,
    syncCardFormatPanel,
    syncChartFormatPanel,
    syncFilterFormatPanel,
    applyCardFormatPanel,
    applyChartFormatPanel,
    applyFilterFormatPanel,
    adjustChartFontSize,
    readShapeFormatPanelSnapshot,
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
    const initBitrixAfterAuth = () => {
      if (!getGuestWebhook() && !window.currentUser) return;
      refreshBitrixConnectionState().then(() => {
        rebuildAllBitrixWidgets();
        prefetchBitrixMeta("deal");
      });
    };
    initBitrixAfterAuth();
    window.addEventListener("mmtable:auth-ready", initBitrixAfterAuth);
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll('.shape[data-shape-type="shape-chart"] .bitrix-chart-canvas').forEach((canvas) => {
      const node = canvas.closest('.shape[data-shape-type="shape-chart"]');
      if (node) refreshShapeChart(node);
    });
  });
})();
