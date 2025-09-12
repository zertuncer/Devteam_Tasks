import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export const createUserSchema = z.object({
    username: z.string().min(1, 'username zorunludur'),
    email: z.string().email('geçersiz email'),
    password: z.string().min(1, 'password zorunludur'),
});

export const createTodoSchema = z.object({
    title: z.string().min(1, 'title zorunludur'),
    description: z.string().min(1, 'description zorunludur'),
    userId: uuidSchema,
    completed: z.boolean().optional(),
});

export const updateTodoPutSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    completed: z.boolean(),
});

export const updateTodoPatchSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    completed: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'En az bir alan gerekli',
});

export const todoQuerySchema = z.object({
    completed: z.enum(['true', 'false']).optional(),
    q: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    sort: z.enum(['createdAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
});

export const userTodosQuerySchema = z.object({
    completed: z.enum(['true', 'false']).optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
});


