import { Router } from "express";
import {
  updateComicCredit,
  updateComicStatus,
  deleteComic,
  getTransactions,
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
adminRouter.put("/comic/:id/status", authMiddleware, isAdmin, updateComicStatus);
adminRouter.delete("/comic/:id", authMiddleware, deleteComic);
adminRouter.get("/transactions", authMiddleware, getTransactions);

export default adminRouter;
