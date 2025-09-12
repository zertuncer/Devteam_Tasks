import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export function authAccess(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(401, 'Authorization header is required');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        if (!token) {
            throw new AppError(401, 'Access token is required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
        
        if (decoded.isAdmin) {
            req.isAdmin = true;
            req.adminEmail = decoded.adminEmail;
        } else {
            req.userId = decoded.userId;
        }
        
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError(401, 'Invalid access token'));
        } else if (error instanceof jwt.TokenExpiredError) {
            next(new AppError(401, 'Access token expired'));
        } else {
            next(error);
        }
    }
}
