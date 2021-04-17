const express = require('express');
const router = express.Router();

const ProjectsController = require('../controllers/Project');
const { authenticateToken } = require('../utils/authFunctions');

router.post('/create', authenticateToken, ProjectsController.createProject);
router.delete('/delete', authenticateToken, ProjectsController.deleteProject);
router.patch('/update/:projectId', authenticateToken, ProjectsController.updateProject);
router.route('/user/:projectId')
    .post(authenticateToken, ProjectsController.addUserToProject)
    .delete(authenticateToken, ProjectsController.deleteUserFromProject)

module.exports = router;