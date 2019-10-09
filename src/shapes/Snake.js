const colors = require('spencer-color').colors
const d3Shape = require('d3-shape')
const Shape = require('./Shape')
const parseInput = require('./lib/parseInput')

const defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
}

class Snake extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  dotted(n) {
    if (n === true) {
      n = 4
    }
    this.attrs['stroke-dasharray'] = n || 4
    return this
  }
  set(str) {
    let data = parseInput(str, this.world)
    let more = []
    // make it into a snake-form
    data.forEach((obj, i) => {
      more.push(obj)
      if (data[i + 1]) {
        more.push({
          x: obj.x,
          y: data[i + 1].y
        })
      }
    })
    this.data = more
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
      .y(d => d[1])(points)
  }
}

module.exports = Snake
