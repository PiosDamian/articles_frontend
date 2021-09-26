import Vue from 'vue';
import Vuex from 'vuex';
import articles from '@/store/articles';
import auth from '@/store/auth';
import keywords from '@/store/keywords';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    articles,
    auth,
    keywords
  }
});
