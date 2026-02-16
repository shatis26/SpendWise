const Expense = require("../models/Expense");
const { SORT_OPTIONS } = require("../utils/constants");

/**
 * Service layer: contains business logic separated from HTTP concerns.
 * Controllers call these functions and handle request/response formatting.
 */

/**
 * Create a new expense, with idempotency protection.
 *
 * If an expense with the same `idempotencyKey` already exists, we return
 * the existing document instead of creating a duplicate. This makes the
 * endpoint safe against network retries and double-clicks.
 *
 * @param {Object} data - Expense fields (amount, category, description, date, idempotencyKey)
 * @returns {{ expense: Object, alreadyExisted: boolean }}
 */
const createExpense = async (data) => {
    const { amount, category, description, date, idempotencyKey } = data;

    // Check for an existing expense with the same idempotency key
    if (idempotencyKey) {
        const existing = await Expense.findOne({ idempotencyKey });
        if (existing) {
            return { expense: existing, alreadyExisted: true };
        }
    }

    const expense = await Expense.create({
        amount,
        category,
        description,
        date,
        idempotencyKey,
    });

    return { expense, alreadyExisted: false };
};

/**
 * Retrieve expenses with optional filtering and sorting.
 *
 * @param {Object} query - Query parameters
 * @param {string} [query.category] - Filter by category
 * @param {string} [query.sort] - Sort option ("date_desc" or "date_asc")
 * @returns {Object[]} Array of expense documents
 */
const getExpenses = async (query = {}) => {
    const { category, sort } = query;

    // Build the Mongoose filter object dynamically
    const filter = {};
    if (category) {
        filter.category = category;
    }

    // Default sort: newest first
    let sortOption = { date: -1 };
    if (sort === SORT_OPTIONS.DATE_ASC) {
        sortOption = { date: 1 };
    }

    const expenses = await Expense.find(filter).sort(sortOption).lean();
    return expenses;
};

module.exports = { createExpense, getExpenses };
