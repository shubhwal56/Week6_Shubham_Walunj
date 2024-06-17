import { Router } from 'express';
import { getReviews, addReview, deleteReview } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/books/:bookId/reviews', getReviews);
router.post('/books/:bookId/reviews', authenticate, addReview);
router.delete('/reviews/:id', authenticate, deleteReview);

export default router;
