import axios from 'axios';
import { LoginResponse, LoginCredentials, User, RegisterData, ChangePasswordData } from '../types/user';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  LOGIN: '/token/',
  REGISTER: '/register/',
  REFRESH_TOKEN: '/token/refresh/',
  VERIFY_TOKEN: '/token/verify/',
  USER_PROFILE: '/profile/',
  USER_DATA: '/user/',
  CHANGE_PASSWORD: '/change-password/',
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('Forbidden access:', error.response.data);
      } else if (error.response.status === 404) {
        console.error('Resource not found:', error.response.data);
      } else if (error.response.status === 500) {
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth service methods
export const authService = {
  login: async (identifier: string, password: string): Promise<LoginResponse> => {
    const payload: LoginCredentials & { email?: string; username?: string } = {
      identifier,
      password,
      ...(identifier.includes('@') ? { email: identifier } : { username: identifier }),
    };
    
    const response = await api.post<LoginResponse>(API_ENDPOINTS.LOGIN, payload);
    return response.data;
  },

  register: async (data: RegisterData): Promise<any> => {
    const response = await api.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  verifyToken: async (token: string) => {
    return api.post(API_ENDPOINTS.VERIFY_TOKEN, { token });
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get(API_ENDPOINTS.USER_DATA);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(API_ENDPOINTS.USER_PROFILE, data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await api.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
  },
};

export default api; 