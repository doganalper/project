const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/authFunctions');
const JobsController = require('../controllers/Jobs');

router.post('/assign', authenticateToken, JobsController.assignUserToJob);
router.post('/changeStatus', authenticateToken, JobsController.changeJobStatus);
router.post('/update', authenticateToken, JobsController.updateJobInfo);
router.post('/setDueDate', authenticateToken, JobsController.setDueDate);
router.post('/subJob', authenticateToken, JobsController.addSubJob);
router.delete('/subJob/:subJobId', authenticateToken, JobsController.removeSubJob);
router.patch('/subJob', authenticateToken, JobsController.changeSubJobStatus);
router.post('/comment/add', authenticateToken, JobsController.addComment);
router.delete('/comment/:commentId', authenticateToken, JobsController.removeComment);
router.route('/:stageId')
    .post(authenticateToken, JobsController.createJob)
    .delete(authenticateToken, JobsController.removeJob)
    .patch(authenticateToken, JobsController.changeJobStage)

module.exports = router;