import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../types/express";
import Application from "./Application";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const query = this;
    const userId = query.getFilter()._id;

    const orphanApplications = await Application.find({ userId });
    const response = await Application.deleteMany({ userId });

    next();
  } catch (e) {
    const error = e as Error;
    console.error("Error during orphan application cleanup:", error);
    next(error);
  }
});

export default mongoose.model<IUser>("User", userSchema);
