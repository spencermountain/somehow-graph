const d3Shape = require('d3-shape')
const fns = require('./lib/fns')

class Shape {
  constructor(data, obj, world) {
    this.data = this.preProcess(data)
    this.obj = obj || {}
    this.world = world
    this.order = this.obj.order || 1
    this.defaults = {
      stroke: 'steelblue',
      "stroke-width": "4",
      fill: "none"
    }
  }
  preProcess(data) {
    if (fns.isObject(data)) {
      data = [data]
    }
    return data.map((o, i) => {
      if (typeof o === 'number') {
        return {
          x: i,
          y: o
        }
      }
      return o
    })
  }
  makePath() {
    let points = this.data.map((o) => {
      return {
        x: this.world.x.scale(o.x),
        y: this.world.y.scale(o.y),
      }
    })
    return d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(points);
  }
  build() {
    let attrs = Object.assign({}, this.defaults, this.obj)
    attrs.d = this.makePath()
    let inside = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    return `<path ${inside}></path>`
  }
}
module.exports = Shape
