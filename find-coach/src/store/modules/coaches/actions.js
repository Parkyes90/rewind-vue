export default {
  registerCoach(context, data) {
    context.commit('registerCoach', {
      id: new Date().toISOString(),
      userId: context.rootGetters.userId,
      ...data,
    });
  },
};
