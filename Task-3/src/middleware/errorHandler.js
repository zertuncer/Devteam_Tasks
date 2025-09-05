export const notFoundHandler = (req, res) => {
    res.status(404).json({ 
        error: "ENDPOINT_NOT_FOUND",
        message: `Route ${req.method} ${req.originalUrl} bulunamadı`
    });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).json({ 
        error: "INTERNAL_SERVER_ERROR",
        message: "Server hatası"
    });
};
