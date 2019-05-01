const Shape = require('./Shape')
const colors = require('spencer-color').colors

class Image extends Shape {
  constructor(obj, world) {
    super(obj, world)
    this._src = ''
    this._width = 100
    this._height = 200
    this._caption = ''
  }
  src(src) {
    this._src = src
    return this
  }
  caption(txt) {
    this._caption = txt
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
    this.onMount()
    let point = this.points()[0]
    if (!point) {
      point = [0, 0]
    }
    let caption = ''
    if (this._caption) {
      let y = point[1] + this._height + 15
      caption = h`<text x="${point[0]}" y="${y}" stroke="none" fill="${colors.grey}">${
        this._caption
      }</text>`
    }
    return h`<g>
      <image xlink:href="${this._src}" x="${point[0]}" y="${point[1]}" height="${
      this._width
    }" width="${this._height}" />
      ${caption}
    </g>
    `
    //preserveAspectRatio="slice"
  }
}
module.exports = Image
