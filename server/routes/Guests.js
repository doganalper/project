const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/authFunctions');
const GuestController = require('../controllers/Guests');

router.post('/signup', GuestController.createGuest);
router.post('/signin', GuestController.login);
router.get('/profile-me', authenticateToken, GuestController.getUser);
router.post('/request/comment/add', authenticateToken, GuestController.addCommentToRequest);
router.patch('/request/status', authenticateToken, GuestController.changeRequestStatus);
router.patch('/request/update/:projectId', authenticateToken, GuestController.updateRequest);
router.post('/getByArray', authenticateToken, GuestController.getGuestsById);
router.post('/getRequests', authenticateToken, GuestController.getRequests);
router.get('/getRequest/:requestId', authenticateToken, GuestController.getRequestInfo);
router.route('/request/:projectId')
    .post(authenticateToken, GuestController.createRequest)
    .patch(authenticateToken, GuestController.removeRequest)

module.exports = router;