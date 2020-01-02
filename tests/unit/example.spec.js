import { shallowMount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'
// import { mount } from '@vue/test-utils';

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
    expect(wrapper.find('h3').text()).toBe(todoItem.title)
    expect(wrapper.find('#deleteTodo').exists()).toBe(true)
    const deleteBtn = wrapper.find('#deleteTodo')
    // const spy = spyOn(wrapper.vm, 'deleteTodo')
    deleteBtn.trigger('click')
    expect(wrapper.vm.deleteTodo).toBeCalled()
  })
})
