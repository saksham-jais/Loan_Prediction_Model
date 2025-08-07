const mongoose = require('mongoose');
const userDataSchema = require('./userDataSchema');

const User = mongoose.model('TrainUser', userDataSchema, 'users');
// const Customer = mongoose.model('Customer', userSchema, 'customers');
const TestUser = mongoose.model('TestUser', userDataSchema, 'testusers');

module.exports = {
  User,
//   Customer,
  TestUser
};
