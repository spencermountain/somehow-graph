const colors = require('spencer-color')
const ticks = require('./_ticks')
const drawTick = require('./_custom')

const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
}


class Axis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
    this.scale = null
    this._tickCount = 6
    this._fmt = undefined
    this._given = undefined
    this._show = true
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  remove() {
    this._show = false
    return this
  }
  format(str) {
    this._fmt = str
    return this
  }
  show() {
    this._show = true
    return this
  }
  ticks(n) {
    if (typeof n === 'number') {
      this._tickCount = n
    } else if (typeof n === 'object') {
      this._given = n
    }
    if (this._given) {
      return this._given.map((o) => drawTick(o, this))
    }
    if (this.scale.format() === 'date') {
      return ticks.date(this, this._tickCount)
    }
    return ticks.generic(this, this._tickCount)
  }
}
module.exports = Axis
