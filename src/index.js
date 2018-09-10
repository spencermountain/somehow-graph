const Scale = require('./scale')
const makeShape = require('./shape')

class World {
  constructor() {
    this.shapes = []
    this.x = new Scale()
    this.y = new Scale().invert()
    this.state = {
      width: 200,
      height: 200
    }
  }
  add(str, obj) {
    let shape = makeShape(str, obj, this)
    this.shapes.push(shape)
    return shape
  }
  width(num) {
    this.state.width = num
    return this
  }
  height(num) {
    this.state.height = num
    return this
  }
  size(x, y) {
    this.state.width = x
    if (y === undefined) {
      y = x
    }
    this.state.height = y
    return this
  }
  from(x, y) {
    this.x.from(x)
    this.y.from(y)
    return this
  }
  to(x, y) {
    this.x.to(x)
    this.y.to(y)
    return this
  }
  max() {
    let x = null
    let y = null
    this.shapes.forEach((shape) => {
      let max = shape.max()
      x = x === null || max.x > x ? max.x : x
      y = y === null || max.y > y ? max.y : y
    })
    return {
      x: x,
      y: y
    }
  }
  min() {
    let x = null
    let y = null
    this.shapes.forEach((shape) => {
      let min = shape.min()
      x = x === null || min.x < x ? min.x : x
      y = y === null || min.y < y ? min.y : y
    })
    return {
      x: x,
      y: y
    }
  }
  fit(x, y) {
    let max = this.max()
    let min = this.min()
    this.x.from(min.x).to(max.x)
    this.y.from(min.y).to(max.y)
    this.x.fit(x)
    this.y.fit(y)
    return this
  }
  render() {
    let state = this.state
    let shapes = this.shapes.sort((a, b) => a.order > b.order ? 1 : -1);
    let elements = shapes.reduce((str, shape) => {
      return str + '  ' + shape.render() + '\n'
    }, '');
    return `
  <svg width="${state.width}" height="${state.height}" viewBox="0,0,100,100" preserveAspectRatio="xMidYMid meet" style="border:1px solid lightgrey; overflow:visible;">
    ${elements}
  </svg>
`;
  }
}
module.exports = World
