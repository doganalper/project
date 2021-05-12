const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/authFunctions');
const StagesController = require('../controllers/Stages');

router.post('/:teamId/create', authenticateToken, StagesController.createStage);
router.delete('/:stageId', authenticateToken, StagesController.deleteStage);
router.post('/update', authenticateToken, StagesController.updateStageInfo);
module.exports = router;