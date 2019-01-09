const somehow = require('./src')
// const somehow = require('./builds/somehow')

let w = somehow({
  height: 200,
  // width: 600,
  aspect: 'widescreen',
})

let line = w.line()
// line.set([
//   [
//     "April 6 2019",
//     "40%"
//   ],
//   [
//     "June 13 2019",
//     "50%"
//   ]
// ]
// )
// w.fit()
let lat = w.text('fun ');
lat.font(21)
lat.set(`aug 6 2019, 5`);

w.y.fit(0, 9);
w.x.fit('Jan 1 2019', 'Dec 31 2019');
w.xAxis.ticks(12);
w.yAxis.remove();

// w.x.fit('jan 1 2018', 'jan 2 2022')
// w.xAxis.ticks(['June 5 2019', 'July 1 2020'])


document.querySelector('#stage').innerHTML = w.build()
