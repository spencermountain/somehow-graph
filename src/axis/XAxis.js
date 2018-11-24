
const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
}

class XAxis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
  }
  ticks(n = 6) {
    n = n === 0 ? 0 : n - 1
    let xscale = this.world.xScale
    let scale = xscale.scale
    let total = xscale.max - xscale.min
    let ticks = []
    for (let i = 0; i <= n; i += 1) {
      let dec = i / n
      let num = (dec * total) + xscale.min
      ticks.push({
        pos: scale(num),
        label: parseInt(num, 10)
      })
    }
    return ticks
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
