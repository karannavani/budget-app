const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  type: String,
  cost: Number,
  repeat: Boolean,
  merchant: String,
  location: String,
  vital: Boolean,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);

//shouyld be able to be retroactive 
