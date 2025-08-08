const express = require('express');
const mongoose = require('mongoose');

const employeeLoginRoutes = require('./controller/employeeLoginController.js');
const userLoginRoutes = require('./controller/userLoginController.js');
const userDataRoutes = require('./controller/userDataController.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{ dbName: 'Loan-Prediction-Model' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => { console.error('MongoDB error:', err); process.exit(1); });

app.get('/',(req,res)=>{res.status(200).json({message:"Loaded"});})
app.use('/employee', employeeLoginRoutes);
app.use('/user', userLoginRoutes);
app.use('/user', userDataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = app;