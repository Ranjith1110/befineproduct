import { apiClient } from '../../../services/api';
import { SUPER_ADMIN_API_ENDPOINTS } from '../constants/apiEndpoints';

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

export type ServiceStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface GetServicesParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: ServiceStatus;
    sortBy?: string;
    sortOrder?: string;
}

export const createServiceApi = async (payload: Partial<CreateServicePayload>) => {
    let response: Response;

    try {
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.services.collection, {
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
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.services.withQuery(queryString), {
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
    const response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.serviceCategories.primary, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    const responseData = await response.json();

    if (!response.ok || responseData?.success === false) {
        throw new Error(responseData?.message || `Failed to fetch categories (Status: ${response.status})`);
    }

    return Array.isArray(responseData?.data)
        ? responseData.data.filter((category: any) => typeof category?.uuid === 'string')
        : [];
};

export const getServiceTagsApi = async () => {
    let response: Response;

    try {
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.serviceTags.collection, {
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
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.serviceTags.collection, {
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
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.services.byId(uuid), {
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
        response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.services.byId(uuid), {
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

const updateServiceLifecycle = async (uuid: string, action: 'publish' | 'archive', version?: number) => {
    const endpoint = action === 'publish'
        ? SUPER_ADMIN_API_ENDPOINTS.services.publish(uuid)
        : SUPER_ADMIN_API_ENDPOINTS.services.archive(uuid);
    const response = await apiClient(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(version ? { version } : {}),
    });
    const responseData = await response.json();
    if (!response.ok || responseData?.success === false) {
        throw new Error(responseData?.message || `Failed to ${action} service (Status: ${response.status})`);
    }
    return responseData;
};

export const publishServiceApi = (uuid: string, version?: number) => updateServiceLifecycle(uuid, 'publish', version);
export const archiveServiceApi = (uuid: string, version?: number) => updateServiceLifecycle(uuid, 'archive', version);
