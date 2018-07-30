const Scale = require('./scale')
const Line = require('./shapes/line')
const Area = require('./shapes/area')
const Text = require('./shapes/text')
const Rect = require('./shapes/rect')
const Square = require('./shapes/square')
const XAxis = require('./shapes/xaxis')
const YAxis = require('./shapes/yaxis')
const spacetime = require('spacetime')

class World {
  constructor() {
    this.x = new Scale({
      type: 'time',
      min: 'Jan 1st, 2018',
      max: 'Jan 31st, 2018'
    })
    this.y = new Scale({
      max: 100,
      min: 0
    }).reverse()
    this.shapes = []
    this.colors = ["#cf66ae", "#66aecc", "#66cc84", "#b3d7e6", "#d7e6b3", "#e6c2b3"]
  }
  build() {
    let shapes = this.shapes.sort((a, b) => {
      if (a.order > b.order) {
        return 1
      }
      return -1
    })
    let elements = shapes.map((shape) => shape.build()).join('\n')
    return `
      <svg width="800" height="400" viewBox="0,0,100,100" preserveAspectRatio="xMidYMid meet" style="padding:3rem; border:1px solid lightgrey; overflow:visible;">
        ${elements}
      </svg>
    `
  }

  fit() {
    let max = {
      x: null,
      y: null,
    }
    let min = {
      x: null,
      y: null,
    }
    this.shapes.forEach((shape) => {
      shape.data.forEach((o) => {
        if (o.x > max.x || max.x === null) {
          max.x = o.x
        }
        if (o.x < min.x || min.x === null) {
          min.x = o.x
        }
        if (o.y > max.y || max.y === null) {
          max.y = o.y
        }
        if (o.y < min.y || min.y === null) {
          min.y = o.y
        }
      })
    })
    // max.x *= 1.10
    // max.y *= 1.10
    this.x.fit(min.x, max.x)
    this.y.fit(max.y, min.y)
  }

  addLine(data, obj = {}) {
    let shape = new Line(data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addArea(data, obj = {}) {
    let shape = new Area(data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addText(str, data, obj = {}) {
    let shape = new Text(str, data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addRect(data, obj = {}) {
    let shape = new Rect(data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addSquare(data, obj = {}) {
    let shape = new Square(data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addXAxis(data, obj = {}) {
    let shape = new XAxis(data, obj, this)
    this.shapes.push(shape)
    return this
  }
  addYAxis(data, obj = {}) {
    let shape = new YAxis(data, obj, this)
    this.shapes.push(shape)
    return this
  }


}
module.exports = World
