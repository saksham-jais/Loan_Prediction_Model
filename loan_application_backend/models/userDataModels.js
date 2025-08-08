const mongoose = require('mongoose');
const userDataSchema = require('./userDataSchema');

const User = mongoose.model('TrainUser', userDataSchema, 'userstraindata');
// const Customer = mongoose.model('Customer', userSchema, 'customers');
const TestUser = mongoose.model('TestUser', userDataSchema, 'userstestdata');

module.exports = {
  User,
//   Customer,
  TestUser
};
