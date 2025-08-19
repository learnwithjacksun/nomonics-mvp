import { Router } from "express";
import { getAdminStats, getSavedComics, getUsers, saveComic, updateProfile, toggleAdminStatus } from "../controllers/user.controller.js";
import isAdmin from "../middleware/admin.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/admin/stats", authMiddleware, isAdmin, getAdminStats);
userRouter.get("/admin/users", authMiddleware, isAdmin, getUsers);
userRouter.post("/comic/:comicId/save", authMiddleware, saveComic);
userRouter.get("/comic/saved", authMiddleware, getSavedComics);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.patch("/:userId/toggle-admin", authMiddleware, isAdmin, toggleAdminStatus);



export default userRouter;