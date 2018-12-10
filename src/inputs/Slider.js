const defaults = {
  min: 0,
  max: 100,
  value: 50,
  step: 1
}

class Slider {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this.onChange = function() {}
  }
  build() {
    let h = this.world.html
    // .slider-wrapper {
    //   display: inline-block;
    //   width: 20px;
    //   height: 150px;
    //   padding: 0;
    // }
    // .slider-wrapper input {
    //   width: 150px;
    //   height: 20px;
    //   margin: 0;
    //   transform-origin: 75px 75px;
    //   transform: rotate(-90deg);
    // }
    return h`
  <div class="">
    <input type="range" ...${this.attrs}>
  </div>
  `;
  }
}
module.exports = Slider
