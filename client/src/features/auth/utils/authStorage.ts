const AuthCache = {
    setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
    getItem: (key: string) => sessionStorage.getItem(key),
    clear: () => sessionStorage.clear(),
};

export const getAccessToken = (): string | null => {
    return AuthCache.getItem('authToken');
};

export const getRefreshToken = (): string | null => {
    return AuthCache.getItem('refreshToken');
};

export const setAccessToken = (token: string): void => {
    AuthCache.setItem('authToken', token);
};

export const setRefreshToken = (token: string): void => {
    AuthCache.setItem('refreshToken', token);
};

export const getUserInfo = (): string | null => {
    return AuthCache.getItem('userInfo');
};

export const setUserInfo = (userInfo: string): void => {
    AuthCache.setItem('userInfo', userInfo);
};

export const clearAuthSession = (): void => {
    AuthCache.clear();
};
