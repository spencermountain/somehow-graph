const d3Shape = require('d3-shape')
const d3Scale = require('d3-scale')

class Scale {
  constructor(obj) {
    this.type = obj.type
    this.max = obj.max || 100
    this.min = obj.min || 0
    this.scale = d3Scale.scaleLinear().range([0, 100]).domain([obj.min, obj.max])
  }
  reverse() {
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
    return this
  }
  val(n) {
    return this.scale(n)
  }
}

class World {
  constructor() {
    this.x = new Scale({
      max: 10,
      min: 0
    })
    this.y = new Scale({
      max: 100,
      min: 0
    }).reverse()
    this.objects = []
  }
  build() {
    let elements = this.objects.map((o) => {
      console.log(o.attributes)
      let attrs = Object.keys(o.attributes).map((k) => `${k}="${o.attributes[k]}"`)
      return `  <${o.tag} ${attrs.join(' ')}></${o.tag}>`
    })
    return `
    <svg width="500" height="200" viewBox="0,0,100,100" style="border:1px solid lightgrey;">
      ${elements}
    </svg>
    `
  }
  makePoints(data) {
    return data.map((o, i) => {
      if (typeof o === 'number') {
        o = {
          x: i,
          y: o
        }
      }
      return {
        x: this.x.scale(o.x),
        y: this.y.scale(o.y),
      }
    })
  }
  addLine(data, obj = {}) {
    let points = this.makePoints(data)
    let path = d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(points);
    let attrs = {
      d: path,
      stroke: 'steelblue',
      "stroke-width": "4",
      fill: "none"
    }
    Object.keys(obj).forEach((k) => attrs[k] = obj[k])
    this.objects.push({
      tag: 'path',
      attributes: attrs
    })
    return this
  }
  area(data) {
    const zero = this.yScale(0)
    return d3Shape.area().x(d => d.x).y0(d => d.y).y1(zero).curve(d3Shape.curveMonotoneX)(data);
  }

}
module.exports = World
