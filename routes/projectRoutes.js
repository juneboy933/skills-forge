import express from 'express';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authenticateUser, getProjects);
router.post('/',authenticateUser, addProject);
router.put('/:projectId', authenticateUser, updateProject);
router.delete('/:projectId', authenticateUser, deleteProject);

export default router;