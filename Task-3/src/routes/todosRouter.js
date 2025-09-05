import express from "express";
import { getAllTodos, getTodoById, addTodo, updateTodo, patchTodo, deleteTodo } from "../services/todosService.js";
import { idGuard } from "../middleware/idGuard.js";
import { validateTodoCreate, validateTodoUpdate, validateTodosQuery } from "../middleware/validators.js";

const router = express.Router();

router.get("/", validateTodosQuery, getAllTodos);

router.get("/:id", idGuard, getTodoById);

router.post("/", validateTodoCreate, addTodo);

router.put("/:id", idGuard, validateTodoUpdate, updateTodo);

router.patch("/:id", idGuard, validateTodoUpdate, patchTodo);

router.delete("/:id", idGuard, deleteTodo);

export default router;