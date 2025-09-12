import express from "express";
import { register, login, requestElevatedToken, changeEmail, changePassword } from "../controllers/authController.js";
import { validateRegister, validateLogin, validateRequestElevatedToken, validateChangeEmail, validateChangePassword } from "../middleware/validation/authValidation.js";
import { authAccess } from "../middleware/auth/authAccess.js";
import { authElevated } from "../middleware/auth/authElevated.js";

const router = express.Router();

// Public endpoints
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Protected endpoints - these should be under /me
// router.post("/request-elevated-token", authAccess, validateRequestElevatedToken, requestElevatedToken);
// router.post("/change-email/:token", authAccess, authElevated('changeEmail'), validateChangeEmail, changeEmail);
// router.post("/change-password/:token", authAccess, authElevated('changePassword'), validateChangePassword, changePassword);

export default router;
