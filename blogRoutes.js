const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const verifyToken = require('../middleware/authMiddleware');

// 1. Get all blogs (Public or Dashboard)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Create a new blog (Protected Route - Login required!)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            author: req.user.id
        });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully!', newBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Delete a blog by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;