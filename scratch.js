const somehow = require('./src')

let w = somehow({
  height: 200,
  // width: 600,
  aspect: 'widescreen',
})

let line = w.line()
line.set([
  ['June 5 2019', 2],
  ['July 7 2019', 5],
  ['July 9 2019', 20],
  ['Nov 8 2019', 2],
  ['Dec 8 2019', 2],
// ['Aug 9 2019', '10px'],
])
w.fit()
console.log(w.x)
// w.x.fit('jan 1 2018', 'jan 2 2022')
// w.xAxis.ticks(['June 5 2019', 'July 1 2020'])


document.querySelector('#stage').innerHTML = w.build()
