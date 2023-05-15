const User = require('../models/user');

// Retrieve user profile information
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming authentication middleware sets the userId in req.user

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

// Update user profile information
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming authentication middleware sets the userId in req.user
    const { name, age, address } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile information
    user.name = name;
    user.age = age;
    user.address = address;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
