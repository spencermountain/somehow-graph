const colors = require('spencer-color')
const d3Shape = require('d3-shape')
const Shape = require('./Shape')
// const {parseX, parseY} = require('../parse')

const defaults = {
  fill: colors.green,
  stroke: 'none',
  'stroke-linecap': 'round'
}

class Bar extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  
  width(num) {
    return this
  }
  path() {
    let points = this.points()
    return d3Shape.line().x(d => d[0]).y(d => d[1])(points);
  }
}

module.exports = Bar
