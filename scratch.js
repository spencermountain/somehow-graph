//comment!
const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 300,
  aspect: 'widescreen',
  el: el
})

let l = w.line()
l.from(15, 10)
l.add(25, 15)
l.add(50, 50)

let l2 = w.line()
l2.from(5, 10)
l2.add(25, 25)
l2.add(52, 60)

// w.fit(-10, -200)
// w.from(-50, -50)
// w.to(150, 150)
// w.fit()

w.build()
