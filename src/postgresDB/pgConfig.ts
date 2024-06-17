import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    USER = 'postgres',
    HOST_NAME = 'localhost',
    DATABASE = 'bookstore',
    PASSWORD = 'Shubham@123',
    PORTNAME = '3000'
} = process.env;

export const sequelize = new Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    port: parseInt(PORTNAME),
    host: HOST_NAME,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectModule: pg,
    logging: console.log
});

sequelize.authenticate().then(() => {
    console.log("Database connection successful");
    
    sequelize.sync({ alter: true }).then(() => {
        console.log("All models were synchronized successfully.");
    }).catch((error) => {
        console.error("Error synchronizing models:", error);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});
