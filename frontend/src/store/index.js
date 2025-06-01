import { createStore } from "vuex";

const store = createStore({
   state: {
      chargers: [],
   },
   mutations: {
      setChargers(state, payload) {
         state.chargers = payload;
      },
   },
   actions: {
      async fetchChargers({ commit }) {
         const res = await fetch("/api/chargers");
         const data = await res.json();
         commit("setChargers", data);
      },
   },
});

export default store;
