"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/books/:bookId/ratings', appController_1.getRatings);
router.post('/books/:bookId/ratings', authMiddleware_1.authenticate, appController_1.addRating);
exports.default = router;
//# sourceMappingURL=ratingRoutes.js.map