const Shape = require('./shape')
const d3Shape = require('d3-shape')

class Square extends Shape {
  constructor(data, obj, world) {
    super(data, obj, world);
    this.defaults = {
      fill: obj.fill || obj.stroke || 'steelblue'
    }
  }
  makePath() {
    let point = this.data[0]
    let world = this.world
    let len = (100 - world.y.scale(point.size)) / 2
    let mid = {
      x: world.x.scale(point.x),
      y: world.y.scale(point.y),
    }
    let points = [
      { //top-left
        x: mid.x - len,
        y: mid.y - len
      },
      { //top-right
        x: mid.x + len,
        y: mid.y - len
      },
      { //bottom-right
        x: mid.x + len,
        y: mid.y + len
      },
      { //bottom-left
        x: mid.x - len,
        y: mid.y + len
      },
    ]
    let path = d3Shape.area().x(d => d.x).y1(d => d.y)(points);
    return path
  }
}
module.exports = Square
