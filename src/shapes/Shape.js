const flubber = require('flubber')
const {parseX, parseY} = require('../parse')
const fns = require('../_fns')

const defaults = {
  fill: 'red',
  stroke: 'steelblue',
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this.attrs = Object.assign({}, defaults, obj)
  }
  extent() {
    let xArr = this.data.map((o) => o.x)
    let yArr = this.data.map((o) => o.y)
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr),
    }
  }
  from(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    this.data[0] = {
      x: x,
      y: y
    }
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
  //..sort the point before adding it
  add(x, y) {
    x = parseX(x, this.world)
    y = parseY(y, this.world)
    let obj = {
      x: x,
      y: y
    }
    for (let i = 0; i < this.data.length; i += 1) {
      if (obj.x > this.data[i].x) {
        this.data.splice(i, 0, obj)
        break
      }
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
    // console.log(xScale.scale.domain())
    // console.log(xScale.scale.range())
    // console.log(xScale.scale(350))
    // return this.data.map((o) => [o.x, o.y])
    return this.data.map((o) => [xScale.scale(o.x), yScale.scale(o.y)])
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
