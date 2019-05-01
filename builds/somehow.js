/* somehow v0.0.17
   github.com/spencermountain/somehow
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehow = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
// https://d3js.org/d3-path/ v1.0.7 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

exports.path = path;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(_dereq_,module,exports){
// https://d3js.org/d3-shape/ v1.3.5 Copyright 2019 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-path')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Path) { 'use strict';

function constant(x) {
  return function constant() {
    return x;
  };
}

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = d3Path.path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00),
            oc;

        // Restrict the corner radius according to the sector angle.
        if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

function pie() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

var slice = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$$1 = x,
      y$$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = d3Path.path();
    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810,
    kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10),
    kx = Math.sin(tau / 10) * kr,
    ky = -Math.cos(tau / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

function symbol() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = d3Path.path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop() {}

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$1(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
}

function diverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$1(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$1(series) {
  return ascending(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$1(series).reverse();
}

exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.areaRadial = areaRadial;
exports.radialArea = areaRadial;
exports.lineRadial = lineRadial$1;
exports.radialLine = lineRadial$1;
exports.pointRadial = pointRadial;
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle;
exports.symbolCross = cross;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetDiverging = diverging;
exports.stackOffsetNone = none;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAppearance = appearance;
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":1}],3:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).fitAspect=e()}}(function(){return function a(o,s,d){function c(t,e){if(!s[t]){if(!o[t]){var i="function"==typeof _dereq_&&_dereq_;if(!e&&i)return i(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=s[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,a,o,s,d)}return s[t].exports}for(var l="function"==typeof _dereq_&&_dereq_,e=0;e<d.length;e++)c(d[e]);return c}({1:[function(e,t,i){"use strict";var n=[{names:["square","1:1","instagram"],description:"Square",decimal:1,orientation:"landscape"},{names:["4:3","fullscreen","four three","1.33:1","ipad","pythagorean"],description:"Traditional TVs",decimal:1.333333,orientation:"landscape"},{names:["a4","√2:1","paper","lichtenberg","1:1.41"],description:"A4 paper",decimal:1.41},{names:["imax","1.43:1"],description:"IMAX film",decimal:1.43,orientation:"landscape"},{names:["3:2","35mm","photo","1.5:1","1.5"],description:"35mm photos",decimal:1.5,orientation:"landscape"},{names:["business card","bank card","1.58:1"],description:"Bank Cards",decimal:1.58577,orientation:"landscape"},{names:["golden","kepler","1.618","1.6:1"],description:"Golden ratio",decimal:1.61803,orientation:"landscape"},{names:["16:9","hd","hdtv","fhd","tv","computer","iphone","4k","8k","1.78:1"],description:"HD video",decimal:1.77777,orientation:"landscape"},{names:["widescreen","1.85:1"],description:"Movie-theatres",decimal:1.85,orientation:"landscape"},{names:["2:1","univisium","mobile","18:9"],description:"2:1",decimal:2,orientation:"landscape"},{names:["cinemascope","widescreen","wide","2.35:1","2.39:1"],description:"Widescreen",decimal:2.35,orientation:"landscape"},{names:["silver","1 + √2","2.41:1"],description:"Silver ratio",decimal:2.41,orientation:"landscape"}],r=n.map(function(e){return(e=Object.assign({},e)).decimal=1/e.decimal,e.orientation="portrait",e}),a={};n.forEach(function(t){t.names.forEach(function(e){a[e]=t})}),t.exports={lookup:a,portraits:r,list:n}},{}],2:[function(e,t,i){"use strict";var n=e("./aspects");t.exports=function(e,t){var i=e/t;return(i=parseInt(100*i,10)/100)<1?function(e,t){for(var i=0;i<t.length;i+=1)if(e>t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.portraits):function(e,t){for(var i=0;i<t.length;i+=1)if(e<=t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.list)}},{"./aspects":1}],3:[function(e,t,i){"use strict";var n=function(e,t){var i=1/t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.width*i;return r=Math.round(r),{closest:t,width:e.width,height:r,orientation:n,original:e}},r=function(e,t){var i=t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.height*i;return{closest:t,width:r=Math.round(r),height:e.height,orientation:n,original:e}};t.exports={both:function(e,t){var i=r(e,t);return i.width>e.width?n(e,t):i},width:r,height:n}},{}],4:[function(i,n,e){(function(e){"use strict";var o=i("./find-best-ratio"),s=i("./parse-ratio"),d=i("./fit"),t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!e.aspect&&!e.ratio){var t=o(e.width,e.height),i=1/t.decimal,n=e.width*i,r=(n-e.height)/e.height;return r=parseInt(1e3*r,10)/10,n=Math.round(n),{closest:t,percent_change:r,width:e.width,height:n}}var a=s(e.aspect||e.ratio||"");return null===a?(console.error("find-aspect-ratio error: Could not find a given aspect ratio."),e):"number"==typeof e.width&&"number"==typeof e.height?d.both(e,a):"number"==typeof e.width?d.height(e,a):"number"==typeof e.height?d.width(e,a):(console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."),e)};"undefined"!=typeof self?self.nlp=t:"undefined"!=typeof window?window.nlp=t:void 0!==e&&(e.nlp=t),void 0!==n&&(n.exports=t)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./find-best-ratio":2,"./fit":3,"./parse-ratio":5}],5:[function(e,t,i){"use strict";var n=e("./aspects"),r=/^[0-9\.]+:[0-9\.]+$/;t.exports=function(e){if(e=(e=(e=(e=e.toLowerCase()).trim()).replace(" ratio","")).replace("-"," "),!0===n.lookup.hasOwnProperty(e))return n.lookup[e];if(!0!==r.test(e))return null;var t=e.split(":");return{description:"custom",decimal:parseFloat(t[0])/parseFloat(t[1])}}},{"./aspects":1}]},{},[4])(4)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(_dereq_,module,exports){
!function(){var n=function(t,e,r,u){for(var o=1;o<e.length;o++){var f=e[o++],s="number"==typeof f?r[f]:f;1===e[o]?u[0]=s:2===e[o]?(u[1]=u[1]||{})[e[++o]]=s:3===e[o]?u[1]=Object.assign(u[1]||{},s):u.push(e[o]?t.apply(null,n(t,s,r,["",null])):s)}return u},t=function(n){for(var t,e,r=1,u="",o="",f=[0],s=function(n){1===r&&(n||(u=u.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(n||u,0):3===r&&(n||u)?(f.push(n||u,1),r=2):2===r&&"..."===u&&n?f.push(n,3):2===r&&u&&!n?f.push(!0,2,u):4===r&&e&&(f.push(n||u,2,e),e=""),u=""},p=0;p<n.length;p++){p&&(1===r&&s(),s(p));for(var h=0;h<n[p].length;h++)t=n[p][h],1===r?"<"===t?(s(),f=[f],r=3):u+=t:o?t===o?o="":u+=t:'"'===t||"'"===t?o=t:">"===t?(s(),r=1):r&&("="===t?(r=4,e=u,u=""):"/"===t?(s(),3===r&&(f=f[0]),r=f,(f=f[0]).push(r,4),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(s(),r=2):u+=t)}return s(),f},e="function"==typeof Map,r=e?new Map:{},u=e?function(n){var e=r.get(n);return e||r.set(n,e=t(n)),e}:function(n){for(var e="",u=0;u<n.length;u++)e+=n[u].length+"-"+n[u];return r[e]||(r[e]=t(n))},o=function(t){var e=n(this,u(t),arguments,[]);return e.length>1?e:e[0]};"undefined"!=typeof module?module.exports=o:self.htm=o}();

},{}],5:[function(_dereq_,module,exports){
const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }
  while (arr.length > n) {
    //remove every other one
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    })
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
}
module.exports = reduceTo

},{}],6:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
const methods = _dereq_('./methods')

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end)
  if (diff.years > 300) {
    return methods.centuries(start, end, n)
  }
  if (diff.years > 30) {
    return methods.decades(start, end, n)
  }
  if (diff.years > 3) {
    return methods.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods.minutes(start, end, n)
  }
  return methods.months(start, end, n)
}

const spacetimeTicks = function(start, end, n = 6) {
  let reverse = false
  start = spacetime(start)
  end = spacetime(end)
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    reverse = true
    let tmp = start.epoch
    start.epoch = end.epoch
    end.epoch = tmp
  }
  let ticks = chooseMethod(start, end, n)
  //support backwards ticks
  if (reverse === true) {
    ticks = ticks.reverse()
  }
  return ticks
}
module.exports = spacetimeTicks

},{"./methods":7,"spacetime":8}],7:[function(_dereq_,module,exports){
const reduceTo = _dereq_('./_reduce')

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = []
  start = start.add(1, unit)
  start = start.startOf(unit)
  while (start.isBefore(end)) {
    ticks.push(start)
    start = start.add(1, unit)
  }
  return ticks
}

const formatTicks = function(arr, fmt, start, end) {
  let delta = end.epoch - start.epoch
  return arr.map(s => {
    let percent = (s.epoch - start.epoch) / delta
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
}

const methods = {
  centuries: (start, end, n) => {
    let ticks = allTicks(start, end, 'century')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  decades: (start, end, n) => {
    let ticks = allTicks(start, end, 'decade')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  years: (start, end, n) => {
    let ticks = allTicks(start, end, 'year')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {year-short}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  months: (start, end, n) => {
    let ticks = allTicks(start, end, 'month')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  days: (start, end, n) => {
    let ticks = allTicks(start, end, 'day')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  hours: (start, end, n) => {
    let ticks = allTicks(start, end, 'hour')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  minutes: (start, end, n) => {
    let ticks = allTicks(start, end, 'minute')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  }
}
module.exports = methods

},{"./_reduce":5}],8:[function(_dereq_,module,exports){
(function (global){
/* spacetime v5.7.0
   github.com/spencermountain/spacetime
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = '5.7.0';

},{}],2:[function(_dereq_,module,exports){
"use strict";

var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
module.exports = {
  "short": function short() {
    return shortDays;
  },
  "long": function long() {
    return longDays;
  },
  set: function set(i18n) {
    shortDays = i18n["short"];
    longDays = i18n["long"];
  }
};

},{}],3:[function(_dereq_,module,exports){
"use strict";

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc

o.day = 8.64e7; //

o.date = o.day;
o.month = 8.64e7 * 29.5; //(average)

o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals

Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],4:[function(_dereq_,module,exports){
"use strict";

var monthLengths = [31, // January - 31 days
28, // February - 28 days in a common year and 29 days in leap years
31, // March - 31 days
30, // April - 30 days
31, // May - 31 days
30, // June - 30 days
31, // July - 31 days
31, // August - 31 days
30, // September - 30 days
31, // October - 31 days
30, // November - 30 days
31 // December - 31 days
];
module.exports = monthLengths;

},{}],5:[function(_dereq_,module,exports){
"use strict";

var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function buildMapping() {
  var obj = {
    sep: 8 //support this format

  };

  for (var i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }

  for (var _i = 0; _i < longMonths.length; _i++) {
    obj[longMonths[_i]] = _i;
  }

  return obj;
}

module.exports = {
  "short": function short() {
    return shortMonths;
  },
  "long": function long() {
    return longMonths;
  },
  mapping: function mapping() {
    return buildMapping();
  },
  set: function set(i18n) {
    shortMonths = i18n["short"];
    longMonths = i18n["long"];
  }
};

},{}],6:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1] //oct 1
];

},{}],7:[function(_dereq_,module,exports){
"use strict";

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
module.exports = {
  north: [['spring', 2, 1], //spring march 1
  ['summer', 5, 1], //june 1
  ['fall', 8, 1], //sept 1
  ['autumn', 8, 1], //sept 1
  ['winter', 11, 1] //dec 1
  ],
  south: [['fall', 2, 1], //march 1
  ['autumn', 2, 1], //march 1
  ['winter', 5, 1], //june 1
  ['spring', 8, 1], //sept 1
  ['summer', 11, 1] //dec 1
  ]
};

},{}],8:[function(_dereq_,module,exports){
"use strict";

//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
exports.isLeapYear = function (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}; // unsurprisingly-nasty `typeof date` call


exports.isDate = function (d) {
  return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
};

exports.isArray = function (input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};

exports.isObject = function (input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};

exports.zeroPad = function (str) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
};

exports.titleCase = function (str) {
  if (!str) {
    return '';
  }

  return str[0].toUpperCase() + str.substr(1);
};

exports.ordinal = function (i) {
  var j = i % 10;
  var k = i % 100;

  if (j === 1 && k !== 11) {
    return i + 'st';
  }

  if (j === 2 && k !== 12) {
    return i + 'nd';
  }

  if (j === 3 && k !== 13) {
    return i + 'rd';
  }

  return i + 'th';
}; //strip 'st' off '1st'..


exports.toCardinal = function (str) {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
  return parseInt(str, 10);
}; //used mostly for cleanup of unit names, like 'months'


exports.normalize = function () {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  str = str.toLowerCase().trim();
  str = str.replace(/ies$/, 'y'); //'centuries'

  str = str.replace(/s$/, '');

  if (str === 'day') {
    return 'date';
  }

  return str;
};

exports.getEpoch = function (tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  } //suport date objects


  if (exports.isDate(tmp)) {
    return tmp.getTime();
  }

  if (tmp.epoch) {
    return tmp.epoch;
  }

  return null;
}; //make sure this input is a spacetime obj


exports.beADate = function (d, s) {
  if (exports.isObject(d) === false) {
    return s.clone().set(d);
  }

  return d;
};

exports.formatTimezone = function (offset) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var absOffset = Math.abs(offset);
  var sign = offset > 0 ? '+' : '-';
  return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
};

},{}],9:[function(_dereq_,module,exports){
"use strict";

var Spacetime = _dereq_('./spacetime');

var whereIts = _dereq_('./whereIts');

var version = _dereq_('../_version');

var main = function main(input, tz, options) {
  return new Spacetime(input, tz, options);
}; //some helper functions on the main method


main.now = function (tz, options) {
  return new Spacetime(new Date().getTime(), tz, options);
};

main.today = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.startOf('day');
};

main.tomorrow = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day');
};

main.yesterday = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day');
};

main.extend = function (obj) {
  Object.keys(obj).forEach(function (k) {
    Spacetime.prototype[k] = obj[k];
  });
  return this;
}; //find tz by time


main.whereIts = whereIts;
main.version = version; //aliases:

main.plugin = main.extend;
module.exports = main;

},{"../_version":1,"./spacetime":36,"./whereIts":43}],10:[function(_dereq_,module,exports){
"use strict";

var monthLengths = _dereq_('../data/monthLengths');

var isLeapYear = _dereq_('../fns').isLeapYear; //given a month, return whether day number exists in it


var hasDate = function hasDate(obj) {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {
    return false;
  } //support leap-year in february


  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true;
    } else {
      return obj.date <= 28;
    }
  } //is this date too-big for this month?


  var max = monthLengths[obj.month] || 0;

  if (obj.date <= max) {
    return true;
  }

  return false;
};

module.exports = hasDate;

},{"../data/monthLengths":4,"../fns":8}],11:[function(_dereq_,module,exports){
"use strict";

var strFmt = _dereq_('./strParse');

var fns = _dereq_('../fns');

var namedDates = _dereq_('./named-dates'); //we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================
//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so


var minimumEpoch = 2500000000;
var defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1 //support [2016, 03, 01] format

};

var handleArray = function handleArray(s, arr) {
  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  for (var i = 0; i < order.length; i++) {
    var num = arr[i] || defaults[order[i]] || 0;
    s = s[order[i]](num);
  }

  return s;
}; //support {year:2016, month:3} format


var handleObject = function handleObject(s, obj) {
  obj = Object.assign({}, defaults, obj);
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i]; //make sure we have this method

    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue;
    } //make sure the value is a number


    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue;
    }

    var num = obj[unit] || defaults[unit] || 0;
    s = s[unit](num);
  }

  return s;
}; //find the epoch from different input styles


var parseInput = function parseInput(s, input, givenTz) {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }

    s.epoch = input;
    return s;
  } //set tmp time


  s.epoch = Date.now();

  if (input === null || input === undefined) {
    return s; //k, we're good.
  } //support input of Date() object


  if (fns.isDate(input) === true) {
    s.epoch = input.getTime();
    return s;
  } //support [2016, 03, 01] format


  if (fns.isArray(input) === true) {
    s = handleArray(s, input);
    return s;
  } //support {year:2016, month:3} format


  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      s.tz = input.tz;
      return s;
    }

    s = handleObject(s, input);
    return s;
  } //input as a string..


  if (typeof input !== 'string') {
    return s;
  } //little cleanup..


  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
  input = input.replace(/,/g, '');
  input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s);
    return s;
  } //try each text-parse template, use the first good result


  for (var i = 0; i < strFmt.length; i++) {
    var m = input.match(strFmt[i].reg);

    if (m) {
      s = strFmt[i].parse(s, m, givenTz);
      return s;
    }
  }

  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'");
  }

  s.epoch = null;
  return s;
};

module.exports = parseInput;

},{"../fns":8,"./named-dates":12,"./strParse":15}],12:[function(_dereq_,module,exports){
"use strict";

var dates = {
  now: function now(s) {
    s.epoch = Date.now();
    return s;
  },
  tonight: function tonight(s) {
    s.epoch = Date.now();
    s = s.hour(18);
    return s;
  },
  today: function today(s) {
    s.epoch = Date.now();
    return s;
  },
  tomorrow: function tomorrow(s) {
    s.epoch = Date.now();
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s;
  },
  yesterday: function yesterday(s) {
    s.epoch = Date.now();
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s;
  },
  christmas: function christmas(s) {
    var year = new Date().getFullYear();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

    return s;
  },
  'new years': function newYears(s) {
    var year = new Date().getFullYear();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

    return s;
  }
};
dates['new years eve'] = dates['new years'];
module.exports = dates;

},{}],13:[function(_dereq_,module,exports){
"use strict";

//pull-apart ISO offsets, like "+0100"
var parseOffset = function parseOffset(s, offset) {
  if (!offset) {
    return s;
  } //this is a fancy-move


  if (offset === 'Z') {
    offset = '+0000';
  } // according to ISO8601, tz could be hh:mm, hhmm or hh
  // so need few more steps before the calculation.


  var num = 0; // for (+-)hh:mm

  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    //support "+01:00"
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, '');
    } //support "+01:30"


    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, '.5');
    }
  } // for (+-)hhmm


  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, '.5');
  }

  num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

  if (Math.abs(num) > 100) {
    num = num / 100;
  } //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }

  var tz = 'etc/gmt' + num;
  var zones = s.timezones;

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz;
  }

  return s;
};

module.exports = parseOffset;

},{}],14:[function(_dereq_,module,exports){
"use strict";

var parseTime = function parseTime(s) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  str = str.replace(/^\s+/, '').toLowerCase(); //trim
  //formal time formats - 04:30.23

  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

  if (arr !== null) {
    //validate it a little
    var h = Number(arr[1]);

    if (h < 0 || h > 24) {
      return s.startOf('day');
    }

    var m = Number(arr[2]); //don't accept '5:3pm'

    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf('day');
    }

    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(arr[3] || 0);
    s = s.millisecond(arr[4] || 0); //parse-out am/pm

    var ampm = str.match(/[\b0-9](am|pm)\b/);

    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1]);
    }

    return s;
  } //try an informal form - 5pm (no minutes)


  arr = str.match(/([0-9]+) ?(am|pm)/);

  if (arr !== null && arr[1]) {
    var _h = Number(arr[1]); //validate it a little..


    if (_h > 12 || _h < 1) {
      return s.startOf('day');
    }

    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf('hour');
    return s;
  } //no time info found, use start-of-day


  s = s.startOf('day');
  return s;
};

module.exports = parseTime;

},{}],15:[function(_dereq_,module,exports){
"use strict";

var walkTo = _dereq_('../methods/set/walk');

var months = _dereq_('../data/months').mapping();

var parseOffset = _dereq_('./parseOffset');

var parseTime = _dereq_('./parseTime');

var hasDate = _dereq_('./hasDate');

var fns = _dereq_('../fns');

var parseYear = function parseYear() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
  var year = parseInt(str.trim(), 10);
  year = year || new Date().getFullYear();
  return year;
};

var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
{
  reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
  parse: function parse(s, arr, givenTz, options) {
    var month = parseInt(arr[2], 10) - 1;
    var obj = {
      year: arr[1],
      month: month,
      date: arr[3]
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    parseOffset(s, arr[5], givenTz, options);
    walkTo(s, obj);
    s = parseTime(s, arr[4]);
    return s;
  }
}, //iso "2015-03-25" or "2015/03/25" //0-based-months!
{
  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
  parse: function parse(s, arr) {
    var obj = {
      year: arr[1],
      month: parseInt(arr[2], 10) - 1,
      date: parseInt(arr[3], 10)
    };

    if (obj.month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      obj.date = parseInt(arr[2], 10);
      obj.month = parseInt(arr[3], 10) - 1;
    }

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s);
    return s;
  }
}, //short - uk "03/25/2015"  //0-based-months!
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    var date = parseInt(arr[2], 10);

    if (month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      month = parseInt(arr[2], 10) - 1;
      date = parseInt(arr[1], 10);
    }

    var year = arr[3] || new Date().getFullYear();
    var obj = {
      year: year,
      month: month,
      date: date
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s);
    return s;
  }
}, //Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
  parse: function parse(s, arr) {
    var month = months[arr[1].toLowerCase()];
    var year = parseYear(arr[3]);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[2] || '')
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s, arr[4]);
    return s;
  }
}, //February 2017 (implied date)
{
  reg: /^([a-z]+) ([0-9]{4})$/i,
  parse: function parse(s, arr) {
    var month = months[arr[1].toLowerCase()];
    var year = parseYear(arr[2]);
    var obj = {
      year: year,
      month: month,
      date: 1
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s, arr[4]);
    return s;
  }
}, //Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
  parse: function parse(s, arr) {
    var month = months[arr[2].toLowerCase()];
    var year = parseYear(arr[3]);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[1])
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s);
    return s;
  }
}, {
  // '1992'
  reg: /^[0-9]{4}$/i,
  parse: function parse(s, arr) {
    var year = parseYear(arr[0]);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s);
    return s;
  }
}, {
  // '200bc'
  reg: /^[0-9,]+ ?b\.?c\.?$/i,
  parse: function parse(s, arr) {
    var str = arr[0] || ''; //make negative-year

    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

    str = str.replace(/,/g, '');
    var year = parseInt(str.trim(), 10);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    s = parseTime(s);
    return s;
  }
}];
module.exports = strFmt;

},{"../data/months":5,"../fns":8,"../methods/set/walk":33,"./hasDate":10,"./parseOffset":13,"./parseTime":14}],16:[function(_dereq_,module,exports){
"use strict";

var _format = _dereq_('./methods/format');

var _unixFmt = _dereq_('./methods/format/unixFmt');

var _progress = _dereq_('./methods/progress');

var _nearest = _dereq_('./methods/nearest');

var _diff = _dereq_('./methods/diff');

var _since = _dereq_('./methods/since');

var ends = _dereq_('./methods/startOf');

var _every = _dereq_('./methods/every');

var _timezone = _dereq_('./timezone/index');

var findTz = _dereq_('./timezone/find');

var handleInput = _dereq_('./input');

var fns = _dereq_('./fns'); //the spacetime instance methods (also, the API)


var methods = {
  set: function set(input, tz) {
    var s = this.clone();
    s = handleInput(s, input);

    if (tz) {
      this.tz = findTz(tz);
    }

    return s;
  },
  timezone: function timezone() {
    return _timezone(this);
  },
  isDST: function isDST() {
    return _timezone(this).current.isDST;
  },
  hasDST: function hasDST() {
    return _timezone(this).hasDst;
  },
  offset: function offset() {
    return _timezone(this).current.offset * 60;
  },
  hemisphere: function hemisphere() {
    return _timezone(this).hemisphere;
  },
  format: function format(fmt) {
    return _format(this, fmt);
  },
  unixFmt: function unixFmt(fmt) {
    return _unixFmt(this, fmt);
  },
  startOf: function startOf(unit) {
    return ends.startOf(this, unit);
  },
  endOf: function endOf(unit) {
    return ends.endOf(this, unit);
  },
  leapYear: function leapYear() {
    var year = this.year();
    return fns.isLeapYear(year);
  },
  progress: function progress() {
    return _progress(this);
  },
  nearest: function nearest(unit) {
    return _nearest(this, unit);
  },
  diff: function diff(d, unit) {
    return _diff(this, d, unit);
  },
  since: function since(d) {
    if (!d) {
      d = this.clone().set();
    }

    return _since(this, d);
  },
  next: function next(unit) {
    var s = this.add(1, unit);
    return s.startOf(unit);
  },
  //the start of the previous year/week/century
  last: function last(unit) {
    var s = this.subtract(1, unit);
    return s.startOf(unit);
  },
  isValid: function isValid() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }

    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  "goto": function goto(tz) {
    var s = this.clone();
    s.tz = findTz(tz, s.timezones); //science!

    return s;
  },
  //get each week/month/day between a -> b
  every: function every(unit, to) {
    return _every(this, unit, to);
  },
  isAwake: function isAwake() {
    var hour = this.hour(); //10pm -> 8am

    if (hour < 8 || hour > 22) {
      return false;
    }

    return true;
  },
  isAsleep: function isAsleep() {
    return !this.isAwake();
  },
  //pretty-printing
  log: function log() {
    console.log('');
    console.log(_format(this, 'nice-short'));
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(_format(this, 'full-short'));
    return this;
  },
  debug: function debug() {
    var tz = this.timezone();
    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this;
  } // aliases

};
methods.inDST = methods.isDST;
methods.round = methods.nearest;
methods.each = methods.every;
module.exports = methods;

},{"./fns":8,"./input":11,"./methods/diff":19,"./methods/every":20,"./methods/format":22,"./methods/format/unixFmt":23,"./methods/nearest":25,"./methods/progress":26,"./methods/since":34,"./methods/startOf":35,"./timezone/find":38,"./timezone/index":40}],17:[function(_dereq_,module,exports){
"use strict";

var walkTo = _dereq_('./set/walk');

var ms = _dereq_('../data/milliseconds');

var monthLength = _dereq_('../data/monthLengths');

var fns = _dereq_('../fns');

var order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
var keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
  quarterhour: order.slice(0, 2),
  hour: order.slice(0, 3),
  date: order.slice(0, 4),
  month: order.slice(0, 4),
  quarter: order.slice(0, 4),
  season: order.slice(0, 4),
  year: order,
  decade: order,
  century: order
};
keep.week = keep.hour;
keep.season = keep.date;
keep.quarter = keep.date; // Units need to be dst adjuested

var dstAwareUnits = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  day: true
};
var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true //month is the only thing we 'model/compute'
  //- because ms-shifting can be off by enough

};

var rollMonth = function rollMonth(want, old) {
  //increment year
  if (want.month > 0) {
    var years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    var _years = Math.floor(Math.abs(want.month) / 13, 10);

    _years = Math.abs(_years) + 1;
    want.year = old.year() - _years; //ignore extras

    want.month = want.month % 12;
    want.month = want.month + 12;

    if (want.month === 12) {
      want.month = 0;
    }
  }

  return want;
};

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.add = function (num, unit) {
    var s = this.clone();

    if (!unit || num === 0) {
      return s; //don't bother
    }

    var old = this.clone();
    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

    if (ms[unit]) {
      s.epoch += ms[unit] * num;
    } else if (unit === 'week') {
      s.epoch += ms.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += ms.minute * 15;
    } //now ensure our milliseconds/etc are in-line


    var want = {};

    if (keep[unit]) {
      keep[unit].forEach(function (u) {
        want[u] = old[u]();
      });
    }

    if (dstAwareUnits[unit]) {
      var diff = old.timezone().current.offset - s.timezone().current.offset;
      s.epoch += diff * 3600 * 1000;
    } //ensure month/year has ticked-over


    if (unit === 'month') {
      want.month = old.month() + num; //month is the one unit we 'model' directly

      want = rollMonth(want, old);
    } //support coercing a week, too


    if (unit === 'week') {
      var sum = old.date() + num * 7;

      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    } //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
        //specify a naive date number, if it's easy to do...
        var _sum = old.date() + num;

        if (_sum <= 28 && _sum > 1) {
          want.date = _sum;
        } //or if we haven't moved at all..
        else if (num !== 0 && old.isSame(s, 'day')) {
            want.date = old.date() + num;
          }
      } //ensure year has changed (leap-years)
      else if (unit === 'year' && s.year() === old.year()) {
          s.epoch += ms.week;
        } //these are easier
        else if (unit === 'decade') {
            want.year = s.year() + 10;
          } else if (unit === 'century') {
            want.year = s.year() + 100;
          } //keep current date, unless the month doesn't have it.


    if (keepDate[unit]) {
      var max = monthLength[want.month];
      want.date = old.date();

      if (want.date > max) {
        want.date = max;
      }
    }

    walkTo(s, want);
    return s;
  }; //subtract is only add *-1


  SpaceTime.prototype.subtract = function (num, unit) {
    var s = this.clone();
    return s.add(num * -1, unit);
  }; //add aliases


  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

module.exports = addMethods;

},{"../data/milliseconds":3,"../data/monthLengths":4,"../fns":8,"./set/walk":33}],18:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    isAfter: function isAfter(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch > epoch;
    },
    isBefore: function isBefore(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch < epoch;
    },
    isEqual: function isEqual(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch === epoch;
    },
    isBetween: function isBetween(start, end) {
      start = fns.beADate(start, this);
      end = fns.beADate(end, this);
      var startEpoch = fns.getEpoch(start);

      if (startEpoch === null) {
        return null;
      }

      var endEpoch = fns.getEpoch(end);

      if (endEpoch === null) {
        return null;
      }

      return startEpoch < this.epoch && this.epoch < endEpoch;
    } //hook them into proto

  };
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../fns":8}],19:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns'); //init this function up here


var doAll = function doAll() {}; //increment until dates are the same


var climb = function climb(a, b, unit) {
  var i = 0;
  a = a.clone();

  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  } //oops, we went too-far..


  if (a.isAfter(b, unit)) {
    i -= 1;
  }

  return i;
}; //these small units can just be 'eyeballed'
//it's way too slow to do them procedurally


var diffQuick = function diffQuick(a, b) {
  var ms = b.epoch - a.epoch;
  var obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
  obj.days = parseInt(obj.hours / 24, 10);
  obj.weeks = parseInt(obj.days / 7, 10);
  return obj;
};

var diff = function diff(a, b, unit) {
  //remove trailing s
  b = fns.beADate(b, a);

  if (!unit) {
    return doAll(a, b);
  } //make sure it's plural-form


  unit = fns.normalize(unit);

  if (/s$/.test(unit) !== true) {
    unit += 's';
  } //do quick-form for these small-ones


  if (unit === 'milliseconds' || unit === 'seconds' || unit === 'minutes') {
    return diffQuick(a, b)[unit];
  } //otherwise, do full-version


  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};

doAll = function doAll(a, b) {
  //do ms, seconds, minutes in a faster way
  var all = diffQuick(a, b);
  all.years = diff(a, b, 'year');
  all.months = diff(a, b, 'month'); //do a fast-diff for days/weeks, if it's huge

  if (Math.abs(all.years) > 50) {
    return all;
  }

  all.weeks = diff(a, b, 'week');
  all.days = diff(a, b, 'day'); //only fully-compute hours if it's a small diff

  if (all.years === 0) {
    all.hours = diff(a, b, 'hour');
  }

  return all;
};

module.exports = diff;

},{"../fns":8}],20:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns');

var days = _dereq_('../data/days'); //is it 'wednesday'?


var isDay = function isDay(unit) {
  if (days["short"]().find(function (s) {
    return s === unit;
  })) {
    return true;
  }

  if (days["long"]().find(function (s) {
    return s === unit;
  })) {
    return true;
  }

  return false;
}; // return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input


var every = function every(start) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var end = arguments.length > 2 ? arguments[2] : undefined;

  if (!unit || !end) {
    return [];
  } //cleanup unit param


  unit = fns.normalize(unit); //cleanup to param

  end = start.clone().set(end); //swap them, if they're backwards

  if (start.isAfter(end)) {
    var tmp = start;
    start = end;
    end = tmp;
  } //support 'every wednesday'


  var d = start.clone();

  if (isDay(unit)) {
    d = d.next(unit);
    unit = 'week';
  } else {
    d = d.next(unit);
  } //okay, actually start doing it


  var result = [];

  while (d.isBefore(end)) {
    result.push(d);
    d = d.add(1, unit);
  }

  return result;
};

module.exports = every;

},{"../data/days":2,"../fns":8}],21:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../../fns'); // create the timezone offset part of an iso timestamp
// it's kind of nuts how involved this is
// "+01:00", "+0100", or simply "+01"


var isoOffset = function isoOffset(s) {
  var offset = s.timezone().current.offset;
  var isNegative = offset < 0;
  var minute = '00'; //handle 5.5 → '5:30'

  if (Math.abs(offset % 1) === 0.5) {
    minute = '30';

    if (offset >= 0) {
      offset = Math.floor(offset);
    } else {
      offset = Math.ceil(offset);
    }
  }

  if (isNegative) {
    //handle negative sign
    offset *= -1;
    offset = fns.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns.zeroPad(offset, 2);
    offset = '+' + offset;
  }

  offset = offset + ':' + minute; //'Z' means 00

  if (offset === '+00:00') {
    offset = 'Z';
  }

  return offset;
};

module.exports = isoOffset;

},{"../../fns":8}],22:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../../fns');

var months = _dereq_('../../data/months');

var days = _dereq_('../../data/days');

var isoOffset = _dereq_('./_offset');

var format = {
  day: function day(s) {
    return fns.titleCase(s.dayName());
  },
  'day-short': function dayShort(s) {
    return fns.titleCase(days["short"]()[s.day()]);
  },
  'day-number': function dayNumber(s) {
    return s.day();
  },
  'day-ordinal': function dayOrdinal(s) {
    return fns.ordinal(s.day());
  },
  'day-pad': function dayPad(s) {
    return fns.zeroPad(s.day());
  },
  date: function date(s) {
    return s.date();
  },
  'date-ordinal': function dateOrdinal(s) {
    return fns.ordinal(s.date());
  },
  'date-pad': function datePad(s) {
    return fns.zeroPad(s.date());
  },
  month: function month(s) {
    return fns.titleCase(s.monthName());
  },
  'month-short': function monthShort(s) {
    return fns.titleCase(months["short"]()[s.month()]);
  },
  'month-number': function monthNumber(s) {
    return s.month();
  },
  'month-ordinal': function monthOrdinal(s) {
    return fns.ordinal(s.month());
  },
  'month-pad': function monthPad(s) {
    return fns.zeroPad(s.month());
  },
  year: function year(s) {
    var year = s.year();

    if (year > 0) {
      return year;
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  'year-short': function yearShort(s) {
    var year = s.year();

    if (year > 0) {
      return "'".concat(String(s.year()).substr(2, 4));
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  time: function time(s) {
    return s.time();
  },
  'time-24': function time24(s) {
    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
  },
  hour: function hour(s) {
    return s.hour12();
  },
  'hour-24': function hour24(s) {
    return s.hour24();
  },
  minute: function minute(s) {
    return s.minute();
  },
  'minute-pad': function minutePad(s) {
    return fns.zeroPad(s.minute());
  },
  second: function second(s) {
    return s.second();
  },
  'second-pad': function secondPad(s) {
    return fns.zeroPad(s.second());
  },
  ampm: function ampm(s) {
    return s.ampm();
  },
  quarter: function quarter(s) {
    return 'Q' + s.quarter();
  },
  season: function season(s) {
    return s.season();
  },
  era: function era(s) {
    return s.era();
  },
  timezone: function timezone(s) {
    return s.timezone().name;
  },
  offset: function offset(s) {
    return isoOffset(s);
  },
  numeric: function numeric(s) {
    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  // yyyy/mm/dd
  'numeric-us': function numericUs(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
  },
  // mm/dd/yyyy
  'numeric-uk': function numericUk(s) {
    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
  },
  //dd/mm/yyyy
  'mm/dd': function mmDd(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  //mm/dd
  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: function iso(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    var hour = fns.zeroPad(s.h24());
    var minute = fns.zeroPad(s.minute());
    var second = fns.zeroPad(s.second());
    var ms = fns.zeroPad(s.millisecond(), 3);
    var offset = isoOffset(s);
    return "".concat(s.year(), "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': function isoShort(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
  },
  'iso-utc': function isoUtc(s) {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  },
  //i made these up
  nice: function nice(s) {
    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  },
  'nice-year': function niceYear(s) {
    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
  },
  'nice-day': function niceDay(s) {
    return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
  },
  'nice-full': function niceFull(s) {
    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  } //aliases

};
var aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  tz: 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'nice-short': 'nice',
  mdy: 'numeric-us',
  dmy: 'numeric-uk',
  ymd: 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
};
Object.keys(aliases).forEach(function (k) {
  return format[k] = format[aliases[k]];
});

var printFormat = function printFormat(s) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return '';
  } //support .format('month')


  if (format.hasOwnProperty(str)) {
    var out = String(format[str](s) || '');

    if (str !== 'ampm') {
      out = fns.titleCase(out);
    }

    return out;
  } //support '{hour}:{minute}' notation


  if (str.indexOf('{') !== -1) {
    var sections = /\{(.+?)\}/g;
    str = str.replace(sections, function (_, fmt) {
      fmt = fmt.toLowerCase().trim();

      if (format.hasOwnProperty(fmt)) {
        return String(format[fmt](s) || '');
      }

      return '';
    });
    return str;
  }

  return s.format('iso-short');
};

module.exports = printFormat;

},{"../../data/days":2,"../../data/months":5,"../../fns":8,"./_offset":21}],23:[function(_dereq_,module,exports){
"use strict";

var pad = _dereq_('../../fns').zeroPad;

var formatTimezone = _dereq_('../../fns').formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
//time-symbols we support


var mapping = {
  G: function G(s) {
    return s.era();
  },
  GG: function GG(s) {
    return s.era();
  },
  GGG: function GGG(s) {
    return s.era();
  },
  GGGG: function GGGG(s) {
    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
  },
  //year
  y: function y(s) {
    return s.year();
  },
  yy: function yy(s) {
    //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10);
  },
  yyy: function yyy(s) {
    return s.year();
  },
  yyyy: function yyyy(s) {
    return s.year();
  },
  yyyyy: function yyyyy(s) {
    return '0' + s.year();
  },
  // u: (s) => {},//extended non-gregorian years
  //quarter
  Q: function Q(s) {
    return s.quarter();
  },
  QQ: function QQ(s) {
    return s.quarter();
  },
  QQQ: function QQQ(s) {
    return s.quarter();
  },
  QQQQ: function QQQQ(s) {
    return s.quarter();
  },
  //month
  M: function M(s) {
    return s.month() + 1;
  },
  MM: function MM(s) {
    return pad(s.month() + 1);
  },
  MMM: function MMM(s) {
    return s.format('month-short');
  },
  MMMM: function MMMM(s) {
    return s.format('month');
  },
  //week
  w: function w(s) {
    return s.week();
  },
  ww: function ww(s) {
    return pad(s.week());
  },
  //week of month
  // W: (s) => s.week(),
  //date of month
  d: function d(s) {
    return s.date();
  },
  dd: function dd(s) {
    return pad(s.date());
  },
  //date of year
  D: function D(s) {
    return s.dayOfYear();
  },
  DD: function DD(s) {
    return pad(s.dayOfYear());
  },
  DDD: function DDD(s) {
    return pad(s.dayOfYear(), 3);
  },
  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day
  //day
  E: function E(s) {
    return s.format('day-short');
  },
  EE: function EE(s) {
    return s.format('day-short');
  },
  EEE: function EEE(s) {
    return s.format('day-short');
  },
  EEEE: function EEEE(s) {
    return s.format('day');
  },
  EEEEE: function EEEEE(s) {
    return s.format('day')[0];
  },
  e: function e(s) {
    return s.day();
  },
  ee: function ee(s) {
    return s.day();
  },
  eee: function eee(s) {
    return s.format('day-short');
  },
  eeee: function eeee(s) {
    return s.format('day');
  },
  eeeee: function eeeee(s) {
    return s.format('day')[0];
  },
  //am/pm
  a: function a(s) {
    return s.ampm().toUpperCase();
  },
  aa: function aa(s) {
    return s.ampm().toUpperCase();
  },
  aaa: function aaa(s) {
    return s.ampm().toUpperCase();
  },
  aaaa: function aaaa(s) {
    return s.ampm().toUpperCase();
  },
  //hour
  h: function h(s) {
    return s.h12();
  },
  hh: function hh(s) {
    return pad(s.h12());
  },
  H: function H(s) {
    return s.hour();
  },
  HH: function HH(s) {
    return pad(s.hour());
  },
  // j: (s) => {},//weird hour format
  m: function m(s) {
    return s.minute();
  },
  mm: function mm(s) {
    return pad(s.minute());
  },
  s: function s(_s) {
    return _s.second();
  },
  ss: function ss(s) {
    return pad(s.second());
  },
  //milliseconds in the day
  A: function A(s) {
    return s.epoch - s.startOf('day').epoch;
  },
  //timezone
  z: function z(s) {
    return s.timezone().name;
  },
  zz: function zz(s) {
    return s.timezone().name;
  },
  zzz: function zzz(s) {
    return s.timezone().name;
  },
  zzzz: function zzzz(s) {
    return s.timezone().name;
  },
  Z: function Z(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZ: function ZZ(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZZ: function ZZZ(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZZZ: function ZZZZ(s) {
    return formatTimezone(s.timezone().current.offset, ':');
  }
};

var addAlias = function addAlias(_char, to, n) {
  var name = _char;
  var toName = to;

  for (var i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += _char;
    toName += to;
  }
};

addAlias('q', 'Q', 4);
addAlias('L', 'M', 4);
addAlias('Y', 'y', 4);
addAlias('c', 'e', 4);
addAlias('k', 'H', 2);
addAlias('K', 'h', 2);
addAlias('S', 's', 2);
addAlias('v', 'z', 4);
addAlias('V', 'Z', 4);

var unixFmt = function unixFmt(s, str) {
  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

  var arr = [chars[0]];
  var quoteOn = false;

  for (var i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === "'") {
      quoteOn = !quoteOn; //support '', meaning one tick

      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue;
      }
    } //merge it with the last one


    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }

  return arr.reduce(function (txt, c) {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || '';
    } else {
      txt += c;
    }

    return txt;
  }, '');
};

module.exports = unixFmt;

},{"../../fns":8}],24:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns');

var days = _dereq_('../data/days');

var months = _dereq_('../data/months');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    i18n: function i18n(data) {
      if (!fns.isObject(data) || !fns.isObject(data.days) || !fns.isObject(data.months) || !fns.isArray(data.days["short"]) || !fns.isArray(data.days["long"]) || !fns.isArray(data.months["short"]) || !fns.isArray(data.months["long"])) {
        throw new Error('Invalid i18n payload passed.');
      }

      days.set(data.days);
      months.set(data.months);
    } //hook them into proto

  };
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../data/days":2,"../data/months":5,"../fns":8}],25:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns'); //round to either current, or +1 of this unit


var nearest = function nearest(s, unit) {
  unit = fns.normalize(unit);
  var prog = s.progress();

  if (prog[unit] !== undefined) {
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }

    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }

  return s;
};

module.exports = nearest;

},{"../fns":8}],26:[function(_dereq_,module,exports){
"use strict";

//how far it is along, from 0-1
var progress = function progress(s) {
  var units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];
  var obj = {};
  units.forEach(function (k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    obj[k] = parseFloat(percent.toFixed(2));
  });
  return obj;
};

module.exports = progress;

},{}],27:[function(_dereq_,module,exports){
"use strict";

var quarters = _dereq_('../../data/quarters');

var seasons = _dereq_('../../data/seasons');

var set = _dereq_('../set/set');

var fns = _dereq_('../../fns'); //destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting


var clearMinutes = function clearMinutes(s) {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s;
};

module.exports = {
  //some ambiguity here with 12/24h
  time: function time(str) {
    if (str !== undefined) {
      var s = this.clone();
      s.epoch = set.time(s, str);
      return s;
    }

    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
  },
  //since the start of the year
  week: function week(num) {
    if (num !== undefined) {
      var s = this.clone();
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes(s); //don't go into last-year

      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }

      num -= 1; //1-based

      s = s.add(num, 'weeks');
      return s;
    } //find-out which week it is


    var tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day('monday'); //don't go into last-year

    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    }

    var thisOne = this.epoch; //if the week technically hasn't started yet

    if (tmp.epoch > thisOne) {
      return 1;
    }

    for (var i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }

      tmp = tmp.add(1, 'week');
    }

    return 52;
  },
  quarter: function quarter(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }

      if (quarters[num]) {
        var s = this.clone();
        var _month = quarters[num][0];
        s = s.month(_month);
        s = s.date(1);
        s = s.startOf('day');
        return s;
      }
    }

    var month = this.d.getMonth();

    for (var i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }

    return 4;
  },
  //'3:30' is 3.5
  hourFloat: function hourFloat(num) {
    if (num !== undefined) {
      var s = this.clone();

      var _minute = num % 1;

      _minute = _minute * 60;

      var _hour = parseInt(num, 10);

      s.epoch = set.hours(s, _hour);
      s.epoch = set.minutes(s, _minute);
      return s;
    }

    var d = this.d;
    var hour = d.getHours();
    var minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },
  season: function season(input) {
    var hem = 'north';

    if (this.hemisphere() === 'South') {
      hem = 'south';
    }

    if (input !== undefined) {
      var s = this.clone();

      for (var i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day');
        }
      }

      return s;
    }

    var month = this.d.getMonth();

    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
        return seasons[hem][_i][0];
      }
    }

    return 'winter';
  }
};

},{"../../data/quarters":6,"../../data/seasons":7,"../../fns":8,"../set/set":32}],28:[function(_dereq_,module,exports){
"use strict";

var normal = _dereq_('./normal');

var destructive = _dereq_('./destructive');

var tricky = _dereq_('./tricky');

var addMethods = function addMethods(Space) {
  //hook the methods into prototype
  Object.keys(normal).forEach(function (k) {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach(function (k) {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach(function (k) {
    Space.prototype[k] = tricky[k];
  });
};

module.exports = addMethods;

},{"./destructive":27,"./normal":29,"./tricky":30}],29:[function(_dereq_,module,exports){
"use strict";

var set = _dereq_('../set/set'); //the most basic get/set methods


var methods = {
  millisecond: function millisecond(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.milliseconds(s, num);
      return s;
    }

    return this.d.getMilliseconds();
  },
  second: function second(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.seconds(s, num);
      return s;
    }

    return this.d.getSeconds();
  },
  minute: function minute(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.minutes(s, num);
      return s;
    }

    return this.d.getMinutes();
  },
  hour: function hour(num) {
    var d = this.d;

    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.hours(s, num); // walkTo(s, {
      //   month: this.month(),
      //   date: this.date(),
      //   hour: num
      // })

      return s;
    }

    return d.getHours();
  },
  hour12: function hour12(str) {
    var d = this.d;

    if (str !== undefined) {
      var s = this.clone();
      str = '' + str;
      var m = str.match(/^([0-9]+)(am|pm)$/);

      if (m) {
        var hour = parseInt(m[1], 10);

        if (m[2] === 'pm') {
          hour += 12;
        }

        s.epoch = set.hours(s, hour);
      }

      return s;
    } //get the hour


    var hour12 = d.getHours();

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }

    if (hour12 === 0) {
      hour12 = 12;
    }

    return hour12;
  },
  date: function date(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.date(s, num);
      return s;
    }

    return this.d.getDate();
  },
  month: function month(input) {
    if (input !== undefined) {
      var s = this.clone();
      s.epoch = set.month(s, input);
      return s;
    }

    return this.d.getMonth();
  },
  year: function year(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.year(s, num);
      return s;
    }

    return this.d.getFullYear();
  },
  iso: function iso(num) {
    if (num !== undefined) {
      return this.set(num);
    }

    return this.format('iso');
  },
  dayTime: function dayTime(str) {
    if (str !== undefined) {
      var times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      };
      var s = this.clone();
      str = str || '';
      str = str.toLowerCase();

      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }

      return s;
    }

    var h = this.hour();

    if (h < 6) {
      return 'night';
    }

    if (h < 12) {
      //until noon
      return 'morning';
    }

    if (h < 17) {
      //until 5pm
      return 'afternoon';
    }

    if (h < 22) {
      //until 10pm
      return 'evening';
    }

    return 'night';
  },
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.dayOfYear(s, num);
      return s;
    } //days since newyears - jan 1st is 1, jan 2nd is 2...


    var sum = 0;
    var month = this.d.getMonth();
    var tmp; //count the num days in each month

    for (var i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month

      sum += tmp.getDate();
    }

    return sum + this.d.getDate();
  },
  //bc/ad years
  era: function era(str) {
    if (str !== undefined) {
      var s = this.clone();
      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

      var year = s.d.getFullYear(); //make '1992' into 1992bc..

      if (str === 'bc' && year > 0) {
        s.epoch = set.year(s, year * -1);
      } //make '1992bc' into '1992'


      if (str === 'ad' && year < 0) {
        s.epoch = set.year(s, year * -1);
      }

      return s;
    }

    if (this.d.getFullYear() < 0) {
      return 'BC';
    }

    return 'AD';
  },
  //alias of 'since' but opposite - like moment.js
  from: function from(d) {
    d = this.clone().set(d);
    return d.since(this);
  },
  fromNow: function fromNow() {
    var d = this.clone().set(Date.now());
    return d.since(this);
  } //aliases

};
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;
module.exports = methods;

},{"../set/set":32}],30:[function(_dereq_,module,exports){
"use strict";

var days = _dereq_('../../data/days');

var months = _dereq_('../../data/months');

var walkTo = _dereq_('../set/walk'); //non-destructive getters/setters with fancy moves to do


module.exports = {
  //like 'wednesday' (hard!)
  day: function day(input) {
    if (input === undefined) {
      return this.d.getDay();
    }

    var original = this.clone();
    var want = input; // accept 'wednesday'

    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days["short"]().indexOf(input);

      if (want === -1) {
        want = days["long"]().indexOf(input);
      }
    } //move approx


    var day = this.d.getDay();
    var diff = day - want;
    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },
  ampm: function ampm(input) {
    var which = 'am';
    var hour = this.hour();

    if (hour >= 12) {
      which = 'pm';
    }

    if (typeof input !== 'string') {
      return which;
    } //okay, we're doing a setter


    var s = this.clone();
    input = input.toLowerCase().trim(); //ampm should never change the day
    // - so use `.hour(n)` instead of `.minus(12,'hour')`

    if (hour >= 12 && input === 'am') {
      //noon is 12pm
      hour -= 12;
      return s.hour(hour);
    }

    if (hour < 12 && input === 'pm') {
      hour += 12;
      return s.hour(hour);
    }

    return s;
  },
  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days["long"]()[this.day()];
    }

    var s = this.clone();
    s = s.day(input);
    return s;
  },
  monthName: function monthName(input) {
    if (input === undefined) {
      return months["long"]()[this.month()];
    }

    var s = this.clone();
    s = s.month(input);
    return s;
  }
};

},{"../../data/days":2,"../../data/months":5,"../set/walk":33}],31:[function(_dereq_,module,exports){
"use strict";

//make a string, for easy comparison between dates
var print = {
  millisecond: function millisecond(s) {
    return s.epoch;
  },
  second: function second(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
  },
  minute: function minute(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
  },
  hour: function hour(s) {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: function day(s) {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: function week(s) {
    return [s.year(), s.week()].join('-');
  },
  month: function month(s) {
    return [s.year(), s.month()].join('-');
  },
  quarter: function quarter(s) {
    return [s.year(), s.quarter()].join('-');
  },
  year: function year(s) {
    return s.year();
  }
};
print.date = print.day;

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.isSame = function (b, unit) {
    var a = this;

    if (!unit) {
      return null;
    }

    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    } //support 'seconds' aswell as 'second'


    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }

    return null;
  };
};

module.exports = addMethods;

},{}],32:[function(_dereq_,module,exports){
"use strict";

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
var ms = _dereq_('../../data/milliseconds');

var months = _dereq_('../../data/months');

var monthLength = _dereq_('../../data/monthLengths');

var walkTo = _dereq_('./walk');

var validate = function validate(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }

  return n;
};

var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

var confirm = function confirm(s, tmp, unit) {
  var n = order.indexOf(unit);
  var arr = order.slice(n, order.length);

  for (var i = 0; i < arr.length; i++) {
    var want = tmp[arr[i]]();
    s[arr[i]](want);
  }

  return s;
};

module.exports = {
  milliseconds: function milliseconds(s, n) {
    n = validate(n);
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by

    return s.epoch - diff;
  },
  seconds: function seconds(s, n) {
    n = validate(n);
    var diff = s.second() - n;
    var shift = diff * ms.second;
    return s.epoch - shift;
  },
  minutes: function minutes(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.minute() - n;
    var shift = diff * ms.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch;
  },
  hours: function hours(s, n) {
    n = validate(n);

    if (n >= 24) {
      n = 24;
    } else if (n < 0) {
      n = 0;
    }

    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * ms.hour;
    s.epoch -= shift;
    walkTo(s, {
      hour: n
    });
    confirm(s, old, 'minute');
    return s.epoch;
  },
  //support setting time by '4:25pm' - this isn't very-well developed..
  time: function time(s, str) {
    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);

      if (!m) {
        return s.epoch;
      }

      m.splice(2, 0, '0'); //add implicit 0 minutes
    }

    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);

    if (hour > 12) {
      h24 = true;
    } //make the hour into proper 24h time


    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }

      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }

    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch;
  },
  date: function date(s, n) {
    n = validate(n); //avoid setting february 31st

    if (n > 28) {
      var max = monthLength[s.month()];

      if (n > max) {
        n = max;
      }
    } //avoid setting < 0


    if (n <= 0) {
      n = 1;
    }

    walkTo(s, {
      date: n
    });
    return s.epoch;
  },
  //this one's tricky
  month: function month(s, n) {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }

    n = validate(n); //don't go past december

    if (n >= 12) {
      n = 11;
    }

    if (n <= 0) {
      n = 0;
    }

    var date = s.date(); //there's no 30th of february, etc.

    if (date > monthLength[n]) {
      //make it as close as we can..
      date = monthLength[n];
    }

    walkTo(s, {
      month: n,
      date: date
    });
    return s.epoch;
  },
  year: function year(s, n) {
    n = validate(n);
    walkTo(s, {
      year: n
    });
    return s.epoch;
  },
  dayOfYear: function dayOfYear(s, n) {
    n = validate(n);
    var old = s.clone();
    n -= 1; //days are 1-based

    if (n <= 0) {
      n = 0;
    } else if (n >= 365) {
      n = 364;
    }

    s = s.startOf('year');
    s = s.add(n, 'day');
    confirm(s, old, 'hour');
    return s.epoch;
  }
};

},{"../../data/milliseconds":3,"../../data/monthLengths":4,"../../data/months":5,"./walk":33}],33:[function(_dereq_,module,exports){
"use strict";

var ms = _dereq_('../../data/milliseconds'); //basically, step-forward/backward until js Date object says we're there.


var walk = function walk(s, n, fn, unit, previous) {
  var current = s.d[fn]();

  if (current === n) {
    return; //already there
  }

  var startUnit = previous === null ? null : s.d[previous]();
  var original = s.epoch; //try to get it as close as we can

  var diff = n - current;
  s.epoch += ms[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

  if (unit === 'day' && Math.abs(diff) > 28) {
    //but don't push it over a month
    if (n < 28) {
      s.epoch += ms.hour;
    }
  } //repair it if we've gone too far or something
  //(go by half-steps, just in case)


  var halfStep = ms[unit] / 2;

  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  } //oops, did we change previous unit? revert it.


  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original;
  }
}; //find the desired date by a increment/check while loop


var units = {
  year: {
    valid: function valid(n) {
      return n > -4000 && n < 4000;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getFullYear', 'year', null);
    }
  },
  month: {
    valid: function valid(n) {
      return n >= 0 && n <= 11;
    },
    walkTo: function walkTo(s, n) {
      var d = s.d;
      var current = d.getMonth();
      var original = s.epoch;
      var startUnit = d.getYear();

      if (current === n) {
        return;
      } //try to get it as close as we can..


      var diff = n - current;
      s.epoch += ms.day * (diff * 28); //special case
      //oops, did we change the year? revert it.

      if (startUnit !== s.d.getYear()) {
        s.epoch = original;
      } //incriment by day


      while (s.d.getMonth() < n) {
        s.epoch += ms.day;
      }

      while (s.d.getMonth() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  date: {
    valid: function valid(n) {
      return n > 0 && n <= 31;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getDate', 'day', 'getMonth');
    }
  },
  hour: {
    valid: function valid(n) {
      return n >= 0 && n < 24;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getHours', 'hour', 'getDate');
    }
  },
  minute: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getMinutes', 'minute', 'getHours');
    }
  },
  second: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};

var walkTo = function walkTo(s, wants) {
  var keys = Object.keys(units);
  var old = s.clone();

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var n = wants[k];

    if (n === undefined) {
      n = old[k]();
    }

    if (typeof n === 'string') {
      n = parseInt(n, 10);
    } //make-sure it's valid


    if (!units[k].valid(n)) {
      s.epoch = null;

      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n);
      }

      return;
    } // console.log(k, n)


    units[k].walkTo(s, n);
  }

  return;
};

module.exports = walkTo;

},{"../../data/milliseconds":3}],34:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../fns'); //by spencermountain + Shaun Grady
//our conceptual 'break-points' for each unit


var qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  } //get number of hours/minutes... between the two dates

};

function getDiff(a, b) {
  var isBefore = a.isBefore(b);
  var later = isBefore ? b : a;
  var earlier = isBefore ? a : b;
  earlier = earlier.clone();
  var diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff).forEach(function (unit) {
    if (earlier.isSame(later, unit)) {
      return;
    }

    var max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff[unit] = max;
  }); //reverse it, if necessary

  if (isBefore) {
    Object.keys(diff).forEach(function (u) {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }

  return diff;
} // Expects a plural unit arg


function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }

  return value + ' ' + unit;
} //create the human-readable diff between the two dates


var since = function since(start, end) {
  end = fns.beADate(end, start);
  var diff = getDiff(start, end);
  var isNow = Object.keys(diff).every(function (u) {
    return !diff[u];
  });

  if (isNow === true) {
    return {
      diff: diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    };
  }

  var rounded;
  var qualified;
  var precise;
  var englishValues = []; //go through each value and create its text-representation

  Object.keys(diff).forEach(function (unit, i, units) {
    var value = Math.abs(diff[unit]);

    if (value === 0) {
      return;
    }

    var englishValue = pluralize(value, unit);
    englishValues.push(englishValue);

    if (!rounded) {
      rounded = qualified = englishValue;

      if (i > 4) {
        return;
      } //is it a 'almost' something, etc?


      var nextUnit = units[i + 1];
      var nextValue = Math.abs(diff[nextUnit]);

      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
    }
  }); //make them into a string

  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }

  return {
    diff: diff,
    rounded: rounded,
    qualified: qualified,
    precise: precise
  };
};

module.exports = since;

},{"../fns":8}],35:[function(_dereq_,module,exports){
"use strict";

var seasons = _dereq_('../data/seasons');

var quarters = _dereq_('../data/quarters');

var walkTo = _dereq_('./set/walk');

var units = {
  minute: function minute(s) {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterHour: function quarterHour(s) {
    var minute = s.minutes();

    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }

    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: function hour(s) {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: function day(s) {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: function week(s) {
    var original = s.clone();
    s = s.day(1); //monday

    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }

    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: function month(s) {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: function quarter(s) {
    var q = s.quarter();

    if (quarters[q]) {
      walkTo(s, {
        month: quarters[q][0],
        date: quarters[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }

    return s;
  },
  season: function season(s) {
    var current = s.season();
    var hem = 'north';

    if (s.hemisphere() === 'South') {
      hem = 'south';
    }

    for (var i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        //winter goes between years
        var year = s.year();

        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }

        walkTo(s, {
          year: year,
          month: seasons[hem][i][1],
          date: seasons[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s;
      }
    }

    return s;
  },
  year: function year(s) {
    walkTo(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  decade: function decade(s) {
    s = s.startOf('year');
    var year = s.year();
    var decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s;
  },
  century: function century(s) {
    s = s.startOf('year');
    var year = s.year();
    var decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s;
  }
};
units.date = units.day;

var startOf = function startOf(a, unit) {
  var s = a.clone();

  if (units[unit]) {
    return units[unit](s);
  }

  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units.season(s);
  }

  return s;
}; //piggy-backs off startOf


var endOf = function endOf(a, unit) {
  var s = a.clone();

  if (units[unit]) {
    s = units[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s;
  }

  return s;
};

module.exports = {
  startOf: startOf,
  endOf: endOf
};

},{"../data/quarters":6,"../data/seasons":7,"./set/walk":33}],36:[function(_dereq_,module,exports){
"use strict";

var quickOffset = _dereq_('./timezone/quick');

var findTz = _dereq_('./timezone/find');

var handleInput = _dereq_('./input');

var methods = _dereq_('./methods');

var timezones = _dereq_('../zonefile/unpack'); //fake timezone-support, for fakers (es5 class)


var SpaceTime = function SpaceTime(input, tz) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  //the holy moment
  this.epoch = null; //the shift for the given timezone

  this.tz = findTz(tz, timezones); //whether to output warnings to console

  this.silent = options.silent || true; //add getter/setters

  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var offset = quickOffset(this); //every computer is somewhere- get this computer's built-in offset

      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

      var shift = bias + offset * 60; //in minutes

      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset

      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  }); //add this data on the object, to allow adding new timezones

  Object.defineProperty(this, 'timezones', {
    get: function get() {
      return timezones;
    },
    set: function set(obj) {
      timezones = obj;
      return obj;
    }
  }); //parse the various formats

  if (input !== undefined || input === null) {
    var tmp = handleInput(this, input, tz, options);
    this.epoch = tmp.epoch;
  }
}; //(add instance methods to prototype)


Object.keys(methods).forEach(function (k) {
  SpaceTime.prototype[k] = methods[k];
}); // ¯\_(ツ)_/¯

SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent
  });
}; //append more methods


_dereq_('./methods/query')(SpaceTime);

_dereq_('./methods/add')(SpaceTime);

_dereq_('./methods/same')(SpaceTime);

_dereq_('./methods/compare')(SpaceTime);

_dereq_('./methods/i18n')(SpaceTime);

module.exports = SpaceTime;

},{"../zonefile/unpack":47,"./input":11,"./methods":16,"./methods/add":17,"./methods/compare":18,"./methods/i18n":24,"./methods/query":28,"./methods/same":31,"./timezone/find":38,"./timezone/quick":41}],37:[function(_dereq_,module,exports){
"use strict";

var informal = _dereq_('../../zonefile/informal').informal; //these timezone abbreviations are used aggressively in other places
//if tz doesn't have an abbreviation, and is in the same offset...
//these are pretty subjective. i just made them up.


var greedy_north = {
  '-8': 'america/anchorage',
  '-7': 'america/los_angeles',
  '-6': 'america/denver',
  '-5': 'america/chicago',
  '-4': 'america/new_york',
  '-3': 'america/halifax',
  '0': 'etc/gmt',
  '1': 'europe/lisbon',
  '2': 'europe/berlin',
  // '3': 'europe/riga',
  // '3': 'europe/moscow',
  '8': 'asia/shanghai'
};
var greedy_south = {
  '-3': 'america/sao_paulo',
  '0': 'etc/gmt',
  '1': 'africa/lagos',
  // '2': 'africa/khartoum',//central africa
  '2': 'africa/johannesburg',
  //south africa
  '3': 'africa/nairobi',
  '10': 'australia/brisbane',
  '12': 'pacific/auckland'
};
var british = {
  'europe/belfast': true,
  'europe/dublin': true,
  'europe/guernsey': true,
  'europe/jersey': true
};

var handleSpecial = function handleSpecial(tz, offset) {
  if (british.hasOwnProperty(tz)) {
    if (offset === '1') {
      return 'BST';
    }

    return 'GMT';
  }

  return null;
};

var chooseAbbrev = function chooseAbbrev(arr, obj) {
  if (arr[1] && obj.current.isDST === true) {
    return arr[1].toUpperCase();
  }

  if (arr[0]) {
    return arr[0].toUpperCase();
  }

  return null;
}; //


var display = function display(tz, obj) {
  //try a straight-up match
  if (informal.hasOwnProperty(tz)) {
    var abbr = chooseAbbrev(informal[tz], obj);

    if (abbr !== null) {
      return abbr;
    }
  }

  var offset = String(obj.default_offset);
  var special = handleSpecial(tz, offset);

  if (special) {
    return special;
  }

  if (obj.hemisphere === 'North' && greedy_north.hasOwnProperty(offset)) {
    var useTz = greedy_north[offset];
    return chooseAbbrev(informal[useTz], obj) || '';
  }

  if (obj.hemisphere === 'South' && greedy_south.hasOwnProperty(offset)) {
    var _useTz = greedy_south[offset];
    return chooseAbbrev(informal[_useTz], obj) || '';
  }

  return '';
};

module.exports = display;

},{"../../zonefile/informal":46}],38:[function(_dereq_,module,exports){
"use strict";

var tzs = _dereq_('../../zonefile/unpack');

var informal = _dereq_('../../zonefile/informal').lookup;

var guessTz = _dereq_('./guessTz');

var local = guessTz();
var isOffset = /(\-?[0-9]+)h(rs)?/; //add all the city names by themselves

var cities = Object.keys(tzs).reduce(function (h, k) {
  var city = k.split('/')[1] || '';
  city = city.replace(/_/g, ' ');
  h[city] = k;
  return h;
}, {}); //try to match these against iana form

var normalize = function normalize(tz) {
  tz = tz.replace(/ time/g, '');
  tz = tz.replace(/ (standard|daylight|summer)/g, '');
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
  tz = tz.replace(/\beuropean/g, 'europe');
  tz = tz.replace(/\islands/g, 'island');
  return tz;
}; // try our best to reconcile the timzone to this given string


var lookupTz = function lookupTz(str, zones) {
  if (!str) {
    return local;
  }

  var tz = str.trim();
  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1];
  }

  tz = tz.toLowerCase();

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //lookup more loosely..


  tz = normalize(tz);

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //try abbrevations and things


  if (informal.hasOwnProperty(tz) === true) {
    return informal[tz];
  } //try city-names


  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz];
  } // //try to parse '-5h'


  var m = tz.match(isOffset);

  if (m !== null) {
    var num = Number(m[1]);
    num = num * -1; //it's opposite!

    num = (num > 0 ? '+' : '') + num;
    var gmt = 'etc/gmt' + num;

    if (zones.hasOwnProperty(gmt)) {
      return gmt;
    }
  }

  console.warn("Cannot find timezone named: '" + str + "'");
  return local;
};

module.exports = lookupTz;

},{"../../zonefile/informal":46,"../../zonefile/unpack":47,"./guessTz":39}],39:[function(_dereq_,module,exports){
"use strict";

//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
var fallbackTZ = 'utc'; //
//this Intl object is not supported often, yet

var safeIntl = function safeIntl() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }

  var format = Intl.DateTimeFormat();

  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }

  var timezone = format.resolvedOptions().timeZone;

  if (!timezone) {
    return null;
  }

  return timezone.toLowerCase();
};

var guessTz = function guessTz() {
  var timezone = safeIntl();

  if (timezone === null) {
    return fallbackTZ;
  }

  return timezone;
}; //do it once per computer


module.exports = guessTz;

},{}],40:[function(_dereq_,module,exports){
"use strict";

var findTz = _dereq_('./find');

var inSummerTime = _dereq_('./summerTime');

var display = _dereq_('./display');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return [];
  }

  return dst.split('->');
};

var titleCase = function titleCase(str) {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/\/gmt/, '/GMT');
  str = str.replace(/[\/_]([a-z])/gi, function (s) {
    return s.toUpperCase();
  });
  return str;
}; //get metadata about this timezone


var timezone = function timezone(s) {
  var zones = s.timezones;
  var tz = s.tz;

  if (zones.hasOwnProperty(tz) === false) {
    tz = findTz(s.tz, zones);
  }

  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }

    return {
      current: {
        epochShift: 0
      }
    };
  }

  var found = zones[tz];
  var result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  };

  if (result.hasDst) {
    var arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  } //find the offsets for summer/winter times
  //(these variable names are north-centric)


  var summer = found.offset; // (july)

  var winter = summer; // (january) assume it's the same for now

  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = found.offset + 1;
    }
  } //find out which offset to use right now
  //use 'summer' time july-time


  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
  } //try to find the best name for it..


  result.display = display(tz, result, zones);
  return result;
};

module.exports = timezone;

},{"./display":37,"./find":38,"./summerTime":42}],41:[function(_dereq_,module,exports){
"use strict";

var isSummer = _dereq_('./summerTime'); // this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.js, but speeds up spacetime considerably


var quickOffset = function quickOffset(s) {
  var zones = s.timezones;
  var obj = zones[s.tz];

  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0;
  }

  if (obj.dst === undefined) {
    return obj.offset;
  } //get our two possible offsets


  var jul = obj.offset;
  var dec = obj.offset + 1; // assume it's the same for now

  if (obj.hem === 'n') {
    dec = jul - 1;
  }

  var split = obj.dst.split('->');
  var inSummer = isSummer(s.epoch, split[0], split[1], jul);

  if (inSummer === true) {
    return jul;
  }

  return dec;
};

module.exports = quickOffset;

},{"./summerTime":42}],42:[function(_dereq_,module,exports){
"use strict";

var zeroPad = _dereq_('../fns').zeroPad;

var toString = function toString(d) {
  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
}; // a timezone will begin with a specific offset in january
// then some will switch to something else between november-march


var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  var d = new Date(epoch); //(try to mediate this a little?)

  var bias = d.getTimezoneOffset() || 0;
  var shift = bias + defaultOffset * 60; //in minutes

  shift = shift * 60 * 1000; //in ms

  d = new Date(epoch + shift);
  var current = toString(d); //eg. is it after ~november?

  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true;
    }
  }

  return false;
};

module.exports = shouldChange;

},{"../fns":8}],43:[function(_dereq_,module,exports){
"use strict";

var Spacetime = _dereq_('./spacetime'); // const timezones = require('../data');


var whereIts = function whereIts(a, b) {
  var start = new Spacetime(null);
  var end = new Spacetime(null);
  start = start.time(a); //if b is undefined, use as 'within one hour'

  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  var startHour = start.hour();
  var endHour = end.hour();
  var tzs = Object.keys(start.timezones).filter(function (tz) {
    if (tz.indexOf('/') === -1) {
      return false;
    }

    var m = new Spacetime(null, tz);
    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }

      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }

      return true;
    }

    return false;
  });
  return tzs;
};

module.exports = whereIts;

},{"./spacetime":36}],44:[function(_dereq_,module,exports){
module.exports={
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  "9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
  "8|n|03/25:03->09/29:23": "2/ulan_bator",
  "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
  "6|s": "12/vostok",
  "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
  "6.5|n": "2/rangoon,9/cocos",
  "5|s": "12/mawson,9/kerguelen",
  "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/calcutta,2/colombo,2/kolkata",
  "4|s": "9/reunion",
  "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
  "4.5|n|03/22:00->09/21:24": "2/tehran",
  "4.5|n": "2/kabul",
  "3|s": "12/syowa,9/antananarivo",
  "3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
  "3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
  "3|n|03/31:00->10/26:24": "2/beirut",
  "3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
  "3|n|03/29:00->10/25:01": "2/amman",
  "3|n|03/29:00->10/24:24": "2/damascus",
  "3|n|03/23:01->10/26:01": "2/gaza,2/hebron",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
  "2|s|03/31:02->10/27:02": "12/troll",
  "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  "2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
  "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  "1|s|04/02:01->09/03:03": "0/windhoek",
  "1|s": "0/kinshasa,0/luanda",
  "1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
  "1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
  "1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s|04/07:04->09/29:03": "11/apia",
  "13|s|01/15:02->11/05:03": "11/tongatapu",
  "13|n": "11/enderbury,11/fakaofo",
  "12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
  "12|s|01/13:03->11/03:02": "11/fiji",
  "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  "12.75|s|04/07:03->04/07:02": "11/chatham",
  "11|s": "12/macquarie,11/bougainville",
  "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  "11.5|n": "11/norfolk",
  "10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
  "10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
  "0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
  "-9|n|03/10:02->11/03:02": "1/adak,1/atka",
  "-9|n": "11/gambier",
  "-9.5|n": "11/marquesas",
  "-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
  "-8|n": "11/pitcairn",
  "-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
  "-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
  "-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
  "-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
  "-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
  "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
  "-5|s": "1/lima,1/rio_branco,5/acre",
  "-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  "-5|n|03/12:03->11/05:01": "1/north_dakota",
  "-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
  "-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
  "-4|s|05/13:23->08/13:01": "12/palmer",
  "-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
  "-4|s|03/23:24->10/06:00": "1/asuncion",
  "-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
  "-4|s": "1/la_paz,1/manaus,5/west",
  "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  "-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
  "-4|n|03/10:00->11/03:01": "1/havana",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  "-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
  "-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
  "-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
  "-2|s": "5/denoronha",
  "-2|n|03/30:22->10/26:23": "1/godthab",
  "-2|n|03/10:02->11/03:02": "1/miquelon",
  "-2|n": "1/noronha,3/south_georgia",
  "-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
  "-1|n": "3/cape_verde",
  "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
  "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
}
},{}],45:[function(_dereq_,module,exports){
"use strict";

//prefixes for iana names..
module.exports = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

},{}],46:[function(_dereq_,module,exports){
"use strict";

// this is a very rough list of informal and abbreviated timezones
// i am not an expert, or even half-knowledgeable in this subject.
// please help.
// partially from: https://en.wikipedia.org/wiki/list_of_time_zone_abbreviations
//format:  'best/iana': [standard, daylight, alias...]
var informal = {
  //north america
  'america/halifax': ['ast', 'adt', 'atlantic'],
  //or 'arabia standard time'
  'america/new_york': ['est', 'edt', 'eastern'],
  //or 'Ecuador Time'
  'america/chicago': ['cst', 'cdt', 'central'],
  'america/denver': ['mst', 'mdt', 'mountain'],
  'america/los_angeles': ['pst', 'pdt', 'pacific'],
  'america/anchorage': ['ahst', 'ahdt', 'akst', 'akdt', 'alaska'],
  //Alaska Standard Time
  'america/st_johns': ['nst', 'ndt', 'nt', 'newfoundland', 'nddt'],
  //south america
  'america/caracas': ['vet', null, 'venezuela'],
  'america/bogota': ['cot', null, 'colombia'],
  'america/cayenne': ['gft', null, 'french guiana'],
  'america/paramaribo': ['srt', null, 'suriname'],
  'america/guyana': ['gyt'],
  'america/buenos_aires': ['art', null, 'argentina'],
  'america/la_paz': ['bot', null, 'bolivia'],
  'america/asuncion': ['pyt', 'pyst', 'paraguay'],
  'america/santiago': ['clt', 'clst', 'chile'],
  'america/lima': ['pet', null, 'peru'],
  'america/montevideo': ['uyt', null, 'uruguay'],
  'atlantic/stanley': ['fkst', null, 'falkland island'],
  //brazil
  'america/manaus': ['amt'],
  'america/sao_paulo': ['brt', 'brst'],
  'brazil/acre': ['act'],
  // amst: -3, //amazon summer time (brazil)
  // fnt: -2, //fernando de noronha time
  // pmdt: -2, //saint pierre and miquelon daylight time
  // pmst: -3, //saint pierre and miquelon standard time
  // rott: -3, //rothera research station time
  // awt: 'america/blanc-sablon',
  // addt: 'america/pangnirtung',
  // apt: 'america/blanc-sablon',
  // cddt: 'america/rankin_inlet',
  // cwt: 'america/mexico_city',
  // cpt: 'america/atikokan',
  // eddt: 'america/iqaluit',
  // ept: 'america/detroit',
  // ewt: 'america/detroit',
  // ect: 'america/anguilla', //eastern caribbean time (does not recognise dst)
  // 'eastern caribbean': 'america/anguilla',
  // ffmt: 'america/martinique',
  // kmt: 'america/grand_turk',
  // mddt: 'america/cambridge_bay',
  // mpt: 'america/boise',
  // mwt: 'america/phoenix',
  // nwt: 'america/adak',
  // // npt: 'america/goose_bay',
  // pddt: 'america/inuvik',
  // ppmt: 'america/port-au-prince',
  // ppt: 'america/dawson_creek',
  // pwt: 'america/dawson_creek',
  // qmt: 'america/guayaquil',
  // sdmt: 'america/santo_domingo',
  // sjmt: 'america/costa_rica',
  // ydt: 'america/dawson', //yukon
  // ypt: 'america/dawson',
  // yddt: 'america/dawson',
  // ywt: 'america/dawson',
  // yst: 'america/whitehorse',
  //europe
  'europe/london': ['gmt', 'bst', 'british'],
  //britain is different
  'etc/gmt': ['gmt', null, 'greenwich'],
  'europe/lisbon': ['wet', 'west', 'west europe'],
  //western europe
  'europe/berlin': ['cet', 'cest', 'central europe', 'middle european', 'met', 'mest'],
  //central europe
  'europe/riga': ['eet', 'eest', 'east europe', 'kalt'],
  //eastern europe
  // -- these are old european ones, before the EU, i think:
  // 'europe/minsk': ['feet', 'feest', 'eastern europe'], //further eastern europe (discontinued)
  // ace: 'europe/dublin',
  // amt: 'europe/amsterdam',
  // bdst: 'europe/gibraltar',
  // bmt: 'europe/brussels',
  // bst: 'europe/gibraltar', //british summer time
  // 'british summer': 1,
  // dmt: 'europe/dublin',
  // dft: 1, //aix-specific equivalent of central european time
  // cmt: 'europe/copenhagen',
  // // ist: 'europe/dublin',
  // imt: 'europe/sofia',
  // lst: 'europe/riga',
  // pmt: 'europe/prague',
  // rmt: 'europe/rome',
  // set: 'europe/stockholm',
  // wemt: 'europe/madrid',
  // tse: 'europe/dublin',
  // utc: 'etc/utc', //coordinated universal time
  // 'coordinated universal': 'etc/utc',
  //russia
  'europe/moscow': ['msk', null, 'fet', 'mdst', 'msd'],
  //'further eastern europe'
  'europe/samara': ['samt'],
  'asia/yekaterinburg': ['yekt'],
  'asia/omsk': ['omst'],
  'asia/krasnoyarsk': ['krat'],
  'asia/novosibirsk': ['novt'],
  'asia/irkutsk': ['irkt'],
  'asia/yakutsk': ['yakt'],
  'asia/vladivostok': ['vlat'],
  'asia/magadan': ['magt'],
  'asia/sakhalin': ['sakt'],
  'asia/srednekolymsk': ['sret'],
  'asia/anadyr': ['anat'],
  'asia/kamchatka': ['pett'],
  //near-russia
  'asia/tashkent': ['uzt', 'uzbekistan'],
  //uzbekistan time
  'asia/bishkek': ['kgt', 'kyrgyzstan'],
  //kyrgyzstan time
  'antarctica/vostok': ['vost'],
  'asia/hovd': ['hovt'],
  'asia/ashgabat': ['tmt', null, 'turkmenistan'],
  // wmt: 'europe/warsaw',
  // 'europe/volgograd':['volt']
  //africa
  'africa/lagos': ['wat', 'wast', 'west africa'],
  //west african
  'africa/khartoum': ['cat', null, 'central africa'],
  'africa/nairobi': ['eat', null, 'east africa'],
  'atlantic/cape_verde': ['cvt'],
  'indian/mauritius': ['mut'],
  'indian/reunion': ['ret'],
  'africa/johannesburg': ['sast', null, 'south africa'],
  //atlantic
  'atlantic/azores': ['azot', 'azost', 'hmt'],
  'america/godthab': ['wgt', 'wgst', 'west greenland'],
  'america/scoresbysund': ['egt', 'egst', 'east greenland'],
  //middle-east
  'europe/istanbul': ['trt', null, 'turkey'],
  'asia/tbilisi': ['get', null, 'georgia'],
  // 'asia/yerevan': ['amt', null, 'armenia'], //(sorry!)
  'asia/baku': ['azt', null, 'azerbaijan'],
  'asia/jerusalem': [null, 'idt', 'israel', 'jmt', 'iddt'],
  //using ist for india
  'asia/tehran': ['irst', 'irdt', 'iran'],
  'asia/karachi': ['pkt', null, 'pakistan'],
  'asia/kabul': ['aft', null, 'afghanistan'],
  'asia/dushanbe': ['tjt', null, 'tajikistan'],
  'asia/almaty': ['almt', null, 'alma ata'],
  'asia/dubai': ['gst', null, 'gulf'],
  //india
  'asia/kolkata': ['ist', null, 'india', 'slst'],
  // 'asia/dhaka': ['bst', null, 'bangladesh'], //(sorry)
  'asia/thimbu': ['btt', null, 'bhutan'],
  'indian/maldives': ['mvt'],
  'asia/kathmandu': ['npt', null, 'nepal'],
  'indian/cocos': ['cct', null, 'cocos island'],
  'indian/chagos': ['iot', null, 'indian chagos'],
  'indian/kerguelen': ['tft', null, 'french southern and antarctic'],
  // biot: 6, //british indian ocean time
  // iot: 3, //indian ocean time
  //asia
  'asia/shanghai': ['ct', null, 'china', 'hkt'],
  'asia/ulaanbaatar': ['ulat'],
  'asia/seoul': ['kst', null, 'korea'],
  'asia/tokyo': ['jst', null, 'japan'],
  'asia/phnom_penh': ['ict', null, 'indochina'],
  'asia/manila': ['pht', null, 'philippines'],
  'asia/singapore': ['sgt'],
  // mmt: 'asia/colombo',
  //australia
  'australia/brisbane': ['aest', 'aedt', 'australian east'],
  //australian eastern standard time
  'australia/adelaide': ['acst', 'acdt', 'australian central'],
  //australian central daylight savings time
  'australia/eucla': ['acwst', null, 'cwst', 'australian central western'],
  //australian central western standard time (unofficial)
  'australia/perth': ['awst', 'awdt', 'australian west'],
  //australian western standard time
  'pacific/auckland': ['nzst', 'nzdt', 'nzmt'],
  'australia/lord_howe': ['lhst', 'lhdt'],
  //pacific
  'pacific/guam': ['chst'],
  'pacific/chatham': ['chast', 'chadt'],
  'pacific/honolulu': ['hst'],
  'asia/brunei': ['bnt', null, 'bdt'],
  'pacific/midway': ['sst', null, 'samoa', 'sdt'],
  'pacific/niue': ['nut'],
  'pacific/fakaofo': ['tkt'],
  'pacific/rarotonga': ['ckt', null, 'cook islands'],
  'chile/easterisland': ['east', 'easst', 'easter island', 'emt'],
  'asia/jayapura': ['wit', null, 'east indonesia'],
  'asia/jakarta': ['wib', null, 'west indonesia'],
  'asia/makassar': ['wita', null, 'central indonesia'],
  'pacific/galapagos': ['galt'],
  'pacific/fiji': ['fjt', 'fjst'],
  'asia/dili': ['tlt', null, 'east timor'],
  'indian/christmas': ['cxt'] // sbt: 11, //solomon islands time
  // mht: 12, //marshall islands time
  // bit: -12, //baker island time
  // cist: -8, //clipperton island standard time
  // chut: 10, //chuuk time
  // ddut: 10, //dumont durville time
  // gst: 'pacific/guam',
  // gamt: -9, //gambier islands time
  // git: -9, //gambier island time
  // gilt: 12, //gilbert island time
  // idlw: -12, //international day line west time zone
  // 'international day line west': -12,
  // kost: 11, //kosrae time
  // lint: 14, //line islands time
  // magt: 12, //magadan time
  // mist: 11, //macquarie island station time
  // nct: 11, //new caledonia time
  // nft: 11, //norfolk island time
  // phot: 13, //phoenix island time
  // pont: 11, //pohnpei standard time
  // pett: 12, //kamchatka time
  // mart: -9.5, //marquesas islands time
  // mit: -9.5, //marquesas islands time
  // myt: 8, //malaysia time
  // nut: -11, //niue time
  // pht: 8, //philippine time
  // pgt: 10, //papua new guinea time
  // pmmt: 'pacific/bougainville',
  // // smt: 'asia/singapore',
  // sakt: 11, //sakhalin island time
  // sret: 11, //srednekolymsk time
  // sst: 'pacific/pago_pago',
  // taht: -10, //tahiti time
  // tvt: 12, //tuvalu time
  // tkt: 13, //tokelau time
  // tot: 13, //tonga time
  // vut: 11, //vanuatu time
  // wakt: 12, //wake island time
  //i forget (sorry!)
  // haec: 2, //heure avancée deurope centrale french-language name for cest
  // syot: 3, //showa station time
  // yekt: 5, //yekaterinburg time
  // sct: 4, //seychelles time
  // orat: 5, //oral time
  // mawt: 5, //mawson station time
  // hovt: 7, //khovd standard time
  // hovst: 8, //khovd summer time
  // davt: 7, //davis time
  // chost: 9, //choibalsan summer time
  // chot: 8, //choibalsan standard time
  // wst: 8, //western standard time
  //use each abbreviation as a key

};
var lookup = Object.keys(informal).reduce(function (h, k) {
  var arr = informal[k];

  for (var i = 0; i < 5; i += 1) {
    if (arr[i]) {
      h[arr[i]] = k;
    }
  }

  return h;
}, {});
module.exports = {
  informal: informal,
  lookup: lookup
};

},{}],47:[function(_dereq_,module,exports){
"use strict";

var data = _dereq_('./_build.json');

var prefixes = _dereq_('./_prefixes.js');

var all = {};
Object.keys(data).forEach(function (k) {
  var split = k.split('|');
  var obj = {
    offset: Number(split[0]),
    hem: split[1]
  };

  if (split[2]) {
    obj.dst = split[2];
  }

  var names = data[k].split(',');
  names.forEach(function (str) {
    str = str.replace(/(^[0-9]+)\//, function (before, num) {
      num = Number(num);
      return prefixes[num] + '/';
    });
    all[str] = obj;
  });
});
all['utc'] = {
  offset: 0,
  hem: 'n' //(sorry)
  //add etc/gmt+n

};

for (var i = -13; i <= 13; i += 0.5) {
  var num = i;

  if (num > 0) {
    num = '+' + num;
  }

  var name = 'etc/gmt' + num;
  all[name] = {
    offset: i * -1,
    //they're negative!
    hem: 'n' //(sorry)

  };
  name = 'utc/gmt' + num; //this one too, why not.

  all[name] = {
    offset: i * -1,
    hem: 'n'
  };
} // console.log(all)
// console.log(Object.keys(all).length)


module.exports = all;

},{"./_build.json":44,"./_prefixes.js":45}]},{},[9])(9)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spencerColor=e()}}(function(){return function u(i,a,c){function f(r,e){if(!a[r]){if(!i[r]){var o="function"==typeof _dereq_&&_dereq_;if(!e&&o)return o(r,!0);if(d)return d(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var t=a[r]={exports:{}};i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,u,i,a,c)}return a[r].exports}for(var d="function"==typeof _dereq_&&_dereq_,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,r,o){"use strict";r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#F2C0BB",brown:"#705E5C",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",fuscia:"#735873",beige:"#e6d7b3",slate:"#8C8C88",suede:"#9c896c",burnt:"#603a39",sea:"#50617A",sky:"#2D85A8",night:"#303b50",rouge:"#914045",grey:"#838B91",mud:"#C4ABAB",royal:"#275291",cherry:"#cc6966",tulip:"#e6b3bc",rose:"#D68881",fire:"#AB5850",greyblue:"#72697D",greygreen:"#8BA3A2",greypurple:"#978BA3",burn:"#6D5685",slategrey:"#bfb0b3",light:"#a3a5a5",lighter:"#d7d5d2",fudge:"#4d4d4d",lightgrey:"#949a9e",white:"#fbfbfb",dimgrey:"#606c74",softblack:"#463D4F",dark:"#443d3d",black:"#333333"}},{}],2:[function(e,r,o){"use strict";var n=e("./colors"),t={juno:["blue","mud","navy","slate","pink","burn"],barrow:["rouge","red","orange","burnt","brown","greygreen"],roma:["#8a849a","#b5b0bf","rose","lighter","greygreen","mud"],palmer:["red","navy","olive","pink","suede","sky"],mark:["#848f9a","#9aa4ac","slate","#b0b8bf","mud","grey"],salmon:["sky","sea","fuscia","slate","mud","fudge"],dupont:["green","brown","orange","red","olive","blue"],bloor:["night","navy","beige","rouge","mud","grey"],yukon:["mud","slate","brown","sky","beige","red"],david:["blue","green","yellow","red","pink","light"],neste:["mud","cherry","royal","rouge","greygreen","greypurple"],ken:["red","sky","#c67a53","greygreen","#dfb59f","mud"]};Object.keys(t).forEach(function(e){t[e]=t[e].map(function(e){return n[e]||e})}),r.exports=t},{"./colors":1}],3:[function(e,r,o){"use strict";var n=e("./colors"),t=e("./combos"),u={colors:n,list:Object.keys(n).map(function(e){return n[e]}),combos:t};r.exports=u},{"./colors":1,"./combos":2}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vhtml = factory());
}(this, (function () { 'use strict';

var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));


},{}],11:[function(_dereq_,module,exports){
module.exports={
  "name": "somehow",
  "description": "make infographics without thinking",
  "version": "0.0.17",
  "main": "builds/somehow.js",
  "unpkg": "builds/somehow.min.js",
  "author": "Spencer Kelly (spencermountain)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/spencermountain/somehow.git"
  },
  "homepage": "https://github.com/spencermountain/somehow#readme",
  "scripts": {
    "start": "budo scratch.js:assets/bundle.js --live",
    "watch": "npm run start",
    "build": "node ./scripts/build.js"
  },
  "files": [
    "builds"
  ],
  "dependencies": {
    "d3-shape": "1.3.5",
    "fit-aspect-ratio": "2.0.0",
    "htm": "2.1.1",
    "spacetime": "5.7.0",
    "spacetime-ticks": "0.1.0",
    "spencer-color": "0.1.0",
    "vhtml": "2.1.0"
  },
  "devDependencies": {
    "@babel/core": "7.4.4",
    "@babel/preset-env": "7.4.4",
    "babelify": "10.0.0",
    "budo": "11.6.2",
    "derequire": "2.0.6",
    "shelljs": "0.8.3",
    "terser": "3.17.0"
  }
}

},{}],12:[function(_dereq_,module,exports){
"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["<svg ...", ">\n      ", "\n    </svg>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fitAspect = _dereq_('fit-aspect-ratio');

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var methods = _dereq_('./methods');

var YScale = _dereq_('./scales/YScale');

var XScale = _dereq_('./scales/Scale');

var XAxis = _dereq_('./axis/XAxis');

var YAxis = _dereq_('./axis/YAxis');

var Shape = _dereq_('./shapes/Shape');

var Area = _dereq_('./shapes/Area');

var Rect = _dereq_('./shapes/Rect');

var Line = _dereq_('./shapes/Line');

var Text = _dereq_('./shapes/Text');

var Dot = _dereq_('./shapes/Dot');

var Annotation = _dereq_('./shapes/Annotation');

var MidArea = _dereq_('./shapes/MidArea');

var Bar = _dereq_('./shapes/Bar');

var Image = _dereq_('./shapes/Image');

var Arrow = _dereq_('./shapes/Arrow');

var World =
/*#__PURE__*/
function () {
  function World() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, World);

    this.width = obj.width || 600;
    this.height = obj.height || 400;

    if (obj.aspect) {
      this.aspect = obj.aspect;
      var res = fitAspect(obj);
      this.width = res.width || 600;
      this.height = res.height || 400;
    }

    this.shapes = []; //give the points a little bit of space.

    this.wiggle_room = 1.05;
    this.x = new XScale(obj, this);
    this.y = new YScale(obj, this);
    this.xAxis = new XAxis({}, this);
    this.yAxis = new YAxis({}, this);
    this.html = htm.bind(vhtml);
    this.inputs = [];
    this.state = {};
    this.state.time = Date.now();
    this.el = obj.el || null;

    if (typeof this.el === 'string') {
      this.el = document.querySelector(this.el);
    }
  }

  _createClass(World, [{
    key: "bind",
    value: function bind(fn) {
      this.html = htm.bind(fn);
    }
  }, {
    key: "line",
    value: function line(obj) {
      var line = new Line(obj, this);
      this.shapes.push(line);
      return line;
    }
  }, {
    key: "dot",
    value: function dot(obj) {
      var dot = new Dot(obj, this);
      this.shapes.push(dot);
      return dot;
    }
  }, {
    key: "text",
    value: function text(obj) {
      var text = new Text(obj, this);
      this.shapes.push(text);
      return text;
    }
  }, {
    key: "area",
    value: function area(obj) {
      var shape = new Area(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "midArea",
    value: function midArea(obj) {
      var shape = new MidArea(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "rect",
    value: function rect(obj) {
      var shape = new Rect(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "bar",
    value: function bar(obj) {
      var shape = new Bar(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "annotation",
    value: function annotation(obj) {
      var shape = new Annotation(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "image",
    value: function image(obj) {
      var shape = new Image(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "arrow",
    value: function arrow(obj) {
      var shape = new Arrow(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "shape",
    value: function shape(obj) {
      var shape = new Shape(obj, this);
      this.shapes.push(shape);
      return shape;
    }
  }, {
    key: "getShape",
    value: function getShape(id) {
      return this.shapes.find(function (shape) {
        return shape.id === id || shape._id === id;
      });
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (this.el) {
        this.el.innerHTML = this.build();
      } else {
        console.log('must define world html element');
      }
    } //remove shapes outside of boundaries

  }, {
    key: "clipShapes",
    value: function clipShapes(shapes) {
      var _this = this;

      shapes = shapes.filter(function (s) {
        var _s$extent = s.extent(),
            x = _s$extent.x,
            y = _s$extent.y; //clip according to x-axis


        if (_this.x._clip) {
          if (x.min > _this.x.max || x.max < _this.x.min) {
            return false;
          }
        }

        if (_this.y._clip) {
          if (y.min > _this.y.max || y.max < _this.y.min) {
            return false;
          }
        }

        return true;
      });
      return shapes;
    }
  }, {
    key: "clip",
    value: function clip() {
      this.x.clip();
      this.y.clip();
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.html;
      var shapes = this.shapes.sort(function (a, b) {
        return a._order > b._order ? 1 : -1;
      }); //remove shapes outside of max/mins

      shapes = this.clipShapes(shapes);
      var elements = [];

      if (this.xAxis) {
        elements.push(this.xAxis.build());
      }

      if (this.yAxis) {
        elements.push(this.yAxis.build());
      }

      elements = elements.concat(shapes.map(function (shape) {
        return shape.build();
      }));
      var attrs = {
        width: this.width,
        height: this.height,
        viewBox: "0,0,".concat(this.width, ",").concat(this.height),
        preserveAspectRatio: 'xMidYMid meet',
        style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;

      };
      return h(_templateObject(), attrs, elements);
    }
  }]);

  return World;
}();

Object.keys(methods).forEach(function (k) {
  World.prototype[k] = methods[k];
});
var aliases = {
  plusminus: 'plusMinus'
};
Object.keys(aliases).forEach(function (k) {
  World.prototype[k] = methods[aliases[k]];
});
module.exports = World;

},{"./axis/XAxis":15,"./axis/YAxis":16,"./methods":21,"./scales/Scale":23,"./scales/YScale":24,"./shapes/Annotation":26,"./shapes/Area":27,"./shapes/Arrow":28,"./shapes/Bar":29,"./shapes/Dot":30,"./shapes/Image":31,"./shapes/Line":32,"./shapes/MidArea":33,"./shapes/Rect":34,"./shapes/Shape":35,"./shapes/Text":36,"fit-aspect-ratio":3,"htm":4,"vhtml":10}],13:[function(_dereq_,module,exports){
"use strict";

var extent = function extent(arr) {
  var min = null;
  var max = null;
  arr.forEach(function (a) {
    if (min === null || a < min) {
      min = a;
    }

    if (max === null || a > max) {
      max = a;
    }
  });
  return {
    min: min,
    max: max
  };
};
/* eslint no-bitwise: 0 */
//may need to change when the term really-transforms? not sure.


var uid = function uid(str) {
  var nums = '';

  for (var i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10);
  }

  return str + '-' + nums;
};

module.exports = {
  extent: extent,
  uid: uid
};

},{}],14:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var colors = _dereq_('spencer-color');

var _ticks = _dereq_('./_ticks');

var drawTick = _dereq_('./_custom');

var defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
};

var Axis =
/*#__PURE__*/
function () {
  function Axis() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Axis);

    this.world = world;
    this.attrs = Object.assign({}, defaults, obj);
    this.scale = null;
    this._tickCount = 6;
    this._fmt = undefined;
    this._given = undefined;
    this._show = true;
  }

  _createClass(Axis, [{
    key: "color",
    value: function color(_color) {
      this.attrs.stroke = colors[_color] || _color;
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      this._show = false;
      return this;
    }
  }, {
    key: "format",
    value: function format(str) {
      this._fmt = str;
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      this._show = true;
      return this;
    }
  }, {
    key: "ticks",
    value: function ticks(n) {
      var _this = this;

      if (typeof n === 'number') {
        this._tickCount = n;
      } else if (_typeof(n) === 'object') {
        this._given = n;
      }

      if (this._given) {
        return this._given.map(function (o) {
          return drawTick(o, _this);
        });
      }

      if (this.scale.format() === 'date') {
        return _ticks.date(this, this._tickCount);
      }

      return _ticks.generic(this, this._tickCount);
    }
  }]);

  return Axis;
}();

module.exports = Axis;

},{"./_custom":17,"./_ticks":19,"spencer-color":9}],15:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g>\n      ", "\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" ...", " stroke=\"#d7d5d2\"/>\n    </g>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<text x=\"", "\" y=\"", "\" fill=\"", "\" text-anchor=\"middle\" style=\"font-size:12px;\">\n        ", "\n      </text>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Axis = _dereq_('./Axis');

var XAxis =
/*#__PURE__*/
function (_Axis) {
  _inherits(XAxis, _Axis);

  function XAxis() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, XAxis);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(XAxis).call(this, obj, world));
    _this.scale = world.x;
    return _this;
  }

  _createClass(XAxis, [{
    key: "drawTicks",
    value: function drawTicks(y) {
      var _this2 = this;

      var h = this.world.html;
      return this.ticks().map(function (o) {
        return h(_templateObject(), o.value * 100 + '%', y + 15, _this2.attrs.stroke, o.label);
      });
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;

      if (this._show === false) {
        return '';
      }

      var attrs = this.attrs;
      var width = this.world.width;
      var y = this.world.height;
      var ticks = this.drawTicks(y);
      return h(_templateObject2(), ticks, 0, y, width, y, attrs);
    }
  }]);

  return XAxis;
}(Axis);

module.exports = XAxis;

},{"./Axis":14}],16:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g>\n      ", "\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" ...", "/>\n    </g>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<text x=\"", "\" y=\"", "\" dy=\"0\" dx=\"-6\" fill=\"", "\" text-anchor=\"end\" style=\"font-size:12px;\">\n        ", "\n      </text>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Axis = _dereq_('./Axis');

