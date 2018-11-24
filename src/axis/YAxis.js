
const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
}

class YAxis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
  }
  ticks(n = 6) {
    n = n === 0 ? 0 : n - 1
    let yscale = this.world.yScale
    let scale = yscale.scale
    let total = yscale.max - yscale.min
    let ticks = []
    for (let i = 0; i <= n; i += 1) {
      let dec = i / n
      let num = (dec * total) + yscale.min
      ticks.push({
        pos: scale(num),
        label: parseInt(num, 10)
      })
    }
    return ticks
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
