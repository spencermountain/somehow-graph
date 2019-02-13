const d3Shape = require('d3-shape')
const colors = require('spencer-color').colors
const fns = require('../_fns')
const parseInput = require('./lib/parseInput')
const {parseX, parseY} = require('../parse')

const defaults = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality'
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this._id = obj.id || fns.uid('input')
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this.curve = d3Shape.curveMonotoneX
    this._shape = 1
    this._title = ''
    this._click = obj.click
    this._hover = obj.hover
  }
  straight() {
    this.curve = d3Shape.curveLinear
    return this
  }
  id(str) {
    this._id = str
    return this
  }
  soft() {
    this.curve = d3Shape.curveBasis
    return this
  }
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) {
      this.set([
        [x, y]
      ])
      return this
    }
    //vertical line
    if (x || x === 0) {
      this.set([
        [x, '0%'],
        [x, '100%'],
      ])
      return this
    }
    //horizontal line
    if (y || y === 0) {
      this.set([
        ['0%', y],
        ['100%', y],
      ])
    }
    return this
  }
  extent() {
    let xArr = []
    let yArr = []
    this.data.forEach((o) => {
      if (o.x.type !== 'pixel') {
        xArr.push(o.x.value)
      }
      if (o.y.type !== 'pixel') {
        yArr.push(o.y.value)
      }
      if (o.y2 && o.y2.type !== 'pixel') {
        yArr.push(o.y2.value)
      }
    })
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr),
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  opacity(n) {
    this.attrs.opacity = n
    return this
  }
  title(str) {
    this._title = str
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    return this
  }
  from(x, y) {
    this.data[0] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  to(x, y) {
    this.data[1] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  //set any listeners on the dom element
  onMount() {
    if (!this._click && !this._hover) {
      return
    }
    //wait for mount
    setTimeout(() => {
      let el = document.getElementById(this._id)
      if (!el) {
        return
      }
      if (this._click) {
        el.addEventListener('click', () => {
          this._click(this)
        })
      }
      if (this._hover) {
        console.log('setting')
        el.addEventListener('mouseenter', () => {
          console.log('hover')
          this._hover(this)
        })
      }
    }, 50)
  }
  click(fn) {
    this._click = fn
  }
  hover(fn) {
    this._hover = fn
  }
  //x,y coordinates
  points() {
    let {x, y} = this.world
    let points = this.data.map((o) => {
      let arr = [x.place(o.x), y.place(o.y)]
      if (o.y2 !== undefined) {
        arr.push(y.place(o.y2))
      }
      return arr
    })
    return points
  }
  path() {
    let zero = this.world.y.place(parseY(0))
    let points = this.points()
    return d3Shape.area().x0(d => d[0]).y0(d => d[1]).y1(zero).curve(d3Shape.curveMonotoneX)(points);
  }
  drawSyle() {
    return Object.keys(this.style).map((k) => {
      return `${k}:${this.style[k]};`
    }).join(' ')
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path(),
    })
    return h`<path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>`;
  }
}
module.exports = Shape
