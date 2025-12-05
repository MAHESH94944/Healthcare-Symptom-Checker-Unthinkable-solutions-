const express = require("express");
const cors = require("cors");
const symptomRoutes = require("./routes/symptomRoutes");

const app = express();
app.use(express.json());

// Normalize and allow multiple origins via FRONTEND_URLS (comma-separated)
const parseOrigins = (val) =>
  (val || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\/+$/, "")); // strip trailing slashes

const ALLOWLIST = parseOrigins(
  process.env.FRONTEND_URLS || process.env.FRONTEND_URL
);

// Dynamic CORS to echo exact Origin when allowed
const corsOptionsDelegate = (req, callback) => {
  const originHeader = req.header("Origin");
  if (!originHeader) {
    // Non-browser or same-origin requests
    return callback(null, {
      origin: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,
      maxAge: 86400,
    });
  }
  const cleanOrigin = originHeader.replace(/\/+$/, "");
  const isAllowed = ALLOWLIST.length === 0 || ALLOWLIST.includes(cleanOrigin);

  callback(null, {
    origin: isAllowed, // echoes the request Origin when true
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    maxAge: 86400,
  });
};

// Apply CORS and handle preflight
app.use(cors(corsOptionsDelegate));
app.options("*", cors(corsOptionsDelegate));

// Health endpoint for uptime checks
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// Mount routes at /api
app.use("/api", symptomRoutes);

module.exports = app;
