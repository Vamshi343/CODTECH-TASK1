const express = require('express');
const BlogPost = require('../models/blogPost');  // Import the BlogPost model
const router = express.Router();

// POST route for creating a new blog post (MongoDB version)
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and Content are required.' });
    }

    try {
        // Create a new BlogPost document and save it to MongoDB
        const newPost = new BlogPost({
            title,
            content
        });

        await newPost.save();  // Save the new post to the database
        return res.status(201).json(newPost);  // Return the created blog post
    } catch (err) {
        return res.status(500).json({ message: 'Error creating blog post', error: err });
    }
});

// GET route to fetch all blog posts from the database (MongoDB version)
router.get('/', async (req, res) => {
    try {
        // Fetch all blog posts from MongoDB
        const blogPosts = await BlogPost.find();
        return res.status(200).json(blogPosts);  // Return the list of blog posts
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching blog posts', error: err });
    }
});

// DELETE route for deleting all blog posts
router.delete('/', async (req, res) => {
    try {
        // Delete all blog posts from the database
        await BlogPost.deleteMany({});
        return res.status(200).json({ message: 'All blog posts deleted' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting blog posts', error: err });
    }
});

module.exports = router;
