let world = window.makeWorld()

// world.addLine([25, 40, 90, 75, 55, 65])

let points = [
  {
    x: 'Jan 1, 2018',
    y: 10
  },
  {
    x: 'Jan 2, 2018',
    y: 30
  },
  {
    x: 'Jan 3, 2018',
    y: 40
  },
  {
    x: 'Jan 4, 2018',
    y: 45
  }
]
world.addArea(points)

world.addXAxis({
  y: 0,
})
world.addYAxis({
  x: 'Jan 1, 2018',
})
let svg = world.build()
document.getElementById('main').innerHTML = svg

setTimeout(() => {
  world.fit()
  document.getElementById('main').innerHTML = world.build()
}, 2000)
