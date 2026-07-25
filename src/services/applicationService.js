import { apiClient } from './apiClient';

export const applicationService = {
    applyForScheme: async (applicationData) => {
        console.log(`[applicationService] Applying for scheme:`, applicationData);
        try {
            const result = await apiClient.request('/applications', {
                method: 'POST',
                body: JSON.stringify(applicationData),
            });
            return { success: true, ...result };
        } catch (error) {
            console.error('[applicationService] Application error:', error);
            return { success: false, error: error.message };
        }
    },

    getApplications: async () => {
        console.log(`[applicationService] Fetching applications from backend`);
        try {
            return await apiClient.request('/applications');
        } catch (error) {
            console.error('[applicationService] Get applications error:', error);
            return [];
        }
    },

    getApplicationById: async (id) => {
        try {
            return await apiClient.request(`/applications/${id}`);
        } catch (error) {
            console.error(`[applicationService] Get application ${id} error:`, error);
            return null;
        }
    },

    updateStatus: async (id, status, remarks = '') => {
        try {
            return await apiClient.request(`/applications/${id}/status?status=${status}`, {
                method: 'PUT',
                body: JSON.stringify({ status, remarks }),
            });
        } catch (error) {
            console.error(`[applicationService] Update status error:`, error);
            return { success: false, error: error.message };
        }
    }
};

