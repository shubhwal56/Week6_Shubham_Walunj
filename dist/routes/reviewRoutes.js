"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/books/:bookId/reviews', appController_1.getReviews);
router.post('/books/:bookId/reviews', authMiddleware_1.authenticate, appController_1.addReview);
router.delete('/reviews/:id', authMiddleware_1.authenticate, appController_1.deleteReview);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map