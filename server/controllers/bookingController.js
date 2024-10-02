const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/AppError');

exports.createOrder = async (req, res, next) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to create an order',
      });
    }

    res.status(200).json({
      status: 'success',
      order,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateBooking = async (req, res, next) => {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;
  try {
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest('hex');

    if (signature !== razorpaySignature) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized payment',
      });
    }

    const paymentSignature = crypto
      .createHmac('sha256', process.env.PAYMENT_BOOKING_KEY)
      .update(orderCreationId)
      .digest('hex');

    res.status(200).json({
      status: 'success',
      data: {
        orderId: orderCreationId,
        razorpayPaymentId,
        paymentSignature,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postBooking = async (req, res, next) => {
  const {
    tour,
    user,
    price,
    tourDate,
    bookingData,
    paymentSignature,
    orderId,
  } = req.body;

  try {
    const signature = crypto
      .createHmac('sha256', process.env.PAYMENT_BOOKING_KEY)
      .update(orderId)
      .digest('hex');

    if (signature !== paymentSignature) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized Boking',
      });
    }

    const booking = await Booking.create({
      tour,
      user,
      price,
      tourDate,
      paid: 'pending confirmation',
      bookingData,
      orderId,
      paymentSignature,
    });

    res.status(201).json({
      status: 'success',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserBooking = async (req, res, next) => {
  try {
    const query = Booking.find({ user: req.params.userId, active: true });

    query.sort('-createdAt');

    const bookings = await query;

    if (!bookings) {
      return res.status(200).json({
        status: 'success',
        message: 'No booking data',
        data: [],
      });
    }

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Admin specific routes

exports.getAllBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;

    const limit = parseInt(req.query.limit, 10) || 20;

    const skip = (page - 1) * limit;

    let query = Booking.find({ active: true })
      .sort('-createdAt')
      .select('-paymentSignature -__v')
      .skip(skip)
      .limit(limit);

    let totalCount;

    if (req.query.year && req.query.month) {
      const year = parseInt(req.query.year, 10);
      const month = parseInt(req.query.month, 10);

      const startDate = new Date(year, month - 1, 1);

      const endDate = new Date(year, month, 1);

      query = query.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      totalCount = await Booking.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });
    }

    const bookings = await query;

    if (totalCount === undefined) {
      totalCount = await Booking.countDocuments();
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      pagination: {
        totalBookings: totalCount,
        currentPage: page,
        totalPages,
      },
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).select(
      '-paymentSignature',
    );

    if (!booking) {
      res.status(200).json({
        status: 'success',
        message: 'No Booking found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { tour, user, price, tourDate, bookingData } = req.body;

    const booking = await Booking.create({
      tour,
      user,
      price,
      tourDate,
      paid: 'confirmed',
      bookingData,
      paymentSignature: 'manual',
      orderId: 'admin booking',
    });

    res.status(201).json({
      status: 'success',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!booking) {
      return next(new AppError('Booking Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!booking) {
      return next(new AppError('Booking Not Found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
