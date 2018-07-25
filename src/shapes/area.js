const Shape = require('./shape')
const d3Shape = require('d3-shape')

class Area extends Shape {
  constructor(data, obj, world) {
    super(data, obj, world);
    this.defaults = {
      fill: obj.stroke
    }
  }
  makePath() {
    let points = this.data.map((o) => {
      return {
        x: this.world.x.scale(o.x),
        y: this.world.y.scale(o.y),
      }
    })
    const zero = this.world.y.scale(0)
    return d3Shape.area().x(d => d.x).y0(d => d.y).y1(zero).curve(d3Shape.curveMonotoneX)(points);
  }
}
module.exports = Area
