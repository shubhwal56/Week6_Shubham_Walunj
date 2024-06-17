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
exports.deleteReview = exports.addReview = exports.getReviewsForBook = void 0;
const review_1 = __importDefault(require("../models/review"));
const user_1 = __importDefault(require("../models/user"));
const getReviewsForBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.findAll({
            where: { bookId: req.params.bookId },
            include: [user_1.default], // Include User model to get user information
        });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.getReviewsForBook = getReviewsForBook;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const bookId = Number(req.params.bookId); // Convert req.params.bookId to a number
    try {
        const review = yield review_1.default.create({
            content,
            userId: req.user.id, // Access userId from req.user
            bookId: bookId.toString(), // Convert the bookId to string before assigning
        });
        res.status(201).json(review);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.addReview = addReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.default.findByPk(req.params.id);
        if (review) {
            if (review.userId === req.user.id || req.user.isAdmin) {
                yield review.destroy();
                res.status(204).end();
            }
            else {
                res.status(403).json({ message: 'Forbidden' });
            }
        }
        else {
            res.status(404).json({ message: 'Review not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=reviewController.js.map