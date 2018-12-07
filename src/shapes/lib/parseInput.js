const {parseX, parseY} = require('../../parse')

//a very-flexible input language
const parseStr = function(str = '', world) {
  let lines = str.split(/\n/g)
  lines = lines.filter((l) => l)
  lines = lines.map((line) => {
    let split = line.split(/(,|\t) ?/)
    let x = parseX(split[0], world)
    let y = parseX(split[2], world)
    return {
      x: x,
      y: y
    }
  })
  return lines
}

const parseInput = function(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world)
  }
  return set.map((a) => {
    let x = parseX(a[0], world)
    let y = parseY(a[1], world)
    return {
      x: x,
      y: y
    }
  })
}

module.exports = parseInput
