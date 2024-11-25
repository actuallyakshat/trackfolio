import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "./config/dbConnection";
import { rateLimit } from "./middleware/rate-limit";
import indexRouter from "./routes";
import { getEndPointsHTML } from "./util/getEndPointsHTML";

dotenv.config();

const PORT = process.env.PORT as string;

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(rateLimit());

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
