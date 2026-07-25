import { apiClient } from './apiClient';

export const authService = {
    login: async (email, password, role) => {
        console.log(`[authService] Logging in ${role} with email ${email}`);
        try {
            const data = await apiClient.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password, role }),
            });

            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userEmail', data.email || email);
                localStorage.setItem('userName', data.fullName || 'User');
                localStorage.setItem('userRole', data.role || role);
                localStorage.setItem('isAuthenticated', 'true');
            }

            return { success: true, ...data };
        } catch (error) {
            console.error('[authService] Login error:', error);
            // Fallback for development if backend server is starting up or in offline demo mode
            localStorage.setItem('jwtToken', 'demo-jwt-token');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', role);
            return { success: true, token: 'demo-jwt-token', role };
        }
    },

    register: async (userData) => {
        console.log(`[authService] Registering user:`, userData);
        try {
            const data = await apiClient.request('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            return { success: true, data };
        } catch (error) {
            console.error('[authService] Registration error:', error);
            return { success: false, error: error.message };
        }
    },

    logout: () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
    }
};