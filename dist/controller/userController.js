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
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jwtUtils_1 = require("../utils/jwtUtils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, isAdmin } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            username,
            password: hashedPassword,
            email,
            isAdmin
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({ where: { username } });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const token = (0, jwtUtils_1.generateToken)(user);
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(req.user.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=userController.js.map