const express = require('express');
const router = express.Router();
const UserLogin = require('../models/UserLoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /signup - create new user with hashed password, no JWT token
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already registered
    const existingUser = await UserLogin.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
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
    console.log('User created successfully:', email);

    // Respond with user info only, no token
    res.status(201).json({
      message: "Created Successfully"
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /login - verify credentials and respond with user data, no JWT token
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserLogin.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User login successful:', email);
    
    // Generate JWT token for user session
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: 'user' 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Respond with user info and token
    res.json({
      message: "Retrieved Successfully",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'user'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

module.exports = router;
