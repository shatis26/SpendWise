const { validationResult, body } = require("express-validator");
const expenseService = require("../services/expenseService");
const { CATEGORIES } = require("../utils/constants");

/**
 * Validation rules for POST /expenses.
 * Exported separately so they can be attached as middleware in routes.
 */
const createExpenseValidation = [
    body("amount")
        .isInt({ min: 1 })
        .withMessage("Amount must be a positive integer (cents)"),
    body("category")
        .isIn(CATEGORIES)
        .withMessage(`Category must be one of: ${CATEGORIES.join(", ")}`),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 200 })
        .withMessage("Description cannot exceed 200 characters"),
    body("date")
        .isISO8601()
        .withMessage("Date must be a valid ISO 8601 date string"),
    body("idempotencyKey")
        .optional()
        .isString()
        .withMessage("Idempotency key must be a string"),
];

/**
 * POST /expenses
 * Creates a new expense. Returns 201 on creation, 200 if the idempotency key
 * matches an existing record (safe duplicate).
 */
const createExpense = async (req, res, next) => {
    try {
        // Return validation errors as a structured response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { expense, alreadyExisted } = await expenseService.createExpense(
            req.body
        );

        const statusCode = alreadyExisted ? 200 : 201;
        return res.status(statusCode).json({ success: true, data: expense });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /expenses
 * Returns a list of expenses. Supports ?category= and ?sort= query params.
 */
const getExpenses = async (req, res, next) => {
    try {
        const expenses = await expenseService.getExpenses(req.query);
        return res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        next(error);
    }
};

module.exports = { createExpense, createExpenseValidation, getExpenses };
