import { apiClient } from './apiClient';

export const schemeService = {
    getSchemes: async () => {
        console.log(`[schemeService] Fetching all schemes from backend`);
        try {
            return await apiClient.request('/schemes');
        } catch (error) {
            console.error('[schemeService] Fetch error:', error);
            return [
                { id: 1, name: "Pradhan Mantri Awas Yojana", category: "Housing", description: "Housing subsidy scheme for low & middle income families", budget: 250000.0, maxAmount: 250000.0, active: true },
                { id: 2, name: "PM-KISAN Samman Nidhi", category: "Agriculture", description: "Direct income support of ₹6,000 per year for small farmers", budget: 6000.0, maxAmount: 6000.0, active: true },
                { id: 3, name: "National Higher Education Scholarship", category: "Education", description: "Financial aid for undergraduate & postgraduate students", budget: 50000.0, maxAmount: 50000.0, active: true }
            ];
        }
    },

    getSchemeById: async (id) => {
        console.log(`[schemeService] Fetching scheme ${id}`);
        try {
            return await apiClient.request(`/schemes/${id}`);
        } catch (error) {
            console.error(`[schemeService] Fetch scheme ${id} error:`, error);
            return null;
        }
    },

    createScheme: async (schemeData) => {
        return await apiClient.request('/schemes', {
            method: 'POST',
            body: JSON.stringify(schemeData),
        });
    }
};

