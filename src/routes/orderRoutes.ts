import { Router } from 'express';
import { createOrder, getOrderById } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/orders', authenticate, createOrder);
router.get('/orders/:id', authenticate, getOrderById);

export default router;
