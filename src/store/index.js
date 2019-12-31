import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    newTodo: ''
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
      state.todos = state.todos.filter(item => item !== todoItem)
    },
    TOGGLE_TODO (state, todoItem) {
      state.todos.forEach((item, index) => {
        if (todoItem === item) {
          Vue.set(state.todos, index, { ...item, completed: !item.completed })
        }
      })
    },
    CLEAR_COMPLETED (state) {
      state.todos = state.todos.filter(
        item => !item.completed
      )
    },
    COMPLETE_ALL (state) {
      state.todos = state.todos.map((todoItem) =>
        ({
          ...todoItem,
          completed: true
        }))
    },
    LOAD_TODOS (state, payload) {
      payload.onSnapshot((snapshot) => {
        state.todos = []
        snapshot.forEach((doc) => {
          state.todos.push(doc.data())
        })
      })
    }
  },

  actions: {
    loadTodos: ({ commit }, payload) => {
      commit('LOAD_TODOS', payload)
    },
    addTodo ({ commit, state }) {
      if (state.newTodo) {
        const todoItem = {
          title: state.newTodo,
          completed: false
        }
        commit('ADD_TODO', todoItem)
        // let ref = firebase.database().ref('todos')
        db.collection('todos').doc(todoItem.title).set({
          title: state.newTodo,
          completed: false
        })
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
      db.collection('todos')
        .doc(todo.title)
        .delete()
    },
    toggleTodo ({ commit }, todo) {
      commit('TOGGLE_TODO', todo)
      const todoItem = { ...todo }
      todoItem.completed = !todo.completed
      db.collection('todos')
        .doc(todo.title)
        .set(todoItem)
    },
    clearCompleted ({ commit }) {
      commit('CLEAR_COMPLETED')
      db.collection('todos').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().completed) {
              db.collection('todos')
                .doc(doc.data().title)
                .delete()
            }
          })
        })
    },
    completeAll ({ commit }) {
      commit('COMPLETE_ALL')
      db.collection('todos').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (!doc.data().completed) {
              db.collection('todos')
                .doc(doc.data().title)
                .set(
                  { ...doc.data(), completed: true }
                )
            }
          })
        })
    }
  }
})
