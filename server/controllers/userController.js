const mongoose = require('mongoose');

const User = require('../models/userModels');

// eslint-disable-next-line no-unused-vars
const Booking = require('../models/bookingModel');
// eslint-disable-next-line no-unused-vars
const Tours = require('../models/tourModel');

const AppError = require('../utils/AppError');

exports.updateUserData = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findOneAndUpdate({ _id: req.user._id }, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserData = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    const skip = limit * (page - 1);

    const totalUsers = await User.countDocuments({ active: true });

    const totalPages = Math.ceil(totalUsers / limit);

    const sortOptions = {};

    switch (req.query.sort) {
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      case 'bookingsHighToLow':
        sortOptions.numOfBookings = -1;
        break;
      case 'bookingsLowToHigh':
        sortOptions.numOfBookings = 1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const usersWithBookingCount = await User.aggregate([
      { $match: { active: true } },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'bookings',
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          master: 1,
          active: 1,
          createdAt: 1,
          numOfBookings: { $size: '$bookings' },
        },
      },

      { $sort: sortOptions },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: usersWithBookingCount.length,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages,
        resultsPerPage: limit,
      },
      data: usersWithBookingCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ active: true });

    const totalUserWithBookings = await User.aggregate([
      { $match: { active: true } },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'bookings',
        },
      },
      {
        $project: {
          _id: 1,
          bookingsCount: { $size: '$bookings' },
        },
      },
      {
        $match: { bookingsCount: { $gt: 0 } },
      },
      { $count: 'totalUsersHavingBookings' },
    ]);

    const totalUsersHavingBookings =
      totalUserWithBookings.length > 0
        ? totalUserWithBookings[0].totalUsersHavingBookings
        : 0;

    res.status(200).json({
      status: 'success',
      totalUserWithBookings: totalUsersHavingBookings,
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    newUser.password = undefined;
    newUser.passwordChangedAt = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let user;
    if (Number(req.params.id) === 0) {
      user = await User.aggregate([
        {
          $match: {
            email: req.query.email,
            active: true,
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: '_id',
            foreignField: 'user',
            as: 'bookings',
          },
        },
        {
          $unwind: {
            path: '$bookings',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'tours',
            localField: 'bookings.tour',
            foreignField: '_id',
            as: 'tourDetails',
          },
        },
        {
          $unwind: {
            path: '$tourDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            role: 1,
            createdAt: 1,
            master: 1,
            bookings: {
              _id: '$bookings._id',
              price: '$bookings.price',
              createdAt: '$bookings.createdAt',
              bookingData: '$bookings.bookingData',
              tour: {
                name: '$tourDetails.name',
              },
            },
          },
        },

        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            email: { $first: '$email' },
            role: { $first: '$role' },
            createdAt: { $first: '$createdAt' },
            master: { $first: '$master' },

            bookings: { $push: '$bookings' },
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            createdAt: 1,
            master: 1,
            bookings: 1,
            bookingsCount: { $size: '$bookings' },
          },
        },
      ]);
    } else {
      user = await User.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
            active: true,
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: '_id',
            foreignField: 'user',
            as: 'bookings',
          },
        },
        {
          $unwind: {
            path: '$bookings',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'tours',
            localField: 'bookings.tour',
            foreignField: '_id',
            as: 'tourDetails',
          },
        },
        {
          $unwind: {
            path: '$tourDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            role: 1,
            createdAt: 1,
            master: 1,
            bookings: {
              _id: '$bookings._id',
              price: '$bookings.price',
              createdAt: '$bookings.createdAt',
              bookingData: '$bookings.bookingData',
              tour: {
                name: '$tourDetails.name',
              },
            },
          },
        },

        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            email: { $first: '$email' },
            role: { $first: '$role' },
            createdAt: { $first: '$createdAt' },
            master: { $first: '$master' },

            bookings: { $push: '$bookings' },
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            createdAt: 1,
            master: 1,
            bookings: 1,
            bookingsCount: { $size: '$bookings' },
          },
        },
      ]);
    }

    if (user.length === 0) {
      return next(new AppError('No User found with the given email', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

exports.checkUserToUpdate = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('User Not Found', 404));
    }

    if (user.master === true) {
      return next(new AppError('Super Admin data cannot be modified', 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.params.id).select('+password');

    if (!existingUser) {
      return next(new AppError('User Not Found', 404));
    }

    const updates = {
      name: req.body.name || existingUser.name,
      email: req.body.email || existingUser.email,
      password: req.body.password || existingUser.password,
    };
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMasterAdmin = async (req, res, next) => {
  try {
    if (!req.user.master) {
      return next(new AppError('Unauthorized'), 403);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        master: true,
        role: 'admin',
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('User Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
