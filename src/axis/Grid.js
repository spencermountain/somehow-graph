const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1,
  'vector-effect': 'non-scaling-stroke'
}

class Grid {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = {}
    this.attrs = Object.assign({}, defaults, obj)
  }
  ticks() {
    return {
      x: this.world.xAxis.ticks(),
      y: this.world.yAxis.ticks()
    }
  }
  xTicks() {
    let h = this.world.html
    return this.ticks().x.map((o) => {
      let left = o.value * 100
      let style = `position:absolute; width:1px; opacity:0.4; left:${left}%; height:100%; border-left:1px dashed ${this.attrs.stroke};`
      return h`<span style=${style}></span>`
    })
  }
  yTicks() {
    let h = this.world.html
    return this.ticks().y.map((o) => {
      console.log(o)
      let top = o.value * 100
      let style = `position:absolute; height:1px; opacity:0.4; top:${top}%; width:100%; width:100%; border-bottom:1px dashed ${this.attrs.stroke}; text-align:left;`
      return h`<span style=${style}></span>`
    })
  }
  build() {
    let h = this.world.html
    return h`<div style="">
      ${this.xTicks()}
      ${this.yTicks()}
    </div>`
  }
}
module.exports = Grid
