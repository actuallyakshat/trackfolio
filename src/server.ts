import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConnection";
import indexRouter from "./routes";
import { getEndPointsHTML } from "./util/getEndPointsHTML";

dotenv.config();

const PORT = process.env.PORT as string;

const app = express();
//I will only use cors for development because we will serve the frontend from the same server as static files
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/api/v1", (req, res) => {
  const endPointsHTML = getEndPointsHTML();
  res.send(
    "Welcome to Trackfolio API. Here are the endpoints:<br>" + endPointsHTML
  );
});

app.use("/api/v1", indexRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
