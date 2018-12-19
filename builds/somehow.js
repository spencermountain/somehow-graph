/* somehow v0.0.5
   github.com/spencermountain/somehow
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehow = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
// https://d3js.org/d3-array/ v1.2.4 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;

function pairs(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
}

function pair(a, b) {
  return [a, b];
}

function cross(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function number(x) {
  return x === null ? NaN : +x;
}

function variance(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
}

function deviation(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
}

function extent(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}

var array = Array.prototype;

var slice = array.slice;
var map = array.map;

function constant(x) {
  return function() {
    return x;
  };
}

function identity(x) {
  return x;
}

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function sturges(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}

function histogram() {
  var value = identity,
      domain = extent,
      threshold = sturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = range(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisectRight(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
}

function quantile(values, p, valueof) {
  if (valueof == null) valueof = number;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function freedmanDiaconis(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}

function scott(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
}

function max(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
}

function mean(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
}

function median(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return quantile(numbers.sort(ascending), 0.5);
}

function merge(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}

function min(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
}

function permute(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
}

function scan(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
}

function shuffle(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}

function sum(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
}

function transpose(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function length(d) {
  return d.length;
}

function zip() {
  return transpose(arguments);
}

exports.bisect = bisectRight;
exports.bisectRight = bisectRight;
exports.bisectLeft = bisectLeft;
exports.ascending = ascending;
exports.bisector = bisector;
exports.cross = cross;
exports.descending = descending;
exports.deviation = deviation;
exports.extent = extent;
exports.histogram = histogram;
exports.thresholdFreedmanDiaconis = freedmanDiaconis;
exports.thresholdScott = scott;
exports.thresholdSturges = sturges;
exports.max = max;
exports.mean = mean;
exports.median = median;
exports.merge = merge;
exports.min = min;
exports.pairs = pairs;
exports.permute = permute;
exports.quantile = quantile;
exports.range = range;
exports.scan = scan;
exports.shuffle = shuffle;
exports.sum = sum;
exports.ticks = ticks;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
exports.transpose = transpose;
exports.variance = variance;
exports.zip = zip;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(_dereq_,module,exports){
// https://d3js.org/d3-collection/ v1.0.7 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

function nest() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map$$1, depth) {
    if (++depth > keys.length) return map$$1;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map$$1.entries();
    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
}

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map();
}

function setMap(map$$1, key, value) {
  map$$1.set(key, value);
}

function Set() {}

var proto = map.prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

function keys(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}

function values(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}

function entries(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
}

exports.nest = nest;
exports.set = set;
exports.map = map;
exports.keys = keys;
exports.values = values;
exports.entries = entries;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],3:[function(_dereq_,module,exports){
// https://d3js.org/d3-color/ v1.2.3 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: function() {
    return this.rgb().hex();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: function() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// https://beta.observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

exports.color = color;
exports.rgb = rgb;
exports.hsl = hsl;
exports.lab = lab;
exports.hcl = hcl;
exports.lch = lch;
exports.gray = gray;
exports.cubehelix = cubehelix;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(_dereq_,module,exports){
// https://d3js.org/d3-format/ v1.3.2 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function formatDecimal(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  this.fill = match[1] || " ";
  this.align = match[2] || ">";
  this.sign = match[3] || "-";
  this.symbol = match[4] || "";
  this.zero = !!match[5];
  this.width = match[6] && +match[6];
  this.comma = !!match[7];
  this.precision = match[8] && +match[8].slice(1);
  this.trim = !!match[9];
  this.type = match[10] || "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (i0 > 0) { if (!+s[i]) break out; i0 = 0; } break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity(x) {
  return x;
}

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  exports.format = locale.format;
  exports.formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

exports.formatDefaultLocale = defaultLocale;
exports.formatLocale = formatLocale;
exports.formatSpecifier = formatSpecifier;
exports.precisionFixed = precisionFixed;
exports.precisionPrefix = precisionPrefix;
exports.precisionRound = precisionRound;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],5:[function(_dereq_,module,exports){
// https://d3js.org/d3-interpolate/ v1.3.2 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-color')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Color) { 'use strict';

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

function basis$1(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function constant(x) {
  return function() {
    return x;
  };
}

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

var rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = d3Color.rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);
var rgbBasisClosed = rgbSpline(basisClosed);

function array(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
}

function number(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function value(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb) : string)
      : b instanceof d3Color.color ? rgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
}

function discrete(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

function hue$1(a, b) {
  var i = hue(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}

function round(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
}

var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
function zoom(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    };
  }

  i.duration = S * 1000;

  return i;
}

function hsl(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hsl$1 = hsl(hue);
var hslLong = hsl(nogamma);

function lab(start, end) {
  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

function hcl(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hcl$1 = hcl(hue);
var hclLong = hcl(nogamma);

function cubehelix(hue$$1) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

var cubehelix$1 = cubehelix(hue);
var cubehelixLong = cubehelix(nogamma);

function piecewise(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

function quantize(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

exports.interpolate = value;
exports.interpolateArray = array;
exports.interpolateBasis = basis$1;
exports.interpolateBasisClosed = basisClosed;
exports.interpolateDate = date;
exports.interpolateDiscrete = discrete;
exports.interpolateHue = hue$1;
exports.interpolateNumber = number;
exports.interpolateObject = object;
exports.interpolateRound = round;
exports.interpolateString = string;
exports.interpolateTransformCss = interpolateTransformCss;
exports.interpolateTransformSvg = interpolateTransformSvg;
exports.interpolateZoom = zoom;
exports.interpolateRgb = rgb;
exports.interpolateRgbBasis = rgbBasis;
exports.interpolateRgbBasisClosed = rgbBasisClosed;
exports.interpolateHsl = hsl$1;
exports.interpolateHslLong = hslLong;
exports.interpolateLab = lab;
exports.interpolateHcl = hcl$1;
exports.interpolateHclLong = hclLong;
exports.interpolateCubehelix = cubehelix$1;
exports.interpolateCubehelixLong = cubehelixLong;
exports.piecewise = piecewise;
exports.quantize = quantize;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-color":3}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
// https://d3js.org/d3-scale/ v2.1.2 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-collection'), _dereq_('d3-array'), _dereq_('d3-interpolate'), _dereq_('d3-format'), _dereq_('d3-time'), _dereq_('d3-time-format')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-collection', 'd3-array', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Collection,d3Array,d3Interpolate,d3Format,d3Time,d3TimeFormat) { 'use strict';

var array = Array.prototype;

var map = array.map;
var slice = array.slice;

var implicit = {name: "implicit"};

function ordinal(range) {
  var index = d3Collection.map(),
      domain = [],
      unknown = implicit;

  range = range == null ? [] : slice.call(range);

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = d3Collection.map();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = d3Array.range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band()
        .domain(domain())
        .range(range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return rescale();
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band().paddingInner(1));
}

function constant(x) {
  return function() {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, deinterpolate, reinterpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = d3Array.bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range = unit,
      interpolate = d3Interpolate.interpolate,
      clamp = false,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map.call(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = slice.call(_), interpolate = d3Interpolate.interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  return rescale();
}

function tickFormat(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = d3Array.tickStep(start, stop, count == null ? 10 : count),
      precision;
  specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
      return d3Format.formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return d3Format.format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return tickFormat(domain(), count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = d3Array.tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = d3Array.tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = d3Array.tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber);

  scale.copy = function() {
    return copy(scale, linear());
  };

  return linearish(scale);
}

function identity() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map.call(_, number), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity().domain(domain);
  };

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : constant(b);
}

function reinterpolate(a, b) {
  return a < 0
      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log() {
  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
      domain = scale.domain,
      base = 10,
      logs = logp(10),
      pows = powp(10);

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = d3Format.format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  scale.copy = function() {
    return copy(scale, log().base(base));
  };

  return scale;
}

function raise(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow() {
  var exponent = 1,
      scale = continuous(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise(b, exponent) - (a = raise(a, exponent)))
        ? function(x) { return (raise(x, exponent) - a) / b; }
        : constant(b);
  }

  function reinterpolate(a, b) {
    b = raise(b, exponent) - (a = raise(a, exponent));
    return function(t) { return raise(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return copy(scale, pow().exponent(exponent));
  };

  return linearish(scale);
}

function sqrt() {
  return pow().exponent(0.5);
}

function quantile() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) return range[d3Array.bisect(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3Array.ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range);
  };

  return scale;
}

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1];

  function scale(x) {
    if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range);
  };

  return linearish(scale);
}

function threshold() {
  var domain = [0.5],
      range = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range);
  };

  return scale;
}

var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number$1(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(d3Array.tickStep(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map.call(_, number$1)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

function time() {
  return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
}

function utcTime() {
  return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
}

function sequential(interpolator) {
  var x0 = 0,
      x1 = 1,
      k10 = 1,
      clamp = false;

  function scale(x) {
    var t = (x - x0) * k10;
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], k10 = x0 === x1 ? 0 : 1 / (x1 - x0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
  };

  return linearish(scale);
}

function diverging(interpolator) {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      k10 = 1,
      k21 = 1,
      clamp = false;

  function scale(x) {
    var t = 0.5 + ((x = +x) - x1) * (x < x1 ? k10 : k21);
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], x2 = +_[2], k10 = x0 === x1 ? 0 : 0.5 / (x1 - x0), k21 = x1 === x2 ? 0 : 0.5 / (x2 - x1), scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return diverging(interpolator).domain([x0, x1, x2]).clamp(clamp);
  };

  return linearish(scale);
}

exports.scaleBand = band;
exports.scalePoint = point;
exports.scaleIdentity = identity;
exports.scaleLinear = linear;
exports.scaleLog = log;
exports.scaleOrdinal = ordinal;
exports.scaleImplicit = implicit;
exports.scalePow = pow;
exports.scaleSqrt = sqrt;
exports.scaleQuantile = quantile;
exports.scaleQuantize = quantize;
exports.scaleThreshold = threshold;
exports.scaleTime = time;
exports.scaleUtc = utcTime;
exports.scaleSequential = sequential;
exports.scaleDiverging = diverging;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-array":1,"d3-collection":2,"d3-format":4,"d3-interpolate":5,"d3-time":10,"d3-time-format":9}],8:[function(_dereq_,module,exports){
// https://d3js.org/d3-shape/ v1.2.2 Copyright 2018 Mike Bostock
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
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
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
            y00 = r0 * sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi) {
          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
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
  if (!((n = series.length) > 1)) return;
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
      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
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
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":6}],9:[function(_dereq_,module,exports){
// https://d3js.org/d3-time-format/ v2.1.3 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-time')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Time) { 'use strict';

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? d3Time.utcMonday.ceil(week) : d3Time.utcMonday(week);
          week = d3Time.utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day = week.getDay();
          week = day > 4 || day === 0 ? d3Time.timeMonday.ceil(week) : d3Time.timeMonday(week);
          week = d3Time.timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
  return pad(d3Time.timeThursday.count(d3Time.timeYear(d), d) + (d3Time.timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
  return pad(d3Time.utcThursday.count(d3Time.utcYear(d), d) + (d3Time.utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  exports.timeFormat = locale.format;
  exports.timeParse = locale.parse;
  exports.utcFormat = locale.utcFormat;
  exports.utcParse = locale.utcParse;
  return locale;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : exports.utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : exports.utcParse(isoSpecifier);

exports.timeFormatDefaultLocale = defaultLocale;
exports.timeFormatLocale = formatLocale;
exports.isoFormat = formatIso;
exports.isoParse = parseIso;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-time":10}],10:[function(_dereq_,module,exports){
// https://d3js.org/d3-time/ v1.0.10 Copyright 2018 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var t0 = new Date,
    t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};
var milliseconds = millisecond.range;

var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond) * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});
var seconds = second.range;

var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute) * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});
var minutes = minute.range;

var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
  if (offset < 0) offset += durationHour;
  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});
var hours = hour.range;

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});
var days = day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
var months = month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var years = year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYears = utcYear.range;

exports.timeInterval = newInterval;
exports.timeMillisecond = millisecond;
exports.timeMilliseconds = milliseconds;
exports.utcMillisecond = millisecond;
exports.utcMilliseconds = milliseconds;
exports.timeSecond = second;
exports.timeSeconds = seconds;
exports.utcSecond = second;
exports.utcSeconds = seconds;
exports.timeMinute = minute;
exports.timeMinutes = minutes;
exports.timeHour = hour;
exports.timeHours = hours;
exports.timeDay = day;
exports.timeDays = days;
exports.timeWeek = sunday;
exports.timeWeeks = sundays;
exports.timeSunday = sunday;
exports.timeSundays = sundays;
exports.timeMonday = monday;
exports.timeMondays = mondays;
exports.timeTuesday = tuesday;
exports.timeTuesdays = tuesdays;
exports.timeWednesday = wednesday;
exports.timeWednesdays = wednesdays;
exports.timeThursday = thursday;
exports.timeThursdays = thursdays;
exports.timeFriday = friday;
exports.timeFridays = fridays;
exports.timeSaturday = saturday;
exports.timeSaturdays = saturdays;
exports.timeMonth = month;
exports.timeMonths = months;
exports.timeYear = year;
exports.timeYears = years;
exports.utcMinute = utcMinute;
exports.utcMinutes = utcMinutes;
exports.utcHour = utcHour;
exports.utcHours = utcHours;
exports.utcDay = utcDay;
exports.utcDays = utcDays;
exports.utcWeek = utcSunday;
exports.utcWeeks = utcSundays;
exports.utcSunday = utcSunday;
exports.utcSundays = utcSundays;
exports.utcMonday = utcMonday;
exports.utcMondays = utcMondays;
exports.utcTuesday = utcTuesday;
exports.utcTuesdays = utcTuesdays;
exports.utcWednesday = utcWednesday;
exports.utcWednesdays = utcWednesdays;
exports.utcThursday = utcThursday;
exports.utcThursdays = utcThursdays;
exports.utcFriday = utcFriday;
exports.utcFridays = utcFridays;
exports.utcSaturday = utcSaturday;
exports.utcSaturdays = utcSaturdays;
exports.utcMonth = utcMonth;
exports.utcMonths = utcMonths;
exports.utcYear = utcYear;
exports.utcYears = utcYears;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],11:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).fitAspect=e()}}(function(){return function a(o,s,d){function c(t,e){if(!s[t]){if(!o[t]){var i="function"==typeof _dereq_&&_dereq_;if(!e&&i)return i(t,!0);if(p)return p(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=s[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,a,o,s,d)}return s[t].exports}for(var p="function"==typeof _dereq_&&_dereq_,e=0;e<d.length;e++)c(d[e]);return c}({1:[function(e,t,i){"use strict";var n=[{names:["square","1:1","instagram"],description:"Square",decimal:1,orientation:"landscape"},{names:["4:3","fullscreen","four three","1.33:1","ipad","pythagorean"],description:"Traditional TVs",decimal:1.333333,orientation:"landscape"},{names:["a4","√2:1","paper","lichtenberg","1:1.41"],description:"A4 paper",decimal:1.41},{names:["imax","1.43:1"],description:"IMAX film",decimal:1.43,orientation:"landscape"},{names:["3:2","35mm","photo","1.5:1","1.5"],description:"35mm photos",decimal:1.5,orientation:"landscape"},{names:["business card","bank card","1.58:1"],description:"Bank Cards",decimal:1.58577,orientation:"landscape"},{names:["golden","kepler","1.618","1.6:1"],description:"Golden ratio",decimal:1.61803,orientation:"landscape"},{names:["16:9","hd","hdtv","fhd","tv","computer","iphone","4k","8k","1.78:1"],description:"HD video",decimal:1.77777,orientation:"landscape"},{names:["widescreen","1.85:1"],description:"Movie-theatres",decimal:1.85,orientation:"landscape"},{names:["2:1","univisium","mobile","18:9"],description:"2:1",decimal:2,orientation:"landscape"},{names:["cinemascope","widescreen","wide","2.35:1","2.39:1"],description:"Widescreen",decimal:2.35,orientation:"landscape"},{names:["silver","1 + √2","2.41:1"],description:"Silver ratio",decimal:2.41,orientation:"landscape"}],r=n.map(function(e){return(e=Object.assign({},e)).decimal=1/e.decimal,e.orientation="portrait",e}),a={};n.forEach(function(t){t.names.forEach(function(e){a[e]=t})}),t.exports={lookup:a,portraits:r,list:n}},{}],2:[function(e,t,i){"use strict";var n=e("./aspects");t.exports=function(e,t){var i=e/t;return(i=parseInt(100*i,10)/100)<1?function(e,t){for(var i=0;i<t.length;i+=1)if(e>t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.portraits):function(e,t){for(var i=0;i<t.length;i+=1)if(e<=t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.list)}},{"./aspects":1}],3:[function(i,n,e){(function(e){"use strict";var f=i("./find-best-ratio"),u=i("./parse-ratio"),t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if("number"==typeof e.width&&"number"==typeof e.height){var t=f(e.width,e.height),i=1/t.decimal,n=e.width*i,r=(n-e.height)/e.height;return r=parseInt(1e3*r,10)/10,n=Math.round(n),{aspect:t,percent_change:r,width:e.width,height:n}}var a=u(e.aspect||e.ratio||"");if(null===a)return console.error("find-aspect-ratio error: Could not find a given aspect ratio."),e;if("number"==typeof e.width){var o=1/a.decimal,s=e.orientation||"landscape";"portrait"===s&&(o=1/o);var d=e.width*o;return d=Math.round(d),{aspect:a,width:e.width,height:d,orientation:s}}if("number"!=typeof e.height)return console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."),e;var c=a.decimal,p=e.orientation||"landscape";"portrait"===p&&(c=1/c);var l=e.height*c;return{aspect:a,width:l=Math.round(l),height:e.height,orientation:p}};"undefined"!=typeof self?self.nlp=t:"undefined"!=typeof window?window.nlp=t:void 0!==e&&(e.nlp=t),void 0!==n&&(n.exports=t)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./find-best-ratio":2,"./parse-ratio":4}],4:[function(e,t,i){"use strict";var n=e("./aspects"),r=/^[0-9\.]+:[0-9\.]+$/;t.exports=function(e){if(e=(e=(e=(e=e.toLowerCase()).trim()).replace(" ratio","")).replace("-"," "),!0===n.lookup.hasOwnProperty(e))return n.lookup[e];if(!0!==r.test(e))return null;var t=e.split(":");return{description:"custom",decimal:parseFloat(t[0])/parseFloat(t[1])}}},{"./aspects":1}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(_dereq_,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.htm=t()}(this,function(){var e={},t=document.createElement("template"),n=/(\$_h\[\d+\])/g;function r(e,t){var r=e.match(n),i=JSON.stringify(e);if(null!=r){if(r[0]===e)return e;i=i.replace(n,'"'+t+"$1"+t+'"').replace(/"[+,]"/g,""),","==t&&(i="["+i+"]")}return i}return function(n){return(e[n]||(e[n]=function(e){for(var n=e[0],i=1;i<e.length;)n+="$_h["+i+"]"+e[i++];return t.innerHTML=n.replace(/<(?:(\/)\/|(\/?)(\$_h\[\d+\]))/g,"<$1$2c c@=$3").replace(/<([\w:-]+)(?:\s[^<>]*?)?(\/?)>/g,function(e,t,n){return e.replace(/(?:'.*?'|".*?"|([A-Z]))/g,function(e,t){return t?":::"+t:e})+(n?"</"+t+">":"")}).trim(),Function("h","$_h","return "+function e(t){if(1!=t.nodeType)return 3==t.nodeType&&t.data?r(t.data,","):"null";for(var n="",i=r(t.localName,n),u="",a=",({",o=0;o<t.attributes.length;o++){var c=t.attributes[o].name,f=t.attributes[o].value;"c@"==c?i=f:"..."==c.substring(0,3)?(u="",a=",Object.assign({",n+="},"+c.substring(3)+",{"):(n+=u+'"'+c.replace(/:::(\w)/g,function(e,t){return t.toUpperCase()})+'":'+(!f||r(f,"+")),u=",")}n="h("+i+a+n+"})";for(var l=t.firstChild;l;)n+=","+e(l),l=l.nextSibling;return n+")"}((t.content||t).firstChild))}(n)))(this,arguments)}});

},{}],13:[function(_dereq_,module,exports){
(function (global){
/* spacetime v5.0.4
   github.com/spencermountain/spacetime
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.wtf = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = '5.0.4';

},{}],2:[function(_dereq_,module,exports){
'use strict';

var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
module.exports = {
  short: function short() {
    return shortDays;
  },
  long: function long() {
    return longDays;
  },
  set: function set(i18n) {
    shortDays = i18n.short;
    longDays = i18n.long;
  }
};

},{}],3:[function(_dereq_,module,exports){
'use strict';

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc

o.day = 8.64e7;
o.date = 8.64e7;
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
'use strict';

var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function buildMapping() {
  var obj = {};

  for (var i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }

  for (var _i = 0; _i < longMonths.length; _i++) {
    obj[longMonths[_i]] = _i;
  }

  return obj;
}

module.exports = {
  short: function short() {
    return shortMonths;
  },
  long: function long() {
    return longMonths;
  },
  mapping: function mapping() {
    return buildMapping();
  },
  set: function set(i18n) {
    shortMonths = i18n.short;
    longMonths = i18n.long;
  }
};

},{}],6:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

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
'use strict'; //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html

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

exports.zeroPad = function (str, len) {
  len = len || 2;
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
};

exports.normalize = function (str) {
  str = str.toLowerCase();
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

},{}],9:[function(_dereq_,module,exports){
'use strict';

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

},{"../_version":1,"./spacetime":34,"./whereIts":40}],10:[function(_dereq_,module,exports){
'use strict';

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
'use strict';

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


var minimumEpoch = 2500000000; //support [2016, 03, 01] format

var handleArray = function handleArray(s, arr) {
  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i] || 0;
    s = s[order[i]](num);
  }

  return s;
}; //support {year:2016, month:3} format


var handleObject = function handleObject(s, obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i];

    if (s[unit] !== undefined) {
      var num = obj[unit] || 0;
      s = s[unit](num);
    }
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
      return s;
    }

    s = handleObject(s, input);
    return s;
  } //input as a string..


  if (typeof input !== 'string') {
    return s;
  } //little cleanup..


  input = input.trim().replace(/ +/g, ' '); //try some known-words, like 'now'

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
    console.warn('Warning: couldn\'t parse date-string: \'' + input + '\'');
  }

  s.epoch = null;
  return s;
};

module.exports = parseInput;

},{"../fns":8,"./named-dates":12,"./strParse":14}],12:[function(_dereq_,module,exports){
'use strict';

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
'use strict'; //pull-apart ISO offsets, like "+0100"

var parseOffset = function parseOffset(s, offset) {
  if (!offset) {
    return s;
  } //this is a fancy-move


  if (offset === 'Z') {
    offset = '+0000';
  } //support "+01:00"


  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '');
  } //support "+01:30"


  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '.5');
  }

  var num = parseInt(offset, 10); //divide by 100 or 10 - , "+0100", "+01"

  if (Math.abs(num) > 100) {
    num = num / 100;
  } // console.log(offset, num)


  var current = s.timezone().current.offset;

  if (current === num) {
    //we cool..
    return s;
  } //okay, try to match it to a utc timezone
  //this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_()_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }

  var tz = 'etc/gmt' + num;
  var zones = s.timezones; // console.log(tz)

  if (zones[tz]) {
    // console.log('changing timezone to: ' + tz)
    //log a warning if we're over-writing a given timezone
    // if (givenTz && zones[givenTz] && zones[givenTz].offset !== zones[tz].offset && s.silent === false) {
    //don't log during our tests, either..
    // if (typeof process !== 'undefined' && process.env && !process.env.TESTENV) {
    //   console.warn('  - Setting timezone to: \'' + tz + '\'')
    //   console.warn('     from ISO string \'' + offset + '\'')
    //   console.warn('     overwriting given timezone: \'' + givenTz + '\'\n')
    // }
    // }
    s.tz = tz;
  }

  return s;
};

module.exports = parseOffset;

},{}],14:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('../methods/set/walk');

var months = _dereq_('../data/months');

var parseOffset = _dereq_('./parseOffset');

var hasDate = _dereq_('./hasDate');

var fns = _dereq_('../fns'); // const zones = require('../../data');


var parseHour = function parseHour(s, str) {
  str = str.replace(/^\s+/, ''); //trim

  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

  if (arr) {
    s = s.hour(arr[1]);
    s = s.minute(arr[2]);

    if (arr[3]) {
      s = s.seconds(arr[3]);
    }

    if (arr[4]) {
      s = s.millisecond(arr[4]);
    }
  }

  return s;
};

var parseYear = function parseYear(str) {
  str = str || ''; //support '18 -> 2018
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
    s = parseHour(s, arr[4]);
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
    return s;
  }
}, //Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,
  parse: function parse(s, arr) {
    var month = months.mapping()[arr[1].toLowerCase()];
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

    if (arr[4]) {
      s = parseHour(s, arr[4]);
    }

    return s;
  }
}, //Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
  parse: function parse(s, arr) {
    var month = months.mapping()[arr[2].toLowerCase()];
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
    return s;
  }
}];
module.exports = strFmt;

},{"../data/months":5,"../fns":8,"../methods/set/walk":31,"./hasDate":10,"./parseOffset":13}],15:[function(_dereq_,module,exports){
'use strict';

var _format = _dereq_('./methods/format');

var _unixFmt = _dereq_('./methods/format/unixFmt');

var _progress = _dereq_('./methods/progress');

var _nearest = _dereq_('./methods/nearest');

var _diff = _dereq_('./methods/diff');

var _since = _dereq_('./methods/since');

var ends = _dereq_('./methods/startOf');

var _timezone = _dereq_('./timezone/index');

var handleInput = _dereq_('./input');

var fns = _dereq_('./fns'); //the spacetime instance methods (also, the API)


var methods = {
  set: function set(input) {
    var s = this.clone();
    s = handleInput(s, input);
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
  isValid: function isValid() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }

    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  goto: function goto(tz) {
    var s = this.clone();
    s.tz = tz; //science!

    return s;
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
module.exports = methods;

},{"./fns":8,"./input":11,"./methods/diff":18,"./methods/format":20,"./methods/format/unixFmt":21,"./methods/nearest":23,"./methods/progress":24,"./methods/since":32,"./methods/startOf":33,"./timezone/index":38}],16:[function(_dereq_,module,exports){
'use strict';

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
  year: order
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;
var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
}; //month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough

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
    } //ensure month/year has ticked-over


    if (unit === 'month') {
      want.month = old.month() + num; //month is the one unit we 'model' directly

      want = rollMonth(want, old);
    } //support 25-hour day-changes on dst-changes
    else if (unit === 'date' && num !== 0 && old.isSame(s, 'day')) {
        want.date = old.date() + num;
      } //ensure year has changed (leap-years)
      else if (unit === 'year' && s.year() === old.year()) {
          s.epoch += ms.week;
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

},{"../data/milliseconds":3,"../data/monthLengths":4,"../fns":8,"./set/walk":31}],17:[function(_dereq_,module,exports){
'use strict';

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
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../fns":8}],18:[function(_dereq_,module,exports){
'use strict';

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


  if (!a.isSame(b, unit)) {
    i -= 1;
  }

  return i;
};

var diffQuick = function diffQuick(a, b) {
  var ms = b.epoch - a.epoch;
  var obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
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
  all.months = diff(a, b, 'month');
  all.weeks = diff(a, b, 'week');
  all.days = diff(a, b, 'day'); //only slow-compute hours if it's a small diff

  if (all.years === 0) {
    all.hours = diff(a, b, 'hour');
  }

  return all;
};

module.exports = diff;

},{"../fns":8}],19:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../../fns'); // "+01:00", "+0100", or simply "+01"


var isoOffset = function isoOffset(s) {
  var offset = s.timezone().current.offset;
  var minute = '00';

  if (offset % 1 === 0.5) {
    //fraction of the hour
    minute = '30';
    offset = Math.floor(offset);
  }

  if (offset < 0) {
    //handle negative sign
    offset *= -1;
    offset = fns.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns.zeroPad(offset, 2);
    offset = '+' + offset;
  }

  offset = offset + ':' + minute; //this is a little cleaner?

  if (offset === "+00:00") {
    offset = 'Z';
  }

  return offset;
};

module.exports = isoOffset;

},{"../../fns":8}],20:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../fns');

var months = _dereq_('../../data/months');

var days = _dereq_('../../data/days');

var isoOffset = _dereq_('./_offset');

var format = {
  day: function day(s) {
    return fns.titleCase(s.dayName());
  },
  'day-short': function dayShort(s) {
    return days.short()[s.day()];
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
    return months.short()[s.month()];
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
  'nice': function nice(s) {
    return "".concat(months.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  },
  'nice-year': function niceYear(s) {
    return "".concat(months.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
  },
  'nice-day': function niceDay(s) {
    return "".concat(days.short()[s.day()], " ").concat(fns.titleCase(months.short()[s.month()]), " ").concat(fns.ordinal(s.date()));
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
  'tz': 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'nice-short': 'nice',
  'mdy': 'numeric-us',
  'dmy': 'numeric-uk',
  'ymd': 'numeric',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric'
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

},{"../../data/days":2,"../../data/months":5,"../../fns":8,"./_offset":19}],21:[function(_dereq_,module,exports){
'use strict';

var pad = _dereq_('../../fns').zeroPad; //parse this insane unix-time-templating thing, from the 19th century
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
    return s.tz;
  },
  zz: function zz(s) {
    return s.tz;
  },
  zzz: function zzz(s) {
    return s.tz;
  },
  zzzz: function zzzz(s) {
    return s.tz;
  },
  Z: function Z(s) {
    return s.timezone().current.offset + '00';
  },
  ZZ: function ZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZ: function ZZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZZ: function ZZZZ(s) {
    return s.timezone().current.offset + ':00';
  }
};

var addAlias = function addAlias(char, to, n) {
  var name = char;
  var toName = to;

  for (var i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += char;
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

},{"../../fns":8}],22:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

var days = _dereq_('../data/days');

var months = _dereq_('../data/months');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    i18n: function i18n(data) {
      if (!fns.isObject(data) || !fns.isObject(data.days) || !fns.isObject(data.months) || !fns.isArray(data.days.short) || !fns.isArray(data.days.long) || !fns.isArray(data.months.short) || !fns.isArray(data.months.long)) {
        throw new Error('Invalid i18n payload passed.');
      }

      days.set(data.days);
      months.set(data.months);
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../data/days":2,"../data/months":5,"../fns":8}],23:[function(_dereq_,module,exports){
'use strict'; //round to either current, or +1 of this unit

var nearest = function nearest(s, unit) {
  unit = unit.toLowerCase();
  unit = unit.replace(/s$/, ''); //singular form...

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

},{}],24:[function(_dereq_,module,exports){
'use strict'; //how far it is along, from 0-1

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

},{}],25:[function(_dereq_,module,exports){
'use strict';

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

},{"../../data/quarters":6,"../../data/seasons":7,"../../fns":8,"../set/set":30}],26:[function(_dereq_,module,exports){
'use strict';

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

},{"./destructive":25,"./normal":27,"./tricky":28}],27:[function(_dereq_,module,exports){
'use strict';

var set = _dereq_('../set/set');

var walkTo = _dereq_('../set/walk'); //the most basic get/set methods


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
      s.epoch = set.hours(s, num);
      walkTo(s, {
        month: this.month(),
        date: this.date(),
        hour: num
      });
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
  }
}; //aliases

methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;
module.exports = methods;

},{"../set/set":30,"../set/walk":31}],28:[function(_dereq_,module,exports){
'use strict';

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
      want = days.short().indexOf(input);

      if (want === -1) {
        want = days.long().indexOf(input);
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

    if (input === undefined) {
      return which;
    }

    var s = this.clone();

    if (input === which) {
      return s;
    }

    if (s === 'am') {
      s = s.subtract(12, 'hours');
    } else {
      s = s.add(12, 'hours');
    }

    return s;
  },
  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }

    var s = this.clone();
    s = s.day(input);
    return s;
  },
  monthName: function monthName(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }

    var s = this.clone();
    s = s.month(input);
    return s;
  }
};

},{"../../data/days":2,"../../data/months":5,"../set/walk":31}],29:[function(_dereq_,module,exports){
'use strict'; //make a string, for easy comparison between dates

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

},{}],30:[function(_dereq_,module,exports){
'use strict'; // javascript setX methods like setDate() can't be used because of the local bias
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
    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * ms.hour;
    s.epoch -= shift;
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
    n = validate(n);
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

    n = validate(n);
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
    var diff = n - s.dayOfYear();
    var shift = diff * ms.day;
    s.epoch += shift;
    confirm(s, old, 'hour');
    return s.epoch;
  }
};

},{"../../data/milliseconds":3,"../../data/monthLengths":4,"../../data/months":5,"./walk":31}],31:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('../../data/milliseconds'); //basically, step-forward/backward until js Date object says we're there.


var walk = function walk(s, n, fn, unit, previous) {
  var current = s.d[fn]();

  if (current === n) {
    return; //already there
  }

  var startUnit = previous === null ? null : s.d[previous]();
  var original = s.epoch; //try to get it as close as we can

  var diff = n - current;
  s.epoch += ms[unit] * diff; //repair it if we've gone too far or something
  //(go by half-steps, just in case)

  var halfStep = ms[unit] / 2;

  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  } //oops, did we change previous unit? revert it.


  if (previous !== null && startUnit !== s.d[previous]()) {
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
      var current = s.d.getMonth();
      var original = s.epoch;
      var startUnit = s.d.getYear();

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
      return walk(s, n, 'getSeconds', 'second', 'getMinutes');
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      var tmp = s.milliseconds(n);
      s.epoch = tmp.epoch;
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


    units[k].walkTo(s, n); // console.log(s.milliseconds())
    //if we've gone over a dst-change or something..
    // if (wants.hour === undefined && s.hour() !== old.hour()) {
    //   s.hour(old.hour());
    // }
  }

  return;
};

module.exports = walkTo; // const spacetime = require('../../spacetime')
// let s = new spacetime(1509778800000, 'Canada/Pacific')
// let want = {
//   millisecond: 0,
//   second: 0,
//   minute: 0,
//   hour: 0,
//   date: 4
// }
// s.log()
// units['date'].walkTo(s, 4);
// walkTo(s, want)
// s.log()

},{"../../data/milliseconds":3}],32:[function(_dereq_,module,exports){
'use strict';

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
    earlier = earlier.add(max, unit); //did we go one too far?

    if (earlier.epoch > later.epoch + 10) {
      //(fudge this calc by 10 milliseconds)
      earlier = earlier.subtract(1, unit);
      max -= 1;
    }

    diff[unit] = max;
  }); //reverse it

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

},{"../fns":8}],33:[function(_dereq_,module,exports){
'use strict';

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

},{"../data/quarters":6,"../data/seasons":7,"./set/walk":31}],34:[function(_dereq_,module,exports){
'use strict';

var guessTz = _dereq_('./timezone/guessTz');

var timezone = _dereq_('./timezone/index');

var handleInput = _dereq_('./input');

var methods = _dereq_('./methods');

var timezones = _dereq_('../zonefile/unpack'); //fake timezone-support, for fakers (es5 class)


var SpaceTime = function SpaceTime(input, tz, options) {
  options = options || {}; //the holy moment

  this.epoch = null; //the shift for the given timezone

  this.tz = tz || guessTz(); //whether to output warnings to console

  this.silent = options.silent || true; //add getter/setters

  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var meta = timezone(this) || {}; //every computer is somewhere- get this computer's built-in offset

      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

      var shift = bias + meta.current.offset * 60; //in minutes

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

},{"../zonefile/unpack":44,"./input":11,"./methods":15,"./methods/add":16,"./methods/compare":17,"./methods/i18n":22,"./methods/query":26,"./methods/same":29,"./timezone/guessTz":37,"./timezone/index":38}],35:[function(_dereq_,module,exports){
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

},{"../../zonefile/informal":43}],36:[function(_dereq_,module,exports){
"use strict";

var tzs = _dereq_('../../zonefile/unpack');

var informal = _dereq_('../../zonefile/informal').lookup; // console.log(informal)
// const isNum = /^(etc\/gmt|etc|gmt|utc|h)([+\-0-9 ]+)$/i


var isOffset = /(\-?[0-9]+)h(rs)?/; //add all the city names by themselves

var cities = Object.keys(tzs).reduce(function (h, k) {
  var city = k.split('/')[1];
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


  m = tz.match(isOffset);

  if (m !== null) {
    var num = Number(m[1]);
    num = num * -1; //it's opposite!

    num = (num > 0 ? '+' : '') + num;
    var gmt = 'etc/gmt' + num;

    if (zones.hasOwnProperty(gmt)) {
      return gmt;
    }
  }

  return null;
};

module.exports = lookupTz;

},{"../../zonefile/informal":43,"../../zonefile/unpack":44}],37:[function(_dereq_,module,exports){
'use strict'; //find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

var fallbackTZ = 'asia/shanghai'; //
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

  if (!timezone || timezone.indexOf('/') === -1 && timezone === 'UTC') {
    return null;
  }

  return timezone;
};

var guessTz = function guessTz() {
  var timezone = safeIntl();

  if (timezone === null) {
    return fallbackTZ;
  }

  return timezone.toLowerCase();
};

module.exports = guessTz;

},{}],38:[function(_dereq_,module,exports){
'use strict'; // const zones = require('../../data');

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
  str = str.replace(/[\/_]([a-z])/ig, function (s) {
    return s.toUpperCase();
  });
  return str;
}; //get metadata about this timezone


var timezone = function timezone(s) {
  var zones = s.timezones;
  var tz = findTz(s.tz, zones);

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
  } else if (inSummerTime(s, result, summer) === true) {
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

},{"./display":35,"./find":36,"./summerTime":39}],39:[function(_dereq_,module,exports){
'use strict';

var zeroPad = _dereq_('../fns').zeroPad;

var toString = function toString(d) {
  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
}; // a timezone will begin with a specific offset in january
// then some will switch to something else between november-march


var shouldChange = function shouldChange(s, m, defaultOffset) {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false;
  } //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.


  var d = new Date(s.epoch); //(try to mediate this a little?)

  var bias = d.getTimezoneOffset() || 0;
  var shift = bias + defaultOffset * 60; //in minutes

  shift = shift * 60 * 1000; //in ms

  d = new Date(s.epoch + shift);
  var current = toString(d); //eg. is it after ~november?

  if (current >= m.change.start) {
    //eg. is it before ~march~ too?
    if (current < m.change.back) {
      return true;
    }
  }

  return false;
};

module.exports = shouldChange;

},{"../fns":8}],40:[function(_dereq_,module,exports){
'use strict';

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

},{"./spacetime":34}],41:[function(_dereq_,module,exports){
module.exports={
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  "9.5|s|04/01:03->10/07:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
  "8|n|03/25:03->09/29:23": "2/ulan_bator",
  "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/vientiane",
  "6|s": "12/vostok",
  "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
  "6.5|n": "2/rangoon,9/cocos",
  "5|s": "12/mawson,9/kerguelen",
  "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/calcutta,2/colombo,2/kolkata",
  "4|s": "9/reunion",
  "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,9/mahe,9/mauritius",
  "4.5|n|03/22:00->09/21:24": "2/tehran",
  "4.5|n": "2/kabul",
  "3|s": "12/syowa,9/antananarivo",
  "3|n|03/30:00->10/26:01": "2/amman",
  "3|n|03/30:00->10/25:24": "2/damascus",
  "3|n|03/25:03->10/28:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
  "3|n|03/25:02->10/28:03": "8/chisinau,8/tiraspol",
  "3|n|03/25:00->10/27:24": "2/beirut",
  "3|n|03/24:01->10/27:01": "2/gaza,2/hebron",
  "3|n|03/23:02->10/28:02": "2/jerusalem,2/tel_aviv",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,8/volgograd,9/comoro,9/mayotte",
  "2|s|03/25:02->10/28:02": "12/troll",
  "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  "2|n|03/25:02->10/28:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
  "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  "1|s|04/02:01->09/03:03": "0/windhoek",
  "1|s": "0/kinshasa,0/luanda",
  "1|n|07/02:03->10/29:02": "0/casablanca,0/el_aaiun",
  "1|n|03/25:01->10/28:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
  "1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s|04/01:04->09/30:03": "11/apia",
  "13|s|01/15:02->11/05:03": "11/tongatapu",
  "13|n": "11/enderbury,11/fakaofo",
  "12|s|04/01:03->09/30:02": "12/mcmurdo,12/south_pole,11/auckland",
  "12|s|01/14:03->11/04:02": "11/fiji",
  "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  "12.75|s|04/07:03->09/29:02": "11/chatham",
  "11|s": "12/macquarie,11/bougainville",
  "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  "11.5|n": "11/norfolk",
  "10|s|04/01:03->10/07:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
  "10.5|s|04/01:01->10/07:02": "4/lhi,4/lord_howe",
  "0|n|03/25:00->10/28:01": "1/scoresbysund,3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
  "-9|n|03/11:02->11/04:02": "1/adak,1/atka",
  "-9|n": "11/gambier",
  "-9.5|n": "11/marquesas",
  "-8|n|03/11:02->11/04:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
  "-8|n": "11/pitcairn",
  "-7|n|03/11:02->11/04:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
  "-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
  "-6|s|05/12:22->08/11:22": "7/easterisland,11/easter",
  "-6|n|04/01:02->10/28:02": "1/chihuahua,1/mazatlan,10/bajasur",
  "-6|n|03/11:02->11/04:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
  "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
  "-5|s": "1/lima,1/rio_branco,5/acre",
  "-5|n|04/01:02->10/28:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  "-5|n|03/12:03->11/05:01": "1/north_dakota",
  "-5|n|03/11:02->11/04:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
  "-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
  "-4|s|05/13:23->08/13:01": "12/palmer",
  "-4|s|05/12:24->08/12:00": "1/santiago,7/continental",
  "-4|s|03/24:24->10/07:00": "1/asuncion",
  "-4|s|02/17:24->11/04:00": "1/campo_grande,1/cuiaba",
  "-4|s": "1/la_paz,1/manaus,5/west",
  "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  "-4|n|03/11:02->11/04:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
  "-4|n|03/11:00->11/04:01": "1/havana",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  "-3|s|02/17:24->11/04:00": "1/sao_paulo,5/east",
  "-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
  "-3|n|03/11:02->11/04:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
  "-2|s": "5/denoronha",
  "-2|n|03/24:22->10/27:23": "1/godthab",
  "-2|n|03/11:02->11/04:02": "1/miquelon",
  "-2|n": "1/noronha,3/south_georgia",
  "-2.5|n|03/11:02->11/04:02": "1/st_johns,6/newfoundland",
  "-1|n": "3/cape_verde",
  "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
  "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
}
},{}],42:[function(_dereq_,module,exports){
"use strict";

//prefixes for iana names..
module.exports = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

},{}],43:[function(_dereq_,module,exports){
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

},{}],44:[function(_dereq_,module,exports){
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
}); //add etc/gmt+n

for (var i = -12; i < 13; i += 1) {
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

},{"./_build.json":41,"./_prefixes.js":42}]},{},[9])(9)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spencerColor=e()}}(function(){return function i(f,c,u){function d(r,e){if(!c[r]){if(!f[r]){var n="function"==typeof _dereq_&&_dereq_;if(!e&&n)return n(r,!0);if(s)return s(r,!0);var o=new Error("Cannot find module '"+r+"'");throw o.code="MODULE_NOT_FOUND",o}var t=c[r]={exports:{}};f[r][0].call(t.exports,function(e){return d(f[r][1][e]||e)},t,t.exports,i,f,c,u)}return c[r].exports}for(var s="function"==typeof _dereq_&&_dereq_,e=0;e<u.length;e++)d(u[e]);return d}({1:[function(e,r,n){"use strict";r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#e6b8b3",brown:"#9c896c",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",burnt:"#603a39",beige:"#e6d7b3",fuscia:"#603960"}},{}],2:[function(e,r,n){"use strict";r.exports={white:"#fbfbfb",grey:"#4d4d4d",dim:"#d7d5d2",lightgrey:"#949a9e",dark:"#443d3d",bluegrey:"#606c74",black:"#333333"}},{}],3:[function(e,r,n){"use strict";var o=e("./greys"),t=e("./colors");r.exports=Object.assign({},t,o)},{"./colors":1,"./greys":2}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(_dereq_,module,exports){
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


},{}],16:[function(_dereq_,module,exports){
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

var fitAspect = _dereq_('fit-aspect-ratio'); // const Component = require('preact').Component


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

var Slider = _dereq_('./inputs/Slider');

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
    key: "rect",
    value: function rect(obj) {
      var shape = new Rect(obj, this);
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
    key: "slider",
    value: function slider(obj) {
      var slider = new Slider(obj, this);
      this.inputs.push(slider);
      return slider;
    }
  }, {
    key: "getShape",
    value: function getShape(id) {
      return this.shapes.find(function (shape) {
        return shape.id === id;
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
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.html;
      var shapes = this.shapes.sort(function (a, b) {
        return a._order > b._order ? 1 : -1;
      });
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
module.exports = World;

},{"./axis/XAxis":19,"./axis/YAxis":20,"./inputs/Slider":25,"./methods":26,"./scales/Scale":28,"./scales/YScale":29,"./shapes/Area":30,"./shapes/Dot":31,"./shapes/Line":32,"./shapes/Rect":33,"./shapes/Shape":34,"./shapes/Text":35,"fit-aspect-ratio":11,"htm":12,"vhtml":15}],17:[function(_dereq_,module,exports){
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


var uuid = function uuid() {
  return (Math.random() + 1).toString(36).substring(7); // return 'xxxxx'.replace(/[xy]/g, function(c) {
  //   var r = Math.random() * 16 | 0,
  //     v = c === 'x' ? r : (r & 0x3 | 0x8);
  //   return v.toString(16);
  // });
};

module.exports = {
  extent: extent,
  uuid: uuid
};

},{}],18:[function(_dereq_,module,exports){
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

},{"./_custom":21,"./_ticks":23,"spencer-color":14}],19:[function(_dereq_,module,exports){
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
        return h(_templateObject(), o.pos, y + 15, _this2.attrs.stroke, o.label);
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

},{"./Axis":18}],20:[function(_dereq_,module,exports){
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
        return h(_templateObject(), x, o.pos, _this2.attrs.stroke, o.label);
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

},{"./Axis":18}],21:[function(_dereq_,module,exports){
"use strict";

var spacetime = _dereq_('spacetime');

var prettyNum = _dereq_('./_prettyNum');

var drawTick = function drawTick(s, axis) {
  var scale = axis.scale.scale;

  if (typeof s === 'string') {
    s = spacetime(s);
    return {
      num: s.epoch,
      //val
      pos: parseInt(scale(s.epoch), 10),
      //x/y
      label: s.format(axis._fmt || '{month} {year}') //text

    };
  }

  var num = Number(s);
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: prettyNum(num)
  };
};

module.exports = drawTick;

},{"./_prettyNum":22,"spacetime":13}],22:[function(_dereq_,module,exports){
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

},{}],23:[function(_dereq_,module,exports){
"use strict";

var spacetime = _dereq_('spacetime');

var prettyNum = _dereq_('./_prettyNum');

var memo = {};
var day = 60 * 60 * 24 * 1000;
var month = day * 30;
var year = day * 368;

var generic = function generic(axis) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  n = n === 0 ? 0 : n - 1;
  var scale = axis.scale;
  var total = (scale.max || 0) - (scale.min || 0);
  var ticks = [];

  for (var i = 0; i <= n; i += 1) {
    var dec = i / n;
    var num = dec * total + (scale.min || 0);
    ticks.push({
      num: num,
      pos: scale.scale(num),
      label: prettyNum(num)
    });
  }

  return ticks;
};

var chooseFmt = function chooseFmt(scale) {
  var diff = scale.max - scale.min;

  if (diff > year * 3) {
    return 'yyyy';
  }

  if (diff > year) {
    return 'MMM yyyy';
  }

  if (diff > month) {
    return 'MMM'; // Sept
  }

  if (diff < day) {
    return 'h:mm a';
  }

  return 'MMM d';
};

var date = function date(axis) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var ticks = generic(axis, n);
  var fmt = chooseFmt(axis.scale);
  ticks = ticks.map(function (o) {
    if (memo[o.num]) {
      o.label = memo[o.num];
    } else {
      o.label = spacetime(o.num).unixFmt(fmt);
    }

    return o;
  });
  return ticks;
};

module.exports = {
  generic: generic,
  date: date
};

},{"./_prettyNum":22,"spacetime":13}],24:[function(_dereq_,module,exports){
"use strict";

var World = _dereq_('./World'); //


var somehow = function somehow(obj) {
  return new World(obj);
};

module.exports = somehow;

},{"./World":16}],25:[function(_dereq_,module,exports){
"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div style=\"", "\">\n        <div style=\"", "\">", "</div>\n        ", "\n        <input type=\"range\" id=\"", "\" style=\"", "\" value=", " ...", ">\n      </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div style=\"", "\"> ", "</div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const fns = require('../_fns')
var colors = _dereq_('spencer-color');

var defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200
};

var Slider =
/*#__PURE__*/
function () {
  function Slider() {
    var _this = this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var world = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Slider);

    if (typeof obj === 'string') {
      this.id = obj;
      obj = {};
    }

    this.world = world;
    this.data = obj.data || [];
    this.attrs = Object.assign({}, defaults, obj);
    this.style = {};
    this._title = '';

    this.onChange = function () {};

    this._labels = [];
    this._value = obj.value;

    if (this._value === undefined) {
      this._value = 50;
    }

    this.id = obj.id || 'slider';
    this.world.state[this.id] = this._value;

    this.callback = function (e) {
      _this.world.state[_this.id] = e.target.value;

      _this.world.redraw();
    };
  }

  _createClass(Slider, [{
    key: "labels",
    value: function labels(data) {
      this._labels = data.map(function (a) {
        return {
          value: a[1],
          label: a[0]
        };
      });
      return this;
    }
  }, {
    key: "place",
    value: function place() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _this$attrs = this.attrs,
          max = _this$attrs.max,
          min = _this$attrs.min,
          size = _this$attrs.size;
      var range = max - min;
      var spot = x - min;
      var percent = spot / range;
      return percent * size;
    }
  }, {
    key: "makeLabels",
    value: function makeLabels() {
      var _this2 = this;

      var h = this.world.html;
      return this._labels.map(function (o) {
        var y = _this2.place(o.value);

        var style = "position:absolute; top:".concat(y, "px; font-size:10px; color:").concat(colors.lightgrey, "; left:10px;");
        return h(_templateObject(), style, o.label);
      });
    }
  }, {
    key: "title",
    value: function title(str) {
      this._title = str;
    }
  }, {
    key: "build",
    value: function build() {
      var _this3 = this;

      var h = this.world.html;
      var size = this.attrs.size;
      var styles = {
        box: "position:relative; height:".concat(size, "px; width:100px;"),
        input: "transform: rotate(90deg); width:".concat(size, "px;  transform-origin: 0% 0%;"),
        title: "position:absolute; top:-20px; left:-20px; color:".concat(colors.lightgrey, "; font-size:14px;")
      };
      setTimeout(function () {
        var el = document.getElementById(_this3.id);
        el.addEventListener('input', function (e) {
          _this3.world.state[_this3.id] = e.target.value;

          _this3.callback(e);
        });
      }, 50);
      return h(_templateObject2(), styles.box, styles.title, this._title, this.makeLabels(), this.id, styles.input, this._value, this.attrs);
    }
  }]);

  return Slider;
}();

