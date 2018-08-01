let world = window.somehow({
  width: 400,
  height: 400,
})

// let world = somehow.makeWorld()

world.addLine([25, 40, 90, 75, 55, 65])

// let points = [
//   {
//     y: 100,
//     x: 'Jan 12th 2018',
//   },
//   {
//     y: 280,
//     x: 'Jan 20th 2018',
//   },
//   {
//     y: 300,
//     x: 'Jan 30th 2018',
//   }
// ]
// world.addArea(points)

world.addXAxis({
  // y: 30
})
world.addYAxis({
  // x: 'March 1, 2018',
})
world.fit()
// world.y.start(0)

// world.x.start(5)
// world.x.end(-2)
let svg = world.build()
document.getElementById('main').innerHTML = svg

// setTimeout(() => {
//   document.getElementById('main').innerHTML = world.build()
// }, 2000)
