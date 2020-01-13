<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>make infographics, without thinking</div>

  <a href="https://npmjs.org/package/somehow-graph">
    <img src="https://img.shields.io/npm/v/somehow-graph.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/somehow-graph">
    <img src="https://badge-size.herokuapp.com/spencermountain/somehow-graph/master/builds/somehow.min.js" />
  </a>
</div>

<div align="center">
  <code>npm install somehow-graph</code>
</div>
<div align="center">
**work-in-progress**
</div>

<div align="center">
    <a href="https://github.com/spencermountain/somehow-input">somehow-input</a>
  • <a href="https://github.com/spencermountain/somehow-ticks">somehow-ticks</a>
  • <a href="https://github.com/spencermountain/somehow-calendar">somehow-calendar</a>
</div>
<div align="center">
    <a href="https://github.com/spencermountain/somehow-3d">somehow-3d</a>
  • <a href="https://github.com/spencermountain/somehow-maps">somehow-maps</a>
  • <a href="https://github.com/spencermountain/somehow-circle">somehow-circle</a>
</div>
<div align="center">
<a href="https://github.com/spencermountain/somehow-script">somehow-script</a>
</div>

**somehow** creates SVG, using your data, that you can throw-into your webpage.

```js
let somehow = require('somehow-graph')

let world = somehow({
  height: 300,
  aspect: 'golden'
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

#### #1 - `.fit()`

this scales, and fits the data for all given shapes, automatically. You don't have to manage d3Scale range & domain.

#### #2 - `.build()`

running `.build()` returns html-strings by default, but the library uses Jason Miller's [htm library](https://github.com/developit/htm) so can call `.bind(React.createElement)` and return React Components.

The joke is that D3 is easy, as long as you're an expert.

This library is built for personal use, and is essentially a wrapper for [d3-path](https://github.com/d3/d3-path), [d3-shape](https://github.com/d3/d3-shape), and [spacetime](https://github.com/spencermountain/spacetime).

more to come!

### Current API:

```
- line(obj)
- dot(obj)
- text(obj)
- area(obj)
- midArea(obj)
- rect(obj)
- bar(obj)
- annotation(obj)
- image(obj)
- arrow(obj)
- snake(obj)
- shape(obj)

- bind(fn)
- xAxis
- yAxis
- fit(x, y)
- fitX(x)
- fitY(y)
- build()
- getShape(id)
- redraw()
- clip(bool)
- title(str)
```

#### Axis

```
- color(c)
- remove()
- show()
- format(str)
- ticks(arr)
- prefix(str)
- suffix(str)
- clip(bool)
- label()
```

#### Shape

```
- set(str)
- at(x, y)
- from(x, y)
- to(x, y)
- color(c)
- opacity(n)
- title(str)
- straight()
- soft()
- onMount(fn)
- click(fn)
- hover(fn)
- clip(bool)
```

#### Area

```
- line(n)
```

#### Rect

```
- color()
- width(n)
- height(n)
- rounded(n)
- border(n)
```

#### Line

```
- dotted()
- width()
```

#### Text

```
- before(x, y)
- after(x, y)
- center(x, y)
- left()
- right()
- middle()
- color(c)
- dy(num)
- dx(num)
- dodge(x, y)
- font(num)
- extent()
- text(str)
```

#### Dot

```
- radius(num)
```

#### Annotation

```
- on(x, y)
- title(str)
- nudge(x, y)
```

#### MidArea

```
- zero(y)
```

#### Bar

```
- width()
- zero()
- at(x, y)
```

#### Image

```
- src(txt)
- caption(str)
- size(w, h)
- width(w)
- height(h)
```

#### Arrow

```
- from(x,y)
- length(num)
- width(num)
```

#### Now

```
- top()
- bottom()
- label(str)
```

#### Title

```
- top()
- bottom()
- right()
- left()
```

MIT
