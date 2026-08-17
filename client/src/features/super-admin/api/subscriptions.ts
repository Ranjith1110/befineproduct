import { apiClient } from '../../../services/api';
import { SUPER_ADMIN_API_ENDPOINTS } from '../constants/apiEndpoints';

export type SubscriptionPlanStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type SortOrder = 'asc' | 'desc';
export type SubscriptionVisibility = 'PUBLIC';

export interface SubscriptionPlanService {
    serviceUuid: string;
    serviceName?: string;
    name?: string;
    includedQuantity?: number;
    includedVisits?: number;
    includedSessions?: number;
    validityDays?: number;
    displayOrder?: number;
    service?: { uuid?: string; title?: string; name?: string };
}

export interface SubscriptionPlan {
    uuid: string;
    planCode: string;
    name: string;
    description?: string;
    billingCycle: string;
    durationMonths: number;
    price: number | null;
    currency?: string;
    isFeatured?: boolean;
    isPopular?: boolean;
    displayOrder?: number;
    visibility?: SubscriptionVisibility;
    status: SubscriptionPlanStatus;
    services: SubscriptionPlanService[];
    activeSubscribers?: number;
    subscriberCount?: number;
    subscriptionsCount?: number;
    version?: number;
}

export interface SubscriptionPlanServicePayload {
    serviceUuid: string;
    includedQuantity: number;
    includedVisits: number;
    includedSessions: number;
    validityDays?: number;
    displayOrder?: number;
}

export interface CreateSubscriptionPlanPayload {
    planCode: string;
    name: string;
    description?: string;
    billingCycle: string;
    durationMonths: number;
    price: number;
    currency: string;
    isFeatured: boolean;
    isPopular: boolean;
    displayOrder: number;
    visibility: SubscriptionVisibility;
    services: SubscriptionPlanServicePayload[];
}

export type UpdateSubscriptionPlanPayload = Partial<CreateSubscriptionPlanPayload>;

export interface GetSubscriptionPlansParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: SubscriptionPlanStatus;
    sortBy?: 'createdAt' | 'title' | 'effectivePrice' | 'displayOrder';
    sortOrder?: SortOrder;
}

export interface SubscriptionPlanPage {
    items: SubscriptionPlan[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CreatePlanPricePayload {
    marketUuid: string;
    billingCycleCode: string;
    currencyCode: string;
    basePrice: number;
    effectiveFrom: string;
    discountType?: 'NONE' | 'PERCENTAGE' | 'FIXED';
    discountValue?: number;
    trialDays?: number;
    gracePeriodDays?: number;
    autoRenew?: boolean;
    effectiveTo?: string | null;
}

interface ApiEnvelope {
    success?: boolean;
    message?: string;
    data?: unknown;
    meta?: unknown;
    error?: { code?: string; details?: unknown };
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const numberValue = (value: unknown, fallback: number): number => typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const readResponse = async (response: Response, fallbackMessage: string): Promise<ApiEnvelope> => {
    const text = await response.text();
    let body: ApiEnvelope = {};
    if (text) {
        try {
            body = JSON.parse(text) as ApiEnvelope;
        } catch {
            throw new Error(response.ok ? 'Unexpected server response format.' : `${fallbackMessage} (Status: ${response.status})`);
        }
    }
    if (!response.ok || body.success === false) {
        throw new Error(body.message || body.error?.code || `${fallbackMessage} (Status: ${response.status})`);
    }
    return body;
};

const request = async (url: string, options: RequestInit, fallbackMessage: string): Promise<ApiEnvelope> => {
    try {
        return await readResponse(await apiClient(url, options), fallbackMessage);
    } catch (error) {
        if (error instanceof TypeError) throw new Error('Network error: Unable to reach the server.', { cause: error });
        throw error;
    }
};

const getArray = (data: unknown): unknown[] => {
    if (Array.isArray(data)) return data;
    if (!isRecord(data)) return [];
    for (const key of ['items', 'content', 'results']) {
        if (Array.isArray(data[key])) return data[key];
    }
    return [];
};

export const getSubscriptionPlansApi = async (params: GetSubscriptionPlansParams = {}): Promise<SubscriptionPlanPage> => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.limit !== undefined) query.set('limit', String(params.limit));
    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);
    if (params.sortBy) query.set('sortBy', params.sortBy);
    if (params.sortOrder) query.set('sortOrder', params.sortOrder);
    const queryString = query.size ? `?${query.toString()}` : '';
    const body = await request(SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.withQuery(queryString), { method: 'GET', headers: { Accept: 'application/json' } }, 'Failed to fetch subscription plans');
    const dataRecord = isRecord(body.data) ? body.data : {};
    const metaRecord = isRecord(body.meta) ? body.meta : {};
    const pagination = isRecord(dataRecord.pagination) ? dataRecord.pagination : metaRecord;
    const items = getArray(body.data).filter(isRecord) as unknown as SubscriptionPlan[];
    const page = numberValue(dataRecord.page ?? pagination.page, params.page ?? 1);
    const limit = numberValue(dataRecord.limit ?? pagination.limit, params.limit ?? 12);
    const total = numberValue(dataRecord.total ?? pagination.total, items.length);
    return { items, page, limit, total, totalPages: numberValue(dataRecord.totalPages ?? pagination.totalPages, Math.max(1, Math.ceil(total / limit))) };
};

export const getSubscriptionPlanApi = async (uuid: string): Promise<SubscriptionPlan> => {
    const body = await request(SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.byId(uuid), { method: 'GET', headers: { Accept: 'application/json' } }, 'Failed to fetch subscription plan');
    if (!isRecord(body.data)) throw new Error('Subscription plan response is missing data.');
    return body.data as unknown as SubscriptionPlan;
};

export const createSubscriptionPlanApi = async (payload: CreateSubscriptionPlanPayload): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.collection,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    'Failed to create subscription plan',
);

export const updateSubscriptionPlanApi = async (uuid: string, payload: UpdateSubscriptionPlanPayload): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.byId(uuid),
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    'Failed to update subscription plan',
);

export const deleteSubscriptionPlanApi = async (uuid: string): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.byId(uuid), { method: 'DELETE' }, 'Failed to delete subscription plan',
);

export const publishSubscriptionPlanApi = async (uuid: string, version?: number): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.publish(uuid),
    { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(version ? { version } : {}) },
    'Failed to publish subscription plan',
);

export const archiveSubscriptionPlanApi = async (uuid: string, version?: number): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.archive(uuid),
    { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(version ? { version } : {}) },
    'Failed to archive subscription plan',
);

export const createSubscriptionPriceApi = async (uuid: string, payload: CreatePlanPricePayload): Promise<ApiEnvelope> => request(
    SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.prices(uuid),
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    'Failed to create subscription price',
);

export const getSubscriptionPriceHistoryApi = async (uuid: string): Promise<unknown[]> => {
    const body = await request(SUPER_ADMIN_API_ENDPOINTS.subscriptionPlans.priceHistory(uuid), { method: 'GET' }, 'Failed to fetch price history');
    return getArray(body.data);
};
