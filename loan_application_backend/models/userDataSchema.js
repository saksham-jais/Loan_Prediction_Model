// models/userSchema.js
const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  Age: { type: Number, required: true },
  AnnualIncome: { type: Number, required: true },
  Creditscore: { type: Number, required: true },
  EmploymentStatus: { type: String, required: true },
  EducationLevel: { type: String, required: true },
  LoanAmount: { type: Number, required: true },
  LoanDuration: { type: Number, required: true },
  CreditCardUtilizationRate: { type: Number, required: true },
  BankruptcyHistory: { type: Boolean, required: true },
  PreviousLoanDefaults: { type: Boolean, required: true },
  LengthOfCreditHistory: { type: Number, required: true },
  TotalLiabilities: { type: Number, required: true },
  NetWorth: { type: Number, required: true },
  InterestRate: { type: Number, required: true },
  LoanApproved: { type: Boolean, required: false, default: false },
  RiskScore: { type: Number, required: false, default: 0 },
  Status:{type:String,default:"pending"}
});

module.exports = userDataSchema;