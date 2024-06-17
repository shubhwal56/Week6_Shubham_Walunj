import { Router } from 'express';
import { createPayment } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/payments', authenticate, createPayment);

export default router;
