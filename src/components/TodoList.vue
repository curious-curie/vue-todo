<template>
  <div class="container">

      <input
          placeholder="What needs to be done?"
          v-on:keyup.enter="addTodoItem"
          @change="setNewTodo($event.target.value)"
          :value="newTodo">
      <todo
        class = "todo__container"
        :class="{ completed: todo.completed }"
        v-for="todo in filteredTodos"
        :key="todo.title"
        :todo="todo"
      />

      <div class="footer">
        <div>
        <button @click="clearCompleted">clear completed</button>
        <button @click="completeAll">complete all</button>
        </div>
        <div v-for="filter in ['all', 'active', 'completed']" :key="filter" class="filters">
          <router-link :to = "{ path: filter }"><button :class ="{ active: selectedFilter === filter}">{{ filter }}</button></router-link>
        </div>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import { mapState, mapActions } from 'vuex'
import db from '@/main'
import Vue from 'vue'

Vue.component(
  'TodoList', {
    name: 'todo-list'
  }
)

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
      selectedFilter: 'all'
    }
  },
  computed: {
    ...mapState('todos', [
      'todos',
      'newTodo'
    ]),
    filteredTodos () { return filters[this.selectedFilter](this.todos) }
  },

  watch: {
    '$route' (to, from) {
      this.selectedFilter = to.params.filter
    }
  },

  methods: {
    ...mapActions('todos', [
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
