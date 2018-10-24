const d3Shape = require('d3-shape')

class Line {
  constructor(obj = {}, world) {
    this.state = {
      points: [],
      color: obj.color || 'slategrey',
      'stroke-linecap': "round"
    }
    this.world = world
  }
  max() {
    let keep = {
      x: null,
      y: null,
    }
    this.state.points.forEach((o) => {
      if (keep.x === null || keep.x < o.x) {
        keep.x = o.x
      }
      if (keep.y === null || keep.y < o.y) {
        keep.y = o.y
      }
    })
    console.log(keep)
    return keep
  }
  min() {
    let keep = {
      x: null,
      y: null,
    }
    this.state.points.forEach((o) => {
      if (keep.x === null || keep.x > o.x) {
        keep.x = o.x
      }
      if (keep.y === null || keep.y > o.y) {
        keep.y = o.y
      }
    })
    return keep
  }
  //set first point
  from(x, y) {
    this.state.points[0] = {
      x: x,
      y: y
    }
    return this
  }
  //set last point
  to(x, y) {
    let state = this.state
    let last = 1
    if (state.points.length > 1) {
      last = state.points.length - 1
    }
    state.points[last] = {
      x: x,
      y: y
    }
    return this
  }
  add(x, y) {
    this.state.points.push({
      x: x,
      y: y
    })
    return this
  }
  data(arr) {
    if (arr && typeof arr[0] === 'number') {
      arr = arr.map((num, i) => {
        return {
          y: num,
          x: i
        }
      })
    }
    this.state.points = arr
    return this
  }
  color(str) {
    this.state.color = str
    return this
  }
  makePath() {
    let state = this.state
    let world = this.world
    let points = state.points.map((o) => {
      return {
        x: world.x.set(o.x),
        y: world.y.set(o.y)
      }
    })
    return d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(points) || ''
  }
  render() {
    let state = this.state
    let attrs = {
      d: this.makePath(),
      stroke: state.color,
      'shape-rendering': 'geometricPrecision',
      fill: 'none',
      'stroke-linecap': state['stroke-linecap']
    }
    attrs = Object.keys(attrs).reduce((str, k) => {
      return str + ` ${k}="${attrs[k]}"`
    }, '');
    return `<path${attrs}></path>`
  }
}
module.exports = Line
