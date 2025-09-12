import { AuthService } from '../services/authService.js';
import { controllerResponseHandler } from '../middleware/utils/controllerResponseHandler.js';

const authService = new AuthService();

export const register = controllerResponseHandler(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(201).json(user);
});

export const login = controllerResponseHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json(result);
});

export const requestElevatedToken = controllerResponseHandler(async (req, res) => {
    await authService.requestElevatedToken(req.userId, req.body.action);
    res.status(204).send();
});

export const changeEmail = controllerResponseHandler(async (req, res) => {
    const result = await authService.changeEmail(req.userId, req.body.newEmail, req.params.token);
    res.status(200).json(result);
});

export const changePassword = controllerResponseHandler(async (req, res) => {
    await authService.changePassword(req.userId, req.body.newPassword);
    res.status(204).send();
});
