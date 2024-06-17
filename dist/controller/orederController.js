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
exports.getOrderById = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const book_1 = __importDefault(require("../models/book"));
const user_1 = __importDefault(require("../models/user"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, amount, status } = req.body;
    const order = yield order_1.default.create({
        bookId,
        amount,
        status,
        userId: req.user.id,
        createdAt: new Date(),
    });
    res.status(201).json(order);
});
exports.createOrder = createOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findByPk(req.params.id, {
        include: [book_1.default, user_1.default],
    });
    res.json(order);
});
exports.getOrderById = getOrderById;
//# sourceMappingURL=orederController.js.map