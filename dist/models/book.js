"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
const author_1 = __importDefault(require("./author"));
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    publishedYear: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    externalId: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: pgConfig_1.sequelize,
    modelName: 'Book',
    tableName: 'books',
});
Book.belongsToMany(author_1.default, { through: 'BookAuthors' });
author_1.default.belongsToMany(Book, { through: 'BookAuthors' });
exports.default = Book;
//# sourceMappingURL=book.js.map