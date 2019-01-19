const colors = require('spencer-color').colors
const Shape = require('./Shape')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': .25,
  'stroke-width': 1
}

class Rect extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this._rounded = 3
    this._width = undefined
    this._height = undefined
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  width(n) {
    this._width = n
    return this
  }
  height(n) {
    this._height = n
    return this
  }
  rounded(r) {
    this._rounded = r
  }
  build() {
    let h = this.world.html
    let points = this.points()
    let a = points[0]
    let b = points[1] || 0
    let width = Math.abs(b[0] - a[0])
    let height = Math.abs(b[1] - a[1])
    if (this._width !== undefined) {
      width = this._width
    }
    if (this._height !== undefined) {
      height = this._height
    }
    let attrs = Object.assign({}, this.attrs, {
      x: a[0],
      y: a[1] - height,
      width: width,
      height: height,
      rx: this._rounded,
    })
    return h`<rect ...${attrs} >
      <title>${this._title}</title>
    </rect>`; //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
  }
}

module.exports = Rect
