const Axis = require('./Axis')


class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.yScale
  }
  drawTicks(x) {
    return this.ticks().map((o) => {
      return `<text x="${x}" y="${o.pos}" dy="0" dx="-6" fill="${this.attrs.stroke}" text-anchor="end" style="font-size:12px;">
        ${o.label}
      </text>`
    })
  }
  build() {
    let attrs = this.attrs
    let height = this.world.height
    let x = 0
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    let ticks = this.drawTicks(x)
    return `<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ${attrs}/>
    </g>`
  }
}
module.exports = YAxis
