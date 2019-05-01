const extent = function(arr) {
  let min = null
  let max = null
  arr.forEach(a => {
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

/* eslint no-bitwise: 0 */
//may need to change when the term really-transforms? not sure.
const uid = str => {
  let nums = ''
  for (let i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10)
  }
  return str + '-' + nums
}

module.exports = {
  extent: extent,
  uid: uid
}
