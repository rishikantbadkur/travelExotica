const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/stats').get(tourController.getTourStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo(['admin']),
    tourController.createTour,
  );

router.route('/tourQuery').post(tourController.createTourQuery);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo(['admin']),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo(['admin']),
    tourController.deleteTour,
  );

module.exports = router;
