// Placeholder for future Spring Boot API integration
export const authService = {
    login: async (email, password, role) => {
        console.log(`[authService] Logging in ${role} with email ${email}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, token: 'dummy-jwt-token' };
    },

    register: async (userData) => {
        console.log(`[authService] Registering user:`, userData);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    }
};
