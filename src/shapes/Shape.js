// const flubber = require('flubber')
const d3Shape = require('d3-shape')
const colors = require('spencer-color')
const {parseX, parseY} = require('../parse')
const fns = require('../_fns')
const parseInput = require('./lib/parseInput')

const defaults = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality'
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this.id = obj.id
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this._shape = 1
  }
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) {
      this.set([
        [x, y]
      ])
      return this
    }
    //vertical line
    if (x || x === 0) {
      this.set([
        [x, '0%'],
        [x, '100%'],
      ])
      return this
    }
    //horizontal line
    if (y || y === 0) {
      this.set([
        ['0%', y],
        ['100%', y],
      ])
    }
    return this
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
  opacity(n) {
    this.attrs.opacity = n
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    return this
  }
  from(x, y) {
    this.data[0] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  to(x, y) {
    this.data[1] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
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
    let zero = this.world.y.place(parseY(0))
    let points = this.points()
    return d3Shape.area().x0(d => d[0]).y0(d => d[1]).y1(zero).curve(d3Shape.curveMonotoneX)(points);
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
    return h`<path ...${attrs} style="${this.drawSyle()}"/>`;
  }
}
module.exports = Shape
