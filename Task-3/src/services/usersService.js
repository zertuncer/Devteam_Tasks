import { AppDataSource } from "../data-source.js";
import bcrypt from "bcryptjs";

const mapUser = (u) => ({ id: u.id, username: u.username, email: u.email });

const mapTodo = (t) => ({ id: t.id, title: t.title, description: t.description, completed: t.completed, userId: t.user?.id || null });

export const getAllUsers = async (_req, res) => {
    try {
        const repo = AppDataSource.getRepository('User');
        const all = await repo.find({ order: { created_at: 'DESC' } });
        res.status(200).json(all.map(mapUser));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const repo = AppDataSource.getRepository('User');
        const user = await repo.findOne({ where: { id } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(mapUser(user));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};


export const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const repo = AppDataSource.getRepository('User');
        const password_hash = await bcrypt.hash(password, 10);
        const user = repo.create({ username, email, password_hash });
        try {
            const saved = await repo.save(user);
            res.status(201).json(mapUser(saved));
        } catch (err) {
            // Unique violation
            if (err && err.code === '23505') {
                const detail = String(err.detail || '');
                const field = detail.includes('username') ? 'username' : (detail.includes('email') ? 'email' : 'unknown');
                return res.status(400).json({ error: 'VALIDATION_ERROR', errors: [{ path: field, message: `${field} zaten kullanılıyor` }] });
            }
            throw err;
        }
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const getUserTodos = async (req, res) => {
    try {
        const userId = req.params.id;
        const { completed, page = '1', limit = '10', order = 'desc' } = req.query;

        const usersRepo = AppDataSource.getRepository('User');
        const user = await usersRepo.findOne({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const qb = AppDataSource.getRepository('Todo')
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .where('t.user_id = :userId', { userId })
            .orderBy('t.created_at', order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');

        if (completed !== undefined) {
            qb.andWhere('t.completed = :completed', { completed: completed === 'true' });
        }

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
        qb.skip((pageNum - 1) * limitNum).take(limitNum);

        const items = await qb.getMany();
        res.status(200).json(items.map(mapTodo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};