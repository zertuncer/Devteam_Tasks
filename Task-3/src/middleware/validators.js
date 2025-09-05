import { z } from 'zod';

const sendZodError = (res, zerr) => {
    const errors = zerr.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    return res.status(400).json({ error: 'VALIDATION_ERROR', errors });
};

export const validateUserCreate = (req, res, next) => {
    const schema = z.object({
        username: z.string().min(1, 'username zorunludur'),
        email: z.string().email('geçersiz email'),
        password: z.string().min(1, 'password zorunludur'),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return sendZodError(res, parsed.error);
    next();
};

export const validateTodoCreate = (req, res, next) => {
    const schema = z.object({
        title: z.string().min(1, 'title zorunludur'),
        description: z.string().min(1, 'description zorunludur'),
        userId: z.string().uuid('userId uuid olmalıdır'),
        completed: z.boolean().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return sendZodError(res, parsed.error);
    next();
};

export const validateTodoUpdate = (req, res, next) => {
    if (req.method === 'PUT') {
        const putSchema = z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            completed: z.boolean(),
        });
        const parsed = putSchema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        return next();
    }

    if (req.method === 'PATCH') {
        const patchSchema = z.object({
            title: z.string().min(1).optional(),
            description: z.string().min(1).optional(),
            completed: z.boolean().optional(),
        }).refine(data => Object.keys(data).length > 0, { message: 'En az bir alan gerekli' });
        const parsed = patchSchema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        return next();
    }

    return res.status(400).json({ error: 'VALIDATION_ERROR', errors: [{ path: 'method', message: 'Geçersiz istek' }] });
};

export const validateTodosQuery = (req, res, next) => {
    const schema = z.object({
        completed: z.enum(['true', 'false']).optional(),
        q: z.string().optional(),
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sort: z.enum(['createdAt']).optional(),
        order: z.enum(['asc', 'desc']).optional(),
    });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) return sendZodError(res, parsed.error);
    next();
};

export const validateUserTodosQuery = (req, res, next) => {
    const schema = z.object({
        completed: z.enum(['true', 'false']).optional(),
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
    });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) return sendZodError(res, parsed.error);
    next();
};


