require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import Sequelize database instance

// Import Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running on Railway!");
});

// Database connection test route
app.get("/db-test", async (req, res) => {
  try {
    await db.authenticate();
    res.json({ status: "success", message: "Database connected successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Database connection failed", error: error.message });
  }
});

// Server Listener
app.listen(PORT, async () => {
  try {
    await db.sync(); // Sync models with database
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Database sync error:", error);
  }
  console.log(`Server running on port ${PORT}`);
});
