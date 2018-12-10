const fns = require('../_fns')
const colors = require('spencer-color')
const defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200,
}



class Slider {
  constructor(obj = {}, world) {
    if (typeof obj === 'string') {
      this.id = obj
      obj = {}
    }
    this.world = world
    this.data = obj.data || []
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this._title = ''
    this.onChange = function() {}
    this._labels = []
    this._value = obj.value
    if (this._value === undefined) {
      this._value = 50
    }
    this.id = obj.id || fns.uuid()
    this.callback = function(e) {
      console.log(e.target.value)
    }
    this.world.state[this.id] = this._value
  }
  labels(data) {
    this._labels = data.map((a) => {
      return {
        value: a[1],
        label: a[0],
      }
    })
    return this
  }
  place(x = 0) {
    let {max, min, size} = this.attrs
    let range = max - min
    let spot = x - min
    let percent = spot / range
    return percent * size
  }
  makeLabels() {
    let h = this.world.html
    return this._labels.map((o) => {
      let y = this.place(o.value)
      let style = `position:absolute; top:${y}px; font-size:10px; color:${colors.lightgrey}; left:10px;`
      return h`<div style="${style}"> ${o.label}</div>`
    })
  }
  title(str) {
    this._title = str
  }
  build() {
    let h = this.world.html
    let size = this.attrs.size
    let styles = {
      box: `position:relative; height:${size}px; width:100px;`,
      input: `transform: rotate(90deg); width:${size}px;  transform-origin: 0% 0%;`,
      title: `position:absolute; top:-20px; left:-20px; color:${colors.lightgrey}; font-size:14px;`
    }
    setTimeout(() => {
      let el = document.getElementById(this.id)
      el.addEventListener('input', (e) => {
        this.world.state[this.id] = e.target.value
        this.callback(e)
      })
    }, 50)
    return h`<div style="${styles.box}">
        <div style="${styles.title}">${this._title}</div>
        ${this.makeLabels()}
        <input type="range" id="${this.id}" style="${styles.input}" value=${this._value} ...${this.attrs}>
      </div>`;
  }
}
module.exports = Slider
