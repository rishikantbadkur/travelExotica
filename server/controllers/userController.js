const User = require('../models/userModels');
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
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(200).json({
        status: 'success',
        data: [],
      });
    }

    res.status(200).json({
      status: 'success',
      data: [user],
    });
  } catch (error) {
    next(error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError('User Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error.message);
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
    next(error.message);
  }
};
