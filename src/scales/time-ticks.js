const spacetime = require('spacetime')
const max = 7
// const min = 3

const getAll = function(unit, start, end) {
  let ticks = [start.epoch]
  start = start.add(1, unit)
  let d = start.startOf(unit)
  while (d.isBefore(end)) {
    ticks.push(d.epoch)
    d.add(1, unit)
  }
  return ticks
}

//remove odd-numbers of ticks, until size is right
const shrinkIt = function(ticks) {
  while (ticks.length > max) {
    console.log(ticks.length)
    ticks = ticks.filter((t, i) => i % 2 === 0)
  }
  return ticks
}

const formatTicks = function(ticks, format) {
  const fmts = {
    years: (d) => {
      return d.format('year')
    },
    months: (d) => {
      return d.format('month')
    },
    days: (d) => {
      return d.format('month-short') + ' ' + d.format('date')
    },
    hours: (d) => {
      return d.format('hour')
    },
    minutes: (d) => {
      return d.format('time')
    },
  }
  return ticks.map((n) => {
    return {
      val: n,
      text: fmts[format](spacetime(n))
    }
  })
}

//
const timeTicks = function(start, end) {
  let ticks = []
  let diff = start.diff(end)
  let format = null
  if (diff.years > 2) {
    format = 'years'
    ticks = getAll(format, start, end)
  } else if (diff.months > 2) {
    format = 'months'
    ticks = getAll(format, start, end)
  } else if (diff.days > 2) {
    format = 'days'
    ticks = getAll(format, start, end)
  } else if (diff.hours > 2) {
    format = 'hours'
    ticks = getAll(format, start, end)
  } else if (diff.minutes > 2) {
    format = 'minutes'
    ticks = getAll(format, start, end)
  }
  ticks = shrinkIt(ticks)
  ticks = formatTicks(ticks, format)
  return ticks
}
module.exports = timeTicks
