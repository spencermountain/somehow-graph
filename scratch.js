const somehow = require('./src')
// let data = [
//   {
//     title: 'Toronto',
//     years: [
//       [
//         1825,
//         6000 //i made this number up
//       ],
//       [1834, 9252],
//       [1901, 238080],
//       [1931, 856955],
//       [1941, 951549],
//       [1951, 1176622],
//       [1961, 1824481],
//       [1971, 2089729],
//       [1976, 2124291],
//       [1981, 2137395],
//       [1986, 2192721],
//       [1991, 2275771],
//       [1996, 2385421],
//       [2001, 2481494],
//       [2006, 2503281],
//       [2011, 2615060],
//       [2016, 2731571]
//     ]
//   },
//   {
//     title: 'Montreal',
//     years: [
//       // [
//       //   1740,
//       //   22000
//       // ],
//       [1825, 26154],
//       [1871, 141276],
//       [1881, 189168],
//       [1891, 271352],
//       [1901, 347817],
//       [1911, 533341],
//       [1921, 693225],
//       [1931, 959198],
//       [1941, 1064653],
//       [1951, 1247647],
//       [1956, 1402704],
//       [1961, 1607601],
//       [1966, 1750969],
//       [1971, 1765553],
//       [1976, 1664527],
//       [1981, 1554761],
//       [1986, 1541251],
//       [1991, 1553356],
//       [1996, 1550369],
//       [2001, 1583590],
//       [2006, 1620639],
//       [2011, 1649519],
//       [2016, 1704694]
//     ]
//   },
//   {
//     title: 'Demographics of Canada',
//     years: [
//       [
//         1825,
//         30000 //i made this number up
//       ],
//       [1851, 2414519],
//       [1861, 3174442],
//       [1871, 3689000],
//       [1881, 4325000],
//       [1891, 4833000],
//       [1901, 5371000],
//       [1911, 7207000],
//       [1921, 8788000],
//       [1931, 10377000],
//       [1941, 11507000],
//       [1951, 14050000],
//       [1961, 18271000],
//       [1971, 21962032],
//       [1981, 24819915],
//       [1991, 28037420],
//       [2001, 31020596],
//       [2011, 33476688],
//       [2016, 35151728]
//     ]
//   }
// ]
let w = somehow({
  height: 200
  // width: 700
})

// //titles
// // w.text('Toronto').at('20px', '170px'); //.font(20); //.color('blue');
// // w.text('and').at('45px', '150px').font(15).color('lightgrey');
// // w.text('Montréal').at('40px', '130px').font(20).color('orange');

// let toronto = data[0].years.map(a => {
//   a[0] = 'Jan 1 ' + String(a[0])
//   return a
// })
// let tor = w.line().color('blue')
// tor.set(toronto)
// let lastTo = toronto[toronto.length - 1]
// w.text('6.3m')
//   .dx(5)
//   .font(12)
//   .color('blue')
//   .at(lastTo[0], lastTo[1])

// let montreal = data[1].years.map(a => {
//   a[0] = 'Jan 1 ' + String(a[0])
//   return a
// })
// let mon = w.line().color('orange')
// mon.set(montreal)
// let lastMtl = montreal[montreal.length - 1]
// w.text('4.1m')
//   .dx(5)
//   .font(12)
//   .color('orange')
//   .at(lastMtl[0], lastMtl[1])
// // w.yAxis.ticks([1000000, 2000000]);
// w.yAxis.ticks([])
// w.text(['population'])
//   .color('lightgrey')
//   .font(10)
//   .from('-55px', '75%')

// //referendums
// w.line()
//   .from('May 20, 1980', '100px')
//   .to('May 20, 1980', '140px')
//   .width(1)
//   .color('grey')
// w.text(['1st', 'referendum'])
//   .dy(-35)
//   .center('May 20, 1980', '100px')
//   .font(11)
//   .color('lightgrey')

// w.line()
//   .from('October 30, 1995', '90px')
//   .to('October 30, 1995', '130px')
//   .width(1)
//   .color('grey')
// w.text(['2nd', 'referendum'])
//   .dy(-35)
//   .center('October 30, 1995', '90px')
//   .font(11)
//   .color('lightgrey')
// w.x.fit('Jan 1 1825', Date.now())

// w.text('=========').center('20%', '75%')
let line = w.line()
line.set([['june 5 2019', 10], ['july 7 2019', 15], ['july 7 2020', 18], ['aug 8 2021', 50]])
w.fit()

document.querySelector('#stage').innerHTML = w.build()
