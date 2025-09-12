import { getAllTodos, getTodoById, addTodo, updateTodo, patchTodo, deleteTodo } from "../services/todosService.js";
import { controllerResponseHandler } from "../middleware/utils/controllerResponseHandler.js";

export const getAllTodosController = controllerResponseHandler(async (req, res) => {
    await getAllTodos(req, res);
});

export const getTodoByIdController = controllerResponseHandler(async (req, res) => {
    await getTodoById(req, res);
});

export const addTodoController = controllerResponseHandler(async (req, res) => {
    await addTodo(req, res);
});

export const updateTodoController = controllerResponseHandler(async (req, res) => {
    await updateTodo(req, res);
});

export const patchTodoController = controllerResponseHandler(async (req, res) => {
    await patchTodo(req, res);
});

export const deleteTodoController = controllerResponseHandler(async (req, res) => {
    await deleteTodo(req, res);
});
