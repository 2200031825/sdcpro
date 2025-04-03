require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false, // Optional: Disable logging
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected to Railway"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;