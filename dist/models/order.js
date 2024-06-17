"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
class Order extends sequelize_1.Model {
}
Order.init({
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
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }
}, {
    sequelize: pgConfig_1.sequelize,
    modelName: 'Order',
    tableName: 'orders',
});
Order.belongsTo(user_1.default, { foreignKey: 'userId' });
Order.belongsTo(book_1.default, { foreignKey: 'bookId' });
user_1.default.hasMany(Order, { foreignKey: 'userId' });
book_1.default.hasMany(Order, { foreignKey: 'bookId' });
exports.default = Order;
//# sourceMappingURL=order.js.map