import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
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
    UPDATE_STORAGE (state) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
      db.collection('todos').orderBy('created_at').onSnapshot((snapshot) => {
        let items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, title: doc.data().title })
        })
        state.items = items
      })
    } },

  actions: {
    addTodo ({ commit, state }) {
      if (state.newTodo) {
        const todoItem = {
          id: state.todos.length,
          title: state.newTodo,
          completed: false
        }
        commit('ADD_TODO', todoItem)
        commit('UPDATE_STORAGE')
        // let ref = firebase.database().ref('todos')
        db.collection('todos').doc(todoItem.title).set({
          id: state.todos.length,
          title: state.newTodo,
          completed: false
        })
        console.log(db.collection('todos'))
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
      let ref = firebase.database().ref('todos')
      ref.child(todo.id).remove()
      commit('UPDATE_STORAGE')
    },
    toggleTodo ({ commit }, todo) {
      commit('TOGGLE_TODO', todo)
      const todoItem = { ...todo }
      todoItem.completed = !todo.completed
      db.collection('todos')
        .doc(todo.title)
        .set(todoItem)
      commit('UPDATE_STORAGE')
    },
    clearCompleted ({ commit }) {
      commit('CLEAR_COMPLETED')
      commit('UPDATE_STORAGE')
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
      commit('UPDATE_STORAGE')
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
