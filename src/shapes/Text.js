const Shape = require('./Shape')
const colors = require('spencer-color').colors

const defaults = {
  color: 'grey',
  'stroke-width': 1,
  'stroke-linecap': 'round',
  'font-size': 5
}

class Text extends Shape {
  constructor(obj = {}, world) {
    let text = null
    let textFn = null
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    } else if (typeof obj === 'function') {
      textFn = obj
      obj = {}
    } else if (Array.isArray(obj)) {
      text = obj
      obj = []
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this.inside = text || obj.text || []
    this.textFn = textFn
    this._order = 0
    this._responsive = false
    this.data = []
    this._dodge = {
      x: 0,
      y: 0
    }
    this._underline = ''
    this.style = this.style || {}
    this.style['font-size'] = this.style['font-size'] || '4px'
  }
  bold() {
    this.attrs['font-weight'] = 520
    return this
  }
  before(x, y) {
    this.attrs['text-anchor'] = 'end'
    this.set([[x, y]])
    return this
  }
  after(x, y) {
    this.attrs['text-anchor'] = 'start'
    this.set([[x, y]])
    return this
  }
  center(x, y) {
    this.attrs['text-align'] = 'center'
    if (x !== undefined) {
      this.set([[x, y]])
    }
    return this
  }
  left() {
    this.attrs['text-align'] = 'left'
    return this
  }
  right() {
    this.attrs['text-align'] = 'right'
    return this
  }
  color(color) {
    this.attrs.color = colors[color] || color
    return this
  }
  dy(n = 0) {
    this._dodge.y = n * -1
    return this
  }
  dx(n = 0) {
    this._dodge.x = n
    return this
  }
  dodge(x, y) {
    x = x || this._dodge.x
    y = y || this._dodge.y
    this._dodge.x = x * -1
    this._dodge.y = y * -1
    return this
  }
  font(num) {
    if (typeof num === 'number') {
      num += 'px'
    }
    this.style['font-size'] = num
    return this
  }
  size(num) {
    return this.font(num)
  }
  text(text) {
    this.inside = text
    return this
  }
  path() {
    return ''
  }
  build() {
    let h = this.world.html
    this.onMount()
    let [x, y] = this.points()[0]
    console.log(this.data)
    let s = {
      container: `position:absolute; 
      top:${y}%; 
      left:${x}%; 
      white-space:pre; 
      color:${this.attrs.color}; 
      text-align:${this.attrs['text-align']};
      `
    }
    return h`<div style="${s.container}" >${this.inside}</div>`
  }
}

module.exports = Text
