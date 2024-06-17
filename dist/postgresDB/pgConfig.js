"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { USER = 'postgres', HOST_NAME = 'localhost', DATABASE = 'bookstore', PASSWORD = 'Shubham@123', PORTNAME = '3000' } = process.env;
exports.sequelize = new sequelize_1.Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    port: parseInt(PORTNAME),
    host: HOST_NAME,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectModule: pg_1.default,
    logging: console.log
});
exports.sequelize.authenticate().then(() => {
    console.log("Database connection successful");
    exports.sequelize.sync({ alter: true }).then(() => {
        console.log("All models were synchronized successfully.");
    }).catch((error) => {
        console.error("Error synchronizing models:", error);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});
//# sourceMappingURL=pgConfig.js.map