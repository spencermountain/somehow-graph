const somehow = require('./src')
// const somehow = require('./builds/somehow')

let w = somehow({
  el: '#stage',
  height: 200,
  // width: 600,
  aspect: 'widescreen'
})

w.bar()
  .color('purple')
  .width(10)
  .at('April 16 2019', 8)

let area = w.midArea()
area.set([['April 6 2019', 2], ['June 13 2019', 4], ['July 13 2019', 9]])

w.text(wo => 'slider: ' + wo.state.slider)
w.text(wo => 'input: ' + wo.state.input).at('20%', '20%')
w.text(wo => 'select: ' + wo.state.select).at('70%', '20%')
w.text(wo => 'plusMinus: ' + wo.state.plusMinus).at('20%', '80%')

w.fit()

w.y.fit(-9, 19)
w.x.fit('Jan 1 2019', 'Dec 31 2019')

let slider = w.slider()
document.querySelector('#control').innerHTML = slider.build()

let input = w.input().default('text!')
document.querySelector('#input').innerHTML = input.build()

let select = w
  .select()
  .choices(['cool', 'fun', 'bye'])
  .default('fun')
document.querySelector('#select').innerHTML = select.build()

let plusminus = w
  .plusMinus()
  .max(25)
  .min(0)
document.querySelector('#plusminus').innerHTML = plusminus.build()

document.querySelector('#stage').innerHTML = w.build()
