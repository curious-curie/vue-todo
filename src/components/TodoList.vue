<template>
  <div>
      <div>
          <input
          placeholder="What needs to be done?"
          v-on:keyup.enter="addTodoItem"
          @change="setNewTodo($event.target.value)"
          :value="newTodo"
        >
      </div>
      <todo
        v-for="todo in filtered"
        :key="todo.id"
        :todo="todo"
      />

      <button @click="clearCompleted">Clear completed</button>
      <button @click="completeAll">complete all</button>
      <router-link to = '/all'><button>all</button></router-link>
      <router-link to = '/active'><button>active</button></router-link>
      <router-link to = '/completed'><button>completed</button></router-link>

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

const filters = {
  all: todos => {
    return todos
  },
  active: function (todos) {
    return todos.filter(todo => {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(todo => {
      return todo.completed
    })
  }
}

export default {
  name: 'TodoList',
  components: {
    Todo
  },
  data () {
    return {
      local: storage.get(),
      selectedFilter: 'all'
    }
  },
  computed: {
    ...mapState([
      'todos',
      'newTodo'
    ]),
    filtered () { return filters[this.selectedFilter](this.todos) }
  },

  watch: {
    '$route' (to, from) {
      this.selectedFilter = to.params.filter
    }
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
