const colors = require('spencer-color').colors
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
  buildStyle(color) {
    color = colors[color] || color
    return {
      box: `color:${color}; margin:8px;`,
      line: `background-color:${color}; display:inline-block; width:15px; height:5px; border-radius:2px; margin-right:3px;`
    }
  }
  build() {
    let obj = this.obj
    let h = this.world.html
    let inside = Object.keys(obj).map((k) => {
      let style = this.buildStyle(obj[k])
      return h`<div style="${style.box}">
        <span style="${style.line}"/>
        ${k}
      </div>`
    })
    let container = `display:flex; justify-content: space-around; align-items: flex-start; text-align:left;`
    if (this._width) {
      container += `width:${this._width}px;`
    }
    if (this._height) {
      container += `height:${this._height}px;`
    }
    return h`<div class=${this._orientation} style=${container}>
      ${inside}
      </div>
      `
  }
}

module.exports = Legend
