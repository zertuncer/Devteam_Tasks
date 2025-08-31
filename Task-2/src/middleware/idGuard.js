const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};

export const idGuard = (req, res, next) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ 
            error: "VALIDATION_ERROR",
            message: "ID parametresi zorunludur" 
        });
    }
    
    if (!isValidUUID(id)) {
        return res.status(400).json({ 
            error: "VALIDATION_ERROR",
            message: "Geçersiz ID formatı. Geçerli UUID olmalıdır" 
        });
    }
    
    next();
};
