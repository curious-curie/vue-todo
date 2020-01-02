import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Store } from 'vuex-mock-store'
import TodoList from '@/components/TodoList.vue'
// import { mount } from '@vue/test-utils';
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Store({
  state: {
    todos: {
      todos: { title: 'ABC', completed: true },
      newTodo: ''
    }
  }
})

const mocks = {
  $store: store
}
afterEach(() => store.reset())

describe('TodoList.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoList, { mocks })
  })

  it('loaded when rendered', () => {
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('calls function', () => {
    wrapper.find('#clear').trigger('click')
    expect(store.dispatch).toHaveBeenCalled()
    // expect(store.commit).toBeCalled()
  }
  )
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
