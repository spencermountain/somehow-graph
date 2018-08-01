const d3Scale = require('d3-scale')
const spacetime = require('spacetime')
const timeTicks = require('./time-ticks')

class Scale {
  constructor(obj) {
    this.type = obj.type || 'number'
    this.max = obj.max || 100
    this.min = obj.min || 0
    this.inverted = false
    if (this.type === 'time') {
      this.isTime(true)
    }
    this.scale = d3Scale.scaleLinear().range([0, 100]).domain([this.min, this.max])
  }
  reverse() {
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
    this.inverted = !this.inverted
    return this
  }
  rescale() {
    if (!this.inverted) {
      this.scale.domain([this.min, this.max])
    } else {
      this.scale.domain([this.max, this.min])
    }
  }
  start(num) {
    if (num !== undefined) {
      this.min = num
      this.rescale()
    }
    if (this.inverted) {
      return this.scale.range()[1]
    }
    return this.scale.range()[0]
  }
  end(num) {
    if (num !== undefined) {
      this.max = num
      this.rescale()
    }
    if (this.inverted) {
      return this.scale.range()[0]
    }
    return this.scale.range()[1]
  }
  isTime(bool) {
    if (bool) {
      this.type = 'time'
      this.max = spacetime(this.max).epoch
      this.min = spacetime(this.min).epoch
    } else {
      this.type = 'number'
    }
  }
  ticks(num) {
    if (this.type !== 'time') {
      return this.scale.ticks(num).map((n) => {
        return {
          val: n,
          text: String(n)
        }
      })
    } else {
      return timeTicks(spacetime(this.min), spacetime(this.max))
    }
  }

  fit(min, max) {
    this.min = min || this.min
    this.max = max || this.max
    this.rescale()
    return this
  }
}
module.exports = Scale
