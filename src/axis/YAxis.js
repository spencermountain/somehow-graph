const Axis = require('./Axis')


class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.y
  }
  drawTicks(x) {
    let h = this.world.html
    return this.ticks().map((o) => {
      return h`<text x="${x}" y="${o.pos}" dy="0" dx="-6" fill="${this.attrs.stroke}" text-anchor="end" style="font-size:12px;">
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
    let height = this.world.height
    let x = 0
    let ticks = this.drawTicks(x)
    return h`<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
    </g>`
  }
}
module.exports = YAxis
