const path = require('path');
const fs = require('fs');

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
    const tourName = await Tour.findById(req.params.id).populate('name');

    const dir = path.join(
      __dirname,
      '../public/images/tours',
      tourName.name.split(' ').join(''),
    );

    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return next(new AppError('Tour Not Found', 404));
    }

    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
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

exports.updateFeatureTours = async (req, res, next) => {
  try {
    const tours = await Tour.find({ feature: true });

    if (req.query.action === 'add') {
      if (tours.length >= 3) {
        return next(
          new AppError('There can be a maximum of 3 featured tours', 400),
        );
      }

      const tour = await Tour.findByIdAndUpdate(
        req.params.id,
        { feature: true },
        {
          new: true,
          runValidators: true,
        },
      );

      return res.status(200).json({
        status: 'success',
        tour,
      });
    }

    if (req.query.action === 'remove') {
      const tour = await Tour.findByIdAndUpdate(
        req.params.id,
        { feature: false },
        {
          new: true,
          runValidators: true,
        },
      );

      return res.status(200).json({
        status: 'success',
        tour,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingTours = async (req, res, next) => {
  try {
    const tours = await Tour.find().select(
      'id name startDates maxGroupSize price',
    );

    const sampled = [];

    tours.forEach((tour) => {
      tour.startDates.forEach((date) => {
        sampled.push({
          date,
          name: tour.name,
          id: tour.id,
          maxGroupSize: tour.maxGroupSize,
          price: tour.price,
        });
      });
    });

    const data = sampled.sort((tour1, tour2) => tour1.date - tour2.date);

    res.status(200).json({
      status: 'success',
      tours: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTourDates = async (req, res, next) => {
  try {
    const { tourId, tourDate } = req.body;

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return next(
        new AppError('Tour with this particular date not found', 404),
      );
    }

    const updatedDates = tour.startDates.filter(
      (date) => new Date(date).getTime() !== new Date(tourDate).getTime(),
    );

    tour.startDates = updatedDates;

    await tour.save({ validateBeforeSave: true });

    res.status(200).json({
      status: 'success',
      tour,
    });
  } catch (error) {
    next(error);
  }
};
