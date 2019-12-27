import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    newTodo: '',
    storage: []
  },

  mutations: {
    ADD_TODO (state, todoItem) {
      state.todos.push(todoItem)
    },
    SET_NEW_TODO (state, todoInput) {
      state.newTodo = todoInput
    },
    CLEAR_NEW_TODO (state) {
      state.newTodo = ''
    },
    DELETE_TODO (state, todoItem) {
      state.todos = state.todos.filter(
        item => item !== todoItem
      )
    },
    TOGGLE_TODO (state, todoItem) {
      let isComplete = state.todos[todoItem.id].completed
      state.todos[todoItem.id].completed = !isComplete
    },
    CLEAR_COMPLETED (state) {
      state.todos = state.todos.filter(
        item => !item.completed
      )
    },
    COMPLETE_ALL (state) {
      state.todos.forEach((todoItem) =>
        Vue.set(todoItem, 'completed', true))
    }
    // UPDATE_STORAGE (state) {
    //   localStorage.setItem('todos', JSON.stringify(state.todos))
    // }
  },

  actions: {
    addTodo ({ commit, state }) {
      if (state.newTodo) {
        const todoItem = {
          id: state.todos.length,
          title: state.newTodo,
          completed: false
        }
        commit('ADD_TODO', todoItem)
      }
    },
    setNewTodo ({ commit }, todoInput) {
      commit('SET_NEW_TODO', todoInput)
    },
    clearNewTodo ({ commit }) {
      commit('CLEAR_NEW_TODO')
    },
    deleteTodo ({ commit }, todo) {
      commit('DELETE_TODO', todo)
    },
    toggleTodo ({ commit }, todo) {
      commit('TOGGLE_TODO', todo)
    },
    clearCompleted ({ commit }) {
      commit('CLEAR_COMPLETED')
    },
    completeAll ({ commit }) {
      commit('COMPLETE_ALL')
    }
    // updateStorage ({ commit }) {
    //   commit('UPDATE_STORAGE')
    // },
    // fetchStorage ({ commit }) {
    //   commit('FET')
    // }

  },
  modules: {
  }
})
