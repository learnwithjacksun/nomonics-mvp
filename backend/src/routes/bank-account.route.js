import { Router } from "express";
import { 
  getBankAccount, 
  addOrUpdateBankAccount, 
  deleteBankAccount, 
  getSupportedBanks,
  resolveBankAccount
} from "../controllers/bank-account.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const bankAccountRouter = Router();

bankAccountRouter.use(authMiddleware);

bankAccountRouter.get("/", authMiddleware, getBankAccount);
bankAccountRouter.post("/", authMiddleware, addOrUpdateBankAccount);
bankAccountRouter.delete("/:id", authMiddleware, deleteBankAccount);
bankAccountRouter.get("/supported-banks", getSupportedBanks);
bankAccountRouter.post("/resolve-bank-account", resolveBankAccount);

export default bankAccountRouter;
