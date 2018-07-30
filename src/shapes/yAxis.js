const Shape = require('./shape')
const d3Shape = require('d3-shape')
const spacetime = require('spacetime')

class YAxis extends Shape {
  constructor(data, obj, world) {
    super(data, obj, world)
    this.defaults = {
      stroke: 'grey',
      "stroke-width": "1",
      fill: "none",
    }
  }
  makeTick(num) {
    let y = this.world.y.scale(num)
    let text = String(num || '')
    if (this.world.y.type === 'time') {
      text = spacetime(num).format('day')
    }
    let x = this.world.x.scale(this.data[0].x || 0)
    let color = this.defaults.stroke
    return `
    <g>
      <line y1="${y}" x1="${x}" y2="${y}" x2="${x - 2}" stroke="${color}" stroke-width="0.5px"></line>
      <text y="${y + 1.5}" x="${x - 5}" style="fill:${color}; font-size:4px" text-anchor="middle" >${text}</text>
    </g>
  `
  }
  makePath() {
    let data = this.data[0]
    let x = this.world.x.scale(data.x || 0)
    let minMax = this.world.y.scale.range()
    let points = [
      {
        y: minMax[0],
        x: x
      },
      {
        y: minMax[1],
        x: x
      }
    ]
    return d3Shape.line().x(d => d.x).y(d => d.y)(points);
  }
  build() {
    let path = this.makePath()
    let ticks = this.world.y.scale.ticks(6)
    ticks = ticks.map((t) => this.makeTick(t))
    return `
      <g>
        <path d="${path}" stroke="${this.defaults.stroke}" stroke-width="0.5px" stroke-linecap="round"/>
        ${ticks}
      </g>
  `
  }
}
module.exports = YAxis
