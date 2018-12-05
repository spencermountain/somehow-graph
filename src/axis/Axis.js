const ticks = require('./_ticks')
const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
}

class Axis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
    this.scale = null
    this._ticks = 6
    this._show = true
  }
  remove() {
    this._show = false
  }
  show() {
    this._show = true
  }
  ticks(n) {
    if (n !== undefined) {
      this._ticks = n
    }
    if (this.scale.format() === 'date') {
      return ticks.date(this, this._ticks)
    }
    return ticks.generic(this, this._ticks)
  }
}
module.exports = Axis
