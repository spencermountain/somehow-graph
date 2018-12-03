const spacetime = require('spacetime')
//
const parse = function(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      value: str
    }
  }
  //support pixels
  if (/[0-9]px$/.test(str)) {
    return {
      type: 'pixel',
      value: Number(str.replace(/px/, ''))
    }
  }
  //support percentages
  if (/[0-9]%$/.test(str)) {
    let num = Number(str.replace(/%/, ''))
    return {
      type: 'percent',
      value: num
    }
  }
  //try a straight-up number
  let num = Number(str)
  if (!isNaN(num)) {
    return {
      type: 'number',
      value: num
    }
  }
  //try a date
  let s = spacetime(str)
  if (s.isValid()) {
    return {
      type: 'date',
      value: s.epoch
    }
  }
  console.warn('Counldn\'t parse: ' + str)
  return {
    type: 'unknown',
    value: null
  }
}

const parseX = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.x.format(res.type)
  }
  return res
}

const parseY = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.y.format(res.type)
  }
  return res
}

module.exports = {
  parseX: parseX,
  parseY: parseY
}
