const flubber = require('flubber')
const colors = require('spencer-color')
// const {parseX, parseY} = require('../parse')
const fns = require('../_fns')
const parseInput = require('./lib/parseInput')

const defaults = {
  fill: 'red',
  stroke: colors.blue,
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this._shape = 1
  }
  extent() {
    // let points = this.points()
    // let xArr = points.map((a) => a[0])
    // let yArr = points.map((a) => a[1])
    let xArr = []
    let yArr = []
    this.data.forEach((o) => {
      if (o.x.type !== 'pixel') {
        xArr.push(o.x.value)
      }
      if (o.y.type !== 'pixel') {
        yArr.push(o.y.value)
      }
    })
    // this.data.map((o) => o.x.value)
    // let yArr = this.data.map((o) => o.y.value)
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr),
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    return this
  }
  //x,y coordinates
  points() {
    let {x, y} = this.world
    let points = this.data.map((o) => {
      return [x.place(o.x), y.place(o.y)]
    })
    return points
  }
  path() {
    return flubber.toPathString(this.points())
  }
  drawSyle() {
    return Object.keys(this.style).map((k) => {
      return `${k}:${this.style[k]};`
    }).join(' ')
  }
  build() {
    let h = this.world.html
    let attrs = Object.assign({}, this.attrs, {
      d: this.path(),
    })
    return `<path ...${attrs} style="${this.drawSyle()}"/>`;
  }
}
module.exports = Shape
