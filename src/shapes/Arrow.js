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
    super(obj, world);
    this._length = 35
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  from(x, y) {
    this.set([
      this._data[0],
      [x, y]
    ])
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
    return d3Shape.line().x(d => d[0]).y(d => d[1]).curve(this.curve)(points);
  }
  getSlope(start, end) {
    let xDiff = start[0] - end[0]
    let yDiff = start[1] - end[1] //remember this is backwards
    if (yDiff === 0) {
      return 0
    }
    if (xDiff === 0) {
      return null
    }
    let slope = xDiff / yDiff
    return slope
  }
  head(start, end) {
    let h = this.world.html
    let diff = 20
    let slope = this.getSlope(start, end)
    let x = start[0] + diff
    let y;

    if (slope === 0) {
      console.log('horizontal')
      y = start[1]
    } else if (slope === null) {
      console.log('vertical')
      y = start[1] - diff
      x = start[0]
    } else {
      y = start[1] + (diff / slope)
    }
    let one = [x, y]

    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${one[0]} y2=${one[1]} stroke="darkred" stroke-width="5"/>
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
    </g>`;
  }
}

module.exports = Arrow
