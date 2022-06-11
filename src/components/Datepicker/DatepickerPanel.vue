<template>
  <DatepickerPanelHeader
    v-bind:selectedDate="currentSelectedDate"
    v-on:updateSelectedMonth="updateSelectedMonth"
  />
  <DatepickerPanelCells
    v-bind:selectedDate="currentSelectedDate"
    v-on:updateSelectedDate="updateSelectedDate"
    ref="datepickerCells"
  />
</template>

<script>
import DatepickerPanelHeader from "@/components/Datepicker/DatepickerPanelHeader.vue";
import DatepickerPanelCells from "@/components/Datepicker/DatepickerPanelCells.vue";

export default {
  name: "DatepickerPanel",
  props: {
    selectedDate: Date,
  },
  data() {
    return {
      currentSelectedDate: this.selectedDate,
      selectedMonth: this.selectedDate,
      view: null, // TODO: days/months/years
    };
  },
  emits: ["updateSelectedDate"],
  methods: {
    updateSelectedDate(newSelectedDate) {
      this.$emit("updateSelectedDate", newSelectedDate);
    },
    updateSelectedMonth(newDate) {
      this.$refs.datepickerCells.updateCells(newDate);
    },
  },
  components: {
    DatepickerPanelHeader,
    DatepickerPanelCells,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
