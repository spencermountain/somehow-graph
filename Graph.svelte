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
