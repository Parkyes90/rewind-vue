import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import counter from './counter';

const store = createStore({
  modules: {
    numbers: counter,
  },
  state() {
    return {
      counter: 0,
      isLoggedIn: false,
    };
  },
  mutations,
  actions,
  getters,
});

export default store;
