"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = require("../controller/appController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', appController_1.registerUser);
router.post('/login', appController_1.loginUser);
router.get('/users/me', authMiddleware_1.authenticate, appController_1.getCurrentUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map