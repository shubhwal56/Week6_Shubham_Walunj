"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/books', appController_1.getBooks);
router.get('/books/:id', appController_1.getBookById);
router.post('/books', authMiddleware_1.authenticate, appController_1.createBook); // Admin only 
router.put('/books/:id', authMiddleware_1.authenticate, appController_1.updateBook); // Admin only
router.delete('/books/:id', authMiddleware_1.authenticate, appController_1.deleteBook); // Admin only
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map