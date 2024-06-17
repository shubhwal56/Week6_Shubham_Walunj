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
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorById = exports.getAuthors = void 0;
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
const getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield author_1.default.findAll();
        res.status(200).json(authors);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving authors', error });
    }
});
exports.getAuthors = getAuthors;
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const author = yield author_1.default.findByPk(id, {
            include: book_1.default,
        });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving author', error });
    }
});
exports.getAuthorById = getAuthorById;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, birthdate, isSystemUser } = req.body;
    try {
        const author = yield author_1.default.create({
            name,
            bio,
            birthdate,
            isSystemUser,
        });
        res.status(201).json(author);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating author', error });
    }
});
exports.createAuthor = createAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, birthdate, isSystemUser } = req.body;
    try {
        const author = yield author_1.default.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        yield author.update({
            name,
            bio,
            birthdate,
            isSystemUser,
        });
        res.status(200).json(author);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating author', error });
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const author = yield author_1.default.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        yield author.destroy();
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting author', error });
    }
});
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=authorController.js.map