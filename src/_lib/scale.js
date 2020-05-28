//a very-tiny version of d3-scale's scaleLinear
const scaleLinear = function (obj, num) {
  let world = obj.world || []
  let minmax = obj.minmax || []
  let range = minmax[1] - minmax[0]
  let percent = (num - minmax[0]) / range
  let size = world[1] - world[0]
  return parseInt(size * percent, 10)
}
module.exports = scaleLinear
