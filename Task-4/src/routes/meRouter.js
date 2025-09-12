import express from "express";
import { getProfile } from "../controllers/meController.js";
import { requestElevatedToken, changeEmail, changePassword } from "../controllers/authController.js";
import { authAccess } from "../middleware/auth/authAccess.js";
import { authElevated } from "../middleware/auth/authElevated.js";
import { validateRequestElevatedToken, validateChangeEmail, validateChangePassword } from "../middleware/validation/authValidation.js";

const router = express.Router();

// All /me endpoints require authentication
router.use(authAccess);

router.get("/", getProfile);

router.post("/request-elevated-token", validateRequestElevatedToken, requestElevatedToken);
router.post("/change-email/:token", authElevated('changeEmail'), validateChangeEmail, changeEmail);
router.post("/change-password/:token", authElevated('changePassword'), validateChangePassword, changePassword);

export default router;
