import { createStore } from 'vuex';
import { coaches, requests } from './modules';

const store = createStore({
  modules: {
    coaches,
    requests,
  },
  state() {
    return {
      userId: 'gavin',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
