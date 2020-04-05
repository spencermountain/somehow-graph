const Axis = require('./Axis')

class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.y
  }
  drawTicks(x) {
    let h = this.world.html
    return this.ticks().map((o) => {
      let left = 100 - o.value * 100
      let style = `position:absolute; top:${left}%; color:${this.attrs.stroke}; text-align:right; right:4px;`
      return h`<span style=${style}>${o.label}</span>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    // let attrs = this.attrs
    // let height = this.world.height
    let x = 0
    let ticks = this.drawTicks(x)
    // let textAttrs = {
    //   x: '-5%',
    //   y: '50%',
    //   'font-size': '2px',
    //   fill: this.attrs.stroke,
    //   style: 'text-anchor:end;'
    // }
    // return h`<g>
    //   ${ticks}
    //   <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
    //   <text ...${textAttrs}>
    //     ${this._label}
    //   </text>
    // </g>`
    let w = this._label ? 40 : 15
    let s = {
      container: `height:100%; position:relative; padding-right:10px; min-width:${w}px; border-right: 1px solid ${this.attrs.stroke};`,
      label: `position:absolute; white-space: pre; top:47%; color:${this.attrs.stroke};`
    }
    return h`
    <div style=${s.container}>
      ${ticks}
      <div style=${s.label}>${this._label}</div>
    </div>`
  }
}
module.exports = YAxis
