<template>
  <div id="app">
    <svg id="main" width="200" height="200" viewBox="0,0,10,10" preserveAspectRatio="xMidYMid meet" style="padding:20px; border:1px solid lightgrey; overflow:visible;">
      <g v-for="shape in shapes">
        <path v-bind:d="shape.makePath()" fill="red"></path>
      </g>
    </svg>
    <!-- <path id="path" fill="steelblue" d="M0.27639320225002106,1.4472135954999579L1,0L1.723606797749979,1.4472135954999579L2,2L0,2Z"></path> -->
  </div>
</template>

<script>
import * as spacetime from "spacetime"
import Somehow from "./somehow"

export default {
  name: 'app',
  data:function(){
    let s= new Somehow()
    let line=s.line({data:[[1, 0], [2, 2], [0, 2]]})
    console.log('done')
    return {
      shapes:[line]
    }
  },
  methods:{
    move(){
      console.log('hi')
      // console.log(shapes)
    }
  },
  mounted(){
    console.log('mount')
    this.shapes[0].animate([[0, 0], [2, 0], [2, 1], [1, 2], [0, 1]])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
