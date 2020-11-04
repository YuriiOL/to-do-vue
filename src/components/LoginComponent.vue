<template>
  <div>
    <form class="loginWrapper" >
      <p>Login</p>
      <label>
        <input class="input" type="text" placeholder="Email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
      </label>
      <label>
        <input class="input" type="text" placeholder="Пароль"  v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
      </label>
      <button class="btn" @click.prevent="submit">Увійти</button>
      <router-link class="routLink" to="/registration">Зареєструватись</router-link>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  name: "LoginComponent",
  data(){
    return{
      email: '',
      password: '',
    }
  },
  validations:{
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submit(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }else{
        const formData = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('login', formData)
          this.$router.push('/home')
        }catch (e){
          console.log(e)
        }

      }
    }
  }
}
</script>

<style scoped>

.loginWrapper {
  position: relative;
  height: 400px;
  width: 300px;
  background-color: white;
  border-radius: 25px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

textarea:focus, input:focus {
  outline: none;
}

p {
  margin-bottom: 60px;
  color: gray;
  font-size: 20px;
}
.input {
  text-align: center;
  border-bottom: 1px solid grey;
  margin-bottom: 30px;
  height: 30px;
  font-size: 20px;
}

.btn {
  border: 1px solid gray;
  height: 40px;
  width: 150px;
  border-radius: 25px;
  background-color: #b0b0b0;
  font-size: 20px;
  color: white;
}

.btn:focus {
  outline: 0;
}
.routLink{
  position: absolute;
  bottom: 15px;
  text-decoration: none;
  color: palevioletred;
  font-size: 20px;
}
.invalid{
  border-bottom: 2px solid red;
}
</style>