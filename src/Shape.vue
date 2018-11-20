<template>
  <g>
    <path v-bind:fill="info.color" v-bind:d="fancyPath"/>
  </g>
</template>

<script>
import { interpolate, toPathString } from "flubber"

export default {
  name: 'Shape',
  props:['info', 'color'],
  data () {
    return {}
  },
  computed: {
    fancyPath: function () {
      return toPathString(this.info.data)
    }
  }
}
</script>

<style scoped>
</style>
