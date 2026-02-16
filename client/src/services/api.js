import axios from "axios";

/**
 * Axios instance pre-configured with the backend API base URL.
 * All API calls go through this instance for consistent config.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" },
});

/**
 * Create a new expense.
 * @param {Object} data - { amount, category, description, date, idempotencyKey }
 * @returns {Promise<Object>} Created expense
 */
export const createExpense = async (data) => {
    const response = await api.post("/expenses", data);
    return response.data;
};

/**
 * Fetch expenses with optional filters and sorting.
 * @param {Object} params - { category?, sort? }
 * @returns {Promise<Object[]>} Array of expenses
 */
export const getExpenses = async (params = {}) => {
    const response = await api.get("/expenses", { params });
    return response.data;
};

/**
 * Fetch the list of valid categories from the backend.
 * @returns {Promise<string[]>}
 */
export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};

export default api;
