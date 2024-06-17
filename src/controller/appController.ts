import { Request, Response } from 'express';
import Book from '../models/book';
import Author from '../models/author';
import User from '../models/user';
import Review from '../models/review';
import Rating from '../models/rating';
import Order from '../models/order';
import bcrypt from 'bcryptjs';
import Payment from '../models/payment';
import { generateToken } from '../utils/jwtUtils';
import { gocardless } from '../postgresDB/gocardlessConfig';

// Books
export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.findAll({ include: [Author, Review, Rating] });
    res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
    const book = await Book.findByPk(req.params.id, { include: [Author, Review, Rating] });
    res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

// Authors
export const getAuthors = async (req: Request, res: Response) => {
    const authors = await Author.findAll({ include: [Book] });
    res.json(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
    const author = await Author.findByPk(req.params.id, { include: [Book] });
    res.json(author);
};

export const createAuthor = async (req: Request, res: Response) => {
    const author = await Author.create(req.body);
    res.status(201).json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
    const author = await Author.findByPk(req.params.id);
    if (author) {
        await author.update(req.body);
        res.json(author);
    } else {
        res.status(404).json({ message: 'Author not found' });
    }
};

export const deleteAuthor = async (req: Request, res: Response) => {
    const author = await Author.findByPk(req.params.id);
    if (author) {
        await author.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Author not found' });
    }
};

// Users
export const registerUser = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
};

export const getCurrentUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findByPk(req.user.id);
    res.json(user);
};

// Reviews
export const getReviews = async (req: Request, res: Response) => {
    const reviews = await Review.findAll({ where: { bookId: req.params.bookId }, include: [User] });
    res.json(reviews);
};

export const addReview = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const review = await Review.create({ ...req.body, userId: req.user.id, bookId: req.params.bookId });
    res.status(201).json(review);
};

export const deleteReview = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const review = await Review.findByPk(req.params.id);
    if (review && (review.userId === req.user.id || req.user.isAdmin)) {
        await review.destroy();
        res.status(204).end();
    } else {
        res.status(403).json({ message: 'Not authorized to delete this review' });
    }
};

// Ratings
export const getRatings = async (req: Request, res: Response) => {
    const ratings = await Rating.findAll({ where: { bookId: req.params.bookId }, include: [User] });
    res.json(ratings);
};

export const addRating = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const rating = await Rating.create({ ...req.body, userId: req.user.id, bookId: req.params.bookId });
    res.status(201).json(rating);
};

// Orders
export const createOrder = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.status(201).json(order);
};

export const getOrderById = async (req: Request, res: Response) => {
    const order = await Order.findByPk(req.params.id, { include: [Book, User] });
    res.json(order);
};

// Payment
export const createPayment = async (req: Request, res: Response) => {
    const { amount, currency, bookId } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        
        const customer = await gocardless.customers.create({
            email: req.user.email,
            given_name: req.user.username,
            family_name: 'Surname', 
            address_line1: 'Address Line 1', 
            city: 'City',
            postal_code: 'Postal Code'
        });

        const payment = await gocardless.payments.create({
            amount,
            currency,
            links: {
                customer_bank_account: customer.id
            }
        });


        const newPayment = await Payment.create({
            userId: req.user.id,
            bookId,
            amount,
            status: payment.status,
            createdAt: new Date()
        });

        const order = await Order.create({
            userId: req.user.id,
            bookId,
            status: 'created',
            createdAt: new Date()
        });

        res.status(201).json({ payment, order });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Payment creation failed', error });
    }
};
