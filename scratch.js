const somehow = require('./src')

let world = somehow({
  height: 300,
  aspect: 'golden',
})

let line = world.line()
line.set([
  ['june 5 2019', 10],
  ['july 7 2019', 15],
  ['july 7 2020', 18],
  ['aug 8 2021', 50],
])
world.fit()

document.body.innerHTML = world.build()
