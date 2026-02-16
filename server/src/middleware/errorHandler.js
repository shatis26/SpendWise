/**
 * Central error-handling middleware.
 *
 * Express identifies error-handling middleware by the four-parameter signature.
 * All unhandled errors from route handlers bubble up here for a consistent
 * JSON error response.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error("❌ Server error:", err.message);

    // Handle Mongoose duplicate key error (e.g., duplicate idempotencyKey race condition)
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate entry detected. This request was already processed.",
        });
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, errors: messages });
    }

    // Generic server error
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
