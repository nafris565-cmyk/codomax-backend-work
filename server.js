const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected Successfully! 🚀');
})
.catch((err) => {
    console.log('Database Connection Error: ', err.message);
});

// Test Route
app.get('/', (req, res) => {
    res.send('Codomax Backend Server with Database is running!');
});

// Routes Links
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});