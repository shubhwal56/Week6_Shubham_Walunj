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
exports.initDB = void 0;
const pgConfig_1 = require("./pgConfig");
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const order_1 = __importDefault(require("../models/order"));
const author_1 = __importDefault(require("../models/author"));
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    book_1.default.belongsToMany(author_1.default, { through: 'BookAuthors' });
    author_1.default.belongsToMany(book_1.default, { through: 'BookAuthors' });
    user_1.default.hasMany(order_1.default, { foreignKey: 'userId' });
    book_1.default.hasMany(order_1.default, { foreignKey: 'bookId' });
    order_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    order_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
    yield pgConfig_1.sequelize.sync();
});
exports.initDB = initDB;
//# sourceMappingURL=pgService.js.map