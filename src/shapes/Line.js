const colors = require('spencer-color')
const d3Shape = require('d3-shape')
const Shape = require('./Shape')
// const {parseX, parseY} = require('../parse')

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
  dotted(n) {
    if (n === true) {
      n = 4
    }
    this.attrs['stroke-dasharray'] = n || 4
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num //parseX(num, this.world)
    return this
  }
  path() {
    let points = this.points()
    return d3Shape.line().x(d => d[0]).y(d => d[1]).curve(d3Shape.curveMonotoneX)(points);
  }
}

module.exports = Line
