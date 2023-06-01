import express from "express";
import dotenv from "dotenv";
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

//routes
app.use("/api/v1/", courseRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", paymentRouter);
app.use("/api/v1/", otherRouter);

app.use(ErrorMiddleware);

export default app;
