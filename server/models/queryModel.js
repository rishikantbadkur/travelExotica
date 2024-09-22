const mongoose = require('mongoose');
const validator = require('validator');

const querySchema = new mongoose.Schema({
  queryText: {
    type: String,
    trim: true,
    required: [true, 'Query text is required'],
  },

  tourName: {
    type: String,
    ref: 'Tour',
    required: [true, 'Query must belong to a tour'],
  },
  username: {
    type: String,
    ref: 'User',
    required: [true, 'Please provide your full name'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  queryDate: {
    type: Date,
    default: Date.now(),
  },
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
