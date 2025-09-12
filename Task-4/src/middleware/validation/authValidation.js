import { z } from 'zod';
import { AppError } from '../utils/AppError.js';

const sendZodError = (res, zerr) => {
    const error = new Error('Validation failed');
    error.name = 'ZodError';
    error.errors = zerr.errors;
    throw error;
};

export const validateRegister = (req, res, next) => {
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

export const validateLogin = (req, res, next) => {
    try {
        const schema = z.object({
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

export const validateRequestElevatedToken = (req, res, next) => {
    try {
        const schema = z.object({
            action: z.enum(['changeEmail', 'changePassword'], {
                errorMap: () => ({ message: 'action must be changeEmail or changePassword' })
            }),
        });
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateChangeEmail = (req, res, next) => {
    try {
        const schema = z.object({
            newEmail: z.string().email('geçersiz email'),
        });
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateChangePassword = (req, res, next) => {
    try {
        const schema = z.object({
            newPassword: z.string().min(1, 'newPassword zorunludur'),
        });
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) return sendZodError(res, parsed.error);
        next();
    } catch (error) {
        next(error);
    }
};
