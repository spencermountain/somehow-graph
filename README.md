# said-path
generate svg paths, explicitly

a wrapper for d3-path, d3-shape for more-explicit svg - **work-in-progress**

```js
let rect = saidPath.rect(500, 200)
let data= [25, 40, 90, 75]
`<svg width="500" height="200" viewBox="0,0,100,100">
  <path fill="none" stroke="steelblue" stroke-width="4" d="${rect.line(data)}"></path>
</svg>`

```

MIT
