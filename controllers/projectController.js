const Project = require("../models/projectModel");

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create project with image
exports.createProject = async (req, res) => {
  const { name, description, deadline, status } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Image URL

  try {
    const project = await Project.create({
      name,
      description,
      deadline,
      imageUrl,
      status: status || "open",
    });

    res.status(201).json({ message: "Project Created", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update project with image
exports.updateProject = async (req, res) => {
  const { name, description, deadline, status } = req.body;
  const projectId = req.params.id;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.update({ name, description, deadline, imageUrl, status });

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
