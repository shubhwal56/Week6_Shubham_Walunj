import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | string => {
    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
