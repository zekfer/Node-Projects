const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
  aliasTopTours,
  tourStats,
  getMonthlyPlan,
  getToursWithin,
} = require('./../Controllers/tourController');
const { protect, restrictTo } = require('../Controllers/authController');
const { createReview } = require('../Controllers/reviewController');
const reviewRouter = require('../Routes/reviewRoutes');

const router = express.Router();

// router.param('id', checkId);

router.use('/:tourId/reviews', reviewRouter);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
router
  .route('/monthly-plan/:year')
  .get(getMonthlyPlan, protect, restrictTo('admin', 'lead-guide', 'guide'));
router.route('/tour-stats').get(tourStats);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router
  .route('/')
  .get(protect, getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour, protect, restrictTo('admin', 'lead-guide'))
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

module.exports = router;
