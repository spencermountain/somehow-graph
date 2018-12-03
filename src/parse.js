const spacetime = require('spacetime')
//
const parse = function(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      val: str
    }
  }
  let num = Number(str)
  if (!isNaN(num)) {
    return {
      type: 'number',
      val: num
    }
  }
  let s = spacetime(str)
  if (s.isValid()) {
    return {
      type: 'date',
      val: s.epoch
    }
  }
  console.warn('Counldn\'t parse: ' + str)
  return {
    type: 'unknown',
    val: null
  }
}

const parseX = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.x.format(res.type)
  }
  return res.val || 0
}
const parseY = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.y.format(res.type)
  }
  return res.val || 0
}

module.exports = {
  parseX: parseX,
  parseY: parseY
}
