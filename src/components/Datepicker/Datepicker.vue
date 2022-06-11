<template>
  <div>
    <input
      v-model="formattedDate"
      v-on:click="showOrClosePanel"
      v-on:dblclick="showOrClosePanel"
      v-on:input="updateDate"
    />
    <DatepickerPanel
      v-if="showPanel"
      v-bind:selectedDate="selectedDate"
      v-on:updateSelectedDate="updateSelectedDate"
    />
  </div>
</template>

<script>
import moment from "moment";
import DatepickerPanel from "@/components/Datepicker/DatepickerPanel.vue";

export const DateFormat = "DD.MM.YYYY";
export default {
  name: "DatePicker",
  components: {
    DatepickerPanel,
  },
  data() {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    return {
      selectedDate: date,
      formattedDate: moment(date.toLocaleDateString()).format(DateFormat),
      view: null, // TODO: days/months/years
      showPanel: false,
    };
  },
  methods: {
    updateDate(event) {
      const newDate = moment(event.target.value, "DD.MM.YYYY");
      if (newDate.format("DD.MM.YYYY") === event.target.value) {
        this.selectedDate = newDate.toDate();
        this.showPanel = true;
      } else {
        this.selectedDate = new Date(new Date().setHours(0, 0, 0, 0));
        this.showPanel = false;
      }
    },
    showOrClosePanel() {
      this.showPanel = !this.showPanel;
    },
    updateSelectedDate(newSelectedDate) {
      this.showPanel = false;
      this.selectedDate = newSelectedDate;
      this.formattedDate = moment(newSelectedDate.toLocaleDateString()).format(
        "DD.MM.YYYY"
      );
    },
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
