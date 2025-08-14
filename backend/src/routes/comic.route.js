import { Router } from "express";
import { addNewChapter, createNewComic, getAllComics, getApprovedComics, getCreatorComics, getFreeComics, getNewReleaseComics, getTrendingComics, likeComic, unlockComic } from "../controllers/comic.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const comicRouter = Router();

comicRouter.post("/create", authMiddleware, createNewComic);
comicRouter.get("/", getApprovedComics);
comicRouter.get("/all", getAllComics);
comicRouter.get("/new-release", getNewReleaseComics);
comicRouter.get("/free", getFreeComics);
comicRouter.get("/trending", getTrendingComics);
comicRouter.post("/:id/chapter", authMiddleware, addNewChapter);
comicRouter.get("/creator", authMiddleware, getCreatorComics);
comicRouter.post("/:id/like", authMiddleware, likeComic);
comicRouter.post("/:id/unlock", authMiddleware, unlockComic);

export default comicRouter;