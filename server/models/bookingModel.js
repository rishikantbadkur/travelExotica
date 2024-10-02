const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belomg to a tour.'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belomg to a User.'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tourDate: {
    type: Date,
    required: [true, 'A tour should be of a specific date'],
  },
  paid: {
    type: String,
  },
  bookingData: {
    adult: {
      type: Number,
      required: [true, 'Number of adults are required'],
      min: 1,
    },
    children: {
      type: Number,
      min: 0,
    },
  },
  orderId: {
    type: String,
    required: [true, 'Order id is required'],
  },
  paymentSignature: String,
  active: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: ['name', 'email', '_id'] }).populate({
    path: 'tour',
    select: ['name', 'duration', 'difficulty', 'maxGroupSize', 'slug'],
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
