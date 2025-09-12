import { z } from 'zod';

export const idGuard = (req, res, next) => {
    const id = req.params.id;
    const schema = z.string().uuid({ message: 'Geçersiz ID formatı. Geçerli UUID olmalıdır' });
    const parsed = schema.safeParse(id);
    if (!parsed.success) {
        return res.status(400).json({ error: 'VALIDATION_ERROR', errors: [{ path: 'id', message: 'Geçersiz ID formatı. Geçerli UUID olmalıdır' }] });
    }
    next();
};


