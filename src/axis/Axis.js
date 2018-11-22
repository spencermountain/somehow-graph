const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1
}

class Axis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
  }
  ticks(n = 4) {
    n = n === 0 ? 0 : n - 1
    let scale = this.world.xScale.scale
    let max = this.world.width
    let ticks = []
    for (let i = 0; i <= n; i += 1) {
      let dec = i / n
      let label = parseInt(scale(max * dec), 10)
      ticks.push({
        pos: max * dec,
        label: label
      })
    }
    return ticks
  }

}

module.exports = Axis
