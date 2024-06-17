import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

interface User {
    id: number;
    username: string;
    email: string; 
    isAdmin?: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = verifyToken(token) as User; 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
