"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorRoutes_1 = __importDefault(require("./authorRoutes"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const ratingRoutes_1 = __importDefault(require("./ratingRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
router.use('/authors', authorRoutes_1.default);
router.use('/books', bookRoutes_1.default);
router.use('/reviews', reviewRoutes_1.default);
router.use('/ratings', ratingRoutes_1.default);
router.use(userRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map