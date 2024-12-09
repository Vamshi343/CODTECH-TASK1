const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import the routes for projects and blog posts
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use the routes
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Backend API!');
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolioDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
