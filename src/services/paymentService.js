// Placeholder for future Spring Boot API integration
export const paymentService = {
    getPayments: async () => {
        console.log(`[paymentService] Fetching payments`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return [];
    },

    disbursePayment: async (paymentId) => {
        console.log(`[paymentService] Disbursing payment ${paymentId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    }
};
