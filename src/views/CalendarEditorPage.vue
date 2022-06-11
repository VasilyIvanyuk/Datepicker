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
  methods: {
    generateEvents() {
      const annualEvents = "annualEvents";
      if (!localStorage.getItem(annualEvents)) {
        localStorage.setItem(
          annualEvents,
          JSON.stringify([
            {
              day: 1,
              month: 1,
              isRed: true,
              text: "New Year",
            },
            {
              day: 2,
              month: 1,
              isRed: true,
            },
            {
              day: 12,
              month: 6,
              isRed: true,
              text: "Russia Day",
            },
            {
              day: 6,
              month: 5,
              year: 1799,
              isRed: false,
              text: "День рождения А.С.Пушкина (по старому стилю)",
            },
            {
              day: 29,
              month: 5,
              year: 1978,
              isRed: false,
              text: "My Birthday",
            },
            {
              day: 6,
              month: 5,
              year: 1799,
              isRed: false,
              text: "День рождения А.С.Пушкина",
            },
            {
              day: 2,
              month: 8,
              year: 1930,
              isRed: false,
              text: "День ВДВ",
            },
          ])
        );
      }

      const oneTimeEvents = "oneTimeEvents";
      if (!localStorage.getItem(oneTimeEvents)) {
        localStorage.setItem(
          oneTimeEvents,
          JSON.stringify([
            {
              day: 13,
              month: 6,
              year: 2022,
              isRed: false,
              text: "Test task deadline",
            },
            {
              day: 13,
              month: 6,
              year: 2022,
              isRed: true,
              text: "Shifted from 12.06 (Russia Day)",
            },
            {
              day: 29,
              month: 5,
              year: 2022,
              isRed: true,
              text: "Something",
            },
          ])
        );
      }
    },
  },
  mounted() {
    this.generateEvents();
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
