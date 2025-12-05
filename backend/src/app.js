const express = require("express");
const cors = require("cors");
const symptomRoutes = require("./routes/symptomRoutes");

const app = express();
app.use(express.json());

// Configure CORS with env origin (Render will set your frontend URL)
const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);

// Health endpoint for uptime checks
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Mount routes at /api
app.use("/api", symptomRoutes);

module.exports = app;
