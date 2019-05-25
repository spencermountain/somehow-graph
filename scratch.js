const somehow = require('./src')

let w = somehow({
  height: 300,
  aspect: 'widescreen'
})

w.line()
  .set([['Jan 12 2019', -900], ['Jan 28 2019', 5000]])
  .color('blue')

w.text('hello')
  .set([['Jan 12 2019', 809]])
  .center()
  .color('blue')

w.now()
  .label('now')
  .top()

w.title('the end of times 🌎').bottom()
// w.fit()
w.y.fit(-9, 8000)
w.x.fit('Jan 12 2019', 'Dec 28 2019')
w.clip()
// w.x.reverse()

document.querySelector('#stage').innerHTML = w.build()
