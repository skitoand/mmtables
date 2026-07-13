(function () {
  "use strict";

  const LASER_COLOR = "red";
  const LASER_DECAY_MS = 1000;
  const LASER_DECAY_LENGTH = 50;
  const DEFAULT_STROKE_COLOR = "#1e1e1e";
  const DEFAULT_STROKE_SIZE = 4;

  let ctx = null;
  let drawToolActive = false;
  let laserToolActive = false;
  let drawDraft = null;
  let laserLocalTrail = null;
  let laserPointerId = null;
  let laserLayer = null;
  let drawPreviewEl = null;

  function getStrokeLib() {
    return window.PerfectFreehand || null;
  }

  function desktop() {
    return ctx?.getDesktop?.() || null;
  }

  function canUse() {
    return ctx && ctx.canEdit?.() && !ctx.isReadOnly?.();
  }

  function getPoint(event) {
    return ctx.getDesktopPoint(event.clientX, event.clientY);
  }

  function deactivateFrameTool() {
    if (ctx?.setFrameToolActive) ctx.setFrameToolActive(false);
  }

  function deactivateAll() {
    setDrawToolActive(false);
    setLaserToolActive(false);
  }

  function isDrawToolActive() {
    return drawToolActive;
  }

  function isLaserToolActive() {
    return laserToolActive;
  }

  function syncDesktopClasses() {
    const el = desktop();
    if (!el) return;
    el.classList.toggle("draw-tool-active", drawToolActive);
    el.classList.toggle("laser-tool-active", laserToolActive);
  }

  function setDrawToolActive(active) {
    drawToolActive = !!active;
    if (drawToolActive) {
      laserToolActive = false;
      stopLaserAnimation();
      deactivateFrameTool();
    } else {
      cancelDrawDraft();
    }
    syncDesktopClasses();
    syncToolbarState();
  }

  function setLaserToolActive(active) {
    laserToolActive = !!active;
    if (laserToolActive) {
      drawToolActive = false;
      cancelDrawDraft();
      deactivateFrameTool();
      ensureLaserLayer();
    } else {
      stopLaserAnimation();
    }
    syncDesktopClasses();
    syncToolbarState();
  }

  function toggleDrawTool() {
    if (!canUse()) return;
    setDrawToolActive(!drawToolActive);
    ctx.showHint?.(
      drawToolActive ? "Рисование включено — проведите по столу" : "Инструмент «Рисование» выключен",
      "warning",
      1800
    );
  }

  function toggleLaserTool() {
    if (!ctx) return;
    setLaserToolActive(!laserToolActive);
    ctx.showHint?.(
      laserToolActive ? "Лазерная указка включена — проведите по столу" : "Лазерная указка выключена",
      "warning",
      1800
    );
  }

  function getOverlayRoot() {
    return ctx?.getDesktopContentRoot?.() || desktop();
  }

  function syncToolbarState() {
    document.querySelectorAll(
      '.shape-dropdown button[data-tool="draw"], .shape-dropdown button[data-tool="laser"], .objects-toolbar button[data-tool="draw"], .objects-toolbar button[data-tool="laser"]'
    ).forEach((btn) => {
      const active = btn.dataset.tool === "draw" ? drawToolActive : laserToolActive;
      btn.classList.toggle("is-tool-active", !!active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function easeOut(k) {
    return 1 - Math.pow(1 - Math.max(0, Math.min(1, k)), 4);
  }

  function getLaserTrailOptions() {
    return {
      size: 2,
      simplify: 0,
      streamline: 0.4,
      sizeMapping: (c) => {
        const t = Math.max(0, 1 - (performance.now() - c.pressure) / LASER_DECAY_MS);
        const l = (LASER_DECAY_LENGTH - Math.min(LASER_DECAY_LENGTH, c.totalLength - c.currentIndex)) / LASER_DECAY_LENGTH;
        return Math.min(easeOut(l), easeOut(t));
      }
    };
  }

  class MMLaserAnimatedTrail {
    constructor(options) {
      this.options = options;
      this.currentTrail = null;
      this.pastTrails = [];
      this.trailElement = null;
      this.container = null;
      this.animId = 0;
    }

    get hasCurrentTrail() {
      return !!this.currentTrail;
    }

    cleanup() {
      this.pastTrails = [];
      this.currentTrail = null;
      if (this.trailElement && this.trailElement.parentNode === this.container) {
        this.container.removeChild(this.trailElement);
      }
    }

    start(container) {
      if (container) this.container = container;
      if (!this.container) return;
      if (!this.trailElement) {
        this.trailElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.trailElement.setAttribute("fill", LASER_COLOR);
      }
      if (this.trailElement.parentNode !== this.container) {
        this.container.appendChild(this.trailElement);
      }
      if (this.animId) return;
      const tick = () => {
        const keep = this.onFrame();
        if (keep || this.currentTrail || this.pastTrails.length) {
          this.animId = requestAnimationFrame(tick);
          return;
        }
        this.animId = 0;
        this.cleanup();
      };
      this.animId = requestAnimationFrame(tick);
    }

    stop() {
      if (this.animId) cancelAnimationFrame(this.animId);
      this.animId = 0;
      this.cleanup();
      this.trailElement = null;
    }

    startPath(x, y) {
      const LaserPointer = window.LaserPointer;
      if (!LaserPointer) return;
      this.currentTrail = new LaserPointer(this.options);
      this.currentTrail.addPoint([x, y, performance.now()]);
      this.start(this.container);
    }

    addPointToPath(x, y) {
      if (!this.currentTrail) return;
      this.currentTrail.addPoint([x, y, performance.now()]);
      this.start(this.container);
    }

    endPath() {
      if (!this.currentTrail) return;
      this.currentTrail.close();
      this.currentTrail.options.keepHead = false;
      this.pastTrails.push(this.currentTrail);
      this.currentTrail = null;
      this.start(this.container);
    }

    onFrame() {
      const lib = getStrokeLib();
      if (!lib || !this.trailElement) return false;
      const paths = [];
      const size = this.options.size || 2;

      this.pastTrails.forEach((trail) => {
        const d = this.drawTrail(trail, lib, size);
        if (d) paths.push(d);
      });
      if (this.currentTrail) {
        const d = this.drawTrail(this.currentTrail, lib, size);
        if (d) paths.push(d);
      }

      this.pastTrails = this.pastTrails.filter((trail) => trail.getStrokeOutline(size).length !== 0);

      if (!paths.length) {
        this.trailElement.setAttribute("d", "");
        return false;
      }

      this.trailElement.setAttribute("d", paths.join(" ").trim());
      this.trailElement.setAttribute("fill", LASER_COLOR);
      return true;
    }

    drawTrail(trail, lib, size) {
      const stroke = trail.getStrokeOutline(size);
      if (!stroke.length) return "";
      return lib.getSvgPathFromStroke(stroke, true);
    }
  }

  function ensureLaserLocalTrail() {
    if (!laserLocalTrail) {
      laserLocalTrail = new MMLaserAnimatedTrail(getLaserTrailOptions());
    }
    return laserLocalTrail;
  }

  function ensureLaserLayer() {
    const host = getOverlayRoot();
    if (!host) return null;
    if (laserLayer && laserLayer.tagName === "svg" && laserLayer.parentNode === host) {
      resizeLaserLayer();
      return laserLayer;
    }
    if (laserLayer && laserLayer.parentNode) laserLayer.parentNode.removeChild(laserLayer);
    laserLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    laserLayer.setAttribute("class", "laser-trails-layer");
    laserLayer.setAttribute("aria-hidden", "true");
    host.appendChild(laserLayer);
    resizeLaserLayer();
    return laserLayer;
  }

  function resizeLaserLayer() {
    if (!laserLayer || laserLayer.tagName !== "svg") return;
    const ext = ctx.getDesktopExtent?.() || { width: 4000, height: 3000 };
    const w = Math.max(1, ext.width || 4000);
    const h = Math.max(1, ext.height || 3000);
    laserLayer.setAttribute("width", String(w));
    laserLayer.setAttribute("height", String(h));
    laserLayer.style.width = `${w}px`;
    laserLayer.style.height = `${h}px`;
  }

  function stopLaserAnimation() {
    laserPointerId = null;
    if (laserLocalTrail) {
      laserLocalTrail.stop();
      laserLocalTrail = null;
    }
    if (laserLayer) laserLayer.innerHTML = "";
  }

  function ensureDrawPreviewEl() {
    const host = getOverlayRoot();
    if (!host) return null;
    if (drawPreviewEl && drawPreviewEl.parentNode === host) return drawPreviewEl;
    drawPreviewEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    drawPreviewEl.setAttribute("class", "freedraw-preview-layer");
    drawPreviewEl.setAttribute("aria-hidden", "true");
    host.appendChild(drawPreviewEl);
    return drawPreviewEl;
  }

  function cancelDrawDraft() {
    drawDraft = null;
    if (drawPreviewEl) drawPreviewEl.innerHTML = "";
  }

  function renderDrawPreview() {
    const preview = ensureDrawPreviewEl();
    const lib = getStrokeLib();
    if (!preview || !lib || !drawDraft || drawDraft.points.length < 2) {
      if (preview) preview.innerHTML = "";
      return;
    }
    const pts = drawDraft.points.map((p) => [p.x, p.y]);
    const outline = lib.getStroke(pts, {
      size: drawDraft.strokeSize,
      thinning: 0.62,
      smoothing: 0.5,
      streamline: 0.45,
      simulatePressure: true
    });
    const d = lib.getSvgPathFromStroke(outline, true);
    if (!d) return;
    const ext = ctx.getDesktopExtent?.() || { width: 4000, height: 3000 };
    preview.setAttribute("width", String(Math.max(1, ext.width || 4000)));
    preview.setAttribute("height", String(Math.max(1, ext.height || 3000)));
    preview.style.width = `${Math.max(1, ext.width || 4000)}px`;
    preview.style.height = `${Math.max(1, ext.height || 3000)}px`;
    preview.innerHTML = `<path d="${d}" fill="${drawDraft.strokeColor}"/>`;
  }

  function pointsBounds(points) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    points.forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    });
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  }

  function buildFreedrawPathD(relativePoints, strokeSize) {
    const lib = getStrokeLib();
    if (!lib || !relativePoints.length) return "";
    const pts = relativePoints.map((p) => [p[0], p[1]]);
    const outline = lib.getStroke(pts, {
      size: strokeSize,
      thinning: 0.62,
      smoothing: 0.5,
      streamline: 0.45,
      simulatePressure: true
    });
    return lib.getSvgPathFromStroke(outline, true);
  }

  function renderFreedrawPath(node) {
    const svg = node.querySelector(".freedraw-path-svg");
    const pathEl = node.querySelector(".freedraw-path");
    if (!svg || !pathEl) return;
    let points = [];
    try {
      points = JSON.parse(node.dataset.freedrawPoints || "[]");
    } catch {
      points = [];
    }
    const strokeSize = Math.max(1, Number(node.dataset.freedrawStrokeSize) || DEFAULT_STROKE_SIZE);
    const strokeColor = node.dataset.freedrawStrokeColor || DEFAULT_STROKE_COLOR;
    const width = Math.max(1, parseFloat(node.style.width) || 1);
    const height = Math.max(1, parseFloat(node.style.height) || 1);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const d = buildFreedrawPathD(points, strokeSize);
    pathEl.setAttribute("d", d || "");
    pathEl.setAttribute("fill", strokeColor);

    let hitPathEl = node.querySelector(".freedraw-hit-path");
    if (!hitPathEl) {
      hitPathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hitPathEl.setAttribute("class", "freedraw-hit-path");
      svg.insertBefore(hitPathEl, pathEl);
    }
    const hitWidth = Math.max(14, strokeSize * 2.5);
    hitPathEl.setAttribute("d", d || "");
    hitPathEl.setAttribute("fill", "none");
    hitPathEl.setAttribute("stroke", "transparent");
    hitPathEl.setAttribute("stroke-width", String(hitWidth));
    hitPathEl.setAttribute("stroke-linecap", "round");
    hitPathEl.setAttribute("stroke-linejoin", "round");
  }

  function createShapeFreedraw(opts = {}, doSave = true) {
    const points = Array.isArray(opts.freedrawPoints) ? opts.freedrawPoints : [];
    const absolute = Array.isArray(opts.absolutePoints)
      ? opts.absolutePoints.map((p) => ({ x: p.x, y: p.y }))
      : points.map(([x, y]) => ({ x, y }));
    if (absolute.length < 2) return null;

    const strokeSize = Math.max(1, Number(opts.freedrawStrokeSize ?? opts.strokeSize) || DEFAULT_STROKE_SIZE);
    const strokeColor = String(opts.freedrawStrokeColor ?? opts.strokeColor ?? DEFAULT_STROKE_COLOR);
    const pad = Math.max(8, strokeSize * 2);
    const bounds = pointsBounds(absolute);
    const left = bounds.minX - pad;
    const top = bounds.minY - pad;
    const width = Math.max(12, bounds.width + pad * 2);
    const height = Math.max(12, bounds.height + pad * 2);
    const relative = absolute.map((p) => [p.x - left, p.y - top]);

    const node = ctx.createShapeBase("shape-freedraw", {
      ...opts,
      left: ctx.formatPositionPx(left),
      top: ctx.formatPositionPx(top),
      width: `${width}px`,
      height: `${height}px`,
      borderEnabled: false
    });
    node.dataset.freedrawPoints = JSON.stringify(relative);
    node.dataset.freedrawStrokeSize = String(strokeSize);
    node.dataset.freedrawStrokeColor = strokeColor;
    node.style.background = "transparent";
    node.style.border = "none";
    node.style.boxShadow = "none";
    node.style.overflow = "visible";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "freedraw-path-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("aria-hidden", "true");
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("class", "freedraw-path");
    svg.appendChild(pathEl);
    node.appendChild(svg);

    const rh = document.createElement("div");
    rh.className = "resize-handle";
    node.appendChild(rh);
    ctx.addShapeHandles(node, false);
    ctx.attachResize(node, rh, 20, 20, { raiseOnResize: false });
    ctx.attachConnectorPoints(node);
    renderFreedrawPath(node);
    ctx.appendToDesktop(node);
    ctx.updateDesktopExtent?.();
    ctx.layoutConnectorPoints?.(node);
    ctx.renderConnectors?.();
    if (doSave) ctx.saveLayout();
    return node;
  }

  function restoreShapeFreedraw(shapeData, doSave) {
    return createShapeFreedraw(shapeData, doSave);
  }

  function readShapeExtras(node, base) {
    if (node.dataset.shapeType !== "shape-freedraw") return base;
    let points = [];
    try {
      points = JSON.parse(node.dataset.freedrawPoints || "[]");
    } catch {
      points = [];
    }
    return Object.assign({}, base, {
      freedrawPoints: points,
      freedrawStrokeSize: Number(node.dataset.freedrawStrokeSize) || DEFAULT_STROKE_SIZE,
      freedrawStrokeColor: node.dataset.freedrawStrokeColor || DEFAULT_STROKE_COLOR
    });
  }

  function finishDrawDraft() {
    if (!drawDraft || drawDraft.points.length < 2) {
      cancelDrawDraft();
      return;
    }
    const node = createShapeFreedraw({
      absolutePoints: drawDraft.points,
      freedrawStrokeSize: drawDraft.strokeSize,
      freedrawStrokeColor: drawDraft.strokeColor
    }, true);
    cancelDrawDraft();
    if (node) ctx.selectShape?.(node);
  }

  function canStartDrawFromTarget(target) {
    if (!target) return false;
    if (target.closest(".context-menu, .app-menu-dropdown, .shape-dropdown, .modal, .format-panel")) return false;
    if (target.closest("input, textarea, select, button, .toolbar")) return false;
    if (target.closest(".sheet-window, .shape")) return false;
    return !!target.closest("#desktop");
  }

  function isDrawToolEngaged() {
    return drawToolActive || laserToolActive || !!drawDraft || !!(laserLocalTrail && laserLocalTrail.hasCurrentTrail);
  }

  function shouldYieldPointerToInteractiveTarget(target) {
    return !!(target && target.closest && target.closest(".shape, .sheet-window, .conn-point, .conn-arrow, .resize-handle, .shape-handles, .h"));
  }

  function startDraw(event) {
    if (!drawToolActive || !canUse()) return false;
    if (!canStartDrawFromTarget(event.target)) return false;
    const pt = getPoint(event);
    drawDraft = {
      pointerId: event.pointerId,
      points: [{ x: pt.x, y: pt.y }],
      strokeSize: DEFAULT_STROKE_SIZE,
      strokeColor: DEFAULT_STROKE_COLOR
    };
    renderDrawPreview();
    desktop()?.setPointerCapture?.(event.pointerId);
    ctx.clearSelection?.();
    return true;
  }

  function startLaser(event) {
    if (!laserToolActive) return false;
    if (!canStartDrawFromTarget(event.target)) return false;
    const pt = getPoint(event);
    const layer = ensureLaserLayer();
    const trail = ensureLaserLocalTrail();
    trail.container = layer;
    trail.startPath(pt.x, pt.y);
    laserPointerId = event.pointerId;
    desktop()?.setPointerCapture?.(event.pointerId);
    return true;
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return false;
    if (!isDrawToolEngaged()) return false;
    if (shouldYieldPointerToInteractiveTarget(event.target)) return false;
    if (drawToolActive && startDraw(event)) return true;
    if (laserToolActive && startLaser(event)) return true;
    if ((drawToolActive || laserToolActive) && canStartDrawFromTarget(event.target)) {
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    return false;
  }

  function bindPointerCapture() {
    document.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      if (!isDrawToolEngaged()) return;
      if (handlePointerDown(event)) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      }
    }, true);
    document.addEventListener("pointermove", (event) => {
      handlePointerMove(event);
    }, true);
    document.addEventListener("pointerup", (event) => {
      handlePointerUp(event);
    }, true);
    document.addEventListener("pointercancel", (event) => {
      handlePointerUp(event);
    }, true);
  }

  function handlePointerMove(event) {
    if (drawDraft && event.pointerId === drawDraft.pointerId) {
      const pt = getPoint(event);
      const last = drawDraft.points[drawDraft.points.length - 1];
      if (!last || Math.hypot(pt.x - last.x, pt.y - last.y) > 0.5) {
        drawDraft.points.push({ x: pt.x, y: pt.y });
        renderDrawPreview();
      }
      return true;
    }
    if (laserToolActive && laserPointerId === event.pointerId && laserLocalTrail?.hasCurrentTrail) {
      const pt = getPoint(event);
      laserLocalTrail.addPointToPath(pt.x, pt.y);
      return true;
    }
    return false;
  }

  function handlePointerUp(event) {
    if (drawDraft && event.pointerId === drawDraft.pointerId) {
      try { desktop()?.releasePointerCapture?.(event.pointerId); } catch {}
      finishDrawDraft();
      return true;
    }
    if (laserToolActive && laserPointerId === event.pointerId && laserLocalTrail?.hasCurrentTrail) {
      try { desktop()?.releasePointerCapture?.(event.pointerId); } catch {}
      const pt = getPoint(event);
      laserLocalTrail.addPointToPath(pt.x, pt.y);
      laserLocalTrail.endPath();
      laserPointerId = null;
      return true;
    }
    return false;
  }

  function bindUi() {
    /* menu clicks are wired from app.js */
  }

  function activateDrawToolFromMenu() {
    if (drawToolActive) {
      setDrawToolActive(false);
      ctx.showHint?.("Инструмент «Рисование» выключен", "warning", 1400);
      return true;
    }
    if (!canUse()) return false;
    setDrawToolActive(true);
    ctx.showHint?.("Рисование: проведите по столу. Повторный клик в меню — выключить", "warning", 2400);
    return true;
  }

  function activateLaserToolFromMenu() {
    if (laserToolActive) {
      setLaserToolActive(false);
      ctx.showHint?.("Лазерная указка выключена", "warning", 1400);
      return true;
    }
    setLaserToolActive(true);
    ctx.showHint?.("Лазерная указка: проведите по столу. Повторный клик в меню — выключить", "warning", 2400);
    return true;
  }

  function bindKeyboard() {
    document.addEventListener("keydown", (e) => {
      const target = e.target;
      const typing = !!(target && (target.closest("input, textarea, select") || target.isContentEditable));
      if (typing) return;
      const key = (e.key || "").toLowerCase();
      const mod = e.metaKey || e.ctrlKey;
      if (mod) return;
      if (key === "7") {
        if (!canUse()) return;
        e.preventDefault();
        toggleDrawTool();
        return;
      }
      if (key === "k") {
        e.preventDefault();
        toggleLaserTool();
        return;
      }
      if (key === "escape") {
        if (drawToolActive || laserToolActive) {
          e.preventDefault();
          deactivateAll();
          ctx.showHint?.("Инструмент рисования/лазера выключен", "warning", 1400);
        }
        return;
      }
    });
  }

  function init(appCtx) {
    ctx = appCtx;
    bindUi();
    bindKeyboard();
    bindPointerCapture();
    syncToolbarState();
    document.querySelectorAll('.shape[data-shape-type="shape-freedraw"]').forEach((node) => renderFreedrawPath(node));
  }

  function onDesktopExtentChanged() {
    resizeLaserLayer();
  }

  window.DrawTools = {
    init,
    isDrawToolEngaged,
    deactivateAll,
    isDrawToolActive,
    isLaserToolActive,
    setDrawToolActive,
    setLaserToolActive,
    toggleDrawTool,
    toggleLaserTool,
    activateDrawToolFromMenu,
    activateLaserToolFromMenu,
    syncToolbarState,
    createShapeFreedraw,
    restoreShapeFreedraw,
    readShapeExtras,
    renderFreedrawPath,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    onDesktopExtentChanged
  };
})();
