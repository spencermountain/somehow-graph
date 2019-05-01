const Area = require('./Area')
const { parseY } = require('../parse')
const parseInput = require('./lib/parseInput')
const d3Shape = require('d3-shape')

class Midarea extends Area {
  constructor(obj, world) {
    super(obj, world)
    this._zero = this.world.y.place(parseY(0))
  }
  zero(y) {
    this._zero = y
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    //add the bottom part, to data
    this.data.forEach(o => {
      o.y.value /= 2
      o.y2 = Object.assign({}, o.y)
      o.y2.value *= -1
    })
    return this
  }
  topLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  bottomLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[2])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html
    this.onMount()
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}">
      <title>${this._title}</title>
    </path>`
    if (!this._line) {
      return area
    }
    let points = this.points()

    //draw a line on top
    let topLine = Object.assign({}, this.attrs, {
      d: this.topLine(points),
      fill: 'none'
    })
    topLine = h`<path ...${topLine} style="${this.drawSyle()}"/>`

    //draw a line on the bottom
    let bottomLine = Object.assign({}, this.attrs, {
      d: this.bottomLine(points),
      fill: 'none'
    })
    bottomLine = h`<path ...${bottomLine} style="${this.drawSyle()}"/>`
    return [topLine, area, bottomLine]
  }
}
module.exports = Midarea
