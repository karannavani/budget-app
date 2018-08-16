const mongoose = require('mongoose');

const expenseSchema = mongoose.schema({
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  repeat: Boolean,
  merchant: String,
  location: String,
  vital: Boolean
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);
