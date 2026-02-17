import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const productAPI = {
  getProducts: (search = '', page = 1, limit = 10, category = 'all') =>
    api.get('/products', {
      params: { search, page, limit, category },
    }),
  getProduct: (id) => api.get(`/products/${id}`),
  addFavorite: (productId) =>
    api.post('/products/favorite/add', { productId }),
  removeFavorite: (productId) =>
    api.post('/products/favorite/remove', { productId }),
  getFavorites: () => api.get('/products/user/favorites'),
};

export default api;
