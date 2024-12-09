const express = require('express');
const Project = require('../models/project');  // Import the Project model
const router = express.Router();

// POST route for creating a new project (MongoDB version)
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and Description are required.' });
    }

    try {
        // Create a new Project document and save it to MongoDB
        const newProject = new Project({
            title,
            description
        });

        await newProject.save();  // Save the new project to the database
        return res.status(201).json(newProject);  // Return the created project
    } catch (err) {
        return res.status(500).json({ message: 'Error creating project', error: err });
    }
});

// GET route to fetch all projects from the database (MongoDB version)
router.get('/', async (req, res) => {
    try {
        // Fetch all projects from MongoDB
        const projects = await Project.find();
        return res.status(200).json(projects);  // Return the list of projects
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching projects', error: err });
    }
});

// DELETE route to delete a specific project by its ID
router.delete('/:id', async (req, res) => {
    try {
        const projectId = req.params.id;  // Get the project ID from the URL params

        // Find and delete the project by its ID
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting project', error: err });
    }
});

module.exports = router;
