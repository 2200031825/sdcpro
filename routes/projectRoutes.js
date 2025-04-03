const express = require("express");
const upload = require("../middlewares/upload");
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require("../controllers/projectController");

const router = express.Router();

router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", upload.single("image"), createProject); // Image upload
router.put("/projects/:id", upload.single("image"), updateProject); // Image upload
router.delete("/projects/:id", deleteProject);

module.exports = router;
