import Vue from 'vue'

export default {
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
}
