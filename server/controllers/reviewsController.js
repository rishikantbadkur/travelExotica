const Reviews = require('../models/reviewModel');
const AppError = require('../utils/AppError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};

exports.getReviewStats = async (req, res, next) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).json({
      status: 'success',
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;

    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const query = Reviews.find().sort('-createdAt').skip(skip).limit(limit);

    let totalCount;

    const reviews = await query;

    if (totalCount === undefined) {
      totalCount = await Reviews.countDocuments();
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      pagination: {
        totalReviews: totalCount,
        currentPage: page,
        totalPages,
        resultsPerPage: limit,
      },
      data: reviews,
    });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    if (req.body.feature === true) {
      const featuresReviews = await Reviews.find({ feature: true });
      if (!(featuresReviews.length < 4)) {
        return next(
          new AppError('There can be at max 4 feature reviews at a time', 400),
        );
      }
    }

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
    next(error);
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
    next(error);
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
    next(error);
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
    next(error);
  }
};
