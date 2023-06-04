import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
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
app.use(cookieParser())

//routes
app.use("/api/v1/", courseRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", paymentRouter);
app.use("/api/v1/", otherRouter);

app.use(ErrorMiddleware);

export default app;
