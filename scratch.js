const somehow = require('./src')

let w = somehow({
  height: 200,
  // width: 600,
  aspect: 'widescreen',
})

let line = w.line()
line.set(`
June 5 2019, 10
July 7 2019, 15
July 7 2020, 18
Aug 8 2021, 50
`)
w.fit()
w.x.fit('jan 1 2018', 'jan 2 2022')
w.xAxis.format('{month-short} {date-ordinal}')
w.xAxis.ticks(['June 5 2019', 'July 1 2020'])
w.yAxis.ticks([
  {
    value: 30,
    label: 'thirty'
  },
  {
    value: 25
  }
])

document.querySelector('#stage').innerHTML = w.build()
