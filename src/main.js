import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD0t6RPGQT_vjTJwClyKjdf6RalhON7eDo',
  authDomain: 'vue-todo-9698f.firebaseapp.com',
  databaseURL: 'https://vue-todo-9698f.firebaseio.com',
  projectId: 'vue-todo-9698f',
  storageBucket: 'vue-todo-9698f.appspot.com',
  messagingSenderId: '182329553763',
  appId: '1:182329553763:web:994b4758f5281813d25956',
  measurementId: 'G-LLWFRSLC24'
}

Vue.prototype.$firebase = firebase.initializeApp(config)
const db = firebase.firestore()
export default db

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
