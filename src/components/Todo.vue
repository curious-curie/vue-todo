<template>
    <div>
        {{ todo.title }}
        <button v-if="todo.completed" @click="toggleTodo(todo)">Completed</button>
        <button v-else @click="toggleTodo(todo)">Complete</button>
        <button @click="deleteTodo(todo)">X</button>
    </div>
</template>

<script>
export default {
  props: ['todo'],
  methods: {
    deleteTodo (todo) {
      this.$store.dispatch('deleteTodo', todo)
    },
    toggleTodo (todo) {
      this.$store.dispatch('toggleTodo', todo)
    }
  }
}
</script>
