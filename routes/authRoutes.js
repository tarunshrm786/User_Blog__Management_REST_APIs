const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Register a new user
router.post('/register', authController.register);

// Log in with email and password
router.post('/login', authController.login);

// Reset the password using a reset token received via email
router.post('/reset-password', authController.resetPassword);

// Initiate the password reset process by providing an email
router.post('/forgot-password', authController.forgotPassword);

// Change the password for an authenticated user
router.put('/change-password', authController.changePassword);


module.exports = router;
