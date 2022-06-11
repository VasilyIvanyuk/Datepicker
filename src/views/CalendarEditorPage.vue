<template>
  <div class="hello">
    <h1>{{ title }}</h1>
  </div>
  <Datepicker />
</template>

<script>
import Datepicker from "@/components/Datepicker/Datepicker.vue";

export default {
  name: "CalendarEditorPage",
  props: {
    title: String,
  },
  components: {
    Datepicker,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
