const d3Shape = require('d3-shape')

class Rect {
  constructor(obj = {}, world) {
    this.state = {
      x: obj.x || 0,
      y: obj.y || 0,
      height: obj.height || 0,
      width: obj.width || 0,
      color: obj.color || 'steelblue',
      border: obj.color || 'lightgrey',
      'stroke-linecap': "round"
    }
    this.world = world
  }
  max() {
    let state = this.state
    return {
      x: state.x + state.width,
      y: state.y + state.height
    }
  }
  min() {
    let state = this.state
    return {
      x: state.x,
      y: state.y
    }
  }
  from(x, y) {
    this.state.x = x
    if (y !== undefined) {
      this.state.y = y
    }
    return this
  }
  to(x, y) {
    let state = this.state
    state.width = x - state.x
    if (y !== undefined) {
      state.height = y - state.y
    }
    return this
  }
  color(str) {
    this.state.color = str
    return this
  }
  width(w) {
    this.state.width = w
    return this
  }
  height(h) {
    this.state.height = h
    return this
  }
  center(x, y) {
    let state = this.state
    state.x = x - (state.width / 2)
    state.y = y - (state.height / 2)
    return this
  }

  makePath() {
    let state = this.state
    let world = this.world
    let points = [
      { //top-left
        x: state.x,
        y: state.y
      },
      { //top-right
        x: state.x + state.width,
        y: state.y
      },
      { //bottom-right
        x: state.x + state.width,
        y: state.y + state.height
      },
      { //bottom-left
        x: state.x,
        y: state.y + state.height
      },
      { //top-left (again)
        x: state.x,
        y: state.y
      },
    ]
    points = points.map((o) => {
      o.x = world.x.set(o.x)
      o.y = world.y.set(o.y)
      return o
    })
    return d3Shape.line().x(d => d.x).y(d => d.y)(points); //.curve(d3Shape.curveMonotoneX)
  }
  render() {
    let state = this.state
    let attrs = {
      d: this.makePath(),
      fill: state.color,
      stroke: state.border,
      'stroke-linecap': state['stroke-linecap']
    }
    attrs = Object.keys(attrs).reduce((str, k) => {
      return str + ` ${k}="${attrs[k]}"`
    }, '');
    return `<path${attrs}></path>`
  }
}
module.exports = Rect
