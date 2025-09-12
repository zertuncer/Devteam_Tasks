import { z } from 'zod';

const sendZodError = (res, zerr) => {
    const error = new Error('Validation failed');
    error.name = 'ZodError';
    error.errors = zerr.errors;
    throw error;
};

export const validateUserCreate = (req, res, next) => {
    try {
        const schema = z.object({
            username: z.string().min(1, 'username zorunludur'),
            email: z.string().email('geçersiz email'),
            password: z.string().min(1, 'password zorunludur'),
        });
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateUserTodosQuery = (req, res, next) => {
    try {
        const schema = z.object({
            completed: z.enum(['true', 'false']).optional(),
            page: z.string().regex(/^\d+$/).optional(),
            limit: z.string().regex(/^\d+$/).optional(),
        });
        const parsed = schema.safeParse(req.query);
        if (!parsed.success) return sendZodError(res, parsed.error);
        next();
    } catch (error) {
        next(error);
    }
};
