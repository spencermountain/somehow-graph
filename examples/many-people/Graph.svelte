<script>
  import spacetime from 'spacetime'
  import { Graph, XAxis, YAxis, Bar } from '../../src'
  let year = 2019
  let start = spacetime()
    .year(year)
    .startOf('year')
  let end = start.endOf('year')
</script>

<style>

</style>

<Graph height={2800} aspect={'gold'} title="2019">
  <YAxis every="hundred" />
  <XAxis />
  <Bar />
</Graph>
