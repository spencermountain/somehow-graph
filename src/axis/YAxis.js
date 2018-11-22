const Axis = require('./Axis')

class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world);
  }
  drawTicks(x) {
    return this.ticks().map((o) => {
      return `<text x="${x - 15}" y="${o.pos}" fill="${this.attrs.stroke}" text-anchor="middle" style="font-size:12px;">
        ${o.label}
      </text>`
    })
  }
  build() {
    let attrs = this.attrs
    let range = this.world.xScale.scale.range()
    let x = 0
    attrs = Object.keys(attrs).map((k) => {
      return `${k}="${attrs[k]}"`
    }).join(' ')
    let ticks = this.drawTicks(x)
    return `<g>
      ${ticks}
      <line x1="${x}" y1="${range[0]}" x2="${x}" y2="${range[1]}" ${attrs}/>
    </g>`
  }
}
module.exports = YAxis
