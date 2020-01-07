import { shallowMount, createLocalVue } from '@vue/test-utils'
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
    const spy = jest.spyOn(wrapper.vm, 'deleteTodo')
    deleteBtn.trigger('click')
    expect(spy).toBeCalled()
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
    const spy = jest.spyOn(wrapper.vm, 'toggleTodo')
    deleteBtn.trigger('click')
    expect(spy).toBeCalled()
  })

  test('page render test', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.find('.home').exists()).toBe(true)
    expect(wrapper.find('todo-list').exists()).toBe(true)
  })

  const todoModules = {
    todos: {
      namespaced: true,
      state: {
        newTodo: '',
        todos: [{
          title: 'a',
          id: 1,
          completed: false
        }]
      },
      actions: {
        loadTodos: jest.fn()
      }
    }
  }

  describe('TodoList', () => {
    let store = new Vuex.Store({ modules: todoModules })
    it('renders a value from $store.state', () => {
      const wrapper = shallowMount(TodoList, { store,
        localVue
      })
      expect(wrapper.find('.todo__container').exists()).toBe(true)
    })
  })

  describe('TodoList', () => {
    let store = new Vuex.Store({ modules: todoModules })
    it('input changes correctly', () => {
      const wrapper = shallowMount(TodoList, { store,
        localVue
      })
      const input = wrapper.find('input')
      input.element.value = 'abc'
      input.trigger('change')
      expect(wrapper.find('input').element.value).toBe('abc')
    })
  })

  describe('TodoList', () => {
    let store = new Vuex.Store({ modules: todoModules })
    it('clear completed click', () => {
      const wrapper = shallowMount(TodoList, { store,
        localVue
      })
      const clearBtn = wrapper.find('#clear')
      expect(clearBtn.exists()).toBe(true)
      // const spy = jest.spyOn(wrapper.vm)
      // wrapper.find('#clear').trigger('click')
      // expect(jest.fn()).toHaveBeenCalled()
    })
  })
})
