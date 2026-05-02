import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import equipmentRoutes from "./routes/equipment";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? "3001";

// Middleware
// Only allow requests form the react frontend origin
app.use(cors({ origin: "http://localhost:5173" }));

// Parse incoming JSON request bodies
app.use(express.json());

// Routes
app.use("/equipment", equipmentRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
  });
});
