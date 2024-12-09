const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });  // Adds `createdAt` and `updatedAt` fields automatically

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
