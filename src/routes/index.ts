import express from "express";
import authMiddleware from "../middleware/auth";
import applicationsRouter from "./applications";
import authRouter from "./auth";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/application", authMiddleware, applicationsRouter);

export default indexRouter;
