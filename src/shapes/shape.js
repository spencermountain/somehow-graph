const d3Shape = require('d3-shape')
const fns = require('./lib/fns')
const spacetime = require('spacetime')

class Shape {
  constructor(data, obj, world) {
    this.obj = obj || {}
    this.world = world
    this.order = this.obj.order || 1
    this.defaults = {
      stroke: 'steelblue',
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round" //"butt"
    }
    this.data = this.preProcess(data)
  }
  preProcess(data) {
    if (fns.isObject(data)) {
      data = [data]
    }
    data = data.map((o, i) => {
      if (typeof o === 'number') {
        return {
          x: i,
          y: o
        }
      }
      if (this.world.x.type === 'time') {
        o.x = spacetime(o.x).epoch
      }
      if (this.world.y.type === 'time') {
        o.y = spacetime(o.y).epoch
      }
      return o
    })
    return data
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
