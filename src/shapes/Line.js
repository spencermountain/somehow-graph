const colors = require('spencer-color')
const d3Shape = require('d3-shape')
const Shape = require('./Shape')
const {parseX, parseY} = require('../parse')

const defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
}

class Line extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = parseX(num, this.world)
    return this
  }
  setDefault() {
    if (this.data.length < 2) {
      this.data = [{}, {}]
    }
    this.data[0].x = this.data[0].x || this.world.x.min
    this.data[0].y = this.data[0].y || this.world.y.min
    this.data[1].x = this.data[1].x || this.world.x.max
    this.data[1].y = this.data[1].y || this.world.y.max
    return this
  }
  at(x, y) {
    this.setDefault()
    if (x !== null && x !== undefined) {
      this.data = this.data.map((o) => {
        o.x = parseX(x, this.world)
        return o
      })
    }
    if (y !== null && y !== undefined) {
      this.data = this.data.map((o) => {
        o.y = parseY(y, this.world)
        return o
      })
    }
    return this
  }
  path() {
    let points = this.points()
    return d3Shape.line().x(d => d[0]).y(d => d[1]).curve(d3Shape.curveMonotoneX)(points);
  }
}

module.exports = Line
