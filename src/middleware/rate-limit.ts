import { Request, Response, NextFunction, RequestHandler } from "express";
import redis from "../config/redis";

export const rateLimit = (
  requests: number = 15,
  seconds: number = 60
): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const key = `rate:${req.ip}`;

    try {
      const count = await redis.incr(key);

      if (count === 1) {
        await redis.expire(key, seconds);
      }

      if (count > requests) {
        res.status(429).json({ message: "Too many requests" });
        return;
      }

      next();
    } catch (error) {
      console.error("Rate limit error:", error);
      next(error);
    }
  };
};
