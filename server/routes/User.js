const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User');
const { authenticateToken } = require('../utils/authFunctions');
const multer = require('../utils/multer');

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.login);
router.get('/profile-me', authenticateToken, UserController.getUser);
router.post('/change-password', authenticateToken, UserController.changePassword);
router.post('/update-me', authenticateToken, UserController.changeUserInfo);
router.post('/get-user', authenticateToken, UserController.getUserById);
router.post('/update-profile-picture', multer.single('profilePic'), authenticateToken, UserController.updateProfilePicture);

module.exports = router;