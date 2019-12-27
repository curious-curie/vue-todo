import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// let id = 0
const filters = {
  all: todos => {
    return todos
  },
  active: function (todos) {
    return todos.filter(todo => {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(todo => {
      return todo.completed
    })
  }
}

export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    newTodo: '',
    selectedFilter: 'all'
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
      console.log(todoItem.id)
      state.todos.forEach((item, index) => {
        if (todoItem === item) {
          console.log(item.title)
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
    APPLY_FILTER (state, selectedFilter) {
      state.selectedFilter = selectedFilter
      state.filteredTodos = filters[selectedFilter](state.todos)
    },
    UPDATE_STORAGE (state) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
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
      commit('UPDATE_STORAGE')
    },
    toggleTodo ({ commit }, todo) {
      commit('TOGGLE_TODO', todo)
      commit('UPDATE_STORAGE')
    },
    clearCompleted ({ commit }) {
      commit('CLEAR_COMPLETED')
      commit('UPDATE_STORAGE')
    },
    completeAll ({ commit }) {
      commit('COMPLETE_ALL')
      commit('UPDATE_STORAGE')
    },
    applyFilter ({ commit }, selectedFilter) {
      commit('APPLY_FILTER', selectedFilter)
    }
  },
  getters: {
    filtered: state => filters[state.selectedFilter](state.todos)
  }
})
