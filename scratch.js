const spacetime = require('spacetime')
const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 300,
  aspect: 'golden',
  el: el
})

let l = w.line()
l.from('june 5 2019', 10)
l.add('july 7 2019', 15)
l.add('aug 8 2019', 50)

// let l2 = w.line()
// l2.from(5, 10)
// l2.add(25, 25)
// l2.add(52, 60)

// w.fit(-10, -200)
// w.from(-50, -50)
// w.to(150, 150)
w.fit()

w.build()