var YAxis =
/*#__PURE__*/
function (_Axis) {
  _inherits(YAxis, _Axis);

  function YAxis() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, YAxis);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(YAxis).call(this, obj, world));
    _this.scale = world.y;
    return _this;
  }

  _createClass(YAxis, [{
    key: "drawTicks",
    value: function drawTicks(x) {
      var _this2 = this;

      var h = this.world.html;
      return this.ticks().map(function (o) {
        var percent = o.value * 100;
        percent = 100 - percent;
        return h(_templateObject(), x, percent + '%', _this2.attrs.stroke, o.label);
      });
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;

      if (this._show === false) {
        return '';
      }

      var attrs = this.attrs;
      var height = this.world.height;
      var x = 0;
      var ticks = this.drawTicks(x);
      return h(_templateObject2(), ticks, x, 0, x, height, attrs);
    }
  }]);

  return YAxis;
}(Axis);

module.exports = YAxis;

},{"./Axis":14}],17:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var spacetime = _dereq_('spacetime');

var prettyNum = _dereq_('./_prettyNum');

var drawTick = function drawTick(s, axis) {
  var scale = axis.scale.scale;
  var label = null; //support {label, value} format

  if (_typeof(s) === 'object' && s !== null) {
    label = s.label;
    s = s.value;
  } //support 'june 5th'


  if (typeof s === 'string') {
    s = spacetime(s);
    return {
      num: s.epoch,
      //val
      pos: parseInt(scale(s.epoch), 10),
      //x/y
      label: label || s.format(axis._fmt || '{month} {year}') //text

    };
  } //support '52'


  var num = Number(s);
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: label || prettyNum(num)
  };
};

