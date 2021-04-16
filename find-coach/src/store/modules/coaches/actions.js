export default {
  registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coach = {
      userId,
      ...data,
    };
    fetch(`https://vuejs-http-96326.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coach),
    })
      .then((res) => res.json())
      .then((json) => context.commit('registerCoach', { id: userId, ...json }))
      .catch((err) => {
        console.log(err);
      });
  },
  async loadCoaches(context, payload) {
    if (payload.forceRefresh || context.getters.shouldUpdate) {
      await fetch(`https://vuejs-http-96326.firebaseio.com/coaches.json`)
        .then((res) => res.json())
        .then((json) => {
          const coaches = Object.keys(json).map((key) => ({
            id: key,
            ...json[key],
          }));
          context.commit('setCoaches', coaches);
          context.commit('setFetchTimeStamp');
        })
        .catch((err) => {
          throw new Error(err.message || 'Failed to fetch!');
        });
    }
  },
};
