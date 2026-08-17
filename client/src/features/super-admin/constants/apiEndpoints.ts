import { API_CONFIG } from '../../../config/api.config';

const API_BASE_URL = API_CONFIG.baseURL;

export const SUPER_ADMIN_API_ENDPOINTS = {
    clients: {
        collection: `${API_BASE_URL}/clients`,
        byId: (uuid: string) => `${API_BASE_URL}/clients/${uuid}`,
    },
    careManagers: {
        collection: `${API_BASE_URL}/care-managers`,
        byId: (uuid: string) => `${API_BASE_URL}/care-managers/${uuid}`,
    },
    serviceProviders: {
        listWithLimit500: `${API_BASE_URL}/service-providers?limit=500`,
    },
    providers: {
        collection: `${API_BASE_URL}/providers`,
    },
    providerServiceCategories: {
        list: `${API_BASE_URL}/provider-service-categories?page=1&limit=100`,
    },
    services: {
        collection: `${API_BASE_URL}/services`,
        withQuery: (queryString: string) => `${API_BASE_URL}/services${queryString}`,
        byId: (uuid: string) => `${API_BASE_URL}/services/${uuid}`,
        publish: (uuid: string) => `${API_BASE_URL}/services/${uuid}/publish`,
        archive: (uuid: string) => `${API_BASE_URL}/services/${uuid}/archive`,
    },
    lookupServices: {
        withQuery: (queryString: string) => `${API_BASE_URL}/lookups/services${queryString}`,
    },
    serviceCategories: {
        primary: `${API_BASE_URL}/service-categories`,
    },
    serviceTags: {
        collection: `${API_BASE_URL}/service-tags`,
    },
    subscriptionPlans: {
        collection: `${API_BASE_URL}/subscription-plans`,
        withQuery: (queryString: string) => `${API_BASE_URL}/subscription-plans${queryString}`,
        byId: (uuid: string) => `${API_BASE_URL}/subscription-plans/${uuid}`,
        publish: (uuid: string) => `${API_BASE_URL}/subscription-plans/${uuid}/publish`,
        archive: (uuid: string) => `${API_BASE_URL}/subscription-plans/${uuid}/archive`,
        prices: (uuid: string) => `${API_BASE_URL}/subscription-plans/${uuid}/prices`,
        priceHistory: (uuid: string) => `${API_BASE_URL}/subscription-plans/${uuid}/price-history`,
    },
} as const;
