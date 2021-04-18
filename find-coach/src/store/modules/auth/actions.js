import { AUTH_MODE, WEB_API_KEY } from '@/constants/auth';

let timer;

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
      expiresIn: tokenExpiration,
    } = responseData;
    const expirationDate =
      new Date().getTime() + parseInt(tokenExpiration, 10) * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('tokenExpiration', expirationDate.toString());

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, parseInt(tokenExpiration, 10) * 1000);

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

    const expiresIn = parseInt(tokenExpiration, 10) - new Date().getTime();
    if (expiresIn > 0) {
      timer = setTimeout(async () => {
        await context.dispatch('autoLogout');
      }, expiresIn);

      if (token && userId) {
        context.commit('setUser', {
          token,
          userId,
          tokenExpiration,
        });
      }
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  async autoLogout(context) {
    await context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
