import { AUTH_API_ENDPOINTS } from '../../features/auth/constants/apiEndpoints';
import {
    clearAuthSession,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from '../../features/auth/utils/authStorage';

type RequestExecutor = (url: string, options: RequestInit) => Promise<Response>;

let refreshRequest: Promise<string | null> | null = null;

export const applyRequestInterceptors = (
    options: RequestInit = {},
    includeAuth = true,
): RequestInit => {
    const headers = new Headers(options.headers || {});
    const token = getAccessToken();

    headers.set('Accept', 'application/json');

    if (includeAuth && token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return { ...options, headers };
};

const executeTokenRefresh = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        const response = await fetch(AUTH_API_ENDPOINTS.refresh, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) throw new Error('Refresh failed');

        const responseData = await response.json();
        const newAccessToken = responseData?.data?.accessToken || responseData?.token;
        const newRefreshToken = responseData?.data?.refreshToken;

        if (newAccessToken) {
            setAccessToken(newAccessToken);
            if (newRefreshToken) {
                setRefreshToken(newRefreshToken);
            }
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error('Token refresh failed. User must re-authenticate.', error);
        clearAuthSession();
        window.location.href = '/';
        return null;
    }
};

export const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshRequest) {
        refreshRequest = executeTokenRefresh().finally(() => {
            refreshRequest = null;
        });
    }

    return refreshRequest;
};

export const applyResponseInterceptors = async (
    response: Response,
    url: string,
    options: RequestInit,
    execute: RequestExecutor,
    handleUnauthorized = true,
): Promise<Response> => {
    if (!handleUnauthorized || response.status !== 401) {
        return response;
    }

    console.warn('401 Unauthorized detected. Attempting to refresh token...');
    const newToken = await refreshAccessToken();

    if (!newToken) {
        throw new Error('Session expired. Please log in again.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${newToken}`);

    return execute(url, { ...options, headers });
};
