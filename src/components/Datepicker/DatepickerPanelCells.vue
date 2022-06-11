<template>
  <!-- TODO: needs to implement different views for days, month and years  -->
  <table class="panel">
    <tr>
      <th v-for="weekDayName in weekDayNames" v-bind:key="weekDayName">
        {{ weekDayName }}
      </th>
    </tr>
    <tr v-for="(e, weekIndex) in this.weeksToDisplay" v-bind:key="weekIndex">
      <td
        v-for="(e, weekdayIndex) in this.daysInWeek"
        v-bind:key="weekIndex + '_' + weekdayIndex"
      >
        <DatepickerPanelCell
          :cell-info="cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import DatepickerPanelCell from "@/components/Datepicker/DatepickerPanelCell.vue";

export const DaysInWeek = 7;
export const WeeksToDisplay = 6;
export const DaysTodisplay = DaysInWeek * WeeksToDisplay;
export const CellDisplayMode = {
  ActiveWorkingDay: 0,
  InactiveWorkingDay: 1,
  ActiveNonWorkingDay: 2,
  InactiveNonWorkingDay: 3,
};

export default {
  name: "DatepickerPanelCells",
  props: {
    selectedDate: Date,
  },
  data() {
    return {
      initialDate: this.selectedDate,
      weekDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      cellInfoList: this.fillMonth(),
      daysInWeek: DaysInWeek,
      weeksToDisplay: WeeksToDisplay,
      daysTodisplay: DaysTodisplay,
      cellDisplayMode: CellDisplayMode,
      view: null, // TODO: days/months/years
    };
  },
  methods: {
    test() {
      return this.$props.selectedDate;
    },
    fillMonth() {
      const firstMonthDay = new Date(
        this.$props.selectedDate.getFullYear(),
        this.$props.selectedDate.getMonth(),
        1
      );
      const firstDisplayedDay = new Date(new Date().setHours(0, 0, 0, 0));
      firstDisplayedDay.setDate(
        firstMonthDay.getDate() - firstMonthDay.getDay()
      );
      const numberOfDislayedDays = 42;
      const selectedTime = this.$props.selectedDate.getTime();
      const dateList = [];
      for (let i = 0; i < numberOfDislayedDays; i++) {
        const cellDate = this.addDays(firstDisplayedDay, i);
        const targetMonth = this.isSameMonth(firstMonthDay, cellDate);
        const isWeekend = this.isWeekend(cellDate);
        const event = { message: "", isHoliday: false }; // TODO: should be a list of events. Use global dictionary (from storage) to load all events
        const nonWorkingDay = isWeekend || event.isHoliday;
        const cellViewState =
          targetMonth && nonWorkingDay
            ? CellDisplayMode.ActiveNonWorkingDay
            : targetMonth && !nonWorkingDay
            ? CellDisplayMode.ActiveWorkingDay
            : !targetMonth && nonWorkingDay
            ? CellDisplayMode.InactiveNonWorkingDay
            : CellDisplayMode.InactiveWorkingDay;
        dateList.push({
          date: cellDate,
          viewState: cellViewState,
          isToday: selectedTime == cellDate.getTime(),
          // events: [event],
        });
      }

      return dateList;
    },
    addDays(date, days) {
      let newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      return newDate;
    },
    isSameMonth(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
      );
    },
    isWeekend(date) {
      return date.getDay() === 6 || date.getDay() === 0;
    },
  },
  components: {
    DatepickerPanelCell,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border-width: 1px;
  border-style: solid;
  width: 170px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
