const makeWorld = require('./src')


let world = makeWorld({
  x: {
    max: 100,
    min: 0
  },
  y: {
    max: 100,
    min: 0
  },
})

console.log(world.addLine([25, 40, 90, 75]))
console.log(world.addLine([5, 90, 10, 75]))
