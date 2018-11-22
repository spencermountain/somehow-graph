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

w.build()
