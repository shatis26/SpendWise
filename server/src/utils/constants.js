/**
 * Shared constants used across the backend.
 * Keeping categories in one place ensures the model, validation,
 * and frontend all reference the same set.
 */

const CATEGORIES = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Health",
    "Education",
    "Other",
];

const SORT_OPTIONS = {
    DATE_DESC: "date_desc",
    DATE_ASC: "date_asc",
};

module.exports = { CATEGORIES, SORT_OPTIONS };
