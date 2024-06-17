"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorController_1 = require("../controller/authorController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authorController_1.getAuthors);
router.get('/:id', authorController_1.getAuthorById);
router.post('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, authorController_1.createAuthor);
router.put('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, authorController_1.updateAuthor);
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, authorController_1.deleteAuthor);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map