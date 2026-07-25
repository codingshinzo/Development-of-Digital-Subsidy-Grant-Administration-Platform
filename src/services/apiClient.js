const BASE_URL = 'http://localhost:8080/api/v1';

export const apiClient = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const config = {
            ...options,
            headers,
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            let errorMessage = 'An error occurred on the server';
            try {
                const data = await response.json();
                errorMessage = data.message || data.error || errorMessage;
            } catch (e) {
                const text = await response.text();
                if (text) errorMessage = text;
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    }
};
