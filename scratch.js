const somehow = require('./src')

let w = somehow({
  // height: 200
  // width: 700
})

let line = w.line()
line.set([['june 5 2019', 10], ['july 7 2019', 15], ['july 7 2020', 18], ['aug 8 2021', 50]])

// w.text('hello')
//   .at('july 7 2019', 15)
//   .responsive(true)

w.text('size')
  .at('july 7 2019', 15)
  .responsive(true)

w.fit()

document.querySelector('#stage').innerHTML = w.build()
