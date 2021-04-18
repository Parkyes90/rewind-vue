import { AUTH_MODE, WEB_API_KEY } from '@/constants/auth';

export default {
  async login(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      mode: AUTH_MODE.LOGIN.value,
    });
  },
  async signUp(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      mode: AUTH_MODE.SIGN_UP.value,
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const url =
      mode === AUTH_MODE.LOGIN.value
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to authenticate.');
    }

    const {
      idToken: token,
      localId: userId,
      expireIn: tokenExpiration,
    } = responseData;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('tokenExpiration', tokenExpiration);

    context.commit('setUser', {
      token,
      userId,
      tokenExpiration,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration,
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
