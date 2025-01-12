const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/stats').get(tourController.getTourStats);

router
  .route('/getupcomingtours')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getUpcomingTours,
  );

router
  .route('/updatetourdates')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateTourDates,
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.createTour,
  );

router.route('/tourQuery').post(tourController.createTourQuery);

router
  .route('/feature/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateFeatureTours,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour,
  );

module.exports = router;
