const { CATEGORIES } = require("../utils/constants");

/**
 * GET /api/categories
 * Returns the list of valid expense categories.
 * The frontend uses this to populate dropdowns, ensuring it always
 * stays in sync with the backend validation rules.
 */
const getCategories = (req, res) => {
    return res.status(200).json({ success: true, data: CATEGORIES });
};

module.exports = { getCategories };
