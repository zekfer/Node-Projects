const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  updateMe,
  deleteMe,
} = require('./../Controllers/userController');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  protect,
  updatePassword,
  restrictTo,
} = require('../Controllers/authController');
const { getMe } = require('../Controllers/handleFactory');
const router = express.Router();

router.post('/sign-up', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/me', getMe, getUser);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
