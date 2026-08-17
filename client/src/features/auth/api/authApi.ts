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
        response = await apiClient(AUTH_API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }, { includeAuth: false, handleUnauthorized: false });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server. Is the backend running?');
    }

    const responseData = await handleApiResponse(response);

    if (!responseData || !responseData.data) {
        throw new Error(`Invalid response data structure from server (Status: ${response.status}).`);
    }

    const { accessToken, refreshToken, user, roles } = responseData.data;

    if (accessToken) setAccessToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);

    if (user) {
        const userInfo = {
            ...user,
            roles: roles || []
        };
        setUserInfo(JSON.stringify(userInfo));
    }

    return responseData as BefineApiResponse;
};

export const forgotPasswordApi = async (email: string): Promise<BefineApiResponse> => {
    let response: Response;

    try {
        response = await apiClient(AUTH_API_ENDPOINTS.forgotPassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }, { includeAuth: false, handleUnauthorized: false });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    return await handleApiResponse(response);
};

export const changePasswordApi = async (payload: ChangePasswordPayload): Promise<BefineApiResponse> => {
    let response: Response;
    try {
        response = await apiClient(AUTH_API_ENDPOINTS.changePassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }, { handleUnauthorized: false });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    return await handleApiResponse(response);
};

export const logoutApi = async (): Promise<void> => {
    const token = getAccessToken();

    if (token) {
        try {
            await apiClient(AUTH_API_ENDPOINTS.logout, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }, { handleUnauthorized: false });
        } catch (error) {
            console.error('Failed to hit logout API endpoint:', error);
        }
    }

    clearAuthSession();
};

export const isAuthenticated = (): boolean => {
    return !!getAccessToken();
};

export { getAccessToken } from '../utils/authStorage';

export const getUserRole = (): string[] => {
    const userInfoStr = getUserInfo();
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
    return refreshAccessToken();
};

// Use this wrapper function for all future API calls instead of standard fetch()
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    return apiClient(url, options);
};
import { apiClient } from '../../../services/api';
import { refreshAccessToken } from '../../../services/api/interceptors';
import { AUTH_API_ENDPOINTS } from '../constants/apiEndpoints';
import {
    clearAuthSession,
    getAccessToken,
    getUserInfo,
    setAccessToken,
    setRefreshToken,
    setUserInfo,
} from '../utils/authStorage';
