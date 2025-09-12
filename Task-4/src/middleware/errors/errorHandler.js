export const notFoundHandler = (req, res) => {
    res.status(404).json({ 
        error: "ENDPOINT_NOT_FOUND",
        message: `Route ${req.method} ${req.originalUrl} bulunamadı`
    });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // If it's a validation error from Zod, return the original format
    if (err.name === 'ZodError') {
        const errors = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
        return res.status(400).json({ error: 'VALIDATION_ERROR', errors });
    }
    
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    
    res.status(status).json({ status, message });
};