module.exports = drawTick;

},{"./_prettyNum":18,"spacetime":8}],18:[function(_dereq_,module,exports){
"use strict";

var mil = 1000000;
var tenThou = 10000;
var thou = 1000;

var prettyNum = function prettyNum(num) {
  num = parseFloat(num);

  if (num >= mil) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / mil + 'm';
  }

  if (num >= tenThou) {
    num = parseInt(num / thou, 10) * thou;
    return num / thou + 'k';
  }

  if (num >= thou) {
    num = parseInt(num / 100, 10) * 100;
    return num / thou + 'k';
  }

  return num.toLocaleString();
};

module.exports = prettyNum;

},{}],19:[function(_dereq_,module,exports){
"use strict";

var spacetimeTicks = _dereq_('spacetime-ticks');

var prettyNum = _dereq_('./_prettyNum');

var generic = function generic(axis) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  n = n === 0 ? 0 : n - 1;
  var scale = axis.scale;
  var total = (scale.max || 0) - (scale.min || 0);

  if (total === 0) {
    total = 10;
    scale.max = 10;
    scale.min = 0;
  }

  var ticks = [];

  for (var i = 0; i <= n; i += 1) {
    var dec = i / n;
    var num = dec * total + (scale.min || 0);
    var tmp = num - (scale.min || 0);
    var percent = tmp / total;
    ticks.push({
      value: percent,
      pos: scale.scale(num),
      label: prettyNum(num)
    });
  }

  return ticks;
};

var date = function date(axis) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var scale = axis.scale;
  var start = scale.min || 0;
  var end = scale.max || 0;
  var ticks = spacetimeTicks(start, end, n);
  return ticks;
};

