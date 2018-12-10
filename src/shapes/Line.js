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
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) { //hmm
    }
    //vertical line
    if (x || x === 0) {
      this.set([
        [x, '0%'],
        [x, '100%'],
      ])
    }
    //horizontal line
    if (y || y === 0) {
      this.set([
        ['0%', y],
        ['100%', y],
      ])
    }
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
