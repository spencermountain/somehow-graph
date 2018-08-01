const Shape = require('./shape')
const d3Shape = require('d3-shape')

class YAxis extends Shape {
  constructor(data, obj, world) {
    super(data, obj, world)
    let zero = this.world.x.start()
    if (data && data[0]) {
      zero = data[0].x || zero
    }
    this.left = this.world.x.scale(zero)
    this.defaults = {
      stroke: 'grey',
      "stroke-width": "1",
      fill: "none",
    }
  }
  makeTick(o) {
    let y = this.world.y.scale(o.val)
    let text = String(o.text || '')
    let x = this.left
    let color = this.defaults.stroke
    return `
    <g>
      <line y1="${y}" x1="${x}" y2="${y}" x2="${x - 2}" stroke="${color}" stroke-width="0.5px"></line>
      <text y="${y + 1.5}" x="${x - 5}" style="fill:${color}; font-size:4px" text-anchor="middle" >${text}</text>
    </g>
  `
  }
  makePath() {
    let minMax = this.world.y.scale.range()
    let points = [
      {
        y: minMax[0],
        x: this.left
      },
      {
        y: minMax[1],
        x: this.left
      }
    ]
    return d3Shape.line().x(d => d.x).y(d => d.y)(points);
  }
  build() {
    let path = this.makePath()
    let ticks = this.world.y.ticks(6)
    ticks = ticks.map((o) => this.makeTick(o))
    return `
      <g>
        <path d="${path}" stroke="${this.defaults.stroke}" stroke-width="0.5px" stroke-linecap="round"/>
        ${ticks}
      </g>
  `
  }
}
module.exports = YAxis
