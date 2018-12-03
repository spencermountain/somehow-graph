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
      this.x.min = x
      this.x.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this)
      this.y.min = y
      this.y.rescale()
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)
      this.c.max = x
      this.c.rescale()
    }
    if (has(y) === true) {
      y = parseX(y, this)
      this.y.max = y
      this.y.rescale()
    }
    return this
  },

  fit: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)
      if (x > this.x.max) {
        this.x.max = x
      } else if (x < this.x.min) {
        this.x.min = x
      }
      this.x.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this)
      if (y > this.y.max) {
        this.y.max = y
      } else if (y < this.y.min) {
        this.y.min = y
      }
      this.y.rescale()
    }
    if (!has(x) && !has(y)) {
      let arr = this.shapes.map((s) => s.extent())
      let minX = fns.extent(arr.map((o) => o.x.min).filter(n => n !== null)).min || 0
      let minY = fns.extent(arr.map((o) => o.y.min).filter(n => n !== null)).min || 0
      let maxY = fns.extent(arr.map((o) => o.y.max).filter(n => n !== null)).max || 0
      let maxX = fns.extent(arr.map((o) => o.x.max).filter(n => n !== null)).max || 0
      //keep graphs from 0, if you can...
      this.x.min = minX > 0 ? 0 : minX
      this.x.max = maxX
      if (this.x.format() === 'date') {
        this.x.min = minX
        this.x.max = maxX
      }
      this.x.rescale()

      this.y.min = minY > 0 ? 0 : minY
      this.y.max = maxY
      if (this.y.format() === 'date') {
        this.y.min = minY
        this.y.max = maxY
      }
      this.y.rescale()
    }
    return this
  }
}
module.exports = methods
