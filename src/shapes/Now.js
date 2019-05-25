const colors = require('spencer-color').colors
const Line = require('./Line')

const defaults = {
  fill: 'none',
  stroke: colors.lighter,
  'stroke-width': 2,
  'stroke-linecap': 'round'
}

class Now extends Line {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._label = ''
    this._y = '-5%'
    this.dotted(true)
    let d = Date.now()
    this.set([[d, '0%'], [d, '100%']])
  }
  label(str) {
    this._label = str
    return this
  }
  top() {
    this._y = '-5%'
  }
  bottom() {
    this._y = '105%'
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    })
    let point = this.points()[0]
    let textAttrs = {
      x: point[0],
      y: this._y,
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    }
    return h`
      <g>
        <text ...${textAttrs}>
          ${this._label}
        </text>
        <path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>
      </g>
    `
  }
}

module.exports = Now
