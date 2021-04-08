export default {
  increment(context, payload) {
    setTimeout(() => {
      context.commit('increment', payload);
    }, 100);
  },
};
