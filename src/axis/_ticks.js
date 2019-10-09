const spacetimeTicks = require('spacetime-ticks')
const somehowTicks = require('somehow-ticks')

const generic = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = somehowTicks(start, end, n)
  if (axis._suffix) {
    ticks.forEach(tick => (tick.label += axis._suffix))
  }
  if (axis._prefix) {
    ticks.forEach(tick => (tick.label = axis._prefix + tick.label))
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
