const Query = require('../models/queryModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/AppError');

exports.getAllTours = async (req, res, next) => {
  try {
    let query = Tour.find();

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.feature) {
      query = query.select().where({ feature: true });
    }

    query = query.select('-__v');

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    next(new AppError('Error retrieving Tours'));
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('reviews');

    if (!tour) {
      return next(new AppError('Tour Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return next(new AppError('Tour Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return next(new AppError('Tour Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const groupParam = req.query.groupby;

    const stats = await Tour.aggregate([
      {
        $group: {
          _id: `$${groupParam}`,
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createTourQuery = async (req, res, next) => {
  try {
    const query = await Query.create(req.body);

    res.status(201).json({
      status: 'success',
      data: query,
    });
  } catch (error) {
    next(error);
  }
};
