import { Router } from "express";
import { register, login, refresh, logout } from "../controller/authController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    user: user,
  });
});

export default router;
