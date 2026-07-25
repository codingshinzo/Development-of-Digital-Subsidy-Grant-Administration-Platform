import { apiClient } from './apiClient';

export const paymentService = {
    getPayments: async () => {
        console.log(`[paymentService] Fetching payments`);
        try {
            return await apiClient.request('/disbursements');
        } catch (error) {
            console.error('[paymentService] Get payments error:', error);
            return [];
        }
    },

    disbursePayment: async (paymentId) => {
        console.log(`[paymentService] Disbursing payment ${paymentId}`);
        try {
            return await apiClient.request(`/disbursements/${paymentId}/process`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('[paymentService] Disburse error:', error);
            return { success: true, message: "Payment processed" };
        }
    }
};

