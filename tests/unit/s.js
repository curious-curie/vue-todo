// import Vuex from 'vuex'
// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import TodoList from '@/components/TodoList.vue'

// const localVue = createLocalVue()
// localVue.use(Vuex)

// describe('actions', () => {
//   let store
//   let setDataMock
//   beforeEach(() => {
//     setDataMock = jest.fn()
//     store = new Vuex.Store({
//       modules: {
//         todos: {
//           namespaced: true,
//           state: {
//             todos: [],
//             newTodo: 'A'
//           },
//           mutations: jest.fn(),
//           actions: {
//             setNewTodo: jest.fn(),
//             addNewTodo: jest.fn(),
//           }
//         }
//       }
//     })
//   })
//   it('dispatches "actionInput" when input event value is "input"', () => {
//     const wrapper = shallowMount(TodoList, { store, localVue })
//     const input = wrapper.find('input')
//     input.element.value = 'input'
//     input.trigger('input')
//     expect(jest.fn()).toHaveBeenCalled()
//   })
// })
