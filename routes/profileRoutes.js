import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import  { authenticateUser } from '../middlewares/authentication.js'; 

const router = express.Router();

router.get('/me', authenticateUser, getProfile);
router.put('/me', authenticateUser, updateProfile);

export default router;