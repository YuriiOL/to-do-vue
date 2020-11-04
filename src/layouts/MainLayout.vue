<template>
  <div class="mainLoyout">
    <div class="nav">
      <div class="sideBar">
        <span class="material-icons">
          sort
        </span>
        Сортувати
      </div>
      <div class="logo">Todo<span class="user">{{ name }}</span></div>
      <div class="logout" @click="logout">
          <span class="in">Вийти</span>
          <span class="material-icons">login</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  async mounted(){
    if (!Object.keys(this.$store.getters.info).length)  {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    name(){
      return this.$store.getters.info.name
    }

  },
  methods:{
    async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/')
    },
  }
}
</script>
<style scoped>
.mainLoyout {
  background-color: #b0b0b0;
  height: 100vh;
}
.nav {
  background: black;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  height: 50px;
}
.nav > div {
  margin: 0 50px;
}
.logo {
  width: 80%;
}
.login {
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: white;
}
.in {
  margin-top: 2px;
  margin-right: 3px;
  color: grey;
}
.user {
  color: grey;
}
.sideBar{
  display: flex;
  color: grey;
  cursor: pointer;
}
.sideBar>span{
  color: white;
  margin-top: -3px;
}
.logout{
  display: flex;
}
@media only screen and (max-width: 450px) {
  .nav > div {
    margin: 0 20px;
    font-size: 14px;
  }
}
</style>