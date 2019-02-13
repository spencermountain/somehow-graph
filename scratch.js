const somehow = require('./src')
// const somehow = require('./builds/somehow')

let w = somehow({
  el: '#stage',
  height: 200,
  // width: 600,
  aspect: 'widescreen',
})

w.bar().color('purple').width(10).at("April 16 2019", 8).title('hello-bar')

let area = w.midArea().title('hello-area!')
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

let start = ['200px', '200px']
w.arrow().set([start, ['200px', '100px']])
w.dot().radius(6).color('green').at(start[0], start[1])
w.fit()

w.y.fit(-9, 19);
w.x.fit('Jan 1 2019', 'Dec 31 2019');


document.querySelector('#stage').innerHTML = w.build()
