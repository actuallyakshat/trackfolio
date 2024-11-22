import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
