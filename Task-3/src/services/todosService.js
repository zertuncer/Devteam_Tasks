import { AppDataSource } from "../data-source.js";

const mapTodo = (t) => ({ id: t.id, title: t.title, description: t.description, completed: t.completed, userId: t.user?.id || t.user_id || null });

export const getAllTodos = async (req, res) => {
    try {
        const { completed, q, page = '1', limit = '10', sort = 'createdAt', order = 'desc' } = req.query;
        const qb = AppDataSource.getRepository('Todo').createQueryBuilder('t');

        if (completed !== undefined) {
            qb.andWhere('t.completed = :completed', { completed: completed === 'true' });
        }
        if (q) {
            qb.andWhere('(LOWER(t.title) LIKE :q OR LOWER(t.description) LIKE :q)', { q: `%${String(q).toLowerCase()}%` });
        }

        const sortColumn = sort === 'createdAt' ? 't.created_at' : 't.created_at';
        qb.orderBy(sortColumn, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
        qb.skip((pageNum - 1) * limitNum).take(limitNum);

        const items = await qb.getMany();
        res.status(200).json(items.map(mapTodo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const repo = AppDataSource.getRepository('Todo');
        const todo = await repo.findOne({ where: { id } });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json(mapTodo(todo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const addTodo = async (req, res) => {
    try {
        const { title, description, userId, completed = false } = req.body;
        const usersRepo = AppDataSource.getRepository('User');
        const user = await usersRepo.findOne({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const repo = AppDataSource.getRepository('Todo');
        const todo = repo.create({ title, description, completed, user });
        const saved = await repo.save(todo);
        res.status(201).json(mapTodo(saved));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, completed } = req.body;
        const repo = AppDataSource.getRepository('Todo');
        const todo = await repo.findOne({ where: { id } });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        const saved = await repo.save(todo);
        res.status(200).json(mapTodo(saved));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const repo = AppDataSource.getRepository('Todo');
        const todo = await repo.findOne({ where: { id } });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        await repo.remove(todo);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const patchTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const repo = AppDataSource.getRepository('Todo');
        const todo = await repo.findOne({ where: { id } });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        if (updates.title !== undefined) todo.title = updates.title;
        if (updates.description !== undefined) todo.description = updates.description;
        if (updates.completed !== undefined) todo.completed = updates.completed;
        const saved = await repo.save(todo);
        res.status(200).json(mapTodo(saved));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};