module.exports = {
  generic: generic,
  date: date
};

},{"./_prettyNum":18,"spacetime-ticks":6}],20:[function(_dereq_,module,exports){
"use strict";

var World = _dereq_('./World');

var pkg = _dereq_('../package.json'); //


var somehow = function somehow(obj) {
  return new World(obj);
};

somehow.version = pkg.version;
module.exports = somehow;

},{"../package.json":11,"./World":12}],21:[function(_dereq_,module,exports){
"use strict";

var _require = _dereq_('./parse'),
    parseX = _require.parseX,
    parseY = _require.parseY;

var fns = _dereq_('./_fns');

var has = function has(x) {
  return x !== undefined && x !== null;
};

var methods = {
  //add new minimums
  from: function from(x, y) {
    if (has(x) === true) {
      x = parseX(x, this);
      this.x.min = x;
      this.x.rescale();
    }

    if (has(y) === true) {
      y = parseY(y, this).value;
      this.y.min = y;
      this.y.rescale();
    }

    return this;
  },
  //add new maximums
  to: function to(x, y) {
    if (has(x) === true) {
      x = parseX(x, this).value;
      this.c.max = x;
      this.c.rescale();
    }

    if (has(y) === true) {
      y = parseX(y, this).value;
      this.y.max = y;
      this.y.rescale();
    }

    return this;
  },
  fitX: function fitX(x) {
    var arr = this.shapes.map(function (s) {
      return s.extent();
    });
    var minX = fns.extent(arr.map(function (o) {
      return o.x.min;
    }).filter(function (n) {
      return n !== null;
    })).min || 0;
    var maxX = fns.extent(arr.map(function (o) {
      return o.x.max;
    }).filter(function (n) {
      return n !== null;
    })).max || 0; //keep graphs from 0, if you can...

    this.x.min = minX > 0 ? 0 : minX;
    this.x.max = maxX;

    if (this.x.format() === 'date') {
      this.x.min = minX;
      this.x.max = maxX;
    }

    this.x.rescale();

    if (has(x) === true) {
      x = parseX(x, this).value;

      if (x > this.x.max) {
        this.x.max = x;
      } else if (x < this.x.min) {
        this.x.min = x;
      }

      this.x.rescale();
    }

    return this;
  },
  fitY: function fitY(y) {
    var arr = this.shapes.map(function (s) {
      return s.extent();
    });
    var minY = fns.extent(arr.map(function (o) {
      return o.y.min;
    }).filter(function (n) {
      return n !== null;
    })).min || 0;
    var maxY = fns.extent(arr.map(function (o) {
      return o.y.max;
    }).filter(function (n) {
      return n !== null;
    })).max || 0;
    this.y.min = minY > 0 ? 0 : minY;
    this.y.max = maxY;

    if (this.y.format() === 'date') {
      this.y.min = minY;
      this.y.max = maxY;
    }

    this.y.rescale();

    if (has(y) === true) {
      y = parseY(y, this).value;

      if (y > this.y.max) {
        this.y.max = y;
      } else if (y < this.y.min) {
        this.y.min = y;
      }

      this.y.rescale();
    }

    return this;
  },
  fit: function fit(x, y) {
    this.fitX(x);
    this.fitY(y);
    return this;
  }
};
module.exports = methods;

},{"./_fns":13,"./parse":22}],22:[function(_dereq_,module,exports){
"use strict";

var spacetime = _dereq_('spacetime'); //


var parse = function parse(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      value: str
    };
  } //support pixels


  if (/[0-9]px$/.test(str)) {
    return {
      type: 'pixel',
      value: Number(str.replace(/px/, ''))
    };
  } //support percentages


  if (/[0-9]%$/.test(str)) {
    var _num = Number(str.replace(/%/, ''));

    return {
      type: 'percent',
      value: _num
    };
  } //try a straight-up number


  var num = Number(str);

  if (!isNaN(num)) {
    return {
      type: 'number',
      value: num
    };
  } //try a date


  var s = spacetime(str);

  if (s.isValid()) {
    return {
      type: 'date',
      value: s.epoch
    };
  }

  console.warn('Counldn\'t parse: ' + str);
  return {
    type: 'unknown',
    value: null
  };
};

