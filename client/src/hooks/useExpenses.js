import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

/**
 * Custom hook encapsulating all expense-related state and operations.
 *
 * Keeps component logic clean by centralizing:
 * - Fetch with filters/sorting
 * - Create with loading/error tracking
 * - Category list management
 */
export function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Current filter/sort state
    const [filters, setFilters] = useState({
        category: "",
        sort: "date_desc",
    });

    /**
     * Fetch expenses from the API using current filters.
     * Wrapped in useCallback so it can be safely used in useEffect deps.
     */
    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.sort) params.sort = filters.sort;

            const result = await api.getExpenses(params);
            setExpenses(result.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    /**
     * Fetch the list of categories once on mount.
     */
    const fetchCategories = useCallback(async () => {
        try {
            const result = await api.getCategories();
            setCategories(result.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }, []);

    // Re-fetch expenses whenever filters change
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    /**
     * Submit a new expense.
     * @param {Object} data - Expense data (amount in dollars — converted to cents here)
     * @returns {boolean} true if successful
     */
    const addExpense = async (data) => {
        setSubmitting(true);
        setError(null);
        try {
            await api.createExpense({
                ...data,
                // Convert dollars to cents for safe money handling
                amount: Math.round(data.amount * 100),
            });
            // Re-fetch to show the new expense in the correct sort order
            await fetchExpenses();
            return true;
        } catch (err) {
            const apiError = err.response?.data;
            if (apiError?.errors) {
                // Validation errors from express-validator
                setError(apiError.errors.map((e) => e.msg || e).join(", "));
            } else {
                setError(apiError?.message || "Failed to create expense");
            }
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Update filter/sort state. Triggers a re-fetch via the useEffect above.
     */
    const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    /**
     * Compute the total amount (in dollars) of currently visible expenses.
     */
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0) / 100;

    return {
        expenses,
        categories,
        loading,
        submitting,
        error,
        filters,
        totalAmount,
        addExpense,
        updateFilters,
        clearError: () => setError(null),
    };
}
