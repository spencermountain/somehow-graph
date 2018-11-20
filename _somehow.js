import { scaleLinear } from "d3-scale"
import Shape from "./shape"

class World {
  constructor() {
    this.start = null
    this.interpolator = null
    this.yScale = scaleLinear()
    this.xScale = scaleLinear()
    this.shapes = []
  }
  line(attrs) {
    let s = new Shape(attrs, this)
    this.shapes.push(s)
    return s
  }
}

export default World
