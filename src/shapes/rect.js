const Shape = require('./shape')
const d3Shape = require('d3-shape')

class Rect extends Shape {
  constructor(data, obj, world) {
    super(data, obj, world);
    this.defaults = {
      fill: obj.fill || obj.stroke || 'steelblue'
    }
    this.shape='Rect'
  }
  makePath() {
    let point = this.data[0]
    let world = this.world
    let w = world.x.scale(point.width) / 2
    let h = (100 - world.y.scale(point.height)) / 2 //height needs to be un-inverted
    let mid = {
      x: world.x.scale(point.x),
      y: world.y.scale(point.y),
    }
    let points = [
      { //top-left
        x: mid.x - w,
        y: mid.y - h
      },
      { //top-right
        x: mid.x + w,
        y: mid.y - h
      },
      { //bottom-right
        x: mid.x + w,
        y: mid.y + h
      },
      { //bottom-left
        x: mid.x - w,
        y: mid.y + h
      },
    ]
    let path = d3Shape.area().x(d => d.x).y1(d => d.y)(points)
    return path
  }
}
module.exports = Rect
