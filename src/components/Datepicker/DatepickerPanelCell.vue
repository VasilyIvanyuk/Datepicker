<template>
  <div
    v-bind:class="[
      'clickable',
      {
        workingDay: this.viewState == 0,
        inactiveWorkingDay: this.viewState == 1,
        nonWorkingDay: this.viewState == 2,
        inactiveNonWorkingDay: this.viewState == 3,
      },
      {
        today: this.isToday,
      },
    ]"
  >
    {{ day }}
  </div>
</template>

<script>
export default {
  name: "DatepickerPanelCell",
  props: {
    cellInfo: { date: Date, viewState: Number, isToday: Boolean },
  },
  data() {
    return {
      day: this.cellInfo.date.getDate(),
      viewState: this.cellInfo.viewState,
      isToday: this.cellInfo.isToday,
      view: null, // TODO: day/month/year
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}
.workingDay {
  color: #42b983;
}
.inactiveWorkingDay {
  color: #cfe7dc;
}
.nonWorkingDay {
  color: #f7656c;
}
.inactiveNonWorkingDay {
  color: #f3cbcd;
}
.today {
  background-color: #b4f3d7;
}
</style>
