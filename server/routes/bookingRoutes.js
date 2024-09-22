const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);

router.route('/order').post(bookingController.createOrder);

router.route('/verify').post(bookingController.validateBooking);

router.route('/post').post(bookingController.postBooking);

router.route('/user/:userId').get(bookingController.getUserBooking);

// router.use(authController.restrictTo('admin'));

// router
//   .route('/')
//     .get(bookingController.getAllBookings)
//   .post(bookingController.createBooking);

// router
//   .route('/:id')
//   .get(bookingController.getBooking)
//   .patch(bookingController.updateBooking)
//   .delete(bookingController.deleteBooking);

module.exports = router;
