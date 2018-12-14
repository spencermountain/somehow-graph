
<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>make infographics, without thinking</div>
  <a href="https://npmjs.org/package/somehow">
    <img src="https://img.shields.io/npm/v/somehow.svg?style=flat-square" />
  </a>
  <!-- <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/efrt">
    <img src="https://api.codacy.com/project/badge/grade/fc03e2761c8c471c8f84141abf2704de" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/efrt">
    <img src="https://api.codacy.com/project/badge/Coverage/fc03e2761c8c471c8f84141abf2704de" />
  </a> -->
</div>

<div align="center">
**work-in-progress**
</div>

<div align="center">
  <code>npm install somehow</code>
</div>

**somehow** creates SVG, using your data, that you can throw-into your webpage.

```js
let somehow = require('somehow')
let world = somehow({
  height: 300,
  aspect: 'golden',
})

let line = world.line()
line.set(`
june 5 2019, 10
july 7 2019, 15
july 7 2020, 18
aug 8 2021, 50
`)
world.fit()

document.body.innerHTML = world.build()
```
![image](https://user-images.githubusercontent.com/399657/50016136-4d307a00-ff96-11e8-91f2-bbc476715ecb.png)

the idea is that you think (mostly) about the actual data, and not the layout.

it's essentially a wrapper for [d3-path](https://github.com/d3/d3-path), [d3-shape](https://github.com/d3/d3-shape), and [spacetime](https://github.com/spencermountain/spacetime) -

more to come

you can see some [demos here](http://thensome.how/)

MIT
