const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set. Skipping DB connection.");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

module.exports = connectToDB;
