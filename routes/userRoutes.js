const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
// const { protect } = require('../controllers/authController');

// GET user profile
router.get('/profile', getUserProfile);

// PUT update user profile
router.put('/profile', updateUserProfile);

module.exports = router;
