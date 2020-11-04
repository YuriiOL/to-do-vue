<template>
  <div class="emptyLoyout">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "EmptyLayout",

}
</script>

<style scoped>
.emptyLoyout{
  height: 100vh;
  width: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>