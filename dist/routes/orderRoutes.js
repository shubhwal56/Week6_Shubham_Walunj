"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/orders', authMiddleware_1.authenticate, appController_1.createOrder);
router.get('/orders/:id', authMiddleware_1.authenticate, appController_1.getOrderById);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map