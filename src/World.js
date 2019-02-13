const fitAspect = require('fit-aspect-ratio')
const htm = require('htm')
const vhtml = require('vhtml');
const methods = require('./methods')
const YScale = require('./scales/YScale')
const XScale = require('./scales/Scale')
const XAxis = require('./axis/XAxis')
const YAxis = require('./axis/YAxis')

const Shape = require('./shapes/Shape')
const Area = require('./shapes/Area')
const Rect = require('./shapes/Rect')
const Line = require('./shapes/Line')
const Text = require('./shapes/Text')
const Dot = require('./shapes/Dot')
const Annotation = require('./shapes/Annotation')
const MidArea = require('./shapes/MidArea')
const Bar = require('./shapes/Bar')
const Image = require('./shapes/Image')
const Arrow = require('./shapes/Arrow')

const Input = require('./inputs/Input')
const Slider = require('./inputs/Slider')
const Select = require('./inputs/Select')
const Legend = require('./inputs/Legend')
const PlusMinus = require('./inputs/PlusMinus')

class World {
  constructor(obj = {}) {
    this.width = obj.width || 600
    this.height = obj.height || 400
    if (obj.aspect) {
      this.aspect = obj.aspect
      let res = fitAspect(obj)
      this.width = res.width || 600
      this.height = res.height || 400
    }
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
    if (typeof this.el === 'string') {
      this.el = document.querySelector(this.el)
    }
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
  area(obj) {
    let shape = new Area(obj, this)
    this.shapes.push(shape)
    return shape
  }
  midArea(obj) {
    let shape = new MidArea(obj, this)
    this.shapes.push(shape)
    return shape
  }
  rect(obj) {
    let shape = new Rect(obj, this)
    this.shapes.push(shape)
    return shape
  }
  bar(obj) {
    let shape = new Bar(obj, this)
    this.shapes.push(shape)
    return shape
  }
  annotation(obj) {
    let shape = new Annotation(obj, this)
    this.shapes.push(shape)
    return shape
  }
  image(obj) {
    let shape = new Image(obj, this)
    this.shapes.push(shape)
    return shape
  }
  arrow(obj) {
    let shape = new Arrow(obj, this)
    this.shapes.push(shape)
    return shape
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  //inputs:
  input(obj) {
    let slider = new Input(obj, this)
    this.inputs.push(slider)
    return slider
  }
  slider(obj) {
    let slider = new Slider(obj, this)
    this.inputs.push(slider)
    return slider
  }
  select(obj) {
    let slider = new Select(obj, this)
    this.inputs.push(slider)
    return slider
  }
  plusMinus(obj) {
    let slider = new PlusMinus(obj, this)
    this.inputs.push(slider)
    return slider
  }
  legend(obj) {
    let legend = new Legend(obj, this)
    this.inputs.push(legend)
    return legend
  }

  getShape(id) {
    return this.shapes.find((shape) => shape.id === id || shape._id === id)
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
      ${elements}
    </svg>`;
  }
}
Object.keys(methods).forEach((k) => {
  World.prototype[k] = methods[k]
})
const aliases = {
  plusminus: 'plusMinus'
}
Object.keys(aliases).forEach((k) => {
  World.prototype[k] = methods[aliases[k]]
})
module.exports = World
