const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/userModels');
const AppError = require('../utils/AppError');
const Email = require('../utils/email');

const signToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: 'user'
    });

    await new Email(newUser).sendWelcome();

    createSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email and Password are required', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError('Incorrect Email or Password', 401));
    }

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Please login again to continue', 401));
    }

    let userId;
    let issuedat;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(err);
      }

      userId = decoded.id;
      issuedat = decoded.iat;
    });

    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError('This user no longer exists', 401));
    }

    if (user.checkPasswordChange(issuedat)) {
      return next(new AppError('Please login again to continue', 401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return next(
        new AppError('You are not authorized to perform this operation', 403),
      );
    }

    next();
  };
};

exports.forgotPassword = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('This user does not exists', 404));

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.get('origin')}/app/users/resetPassword/${resetToken}`;

    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    // console.error(error);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Something went wrong while sending you an email, please try again later',
      ),
      500,
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Password reset link has expired'), 400);
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      '+password',
    );

    const userPassword = req.body.passwordCurrent;

    const correctPassword = await user.checkPassword(
      userPassword,
      user.password,
    );

    if (!correctPassword) {
      return next(new AppError('Current Password is incorrect', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};
