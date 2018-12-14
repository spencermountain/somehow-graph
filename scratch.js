const somehow = require('./src')

let world = somehow({
  height: 300,
  aspect: 'golden',
})

let line = world.line()
line.set(`
June 5 2019, 10
July 7 2019, 15
July 7 2020, 18
Aug 8 2021, 50
`)
world.fit()
world.xAxis.format('{month-short} {date-ordinal}')
world.xAxis.ticks(['June 5 2019', 'July 1 2020'])
world.yAxis.ticks([30, 25])

document.body.innerHTML = world.build()
