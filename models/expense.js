const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  type: String,
  cost: Number,
  repeat: String,
  merchant: String,
  location: Boolean,
  vital: Boolean
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);
