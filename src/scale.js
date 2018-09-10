const d3Scale = require('d3-scale')

class Scale {
  constructor() {
    this.state = {
      isTime: false,
      start: 0,
      end: 100,
    }
  }
  from(start) {
    this.state.start = start
    return this
  }
  to(end) {
    this.state.end = end
    return this
  }
  set(num) {
    let state = this.state
    let scale = d3Scale.scaleLinear().range([0, 100]).domain([state.start, state.end])
    return scale(num)
  }
}
const aliases = {
  start: 'from',
  min: 'from',
  end: 'to',
  max: 'to',
}
Object.keys(aliases).forEach((k) => Scale.prototype[k] = Scale.prototype[aliases[k]])
module.exports = Scale
