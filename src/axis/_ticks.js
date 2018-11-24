const spacetime = require('spacetime')
//
const generic = function(axis, n = 5) {
  n = n === 0 ? 0 : n - 1
  let scale = axis.scale
  let total = scale.max - scale.min
  let ticks = []
  for (let i = 0; i <= n; i += 1) {
    let dec = i / n
    let num = (dec * total) + scale.min
    ticks.push({
      num: num,
      pos: scale.scale(num),
      label: parseInt(num, 10)
    })
  }
  return ticks
}

const chooseFmt = function(scale) {
  let min = spacetime(scale.min)
  let max = spacetime(scale.max)
  let diff = min.diff(max)
  if (diff.years > 0) {
    return 'MMM yyyy'
  }
  if (diff.months > 0) {
    return 'MMM d'
  }
  if (diff.days > 0) {
    return 'h:mm a'
  }
  return 'MMM d'
// return 'iso-short'
}

const date = function(axis, n = 5) {
  let ticks = generic(axis, n)
  let fmt = chooseFmt(axis.scale)
  ticks = ticks.map((o) => {
    o.label = spacetime(o.num).format(fmt)
    return o
  })
  return ticks
}
module.exports = {
  generic: generic,
  date: date,
}
