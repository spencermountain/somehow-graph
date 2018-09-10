/* eslint-disable */
var somehow = new window.somehow()

let rect = somehow.add('rect')
// world.add('rect').from(50, 50).to(75, 75).color('green')

somehow.width(500)
somehow.height(500)
// somehow.to(100, 100)

rect.width(75).height(75).center(50, 50).color('steelblue')

var svg = somehow.render()
document.getElementById("main").innerHTML = svg;
