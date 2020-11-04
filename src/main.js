import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyBCvX0V3q3slydtisVg-hMTpgOJ6Oax-BY",
    authDomain: "to-do-app-3e8e3.firebaseapp.com",
    databaseURL: "https://to-do-app-3e8e3.firebaseio.com",
    projectId: "to-do-app-3e8e3",
    storageBucket: "to-do-app-3e8e3.appspot.com",
    messagingSenderId: "333522263958",
    appId: "1:333522263958:web:cab2215b172f475340c7b7",
    measurementId: "G-ZHL8637RD2"
})
let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
})



