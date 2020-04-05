const Axis = require('./Axis')

class XAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.x
  }
  drawTicks(y) {
    let h = this.world.html
    return this.ticks().map((o) => {
      let left = o.value * 100
      let style = `position:absolute; left:${left}%; color:${this.attrs.stroke}; text-align:left;`
      return h`<span style=${style}>${o.label}</span>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let y = this.world.height
    let ticks = this.drawTicks(y)
    let s = {
      container: `position:relative; padding-top:5px; width:100%; height:20px; border-top: 1px solid ${this.attrs.stroke};`,
      label: `text-align:center; color:${this.attrs.stroke};`
    }
    return h`
    <div style=${s.container}>
      ${ticks}
      <div style=${s.label}>${this._label}</div>
    </div>`
  }
}
module.exports = XAxis
