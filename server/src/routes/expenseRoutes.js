const express = require("express");
const {
    createExpense,
    createExpenseValidation,
    getExpenses,
} = require("../controllers/expenseController");

const router = express.Router();

/**
 * POST /api/expenses – Create a new expense
 * GET  /api/expenses – List expenses (with optional filters)
 */
router.post("/", createExpenseValidation, createExpense);
router.get("/", getExpenses);

module.exports = router;
