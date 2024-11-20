import { Router } from "express";
import {
  deleteUser,
  login,
  logout,
  me,
  refresh,
  register,
} from "../controller/authController";
import authMiddleware from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/me", authMiddleware, me);
authRouter.delete("/me", authMiddleware, deleteUser);

export default authRouter;
