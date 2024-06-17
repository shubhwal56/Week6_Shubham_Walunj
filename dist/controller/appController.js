"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.getOrderById = exports.createOrder = exports.addRating = exports.getRatings = exports.deleteReview = exports.addReview = exports.getReviews = exports.getCurrentUser = exports.loginUser = exports.registerUser = exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorById = exports.getAuthors = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const author_1 = __importDefault(require("../models/author"));
const user_1 = __importDefault(require("../models/user"));
const review_1 = __importDefault(require("../models/review"));
const rating_1 = __importDefault(require("../models/rating"));
const order_1 = __importDefault(require("../models/order"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const payment_1 = __importDefault(require("../models/payment"));
const jwtUtils_1 = require("../utils/jwtUtils");
const gocardlessConfig_1 = require("../postgresDB/gocardlessConfig");
// Books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.default.findAll({ include: [author_1.default, review_1.default, rating_1.default] });
    res.json(books);
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(req.params.id, { include: [author_1.default, review_1.default, rating_1.default] });
    res.json(book);
});
exports.getBookById = getBookById;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.create(req.body);
    res.status(201).json(book);
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(req.params.id);
    if (book) {
        yield book.update(req.body);
        res.json(book);
    }
    else {
        res.status(404).json({ message: 'Book not found' });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(req.params.id);
    if (book) {
        yield book.destroy();
        res.status(204).end();
    }
    else {
        res.status(404).json({ message: 'Book not found' });
    }
});
exports.deleteBook = deleteBook;
// Authors
const getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authors = yield author_1.default.findAll({ include: [book_1.default] });
    res.json(authors);
});
exports.getAuthors = getAuthors;
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield author_1.default.findByPk(req.params.id, { include: [book_1.default] });
    res.json(author);
});
exports.getAuthorById = getAuthorById;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield author_1.default.create(req.body);
    res.status(201).json(author);
});
exports.createAuthor = createAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield author_1.default.findByPk(req.params.id);
    if (author) {
        yield author.update(req.body);
        res.json(author);
    }
    else {
        res.status(404).json({ message: 'Author not found' });
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield author_1.default.findByPk(req.params.id);
    if (author) {
        yield author.destroy();
        res.status(204).end();
    }
    else {
        res.status(404).json({ message: 'Author not found' });
    }
});
exports.deleteAuthor = deleteAuthor;
// Users
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_1.default.create({ username, password: hashedPassword, email });
    res.status(201).json(user);
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({ where: { username } });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = (0, jwtUtils_1.generateToken)({ id: user.id, username: user.username });
    res.json({ token });
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = yield user_1.default.findByPk(req.user.id);
    res.json(user);
});
exports.getCurrentUser = getCurrentUser;
// Reviews
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_1.default.findAll({ where: { bookId: req.params.bookId }, include: [user_1.default] });
    res.json(reviews);
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const review = yield review_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.user.id, bookId: req.params.bookId }));
    res.status(201).json(review);
});
exports.addReview = addReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const review = yield review_1.default.findByPk(req.params.id);
    if (review && (review.userId === req.user.id || req.user.isAdmin)) {
        yield review.destroy();
        res.status(204).end();
    }
    else {
        res.status(403).json({ message: 'Not authorized to delete this review' });
    }
});
exports.deleteReview = deleteReview;
// Ratings
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ratings = yield rating_1.default.findAll({ where: { bookId: req.params.bookId }, include: [user_1.default] });
    res.json(ratings);
});
exports.getRatings = getRatings;
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const rating = yield rating_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.user.id, bookId: req.params.bookId }));
    res.status(201).json(rating);
});
exports.addRating = addRating;
// Orders
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const order = yield order_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    res.status(201).json(order);
});
exports.createOrder = createOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findByPk(req.params.id, { include: [book_1.default, user_1.default] });
    res.json(order);
});
exports.getOrderById = getOrderById;
// Payment
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency, bookId } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const customer = yield gocardlessConfig_1.gocardless.customers.create({
            email: req.user.email,
            given_name: req.user.username,
            family_name: 'Surname',
            address_line1: 'Address Line 1',
            city: 'City',
            postal_code: 'Postal Code'
        });
        const payment = yield gocardlessConfig_1.gocardless.payments.create({
            amount,
            currency,
            links: {
                customer_bank_account: customer.id
            }
        });
        const newPayment = yield payment_1.default.create({
            userId: req.user.id,
            bookId,
            amount,
            status: payment.status,
            createdAt: new Date()
        });
        const order = yield order_1.default.create({
            userId: req.user.id,
            bookId,
            status: 'created',
            createdAt: new Date()
        });
        res.status(201).json({ payment, order });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Payment creation failed', error });
    }
});
exports.createPayment = createPayment;
//# sourceMappingURL=appController.js.map