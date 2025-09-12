import { AppDataSource } from '../data-source.js';

export class TodoRepo {
    constructor() {
        this.repository = AppDataSource.getRepository('Todo');
    }

    async findAllByUserId(userId, options = {}) {
        const { completed, q, page = 1, limit = 10, order = 'desc' } = options;
        
        const qb = this.repository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .where('t.user_id = :userId', { userId })
            .orderBy('t.created_at', order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');

        if (completed !== undefined) {
            qb.andWhere('t.completed = :completed', { completed });
        }
        
        if (q) {
            qb.andWhere('(LOWER(t.title) LIKE :q OR LOWER(t.description) LIKE :q)', { 
                q: `%${String(q).toLowerCase()}%` 
            });
        }

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
        qb.skip((pageNum - 1) * limitNum).take(limitNum);

        return await qb.getMany();
    }

    async findAll(options = {}) {
        const { completed, q, page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = options;
        
        const qb = this.repository.createQueryBuilder('t');

        if (completed !== undefined) {
            qb.andWhere('t.completed = :completed', { completed });
        }
        if (q) {
            qb.andWhere('(LOWER(t.title) LIKE :q OR LOWER(t.description) LIKE :q)', { 
                q: `%${String(q).toLowerCase()}%` 
            });
        }

        const sortColumn = sort === 'createdAt' ? 't.created_at' : 't.created_at';
        qb.orderBy(sortColumn, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
        qb.skip((pageNum - 1) * limitNum).take(limitNum);

        return await qb.getMany();
    }

    async findById(id) {
        return await this.repository.findOne({ 
            where: { id },
            relations: ['user']
        });
    }

    async create(todoData) {
        const todo = this.repository.create(todoData);
        return await this.repository.save(todo);
    }

    async update(id, todoData) {
        await this.repository.update(id, todoData);
        return await this.findById(id);
    }

    async delete(id) {
        const todo = await this.findById(id);
        if (todo) {
            await this.repository.remove(todo);
        }
        return todo;
    }
}
