const somehow = require('./src')

let w = somehow({
  // height: 200
  // width: 700
})

let line = w.line()
line.set([
  ['june 5 2019', 10],
  ['july 7 2019', 15],
  ['july 7 2020', 18],
  ['aug 8 2021', 50]
])
line.grow(true)

// w.text('hello')
//   .at('july 7 2019', 15)
//   .responsive(true)

w.text('July 7')
  .at('july 7 2019', 15)
  .responsive(true)
  .grow(true)

w.yAxis.suffix('%')
// w.yAxis.prefix('%')
// console.log(w.yAxis.ticks([{ value: 20, label: '20%' }, { value: 40 }]))
// w.YAxis.ticks([40, 50]),

w.fit()

document.querySelector('#stage').innerHTML = w.build()
