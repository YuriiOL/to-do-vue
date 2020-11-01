<template>
  <div id="app">
    <compnent :is="layout">
    </compnent>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
export default {
  computed:{
    layout(){
    
      return (this.$route.meta.layout || 'empty')+'-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>
<style>
body{
  margin: 0;
}
*{
  box-sizing: border-box;
}
</style>
