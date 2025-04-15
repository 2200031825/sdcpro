require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const swaggerDocs = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const userRoutes = require("./routes/userRoutes");
const Project = require('./models/projectModel');
const Projects= require('./routes/projectRoutes');
app.use("/users", userRoutes);
app.use("/projects", Projects);


// Initialize Swagger Docs
swaggerDocs(app);

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('✅ Connected to database');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running on Railway!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
