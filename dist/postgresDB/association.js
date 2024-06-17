"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
const author_1 = __importDefault(require("../models/author"));
const user_1 = __importDefault(require("../models/user"));
const review_1 = __importDefault(require("../models/review"));
const rating_1 = __importDefault(require("../models/rating"));
const payment_1 = __importDefault(require("../models/payment"));
const order_1 = __importDefault(require("../models/order"));
// Book and Author many-to-many relationship
book_1.default.belongsToMany(author_1.default, { through: 'BookAuthors' });
author_1.default.belongsToMany(book_1.default, { through: 'BookAuthors' });
// User and Review one-to-many relationship
user_1.default.hasMany(review_1.default, { foreignKey: 'userId' });
review_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
// Book and Review one-to-many relationship
book_1.default.hasMany(review_1.default, { foreignKey: 'bookId' });
review_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
// User and Rating one-to-many relationship
user_1.default.hasMany(rating_1.default, { foreignKey: 'userId' });
rating_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
// Book and Rating one-to-many relationship
book_1.default.hasMany(rating_1.default, { foreignKey: 'bookId' });
rating_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
// User and Payment one-to-many relationship
user_1.default.hasMany(payment_1.default, { foreignKey: 'userId' });
payment_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
// Book and Payment one-to-many relationship
book_1.default.hasMany(payment_1.default, { foreignKey: 'bookId' });
payment_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
// User and Order one-to-many relationship
user_1.default.hasMany(order_1.default, { foreignKey: 'userId' });
order_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
// Book and Order one-to-many relationship
book_1.default.hasMany(order_1.default, { foreignKey: 'bookId' });
order_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
//# sourceMappingURL=association.js.map