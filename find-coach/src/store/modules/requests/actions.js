export default {
  contactCoach(context, payload) {
    context.commit('addRequest', {
      id: new Date().toISOString(),
      ...payload,
    });
  },
};
