const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  type: String,
  cost: Number,
  repeat: Boolean,
  merchant: String,
  location: String,
  vital: Boolean,
  monzoId: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {timestamps: true});

// expenseSchema
//   .virtual('monzoId')
//   .set(function setMonzoId(monzoId) {
//     this._monzoId = monzoId;
//   });

module.exports = mongoose.model('Expense', expenseSchema);

//shouyld be able to be retroactive
