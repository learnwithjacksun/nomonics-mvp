import { Router } from "express";
import { createWithdrawal } from "../controllers/withdrawal.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const withdrawalRouter = Router();

withdrawalRouter.use(authMiddleware);

withdrawalRouter.post("/", createWithdrawal);

export default withdrawalRouter;
