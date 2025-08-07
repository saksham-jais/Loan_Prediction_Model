const express = require('express');
const router = express.Router();
const UserLogin = require('../models/UserLoginModel');
const bcrypt = require('bcrypt');

// POST /signup - create new user with hashed password, no JWT token
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already registered
    const existingUser = await UserLogin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserLogin({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Respond with user info only, no token
    res.status(201).json({
      message: "Created Successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /login - verify credentials and respond with user data, no JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserLogin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Respond with user info only
    res.json({
        message: "Retrieved Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
