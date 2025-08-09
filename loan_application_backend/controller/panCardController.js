const express = require('express');
const router = express.Router();
const PanCard = require('../models/pancardData.js'); // adjust path as needed

// POST: Add new pan card data
router.post('/add', async (req, res) => {
    try {
        // Create a new document using request body
        const panCardDetails = req.body; // Validation recommended in production
        
        const newPanCard = new PanCard(panCardDetails);
        await newPanCard.save();

        res.status(201).json({ message: 'Record added successfully', data: newPanCard });
    } catch (error) {
        console.error('Error adding PAN card data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST route: accept PAN card & return other details
router.post('/get-details', async (req, res) => {
    try {
        const { PanCard: panNumber } = req.body;

        if (!panNumber) {
            return res.status(400).json({ error: 'PanCard number is required' });
        }

        const record = await PanCard.findOne({ PanCard: panNumber })
            .select('-_id -PanCard -__v');

        if (!record) {
            return res.status(404).json({ error: 'No record found' });
        }

        res.json(record);
    } catch (error) {
        console.error('Error fetching PAN card details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
