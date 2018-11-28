
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

**work-in-progress**

<div align="center">
  <code>npm install somehow</code>
</div>

**somehow** creates SVG, using your data, that you can throw-into your webpage.

```js
let somehow = require('somehow')
let world = somehow({
  height: 300,
  aspect: 'golden',
  el: el
})

let l = world.line()
l.add('june 5 2019', 10)
l.add('july 7 2019', 15)
l.add('july 7 2020', 18)
l.add('aug 8 2023', 50)

world.fit()

document.body.innerHTML = world.build()
```

![image](https://user-images.githubusercontent.com/399657/49157568-1ac42300-f2ee-11e8-8100-5d9992a4c6e0.png)

it's essentially a wrapper for [d3-path](https://github.com/d3/d3-path), [d3-shape](https://github.com/d3/d3-shape), and [spacetime](https://github.com/spencermountain/spacetime) -


MIT
