import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connecting to MongoDB");
    console.log(e);
  }
};

export { connectDB };
