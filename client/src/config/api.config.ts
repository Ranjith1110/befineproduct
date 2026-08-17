import { ENV } from './env';

export const API_CONFIG = {
    baseURL: ENV.API_BASE_URL,
} as const;
