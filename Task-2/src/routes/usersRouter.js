import express from "express";
import { getAllUsers, getUserById, addUser, getUserTodos } from "../services/usersService.js";
import { validateUserCreate } from "../middleware/validators.js";
import { idGuard } from "../middleware/idGuard.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", idGuard, getUserById);

router.get("/:id/todos", idGuard, getUserTodos);

router.post("/", validateUserCreate, addUser);

export default router;