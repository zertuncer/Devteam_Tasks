import { MeService } from '../services/meService.js';
import { controllerResponseHandler } from '../middleware/utils/controllerResponseHandler.js';

const meService = new MeService();

export const getProfile = controllerResponseHandler(async (req, res) => {
    const profile = await meService.getProfile(req.userId, req.isAdmin, req.adminEmail);
    res.status(200).json(profile);
});