module.exports = Slider;

},{"spencer-color":14}],26:[function(_dereq_,module,exports){
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
  fit: function fit(x, y) {
    // if (!has(x) && !has(y)) {
    var arr = this.shapes.map(function (s) {
      return s.extent();
    });
    var minX = fns.extent(arr.map(function (o) {
      return o.x.min;
    }).filter(function (n) {
      return n !== null;
    })).min || 0;
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
    this.y.min = minY > 0 ? 0 : minY;
    this.y.max = maxY;

    if (this.y.format() === 'date') {
      this.y.min = minY;
      this.y.max = maxY;
    }

    this.y.rescale(); // }

    if (has(x) === true) {
      x = parseX(x, this).value;

      if (x > this.x.max) {
        this.x.max = x;
      } else if (x < this.x.min) {
        this.x.min = x;
      }

      this.x.rescale();
    }

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
  }
};
module.exports = methods;

},{"./_fns":17,"./parse":27}],27:[function(_dereq_,module,exports){
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

},{"spacetime":13}],28:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var scaleLinear = _dereq_('d3-scale').scaleLinear;

var _require = _dereq_('../parse'),
    parseX = _require.parseX; // const spacetime = require('spacetime')


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
    this.rescale();
  }

  _createClass(Scale, [{
    key: "rescale",
    value: function rescale() {
      //give it a little bit of room..
      var max = this.max;
      var min = this.min;
      console.log([min, max]);
      this.scale = scaleLinear().range([this.from, this.to]).domain([min, max]);
    }
  }, {
    key: "fit",
    value: function fit(a, b) {
      if (has(a) === true) {
        var num = this.parse(a, this.world).value;
        this.min = num;
      }

      if (has(b) === true) {
        var _num = this.parse(b, this.world).value;
        this.max = _num;
      }

      this.rescale();
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
  }]);

  return Scale;
}();

