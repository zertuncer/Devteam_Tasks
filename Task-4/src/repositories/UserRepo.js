import { AppDataSource } from '../data-source.js';

export class UserRepo {
    constructor() {
        this.repository = AppDataSource.getRepository('User');
    }

    async findAll() {
        return await this.repository.find({ order: { created_at: 'DESC' } });
    }

    async findById(id) {
        return await this.repository.findOne({ where: { id } });
    }

    async findByEmail(email) {
        return await this.repository.findOne({ where: { email } });
    }

    async create(userData) {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    async update(id, userData) {
        await this.repository.update(id, userData);
        return await this.findById(id);
    }

    async delete(id) {
        const user = await this.findById(id);
        if (user) {
            await this.repository.remove(user);
        }
        return user;
    }
}
