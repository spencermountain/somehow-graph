const Input = require('./Input')
const colors = require('spencer-color').colors

class PlusMinus extends Input {
  constructor(obj = {}, world) {
    super(obj, world);
    this.id = obj.id || 'plusMinus'
    if (this._value === '') {
      this._value = 0
    }
    this._min = null
    this._max = null
    this.world.state[this.id] = this._value
  }
  max(n) {
    this._max = n
    return this
  }
  min(n) {
    this._min = n
    return this
  }
  moreCallbacks() {
    setTimeout(() => {
      let text = document.getElementById(this.id)
      // inc button listener
      let inc = document.getElementById(this.id + '-inc')
      inc.addEventListener('click', () => {
        this._value = Number(this._value)
        if (this._max === null || this._value < this._max) {
          this._value += 1
        }
        text.value = this._value
        this.callback(this._value)
      })
      // dec button listener
      let dec = document.getElementById(this.id + '-dec')
      dec.addEventListener('click', () => {
        this._value = Number(this._value)
        if (this._max === null || this._value > this._min) {
          this._value -= 1
        }
        text.value = this._value
        this.callback(this._value)
      })
    }, 52)
  }
  buildStyle() {
    return {
      input: `width:3rem; max-height:1.2rem; text-align:center; font-size:1.3rem; color:${colors.grey};`,
      btn: `height:1.5rem; color:${colors.grey};`
    }
  }
  build() {
    let h = this.world.html
    this.setCallback()
    this.moreCallbacks()
    let styles = this.buildStyle()
    return h`<div>
      <input type="button" id="${this.id + '-dec'}" style="${styles.btn}" value="-"/>
      <input type="text" id="${this.id}" style="${styles.input}" value="${this._value}"/>
      <input type="button" id="${this.id + '-inc'}" style="${styles.btn}" value="+"/>
    </div>`;
  }
}
module.exports = PlusMinus
