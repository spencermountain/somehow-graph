//a very-tiny version of d3-scale's scaleLinear
const scaleLinear = function(obj) {
  let world = obj.world || []
  let minmax = obj.minmax || []
  const calc = num => {
    let range = minmax[1] - minmax[0]
    let percent = (num - minmax[0]) / range
    let size = world[1] - world[0]
    return parseInt(size * percent, 10)
  }
  // invert the calculation. return a %?
  calc.backward = num => {
    let size = world[1] - world[0]
    let range = minmax[1] - minmax[0]
    let percent = (num - world[0]) / size
    return parseInt(percent * range, 10)
  }
  return calc
}
module.exports = scaleLinear

// let scale = scaleLinear({
//   world: [0, 300],
//   minmax: [0, 100]
// })
// console.log(scale(50))
// console.log(scale.backward(150))
