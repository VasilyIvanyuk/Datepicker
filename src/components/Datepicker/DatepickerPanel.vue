<template>
  <DatepickerPanelHeader v-bind:selectedDate="selectedDate" />
  <DatepickerPanelCells v-bind:selectedDate="selectedDate" />
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
      selectedMonth: this.selectedDate,
      view: null, // TODO: days/months/years
      showPanel: false,
    };
  },
  methods: {
    updateDate() {
      this.showPanel = false; // TODO: << if date is valid then Update current date in datepicker
      console.log("date is changed");
      //this.$emit("selectedDateChenged");
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
