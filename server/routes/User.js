const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User');
const { authenticateToken } = require('../utils/authFunctions');

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.login);
router.get('/profile-me', authenticateToken, UserController.getUser);
router.post('/change-password', authenticateToken, UserController.changePassword);
router.post('/update-me', authenticateToken, UserController.changeUserInfo);

module.exports = router;