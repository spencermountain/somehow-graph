const colors = require('spencer-color').colors
const Shape = require('./Shape')
const d3Shape = require('d3-shape')
const {parseY} = require('../parse')

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
  areaPath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape.area().x(d => d[0]).y(d => d[1]).y1(d => d[2]).curve(this.curve)(points);
    }
    let zero = this.world.y.place(parseY(0))
    return d3Shape.area().x0(d => d[0]).y0(d => d[1]).y1(zero).curve(this.curve)(points);
  }
  linePath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape.area().x(d => d[0]).y(d => d[1]).y1(d => d[2]).curve(this.curve)(points);
    }
    return d3Shape.area().x(d => d[0]).y(d => d[1]).curve(this.curve)(points);
  }
  build() {
    let h = this.world.html
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
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
    let line = h`<path ...${lineAttr} style="${this.drawSyle()}">
        <title>${this._title}</title>
      </path>`;
    return [line, area]
  }
}

module.exports = Area
