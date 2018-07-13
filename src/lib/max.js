const max = (nums) => {
  let top = nums[0]
  nums.forEach((n) => {
    if (n > top) {
      top = n
    }
  })
  return top
}
module.exports = max
