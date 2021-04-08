import { createApp } from 'vue';
import { createStore } from 'vuex';

const counterModule = {
  namespaced: true,
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state, payload = { value: 2 }) {
      state.counter = state.counter + payload.value;
    },
  },
  actions: {
    increment(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload);
      }, 100);
    },
  },
  getters: {
    testAuth(state, getters, rootState) {
      return rootState.isLoggedIn;
    },
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(_, getters) {
      const { finalCounter } = getters;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 100;
      }
      return finalCounter;
    },
  },
};

const store = createStore({
  modules: {
    numbers: counterModule,
  },
  state() {
    return {
      counter: 0,
      isLoggedIn: false,
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload.isAuth;
    },
  },
  actions: {
    login(context) {
      context.commit('setAuth', { isAuth: true });
    },
    logout(context) {
      context.commit('setAuth', { isAuth: false });
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});

import App from './App.vue';

const app = createApp(App);
app.use(store);
app.mount('#app');
