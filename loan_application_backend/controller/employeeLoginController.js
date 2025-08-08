const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeLoginModel.js');
const authenticateToken = require('../auth/authenticateToken.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 


const JWT_SECRET = process.env.JWT_SECRET;

// GET all employees - returns all employee data (excluding passwords)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.find({}, '-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /signup - create new employee with hashed password and return token
router.post('/signup', async (req, res) => {
  const { userid, password, bank } = req.body;

  try {
    // Check if userid already exists
    const existingUser = await Employee.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ message: 'UserID already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new employee document
    const newEmployee = new Employee({
      userid,
      password: hashedPassword,
      bank
    });

    const savedEmployee = await newEmployee.save();

    // Generate JWT token
    const token = jwt.sign(
      { userid: savedEmployee.userid, id: savedEmployee._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response without password
    res.status(201).json({
      employee: {
        id: savedEmployee._id,
        userid: savedEmployee.userid,
        bank: savedEmployee.bank
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /login - authenticate user and return token if credentials match
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    // Find employee by userid
    const employee = await Employee.findOne({ userid });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid userid or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid userid or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userid: employee.userid, id: employee._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      employee: {
        id: employee._id,
        userid: employee.userid,
        bank: employee.bank
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;