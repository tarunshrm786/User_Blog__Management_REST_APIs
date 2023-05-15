const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


// Register a new user
const register = async (req, res) => {
  try {
    const { name, age, address, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      age,
      address,
      email,
      password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = {
  register
};


//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Password is valid, user is authenticated
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = {
  login
};


// Reset the password using a reset token received via email
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    // Find the user with the provided email and reset token
    const user = await User.findOne({ email, resetToken });
    if (!user) {
      return res.status(401).json({ error: 'Invalid reset token' });
    }

    // Generate a new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

module.exports = {
  resetPassword
};

// Initiate the password reset process by providing an email
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set the reset token and its expiration time for the user
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the reset token via email (implementation not shown)

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate password reset' });
  }
};

module.exports = {
  forgotPassword
};


// Change the password for an authenticated user
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user; // Assuming authentication middleware sets the userId in req.user

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
};



const protect = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, '$2a$10$5rEhPRk5JwrjF1qLa/co.ekd.HYvxLhEcmgr9hdty1yD6qSNF7Uny');

    // Extract the user ID from the decoded token
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};




module.exports = {
  register,
  login,
  resetPassword,
  forgotPassword,
  changePassword,
  protect
};
