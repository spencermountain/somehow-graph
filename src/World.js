const Shape = require('./shapes/Shape')
const Line = require('./shapes/Line')
const YScale = require('./scales/YScale')
const XScale = require('./scales/Scale')
const XAxis = require('./axis/XAxis')
const YAxis = require('./axis/YAxis')
const fitAspect = require('fit-aspect-ratio')

class World {
  constructor(obj = {}) {
    this.el = obj.el
    this.aspect = obj.aspect || '3:4'
    let res = fitAspect(obj)
    this.width = res.width || 600
    this.height = res.height || 400
    console.log(this.height)
    this.shapes = []
    this.xScale = new XScale(obj, this)
    this.yScale = new YScale(obj, this) //.invert()
    this.xAxis = new XAxis({}, this)
    this.yAxis = new YAxis({}, this)
  }
  line(obj) {
    let line = new Line(obj, this)
    this.shapes.push(line)
    return line
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  fit() {}
  build() {
    let shapes = this.shapes.sort((a, b) => a.order > b.order ? 1 : -1)
    let elements = shapes.map(shape => shape.build())
    if (this.xAxis) {
      elements.push(this.xAxis.build())
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build())
    }
    elements = elements.join("\n");
    let attrs = {
      width: this.width,
      height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: 'border:1px solid lightgrey; overflow:visible;'
    }
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    this.el.innerHTML = `<svg ${attrs}>${elements}</svg>`;
  }
}
module.exports = World
