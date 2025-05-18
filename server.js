import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

// Import Routes
import menuRoutes from "./routes/menuRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reservationRoutes from './routes/reservationRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});

// Route middleware
app.use("/api", menuRoutes);
app.use("/api", adminRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use('/api',reservationRoutes);
app.use('/api',contactRoutes)


// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is live",
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
      console.log("Environment:", process.env.NODE_ENV || "development");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
