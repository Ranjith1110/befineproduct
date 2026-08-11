import { fetchWithAuth } from '../auth';

export interface CreateSubscriptionPayload {
    name: string;
    planCode: string;
    description: string;
    price: number;
    billingCycle: string;
    currency: string;
    isActive: boolean;
    allocatedServices: { serviceUuid: string; quantity: number }[];
    version?: number;
    // Fallback mappings to ensure strict APIs are satisfied
    title?: string;
    code?: string;
    shortDescription?: string;
    basePrice?: number;
    services?: { serviceUuid: string; quantity: number }[];
}

const API_BASE_URL = '/api/v1';

export const createSubscriptionPlanApi = async (payload: Partial<CreateSubscriptionPayload>) => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/subscription-plans`, {
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
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to create subscription plan (Status: ${response.status})`;

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

export const getSubscriptionPlansApi = async () => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/subscription-plans`, {
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
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to fetch plans (Status: ${response.status})`;
        throw new Error(serverMessage);
    }

    return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
};

export const updateSubscriptionPlanApi = async (uuid: string, payload: Partial<CreateSubscriptionPayload>) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Plan ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/subscription-plans/${uuid}`, {
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
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to update plan (Status: ${response.status})`;

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

export const deleteSubscriptionPlanApi = async (uuid: string) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Plan ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/subscription-plans/${uuid}`, {
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
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to delete plan (Status: ${response.status})`;
        throw new Error(serverMessage);
    }
    return responseData;
};