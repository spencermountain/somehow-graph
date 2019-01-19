// const fns = require('../_fns')
const colors = require('spencer-color')
const Input = require('./Input')
const defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200,
}

class Slider extends Input {
  constructor(obj = {}, world) {
    super(obj, world)
    this.attrs = Object.assign({}, defaults, this.attrs)
    this.data = obj.data || []
    this.style = {}
    this._title = ''
    this._labels = []
    this._orientation = 'horizontal'
    if (this._value === '') {
      this._value = 50
    }
    this.id = obj.id || 'slider'
    this.world.state[this.id] = this._value
  }
  orientation(str) {
    this._orientation = str
    return this
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
  makeStyle() {
    let size = this.attrs.size
    let styles = {
      box: `position:relative; width:${size}px; height:60px;`,
      input: `width:${size}px;`,
      title: `position:absolute; top:-20px; left:-20px; color:${colors.lightgrey}; font-size:14px;`
    }
    if (this._orientation === 'vertical') {
      styles.input += `transform: rotate(90deg); transform-origin: 0% 0%;`
      styles.box = `position:relative; height:${size}px; width:100px;`
    }
    return styles
  }
  build() {
    let h = this.world.html
    this.setCallback()
    let styles = this.makeStyle()
    return h`<div style="${styles.box}">
        <div style="${styles.title}">${this._title}</div>
        ${this.makeLabels()}
        <input type="range" id="${this.id}" style="${styles.input}" value=${this._value} ...${this.attrs}/>
      </div>`;
  }
}
module.exports = Slider
