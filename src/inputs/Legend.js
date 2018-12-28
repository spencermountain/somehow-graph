//a component for colors/names
class Legend {
  constructor(obj = {}, world) {
    this.obj = obj
    this.world = world
  }
  build() {
    let obj = this.obj
    let h = this.world.html
    let inside = Object.keys(obj).map((k) => {
      return h`<div style="color:${obj[k]}">
      <span style="background-color:${obj[k]}; display:inline-block; width:10px; height:10px; border-radius:50%;"/>
      ${k}
      </div>`
    }).join('')
    return `<div class="">
      ${inside}
      </div>
      `
  }
}

module.exports = Legend
