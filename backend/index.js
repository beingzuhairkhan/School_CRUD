import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { testConnection } from './config/database.js'
import School from './models/school.model.js'
import schoolRoutes from './routes/school.route.js'

dotenv.config();

const app = express();
const PORT =process.env.PORT ||  5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/public", express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/api/schools", schoolRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await testConnection();
    await School.createTable();

    app.listen(PORT, () => {
      console.log(` Server running on port `);
      console.log(` Health check: http://localhost:${PORT}/api/health`);
      console.log(` Schools API: http://localhost:${PORT}/api/schools`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
