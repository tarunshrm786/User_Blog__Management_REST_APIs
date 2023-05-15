const express = require('express');
const app = express();
const connectDB = require('./config/database');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the server after successful database connection
    app.listen(7700, () => {
      console.log('Server is running on port 7700');
    });
  })
  .catch((error) => {
    console.error('Failed to start server', error);
  });

// Blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);






