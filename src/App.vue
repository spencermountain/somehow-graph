<template>
  <div id="app">
    <svg id="main" width="200" height="200" viewBox="0,0,10,10" preserveAspectRatio="xMidYMid meet" style="padding:20px; border:1px solid lightgrey; overflow:visible;">
      <Shape v-for="info in shapes" v-bind:info="info"></Shape>
    </svg>
    <!-- <path id="path" fill="steelblue" d="M0.27639320225002106,1.4472135954999579L1,0L1.723606797749979,1.4472135954999579L2,2L0,2Z"></path> -->
  </div>
</template>

<script>
import * as spacetime from "spacetime"
import Shape from "./Shape.vue"

export default {
  name: 'app',
  components:{
    Shape
  },
  data:function(){
    return {
      shapes:[
        {data:[[1, 0], [2, 2], [0, 2]], color:'steelblue'},
        {data:[[2, 0], [1, 2], [0, 3]], color:'lightsteelblue'},
      ]
    }
  },
  mounted(){
    setTimeout(()=>{
      this.shapes[0].data=[[0, 0], [2, 0], [2, 1], [1, 2], [0, 1]]
      console.log('changed')
    },1000)
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
