const Scale = require('./scales/scale')
const Line = require('./shapes/line')
const Area = require('./shapes/area')
const Text = require('./shapes/text')
const Rect = require('./shapes/rect')
const Square = require('./shapes/square')
const XAxis = require('./shapes/xaxis')
const YAxis = require('./shapes/yaxis')
const spacetime = require('spacetime')

class World {
  constructor(obj = {}) {
    this.width = obj.width || 400
    this.height = obj.height || 300
    this.margin = obj.margin || 0
    this.x = new Scale({
      min: 0,
      max: 100
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
      <svg width="${this.width}" height="${this.height}" viewBox="0,0,100,100" preserveAspectRatio="xMidYMid meet" style="padding:${this.margin}; border:1px solid lightgrey; overflow:visible;">
        ${elements}
      </svg>
    `
  }

  isTime(str) {
    if (typeof str === 'string' && /[a-z]/i.test(str) && /[0-9]/i.test(str)) {
      return true
    }
    return false
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
    if (this.isTime(this.shapes[0].data[0].x)) {
      this.x.isTime(true)
      max.x = spacetime(max.x).epoch
      min.x = spacetime(min.x).epoch
    }
    if (this.isTime(this.shapes[0].data[0].y)) {
      this.y.isTime(true)
      max.y = spacetime(max.y).epoch
      min.y = spacetime(min.y).epoch
    }
    // max.x *= 1.10
    // max.y *= 1.10
    this.x.fit(min.x, max.x)
    this.y.fit(min.y, max.y)
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
