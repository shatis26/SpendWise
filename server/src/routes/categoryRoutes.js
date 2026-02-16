const express = require("express");
const { getCategories } = require("../controllers/categoryController");

const router = express.Router();

/**
 * GET /api/categories – Returns all valid expense categories
 */
router.get("/", getCategories);

module.exports = router;
