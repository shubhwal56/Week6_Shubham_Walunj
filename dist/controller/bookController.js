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
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const author_1 = __importDefault(require("../models/author"));
const review_1 = __importDefault(require("../models/review"));
const rating_1 = __importDefault(require("../models/rating"));
// Get all books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.findAll({
            include: [
                {
                    model: author_1.default,
                    attributes: ['id', 'name', 'bio', 'birthdate', 'isSystemUser'],
                },
                {
                    model: review_1.default,
                },
                {
                    model: rating_1.default,
                    attributes: ['id', 'userId', 'bookId', 'rating'],
                },
            ],
        });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.getBooks = getBooks;
// Get book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield book_1.default.findByPk(id, {
            include: [
                {
                    model: author_1.default,
                    attributes: ['id', 'name', 'bio', 'birthdate', 'isSystemUser'],
                },
                {
                    model: review_1.default,
                },
                {
                    model: rating_1.default,
                    attributes: ['id', 'userId', 'bookId', 'rating'],
                },
            ],
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.getBookById = getBookById;
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, publishedYear, price, authors, externalId } = req.body;
    try {
        const book = yield book_1.default.create({
            title,
            description,
            publishedYear,
            price,
            authors,
            externalId,
        });
        res.status(201).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.createBook = createBook;
// Update a book by ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, publishedYear, price, authors, externalId } = req.body;
    try {
        const book = yield book_1.default.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        yield book.update({
            title,
            description,
            publishedYear,
            price,
            authors,
            externalId,
        });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.updateBook = updateBook;
// Delete a book by ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield book_1.default.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        yield book.destroy();
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookController.js.map