<template>
  <CalendarEditorPage title="Datepicker DEMO." />
</template>

<script>
import CalendarEditorPage from "./views/CalendarEditorPage.vue";

export default {
  name: "App",
  components: {
    CalendarEditorPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
