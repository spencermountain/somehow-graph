const Shape = require('./shape')

class Text extends Shape {
  constructor(text, data, obj, world) {
    super(data, obj, world);
    this.text = text
    this.obj = obj || {}
    this.world = world
    this.defaults = {
      "font-family": "'avenir next', avenir, sans-serif",
      "font-size": "8px",
      "text-anchor": "middle",
      "fill": "#333",
    }
  }
  build() {
    let world = this.world
    let point = {
      x: world.x.scale(this.data[0].x),
      y: world.y.scale(this.data[0].y),
    }
    console.log(point)
    let attrs = Object.assign({}, this.defaults, this.obj)
    let inside = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    return `<text x="${point.x}" y="${point.y}" ${inside}>${this.text}</path>`
  }
}

module.exports = Text
