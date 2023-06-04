import jwt from "jsonwebtoken";
import catchAsyncError from "./CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In", 401));
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decoded._id);
  next();
});
