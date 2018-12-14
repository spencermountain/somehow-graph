const colors = require('spencer-color')
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
    this._rounded = 5
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  rounded(r) {
    this._rounded = r
  }
  build() {
    let h = this.world.html
    let points = this.points()
    let a = points[0]
    console.log(points)
    let attrs = Object.assign({}, this.attrs, {
      x: a[0],
      y: a[1],
      width: 50,
      height: 50,
      rx: this._rounded,
    })
    return h`<rect ...${attrs} />`; //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
  }
}

module.exports = Rect
