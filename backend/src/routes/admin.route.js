import { Router } from "express";
import {
  updateComicCredit,
  updateComicStatus,
  deleteComic,
  getTransactions,
  getWithdrawals,
  updateWithdrawalStatus,
  getDefaultSettings,
  updateDefaultSettings,
  checkBalance,
  getAdminCommission,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const adminRouter = Router();

adminRouter.put(
  "/comic/:id/credit",
  authMiddleware,
  isAdmin,
  updateComicCredit
);
adminRouter.get("/balance", authMiddleware, isAdmin, checkBalance);
adminRouter.get("/commission", authMiddleware, isAdmin, getAdminCommission);
adminRouter.put("/comic/:id/status", authMiddleware, isAdmin, updateComicStatus);
adminRouter.delete("/comic/:id", authMiddleware, deleteComic);
adminRouter.get("/transactions", authMiddleware, getTransactions);
adminRouter.get("/withdrawals", authMiddleware, isAdmin, getWithdrawals);
adminRouter.put("/withdrawal/:id/status", authMiddleware, isAdmin, updateWithdrawalStatus);

// Settings routes
adminRouter.get("/settings", authMiddleware, isAdmin, getDefaultSettings);
adminRouter.put("/settings", authMiddleware, isAdmin, updateDefaultSettings);

export default adminRouter;
