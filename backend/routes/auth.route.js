import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectd-route.js";

const router = express.Router();

router.get("/check-auth", protectedRoute, checkAuth);
router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetPasswordToken", resetPassword);

export default router;
