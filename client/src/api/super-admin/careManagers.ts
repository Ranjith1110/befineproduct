import { fetchWithAuth } from '../auth';

export interface CreateCareManagerPayload {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string; // <-- FIXED: Matched to backend requirement
    password?: string;
    isActive: boolean;
    providerUuid?: string;
    version?: number;
    // Fallbacks for variable backend schemas
    mobileNumber?: string;
    phone?: string;
    name?: string;
    status?: string;
}

const API_BASE_URL = '/api/v1';

export const createCareManagerApi = async (payload: Partial<CreateCareManagerPayload>) => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/care-managers`, {
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
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to onboard Care Manager (Status: ${response.status})`;

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

export const getCareManagersApi = async () => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/care-managers`, {
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
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to fetch Care Managers (Status: ${response.status})`;
        throw new Error(serverMessage);
    }

    return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
};

export const updateCareManagerApi = async (uuid: string, payload: Partial<CreateCareManagerPayload>) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Care Manager ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/care-managers/${uuid}`, {
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
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to update Care Manager (Status: ${response.status})`;

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

export const deleteCareManagerApi = async (uuid: string) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Care Manager ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/care-managers/${uuid}`, {
            method: 'DELETE',
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
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to delete Care Manager (Status: ${response.status})`;
        throw new Error(serverMessage);
    }
    return responseData;
};

// Helper to fetch providers for the dropdown assignment
export const getServiceProvidersApi = async () => {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/service-providers?limit=500`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) return [];
        
        const responseText = await response.text();
        if (!responseText) return [];
        
        const responseData = JSON.parse(responseText);
        return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
    } catch (error) {
        console.warn("Could not fetch service providers for dropdown", error);
        return [];
    }
};