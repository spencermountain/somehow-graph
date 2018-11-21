const flubber = require('flubber')

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = []
  }
  //x,y coordinates
  points() {
    let {xScale, yScale} = this.world
    return this.data.map((o) => [xScale(o.x), yScale(o.y)])
  }
  path() {
    return flubber.toPathString(this.points())
  }
}
module.exports = Shape
