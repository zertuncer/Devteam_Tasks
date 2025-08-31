import express from "express";
import { getAllTodos, getTodoById, addTodo, updateTodo, patchTodo, deleteTodo } from "../services/todosService.js";
import { validateTodoCreate, validateTodoUpdate } from "../middleware/validators.js";
import { idGuard } from "../middleware/idGuard.js";

const router = express.Router();

router.get("/", getAllTodos);

router.get("/:id", idGuard, getTodoById);

router.post("/", validateTodoCreate, addTodo);

router.put("/:id", idGuard, validateTodoUpdate, updateTodo);

router.patch("/:id", idGuard, validateTodoUpdate, patchTodo);

router.delete("/:id", idGuard, deleteTodo);

export default router;