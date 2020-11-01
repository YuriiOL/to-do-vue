<template>
  <div id="app">
    <compnent :is="layout">
      <router-view/>
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
  margin: 0px;
}
*{
  box-sizing: border-box;
}
</style>
