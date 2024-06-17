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
exports.syncDatabase = void 0;
// associations.ts
const pgConfig_1 = require("../postgresDB/pgConfig");
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
const review_1 = __importDefault(require("../models/review"));
const rating_1 = __importDefault(require("../models/rating"));
const user_1 = __importDefault(require("../models/user"));
const order_1 = __importDefault(require("../models/order"));
// Define associations here
book_1.default.belongsToMany(author_1.default, { through: 'BookAuthors' });
author_1.default.belongsToMany(book_1.default, { through: 'BookAuthors' });
book_1.default.belongsTo(author_1.default, { foreignKey: 'authorId' });
book_1.default.hasMany(review_1.default);
review_1.default.belongsTo(book_1.default);
book_1.default.hasMany(rating_1.default);
rating_1.default.belongsTo(book_1.default);
user_1.default.hasMany(review_1.default, { foreignKey: 'userId' });
review_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(rating_1.default, { foreignKey: 'userId' });
rating_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
book_1.default.hasMany(order_1.default, { foreignKey: 'bookId' });
order_1.default.belongsTo(book_1.default, { foreignKey: 'bookId' });
user_1.default.hasMany(order_1.default, { foreignKey: 'userId' });
order_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
// Sync all defined models with the database
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgConfig_1.sequelize.sync();
        console.log('Database synced');
    }
    catch (error) {
        console.error('Unable to sync database:', error);
    }
});
exports.syncDatabase = syncDatabase;
//# sourceMappingURL=associations.js.map