var parseX = function parseX(str, world) {
  var res = parse(str);

  if (res.type === 'date') {
    world.x.format(res.type);
  }

  return res;
};

var parseY = function parseY(str, world) {
  var res = parse(str);

  if (res.type === 'date') {
    world.y.format(res.type);
  }

  return res;
};

module.exports = {
  parseX: parseX,
  parseY: parseY
};

},{"spacetime":8}],23:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const scaleLinear = require('d3-scale').scaleLinear
var scaleLinear = _dereq_('./_linear');

var _require = _dereq_('../parse'),
    parseX = _require.parseX;

var has = function has(x) {
  return x !== undefined && x !== null;
};

var Scale =
/*#__PURE__*/
function () {
  function Scale(data, world) {
    _classCallCheck(this, Scale);

    this.world = world;
    this.min = 0;
    this.max = 1;
    this.from = 0;
    this.to = world.width;
    this._format = 'number';
    this.parse = parseX;
    this.is_y = false;
    this._clip = false;
    this.rescale();
  }

  _createClass(Scale, [{
    key: "rescale",
    value: function rescale() {
      this.scale = scaleLinear({
        world: [this.from, this.to],
        minmax: [this.min, this.max]
      });
      return this;
    }
  }, {
    key: "fit",
    value: function fit(a, b) {
      if (has(a) === false && has(b) === false) {
        if (this.is_y) {
          this.world.fitY();
        } else {
          this.world.fitX();
        }

        this.rescale();
        return this;
      }

      if (has(a) === true) {
        var num = this.parse(a, this.world).value;
        this.min = num;
      }

      if (has(b) === true) {
        var _num = this.parse(b, this.world).value;
        this.max = _num;
      }

      this.rescale();
      return this;
    }
  }, {
    key: "place",
    value: function place(obj) {
      //from=top
      //to=bottom
      if (obj.type === 'pixel') {
        if (this.is_y) {
          return this.to - obj.value; //flip grid
        }

        return obj.value;
      }

      if (obj.type === 'percent') {
        var num = this.byPercent(obj.value);
        return this.scale(num);
      }

      return this.scale(obj.value);
    }
  }, {
    key: "byPercent",
    value: function byPercent() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      num = num / 100;
      var diff = this.max - this.min;
      return diff * num + this.min;
    }
  }, {
    key: "format",
    value: function format(_format) {
      if (_format === undefined) {
        return this._format;
      }

      this._format = _format;
      return this;
    }
  }, {
    key: "clip",
    value: function clip(bool) {
      if (bool === undefined) {
        bool = true;
      }

      this._clip = bool;
    }
  }]);

  return Scale;
}();

