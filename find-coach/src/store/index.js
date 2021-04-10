import { createStore } from 'vuex';
import { coaches, requests } from './modules';

const store = createStore({
  modules: {
    coaches,
    requests,
  },
});

export default store;
