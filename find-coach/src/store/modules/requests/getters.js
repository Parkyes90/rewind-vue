const getters = {
  requests(state, getters, rootState, rootGetter) {
    const coachId = rootGetter.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(...params) {
    const requests = getters.requests(...params);
    return requests && requests.length > 0;
  },
};

export default getters;
