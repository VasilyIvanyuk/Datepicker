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
        <div
          :title="
            cellInfoList[
              weekIndex * this.daysInWeek + weekdayIndex
            ].events.text.join('\n')
          "
          @click="
            selectDate(
              cellInfoList[weekIndex * this.daysInWeek + weekdayIndex].date
            )
          "
          v-bind:class="[
            'clickable',
            {
              workingDay:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]
                  .viewState == 0,
              inactiveWorkingDay:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]
                  .viewState == 1,
              nonWorkingDay:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]
                  .viewState == 2,
              inactiveNonWorkingDay:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]
                  .viewState == 3,
            },
            {
              selected:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex]
                  .isSelected,
            },
            {
              withEvents:
                cellInfoList[weekIndex * this.daysInWeek + weekdayIndex].events
                  .isNonWorking,
            },
          ]"
        >
          {{
            cellInfoList[
              weekIndex * this.daysInWeek + weekdayIndex
            ].date.getDate()
          }}
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
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
      cellInfoList: this.fillMonth(this.selectedDate),
      daysInWeek: DaysInWeek,
      weeksToDisplay: WeeksToDisplay,
      daysTodisplay: DaysTodisplay,
      cellDisplayMode: CellDisplayMode,
      showTooltip: false,
      view: null, // TODO: days/months/years
    };
  },
  computed: {
    fetchCellsInfo() {
      return this.fillMonth(this.selectedDate);
    },
  },
  methods: {
    fillMonth(date) {
      const firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDisplayedDay = new Date(firstMonthDay);
      firstDisplayedDay.setDate(
        firstMonthDay.getDate() - firstMonthDay.getDay()
      );
      const numberOfDislayedDays = 42;
      const selectedTime = date.getTime();
      const dateList = [];
      for (let i = 0; i < numberOfDislayedDays; i++) {
        const cellDate = this.addDays(firstDisplayedDay, i);
        const targetMonth = this.isSameMonth(firstMonthDay, cellDate);
        const isWeekend = this.isWeekend(cellDate);
        const events = this.getEvents(cellDate);
        const nonWorkingDay = isWeekend || events.isNonWorking;
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
          isSelected: selectedTime == cellDate.getTime(),
          events: events,
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
    selectDate(newSelectedDate) {
      this.$emit("updateSelectedDate", newSelectedDate);
    },
    updateCells(date) {
      this.cellInfoList = this.fillMonth(date);
    },
    getEvents(date) {
      let events = JSON.parse(localStorage.annualEvents)?.filter(
        (ev) =>
          ev.month == date.getMonth() + 1 &&
          ev.day == date.getDate() &&
          (!ev.year || ev.year < date.getFullYear())
      );
      events = events.concat(
        JSON.parse(localStorage.oneTimeEvents)?.filter(
          (ev) =>
            ev.month == date.getMonth() + 1 &&
            ev.day == date.getDate() &&
            ev.year == date.getFullYear()
        )
      );

      const res = {
        text: events.filter((ev) => ev.text).map((ev) => ev.text),
        isNonWorking: !!events.find((ev) => ev.isRed == true),
      };

      return res;
    },
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
.selected {
  background-color: #b4f3d7;
}
.withEvents {
  text-decoration: underline;
}
</style>
