const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/authFunctions');
const TeamsController = require('../controllers/Team');

router.post('/create/:projectId', authenticateToken, TeamsController.createTeam);
router.route('/:teamId')
    .delete(authenticateToken, TeamsController.deleteTeam)
    .patch(authenticateToken, TeamsController.updateTeam)
    .get(authenticateToken, TeamsController.getTeamDetail)

module.exports = router;