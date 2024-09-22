const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [4, 'Name must have at least 4 characters'],
    maxLength: [25, 'Name must have a maximum of 25 characters'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  message: {
    type: String,
    trim: true,
    required: [true, 'Please provide a query message'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contacts = mongoose.model('contacts', contactSchema);

module.exports = Contacts;
