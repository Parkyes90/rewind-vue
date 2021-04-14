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
};
