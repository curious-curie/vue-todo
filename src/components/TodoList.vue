<template>
  <div>
      <input
        placeholder="What needs to be done?"
        v-on:keyup.enter="addTodoItem"
        @change="setNewTodo($event.target.value)"
        :value="newTodo"
      >
      <todo
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
      />

      <button @click="clearCompleted">Clear completed</button>
      <button @click="completeAll">complete all</button>
      <router-link to = '/'><button @click="applyFilter('all')">all</button></router-link>
      <router-link to = '/active'><button @click="applyFilter('active')">active</button></router-link>
      <router-link to = '/completed'><button @click="applyFilter('completed')">completed</button></router-link>

  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import { mapState, mapActions } from 'vuex'

let storage = {
  get: function () {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  }
}
export default {
  name: 'TodoList',
  components: {
    Todo
  },
  data () {
    return {
      local: storage.get()
    }
  },
  computed: {
    ...mapState([
      'todos',
      'newTodo'
    ]),
    filteredTodos () { return this.$store.getters.filtered }
  },

  methods: {
    ...mapActions([
      'clearCompleted',
      'completeAll',
      'applyFilter',
      'setNewTodo',
      'clearTodo',
      'addTodo',
      'clearNewTodo'
    ]),
    addTodoItem () {
      this.addTodo()
      this.clearNewTodo()
    }
  }
}
</script>
