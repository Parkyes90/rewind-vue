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
  loadCoaches(context) {
    fetch(`https://vuejs-http-96326.firebaseio.com/coaches.json`)
      .then((res) => res.json())
      .then((json) => {
        const coaches = Object.keys(json).map((key) => ({
          id: key,
          ...json[key],
        }));
        context.commit('setCoaches', coaches);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
