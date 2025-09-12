import { getAllUsers, getUserById, addUser, getUserTodos } from "../services/usersService.js";
import { controllerResponseHandler } from "../middleware/utils/controllerResponseHandler.js";

export const getAllUsersController = controllerResponseHandler(async (req, res) => {
    await getAllUsers(req, res);
});

export const getUserByIdController = controllerResponseHandler(async (req, res) => {
    await getUserById(req, res);
});

export const addUserController = controllerResponseHandler(async (req, res) => {
    await addUser(req, res);
});

export const getUserTodosController = controllerResponseHandler(async (req, res) => {
    await getUserTodos(req, res);
});
