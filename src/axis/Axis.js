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
  }
  ticks(n = 6) {
    if (this.scale.format() === 'date') {
      return ticks.date(this, n)
    }
    return ticks.generic(this, n)
  }
}
module.exports = Axis
