import express from "express";
import { getAllTodosController, getTodoByIdController, addTodoController, updateTodoController, patchTodoController, deleteTodoController } from "../controllers/todosController.js";
import { idGuard } from "../middleware/idGuard.js";
import { validateTodoCreate, validateTodoUpdate, validateTodosQuery } from "../middleware/validation/todoValidation.js";
import { authAccess } from "../middleware/auth/authAccess.js";

const router = express.Router();

// All todo endpoints require authentication
router.use(authAccess);

router.get("/", validateTodosQuery, getAllTodosController);

router.get("/:id", idGuard, getTodoByIdController);

router.post("/", validateTodoCreate, addTodoController);

router.put("/:id", idGuard, validateTodoUpdate, updateTodoController);

router.patch("/:id", idGuard, validateTodoUpdate, patchTodoController);

router.delete("/:id", idGuard, deleteTodoController);

export default router;