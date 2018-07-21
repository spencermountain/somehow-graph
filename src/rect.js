const d3Shape = require('d3-shape')
const d3Scale = require('d3-scale')
const max = require('./lib/max')

class Rect {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.xScale = null
    this.yScale = null
  }
  scale(data) {
    this.xScale = d3Scale.scaleLinear().range([0, width]).domain([0, 10])
    this.yScale = d3Scale.scaleLinear().range([0, height]).domain([100, 0]) //(inverted)
    return this
  }
  line(data) {
    this.xScale.domain([0, data.length - 1])
    this.yScale.domain([max(data), 0]) //(inverted)
    data = data.map((d, i) => {
      return {
        x: this.xScale(i),
        y: this.yScale(d),
      }
    })
    return d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(data);
  }
  area(data) {
    const zero = this.yScale(0)
    return d3Shape.area().x(d => d.x).y0(d => d.y).y1(zero).curve(d3Shape.curveMonotoneX)(data);
  }
}

module.exports = Rect
