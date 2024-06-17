import { Router } from 'express';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthorById);
router.post('/authors', authenticate, createAuthor); // Admin only
router.put('/authors/:id', authenticate, updateAuthor); // Admin only
router.delete('/authors/:id', authenticate, deleteAuthor); // Admin only

export default router;