module.exports = Scale;

},{"../parse":22,"./_linear":25}],24:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scale = _dereq_('./Scale');

var scaleLinear = _dereq_('./_linear'); // const scaleLinear = require('d3-scale').scaleLinear


var _require = _dereq_('../parse'),
    parseY = _require.parseY;

var YScale =
/*#__PURE__*/
function (_Scale) {
  _inherits(YScale, _Scale);

  function YScale(data, world) {
    var _this;

    _classCallCheck(this, YScale);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(YScale).call(this, data, world)); //use height instead of width

    _this.to = world.height;
    _this.is_y = true;
    _this.parse = parseY;

    _this.rescale();

    return _this;
  }

  _createClass(YScale, [{
    key: "rescale",
    value: function rescale() {
      this.scale = scaleLinear({
        world: [this.from, this.to],
        minmax: [this.max, this.min]
      });
    }
  }]);

  return YScale;
}(Scale);

module.exports = YScale;

},{"../parse":22,"./Scale":23,"./_linear":25}],25:[function(_dereq_,module,exports){
"use strict";

//a very-tiny version of d3-scale's scaleLinear
var scaleLinear = function scaleLinear(obj) {
  var world = obj.world || [];
  var minmax = obj.minmax || [];

  var calc = function calc(num) {
    var range = minmax[1] - minmax[0];
    var percent = (num - minmax[0]) / range;
    var size = world[1] - world[0];
    return parseInt(size * percent, 10);
  };

  return calc;
};

module.exports = scaleLinear; // let scale = scaleLinear({
//   world: [0, 300],
//   minmax: [0, 100]
// })
// console.log(scale(107))

},{}],26:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["<g id=\"build\">\n      ", "\n      ", "\n      ", "\n    </g>"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["<line id=\"line\" x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"stroke-width:2px; shapeRendering:optimizeQuality;\" stroke=", "/>"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["<g>\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"", "\" stroke=", "/>\n      ", "\n    </g>"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["<g>\n        <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"", "\" stroke=", "/>\n        <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"", "\" stroke=", "/>\n      </g>\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["<g>\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"", "\" stroke=", "/>\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"", "\" stroke=", "/>\n    </g>\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g transform=\"", "\" style=\"", "\">\n      <text ...", ">\n        ", "\n      </text>\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" style=\"stroke-width:1.5px; shapeRendering:optimizeQuality;\"  stroke=", "/>\n    </g>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<tspan x=\"0\" dy=\"1.2em\">", "</tspan>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var Text = _dereq_('./Text');

var defaults = {
  'text-anchor': "start"
};

var Annotation =
/*#__PURE__*/
function (_Text) {
  _inherits(Annotation, _Text);

  function Annotation() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Annotation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Annotation).call(this, obj, world));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._nudge = {
      x: 0,
      y: 0
    };
    _this._title = '';
    return _this;
  }

  _createClass(Annotation, [{
    key: "on",
    value: function on(x, y) {
      this.at(x, y);
      return this;
    }
  }, {
    key: "title",
    value: function title(txt) {
      this._title = txt;
      return this;
    }
  }, {
    key: "nudge",
    value: function nudge(x, y) {
      //always in pixels
      this._nudge.x = x;
      this._nudge.y = y;
      return this;
    }
  }, {
    key: "drawText",
    value: function drawText() {
      var h = this.world.html;
      var nudge = this._nudge;
      var textArr = this.textLines;

      if (this.textFn !== null) {
        textArr = this.textFn(this.world);
        textArr = typeof textArr === 'string' ? [textArr] : textArr;
      }

      var inside = textArr.map(function (str) {
        return h(_templateObject(), String(str));
      });
      var point = this.position();
      var estimate = this.estimate();
      var place = {
        x: point.x + nudge.x,
        y: point.y - nudge.y //- estimate.height,

      };
      var transform = "translate(".concat(place.x, " ").concat(place.y, ")");
      return h(_templateObject2(), transform, this.drawSyle(), this.attrs, inside, -2, estimate.height, estimate.width, estimate.height, colors.grey);
    }
  }, {
    key: "drawRange",
    value: function drawRange() {
      var h = this.world.html;
      var points = this.points();

      if (points.length <= 1) {
        return null;
      }

      var size = 4;
      var style = 'stroke-width:2px; shapeRendering:optimizeQuality;';
      var top = points[0];
      var bottom = points[1]; //for a vertical range...

      var ticks = h(_templateObject3(), top[0] - size, top[1], top[0] + size, top[1], style, colors.grey, bottom[0] - size, bottom[1], bottom[0] + size, bottom[1], style, colors.grey); //for a horizontal range

      if (top[0] !== bottom[0]) {
        ticks = h(_templateObject4(), top[0], top[1] - size, top[0], top[1] + size, style, colors.grey, bottom[0], bottom[1] - size, bottom[0], bottom[1] + size, style, colors.grey);
      }

      return h(_templateObject5(), top[0], top[1], bottom[0], bottom[1], style, colors.grey, ticks);
    }
  }, {
    key: "getPoint",
    value: function getPoint() {
      var points = this.points();

      if (points.length <= 1) {
        return points[0];
      } //the middle point?


      var xDiff = points[0][0] - points[1][0];
      var yDiff = points[0][1] - points[1][1];
      return [points[0][0] - xDiff / 2, points[0][1] - yDiff / 2];
    }
  }, {
    key: "drawLine",
    value: function drawLine() {
      var h = this.world.html;
      var nudge = this._nudge;
      var point = this.getPoint();
      var start = this.points()[0];
      var textPoint = {
        x: start[0] + nudge.x,
        y: start[1] - nudge.y + 4 //touch the right side, instead

      };

      if (nudge.x < 0) {
        var estimate = this.estimate();
        textPoint.x += estimate.width;
      }

      return h(_templateObject6(), textPoint.x, textPoint.y, point[0], point[1], colors.grey);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      return h(_templateObject7(), this.drawText(), this.drawLine(), this.drawRange());
    }
  }]);

  return Annotation;
}(Text);

module.exports = Annotation;

},{"./Text":36,"spencer-color":9}],27:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\">\n        <title>", "</title>\n      </path>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\"/>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var Shape = _dereq_('./Shape');

