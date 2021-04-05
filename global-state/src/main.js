import { createApp } from 'vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
});

import App from './App.vue';

const app = createApp(App);
app.use(store);
app.mount('#app');
