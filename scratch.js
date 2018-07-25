
var makeWorld = require('./src')
var world = makeWorld()

world.addLine([25, 40, 90, 75, 55, 65])

world.addLine([5, 10, 90, 55, 55, 45], {
  stroke: 'red'
})
world.addArea([5, 5, 10, 33, 10, 15], {
  stroke: 'red'
})
world.addText('go Jays!', {
  x: 50,
  y: 50
})

var svg = world.build()
console.log(svg)
