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
exports.addRating = exports.getRatingsForBook = void 0;
const rating_1 = __importDefault(require("../models/rating"));
const user_1 = __importDefault(require("../models/user"));
const getRatingsForBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ratings = yield rating_1.default.findAll({
        where: { bookId: req.params.bookId },
        include: [user_1.default],
    });
    res.json(ratings);
});
exports.getRatingsForBook = getRatingsForBook;
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating } = req.body;
    const bookId = req.params.bookId; // Use req.params.bookId directly
    const newRating = yield rating_1.default.create({
        rating: rating,
        userId: req.user.id,
        bookId: bookId, // Assigning the bookId directly
    });
    res.status(201).json(newRating);
});
exports.addRating = addRating;
//# sourceMappingURL=ratingController.js.map