<template>
    <div>
        <h3> {{ todo.title }} </h3>
        <button
          v-if="todo.completed"
          @click="toggleTodo(todo)"
        >
          Completed
        </button>

        <button
          v-else
          @click="toggleTodo(todo)"
        >
          Complete
        </button>

        <button
          id="deleteTodo"
          @click="deleteTodo(todo)"
        >
          X
        </button>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['todo'],
  methods: {
    ...mapActions([
      'deleteTodo',
      'toggleTodo'
    ])
  }
}
</script>
