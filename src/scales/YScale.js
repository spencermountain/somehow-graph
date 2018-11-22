const Scale = require('./Scale')

class YScale extends Scale {
  constructor(data, world) {
    super(data, world);
    //use height instead of width
    this.to = world.height
  }
  invert() {
    console.log(`~=~=~**here**~=~`)
    let arr = this.scale.domain()
    this.scale = this.scale.domain([arr[1], arr[0]])
    return this
  }
}
module.exports = YScale
