const Input = require('./Input')

class Select extends Input {
  constructor(obj = {}, world) {
    super(obj, world);
    this.id = obj.id || 'select'
    this._choices = []
  }
  choices(arr) {
    this._choices = arr
    return this
  }
  buildChoices() {
    let h = this.world.html
    return this._choices.map((c) => {
      let attr = {
        value: c,
      }
      if (c === this._value) {
        attr.selected = 'true'
      }
      return h`<option ...${attr}>${c}</option>`
    })
  }
  build() {
    let h = this.world.html
    this.setCallback()
    return h`<select id="${this._id}" style="font-size:1rem;">${this.buildChoices()}</select>`;
  }
}
module.exports = Select
