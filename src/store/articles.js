import http from '@/http';

const URL = 'articles/';

const state = {
  articles: [],
  afterLoad: false
};

const getters = {
  getArticles(state) {
    return state.articles;
  },
  // pobieranie konkretnego artykułu na podstawie id
  getArticle: (state) => (payload) =>
    state.articles.find((article) => article.id === payload)
};

const mutations = {
  setArticles(state, articles) {
    state.articles = [...articles];
  },
  addArticle(state, article) {
    state.articles = [...state.articles, article];
  }
};

const actions = {
  async fetchArticles(context) {
    if (!context.state.afterLoad) {
      context.commit('setArticles', (await http().get(`${URL}articles/`)).data);
    }
  },
  async addArticle(context, payload) {
    context.commit(
      'addArticle',
      (await http().post(`${URL}articles/`, payload)).data
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
