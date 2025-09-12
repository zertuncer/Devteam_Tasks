export const notFoundHandler = (req, res) => {
    res.status(404).json({ 
        error: "ENDPOINT_NOT_FOUND",
        message: `Route ${req.method} ${req.originalUrl} bulunamadı`
    });
};
