const scaleLinear = require('d3-scale').scaleLinear
// const spacetime = require('spacetime')

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 100

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.rescale()
  }
  rescale() {
    //give it a little bit of room..
    let max = this.max //* this.world.wiggle_room
    this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, max])
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
