import { ElevatedTokenRepo } from '../../repositories/ElevatedTokenRepo.js';
import { AppError } from '../utils/AppError.js';

export function authElevated(action) {
    return async (req, res, next) => {
        try {
            const token = req.params.token;
            
            if (!token) {
                throw new AppError(401, 'Elevated token is required');
            }

            const elevatedTokenRepo = new ElevatedTokenRepo();
            const elevatedToken = await elevatedTokenRepo.findByToken(token);
            
            if (!elevatedToken) {
                throw new AppError(401, 'Invalid elevated token');
            }

            if (elevatedToken.used) {
                throw new AppError(401, 'Elevated token already used');
            }

            if (elevatedToken.expiresAt < new Date()) {
                throw new AppError(401, 'Elevated token expired');
            }

            if (elevatedToken.action !== action) {
                throw new AppError(403, 'Elevated token action mismatch');
            }

            if (elevatedToken.userId !== req.userId) {
                throw new AppError(403, 'Elevated token user mismatch');
            }

            // Mark token as used
            await elevatedTokenRepo.markAsUsed(token);
            
            next();
        } catch (error) {
            next(error);
        }
    };
}
