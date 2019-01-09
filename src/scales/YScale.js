const Scale = require('./Scale')
const scaleLinear = require('./_linear')
// const scaleLinear = require('d3-scale').scaleLinear
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
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.max, this.min]
    })
  }
}
module.exports = YScale
