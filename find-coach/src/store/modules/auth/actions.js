export default {
  login() {},
  async signUp(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.WEB_API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to authenticate.');
    }
    console.log(responseData);
    const {
      idToken: token,
      localId: userId,
      expireIn: tokenExpiration,
    } = responseData;
    context.commit('setUser', {
      token,
      userId,
      tokenExpiration,
    });
  },
};
