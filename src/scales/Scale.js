const scaleLinear = require('d3-scale').scaleLinear

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 100

    this.from = 0
    this.to = world.width
    this.rescale()
  }
  rescale() {
    //give it a little bit of room..
    let max = this.max * this.world.wiggle_room
    this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, max])
  }

}

module.exports = Scale
