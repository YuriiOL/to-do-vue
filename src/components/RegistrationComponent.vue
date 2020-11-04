<template>
  <div>
    <form class="loginWrapper">
      <p>Registration</p>
      <label>
        <input  id="name" class="input" type="text" placeholder="Ім'я" v-model.trim="name" :class="{ invalid:($v.name.$dirty && !$v.name.required)}">
      </label>
      <label>
        <input id="email" class="input" type="text" placeholder="Email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
      </label>
      <label>
        <input id="password" class="input" type="text" placeholder="Пароль" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
      </label>
      <label>
        <input id="consfimPassword" class="input" type="text" placeholder="Повторіть Пароль" v-model.trim="confirmPassword" :class="{invalid: ($v.confirmPassword.$dirty && !$v.confirmPassword.required) || (!$v.confirmPassword.sameAsPassword)}">
      </label>
      <button class="btn" @click.prevent="submit">Зареєструватись</button>
      <router-link class="routLink" to="/">Увійти</router-link>
    </form>
  </div>
</template>

<script>
import {required,email, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
  name: "LoginComponent",
  data(){
    return{
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations:{
    name: {required},
    email: {email, required},
    password: {required, minLength: minLength(6)},
    confirmPassword: {required ,sameAsPassword: sameAs('password')}
  },
  methods:{
    async submit(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }else{
        const user = {
          email: this.email,
          password: this.password,
          name: this.name,
        };
        try {
          await this.$store.dispatch("registration", user);
          this.$router.push("/home");
        } catch (e) {
          return e;
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
  margin-bottom: 10px;
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
  width: 170px;
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