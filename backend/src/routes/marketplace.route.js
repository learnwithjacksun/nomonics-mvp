import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/marketplace.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const marketplaceRouter = Router();

marketplaceRouter.post("/create", authMiddleware, createProduct);
marketplaceRouter.get("/", getProducts);
marketplaceRouter.delete("/:id", authMiddleware, deleteProduct);

export default marketplaceRouter;
