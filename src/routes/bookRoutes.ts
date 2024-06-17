import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controller/appController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', authenticate, createBook); // Admin only 
router.put('/books/:id', authenticate, updateBook); // Admin only
router.delete('/books/:id', authenticate, deleteBook); // Admin only

export default router;
