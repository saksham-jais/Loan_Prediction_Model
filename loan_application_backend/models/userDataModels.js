const mongoose = require('mongoose');
const userDataSchema = require('./userDataSchema');

const TrainUser = mongoose.model('TrainUser', userDataSchema, 'userstraindata');
// const Customer = mongoose.model('Customer', userSchema, 'customers');
const TestUser = mongoose.model('TestUser', userDataSchema, 'userdata');

module.exports = {
  TrainUser,
  TestUser
};