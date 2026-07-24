// Placeholder for future Spring Boot API integration
export const schemeService = {
    getSchemes: async () => {
        console.log(`[schemeService] Fetching all schemes`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return [];
    },

    getSchemeById: async (id) => {
        console.log(`[schemeService] Fetching scheme ${id}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return null;
    }
};
