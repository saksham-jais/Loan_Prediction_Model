const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const User = mongoose.model('TrainUser', userSchema, 'users');
// const Customer = mongoose.model('Customer', userSchema, 'customers');
const TestUser = mongoose.model('TestUser', userSchema, 'testusers');

module.exports = {
  User,
//   Customer,
  TestUser
};
