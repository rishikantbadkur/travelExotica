const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/bookingModel');

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
    const bookings  = await Booking.find({ user: req.params.userId }).sort('-createdAt');

    

    

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
