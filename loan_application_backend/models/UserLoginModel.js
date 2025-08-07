const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

// You can add pre-save hooks here if needed (optional)

const UserLogin = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLogin;
