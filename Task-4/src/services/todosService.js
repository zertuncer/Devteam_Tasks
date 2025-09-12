import { TodoRepo } from "../repositories/TodoRepo.js";
import { AppError } from "../middleware/utils/AppError.js";

const mapTodo = (t) => ({ id: t.id, title: t.title, description: t.description, completed: t.completed, userId: t.user?.id || t.user_id || null });

export const getAllTodos = async (req, res) => {
    try {
        const { completed, q, page = '1', limit = '10', sort = 'createdAt', order = 'desc' } = req.query;
        
        // Only return todos for the authenticated user
        const userId = req.userId;

        const todoRepo = new TodoRepo();
        const items = await todoRepo.findAllByUserId(userId, {
            completed: completed === 'true' ? true : completed === 'false' ? false : undefined,
            q,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            order
        });

        res.status(200).json(items.map(mapTodo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        
        const todoRepo = new TodoRepo();
        const todo = await todoRepo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        // Check if todo belongs to the authenticated user
        const todoUserId = todo.user_id || todo.user?.id;
        if (todoUserId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        res.status(200).json(mapTodo(todo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const addTodo = async (req, res) => {
    try {
        const { title, description, completed = false } = req.body;
        const userId = req.userId;
        
        const todoRepo = new TodoRepo();
        const todo = await todoRepo.create({ title, description, completed, user_id: userId });
        res.status(201).json(mapTodo(todo));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, completed } = req.body;
        const userId = req.userId;
        
        const todoRepo = new TodoRepo();
        const todo = await todoRepo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        // Check if todo belongs to the authenticated user
        const todoUserId = todo.user_id || todo.user?.id;
        if (todoUserId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        const updated = await todoRepo.update(id, { title, description, completed });
        res.status(200).json(mapTodo(updated));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        
        const todoRepo = new TodoRepo();
        const todo = await todoRepo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        // Check if todo belongs to the authenticated user
        const todoUserId = todo.user_id || todo.user?.id;
        if (todoUserId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        await todoRepo.delete(id);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};

export const patchTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const userId = req.userId;
        
        const todoRepo = new TodoRepo();
        const todo = await todoRepo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        // Check if todo belongs to the authenticated user
        const todoUserId = todo.user_id || todo.user?.id;
        if (todoUserId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        const updateData = {};
        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.completed !== undefined) updateData.completed = updates.completed;
        
        const updated = await todoRepo.update(id, updateData);
        res.status(200).json(mapTodo(updated));
    } catch (e) {
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server hatası' });
    }
};