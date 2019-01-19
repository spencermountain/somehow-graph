const somehow = require('./src')
// const somehow = require('./builds/somehow')

let w = somehow({
  el: '#stage',
  height: 200,
  // width: 600,
  aspect: 'widescreen',
})

w.bar().color('purple').width(10).at("April 16 2019", 8)

let area = w.midArea()
area.set([
  [
    "April 6 2019",
    2
  ],
  [
    "June 13 2019",
    4
  ],
  [
    "July 13 2019",
    9
  ]
]
)


let img = w.image()
img.src('http://thensome.how/2018/04/assets/lastman-1970.jpg')
img.size(300, 200)
img.at("April 6 2019", 2)
img.caption('the end of walking')

w.fit()

w.y.fit(-9, 19);
w.x.fit('Jan 1 2019', 'Dec 31 2019');

let slider = w.slider()
document.querySelector('#control').innerHTML = slider.build()


console.log(w.state)

document.querySelector('#stage').innerHTML = w.build()
