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
l.from(20, 0)
// l.add(25, 5)
l.add(50, 50)
console.log(l.data)

w.build()
