const scaleLinear = require('d3-scale').scaleLinear
const spacetime = require('spacetime')

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 100

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.rescale()
  }
  rescale() {
    //give it a little bit of room..
    let max = this.max //* this.world.wiggle_room
    this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, max])
  }
  byPercent(num = 0) {
    if (num > 1) {
      num = num / 100
    }
    let diff = this.max - this.min
    return (diff * num) + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    if (format !== this._format) {
      console.log('--new--')
    }
    this._format = format
    return this
  }
  debug() {
    if (this.format() === 'date') {
      let left = spacetime(this.min).format('full')
      let right = spacetime(this.max).format('full')
      console.log(left + ' -> ' + right)
      console.log(this.min + '    ->   ' + this.max)
      console.log('      ' + this.from + 'px        ->     ' + this.to + 'px')
    } else {
      console.log(this.min + ' -> ' + this.max)
    }
  }

}

module.exports = Scale
