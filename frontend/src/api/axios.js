import axios from 'axios';

// Create centralized Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token to every outgoing request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('weather_app_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Format error messages consistently
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only clean local token if 401 is returned from user auth-guarded endpoints
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || '';
      const isUserGuardedRoute = url.includes('/auth/me') || url.includes('/favourites');
      if (isUserGuardedRoute) {
        localStorage.removeItem('weather_app_token');
        localStorage.removeItem('weather_app_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
