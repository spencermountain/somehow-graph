let world = window.makeWorld()

// world.addLine([25, 40, 90, 75, 55, 65])
//
world.addLine([5, 10, 90, 55, 55, 45], {
  stroke: 'red',
  order: 1
})
// world.addArea([5, 5, 10, 33, 10, 15, 22, 25, 28, 32], {
//   stroke: '#6c7f9c'
// })
// world.addText('go Jays!', {
//   x: 5,
//   y: 50
// })
// world.addSquare({
//   x: 7,
//   y: 50,
//   size: 10 //y-axis?
// }, {
//   fill: 'green',
//   order: 4
// })
// world.addRect({
//   x: 5,
//   y: 50,
//   width: 4,
//   height: 20,
// }, {
//   rotate: 50,
//   order: 2
// })

world.addXAxis({
  y: 0,
})
world.addYAxis({
  y: 0,
})
world.fit()
let svg = world.build()
document.getElementById('main').innerHTML = svg
