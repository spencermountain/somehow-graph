const mil = 1000000
const tenThou = 10000
const thou = 1000

const prettyNum = function(num) {
  num = parseFloat(num)
  if (num >= mil) {
    num = parseInt(num / 100000, 10) * 100000
    return (num / mil) + 'm'
  }
  if (num >= tenThou) {
    num = parseInt(num / thou, 10) * thou
    return (num / thou) + 'k'
  }
  if (num >= thou) {
    num = parseInt(num / 100, 10) * 100
    return (num / thou) + 'k'
  }
  return num.toLocaleString()
}
module.exports = prettyNum
