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
  // position() {
  //   let point = this.points()[0]
  //   return {
  //     x: point[0],
  //     y: point[1],
  //   }
  // }
  drawText() {
    let h = this.world.html
    let nudge = this._nudge
    let inside = this.textLines.map((str) => h`<tspan x="0" dy="1.2em">${str}</tspan>`)
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y //- estimate.height,
    }
    let transform = `translate(${place.x} ${place.y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text id="fun" ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${-2}" y1="${estimate.height}" x2="${estimate.width}" y2="${estimate.height}" style="stroke-width:1.5px; shapeRendering:optimizeQuality;"  stroke=${colors.grey}/>
    </g>`
  }
  drawLine() {
    let h = this.world.html
    let nudge = this._nudge
    let point = this.points()[0]
    let place = {
      x: point[0] + nudge.x,
      y: point[1] - nudge.y + 4,
    }
    //touch the right side, instead
    if (nudge.x < 0) {
      let estimate = this.estimate()
      place.x += estimate.width
    }
    return h`<line x1="${place.x}" y1="${place.y}" x2="${point[0]}" y2="${point[1]}" style="stroke-width:2px; shapeRendering:optimizeQuality;" stroke=${colors.grey}/>`
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
