<template>
    <div>
        <div
          class = "todo__complete"
          @click="toggleTodo(todo)"
        >
        □
        </div>

        <div
          class = "todo__complete check"
          :class="{hidden: !todo.completed}"
          @click="toggleTodo(todo)"
        >
          ✔️
        </div>
         {{ todo.title }}
        <div
          class="todo__delete"
          id="deleteTodo"
          @click="deleteTodo(todo)"
        >
          X
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['todo'],
  methods: {
    ...mapActions('todos', [
      'deleteTodo',
      'toggleTodo'
    ])
  }
}
</script>
