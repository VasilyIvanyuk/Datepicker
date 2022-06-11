<template>
  <div>
    <input
      v-model="formattedDate"
      v-on:click="showOrClosePanel"
      v-on:dblclick="showOrClosePanel"
      v-on:input="updateDate"
    />
    <DatepickerPanel v-if="showPanel" v-bind:selectedDate="selectedDate" />
  </div>
</template>

<script>
import moment from "moment";
import DatepickerPanel from "@/components/Datepicker/DatepickerPanel.vue";

export default {
  name: "CalendarItem",
  //   props: {
  //   showPanel?: (String),
  //   firstString: String,
  // },
  components: {
    DatepickerPanel,
  },
  data() {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    return {
      selectedDate: date,
      formattedDate: moment(date.toLocaleDateString()).format("DD.MM.YYYY"),
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
    showOrClosePanel() {
      this.showPanel = !this.showPanel;
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
