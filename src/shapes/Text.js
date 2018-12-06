const Shape = require('./Shape')
const colors = require('spencer-color')

const defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round'
}
// const defaultPoint = {
//   x: '50%',
//   y: '50%',
// }

class Text extends Shape {
  constructor(obj = {}, world) {
    let text = []
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world);
    this.textLines = text
    this._order = 0
    this.data = [{
      x: {
        value: 50,
        type: 'percent'
      },
      y: {
        value: 50,
        type: 'percent'
      },
    }]
    this._dodge = {
      x: 0,
      y: 0,
    }
  }
  fontSize(num) {
    if (typeof num === 'number') {
      num += 'px'
    }
    this.style['font-size'] = num
    return this
  }
  underline(color, size = 2) {
    this.style['border-bottom'] = `${size}px solid ${color}`
    return this
  }
  extent() {
    // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
    // let width = longest.length * 8
    // let height = this.textLines.length * 20
    let d = this.data[0] || {}
    return {
      x: {
        min: d.x,
        max: d.x
      },
      y: {
        min: d.y, // - height,
        max: d.y
      },
    }
  }
  dodge(x, y) {
    this._dodge.x = x
    this._dodge.y = y
    return this
  }
  text(text) {
    if (typeof text === 'string') {
      this.textLines = [text]
    } else {
      this.textLines = text
    }
  }
  path() {
    return ''
  }
  build() {
    let h = this.world.html
    let inside = this.textLines.map((str) => h`<tspan x="0" dy="1.2em">${str}</tspan>`)
    inside = inside.join('\n')
    let point = this.points()[0]
    if (!point) {
      return ''
    }
    //calculate height
    let height = 24
    if (this.style['font-size']) {
      let num = this.style['font-size'].replace('px', '')
      num = Number(num)
      height = num * 1.5
      console.log(height)
    }
    let y = point[1] - height + (this._dodge.y || 0)
    let x = point[0] + 2 + (this._dodge.x || 0)
    return h`<g transform="translate(${x} ${y})" style="${this.drawSyle()}">
      <text ...${this.attrs}>
        ${inside}
      </text>
    </g>`
  }
}

module.exports = Text
