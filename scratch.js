const somehow = require('./src')

let w = somehow({
  aspect: 'widescreen',
  height: 100
})

w.title('title')

w.line()
  .set([['Jan 12 2019', 200], ['Jan 21 2019', 4200], ['Jan 28 2019', 5000]])
  .color('blue')

w.text('hello').set([['Jan 20 2019', 900]])

w.fit()

document.querySelector('#stage').innerHTML = w.build()
