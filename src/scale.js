const d3Scale = require('d3-scale')
const spacetime = require('spacetime')

class Scale {
  constructor(obj) {
    this.type = obj.type
    this.max = obj.max || 100
    this.min = obj.min || 0
    if (this.type === 'time') {
      this.max = spacetime(this.max).epoch
      this.min = spacetime(this.min).epoch
    }
    this.scale = d3Scale.scaleLinear().range([0, 100]).domain([this.min, this.max])
  }
  reverse() {
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
    return this
  }
  fit(min, max) {
    console.log(min, max)
    this.scale.domain([min, max])
    return this
  }
}
module.exports = Scale
