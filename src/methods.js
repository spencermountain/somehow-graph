const parse = require('./shapes/_parse')
const fns = require('./_fns')

const has = function(x) {
  return x !== undefined && x !== null
}

let methods = {

  //add new minimums
  from: function(x, y) {
    if (has(x) === true) {
      x = parse(x)
      this.xScale.min = x
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parse(y)
      this.yScale.min = y
      this.yScale.rescale()
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parse(x)
      this.xScale.max = x
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parse(y)
      this.yScale.max = y
      this.yScale.rescale()
    }
    return this
  },

  fit: function(x, y) {
    if (has(x) === true) {
      x = parse(x)
      if (x > this.xScale.max) {
        this.xScale.max = x
      } else if (x < this.xScale.min) {
        this.xScale.min = x
      }
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parse(y)
      if (y > this.yScale.max) {
        this.yScale.max = y
      } else if (y < this.yScale.min) {
        this.yScale.min = y
      }
      this.yScale.rescale()
    }
    if (!has(x) && !has(y)) {
      let arr = this.shapes.map((s) => s.extent())
      let minX = fns.extent(arr.map((o) => o.x.min)).min
      let minY = fns.extent(arr.map((o) => o.y.min)).min
      let maxY = fns.extent(arr.map((o) => o.y.max)).max
      let maxX = fns.extent(arr.map((o) => o.x.max)).max
      //keep graphs from 0!
      this.xScale.min = minX > 0 ? 0 : minX
      this.xScale.max = maxX
      this.xScale.rescale()
      this.yScale.min = minY > 0 ? 0 : minY
      this.yScale.max = maxY
      this.yScale.rescale()
    }
    return this
  }
}
module.exports = methods
