const pool = require("../db");

// Get all projects
const getProjects = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM projects");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get project by ID
const getProjectById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create project with image
const createProject = async (req, res) => {
    const { name, description, deadline, status } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Image URL

    try {
        const [result] = await pool.query(
            "INSERT INTO projects (name, description, deadline, image_url, status) VALUES (?, ?, ?, ?, ?)",
            [name, description, deadline, imageUrl, status || "open"]
        );
        res.json({ id: result.insertId, name, description, deadline, imageUrl, status: status || "open" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update project with image
const updateProject = async (req, res) => {
    const { name, description, deadline, status } = req.body;
    const projectId = req.params.id;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    try {
        const [existingProject] = await pool.query("SELECT * FROM projects WHERE id = ?", [projectId]);

        if (existingProject.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        await pool.query(
            "UPDATE projects SET name=?, description=?, deadline=?, image_url=?, status=? WHERE id=?",
            [name, description, deadline, imageUrl, status, projectId]
        );

        res.json({ message: "Project updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM projects WHERE id=?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
