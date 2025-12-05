import express from 'express';
import {getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/:projectId', authenticateUser, getTasks);
router.post('/:projectId', authenticateUser, addTask);
router.put('/:projectId/:taskId', authenticateUser, updateTask);
router.delete('/:projectId/:taskId', authenticateUser, deleteTask);

export default router;