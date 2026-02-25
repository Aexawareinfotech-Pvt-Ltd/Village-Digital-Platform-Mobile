const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware: Allows your mobile app to communicate with this server
app.use(cors());
app.use(express.json());

// Database Connection: Connect to your existing Village Web App database
// Replace the URI with your actual MongoDB string in the .env file
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/village_db";

mongoose
  .connect(MONGO_URI)
  .then(() =>
    console.log("✅ Database Connected: Mobile and Web are now synced!"),
  )
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/api/status", (req, res) => {
  res.json({ status: "Online", message: "Village Backend is ready." });
});

// Start Server on 0.0.0.0 so your phone can find it on your local network
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
