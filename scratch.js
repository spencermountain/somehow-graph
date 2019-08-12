const somehow = require('./src')

let world = somehow({
  height: 30,
  width: 500
})

world
  .line()
  .set([[-20, 1], [-2, 1]])
  .width(4)
  .color('slate')
world
  .text(['thinking', 'about it'])
  .at(-20, 2)
  .color('slate')

world
  .line()
  .set([[0, 1], [30, 1]])
  .width(4)
  .color('red')
world
  .text('being bad')
  .at(3, 2)
  .color('red')

world
  .line()
  .set([[31, 1], [60, 1]])
  .color('sky')
world
  .text('being better')
  .at(30, 2)
  .color('sky')

world
  .line()
  .set([[65, 1], [85, 1]])
  .color('green')
world
  .line()
  .set([[62, 0], [62, 3]])
  .color('grey')
  .width(1)

world
  .text('being appreciated')
  .at(65, 2)
  .color('green')

world
  .text(' → b e i n g  →  n i c e  →  t o  →  y o u r s e l f  →')
  .at(-5, -2)
  .font(13)
  .color('grey')

world.fit()
world.xAxis.remove()
world.yAxis.remove()

document.querySelector('#stage').innerHTML = world.build()
