const fitAspect = require('fit-aspect-ratio')
const methods = require('./methods')
const YScale = require('./scales/YScale')
const XScale = require('./scales/Scale')
const XAxis = require('./axis/XAxis')
const YAxis = require('./axis/YAxis')

const Shape = require('./shapes/Shape')
const Line = require('./shapes/Line')
const Text = require('./shapes/Text')
const Dot = require('./shapes/Dot')

class World {
  constructor(obj = {}) {
    this.el = obj.el
    this.aspect = obj.aspect || '3:4'
    let res = fitAspect(obj)
    this.width = res.width || 600
    this.height = res.height || 400
    this.shapes = []
    //give the points a little bit of space.
    this.wiggle_room = 1.05
    this.x = new XScale(obj, this)
    this.y = new YScale(obj, this)
    this.xAxis = new XAxis({}, this)
    this.yAxis = new YAxis({}, this)
  }
  line(obj) {
    let line = new Line(obj, this)
    this.shapes.push(line)
    return line
  }
  dot(obj) {
    let dot = new Dot(obj, this)
    this.shapes.push(dot)
    return dot
  }
  text(obj) {
    let text = new Text(obj, this)
    this.shapes.push(text)
    return text
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  build() {
    let shapes = this.shapes.sort((a, b) => a._order > b._order ? 1 : -1)
    let elements = []
    if (this.xAxis) {
      elements.push(this.xAxis.build())
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build())
    }
    elements = elements.concat(shapes.map(shape => shape.build()))
    elements = elements.join("\n");
    let attrs = {
      width: this.width,
      height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: ' overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;
    }
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    this.el.innerHTML = `<svg ${attrs}>${elements}</svg>`;
  }
}
Object.keys(methods).forEach((k) => {
  World.prototype[k] = methods[k]
})
module.exports = World
