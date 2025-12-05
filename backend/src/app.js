const express = require("express");
const cors = require("cors");
const symptomRoutes = require("./routes/symptomRoutes");

const app = express();
app.use(express.json());

// Simple CORS: allow single frontend origin (no trailing slash)
const FRONTEND_URL = (process.env.FRONTEND_URL || "").replace(/\/+$/, "");
app.use(cors({ origin: FRONTEND_URL || true }));

// Health endpoint for uptime checks
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Mount routes at /api
app.use("/api", symptomRoutes);

module.exports = app;
