<script>
  export let text = 'text'
  // import { getContext } from 'svelte'
  // const scale = getContext('scale')
  export let size = '12px'
</script>

<style>

</style>

<div style="font-size:{size};">{text}</div>
