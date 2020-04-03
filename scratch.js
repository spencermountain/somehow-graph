const somehow = require('./src')
const colors = require('spencer-color').combos.bloor
let w = somehow({
  // height: 200
  // width: 700
})

let nums = [30, 60, 20, 30, 10]

for (let i = 0; i < 25; i++) {
  let y = i
  let already = 0
  colors.forEach((c, k) => {
    let rect = w.rect()
    if (Math.random() > 0.8) {
      nums[k] += 6
    }
    if (Math.random() > 0.6) {
      nums[k] += 6
    }
    if (Math.random() < 0.2) {
      nums[k] -= 6
    }
    if (Math.random() < 0.4) {
      nums[k] -= 6
    }
    if (nums[k] < 0) {
      nums[i] = 0
    }
    rect.set([
      [already, y],
      [already + nums[k], y + 0.5]
    ])
    already += nums[k] + 0.1
    rect.rounded(0)
    rect.color(c)
    rect.opacity(1)
  })
}

w.fit()

document.querySelector('#stage').innerHTML = w.build()
