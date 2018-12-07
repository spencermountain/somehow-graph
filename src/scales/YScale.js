const Scale = require('./Scale')
const scaleLinear = require('d3-scale').scaleLinear
const {parseY} = require('../parse')


class YScale extends Scale {
  constructor(data, world) {
    super(data, world);
    //use height instead of width
    this.to = world.height
    this.is_y = true
    this.parse = parseY
    this.rescale()
  }
  rescale() {
    let max = this.max //* this.world.wiggle_room
    this.scale = scaleLinear().range([this.from, this.to]).domain([max, this.min])
  }
}
module.exports = YScale
