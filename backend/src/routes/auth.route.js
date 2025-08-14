import { Router } from "express";
import { checkAuth, login, register, resendOtp, verifyOtp } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/verify", authMiddleware, verifyOtp)
authRouter.post("/resend", resendOtp)
authRouter.get("/check", authMiddleware, checkAuth)

export default authRouter