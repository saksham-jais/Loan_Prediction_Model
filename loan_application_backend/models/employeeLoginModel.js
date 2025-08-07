// employeeModel.js
const mongoose = require('mongoose');

const employeeLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {  // Store hashed password in real apps for security
    type: String,
    required: true
  },
  // Keep userid and bank for backward compatibility (optional)
  userid: {
    type: String,
    trim: true
  },
  bank: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'employee'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model('Employeelogin', employeeLoginSchema);

module.exports = Employee;
