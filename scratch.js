const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 200,
  aspect: 'widescreen',
  el: el
})

let l = w.line()
l.set(`
june 5 2018, 7
june 10 2018, 25px
july 10 2018, 75%
july 12 2018, 10
`)
let txt = w.text('cool')
txt.set('june 10 2018, 25px')

w.fit()
w.x.fit('Jan 1 2018', 'Dec 31 2018')
w.xAxis.ticks(12)
w.yAxis.remove()
w.build()
