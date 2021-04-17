export default {
  setUser(state, { token, userId, tokenExpiration }) {
    state = {
      ...state,
      token,
      userId,
      tokenExpiration,
    };
  },
};
