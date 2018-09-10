/* eslint-disable */
var somehow = new window.somehow()

// world.add('rect').from(50, 50).to(75, 75).color('green')

somehow.width(500)
somehow.height(500)
somehow.to(100, 100)

somehow.add('rect').from(-10, -10).to(110, 90).color('steelblue')
somehow.add('rect').from(180, 50).to(190, 60).color('red')

somehow.fit()
somehow.fit(50)
// somehow.fit(-50, -50)

var svg = somehow.render()
document.getElementById("main").innerHTML = svg;
