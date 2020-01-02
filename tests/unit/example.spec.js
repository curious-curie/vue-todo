import { shallow, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Todo from '@/components/Todo.vue'
import TodoList from '@/components/TodoList.vue'
import Home from '@/views/Home.vue'
// import { mount } from '@vue/test-utils';
const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  test('should mount for testing', () => {
    expect(1).toEqual(1)
  })
  test('Todo props test', () => {
    const todoItem = {
      title: 'a',
      id: 1,
      completed: false
    }
    const wrapper = shallowMount(Todo, {
      propsData: {
        todo: todoItem
      }
    })
    expect(wrapper.find('#title').text()).toBe(todoItem.title)
  })

  test('Delete todo test', () => {
    const todoItem = {
      title: 'a',
      id: 1,
      completed: false
    }
    const wrapper = shallowMount(Todo, {
      propsData: {
        todo: todoItem
      }
    })
    expect(wrapper.find('#deleteTodo').exists()).toBe(true)
    const deleteBtn = wrapper.find('#deleteTodo')
    // const spy = spyOn(wrapper.vm, 'deleteTodo')
    deleteBtn.trigger('click')
    expect(wrapper.vm.deleteTodo).toBeCalled()
  })

  test('Toggle todo test', () => {
    const todoItem = {
      title: 'a',
      id: 1,
      completed: false
    }
    const wrapper = shallowMount(Todo, {
      propsData: {
        todo: todoItem
      }
    })
    expect(wrapper.find('#checkbox').exists()).toBe(true)
    const deleteBtn = wrapper.find('#checkbox')
    // const spy = spyOn(wrapper.vm, 'toggleTodo')
    deleteBtn.trigger('click')
    expect(wrapper.vm.toggleTodo).toBeCalled()
  })

  test('page render test', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.find('.home').exists()).toBe(true)
    expect(wrapper.find('todo-list').exists()).toBe(true)
  })

  describe('TodoList', () => {
    it('renders a value from $store.state', () => {
      const wrapper = shallow(TodoList, {
        mocks: {
          $store: {
            state: {
              newTodo: '',
              todos: [{
                title: 'a',
                id: 1,
                completed: false
              }]
            }
          }
        },
        localVue
      })
      expect(wrapper.find('.todo__container').exists()).toBe(true)
    })
  })
})
