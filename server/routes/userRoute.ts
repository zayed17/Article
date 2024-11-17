import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { signup,login,getUser } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get-user', authMiddleware,getUser);

export default router;
