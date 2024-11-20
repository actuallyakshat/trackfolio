import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies?.accessToken;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    console.log(user);

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
