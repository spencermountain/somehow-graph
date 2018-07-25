const d3Scale = require('d3-scale')

class Scale {
  constructor(obj) {
    this.type = obj.type
    this.max = obj.max || 100
    this.min = obj.min || 0
    this.scale = d3Scale.scaleLinear().range([0, 100]).domain([obj.min, obj.max])
  }
  reverse() {
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
    return this
  }
  fit(min, max) {
    this.scale.domain([min, max])
    return this
  }
}
module.exports = Scale
