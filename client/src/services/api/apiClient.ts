import { applyRequestInterceptors, applyResponseInterceptors } from './interceptors';

export interface ApiClientBehavior {
    includeAuth?: boolean;
    handleUnauthorized?: boolean;
}

const executeRequest = (url: string, options: RequestInit): Promise<Response> => {
    return fetch(url, options);
};

export const apiClient = async (
    url: string,
    options: RequestInit = {},
    behavior: ApiClientBehavior = {},
): Promise<Response> => {
    const requestOptions = applyRequestInterceptors(
        options,
        behavior.includeAuth ?? true,
    );
    const response = await executeRequest(url, requestOptions);

    return applyResponseInterceptors(
        response,
        url,
        requestOptions,
        executeRequest,
        behavior.handleUnauthorized ?? true,
    );
};
