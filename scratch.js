
var World = require('./src')
var world = new World()

let rect = world.add('rect')
// rect.height(20)
// rect.width(20)
// rect.center()
// rect.from(50, 50).to(75, 75).color('green')
// console.log(rect)

var svg = world.render()
console.log(svg)
