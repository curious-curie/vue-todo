import Vue from 'vue'
import Vuex from 'vuex'
import todosModule from './todos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos: todosModule
  }
})
