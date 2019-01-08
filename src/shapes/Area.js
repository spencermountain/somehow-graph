const colors = require('spencer-color').colors
const Shape = require('./Shape')
const d3Shape = require('d3-shape')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': .25,
  'stroke-width': 2
}

class Area extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this._line = 2
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  line(num) {
    this._line = num
  }
  linePath() {
    let points = this.points()
    return d3Shape.line().x(d => d[0]).y(d => d[1]).curve(d3Shape.curveMonotoneX)(points);
  }
  build() {
    let h = this.world.html
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.path(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}"/>`;
    if (!this._line) {
      return area
    }
    //draw a line on top
    let lineAttr = Object.assign({}, this.attrs, {
      d: this.linePath(),
      fill: 'none'
    })
    let line = h`<path ...${lineAttr} style="${this.drawSyle()}"/>`;
    return [line, area]
  }
}

module.exports = Area
