const User = require('../models/user');

// Login as an admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the provided email and password match the admin credentials
    if (email !== 'admin@example.com' || password !== 'adminpassword') {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // Perform any other necessary logic specific to admin login

    res.json({ message: 'Admin login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = {
  login
};
