const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Project = sequelize.define("Project", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "open",
  },
  amount: {
    type: DataTypes.FLOAT, // or DECIMAL(10, 2) for currency
    allowNull: false,
    defaultValue: 0.0, // Optional: sets default amount
  },
}, { timestamps: false });

module.exports = Project;
