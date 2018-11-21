const Scale = require('./Scale')

class YScale extends Scale {
  constructor(data, world) {
    super(data, world);
    //use height instead of width
    this.to = data.height
    this.invert()
  }
  invert() {
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
  }
}
module.exports = YScale
