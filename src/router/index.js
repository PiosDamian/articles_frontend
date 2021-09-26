import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

// widoki tworzenia i czytania całego artykułu są jako lazy aby przyspieszyć wstępne wczytywanie aplikacji
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/new',
    name: 'Create',
    component: () => import('../views/Create-article'),
    // strażnik sprawdzający stan zalogowania użytkownika
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthorized) {
        next('/');
      }

      next();
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/Article'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
