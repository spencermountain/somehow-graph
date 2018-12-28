const Shape = require('./Shape')
const colors = require('spencer-color')

const defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round'
}

class Annotation extends Shape {
  constructor(obj = {}, world) {
    let text = null
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    } else if (Array.isArray(obj)) {
      text = obj
      obj = {}
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this._text = text
    this._origin = {}
  }
  path() {
    return ''
  }
  drawText() {
    let h = this.world.html
    let inside = this.textLines.map((str) => h`<tspan x="0" dy="1.2em">${str}</tspan>`)
    let {x, y} = this.position()
    return h`<g transform="translate(${x} ${y})" style="${this.drawSyle()}">
      <text id="fun" ...${this.attrs}>
        ${inside}
      </text>
    </g>`
  }
  drawLine() {
    let h = this.world.html
    let {x, y} = this.position()
    return h`<g >
      <line x1="0" y1="0" x2="${x}" y2="${y}" stroke=${colors.grey}/>
    </g>`
  }
  build() {
    let h = this.world.html
    return h`<g>
      ${this.drawText()}
      ${this.drawLine()}
    </g>`
  }
}
module.exports = Annotation
