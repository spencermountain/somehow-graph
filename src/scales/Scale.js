const scaleLinear = require('d3-scale').scaleLinear
const {parseX} = require('../parse')
// const spacetime = require('spacetime')

const has = function(x) {
  return x !== undefined && x !== null
}

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = null
    this.max = null

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.parse = parseX
    this.rescale()
  }
  rescale() {
    //give it a little bit of room..
    let max = this.max //* this.world.wiggle_room
    this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, max])
  }
  fit(a, b) {
    if (has(a) === true) {
      let num = this.parse(a, this.world).value
      if (num > this.max || this.max === null) {
        this.max = num
      }
      if (num < this.min || this.min === null) {
        this.min = num
      }
    }
    if (has(b) === true) {
      let num = this.parse(b, this.world).value
      if (num > this.max || this.max === null) {
        this.max = num
      }
      if (num < this.min || this.min === null) {
        this.min = num
      }
    }
    this.rescale()
  }
  place(obj) {
    //from=top
    //to=bottom
    if (obj.type === 'pixel') {
      return this.to - obj.value
    }
    if (obj.type === 'percent') {
      let num = this.byPercent(obj.value)
      return this.scale(num)
    }
    return this.scale(obj.value)
  }
  byPercent(num = 0) {
    if (num > 1) {
      num = num / 100
    }
    let diff = this.max - this.min
    return (diff * num) + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    this._format = format
    return this
  }
}

module.exports = Scale
