import { fetchWithAuth } from '../auth';

export interface CreateClientPayload {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    address: string;
    pincode: string;
    dependentName?: string;
    dependentPhone?: string;
    dependentEmail?: string;
    serviceProvider?: string;
    careGiver?: string;
    version?: number; // Added to satisfy backend update validation
}

const API_BASE_URL = '/api/v1';

export const createClientApi = async (payload: Partial<CreateClientPayload>) => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/clients`, {
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
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            throw new Error('Unexpected server response format. Expected JSON.');
        }
    }

    if (!response.ok || (responseData && responseData.success === false)) {
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to create client (Status: ${response.status})`;

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

export const getClientsApi = async () => {
    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/clients`, {
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
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to fetch clients (Status: ${response.status})`;
        throw new Error(serverMessage);
    }

    return Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.content || responseData?.data?.items || []);
};

export const updateClientApi = async (uuid: string, payload: Partial<CreateClientPayload>) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Client ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/clients/${uuid}`, {
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
        let serverMessage = responseData?.message || responseData?.error?.code || `Failed to update client (Status: ${response.status})`;
        
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

export const deleteClientApi = async (uuid: string) => {
    if (!uuid || uuid === 'undefined') throw new Error("Invalid Client ID.");

    let response: Response;

    try {
        response = await fetchWithAuth(`${API_BASE_URL}/clients/${uuid}`, {
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
        const serverMessage = responseData?.message || responseData?.error?.code || `Failed to delete client (Status: ${response.status})`;
        throw new Error(serverMessage);
    }

    return responseData;
};