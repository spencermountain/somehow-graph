const {parseX, parseY} = require('./parse')
const fns = require('./_fns')

const has = function(x) {
  return x !== undefined && x !== null
}

let methods = {

  //add new minimums
  from: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)
      this.xScale.min = x
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this)
      this.yScale.min = y
      this.yScale.rescale()
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)
      this.xScale.max = x
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parseX(y, this)
      this.yScale.max = y
      this.yScale.rescale()
    }
    return this
  },

  fit: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)
      if (x > this.xScale.max) {
        this.xScale.max = x
      } else if (x < this.xScale.min) {
        this.xScale.min = x
      }
      this.xScale.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this)
      if (y > this.yScale.max) {
        this.yScale.max = y
      } else if (y < this.yScale.min) {
        this.yScale.min = y
      }
      this.yScale.rescale()
    }
    if (!has(x) && !has(y)) {
      let arr = this.shapes.map((s) => s.extent())
      console.log(arr)
      let minX = fns.extent(arr.map((o) => o.x.min)).min || 0
      let minY = fns.extent(arr.map((o) => o.y.min)).min || 0
      let maxY = fns.extent(arr.map((o) => o.y.max)).max || 0
      let maxX = fns.extent(arr.map((o) => o.x.max)).max || 0

      //keep graphs from 0, if you can...
      this.xScale.min = minX > 0 ? 0 : minX
      this.xScale.max = maxX
      if (this.xScale.format() === 'date') {
        this.xScale.min = minX
        this.xScale.max = maxX
      }
      this.xScale.rescale()

      this.yScale.min = minY > 0 ? 0 : minY
      this.yScale.max = maxY
      if (this.yScale.format() === 'date') {
        this.yScale.min = minY
        this.yScale.max = maxY
      }
      this.yScale.rescale()
    }
    return this
  }
}
module.exports = methods
