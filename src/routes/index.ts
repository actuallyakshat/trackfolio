import express from "express";
import authRouter from "./auth";
import authMiddleware from "../middleware/auth";
const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.get("/me", authMiddleware, (req, res) => {
  const name = req.user?.name;
  res.send("Hello " + name);
});

export default indexRouter;
