const Reviews = require('../models/reviewModel');
const AppError = require('../utils/AppError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).json({
      status: 'success',
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

exports.createNewReview = async (req, res, next) => {
  try {
    const review = await Reviews.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Reviews.findById(req.params.id);

    if (!review) {
      return next(new AppError('No review found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return next(new AppError('Review Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: review,
    });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new AppError('Review Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error.message);
  }
};

exports.getTourReview = async (req, res, next) => {
  try {
    const reviews = await Reviews.find({ tour: req.params.id });

    if (reviews.length === 0) {
      res.status(200).json({
        status: 'success',
        data: [],
      });
    }

    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    next(error.message);
  }
};

exports.getFeatureReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.find({ feature: true });

    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    next(error.message);
  }
};
