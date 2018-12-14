const spacetime = require('spacetime')
const prettyNum = require('./_prettyNum')

const drawTick = function(s, axis) {
  let scale = axis.scale.scale
  if (typeof s === 'string') {
    s = spacetime(s)
    return {
      num: s.epoch, //val
      pos: parseInt(scale(s.epoch), 10), //x/y
      label: s.format(axis._fmt || '{month} {year}'), //text
    }
  }
  let num = Number(s)
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: prettyNum(num)
  }
}
module.exports = drawTick
