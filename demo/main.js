let world = makeWorld()

world.addLine([25, 40, 90, 75, 55, 65])

world.addLine([5, 10, 90, 55, 55, 45], {
  stroke: 'red'
})

let svg = world.build()
document.getElementById('main').innerHTML = svg
