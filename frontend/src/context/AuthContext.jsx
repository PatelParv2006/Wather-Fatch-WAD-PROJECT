import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('weather_app_token') || null);
  const [loading, setLoading] = useState(true);

  // Restore authenticated session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('weather_app_token');
      const storedUser = localStorage.getItem('weather_app_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Verify with backend
          const res = await api.get('/auth/me');
          if (res.data && res.data.data && res.data.data.user) {
            setUser(res.data.data.user);
            localStorage.setItem('weather_app_user', JSON.stringify(res.data.data.user));
          }
        } catch (err) {
          // Only log out if token is genuinely invalid or rejected by server (401)
          if (err.response && err.response.status === 401) {
            console.warn('Session token expired or invalid, logging out');
            logout();
          } else {
            console.warn('Backend verification temporarily unavailable, retaining local session');
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { user: userData, token: jwtToken } = res.data.data;
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('weather_app_token', jwtToken);
    localStorage.setItem('weather_app_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { user: userData, token: jwtToken } = res.data.data;
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('weather_app_token', jwtToken);
    localStorage.setItem('weather_app_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('weather_app_token');
    localStorage.removeItem('weather_app_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
