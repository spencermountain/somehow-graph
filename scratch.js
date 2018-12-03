const somehow = require('./src')
let el = document.querySelector('#stage')
// el.innerHTML = '<h2>one.</h2>'

let w = somehow({
  height: 300,
  aspect: 'golden',
  el: el
})

let l = w.line()
l.add('aug 8 2017', 50)
l.add('june 5 2019', 10)
l.add('july 7 2019', 15)
l.add('july 8 2020', 18)

l.animateTo((l) => {
  l.draw(``)
  return l
})

//
// let l2 = w.line()
// l2.color('red')
// l2.add('june 5 2019', 10)
// l2.add('july 7 2020', 15)
//
// let dot = w.dot()
// dot.color('green')
// dot.at('july 7 2019', 15)
//
// let t = w.text()
// t.at('july 7 2019', 15)
// t.text('foo')

let h = w.line()
h.color('red')
h.add('may 1st 2019', '50%')
h.add('may 1st 2019', 75)
// h.width('30px')
// h.at('may 1st 2019')
// h.from(null, 25)
// h.to(null, 75)
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
