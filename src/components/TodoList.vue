<template>
  <div>
      <input
        placeholder="What needs to be done?"
        v-on:keyup.enter="addTodo"
        @change="setNewTodo"
        :value="newTodo"
      >
      {{ JSON.stringify(localStorage) }}
      <todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      />
      <button @click="clearCompleted">Clear completed</button>
      <button @click="completeAll">complete all</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import { mapState } from 'vuex'

export default {
  name: 'TodoList',
  data () {
    return {
      localStorage: {}
    }
  },
  components: {
    Todo
  },
  computed: mapState({
    todos: state => state.todos,
    newTodo: state => state.newTodo
  }),

  methods: {
    setNewTodo (e) {
      this.$store.dispatch('setNewTodo', e.target.value)
    },
    addTodo () {
      this.$store.dispatch('addTodo')
      this.$store.dispatch('clearNewTodo')
    },
    clearCompleted () {
      this.$store.dispatch('clearCompleted')
    },
    completeAll () {
      this.$store.dispatch('completeAll')
    }
  },
  watch: {
    todos (newTodos) {
      localStorage.setItem('todos', JSON.stringify(newTodos))
      this.localStorage = localStorage
      console.log(localStorage)
    }
  }
}
</script>
