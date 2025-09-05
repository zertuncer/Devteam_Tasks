export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
        return res.status(400).json({ error: 'VALIDATION_ERROR', errors });
    }
    next();
};

export const validateParams = (shape) => (req, res, next) => {
    const entries = Object.entries(shape);
    for (const [key, schema] of entries) {
        const r = schema.safeParse(req.params[key]);
        if (!r.success) {
            const errors = r.error.errors.map(e => ({ path: [key].concat(e.path).join('.'), message: e.message }));
            return res.status(400).json({ error: 'VALIDATION_ERROR', errors });
        }
    }
    next();
};

export const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        const errors = result.error.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
        return res.status(400).json({ error: 'VALIDATION_ERROR', errors });
    }
    next();
};


