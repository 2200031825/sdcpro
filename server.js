    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const mysql = require('mysql2');

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(bodyParser.json());

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
            console.log('Connected to database');
        }
    });

    // Root route to check if server is running
    app.get('/', (req, res) => {
        res.send('Backend is running on Railway!');
    });

    // Example API route
    app.get('/db-test', (req, res) => {
        db.query('SELECT 1', (err, results) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Database connection failed' });
            }
            res.json({ status: 'success', message: 'Database connected successfully', results });
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
