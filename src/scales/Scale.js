// const scaleLinear = require('d3-scale').scaleLinear
const scaleLinear = require('./_linear')
const { parseX } = require('../parse')

const has = function(x) {
  return x !== undefined && x !== null
}

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 1

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.parse = parseX
    this.is_y = false
    this._clip = false
    this.rescale()
  }
  rescale() {
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.min, this.max]
    })
    return this
  }
  fit(a, b) {
    if (has(a) === false && has(b) === false) {
      if (this.is_y) {
        this.world.fitY()
      } else {
        this.world.fitX()
      }
      this.rescale()
      return this
    }
    if (has(a) === true) {
      let num = this.parse(a, this.world).value
      this.min = num
    }
    if (has(b) === true) {
      let num = this.parse(b, this.world).value
      this.max = num
    }
    this.rescale()
    return this
  }
  place(obj) {
    //from=top
    //to=bottom
    if (obj.type === 'pixel') {
      if (this.is_y) {
        return this.to - obj.value //flip grid
      }
      return obj.value
    }
    if (obj.type === 'percent') {
      let num = this.byPercent(obj.value)
      return this.scale(num)
    }
    return this.scale(obj.value)
  }
  byPercent(num = 0) {
    num = num / 100
    let diff = this.max - this.min
    return diff * num + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    this._format = format
    return this
  }
  clip(bool) {
    if (bool === undefined) {
      bool = true
    }
    this._clip = bool
  }
}

module.exports = Scale
