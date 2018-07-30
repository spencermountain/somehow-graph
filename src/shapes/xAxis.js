const Shape = require('./shape')
const d3Shape = require('d3-shape')
const spacetime = require('spacetime')

class XAxis extends Shape {
  constructor(data, obj, world) {
    //default x is left-side
    data.x = data.x || world.x.scale.domain()[0]
    super(data, obj, world)
    this.defaults = {
      stroke: 'slategrey',
      "stroke-width": "1",
      fill: "none",
    }
  }
  formatTime(num) {
    let s = spacetime(num)
    return [s.format('month-short'), s.format('date-ordinal')]
  }
  makeTick(num) {
    let x = this.world.x.scale(num)
    let text = String(num || '')
    if (this.world.x.type === 'time') {
      text = this.formatTime(num)
    } else {
      text = [text, '']
    }
    let y = this.world.y.scale(this.data[0].y || 0)
    let color = this.defaults.stroke
    return `
    <g>
      <line y1="${y}" x1="${x}" y2="${y + 2}" x2="${x}" stroke="${color}" stroke-width="0.5px"></line>
      <text y="${y + 5.5}" x="${x}" style="fill:${color}; font-size:4px" text-anchor="middle" >${text[0]}</text>
      <text y="${y + 9}" x="${x}" style="fill:${color}; font-size:4px" text-anchor="middle" >${text[1]}</text>
    </g>
  `
  }
  makePath() {
    let data = this.data[0]
    let y = this.world.y.scale(data.y || 0)
    let minMax = this.world.x.scale.range()
    let points = [
      {
        x: minMax[0],
        y: y
      },
      {
        x: minMax[1],
        y: y
      }
    ]
    return d3Shape.line().x(d => d.x).y(d => d.y)(points);
  }
  build() {
    let path = this.makePath()
    let ticks = this.world.x.scale.ticks(5)
    ticks = ticks.map((t) => this.makeTick(t))
    return `
      <g>
        <path d="${path}" stroke="${this.defaults.stroke}" stroke-width="0.5px" stroke-linecap="round"/>
        ${ticks}
      </g>
  `
  }
}
module.exports = XAxis
