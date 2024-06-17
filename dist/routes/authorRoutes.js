"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/authors', appController_1.getAuthors);
router.get('/authors/:id', appController_1.getAuthorById);
router.post('/authors', authMiddleware_1.authenticate, appController_1.createAuthor); // Admin only
router.put('/authors/:id', authMiddleware_1.authenticate, appController_1.updateAuthor); // Admin only
router.delete('/authors/:id', authMiddleware_1.authenticate, appController_1.deleteAuthor); // Admin only
exports.default = router;
//# sourceMappingURL=authorRoutes.js.map