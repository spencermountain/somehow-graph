const extent = function(arr) {
  let min = null
  let max = null
  arr.forEach((a) => {
    if (min === null || a < min) {
      min = a
    }
    if (max === null || a > max) {
      max = a
    }
  })
  return {
    min: min,
    max: max
  }
}
module.exports = {
  extent: extent
}
