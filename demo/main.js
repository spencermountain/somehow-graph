/* eslint-disable */
var somehow = new window.somehow()

// world.add('rect').from(50, 50).to(75, 75).color('green')

somehow.width(500)
somehow.height(500)

somehow.to(10, 100)
somehow.add('rect').height(50).width(4).center(4, 50) //.color('steelblue')
// somehow.add('rect').from(2, 20).to(6, 90) //.color('steelblue')

somehow.add('line').data([22, 22, 22, 25, 80, 90, 100, 75]).color('green')

somehow.fit()

var svg = somehow.render()
document.getElementById("main").innerHTML = svg;
