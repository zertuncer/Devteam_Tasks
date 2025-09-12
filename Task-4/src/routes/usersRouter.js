import express from "express";
import { getAllUsersController, getUserByIdController, addUserController, getUserTodosController } from "../controllers/usersController.js";
import { validateUserCreate, validateUserTodosQuery } from "../middleware/validation/userValidation.js";
import { idGuard } from "../middleware/idGuard.js";
import { authAccess } from "../middleware/auth/authAccess.js";

const router = express.Router();

// Admin only endpoints
router.get("/", authAccess, (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
}, getAllUsersController);

router.get("/:id", authAccess, (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
}, idGuard, getUserByIdController);

router.get("/:id/todos", authAccess, (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
}, idGuard, validateUserTodosQuery, getUserTodosController);

// Public endpoint for user registration
router.post("/", validateUserCreate, addUserController);

export default router;