const express = require('express');
const router = express.Router();
const {  getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/adminUser');
const {  login } = require('../controllers/adminController');

// Admin login
// router.post('/login', login);

// Retrieve a list of all users
router.get('/users', getAllUsers);

// Retrieve user information by ID
router.get('/users/:id', getUserById);

// Update user information by ID
router.put('/users/:id', updateUserById);

// Delete a user by ID
router.delete('/users/:id', deleteUserById);

// Admin login
router.post('/login', login);

module.exports = router;
