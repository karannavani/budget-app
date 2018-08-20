const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  deadline: String,
  alreadySaved: Number,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('goal', goalSchema);
