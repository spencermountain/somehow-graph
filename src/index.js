const Scale = require('./scale')
const makeShape = require('./shape')

class World {
  constructor() {
    this.shapes = []
    this.y = new Scale()
    this.x = new Scale()
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
