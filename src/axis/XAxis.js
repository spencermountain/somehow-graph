const Axis = require('./Axis')

class XAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.x
  }
  drawTicks(y) {
    let h = this.world.html
    return this.ticks().map(o => {
      return h`<text x="${o.value * 100 + '%'}" y="${y + 5}" fill="${
        this.attrs.stroke
      }" text-anchor="middle" style="font-size:5px;">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs
    let width = this.world.width
    let y = this.world.height
    let ticks = this.drawTicks(y)
    let textAttrs = {
      x: '50%',
      y: '115%',
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    }
    return h`<g>
      ${ticks}
      <line x1="${0}" y1="${y}" x2="${width}" y2="${y}" ...${attrs} stroke="#d7d5d2" />
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = XAxis
