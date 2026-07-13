/* @excalidraw/laser-pointer — ported from MMTable2.0 for MMTable laser tool */
(function (global) {
  "use strict";

  function add(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  }

  function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }

  function smul(p, s) {
    return [p[0] * s, p[1] * s, p[2] * s];
  }

  function norm(p) {
    const len = Math.sqrt(p[0] ** 2 + p[1] ** 2);
    return len ? [p[0] / len, p[1] / len, p[2]] : [0, 0, p[2]];
  }

  function rot(p, rad) {
    return [
      Math.cos(rad) * p[0] - Math.sin(rad) * p[1],
      Math.sin(rad) * p[0] + Math.cos(rad) * p[1],
      p[2]
    ];
  }

  function plerp(a, b, t) {
    return add(a, smul(sub(b, a), t));
  }

  function angle(p, p1, p2) {
    return Math.atan2(p2[1] - p[1], p2[0] - p[0]) - Math.atan2(p1[1] - p[1], p1[0] - p[0]);
  }

  function normAngle(a) {
    return Math.atan2(Math.sin(a), Math.cos(a));
  }

  function mag(p) {
    return Math.sqrt(p[0] ** 2 + p[1] ** 2);
  }

  function dist(a, b) {
    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
  }

  function runLength(ps) {
    if (ps.length < 2) return 0;
    let len = 0;
    for (let i = 1; i <= ps.length - 1; i += 1) {
      len += dist(ps[i - 1], ps[i]);
    }
    len += dist(ps[ps.length - 2], ps[ps.length - 1]);
    return len;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function distancePointToSegment(p3, p1, p2) {
    const sMag = dist(p1, p2);
    if (sMag === 0) return dist(p3, p1);
    const u = clamp(
      ((p3[0] - p1[0]) * (p2[0] - p1[0]) + (p3[1] - p1[1]) * (p2[1] - p1[1])) / sMag ** 2,
      0,
      1
    );
    const pi = [p1[0] + u * (p2[0] - p1[0]), p1[1] + u * (p2[1] - p1[1]), p3[2]];
    return dist(pi, p3);
  }

  function douglasPeucker(points, epsilon) {
    if (epsilon === 0) return points;
    if (points.length <= 2) return points;
    const first = points[0];
    const last = points[points.length - 1];
    let maxDistance = 0;
    let maxIndex = -1;
    for (let index = 0; index < points.length; index += 1) {
      const point = points[index];
      const d = distancePointToSegment(point, first, last);
      if (d > maxDistance) {
        maxDistance = d;
        maxIndex = index;
      }
    }
    if (maxDistance >= epsilon) {
      const maxIndexPoint = points[maxIndex];
      return [
        ...douglasPeucker([first, ...points.slice(1, maxIndex), maxIndexPoint], epsilon).slice(0, -1),
        maxIndexPoint,
        ...douglasPeucker([maxIndexPoint, ...points.slice(maxIndex, -1), last], epsilon).slice(1)
      ];
    }
    return [first, last];
  }

  const defaults = {
    size: 2,
    streamline: 0.45,
    simplify: 0.1,
    simplifyPhase: "output",
    keepHead: false,
    sizeMapping: () => 1
  };

  const constants = {
    cornerDetectionMaxAngle: 75,
    cornerDetectionVariance: (s) => (s > 35 ? 0.5 : 1),
    maxTailLength: 50
  };

  class LaserPointer {
    constructor(options = {}) {
      this.options = Object.assign({}, defaults, options);
      this.originalPoints = [];
      this.stablePoints = [];
      this.tailPoints = [];
      this.isFresh = true;
    }

    get lastPoint() {
      return this.tailPoints[this.tailPoints.length - 1] ?? this.stablePoints[this.stablePoints.length - 1];
    }

    addPoint(point) {
      const lastPoint = this.originalPoints[this.originalPoints.length - 1];
      if (lastPoint && lastPoint[0] === point[0] && lastPoint[1] === point[1]) return;
      this.originalPoints.push(point);
      if (this.isFresh) {
        this.isFresh = false;
        this.stablePoints.push(point);
        return;
      }
      if (this.options.streamline > 0) {
        point = plerp(this.lastPoint, point, 1 - this.options.streamline);
      }
      this.tailPoints.push(point);
      if (runLength(this.tailPoints) > constants.maxTailLength) {
        this.stabilizeTail();
      }
    }

    close() {
      this.stabilizeTail();
    }

    stabilizeTail() {
      if (this.options.simplify > 0 && this.options.simplifyPhase === "tail") {
        throw new Error("Not implemented yet");
      }
      this.stablePoints.push(...this.tailPoints);
      this.tailPoints = [];
    }

    getSize(sizeOverride, pressure, index, totalLength, runningLength) {
      return (sizeOverride ?? this.options.size) * this.options.sizeMapping({
        pressure,
        runningLength,
        currentIndex: index,
        totalLength
      });
    }

    getStrokeOutline(sizeOverride) {
      if (this.isFresh) return [];
      let points = [...this.stablePoints, ...this.tailPoints];
      if (this.options.simplify > 0 && this.options.simplifyPhase === "input") {
        points = douglasPeucker(points, this.options.simplify);
      }
      const len = points.length;
      if (len === 0) return [];
      if (len === 1) {
        const c = points[0];
        const size = this.getSize(sizeOverride, c[2], 0, len, 0);
        if (size < 0.5) return [];
        const ps = [];
        for (let theta = 0; theta <= Math.PI * 2; theta += Math.PI / 16) {
          ps.push(add(c, smul(rot([1, 0, 0], theta), size)));
        }
        ps.push(add(c, smul([1, 0, 0], this.getSize(sizeOverride, c[2], 0, len, 0))));
        return ps;
      }
      if (len === 2) {
        const c = points[0];
        const n = points[1];
        const cSize = this.getSize(sizeOverride, c[2], 0, len, 0);
        const nSize = this.getSize(sizeOverride, n[2], 0, len, 0);
        if (cSize < 0.5 || nSize < 0.5) return [];
        const ps = [];
        const pAngle = angle(c, [c[0], c[1] - 100, c[2]], n);
        for (let theta = pAngle; theta <= Math.PI + pAngle; theta += Math.PI / 16) {
          ps.push(add(c, smul(rot([1, 0, 0], theta), cSize)));
        }
        for (let theta = Math.PI + pAngle; theta <= Math.PI * 2 + pAngle; theta += Math.PI / 16) {
          ps.push(add(n, smul(rot([1, 0, 0], theta), nSize)));
        }
        ps.push(ps[0]);
        return ps;
      }

      const forwardPoints = [];
      const backwardPoints = [];
      let speed = 0;
      let prevSpeed = 0;
      let visibleStartIndex = 0;
      let runningLength = 0;

      for (let i = 1; i < len - 1; i += 1) {
        const p = points[i - 1];
        const c = points[i];
        const n = points[i + 1];
        const pressure = c[2];
        const d = dist(p, c);
        runningLength += d;
        speed = prevSpeed + (d - prevSpeed) * 0.2;
        const cSize = this.getSize(sizeOverride, pressure, i, len, runningLength);
        if (cSize === 0) {
          visibleStartIndex = i + 1;
          continue;
        }
        const dirPC = norm(sub(p, c));
        const dirNC = norm(sub(n, c));
        const p1dirPC = rot(dirPC, Math.PI / 2);
        const p2dirPC = rot(dirPC, -Math.PI / 2);
        const p1dirNC = rot(dirNC, Math.PI / 2);
        const p2dirNC = rot(dirNC, -Math.PI / 2);
        const p1PC = add(c, smul(p1dirPC, cSize));
        const p2PC = add(c, smul(p2dirPC, cSize));
        const p1NC = add(c, smul(p1dirNC, cSize));
        const p2NC = add(c, smul(p2dirNC, cSize));
        const ftdir = add(p1dirPC, p2dirNC);
        const btdir = add(p2dirPC, p1dirNC);
        const paPC = add(c, smul(mag(ftdir) === 0 ? dirPC : norm(ftdir), cSize));
        const paNC = add(c, smul(mag(btdir) === 0 ? dirNC : norm(btdir), cSize));
        const cAngle = normAngle(angle(c, p, n));
        const D_ANGLE = (constants.cornerDetectionMaxAngle / 180) * Math.PI * constants.cornerDetectionVariance(speed);
        if (Math.abs(cAngle) < D_ANGLE) {
          const tAngle = Math.abs(normAngle(Math.PI - cAngle));
          if (tAngle === 0) continue;
          if (cAngle < 0) {
            backwardPoints.push(p2PC, paNC);
            for (let theta = 0; theta <= tAngle; theta += tAngle / 4) {
              forwardPoints.push(add(c, rot(smul(p1dirPC, cSize), theta)));
            }
            for (let theta = tAngle; theta >= 0; theta -= tAngle / 4) {
              backwardPoints.push(add(c, rot(smul(p1dirPC, cSize), theta)));
            }
            backwardPoints.push(paNC, p1NC);
          } else {
            forwardPoints.push(p1PC, paPC);
            for (let theta = 0; theta <= tAngle; theta += tAngle / 4) {
              backwardPoints.push(add(c, rot(smul(p1dirPC, -cSize), -theta)));
            }
            for (let theta = tAngle; theta >= 0; theta -= tAngle / 4) {
              forwardPoints.push(add(c, rot(smul(p1dirPC, -cSize), -theta)));
            }
            forwardPoints.push(paPC, p2NC);
          }
        } else {
          forwardPoints.push(paPC);
          backwardPoints.push(paNC);
        }
        prevSpeed = speed;
      }

      if (visibleStartIndex >= len - 2) {
        if (this.options.keepHead) {
          const c = points[len - 1];
          const ps = [];
          for (let theta = 0; theta <= Math.PI * 2; theta += Math.PI / 16) {
            ps.push(add(c, smul(rot([1, 0, 0], theta), this.options.size)));
          }
          ps.push(add(c, smul([1, 0, 0], this.options.size)));
          return ps;
        }
        return [];
      }

      const first = points[visibleStartIndex];
      const second = points[visibleStartIndex + 1];
      const penultimate = points[len - 2];
      const ultimate = points[len - 1];
      const dirFS = norm(sub(second, first));
      const dirPU = norm(sub(penultimate, ultimate));
      const ppdirFS = rot(dirFS, -Math.PI / 2);
      const ppdirPU = rot(dirPU, Math.PI / 2);
      const startCapSize = this.getSize(sizeOverride, first[2], 0, len, 0);
      const startCap = [];
      const endCapSize = this.options.keepHead
        ? this.options.size
        : this.getSize(sizeOverride, penultimate[2], len - 2, len, runningLength);
      const endCap = [];

      if (startCapSize > 0.1) {
        for (let theta = 0; theta <= Math.PI; theta += Math.PI / 16) {
          startCap.unshift(add(first, rot(smul(ppdirFS, startCapSize), -theta)));
        }
        startCap.unshift(add(first, smul(ppdirFS, -startCapSize)));
      } else {
        startCap.push(first);
      }

      for (let theta = 0; theta <= Math.PI * 3; theta += Math.PI / 16) {
        endCap.push(add(ultimate, rot(smul(ppdirPU, -endCapSize), -theta)));
      }

      const strokeOutline = [
        ...startCap,
        ...forwardPoints,
        ...endCap.reverse(),
        ...backwardPoints.reverse()
      ];
      if (startCap.length > 0) strokeOutline.push(startCap[0]);
      if (this.options.simplify > 0 && this.options.simplifyPhase === "output") {
        return douglasPeucker(strokeOutline, this.options.simplify);
      }
      return strokeOutline;
    }
  }

  global.LaserPointer = LaserPointer;
})(window);
