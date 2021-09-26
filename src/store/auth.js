import jwtDecode from 'jwt-decode';
import http from '@/http';

const URL = 'token/';

const state = {
  accessToken: null,
  refreshToken: null,
  refreshTimeoutId: null
};

const getters = {
  authToken(state) {
    return state.accessToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  // zakładam, że jeżeli token jest widoczny to użytkownik jest zalogowany
  isAuthorized(state) {
    return !!state.accessToken;
  }
};

const mutations = {
  setTokens(state, tokens) {
    state.accessToken = tokens.access;
    if (tokens.refresh) {
      state.refreshToken = tokens.refresh;
    }
  },
  setRefreshTimeoutId(state, id) {
    state.refreshTimeoutId = id;
  }
};

// metoda aktualizująca access token na 10 sekund przed wygaśnięciem
// metoda używana w metodach typu `actions`, `context` jest kontekstem akcji
const refreshToken = (accessToken, context) => {
  // odszyfrowanie token
  // co ciekawe data wygaśnięcia podawana jest w sekundach, jak zazwyczaj w ms
  const delay = jwtDecode(accessToken).exp * 1000 - Date.now() - 10000;
  context.commit(
    'setRefreshTimeoutId',
    setTimeout(() => {
      context.dispatch('refresh');
    }, delay)
  );
};

const actions = {
  async login(context, payload) {
    try {
      const responseData = (await http().post(URL, payload)).data;
      context.commit('setTokens', responseData);
      refreshToken(responseData.access, context);
    } catch (e) {
      console.error(e);
    }
  },
  async refresh(context) {
    try {
      const responseData = (
        await http().post(`${URL}refresh/`, {
          refresh: context.getters.refreshToken
        })
      ).data;

      context.commit('setTokens', responseData);
      refreshToken(responseData.access, context);
    } catch (e) {
      // w przypadku problemu z odświeżeniem token, wykonujemy akcję logout dla stanu aplikacji
      await new Promise((resolve) => {
        context.dispatch('logout');
        console.error(e);
        resolve();
      });
    }
  },
  logout(context) {
    // ustawienie wartości null informuje aplikację, że użytkownik jest wylogowany
    context.commit('setTokens', { access: null, refresh: null });
    context.dispatch('stopRefresh');
  },
  // zatrzymanie timeout odświeżania
  stopRefresh(context) {
    if (context.state.refreshTimeoutId != null) {
      clearTimeout(context.state.refreshTimeoutId);
      context.commit('setRefreshTimeoutId');
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
