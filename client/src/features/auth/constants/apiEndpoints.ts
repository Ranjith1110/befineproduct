import { API_CONFIG } from '../../../config/api.config';

const API_BASE_URL = API_CONFIG.baseURL;

export const AUTH_API_ENDPOINTS = {
    login: `${API_BASE_URL}/auth/login`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    changePassword: `${API_BASE_URL}/auth/change-password`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
} as const;
