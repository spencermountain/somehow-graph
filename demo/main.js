let world = makeWorld({
  x: {
    max: 10,
    min: 0
  },
  y: {
    max: 100,
    min: 0
  },
})

world.addLine([25, 40, 90, 75])

world.addLine([5, 10, 90, 55], {
  stroke: 'red'
})

let el = document.getElementById('main')
let svg = world.build()
el.innerHTML = svg
