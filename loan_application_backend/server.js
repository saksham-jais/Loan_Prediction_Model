const express = require('express');
const mongoose = require('mongoose');
const {User,TestUser} = require('./models/userModels.js'); // Adjust path as needed
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => { console.error('MongoDB error:', err); process.exit(1); });

// POST /user (already in your code)
app.post('/user/traindata', async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User data saved successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error.message });
  }
});
// GET /user - Fetch all users
app.get('/user/traindata', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all user documents
    res.status(200).json(users);     // Send as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

app.post('/user/testdata', async (req, res) => {
    try {
      const testData = req.body;
      const testUser = new TestUser(testData);
      await testUser.save();
      res.status(201).json({ message: 'TestUser data saved successfully', testUser });
    } catch (error) {
      res.status(400).json({ error: 'Invalid data', details: error.message });
    }
  });
  
  
app.get('/user/testdata', async (req, res) => {
    try {
      const testUsers = await TestUser.find();
      res.status(200).json(testUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch TestUser data', details: error.message });
    }
  });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
module.exports = app;