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
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    let inside = textArr.map((str) => h`<tspan x="0" dy="1.2em">${String(str)}</tspan>`)
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y //- estimate.height,
    }
    let transform = `translate(${place.x} ${place.y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${-2}" y1="${estimate.height}" x2="${estimate.width}" y2="${estimate.height}" style="stroke-width:1.5px; shapeRendering:optimizeQuality;"  stroke=${colors.grey}/>
    </g>`
  }
  drawRange() {
    let h = this.world.html
    let points = this.points()
    if (points.length <= 1) {
      return null
    }
    let size = 4
    let style = 'stroke-width:2px; shapeRendering:optimizeQuality;'
    let top = points[0]
    let bottom = points[1]
    //for a vertical range...
    let ticks = h`<g>
      <line x1="${top[0] - size}" y1="${top[1]}" x2="${top[0] + size}" y2="${top[1]}" style="${style}" stroke=${colors.grey}/>
      <line x1="${bottom[0] - size}" y1="${bottom[1]}" x2="${bottom[0] + size}" y2="${bottom[1]}" style="${style}" stroke=${colors.grey}/>
    </g>
    `
    //for a horizontal range
    if (top[0] !== bottom[0]) {
      ticks = h`<g>
        <line x1="${top[0]}" y1="${top[1] - size}" x2="${top[0]}" y2="${top[1] + size}" style="${style}" stroke=${colors.grey}/>
        <line x1="${bottom[0]}" y1="${bottom[1] - size}" x2="${bottom[0]}" y2="${bottom[1] + size}" style="${style}" stroke=${colors.grey}/>
      </g>
      `
    }
    return h`<g>
      <line x1="${top[0]}" y1="${top[1]}" x2="${bottom[0]}" y2="${bottom[1]}" style="${style}" stroke=${colors.grey}/>
      ${ticks}
    </g>`
  }
  getPoint() {
    let points = this.points()
    if (points.length <= 1) {
      return points[0]
    }
    //the middle point?
    let xDiff = points[0][0] - points[1][0]
    let yDiff = points[0][1] - points[1][1]
    return [
      points[0][0] - (xDiff / 2),
      points[0][1] - (yDiff / 2)
    ]
  }
  drawLine() {
    let h = this.world.html
    let nudge = this._nudge
    let point = this.getPoint()
    let start = this.points()[0]
    let textPoint = {
      x: start[0] + nudge.x,
      y: start[1] - nudge.y + 4,
    }
    //touch the right side, instead
    if (nudge.x < 0) {
      let estimate = this.estimate()
      textPoint.x += estimate.width
    }
    return h`<line id="line" x1="${textPoint.x}" y1="${textPoint.y}" x2="${point[0]}" y2="${point[1]}" style="stroke-width:2px; shapeRendering:optimizeQuality;" stroke=${colors.grey}/>`
  }
  build() {
    let h = this.world.html
    return h`<g id="build">
      ${this.drawText()}
      ${this.drawLine()}
      ${this.drawRange()}
    </g>`
  }
}
module.exports = Annotation
