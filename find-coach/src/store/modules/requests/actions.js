export default {
  async contactCoach(context, payload) {
    const newRequest = { ...payload };
    try {
      const response = await fetch(
        `https://vuejs-http-96326.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );

      newRequest.id = response.name;
      context.commit('addRequest', newRequest);
    } catch (e) {
      throw new Error(e.message || 'Failed to send request');
    }
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    try {
      const response = await fetch(
        `https://vuejs-http-96326.firebaseio.com/requests/${coachId}.json`
      );
      const responseData = await response.json();
      context.commit(
        'setRequests',
        Object.keys(responseData).map((key) => {
          return responseData[key];
        })
      );
    } catch (e) {
      throw new Error(e.message || 'Failed to fetch requests');
    }
  },
};
