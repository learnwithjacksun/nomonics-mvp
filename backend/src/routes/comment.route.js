import { Router } from "express";
import { addComment, getChapterComments, likeComment, deleteComment } from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const commentRouter = Router();

commentRouter.post("/:chapterId", authMiddleware, addComment);
commentRouter.get("/:chapterId", getChapterComments);
commentRouter.post("/:commentId/like", authMiddleware, likeComment);
commentRouter.delete("/:commentId", authMiddleware, deleteComment);

export default commentRouter;
