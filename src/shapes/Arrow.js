const colors = require('spencer-color').colors
const d3Shape = require('d3-shape')
const Shape = require('./Shape')

const defaults = {
  fill: 'none',
  stroke: colors.grey,
  'stroke-width': 3,
  'stroke-linecap': 'round',
  'shape-rendering': 'optimizeQuality'
}

class Arrow extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._length = 35
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  from(x, y) {
    this.set([this._data[0], [x, y]])
  }
  length(num) {
    this._length = num
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  getLength(start, end) {
    let x = start[0] - end[0]
    let y = start[1] - end[1]
    let h = Math.pow(x, 2) + Math.pow(y, 2) //x^2 + y^2 = h^2
    h = Math.sqrt(h)
    return h
  }
  getAngle(start, end) {
    let p1 = {
      x: start[0],
      y: start[1]
    }
    let p2 = {
      x: end[0],
      y: end[1]
    }
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    return angleRadians
  }
  head(start, end) {
    let h = this.world.html
    let radian = this.getAngle(start, end)
    let leftAngle = radian - Math.PI / 4
    let rightAngle = radian + Math.PI / 4
    let length = this.getLength(start, end)
    length = length * 0.2
    //---soh cah toa--
    let left = {
      opp: Math.sin(leftAngle) * length,
      adj: Math.cos(leftAngle) * length
    }
    let right = {
      opp: Math.sin(rightAngle) * length,
      adj: Math.cos(rightAngle) * length
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + left.adj} y2=${start[1] + left.opp} ...${
      this.attrs
    }/>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + right.adj} y2=${start[1] +
      right.opp} ...${this.attrs}/>
    </g>`
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let start = points[0]
    let end = points[1]
    if (!end) {
      end = [start[0] - this._length, start[1]]
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${end[0]} y2=${end[1]} ...${this.attrs}/>
      ${this.head(start, end)}
    </g>`
  }
}

module.exports = Arrow
