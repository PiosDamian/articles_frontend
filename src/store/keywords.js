import http from '@/http';

const URL = 'articles/';

const state = {
  keywords: []
};

const getters = {
  getKeywords(state) {
    return state.keywords;
  }
};

const mutations = {
  setKeywords(state, keywords) {
    state.keywords = [...keywords];
  },
  setKeyword(state, keyword) {
    state.keywords = [...state.keywords, keyword];
  }
};

const actions = {
  async fetchKeywords(context) {
    context.commit('setKeywords', (await http().get(`${URL}keywords/`)).data);
  },
  async createKeyword(context, name) {
    const data = (await http().post(`${URL}keywords/`, { name })).data;
    context.commit('setKeyword', data);
    return data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
