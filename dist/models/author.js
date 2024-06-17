"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("../postgresDB/pgConfig");
class Author extends sequelize_1.Model {
}
Author.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
    },
    birthdate: {
        type: sequelize_1.DataTypes.DATE,
    },
    isSystemUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    sequelize: pgConfig_1.sequelize,
    modelName: 'Author',
    tableName: 'authors',
});
exports.default = Author;
//# sourceMappingURL=author.js.map