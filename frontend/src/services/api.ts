import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import { storeToRefs } from 'pinia';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.defaults.withCredentials = true;

api.interceptors.request.use(async (config) => {
  const store = useAuthStore();

  config.headers.Authorization = `${store.token}`;
  return config;
});

export default api;