var d3Shape = _dereq_('d3-shape');

var _require = _dereq_('../parse'),
    parseY = _require.parseY;

var defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': .25,
  'stroke-width': 2
};

var Area =
/*#__PURE__*/
function (_Shape) {
  _inherits(Area, _Shape);

  function Area() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Area);

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Area).call(this, obj, world));
    _this._line = 2;
    return _this;
  }

  _createClass(Area, [{
    key: "color",
    value: function color(_color) {
      this.attrs.stroke = colors[_color] || _color;
      this.attrs.fill = colors[_color] || _color;
      return this;
    }
  }, {
    key: "line",
    value: function line(num) {
      this._line = num;
    }
  }, {
    key: "areaPath",
    value: function areaPath() {
      var points = this.points(); //support non-zero bottom

      if (points[0] && points[0].length === 3) {
        return d3Shape.area().x(function (d) {
          return d[0];
        }).y(function (d) {
          return d[1];
        }).y1(function (d) {
          return d[2];
        }).curve(this.curve)(points);
      }

      var zero = this.world.y.place(parseY(0));
      return d3Shape.area().x0(function (d) {
        return d[0];
      }).y0(function (d) {
        return d[1];
      }).y1(zero).curve(this.curve)(points);
    }
  }, {
    key: "linePath",
    value: function linePath() {
      var points = this.points(); //support non-zero bottom

      if (points[0] && points[0].length === 3) {
        return d3Shape.area().x(function (d) {
          return d[0];
        }).y(function (d) {
          return d[1];
        }).y1(function (d) {
          return d[2];
        }).curve(this.curve)(points);
      }

      return d3Shape.area().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(this.curve)(points);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var areaAttr = Object.assign({}, this.attrs, {
        d: this.areaPath(),
        stroke: 'none'
      }); //draw an area, and a line on top

      var area = h(_templateObject(), areaAttr, this.drawSyle());

      if (!this._line) {
        return area;
      } //draw a line on top


      var lineAttr = Object.assign({}, this.attrs, {
        d: this.linePath(),
        fill: 'none'
      });
      var line = h(_templateObject2(), lineAttr, this.drawSyle(), this._title);
      return [line, area];
    }
  }]);

  return Area;
}(Shape);

module.exports = Area;

},{"../parse":22,"./Shape":35,"d3-shape":2,"spencer-color":9}],28:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g>\n      <line x1=", " y1=", " x2=", " y2=", " ...", "/>\n      ", "\n    </g>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<g>\n      <line x1=", " y1=", " x2=", " y2=", " ...", "/>\n      <line x1=", " y1=", " x2=", " y2=", " ...", "/>\n    </g>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var d3Shape = _dereq_('d3-shape');

var Shape = _dereq_('./Shape');

var defaults = {
  fill: 'none',
  stroke: colors.grey,
  'stroke-width': 3,
  'stroke-linecap': 'round',
  'shape-rendering': 'optimizeQuality'
};

var Arrow =
/*#__PURE__*/
function (_Shape) {
  _inherits(Arrow, _Shape);

  function Arrow() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Arrow);

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Arrow).call(this, obj, world));
    _this._length = 35;
    return _this;
  }

  _createClass(Arrow, [{
    key: "color",
    value: function color(_color) {
      this.attrs.stroke = colors[_color] || _color;
      return this;
    }
  }, {
    key: "from",
    value: function from(x, y) {
      this.set([this._data[0], [x, y]]);
    }
  }, {
    key: "length",
    value: function length(num) {
      this._length = num;
      return this;
    }
  }, {
    key: "width",
    value: function width(num) {
      this.attrs['stroke-width'] = num;
      return this;
    }
  }, {
    key: "path",
    value: function path() {
      var points = this.points();
      return d3Shape.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(this.curve)(points);
    }
  }, {
    key: "getLength",
    value: function getLength(start, end) {
      var x = start[0] - end[0];
      var y = start[1] - end[1];
      var h = Math.pow(x, 2) + Math.pow(y, 2); //x^2 + y^2 = h^2

      h = Math.sqrt(h);
      return h;
    }
  }, {
    key: "getAngle",
    value: function getAngle(start, end) {
      var p1 = {
        x: start[0],
        y: start[1]
      };
      var p2 = {
        x: end[0],
        y: end[1]
      };
      var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      return angleRadians;
    }
  }, {
    key: "head",
    value: function head(start, end) {
      var h = this.world.html;
      var radian = this.getAngle(start, end);
      var leftAngle = radian - Math.PI / 4;
      var rightAngle = radian + Math.PI / 4;
      var length = this.getLength(start, end);
      length = length * 0.2; //---soh cah toa--

      var left = {
        opp: Math.sin(leftAngle) * length,
        adj: Math.cos(leftAngle) * length
      };
      var right = {
        opp: Math.sin(rightAngle) * length,
        adj: Math.cos(rightAngle) * length
      };
      return h(_templateObject(), start[0], start[1], start[0] + left.adj, start[1] + left.opp, this.attrs, start[0], start[1], start[0] + right.adj, start[1] + right.opp, this.attrs);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var points = this.points();
      var start = points[0];
      var end = points[1];

      if (!end) {
        end = [start[0] - this._length, start[1]];
      }

      return h(_templateObject2(), start[0], start[1], end[0], end[1], this.attrs, this.head(start, end));
    }
  }]);

  return Arrow;
}(Shape);

module.exports = Arrow;

},{"./Shape":35,"d3-shape":2,"spencer-color":9}],29:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<rect ...", " >\n        <title>", "</title>\n      </rect>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var Rect = _dereq_('./Rect');

var _require = _dereq_('../parse'),
    parseX = _require.parseX,
    parseY = _require.parseY;

var defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 1,
  'stroke-width': 1
};

var Bar =
/*#__PURE__*/
function (_Rect) {
  _inherits(Bar, _Rect);

  function Bar(obj, world) {
    var _this;

    _classCallCheck(this, Bar);

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bar).call(this, obj, world));
    _this._rounded = 1;
    _this._width = 5;
    _this._zero = 0;
    return _this;
  }

  _createClass(Bar, [{
    key: "width",
    value: function width(w) {
      this._width = w;
      return this;
    } //point that it flips on

  }, {
    key: "zero",
    value: function zero(w) {
      this._zero = w;
      return this;
    }
  }, {
    key: "at",
    value: function at(x, y) {
      this.data = [{
        x: parseX(x, this.world),
        y: parseY(0, this.world)
      }, {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      }];
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var points = this.points();
      var bottom = points[0][1];

      if (points[0][1] > points[1][1]) {
        bottom = points[1][1];
      }

      var height = Math.abs(points[1][1] - points[0][1]);
      var attrs = Object.assign({}, this.attrs, {
        x: points[0][0],
        y: bottom,
        width: this._width,
        height: height,
        rx: this._rounded,
        title: this._title
      });
      return h(_templateObject(), attrs, this._title);
    }
  }]);

  return Bar;
}(Rect);

module.exports = Bar;

},{"../parse":22,"./Rect":34,"spencer-color":9}],30:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<circle ...", " ><title>", "</title></circle>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var Shape = _dereq_('./Shape');

var defaults = {
  fill: colors.blue,
  stroke: 'none'
};

