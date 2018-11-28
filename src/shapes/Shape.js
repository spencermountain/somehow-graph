const flubber = require('flubber')
const colors = require('spencer-color')
const {parseX, parseY} = require('../parse')
const fns = require('../_fns')

const defaults = {
  fill: 'red',
  stroke: colors.blue,
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this.attrs = Object.assign({}, defaults, obj)
    this._shape = 1
  }
  extent() {
    let xArr = this.data.map((o) => o.x)
    let yArr = this.data.map((o) => o.y)
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr),
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  at(x, y) {
    this.data[0] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
  }
  from(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    this.data.unshift({
      x: x,
      from: 'from',
      y: y
    })
    return this
  }
  to(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    let last = this.data.length - 1
    //don't overwrite the first one
    if (last === 0) {
      last = 1
    }
    this.data[last] = {
      x: x,
      y: y
    }
    return this
  }
  //..sort the point by x-value before adding it
  add(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    let obj = {
      x: x,
      y: y
    }
    let index = this.data.findIndex((d) => d.x > obj.x)
    if (index === -1) {
      this.data.push(obj)
    } else {
      this.data.splice(index, 0, obj)
    }
    return this
  }
  //add this to the end
  append(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    this.data.push({
      x: x,
      y: y
    })
    return this
  }
  //x,y coordinates
  points() {
    let {xScale, yScale} = this.world
    let points = this.data.map((o) => [xScale.scale(o.x), yScale.scale(o.y)])
    // console.log(this.data)
    return points
  }
  path() {
    return flubber.toPathString(this.points())
  }
  build() {
    let attrs = Object.assign({}, this.attrs, {
      d: this.path(),
    })
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    return `<path ${attrs} />`;
  }
}
module.exports = Shape
