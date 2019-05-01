const { parseX, parseY } = require('../../parse')

//a very-flexible input language
const parseStr = function(str = '', world) {
  let lines = str.split(/\n/g)
  lines = lines.filter(l => l)
  lines = lines.map(line => {
    let split = line.split(/(,|\t) ?/).map(s => s.trim())
    let x = parseX(split[0], world)
    let y = parseY(split[2], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (split[4] !== undefined) {
      obj.y2 = parseY(split[4], world)
    }
    return obj
  })
  return lines
}

const parseInput = function(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world)
  }
  return set.map(a => {
    let x = parseX(a[0], world)
    let y = parseY(a[1], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (a[2] !== undefined) {
      obj.y2 = parseY(a[2], world)
    }
    return obj
  })
}

module.exports = parseInput
