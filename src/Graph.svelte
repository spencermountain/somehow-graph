<script>
  import { setContext } from 'svelte'
  export let height = '500px'
  export let width = '250px'
  export let aspect = null
  setContext('height', height)
  setContext('width', width)
  setContext('scale', val => {
    return scale(
      {
        world: [0, height],
        minmax: [0, 1000]
      },
      val
    )
  })
</script>

<style>

</style>

<div />
