const express = require('express');
const router = express.Router();

const ProjectsController = require('../controllers/Project');
const { authenticateToken } = require('../utils/authFunctions');

router.get('/:projectId', authenticateToken, ProjectsController.getProjectDetails);
router.post('/create', authenticateToken, ProjectsController.createProject);
router.delete('/delete', authenticateToken, ProjectsController.deleteProject);
router.patch('/update/:projectId', authenticateToken, ProjectsController.updateProject);
router.patch('/setUserRole/:projectId', authenticateToken, ProjectsController.setUserRole);
router.route('/user/:projectId')
    .post(authenticateToken, ProjectsController.addUserToProject)
    .patch(authenticateToken, ProjectsController.removeUserFromProject)

module.exports = router;