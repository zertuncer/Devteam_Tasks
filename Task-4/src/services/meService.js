import { UserRepo } from '../repositories/UserRepo.js';
import { AppError } from '../middleware/utils/AppError.js';

export class MeService {
    constructor() {
        this.userRepo = new UserRepo();
    }

    async getProfile(userId, isAdmin, adminEmail) {
        if (isAdmin) {
            return { adminEmail };
        }

        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new AppError(404, 'User not found');
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }
}
