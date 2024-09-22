const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [4, 'Name must have at least 4 characters'],
    maxLength: [25, 'Name must have a maximum of 25 characters'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must have at least 8 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  photo: String,
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm password is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and confirm password do not match',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now();

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.methods.checkPassword = function (userPassword, hashPassword) {
  return bcrypt.compare(userPassword, hashPassword);
};

userSchema.methods.checkPasswordChange = function (tokenIssuedat) {
  if (!this.passwordChangedAt) return;

  const changedTimestamp = parseInt(
    this.passwordChangedAt.getTime() / 1000,
    10,
  );

  return tokenIssuedat < changedTimestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
