const spacetime = require('spacetime')
const prettyNum = require('./_prettyNum')

const drawTick = function(s, axis) {
  let scale = axis.scale.scale
  let label = null
  //support {label, value} format
  if (typeof s === 'object' && s !== null) {
    label = s.label
    s = s.value
  }
  //support 'june 5th'
  if (typeof s === 'string') {
    s = spacetime(s)
    return {
      num: s.epoch, //val
      pos: parseInt(scale(s.epoch), 10), //x/y
      label: label || s.format(axis._fmt || '{month} {year}'), //text
    }
  }
  //support '52'
  let num = Number(s)
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: label || prettyNum(num)
  }
}
module.exports = drawTick
