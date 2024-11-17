import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { signup,login,getUser,updateUser } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get-user', authMiddleware,getUser);
router.patch('/edit-user', authMiddleware,updateUser);

export default router;
