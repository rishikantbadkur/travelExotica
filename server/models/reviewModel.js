const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Please provide the description'],
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    rating: {
      type: Number,
      required: [true, 'Please provide the rating'],
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },

    feature: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Reviews = mongoose.model('Review', reviewSchema);

Reviews.syncIndexes();

module.exports = Reviews;
