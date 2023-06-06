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

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};

export const isUserSubscribed = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only subscribers can access this resource`, 403)
    );
  next();
};
