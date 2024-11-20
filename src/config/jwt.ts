import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export { generateTokens };
