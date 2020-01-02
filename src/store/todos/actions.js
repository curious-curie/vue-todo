import db from '@/main'
export default {
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
