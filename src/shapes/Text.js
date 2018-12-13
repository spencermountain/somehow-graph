const Shape = require('./Shape')
const colors = require('spencer-color')

const defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round'
}

class Text extends Shape {
  constructor(obj = {}, world) {
    let text = null
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    } else if (Array.isArray(obj)) {
      text = obj
      obj = []
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world);

    this.textLines = text || obj.text || []
    if (typeof this.textLines === 'string') {
      this.textLines = [this.textLines]
    }
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
      y: 4,
    }
    this._underline = ''
  }
  before(x, y) {
    this.attrs['text-anchor'] = "end"
    this.set([
      [x, y]
    ])
  }
  after(x, y) {
    this.attrs['text-anchor'] = "start"
    this.set([
      [x, y]
    ])
  }
  center(x, y) {
    this.attrs['text-anchor'] = "middle"
    this.set([
      [x, y]
    ])
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
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
  estimate() {
    //calculate height
    let height = 24
    if (this.style['font-size']) {
      let num = this.style['font-size'].replace('px', '')
      num = Number(num)
      height = num * 1.5
    }
    //calculate width
    let width = 0
    this.textLines.forEach((str) => {
      let w = str.length * 6
      if (w > width) {
        width = w
      }
    })
    return {
      height: height,
      width: width
    }
  }
  position() {
    let point = this.points()[0]
    let res = {
      x: 0,
      y: 0,
    }
    if (!point) {
      return res
    }
    let {height, width} = this.estimate()
    res.height = height
    res.width = width
    res.y = (point[1] + this._dodge.y) - height
    res.x = point[0] + 2 + this._dodge.x
    return res
  }
  build() {
    let h = this.world.html
    let inside = this.textLines.map((str) => h`<tspan x="0" dy="1.2em">${str}</tspan>`)
    let {x, y} = this.position()
    return h`<g transform="translate(${x} ${y})" style="${this.drawSyle()}">
      <text id="fun" ...${this.attrs}>
        ${inside}
      </text>
    </g>`
  }
}

module.exports = Text
