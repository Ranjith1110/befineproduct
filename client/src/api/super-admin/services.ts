import { fetchWithAuth } from '../auth';

export interface CreateServicePayload {
    serviceCode: string;
    title: string;
    shortDescription: string;
    categoryUuid: string;
    tagUuids: string[];
    thumbnailImage: string;
    galleryImages: string[];
    basePrice: number;
    discountType: string;
    discountValue: number;
    gstPercent: number;
    currency: string;
    durationMinutes: number;
    isActive: boolean;
    canProviderOffer: boolean;
    requiresPrescription: boolean;
    requiresAssessment: boolean;
    displayOrder: number;
    isFeatured: boolean;
    version?: number;
}

export interface GetServicesParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
}

const API_BASE_URL = '/api/v1';

export const createServiceApi = async (payload: Partial<CreateServicePayload>) => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            throw new Error('Unexpected server response format. Expected JSON.');
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to create service (Status: ${response.status})`;

        if (responseData?.error?.code === 'VALIDATION_ERROR' && responseData?.error?.details?.body?.fieldErrors) {
            const fieldErrors = responseData.error.details.body.fieldErrors;
            const firstErrorField = Object.keys(fieldErrors)[0];
            if (firstErrorField) {
                serverMessage = `Validation Error (${firstErrorField}): ${fieldErrors[firstErrorField][0]}`;
            }
        }
        throw new Error(serverMessage);
    }
    return responseData;
};

export const getServicesApi = async (params: GetServicesParams = {}) => {
    let response: Response;

    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/services${queryString}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            throw new Error('Unexpected server response format. Expected JSON.');
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to fetch services (Status: ${response.status})`;
        throw new Error(serverMessage);
    }

    return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
};

export const getServiceCategoriesApi = async () => {
    try {
        let response = await fetchWithAuth(`${API_BASE_URL}/service-categories`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 404) {
            response = await fetchWithAuth(`${API_BASE_URL}/categories`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
        }

        if (!response.ok) return [];

        const responseText = await response.text();
        if (!responseText) return [];
        
        const responseData = JSON.parse(responseText);
        return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
    } catch (error) {
        return [];
    }
};

export const getServiceTagsApi = async () => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/service-tags`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            throw new Error('Unexpected server response format. Expected JSON.');
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        throw new Error(responseData?.message || `Failed to fetch tags (Status: ${response.status})`);
    }

    return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
};

export const createServiceTagApi = async (tagName: string) => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/service-tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: tagName, code: tagName.toUpperCase().replace(/\s+/g, '_') }),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        }
    }

    return responseData?.data || responseData;
};

export const updateServiceApi = async (uuid: string, payload: Partial<CreateServicePayload>) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Service ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/services/${uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            throw new Error('Unexpected server response format. Expected JSON.');
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to update service (Status: ${response.status})`;

        if (responseData?.error?.code === 'VALIDATION_ERROR' && responseData?.error?.details?.body?.fieldErrors) {
            const fieldErrors = responseData.error.details.body.fieldErrors;
            const firstErrorField = Object.keys(fieldErrors)[0];
            if (firstErrorField) {
                serverMessage = `Validation Error (${firstErrorField}): ${fieldErrors[firstErrorField][0]}`;
            }
        }
        throw new Error(serverMessage);
    }
    return responseData;
};

export const deleteServiceApi = async (uuid: string) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Service ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/services/${uuid}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' }
        });
    } catch (networkError) {
        throw new Error('Network error: Unable to reach the server.');
    }

    const responseText = await response.text();
    let responseData: any = null;

    if (responseText) {
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to delete service (Status: ${response.status})`;
        throw new Error(serverMessage);
    }
    return responseData;
};