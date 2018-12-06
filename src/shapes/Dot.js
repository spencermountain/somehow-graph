const colors = require('spencer-color')
// const d3Shape = require('d3-shape')
const Shape = require('./Shape')

const defaults = {
  fill: colors.blue,
  stroke: 'none'
}

class Dot extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this._radius = obj.radius || 5
  }
  radius(r) {
    this._radius = r
  }
  build() {
    let h = this.world.html
    let point = this.points()[0]
    let attrs = Object.assign({}, this.attrs, {
      cx: point[0],
      cy: point[1],
      r: this._radius,
    })
    return h`<circle ...${attrs} />`;
  }
}

module.exports = Dot
