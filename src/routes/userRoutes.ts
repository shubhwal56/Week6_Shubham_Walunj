import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/me', authenticate, getCurrentUser);

export default router;
