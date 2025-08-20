import { Router } from "express";
import { adminLogin, checkAuth, forgotPassword, login, register, resendOtp, resetPassword, verifyOtp } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/admin/login", adminLogin)
authRouter.post("/verify", authMiddleware, verifyOtp)
authRouter.post("/resend", resendOtp)
authRouter.get("/check", authMiddleware, checkAuth)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)


export default authRouter