var Dot =
/*#__PURE__*/
function (_Shape) {
  _inherits(Dot, _Shape);

  function Dot() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Dot);

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dot).call(this, obj, world));
    _this._radius = obj.radius || 5;
    return _this;
  }

  _createClass(Dot, [{
    key: "radius",
    value: function radius(r) {
      this._radius = r;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var point = this.points()[0];
      var attrs = Object.assign({}, this.attrs, {
        id: this._id,
        cx: point[0],
        cy: point[1],
        r: this._radius
      });
      return h(_templateObject(), attrs, this._title);
    }
  }]);

  return Dot;
}(Shape);

module.exports = Dot;

},{"./Shape":35,"spencer-color":9}],31:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g>\n      <image xlink:href=\"", "\" x=\"", "\" y=\"", "\" height=\"", "\" width=\"", "\" />\n      ", "\n    </g>\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<text x=\"", "\" y=\"", "\" stroke=\"none\" fill=\"", "\">", "</text>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Shape = _dereq_('./Shape');

var colors = _dereq_('spencer-color').colors;

var Image =
/*#__PURE__*/
function (_Shape) {
  _inherits(Image, _Shape);

  function Image(obj, world) {
    var _this;

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, obj, world));
    _this._src = '';
    _this._width = 100;
    _this._height = 200;
    _this._caption = '';
    return _this;
  }

  _createClass(Image, [{
    key: "src",
    value: function src(_src) {
      this._src = _src;
      return this;
    }
  }, {
    key: "caption",
    value: function caption(txt) {
      this._caption = txt;
      return this;
    }
  }, {
    key: "size",
    value: function size(w, h) {
      this._width = w;
      this._height = h;
      return this;
    }
  }, {
    key: "width",
    value: function width(w) {
      this._width = w;
      return this;
    }
  }, {
    key: "height",
    value: function height(h) {
      this._height = h;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var point = this.points()[0];

      if (!point) {
        point = [0, 0];
      }

      var caption = '';

      if (this._caption) {
        var y = point[1] + this._height + 15;
        caption = h(_templateObject(), point[0], y, colors.grey, this._caption);
      }

      return h(_templateObject2(), this._src, point[0], point[1], this._width, this._height, caption); //preserveAspectRatio="slice"
    }
  }]);

  return Image;
}(Shape);

module.exports = Image;

},{"./Shape":35,"spencer-color":9}],32:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var d3Shape = _dereq_('d3-shape');

var Shape = _dereq_('./Shape');

var defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
};

var Line =
/*#__PURE__*/
function (_Shape) {
  _inherits(Line, _Shape);

  function Line() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Line);

    obj = Object.assign({}, defaults, obj);
    return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, obj, world));
  }

  _createClass(Line, [{
    key: "color",
    value: function color(_color) {
      this.attrs.stroke = colors[_color] || _color;
      return this;
    }
  }, {
    key: "dotted",
    value: function dotted(n) {
      if (n === true) {
        n = 4;
      }

      this.attrs['stroke-dasharray'] = n || 4;
      return this;
    }
  }, {
    key: "width",
    value: function width(num) {
      this.attrs['stroke-width'] = num;
      return this;
    }
  }, {
    key: "path",
    value: function path() {
      var points = this.points();
      return d3Shape.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(this.curve)(points);
    }
  }]);

  return Line;
}(Shape);

module.exports = Line;

},{"./Shape":35,"d3-shape":2,"spencer-color":9}],33:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\"/>"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\"/>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\">\n      <title>", "</title>\n    </path>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Area = _dereq_('./Area');

var _require = _dereq_('../parse'),
    parseY = _require.parseY;

var parseInput = _dereq_('./lib/parseInput');

var d3Shape = _dereq_('d3-shape');

var Midarea =
/*#__PURE__*/
function (_Area) {
  _inherits(Midarea, _Area);

  function Midarea(obj, world) {
    var _this;

    _classCallCheck(this, Midarea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Midarea).call(this, obj, world));
    _this._zero = _this.world.y.place(parseY(0));
    return _this;
  }

  _createClass(Midarea, [{
    key: "zero",
    value: function zero(y) {
      this._zero = y;
    }
  }, {
    key: "set",
    value: function set(str) {
      this.data = parseInput(str, this.world); //add the bottom part, to data

      this.data.forEach(function (o) {
        o.y.value /= 2;
        o.y2 = Object.assign({}, o.y);
        o.y2.value *= -1;
      });
      return this;
    }
  }, {
    key: "topLine",
    value: function topLine(points) {
      return d3Shape.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(this.curve)(points);
    }
  }, {
    key: "bottomLine",
    value: function bottomLine(points) {
      return d3Shape.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[2];
      }).curve(this.curve)(points);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var areaAttr = Object.assign({}, this.attrs, {
        d: this.areaPath(),
        stroke: 'none'
      }); //draw an area, and a line on top

      var area = h(_templateObject(), areaAttr, this.drawSyle(), this._title);

      if (!this._line) {
        return area;
      }

      var points = this.points(); //draw a line on top

      var topLine = Object.assign({}, this.attrs, {
        d: this.topLine(points),
        fill: 'none'
      });
      topLine = h(_templateObject2(), topLine, this.drawSyle()); //draw a line on the bottom

      var bottomLine = Object.assign({}, this.attrs, {
        d: this.bottomLine(points),
        fill: 'none'
      });
      bottomLine = h(_templateObject3(), bottomLine, this.drawSyle());
      return [topLine, area, bottomLine];
    }
  }]);

  return Midarea;
}(Area);

module.exports = Midarea;

},{"../parse":22,"./Area":27,"./lib/parseInput":37,"d3-shape":2}],34:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<rect ...", " >\n      <title>", "</title>\n    </rect>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var colors = _dereq_('spencer-color').colors;

var Shape = _dereq_('./Shape');

var defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': .25,
  'stroke-width': 1
};

var Rect =
/*#__PURE__*/
function (_Shape) {
  _inherits(Rect, _Shape);

  function Rect() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Rect);

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, obj, world));
    _this._rounded = 3;
    _this._width = undefined;
    _this._height = undefined;
    return _this;
  }

  _createClass(Rect, [{
    key: "color",
    value: function color(_color) {
      this.attrs.stroke = colors[_color] || _color;
      this.attrs.fill = colors[_color] || _color;
      return this;
    }
  }, {
    key: "width",
    value: function width(n) {
      this._width = n;
      return this;
    }
  }, {
    key: "height",
    value: function height(n) {
      this._height = n;
      return this;
    }
  }, {
    key: "rounded",
    value: function rounded(r) {
      this._rounded = r;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var points = this.points();
      var a = points[0];
      var b = points[1] || 0;
      var width = Math.abs(b[0] - a[0]);
      var height = Math.abs(b[1] - a[1]);

      if (this._width !== undefined) {
        width = this._width;
      }

      if (this._height !== undefined) {
        height = this._height;
      }

      var attrs = Object.assign({}, this.attrs, {
        x: a[0],
        y: a[1] - height,
        width: width,
        height: height,
        rx: this._rounded
      });
      return h(_templateObject(), attrs, this._title); //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
    }
  }]);

  return Rect;
}(Shape);

module.exports = Rect;

},{"./Shape":35,"spencer-color":9}],35:[function(_dereq_,module,exports){
"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["<path ...", " id=", " style=\"", "\"/>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var d3Shape = _dereq_('d3-shape');

var colors = _dereq_('spencer-color').colors;

var fns = _dereq_('../_fns');

var parseInput = _dereq_('./lib/parseInput');

var _require = _dereq_('../parse'),
    parseX = _require.parseX,
    parseY = _require.parseY;

var defaults = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality'
};

var Shape =
/*#__PURE__*/
function () {
  function Shape() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Shape);

    this.world = world;
    this.data = obj.data || [];
    this._id = obj.id || fns.uid('input');
    this.attrs = Object.assign({}, defaults, obj);
    this.style = {};
    this.curve = d3Shape.curveMonotoneX;
    this._shape = 1;
    this._title = '';
    this._click = obj.click;
    this._hover = obj.hover;
  }

  _createClass(Shape, [{
    key: "straight",
    value: function straight() {
      this.curve = d3Shape.curveLinear;
      return this;
    }
  }, {
    key: "id",
    value: function id(str) {
      this._id = str;
      return this;
    }
  }, {
    key: "soft",
    value: function soft() {
      this.curve = d3Shape.curveBasis;
      return this;
    }
  }, {
    key: "at",
    value: function at(x, y) {
      if ((x || x === 0) && (y || y === 0)) {
        this.set([[x, y]]);
        return this;
      } //vertical line


      if (x || x === 0) {
        this.set([[x, '0%'], [x, '100%']]);
        return this;
      } //horizontal line


      if (y || y === 0) {
        this.set([['0%', y], ['100%', y]]);
      }

      return this;
    }
  }, {
    key: "extent",
    value: function extent() {
      var xArr = [];
      var yArr = [];
      this.data.forEach(function (o) {
        if (o.x.type !== 'pixel') {
          xArr.push(o.x.value);
        }

        if (o.y.type !== 'pixel') {
          yArr.push(o.y.value);
        }

        if (o.y2 && o.y2.type !== 'pixel') {
          yArr.push(o.y2.value);
        }
      });
      return {
        x: fns.extent(xArr),
        y: fns.extent(yArr)
      };
    }
  }, {
    key: "color",
    value: function color(_color) {
      this.attrs.fill = colors[_color] || _color;
      return this;
    }
  }, {
    key: "opacity",
    value: function opacity(n) {
      this.attrs.opacity = n;
      return this;
    }
  }, {
    key: "title",
    value: function title(str) {
      this._title = str;
      return this;
    }
  }, {
    key: "set",
    value: function set(str) {
      this.data = parseInput(str, this.world);
      return this;
    }
  }, {
    key: "from",
    value: function from(x, y) {
      this.data[0] = {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      };
      return this;
    }
  }, {
    key: "to",
    value: function to(x, y) {
      this.data[1] = {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      };
      return this;
    } //set any listeners on the dom element

  }, {
    key: "onMount",
    value: function onMount() {
      var _this = this;

      if (!this._click && !this._hover) {
        return;
      } //wait for mount


      setTimeout(function () {
        var el = document.getElementById(_this._id);

        if (!el) {
          return;
        }

        if (_this._click) {
          el.addEventListener('click', function () {
            _this._click(_this);
          });
        }

        if (_this._hover) {
          console.log('setting');
          el.addEventListener('mouseenter', function () {
            console.log('hover');

            _this._hover(_this);
          });
        }
      }, 50);
    }
  }, {
    key: "click",
    value: function click(fn) {
      this._click = fn;
    }
  }, {
    key: "hover",
    value: function hover(fn) {
      this._hover = fn;
    } //x,y coordinates

  }, {
    key: "points",
    value: function points() {
      var _this$world = this.world,
          x = _this$world.x,
          y = _this$world.y;
      var points = this.data.map(function (o) {
        var arr = [x.place(o.x), y.place(o.y)];

        if (o.y2 !== undefined) {
          arr.push(y.place(o.y2));
        }

        return arr;
      });
      return points;
    }
  }, {
    key: "path",
    value: function path() {
      var zero = this.world.y.place(parseY(0));
      var points = this.points();
      return d3Shape.area().x0(function (d) {
        return d[0];
      }).y0(function (d) {
        return d[1];
      }).y1(zero).curve(d3Shape.curveMonotoneX)(points);
    }
  }, {
    key: "drawSyle",
    value: function drawSyle() {
      var _this2 = this;

      return Object.keys(this.style).map(function (k) {
        return "".concat(k, ":").concat(_this2.style[k], ";");
      }).join(' ');
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var attrs = Object.assign({}, this.attrs, {
        d: this.path()
      });
      return h(_templateObject(), attrs, this._id, this.drawSyle());
    }
  }]);

  return Shape;
}();

module.exports = Shape;

},{"../_fns":13,"../parse":22,"./lib/parseInput":37,"d3-shape":2,"spencer-color":9}],36:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g transform=\"", "\" style=\"", "\">\n      <text ...", ">\n        ", "\n      </text>\n    </g>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<tspan x=\"0\" dy=\"1.2em\">", "</tspan>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Shape = _dereq_('./Shape');

var colors = _dereq_('spencer-color').colors;

var defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round'
};

var Text =
/*#__PURE__*/
function (_Shape) {
  _inherits(Text, _Shape);

  function Text() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Text);

    var text = null;
    var textFn = null;

    if (typeof obj === 'string') {
      text = [obj];
      obj = {};
    } else if (typeof obj === 'function') {
      textFn = obj;
      obj = {};
    } else if (Array.isArray(obj)) {
      text = obj;
      obj = [];
    }

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, obj, world));
    _this.textLines = text || obj.text || [];
    _this.textFn = textFn;

    if (typeof _this.textLines === 'string') {
      _this.textLines = [_this.textLines];
    }

    _this._order = 0;
    _this.data = [{
      x: {
        value: 50,
        type: 'percent'
      },
      y: {
        value: 50,
        type: 'percent'
      }
    }];
    _this._dodge = {
      x: 0,
      y: 4
    };
    _this._underline = '';
    return _this;
  }

  _createClass(Text, [{
    key: "before",
    value: function before(x, y) {
      this.attrs['text-anchor'] = "end";
      this.set([[x, y]]);
      return this;
    }
  }, {
    key: "after",
    value: function after(x, y) {
      this.attrs['text-anchor'] = "start";
      this.set([[x, y]]);
      return this;
    }
  }, {
    key: "center",
    value: function center(x, y) {
      this.attrs['text-anchor'] = "middle";
      this.set([[x, y]]);
      return this;
    }
  }, {
    key: "color",
    value: function color(_color) {
      this.attrs.fill = colors[_color] || _color;
      return this;
    }
  }, {
    key: "dy",
    value: function dy() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this._dodge.y = n * -1;
      return this;
    }
  }, {
    key: "dx",
    value: function dx() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this._dodge.x = n;
      return this;
    }
  }, {
    key: "dodge",
    value: function dodge(x, y) {
      x = x || this._dodge.x;
      y = y || this._dodge.y;
      this._dodge.x = x * -1;
      this._dodge.y = y * -1;
      return this;
    }
  }, {
    key: "font",
    value: function font(num) {
      if (typeof num === 'number') {
        num += 'px';
      }

      this.style['font-size'] = num;
      return this;
    }
  }, {
    key: "size",
    value: function size(num) {
      return this.font(num);
    }
  }, {
    key: "extent",
    value: function extent() {
      // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
      // let width = longest.length * 8
      // let height = this.textLines.length * 20
      var d = this.data[0] || {};
      return {
        x: {
          min: d.x,
          max: d.x
        },
        y: {
          min: d.y,
          // - height,
          max: d.y
        }
      };
    }
  }, {
    key: "text",
    value: function text(_text) {
      if (typeof _text === 'string') {
        this.textLines = [_text];
      } else if (typeof _text === 'function') {
        this.textLines = [];
        this.textFn = _text;
      } else {
        this.textLines = _text;
      }

      return this;
    }
  }, {
    key: "path",
    value: function path() {
      return '';
    }
  }, {
    key: "estimate",
    value: function estimate() {
      var textArr = this.textLines;

      if (this.textFn !== null) {
        textArr = this.textFn(this.world);
        textArr = typeof textArr === 'string' ? [textArr] : textArr;
      } //calculate height


      var height = 24;

      if (this.style['font-size']) {
        var num = this.style['font-size'].replace('px', '');
        num = Number(num);
        height = num * 1.5;
      }

      height *= textArr.length; //calculate width

      var width = 0;
      textArr.forEach(function (str) {
        var w = str.length * 8;

        if (w > width) {
          width = w;
        }
      });
      return {
        height: height,
        width: width
      };
    }
  }, {
    key: "position",
    value: function position() {
      var point = this.points()[0];
      var res = {
        x: 0,
        y: 0
      };

      if (!point) {
        return res;
      }

      var _this$estimate = this.estimate(),
          height = _this$estimate.height,
          width = _this$estimate.width;

      res.height = height;
      res.width = width;
      res.y = point[1] + this._dodge.y - height;
      res.x = point[0] + 2 + this._dodge.x;
      return res;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      this.onMount();
      var textArr = this.textLines;

      if (this.textFn !== null) {
        textArr = this.textFn(this.world);
        textArr = typeof textArr === 'string' ? [textArr] : textArr;
      }

      var inside = textArr.map(function (str) {
        return h(_templateObject(), String(str));
      });

      var _this$position = this.position(),
          x = _this$position.x,
          y = _this$position.y;

      var transform = "translate(".concat(x, " ").concat(y, ")");
      return h(_templateObject2(), transform, this.drawSyle(), this.attrs, inside);
    }
  }]);

  return Text;
}(Shape);

module.exports = Text;

},{"./Shape":35,"spencer-color":9}],37:[function(_dereq_,module,exports){
"use strict";

var _require = _dereq_('../../parse'),
    parseX = _require.parseX,
    parseY = _require.parseY; //a very-flexible input language


var parseStr = function parseStr() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var lines = str.split(/\n/g);
  lines = lines.filter(function (l) {
    return l;
  });
  lines = lines.map(function (line) {
    var split = line.split(/(,|\t) ?/).map(function (s) {
      return s.trim();
    });
    var x = parseX(split[0], world);
    var y = parseY(split[2], world);
    var obj = {
      x: x,
      y: y //y2 is bottom of an area

    };

    if (split[4] !== undefined) {
      obj.y2 = parseY(split[4], world);
    }

    return obj;
  });
  return lines;
};

var parseInput = function parseInput(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world);
  }

  return set.map(function (a) {
    var x = parseX(a[0], world);
    var y = parseY(a[1], world);
    var obj = {
      x: x,
      y: y //y2 is bottom of an area

    };

    if (a[2] !== undefined) {
      obj.y2 = parseY(a[2], world);
    }

    return obj;
  });
};

module.exports = parseInput;

},{"../../parse":22}]},{},[20])(20)
});
