const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
} = require('../Controllers/reviewController');
const { protect, restrictTo } = require('../Controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.use(restrictTo('user', 'admin'));

router.route('/:id').delete(deleteReview).patch(updateReview);

module.exports = router;
