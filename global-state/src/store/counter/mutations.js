export default {
  increment(state, payload = { value: 2 }) {
    state.counter = state.counter + payload.value;
  },
};
