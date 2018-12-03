const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 300,
  aspect: 'golden',
  el: el
})

let l = w.line()
l.set(`
june 5 1999, 7
june 10 1999, 25px
july 10 1999, 75%
july 12 1999, 10
`)
w.fit()

w.build()
