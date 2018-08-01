const Shape = require('./shape')
const d3Shape = require('d3-shape')

class XAxis extends Shape {
  constructor(data, obj, world) {
    //default x is left-side
    super(data, obj, world)
    this.bottom = this.world.y.start()
    if (data && data[0] && data[0].x !== undefined) {
      this.bottom = this.world.y.scale(data[0].y)
    }
    this.defaults = {
      stroke: 'slategrey',
      "stroke-width": "1",
      fill: "none",
    }
  }
  makeTick(o) {
    let x = this.world.x.scale(o.val)
    let text = String(o.text || '')
    let y = this.bottom
    let color = this.defaults.stroke
    return `
    <g>
      <line y1="${y}" x1="${x}" y2="${y + 2}" x2="${x}" stroke="${color}" stroke-width="0.5px"></line>
      <text y="${y + 5.5}" x="${x}" style="fill:${color}; font-size:4px" text-anchor="middle" >${text}</text>
    </g>
  `
  }
  makePath() {
    let minMax = this.world.x.scale.range()
    let points = [
      {
        x: minMax[0],
        y: this.bottom
      },
      {
        x: minMax[1],
        y: this.bottom
      }
    ]
    return d3Shape.line().x(d => d.x).y(d => d.y)(points);
  }
  build() {
    let path = this.makePath()
    let ticks = this.world.x.ticks(5)
    ticks = ticks.map((o) => this.makeTick(o))
    return `
      <g>
        <path d="${path}" stroke="${this.defaults.stroke}" stroke-width="0.5px" stroke-linecap="round"/>
        ${ticks}
      </g>
  `
  }
}
module.exports = XAxis
