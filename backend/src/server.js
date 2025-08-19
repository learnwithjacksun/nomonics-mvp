import express from "express";
import cors from "cors";
import envFile from "./config/env.js";
import connectDB from "./config/database.js";
import pdfRouter from "./routes/pdf.route.js";
import authRouter from "./routes/auth.route.js";
import comicRouter from "./routes/comic.route.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";
import marketplaceRouter from "./routes/marketplace.route.js";
import bankAccountRouter from "./routes/bank-account.route.js";
import withdrawalRouter from "./routes/withdrawal.route.js";
import commentRouter from "./routes/comment.route.js";

const Port = envFile.PORT || 5000;

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://nomonics.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedOrigins: allowedOrigins,
  })
);
app.use(express.json({ limit: "50mb" })); // ✅ Increase limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    status: "success",
  });
});

app.use("/v1/pdf", pdfRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/comic", comicRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/user", userRouter);
app.use("/v1/transaction", transactionRouter);
app.use("/v1/marketplace", marketplaceRouter);
app.use("/v1/bank", bankAccountRouter);
app.use("/v1/withdrawal", withdrawalRouter);
app.use("/v1/comment", commentRouter);

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});
