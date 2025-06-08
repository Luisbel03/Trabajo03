export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  LOGIN: '/token/',
  REGISTER: '/register/',
  VERIFY_TOKEN: '/token/verify/',
  REFRESH_TOKEN: '/token/refresh/',
  USER_PROFILE: '/profile/',
} as const; 