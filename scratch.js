const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 200,
  aspect: 'widescreen',
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
w.y.fit(0, 10)
w.xAxis.ticks(12)
let svg = w.build()
el.innerHTML = svg



// html`<h1 id=hello>Hello world!</h1>`
