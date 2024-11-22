import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import redis from "../config/redis";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { userId: string };

    const cacheKey = `user:${decoded.userId}`;

    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      console.log("Cache hit for user");
      req.user = JSON.parse(cachedUser);
      next();
      return;
    }

    console.log("Cache miss for user");

    const user = await User.findById(decoded.userId).select("-password");

    await redis.set(cacheKey, JSON.stringify(user));

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (e) {
    const error = e as Error;
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
