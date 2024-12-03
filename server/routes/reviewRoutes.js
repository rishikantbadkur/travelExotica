const express = require('express');

const reviewsController = require('../controllers/reviewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/tour/:id')
  .get(reviewsController.getTourReview)
  .post(authController.protect, reviewsController.createNewReview)
  .patch(authController.protect, reviewsController.updateReview);

router.route('/feature').get(reviewsController.getFeatureReviews);

router.use(authController.protect);

router.get('/stats', reviewsController.getReviewStats);

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(reviewsController.setTourUserIds, reviewsController.createNewReview);

router
  .route('/:id')
  .get(reviewsController.getReview)
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
