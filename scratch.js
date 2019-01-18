const somehow = require('./src')
// const somehow = require('./builds/somehow')

let w = somehow({
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
// w.annotation('here be the solution').on('April 6 2019', 2).nudge(-200, 100)

w.fit()

w.y.fit(-9, 19);
w.x.fit('Jan 1 2019', 'Dec 31 2019');
w.xAxis.ticks(12);
// w.yAxis.remove();

// w.x.fit('jan 1 2018', 'jan 2 2022')
// w.xAxis.ticks(['June 5 2019', 'July 1 2020'])


document.querySelector('#stage').innerHTML = w.build()
