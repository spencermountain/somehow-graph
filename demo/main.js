/* eslint-disable */
var world = new window.makeWorld()

// world.add('rect').from(50, 50).to(75, 75).color('green')

world.height(500)
// world.height(200)
world.aspect('3:2')

let line = world.add('line')
line.color('green')
line.add(6, 2)
line.add(16, 7)
line.add(23, 17)
line.add(45, 19)
// world.add('line').data([12, 22, 20, 25, 80, 86, 100, 75]).color('red')

// world.fit()
var svg = world.render()
document.getElementById("main").innerHTML = svg;
