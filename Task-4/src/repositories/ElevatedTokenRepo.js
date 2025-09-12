import { AppDataSource } from '../data-source.js';

export class ElevatedTokenRepo {
    constructor() {
        this.repository = AppDataSource.getRepository('ElevatedToken');
    }

    async findByToken(token) {
        return await this.repository.findOne({ 
            where: { token },
            relations: ['user']
        });
    }

    async create(tokenData) {
        const token = this.repository.create(tokenData);
        return await this.repository.save(token);
    }

    async markAsUsed(token) {
        await this.repository.update({ token }, { used: true });
    }

    async deleteExpired() {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where('expiresAt < :now', { now: new Date() })
            .execute();
    }
}
