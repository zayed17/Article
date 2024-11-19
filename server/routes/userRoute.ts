import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { signup,login,getUser,updateUser,changePassword,logout } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/get-user', authMiddleware,getUser);
router.patch('/edit-user', authMiddleware,updateUser);
router.patch('/change-password', authMiddleware,changePassword);

export default router;
