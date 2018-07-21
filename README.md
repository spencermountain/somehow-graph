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

### The hows:

#### jQuery example:
```html
<body>
  <svg width="500" height="200" viewBox="0,0,100,100">
    <path id="line" fill="none" stroke="steelblue" stroke-width="4" d=""></path>
  </svg>
  <script src="https://unpkg.com/jquery"></script>
  <script src="https://unpkg.com/said-path"></script>
  <script async="false">
    $(document).ready(function(){
      var rect = saidPath.rect(200, 200)
      var path = rect.line([25, 40, 90, 75])
      $('#line').attr('d', path)
    })
  </script>
</body>
```

#### {{mustache}} example:
```html
<html>
  <body>
    <svg id="svg" width="500" height="200" viewBox="0,0,100,100"/>

    <script id="template" type="x-tmpl-mustache">
      <path fill="none" stroke="steelblue" stroke-width="4" d={{path}}></path>
    </script>

    <script src="https://unpkg.com/said-path"></script>
    <script src="https://unpkg.com/mustache"></script>
    <script>
      var rect = saidPath.rect(200, 200)
      var path = rect.line([23, 53, 22, 99, -12, 53])
      var template = document.getElementById('template').innerHTML
      document.getElementById('svg').innerHTML = Mustache.render(template, {name: "Luke", path:path});
    </script>
  </body>
</html>
```
MIT
