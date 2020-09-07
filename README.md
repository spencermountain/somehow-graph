<div align="center">
  <div><b>somehow-graph</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>— part of <a href="https://github.com/spencermountain/somehow">somehow</a> —</div>
  <div>WIP svelte infographics</div>
  <div align="center">
    <sub>
      by
      <a href="https://spencermounta.in/">Spencer Kelly</a> 
    </sub>
  </div>
</div>
<div align="right">
  <a href="https://npmjs.org/package/somehow-graph">
    <img src="https://img.shields.io/npm/v/somehow-graph.svg?style=flat-square" />
  </a>
</div>
<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Work in progress!

**somehow-graph** creates SVG, using your data, that you can throw-into your webpage.

```html
<script>
  import spacetime from 'spacetime'
  import { Graph, XAxis, YAxis, Bar } from './src'
  let start = spacetime('2019').startOf('year')
  let end = start.endOf('year')
</script>

<Graph height={2800} aspect={'golden'}>
  <YAxis every="hundred" />
  <XAxis />
  <Bar />
</Graph>
```

MIT
