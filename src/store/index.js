import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// TODO: not used yet. just for exercise
export default new Vuex.Store({
  state: {
    selectedDate: {},
  },
  mutators: {
    setSelectedDate(state, { date, events }) {
      state.selectedDate.date = date;
      state.selectedDate.events = events;
    },
  },
});
