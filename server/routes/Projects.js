const express = require('express');
const router = express.Router();

const ProjectsController = require('../controllers/Project');
const { authenticateToken } = require('../utils/authFunctions');

router.post('/create', authenticateToken, ProjectsController.createProject);
router.delete('/delete', authenticateToken, ProjectsController.deleteProject);

module.exports = router;