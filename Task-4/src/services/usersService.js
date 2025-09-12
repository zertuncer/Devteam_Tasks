import { UserRepo } from "../repositories/UserRepo.js";
import { TodoRepo } from "../repositories/TodoRepo.js";
import { AppError } from "../middleware/utils/AppError.js";
import bcrypt from "bcryptjs";

const mapUser = (u) => ({ id: u.id, username: u.username, email: u.email });

const mapTodo = (t) => ({ id: t.id, title: t.title, description: t.description, completed: t.completed, userId: t.user?.id || null });

export const getAllUsers = async (_req, res) => {
    try {
        const userRepo = new UserRepo();
        const all = await userRepo.findAll();
        res.status(200).json(all.map(mapUser));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userRepo = new UserRepo();
        const user = await userRepo.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(mapUser(user));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};


export const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userRepo = new UserRepo();
        const password_hash = await bcrypt.hash(password, 10);
        try {
            const saved = await userRepo.create({ username, email, password_hash });
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

        const userRepo = new UserRepo();
        const user = await userRepo.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const todoRepo = new TodoRepo();
        const items = await todoRepo.findAllByUserId(userId, {
            completed: completed === 'true' ? true : completed === 'false' ? false : undefined,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            order
        });

        res.status(200).json(items.map(mapTodo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};