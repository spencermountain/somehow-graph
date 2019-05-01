const somehow = require('./src')

let w = somehow({
  el: '#stage',
  height: 300,
  aspect: 'widescreen'
})

w.line()
  .set([['Jan 21st 2019', '0%'], ['Jan 22nd 2019', '80']])
  .color('blue')

w.line()
  .set([['Feb 1st 2019', '0%'], ['Feb 1st 2019', '80']])
  .color('red')

//horizontal
w.line()
  .set([['jan 2 2019', 7], ['jan 8 2019', 7]])
  .color('blue')

w.line()
  .set([['jan 2 2019', -17], ['jan 8 2019', -17]])
  .color('red')

w.fit()
w.y.fit(-9, 80)
w.x.fit('Jan 1 2019', 'Jan 28 2019')
w.x.clip()
w.y.clip()

document.querySelector('#stage').innerHTML = w.build()
