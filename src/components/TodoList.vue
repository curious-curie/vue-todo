<template>
  <div class="container">

          <input
          placeholder="What needs to be done?"
          v-on:keyup.enter="addTodoItem"
          @change="setNewTodo($event.target.value)"
          :value="newTodo">
      <todo
        class = "todo__container"
        v-for="todo in filtered"
        :key="todo.title"
        :todo="todo"
        :class="{ completed: todo.completed }"
      />

      <div class="footer">
        <button @click="clearCompleted">clear completed</button>
        <button @click="completeAll">complete all</button>
        <router-link to = '/all'>
          <button :class ="{ active: selectedFilter === 'all'}">all</button>
        </router-link>
        <router-link to = '/active'>
          <button :class ="{ active: selectedFilter === 'active'}">active</button>
        </router-link>
        <router-link to = '/completed'>
          <button :class ="{ active: selectedFilter === 'completed'}">completed</button>
        </router-link>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import { mapState, mapActions } from 'vuex'
import db from '@/main'

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
  created () {
    this.loadTodos(db.collection('todos'))
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
      'clearNewTodo',
      'loadTodos'
    ]),
    addTodoItem () {
      this.addTodo()
      this.clearNewTodo()
    }
  }
}
</script>

<style lang="scss">
@import "../styles/main.scss";

</style>
