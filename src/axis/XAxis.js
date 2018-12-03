const Axis = require('./Axis')

class XAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.x
  }
  drawTicks(y) {
    return this.ticks().map((o) => {
      return `<text x="${o.pos}" y="${y + 15}" fill="${this.attrs.stroke}" text-anchor="middle" style="font-size:12px;">
        ${o.label}
      </text>`
    })
  }
  build() {
    let attrs = this.attrs
    let width = this.world.width
    let y = this.world.height
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    let ticks = this.drawTicks(y)
    return `<g>
      ${ticks}
      <line x1="${0}" y1="${y}" x2="${width}" y2="${y}" ${attrs}/>
    </g>`
  }
}
module.exports = XAxis
