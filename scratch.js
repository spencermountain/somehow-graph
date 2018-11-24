const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 300,
  aspect: 'golden',
  el: el
})

let l = w.line()
l.add('june 5 2019', 10)
l.add('july 7 2019', 15)
l.add('july 7 2020', 18)
l.add('aug 8 2017', 50)
l.add('aug 8 2018', 52)

// let l2 = w.line()
// l2.add(25, 25)
// l2.add(52, 60)
// l2.from(5, 10)
// console.log(l2.data)
// w.fit(-10, -200)
// w.from(-50, -50)
// w.to('sept 19 2028')
w.fit()

w.build()
