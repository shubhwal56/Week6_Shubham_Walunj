"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
class Rating extends sequelize_1.Model {
}
Rating.init({
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
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: pgConfig_1.sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
});
Rating.belongsTo(user_1.default, { foreignKey: 'userId' });
Rating.belongsTo(book_1.default, { foreignKey: 'bookId' });
user_1.default.hasMany(Rating, { foreignKey: 'userId' });
book_1.default.hasMany(Rating, { foreignKey: 'bookId' });
exports.default = Rating;
//# sourceMappingURL=rating.js.map