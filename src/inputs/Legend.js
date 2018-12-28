//a component for colors/names
class Legend {
  constructor(obj = {}, world) {
    this.obj = obj
    this.world = world
    this._orientation = 'col'
    this._width = null
    this._height = null
  }
  orientation(mode) {
    if (mode === 'row' || mode === 'landscape') {
      this._orientation = 'row'
    } else {
      this._orientation = 'col'
    }
    return this
  }
  width(w) {
    this._width = w
    return this
  }
  height(h) {
    this._height = h
    return this
  }
  build() {
    let obj = this.obj
    let h = this.world.html
    let inside = Object.keys(obj).map((k) => {
      return h`<div style="color:${obj[k]}; margin:8px;">
      <span style="background-color:${obj[k]}; display:inline-block; width:10px; height:10px; border-radius:50%;"/>
      ${k}
      </div>`
    })
    let style = 'justify-content:space-evenly; '
    if (this._width) {
      style += `width:${this._width}px;`
    }
    if (this._height) {
      style += `height:${this._height}px;`
    }
    return h`<div class=${this._orientation} style=${style}>
      ${inside}
      </div>
      `
  }
}

module.exports = Legend
