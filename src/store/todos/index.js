import actions from './actions'
import mutations from './mutations'

const state = {
  todos: [],
  newTodo: ''
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
