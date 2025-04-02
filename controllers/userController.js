const pool = require("../db");

// Get all users
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, name, email, password, confirmPassword, age FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, name, email, password, confirmPassword, age FROM users WHERE id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create user
const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, age } = req.body;

    // Ensure passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, confirmPassword, age) VALUES (?, ?, ?, ?, ?)",
            [name, email, password, confirmPassword, age]
        );
        res.json({ id: result.insertId, name, email, age });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    const { name, email, password, confirmPassword, age } = req.body;
    const userId = req.params.id;

    try {
        // Fetch existing user to retain old password if not provided
        const [existingUser] = await pool.query("SELECT password, confirmPassword FROM users WHERE id = ?", [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Use old password and confirmPassword if not provided in the request
        const newPassword = password || existingUser[0].password;
        const newConfirmPassword = confirmPassword || existingUser[0].confirmPassword;

        if (password && confirmPassword && password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        await pool.query(
            "UPDATE users SET name=?, email=?, password=?, confirmPassword=?, age=? WHERE id=?",
            [name, email, newPassword, newConfirmPassword, age, userId]
        );

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        console.log(`Deleting user with ID: ${req.params.id}`); // ✅ Debug log

        const [result] = await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" }); // If ID doesn't exist
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error.message); // ✅ Log errors
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
