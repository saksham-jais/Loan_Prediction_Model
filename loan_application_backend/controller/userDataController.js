const express = require('express');
const router = express.Router();
const { User, TestUser } = require('../models/userDataModels.js'); // Adjust path as needed

// POST /user (already in your code)
router.post('/traindata', async (req, res) => {
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
router.get('/traindata', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all user documents
        res.status(200).json(users);     // Send as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});
router.post('/testdata', async (req, res) => {
    try {
        const testData = req.body;
        const testUser = new TestUser(testData);
        await testUser.save();
        res.status(201).json({ message: 'TestUser data saved successfully', testUser });
    } catch (error) {
        res.status(400).json({ error: 'Invalid data', details: error.message });
    }
});
router.get('/testdata', async (req, res) => {
    try {
        const testUsers = await TestUser.find();
        res.status(200).json(testUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch TestUser data', details: error.message });
    }
});
module.exports = router;