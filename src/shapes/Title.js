const colors = require('spencer-color').colors
const Text = require('./Text')

const defaults = {
  stroke: 'none',
  fill: colors.grey,
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'text-anchor': 'middle'
}

class Title extends Text {
  constructor(obj = {}, world) {
    let title = ''
    if (typeof obj === 'string') {
      title = obj
      obj = {}
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._title = title
    this._y = '-5%'
    this._x = '50%'
    this.ignore_clip = true
  }
  label(str) {
    this._label = str
    return this
  }
  color(c) {
    this.attrs.fill = c
    return this
  }
  top() {
    this._y = '-15%'
    return this
  }
  bottom() {
    this._y = '115%'
    return this
  }
  left() {
    this._x = '15%'
    this.attrs['text-anchor'] = 'start'
    return this
  }
  right() {
    this._x = '95%'
    this.attrs['text-anchor'] = 'end'
    return this
  }
  build() {
    let h = this.world.html
    let attrs = Object.assign({}, this.attrs, {
      x: this._x,
      y: this._y
    })
    return h`<text ...${attrs}>
          ${this._title}
        </text>`
  }
}

module.exports = Title
