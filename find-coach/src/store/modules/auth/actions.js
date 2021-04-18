import { WEB_API_KEY } from '@/constants/auth';

export default {
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
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
    const {
      idToken: token,
      localId: userId,
      expiresIn: tokenExpiration,
    } = responseData;
    context.commit('setUser', {
      token,
      userId,
      tokenExpiration,
    });
  },
  async signUp(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`,
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
