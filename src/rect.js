const d3Shape = require('d3-shape')
const d3Scale = require('d3-scale')
const max = require('./lib/max')

class Rect {
  constructor(width, height) {
    this.xScale = d3Scale.scaleLinear().range([0, width]).domain([0, 10])
    this.yScale = d3Scale.scaleLinear().range([0, height]).domain([0, 100])
  }
  line(data) {
    this.xScale.domain([0, data.length - 1])
    this.yScale.domain([0, max(data)])
    data = data.map((d, i) => {
      return {
        x: this.xScale(i),
        y: this.yScale(d),
      }
    })
    return d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(data);
  }
}

module.exports = Rect
