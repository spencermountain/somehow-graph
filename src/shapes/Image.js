const Shape = require('./Shape')

class Image extends Shape {
  constructor(obj, world) {
    super(obj, world);
    this._src = ''
    this._width = 100
    this._height = 200
  }
  src(src) {
    this._src = src
    return this
  }
  href(src) {
    this._src = src
    return this
  }
  size(w, h) {
    this._width = w
    this._height = h
    return this
  }
  width(w) {
    this._width = w
    return this
  }
  height(h) {
    this._height = h
    return this
  }
  build() {
    let h = this.world.html
    let point = this.points()[0]
    return h`<image xlink:href="${this._src}" x="${point[0]}" y="${point[1]}" height="${this._width}" width="${this._height}" />
    `
  //preserveAspectRatio="slice"
  }
}
module.exports = Image
