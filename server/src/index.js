require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────
// Dynamic CORS: Vercel generates unique preview URLs per deployment,
// so we allow any *.vercel.app origin plus the production CLIENT_URL.
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (e.g., curl, Postman)
            if (!origin) return callback(null, true);
            // Allow any Vercel preview/production URL
            if (origin.endsWith(".vercel.app")) return callback(null, true);
            // Allow explicitly listed origins
            if (allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error("Not allowed by CORS"));
        },
    })
);
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Error Handler (must be after routes) ───────────────────────────────
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────────
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();
