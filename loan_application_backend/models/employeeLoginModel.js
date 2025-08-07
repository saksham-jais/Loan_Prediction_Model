// employeeModel.js
const mongoose = require('mongoose');

const employeeLoginSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true
  },
  password: {  // Store hashed password in real apps for security
    type: String,
    required: true
  },
  bank: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model('Employeelogin', employeeLoginSchema);

module.exports = Employee;
