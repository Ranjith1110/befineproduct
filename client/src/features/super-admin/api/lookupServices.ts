import { apiClient } from '../../../services/api';
import { SUPER_ADMIN_API_ENDPOINTS } from '../constants/apiEndpoints';

export interface ServiceLookup {
    uuid: string;
    code?: string;
    name: string;
    categoryUuid?: string;
    subCategoryUuid?: string | null;
}

interface LookupServicesEnvelope {
    success?: boolean;
    message?: string;
    data?: unknown;
}

const isServiceLookup = (value: unknown): value is ServiceLookup => {
    if (typeof value !== 'object' || value === null) return false;
    const item = value as Record<string, unknown>;
    return typeof item.uuid === 'string' && typeof item.name === 'string';
};

export const getLookupServicesApi = async (): Promise<ServiceLookup[]> => {
    const query = new URLSearchParams({ page: '1', limit: '100' });
    const response = await apiClient(SUPER_ADMIN_API_ENDPOINTS.lookupServices.withQuery(`?${query.toString()}`), {
        method: 'GET',
        headers: { Accept: 'application/json' },
    });
    const body = await response.json() as LookupServicesEnvelope;
    if (!response.ok || body.success === false) {
        throw new Error(body.message || `Unable to load services (Status: ${response.status}).`);
    }
    return Array.isArray(body.data) ? body.data.filter(isServiceLookup) : [];
};
