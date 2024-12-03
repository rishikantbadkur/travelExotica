const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/adminLogin', authController.adminLogin);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMyProfile', userController.updateUserData);
router.delete('/deleteMyProfile', userController.deleteUserData);

router.use(authController.restrictTo('admin'));

router.patch('/master', userController.updateMasterAdmin);

router.get('/stats', userController.getUserStats);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.checkUserToUpdate, userController.updateUser)
  .delete(userController.checkUserToUpdate, userController.deleteUser);

module.exports = router;
