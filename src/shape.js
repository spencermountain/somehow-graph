import { interpolate } from "flubber"
// import d3Shape from 'd3-shape'
const defaults = {
  color: 'red',
  data: []
}

class Shape {
  constructor(obj, world) {
    this.world = world
    this.state = Object.assign({}, defaults, obj || {})
    this.path = this.makePath()
  // this.el = document.createElement('path');
  // world.el.appendChild(this.el);
  // this.el = document.createElement('div');
  // this.el.innerText = 'asdf'
  // world.el.appendChild(this.el);
  // this.el.setAttribute('fill', this.state.color)
  // this.el.setAttribute('d', this.makePath())
  }
  color(c) {
    this.state.color = c
  }
  animate(data) {
    var interpolator = interpolate(this.state.data, data);
    let t = 0
    let start = new Date().getTime()
    const draw = () => {
      let diff = new Date().getTime() - start
      let t = diff / 2000
      let d = interpolator(t)
      this.path = d
      console.log(this.state)
      if (t < 1) {
        requestAnimationFrame(draw);
      }
    }

    draw(t);
  }
  makePath() {
    // let points = this.data.map((o) => {
    //   return {
    //     x: this.world.x.scale(o.x),
    //     y: this.world.y.scale(o.y),
    //   }
    // })
    // return d3Shape.line().x(d => d.x).y(d => d.y).curve(d3Shape.curveMonotoneX)(points);
    return "M0.27639320225002106,1.4472135954999579L1,0L1.723606797749979,1.4472135954999579L2,2L0,2Z"
  }
  draw() {
    // let el = this.el
    return this
  }
}
export default Shape
