const express = require("express");
const cors = require("cors");
const symptomRoutes = require("./routes/symptomRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Mount routes at /api
app.use("/api", symptomRoutes);

module.exports = app;
