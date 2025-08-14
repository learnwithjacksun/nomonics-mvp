import express from "express";
import { getPdfs, uploadPdf } from "../controllers/pdf.controller.js";

const pdfRouter = express.Router();

pdfRouter.post("/upload", uploadPdf);
pdfRouter.get("/", getPdfs);

export default pdfRouter;