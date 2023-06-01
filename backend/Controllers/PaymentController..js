import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";

export const registerController = catchAsyncError(async (req, res, next) => {
  res.status(201).json({
    success: true,
  });
});