module.exports = Scale;

},{"../parse":27,"d3-scale":7}],29:[function(_dereq_,module,exports){
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

var scaleLinear = _dereq_('d3-scale').scaleLinear;

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
      var max = this.max; //* this.world.wiggle_room

      this.scale = scaleLinear().range([this.from, this.to]).domain([max, this.min]);
    }
  }]);

  return YScale;
}(Scale);

module.exports = YScale;

},{"../parse":27,"./Scale":28,"d3-scale":7}],30:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\"/>"]);

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

var colors = _dereq_('spencer-color');

var Shape = _dereq_('./Shape');

var d3Shape = _dereq_('d3-shape');

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
    key: "linePath",
    value: function linePath() {
      var points = this.points();
      return d3Shape.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      }).curve(d3Shape.curveMonotoneX)(points);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      var areaAttr = Object.assign({}, this.attrs, {
        d: this.path(),
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
      var line = h(_templateObject2(), lineAttr, this.drawSyle());
      return [line, area];
    }
  }]);

  return Area;
}(Shape);

module.exports = Area;

},{"./Shape":34,"d3-shape":8,"spencer-color":14}],31:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<circle ...", " />"]);

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

var colors = _dereq_('spencer-color'); // const d3Shape = require('d3-shape')


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
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      var point = this.points()[0];
      var attrs = Object.assign({}, this.attrs, {
        cx: point[0],
        cy: point[1],
        r: this._radius
      });
      return h(_templateObject(), attrs);
    }
  }]);

  return Dot;
}(Shape);

