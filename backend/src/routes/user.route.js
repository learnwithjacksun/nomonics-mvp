import { Router } from "express";
import { getAdminStats, getSavedComics, getUsers, saveComic } from "../controllers/user.controller.js";
import isAdmin from "../middleware/admin.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/admin/stats", authMiddleware, isAdmin, getAdminStats);
userRouter.get("/admin/users", authMiddleware, isAdmin, getUsers);
userRouter.post("/comic/:comicId/save", authMiddleware, saveComic);
userRouter.get("/comic/saved", authMiddleware, getSavedComics);



export default userRouter;