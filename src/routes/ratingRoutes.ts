import { Router } from 'express';
import { getRatings, addRating } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/books/:bookId/ratings', getRatings);
router.post('/books/:bookId/ratings', authenticate, addRating);

export default router;
