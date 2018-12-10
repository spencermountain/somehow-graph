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

/* eslint no-bitwise: 0 */
const uuid = function() {
  return (Math.random() + 1).toString(36).substring(7);
// return 'xxxxx'.replace(/[xy]/g, function(c) {
//   var r = Math.random() * 16 | 0,
//     v = c === 'x' ? r : (r & 0x3 | 0x8);
//   return v.toString(16);
// });
}

module.exports = {
  extent: extent,
  uuid: uuid
}