module.exports = Dot;

},{"./Shape":34,"spencer-color":14}],32:[function(_dereq_,module,exports){
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

var colors = _dereq_('spencer-color');

var d3Shape = _dereq_('d3-shape');

var Shape = _dereq_('./Shape'); // const {parseX, parseY} = require('../parse')


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
      this.attrs['stroke-width'] = num; //parseX(num, this.world)

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
      }).curve(d3Shape.curveMonotoneX)(points);
    }
  }]);

  return Line;
}(Shape);

module.exports = Line;

},{"./Shape":34,"d3-shape":8,"spencer-color":14}],33:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<rect ...", " />"]);

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

var colors = _dereq_('spencer-color');

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
      console.log('hi');
      this._rounded = r;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      var points = this.points();
      var a = points[0];
      var b = points[1];
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
      return h(_templateObject(), attrs); //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
    }
  }]);

  return Rect;
}(Shape);

module.exports = Rect;

},{"./Shape":34,"spencer-color":14}],34:[function(_dereq_,module,exports){
"use strict";

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

// const flubber = require('flubber')
var d3Shape = _dereq_('d3-shape');

var colors = _dereq_('spencer-color');

var _require = _dereq_('../parse'),
    parseX = _require.parseX,
    parseY = _require.parseY;

var fns = _dereq_('../_fns');

var parseInput = _dereq_('./lib/parseInput');

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
    this.id = obj.id;
    this.attrs = Object.assign({}, defaults, obj);
    this.style = {};
    this._shape = 1;
  }

  _createClass(Shape, [{
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
      // let points = this.points()
      // let xArr = points.map((a) => a[0])
      // let yArr = points.map((a) => a[1])
      var xArr = [];
      var yArr = [];
      this.data.forEach(function (o) {
        if (o.x.type !== 'pixel') {
          xArr.push(o.x.value);
        }

        if (o.y.type !== 'pixel') {
          yArr.push(o.y.value);
        }
      }); // this.data.map((o) => o.x.value)
      // let yArr = this.data.map((o) => o.y.value)

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
    } //x,y coordinates

  }, {
    key: "points",
    value: function points() {
      var _this$world = this.world,
          x = _this$world.x,
          y = _this$world.y;
      var points = this.data.map(function (o) {
        return [x.place(o.x), y.place(o.y)];
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
      var _this = this;

      return Object.keys(this.style).map(function (k) {
        return "".concat(k, ":").concat(_this.style[k], ";");
      }).join(' ');
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.world.html;
      var attrs = Object.assign({}, this.attrs, {
        d: this.path()
      });
      return h(_templateObject(), attrs, this.drawSyle());
    }
  }]);

  return Shape;
}();

module.exports = Shape;

},{"../_fns":17,"../parse":27,"./lib/parseInput":36,"d3-shape":8,"spencer-color":14}],35:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<g transform=\"translate(", " ", ")\" style=\"", "\">\n      <text id=\"fun\" ...", ">\n        ", "\n      </text>\n    </g>"]);

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

