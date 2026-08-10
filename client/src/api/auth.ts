export interface LoginPayload {
    emailOrUsername: string;
    password: string;
}

export interface ChangePasswordPayload {
    oldPassword?: string;
    newPassword: string;
    confirmPassword?: string;
}

export interface UserProfile {
    uuid: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface BefineApiResponse {
    success: boolean;
    message: string;
    data: any;
    meta?: Record<string, any>;
    timestamp?: string;
    requestId?: string;
    error?: {
        code: string;
        details?: Record<string, any>;
    };
}

const API_BASE_URL = '/api/v1';

// SECURITY: Utilizing Session Storage (Cache) instead of Local Storage. 
const AuthCache = {
    setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
    getItem: (key: string) => sessionStorage.getItem(key),
    removeItem: (key: string) => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear()
};

// Helper function to handle API responses cleanly
const handleApiResponse = async (response: Response) => {
    const responseText = await response.text();
    let responseData: any = null;

    try {
        responseData = JSON.parse(responseText);
    } catch (parseError) {
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }
        throw new Error('Unexpected server response format. Expected JSON.');
    }

    if (!response.ok || responseData.success === false) {
        const serverMessage = responseData?.message || responseData?.error?.code || `Server Error: ${response.status}`;
        throw new Error(serverMessage);
    }

    return responseData;
};

export const loginApi = async (payload: LoginPayload): Promise<BefineApiResponse> => {
    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server. Is the backend running?');
    }

    const responseData = await handleApiResponse(response);

    if (!responseData || !responseData.data) {
        throw new Error(`Invalid response data structure from server (Status: ${response.status}).`);
    }

    const { accessToken, refreshToken, user, roles } = responseData.data;

    if (accessToken) AuthCache.setItem('authToken', accessToken);
    if (refreshToken) AuthCache.setItem('refreshToken', refreshToken);

    if (user) {
        const userInfo = {
            ...user,
            roles: roles || []
        };
        AuthCache.setItem('userInfo', JSON.stringify(userInfo));
    }

    return responseData as BefineApiResponse;
};

export const forgotPasswordApi = async (email: string): Promise<BefineApiResponse> => {
    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    return await handleApiResponse(response);
};

export const changePasswordApi = async (payload: ChangePasswordPayload): Promise<BefineApiResponse> => {
    let response: Response;
    const token = AuthCache.getItem('authToken');

    try {
        response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    return await handleApiResponse(response);
};

export const logoutApi = async (): Promise<void> => {
    const token = AuthCache.getItem('authToken');

    if (token) {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Failed to hit logout API endpoint:', error);
        }
    }

    AuthCache.clear();
};

export const isAuthenticated = (): boolean => {
    return !!AuthCache.getItem('authToken');
};

export const getUserRole = (): string[] => {
    const userInfoStr = AuthCache.getItem('userInfo');
    if (!userInfoStr) return [];
    try {
        const userInfo = JSON.parse(userInfoStr);
        return userInfo.roles || [];
    } catch {
        return [];
    }
};

// --- NEW AUTO-REFRESH INTERCEPTOR LOGIC ---

export const refreshTokenApi = async (): Promise<string | null> => {
    const refreshToken = AuthCache.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
        // NOTE: Adjust '/auth/refresh' if your backend uses a different endpoint name for token refreshing
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) throw new Error('Refresh failed');

        const responseData = await response.json();

        // Extract new tokens depending on your specific API schema mapping
        const newAccessToken = responseData?.data?.accessToken || responseData?.token;
        const newRefreshToken = responseData?.data?.refreshToken;

        if (newAccessToken) {
            AuthCache.setItem('authToken', newAccessToken);
            if (newRefreshToken) {
                AuthCache.setItem('refreshToken', newRefreshToken);
            }
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error('Token refresh failed. User must re-authenticate.', error);
        AuthCache.clear();
        window.location.href = '/'; // Force redirect to login page
        return null;
    }
};

// Use this wrapper function for all future API calls instead of standard fetch()
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    let token = AuthCache.getItem('authToken');

    // Setup headers
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // 1. Attempt original request
    let response = await fetch(url, { ...options, headers });

    // 2. Intercept 401 Unauthorized
    if (response.status === 401) {
        console.warn("401 Unauthorized detected. Attempting to refresh token...");
        const newToken = await refreshTokenApi();

        if (newToken) {
            // 3. Retry original request with the new token
            headers.set('Authorization', `Bearer ${newToken}`);
            response = await fetch(url, { ...options, headers });
        } else {
            throw new Error('Session expired. Please log in again.');
        }
    }

    return response;
};