import { Router } from "express";
import { buyCredit, getTransactions } from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.post("/buy-credit", authMiddleware, buyCredit);
transactionRouter.get("/", authMiddleware, getTransactions);

export default transactionRouter;