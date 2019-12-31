import * as types from './mutation-types'

export default {
  [types.ADD_TODO] (state, todoItem) {
    state.todos.push(todoItem)
  },
  [types.SET_NEW_TODO] (state, todoInput) {
    state.newTodo = todoInput
  },
  [types.CLEAR_NEW_TODO] (state) {
    state.newTodo = ''
  },
  [types.DELETE_TODO] (state, todoItem) {
    state.todos = state.todos.filter(item => item !== todoItem)
  },
  [types.TOGGLE_TODO] (state, todoItem) {
    state.todos.splice(state.todos.indexOf(todoItem), 1, { ...todoItem, completed: !todoItem.completed })
  },
  [types.CLEAR_COMPLETED] (state) {
    state.todos = state.todos.filter(
      item => !item.completed
    )
  },
  [types.COMPLETE_ALL] (state) {
    state.todos = state.todos.map((todoItem) =>
      ({
        ...todoItem,
        completed: true
      }))
  },
  [types.LOAD_TODOS] (state, payload) {
    payload.onSnapshot((snapshot) => {
      state.todos = []
      snapshot.forEach((doc) => {
        state.todos.push(doc.data())
      })
    })
  }
}
