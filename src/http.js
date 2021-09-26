import axios from 'axios';
import store from '@/store';

export default () => {
  const headers = {};
  if (store.getters.isAuthorized) {
    headers.Authorization = `Bearer ${store.getters.authToken}`;
  }
  return axios.create({
    baseURL: '/api/v1/',
    headers
  });
};
