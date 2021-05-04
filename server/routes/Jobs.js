const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/authFunctions');
const JobsController = require('../controllers/Jobs');

router.route('/:stageId')
    .post(authenticateToken, JobsController.createJob)
    .delete(authenticateToken, JobsController.removeJob)
    .patch(authenticateToken, JobsController.changeJobStage)
module.exports = router;