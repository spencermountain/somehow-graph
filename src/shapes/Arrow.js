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
  getAngle(start, end) {
    let p1 = {
      x: start[0],
      y: start[1],
    }
    let p2 = {
      x: end[0],
      y: end[1],
    }
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    console.log('radian: ', angleRadians)
    // angle in degrees
    var angleDeg = angleRadians * 180 / Math.PI;
    console.log('angle:', angleDeg)

    return angleRadians
  }
  head(start, end) {
    let h = this.world.html
    let radian = this.getAngle(start, end)
    let length = 50
    //---soh cah toa--
    //sin(angle) = opp/hyp
    //opp = sin(angle)*length
    let opp = Math.sin(radian) * length
    //cos(angle) = adj/length
    //adj = cos(angle)*length
    let adj = Math.cos(radian) * length
    console.log(adj)
    let x = start[0] - adj
    let y = start[1] - opp
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${x} y2=${y} stroke="darkred" stroke-width="5"/>
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
