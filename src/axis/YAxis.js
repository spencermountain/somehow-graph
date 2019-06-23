const Axis = require('./Axis')

class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.y
  }
  drawTicks(x) {
    let h = this.world.html
    return this.ticks().map(o => {
      let percent = o.value * 100
      percent = 100 - percent
      return h`<text x="${x}" y="${percent + '%'}" dy="0" dx="-2px" fill="${
        this.attrs.stroke
      }" text-anchor="end" style="font-size:5px;">
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
    let textAttrs = {
      x: '-5%',
      y: '50%',
      fill: this.attrs.stroke,
      style: 'text-anchor:end;'
    }
    return h`<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = YAxis
