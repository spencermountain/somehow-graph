const spacetime = require('spacetime')
//
const parse = function(str) {
  if (typeof str === 'number') {
    return str
  }
  let num = Number(str)
  if (!isNaN(num)) {
    return num
  }
  let s = spacetime(str)
  console.log(s)
  return str
}
module.exports = parse
