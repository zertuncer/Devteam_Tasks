import { users } from '../db/User.js';

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const sendError = (res, message) => {
    return res.status(400).json({ 
        error: "VALIDATION_ERROR",
        message 
    });
};

const validateRequired = (fields, req, res) => {
    for (const field of fields) {
        if (!req.body[field]) {
            return sendError(res, `${field} zorunludur`);
        }
        if (typeof req.body[field] !== 'string') {
            return sendError(res, `${field} metin olmalıdır`);
        }
        if (req.body[field].trim() === '') {
            return sendError(res, `${field} boş olamaz`);
        }
    }
    return true;
};

export const validateUserCreate = (req, res, next) => {
    const { username, email, password } = req.body;
    
    const requiredCheck = validateRequired(['username', 'email', 'password'], req, res);
    if (requiredCheck !== true) return requiredCheck;
    
    if (!isValidEmail(email)) {
        return sendError(res, "Geçersiz email formatı");
    }
    
    if (users.find(user => user.email === email)) {
        return sendError(res, "Bu email zaten kullanılıyor");
    }
    
    next();
};

export const validateTodoCreate = (req, res, next) => {
    const { title, description, userId } = req.body;
    
    const requiredCheck = validateRequired(['title', 'description', 'userId'], req, res);
    if (requiredCheck !== true) return requiredCheck;
    
    if (!users.find(user => user.id === userId)) {
        return sendError(res, "Kullanıcı bulunamadı");
    }
    
    next();
};

export const validateTodoUpdate = (req, res, next) => {
    const { title, description, completed } = req.body;
    
    if (req.method === 'PUT') {
        if (title === undefined || description === undefined || completed === undefined) {
            return sendError(res, "Tam güncelleme için title, description ve completed zorunludur");
        }
    }
    
    if (req.method === 'PATCH') {
        if (title === undefined && description === undefined && completed === undefined) {
            return sendError(res, "En az bir alan (title, description veya completed) gerekli");
        }
    }
    
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return sendError(res, "Title boş metin olamaz");
        }
    }
    
    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim() === '') {
            return sendError(res, "Description boş metin olamaz");
        }
    }
    
    if (completed !== undefined && typeof completed !== 'boolean') {
        return sendError(res, "Completed boolean olmalıdır");
    }
    
    next();
};
