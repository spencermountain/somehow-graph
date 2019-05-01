const spacetimeTicks = require('spacetime-ticks')
const prettyNum = require('./_prettyNum')

const generic = function(axis, n = 5) {
  n = n === 0 ? 0 : n - 1
  let scale = axis.scale
  let total = (scale.max || 0) - (scale.min || 0)
  if (total === 0) {
    total = 10
    scale.max = 10
    scale.min = 0
  }
  let ticks = []
  for (let i = 0; i <= n; i += 1) {
    let dec = i / n
    let num = dec * total + (scale.min || 0)
    let tmp = num - (scale.min || 0)
    let percent = tmp / total
    ticks.push({
      value: percent,
      pos: scale.scale(num),
      label: prettyNum(num)
    })
  }
  return ticks
}

const date = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = spacetimeTicks(start, end, n)
  return ticks
}
module.exports = {
  generic: generic,
  date: date
}
