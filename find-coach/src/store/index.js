import { createStore } from 'vuex';
import { coaches, requests, auth } from './modules';

const store = createStore({
  modules: {
    coaches,
    requests,
    auth,
  },
});

export default store;
