<template>
  <TodoApp />
</template>

<script>
import TodoApp from "./components/TodoApp.vue";
export default {
  name: "App",
  components: {
    TodoApp,
  },
};
</script>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
