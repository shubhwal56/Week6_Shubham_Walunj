"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
class Review extends sequelize_1.Model {
}
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: pgConfig_1.sequelize,
    modelName: 'Review',
    tableName: 'reviews',
});
Review.belongsTo(user_1.default, { foreignKey: 'userId' });
Review.belongsTo(book_1.default, { foreignKey: 'bookId' });
user_1.default.hasMany(Review, { foreignKey: 'userId' });
book_1.default.hasMany(Review, { foreignKey: 'bookId' });
exports.default = Review;
//# sourceMappingURL=review.js.map