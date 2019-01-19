const colors = require('spencer-color').colors
const Rect = require('./Rect')
const {parseX, parseY} = require('../parse')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 1,
  'stroke-width': 1
}

class Bar extends Rect {
  constructor(obj, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this._rounded = 1
    this._width = 5
    this._zero = 0
  }
  width(w) {
    this._width = w
    return this
  }
  //point that it flips on
  zero(w) {
    this._zero = w
    return this
  }
  at(x, y) {
    this.data = [
      {
        x: parseX(x, this.world),
        y: parseY(0, this.world)
      },
      {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      }
    ]
    return this
  }
  build() {
    let h = this.world.html
    let points = this.points()
    let bottom = points[0][1]
    if (points[0][1] > points[1][1]) {
      bottom = points[1][1]
    }
    let height = Math.abs(points[1][1] - points[0][1])
    let attrs = Object.assign({}, this.attrs, {
      x: points[0][0],
      y: bottom,
      width: this._width,
      height: height,
      rx: this._rounded,
      title: this._title
    })
    return h`<rect ...${attrs} >
        <title>${this._title}</title>
      </rect>`;
  }
}
module.exports = Bar
