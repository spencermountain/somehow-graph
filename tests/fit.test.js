var test = require('tape')
var World = require('../src')

test('fit two shapes:', function(t) {
  let somehow = new World()
  somehow.width(500)
  somehow.height(500)
  somehow.add('rect').from(-10, 50).to(110, 90).color('steelblue')
  somehow.add('rect').from(180, 15).to(190, 60).color('red')

  somehow.fit()
  t.equals(somehow.x.state.start, -10, 'min x is negative')
  t.equals(somehow.y.state.start, 15, 'min y is small')

  t.equals(somehow.x.state.end, 190, 'max x is biggest')
  t.equals(somehow.y.state.end, 90, 'min y is biggest')

  var svg = somehow.render()
  t.ok(typeof svg === 'string', 'render does-not-throw')

  t.end()
})

test('custom fit input:', function(t) {
  let somehow = new World()
  somehow.add('rect').from(0, 0).to(50, 50)
  somehow.fit()
  t.equals(somehow.x.state.end, 50, 'max 50 fit')
  somehow.fit(75, 75)
  t.equals(somehow.x.state.end, 75, 'force x-fit 75')
  t.equals(somehow.y.state.end, 75, 'force y-fit 75')
  t.end()
})
