import { apiClient } from '../../../services/api';
import { SUPER_ADMIN_API_ENDPOINTS } from '../constants/apiEndpoints';

export interface ProviderContact {
    spocName: string;
    designation?: string;
    email: string;
    phone: string;
}

export interface ProviderBranch {
    name?: string;
    addressLine1: string;
    city: string;
    state: string;
    country?: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
}

export interface ProviderService {
    name: string;
    categoryUuid: string;
    description?: string;
}

export interface ProviderServiceCategory {
    uuid: string;
    name: string;
    description?: string;
    isActive?: boolean;
}

export interface CreateProviderPayload {
    companyName: string;
    displayName?: string;
    registrationNumber?: string;
    gstNumber?: string;
    licenseNumber?: string;
    website?: string;
    primaryEmail: string;
    primaryPhone: string;
    contact: ProviderContact;
    branch: ProviderBranch;
    services: ProviderService[];
}

export interface ProviderRecord {
    id?: string | number;
    uuid?: string;
    companyName?: string;
    displayName?: string;
    primaryEmail?: string;
    status?: string;
    services?: Array<ProviderService | string>;
    caregiversCount?: number;
    caretakersCount?: number;
    upcomingAppointments?: number;
}

interface ApiEnvelope<T> {
    success?: boolean;
    message?: string;
    data?: T | { content?: T; items?: T; providers?: T; results?: T };
    error?: { code?: string };
}

const readApiResponse = async <T>(response: Response): Promise<ApiEnvelope<T>> => {
    const responseText = await response.text();
    let responseData: ApiEnvelope<T> = {};

    if (responseText) {
        try {
            responseData = JSON.parse(responseText) as ApiEnvelope<T>;
        } catch {
            throw new Error(response.ok
                ? 'Unexpected server response format. Expected JSON.'
                : `Server Error: ${response.status}`);
        }
    }

    if (!response.ok || responseData.success === false) {
        throw new Error(
            responseData.message || responseData.error?.code || `Provider request failed (Status: ${response.status})`,
        );
    }

    return responseData;
};

export const getProvidersApi = async (): Promise<ProviderRecord[]> => {
    const response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.providers.collection, {
        method: 'GET',
    });
    const responseData = await readApiResponse<ProviderRecord[]>(response);
    const data = responseData.data;

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.providers)) return data.providers;
    return [];
};

const isProviderServiceCategory = (value: unknown): value is ProviderServiceCategory => {
    if (!value || typeof value !== 'object') return false;
    const category = value as Record<string, unknown>;
    return typeof category.uuid === 'string' && typeof category.name === 'string';
};

export const getProviderServiceCategories = async (): Promise<ProviderServiceCategory[]> => {
    const response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.providerServiceCategories.list, {
        method: 'GET',
    });
    const responseData = await readApiResponse<ProviderServiceCategory[]>(response);
    const data = responseData.data;
    let categories: unknown[] = [];

    if (Array.isArray(data)) categories = data;
    else if (data && Array.isArray(data.items)) categories = data.items;
    else if (data && Array.isArray(data.content)) categories = data.content;
    else if (data && Array.isArray(data.results)) categories = data.results;

    return categories.filter(isProviderServiceCategory);
};

export const createProvider = async (payload: CreateProviderPayload): Promise<ProviderRecord | undefined> => {
    const response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.providers.collection, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const responseData = await readApiResponse<ProviderRecord>(response);
    return responseData.data && !Array.isArray(responseData.data) && !('content' in responseData.data)
        ? responseData.data as ProviderRecord
        : undefined;
};
