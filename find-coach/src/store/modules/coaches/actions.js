export default {
  registerCoach(context, data) {
    context.commit('registerCoach', {
      id: context.rootGetters.userId,
      userId: context.rootGetters.userId,
      ...data,
    });
  },
};
