import express from 'express';
import { getSkills, addSkill, updateSkill, deleteSkill} from '../controllers/skillController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', authenticateUser, getSkills);
router.post('/', authenticateUser, addSkill);
router.put('/:skillId', authenticateUser, updateSkill);
router.delete('/:skillId', authenticateUser, deleteSkill);

export default router;