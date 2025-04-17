const { Sequelize } = require("sequelize");

// Initialize Sequelize with environment variables
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // Disable logging for cleaner output
});

// Test the connection
db.authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => console.error("❌ Database connection failed:", error));

module.exports = db;
