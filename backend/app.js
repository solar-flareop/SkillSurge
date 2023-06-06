import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({
  path: "./Config/.env",
});
const app = express();

//imports
import courseRouter from "./Routes/CourseRoutes.js";
import otherRouter from "./Routes/OtherRoutes.js";
import paymentRouter from "./Routes/PaymentRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import ErrorMiddleware from "./Middlewares/Error.js";

//middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

//Default route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Welcome to SkillSurge Server🚀. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend </h1>`
    );
});

//routes
app.use("/api/v1/", courseRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", paymentRouter);
app.use("/api/v1/", otherRouter);

app.use(ErrorMiddleware);

export default app;
