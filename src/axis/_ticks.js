const spacetime = require('spacetime')
const memo = {}
const day = 60 * 60 * 24 * 1000
const month = day * 30
const year = day * 368

const prettyNum = function(num) {
  num = parseFloat(num)
  if (num > 2000000) {
    num = parseInt(num / 1000, 10) * 1000
  }
  if (num > 2000) {
    num = parseInt(num / 1000, 10) * 1000
  }
  return num.toLocaleString()
}

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
      label: prettyNum(num)
    })
  }
  return ticks
}

const chooseFmt = function(scale) {
  let diff = scale.max - scale.min
  if (diff > year * 3) {
    return 'yyyy'
  }
  if (diff > year) {
    return 'MMM yyyy'
  }
  if (diff > month) {
    return 'MMM' // Sept
  }
  if (diff < day) {
    return 'h:mm a'
  }
  return 'MMM d'
}


const date = function(axis, n = 5) {
  let ticks = generic(axis, n)
  let fmt = chooseFmt(axis.scale)
  ticks = ticks.map((o) => {
    if (memo[o.num]) {
      o.label = memo[o.num]
    } else {
      o.label = spacetime(o.num).format(fmt)
    }
    return o
  })
  return ticks
}
module.exports = {
  generic: generic,
  date: date,
}
