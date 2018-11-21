const Shape = require('./shapes/Shape')
const YScale = require('./scales/YScale')
const XScale = require('./scales/Scale')
const fitAspect = require('fit-aspect-ratio')

class World {
  constructor(obj = {}) {
    this.el = obj.el
    this.aspect = obj.aspect || '3:4'
    let res = fitAspect(obj)
    this.width = res.width || 600
    this.height = res.height || 400
    this.shapes = []
    this.xScale = new YScale(obj, this)
    this.yScale = new XScale(obj, this)
  }
  line(obj) {
    let line = new Shape(obj)
    this.shapes.push(line)
    return this
  }
  fit() {}
  build() {
    let shapes = this.shapes.sort((a, b) => a.order > b.order ? 1 : -1)
    let elements = shapes.map(shape => shape.build()).join("\n");
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
