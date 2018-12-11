const fitAspect = require('fit-aspect-ratio')
const Component = require('preact').Component
const htm = require('htm')
const vhtml = require('vhtml');
const methods = require('./methods')
const YScale = require('./scales/YScale')
const XScale = require('./scales/Scale')
const XAxis = require('./axis/XAxis')
const YAxis = require('./axis/YAxis')

const Shape = require('./shapes/Shape')
const Line = require('./shapes/Line')
const Text = require('./shapes/Text')
const Dot = require('./shapes/Dot')

const Slider = require('./inputs/Slider')

class World extends Component {
  constructor(obj = {}) {
    super(obj)
    this.aspect = obj.aspect || '3:4'
    let res = fitAspect(obj)
    this.width = res.width || 600
    this.height = res.height || 400
    this.shapes = []
    //give the points a little bit of space.
    this.wiggle_room = 1.05
    this.x = new XScale(obj, this)
    this.y = new YScale(obj, this)
    this.xAxis = new XAxis({}, this)
    this.yAxis = new YAxis({}, this)
    this.html = htm.bind(vhtml);
    this.inputs = []
    this.state = {}
    this.state.time = Date.now();
    this.el = obj.el || null
  }
  bind(fn) {
    this.html = htm.bind(fn);
  }
  line(obj) {
    let line = new Line(obj, this)
    this.shapes.push(line)
    return line
  }
  dot(obj) {
    let dot = new Dot(obj, this)
    this.shapes.push(dot)
    return dot
  }
  text(obj) {
    let text = new Text(obj, this)
    this.shapes.push(text)
    return text
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  slider(obj) {
    let slider = new Slider(obj, this)
    this.inputs.push(slider)
    return slider
  }
  getShape(id) {
    return this.shapes.find((shape) => shape.id === id)
  }
  redraw() {
    if (this.el) {
      this.el.innerHTML = this.build()
    } else {
      console.log('must define world html element')
    }
  }
  build() {
    let h = this.html
    let shapes = this.shapes.sort((a, b) => a._order > b._order ? 1 : -1)
    let elements = []
    if (this.xAxis) {
      elements.push(this.xAxis.build())
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build())
    }
    elements = elements.concat(shapes.map(shape => shape.build()))
    let attrs = {
      width: this.width,
      height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;
    }
    return h`<svg ...${attrs}>
    <text>${this.state.lat}</text>
      ${elements}
    </svg>`;
  }
}
Object.keys(methods).forEach((k) => {
  World.prototype[k] = methods[k]
})
module.exports = World