var colors = _dereq_('spencer-color');

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

    if (typeof obj === 'string') {
      text = [obj];
      obj = {};
    } else if (Array.isArray(obj)) {
      text = obj;
      obj = [];
    }

    obj = Object.assign({}, defaults, obj);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, obj, world));
    _this.textLines = text || obj.text || [];

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
      //calculate height
      var height = 24;

      if (this.style['font-size']) {
        var num = this.style['font-size'].replace('px', '');
        num = Number(num);
        height = num * 1.5;
      } //calculate width


      var width = 0;
      this.textLines.forEach(function (str) {
        var w = str.length * 6;

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
      var inside = this.textLines.map(function (str) {
        return h(_templateObject(), str);
      });

      var _this$position = this.position(),
          x = _this$position.x,
          y = _this$position.y;

      return h(_templateObject2(), x, y, this.drawSyle(), this.attrs, inside);
    }
  }]);

  return Text;
}(Shape);

module.exports = Text;

},{"./Shape":34,"spencer-color":14}],36:[function(_dereq_,module,exports){
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
    var split = line.split(/(,|\t) ?/);
    var x = parseX(split[0], world);
    var y = parseX(split[2], world);
    return {
      x: x,
      y: y
    };
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
    return {
      x: x,
      y: y
    };
  });
};

module.exports = parseInput;

},{"../../parse":27}]},{},[24])(24)
});
