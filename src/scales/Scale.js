const scaleLinear = require('d3-scale').scaleLinear

class Scale {
  constructor(data, world) {
    this.min = 0
    this.max = 100

    this.from = 0
    this.to = world.width
    this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, this.max])
  }

}

module.exports = Scale
