<template>
  <div class="header">
    <span class="previous" v-on:click="previousMonth">&lt;</span>
    <span>{{ this.selectedMonth }}</span>
    <span class="next" v-on:click="nextMonth">></span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DatepickerPanelHeader",
  props: {
    selectedDate: Date,
  },
  data() {
    return {
      selectedMonth: moment(this.selectedDate).format("MMM YYYY"),
      view: null, // TODO: months/years
      showPanel: false,
    };
  },
  methods: {
    previousMonth() {
      this.setNewMonth(this.selectedDate.getMonth() - 1);
    },
    nextMonth() {
      this.setNewMonth(this.selectedDate.getMonth() + 1);
    },
    setNewMonth(month) {
      this.selectedDate.setMonth(month);
      this.selectedMonth = moment(this.selectedDate).format("MMM YYYY");
      this.$emit("updateSelectedMonth", this.selectedDate);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  border-width: 1px;
  border-style: solid;
  width: 168px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.previous {
  padding-right: 20px;
  cursor: pointer;
}
.next {
  padding-left: 20px;
  cursor: pointer;
}
</style>
