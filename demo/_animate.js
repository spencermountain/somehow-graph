const somehow = require('./src');

const World = require('./src/World');
let el = document.querySelector('#stage');
// const preact = require('preact')

let w = somehow({
  height: 200,
  aspect: 'widescreen'
});
// w.bind(preact.h)

let l = w.line();

// let txt = w.text(['cool', 'stuff'])
// txt.set('june 10 2018, 25px')
// txt.dy(5)

let dot = w.dot();
dot.color('red');
dot.set('25px, 25px');

w.fit();
w.x.fit('Jan 1 2018', 'Dec 31 2018');
w.y.fit(0, 100);
// w.xAxis.ticks(12)

el.innerHTML = w.build();

let start = new Date().getTime();
let arr = [12, 43, 23, 53];
const duration = 1200;
let direction = true;
var filterStrength = 20;
var frameTime = 0,
  lastLoop = new Date(),
  thisLoop;
var fpsOut = document.getElementById('fps');

const step = function() {
  var thisFrameTime = (thisLoop = new Date()) - lastLoop;
  frameTime += (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;
  arr = arr.map((a, i) => {
    if (direction) {
      if (i % 2 === 0) {
        a += 1;
      }
    } else if (i % 2 === 0) {
      a -= 1;
    }
    return a;
  });
  l.set([
    ['june 5 2018', arr[0]],
    ['june 10 2018', arr[1]],
    ['july 10 2018', arr[2]],
    ['july 12 2018', arr[3]]
  ]);
  el.innerHTML = w.build();
  const end = new Date().getTime();
  if (end >= start + duration) {
    direction = !direction;
    start = new Date().getTime();
  }
  // let fps = Math.round(1000 / (end - start));
  // console.log(fps + 'fps')
  fpsOut.innerHTML = (1000 / frameTime).toFixed(1) + ' fps';
  window.requestAnimationFrame(step);
};

step();

// preact.render(svg, el);
