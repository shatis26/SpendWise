const mongoose = require("mongoose");
const { CATEGORIES } = require("../utils/constants");

/**
 * Expense Schema
 *
 * Design decisions:
 * - `amount` is stored in cents (integer) to avoid floating-point rounding
 *   issues. The frontend converts dollars → cents before sending and
 *   cents → dollars when displaying.
 * - `idempotencyKey` is a client-generated UUID sent with each POST request.
 *   The unique sparse index ensures that retries or duplicate submissions
 *   with the same key are safely rejected (or return the existing document).
 *   "sparse" allows documents without a key (e.g., seeded data) to coexist.
 * - `category` is restricted to a predefined enum to keep data consistent.
 */
const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be at least 1 cent"],
            validate: {
                validator: Number.isInteger,
                message: "Amount must be an integer (cents)",
            },
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: CATEGORIES,
                message: "Invalid category: {VALUE}",
            },
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [200, "Description cannot exceed 200 characters"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        idempotencyKey: {
            type: String,
            index: { unique: true, sparse: true },
        },
    },
    {
        // Automatically adds `createdAt` and `updatedAt` fields
        timestamps: true,
    }
);

module.exports = mongoose.model("Expense", expenseSchema);
