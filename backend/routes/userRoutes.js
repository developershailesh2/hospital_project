import express from "express";
import {
  forgotPassword,
  getUsers,
  registerUser,
  resetPassword,
  userLogin,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register-user", registerUser);
router.post("/user-login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
