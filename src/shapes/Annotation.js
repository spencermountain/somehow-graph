const colors = require('spencer-color').colors
const Text = require('./Text')

const defaults = {
  'text-anchor': "start"
}

class Annotation extends Text {
  constructor(obj = {}, world) {
    super(obj, world);
    this.attrs = Object.assign({}, defaults, this.attrs)
    this._nudge = {
      x: 0,
      y: 0
    }
  }
  on(x, y) {
    this.at(x, y)
    return this
  }
  nudge(x, y) { //always in pixels
    this._nudge.x = x;
    this._nudge.y = y;
    return this
  }
  drawText() {
    let h = this.world.html
    let nudge = this._nudge
    let inside = this.textLines.map((str) => h`<tspan x="0" dy="1.2em">${str}</tspan>`)
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y - estimate.height,
    }
    let transform = `translate(${place.x} ${place.y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text id="fun" ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${0}" y1="${estimate.height + 4}" x2="${estimate.width}" y2="${estimate.height + 4}" style="stroke-width:1.5px; shapeRendering:optimizeQuality;"  stroke=${colors.grey}/>
    </g>`
  }
  drawLine() {
    let h = this.world.html
    let nudge = this._nudge
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y + 5,
    }
    return h`<line x1="${place.x}" y1="${place.y}" x2="${point.x - 2}" y2="${point.y + estimate.height - 3}" style="stroke-width:2px; shapeRendering:optimizeQuality;" stroke=${colors.grey}/>`
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
